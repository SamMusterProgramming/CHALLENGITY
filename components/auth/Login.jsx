
// import React,  { useState , useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
//   Alert,
//   Vibration,
// } from 'react-native';

// import {
//   loginWithEmail,
//   signUpWithEmail,
//   loginAnonymously,
// } from '../../firebaseAuth';



// import { Ionicons, FontAwesome } from '@expo/vector-icons';
// import { useGlobalContext } from '../../context/GlobalProvider';
// import { icons } from '../../constants';
// import { signInWithGoogle } from '../../services/googleLogin';
// import { authLogin } from '../../apiCalls';

// export default function Login({ setAuthType }) {
//   const { setUser } = useGlobalContext();

//     const [message,setMessage] = useState("")
//   const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
//   const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
//   const [isEmailWrong, setIsEmailWrong] = useState(false); 
//   const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
//   const [isFetching, setIsFetching] = useState(false);
//   const [showPassword, setShowPassword] = useState(false)

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     email: 'samirhaddadi@gmail.com',
//     password: 'Samir@2024',
//   });




//     const handleLogin =()=> {
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

//   // ---------- SIGNUP ----------
//   const handleSignUp = async () => {
//     try {
//       setLoading(true);
//       const res = await signUpWithEmail(form.email, form.password);
//       setUser(res.user);
//     } catch (e) {
//       Alert.alert('Signup failed', e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- ANONYMOUS ----------
//   const handleAnonymous = async () => {
//     try {
//       setLoading(true);
//       const res = await loginAnonymously();
//       setUser(res.user);
//     } catch (e) {
//       Alert.alert('Guest failed', e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//     //******************************************* user login with email password */

//   // const { width, height } = useWindowDimensions();
//   // const [message,setMessage] = useState("")
//   // const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
//   // const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
//   // const [isEmailWrong, setIsEmailWrong] = useState(false); 
//   // const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
//   // const [isFetching, setIsFetching] = useState(false);
//   // const [showPassword, setShowPassword] = useState(false)

//   // const [form, setForm] = useState({
//   //   email:"sidalihaddadi@gmail.com",
//   //   password:"Sidali@2024"
//   // })

// //   //************************************* login here ************************ */

//   // const handleLogin =()=> {
//   //    if(!validateEmail(form.email)) {
//   //     Vibration.vibrate();
//   //     setIsEmailInvalid(true)
//   //     return true
//   //    }
//   //    if(!validatePassword(form.password)) {
//   //     Vibration.vibrate();
//   //     setIsPasswordInvalid(true)
//   //     return true
//   //    }
//   //    authLogin(form,setUser,setMessage,setIsFetching)
//   // }

// // //*************************************Validation ******************************* */

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

//   return (
//     <View style={{ flex: 1, backgroundColor: '#0d0d0d', padding: 20, justifyContent: 'center' }}>
      
//       {/* LOGO */}
//       <Image
//         source={icons.challengify_logo}
//         style={{ width: 300, height: 100, alignSelf: 'center' }}
//         resizeMode="contain"
//       />

//       {/* FORM */}
//       <View style={{ marginTop: 30, backgroundColor: '#303949', padding: 20, borderRadius: 15 }}>
        
//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#888"
//           value={form.email}
//           onChangeText={(e) => setForm({ ...form, email: e })}
//           style={{ backgroundColor: '#1e1f21', color: 'white', padding: 12, borderRadius: 10, marginBottom: 10 }}
//         />

//         <TextInput
//           placeholder="Password"
//           placeholderTextColor="#888"
//           secureTextEntry
//           value={form.password}
//           onChangeText={(e) => setForm({ ...form, password: e })}
//           style={{ backgroundColor: '#1e1f21', color: 'white', padding: 12, borderRadius: 10 }}
//         />

//         {/* LOGIN BUTTONS */}
//         <View style={{ flexDirection: 'row', marginTop: 15 }}>
//           <TouchableOpacity onPress={handleLogin} style={{ flex: 1, backgroundColor: '#59a5ed', padding: 12, borderRadius: 10, marginRight: 5 }}>
//             <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleSignUp} style={{ flex: 1, backgroundColor: '#3ecf8e', padding: 12, borderRadius: 10, marginLeft: 5 }}>
//             <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* GOOGLE BUTTON */}
//       <TouchableOpacity
//         disabled={false}
//         onPress={signInWithGoogle}
//         style={{ marginTop: 20, backgroundColor: '#de4d41', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'center' }}
//       >
//         <FontAwesome name="google" size={20} color="white" />
//         <Text style={{ color: 'white', marginLeft: 10 }}>Continue with Google</Text>
//       </TouchableOpacity>

//       {/* GUEST */}
//       <TouchableOpacity
//         onPress={handleAnonymous}
//         style={{ marginTop: 15, backgroundColor: '#555', padding: 15, borderRadius: 10 }}
//       >
//         <Text style={{ color: 'white', textAlign: 'center' }}>Continue as Guest</Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
//     </View>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
//   Alert,
//   Vibration,
// } from 'react-native';

// import {
//   loginWithEmail,
//   signUpWithEmail,
//   loginAnonymously,
// } from '../../firebase/client';

// import { FontAwesome } from '@expo/vector-icons';
// import { useGlobalContext } from '../../context/GlobalProvider';
// import { icons } from '../../constants';
// // import { signInWithGoogle } from '../../services/googleLogin';
// import { authLogin, BASE_URL } from '../../apiCalls';

