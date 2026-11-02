import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Alert,
  Vibration,
  useWindowDimensions,
} from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import {  images } from '../constants';
// import {  authLogin, BASE_URL } from '../apiCalls';
import { router } from 'expo-router';
import {  loadLoginHint, login,  loginAnonymouslyUser,  resendVerification, saveLoginHint, signUp,  waitForUser } from '../services/userServices';
import { getFirebaseErrorMessage } from '../utilities/firebaseEroors';
import ErrorMessage from '../components/custom/errorMessage';
import GoogleButton from '../components/custom/googleButton';
import { auth } from '../firebase/client';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLoading } from '../context/loadingContext';
import { useFonts } from 'expo-font';
import { signInWithGoogle } from '../services/googleLogin';

import {
  BebasNeue_400Regular,
} from "@expo-google-fonts/bebas-neue";

import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { getUserCountry } from '../utilities/userGeoLocation';
import CreateAccountModal from '../components/modal/createAccountModal';
import { registerForPushNotificationsAsync } from '../utilities/registerForPushNotifications';
import { Keyboard } from 'react-native';
import * as NavigationBar from "expo-navigation-bar";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LoginSection from '../components/auth/loginSection';
import RegisterSection from '../components/auth/registerSection';
import { BASE_URL, saveToken } from '../apiCalls/config';



