// import * as FileSystem from "expo-file-system/legacy";
// import {
//   createUploadJob,
//   getUploadJob,
//   getPendingUploadJobs,
//   getCompletedUploadJobs,
//   updateUploadJob,
//   getPerformanceJobDirectory,
//   copyFileToUploadStorage,
//   removeCompletedUploadJob,
// } from "./uploadStorage";
// import {
//   UPLOAD_TYPE,
//   UPLOAD_STATUS,
// } from "./uploadTypes";
// import {
//   processPerformanceUpload,
// } from "./uploadProcessor";

// let processingQueue = false;
// const queueListeners = new Set();

// export const subscribeToUploadQueue = (callback) => {
//   queueListeners.add(callback);

//   return () => {
//     queueListeners.delete(callback);
//   };
// };

// const notifyQueueListeners = (data) => {
//   for (const callback of queueListeners) {
//     try {
//       callback(data);
//     } catch (error) {
//       console.error(
//         "❌ Upload queue listener error:",
//         error
//       );
//     }
//   }
// };

// const notifyQueueBusy = (jobId) => {
//   notifyQueueListeners({
//     busy: true,
//     jobId,
//   });
// };

// const notifyQueueAvailable = (
//   jobId,
//   status,
//   result = null,
//   error = null
// ) => {
//   notifyQueueListeners({
//     busy: false,
//     jobId,
//     status,
//     result,
//     error,
//   });
// };

// const generateJobId = () => {
//   return `upload_${Date.now()}_${Math.random()
//     .toString(36)
//     .substring(2, 10)}`;
// };

// const getFileExtension = (uri, fallback) => {
//   if (!uri) {
//     return fallback;
//   }

//   const cleanUri = uri.split("?")[0];

//   const match = cleanUri.match(
//     /\.([a-zA-Z0-9]+)$/
//   );

//   if (!match) {
//     return fallback;
//   }

//   return `.${match[1].toLowerCase()}`;
// };

// /*
// |--------------------------------------------------------------------------
// | Is queue busy?
// |--------------------------------------------------------------------------
// */

// export const isUploadQueueBusy = async () => {
//   if (processingQueue) {
//     return true;
//   }

//   const jobs = await getPendingUploadJobs();

//   return jobs.length > 0;
// };

// /*
// |--------------------------------------------------------------------------
// | Get active upload
// |--------------------------------------------------------------------------
// */

// export const getActiveUpload = async () => {
//   const jobs = await getPendingUploadJobs();

//   if (!jobs.length) {
//     return null;
//   }

//   return jobs[0];
// };

// /*
// |--------------------------------------------------------------------------
// | Enqueue performance
// |--------------------------------------------------------------------------
// */

// export const enqueuePerformanceUpload = async ({
//   videoUri,
//   thumbnailUri,
//   arenaId,
//   ownerId,
//   ownerEmail,
//   description,
//   region,
// }) => {
//   const queueBusy = await isUploadQueueBusy();

//   if (queueBusy) {
//     const activeJob = await getActiveUpload();

//     const error = new Error(
//       "You already have an upload in progress. Please wait until it finishes."
//     );

//     error.code = "UPLOAD_QUEUE_BUSY";
//     error.jobId = activeJob?.id || null;

//     throw error;
//   }

//   if (!videoUri) {
//     throw new Error("Video URI is required");
//   }

//   if (!thumbnailUri) {
//     throw new Error("Thumbnail URI is required");
//   }

//   if (!arenaId) {
//     throw new Error("Arena ID is required");
//   }

//   if (!ownerId) {
//     throw new Error("Owner ID is required");
//   }

//   if (!ownerEmail) {
//     throw new Error("Owner email is required");
//   }

//   const jobId = generateJobId();

//   const jobDirectory =
//     await getPerformanceJobDirectory(jobId);

//   const videoExtension =
//     getFileExtension(videoUri, ".mp4");

//   const thumbnailExtension =
//     getFileExtension(thumbnailUri, ".jpg");

//   const persistentVideoUri =
//     `${jobDirectory}video${videoExtension}`;

