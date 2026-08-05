import { View, Text, useWindowDimensions, TouchableOpacity, Vibration, Image, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, Keyboard, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-web';
import { useGlobalContext } from '../context/GlobalProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../constants';
import { signUp } from '../services/userServices';
import { useLoading } from '../context/loadingContext';
import GoogleButton from '../components/custom/googleButton';
import ErrorMessage from '../components/custom/errorMessage';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BASE_URL } from '../apiCalls';
import { getFirebaseErrorMessage } from '../utilities/firebaseEroors';
import axios from 'axios';

export default function Signup({setAuthType}) {
    const {user,setUse , colorTheme ,form, setForm} = useGlobalContext()
    const { width, height  } = useWindowDimensions();
    // const [form, setForm] = useState({
    //     name : "",
    //     email : "",
    //     username : "",
    //     password : "",
    //     confirm : "",
    //     profile_img:"https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2Favatar.jpg?alt=media&token=25ae4701-e132-4f15-a522-5b9332d2c0b2",
    //     cover_img:"https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"
    //   })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,  setShowConfirmPassword ] = useState(false);
  const [message, setMessage] = useState("")
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
  const [isPasswordUnmatch, setIsPasswordUnmatch] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
  const [isNameInvalid, setIsNameInvalid] = useState(false); 
  const [isLoading , setIsLoading] = useState(false)
  const [isEmailExist, setIsEmailExist] = useState(false);
  const insets = useSafeAreaInsets();
  const { showLoading, hideLoading } = useLoading();
  const [error, setError] = useState("");
  const [messageColor, setMessageColor] = useState("pink");
  const [verification , setVerification] = useState(false)


  const handleValidation = () => {
    console.log(form.name)
    if (!validateName(form.name)) {
        Vibration.vibrate();
        setIsNameInvalid(true)
        return;
      }
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

    if (!validateMatchPassword(form.password ,form.confirmPassword)) {
      Vibration.vibrate();
      setIsPasswordUnmatch(true)
      return;
    }
    handleSignUp()
    // setIsLoading(true)
    // onPress()
    // setTimeout(() => {
    //   setIsVisible(false)
    //   setIsLoading(false)
    // }, 1000);
  }
  

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
      console.log(data)
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

  
  function validateName(name) {
    const re =/^[A-Za-z]+(?:[ '-][A-Za-z]+)+(?:[ '-][A-Za-z]+)*$/;
    return re.test(name);
  }

//   function validateLastName(lastname) {
//     const re = /^[a-zA-Z\s'-]+$/;
//     if (lastname === "") return false
//     return  re.test(lastname);
//   }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email.trim());
  }

  function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return re.test(password)
  }

  function validateMatchPassword(password , confirmPassword) {
    return  (confirmPassword === password)
  }

  // ---------- EFFECTS ----------
  useEffect(() => {
    if (isNameInvalid) {
        setMessage("Full name required (first and last name) ")
        setTimeout(() => setIsNameInvalid(false), 2000);
    }
    

    if (isEmailInvalid) {
        setMessage("Please enter a valid email address. ")
        setTimeout(() => setIsEmailInvalid(false), 2000);
    }

    if (isPasswordInvalid) {
        setTimeout(() => {
        setMessage("Password must contain 8+ characters, uppercase, lowercase, number and symbol.")
        setTimeout(() => setIsPasswordInvalid(false), 2000); 
        }, 2000);
    }

    if (isPasswordWrong) {
        setTimeout(() => {
        setMessage("")
        setIsPasswordWrong(false)
        }, 2000);
    }

    if (isPasswordUnmatch) {
      setMessage("confirm Password does not match ")
      setTimeout(() => setIsPasswordUnmatch(false), 2000);
    }

    if (isEmailExist) {
        setMessage("Email already exists , try to login  ")
        setTimeout(() => { 
        setIsEmailExist(false)
        }  , 10000);
        }

  }, [isEmailInvalid, isEmailWrong, isPasswordInvalid, isPasswordWrong , isNameInvalid  , isPasswordUnmatch , isEmailExist])

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

