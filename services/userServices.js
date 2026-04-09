import { createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, sendEmailVerification, signInAnonymously, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/client";
import { removeToken } from "../apiCalls";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import app from "../firebase/client";



  // const auth = getAuth(app);
// ---------------- getFirebaseAuth METHODS ----------------

  
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};
  
  
export const logoutUser = async (setUser, router) => {
  try {
    // 1. Firebase logout
    await signOut(auth);

    // 2. Remove backend JWT
    await removeToken();

    // 3. Clear global state
    setUser(null);

    // 4. Redirect to login
    router.replace("/Login");

  } catch (error) {
    console.log("Logout error:", error);
  }
};
  
  // ---------------- EMAIL FLOW ----------------
  export const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    return user;
  };
  
  export const loginWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  };

  export const resendVerification = async (user) => {
    await sendEmailVerification(user);
  };


 export  const waitForUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          unsubscribe();
          resolve(user);
        }
      });
  
      // safety timeout
      setTimeout(() => {
        unsubscribe();
        reject(new Error("User not found after login"));
      }, 5000);
    });
  };

  export const saveLoginHint = async (provider, email) => {
    try {
      await AsyncStorage.setItem("lastProvider", provider);
      if (email) {
        await AsyncStorage.setItem("lastEmail", email);
      }
    } catch (e) {
      console.log("Save hint error:", e);
    }
  };

  export const loadLoginHint = async () => {
    try {
      const provider = await AsyncStorage.getItem("lastProvider");
      const email = await AsyncStorage.getItem("lastEmail");
  
      return { provider, email };
    } catch (e) {
      console.log("Load hint error:", e);
      return {};
    }
  };