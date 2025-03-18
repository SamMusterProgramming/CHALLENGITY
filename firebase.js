// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { generateRandomString, getRandomInt } from "./helper";


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

export const  _uploadVideoAsync = async(uri , email,name)=> {
  console.log(email)
  console.log('Received uri to upload', uri)
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
  const fileRef = ref(storage, generateUserFolder(email) + getRandomInt(1000,100000).toString()+ generateRandomString(5) )
  const result = await uploadBytes(fileRef, blob)
  return await getDownloadURL(fileRef)
}