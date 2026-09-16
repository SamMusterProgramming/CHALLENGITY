// services/uploads/images/imageUploadStorage.js

import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system/legacy";

import {
  IMAGE_UPLOAD_STATUS,
  IMAGE_UPLOAD_TYPE,
} from "./imageUploadTypes";

const DATABASE_NAME = "imageUploadQueue.db";

const UPLOAD_DIRECTORY =
  `${FileSystem.documentDirectory}uploads/`;

const IMAGE_DIRECTORY =
  `${UPLOAD_DIRECTORY}images/`;

let database = null;

const getDatabase = async () => {
  if (database) {
    return database;
  }

  database =
    await SQLite.openDatabaseAsync(
      DATABASE_NAME
    );

  return database;
};

export const initializeImageUploadStorage =
  async () => {
    const db = await getDatabase();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS image_upload_jobs (
        id TEXT PRIMARY KEY NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        user_id TEXT,
        user_email TEXT,
        image_uri TEXT,
        file_name TEXT,
        content_type TEXT,
        upload_result TEXT,
        attempts INTEGER DEFAULT 0,
        error TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);

    await ensureImageUploadDirectory();

    await recoverInterruptedImageUploads();

    await cleanupOrphanImageDirectories();

    console.log(
      "✅ Image upload storage initialized"
    );
  };

export const ensureImageUploadDirectory =
  async () => {
    const info =
      await FileSystem.getInfoAsync(
        IMAGE_DIRECTORY
      );

    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(
        IMAGE_DIRECTORY,
        {
          intermediates: true,
        }
      );
    }
  };

export const getImageUploadJobDirectory =
  async (jobId) => {
    if (!jobId) {
      throw new Error(
        "Image upload job ID is required"
      );
    }

    const directory =
      `${IMAGE_DIRECTORY}${jobId}/`;

    const info =
      await FileSystem.getInfoAsync(
        directory
      );

    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(
        directory,
        {
          intermediates: true,
        }
      );
    }

    return directory;
  };

export const copyImageToUploadStorage =
  async (
    sourceUri,
    destinationUri
  ) => {
    if (!sourceUri) {
      throw new Error(
        "Source image URI is missing"
      );
    }

    if (!destinationUri) {
      throw new Error(
        "Destination image URI is missing"
      );
    }

    const sourceInfo =
      await FileSystem.getInfoAsync(
        sourceUri
      );

    if (!sourceInfo.exists) {
      throw new Error(
        `Source image does not exist: ${sourceUri}`
      );
    }

    await FileSystem.copyAsync({
      from: sourceUri,
      to: destinationUri,
    });

    return destinationUri;
  };

export const deleteImageUploadFile =
  async (fileUri) => {
    if (!fileUri) {
      return true;
    }

    try {
      const info =
        await FileSystem.getInfoAsync(
          fileUri
        );

      if (!info.exists) {
        return true;
      }

      await FileSystem.deleteAsync(
        fileUri,
        {
          idempotent: true,
        }
      );

      return true;
    } catch (error) {
      console.error(
        `⚠️ Failed to delete image upload file: ${fileUri}`,
        error
      );

      return false;
    }
  };

export const cleanupImageUploadDirectory =
  async (jobId) => {
    if (!jobId) {
      return;
    }

    const directory =
      `${IMAGE_DIRECTORY}${jobId}/`;

    try {
      const info =
        await FileSystem.getInfoAsync(
          directory
        );

      if (!info.exists) {
        return;
      }

      const files =
        await FileSystem.readDirectoryAsync(
          directory
        );

      if (files.length === 0) {
        await FileSystem.deleteAsync(
          directory,
          {
            idempotent: true,
          }
        );
      }
    } catch (error) {
      console.error(
        `⚠️ Failed to clean image upload directory: ${jobId}`,
        error
      );
    }
  };

export const deleteImageUploadFiles =
  async (jobId) => {
    if (!jobId) {
      return true;
    }

    const directory =
      `${IMAGE_DIRECTORY}${jobId}/`;

    try {
      const info =
        await FileSystem.getInfoAsync(
          directory
        );

      if (!info.exists) {
        return true;
      }

      await FileSystem.deleteAsync(
        directory,
        {
          idempotent: true,
        }
      );

      return true;
    } catch (error) {
      console.error(
        `⚠️ Failed to delete image upload files for ${jobId}:`,
        error
      );

      return false;
    }
  };

export const createImageUploadJob =
  async ({
    id,
    type,
    status = IMAGE_UPLOAD_STATUS.PENDING,
    userId,
    userEmail,
    imageUri,
    fileName,
    contentType,
    attempts = 0,
    error = null,
  }) => {
    if (!id) {
      throw new Error(
        "Image upload job ID is required"
      );
    }

    if (
      type !== IMAGE_UPLOAD_TYPE.PROFILE &&
      type !== IMAGE_UPLOAD_TYPE.COVER
    ) {
      throw new Error(
        `Unsupported image upload type: ${type}`
      );
    }

    if (!imageUri) {
      throw new Error(
        "Image URI is required"
      );
    }

    const db = await getDatabase();
    const now = Date.now();

    await db.runAsync(
      `
        INSERT INTO image_upload_jobs (
          id,
          type,
          status,
          user_id,
          user_email,
          image_uri,
          file_name,
          content_type,
          upload_result,
          attempts,
          error,
          created_at,
          updated_at
        )
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          NULL,
          ?,
          ?,
          ?,
          ?
        );
      `,
      [
        id,
        type,
        status,
        userId ?? null,
        userEmail ?? null,
        imageUri ?? null,
        fileName ?? null,
        contentType ?? null,
        attempts,
        error,
        now,
        now,
      ]
    );

    return await getImageUploadJob(id);
  };

