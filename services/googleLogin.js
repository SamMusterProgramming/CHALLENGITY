// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
// import { getFirebaseAuth } from '../firebase/client';


// export const signInWithGoogle = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     const idToken = userInfo.idToken;
//     if (!idToken) throw new Error('No ID token');
//     // Firebase login
//     const credential = GoogleAuthProvider.credential(idToken);
//     const userCredential = await signInWithCredential(
//       getFirebaseAuth(),
//       credential
//     );
//     // 🔥 GET Firebase ID TOKEN (this is what you send to backend)
//     const firebaseIdToken = await userCredential.user.getIdToken();
//     return {
//       user: userCredential.user,
//       idToken: firebaseIdToken,
//     };
//   } catch (error) {
//     console.log('❌ Google Sign-In Error:', error);
//     throw error;
//   }
// };
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