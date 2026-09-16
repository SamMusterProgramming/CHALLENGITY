import { Platform } from "react-native";

import ItriUpload from "itri-upload";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Parse native status
|--------------------------------------------------------------------------
*/

const getParsedNativeStatus =
  async (nativeJobId) => {
    const statusJson =
      await ItriUpload.getUploadStatus(
        nativeJobId
      );

    if (!statusJson) {
      return null;
    }

    try {
      return JSON.parse(
        statusJson
      );
    } catch {
      console.warn(
        `⚠️ Invalid native upload state: ${nativeJobId}`,
        statusJson
      );

      return null;
    }
  };

/*
|--------------------------------------------------------------------------
| Android JobScheduler inspection
|--------------------------------------------------------------------------
*/

const getAndroidNativeJobInfo =
  async (nativeJobId) => {
    if (
      Platform.OS !== "android"
    ) {
      return null;
    }

    const infoJson =
      await ItriUpload.getUploadJobInfo(
        nativeJobId
      );

    if (!infoJson) {
      throw new Error(
        `Android native job information unavailable: ${nativeJobId}`
      );
    }

    try {
      return JSON.parse(
        infoJson
      );
    } catch {
      throw new Error(
        `Invalid Android native job information: ${nativeJobId}`
      );
    }
  };

/*
|--------------------------------------------------------------------------
| Wait for native upload
|--------------------------------------------------------------------------
*/

