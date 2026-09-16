// // services/uploads/uploadProcessor.js

// import { addPerformanceToArena } from "../../apiCalls";
// import { getUploadImageUrl, getUploadVideoUrl, uploadImageToBlackBlaze, uploadVideoToBackblaze } from "../../uploadFileToBlackBlaze";

//   import {
//     getUploadJob,
//     updateUploadJob,
//   } from "./uploadStorage";
  
//   import {
//     UPLOAD_STATUS,
//     UPLOAD_TYPE,
//   } from "./uploadTypes";
  
  
//   /*
//   |--------------------------------------------------------------------------
//   | Process one performance upload
//   |--------------------------------------------------------------------------
//   */
  
//   export const processPerformanceUpload = async (
//     jobId
//   ) => {
//     const job = await getUploadJob(jobId);
//     if (!job) {
//       throw new Error(
//         `Upload job ${jobId} not found`
//       );
//     }
//     if (
//       job.type !== UPLOAD_TYPE.PERFORMANCE
//     ) {
//       throw new Error(
//         `Unsupported upload type: ${job.type}`
//       );
//     }
//     try {
//       /*
//       |--------------------------------------------------------------------------
//       | STEP 1
//       | Upload video
//       |--------------------------------------------------------------------------
//       */
//       let videoUploadResult =job.videoUploadResult;
//       if (!videoUploadResult) {
//         await updateUploadJob(
//           jobId,
//           {
//             status:  UPLOAD_STATUS.UPLOADING_VIDEO,
//             error: null,
//             attempts:
//               (job.attempts || 0) + 1,
//           }
//         );
  
//         const videoUploadData =
//           await getUploadVideoUrl(
//             job.ownerId,
//             job.ownerEmail,
//             "talent"
//           );
  
//         videoUploadResult =
//           await uploadVideoToBackblaze(
//             videoUploadData,
//             job.videoUri
//           );
  
//         await updateUploadJob(
//           jobId,
//           {
//             status:
//               UPLOAD_STATUS.UPLOADING_THUMBNAIL,
//             videoUploadResult,
//             error: null,
//           }
//         );
//       }
  
  
//       /*
//       |--------------------------------------------------------------------------
//       | STEP 2
//       | Upload thumbnail
//       |--------------------------------------------------------------------------
//       */
  
//       let thumbnailUploadResult =
//         job.thumbnailUploadResult;
  
//       if (!thumbnailUploadResult) {
//         await updateUploadJob(
//           jobId,
//           {
//             status:
//               UPLOAD_STATUS.UPLOADING_THUMBNAIL,
//             error: null,
//           }
//         );
  
//         const thumbnailUploadData =
//           await getUploadImageUrl(
//             job.ownerId,
//             job.ownerEmail,
//             "thumbnail"
//           );
  
//         thumbnailUploadResult =
//           await uploadImageToBlackBlaze(
//             thumbnailUploadData,
//             job.thumbnailUri
//           );
//         await updateUploadJob(
//           jobId,
//           {
//             status: UPLOAD_STATUS.ADDING_PERFORMANCE,
//             thumbnailUploadResult,
//             error: null,
//           }
//         );
//       }
  
  
//       /*
//       |--------------------------------------------------------------------------
//       | STEP 3
//       | Create the performance in MongoDB
//       |--------------------------------------------------------------------------
//       */
  
//       const currentJob =
//         await getUploadJob(jobId);
//       if (
//         currentJob.performanceResult
//       ) {
//         return currentJob.performanceResult;
//       }
  
//       await updateUploadJob(
//         jobId,
//         {
//           status:  UPLOAD_STATUS.ADDING_PERFORMANCE,
//           error: null,
//         }
//       );
  
//       const performanceData = {
//         owner_id: job.ownerId,
//         region:  job.region,
//         description: job.description,
//         video: {
//           fileName: videoUploadResult.fileName,
//           fileId: videoUploadResult.fileId,
//         },
//         thumbnail: {
//           fileName:  thumbnailUploadResult.fileName,
//           fileId: thumbnailUploadResult.fileId,
//         },
//       };
  
//       const response = await addPerformanceToArena(
//           job.arenaId,
//           performanceData
//         );
//       /*
//       |--------------------------------------------------------------------------
//       | STEP 4
//       | Save successful result
//       |--------------------------------------------------------------------------
//       */
//       await updateUploadJob(
//         jobId,
//         {
//           status: UPLOAD_STATUS.COMPLETED,
//           performanceResult:  response.data,
//           error: null,
//         }
//       );
//       console.log(
//         `✅ Upload job ${jobId} completed`
//       );
//       return response.data;
//     } catch (error) {
//       console.error(
//         `❌ Upload job ${jobId} failed:`,
//         error
//       );
  
