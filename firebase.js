
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { generateRandomString, getRandomInt } from "./helper";
// import { Image, Video } from "react-native-compressor";

//npx expo start -c    eas update --channel preview 

// "dependencies": {
//   "@expo-google-fonts/inter": "^0.2.3",
//   "@expo-google-fonts/quicksand": "^0.3.0",
//   "@expo-google-fonts/raleway": "^0.3.0",
//   "@expo/vector-icons": "^15.0.3",
//   "@firebase/auth": "^1.7.9",
//   "@react-native-async-storage/async-storage": "^1.24.0",
//   "@react-native-community/slider": "5.0.1",
//   "@react-native-firebase/app": "^21.8.0",
//   "@react-native-firebase/storage": "^21.8.0",
//   "@react-native-picker/picker": "2.11.1",
//   "@react-navigation/bottom-tabs": "^7.2.0",
//   "@react-navigation/native": "^7.0.14",
//   "axios": "^1.7.9",
//   "expo": "^54.0.32",
//   "expo-blur": "~15.0.8",
//   "expo-build-properties": "~1.0.10",
//   "expo-camera": "~17.0.10",
//   "expo-constants": "~18.0.13",
//   "expo-contacts": "~15.0.11",
//   "expo-dev-client": "~6.0.20",
//   "expo-document-picker": "~14.0.8",
//   "expo-file-system": "~19.0.21",
//   "expo-font": "~14.0.11",
//   "expo-haptics": "~15.0.8",
//   "expo-image-picker": "~17.0.10",
//   "expo-keep-awake": "~15.0.8",
//   "expo-linking": "~8.0.11",
//   "expo-navigation-bar": "~5.0.10",
//   "expo-router": "~6.0.22",
//   "expo-sensors": "~15.0.8",
//   "expo-splash-screen": "~31.0.13",
//   "expo-status-bar": "~3.0.9",
//   "expo-symbols": "~1.0.8",
//   "expo-system-ui": "~6.0.9",
//   "expo-updates": "~29.0.16",
//   "expo-video": "~3.0.15",
//   "expo-video-thumbnails": "~10.0.8",
//   "expo-web-browser": "~15.0.10",
//   "firebase": "^10.6.0",
//   "moti": "^0.30.0",
//   "nativewind": "^4.1.23",
//   "react": "^19.2.3",
//   "react-dom": "^19.2.3",
//   "react-native": "0.81.5",
//   "react-native-compressor": "^1.11.0",
//   "react-native-country-flag": "^2.0.2",
//   "react-native-country-picker-modal": "^2.0.0",
//   "react-native-dotenv": "^3.4.11",
//   "react-native-gesture-handler": "~2.28.0",
//   "react-native-modal": "^14.0.0-rc.0",
//   "react-native-picker-select": "^9.3.1",
//   "react-native-reanimated": "~4.1.1",
//   "react-native-safe-area-context": "~5.6.0",
//   "react-native-screens": "~4.16.0",
//   "react-native-svg": "15.15.1",
//   "react-native-swiper-flatlist": "^3.2.5",
//   "react-native-video": "^6.10.0",
//   "react-native-web": "^0.21.2",
//   "react-native-webview": "^13.16.0",
//   "react-native-worklets": "0.5.2",
//   "react-native-worklets-core": "^1.6.0"

 
// },

// "devDependencies": {
//   "@babel/core": "^7.26.0",
//   "@babel/plugin-proposal-private-property-in-object": "^7.21.0",
//   "@babel/preset-env": "^7.0.0",
//   "@types/jest": "^29.5.12",
//   "@types/react": "^19.2.3",
//   "@types/react-dom": "^19.2.3",
//   "@types/react-test-renderer": "^18.3.0",
//   "jest": "~29.7.0",
//   "jest-expo": "~54.0.16",
//   "metro": "^0.83.1",
//   "react-test-renderer": "^19.2.3",
//   "tailwindcss": "^3.4.17",
//   "typescript": "~5.9.2"
// },