// export default function Login({ setAuthType }) {
//   const { setUser } = useGlobalContext();
//   const [message, setMessage] = useState("")
//   const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
//   const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
//   const [isEmailWrong, setIsEmailWrong] = useState(false); 
//   const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
//   const [isFetching, setIsFetching] = useState(false);
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     email: 'samirhaddadi@gmail.com',
//     password: 'Samir@2024',
//   });

//   // ---------- LOGIN ----------
//   const handleLogin = () => {
//     if (!validateEmail(form.email)) {
//       Vibration.vibrate();
//       setIsEmailInvalid(true)
//       return;
//     }

//     if (!validatePassword(form.password)) {
//       Vibration.vibrate();
//       setIsPasswordInvalid(true)
//       return;
//     }

//     authLogin(form, setUser, setMessage, setIsFetching)
//   }



//   // ---------- ANONYMOUS ----------
//   const handleAnonymous = async () => {
//     try {
//       setLoading(true);
//       const res = await loginAnonymously();
//       setUser(res.user);
//     } catch (e) {
//       Alert.alert('Guest failed', e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- VALIDATION ----------
//   function validateEmail(email) {
//     const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//     return re.test(email);
//   }

//   function validatePassword(passwordRegex) {
//     const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
//     return re.test(passwordRegex)
//   }

//   // ---------- EFFECTS ----------
//   useEffect(() => {
//     if (isEmailInvalid) {
//       setMessage("Invalid Email, must contain @ , com ... ")
//       setTimeout(() => setIsEmailInvalid(false), 2000);
//     }

//     if (isEmailWrong) {
//       setTimeout(() => {
//         setMessage("")
//         setIsEmailWrong(false)
//       }, 2000);
//     }

//     if (isPasswordInvalid) {
//       setTimeout(() => {
//         setMessage("Invalid Password, must contain special character,...")
//         setIsPasswordInvalid(false)
//       }, 2000);
//     }

//     if (isPasswordWrong) {
//       setTimeout(() => {
//         setMessage("")
//         setIsPasswordWrong(false)
//       }, 2000);
//     }
//   }, [isEmailInvalid, isEmailWrong, isPasswordInvalid, isPasswordWrong])

//   useEffect(() => {
//     if (message == "user not found") {
//       Vibration.vibrate();
//       setIsEmailWrong(true)
//     }

//     if (message === "invalid password") {
//       Vibration.vibrate();
//       setIsPasswordWrong(true)
//     }
//   }, [message])

//   //*****************handle sign in with google  */

//   const handleGoogleLogin = async () => {
//     try {
//       const {idToken } = await signInWithGoogle();
  
//       // 🔥 Send to backend
//       const res = await fetch(`${BASE_URL}/users/auth/google`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ idToken }),
//       });
  
//       const data = await res.json();
  
//       console.log('✅ Backend user:', data);
  
//       setUser(data.user); // store backend user
  
//     } catch (error) {
//       console.log('❌ Login error:', error);
//     }
//   };

//   //***********************sign up with email */

//   const handleSignUp = async () => {
//     try {
//       setLoading(true);
//       await signUpWithEmail(form.email, form.password);
//       Alert.alert(
//         "Verify your email",
//         "We sent you a verification link. Please check your inbox before logging in."
//       );
  
//     } catch (e) {
//       console.log("🔥 FULL ERROR OBJECT:", e);
//       console.log("🔥 ERROR CODE:", e.code);
//       console.log("🔥 ERROR MESSAGE:", e.message);
//       Alert.alert("Signup failed", e.message || "Unknown error");
//       }
//        finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#0d0d0d', padding: 20, justifyContent: 'center' }}>
      
//       <Image
//         source={icons.challengify_logo}
//         style={{ width: 300, height: 100, alignSelf: 'center' }}
//         resizeMode="contain"
//       />

//       <View style={{ marginTop: 30, backgroundColor: '#303949', padding: 20, borderRadius: 15 }}>
        
//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#888"
//           value={form.email}
//           onChangeText={(e) => setForm({ ...form, email: e })}
//           style={{ backgroundColor: '#1e1f21', color: 'white', padding: 12, borderRadius: 10, marginBottom: 10 }}
//         />

//         <TextInput
//           placeholder="Password"
//           placeholderTextColor="#888"
//           secureTextEntry
//           value={form.password}
//           onChangeText={(e) => setForm({ ...form, password: e })}
//           style={{ backgroundColor: '#1e1f21', color: 'white', padding: 12, borderRadius: 10 }}
//         />

//         <View style={{ flexDirection: 'row', marginTop: 15 }}>
//           <TouchableOpacity onPress={handleLogin} style={{ flex: 1, backgroundColor: '#59a5ed', padding: 12, borderRadius: 10, marginRight: 5 }}>
//             <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleSignUp} style={{ flex: 1, backgroundColor: '#3ecf8e', padding: 12, borderRadius: 10, marginLeft: 5 }}>
//             <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* ✅ FIXED GOOGLE BUTTON */}
//       <TouchableOpacity
//         // onPress={ handleGoogleLogin}
//         style={{ marginTop: 20, backgroundColor: '#de4d41', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'center' }}
//       >
//         <FontAwesome name="google" size={20} color="white" />
//         <Text style={{ color: 'white', marginLeft: 10 }}>Continue with Google</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={handleAnonymous}
//         style={{ marginTop: 15, backgroundColor: '#555', padding: 15, borderRadius: 10 }}
//       >
//         <Text style={{ color: 'white', textAlign: 'center' }}>Continue as Guest</Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
//     </View>
//   );
// }