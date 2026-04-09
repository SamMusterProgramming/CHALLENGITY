import React, { useState, useEffect } from 'react';
import { getFavouriteList, getFollowData, getFollowings, getNotificationByUser, getTopChallenges,  getTopTalents,  getUserFriendsData, 
  getUserParticipateChallenges, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, 
  getUserPublicParticipateChallenges, getUserTalent, getUserTalentPerformances, 
  saveToken} from '../apiCalls';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  Vibration,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';
import { icons } from '../constants';
import { api, authLogin, BASE_URL } from '../apiCalls';
import { router } from 'expo-router';

import {  loadLoginHint, login, logout, resendVerification, saveLoginHint, signUp, signUpWithEmail, waitForUser } from '../services/userServices';
import axios from 'axios';
import AuthLoadingScreen from '../components/auth/authLoadingScreen';
import { getFirebaseErrorMessage } from '../utilities/firebaseEroors';
import ErrorMessage from '../components/custom/errorMessage';
import GoogleButton from '../components/custom/googleButton';
import { auth } from '../firebase/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { signInWithGoogle } from '../services/googleLogin';




export default function Login() {
  // const { user, setUser } = useGlobalContext();
  const {user,setUser , menuPanelBgColor, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteList,setUserTalents,setUserTalentPerformances,topTalents, setTopTalents
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges,isLoggingOut, setIsLoggingOut
    ,userProfileImg,setUserProfileImg , userCoverImg,setUserCoverImg} = useGlobalContext()  
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
      // 1. Login with Firebase

      const user = await login(form.email, form.password);
 
      if (!user.emailVerified) {
        setError("Please verify you email to continue")
        setMessageColor("yellow")
        setVerification(true)
        return;
      }
      setLoading(true);
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
      setLoading(false);
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

      setLoading(true);
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
      console.log(data)
      setError(data.message)
      setMessageColor(data.color)
      // await saveToken(data.token)
      // setUser(data.user);
    } catch (e) {
      setError(getFirebaseErrorMessage(e));
      setMessageColor("pink")
      setVerification(false)

    } finally {
       setLoading(false);
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

 useEffect(() => {
    if(user){
      setLoading(true)
      getUserTalent(user._id , setUserTalents)
      // getUserTalentPerformances(user._id , setUserTalentPerformances)
      getNotificationByUser(user._id , setNotifications)
      getFollowings(user._id,setFollowings)
      getUserFriendsData(user._id,setUserFriendData)
      getFollowData(user._id,setFollow)
      getFavouriteList(user._id,setFavouriteList)
      // getTopChallenges(user._id,setTrendingChallenges) 
      getTopTalents(user._id ,setTopTalents)
      setUserProfileImg(user.profileImage?.publicUrl)
      setTimeout(() => {
        setLoading(false)
        router.replace('/Home')
      }, 2000);
    }
 }, [user])    
 
 if (loading) {
  return  <AuthLoadingScreen />
}
  
  return (
    <View 
    className="flex-col flex-1 justify-between items-center"
    style={{ flex: 1, backgroundColor: '#0B0D0F', padding: 0, 
      paddingTop:Platform.OS == "ios" ? insets.top : insets.top ,
      paddingBottom : insets.bottom
     }}>
    
      <View
      className ="h-[15%] w-[100%] justify-center items-center"
      >
          <Image  
            source={icons.challengify_logo}
            style={{ width: "90%", height: "100%", alignSelf: 'center' }}
            resizeMode="contain"
          />
      </View>
     
     
      <View 
      className="h-[60%] justify-center rounded-md"
      style={{ 
        marginTop: 30,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 26,
        elevation: 3,
      //  backgroundColor: '#303949',
        // padding: 20,
        width:"80%"}}> 
        <TextInput
          className="bg-[#1b1d1e] border border-[#2A2A2A"
          placeholder="Email"
          placeholderTextColor="#888"
          value={form.email}
          onChangeText={(e) => setForm({ ...form, email: e })}
          style={{ color: 'white', padding: 12, borderRadius: 5, marginBottom: 10 }}
        />
        <TextInput
          className="bg-[#1b1d1e]  border border-[#2A2A2A"
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={form.password}
          onChangeText={(e) => setForm({ ...form, password: e })}
          style={{  color: 'white', padding: 12, borderRadius: 5 }}
        />

        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <TouchableOpacity 
           onPress={handleLogin}
           style={{ flex: 1, backgroundColor: '#EAB308', padding: 12, borderRadius: 10, marginRight: 5 }}>
            <Text style={{ color: 'black', textAlign: 'center',fontWeight :600 }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=> handleSignUp()}
           style={{ flex: 1, backgroundColor: '#3ecf8e', padding: 12, borderRadius: 10, marginLeft: 5 }}>
            <Text style={{ color: 'black', textAlign: 'center' ,fontWeight :600 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <GoogleButton   onPress={handleGoogleLogin}   />
        <View
        className ="w-full"
         style={{ marginTop: 30 }}>
          <Text
          className="text-gray-200"
            style={{
              fontSize: 11,
              textAlign: "center",
            }}
          >
            * {googleHint 
              ? `You previously signed in with Google as ${googleHint}`
              : `Continue with your email: ${emailHint || ""}`} 
          </Text>
        </View>
      </View>
      {/* ) : (
      <View style={{ marginTop: 30, backgroundColor: '#303949', padding: 20, borderRadius: 15 }}> 
         <ActivityIndicator style={{ marginTop: 20 }} />
      </View>
      )} */}


      {/* <TouchableOpacity
        style={{ marginTop: 20, backgroundColor: '#de4d41', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'center',width:"80%" }}
      >
        <FontAwesome name="google" size={20} color="white" />
        <Text style={{ color: 'white', marginLeft: 10 }}>Continue with Google</Text>
      </TouchableOpacity> */}

    
      <View
      className ="h-[25%]  b g-yellow-100 flex-col justify-center gap-4 items-center"  >
         <ErrorMessage message ={error} color ={messageColor}/>
         {verification && (
         <TouchableOpacity
           onPress={sendVerification}
           style={{
             backgroundColor: 'white',
             padding: 12,
             borderRadius: 11,
             marginLeft: 5
           }}
           className="" >
            <Text 
            style={{fontSize: width/38 , color: 'blue', textAlign: 'center', fontWeight: 600 }}>
              Resend Verification
            </Text>
         </TouchableOpacity>
         )}
         
      </View>
  
     
      

      {/* <TouchableOpacity
        onPress={()=>handleAnonymous()}
        style={{ marginTop: 15, backgroundColor: '#555', padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Continue as Guest</Text>
      </TouchableOpacity> */}

      {/* {loading && <ActivityIndicator style={{ marginTop: 20 }} />} */}
    </View>
  );
}