//   const persistentThumbnailUri =
//     `${jobDirectory}thumbnail${thumbnailExtension}`;

//   await copyFileToUploadStorage(
//     videoUri,
//     persistentVideoUri
//   );

//   await copyFileToUploadStorage(
//     thumbnailUri,
//     persistentThumbnailUri
//   );

//   const job = await createUploadJob({
//     id: jobId,
//     type: UPLOAD_TYPE.PERFORMANCE,
//     status: UPLOAD_STATUS.PENDING,
//     arenaId,
//     ownerId,
//     ownerEmail,
//     description,
//     region,
//     videoUri: persistentVideoUri,
//     thumbnailUri: persistentThumbnailUri,
//   });

//   console.log(
//     "📦 Upload job created:",
//     jobId
//   );

//   notifyQueueBusy(jobId);

//   processUploadQueue();

//   return job;
// };

// /*
// |--------------------------------------------------------------------------
// | Process queue
// |--------------------------------------------------------------------------
// */

// export const processUploadQueue = async () => {
//   if (processingQueue) {
//     return;
//   }

//   processingQueue = true;

//   try {
//     while (true) {
//       const jobs = await getPendingUploadJobs();

//       if (!jobs.length) {
//         break;
//       }

//       const job = jobs[0];

//       await processUploadJob(job.id);
//     }
//   } catch (error) {
//     console.error(
//       "❌ Upload queue error:",
//       error
//     );
//   } finally {
//     processingQueue = false;

//     const jobs = await getPendingUploadJobs();

//     if (!jobs.length) {
//       notifyQueueAvailable();
//     }
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | Process individual upload
// |--------------------------------------------------------------------------
// */

// export const processUploadJob = async (jobId) => {
//   const job = await getUploadJob(jobId);

//   if (!job) {
//     console.log(
//       `ℹ️ Upload job ${jobId} no longer exists`
//     );

//     return null;
//   }

//   if (
//     job.status ===
//     UPLOAD_STATUS.CANCELLED
//   ) {
//     notifyQueueAvailable(
//       jobId,
//       UPLOAD_STATUS.CANCELLED
//     );

//     return null;
//   }

//   const videoInfo =
//     await FileSystem.getInfoAsync(
//       job.videoUri
//     );

//   if (!videoInfo.exists) {
//     const error = new Error(
//       "Video file no longer exists on device"
//     );

//     await updateUploadJob(
//       jobId,
//       {
//         status:
//           UPLOAD_STATUS.FAILED,
//         error: error.message,
//       }
//     );

//     notifyQueueAvailable(
//       jobId,
//       UPLOAD_STATUS.FAILED,
//       null,
//       error
//     );

//     return null;
//   }

//   const thumbnailInfo =
//     await FileSystem.getInfoAsync(
//       job.thumbnailUri
//     );

//   if (!thumbnailInfo.exists) {
//     const error = new Error(
//       "Thumbnail file no longer exists on device"
//     );

//     await updateUploadJob(
//       jobId,
//       {
//         status:
//           UPLOAD_STATUS.FAILED,
//         error: error.message,
//       }
//     );

//     notifyQueueAvailable(
//       jobId,
//       UPLOAD_STATUS.FAILED,
//       null,
//       error
//     );

//     return null;
//   }

//   try {
//     const result =
//       await processPerformanceUpload(
//         jobId
//       );

//     console.log(
//       `✅ Performance upload ${jobId} completed`
//     );

//     /*
//      * IMPORTANT:
//      *
//      * DO NOT delete the completed job here.
//      *
//      * The Arena page needs performanceResult
//      * even if the app was restarted.
//      */

//     notifyQueueAvailable(
//       jobId,
//       UPLOAD_STATUS.COMPLETED,
//       result
//     );

//     return result;
//   } catch (error) {
//     console.error(
//       `❌ Performance upload ${jobId} failed:`,
//       error
//     );

//     notifyQueueAvailable(
//       jobId,
//       UPLOAD_STATUS.FAILED,
//       null,
//       error
//     );

//     return null;
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | Retry
// |--------------------------------------------------------------------------
// */

