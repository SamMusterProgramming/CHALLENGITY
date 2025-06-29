import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, Vibration, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/custom/FormField'
import { Link, router } from 'expo-router'
import { authLogin, authRegister, getFavouriteChallenges, getFollowData, getFollowings, getNotificationByUser, getTopChallenges, getUserFriendsData, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges } from '../../apiCalls'
import { useVideoPlayer, VideoView } from 'expo-video'
import demo from "../../assets/video/demo1.mp4"
import { useGlobalContext } from '../../context/GlobalProvider'


export default function signup() {


  const {user,setUser,userPublicChallenges, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteChallenge
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges
  } = useGlobalContext()

  const { width, height } = useWindowDimensions();



  const [form, setForm] = useState({
    firstname:"",
    lastname:"",
    email:"samirhaddadi@gmail.com",
    username:"samirhaddadi@gmail.com",
    password:"Samir@2023",
    confirm:"Samir@2023",
    profile_img:"https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2Favatar.jpg?alt=media&token=25ae4701-e132-4f15-a522-5b9332d2c0b2",
    cover_img:"https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"
  })
  const [message,setMessage] = useState("")
  const videoRef = useRef()
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
  const [isFirstnameInvalid, setIsFirstnameInvalid] = useState(false); 
  const [isLastnameInvalid, setIsLastnameInvalid] = useState(false); 

  
  const [isFetching, setIsFetching] = useState(false);



//************************************************************************ register here ************************/
  const handleRegistration = ()=> {
    if(!validateFirstname(form.firstname)) {
      Vibration.vibrate();
      setIsFirstnameInvalid(true)
      return true
     }
     if(!validateLastname(form.lastname)) {
      Vibration.vibrate();
      setIsLastnameInvalid(true)
      return true
     }
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
     if(form.password !== form.confirm) {
      Vibration.vibrate();
      setIsPasswordWrong(true)
      return true;
     }
     setIsFetching(true)
     authRegister(form,setUser,setMessage,setIsFetching)
  }

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
        console.log(user.isNewUser)
        user.isNewUser && router.push('/SetUpProfile')
      }, 1500);
      
    }
  }, [user])



//**********************************************************************form validation ********************** */

function validateFirstname(firstname) {
  const re = /^[a-zA-Z\s'-]+$/i;
  return re.test(firstname);
}
function validateLastname(lastname) {
  const re = /^[a-zA-Z\s'-]+$/i;
  return re.test(lastname);
}
function validateEmail(email) {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return re.test(email);
}
function validatePassword(passwordRegex) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return re.test(passwordRegex)
}


useEffect(() => {
  if(isFirstnameInvalid) {
    setMessage("Invalid firstname must end with one or more letters  ")
    setTimeout(() => {
      setIsFirstnameInvalid(false)
    }, 2000);
  } 
  if(isLastnameInvalid) {
    setMessage("Invalid Lastname must end with one or more letters  ")
    setTimeout(() => {
      setIsLastnameInvalid(false)
    }, 2000);
  } 
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
    setMessage("password and confirm password don't match")
    setTimeout(() => {
      setIsPasswordWrong(false)
    }, 2000);
  }
}, [isEmailInvalid, isEmailWrong , isPasswordInvalid , isPasswordWrong, isFirstnameInvalid,isLastnameInvalid])

useEffect(() => {
  if(message == "email exist already") {
   Vibration.vibrate();
   setIsEmailWrong(true)
  }
}, [message])

