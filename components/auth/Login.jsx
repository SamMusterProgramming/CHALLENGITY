import { View, Text, Image, useWindowDimensions, TouchableOpacity, Vibration, KeyboardAvoidingView, Platform, TextInput, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants'
import FormField from '../custom/FormField'
import { authLogin } from '../../apiCalls';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function Login({setAuthType}) {
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

  useEffect(() => {
    user && router.replace('/')
  }, [user])
  

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
  return (

    <ImageBackground
      source={icons.stage_bg}
      resizeMode="cover"
      className="flex-1 w-[100%] h-[100%] justify-center items-center"
      >
    {/* <View className="b g-black white  flex-col flex-1 justify-center items-center "> */}
         {/* <View
              className ="g-[#f29756] w-full te xt-center px-2 py-2 m -[40px] gap-2 items-center px- flex-col">
                   
                   
                    <Text
                     className ="font-bold text-blue-300"
                     style={ {fontSize: 11,fontStyle: 'italic', marginTop : 0 ,marginBottom: 0,textAlign:"start"}}>
                        Unleash Talent. Share Challenges
                    </Text>
                    <Text
                     className ="font-bold text-blue-300"
                     style={ {fontSize: 11,fontStyle: 'italic', marginTop : 0 ,marginBottom: 10,textAlign:"start"}}>
                         Break Records.
                    </Text>
                    <Text 
                    className ="font-black"
                    style={{fontSize: 13,color: '#fff',lineHeight: 22,textAlign:"center"}}>
                        Step into the spotlight with <Text >Challengify</Text> — the ultimate stage where everyday legends rise!
                    </Text>

         </View> */}
         {/* <Image                                                                  
            className="w-[40%] h-[10%] rounded-3xl"
            source={icons.challengify_logo}
            resizeMode='cover'
           />       */}

    

         {/* <View className="w-[100%] rounded-b-[50px] justify-start 80 mt-auto gap-4 flex-col py-2  items-center">                      
                <View className="  w-[90%] -auto min-h-[8vh] py-2 flex-row justify-center items-center text-center ">
                   {(isEmailWrong || isEmailInvalid || isPasswordInvalid || isPasswordWrong)&& <Text className="text-gray-200 text-sm ">{message}</Text>}
                </View>
                <View className="justify-center items-center w-[98%] mt-4 flex-row gap- 4">
                    <Text className="text-md text-gray-200 font-semibold">
                    Don't have an account ? {' '}
                    </Text>
                    <TouchableOpacity 
                    onPress={()=>{
                        setAuthType("register")
                    }}
                    className=" text-center"
                    >
                    <Text className=" text-md text-blue-300 font-semibold">
                        Register
                    </Text>
                    </TouchableOpacity>
                </View>        
                <FormField 
                  width="98%"
                  height= {height * 0.05}
                  invalid = {isEmailInvalid || isEmailWrong}
                  title="Email" 
                  value={form.email.toLowerCase()}
                  placeholder="email"
                  handleChangeText={(e)=> setForm({...form,email:e})}
                  keyboardType="email-address"
                  />

                <FormField 
                  width="98%"
                  height= {height * 0.05}
                  invalid = {isPasswordInvalid || isPasswordWrong}
                  title="Password" 
                  value={form.password}
                  placeholder="password"
                  handleChangeText={(e)=> setForm({...form,password:e})}
                  />

                <TouchableOpacity 
                  onPress={handleLogin}
                  style={{height : height * 0.05}}
                  className="bg-blue-800  rounded-lg w-[98%] h-[50px] mb-1  justify-center items-center">
                      {isFetching ? (
                          <View >
                              <ActivityIndicator size="large" color="#030202" />
                          </View>
                      ):(
                          <Text className="text-[#fff] font-semibold text-lg">Login</Text>
                      )}
                </TouchableOpacity>   
         </View> */}
  
         <Image
              className ="absolute top-[-20] w-[100%]  "
              source={icons.challengify_logo}
              style={{ width: '90%', height: "35%" }} // adjust ratio
              resizeMode="contain"
            />
         <View className="  w-[90%] absolute top-0 min-h- [8vh] py-2 flex-row justify-center items-center text-center ">
                   {(isEmailWrong || isEmailInvalid || isPasswordInvalid || isPasswordWrong)&& <Text className="text-gray-200 text-sm ">{message}</Text>}
        </View>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex- 1 w-[80%] mt-auto mb-20 justify-center px-2"
        >

        <View
                  className="mb-12 w-[100%] flex-row  justify-center item-center">
                                    <Text 
                                        style={{fontSize:width/20,
                                                //  color:'white'
                                                }}
                                        className="  font-bold text-sm  text-[#dcdeed]">
                                               LOGIN              
                                    </Text>  
         </View>


        <View>

            <TextInput
            placeholder="Email"
            placeholderTextColor="#c9b37a"
            value={form.email}
            onChangeText={(e)=> setForm({...form,email:e})}
            className="bg-[#1c1b1a] border border-yellow-600/40 text-[#d5cece] p-4 rounded-xl mb-3"
            />

            <View>
                <TextInput
                      placeholder="Password"
                      placeholderTextColor="#c9b37a"
                      secureTextEntry ={showPassword}
                      value={form.password}
                      onChangeText={(e)=> setForm({...form,password:e})}
                      className="bg-[#1c1b1a] border border-yellow-600/40  text-[#d5cece] p-4 rounded-xl"
                />
              <TouchableOpacity
                  className ="absolute top-0 right-2"
                  onPress={()=> setShowPassword(!showPassword)}>
                      <Image className ="w-10 h-10 "
                      resizeMode='contain'
                      source={!showPassword  ? icons.eye : icons.eyeHide} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
                  onPress={handleLogin}
                  className="bg-[#0e1c2d] p-4 rounded-xl mt-3">
                              {isFetching ? (
                                      <View >
                                          <ActivityIndicator size="large" color="#030202" />
                                      </View>
                                  ):(
                                    <Text 
                                    style={{ fontSize :width/30}}
                                    className="text-[#c9b37a] text-center font-bold text -md">
                                            Sign In
                                    </Text>
                                  )}


            </TouchableOpacity>

            {/* <TouchableOpacity className="bg-[#efeaea] p-4 rounded-xl mt-4 flex-row items-center justify-center">
                <AntDesign name="google" size={width/25} color="black" />
                <Text className="text-black ml-3 font-semibold text-sm">
                    Continue with Google
                </Text>
            </TouchableOpacity> */}

        {/* REGISTER LINK */}

        <View className="flex-row justify-center mt-8">
            <Text className="text-gray-100">
                New to Challengify ? {' '}
            </Text>
            <TouchableOpacity
              onPress={()=>{
                setAuthType("register")
            }}  >
              <Text className="text-indigo-400 ml-2 font-semibold">
                  Create Account
              </Text>
             </TouchableOpacity>
        </View>

        </View>

        </KeyboardAvoidingView>



    </ImageBackground>
  )
}