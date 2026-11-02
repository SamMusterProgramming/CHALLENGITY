// import { View, Text, TouchableOpacity, TextInput, Vibration } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Ionicons } from '@expo/vector-icons'
// import GoogleButton from '../custom/googleButton'
// import ErrorMessage from '../custom/errorMessage'
// import { useGlobalContext } from '../../context/GlobalProvider'
// import { useLoading } from '../../context/loadingContext'
// import axios from 'axios'
// import { BASE_URL } from '../../apiCalls'
// import { signUp } from '../../services/userServices'
// import { getFirebaseErrorMessage } from '../../utilities/firebaseEroors'

// export default function RegisterSection({ width , height,  setSelectedSection }) {
// const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
// const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
// const [isPasswordUnmatch, setIsPasswordUnmatch] = useState(false); 
// const [isEmailWrong, setIsEmailWrong] = useState(false); 
// const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
// const [isNameInvalid, setIsNameInvalid] = useState(false); 
// const [isLoading , setIsLoading] = useState(false)
// const [isEmailExist, setIsEmailExist] = useState(false);
// const [message, setMessage] = useState("")
// const {user,setUse , colorTheme ,form, setForm} = useGlobalContext()
// const [showPassword ,setShowPassword ] = useState(false)
// const { showLoading, hideLoading } = useLoading();
// const [messageColor, setMessageColor] = useState("pink");
// const [verification , setVerification] = useState(false)


// const handleSignUp = async () => {
//     try {
//       // 1. Create user in Firebase
//       const user = await signUp(form.email, form.password);
//       // 2. Get Firebase ID token
//       const token = await user.getIdToken();
//       showLoading("signing up , please wait ...")
//       setMessage("")
//       const res = await axios.post(
//         `${BASE_URL}/users/auth/signup`,
//         {
//           token,
//           form,
//         }
//       );
//       const data = await res.data;
//       setMessage(data.message)
//       setMessageColor(data.color)
//       setTimeout(() => {
//         setSelectedSection("login")
//       }, 5000);
//     } catch (e) {
//       if(getFirebaseErrorMessage(e) === "Email is already in use") setIsEmailExist(true)
//       else setIsEmailExist(false)
//       setMessage(getFirebaseErrorMessage(e));
//       setMessageColor("pink")
//       setVerification(false)
//     } finally {
//        hideLoading()
//     }
// };

// const handleValidation = () => {
//     if (!validateName(form.name)) {
//         Vibration.vibrate();
//         setIsNameInvalid(true)
//         return;
//         }
//     if (!validateEmail(form.email)) {
//         Vibration.vibrate();
//         setIsEmailInvalid(true)
//         return;
//     }

//     if (!validatePassword(form.password)) {
//         Vibration.vibrate();
//         setIsPasswordInvalid(true)
//         return;
//     }

//     if (!validateMatchPassword(form.password ,form.confirmPassword)) {
//         Vibration.vibrate();
//         setIsPasswordUnmatch(true)
//         return;
//     }
//     handleSignUp()
// }

// function validateName(name) {
//     const re =/^[A-Za-z]+(?:[ '-][A-Za-z]+)+(?:[ '-][A-Za-z]+)*$/;
//     return re.test(name);
//     }

// function validateEmail(email) {
// const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// return re.test(email.trim());
// }

// function validatePassword(password) {
// const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
// return re.test(password)
// }

// function validateMatchPassword(password , confirmPassword) {
// return  (confirmPassword === password)
// }
    
//     // ---------- EFFECTS ----------
// useEffect(() => {
// if (isNameInvalid) {
//     setMessage("Full name required (first and last name) ")
//     setTimeout(() => {
//               setIsNameInvalid(false)
//               setMessage("")
//               }, 2000);
// }

// if (isEmailInvalid) {
//     setMessage("Please enter a valid email address. ")
//     setTimeout(() => {
//                setIsEmailInvalid(false)
//                setMessage("")
//             }, 2000);
// }

// if (isPasswordInvalid) {
//     setTimeout(() => {
//     setMessage("Password must contain 8+ characters, uppercase, lowercase, number and symbol.")
//     setTimeout(() => setIsPasswordInvalid(false), 2000); 
//     }, 2000);
// }

// if (isPasswordWrong) {
//     setTimeout(() => {
//     setMessage("")
//     setIsPasswordWrong(false)
//     }, 2000);
// }

