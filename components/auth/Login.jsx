// import { View, Text, Image, useWindowDimensions, TouchableOpacity, Vibration, KeyboardAvoidingView, Platform, TextInput, ImageBackground, StyleSheet } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { icons, images } from '../../constants'
// import FormField from '../custom/FormField'
// import { authLogin } from '../../apiCalls';
// import { useGlobalContext } from '../../context/GlobalProvider';
// import { router } from 'expo-router';
// import { AntDesign } from '@expo/vector-icons';
// import AuthButton from '../custom/authButton';
// import { signInAnonymouslyUser } from '../../firebaseAuth';

// export default function Login({setAuthType}) {
//   const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData,notifications} = useGlobalContext()
//   const { width, height } = useWindowDimensions();
//   const [message,setMessage] = useState("")
//   const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
//   const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
//   const [isEmailWrong, setIsEmailWrong] = useState(false); 
//   const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
//   const [isFetching, setIsFetching] = useState(false);
//   const [showPassword, setShowPassword] = useState(false)

//   const [form, setForm] = useState({
//     email:"sidalihaddadi@gmail.com",
//     password:"Sidali@2024"
//   })

//   //************************************* login here ************************ */

//   const handleLogin =()=> {
//      if(!validateEmail(form.email)) {
//       Vibration.vibrate();
//       setIsEmailInvalid(true)
//       return true
//      }
//      if(!validatePassword(form.password)) {
//       Vibration.vibrate();
//       setIsPasswordInvalid(true)
//       return true
//      }
//      authLogin(form,setUser,setMessage,setIsFetching)
//   }

 
  

// //*************************************Validation ******************************* */

//   function validateEmail(email) {
//     const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     return re.test(email);
//   }
//   function validatePassword(passwordRegex) {
//     const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
//     return re.test(passwordRegex)
//   }


//   useEffect(() => {
//     if(isEmailInvalid) {
//       setMessage("Invalid Email, must contain @ , com ... ")
//       setTimeout(() => {
//         setIsEmailInvalid(false)
//       }, 2000);
//     } 
//     if(isEmailWrong) {
//       setTimeout(() => {
//         setMessage("")
//         setIsEmailWrong(false)
//       }, 2000);
//     } 
//     if(isPasswordInvalid) {
//       setTimeout(() => {
//         setMessage("Invalid Password, must contain special character,...")
//         setIsPasswordInvalid(false)
//       }, 2000);
//     }
//     if(isPasswordWrong) {
//       setTimeout(() => {
//         setMessage("")
//         setIsPasswordWrong(false)
//       }, 2000);
//     }
//  }, [isEmailInvalid, isEmailWrong , isPasswordInvalid , isPasswordWrong])

//   useEffect(() => {
//     if(message == "user not found") {
//      Vibration.vibrate();
//      setIsEmailWrong(true)
//     }
  
//     if(message === "invalid password") {
//      Vibration.vibrate();
//      setIsPasswordWrong(true)
//     }
//  }, [message])

//  //******************************* authentification here *******************************************************/


//  const { signInWithGoogle } = useGoogleAuth();

//  const handleAnonymousLogin = async () => {
//    try {
//      const user = await signInAnonymouslyUser();
//      console.log("Anonymous user:", user.uid);
//    } catch (err) {
//      console.error(err.message);
//    }
//  };

//  const handleGoogleLogin = async () => {
//    try {
//      const user = await signInWithGoogle();
//      console.log("Google user:", user.uid);
//    } catch (err) {
//      console.error(err.message);
//    }
//  };





//   return (

//     <ImageBackground
//       source={images.night_bg}
//       resizeMode="cover"
//       className="flex-1 w-[100%] h-[100%] justify-center items-center"
//       >

  
//          {/* <Image
//               className ="absolute top-[-20] w-[100%]  "
//               source={icons.challengify_logo}
//               style={{ width: '90%', height: "35%" }} // adjust ratio
//               resizeMode="contain"
//             />
//          <View className="  w-[90%] absolute top-0 min-h- [8vh] py-2 flex-row justify-center items-center text-center ">
//                    {(isEmailWrong || isEmailInvalid || isPasswordInvalid || isPasswordWrong)&& <Text className="text-gray-200 text-sm ">{message}</Text>}
//         </View>
//         <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex- 1 w-[80%] mt-auto mb-20 justify-center px-2"
//         >

