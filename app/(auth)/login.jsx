import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/custom/FormField'
import { Link, router, useFocusEffect } from 'expo-router'

import { authLogin, getFavouriteChallenges, getFollowData, getFollowings, getNotificationByUser,
   getTopChallenges,
   getUserFriendsData,  getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, isAuthenticated } from '../../apiCalls'
import { GlobalProvider, useGlobalContext } from '../../context/GlobalProvider.js'
import { useVideoPlayer, VideoView } from 'expo-video'
// import AuthContent from '../../context/AuthContent'
import demo from "../../assets/video/demo1.mp4"
import { Accelerometer } from 'expo-sensors'
import { useFonts } from 'expo-font'





export default function login() {
  
  const {user,setUser,userPublicChallenges, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteChallenge
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges
  } = useGlobalContext()
  // const [user,setUser] = useState(null)

  const [form, setForm] = useState({
    email:"samirhaddadi@gmail.com",
    password:"Samir@2024"
  })


  const [fontsLoaded] = useFonts({
    myFont: require("../../assets/fonts/Archivo/Archivo-VariableFont_wdth.ttf"),
  });


  const [message,setMessage] = useState("")
  const videoRef = useRef()
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); 

  const [isFetching, setIsFetching] = useState(false);


  //************************************* login here ************************ */
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
     setIsFetching(true)
     authLogin(form,setUser,setMessage,setIsFetching)
  }


//*************************************Validation ******************************* */

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

 //******************************* authentification here *******************************************************/

  useEffect(() => {
    if(user) {
      setIsFetching(true)
      getUserPublicChallenges(user._id,setUserPublicChallenges)
      getUserPrivateChallenges(user._id,setUserPrivateChallenges)
      getUserPublicParticipateChallenges(user._id ,setPublicParticipateChallenges)
      getUserPrivateParticipateChallenges(user._id ,setPrivateParticipateChallenges)
      getNotificationByUser(user._id , setNotifications)
      getFollowings(user._id,setFollowings)  
      getUserFriendsData(user._id,setUserFriendData)
      getFollowData(user._id,setFollow)
      getFavouriteChallenges(user._id,setFavouriteChallenge)
      getTopChallenges(user._id,setTrendingChallenges)
      setTimeout(() => {
        router.replace('/timeline')
        setIsFetching(false)
      }, 1000);
      setTimeout(() => {
        user.isNewUser && router.push('/SetUpProfile')
      }, 1500);
      
    }
  }, [user])

 
  useEffect(() => {
    isAuthenticated(setUser)
   },[])

 
  const player = useVideoPlayer
  ( 
    demo, (player) => {
    player.loop = true;
    player.volume = 0.7
    player.play() ;
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (player) {
          // player.pause();
        }
        videoRef.current = null;
      };
    }, [])
  );
  
  return (
    <SafeAreaView className=" flex-1 bg-primary ">
      <View
       className="flex-1 justify-center items-center ">
   
                      <Image 
                        style={{ width:'100%',height:'100%',opacity:0.4}}
                        source={images.sky_bg} 
                        resizeMode='cover' 
                        className="6"/>
                     <Image 
                        style={{ width:'50%',height:'30%',opacity:1}}
                        source={images.challenge_logo} 
                        resizeMode='cover' 
                        className="absolute top-48"/>

         <View className="min-w-full  justify-between absolute top-0  flex-col items-center h-[100%]  ">
          
              <View className="w-full justify-center  mt-6 min-h-[25h] flex-col items-center gap-0 ">
                               <Text className="text-3xl  font-bold text-secondary">
                                    Challengify
                                </Text> 
                                <Text className="text-lg mt-4 text-center text-white font-bold px-10 ">
                                  Welcome !
                                  Step Out of Your Comfort Zone—Your Stage Awaits, and the World is the Judge! {'  '}  
                                </Text>
              </View>
           
              <View className="w-[80%] justify-start mt-80 gap-4 flex-col items-start">  

                    <FormField 
                    width="100%"
                    height= {50}
                    invalid = {isEmailInvalid || isEmailWrong}
                    title="Email" 
                    value={form.email.toLowerCase()}
                    placeholder="email"
                    handleChangeText={(e)=> setForm({...form,email:e})}
                    keyboardType="email-address"
                    />

                    <FormField 
                    width="100%"
                    height= {50}
                    invalid = {isPasswordInvalid || isPasswordWrong}
                    title="Password" 
                    value={form.password}
                    placeholder="password"
                    keyboardType="email-address"
                    handleChangeText={(e)=> setForm({...form,password:e})}
                    />

                    <TouchableOpacity 
                      // onPressIn={()=>{setIsFetching(true)}}
                      onPress={handleLogin}
                      // style={{backgroundColor:"#5d23db"}}
                      className="bg-blue-500  rounded-xl w-[100%] h-[50px] justify-center items-center">
                        {isFetching ? (
                               <View >
                                 <ActivityIndicator size="large" color="#030202" />
                               </View>
                        ):(
                              <Text className="text-[#302f2c] font-semibold text-lg">Login</Text>
                        )}
                        
                    </TouchableOpacity>

                    <View className="justify-start items-center w-[80%] mt-4 flex-row gap-4">
                        <Text className="text-md text-gray-200 font-black">
                          Don't have an account   ?
                        </Text>
                        <Link className=" text-md text-blue-300 font-semibold"
                          href="/signup">
                          Register
                        </Link>
                    </View>

              </View>
             
              <View className="  w-[80%] -auto h-[10vh] flex-col justify-center items-center text-center ">
                    {(isEmailWrong || isEmailInvalid || isPasswordInvalid || isPasswordWrong)&& <Text className="text-gray-200 ">{message}</Text>}
              </View>
            
           
           
              
         </View>
        {/* </ImageBackground> */}
        </View> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})