// if (isPasswordUnmatch) {
//     setMessage("confirm Password does not match ")
//     setTimeout(() => setIsPasswordUnmatch(false), 2000);
// }

// if (isEmailExist) {
//     setMessage("Email already exists , try to login  ")
//     setTimeout(() => { 
//     setIsEmailExist(false)
//     }  , 10000);
//     }

// }, [isEmailInvalid, isEmailWrong, isPasswordInvalid, isPasswordWrong , isNameInvalid  , isPasswordUnmatch , isEmailExist])
    
// useEffect(() => {
// if (message == "user not found") {
//     Vibration.vibrate();
//     setIsEmailWrong(true)
// }
// if (message === "invalid password") {
//     Vibration.vibrate();
//     setIsPasswordWrong(true)
// }
// }, [message])

// return (
//     <View
//     className=" px-6 pb- 2 -mt-24 text-center justify-start flex-1 bg-black"
//   >
//     <View
    
//       style = {{
//         height: height/15,
//         borderColor: !isNameInvalid ? "#44370c" : "rgba(255,55,5,0.46)",
//       }}
//       className=" flex-row items-center  bg-[#111111]  border border-[#44370c]  rounded-xl px-4  mt-4 "
//     >
//       <Ionicons
//         name="person-outline"
//         size={width/15}
//         color="#F4C542"
//         />
//       <TextInput
//         placeholder="Full Name"
//         placeholderTextColor="#777"
//         value={form.name}
//         onChangeText={e => setForm({...form ,name:e})}
//         keyboardType="email-address"
//         className=" flex-1  ml-4 text-white "
//       />
//     </View>

//     <View
//     style = {{
//         height: height/15,
//         borderColor: !isEmailInvalid || isEmailExist ? "#44370c" : "rgba(255,55,5,0.46)",
//        }}
//       className=" flex-row items-center  bg-[#111111]  border border-[#44370c]  rounded-xl px-4  mt-4 "
//      >
//       <Ionicons
//         name="mail-outline"
//         size={width/15}
//         color="#F4C542"
//         />
//       <TextInput
//         placeholder="Email"
//         placeholderTextColor="#777"
//         value={form.email}
//         onChangeText={e => setForm({...form ,email:e})}
//         keyboardType="email-address"
//         className=" flex-1  ml-4 text-white "
//       />
//     </View>
//     {/* PASSWORD */}
//     <View
//     style = {{
//         height: height/15,
//         borderColor: !isPasswordInvalid  ? "#44370c" : "rgba(255,55,5,0.46)",
//        }}
//       className=" flex-row items-center bg-[#111111] border border-[#44370c] rounded-xl px-4  mt-4 "
//     >
//       <Ionicons
//         name="lock-closed-outline"
//         size={width/15}
//         color="#F4C542"
//       />
//       <TextInput
//         placeholder="Password"
//         placeholderTextColor="#777"
//         value={form.password}
//         onChangeText={e => setForm({...form,password:e})}
//         secureTextEntry={!showPassword}
//         className=" flex-1 ml-4  text-white text-base  "
//       />

//       <TouchableOpacity
//         onPress={() =>
//           setShowPassword(!showPassword)
//         }
//       >
//         <Ionicons
//           name={
//             showPassword
//             ? "eye-outline"
//             : "eye-off-outline"
//           }
//           size={26}
//           color="#777"
//         />
//       </TouchableOpacity>
//     </View>
//     <View
//     style ={{
//         height: height/15,
//         borderColor:  !isPasswordUnmatch ? "#44370c" : "rgba(255,55,5,0.46)",
//     }}
//       className=" flex-row items-center bg-[#111111] border border-[#44370c] rounded-xl px-4  mt-4 "
//     >
//       <Ionicons
//         name="lock-closed-outline"
//         size={width/15}
//         color="#F4C542"
//       />
//       <TextInput
//         placeholder="Confirmation"
//         placeholderTextColor="#777"
//         value={form.confirmPassword}
//         onChangeText={e => setForm({...form,confirmPassword:e})}
//         secureTextEntry={!showPassword}
//         className=" flex-1 ml-4  text-white text-base  "
//       />
//     </View>
//     {/* FORGOT PASSWORD */}
   
//     {/* ENTER STAGE */}

