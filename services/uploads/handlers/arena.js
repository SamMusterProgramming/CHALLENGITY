
// import { createArenaByUser } from "../../../apiCalls/arenas";
// import { getUploadImageUrl } from "../../../uploadFileToBlackBlaze";

// import { startNativeUpload } from "../uploadNative";
// import {
//   getUploadJob,
//   updateUploadJob,
//   deleteUploadFile,
// } from "../uploadStorage";

// import { UPLOAD_STATUS, UPLOAD_TYPE } from "../uploadTypes";

// const isConnectionAbortError = (error) => {
//   const message = error?.message?.toLowerCase() || "";

//   return (
//     message.includes("software caused connection abort") ||
//     message.includes("connection aborted") ||
//     message.includes("network request failed") ||
//     message.includes("network connection lost") ||
//     message.includes("connection reset") ||
//     message.includes("connection closed")
//   );
// };

// const buildImageData = (uploadResult, existingImage) => {
//   if (uploadResult) {
//     if (!uploadResult.fileId || !uploadResult.fileName || !uploadResult.url) {
//       throw new Error("Image upload completed without fileId, fileName, or url.");
//     }

//     return {
//       publicUrl: uploadResult.url,
//       fileId: uploadResult.fileId,
//       fileName: uploadResult.fileName,
//     };
//   }

//   // Preserve an existing image if this image did not need uploading.
//   return existingImage || undefined;
// };

// export const processArenaUpload = async (jobId) => {
//   let job = await getUploadJob(jobId);

//   if (!job) {
//     throw new Error(`Upload job ${jobId} not found`);
//   }

//   if (job.type !== UPLOAD_TYPE.ARENA) {
//     throw new Error(`Unsupported upload type: ${job.type}`);
//   }

//   try {
//     let payload = job.payload || {};

//     const {
//       userId,
//       userEmail,
//       arenaData,
//     } = payload;

//     if (!userId || !userEmail || !arenaData) {
//       throw new Error("Arena job is missing user information or arena data.");
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | 1. Upload Arena profile image
//     |--------------------------------------------------------------------------
//     */

//     let profileUploadResult = payload.profileUploadResult || null;

//     if (!profileUploadResult && payload.profileImageUri) {
//       await updateUploadJob(jobId, {
//         status: UPLOAD_STATUS.UPLOADING,
//         attempts: (job.attempts || 0) + 1,
//         error: null,
//       });

//       const uploadData = await getUploadImageUrl(
//         userId,
//         userEmail,
//         "profile"
//       );

//       profileUploadResult = await startNativeUpload({
//         nativeJobId: `${jobId}_profile`,
//         uploadUrl: uploadData.uploadUrl,
//         authorizationToken: uploadData.authorizationToken,
//         fileUri: payload.profileImageUri,
//         fileName: uploadData.fileName,
//         contentType: "image/jpeg",
//       });

//       // Persist the result before deleting the local file.
//       payload = {
//         ...payload,
//         profileUploadResult,
//       };

//       await updateUploadJob(jobId, {
//         payload,
//         status: UPLOAD_STATUS.UPLOADING,
//         error: null,
//       });

//       const deleted = await deleteUploadFile(payload.profileImageUri);

//       if (deleted) {
//         payload = { ...payload, profileImageUri: null };
//         await updateUploadJob(jobId, { payload });
//       }
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Reload the persisted job before continuing
//     |--------------------------------------------------------------------------
//     */

//     job = await getUploadJob(jobId);

//     if (!job) {
//       throw new Error(`Upload job ${jobId} no longer exists`);
//     }

//     payload = job.payload || {};

//     /*
//     |--------------------------------------------------------------------------
//     | 2. Upload Arena cover image
//     |--------------------------------------------------------------------------
//     */

//     let coverUploadResult = payload.coverUploadResult || null;

//     if (!coverUploadResult && payload.coverImageUri) {
//       await updateUploadJob(jobId, {
//         status: UPLOAD_STATUS.UPLOADING,
//         error: null,
//       });

//       const uploadData = await getUploadImageUrl(
//         userId,
//         userEmail,
//         "cover"
//       );

//       coverUploadResult = await startNativeUpload({
//         nativeJobId: `${jobId}_cover`,
//         uploadUrl: uploadData.uploadUrl,
//         authorizationToken: uploadData.authorizationToken,
//         fileUri: payload.coverImageUri,
//         fileName: uploadData.fileName,
//         contentType: "image/jpeg",
//       });

