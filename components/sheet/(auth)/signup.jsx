import { ActivityIndicator, Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, Vibration, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
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
  const insets = useSafeAreaInsets();



  const [form, setForm] = useState({
    firstname:"",
    lastname:"",
    email:"",
    username:"",
    password:"",
    confirm:"",
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




  return (
   

 
                     

        <View 
         style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top ,
          paddingBottom:Platform.OS == "ios" ? insets.bottom : insets.bottom
            }}
         className="w-[100%]  h-[100%] bg-primary justify-between absolut e top- 0 gap- flex-col items-center   ">
       
           
          <View
              className ="g-[#f29756] w-full text-center mt- [40px] gap- 2 items-center px- flex-col">
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
                    {/* <Text style={{fontSize: 12,color: '#fff',lineHeight: 18,textAlign:"center"}}>
                      Step into the spotlight with <Text style={styles.bold}>Challengify</Text> — the ultimate stage where everyday legends rise!
                    </Text> */}

              </View>

             
            
              <View className=" w-[90%] h-[35%] border-b-2 border-[#de4108] flex- 1 mt- auto rounded-xl  justify-between items-center p-6 b b g-white">
                            <View className=" w-[80%]  h-[100%] gap-2 flex-row flex-wrap justify-center items-center p-2 bg-black ">
                                  
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-4 bg-[#1166ef] ">
                                          <Image
                                          className=" w-[70%]  h-[90%]"
                                          resizeMethod='cover'
                                          source={icons.challenge} />
                                  </View>
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-4 bg-[#ae1717] ">
                                          <Image
                                          className=" w-[70%]  h-[90%]"
                                          resizeMethod='cover'
                                          source={icons.home} />
                                          
                                  </View>
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-2 b bg-white ">
                                       
                                          <Image
                                          className=" w-[70%]  h-[90%]"
                                          resizeMethod='cover'
                                          source={icons.trophy} />
                                         
                                        
                                  </View>
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-end p-2 bg-blue-500 ">
                                          <Image
                                          className=" w-[70%]  h-[90%]"
                                          resizeMethod='contain'
                                          source={icons.competition} />
                                         
                                  </View>

                                 
                                   
                            </View>
                            
                            
                            {/* <View
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

           <View
                  className="  flex- 1 h- [5vh] py-2 bg-[#000000] mt-2 flex-col p-1 justify-center item-center">
                                    <Text 
                                        style={{fontSize:width/30,
                                                 color:'white'}}
                                        className="  font-black text-sm text-white">
                                                REGISTER              
                                    </Text>  
          </View>  
           <View className="w-[100%] rounded-b-[50px] border-l-2 border-r-2 border-b-2 border-[#de4108] justify-start mt-auto py-2  gap-3 flex-col items-center">  
               
                <View
                 className="w-[90%] flex-row justify-between   items-center">
                        <FormField 
                        width="48%"
                        height= {height * 0.05}
                        invalid = {isFirstnameInvalid }
                        title="firstname" 
                        value={form.firstname}
                        placeholder="Firstname"
                        handleChangeText={(e)=> setForm({...form,firstname:e})}
                        keyboardType="email-address"
                        />
                         <FormField 
                        width="48%"
                        height= {height * 0.05}
                        invalid = {isLastnameInvalid}
                        title="lastname" 
                        value={form.lastname}
                        placeholder="Lastname"
                        handleChangeText={(e)=> setForm({...form,lastname:e})}
                        keyboardType="email-address"
                        />
                </View>
                 <FormField 
                 width="90%"
                 height= {height * 0.05}
                 invalid = {isEmailInvalid || isEmailWrong}
                 title="Email" 
                 value={form.email}
                 placeholder="email"
                 handleChangeText={(e)=> setForm({...form,email:e.toLowerCase(),username:e.toLowerCase()})}
                 keyboardType="email-address"
                 />
                 <FormField 
                 width="90%"
                 height= {height * 0.05}
                 invalid = {isPasswordInvalid || isPasswordWrong}
                 title="Password" 
                 value={form.password}
                 placeholder="Password"
                 handleChangeText={(e)=> setForm({...form,password:e})}
                 />
                  <FormField 
                 width="90%"
                 height= {height * 0.05}
                 invalid = {isPasswordWrong}
                 title="Confirm" 
                 value={form.confirm}
                 placeholder="Confirm"
                 handleChangeText={(e)=> setForm({...form,confirm:e})}
               />
                <TouchableOpacity onPress={handleRegistration}
                   style={{height : height * 0.05}}
                   className="bg-blue-800 mt-0 rounded-xl w-[90%] h-[47px] justify-center items-center">

                        {isFetching ? (
                               <View >
                                 <ActivityIndicator size="large" color="#030202" />
                               </View>
                        ):(
                               <Text className="text-white font-semibold text-lg">Register</Text>
                        )}
                 </TouchableOpacity>


                 <View className="justify-center items-center w-[90%] -5 flex-row gap- 4">
                     <Text className="text-sm text-gray-100 font-semibold">
                       Already have an account ? {' '}
                     </Text>
                     <TouchableOpacity 
                        onPress={()=>{
                          router.replace('/login')
                        }}
                        className=" text-center"
                           >
                          <Text className=" text-md text-blue-300 font-semibold">
                              Login
                          </Text>
                        </TouchableOpacity>
                 </View>

                 <View className="  w-[90%] h-[7vh] flex-col -auto justify-center items-centert ">
                          {(isEmailWrong || isEmailInvalid || isPasswordInvalid 
                            || isPasswordWrong || isFirstnameInvalid || isLastnameInvalid)&& <Text className="text-gray-400 text-sm text-center ">{message}</Text>}
                </View>

                 {/* <View className="justify-start items-center w-[90%] -5 flex-row gap-4">
                     <Text className="text-sm text-gray-100 font-semibold">
                       Already have an account ?
                     </Text>
                     <Link className=" text-lg text-blue-400 font-semibold"
                     href="/login">
                       Login
                     </Link>
                 </View> */}
           </View>

       
          
        
           
      </View>

    // </ImageBackground> 
 
  )
}

const styles = StyleSheet.create({})