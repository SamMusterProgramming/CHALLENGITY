import * as Google from 'expo-auth-session/providers/google';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithCredential,
  getReactNativePersistence,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ----------------- Firebase config -----------------
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "challengify-wgt.firebaseapp.com",
  projectId: "challengify-wgt",
  storageBucket: "challengify-wgt.firebasestorage.app",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
};

// ----------------- Initialize Firebase App -----------------
const getFirebaseApp = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
};

// ----------------- Auth & Storage -----------------
export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  return initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
};

export const getFirebaseStorage = () => {
  const app = getFirebaseApp();
  return getStorage(app);
};

// ----------------- Email/Password -----------------
export const signUpWithEmail = async (email, password) => {
  const auth = getFirebaseAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = async (email, password) => {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

// ----------------- Anonymous Login -----------------
export const loginAnonymously = async () => {
  const auth = getFirebaseAuth();
  return signInAnonymously(auth);
};

// ----------------- Google Login Hook -----------------
export const useGoogleLogin = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID, 
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,   
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,  });

  const signInWithGoogle = async () => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      const auth = getFirebaseAuth();
      return signInWithCredential(auth, credential);
    }
  };

  return { request, response, promptAsync, signInWithGoogle };
};