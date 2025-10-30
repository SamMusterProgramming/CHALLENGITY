import { View, Text, Image, useWindowDimensions, TouchableOpacity, Vibration } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants'
import FormField from '../custom/FormField'
import { authLogin } from '../../apiCalls';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

export default function Login({setAuthType}) {
  const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData,notifications} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [message,setMessage] = useState("")
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
  const [isFetching, setIsFetching] = useState(false);
  const [form, setForm] = useState({
    email:"samirhaddadi@gmail.com",
    password:"Samir@2024"
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
    <View className="bg-black white w-[100%] min-h-[100px] flex-col flex-1 justify-start items-center round ed-xl">
         <View
              className ="g-[#f29756] w-full text-center px-4 py-4 m -[40px] gap-2 items-center px- flex-col">
                   
                   
                    <Text
                     className ="font-black"
                     style={ {fontSize: 16,fontStyle: 'italic',color: '#5ca9f0', marginTop : 10 ,marginBottom: 0,textAlign:"center"}}>
                        Unleash Talent. Share Challenges
                    </Text>
                    <Text
                     className ="font-black"
                     style={ {fontSize: 16,fontStyle: 'italic',color: '#5ca9f0', marginTop : 0 ,marginBottom: 20,textAlign:"center"}}>
                         Break Records.
                    </Text>
                    <Text 
                    className ="font-bl ack"
                    style={{fontSize: 14,color: '#fff',lineHeight: 18,textAlign:"center"}}>
                        Step into the spotlight with <Text >Challengify</Text> — the ultimate stage where everyday legends rise!
                    </Text>

         </View>

         <View
                  className="flex- 1  bg-[#000000] flex-col p-1 mt-[80] justify-center item-center">
                                    <Text 
                                        style={{fontSize:18,
                                                 color:'white'}}
                                        className="  font-black text-sm text-white">
                                                LOGIN                
                                    </Text>  
         </View>

         <View className="w-[100%] rounded-b-[50px] justify-start 80 mt-auto gap-4 flex-col py-2  items-center">                      
                <FormField 
                width="90%"
                height= {height * 0.05}
                invalid = {isEmailInvalid || isEmailWrong}
                title="Email" 
                value={form.email.toLowerCase()}
                placeholder="email"
                handleChangeText={(e)=> setForm({...form,email:e})}
                keyboardType="email-address"
                />

                <FormField 
                width="90%"
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
                className="bg-blue-800  rounded-lg w-[90%] h-[50px] justify-center items-center">
                    {isFetching ? (
                        <View >
                            <ActivityIndicator size="large" color="#030202" />
                        </View>
                    ):(
                        <Text className="text-[#fff] font-semibold text-lg">Login</Text>
                    )}
                </TouchableOpacity>   
                <View className="justify-center items-center w-[90%] mt-4 flex-row gap- 4">
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
                <View className="  w-[90%] -auto min-h-[10vh] py-2 flex-row justify-center items-center text-center ">
                {(isEmailWrong || isEmailInvalid || isPasswordInvalid || isPasswordWrong)&& <Text className="text-gray-200 text-sm ">{message}</Text>}
                </View>

                </View>
    </View>
  )
}