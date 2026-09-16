/*
|--------------------------------------------------------------------------
| Upload types
|--------------------------------------------------------------------------
*/

export {
    UPLOAD_TYPE,
    UPLOAD_STATUS,
  } from "./uploadTypes";
  
  /*
  |--------------------------------------------------------------------------
  | Storage initialization
  |--------------------------------------------------------------------------
  */
  
  export {
    initializeUploadStorage,
  } from "./uploadStorage";
  
  /*
  |--------------------------------------------------------------------------
  | Queue
  |--------------------------------------------------------------------------
  */
  
  export {
    enqueueUploadJob,
    enqueuePerformanceUpload,
    enqueueProfileUpload,
    enqueueCoverUpload,
    isUploadQueueBusy,
    getActiveUpload,
    getUploadQueue,
    getAllJobs,
    getCompletedUploads,
    getQueuedUpload,
    updateQueuedUpload,
    cancelQueuedUpload,
    removeUploadJob,
    notifyUploadQueue,
    subscribeToUploadQueue,
   
  } from "./uploadQueue";
  
  /*
  |--------------------------------------------------------------------------
  | Worker
  |--------------------------------------------------------------------------
  */
  
  export {
    processUploadQueue,
    processUploadJob,
    isUploadWorkerRunning,
    subscribeToUploadWorker,
    recoverUploadQueue
  } from "./uploadWorker";
  
  /*
  |--------------------------------------------------------------------------
  | Native uploader
  |--------------------------------------------------------------------------
  */
  
  export {
    startNativeUpload,
    waitForNativeUpload,
    cancelNativeUpload,
    getNativeUploadStatus,
  } from "./uploadNative";