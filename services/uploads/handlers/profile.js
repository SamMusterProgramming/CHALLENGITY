import {
    getUploadImageUrl,
    saveProfileImageToDataBase,
  } from "../../../uploadFileToBlackBlaze";
  
  import {
    startNativeUpload,
  } from "../uploadNative";
  
  import {
    getUploadJob,
    updateUploadJob,
    deleteUploadFile,
  } from "../uploadStorage";
  
  import {
    UPLOAD_STATUS,
    UPLOAD_TYPE,
  } from "../uploadTypes";
  
  /*
  |--------------------------------------------------------------------------
  | Process profile upload
  |--------------------------------------------------------------------------
  */
  
  export const processProfileUpload =
    async (jobId) => {
      let job =
        await getUploadJob(
          jobId
        );
  
      if (!job) {
        throw new Error(
          `Upload job ${jobId} not found`
        );
      }
  
      if (
        job.type !==
        UPLOAD_TYPE.PROFILE
      ) {
        throw new Error(
          `Unsupported upload type: ${job.type}`
        );
      }
  
      try {
        let payload =
          job.payload || {};
  
        /*
        |--------------------------------------------------------------------------
        | Already completed
        |--------------------------------------------------------------------------
        */
  
        if (job.result) {
          return job.result;
        }
  
        /*
        |--------------------------------------------------------------------------
        | Required data
        |--------------------------------------------------------------------------
        */
  
        const {
          userId,
          userEmail,
          deleteFileId,
          deleteFileName,
        } = payload;
  
        if (!userId) {
          throw new Error(
            "User ID is required for profile upload"
          );
        }
  
        if (!userEmail) {
          throw new Error(
            "User email is required for profile upload"
          );
        }
  
        /*
        |--------------------------------------------------------------------------
        | Upload image to B2
        |--------------------------------------------------------------------------
        */
  
        let uploadResult =
          payload.uploadResult || null;
  
        if (!uploadResult) {
          const imageUri =
            payload.imageUri;
  
          if (!imageUri) {
            throw new Error(
              "Profile image is no longer available. Please select the image again."
            );
          }
  
          await updateUploadJob(
            jobId,
            {
              status:
                UPLOAD_STATUS.UPLOADING,
  
              attempts:
                (job.attempts || 0) + 1,
  
              error: null,
            }
          );
  
          console.log(
            `🖼️ Getting profile upload URL: ${jobId}`
          );
  
          const uploadData =
            await getUploadImageUrl(
              userId,
              userEmail,
              "profile"
            );
  
          uploadResult =
            await startNativeUpload({
              nativeJobId:
                jobId,
  
              uploadUrl:
                uploadData.uploadUrl,
  
              authorizationToken:
                uploadData.authorizationToken,
  
              fileUri:
                imageUri,
  
              fileName:
                uploadData.fileName,
  
              contentType:
                "image/jpeg",
            });
  
          /*
          |--------------------------------------------------------------------------
          | IMPORTANT:
          |
          | Persist the B2 result before deleting the local image.
          |--------------------------------------------------------------------------
          */
  
          payload = {
            ...payload,
            uploadResult,
          };
  
          await updateUploadJob(
            jobId,
            {
              payload,
              error: null,
            }
          );
  
          console.log(
            `💾 Profile upload result saved: ${jobId}`
          );
  
          /*
          |--------------------------------------------------------------------------
          | Delete local image.
          |--------------------------------------------------------------------------
          */
  
          const deleted =
            await deleteUploadFile(
              imageUri
            );
  
          if (deleted) {
            payload = {
              ...payload,
              imageUri: null,
            };
  
            await updateUploadJob(
              jobId,
              {
                payload,
              }
            );
  
            console.log(
              `🧹 Local profile image removed: ${jobId}`
            );
          } else {
            console.warn(
              `⚠️ Local profile image could not be removed yet: ${jobId}`
            );
          }
        }
  
        /*
        |--------------------------------------------------------------------------
        | Reload persisted state.
        |--------------------------------------------------------------------------
        */
  
        job =
          await getUploadJob(
            jobId
          );
  
        if (!job) {
          throw new Error(
            `Upload job ${jobId} no longer exists`
          );
        }
  
        payload =
          job.payload || {};
  
        uploadResult =
          payload.uploadResult;
  
        if (!uploadResult) {
          throw new Error(
            "Profile image upload result is missing"
          );
        }
  
        /*
        |--------------------------------------------------------------------------
        | Database save already completed
        |--------------------------------------------------------------------------
        */
  
        if (job.result) {
          return job.result;
        }
  
        /*
        |--------------------------------------------------------------------------
        | Save profile image
        |--------------------------------------------------------------------------
        */
  
        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.SAVING,
  
            error: null,
          }
        );
  
        console.log(
          `👤 Saving profile image: ${jobId}`
        );
  
        const response =
          await saveProfileImageToDataBase({
            userId,
  
            fileId:
              uploadResult.fileId,
  
            fileName:
              uploadResult.fileName,
  
            deleteFileId:
              deleteFileId || null,
  
            deleteFileName:
              deleteFileName || null,
          });
  
        /*
        |--------------------------------------------------------------------------
        | Persist final result
        |--------------------------------------------------------------------------
        */
  
        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.COMPLETED,
  
            result:
              response.data,
  
            error: null,
          }
        );
  
        /*
        |--------------------------------------------------------------------------
        | Final safety cleanup.
        |--------------------------------------------------------------------------
        */
  
        const finalJob =
          await getUploadJob(
            jobId
          );
  
        const remainingImageUri =
          finalJob?.payload?.imageUri;
  
        if (remainingImageUri) {
          await deleteUploadFile(
            remainingImageUri
          );
  
          await updateUploadJob(
            jobId,
            {
              payload: {
                ...(finalJob.payload || {}),
                imageUri: null,
              },
            }
          );
        }
  
        console.log(
          `✅ Profile upload ${jobId} COMPLETED`
        );
  
        return response.data;
      } catch (error) {
        console.error(
          `❌ Profile upload ${jobId} failed:`,
          error
        );
  
        /*
        |--------------------------------------------------------------------------
        | Preserve recoverability for a temporary native/network interruption.
        |--------------------------------------------------------------------------
        */
  
        const message =
          error?.message?.toLowerCase() || "";
  
        const connectionError =
          message.includes(
            "software caused connection abort"
          ) ||
          message.includes(
            "connection aborted"
          ) ||
          message.includes(
            "network request failed"
          ) ||
          message.includes(
            "network connection lost"
          ) ||
          message.includes(
            "connection reset"
          ) ||
          message.includes(
            "connection closed"
          );
  
        if (
          connectionError
        ) {
          await updateUploadJob(
            jobId,
            {
              status:
                UPLOAD_STATUS.PENDING,
  
              error:
                error?.message ||
                "Connection interrupted",
            }
          );
  
          throw error;
        }
  
        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.FAILED,
  
            error:
              error?.message ||
              "Profile upload failed",
          }
        );
  
        throw error;
      }
    };