// export const retryUpload = async (jobId) => {
//   const queueBusy =
//     await isUploadQueueBusy();

//   if (queueBusy) {
//     const activeJob =
//       await getActiveUpload();

//     if (activeJob?.id !== jobId) {
//       const error = new Error(
//         "Another upload is currently in progress."
//       );

//       error.code =
//         "UPLOAD_QUEUE_BUSY";

//       throw error;
//     }
//   }

//   const job = await getUploadJob(jobId);

//   if (!job) {
//     throw new Error(
//       `Upload job ${jobId} not found`
//     );
//   }

//   await updateUploadJob(
//     jobId,
//     {
//       status: UPLOAD_STATUS.PENDING,
//       error: null,
//     }
//   );

//   notifyQueueBusy(jobId);

//   processUploadQueue();

//   return await getUploadJob(jobId);
// };

// /*
// |--------------------------------------------------------------------------
// | Cancel
// |--------------------------------------------------------------------------
// */

// export const cancelUpload = async (jobId) => {
//   const job = await getUploadJob(jobId);

//   if (!job) {
//     throw new Error(
//       `Upload job ${jobId} not found`
//     );
//   }

//   await updateUploadJob(
//     jobId,
//     {
//       status:
//         UPLOAD_STATUS.CANCELLED,
//       error: null,
//     }
//   );

//   console.log(
//     `🛑 Upload job ${jobId} cancelled`
//   );

//   notifyQueueAvailable(
//     jobId,
//     UPLOAD_STATUS.CANCELLED
//   );

//   return await getUploadJob(jobId);
// };

// /*
// |--------------------------------------------------------------------------
// | Recover after app restart
// |--------------------------------------------------------------------------
// */

// export const recoverUploadQueue = async () => {
//   try {
//     const jobs =
//       await getPendingUploadJobs();

//     if (!jobs.length) {
//       console.log(
//         "📭 No unfinished uploads"
//       );

//       return;
//     }

//     console.log(
//       `🔄 Recovering ${jobs.length} unfinished upload(s)`
//     );

//     for (const job of jobs) {
//       if (
//         job.status ===
//           UPLOAD_STATUS.UPLOADING_VIDEO ||
//         job.status ===
//           UPLOAD_STATUS.UPLOADING_THUMBNAIL ||
//         job.status ===
//           UPLOAD_STATUS.ADDING_PERFORMANCE
//       ) {
//         await updateUploadJob(
//           job.id,
//           {
//             status:
//               UPLOAD_STATUS.PENDING,
//             error: null,
//           }
//         );
//       }
//     }

//     notifyQueueBusy(jobs[0].id);

//     await processUploadQueue();
//   } catch (error) {
//     console.error(
//       "❌ Failed to recover upload queue:",
//       error
//     );
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | Get unfinished queue
// |--------------------------------------------------------------------------
// */

// export const getUploadQueue = async () => {
//   return await getPendingUploadJobs();
// };

// /*
// |--------------------------------------------------------------------------
// | Get completed uploads waiting
// | for the UI to consume
// |--------------------------------------------------------------------------
// */

// export const getCompletedUploads = async () => {
//   return await getCompletedUploadJobs();
// };

// /*
// |--------------------------------------------------------------------------
// | Remove completed upload after
// | the UI has consumed the result
// |--------------------------------------------------------------------------
// */

// export const consumeCompletedUpload =
//   async (jobId) => {
//     const job =
//       await getUploadJob(jobId);

//     if (!job) {
//       return null;
//     }

//     if (
//       job.status !==
//       UPLOAD_STATUS.COMPLETED
//     ) {
//       return null;
//     }

//     const result =
//       job.performanceResult;

//     await removeCompletedUploadJob(
//       jobId
//     );

//     console.log(
//       `🧹 Completed upload ${jobId} consumed`
//     );

//     return result;
//   };


//uploadManager.js
import * as FileSystem from "expo-file-system/legacy";

import {
  createUploadJob,
  getUploadJob,
  getPendingUploadJobs,
  getCompletedUploadJobs,
  updateUploadJob,
  getPerformanceJobDirectory,
  copyFileToUploadStorage,
  removeCompletedUploadJob,
  deleteUploadFile,
  cleanupPerformanceJobDirectory,
} from "./uploadStorage";