//********************************** player here ******************************* */

  const player = useVideoPlayer
  ( 
    demo, (player) => {
    player.loop = true;
    player.volume = 0.7
    player.play() ;
  });


  return (
    <SafeAreaView className="flex-1 bg-primary ">

       <View
       className="w-full h-full justify-center items-center ">
                
                     <Image 
                        style={{ width:'100%',height:'100%',opacity:0.4}}
                        source={images.night_bg} 
                        resizeMode='cover' 
                        className="6"/>
                     {/* <Image 
                        style={{ width:'40%',height:'25%',opacity:1}}
                        source={images.challenge_logo} 
                        resizeMode='cover' 
                        className="absolute top-44"/> */}

      <View className="w-full flex-col justify-between absolute  top-0 items-center h-[100%] ">
       
           <View className="w-full justify-center mt- -[20vh] flex-col items-center gap-0 ">
                                <Text className="text-3xl  font-bold text-secondary">
                                    Challengify
                                </Text> 
                                <Text className="text-lg mt-4 text-center text-white font-bold px-10 ">
                                  Welcome !
                                  Step Out of Your Comfort Zone—Your Stage Awaits, and the World is the Judge! {'  '}  
                                </Text>
           </View>
           <View className="w-[90%] justify-center p-4 gap- flex-row items-center">  
                  <Image 
                            style={{ width: width * 0.3,height:width * 0.3,opacity:1}}
                            source={images.challenge_logo} 
                            resizeMode='cover' 
                            className=""/>
              </View>
           
           <View className="w-[90%]  justify-start mt-auto  gap-3 flex-col items-start">  
                <View
                 className="w-[100%] flex-row justify-between   items-center">
                        <FormField 
                        width="48%"
                        height= {height * 0.06}
                        invalid = {isFirstnameInvalid }
                        title="firstname" 
                        value={form.firstname}
                        placeholder="Firstname"
                        handleChangeText={(e)=> setForm({...form,firstname:e})}
                        keyboardType="email-address"
                        />
                         <FormField 
                        width="48%"
                        height= {height * 0.06}
                        invalid = {isLastnameInvalid}
                        title="lastname" 
                        value={form.lastname}
                        placeholder="Lastname"
                        handleChangeText={(e)=> setForm({...form,lastname:e})}
                        keyboardType="email-address"
                        />
                </View>
                 <FormField 
                 width="100%"
                 height= {height * 0.06}
                 invalid = {isEmailInvalid || isEmailWrong}
                 title="Email" 
                 value={form.email}
                 placeholder="email"
                 handleChangeText={(e)=> setForm({...form,email:e.toLowerCase(),username:e.toLowerCase()})}
                 keyboardType="email-address"
                 />
                 <FormField 
                 width="100%"
                 height= {height * 0.06}
                 invalid = {isPasswordInvalid || isPasswordWrong}
                 title="Password" 
                 value={form.password}
                 placeholder="Password"
                 handleChangeText={(e)=> setForm({...form,password:e})}
                 />
                  <FormField 
                 width="100%"
                 height= {height * 0.06}
                 invalid = {isPasswordWrong}
                 title="Confirm" 
                 value={form.confirm}
                 placeholder="Confirm"
                 handleChangeText={(e)=> setForm({...form,confirm:e})}
               />
                <TouchableOpacity onPress={handleRegistration}
                   className="bg-blue-500 mt-0 rounded-xl w-[100%] h-[47px] justify-center items-center">

                        {isFetching ? (
                               <View >
                                 <ActivityIndicator size="large" color="#030202" />
                               </View>
                        ):(
                               <Text className="text-white font-semibold text-lg">Register</Text>
                        )}
                 </TouchableOpacity>

                 <View className="justify-start items-center w-[90%] -5 flex-row gap-4">
                     <Text className="text-sm text-gray-100 font-semibold">
                       Already have an account ?
                     </Text>
                     <Link className=" text-lg text-blue-400 font-semibold"
                     href="/login">
                       Login
                     </Link>
                 </View>
           </View>

           <View className="  w-[90%] h-[10vh] flex-col -auto justify-center items-start ">
                    {(isEmailWrong || isEmailInvalid || isPasswordInvalid 
                      || isPasswordWrong || isFirstnameInvalid || isLastnameInvalid)&& <Text className="text-gray-400 ">{message}</Text>}
           </View>

          
        
           
      </View>

   </View> 
 </SafeAreaView>
  )
}

const styles = StyleSheet.create({})