//     <TouchableOpacity
//       activeOpacity={0.85}
//       onPress={handleValidation}
//       className="  mt-6 rounded-xl py-4 text-center bg-[#ce9d19] w-full overflow-hidden "
//     >
//         <Text
//           className=" text-black  text-lg font-bold  mr-3  text-center "
//         >
//           Register
//         </Text>
//     </TouchableOpacity>
//     {/* DIVIDER */}
//     <View
//       className=" flex-row items-center  my-4 "
//     >
//       <View className="  flex-1 h-[1px] bg-[#8d8585] " />
//       <Text  className=" mx-4  text-gray-500" >
//         OR
//       </Text>
//       <View
//         className=" flex-1 h-[1px] bg-[#8d8585] "
//       />
//     </View>
//     {/* GOOGLE */}
//     {/* <GoogleButton onPress={handleGoogleLogin} /> */}

//     <View
//           className = "flex-1 w-[100%] mb-6 justify-center  gap-4 bg-black  items-center" >
              
//               <ErrorMessage
//               message={message}
//               color={messageColor}
//               width={width} />
        
//               {verification && (
//                 <TouchableOpacity onPress={sendVerification}>
//                   <Text
//                     style={{
//                       // marginTop: 10,
//                       color: "#D4AF37",
//                       fontWeight: "600",
//                     }}
//                   >
//                     Resend verification email
//                   </Text>
//                 </TouchableOpacity>
//               )}
//           </View>

//     {/* CREATE ARENA */}
//     <TouchableOpacity
//       onPress={() =>  setSelectedSection("login")}
//       activeOpacity={0.85}
//       className="  mt-auto bg-[#111]  border  border-[#2a2a2a] rounded-xl p-2  flex-row  items-center  "
//     >
//       <View
//         className="  p-2 rounded-2xl  bg-[#F4C542]/10  items-center  justify-center  "
//       >
//         <Ionicons
//           name="sparkles-outline"
//           size={25}
//           color="#F4C542"
//         />
//       </View>

//       <View className="flex-1 ml-4">
//         <Text
//           style = {{
//             fontSize:width/27
//           }}
//           className="  text-white  tex t-lg  font-bold  "  >
//           Login to you account
//         </Text>
//         <Text
//           className=" text-gray-400 text-sm mt-1 ">
//           Start Your Journey
//         </Text>
//       </View>

//       <Ionicons
//         name="chevron-forward"
//         size={25}
//         color="#F4C542"
//       />
//     </TouchableOpacity>
//     {/* GUEST */}
    
//   </View>
//   )
// }
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Vibration,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import { useGlobalContext } from "../../context/GlobalProvider";
import { useLoading } from "../../context/loadingContext";

import ErrorMessage from "../custom/errorMessage";

import { BASE_URL } from "../../apiCalls";
import { signUp } from "../../services/userServices";
import { getFirebaseErrorMessage } from "../../utilities/firebaseEroors";
import GoogleIcon from "../svgIcons/others/googleIcon";


// ============================================================
// INPUT FIELD
// IMPORTANT:
// This MUST stay outside RegisterSection.
// Do not move it back inside the component.
// ============================================================

const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  invalid = false,
  showEye = false,
  showPassword = false,
  setShowPassword,
  scale, spacing
}) => {

  return (
    <View
      style={{
        height: spacing(52),
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: spacing(14),

        // marginBottom: 11,
        backgroundColor: "rgba(3,3,3,0.72)",
        borderWidth: 1,
        borderColor: invalid
          ? "rgba(255,70,40,0.70)"
          : "rgba(244,197,66,0.78)",
        borderRadius: 16,
      }}
    >
      <Ionicons
        name={icon}
        size={scale(18)}
        color="#F4C542"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#858585"
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        style={{
          flex: 1,
          marginLeft: 15,
          color: "#FFFFFF",
          fontSize: scale(12),
          fontWeight: "400",
          paddingVertical: 0,
        }}
      />

      {showEye && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (setShowPassword) {
              setShowPassword((previous) => !previous);
            }
          }}
          hitSlop={{
            top: 12,
            bottom: 12,
            left: 12,
            right: 12,
          }}
        >
          <Ionicons
            name={
              showPassword
                ? "eye-outline"
                : "eye-off-outline"
            }
            size={scale(18)}
            color="#999999"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};


