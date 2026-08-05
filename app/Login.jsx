import React, { useState, useEffect } from 'react';
import { saveToken } from '../apiCalls';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Vibration,
  useWindowDimensions,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import {  images } from '../constants';
import {  authLogin, BASE_URL } from '../apiCalls';
import { router } from 'expo-router';
import {  loadLoginHint, login,  loginAnonymouslyUser,  resendVerification, saveLoginHint, signUp,  waitForUser } from '../services/userServices';
import { getFirebaseErrorMessage } from '../utilities/firebaseEroors';
import ErrorMessage from '../components/custom/errorMessage';
import GoogleButton from '../components/custom/googleButton';
import { auth } from '../firebase/client';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLoading } from '../context/loadingContext';
import { useFonts } from 'expo-font';
// import { signInWithGoogle } from '../services/googleLogin';

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



export default function Login() {
  // const { user, setUser } = useGlobalContext();
  const {user,setUser ,colorTheme ,form, setForm } = useGlobalContext()  
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

  const handleGoogleLogin = async () => {
    try {
      setError("");

      // 🔥 Step 1: Google → Firebase
      await signInWithGoogle();
      // 🔥 Step 2: Firebase token
      const user = await waitForUser();
      if (!user) {
        setError("user not found");
        throw new Error("User not found after Google login");
      }
      const token = await user.getIdToken(true);
      // 🔥 Step 3: Backend
      const res = await fetch(`${BASE_URL}/users/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( { token }),
      });
      const data = await res.json();
      // 🔥 Step 4: Store JWT
      // setError(data.message);
      // if (!data.token) {
      //   return setError("token is null")
      // }
      if(data.token) await saveToken(data.token);
      if(data.token)  await saveLoginHint("google", data.user.email)
  
      // 🔥 Step 5: Global state
      setUser(data.user);
  
    } catch (e) {
      console.log("GOOGLE LOGIN ERROR:", e);
      if (e.message === "Google sign-in cancelled") return;
      setError(e.message || "Google login failllled");
    } finally {
      setLoading(false);
    }
  };
  //***********************sign up and login  with email */

  const handleLogin = async () => {
    try {
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
    } finally {
       
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
      // 1. Create user in Firebase
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
  

return (
  <SafeAreaView className="flex-1 justify-start w-full bg-[#050505]">

    <View className="h-[260px] w-full">
      <Image
        source={images.hero}
        resizeMode="cover"
        className="abso lute w-full h-full"
      />  
    </View>
    {selectedSection == "login" && (
       <LoginSection
       form={form} setForm = {setForm} showPassword ={showPassword} setShowPassword ={setShowPassword} height={height} sendVerification={sendVerification}
       handleLogin = {handleLogin} handleAnonymousLogin = {handleAnonymousLogin} handleGoogleLogin ={handleGoogleLogin}
       error={error} messageColor = {messageColor} width={width} verification={verification} setSelectedSection={setSelectedSection}/>
    )}
     {selectedSection == "register" && (
       <RegisterSection   
       form={form} setForm = {setForm} showPassword ={showPassword} setShowPassword ={setShowPassword} height ={height}
       handleSignUp= {handleSignUp} handleAnonymousLogin = {handleAnonymousLogin} handleGoogleLogin ={handleGoogleLogin}
       error={error} messageColor = {messageColor} width={width} verification={verification} setSelectedSection={setSelectedSection}/>
    )}
      
  </SafeAreaView>
);

}