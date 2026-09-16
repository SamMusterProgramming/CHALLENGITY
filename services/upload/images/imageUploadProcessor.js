// services/uploads/images/imageUploadProcessor.js

import { Platform } from "react-native";

import ItriUpload from "itri-upload";

import {
  getUploadImageUrl,
  saveProfileImageToDataBase,
  saveCoverImageToDataBase,
} from "../../../uploadFileToBlackBlaze";

import { compressImage } from "../../../utilities/fileCompressor";

import {
  IMAGE_UPLOAD_STATUS,
  IMAGE_UPLOAD_TYPE,
} from "./imageUploadTypes";

import {
  getImageUploadJob,
  createImageUploadJob,
  updateImageUploadJob,
  getImageUploadJobDirectory,
  copyImageToUploadStorage,
  deleteImageUploadFile,
  removeCompletedImageUploadJob,
} from "./imageUploadStorage";

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
        `⚠️ Invalid native image upload state: ${jobId}`,
        statusJson
      );

      await wait(1000);
      continue;
    }

    const status = state?.status;

    if (
      status === "SCHEDULED" ||
      status === "STOPPED"
    ) {
      await wait(1000);
      continue;
    }

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
          `⬆️ Image upload ${jobId}: ${percent}%`
        );
      }

      await wait(1000);
      continue;
    }

    if (status === "COMPLETED") {
      if (!state.response) {
        throw new Error(
          `Native image upload completed without a response: ${jobId}`
        );
      }

      try {
        return JSON.parse(
          state.response
        );
      } catch (error) {
        throw new Error(
          `Invalid image upload response for ${fileName}`
        );
      }
    }

    if (status === "CANCELLED") {
      throw new Error(
        `Image upload cancelled: ${fileName}`
      );
    }

    if (status === "FAILED") {
      throw new Error(
        state.error ||
          `Image upload failed: ${fileName}`
      );
    }

    await wait(1000);
  }
};

const startNativeImageUpload = async (
  jobId,
  uploadData,
  imageUri,
  contentType
) => {
  const filePath =
    getNativeFilePath(imageUri);

  await ItriUpload.startUpload(
    jobId,
    uploadData.uploadUrl,
    uploadData.authorizationToken,
    filePath,
    uploadData.fileName,
    contentType
  );

  return waitForNativeUpload(
    jobId,
    uploadData.fileName
  );
};

const createPersistentImageJob = async ({
  imageUri,
  user,
  type,
}) => {
  const jobId =
    `image_${type}_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 10)}`;

  const compressedUri =
    await compressImage(imageUri);

  if (!compressedUri) {
    throw new Error(
      "Image compression failed"
    );
  }

  const directory =
    await getImageUploadJobDirectory(
      jobId
    );

  const persistentUri =
    `${directory}image.jpg`;

  await copyImageToUploadStorage(
    compressedUri,
    persistentUri
  );

  const job =
    await createImageUploadJob({
      id: jobId,
      type,
      status: IMAGE_UPLOAD_STATUS.PENDING,
      userId: user._id,
      userEmail: user.email,
      imageUri: persistentUri,
      fileName: "image.jpg",
      contentType: "image/jpeg",
    });

  await deleteImageUploadFile(
    compressedUri
  );

  return job;
};

const processImageJob = async (
  jobId
) => {
  const job =
    await getImageUploadJob(jobId);

  if (!job) {
    throw new Error(
      `Image upload job ${jobId} not found`
    );
  }

  await updateImageUploadJob(
    jobId,
    {
      status:
        IMAGE_UPLOAD_STATUS.UPLOADING,
      error: null,
      attempts:
        (job.attempts || 0) + 1,
    }
  );

  const uploadData =
    await getUploadImageUrl(
      job.userId,
      job.userEmail,
      job.type
    );

  if (
    !uploadData?.uploadUrl ||
    !uploadData?.authorizationToken ||
    !uploadData?.fileName
  ) {
    throw new Error(
      `Invalid ${job.type} upload configuration`
    );
  }

  const uploadResult =
    await startNativeImageUpload(
      jobId,
      uploadData,
      job.imageUri,
      job.contentType || "image/jpeg"
    );

  await updateImageUploadJob(
    jobId,
    {
      status:
        IMAGE_UPLOAD_STATUS.SAVING,
      uploadResult,
      error: null,
    }
  );

  return uploadResult;
};

export const processProfileImageUpload =
  async (
    profileImg,
    user
  ) => {
    if (!profileImg) {
      throw new Error(
        "Profile image is required"
      );
    }

    if (!user?._id || !user?.email) {
      throw new Error(
        "User information is required"
      );
    }

    const job =
      await createPersistentImageJob({
        imageUri: profileImg,
        user,
        type:
          IMAGE_UPLOAD_TYPE.PROFILE,
      });

    try {
      const uploadResult =
        await processImageJob(
          job.id
        );

      const currentJob =
        await getImageUploadJob(
          job.id
        );

      if (!currentJob) {
        throw new Error(
          `Image upload job ${job.id} no longer exists`
        );
      }

      const response =
        await saveProfileImageToDataBase({
          userId:
            currentJob.userId,
          fileId:
            uploadResult.fileId,
          fileName:
            uploadResult.fileName,
          deleteFileId:
            user.profileImage?.fileId,
          deleteFileName:
            user.profileImage?.fileName,
        });

      await updateImageUploadJob(
        job.id,
        {
          status:
            IMAGE_UPLOAD_STATUS.COMPLETED,
          error: null,
        }
      );

      await removeCompletedImageUploadJob(
        job.id
      );

      console.log(
        `✅ Profile image upload completed: ${job.id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        `❌ Profile image upload failed: ${job.id}`,
        error
      );

      await updateImageUploadJob(
        job.id,
        {
          status:
            IMAGE_UPLOAD_STATUS.FAILED,
          error:
            error?.message ||
            "Profile image upload failed",
        }
      );

      throw error;
    }
  };

export const processCoverImageUpload =
  async (
    coverImg,
    user
  ) => {
    if (!coverImg) {
      throw new Error(
        "Cover image is required"
      );
    }

    if (!user?._id || !user?.email) {
      throw new Error(
        "User information is required"
      );
    }

    const job =
      await createPersistentImageJob({
        imageUri: coverImg,
        user,
        type:
          IMAGE_UPLOAD_TYPE.COVER,
      });

    try {
      const uploadResult =
        await processImageJob(
          job.id
        );

      const currentJob =
        await getImageUploadJob(
          job.id
        );

      if (!currentJob) {
        throw new Error(
          `Image upload job ${job.id} no longer exists`
        );
      }

      const response =
        await saveCoverImageToDataBase({
          userId:
            currentJob.userId,
          fileId:
            uploadResult.fileId,
          fileName:
            uploadResult.fileName,
          deleteFileId:
            user.coverImage?.fileId,
          deleteFileName:
            user.coverImage?.fileName,
        });

      await updateImageUploadJob(
        job.id,
        {
          status:
            IMAGE_UPLOAD_STATUS.COMPLETED,
          error: null,
        }
      );

      await removeCompletedImageUploadJob(
        job.id
      );

      console.log(
        `✅ Cover image upload completed: ${job.id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        `❌ Cover image upload failed: ${job.id}`,
        error
      );

      await updateImageUploadJob(
        job.id,
        {
          status:
            IMAGE_UPLOAD_STATUS.FAILED,
          error:
            error?.message ||
            "Cover image upload failed",
        }
      );

      throw error;
    }
  };