//         <View
//                   className="mb-12 w-[100%] flex-row  justify-center item-center">
//                                     <Text 
//                                         style={{fontSize:width/20,
//                                                 //  color:'white'
//                                                 }}
//                                         className="  font-bold tex t-sm  text-[#dcdeed]">
//                                                LOGIN              
//                                     </Text>  
//          </View>


//         <View>

//             <TextInput
//             placeholder="Email"
//             placeholderTextColor="#c9b37a"
//             value={form.email}
//             onChangeText={(e)=> setForm({...form,email:e})}
//             className="bg-[#ebe8e8] border border-yellow-600/40 text-[#1f1e1e] p-4 rounded-xl mb-3"
//             />

//             <View>
//                 <TextInput
//                       placeholder="Password"
//                       placeholderTextColor="#c9b37a"
//                       secureTextEntry ={showPassword}
//                       value={form.password}
//                       onChangeText={(e)=> setForm({...form,password:e})}
//                       className="bg-[#ebe8e8] border border-yellow-600/40  text-[#161515] p-4 rounded-xl"
//                 />
//               <TouchableOpacity
//                   className ="absolute top-0 right-2"
//                   onPress={()=> setShowPassword(!showPassword)}>
//                       <Image className ="w-10 h-10 "
//                       resizeMode='contain'
//                       source={!showPassword  ? icons.eye : icons.eyeHide} />
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity 
//                   onPress={handleLogin}
//                   className="bg-[#965a0b] p-4 rounded-xl mt-3">
//                               {isFetching ? (
//                                       <View >
//                                           <ActivityIndicator size="large" color="#030202" />
//                                       </View>
//                                   ):(
//                                     <Text 
//                                     style={{ fontSize :width/30}}
//                                     className="text-[#edebe6] text-center font-bold text -md">
//                                             Login
//                                     </Text>
//                                   )}


//             </TouchableOpacity>

      

//         <View className="flex-row justify-center mt-8">
//             <Text className="text-gray-100">
//                 New to Challengify ? {' '}
//             </Text>
//             <TouchableOpacity
//               onPress={()=>{
//                 setAuthType("register")
//             }}  >
//               <Text className="text-indigo-400 ml-2 font-semibold">
//                   Create Account
//               </Text>
//              </TouchableOpacity>
//         </View>

//         </View>

//         </KeyboardAvoidingView> */}

// <View >
//       {/* App Logo */}
//       <Image
//         source={icons.challengify_logo}
//         style={styles.logo}
//         resizeMode="contain"
//       />

//       <Text style={styles.title}>Welcome to Challengify</Text>
//       <Text style={styles.subtitle}>Sign in to continue</Text>

//       {/* Auth Buttons */}
//       <View style={styles.buttonContainer}>
//         <AuthButton
//           title="Continue with Google"
//           icon={icons.google} // Google icon
//           onPress={handleGoogleLogin}
//           bgColor="#fff"
//           textColor="#000"
//         />

//         <AuthButton
//           title="Sign in with Email"
//           icon={icons.email} // Email icon
//           onPress={() => console.log("Navigate to email login screen")}
//           bgColor="#112e52"
//           textColor="#fff"
//         />

//         <AuthButton
//           title="Continue as Guest"
//           icon={icons.avatar} // generic avatar
//           onPress={handleAnonymousLogin}
//           bgColor="#f0f0f0"
//           textColor="#000"
//         />
//       </View>

//       <Text style={styles.footer}>
//         By signing in you agree to our Terms of Service and Privacy Policy
//       </Text>
//     </View>



//     </ImageBackground>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#162142",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   title: {
//     color: "#59a5ed",
//     fontSize: 28,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     color: "#fff",
//     fontSize: 16,
//     marginBottom: 40,
//   },
//   buttonContainer: {
//     width: "100%",
//   },
//   footer: {
//     color: "#aaa",
//     fontSize: 12,
//     textAlign: "center",
//     marginTop: 40,
//     paddingHorizontal: 20,
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert, Dimensions, useWindowDimensions } from 'react-native';
import { useGoogleLogin, loginAnonymously, loginWithEmail, signUpWithEmail } from '../../firebaseAuth';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';
import { authLogin } from '../../apiCalls';
import { icons, images } from '../../constants'


const { width, height } = Dimensions.get('window');

