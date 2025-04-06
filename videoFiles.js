import * as FileSystem from 'expo-file-system';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';
import * as VideoThumbnails from 'expo-video-thumbnails';



const downloadVideo = async (videoUrl, localPath) => {
    try {
       
        console.log("download file")
        const downloadedVideo = await FileSystem.downloadAsync(videoUrl, localPath);
        console.log(downloadVideo)
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
        console.log("file exists 2")
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
        console.log("file exists 1")
        return localPath;
    } else {
        return await saveVideoLocally(videoUrl);
    }
};

export async function clearLocalStorage() {
    try {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        for (const file of files) {
          console.log(file)
          await FileSystem.deleteLegacyDocumentDirectoryAndroid(FileSystem.documentDirectory + file);
        }
        console.log('Local storage cleared successfully');
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