import * as FileSystem from 'expo-file-system';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';
import * as VideoThumbnails from 'expo-video-thumbnails';




const downloadVideo = async (videoUrl, localPath) => {
    try {
        const downloadedVideo = await FileSystem.downloadAsync(videoUrl, localPath);
        return downloadedVideo.uri;
    } catch (error) {
        console.error("Error downloading video:", error);
        return null;
    }
};


export const saveVideoLocally = async (videoUrl) => {
    const videoRef = ref(storage, videoUrl);
    const path = videoRef._location.path_
    const filename = path.substring(path.lastIndexOf('/') + 1);
    const localPath = `${FileSystem.documentDirectory}${filename}`;

    const fileInfo = await FileSystem.getInfoAsync(localPath);
    if (fileInfo.exists) {
        return localPath;
    }
    
    return await downloadVideo(videoUrl, localPath);
};

export const getVideo = async (videoUrl) => {
    const videoRef = ref(storage, videoUrl);
    const path = videoRef._location.path_
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    const localPath = `${FileSystem.documentDirectory}${filename}`;
    const fileInfo = await FileSystem.getInfoAsync(localPath);

    if (fileInfo.exists) {
        return localPath;
    } else {
        return await saveVideoLocally(videoUrl);
    }
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