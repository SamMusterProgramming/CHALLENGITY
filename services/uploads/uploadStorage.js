import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system/legacy";

import {
  UPLOAD_STATUS,
} from "./uploadTypes";

/*
|--------------------------------------------------------------------------
| Storage configuration
|--------------------------------------------------------------------------
*/

const DATABASE_NAME =
  "globalUploadQueue.db";

const UPLOAD_DIRECTORY =
  `${FileSystem.documentDirectory}uploads/`;

const JOB_DIRECTORY =
  `${UPLOAD_DIRECTORY}jobs/`;

let database = null;

/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

const getDatabase = async () => {
  if (database) {
    return database;
  }

  database =
    await SQLite.openDatabaseAsync(
      DATABASE_NAME,
      {
        useNewConnection: true,
      }
    );

  return database;
};

/*
|--------------------------------------------------------------------------
| Initialization
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| This layer only initializes persistent storage.
|
| It does NOT decide whether an unfinished upload should be resumed,
| retried, or reset.
|
| That decision belongs to the worker/recovery layer because the native
| Android uploader may still be running independently of JS.
|--------------------------------------------------------------------------
*/

export const initializeUploadStorage =
  async () => {
    const db =
      await getDatabase();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS upload_jobs (
        id TEXT PRIMARY KEY NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,

        payload TEXT,
        result TEXT,

        attempts INTEGER DEFAULT 0,
        error TEXT,

        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);

    await ensureUploadDirectories();

    await cleanupOrphanJobDirectories();

    console.log(
      "✅ Upload storage initialized"
    );
  };

/*
|--------------------------------------------------------------------------
| Directories
|--------------------------------------------------------------------------
*/

export const ensureUploadDirectories =
  async () => {
    const directories = [
      UPLOAD_DIRECTORY,
      JOB_DIRECTORY,
    ];

    for (
      const directory
        of directories
    ) {
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
    }
  };

export const getJobDirectory =
  async (jobId) => {
    if (!jobId) {
      throw new Error(
        "Job ID is required"
      );
    }

    const directory =
      `${JOB_DIRECTORY}${jobId}/`;

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

/*
|--------------------------------------------------------------------------
| File operations
|--------------------------------------------------------------------------
*/

export const copyFileToUploadStorage =
  async (
    sourceUri,
    destinationUri
  ) => {
    if (!sourceUri) {
      throw new Error(
        "Source file URI is missing"
      );
    }

    if (!destinationUri) {
      throw new Error(
        "Destination file URI is missing"
      );
    }

    const sourceInfo =
      await FileSystem.getInfoAsync(
        sourceUri
      );

    if (!sourceInfo.exists) {
      throw new Error(
        `Source file does not exist: ${sourceUri}`
      );
    }

    await FileSystem.copyAsync({
      from: sourceUri,
      to: destinationUri,
    });

    return destinationUri;
  };

export const deleteUploadFile =
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
        `⚠️ Failed to delete upload file: ${fileUri}`,
        error
      );

      return false;
    }
  };

export const deleteJobFiles =
  async (jobId) => {
    if (!jobId) {
      return true;
    }

    const directory =
      `${JOB_DIRECTORY}${jobId}/`;

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
        `⚠️ Failed to delete upload files for ${jobId}:`,
        error
      );

      return false;
    }
  };

/*
|--------------------------------------------------------------------------
| Create job
|--------------------------------------------------------------------------
*/