import {
  UPLOAD_TYPE,
  UPLOAD_STATUS,
} from "./uploadTypes";

import {
  processPerformanceUpload,
} from "./uploadProcessor";

/*
|--------------------------------------------------------------------------
| Queue state
|--------------------------------------------------------------------------
*/

let processingQueue = false;

const queueListeners =
  new Set();

/*
|--------------------------------------------------------------------------
| Queue subscriptions
|--------------------------------------------------------------------------
*/

export const subscribeToUploadQueue =
  (callback) => {
    queueListeners.add(
      callback
    );

    return () => {
      queueListeners.delete(
        callback
      );
    };
  };

const notifyQueueListeners =
  (data) => {
    for (
      const callback of queueListeners
    ) {
      try {
        callback(data);
      } catch (error) {
        console.error(
          "❌ Upload queue listener error:",
          error
        );
      }
    }
  };

const notifyQueueBusy =
  (jobId) => {
    notifyQueueListeners({
      busy: true,
      jobId,
    });
  };

const notifyQueueAvailable =
  (
    jobId,
    status,
    result = null,
    error = null
  ) => {
    notifyQueueListeners({
      busy: false,
      jobId,
      status,
      result,
      error,
    });
  };

/*
|--------------------------------------------------------------------------
| Job ID
|--------------------------------------------------------------------------
*/