export default function Login({ setAuthType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { request, response, promptAsync, signInWithGoogle } = useGoogleLogin();



  useEffect(() => {
    if (response?.type === 'success') {
      signInWithGoogle()
        .then((userCredential) => {
          console.log('Google User:', userCredential.user);
        })
        .catch((err) => Alert.alert('Google login failed', err.message));
    }
  }, [response]);

  const handleEmailLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await loginWithEmail(email, password);
      console.log('Email login user:', userCredential.user);
    } catch (err) {
      Alert.alert('Login failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      setLoading(true);
      const userCredential = await signUpWithEmail(email, password);
      console.log('New user created:', userCredential.user);
    } catch (err) {
      Alert.alert('Sign up failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await loginAnonymously();
      console.log('Anonymous user:', userCredential.user);
    } catch (err) {
      Alert.alert('Anonymous login failed', err.message);
    } finally {
      setLoading(false);
    }
  };


  //******************************************* user login with email password */

    const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData,notifications} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [message,setMessage] = useState("")
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
  const [isFetching, setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email:"sidalihaddadi@gmail.com",
    password:"Sidali@2024"
  })

//   //************************************* login here ************************ */

  const handleLogin =()=> {
     if(!validateEmail(form.email)) {
      Vibration.vibrate();
      setIsEmailInvalid(true)
      return true
     }
     if(!validatePassword(form.password)) {
      Vibration.vibrate();
      setIsPasswordInvalid(true)
      return true
     }
     authLogin(form,setUser,setMessage,setIsFetching)
  }

 
  

// //*************************************Validation ******************************* */

  function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email);
  }
  function validatePassword(passwordRegex) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return re.test(passwordRegex)
  }


  useEffect(() => {
    if(isEmailInvalid) {
      setMessage("Invalid Email, must contain @ , com ... ")
      setTimeout(() => {
        setIsEmailInvalid(false)
      }, 2000);
    } 
    if(isEmailWrong) {
      setTimeout(() => {
        setMessage("")
        setIsEmailWrong(false)
      }, 2000);
    } 
    if(isPasswordInvalid) {
      setTimeout(() => {
        setMessage("Invalid Password, must contain special character,...")
        setIsPasswordInvalid(false)
      }, 2000);
    }
    if(isPasswordWrong) {
      setTimeout(() => {
        setMessage("")
        setIsPasswordWrong(false)
      }, 2000);
    }
 }, [isEmailInvalid, isEmailWrong , isPasswordInvalid , isPasswordWrong])

  useEffect(() => {
    if(message == "user not found") {
     Vibration.vibrate();
     setIsEmailWrong(true)
    }
  
    if(message === "invalid password") {
     Vibration.vibrate();
     setIsPasswordWrong(true)
    }
 }, [message])

  return (
    <View style={{ flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      
      {/* App Logo / Title */}
      <View style={{ alignItems: 'center', marginBottom: 0 }}>
               <Image
                  className =" "
                  source={icons.challengify_logo}
                  style={{ width: 450, height: 100 }} // adjust ratio
                  resizeMode="cover"
                />
      </View>

      {/* Email Login Card */}
      <View 
      className = "bg-[#303949] mt-auto"
      style={{ width: '100%', borderRadius: 20, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 }}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          value={form.email}
          onChangeText={(e)=> setForm({...form , email:e})}
          className = "bg-[#1e1f21]"
          style={{ width: '100%', padding: 15, marginBottom: 15, borderRadius: 12, color: 'white' }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          value={form.password}
          onChangeText={(e)=> setForm({...form,password:e})}
          className = "bg-[#1e1f21]"
          style={{ width: '100%', padding: 15, borderRadius: 12, color: 'white' }}
          secureTextEntry
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
          <TouchableOpacity onPress={handleLogin} style={{ flex: 1, backgroundColor: '#59a5ed', padding: 15, borderRadius: 12, marginRight: 10, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEmailSignUp} style={{ flex: 1, backgroundColor: '#3ecf8e', padding: 15, borderRadius: 12, marginLeft: 10, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Social / Google login */}
      <TouchableOpacity
        disabled={!request}
        onPress={() => promptAsync()}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 15, borderRadius: 12, backgroundColor: '#de4d41', marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 }}
      >
        <FontAwesome name="google" size={24} color="white" style={{ marginRight: 10 }} />
        <Text style={{ color: 'white', fontWeight: '700' }}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Anonymous login */}
      <TouchableOpacity
        onPress={handleAnonymousLogin}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 15, borderRadius: 12, backgroundColor: '#555', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 }}
      >
        <Ionicons name="person-outline" size={24} color="white" style={{ marginRight: 10 }} />
        <Text style={{ color: 'white', fontWeight: '700' }}>Continue as Guest</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#59a5ed" style={{ marginTop: 20 }} />}
    </View>
  );
}