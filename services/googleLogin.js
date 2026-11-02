
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase/client';


export const signInWithGoogle = async () => {
  try {
    // 1. Check Google Play Services
    await GoogleSignin.hasPlayServices();

    // 2. Open Google Sign-In
    const userInfo = await GoogleSignin.signIn();

    console.log("Google user:", userInfo);

    // User cancelled Google Sign-In
    if (userInfo?.type === "cancelled") {
      throw new Error("Google sign-in cancelled");
    }

    // 3. Get Google ID token
    const { idToken } = await GoogleSignin.getTokens();

    console.log(
      "Google ID TOKEN:",
      idToken ? "EXISTS" : "MISSING"
    );

    if (!idToken) {
      throw new Error("No Google ID token received");
    }

    // 4. Create Firebase credential
    const credential = GoogleAuthProvider.credential(idToken);

    // 5. Sign into Firebase
    const userCredential = await signInWithCredential(
      auth,
      credential
    );

    // IMPORTANT:
    // This is the Firebase user created by THIS login.
    const firebaseUser = userCredential.user;

    console.log("Firebase user:", {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
    });

    // 6. Return it directly
    return firebaseUser;

  } catch (error) {
    console.log("Google Sign-In Error:", error);
     if (
      error?.code === "SIGN_IN_CANCELLED" ||
      error?.code === "SIGN_IN_CANCELED" ||
      error?.code === "12501" ||
      error?.message?.toLowerCase?.().includes("cancel")
    ) {
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