export const waitForNativeUpload =
  async (
    nativeJobId,
    fileName
  ) => {
    while (true) {
      const state =
        await getParsedNativeStatus(
          nativeJobId
        );

      if (!state) {
        await wait(1000);
        continue;
      }

      const status =
        state.status;

      /*
      |--------------------------------------------------------------------------
      | Native upload still active
      |--------------------------------------------------------------------------
      */

      if (
        status === "SCHEDULED" ||
        status === "UPLOADING" ||
        status === "STOPPED"
      ) {
        await wait(1000);
        continue;
      }

      /*
      |--------------------------------------------------------------------------
      | Native upload completed
      |--------------------------------------------------------------------------
      */

      if (
        status === "COMPLETED"
      ) {
        if (!state.response) {
          throw new Error(
            `Native upload completed without a response: ${nativeJobId}`
          );
        }

        try {
          return JSON.parse(
            state.response
          );
        } catch {
          throw new Error(
            `Invalid upload response for ${fileName}`
          );
        }
      }

      /*
      |--------------------------------------------------------------------------
      | Native upload cancelled
      |--------------------------------------------------------------------------
      */

      if (
        status === "CANCELLED"
      ) {
        throw new Error(
          `Upload cancelled: ${fileName}`
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Native upload failed
      |--------------------------------------------------------------------------
      */

      if (
        status === "FAILED"
      ) {
        throw new Error(
          state.error ||
            `Upload failed: ${fileName}`
        );
      }

      console.warn(
        `⚠️ Unknown native upload state for ${nativeJobId}:`,
        state
      );

      await wait(1000);
    }
  };

/*
|--------------------------------------------------------------------------
| Start native upload safely
|--------------------------------------------------------------------------
*/

export const startNativeUpload =
  async ({
    nativeJobId,
    uploadUrl,
    authorizationToken,
    fileUri,
    fileName,
    contentType,
  }) => {
    if (!nativeJobId) {
      throw new Error(
        "Native upload job ID is required"
      );
    }

    if (!uploadUrl) {
      throw new Error(
        "Upload URL is required"
      );
    }

    if (!authorizationToken) {
      throw new Error(
        "Upload authorization token is required"
      );
    }

    if (!fileUri) {
      throw new Error(
        "Upload file is required"
      );
    }

    if (!fileName) {
      throw new Error(
        "Upload file name is required"
      );
    }

    if (!contentType) {
      throw new Error(
        "Upload content type is required"
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Check existing native state first
    |--------------------------------------------------------------------------
    */

    const existingState =
      await getParsedNativeStatus(
        nativeJobId
      );

    /*
    |--------------------------------------------------------------------------
    | Already completed
    |--------------------------------------------------------------------------
    */

    if (
      existingState?.status ===
      "COMPLETED"
    ) {
      if (!existingState.response) {
        throw new Error(
          `Native upload completed without a response: ${nativeJobId}`
        );
      }

      try {
        return JSON.parse(
          existingState.response
        );
      } catch {
        throw new Error(
          `Invalid upload response for ${fileName}`
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Already cancelled
    |--------------------------------------------------------------------------
    */

    if (
      existingState?.status ===
      "CANCELLED"
    ) {
      throw new Error(
        `Upload cancelled: ${fileName}`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Android reconciliation
    |--------------------------------------------------------------------------
    */

    if (
      Platform.OS === "android" &&
      existingState &&
      (
        existingState.status ===
          "SCHEDULED" ||
        existingState.status ===
          "UPLOADING" ||
        existingState.status ===
          "STOPPED"
      )
    ) {
      let nativeJobInfo;

      try {
        nativeJobInfo =
          await getAndroidNativeJobInfo(
            nativeJobId
          );
      } catch (error) {
        console.warn(
          `⚠️ Cannot safely inspect Android upload job: ${nativeJobId}`,
          error
        );

        /*
        |--------------------------------------------------------------------------
        | STOPPED
        |
        | The native execution is already interrupted. Restart from the
        | persistent local file instead of waiting forever.
        |--------------------------------------------------------------------------
        */

        if (
          existingState.status ===
          "STOPPED"
        ) {
          console.log(
            `🔄 Android upload is STOPPED and job inspection failed, restarting: ${nativeJobId}`
          );

          /*
          |--------------------------------------------------------------------------
          | Fall through to ItriUpload.startUpload().
          |--------------------------------------------------------------------------
          */

          nativeJobInfo = null;
        } else {
          /*
          |--------------------------------------------------------------------------
          | SCHEDULED / UPLOADING
          |
          | The native job may still be alive. Do not risk creating a
          | duplicate B2 upload when JobScheduler cannot be inspected.
          |--------------------------------------------------------------------------
          */

          return await waitForNativeUpload(
            nativeJobId,
            fileName
          );
        }
      }

      if (nativeJobInfo) {
        const nativeJobExists =
          nativeJobInfo.scheduled === true;

        const userStopped =
          nativeJobInfo.userStopped === true;

        /*
        |--------------------------------------------------------------------------
        | Native Android job still exists
        |--------------------------------------------------------------------------
        */

        if (
          nativeJobExists &&
          !userStopped
        ) {
          return await waitForNativeUpload(
            nativeJobId,
            fileName
          );
        }

        /*
        |--------------------------------------------------------------------------
        | User explicitly stopped the app/job
        |--------------------------------------------------------------------------
        */

        if (userStopped) {
          console.log(
            `🔄 Android upload was user-stopped, restarting: ${nativeJobId}`
          );
        }

        /*
        |--------------------------------------------------------------------------
        | Native job disappeared
        |--------------------------------------------------------------------------
        */

        if (!nativeJobExists) {
          console.log(
            `🔁 Android native job no longer exists, restarting: ${nativeJobId}`
          );
        }
      }

    }

    /*
    |--------------------------------------------------------------------------
    | iOS existing native state
    |--------------------------------------------------------------------------
    */

    if (
      Platform.OS === "ios" &&
      existingState &&
      (
        existingState.status ===
          "SCHEDULED" ||
        existingState.status ===
          "UPLOADING" ||
        existingState.status ===
          "STOPPED"
      )
    ) {
      return await waitForNativeUpload(
        nativeJobId,
        fileName
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Previous native failure
    |--------------------------------------------------------------------------
    */

    if (
      existingState?.status ===
      "FAILED"
    ) {
      console.log(
        `🔁 Previous native upload failed, restarting: ${nativeJobId}`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Start new native upload
    |--------------------------------------------------------------------------
    */

    const filePath =
      getNativeFilePath(
        fileUri
      );

    await ItriUpload.startUpload(
      nativeJobId,
      uploadUrl,
      authorizationToken,
      filePath,
      fileName,
      contentType
    );

    return await waitForNativeUpload(
      nativeJobId,
      fileName
    );
  };

/*
|--------------------------------------------------------------------------
| Cancel native upload
|--------------------------------------------------------------------------
*/

export const cancelNativeUpload =
  async (nativeJobId) => {
    if (!nativeJobId) {
      throw new Error(
        "Native upload job ID is required"
      );
    }

    return await ItriUpload.cancelUpload(
      nativeJobId
    );
  };

/*
|--------------------------------------------------------------------------
| Get native upload status
|--------------------------------------------------------------------------
*/

export const getNativeUploadStatus =
  async (nativeJobId) => {
    if (!nativeJobId) {
      throw new Error(
        "Native job ID is required"
      );
    }

    return await getParsedNativeStatus(
      nativeJobId
    );
  };