//       /*
//       |--------------------------------------------------------------------------
//       | Save failure
//       |--------------------------------------------------------------------------
//       */
//       await updateUploadJob(
//         jobId,
//         {
//           status:
//             UPLOAD_STATUS.FAILED,
  
//           error:
//             error?.message ||
//             "Upload failed",
//         }
//       );
//       throw error;
//     }
//   };

// services/uploads/uploadProcessor.js
// services/uploads/uploadProcessor.js
// services/uploads/uploadProcessor.js
import { Platform } from "react-native";

import {
  addPerformanceToArena,
} from "../../apiCalls";

import {
  getUploadImageUrl,
  getUploadVideoUrl,
} from "../../uploadFileToBlackBlaze";

import ItriUpload from "itri-upload";

import {
  getUploadJob,
  updateUploadJob,
  deleteUploadFile,
  cleanupPerformanceJobDirectory,
} from "./uploadStorage";

import {
  UPLOAD_STATUS,
  UPLOAD_TYPE,
} from "./uploadTypes";

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const getNativeFilePath = (uri) => {
  if (
    Platform.OS === "android" &&
    uri?.startsWith("file://")
  ) {
    return decodeURIComponent(
      uri.replace(/^file:\/\//, "")
    );
  }

  return uri;
};

const waitForNativeUpload = async (
  jobId,
  fileName
) => {
  while (true) {
    const statusJson =
      await ItriUpload.getUploadStatus(jobId);

    if (!statusJson) {
      await wait(1000);
      continue;
    }

    let state;

    try {
      state = JSON.parse(statusJson);
    } catch (error) {
      console.warn(
        `⚠️ Invalid native upload state: ${jobId}`,
        statusJson
      );

      await wait(1000);
      continue;
    }

    const status = state?.status;

    if (status === "UPLOADING") {
      if (
        state.bytesTotal > 0 &&
        typeof state.bytesUploaded === "number"
      ) {
        const percent = Math.round(
          (state.bytesUploaded /
            state.bytesTotal) *
            100
        );

        console.log(
          `⬆️ Upload ${jobId}: ${percent}%`
        );
      }

      await wait(1000);
      continue;
    }

    if (
      status === "SCHEDULED" ||
      status === "STOPPED"
    ) {
      await wait(1000);
      continue;
    }

    if (status === "COMPLETED") {
      if (!state.response) {
        throw new Error(
          `Native upload completed without a response: ${jobId}`
        );
      }

      try {
        return JSON.parse(
          state.response
        );
      } catch (error) {
        console.error(
          `❌ Invalid B2 response: ${jobId}`,
          state.response
        );

        throw new Error(
          `Invalid upload response for ${fileName}`
        );
      }
    }

    if (status === "CANCELLED") {
      throw new Error(
        `Upload cancelled: ${fileName}`
      );
    }

    if (status === "FAILED") {
      throw new Error(
        state.error ||
          `Upload failed: ${fileName}`
      );
    }

    console.warn(
      `⚠️ Unknown native upload state for ${jobId}:`,
      state
    );

    await wait(1000);
  }
};

const startNativeUpload = async (
  jobId,
  data,
  fileUri,
  contentType
) => {
  if (!fileUri) {
    throw new Error(
      "Upload file is required"
    );
  }

  const filePath =
    getNativeFilePath(fileUri);

  console.log(
    `🚀 Starting native upload: ${jobId}`
  );

  await ItriUpload.startUpload(
    jobId,
    data.uploadUrl,
    data.authorizationToken,
    filePath,
    data.fileName,
    contentType
  );

  return waitForNativeUpload(
    jobId,
    data.fileName
  );
};

const uploadVideo = async (
  jobId,
  data,
  videoUri
) => {
  if (!videoUri) {
    throw new Error(
      "Video file is required for video upload"
    );
  }

  console.log(
    `🎬 Starting video upload: ${jobId}`
  );

  const result =
    await startNativeUpload(
      jobId,
      data,
      videoUri,
      "video/mp4"
    );

  console.log(
    `✅ Video upload completed: ${jobId}`
  );

  return result;
};

const uploadThumbnail = async (
  jobId,
  data,
  thumbnailUri
) => {
  if (!thumbnailUri) {
    throw new Error(
      "Thumbnail file is required for thumbnail upload"
    );
  }

  console.log(
    `🖼️ Starting thumbnail upload: ${jobId}`
  );

  const result =
    await startNativeUpload(
      jobId,
      data,
      thumbnailUri,
      "image/jpeg"
    );

  console.log(
    `✅ Thumbnail upload completed: ${jobId}`
  );

  return result;
};

const cleanupVideoAfterUpload = async (
  jobId,
  videoUri
) => {
  if (!videoUri) {
    return;
  }

  console.log(
    `🧹 Removing local video: ${jobId}`
  );

  const deleted =
    await deleteUploadFile(videoUri);

  if (deleted) {
    await updateUploadJob(jobId, {
      videoUri: null,
    });

    console.log(
      `🧹 Local video removed: ${jobId}`
    );
  } else {
    console.warn(
      `⚠️ Local video could not be removed yet: ${jobId}`
    );
  }

  await cleanupPerformanceJobDirectory(
    jobId
  );
};

const cleanupThumbnailAfterUpload =
  async (
    jobId,
    thumbnailUri
  ) => {
    if (!thumbnailUri) {
      return;
    }

    console.log(
      `🧹 Removing local thumbnail: ${jobId}`
    );

    const deleted =
      await deleteUploadFile(
        thumbnailUri
      );

    if (deleted) {
      await updateUploadJob(jobId, {
        thumbnailUri: null,
      });

      console.log(
        `🧹 Local thumbnail removed: ${jobId}`
      );
    } else {
      console.warn(
        `⚠️ Local thumbnail could not be removed yet: ${jobId}`
      );
    }

    await cleanupPerformanceJobDirectory(
      jobId
    );
  };

const isConnectionAbortError = (
  error
) => {
  const message =
    error?.message?.toLowerCase() || "";

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

export const processPerformanceUpload =
  async (jobId) => {
    let job =
      await getUploadJob(jobId);

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
      let videoUploadResult =
        job.videoUploadResult;

      if (!videoUploadResult) {
        if (!job.videoUri) {
          throw new Error(
            "Video file is no longer available. Please select the video again."
          );
        }

        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.UPLOADING_VIDEO,
            error: null,
            attempts:
              (job.attempts || 0) + 1,
          }
        );

        console.log(
          `🎬 Getting video upload URL: ${jobId}`
        );

        const videoUploadData =
          await getUploadVideoUrl(
            job.ownerId,
            job.ownerEmail,
            "talent"
          );

        videoUploadResult =
          await uploadVideo(
            jobId,
            videoUploadData,
            job.videoUri
          );

        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.UPLOADING_THUMBNAIL,
            videoUploadResult,
            error: null,
          }
        );

        console.log(
          `💾 Video result saved: ${jobId}`
        );

        await cleanupVideoAfterUpload(
          jobId,
          job.videoUri
        );

        job =
          await getUploadJob(jobId);
      }

      let thumbnailUploadResult =
        job.thumbnailUploadResult;

      if (!thumbnailUploadResult) {
        if (!job.thumbnailUri) {
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
            job.ownerId,
            job.ownerEmail,
            "thumbnail"
          );

        thumbnailUploadResult =
          await uploadThumbnail(
            jobId,
            thumbnailUploadData,
            job.thumbnailUri
          );

        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.ADDING_PERFORMANCE,
            thumbnailUploadResult,
            error: null,
          }
        );

        console.log(
          `💾 Thumbnail result saved: ${jobId}`
        );

        await cleanupThumbnailAfterUpload(
          jobId,
          job.thumbnailUri
        );

        job =
          await getUploadJob(jobId);
      }

      const currentJob =
        await getUploadJob(jobId);

      if (!currentJob) {
        throw new Error(
          `Upload job ${jobId} no longer exists`
        );
      }

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

      if (currentJob.performanceResult) {
        console.log(
          `✅ Performance already created: ${jobId}`
        );

        return currentJob.performanceResult;
      }

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
          currentJob.ownerId,
        region:
          currentJob.region,
        description:
          currentJob.description,
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
          currentJob.arenaId,
          performanceData
        );

      await updateUploadJob(
        jobId,
        {
          status:
            UPLOAD_STATUS.COMPLETED,
          performanceResult:
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
        `❌ Upload job ${jobId} failed:`,
        error
      );

      if (
        isConnectionAbortError(error)
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