export const createUploadJob =
  async ({
    id,
    type,
    status =
      UPLOAD_STATUS.PENDING,
    payload = {},
    result = null,
    attempts = 0,
    error = null,
  }) => {
    if (!id) {
      throw new Error(
        "Upload job ID is required"
      );
    }

    if (!type) {
      throw new Error(
        "Upload job type is required"
      );
    }

    const db =
      await getDatabase();

    const now =
      Date.now();

    await db.runAsync(
      `
        INSERT INTO upload_jobs (
          id,
          type,
          status,
          payload,
          result,
          attempts,
          error,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        id,
        type,
        status,

        JSON.stringify(
          payload ?? {}
        ),

        result == null
          ? null
          : JSON.stringify(
              result
            ),

        attempts,
        error ?? null,
        now,
        now,
      ]
    );

    return await getUploadJob(
      id
    );
  };

/*
|--------------------------------------------------------------------------
| Get one job
|--------------------------------------------------------------------------
*/

export const getUploadJob =
  async (jobId) => {
    const db =
      await getDatabase();

    const job =
      await db.getFirstAsync(
        `
          SELECT *
          FROM upload_jobs
          WHERE id = ?
          LIMIT 1;
        `,
        [jobId]
      );

    if (!job) {
      return null;
    }

    return normalizeUploadJob(
      job
    );
  };

/*
|--------------------------------------------------------------------------
| Get all jobs
|--------------------------------------------------------------------------
*/

export const getAllUploadJobs =
  async () => {
    const db =
      await getDatabase();

    const jobs =
      await db.getAllAsync(`
        SELECT *
        FROM upload_jobs
        ORDER BY created_at ASC;
      `);

    return jobs.map(
      normalizeUploadJob
    );
  };

/*
|--------------------------------------------------------------------------
| Get unfinished jobs
|--------------------------------------------------------------------------
|
| FCFS ordering is based on created_at.
|
| IMPORTANT:
| Failed and cancelled jobs do not automatically re-enter the queue.
|--------------------------------------------------------------------------
*/

export const getPendingUploadJobs =
  async () => {
    const db =
      await getDatabase();

    const jobs =
      await db.getAllAsync(
        `
          SELECT *
          FROM upload_jobs
          WHERE status NOT IN (?, ?, ?)
          ORDER BY created_at ASC;
        `,
        [
          UPLOAD_STATUS.COMPLETED,
          UPLOAD_STATUS.FAILED,
          UPLOAD_STATUS.CANCELLED,
        ]
      );

    return jobs.map(
      normalizeUploadJob
    );
  };

/*
|--------------------------------------------------------------------------
| Get completed jobs
|--------------------------------------------------------------------------
*/

export const getCompletedUploadJobs =
  async () => {
    const db =
      await getDatabase();

    const jobs =
      await db.getAllAsync(
        `
          SELECT *
          FROM upload_jobs
          WHERE status = ?
          ORDER BY updated_at ASC;
        `,
        [
          UPLOAD_STATUS.COMPLETED,
        ]
      );

    return jobs.map(
      normalizeUploadJob
    );
  };

/*
|--------------------------------------------------------------------------
| Update job
|--------------------------------------------------------------------------
*/

export const updateUploadJob =
  async (
    jobId,
    updates = {}
  ) => {
    const db =
      await getDatabase();

    const allowedFields = {
      type: "type",
      status: "status",
      payload: "payload",
      result: "result",
      attempts: "attempts",
      error: "error",
    };

    const fields = [];
    const values = [];

    for (
      const [key, value]
        of Object.entries(
          updates
        )
    ) {
      const databaseField =
        allowedFields[key];

      if (!databaseField) {
        continue;
      }

      fields.push(
        `${databaseField} = ?`
      );

      if (
        key === "payload" ||
        key === "result"
      ) {
        values.push(
          value == null
            ? null
            : JSON.stringify(
                value
              )
        );
      } else {
        values.push(
          value ?? null
        );
      }
    }

    if (!fields.length) {
      return await getUploadJob(
        jobId
      );
    }

    fields.push(
      "updated_at = ?"
    );

    values.push(
      Date.now()
    );

    values.push(
      jobId
    );

    await db.runAsync(
      `
        UPDATE upload_jobs
        SET ${fields.join(", ")}
        WHERE id = ?;
      `,
      values
    );

    return await getUploadJob(
      jobId
    );
  };

/*
|--------------------------------------------------------------------------
| Delete job
|--------------------------------------------------------------------------
*/

export const deleteUploadJob =
  async (jobId) => {
    const db =
      await getDatabase();

    await db.runAsync(
      `
        DELETE FROM upload_jobs
        WHERE id = ?;
      `,
      [jobId]
    );

    return true;
  };

/*
|--------------------------------------------------------------------------
| Remove completed job
|--------------------------------------------------------------------------
|
| Used after the app has consumed the final result.
|--------------------------------------------------------------------------
*/

export const removeCompletedUploadJob =
  async (jobId) => {
    const job =
      await getUploadJob(
        jobId
      );

    if (!job) {
      return true;
    }

    if (
      job.status !==
      UPLOAD_STATUS.COMPLETED
    ) {
      return false;
    }

    await deleteJobFiles(
      jobId
    );

    await deleteUploadJob(
      jobId
    );

    return true;
  };

/*
|--------------------------------------------------------------------------
| Orphan directory cleanup
|--------------------------------------------------------------------------
|
| Only directories belonging to jobs that no longer exist are removed.
|--------------------------------------------------------------------------
*/

const cleanupOrphanJobDirectories =
  async () => {
    try {
      const jobs =
        await getAllUploadJobs();

      const knownJobIds =
        new Set(
          jobs.map(
            (job) => job.id
          )
        );

      const directoryInfo =
        await FileSystem.getInfoAsync(
          JOB_DIRECTORY
        );

      if (
        !directoryInfo.exists
      ) {
        return;
      }

      const directories =
        await FileSystem.readDirectoryAsync(
          JOB_DIRECTORY
        );

      let removedCount = 0;

      for (
        const name
          of directories
      ) {
        if (
          knownJobIds.has(
            name
          )
        ) {
          continue;
        }

        const orphanDirectory =
          `${JOB_DIRECTORY}${name}/`;

        try {
          await FileSystem.deleteAsync(
            orphanDirectory,
            {
              idempotent: true,
            }
          );

          removedCount += 1;

          console.log(
            `🧹 Removed orphan upload directory: ${name}`
          );
        } catch (error) {
          console.error(
            `⚠️ Failed to remove orphan upload directory: ${name}`,
            error
          );
        }
      }

      if (
        removedCount > 0
      ) {
        console.log(
          `🧹 Upload cleanup removed ${removedCount} orphan directory(s)`
        );
      }
    } catch (error) {
      console.error(
        "❌ Failed to clean orphan upload directories:",
        error
      );
    }
  };

/*
|--------------------------------------------------------------------------
| Normalize
|--------------------------------------------------------------------------
*/

const normalizeUploadJob =
  (job) => {
    return {
      id: job.id,

      type:
        job.type,

      status:
        job.status,

      payload:
        parseJson(
          job.payload
        ),

      result:
        parseJson(
          job.result
        ),

      attempts:
        job.attempts ?? 0,

      error:
        job.error,

      createdAt:
        job.created_at,

      updatedAt:
        job.updated_at,
    };
  };

const parseJson =
  (value) => {
    if (
      value == null
    ) {
      return null;
    }

    if (
      typeof value ===
      "object"
    ) {
      return value;
    }

    try {
      return JSON.parse(
        value
      );
    } catch {
      return null;
    }
  };