return (
  <View
    style={{ flex: 1, backgroundColor: "#050505" }}
    // behavior={Platform.OS === "ios" ? "padding" : undefined}
     >
    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      > */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* HEADER SPACE */}
          <View
            style={{
            //   flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: height / 40,
              marginTop: height / 40,


            }}
          >
            <Image
              source={images.applogo}
              resizeMode="contain"
              style={{
                width: width * 0.82,
                height: height / 7.5,
              }}
            />

            <Text
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: width / 28,
                textAlign: "center",
                width: "82%",
                // lineHeight: width / 16,
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
            }}  >
            {/* TITLE */}
            <View
              style={{
                marginBottom: height / 40,
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
                Register
              </Text>

              {/* <Text
                style={{
                  marginTop: height / 140,
                  color: "rgba(255,255,255,0.45)",
                  fontSize: width / 28,
                  textAlign: "center",
                }}
              >
                Register to start your journey
              </Text> */}
            </View>

             {/* FIRST NAME */}
             {/* <View
              style={{
                height: height/17,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor: !isFirstnameValid ? colorTheme  : "rgba(255,55,5,0.46)",
                paddingHorizontal: 16,
                justifyContent: "center",
                marginBottom: height / 45,
              }}
            >
              <Text
                    style={{
                    color: colorTheme ,
                    fontSize: width / 34,
                    // fontWeight: "900",
                    textAlign: "center",
                    // backgroundColor: "#17181B",
                    }}
                    className="absolute top-[-10] pl-2 pr-4 bg-[#050505] tracking-wide font-montserrat  left-0" >
                    First Name
              </Text>
              <TextInput
                value={name.firstname}
                onChangeText={(e) =>
                  SetName({
                    ...name,
                    firstname:e,
                  })
                }
                placeholder="First Name"
                placeholderTextColor="#6B7280"
                style={{
                  color: "white",
                  fontSize: width / 30,
                //   fontWeight: "500",
                }}
                className=""
              />
            </View> */}

              {/* LAST NAME */}
              <View
                style={{
                height: height/16,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor: !isNameInvalid ? colorTheme : "rgba(255,55,5,0.46)",
                paddingHorizontal: 8,
                justifyContent: "center",
                marginBottom: height / 45,
                }}
                // className="py-2"
                >
                <Text
                    style={{
                    color: colorTheme ,
                    fontSize: width / 34,
                    // fontWeight: "900",
                    textAlign: "center",
                    // backgroundColor: "#17181B",
                    }}
                    className="absolute top-[-10] pl-2 pr-4 bg-[#0a0a0a] tracking-wide font-montserrat  left-0" >
                    Full Name
                </Text>
                <TextInput
                value={form.name}
                onChangeText={(e) =>
                    setForm({
                    ...form,
                    name: e,
                    })
                }
                placeholder="Full Name"
                placeholderTextColor="#6B7280"
                style={{
                    color: "white",
                    fontSize: width / 30,
                    fontWeight: "500",
                }}
                />
            </View>

            {/* EMAIL */}
            <View
              style={{
                height: height / 16,
                borderRadius: width / 80,
                justifyContent: "center",
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: !isEmailInvalid || isEmailExist ? colorTheme : "rgba(255,55,5,0.46)",
                marginBottom: height / 45,
              }}
            //   className="py-3"
            >
              <Text
                style={{
                  color: colorTheme,
                  fontSize: width / 34,
                }}
                className="absolute top-[-12] pl-2 pr-4 bg-[#050505] tracking-wider font-montserrat left-0"
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
                style = {{
                height: height/16,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor: !isPasswordInvalid  ? colorTheme : "rgba(255,55,5,0.46)",
                paddingHorizontal: 8,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: height / 45,
                }} 
                // className="py-3"
                >
                <Text
                    style={{
                    color: colorTheme,
                    fontSize: width / 40,
                    // fontWeight: "900",
                    textAlign: "center",
                    // backgroundColor: "#17181B",
                    }}
                    className="absolute top-[-10] pl-2 pr-4 bg-[#050505] tracking-wide font-montserrat  left-0" >
                    Password
                </Text>
                <TextInput
                value={form.password}
                onChangeText={(e) =>
                    setForm({
                    ...form,
                    password: e,
                    })
                }
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPassword}
                style={{
                    flex: 1,
                    color: "white",
                    fontSize: width / 30,
                    fontWeight: "500",
                }}
                />
    
                <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                    setShowPassword(!showPassword)
                }
                >
                <MaterialCommunityIcons
                    name={
                    showPassword
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={20}
                    color={colorTheme}
                />
                </TouchableOpacity>
            </View>

                {/* CONFIRM PASSWORD */}
            <View
                style = {{
                height: height/16,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor:  !isPasswordUnmatch ? colorTheme : "rgba(255,55,5,0.46)",
                paddingHorizontal: 8,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: height / 45,
                    }} 
                // className="py-3"
                    >
                <Text
                    style={{
                    color: colorTheme,
                    fontSize: width / 40,
                    // fontWeight: "900",
                    textAlign: "center",
                    // backgroundColor: "#17181B",
                    }}
                    className="absolute top-[-10] pl-2 pr-4 bg-[#050505] tracking-wide font-montserrat  left-0" >
                    Confirmation
                </Text>
                <TextInput
                value={form.confirmPassword}
                onChangeText={(e) =>
                    setForm({
                    ...form,
                    confirmPassword: e,
                    })
                }
                placeholder="Confirm Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showConfirmPassword}
                style={{
                    flex: 1,
                    color: "white",
                    fontSize: width / 30,
                    fontWeight: "500",
                }}
                />
    
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        setShowConfirmPassword(
                        !showConfirmPassword
                        )
                    }  >
                    <MaterialCommunityIcons
                        name={
                        showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color={colorTheme}
                    />
                </TouchableOpacity>
            </View>
            
         {/* </View> */}

            {/* LOGIN */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleValidation}
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
                  fontWeight: "800",
                  letterSpacing: 0.6,
                }}
              >
                REGISTER
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
                    paddingHorizontal: 4,
                    // marginTop : height /30

                  }}
                  className =" bg-black py-4 w-full"
                >
                  <Pressable
                      onPress= {() => {
                        router.push('/Login')
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
                    Already have an account ? {' '}
                      <Text
                        style={{
                          fontSize: width / 25,
                          color: colorTheme,
                          fontWeight: "600",
                          letterSpacing: 0.4,
                        }}
                        // className = "text-[#7ea1e8]"
                      >
                        Login 
                      </Text>
                    </Text>
                  </Pressable>
              </View>

              <View
              className = "flex-1 w-[90%] mb-6 justify-center rounded-b-full gap-4 bg-black border-l-4 border-r-4 border-b-4 border-goldSoft/20 items-center" >
                  <View
                    style={{
                    //   height: 58,
                    //   justifyContent: "center",
                      paddingHorizontal: 24,
                    //   marginTop: 10,
                    }}
                    className="w-[70%] justify-start items-center flex-row"
                  >
                    {/* {(isEmailWrong ||
                      isEmailInvalid ||
                      isPasswordInvalid ||
                      isPasswordWrong ||
                      isNameValid || 
                      isPasswordUnmatch || isEmailExist) && ( */}
                      <Text
                        style={{
                          color: messageColor,
                          fontSize: width / 30,
                          textAlign: "center",
                          lineHeight :25
                        }}
                        numberOfLines={3}
                      >
                        {message}
                      </Text>
                    {/* )} */}
                  </View>
            
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
         
        </View>
      {/* </ScrollView>
    </TouchableWithoutFeedback> */}
  </View>
);
}