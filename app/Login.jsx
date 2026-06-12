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
import { registerForPushNotificationsAsync } from '../utilities/registerForPushNotifications';
import { Keyboard } from 'react-native';
import * as NavigationBar from "expo-navigation-bar";



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
 
return (
  <View
    style={{ flex: 1, backgroundColor: "#050505" }}
    // behavior={Platform.OS === "ios" ? "padding" : undefined}
     >
    
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* HEADER SPACE */}
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={images.applogo}
              resizeMode="contain"
              style={{
                width: width * 0.92,
                height: height / 8,
              }}
            />

            <Text
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: width / 28,
                textAlign: "center",
                width: "82%",
                lineHeight: width / 16,
                // marginTop: height / 120,
              }}
            >
              Compete. Shine. Get Discovered.
            </Text>
          </View>

          {/* CENTER LOGIN SECTION */}
          <View
            style={{
              width: "100%",
              paddingHorizontal: width / 24,
              justifyContent: "center",
            }}
          >
            {/* TITLE */}
            <View
              style={{
                marginBottom: height / 30,
              }}
            >
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
                  marginTop: height / 140,
                  color: "rgba(255,255,255,0.45)",
                  fontSize: width / 28,
                  textAlign: "center",
                }}
              >
                Sign in to continue your journey
              </Text>
            </View>

            {/* EMAIL */}
            <View
              style={{
                height: height / 16,
                borderRadius: width / 80,
                justifyContent: "center",
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: colorTheme,
                marginBottom: height / 45,
              }}
            >
              <Text
                style={{
                  color: colorTheme,
                  fontSize: width / 34,
                }}
                className="absolute top-[-12] pl-2 pr-4 bg-[#050505] tracking-wider font-semibold left-0"
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
                  fontSize: width / 28,
                }}
              />
            </View>

            {/* PASSWORD */}
            <View
              style={{
                height: height / 16,
                borderRadius: width / 80,
                justifyContent: "center",
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: colorTheme,
                backgroundColor: "#050505",
                marginBottom: height / 45,
              }}
            >
              <Text
                style={{
                  color: colorTheme,
                  fontSize: width / 34,
                }}
                className="absolute top-[-12] pl-2 pr-4 bg-[#050505] tracking-wider font-semibold left-0"
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
                  fontSize: width / 28,
                }}
              />
            </View>

            {/* LOGIN */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleLogin}
              style={{
                height: height / 16,
                borderRadius: width / 60,
                backgroundColor: colorTheme,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: height / 45,
              }}
            >
              <Text
                style={{
                  color: "#0A0A0A",
                  fontSize: width / 28,
                  fontWeight: "700",
                  letterSpacing: 0.6,
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>

            <GoogleButton onPress={handleGoogleLogin} />
          </View>

          {/* FOOTER SPACE */}
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: height / 20,
            }}
            className ="bg-gold/10"
          >
                <View
                  style={{
                    flexDirection: "col",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 8,
                    // marginTop : height /30
                  }}
                  className =" bg-black py-4 w-full"
                >
                  <Pressable
                      onPress= {() => {
                        router.push('/signup')
                        // setOpenCreateAcctModal(true)
                      }}
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
                        fontSize: width / 29,
                        // color: "#E5E7EB",
                        fontWeight: "600",
                        letterSpacing: 0.4,
                      }}
                      className = "text-white"
                    >
                    Don't have an account ? {' '}
                      <Text
                        style={{
                          fontSize: width / 25,
                          color: colorTheme,
                          fontWeight: "600",
                          letterSpacing: 0.4,
                        }}
                        // className = "text-[#7ea1e8]"
                      >
                        Sign up 
                      </Text>
                    </Text>
                    
                  </Pressable>
                  <Pressable
                    onPress={handleAnonymousLogin}
                    android_ripple={{
                      color: "rgba(212,175,55,0.08)",
                      borderless: false,
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      borderRadius: 14,
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
                  </Pressable>
              </View>

              <View
              className = "flex-1 w-[90%] mb-6 justify-center rounded-b-full gap-4 bg-black border-l-4 border-r-4 border-b-4 border-goldSoft/20 items-center" >
                 
                 
                  <ErrorMessage
                  message={error}
                  color={messageColor}
                  width={width} />
            
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
            
            </View>

          {openCreateAcctModal && (
            <CreateAccountModal
              setIsVisible={setOpenCreateAcctModal}
              setIsEmailExist={setIsEmailExist}
              isEmailExist={isEmailExist}
              form={form}
              setForm={setForm}
              name={name}
              SetName={SetName}
              onPress={handleSignUp}
              width={width}
              height={height}
            />
          )}
        </View>
  </View>
);
}