export const getImageUploadJob =
  async (jobId) => {
    const db = await getDatabase();

    const job =
      await db.getFirstAsync(
        `
          SELECT *
          FROM image_upload_jobs
          WHERE id = ?
          LIMIT 1;
        `,
        [jobId]
      );

    if (!job) {
      return null;
    }

    return normalizeImageUploadJob(job);
  };

export const getAllImageUploadJobs =
  async () => {
    const db = await getDatabase();

    const jobs =
      await db.getAllAsync(
        `
          SELECT *
          FROM image_upload_jobs
          ORDER BY created_at ASC;
        `
      );

    return jobs.map(
      normalizeImageUploadJob
    );
  };

export const getPendingImageUploadJobs =
  async () => {
    const db = await getDatabase();

    const jobs =
      await db.getAllAsync(
        `
          SELECT *
          FROM image_upload_jobs
          WHERE status IN (?, ?, ?)
          ORDER BY created_at ASC;
        `,
        [
          IMAGE_UPLOAD_STATUS.PENDING,
          IMAGE_UPLOAD_STATUS.UPLOADING,
          IMAGE_UPLOAD_STATUS.SAVING,
        ]
      );

    return jobs.map(
      normalizeImageUploadJob
    );
  };

const recoverInterruptedImageUploads =
  async () => {
    const db = await getDatabase();

    const result =
      await db.runAsync(
        `
          UPDATE image_upload_jobs
          SET
            status = ?,
            error = NULL,
            updated_at = ?
          WHERE status IN (?, ?);
        `,
        [
          IMAGE_UPLOAD_STATUS.PENDING,
          Date.now(),
          IMAGE_UPLOAD_STATUS.UPLOADING,
          IMAGE_UPLOAD_STATUS.SAVING,
        ]
      );

    if (result.changes > 0) {
      console.log(
        `🔄 Recovered ${result.changes} interrupted image upload(s)`
      );
    }
  };

export const updateImageUploadJob =
  async (
    jobId,
    updates = {}
  ) => {
    const db = await getDatabase();

    const allowedFields = {
      type: "type",
      status: "status",
      userId: "user_id",
      userEmail: "user_email",
      imageUri: "image_uri",
      fileName: "file_name",
      contentType: "content_type",
      uploadResult: "upload_result",
      attempts: "attempts",
      error: "error",
    };

    const fields = [];
    const values = [];

    for (
      const [key, value] of
      Object.entries(updates)
    ) {
      const databaseField =
        allowedFields[key];

      if (!databaseField) {
        continue;
      }

      fields.push(
        `${databaseField} = ?`
      );

      if (key === "uploadResult") {
        values.push(
          value == null
            ? null
            : JSON.stringify(value)
        );
      } else {
        values.push(
          value ?? null
        );
      }
    }

    if (!fields.length) {
      return await getImageUploadJob(
        jobId
      );
    }

    fields.push(
      "updated_at = ?"
    );

    values.push(Date.now());
    values.push(jobId);

    await db.runAsync(
      `
        UPDATE image_upload_jobs
        SET ${fields.join(", ")}
        WHERE id = ?;
      `,
      values
    );

    return await getImageUploadJob(
      jobId
    );
  };

export const deleteImageUploadJob =
  async (jobId) => {
    const db = await getDatabase();

    await db.runAsync(
      `
        DELETE FROM image_upload_jobs
        WHERE id = ?;
      `,
      [jobId]
    );

    return true;
  };

export const removeCompletedImageUploadJob =
  async (jobId) => {
    await deleteImageUploadFiles(
      jobId
    );

    await deleteImageUploadJob(
      jobId
    );

    return true;
  };

export const cleanupOrphanImageDirectories =
  async () => {
    try {
      const jobs =
        await getAllImageUploadJobs();

      const knownJobIds =
        new Set(
          jobs.map(
            (job) => job.id
          )
        );

      const directoryInfo =
        await FileSystem.getInfoAsync(
          IMAGE_DIRECTORY
        );

      if (!directoryInfo.exists) {
        return;
      }

      const directories =
        await FileSystem.readDirectoryAsync(
          IMAGE_DIRECTORY
        );

      let removedCount = 0;

      for (
        const name of directories
      ) {
        if (
          knownJobIds.has(name)
        ) {
          continue;
        }

        const orphanDirectory =
          `${IMAGE_DIRECTORY}${name}/`;

        try {
          await FileSystem.deleteAsync(
            orphanDirectory,
            {
              idempotent: true,
            }
          );

          removedCount += 1;

          console.log(
            `🧹 Removed orphan image upload directory: ${name}`
          );
        } catch (error) {
          console.error(
            `⚠️ Failed to remove orphan image upload directory: ${name}`,
            error
          );
        }
      }

      if (removedCount > 0) {
        console.log(
          `🧹 Image upload cleanup removed ${removedCount} orphan directory(s)`
        );
      }
    } catch (error) {
      console.error(
        "❌ Failed to clean orphan image upload directories:",
        error
      );
    }
  };

const normalizeImageUploadJob =
  (job) => {
    return {
      id: job.id,
      type: job.type,
      status: job.status,
      userId: job.user_id,
      userEmail: job.user_email,
      imageUri: job.image_uri,
      fileName: job.file_name,
      contentType: job.content_type,
      uploadResult: parseJson(
        job.upload_result
      ),
      attempts:
        job.attempts ?? 0,
      error: job.error,
      createdAt:
        job.created_at,
      updatedAt:
        job.updated_at,
    };
  };

const parseJson =
  (value) => {
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };