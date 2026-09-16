
// // services/uploads/uploadStorage.js
// import * as SQLite from "expo-sqlite";
// import * as FileSystem from "expo-file-system/legacy";

// import {
//   UPLOAD_STATUS,
//   UPLOAD_TYPE,
// } from "./uploadTypes";

// const DATABASE_NAME = "uploadQueue.db";
// const UPLOAD_DIRECTORY =
//   `${FileSystem.documentDirectory}uploads/`;
// const PERFORMANCE_DIRECTORY =
//   `${UPLOAD_DIRECTORY}performance/`;

// let database = null;

// const getDatabase = async () => {
//   if (database) {
//     return database;
//   }

//   database =
//     await SQLite.openDatabaseAsync(
//       DATABASE_NAME
//     );

//   return database;
// };

// export const initializeUploadStorage =
//   async () => {
//     const db =
//       await getDatabase();

//     await db.execAsync(`
//       CREATE TABLE IF NOT EXISTS upload_jobs (
//         id TEXT PRIMARY KEY NOT NULL,
//         type TEXT NOT NULL,
//         status TEXT NOT NULL,
//         arena_id TEXT,
//         owner_id TEXT,
//         owner_email TEXT,
//         description TEXT,
//         region TEXT,
//         video_uri TEXT,
//         thumbnail_uri TEXT,
//         video_upload_result TEXT,
//         thumbnail_upload_result TEXT,
//         performance_result TEXT,
//         attempts INTEGER DEFAULT 0,
//         error TEXT,
//         created_at INTEGER NOT NULL,
//         updated_at INTEGER NOT NULL
//       );
//     `);

//     await ensureUploadDirectories();

//     console.log(
//       "✅ Upload storage initialized"
//     );
//   };

// export const ensureUploadDirectories =
//   async () => {
//     const directories = [
//       UPLOAD_DIRECTORY,
//       PERFORMANCE_DIRECTORY,
//     ];

//     for (const directory of directories) {
//       const info =
//         await FileSystem.getInfoAsync(
//           directory
//         );

//       if (!info.exists) {
//         await FileSystem.makeDirectoryAsync(
//           directory,
//           {
//             intermediates: true,
//           }
//         );
//       }
//     }
//   };

// export const getPerformanceJobDirectory =
//   async (jobId) => {
//     const directory =
//       `${PERFORMANCE_DIRECTORY}${jobId}/`;

//     const info =
//       await FileSystem.getInfoAsync(
//         directory
//       );

//     if (!info.exists) {
//       await FileSystem.makeDirectoryAsync(
//         directory,
//         {
//           intermediates: true,
//         }
//       );
//     }

//     return directory;
//   };

// export const copyFileToUploadStorage =
//   async (
//     sourceUri,
//     destinationUri
//   ) => {
//     if (!sourceUri) {
//       throw new Error(
//         "Source file URI is missing"
//       );
//     }

//     const sourceInfo =
//       await FileSystem.getInfoAsync(
//         sourceUri
//       );

//     if (!sourceInfo.exists) {
//       throw new Error(
//         `Source file does not exist: ${sourceUri}`
//       );
//     }

//     await FileSystem.copyAsync({
//       from: sourceUri,
//       to: destinationUri,
//     });

//     return destinationUri;
//   };

// export const createUploadJob =
//   async ({
//     id,
//     type =
//       UPLOAD_TYPE.PERFORMANCE,
//     status =
//       UPLOAD_STATUS.PENDING,
//     arenaId,
//     ownerId,
//     ownerEmail,
//     description,
//     region,
//     videoUri,
//     thumbnailUri,
//     attempts = 0,
//     error = null,
//   }) => {
//     const db =
//       await getDatabase();

//     const now =
//       Date.now();

//     await db.runAsync(
//       `
//         INSERT INTO upload_jobs (
//           id,
//           type,
//           status,
//           arena_id,
//           owner_id,
//           owner_email,
//           description,
//           region,
//           video_uri,
//           thumbnail_uri,
//           video_upload_result,
//           thumbnail_upload_result,
//           performance_result,
//           attempts,
//           error,
//           created_at,
//           updated_at
//         )
//         VALUES (
//           ?,
//           ?,
//           ?,
//           ?,
//           ?,
//           ?,
//           ?,
//           ?,
//           ?,
//           ?,
//           NULL,
//           NULL,
//           NULL,
//           ?,
//           ?,
//           ?,
//           ?
//         );
//       `,
//       [
//         id,
//         type,
//         status,
//         arenaId ?? null,
//         ownerId ?? null,
//         ownerEmail ?? null,
//         description ?? null,
//         region ?? null,
//         videoUri ?? null,
//         thumbnailUri ?? null,
//         attempts,
//         error,
//         now,
//         now,
//       ]
//     );

//     return await getUploadJob(id);
//   };

// export const getUploadJob =
//   async (jobId) => {
//     const db =
//       await getDatabase();

//     const job =
//       await db.getFirstAsync(
//         `
//           SELECT *
//           FROM upload_jobs
//           WHERE id = ?
//           LIMIT 1;
//         `,
//         [jobId]
//       );

//     if (!job) {
//       return null;
//     }

//     return normalizeUploadJob(job);
//   };

// export const getAllUploadJobs =
//   async () => {
//     const db =
//       await getDatabase();

//     const jobs =
//       await db.getAllAsync(
//         `
//           SELECT *
//           FROM upload_jobs
//           ORDER BY created_at ASC;
//         `
//       );

//     return jobs.map(
//       normalizeUploadJob
//     );
//   };

// /*
// |--------------------------------------------------------------------------
// | Unfinished uploads
// |--------------------------------------------------------------------------
// */

// export const getPendingUploadJobs =
//   async () => {
//     const db =
//       await getDatabase();

//     const jobs =
//       await db.getAllAsync(
//         `
//           SELECT *
//           FROM upload_jobs
//           WHERE status IN (
//             ?,
//             ?,
//             ?,
//             ?
//           )
//           ORDER BY created_at ASC;
//         `,
//         [
//           UPLOAD_STATUS.PENDING,
//           UPLOAD_STATUS.UPLOADING_VIDEO,
//           UPLOAD_STATUS.UPLOADING_THUMBNAIL,
//           UPLOAD_STATUS.ADDING_PERFORMANCE,
//         ]
//       );

//     return jobs.map(
//       normalizeUploadJob
//     );
//   };

// /*
// |--------------------------------------------------------------------------
// | Completed uploads waiting for UI consumption
// |--------------------------------------------------------------------------
// */

// export const getCompletedUploadJobs =
//   async () => {
//     const db =
//       await getDatabase();

//     const jobs =
//       await db.getAllAsync(
//         `
//           SELECT *
//           FROM upload_jobs
//           WHERE status = ?
//           AND performance_result IS NOT NULL
//           ORDER BY updated_at ASC;
//         `,
//         [
//           UPLOAD_STATUS.COMPLETED,
//         ]
//       );

//     return jobs.map(
//       normalizeUploadJob
//     );
//   };

// export const updateUploadJob =
//   async (
//     jobId,
//     updates = {}
//   ) => {
//     const db =
//       await getDatabase();

//     const allowedFields = {
//       status:
//         "status",
//       arenaId:
//         "arena_id",
//       ownerId:
//         "owner_id",
//       ownerEmail:
//         "owner_email",
//       description:
//         "description",
//       region:
//         "region",
//       videoUri:
//         "video_uri",
//       thumbnailUri:
//         "thumbnail_uri",
//       videoUploadResult:
//         "video_upload_result",
//       thumbnailUploadResult:
//         "thumbnail_upload_result",
//       performanceResult:
//         "performance_result",
//       attempts:
//         "attempts",
//       error:
//         "error",
//     };

//     const fields = [];
//     const values = [];

//     for (
//       const [
//         key,
//         value,
//       ]
//       of Object.entries(updates)
//     ) {
//       const databaseField =
//         allowedFields[key];

//       if (!databaseField) {
//         continue;
//       }

//       fields.push(
//         `${databaseField} = ?`
//       );

//       if (
//         key ===
//           "videoUploadResult" ||
//         key ===
//           "thumbnailUploadResult" ||
//         key ===
//           "performanceResult"
//       ) {
//         values.push(
//           value == null
//             ? null
//             : JSON.stringify(value)
//         );
//       } else {
//         values.push(
//           value ?? null
//         );
//       }
//     }

//     if (!fields.length) {
//       return await getUploadJob(
//         jobId
//       );
//     }

//     fields.push(
//       "updated_at = ?"
//     );

//     values.push(
//       Date.now()
//     );

//     values.push(
//       jobId
//     );

//     await db.runAsync(
//       `
//         UPDATE upload_jobs
//         SET ${fields.join(", ")}
//         WHERE id = ?;
//       `,
//       values
//     );

//     return await getUploadJob(
//       jobId
//     );
//   };

// export const deleteUploadJob =
//   async (jobId) => {
//     const db =
//       await getDatabase();

//     await db.runAsync(
//       `
//         DELETE FROM upload_jobs
//         WHERE id = ?;
//       `,
//       [jobId]
//     );

//     return true;
//   };

// export const deleteUploadFiles =
//   async (jobId) => {
//     const directory =
//       `${PERFORMANCE_DIRECTORY}${jobId}/`;

//     await FileSystem.deleteAsync(
//       directory,
//       {
//         idempotent: true,
//       }
//     );

//     return true;
//   };

// export const removeCompletedUploadJob =
//   async (jobId) => {
//     await deleteUploadFiles(
//       jobId
//     );

//     await deleteUploadJob(
//       jobId
//     );

//     return true;
//   };

// const normalizeUploadJob =
//   (job) => {
//     return {
//       id:
//         job.id,
//       type:
//         job.type,
//       status:
//         job.status,
//       arenaId:
//         job.arena_id,
//       ownerId:
//         job.owner_id,
//       ownerEmail:
//         job.owner_email,
//       description:
//         job.description,
//       region:
//         job.region,
//       videoUri:
//         job.video_uri,
//       thumbnailUri:
//         job.thumbnail_uri,
//       videoUploadResult:
//         parseJson(
//           job.video_upload_result
//         ),
//       thumbnailUploadResult:
//         parseJson(
//           job.thumbnail_upload_result
//         ),
//       performanceResult:
//         parseJson(
//           job.performance_result
//         ),
//       attempts:
//         job.attempts ?? 0,
//       error:
//         job.error,
//       createdAt:
//         job.created_at,
//       updatedAt:
//         job.updated_at,
//     };
//   };

// const parseJson =
//   (value) => {
//     if (!value) {
//       return null;
//     }

//     try {
//       return JSON.parse(
//         value
//       );
//     } catch {
//       return null;
//     }
//   };

// uploadStorage
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system/legacy";

import {
  UPLOAD_STATUS,
  UPLOAD_TYPE,
} from "./uploadTypes";

const DATABASE_NAME = "uploadQueue.db";
const UPLOAD_DIRECTORY = `${FileSystem.documentDirectory}uploads/`;
const PERFORMANCE_DIRECTORY = `${UPLOAD_DIRECTORY}performance/`;

let database = null;

const getDatabase = async () => {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync(DATABASE_NAME);
  return database;
};

export const initializeUploadStorage = async () => {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS upload_jobs (
      id TEXT PRIMARY KEY NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      arena_id TEXT,
      owner_id TEXT,
      owner_email TEXT,
      description TEXT,
      region TEXT,
      video_uri TEXT,
      thumbnail_uri TEXT,
      video_upload_result TEXT,
      thumbnail_upload_result TEXT,
      performance_result TEXT,
      attempts INTEGER DEFAULT 0,
      error TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);

  await ensureUploadDirectories();
  await recoverInterruptedUploadJobs();
  await cleanupOrphanUploadDirectories();

  console.log("✅ Upload storage initialized");
};

export const ensureUploadDirectories = async () => {
  const directories = [
    UPLOAD_DIRECTORY,
    PERFORMANCE_DIRECTORY,
  ];

  for (const directory of directories) {
    const info = await FileSystem.getInfoAsync(directory);

    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(directory, {
        intermediates: true,
      });
    }
  }
};

export const getPerformanceJobDirectory = async (jobId) => {
  const directory = `${PERFORMANCE_DIRECTORY}${jobId}/`;
  const info = await FileSystem.getInfoAsync(directory);

  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(directory, {
      intermediates: true,
    });
  }

  return directory;
};

