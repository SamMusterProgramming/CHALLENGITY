
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase/client';

export const signInWithGoogle = async () => {
  try {
    // ✅ Check Play Services
    await GoogleSignin.hasPlayServices();

    // ✅ Open Google UI
    const userInfo = await GoogleSignin.signIn();

    console.log("Google user:", userInfo);

    // ❌ DON'T use userInfo.idToken
    // ✅ ALWAYS use this:
    const { idToken } = await GoogleSignin.getTokens();

    console.log("ID TOKEN:", idToken ? "EXISTS" : "MISSING");

    if (!idToken) {
      throw new Error("No Google ID token received");
    }

    // 🔥 Firebase login
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);

    return userCredential.user;

  } catch (error) {
    console.log("Google Sign-In Error:", error);

    if (error.code === 'SIGN_IN_CANCELLED') {
      throw new Error("Google sign-in cancelled");
    }

    throw error;
  }
};


export const googleLogout = async () => {
  try {
    // FIREBASE LOGOUT
    await auth.signOut();
    // GOOGLE LOGOUT
    await GoogleSignin.signOut();
    // OPTIONAL
    await GoogleSignin.revokeAccess();
  } catch (e) {
    console.log(e);
  }
};