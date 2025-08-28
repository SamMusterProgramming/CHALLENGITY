
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { generateRandomString, getRandomInt } from "./helper";
// import { Image, Video } from "react-native-compressor";




const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "challengify-wgt.firebaseapp.com",
  projectId: "challengify-wgt",
  storageBucket: "challengify-wgt.firebasestorage.app",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage =  getStorage(app)

export const generateUserFolder = (email)=> {
  return  `videos/${email}/`;
}
export const generateUserProfileFolder = (email)=> {
  return  `images/${email}/`;
}

export const  getMediaFireBase = (filename,setFilename)=> {
     const fileRef = ref(storage, filename);
      getDownloadURL(fileRef).then(url => {
      setFilename(url)
     })
    .catch((error) => {
     console.error(error);
    });
}

export const  _uploadVideoAsync = async(uri , email, name)=> {

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      console.log(e)
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = "blob"
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  const fileRef = ref(storage, generateUserFolder(email) + getRandomInt(1000,100000).toString()+ generateRandomString(5)+".mp4" )
  const result = await uploadBytes(fileRef, blob)
  return await getDownloadURL(fileRef)
}


export const uploadThumbnail = async (thumbnailUri, email) => {
  try {
      const response = await fetch(thumbnailUri);
      const blob = await response.blob();
      const fileName = getRandomInt(1000,100000).toString()+ generateRandomString(5)
      const storageRef = ref(storage, `images/${email}/thumbnails/${fileName}`); // Define storage path
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef); // Get download URL
      console.log(downloadURL)
      return downloadURL;
  } catch (e) {
      console.warn(e);
      return null;
  }
};



export const compressVideo = async (videoUri) => {
  try {
    return await Video.compress(
      videoUri,
      {
        compressionMethod: 'auto', 
      },
      (progress) => {
        console.log('Compression Progress:', progress);
      }
    );
   
  } catch (error) {
    console.error('Compression Error:', error);
    return null;
  } finally{
    // await clearCache();
  }
};

export const compressImage = async (imageUri) => {
  try {
    const result = await Image.compress(imageUri, {
      compressionMethod: 'manual',
      maxWidth: 1000, // Adjust as needed
      quality: 0.8, // Adjust as needed (0 to 1)
    });
    return result;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};