const generateJobId =
  () => {
    return `upload_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;
  };

/*
|--------------------------------------------------------------------------
| File extension
|--------------------------------------------------------------------------
*/

const getFileExtension =
  (
    uri,
    fallback
  ) => {
    if (!uri) {
      return fallback;
    }

    const cleanUri =
      uri.split("?")[0];

    const match =
      cleanUri.match(
        /\.([a-zA-Z0-9]+)$/
      );

    if (!match) {
      return fallback;
    }

    return `.${match[1].toLowerCase()}`;
  };

/*
|--------------------------------------------------------------------------
| Is queue busy?
|--------------------------------------------------------------------------
*/

export const isUploadQueueBusy =
  async () => {
    if (processingQueue) {
      return true;
    }

    const jobs =
      await getPendingUploadJobs();

    return jobs.length > 0;
  };

/*
|--------------------------------------------------------------------------
| Get active upload
|--------------------------------------------------------------------------
*/

export const getActiveUpload =
  async () => {
    const jobs =
      await getPendingUploadJobs();

    if (!jobs.length) {
      return null;
    }

    return jobs[0];
  };

/*
|--------------------------------------------------------------------------
| Enqueue performance upload
|--------------------------------------------------------------------------
*/

export const enqueuePerformanceUpload =
  async ({
    videoUri,
    thumbnailUri,
    arenaId,
    ownerId,
    ownerEmail,
    description,
    region,
  }) => {
    /*
    |--------------------------------------------------------------------------
    | Only one unfinished upload at a time.
    |--------------------------------------------------------------------------
    */

    const queueBusy =
      await isUploadQueueBusy();

    if (queueBusy) {
      const activeJob =
        await getActiveUpload();

      const error =
        new Error(
          "You already have an upload in progress. Please wait until it finishes."
        );

      error.code =
        "UPLOAD_QUEUE_BUSY";

      error.jobId =
        activeJob?.id || null;

      throw error;
    }

    /*
    |--------------------------------------------------------------------------
    | Validate inputs
    |--------------------------------------------------------------------------
    */

    if (!videoUri) {
      throw new Error(
        "Video URI is required"
      );
    }

    if (!thumbnailUri) {
      throw new Error(
        "Thumbnail URI is required"
      );
    }

    if (!arenaId) {
      throw new Error(
        "Arena ID is required"
      );
    }

    if (!ownerId) {
      throw new Error(
        "Owner ID is required"
      );
    }

    if (!ownerEmail) {
      throw new Error(
        "Owner email is required"
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Generate job and persistent file paths.
    |--------------------------------------------------------------------------
    */

    const jobId =
      generateJobId();

    const jobDirectory =
      await getPerformanceJobDirectory(
        jobId
      );

    const videoExtension =
      getFileExtension(
        videoUri,
        ".mp4"
      );

    const thumbnailExtension =
      getFileExtension(
        thumbnailUri,
        ".jpg"
      );

    const persistentVideoUri =
      `${jobDirectory}video${videoExtension}`;

    const persistentThumbnailUri =
      `${jobDirectory}thumbnail${thumbnailExtension}`;

    /*
    |--------------------------------------------------------------------------
    | IMPORTANT:
    |
    | Create SQLite job BEFORE copying files.
    |
    | This gives us a durable record even if the app crashes while
    | copying a large file.
    |--------------------------------------------------------------------------
    */

    const job =
      await createUploadJob({
        id: jobId,

        type:
          UPLOAD_TYPE.PERFORMANCE,

        status:
          UPLOAD_STATUS.PENDING,

        arenaId,
        ownerId,
        ownerEmail,

        description,
        region,

        videoUri:
          persistentVideoUri,

        thumbnailUri:
          persistentThumbnailUri,
      });

    try {
      /*
      |--------------------------------------------------------------------------
      | Copy video into app-owned persistent storage.
      |--------------------------------------------------------------------------
      */

      await copyFileToUploadStorage(
        videoUri,
        persistentVideoUri
      );

      /*
      |--------------------------------------------------------------------------
      | Copy thumbnail.
      |--------------------------------------------------------------------------
      */

      await copyFileToUploadStorage(
        thumbnailUri,
        persistentThumbnailUri
      );
    } catch (error) {
      console.error(
        `❌ Failed to prepare upload files: ${jobId}`,
        error
      );

      /*
      |--------------------------------------------------------------------------
      | Remove anything that was successfully copied.
      |--------------------------------------------------------------------------
      */

      await deleteUploadFile(
        persistentVideoUri
      );

      await deleteUploadFile(
        persistentThumbnailUri
      );

      await cleanupPerformanceJobDirectory(
        jobId
      );

      await updateUploadJob(
        jobId,
        {
          videoUri: null,
          thumbnailUri: null,

          status:
            UPLOAD_STATUS.FAILED,

          error:
            error?.message ||
            "Failed to prepare upload files",
        }
      );

      throw error;
    }

    console.log(
      "📦 Upload job created:",
      jobId
    );

    notifyQueueBusy(
      jobId
    );

    /*
    |--------------------------------------------------------------------------
    | Start processing asynchronously.
    |
    | We intentionally do NOT await this.
    |--------------------------------------------------------------------------
    */

    processUploadQueue();

    return await getUploadJob(
      jobId
    );
  };

/*
|--------------------------------------------------------------------------
| Process queue
|--------------------------------------------------------------------------
*/

export const processUploadQueue =
  async () => {
    if (processingQueue) {
      return;
    }

    processingQueue = true;

    try {
      while (true) {
        const jobs =
          await getPendingUploadJobs();

        if (!jobs.length) {
          break;
        }

        /*
        |--------------------------------------------------------------------------
        | Queue is intentionally serial.
        |--------------------------------------------------------------------------
        */

        const job =
          jobs[0];

        await processUploadJob(
          job.id
        );
      }
    } catch (error) {
      console.error(
        "❌ Upload queue error:",
        error
      );
    } finally {
      processingQueue =
        false;

      const jobs =
        await getPendingUploadJobs();

      if (!jobs.length) {
        notifyQueueAvailable();
      }
    }
  };

/*
|--------------------------------------------------------------------------
| Process individual upload
|--------------------------------------------------------------------------
*/

export const processUploadJob =
  async (jobId) => {
    const job =
      await getUploadJob(
        jobId
      );

    if (!job) {
      console.log(
        `ℹ️ Upload job ${jobId} no longer exists`
      );

      return null;
    }

    if (
      job.status ===
      UPLOAD_STATUS.CANCELLED
    ) {
      notifyQueueAvailable(
        jobId,
        UPLOAD_STATUS.CANCELLED
      );

      return null;
    }

    /*
    |--------------------------------------------------------------------------
    | DO NOT require both files here.
    |
    | uploadProcessor decides what local file is required based on the
    | stage/result already persisted in SQLite.
    |--------------------------------------------------------------------------
    */

    try {
      const result =
        await processPerformanceUpload(
          jobId
        );

      console.log(
        `✅ Performance upload ${jobId} completed`
      );

      /*
      |--------------------------------------------------------------------------
      | IMPORTANT:
      |
      | Keep completed SQLite job until Arena consumes it.
      |--------------------------------------------------------------------------
      */

      notifyQueueAvailable(
        jobId,
        UPLOAD_STATUS.COMPLETED,
        result
      );

      return result;
    } catch (error) {
      console.error(
        `❌ Performance upload ${jobId} failed:`,
        error
      );

      /*
      |--------------------------------------------------------------------------
      | processPerformanceUpload already persisted FAILED state.
      |--------------------------------------------------------------------------
      */

      notifyQueueAvailable(
        jobId,
        UPLOAD_STATUS.FAILED,
        null,
        error
      );

      return null;
    }
  };

/*
|--------------------------------------------------------------------------
| Retry upload
|--------------------------------------------------------------------------
|
| Two possible retry scenarios:
|
| 1. Performance API failed AFTER video + thumbnail succeeded.
|    -> No local media is needed.
|
| 2. Video/thumbnail upload failed.
|    -> Local media was deleted.
|    -> Caller must provide new video/thumbnail URIs.
|--------------------------------------------------------------------------
*/

export const retryUpload =
  async (
    jobId,
    {
      videoUri = null,
      thumbnailUri = null,
    } = {}
  ) => {
    const queueBusy =
      await isUploadQueueBusy();

    if (queueBusy) {
      const activeJob =
        await getActiveUpload();

      if (
        activeJob?.id !== jobId
      ) {
        const error =
          new Error(
            "Another upload is currently in progress."
          );

        error.code =
          "UPLOAD_QUEUE_BUSY";

        throw error;
      }
    }

    const job =
      await getUploadJob(
        jobId
      );

    if (!job) {
      throw new Error(
        `Upload job ${jobId} not found`
      );
    }

    if (
      job.status !==
      UPLOAD_STATUS.FAILED
    ) {
      throw new Error(
        `Upload job ${jobId} is not in a failed state`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Determine whether video needs to be supplied again.
    |--------------------------------------------------------------------------
    */

    let nextVideoUri =
      job.videoUri;

    let nextThumbnailUri =
      job.thumbnailUri;

    /*
    |--------------------------------------------------------------------------
    | If video upload result is missing, we need local video.
    |--------------------------------------------------------------------------
    */

    if (
      !job.videoUploadResult
    ) {
      if (!videoUri) {
        throw new Error(
          "Please select the video again before retrying this upload."
        );
      }

      const jobDirectory =
        await getPerformanceJobDirectory(
          jobId
        );

      const extension =
        getFileExtension(
          videoUri,
          ".mp4"
        );

      nextVideoUri =
        `${jobDirectory}video${extension}`;

      await copyFileToUploadStorage(
        videoUri,
        nextVideoUri
      );
    }

    /*
    |--------------------------------------------------------------------------
    | If thumbnail upload result is missing, we need local thumbnail.
    |--------------------------------------------------------------------------
    */

    if (
      !job.thumbnailUploadResult
    ) {
      if (!thumbnailUri) {
        throw new Error(
          "Please select the thumbnail again before retrying this upload."
        );
      }

      const jobDirectory =
        await getPerformanceJobDirectory(
          jobId
        );

      const extension =
        getFileExtension(
          thumbnailUri,
          ".jpg"
        );

      nextThumbnailUri =
        `${jobDirectory}thumbnail${extension}`;

      await copyFileToUploadStorage(
        thumbnailUri,
        nextThumbnailUri
      );
    }

    await updateUploadJob(
      jobId,
      {
        status:
          UPLOAD_STATUS.PENDING,

        videoUri:
          nextVideoUri,

        thumbnailUri:
          nextThumbnailUri,

        error: null,
      }
    );

    notifyQueueBusy(
      jobId
    );

    processUploadQueue();

    return await getUploadJob(
      jobId
    );
  };

/*
|--------------------------------------------------------------------------
| Cancel upload
|--------------------------------------------------------------------------
*/

export const cancelUpload =
  async (jobId) => {
    const job =
      await getUploadJob(
        jobId
      );

    if (!job) {
      throw new Error(
        `Upload job ${jobId} not found`
      );
    }

    await updateUploadJob(
      jobId,
      {
        status:
          UPLOAD_STATUS.CANCELLED,

        error: null,
      }
    );

    console.log(
      `🛑 Upload job ${jobId} cancelled`
    );

    /*
    |--------------------------------------------------------------------------
    | Remove local media immediately.
    |--------------------------------------------------------------------------
    */

    if (job.videoUri) {
      await deleteUploadFile(
        job.videoUri
      );
    }

    if (job.thumbnailUri) {
      await deleteUploadFile(
        job.thumbnailUri
      );
    }

    await updateUploadJob(
      jobId,
      {
        videoUri: null,
        thumbnailUri: null,
      }
    );

    await cleanupPerformanceJobDirectory(
      jobId
    );

    notifyQueueAvailable(
      jobId,
      UPLOAD_STATUS.CANCELLED
    );

    return await getUploadJob(
      jobId
    );
  };

/*
|--------------------------------------------------------------------------
| Recover after app restart
|--------------------------------------------------------------------------
*/

export const recoverUploadQueue =
  async () => {
    try {
      const jobs =
        await getPendingUploadJobs();

      if (!jobs.length) {
        console.log(
          "📭 No unfinished uploads"
        );

        return;
      }

      console.log(
        `🔄 Recovering ${jobs.length} unfinished upload(s)`
      );

      /*
      |--------------------------------------------------------------------------
      | Reset interrupted transient states to PENDING.
      |
      | The processor will inspect persisted remote results and determine
      | exactly which stage needs to continue.
      |--------------------------------------------------------------------------
      */

      for (
        const job of jobs
      ) {
        if (
          job.status ===
            UPLOAD_STATUS.UPLOADING_VIDEO ||
          job.status ===
            UPLOAD_STATUS.UPLOADING_THUMBNAIL ||
          job.status ===
            UPLOAD_STATUS.ADDING_PERFORMANCE
        ) {
          await updateUploadJob(
            job.id,
            {
              status:
                UPLOAD_STATUS.PENDING,

              error: null,
            }
          );
        }
      }

      notifyQueueBusy(
        jobs[0].id
      );

      /*
      |--------------------------------------------------------------------------
      | Continue asynchronously from persisted state.
      |--------------------------------------------------------------------------
      */

      await processUploadQueue();
    } catch (error) {
      console.error(
        "❌ Failed to recover upload queue:",
        error
      );
    }
  };

/*
|--------------------------------------------------------------------------
| Get unfinished queue
|--------------------------------------------------------------------------
*/

export const getUploadQueue =
  async () => {
    return await getPendingUploadJobs();
  };

/*
|--------------------------------------------------------------------------
| Get completed uploads
|--------------------------------------------------------------------------
*/

export const getCompletedUploads =
  async () => {
    return await getCompletedUploadJobs();
  };

/*
|--------------------------------------------------------------------------
| Consume completed upload
|--------------------------------------------------------------------------
|
| Arena calls this after applying performanceResult.
|
| There should normally be no media left at this point, but the storage
| cleanup remains idempotent as a safety net.
|--------------------------------------------------------------------------
*/

export const consumeCompletedUpload =
  async (jobId) => {
    const job =
      await getUploadJob(
        jobId
      );

    if (!job) {
      return null;
    }

    if (
      job.status !==
      UPLOAD_STATUS.COMPLETED
    ) {
      return null;
    }

    const result =
      job.performanceResult;

    await removeCompletedUploadJob(
      jobId
    );

    console.log(
      `🧹 Completed upload ${jobId} consumed`
    );

    return result;
  };