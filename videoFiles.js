import * as FileSystem from 'expo-file-system/legacy';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { getUploadImageUrl, getUploadUrl, uploadImageToBlackBlaze, uploadVideoToBackblaze } from './uploadFileToBlackBlaze';
import axios from 'axios';
import { BASE_URL } from './apiCalls';



const extractFilenameFromUrl = (url) => {
  if (!url) throw new Error("Empty URL");

  // Remove query params
  const cleanUrl = url.split("?")[0];

  // Decode Firebase encoded paths
  const decodedUrl = decodeURIComponent(cleanUrl);

  // Extract filename
  const filename = decodedUrl.substring(
    decodedUrl.lastIndexOf("/") + 1
  );

  if (!filename) {
    throw new Error("Could not extract filename from URL");
  }

  return filename;
};


/**
 * Ensure directory exists (safe for nested folders)
 */
const ensureDirectoryExists = async (directoryPath) => {
  const dirInfo = await FileSystem.getInfoAsync(directoryPath);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(directoryPath, {
      intermediates: true,
    });
  }
};


/**
 * Download file safely
 */
const downloadFile = async (remoteUrl, localPath) => {
  try {
    const result = await FileSystem.downloadAsync(
      remoteUrl,
      localPath
    );

    return result.uri;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};


/**
 * Save file locally (Firebase → B2 migration safe)
 */
export const saveFileLocally = async (
  remoteUrl,
  subfolder = "downloads"
) => {
  if (!remoteUrl) throw new Error("No URL provided");

  const filename = extractFilenameFromUrl(remoteUrl);

  // Normalize folder
  const normalizedSubfolder = subfolder.endsWith("/")
    ? subfolder
    : `${subfolder}/`;

  const directory = `${FileSystem.documentDirectory}${normalizedSubfolder}`;
  const localPath = `${directory}${filename}`;

  // Ensure folder exists FIRST
  await ensureDirectoryExists(directory);

  // Prevent duplicate download
  const fileInfo = await FileSystem.getInfoAsync(localPath);

  if (fileInfo.exists && !fileInfo.isDirectory) {
    return localPath;
  }

  return await downloadFile(remoteUrl, localPath);
};


/**
 * Video wrapper
 */
export const getVideo = async (
  remoteUrl,
  subfolder = "downloads/videos"
) => {
  return await saveFileLocally(remoteUrl, subfolder);
};
// const extractRelativePathFromB2Url = (url) => {
//   if (!url) throw new Error("Empty URL");

//   const cleanUrl = url.split("?")[0];

//   const parts = cleanUrl.split("/file/");
//   if (parts.length < 2) {
//     throw new Error("Invalid B2 URL format");
//   }


//   const pathParts = parts[1].split("/");
//   pathParts.shift(); 

//   return pathParts.join("/");
// };



// const ensureDirectoryExists = async (directory) => {
//   const dirInfo = await FileSystem.getInfoAsync(directory);

//   if (!dirInfo.exists) {
//     await FileSystem.makeDirectoryAsync(directory, {
//       intermediates: true,
//     });
//   }
// };


// const downloadFile = async (remoteUrl, localPath) => {
//   try {
//     const result = await FileSystem.downloadAsync(
//       remoteUrl,
//       localPath
//     );

//     return result.uri;
//   } catch (error) {
//     console.error("Error downloading file:", error);
//     throw error;
//   }
// };


// export const saveFileLocallyFromB2 = async (b2Url) => {
//   if (!b2Url) throw new Error("No URL provided");

//   const relativePath = extractRelativePathFromB2Url(b2Url);

//   const localPath = `${FileSystem.documentDirectory}${relativePath}`;

//   const directory = localPath.substring(
//     0,
//     localPath.lastIndexOf("/")
//   );


//   await ensureDirectoryExists(directory);

//   const fileInfo = await FileSystem.getInfoAsync(localPath);

//   if (fileInfo.exists && !fileInfo.isDirectory) {
//     return localPath;
//   }

//   try {
//     const result = await FileSystem.downloadAsync(
//       b2Url,
//       localPath
//     );

//     return result.uri;
//   } catch (error) {
//     console.error("Error downloading file:", error);
//     throw error;
//   }
// };


// export const getVideoFromB2 = async (
//   b2Url,
//   subfolder = "downloads/videos"
// ) => {
//   return await saveFileLocallyFromB2(b2Url, subfolder);
// };



// export const getVideo = async (
//   b2Url,
//   subfolder = "downloads/images"
// ) => {
//   return await saveFileLocallyFromB2(b2Url, subfolder);
// };





export const  migrateToBackblaze = async (firebaseUrl,  contestantId, userName, roomId  ) => {
  try {
   
    const  imagelUri = await getVideo(firebaseUrl, "videos")

   

    const  imageUploadData = await getUploadImageUrl(contestantId, userName, "thumbnail")

    const imageUploadResult = await  uploadImageToBlackBlaze(imageUploadData, imagelUri)
    
    const body = {
        contestantId: contestantId ,
        fileId: imageUploadResult.fileId,
        fileName: imageUploadResult.fileName,
    };
   
    const res =  await axios.patch(`${BASE_URL}/talents/migrate/${roomId}`, body);
 
    return res.data
  } catch (error) {
    console.error("Migration failed:", error);
    throw error; 
  }
};


export const  migrateToBackblaze2 = async ( roomId , contestantId ) => {
  try {
    


    const body = {
        contestantId: contestantId ,
    };
   
    const res =  await axios.patch(`${BASE_URL}/talents/migrateProfile/${roomId}`, body);
 
    return res.data
  } catch (error) {
    console.error("Migration failed:", error);
    throw error; 
  }
};


export const getVideoUrl = async (roomId , contestantId) => {
  const response = await axios.post(
    `${BASE_URL}/talents/video-url`,
    {
      roomId,
      contestantId,
    }
  );
  return response.data.signedUrl;
};


export async function clearLocalStorage() {
    const directory = FileSystem.documentDirectory;
    try {
     
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        for (const file of files) {
          await FileSystem.deleteAsync(FileSystem.documentDirectory+file, { idempotent: true });
        }
      } catch (error) {
        console.error('Error clearing local storage:', error);
      }
  }


 export  const generateThumbnail = async (url) => {
    try {
      return  await VideoThumbnails.getThumbnailAsync(
        url,
        { time: 10 }
      );
      
    } catch (error) {
      console.warn(error);
    }
  };