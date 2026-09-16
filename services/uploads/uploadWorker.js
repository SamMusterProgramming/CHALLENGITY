import {
    getUploadJob,
    getPendingUploadJobs,
    updateUploadJob,
    removeCompletedUploadJob,
  } from "./uploadStorage";
  
  import {
    UPLOAD_STATUS,
    UPLOAD_TYPE,
  } from "./uploadTypes";
  
  import {
    processPerformanceUpload,
  } from "./handlers/performance";
  
  import {
    processProfileUpload,
  } from "./handlers/profile";
  
  import {
    processCoverUpload,
  } from "./handlers/cover";
  
  /*
  |--------------------------------------------------------------------------
  | Worker state
  |--------------------------------------------------------------------------
  */
  
  let workerRunning = false;
  
  /*
  |--------------------------------------------------------------------------
  | Queue listeners
  |--------------------------------------------------------------------------
  */
  
  const queueListeners = new Set();
  
  export const subscribeToUploadWorker =
    (callback) => {
      if (
        typeof callback !== "function"
      ) {
        throw new Error(
          "Upload worker listener must be a function"
        );
      }
  
      queueListeners.add(callback);
  
      return () => {
        queueListeners.delete(callback);
      };
    };
  
  const notifyWorker = (data) => {
    for (
      const callback of queueListeners
    ) {
      try {
        callback(data);
      } catch (error) {
        console.error(
          "❌ Upload worker listener error:",
          error
        );
      }
    }
  };
  
  /*
  |--------------------------------------------------------------------------
  | Is worker running
  |--------------------------------------------------------------------------
  */
  
  export const isUploadWorkerRunning =
    () => {
      return workerRunning;
    };
  
  /*
  |--------------------------------------------------------------------------
  | Process queue
  |--------------------------------------------------------------------------
  |
  | ONE worker only.
  |
  | Jobs are always selected by created_at ASC.
  |
  | If the current job becomes PENDING because of a temporary interruption,
  | the worker stops instead of immediately retrying in a tight loop.
  |--------------------------------------------------------------------------
  */
  
  export const processUploadQueue =
    async () => {
      if (workerRunning) {
        return;
      }
  
      workerRunning = true;
  
      notifyWorker({
        event: "worker_started",
      });
  
      try {
        while (true) {
          const jobs =
            await getPendingUploadJobs();
  
          if (!jobs.length) {
            break;
          }
  
          /*
          |--------------------------------------------------------------------------
          | FCFS
          |--------------------------------------------------------------------------
          */
  
          const job = jobs[0];
  
          notifyWorker({
            event: "job_started",
            job,
          });
  
          const result =
            await processUploadJob(
              job.id
            );
  
          /*
          |--------------------------------------------------------------------------
          | Re-read the job after processing.
          |--------------------------------------------------------------------------
          */
  
          const currentJob =
            await getUploadJob(
              job.id
            );
  
          if (!currentJob) {
            continue;
          }
  
          /*
          |--------------------------------------------------------------------------
          | Temporary interruption
          |--------------------------------------------------------------------------
          |
          | The handler intentionally changes the job back to PENDING.
          |
          | STOP here.
          |
          | We must NOT immediately process the same job again because that
          | creates a tight retry loop.
          |--------------------------------------------------------------------------
          */
  
          if (
            currentJob.status ===
            UPLOAD_STATUS.PENDING
          ) {
            notifyWorker({
              event:
                "job_waiting_for_recovery",
              job: currentJob,
              result,
            });
  
            break;
          }
  
          /*
          |--------------------------------------------------------------------------
          | Failed job
          |--------------------------------------------------------------------------
          |
          | Do not allow later jobs to pass a failed job automatically.
          | The user/recovery logic can explicitly retry it.
          |--------------------------------------------------------------------------
          */
  
          if (
            currentJob.status ===
            UPLOAD_STATUS.FAILED
          ) {
            notifyWorker({
              event:
                "job_failed",
              job: currentJob,
              result,
            });
  
            break;
          }
  
          /*
          |--------------------------------------------------------------------------
          | Cancelled job
          |--------------------------------------------------------------------------
          */
  
          if (
            currentJob.status ===
            UPLOAD_STATUS.CANCELLED
          ) {
            notifyWorker({
              event:
                "job_cancelled",
              job: currentJob,
            });
  
            continue;
          }
  
          /*
          |--------------------------------------------------------------------------
          | Completed job
          |--------------------------------------------------------------------------
          |
          | Performance completed jobs remain in SQLite until consumed.
          | That does NOT make them pending, so the next queued job can run.
          |--------------------------------------------------------------------------
          */
  
          if (
            currentJob.status ===
            UPLOAD_STATUS.COMPLETED
          ) {
            continue;
          }
  
          /*
          |--------------------------------------------------------------------------
          | Safety
          |--------------------------------------------------------------------------
          |
          | If a handler unexpectedly leaves the job in another state,
          | stop rather than accidentally running another job.
          |--------------------------------------------------------------------------
          */
  
          notifyWorker({
            event:
              "job_waiting",
            job: currentJob,
          });
  
          break;
        }
      } catch (error) {
        console.error(
          "❌ Upload worker error:",
          error
        );
  
        notifyWorker({
          event:
            "worker_error",
          error,
        });
      } finally {
        workerRunning = false;
  
        const remainingJobs =
          await getPendingUploadJobs();
  
        notifyWorker({
          event:
            "worker_stopped",
          busy:
            remainingJobs.length > 0,
          jobs:
            remainingJobs,
        });
      }
    };
  
  /*
  |--------------------------------------------------------------------------
  | Process one job
  |--------------------------------------------------------------------------
  */

  export const recoverUploadQueue =
  async () => {
    try {
      const jobs =
        await getPendingUploadJobs();

      if (!jobs.length) {
        console.log(
          "📭 No unfinished uploads to recover"
        );

        return;
      }

      console.log(
        `🔄 Recovering ${jobs.length} upload(s)`
      );

      /*
      |--------------------------------------------------------------------------
      | Do NOT reset job states here.
      |
      | The native uploader may still be running after the JS process
      | disappeared. processUploadJob() will inspect the persisted job
      | and native upload state.
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

    /*
    |--------------------------------------------------------------------------
    | Cancelled jobs are skipped.
    |--------------------------------------------------------------------------
    */

    if (
      job.status ===
      UPLOAD_STATUS.CANCELLED
    ) {
      notifyWorker({
        event:
          "job_cancelled",
        job,
      });

      return null;
    }

    try {
      let result = null;

      /*
      |--------------------------------------------------------------------------
      | Run the correct handler.
      |--------------------------------------------------------------------------
      */

      switch (job.type) {
        case UPLOAD_TYPE.PERFORMANCE:
          result =
            await processPerformanceUpload(
              jobId
            );
          break;

        case UPLOAD_TYPE.PROFILE:
          result =
            await processProfileUpload(
              jobId
            );
          break;

        case UPLOAD_TYPE.COVER:
          result =
            await processCoverUpload(
              jobId
            );
          break;

        default:
          throw new Error(
            `Unsupported upload type: ${job.type}`
          );
      }

      /*
      |--------------------------------------------------------------------------
      | Get the final persisted job.
      |--------------------------------------------------------------------------
      */

      const completedJob =
        await getUploadJob(
          jobId
        );

      /*
      |--------------------------------------------------------------------------
      | PROFILE / COVER
      |--------------------------------------------------------------------------
      
      */

      if (
        completedJob &&
        completedJob.status ===
          UPLOAD_STATUS.COMPLETED &&
        (
          completedJob.type ===
            UPLOAD_TYPE.PROFILE ||
          completedJob.type ===
            UPLOAD_TYPE.COVER
        )
      ) {
        notifyWorker({
          event:
            "job_completed",
          job:
            completedJob,
          result,
        });

        await removeCompletedUploadJob(
          jobId
        );

        console.log(
          `🧹 Completed image upload job removed: ${jobId}`
        );

        return result;
      }

      /*
      |--------------------------------------------------------------------------
      | PERFORMANCE
      |--------------------------------------------------------------------------
      */

      notifyWorker({
        event:
          "job_completed",
        job:
          completedJob,
        result,
      });

      return result;
    } catch (error) {
      console.error(
        `❌ Upload job ${jobId} failed:`,
        error
      );

      /*
      |--------------------------------------------------------------------------
      | The handler decides the persisted state.
      |--------------------------------------------------------------------------
      */

      const currentJob =
        await getUploadJob(
          jobId
        );

      if (
        currentJob &&
        currentJob.status !==
          UPLOAD_STATUS.PENDING &&
        currentJob.status !==
          UPLOAD_STATUS.FAILED &&
        currentJob.status !==
          UPLOAD_STATUS.CANCELLED &&
        currentJob.status !==
          UPLOAD_STATUS.COMPLETED
      ) {
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
      }

      const finalJob =
        await getUploadJob(
          jobId
        );

      notifyWorker({
        event:
          finalJob?.status ===
          UPLOAD_STATUS.PENDING
            ? "job_waiting_for_recovery"
            : "job_failed",

        job:
          finalJob,

        error,
      });

      return null;
    }
  };