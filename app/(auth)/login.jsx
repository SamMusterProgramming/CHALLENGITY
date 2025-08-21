import { ActivityIndicator, Image,  Platform, StatusBar,  Text, TouchableOpacity, useWindowDimensions, Vibration, View } from 'react-native'
import React, {  useEffect, useRef, useState } from 'react'
import {  useSafeAreaInsets } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import FormField from '../../components/custom/FormField'
import {  router } from 'expo-router'

import { authLogin, getFavouriteChallenges, getFollowData, getFollowings, getNotificationByUser,
   getTopChallenges,
   getUserFriendsData,  getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, getUserQueueTalent, getUserTalent, getUserTalentPerformances, isAuthenticated } from '../../apiCalls'
import {  useGlobalContext } from '../../context/GlobalProvider.js'

// import AuthContent from '../../context/AuthContent'
// import { screenSize } from '../../helper.js'
import LoadingPage from '../../components/custom/LoadingPage.jsx'





export default function login() {
  
  const {user,setUser, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteChallenge 
    ,setPrivateParticipateChallenges,setFollow  ,setNotifications,setFollowings,setUserFriendData,setTrendingChallenges,setUserQueueTalents,
    setUserTalents,userTalentPerformances , setUserTalentPerformances 
  } = useGlobalContext()

  // const [user,setUser] = useState(null)
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState({
    email:"samirhaddadi@gmail.com",
    password:"Samir@2024"
  })


  // const [fontsLoaded] = useFonts({
  //   myFont: require("../../assets/fonts/Archivo/Archivo-VariableFont_wdth.ttf"),
  // });


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
      getUserTalent(user._id , setUserTalents)
      setIsFetching(true)
      // screenSize(width,height , setSmallScreen)
      getUserTalentPerformances(user._id , setUserTalentPerformances)
 
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
        router.replace('/Home')
        setIsFetching(false)
      }, 1000);
      setTimeout(() => {
        user.isNewUser && router.push('/SetUpProfile')
      }, 1500);
      
    }else {
      setIsFetching(false)
    }
  }, [user])

 
  useEffect(() => {
    StatusBar.setHidden(true)
    isAuthenticated(setUser)
   },[])

 


  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       if (player) {
  //       }
  //       videoRef.current = null;
  //     };
  //   }, [])
  // );

  if(isFetching){
    return <LoadingPage text="loging in ... please wait" />
  }
 

  return (
    
         <View 
         style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top ,
             paddingBottom:Platform.OS == "ios" ? insets.bottom : insets.bottom
           }}
         className="w-[100%]  h-[100%]  justify-between absolut e top- 0 gap- flex-col items-center bg-primary   ">
          
             
              
              <View
              className ="g-[#f29756] w-full text-center m -[40px] gap- 2 items-center px- flex-col">
                    {/* <Text className="text-2xl  font-bold text-secondary">
                                                  Challengify
                    </Text>  */}
                    <View className="justify-center items-center w-full h-[7vh] flex-row ">
                                        <Image 
                                  
                                            className="w-[100%] h-[100%]  "
                                            source={icons.headline}
                                            resizeMode = 'cover'
                                        />
                   </View>
                    <Text style={ {fontSize: 14,fontStyle: 'italic',color: '#5ca9f0', marginTop : 10 ,marginBottom: 8,textAlign:"center"}}>
                        Unleash Talent. Share Challenges. Break Records.
                    </Text>
                    <Text style={{fontSize: 12,color: '#fff',lineHeight: 18,textAlign:"center"}}>
                        Step into the spotlight with <Text >Challengify</Text> — the ultimate stage where everyday legends rise!
                    </Text>

              </View>

              <View
                  className="  flex- 1  bg-[#000000] flex-col p-1 justify-center item-center">
                                    <Text 
                                        style={{fontSize:width/25,
                                                 color:'white'}}
                                        className="  font-black text-sm text-white">
                                                LOGIN                
                                    </Text>  
              </View>
            
              <View className=" w-[70%] h-[30%] mt- auto rounded-xl border-b-2 border-white  justify-between items-center p-6 b b g-white">
                            <View className=" w-[80%]  h-[100%] gap-2 flex-row flex-wrap justify-center items-center p-2 bg-black ">
                                  
                            <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-4 bg-[#1166ef] ">
                                          <Image
                                          className=" w-[100%]  h-[100%]"
                                          resizeMethod='fill'
                                          source={icons.challenge} />
                                  </View>
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-4 bg-[#ae1717] ">
                                          <Image
                                          className=" w-[100%]  h-[100%]"
                                          resizeMethod='cover'
                                          source={icons.home} />
                                          
                                  </View>
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-2 b bg-white ">
                                       
                                          <Image
                                          className=" w-[100%]  h-[100%]"
                                          resizeMethod='cover'
                                          source={icons.trophy} />
                                         
                                        
                                  </View>
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-end p-2 bg-blue-500 ">
                                          <Image
                                          className=" w-[100%]  h-[100%]"
                                          resizeMethod='contain'
                                          source={icons.competition} />
                                         
                                  </View>
                                                               
                            </View>
                            
{/*                             
                            <View
                                 className="p- 4 absolute -rotate-45 rounded-tr-xl top-0 left-0 b bg-[#000000] flex-col  justify-center ">
                                    <Text 
                                        style={{fontSize:width/40,
                                                 color:'white'}}
                                        className="  font-black text-sm text-white">
                                                Challenge                 
                                    </Text>  
                            </View>
                            <View
                                              className="p- absolute -rotate-45 rounded-xl bottom-0 right-0 b bg-[#000000] flex-col  justify-end ">
                                                  <Text 
                                                      style={{fontSize:width/40,
                                                            color:'white'}}
                                                      className="  font-black  text-sm text-white">
                                                          Training                  
                                                </Text>  
                            </View>
                            <View
                                              className="p- 4 absolute rotate-45 rounded-xl bottom-0 left-0 b bg-[#000000] flex-col  justify-end ">
                                                  <Text 
                                                      style={{fontSize:width/40,
                                                            color:'white'}}
                                                      className="  font-black  text-sm text-white">
                                                          Guiness                  
                                                  </Text>  
                            </View>
                            <View
                                            className="p- 4 absolute rounded-tr-xl rotate-45 top-0 right-0 right- 0 b bg-[#000000] flex-col  justify-center ">
                                                <Text 
                                                    style={{fontSize:width/40,
                                                          color:'white'}}
                                                    className="  font-black text-sm text-white">
                                                      Talent                 
                                              </Text>  
                            </View> */}
                           
                            
              </View>
           
              <View className="w-[90%]  justify-start 80 mt- auto gap-4 flex-col py-2 items-center">  

                    <View className="  w-[90%] -auto min-h-[10vh] py-2 flex-row justify-center items-center text-center ">
                    {(isEmailWrong || isEmailInvalid || isPasswordInvalid || isPasswordWrong)&& <Text className="text-gray-200 text-sm ">{message}</Text>}
                    </View>

                    {/* <View className="justify-center items-center w-[100%] mt- 4 flex-row gap- 4">
                        <Text className="text-md text-gray-200 font-black">
                          Don't have an account ? {' '}
                        </Text>
                        <TouchableOpacity 
                          onPress={()=>{
                            router.replace('/signup')
                          }}
                          className=" text-center"
                           >
                          <Text className=" text-md text-blue-300 font-semibold">
                              Register
                          </Text>
                        </TouchableOpacity>
                    </View> */}

                    <FormField 
                    width="100%"
                    height= {height * 0.05}
                    invalid = {isEmailInvalid || isEmailWrong}
                    title="Email" 
                    value={form.email.toLowerCase()}
                    placeholder="email"
                    handleChangeText={(e)=> setForm({...form,email:e})}
                    keyboardType="email-address"
                    />

                    <FormField 
                    width="100%"
                    height= {height * 0.05}
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
                      style={{height : height * 0.05}}
                      className="bg-blue-800  rounded-lg w-[100%] h-[50px] justify-center items-center">
                        {isFetching ? (
                               <View >
                                 <ActivityIndicator size="large" color="#030202" />
                               </View>
                        ):(
                              <Text className="text-[#fff] font-semibold text-lg">Login</Text>
                        )}
                    </TouchableOpacity>   
                    <View className="justify-center items-center w-[100%] mt- 4 flex-row gap- 4">
                        <Text className="text-md text-gray-200 font-semibold">
                          Don't have an account ? {' '}
                        </Text>
                        <TouchableOpacity 
                          onPress={()=>{
                            router.replace('/signup')
                          }}
                          className=" text-center"
                           >
                          <Text className=" text-md text-blue-300 font-semibold">
                              Register
                          </Text>
                        </TouchableOpacity>
                    </View>        

              </View>
                  
         </View>
 
  )
}
