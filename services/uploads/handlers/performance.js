import {
    addPerformanceToArena,
  } from "../../../apiCalls";
  
  import {
    getUploadImageUrl,
    getUploadVideoUrl,
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
  | Connection interruption detection
  |--------------------------------------------------------------------------
  */
  
  const isConnectionAbortError =
    (error) => {
      const message =
        error?.message?.toLowerCase() ||
        "";
  
      return (
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
        )
      );
    };
  
  /*
  |--------------------------------------------------------------------------
  | Process Performance upload
  |--------------------------------------------------------------------------
  */
  
  export const processPerformanceUpload =
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
        UPLOAD_TYPE.PERFORMANCE
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
        | Read persisted job data
        |--------------------------------------------------------------------------
        */
  
        const {
          arenaId,
          ownerId,
          ownerEmail,
          description,
          region,
        } = payload;
  
        /*
        |--------------------------------------------------------------------------
        | VIDEO
        |--------------------------------------------------------------------------
        */
  
        let videoUploadResult =
          payload.videoUploadResult ||
          null;
  
        if (!videoUploadResult) {
          if (!payload.videoUri) {
            throw new Error(
              "Video file is no longer available. Please select the video again."
            );
          }
  
          await updateUploadJob(
            jobId,
            {
              status:
                UPLOAD_STATUS.UPLOADING_VIDEO,
  
              attempts:
                (job.attempts || 0) + 1,
  
              error: null,
            }
          );
  
          console.log(
            `🎬 Getting video upload URL: ${jobId}`
          );
  
          const videoUploadData =
            await getUploadVideoUrl(
              ownerId,
              ownerEmail,
              "talent"
            );
  
          videoUploadResult =
            await startNativeUpload({
              nativeJobId:
                `${jobId}_video`,
  
              uploadUrl:
                videoUploadData.uploadUrl,
  
              authorizationToken:
                videoUploadData.authorizationToken,
  
              fileUri:
                payload.videoUri,
  
              fileName:
                videoUploadData.fileName,
  
              contentType:
                "video/mp4",
            });
  
          /*
          |--------------------------------------------------------------------------
          | CRITICAL:
          |
          | Persist the remote result before deleting the local video.
          |--------------------------------------------------------------------------
          */
  
          payload = {
            ...payload,
            videoUploadResult,
          };
  
          await updateUploadJob(
            jobId,
            {
              payload,
              status:
                UPLOAD_STATUS.UPLOADING_THUMBNAIL,
              error: null,
            }
          );
  
          console.log(
            `💾 Video result saved: ${jobId}`
          );
  
          /*
          |--------------------------------------------------------------------------
          | Delete local video.
          |--------------------------------------------------------------------------
          */
  
          const deleted =
            await deleteUploadFile(
              payload.videoUri
            );
  
          if (deleted) {
            payload = {
              ...payload,
              videoUri: null,
            };
  
            await updateUploadJob(
              jobId,
              {
                payload,
              }
            );
  
            console.log(
              `🧹 Local video removed: ${jobId}`
            );
          } else {
            console.warn(
              `⚠️ Local video could not be removed yet: ${jobId}`
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
  
        /*
        |--------------------------------------------------------------------------
        | THUMBNAIL
        |--------------------------------------------------------------------------
        */
  
        let thumbnailUploadResult =
          payload.thumbnailUploadResult ||
          null;
  
        if (!thumbnailUploadResult) {
          if (!payload.thumbnailUri) {
            throw new Error(
              "Thumbnail file is no longer available. Please select the thumbnail again."
            );
          }
  
          await updateUploadJob(
            jobId,
            {
              status:
                UPLOAD_STATUS.UPLOADING_THUMBNAIL,
              error: null,
            }
          );
  
          console.log(
            `🖼️ Getting thumbnail upload URL: ${jobId}`
          );
  
          const thumbnailUploadData =
            await getUploadImageUrl(
              ownerId,
              ownerEmail,
              "thumbnail"
            );
  
          thumbnailUploadResult =
            await startNativeUpload({
              nativeJobId:
                `${jobId}_thumbnail`,
  
              uploadUrl:
                thumbnailUploadData.uploadUrl,
  
              authorizationToken:
                thumbnailUploadData.authorizationToken,
  
              fileUri:
                payload.thumbnailUri,
  
              fileName:
                thumbnailUploadData.fileName,
  
              contentType:
                "image/jpeg",
            });
  
          /*
          |--------------------------------------------------------------------------
          | CRITICAL:
          |
          | Persist the remote result before deleting the local thumbnail.
          |--------------------------------------------------------------------------
          */
  
          payload = {
            ...payload,
            thumbnailUploadResult,
          };
  
          await updateUploadJob(
            jobId,
            {
              payload,
              status:
                UPLOAD_STATUS.ADDING_PERFORMANCE,
              error: null,
            }
          );
  
          console.log(
            `💾 Thumbnail result saved: ${jobId}`
          );
  
          /*
          |--------------------------------------------------------------------------
          | Delete local thumbnail.
          |--------------------------------------------------------------------------
          */
  
          const deleted =
            await deleteUploadFile(
              payload.thumbnailUri
            );
  
          if (deleted) {
            payload = {
              ...payload,
              thumbnailUri: null,
            };
  
            await updateUploadJob(
              jobId,
              {
                payload,
              }
            );
  
            console.log(
              `🧹 Local thumbnail removed: ${jobId}`
            );
          } else {
            console.warn(
              `⚠️ Local thumbnail could not be removed yet: ${jobId}`
            );
          }
        }
  
        /*
        |--------------------------------------------------------------------------
        | Reload final persisted state
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
  
        videoUploadResult =
          payload.videoUploadResult;
  
        thumbnailUploadResult =
          payload.thumbnailUploadResult;
  
        /*
        |--------------------------------------------------------------------------
        | Validate remote results
        |--------------------------------------------------------------------------
        */
  
        if (!videoUploadResult) {
          throw new Error(
            "Video upload result is missing"
          );
        }
  
        if (!thumbnailUploadResult) {
          throw new Error(
            "Thumbnail upload result is missing"
          );
        }
  
        /*
        |--------------------------------------------------------------------------
        | Performance already created
        |--------------------------------------------------------------------------
        */
  
        if (job.result) {
          console.log(
            `✅ Performance already created: ${jobId}`
          );
  
          return job.result;
        }
  
        /*
        |--------------------------------------------------------------------------
        | Create Performance
        |--------------------------------------------------------------------------
        */
  
        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.ADDING_PERFORMANCE,
            error: null,
          }
        );
  
        const performanceData = {
          owner_id:
            payload.ownerId,
  
          region:
            payload.region,
  
          description:
            payload.description,
  
          video: {
            fileName:
              videoUploadResult.fileName,
  
            fileId:
              videoUploadResult.fileId,
          },
  
          thumbnail: {
            fileName:
              thumbnailUploadResult.fileName,
  
            fileId:
              thumbnailUploadResult.fileId,
          },
        };
  
        console.log(
          `🎯 Creating performance: ${jobId}`
        );
  
        const response =
          await addPerformanceToArena(
            payload.arenaId,
            performanceData
          );
  
        /*
        |--------------------------------------------------------------------------
        | Save final result.
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
  
        console.log(
          `✅ Upload job ${jobId} COMPLETED`
        );
  
        return response.data;
      } catch (error) {
        console.error(
          `❌ Performance upload ${jobId} failed:`,
          error
        );
  
        /*
        |--------------------------------------------------------------------------
        | Temporary network interruption
        |--------------------------------------------------------------------------
        |
        | Keep the job recoverable.
        |--------------------------------------------------------------------------
        */
  
        if (
          isConnectionAbortError(
            error
          )
        ) {
          console.warn(
            `🔄 Upload interrupted by connection loss. Keeping job recoverable: ${jobId}`
          );
  
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
  
        /*
        |--------------------------------------------------------------------------
        | Permanent failure
        |--------------------------------------------------------------------------
        */
  
        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.FAILED,
  
            error:
              error?.message ||
              "Upload failed",
          }
        );
  
        throw error;
      }
    };