//       // Persist the result before deleting the local file.
//       payload = {
//         ...payload,
//         coverUploadResult,
//       };

//       await updateUploadJob(jobId, {
//         payload,
//         status: UPLOAD_STATUS.SAVING,
//         error: null,
//       });

//       const deleted = await deleteUploadFile(payload.coverImageUri);

//       if (deleted) {
//         payload = { ...payload, coverImageUri: null };
//         await updateUploadJob(jobId, { payload });
//       }
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Reload final persisted state
//     |--------------------------------------------------------------------------
//     */

//     job = await getUploadJob(jobId);

//     if (!job) {
//       throw new Error(`Upload job ${jobId} no longer exists`);
//     }

//     payload = job.payload || {};

//     profileUploadResult = payload.profileUploadResult || null;
//     coverUploadResult = payload.coverUploadResult || null;

//     /*
//     |--------------------------------------------------------------------------
//     | 3. Ensure all requested uploads finished
//     |--------------------------------------------------------------------------
//     */

//     if (payload.profileImageUri && !profileUploadResult) {
//       throw new Error("Arena profile image has not finished uploading.");
//     }

//     if (payload.coverImageUri && !coverUploadResult) {
//       throw new Error("Arena cover image has not finished uploading.");
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | 4. Don't create the Arena twice if the result is already persisted
//     |--------------------------------------------------------------------------
//     */

//     if (job.result) {
//       return job.result;
//     }

//     await updateUploadJob(jobId, {
//       status: UPLOAD_STATUS.SAVING,
//       error: null,
//     });

//     const arenaPayload = {
//       ...payload.arenaData,

//       profileImage: buildImageData(
//         profileUploadResult,
//         payload.existingProfileImage
//       ),

//       coverImage: buildImageData(
//         coverUploadResult,
//         payload.existingCoverImage
//       ),
//     };

//     console.log(`🏟️ Creating Arena from upload job: ${jobId}`);

//     const response = await createArenaByUser(userId, arenaPayload);

//     if (response?.message === "arena exists already") {
//       throw new Error("You already have an Arena for this talent type.");
//     }

//     if (!response?.selectedArena || !Array.isArray(response?.arenas)) {
//       throw new Error("The server did not return the created Arena.");
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | 5. Persist the final result for the app to consume
//     |--------------------------------------------------------------------------
//     */

//     await updateUploadJob(jobId, {
//       status: UPLOAD_STATUS.COMPLETED,
//       result: response,
//       error: null,
//     });

//     console.log(`✅ Arena upload job ${jobId} COMPLETED`);

//     return response;
//   } catch (error) {
//     console.error(`❌ Arena job ${jobId} failed:`, error);

//     if (isConnectionAbortError(error)) {
//       await updateUploadJob(jobId, {
//         status: UPLOAD_STATUS.PENDING,
//         error: error?.message || "Connection interrupted",
//       });

//       throw error;
//     }

//     await updateUploadJob(jobId, {
//       status: UPLOAD_STATUS.FAILED,
//       error: error?.message || "Arena creation failed",
//     });

//     throw error;
//   }
// };


