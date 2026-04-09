
import {  initializeApp } from 'firebase/app';
import {
  getReactNativePersistence, 
  initializeAuth
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "challengify-wgt.firebaseapp.com",
  projectId: "challengify-wgt",
  storageBucket: "challengify-wgt.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
};

const app = initializeApp(firebaseConfig);

// ---------------- INIT AUTH (LAZY) ----------------
// let auth = null;

// export const getFirebaseAuth = () => {
//   try {
//     auth = initializeAuth(app, {
//       persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//     });
//   } catch (e) {
//     auth = getAuth(app);
//   }
//   console.log("auth" ,auth)
//   return auth;
// };

const auth =  initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Export your auth instance for use in other parts of your app
export {auth} ; 


