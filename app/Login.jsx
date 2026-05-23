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
  Pressable,
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
import CreateAccountModal from '../components/modal/createAccountModal';



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
    password: 'Samir@2024',
  });
  const [name , SetName] = useState ({
     firstname:"",
     lastname:""
  })
  const [openCreateAcctModal , setOpenCreateAcctModal] = useState(false)
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
                               email : form.email,
                             }),
      });
      const data = await res.json();
      console.log(data)
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
      backgroundColor: "#050505",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      alignItems: "center",
      justifyContent: "between",
    }}
  >

    {/* subtle glow background */}
    {/* <View
      style={{
        position: "absolute",
        top: -200,
        width: width * 1.4,
        height: width * 1.4,
        borderRadius: 999,
        backgroundColor: "rgba(212,175,55,0.06)",
      }}
    /> */}

    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        // paddingHorizontal: 11,
      }}
    >

      {/* ===== HEADER ===== */}
      <View
        className ="justify-center h-[20%]"
        style={{
          alignItems: "center",
          // marginBottom: 30,
          // height: height * 0.25,
        }}
      >
        <Image
          source={icons.talentify_logo}
          resizeMode="contain"
          style={{
            width: width * 0.95,
            height: height * 0.15,
          }}
        />

        <Text
          style={{
            // marginTop: 10,
            color: "rgba(255,255,255,0.65)",
            fontSize: height / 64,
            textAlign: "center",
            width: "80%",
            lineHeight: 20,
          }}
        >
          Compete. Perform. Get discovered worldwide.
        </Text>
      </View>

      {/* ===== LOGIN CARD (PREMIUM GLASS) ===== */}
      <View
      className ="justify-center bg- [#464343] px-8 py-4 h-[60%] "
        style={{
          // flex:1,
          width: "100%",
          // height : height * 0.6 ,
          // maxWidth: 420,
          // borderRadius: 12,
          // padding: 15,
          // backgroundColor: "rgba(255,255,255,0.04)",
          // borderWidth: 1,
          // borderColor: "rgba(255,255,255,0.10)",
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 30,
          elevation: 10,
        }}
      >

        {/* TITLE */}
        <View
        style={{
          marginBottom: 48
        }}
         className="">
            <Text
              style={{
                color: "#fff",
                fontSize: width / 20,
                fontWeight: "900",
                textAlign: "center",
              }}
            >
              Welcome back
            </Text>

            <Text
              style={{
                marginTop: 6,
                // marginBottom: 28,
                color: "rgba(255,255,255,0.45)",
                fontSize: width / 36,
                textAlign: "center",
              }}
            >
              Sign in to continue your journey
            </Text>
        </View>
       

        {/* ===== INPUTS ===== */}

        <View 
        style ={{
          marginBottom: 48
        }}
        className="flex- 1">
              {/* EMAIL */}
              <View
                style={{
                  height: height/18,
                  borderRadius: 5,
                  justifyContent: "center",
                  paddingHorizontal: 14,
                  // backgroundColor: "rgba(255,255,255,0.04)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.42)",
                  marginBottom: 24,
                }} >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: width / 40,
                    // fontWeight: "900",
                    textAlign: "center",
                    
                    // backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                  className="absolute top-[-10] pl-2 pr-4 bg-[#050505] tracking-wider font-montserrat  left-0"
                >
                  Email
                </Text>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={form.email}
                  onChangeText={(e) => setForm({ ...form, email: e })}
                  style={{
                    color: "#fff",
                    fontSize: 15,
                  }}
                />
              </View>

              {/* PASSWORD */}
              <View
                style={{
                  height: height/18,
                  borderRadius: 5,
                  justifyContent: "center",
                  paddingHorizontal: 14,
                  backgroundColor: "#050505",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.42)",
                  marginBottom: 24,
                }}
              >
                 <Text
                  style={{
                    color: "#fff",
                    fontSize: width / 40,
                    // fontWeight: "900",
                    textAlign: "center",
                    // backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                  className="absolute top-[-10] pl-2 pr-4 bg-[#050505] tracking-wider font-montserrat  left-0"
                >
                  Password
                </Text>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  secureTextEntry
                  value={form.password}
                  onChangeText={(e) => setForm({ ...form, password: e })}
                  style={{
                    color: "#fff",
                    fontSize: 15,
                  }}
                />
              </View>

              {/* ===== BUTTONS ===== */}

              {/* PRIMARY LOGIN */}
              <TouchableOpacity       
                activeOpacity={0.9}
                onPress={handleLogin}
                style={{
                  // marginTop: 12,
                  height: height/18,
                  borderRadius: 8,
                  backgroundColor: "#D4AF37",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 12,
                }} >
                <Text
                  style={{
                    color: "#0A0A0A",
                    fontSize: width /36 ,// 14,
                    fontWeight: "800",
                    letterSpacing: 0.6,
                  }}
                >
                  LOGIN
                </Text>
              </TouchableOpacity>

              {/* GOOGLE */}
              <GoogleButton onPress={handleGoogleLogin} />
          </View>

          {/* <View>
            <TouchableOpacity
              // className = "mt-auto"
              onPress= {() => {setOpenCreateAcctModal(true)}} // {handleSignUp}
              activeOpacity={0.8}
              style={{
                // marginTop: 10,
                height: height/18,
                borderRadius: 8,
                // borderWidth: 1,
                // borderColor: "rgba(255,255,255,0.14)",
                backgroundColor: "rgba(255,255,255,0.04)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                CREATE ACCOUNT
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAnonymousLogin}
              style={{
                marginTop: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 12,
                  letterSpacing: 0.8,
                }}
              >
                Continue as Guest
              </Text>
            </TouchableOpacity>
          </View> */}

      <View
        style={{
          marginTop: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 4,
        }}
      >

        {/* CREATE ACCOUNT */}
        <Pressable
            onPress= {() => {setOpenCreateAcctModal(true)}} // {handleSignUp}
            android_ripple={{
            color: "rgba(255,255,255,0.08)",
            borderless: false,
          }}
          style={{
            paddingVertical: 10,
            // paddingHorizontal: 14,
            borderRadius: 14,
            backgroundColor: "rgba(255,255,255,0.03)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <Text
            style={{
              fontSize: width / 32,
              // color: "#E5E7EB",
              fontWeight: "600",
              letterSpacing: 0.4,
            }}
            className = "text-[#7ea1e8]"
          >
           don't have an account ?  Sign up 
          </Text>
        </Pressable>

        {/* GUEST */}
        {/* <Pressable
          onPress={handleAnonymousLogin}
          android_ripple={{
            color: "rgba(212,175,55,0.08)",
            borderless: false,
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 14,
            backgroundColor: "rgba(212,175,55,0.08)",
            borderWidth: 1,
            borderColor: "rgba(212,175,55,0.18)",
          }}
        >
          <Text
            style={{
              fontSize: width / 36,
              color: "#D4AF37",
              fontWeight: "700",
              letterSpacing: 0.5,
            }}
          >
            Continue as Guest
          </Text>
        </Pressable> */}

      </View>



      </View> 
     
      {/* ===== FOOTER ===== */}
      <View
      className ="fle x-1 justify-center items-center gap-4 b g-white min-h-[20%]"
        style={{
          // height:height * 0.15,
          // marginBottom: 8,
          alignItems: "center",
          width: "100%",
        }}
      >
        <ErrorMessage
          message={error}
          color={messageColor}
          width={width}
        />
        

        {verification && (
          <TouchableOpacity onPress={sendVerification}>
            <Text
              style={{
                // marginTop: 10,
                color: "#D4AF37",
                fontWeight: "600",
              }}
            >
              Resend verification email
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {openCreateAcctModal && (
      <CreateAccountModal 
      setIsVisible = {setOpenCreateAcctModal}
      form={form}
      setForm={setForm}
      name={name}
      SetName={SetName}
      onPress={handleSignUp}
      width={width}
      height={height} />
      )}
    </View>
  </View>
);
}