import {
    getUploadJob,
    updateUploadJob,
  } from "../uploadStorage";
  
  import {
    UPLOAD_STATUS,
    UPLOAD_TYPE,
  } from "../uploadTypes";
  
  import { startNativeUpload } from "../uploadNative";
  
  import { getUploadImageUrl } from "../../../uploadFileToBlackBlaze";
  import { createArenaByUser } from "../../../apiCalls/arenas";
  
  /*
  |--------------------------------------------------------------------------
  | Image helpers
  |--------------------------------------------------------------------------
  */
  
  const getLocalImageUri = (image) => {
    if (typeof image === "string") {
      return image;
    }
  
    if (image && typeof image.uri === "string") {
      return image.uri;
    }
  
    return null;
  };
  
  const getImageMimeType = (image) => {
    const uri = getLocalImageUri(image);
  
    if (!uri) {
      return "image/jpeg";
    }
  
    const cleanUri = uri.split("?")[0].toLowerCase();
  
    if (cleanUri.endsWith(".png")) return "image/png";
    if (cleanUri.endsWith(".webp")) return "image/webp";
    if (cleanUri.endsWith(".avif")) return "image/avif";
    if (cleanUri.endsWith(".heic")) return "image/heic";
  
    return "image/jpeg";
  };
  
  /*
  |--------------------------------------------------------------------------
  | Build image metadata for the backend
  |--------------------------------------------------------------------------
  |
  | Custom image:
  |   Use the fileId and fileName returned by the upload.
  |
  | Existing image:
  |   Reuse its existing file metadata and publicUrl, when available.
  |--------------------------------------------------------------------------
  */
  
  const buildImageData = ({
    isCustom,
    uploadResult,
    existingImage,
    imageLabel,
  }) => {
    if (isCustom) {
      if (!uploadResult?.fileId || !uploadResult?.fileName) {
        throw new Error(
          `${imageLabel} upload did not return fileId and fileName.`
        );
      }
  
      return {
        fileId: uploadResult.fileId,
        fileName: uploadResult.fileName,
      };
    }
  
    if (
      !existingImage ||
      typeof existingImage !== "object" ||
      !existingImage.fileId ||
      !existingImage.fileName
    ) {
      throw new Error(
        `${imageLabel} must contain fileId and fileName when using an existing image.`
      );
    }
  
    return {
      ...(existingImage.publicUrl
        ? { publicUrl: existingImage.publicUrl }
        : {}),
      fileId: existingImage.fileId,
      fileName: existingImage.fileName,
    };
  };
  
  /*
  |--------------------------------------------------------------------------
  | Upload one custom Arena image
  |--------------------------------------------------------------------------
  */
  
  const uploadArenaImage = async ({
    jobId,
    userId,
    userEmail,
    imageType,
    image,
    persistedUri,
  }) => {
    const fileUri = persistedUri || getLocalImageUri(image);
  
    if (!fileUri) {
      throw new Error(
        `Cannot upload custom ${imageType} image: local image URI is missing.`
      );
    }
  
    const uploadConfig = await getUploadImageUrl(
      userId,
      userEmail,
      imageType
    );
  
    if (
      !uploadConfig?.uploadUrl ||
      !uploadConfig?.authorizationToken ||
      !uploadConfig?.fileName
    ) {
      throw new Error(
        `Upload configuration for ${imageType} image is incomplete.`
      );
    }
  
    const nativeJobId = `${jobId}_${imageType}`;
  
    const uploadResult = await startNativeUpload({
      nativeJobId,
      uploadUrl: uploadConfig.uploadUrl,
      authorizationToken: uploadConfig.authorizationToken,
      fileUri,
      fileName: uploadConfig.fileName,
      contentType: getImageMimeType(image),
    });
  
    if (!uploadResult?.fileId) {
      throw new Error(
        `Native ${imageType} upload completed without returning fileId.`
      );
    }
   
    return {
      fileId: uploadResult.fileId,
      fileName: uploadResult.fileName || uploadConfig.fileName,
    };
  };
  
  /*
  |--------------------------------------------------------------------------
  | Retry classification
  |--------------------------------------------------------------------------
  |
  | Network errors and temporary server responses remain PENDING for recovery.
  | Other errors are marked FAILED.
  |--------------------------------------------------------------------------
  */
  
  const isRetryableArenaError = (error) => {
    const statusCode = error?.response?.status;
  
    const isNetworkError =
      !error?.response &&
      (
        error?.code === "ERR_NETWORK" ||
        error?.code === "ECONNABORTED" ||
        error?.code === "ETIMEDOUT" ||
        error?.message === "Network Error"
      );
  
    return (
      isNetworkError ||
      statusCode === 408 ||
      statusCode === 429 ||
      (
        typeof statusCode === "number" &&
        statusCode >= 500
      )
    );
  };
  
  /*
  |--------------------------------------------------------------------------
  | Process Arena creation job
  |--------------------------------------------------------------------------
  */
  
  export const processArenaUpload = async (jobId) => {
    let job = await getUploadJob(jobId);
  
    if (!job) {
      throw new Error(`Arena job "${jobId}" was not found.`);
    }
  
    if (job.type !== UPLOAD_TYPE.ARENA) {
      throw new Error(`Unsupported upload type: ${job.type}`);
    }
  
    // Avoid recreating an Arena if this job already completed.
    if (
      job.status === UPLOAD_STATUS.COMPLETED &&
      job.result
    ) {
      return job.result;
    }
  
    try {
      let payload = job.payload || {};
  
      const {
        userId,
        userEmail,
        arenaData,
      } = payload;
  
      if (!userId || !userEmail || !arenaData) {
        throw new Error(
          "Arena job requires userId, userEmail, and arenaData."
        );
      }
  
      const customProfileImage =
        arenaData.customProfileImage === true;
  
      const customCoverImage =
        arenaData.customCoverImage === true;
  
      let profileUploadResult =
        payload.profileUploadResult || null;
  
      let coverUploadResult =
        payload.coverUploadResult || null;
  
      /*
      |--------------------------------------------------------------------------
      | 1. Upload custom profile image when needed
      |--------------------------------------------------------------------------
      */
  
      if (customProfileImage && !profileUploadResult) {
        await updateUploadJob(jobId, {
          status: UPLOAD_STATUS.UPLOADING,
          error: null,
        });
  
        profileUploadResult = await uploadArenaImage({
          jobId,
          userId,
          userEmail,
          imageType: "profile",
          image: arenaData.profileImage,
          persistedUri: payload.profileImageUri,
        });
  
        // Save the successful upload so a retry doesn't upload it again.
        payload = {
          ...payload,
          profileUploadResult,
        };
  
        await updateUploadJob(jobId, {
          status: UPLOAD_STATUS.PENDING,
          payload,
          error: null,
        });
      }
  
      /*
      |--------------------------------------------------------------------------
      | 2. Upload custom cover image when needed
      |--------------------------------------------------------------------------
      */
  
      if (customCoverImage && !coverUploadResult) {
        await updateUploadJob(jobId, {
          status: UPLOAD_STATUS.UPLOADING,
          error: null,
        });
  
        coverUploadResult = await uploadArenaImage({
          jobId,
          userId,
          userEmail,
          imageType: "cover",
          image: arenaData.coverImage,
          persistedUri: payload.coverImageUri,
        });
  
        payload = {
          ...payload,
          coverUploadResult,
        };
  
        await updateUploadJob(jobId, {
          status: UPLOAD_STATUS.PENDING,
          payload,
          error: null,
        });
      }
  
      /*
      |--------------------------------------------------------------------------
      | 3. Prepare image metadata
      |--------------------------------------------------------------------------
      */
  
      const profileImage = buildImageData({
        isCustom: customProfileImage,
        uploadResult: profileUploadResult,
        existingImage: arenaData.profileImage,
        imageLabel: "Profile image",
      });
      
      const coverImage = buildImageData({
        isCustom: customCoverImage,
        uploadResult: coverUploadResult,
        existingImage: arenaData.coverImage,
        imageLabel: "Cover image",
      });
      
      // Fail before making the API request if either image is invalid.
      for (const [label, image] of [
        ["Profile image", profileImage],
        ["Cover image", coverImage],
      ]) {
        if (
          !image ||
          typeof image !== "object" ||
          typeof image.fileId !== "string" ||
          !image.fileId ||
          typeof image.fileName !== "string" ||
          !image.fileName ||
          image.fileName === "undefined" ||
          image.fileName.startsWith("file://")
        ) {
          throw new Error(
            `${label} has invalid upload metadata. Arena creation was stopped.`
          );
        }
      }
      
      const arenaPayload = {
        arenaName: arenaData.arenaName,
        talentType: arenaData.talentType,
        region: arenaData.region,
        biography: arenaData.biography,
        description: arenaData.description,
        profileImage,
        coverImage,
        customProfileImage,
        customCoverImage,
      };
      /*
      |--------------------------------------------------------------------------
      | 4. Create Arena on the backend
      |--------------------------------------------------------------------------
      */
  
      await updateUploadJob(jobId, {
        status: UPLOAD_STATUS.SAVING,
        error: null,
      });
  
      
  
      const response = await createArenaByUser(
        userId,
        arenaPayload
      );
  
     
      if (response?.message === "arena exists already") {
        throw new Error(
          "An Arena for this talent type already exists."
        );
      }
  
      if (
        !response?.selectedArena ||
        !Array.isArray(response?.arenas)
      ) {
        throw new Error(
          "Unexpected Arena creation response: expected selectedArena and arenas."
        );
      }
  
      /*
      |--------------------------------------------------------------------------
      | 5. Persist the completed result
      |--------------------------------------------------------------------------
      */
  
      await updateUploadJob(jobId, {
        status: UPLOAD_STATUS.COMPLETED,
        result: response,
        error: null,
      });
  
      const completedJob = await getUploadJob(jobId);
  
  
      return response;
    } catch (error) {
      const latestJob = await getUploadJob(jobId);
      const retryable = isRetryableArenaError(error);
  
      await updateUploadJob(jobId, {
        status: retryable
          ? UPLOAD_STATUS.PENDING
          : UPLOAD_STATUS.FAILED,
        error: error?.message || "Arena creation failed.",
        payload: latestJob?.payload || job.payload,
      });
  
    
  
      throw error;
    }
  };
  