// ============================================================
// REGISTER SECTION
// ============================================================

export default function RegisterSection({
  width,
  height,
  setSelectedSection,
  handleGoogleLogin,
}) {
  const {
    form,
    setForm,scale , spacing 
  } = useGlobalContext();

  const {
    showLoading,
    hideLoading,
  } = useLoading();

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageColor, setMessageColor] =
    useState("pink");

  const [isEmailExist, setIsEmailExist] =
    useState(false);

  const [isNameInvalid, setIsNameInvalid] =
    useState(false);

  const [isEmailInvalid, setIsEmailInvalid] =
    useState(false);

  const [isPasswordInvalid, setIsPasswordInvalid] =
    useState(false);

  const [isPasswordUnmatch, setIsPasswordUnmatch] =
    useState(false);


  // ==========================================================
  // SIGN UP
  // ==========================================================

  const handleSignUp = async () => {
    try {
      const user = await signUp(
        form.email,
        form.password
      );

      const token = await user.getIdToken();

      showLoading(
        "signing up , please wait ..."
      );

      setMessage("");

      const res = await axios.post(
        `${BASE_URL}/users/auth/signup`,
        {
          token,
          form,
        }
      );

      const data = res.data;

      setMessage(data.message);

      setMessageColor(data.color);

      setTimeout(() => {
        setSelectedSection("login");
      }, 5000);

    } catch (e) {
      console.log(
        "SIGN UP ERROR:",
        e
      );

      const firebaseMessage =
        getFirebaseErrorMessage(e);

      if (
        firebaseMessage ===
        "Email is already in use"
      ) {
        setIsEmailExist(true);
      } else {
        setIsEmailExist(false);
      }

      setMessage(
        firebaseMessage
      );

      setMessageColor("pink");

    } finally {
      hideLoading();
    }
  };


  // ==========================================================
  // VALIDATION
  // ==========================================================

  const validateName = (name) => {
    const re =
      /^[A-Za-z]+(?:[ '-][A-Za-z]+)+(?:[ '-][A-Za-z]+)*$/;

    return re.test(name);
  };


  const validateEmail = (email) => {
    const re =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return re.test(
      email.trim()
    );
  };


  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    return re.test(password);
  };


  const validateMatchPassword = (
    password,
    confirmPassword
  ) => {
    return (
      password ===
      confirmPassword
    );
  };


  const handleValidation = () => {

    if (
      !validateName(
        form.name || ""
      )
    ) {
      Vibration.vibrate();

      setIsNameInvalid(true);

      return;
    }


    if (
      !validateEmail(
        form.email || ""
      )
    ) {
      Vibration.vibrate();

      setIsEmailInvalid(true);

      return;
    }


    if (
      !validatePassword(
        form.password || ""
      )
    ) {
      Vibration.vibrate();

      setIsPasswordInvalid(true);

      return;
    }


    if (
      !validateMatchPassword(
        form.password || "",
        form.confirmPassword || ""
      )
    ) {
      Vibration.vibrate();

      setIsPasswordUnmatch(true);

      return;
    }


    handleSignUp();
  };


  // ==========================================================
  // NAME ERROR
  // ==========================================================

  useEffect(() => {
    if (!isNameInvalid) {
      return;
    }

    setMessage(
      "Full name required (first and last name)"
    );

    const timer = setTimeout(() => {
      setIsNameInvalid(false);
      setMessage("");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isNameInvalid]);


  // ==========================================================
  // EMAIL ERROR
  // ==========================================================

  useEffect(() => {
    if (!isEmailInvalid) {
      return;
    }

    setMessage(
      "Please enter a valid email address."
    );

    const timer = setTimeout(() => {
      setIsEmailInvalid(false);
      setMessage("");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isEmailInvalid]);


  // ==========================================================
  // PASSWORD ERROR
  // ==========================================================

  useEffect(() => {
    if (!isPasswordInvalid) {
      return;
    }

    setMessage(
      "Password must contain 8+ characters, uppercase, lowercase, number and symbol."
    );

    const timer = setTimeout(() => {
      setIsPasswordInvalid(false);
      setMessage("");
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [isPasswordInvalid]);


  // ==========================================================
  // PASSWORD MATCH ERROR
  // ==========================================================

  useEffect(() => {
    if (!isPasswordUnmatch) {
      return;
    }

    setMessage(
      "Confirm password does not match"
    );

    const timer = setTimeout(() => {
      setIsPasswordUnmatch(false);
      setMessage("");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isPasswordUnmatch]);


  // ==========================================================
  // EMAIL EXISTS ERROR
  // ==========================================================

  useEffect(() => {
    if (!isEmailExist) {
      return;
    }

    setMessage(
      "Email already exists, try to login"
    );

    const timer = setTimeout(() => {
      setIsEmailExist(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [isEmailExist]);


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}

      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >

      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing(22),
        }}
      >

        {/* ================================================== */}
        {/* ITRI HEADER */}
        {/* ================================================== */}

        <View
          style={{
            alignItems: "center",
            marginTop: spacing(27),
          }}
        >

          <Ionicons
            name="sparkles"
            size={scale(25)}
            color="#F4C542"
            style={{
              marginBottom: spacing(18)
            }}
          />

          {/* ITRI */}
          <Text
            style={{
              color: "#F4C542",
              fontSize: scale(38),
              fontWeight: "400",
              // This is important to reproduce
              // the spaced-out cinematic logo.
              letterSpacing: 9,
              lineHeight: spacing(42),
            }}
          >
            ITRI
          </Text>


          <Text
            style={{
              color: "#F4C542",
              fontSize: scale(12),
              fontWeight: "400",
              letterSpacing:spacing(2),
              marginTop: spacing(12),
              opacity: 0.95,
            }}
          >
            CREATE YOUR STAGE
          </Text>

        </View>


        {/* ================================================== */}
        {/* FORM */}
        {/* ================================================== */}

        <View
          style={{
            marginTop: spacing(27),
          }}
        >

          {/* FULL NAME */}
          <InputField
            icon="person-outline"
            placeholder="Full Name"
            value={
              form.name || ""
            }
            onChangeText={(name) => {
              setForm({
                ...form,
                name,
              });
            }}

            invalid={
              isNameInvalid
            }
            scale={scale}
            spacing={spacing}
          />


          {/* EMAIL */}

          <InputField
            icon="mail-outline"
            placeholder="Email address"
            value={
              form.email || ""
            }
            onChangeText={(email) => {
              setForm({
                ...form,
                email,
              });
            }}
            invalid={
              isEmailInvalid ||
              isEmailExist
            }
            scale={scale}
            spacing={spacing}
          />


          {/* PASSWORD */}

          <InputField
            icon="lock-closed-outline"

            placeholder="Password"

            value={
              form.password || ""
            }

            onChangeText={(password) => {
              setForm({
                ...form,
                password,
              });
            }}

            secureTextEntry={
              !showPassword
            }

            showEye={true}

            showPassword={
              showPassword
            }

            setShowPassword={
              setShowPassword
            }

            invalid={
              isPasswordInvalid
            }
            scale={scale}
            spacing={spacing}
          />


          {/* CONFIRM PASSWORD */}

          <InputField
            icon="shield-checkmark-outline"

            placeholder="Confirm password"

            value={
              form.confirmPassword || ""
            }

            onChangeText={(
              confirmPassword
            ) => {
              setForm({
                ...form,
                confirmPassword,
              });
            }}

            secureTextEntry={
              !showPassword
            }

            showPassword={
              showPassword
            }

            setShowPassword={
              setShowPassword
            }

            invalid={
              isPasswordUnmatch
            }
            scale={scale}
            spacing={spacing}
          />


          {/* ================================================== */}
          {/* CREATE ACCOUNT BUTTON */}
          {/* ================================================== */}

          <TouchableOpacity
            activeOpacity={0.88}

            onPress={
              handleValidation
            }
            style={{
              height: spacing(52),
              marginTop: spacing(14),
              borderRadius: 18,
              overflow: "hidden",
              shadowColor: "#F4C542",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.28,
              shadowRadius: 8,
            }}
            className = "justify-center items-center"
            >

              <LinearGradient
                colors={[
                  "#FFF1A5",
                  "#F4C542",
                  "#DDA21C",
                ]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 1,
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />

              <Text
                style={{
                  color: "#080808",
                  fontSize: scale(14),
                  fontWeight: "600",
                  letterSpacing: 2.0,
                  textAlign: "center",
                }}
              >
                CREATE ACCOUNT
              </Text>


          </TouchableOpacity>


          {/* ================================================== */}
          {/* OR */}
          {/* ================================================== */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: spacing(16),
            }}
          >

            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(244,197,66,0.55)",
              }}
            />


            <Text
              style={{
                color: "#D4AF37",
                marginHorizontal: 16,
                fontSize: scale(12) ,
                fontWeight: "400",

                letterSpacing: 1.5,
              }}
            >
              OR
            </Text>


            <View
              style={{
                flex: 1,

                height: 1,

                backgroundColor:
                  "rgba(244,197,66,0.55)",
              }}
            />

          </View>


          {/* ================================================== */}
          {/* GOOGLE */}
          {/* ================================================== */}

          {handleGoogleLogin && (
               <TouchableOpacity
               activeOpacity={0.88}
               onPress={handleGoogleLogin}
               style={{
                 width: "100%",
                //  paddingVertical: spacing(16),
                 height: spacing(52),
                 flexDirection: "row",
                 alignItems: "center",
                 justifyContent: "center",
                 backgroundColor: "#F3F1EB",
                 borderWidth: 1,
                 borderColor: "rgba(255,255,255,0.95)",
                 borderRadius: 18,
                 shadowColor: "#F4C542",
                 shadowOffset: {
                   width: 0,
                   height: 4,
                 },
                 shadowOpacity: 0.16,
                 shadowRadius: 12,
 
                 elevation: 5,
               }}
             >
               <GoogleIcon size={scale(17)} />
 
               <Text
                 style={{
                   marginLeft: 13,
                   color: "#171717",
                   fontSize: scale(14),
                   fontWeight: "600",
                   letterSpacing: 0.55,
                 }}
               >
                 Continue with Google
               </Text>
             </TouchableOpacity>
          )}

        </View>


        {/* ================================================== */}
        {/* ERROR MESSAGE */}
        {/* ================================================== */}

        <View
          style={{
            minHeight: 48,
            alignItems:  "center",
            justifyContent:"center",
            paddingHorizontal: 10,
          }}
          className= " flex-1"
        >

          <ErrorMessage
            message={message}
            color={messageColor}
            size={scale(12)}
          />

        </View>


        {/* ================================================== */}
        {/* LOGIN CARD */}
        {/* ================================================== */}

        {/* <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            setSelectedSection(
              "login"
            )
          }
          style={{
            marginTop: "auto",
            marginBottom: 12,
            minHeight: 64,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            backgroundColor: "rgba(8,8,8,0.78)",
            borderWidth: 1,
            borderColor:  "rgba(244,197,66,0.24)",
            borderRadius: 16,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:  "rgba(244,197,66,0.09)",
            }}
          >
            <Ionicons
              name="log-in-outline"
              size={21}
              color="#F4C542"
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 12,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Login to your account
            </Text>
            <Text
              style={{
                color: "#858585",
                fontSize: 11.5,
                marginTop: 2,
              }}
            >
              Welcome back to ITRI
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={21}
            color="#F4C542"
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            setSelectedSection("login")
          }
          style={{
            marginTop: "auto",
            marginBottom: 12,
            minHeight: 64,
            flexDirection: "row",
            alignItems: "end",
            padding: scale(8),
            backgroundColor:
              "rgba(8,8,8,0.78)",
            borderWidth: 1,
            borderColor:
              "rgba(244,197,66,0.25)",
            borderRadius: 16,
          }}
        >

          <View
            style={{
              borderRadius: 11,
              padding :spacing(8) ,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                "rgba(244,197,66,0.09)",
            }}

          >
            <Ionicons
              name="sparkles-outline"
              size={scale(20)}
              color="#F4C542"
            />
          </View>


          <View
            style={{
              flex: 1,
              marginLeft: 12,
            }}
            className = "justify-end flex-1"
          >

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: scale(12),
                fontWeight: "600",
              }}
            >
               Login to your account
            </Text>

            <Text
              style={{
                color: "#858585",
                fontSize: scale(10),
                marginTop: scale(4),
              }}
            >
              Welcome back to ITRI
            </Text>

          </View>

          <View
            style={{
              // flex: 1,
              // marginLeft: 12,
            }}
            className = "justify-center items-center flex- 1"
          >
            <Ionicons
              name="chevron-forward"
              size={35}
              color="#F4C542"
            />
          </View>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  );
}