export default function Login() {
  // const { user, setUser } = useGlobalContext();
  const {user,setUser ,colorTheme ,form, setForm , scale , spacing } = useGlobalContext()  
  const [message, setMessage] = useState("")
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
  const [isFetching, setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  // const [form, setForm] = useState({
  //   email: "samcoeur2013@gmail.com",
  //   password: 'Samir@2024',
  // });

  const [openCreateAcctModal , setOpenCreateAcctModal] = useState(false)
  const [error, setError] = useState("");
  const [messageColor, setMessageColor] = useState("pink");
  const [verification , setVerification] = useState(false)

  const {width ,height} = useWindowDimensions()  
  const insets = useSafeAreaInsets();
  const [googleHint, setGoogleHint] = useState(null);
  const [emailHint, setEmailHint] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [selectedSection, setSelectedSection] = useState("login");

  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  // useEffect(() => {
  //   NavigationBar.setVisibilityAsync("visible");
  // }, []);
  
  useEffect(() => {
    if(form.email !== "") return
     const loadHint = async() =>{
      const hint =  await loadLoginHint()
      hint.email && setForm({...form, email:hint.email , password:hint.email.slice(0,7)})  
      if(hint.provider == "google"){
         setGoogleHint(hint.email)  
      }
      if(hint.provider == "email"){
        setEmailHint(hint.email)  
     }
     }
     loadHint()   
  }, [])

  // ---------- LOGIN ----------
  const handleLogin2 = () => {
    if (!validateEmail(form.email)) {
      Vibration.vibrate();
      setIsEmailInvalid(true)
      return;
    }

    if (!validatePassword(form.password)) {
      Vibration.vibrate();
      setIsPasswordInvalid(true)
      return;
    }
    // authLogin(form, setUser, setMessage, setIsFetching)
  }



  // ---------- ANONYMOUS ----------
  const handleAnonymous = async () => {
    try {
      setLoading(true);
      const res = await loginAnonymouslyUser();
      setUser(res.user);
    } catch (e) {
      Alert.alert('Guest failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- VALIDATION ----------
  function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email);
  }

  function validatePassword(passwordRegex) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return re.test(passwordRegex)
  }

  // ---------- EFFECTS ----------
  useEffect(() => {
    if (isEmailInvalid) {
      setMessage("Invalid Email, must contain @ , com ... ")
      setTimeout(() => setIsEmailInvalid(false), 2000);
    }

    if (isEmailWrong) {
      setTimeout(() => {
        setMessage("")
        setIsEmailWrong(false)
      }, 2000);
    }

    if (isPasswordInvalid) {
      setTimeout(() => {
        setMessage("Invalid Password, must contain special character,...")
        setIsPasswordInvalid(false)
      }, 2000);
    }

    if (isPasswordWrong) {
      setTimeout(() => {
        setMessage("")
        setIsPasswordWrong(false)
      }, 2000);
    }
  }, [isEmailInvalid, isEmailWrong, isPasswordInvalid, isPasswordWrong])

  useEffect(() => {
    if (message == "user not found") {
      Vibration.vibrate();
      setIsEmailWrong(true)
    }
    if (message === "invalid password") {
      Vibration.vibrate();
      setIsPasswordWrong(true)
    }
  }, [message])



  //*****************handle sign in with google  */

  // const handleGoogleLogin = async () => {
  //   try {
  //     setError("");

  //     // 🔥 Step 1: Google → Firebase
  //     await signInWithGoogle();
  //     // 🔥 Step 2: Firebase token
  //     const user = await waitForUser();
  //     if (!user) {
  //       setError("user not found");
  //       throw new Error("User not found after Google login");
  //     }
  //     const token = await user.getIdToken(true);
  //     // 🔥 Step 3: Backend
  //     const res = await fetch(`${BASE_URL}/users/auth/google`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify( { token }),
  //     });
  //     const data = await res.json();
  //     // 🔥 Step 4: Store JWT
  //     // setError(data.message);
  //     // if (!data.token) {
  //     //   return setError("token is null")
  //     // }
  //     if(data.token) await saveToken(data.token);
  //     if(data.token)  await saveLoginHint("google", data.user.email)
  
  //     // 🔥 Step 5: Global state
  //     setUser(data.user);
  
  //   } catch (e) {
  //     console.log("GOOGLE LOGIN ERROR:", e);
  //     if (e.message === "Google sign-in cancelled") return;
  //     setError(e.message || "Google login failllled");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGoogleLogin = async () => {
    try {
      // setLoading(true);
      showLoading("Logging in with Google...");
      setError("");
      // 1. Google → Firebase
      const user = await signInWithGoogle();
  
      if (!user) {
        throw new Error("User not found after Google login");
      }
  
      console.log("Firebase user immediately available:", user.uid);
  
      // 2. Get Firebase ID token
      const token = await user.getIdToken(true);
  
      console.log("Firebase ID token:", token ? "EXISTS" : "MISSING");
  
      // 3. Authenticate with backend
      const res = await fetch(`${BASE_URL}/users/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
  
      const data = await res.json();
  
      console.log("Google backend response:", data);
  
      if (!res.ok) {
        throw new Error(data?.message || "Google authentication failed");
      }
  
      if (!data?.token) {
        throw new Error("Backend did not return an authentication token");
      }
  
      // 4. Store your backend JWT
      await saveToken(data.token);
  
      // 5. Store login hint
      if (data?.user?.email) {
        await saveLoginHint("google", data.user.email);
      }
  
      // 6. Update global user state immediately
      if (data?.user) {
        setUser(data.user);
        router.replace("/Home");
      }
  
      console.log("GOOGLE LOGIN COMPLETE:", {
        firebaseUid: user.uid,
        backendUid: data?.user?.uid,
        email: data?.user?.email,
      });
  
    } catch (e) {
      console.log("GOOGLE LOGIN ERROR:", e);
  
      if (e?.message === "Google sign-in cancelled") {
        return;
      }
  
      setError(e?.message || "Google login failed");
    } finally {
      // setLoading(false);
      hideLoading();
    }
  };
  //***********************sign up and login  with email */

  const handleLogin = async () => {
    try {
      showLoading("Logging in...");
      const user = await login(form.email,form.password);
      if (!user.emailVerified) {
        setError("Please verify you email to continue")
        setMessageColor("yellow")
        setVerification(true)
        return;
      }
      showLoading("logging , please wait ...")
      setError("")
      setVerification(false)
      // 3. Get token
      const token = await user.getIdToken();
      // 4. Call backend (authenticate session / fetch user data)
      const res = await fetch(`${BASE_URL}/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( { token }),
      });
      const data = await res.json();
      await saveToken(data.token)
      await saveLoginHint("email", data.user.email)
      // await saveToken(data.token);
      setUser(data.user);
      registerForPushNotificationsAsync(data.user._id);
      router.replace("/Home");
    } catch (error) {
      hideLoading()
      setError(getFirebaseErrorMessage(error));
      setMessageColor("pink")
      setVerification(false)
    }  finally {
      hideLoading();
    }
  };


  const sendVerification = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("Please sign up or login first");
        setMessageColor("red");
        return;
      }
      await resendVerification(user);
      setError("Verification email sent!");
      setMessageColor("lightgray");  
      setVerification(false)
    } catch (e) {
      console.log("RESEND ERROR:", e);
      setError("Failed to resend email");
      setMessageColor("red");
     }
   }

   const handleAnonymousLogin = async () => {
    try {
      showLoading("Entering as guest...");
      // 1. Firebase anonymous login
      const user = await loginAnonymouslyUser();
      // 2. Get token
      const token = await user.getIdToken();
      // 3. Call backend
      const res = await fetch(`${BASE_URL}/users/auth/anonymous`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token,
                               email : form.email,
                             }),
      });
      const data = await res.json();
      // 4. Save JWT

      await saveToken(data.token);
      // 5. Optional: save hint
      await saveLoginHint("guest");
      // 6. Set global user
      setUser(data.user);
      router.replace("/Home");
    } catch (e) {
      console.log("ANONYMOUS LOGIN ERROR:", e);
      setError("Guest login failed");
    } finally {
      hideLoading();
    }
  };

  const handleSignUp = async () => {
    try {
      showLoading("Registering ...");
      const user = await signUp(form.email, form.password);
      // 2. Get Firebase ID token
      const token = await user.getIdToken();
      showLoading("signing up , please wait ...")
      setError("")
      const res = await axios.post(
        `${BASE_URL}/users/auth/signup`,
        {
          token,
          form,
        }
      );
      const data = await res.data;
      setMessage(data.message)
      setMessageColor(data.color)
    } catch (e) {
      if(getFirebaseErrorMessage(e) === "Email is already in use") setIsEmailExist(true)
      else setIsEmailExist(false)
      setError(getFirebaseErrorMessage(e));
      setMessageColor("pink")
      setVerification(false)
    } finally {
       hideLoading()
    }
  };
 
  useEffect(() => {
    setError("")
    setMessageColor("pink")
  }, [selectedSection])
  

