import {
    createUploadJob,
    getUploadJob,
    getPendingUploadJobs,
    getAllUploadJobs,
    getCompletedUploadJobs,
    updateUploadJob,
    removeCompletedUploadJob,
    getJobDirectory,
    copyFileToUploadStorage,
    deleteUploadFile,
    deleteJobFiles,
  } from "./uploadStorage";
  
  import {
    UPLOAD_STATUS,
    UPLOAD_TYPE,
  } from "./uploadTypes";
  
  import {
    processUploadQueue,
    subscribeToUploadWorker,
  } from "./uploadWorker";
  
  import {
    cancelNativeUpload,
  } from "./uploadNative";
  
  /*
  |--------------------------------------------------------------------------
  | Queue listeners
  |--------------------------------------------------------------------------
  */
  
  const queueListeners =
    new Set();
  
  export const subscribeToUploadQueue =
    (callback) => {
      if (
        typeof callback !== "function"
      ) {
        throw new Error(
          "Upload queue listener must be a function"
        );
      }
  
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
  
  /*
  |--------------------------------------------------------------------------
  | Forward worker events to queue subscribers
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  | This is registered ONCE when this module loads.
  |
  | It must NOT be inside enqueuePerformanceUpload(),
  | enqueueProfileUpload(), or enqueueCoverUpload().
  |--------------------------------------------------------------------------
  */
  
  subscribeToUploadWorker(
    async ({
      event,
      job,
      result,
      error,
    }) => {
      try {
        const pendingJobs =
          await getPendingUploadJobs();
  
        notifyQueueListeners({
          event,
          job,
  
          busy:
            pendingJobs.length > 0,
  
          status:
            job?.status ?? null,
  
          result:
            result ??
            job?.result ??
            null,
  
          error:
            error ??
            job?.error ??
            null,
        });
      } catch (queueError) {
        console.error(
          "❌ Failed to forward upload worker event:",
          queueError
        );
      }
    }
  );
  
  /*
  |--------------------------------------------------------------------------
  | Job ID
  |--------------------------------------------------------------------------
  */
  
  export const generateUploadJobId =
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
  | Generic enqueue
  |--------------------------------------------------------------------------
  */
  
  export const enqueueUploadJob =
    async ({
      type,
      payload = {},
    }) => {
      if (!type) {
        throw new Error(
          "Upload job type is required"
        );
      }
  
      if (
        payload == null ||
        typeof payload !== "object" ||
        Array.isArray(payload)
      ) {
        throw new Error(
          "Upload job payload must be an object"
        );
      }
  
      const jobId =
        generateUploadJobId();
  
      const job =
        await createUploadJob({
          id: jobId,
          type,
          status:
            UPLOAD_STATUS.PENDING,
          payload,
        });
  
      console.log(
        "📦 Upload job queued:",
        jobId,
        type
      );
  
      notifyQueueListeners({
        event: "enqueued",
        job,
        busy: true,
      });
  
      processUploadQueue();
  
      return await getUploadJob(
        jobId
      );
    };
  
  /*
  |--------------------------------------------------------------------------
  | Performance enqueue
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
  
      const jobId =
        generateUploadJobId();
  
      const jobDirectory =
        await getJobDirectory(
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
  
      const job =
        await createUploadJob({
          id: jobId,
  
          type:
            UPLOAD_TYPE.PERFORMANCE,
  
          status:
            UPLOAD_STATUS.PENDING,
  
          payload: {
            arenaId,
            ownerId,
            ownerEmail,
            description,
            region,
            videoUri:
              persistentVideoUri,
            thumbnailUri:
              persistentThumbnailUri,
          },
        });
  
      try {
        await copyFileToUploadStorage(
          videoUri,
          persistentVideoUri
        );
  
        await copyFileToUploadStorage(
          thumbnailUri,
          persistentThumbnailUri
        );
      } catch (error) {
        console.error(
          `❌ Failed to prepare Performance upload: ${jobId}`,
          error
        );
  
        await deleteUploadFile(
          persistentVideoUri
        );
  
        await deleteUploadFile(
          persistentThumbnailUri
        );
  
        await deleteJobFiles(
          jobId
        );
  
        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.FAILED,
  
            payload: {
              ...job.payload,
              videoUri: null,
              thumbnailUri: null,
            },
  
            error:
              error?.message ||
              "Failed to prepare Performance upload",
          }
        );
  
        throw error;
      }
  
      const preparedJob =
        await getUploadJob(
          jobId
        );
  
      console.log(
        "📦 Performance upload queued:",
        jobId
      );
  
      notifyQueueListeners({
        event: "enqueued",
        job: preparedJob,
        busy: true,
      });
  
      processUploadQueue();
  
      return preparedJob;
    };
  
  /*
  |--------------------------------------------------------------------------
  | Profile enqueue
  |--------------------------------------------------------------------------
  */
  
  export const enqueueProfileUpload =
    async ({
      userId,
      userEmail,
      imageUri,
      deleteFileId = null,
      deleteFileName = null,
    }) => {
      if (!userId) {
        throw new Error(
          "User ID is required"
        );
      }
  
      if (!userEmail) {
        throw new Error(
          "User email is required"
        );
      }
  
      if (!imageUri) {
        throw new Error(
          "Profile image URI is required"
        );
      }
  
      const jobId =
        generateUploadJobId();
  
      const jobDirectory =
        await getJobDirectory(
          jobId
        );
  
      const extension =
        getFileExtension(
          imageUri,
          ".jpg"
        );
  
      const persistentImageUri =
        `${jobDirectory}image${extension}`;
  
      const job =
        await createUploadJob({
          id: jobId,
  
          type:
            UPLOAD_TYPE.PROFILE,
  
          status:
            UPLOAD_STATUS.PENDING,
  
          payload: {
            userId,
            userEmail,
            imageUri:
              persistentImageUri,
            deleteFileId,
            deleteFileName,
          },
        });
  
      try {
        await copyFileToUploadStorage(
          imageUri,
          persistentImageUri
        );
      } catch (error) {
        console.error(
          `❌ Failed to prepare profile upload: ${jobId}`,
          error
        );
  
        await deleteUploadFile(
          persistentImageUri
        );
  
        await deleteJobFiles(
          jobId
        );
  
        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.FAILED,
  
            payload: {
              ...job.payload,
              imageUri: null,
            },
  
            error:
              error?.message ||
              "Failed to prepare profile upload",
          }
        );
  
        throw error;
      }
  
      const preparedJob =
        await getUploadJob(
          jobId
        );
  
      console.log(
        "📦 Profile upload queued:",
        jobId
      );
  
      notifyQueueListeners({
        event: "enqueued",
        job: preparedJob,
        busy: true,
      });
  
      processUploadQueue();
  
      return preparedJob;
    };
  
  /*
  |--------------------------------------------------------------------------
  | Cover enqueue
  |--------------------------------------------------------------------------
  */
  
  export const enqueueCoverUpload =
    async ({
      userId,
      userEmail,
      imageUri,
      deleteFileId = null,
      deleteFileName = null,
    }) => {
      if (!userId) {
        throw new Error(
          "User ID is required"
        );
      }
  
      if (!userEmail) {
        throw new Error(
          "User email is required"
        );
      }
  
      if (!imageUri) {
        throw new Error(
          "Cover image URI is required"
        );
      }
  
      const jobId =
        generateUploadJobId();
  
      const jobDirectory =
        await getJobDirectory(
          jobId
        );
  
      const extension =
        getFileExtension(
          imageUri,
          ".jpg"
        );
  
      const persistentImageUri =
        `${jobDirectory}image${extension}`;
  
      const job =
        await createUploadJob({
          id: jobId,
  
          type:
            UPLOAD_TYPE.COVER,
  
          status:
            UPLOAD_STATUS.PENDING,
  
          payload: {
            userId,
            userEmail,
            imageUri:
              persistentImageUri,
            deleteFileId,
            deleteFileName,
          },
        });
  
      try {
        await copyFileToUploadStorage(
          imageUri,
          persistentImageUri
        );
      } catch (error) {
        console.error(
          `❌ Failed to prepare cover upload: ${jobId}`,
          error
        );
  
        await deleteUploadFile(
          persistentImageUri
        );
  
        await deleteJobFiles(
          jobId
        );
  
        await updateUploadJob(
          jobId,
          {
            status:
              UPLOAD_STATUS.FAILED,
  
            payload: {
              ...job.payload,
              imageUri: null,
            },
  
            error:
              error?.message ||
              "Failed to prepare cover upload",
          }
        );
  
        throw error;
      }
  
      const preparedJob =
        await getUploadJob(
          jobId
        );
  
      console.log(
        "📦 Cover upload queued:",
        jobId
      );
  
      notifyQueueListeners({
        event: "enqueued",
        job: preparedJob,
        busy: true,
      });
  
      processUploadQueue();
  
      return preparedJob;
    };
  
  /*
  |--------------------------------------------------------------------------
  | Queue status
  |--------------------------------------------------------------------------
  */
  
  export const isUploadQueueBusy =
    async () => {
      const jobs =
        await getPendingUploadJobs();
  
      return jobs.length > 0;
    };
  
  export const getActiveUpload =
    async () => {
      const jobs =
        await getPendingUploadJobs();
  
      return jobs.length
        ? jobs[0]
        : null;
    };
  
  export const getUploadQueue =
    async () => {
      return await getPendingUploadJobs();
    };
  
  export const getAllJobs =
    async () => {
      return await getAllUploadJobs();
    };
  
  export const getCompletedUploads =
    async () => {
      return await getCompletedUploadJobs();
    };
  
  export const getQueuedUpload =
    async (jobId) => {
      return await getUploadJob(
        jobId
      );
    };
  
  export const updateQueuedUpload =
    async (
      jobId,
      updates = {}
    ) => {
      return await updateUploadJob(
        jobId,
        updates
      );
    };
  
  /*
  |--------------------------------------------------------------------------
  | Cancel
  |--------------------------------------------------------------------------
  */
  
  export const cancelQueuedUpload =
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
  
      if (
        job.status ===
          UPLOAD_STATUS.COMPLETED ||
        job.status ===
          UPLOAD_STATUS.FAILED ||
        job.status ===
          UPLOAD_STATUS.CANCELLED
      ) {
        return job;
      }
  
      /*
      |--------------------------------------------------------------------------
      | Cancel native upload first
      |--------------------------------------------------------------------------
      |
      | Performance:
      |   <jobId>_video
      |   <jobId>_thumbnail
      |
      | Profile / Cover:
      |   <jobId>
      |--------------------------------------------------------------------------
      */
  
      if (
        job.type ===
        UPLOAD_TYPE.PERFORMANCE
      ) {
        try {
          await cancelNativeUpload(
            `${jobId}_video`
          );
        } catch (error) {
          console.warn(
            `⚠️ Failed to cancel native video upload: ${jobId}`,
            error
          );
        }
  
        try {
          await cancelNativeUpload(
            `${jobId}_thumbnail`
          );
        } catch (error) {
          console.warn(
            `⚠️ Failed to cancel native thumbnail upload: ${jobId}`,
            error
          );
        }
      } else {
        try {
          await cancelNativeUpload(
            jobId
          );
        } catch (error) {
          console.warn(
            `⚠️ Failed to cancel native upload: ${jobId}`,
            error
          );
        }
      }
  
      await updateUploadJob(
        jobId,
        {
          status:
            UPLOAD_STATUS.CANCELLED,
          error: null,
        }
      );
  
      if (
        job.payload?.videoUri
      ) {
        await deleteUploadFile(
          job.payload.videoUri
        );
      }
  
      if (
        job.payload?.thumbnailUri
      ) {
        await deleteUploadFile(
          job.payload.thumbnailUri
        );
      }
  
      if (
        job.payload?.imageUri
      ) {
        await deleteUploadFile(
          job.payload.imageUri
        );
      }
  
      await deleteJobFiles(
        jobId
      );
  
      const updatedJob =
        await updateUploadJob(
          jobId,
          {
            payload: {
              ...(job.payload || {}),
              videoUri: null,
              thumbnailUri: null,
              imageUri: null,
            },
          }
        );
  
      notifyQueueListeners({
        event: "cancelled",
        job: updatedJob,
        busy:
          await isUploadQueueBusy(),
      });
  
      return updatedJob;
    };
  
  /*
  |--------------------------------------------------------------------------
  | Remove completed job
  |--------------------------------------------------------------------------
  */
  
  export const removeUploadJob =
    async (jobId) => {
      await removeCompletedUploadJob(
        jobId
      );
  
      notifyQueueListeners({
        event: "removed",
        jobId,
        busy:
          await isUploadQueueBusy(),
      });
  
      return true;
    };
  
  /*
  |--------------------------------------------------------------------------
  | Notify
  |--------------------------------------------------------------------------
  */
  
  export const notifyUploadQueue =
    async () => {
      const jobs =
        await getPendingUploadJobs();
  
      notifyQueueListeners({
        event:
          "queue_changed",
        busy:
          jobs.length > 0,
        activeJob:
          jobs[0] || null,
        jobs,
      });
    };