// {
//   "name": "challengify",
//   "main": "expo-router/entry",
//   "version": "1.0.0",
//   "scripts": {
//     "start": "expo start --dev-client",
//     "reset-project": "node ./scripts/reset-project.js",
//     "android": "expo run:android",
//     "ios": "expo run:ios",
//     "web": "expo start --web",
//     "test": "jest --watchAll",
//     "lint": "expo lint"
//   },
//   "jest": {
//     "preset": "jest-expo"
//   },
//   "dependencies": {
//     "@expo-google-fonts/inter": "^0.2.3",
//     "@expo-google-fonts/quicksand": "^0.3.0",
//     "@expo-google-fonts/raleway": "^0.3.0",
//     "@expo/vector-icons": "^15.0.3",
//     "@firebase/auth": "^1.12.0",
//     "@react-native-async-storage/async-storage": "^2.2.0",
//     "@react-native-community/slider": "5.0.1",
//     "@react-native-firebase/app": "^21.8.0",
//     "@react-native-firebase/storage": "^21.8.0",
//     "@react-native-picker/picker": "2.11.1",
//     "@react-navigation/bottom-tabs": "^7.2.0",
//     "@react-navigation/native": "^7.0.14",
//     "axios": "^1.7.9",
//     "expo": "^54.0.32",
//     "expo-blur": "~15.0.8",
//     "expo-build-properties": "~1.0.10",
//     "expo-camera": "~17.0.10",
//     "expo-constants": "~18.0.13",
//     "expo-contacts": "~15.0.11",
//     "expo-dev-client": "~6.0.20",
//     "expo-document-picker": "~14.0.8",
//     "expo-file-system": "~19.0.21",
//     "expo-font": "~14.0.11",
//     "expo-haptics": "~15.0.8",
//     "expo-image-picker": "~17.0.10",
//     "expo-keep-awake": "~15.0.8",
//     "expo-linking": "~8.0.11",
//     "expo-navigation-bar": "~5.0.10",
//     "expo-router": "~6.0.22",
//     "expo-sensors": "~15.0.8",
//     "expo-splash-screen": "~31.0.13",
//     "expo-status-bar": "~3.0.9",
//     "expo-symbols": "~1.0.8",
//     "expo-system-ui": "~6.0.9",
//     "expo-updates": "~29.0.16",
//     "expo-video": "~3.0.15",
//     "expo-video-thumbnails": "~10.0.8",
//     "expo-web-browser": "~15.0.10",
//     "firebase": "^10.14.1",
//     "moti": "^0.30.0",
//     "nativewind": "^4.1.23",
//     "react-native-compressor": "^1.11.0",
//     "react-native-country-flag": "^2.0.2",
//     "react-native-country-picker-modal": "^2.0.0",
//     "react-native-dotenv": "^3.4.11",
//     "react-native-gesture-handler": "~2.28.0",
//     "react-native-modal": "^14.0.0-rc.0",
//     "react-native-picker-select": "^9.3.1",
//     "react-native-reanimated": "~4.1.1",
//     "react-native-safe-area-context": "~5.6.0",
//     "react-native-screens": "~4.16.0",
//     "react-native-svg": "15.15.1",
//     "react-native-swiper-flatlist": "^3.2.5",
//     "react-native-video": "^6.10.0",
//     "react-native-web": "0.21.2",
//     "react-native-webview": "^13.16.0",
//     "react-native-worklets": "0.5.2",
//     "react-native-worklets-core": "^1.6.0",
//     "react": "18.2.0",
//     "react-dom": "18.2.0",
//     "react-test-renderer": "18.2.0",
//     "react-native": "0.81.5"
//   },
// "devDependencies": {
//   "@babel/core": "^7.26.0",
//   "@babel/plugin-proposal-private-property-in-object": "^7.21.0",
//   "@babel/preset-env": "^7.0.0",
//   "@types/jest": "^29.5.12",
//   "@types/react": "19.2.3",
//   "@types/react-dom": "19.2.3",
//   "@types/react-test-renderer": "^18.0.1",
//   "jest": "~29.7.0",
//   "jest-expo": "~54.0.16",
//   "metro": "^0.83.1",
//   "react-test-renderer": "19.2.3",
//   "tailwindcss": "^3.4.17",
//   "typescript": "~5.9.2"
// },
//   "expo": {
//     "name": "Challengify",
//     "slug": "challengify",
//     "version": "1.0.0",
//     "sdkVersion": "54.0.0",
//     "platforms": [
//       "ios",
//       "android",
//       "web"
//     ]
//   },

//   "private": true
// }


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



// {
//   "cli": {
//     "version": ">= 15.0.15",
//     "appVersionSource": "remote"
//   },
//   "build": {
//     "simulator": {
//       "ios": {
//         "simulator": true,
//         "developmentClient": true
//       }
//     },
    
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal",
//       "env": {
//         "EXPO_PUBLIC_SERVER_URL": "https://capstone-wgt-server.onrender.com",
//         "EXPO_PUBLIC_FIREBASE_API_KEY": "AIzaSyB12LtMOPw2OPeiUS3DB4wtlpQKtTQ-FU8",
//         "EXPO_PUBLIC_messagingSenderId": "373653845536",
//         "EXPO_PUBLIC_appId": "1:373653845536:web:922f2f65a9a7718a92ee45"
//       },
//       "ios": {
//         "simulator": true
//       },
//       "channel": "development"
//     },
//     "preview": {
//       "distribution": "internal",
//       "env": {
//         "EXPO_PUBLIC_SERVER_URL": "https://capstone-wgt-server.onrender.com",
//         "EXPO_PUBLIC_FIREBASE_API_KEY": "AIzaSyB12LtMOPw2OPeiUS3DB4wtlpQKtTQ-FU8",
//         "EXPO_PUBLIC_messagingSenderId": "373653845536",
//         "EXPO_PUBLIC_appId": "1:373653845536:web:922f2f65a9a7718a92ee45"
//       },
//       "ios": {
//         "buildConfiguration": "Release"
//       },
//       "android": {
//         "resourceClass": "medium"
//       },
//       "channel": "preview"
//     },
//     "production": {
//       "channel": "production"
//     }
//   }
// }