// return (
//   <SafeAreaView className="flex-1 justify-start w-full bg-[#050505]">

//     <View className="h-[260px] w-full">
//       <Image
//         source={images.hero}
//         resizeMode="cover"
//         className="abso lute w-full h-full"
//       />  
//     </View>
//     {selectedSection == "login" && (
//        <LoginSection
//        form={form} setForm = {setForm} showPassword ={showPassword} setShowPassword ={setShowPassword} height={height} sendVerification={sendVerification}
//        handleLogin = {handleLogin} handleAnonymousLogin = {handleAnonymousLogin} handleGoogleLogin ={handleGoogleLogin}
//        error={error} messageColor = {messageColor} width={width} verification={verification} setSelectedSection={setSelectedSection}/>
//     )}
//      {selectedSection == "register" && (
//        <RegisterSection   
//        form={form} setForm = {setForm} showPassword ={showPassword} setShowPassword ={setShowPassword} height ={height}
//        handleSignUp= {handleSignUp} handleAnonymousLogin = {handleAnonymousLogin} handleGoogleLogin ={handleGoogleLogin}
//        error={error} messageColor = {messageColor} width={width} verification={verification} setSelectedSection={setSelectedSection}/>
//     )}
      
//   </SafeAreaView>
// );

return (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: "#050505",
    }}
  >
    {/* CINEMATIC BACKGROUND */}
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Image
        source={images.login_background}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* Dark cinematic overlay */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.28)",
          "rgba(0,0,0,0.68)",
          "rgba(0,0,0,0.82)",
          "rgba(0,0,0,0.96)",
        ]}
        locations={[0, 0.28, 0.62, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      {/* Subtle gold atmosphere */}
      <LinearGradient
        colors={[
          "rgba(212,175,55,0.08)",
          "transparent",
          "rgba(212,175,55,0.025)",
        ]}
        locations={[0, 0.45, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
    </View>

    {/* CONTENT */}
    {selectedSection === "login" && (
      <LoginSection
        form={form}
        setForm={setForm}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        height={height}
        sendVerification={sendVerification}
        handleLogin={handleLogin}
        handleAnonymousLogin={handleAnonymousLogin}
        handleGoogleLogin={handleGoogleLogin}
        error={error}
        messageColor={messageColor}
        width={width}
        verification={verification}
        setSelectedSection={setSelectedSection}
      />
    )}

    {selectedSection === "register" && (
      <RegisterSection
        form={form}
        setForm={setForm}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        height={height}
        handleSignUp={handleSignUp}
        handleAnonymousLogin={handleAnonymousLogin}
        handleGoogleLogin={handleGoogleLogin}
        error={error}
        messageColor={messageColor}
        width={width}
        verification={verification}
        setSelectedSection={setSelectedSection}
      />
    )}
  </SafeAreaView>
);

}