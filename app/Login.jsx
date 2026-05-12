import React, { useState, useEffect } from 'react';
import { generateChallengeTalentGuinessData, getAllTalentStages, getFavouriteList, getFavouriteStageList, getFavouriteStages, getFollowData, getFollowings, getNotificationByUser, getRegionTalentStages, getTopTalents,  getUserFriendsData, 
  getUserTalent, 
  saveToken} from '../apiCalls';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Vibration,
  useWindowDimensions,
} from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { icons } from '../constants';
import {  authLogin, BASE_URL } from '../apiCalls';
import { router } from 'expo-router';
import {  loadLoginHint, login,  loginAnonymouslyUser,  resendVerification, saveLoginHint, signUp,  waitForUser } from '../services/userServices';
import { getFirebaseErrorMessage } from '../utilities/firebaseEroors';
import ErrorMessage from '../components/custom/errorMessage';
import GoogleButton from '../components/custom/googleButton';
import { auth } from '../firebase/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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



export default function Login() {
  // const { user, setUser } = useGlobalContext();
  const {user,setUser ,  allStages, setAllStages ,setFavouriteList,setUserTalents,setRegionStages, setTopTalents ,favouriteStages, setFavouriteStages
    ,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges,isLoggingOut, setIsLoggingOut
    ,userProfileImg,setUserProfileImg ,hotStages, setHotStages , gpsLocation , setGpsLocation , setGlobalSelectedRegion ,  setUserCountryCode  } = useGlobalContext()  
  const [message, setMessage] = useState("")
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
  const [isFetching, setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "samcoeur2013@gmail.com",
    password: '',
  });

  const [error, setError] = useState("");
  const [messageColor, setMessageColor] = useState("pink");
  const [verification , setVerification] = useState(false)

  const {width ,height} = useWindowDimensions()  
  const insets = useSafeAreaInsets();
  const [googleHint, setGoogleHint] = useState(null);
  const [emailHint, setEmailHint] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });
  

  useEffect(() => {
     const loadHint = async() =>{
      const hint =  await loadLoginHint()
      hint.email && setForm({ email:hint.email , password:hint.email.slice(0,7)})  
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
    authLogin(form, setUser, setMessage, setIsFetching)
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
      await saveToken(data.token);
      await saveLoginHint("google", data.user.email)
  
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
      
      const user = await login(form.email, form.password);
 
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

    } catch (error) {
      hideLoading()
      setError(getFirebaseErrorMessage(error));
      setVerification(false)

    } finally {
       
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
      
      // 3. Call your backend
      const res = await fetch(`${BASE_URL}/users/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      setError(data.message)
      setMessageColor(data.color)

    } catch (e) {
      setError(getFirebaseErrorMessage(e));
      setMessageColor("pink")
      setVerification(false)

    } finally {
       hideLoading()
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
      setMessageColor("green");
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
                               email: form.email, }),
      });
      
      const data = await res.json();
      // 4. Save JWT
      await saveToken(data.token);
  
      // 5. Optional: save hint
      await saveLoginHint("guest");
  
      // 6. Set global user
      setUser(data.user);
  
    } catch (e) {
      console.log("ANONYMOUS LOGIN ERROR:", e);
      setError("Guest login failed");
    } finally {
      hideLoading();
    }
  };



useEffect(() => {
  if (!user) return;
  const fetchUserData = async () => {
    try {
      await Promise.all([
        getUserTalent(user._id, setUserTalents),
        getNotificationByUser(user._id, setNotifications),
        // getFollowings(user._id, setFollowings),
        getUserFriendsData(user._id, setUserFriendData),
        getFollowData(user._id, setFollow),
        getFavouriteStageList(user._id, setFavouriteList),
        getFavouriteStages(user._id, setFavouriteStages),
        // getTopTalents(user._id, setTopTalents),
        // getAllTalentStages(setAllStages),
        
        // getRegionTalentStages("US" , setRegionStages),
        generateChallengeTalentGuinessData(user._id, setHotStages),
      ]);
      await getUserCountry().then( async(res) => {
                    setGlobalSelectedRegion(res)
                    setUserCountryCode(res)
                    await getRegionTalentStages(res, setRegionStages)
                        })
      setUserProfileImg(user.profileImage?.publicUrl);
      router.replace("/Home");
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      hideLoading();
    }
  };
  fetchUserData();
}, [user]);
 

  
return (
  <View
    style={{
      flex: 1,
      backgroundColor: "#070809",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >

    {/* -------- LOGO -------- */}
    <View style={{ height: "20%", justifyContent: "center" }}>
      <Image
        source={icons.challengify_logo}
        resizeMode="contain"
        style={{
          width: width * 0.55,
          height: "100%",
          opacity: 0.85,
        }}
      />
    </View>

    {/* -------- FORM -------- */}
    <View
      style={{
        width: "82%",
        gap: 18,
      }}
    >

      {/* EMAIL */}
      <View
        className = " rounded-md"
        style={{
          borderWidth: 0.6,
          borderColor: "rgba(255,255,255,0.15)",
          padding: 10,
        }}
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.35)"
          value={form.email}
          onChangeText={(e) => setForm({ ...form, email: e })}
          style={{
            color: "#fff",
            fontSize: width / 28,
            letterSpacing: 0.5,
          }}
        />
      </View>

      {/* PASSWORD */}
      <View
        className = " rounded-md"
        style={{
          borderWidth: 0.6,
          borderColor: "rgba(255,255,255,0.15)",
          padding: 10,
        }}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.35)"
          secureTextEntry
          value={form.password}
          onChangeText={(e) => setForm({ ...form, password: e })}
          style={{
            color: "#fff",
            fontSize: width / 28,
            letterSpacing: 0.5,
          }}
        />
      </View>

      {/* -------- ACTIONS -------- */}
      <View style={{ marginTop: 15, gap: 12 }}>

        {/* LOGIN (PRIMARY) */}
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.85}
          style={{
            paddingVertical: 11,
            borderRadius: 999,
            backgroundColor: "#E6C068",
            alignItems: "center",
            shadowColor: "#E6C068",
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text
            style={{
              color: "#0A0B0D",
              fontSize: width / 35,
              fontWeight: "600",
              letterSpacing: 1.5,
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>

        {/* SIGN UP (SECONDARY GHOST) */}
        <TouchableOpacity
          onPress={handleSignUp}
          activeOpacity={0.8}
          className ="bg-black-100 rounded-xl"
          style={{
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#E6C068",
              fontSize: width / 32,
              letterSpacing: 1.2,
              opacity: 0.9,
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>

      </View>

      {/* GOOGLE */}
      <View style={{ marginTop: 10 }}>
        <GoogleButton onPress={handleGoogleLogin} />
      </View>

      {/* anonymous buttom */}
      <TouchableOpacity
        onPress={handleAnonymousLogin}
        style={{
          marginTop: 12,
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor: "rgba(255,255,255,0.05)",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#aaa",
            letterSpacing: 1,
            fontSize: width / 32,
          }}
        >
          CONTINUE AS GUEST
        </Text>
      </TouchableOpacity>

      {/* HINT */}
      <Text
        style={{
          marginTop: 12,
          fontSize: width / 42,
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
        }}
      >
        {googleHint
          ? `Google: ${googleHint}`
          : emailHint
          ? `Last used: ${emailHint}`
          : ""}
      </Text>

    </View>

    {/* -------- FOOTER -------- */}
    <View
      style={{
        height: "18%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ErrorMessage message={error} color={messageColor} width={width} />

      {verification && (
        <TouchableOpacity
          onPress={sendVerification}
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#E6C068",
              fontSize: width / 34,
              letterSpacing: 1,
            }}
          >
            Resend Verification
          </Text>
        </TouchableOpacity>
      )}
    </View>

  </View>
);
}