export const copyFileToUploadStorage = async (
  sourceUri,
  destinationUri
) => {
  if (!sourceUri) {
    throw new Error("Source file URI is missing");
  }

  const sourceInfo = await FileSystem.getInfoAsync(sourceUri);

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

export const deleteUploadFile = async (fileUri) => {
  if (!fileUri) {
    return true;
  }

  try {
    const info = await FileSystem.getInfoAsync(fileUri);

    if (!info.exists) {
      return true;
    }

    await FileSystem.deleteAsync(fileUri, {
      idempotent: true,
    });

    return true;
  } catch (error) {
    console.error(
      `⚠️ Failed to delete upload file: ${fileUri}`,
      error
    );

    return false;
  }
};

export const cleanupPerformanceJobDirectory = async (jobId) => {
  if (!jobId) {
    return;
  }

  const directory = `${PERFORMANCE_DIRECTORY}${jobId}/`;

  try {
    const info = await FileSystem.getInfoAsync(directory);

    if (!info.exists) {
      return;
    }

    const files = await FileSystem.readDirectoryAsync(directory);

    if (files.length === 0) {
      await FileSystem.deleteAsync(directory, {
        idempotent: true,
      });
    }
  } catch (error) {
    console.error(
      `⚠️ Failed to clean upload directory: ${jobId}`,
      error
    );
  }
};

export const deleteUploadFiles = async (jobId) => {
  if (!jobId) {
    return true;
  }

  const directory = `${PERFORMANCE_DIRECTORY}${jobId}/`;

  try {
    const info = await FileSystem.getInfoAsync(directory);

    if (!info.exists) {
      return true;
    }

    await FileSystem.deleteAsync(directory, {
      idempotent: true,
    });

    return true;
  } catch (error) {
    console.error(
      `⚠️ Failed to delete upload files for ${jobId}:`,
      error
    );

    return false;
  }
};

export const createUploadJob = async ({
  id,
  type = UPLOAD_TYPE.PERFORMANCE,
  status = UPLOAD_STATUS.PENDING,
  arenaId,
  ownerId,
  ownerEmail,
  description,
  region,
  videoUri,
  thumbnailUri,
  attempts = 0,
  error = null,
}) => {
  const db = await getDatabase();
  const now = Date.now();

  await db.runAsync(
    `
      INSERT INTO upload_jobs (
        id,
        type,
        status,
        arena_id,
        owner_id,
        owner_email,
        description,
        region,
        video_uri,
        thumbnail_uri,
        video_upload_result,
        thumbnail_upload_result,
        performance_result,
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
        ?,
        ?,
        NULL,
        NULL,
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
      arenaId ?? null,
      ownerId ?? null,
      ownerEmail ?? null,
      description ?? null,
      region ?? null,
      videoUri ?? null,
      thumbnailUri ?? null,
      attempts,
      error,
      now,
      now,
    ]
  );

  return await getUploadJob(id);
};

export const getUploadJob = async (jobId) => {
  const db = await getDatabase();

  const job = await db.getFirstAsync(
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

  return normalizeUploadJob(job);
};

export const getAllUploadJobs = async () => {
  const db = await getDatabase();

  const jobs = await db.getAllAsync(`
    SELECT *
    FROM upload_jobs
    ORDER BY created_at ASC;
  `);

  return jobs.map(normalizeUploadJob);
};

export const getPendingUploadJobs = async () => {
  const db = await getDatabase();

  const jobs = await db.getAllAsync(
    `
      SELECT *
      FROM upload_jobs
      WHERE status IN (?, ?, ?, ?)
      ORDER BY created_at ASC;
    `,
    [
      UPLOAD_STATUS.PENDING,
      UPLOAD_STATUS.UPLOADING_VIDEO,
      UPLOAD_STATUS.UPLOADING_THUMBNAIL,
      UPLOAD_STATUS.ADDING_PERFORMANCE,
    ]
  );

  return jobs.map(normalizeUploadJob);
};

const recoverInterruptedUploadJobs = async () => {
  const db = await getDatabase();

  const result = await db.runAsync(
    `
      UPDATE upload_jobs
      SET
        status = ?,
        error = NULL,
        updated_at = ?
      WHERE status IN (?, ?, ?);
    `,
    [
      UPLOAD_STATUS.PENDING,
      Date.now(),
      UPLOAD_STATUS.UPLOADING_VIDEO,
      UPLOAD_STATUS.UPLOADING_THUMBNAIL,
      UPLOAD_STATUS.ADDING_PERFORMANCE,
    ]
  );

  if (result.changes > 0) {
    console.log(
      `🔄 Recovered ${result.changes} interrupted upload(s)`
    );
  }
};

export const getCompletedUploadJobs = async () => {
  const db = await getDatabase();

  const jobs = await db.getAllAsync(
    `
      SELECT *
      FROM upload_jobs
      WHERE status = ?
      AND performance_result IS NOT NULL
      ORDER BY updated_at ASC;
    `,
    [UPLOAD_STATUS.COMPLETED]
  );

  return jobs.map(normalizeUploadJob);
};

export const updateUploadJob = async (
  jobId,
  updates = {}
) => {
  const db = await getDatabase();

  const allowedFields = {
    status: "status",
    arenaId: "arena_id",
    ownerId: "owner_id",
    ownerEmail: "owner_email",
    description: "description",
    region: "region",
    videoUri: "video_uri",
    thumbnailUri: "thumbnail_uri",
    videoUploadResult: "video_upload_result",
    thumbnailUploadResult: "thumbnail_upload_result",
    performanceResult: "performance_result",
    attempts: "attempts",
    error: "error",
  };

  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    const databaseField = allowedFields[key];

    if (!databaseField) {
      continue;
    }

    fields.push(`${databaseField} = ?`);

    if (
      key === "videoUploadResult" ||
      key === "thumbnailUploadResult" ||
      key === "performanceResult"
    ) {
      values.push(
        value == null ? null : JSON.stringify(value)
      );
    } else {
      values.push(value ?? null);
    }
  }

  if (!fields.length) {
    return await getUploadJob(jobId);
  }

  fields.push("updated_at = ?");
  values.push(Date.now());
  values.push(jobId);

  await db.runAsync(
    `
      UPDATE upload_jobs
      SET ${fields.join(", ")}
      WHERE id = ?;
    `,
    values
  );

  return await getUploadJob(jobId);
};

export const deleteUploadJob = async (jobId) => {
  const db = await getDatabase();

  await db.runAsync(
    `
      DELETE FROM upload_jobs
      WHERE id = ?;
    `,
    [jobId]
  );

  return true;
};

export const removeCompletedUploadJob = async (jobId) => {
  await deleteUploadFiles(jobId);
  await deleteUploadJob(jobId);

  return true;
};

export const cleanupOrphanUploadDirectories = async () => {
  try {
    const jobs = await getAllUploadJobs();

    const knownJobIds = new Set(
      jobs.map((job) => job.id)
    );

    const directoryInfo =
      await FileSystem.getInfoAsync(
        PERFORMANCE_DIRECTORY
      );

    if (!directoryInfo.exists) {
      return;
    }

    const directories =
      await FileSystem.readDirectoryAsync(
        PERFORMANCE_DIRECTORY
      );

    let removedCount = 0;

    for (const name of directories) {
      if (knownJobIds.has(name)) {
        continue;
      }

      const orphanDirectory =
        `${PERFORMANCE_DIRECTORY}${name}/`;

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

    if (removedCount > 0) {
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

const normalizeUploadJob = (job) => {
  return {
    id: job.id,
    type: job.type,
    status: job.status,
    arenaId: job.arena_id,
    ownerId: job.owner_id,
    ownerEmail: job.owner_email,
    description: job.description,
    region: job.region,
    videoUri: job.video_uri,
    thumbnailUri: job.thumbnail_uri,
    videoUploadResult: parseJson(
      job.video_upload_result
    ),
    thumbnailUploadResult: parseJson(
      job.thumbnail_upload_result
    ),
    performanceResult: parseJson(
      job.performance_result
    ),
    attempts: job.attempts ?? 0,
    error: job.error,
    createdAt: job.created_at,
    updatedAt: job.updated_at,
  };
};

const parseJson = (value) => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};