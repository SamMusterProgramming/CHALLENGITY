import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'

import { authLogin, getUserChallenges, getUserParticipateChallenges, isAuthenticated } from '../../apiCalls'
import { GlobalProvider, useGlobalContext } from '../../context/GlobalProvider.js'
// import AuthContent from '../../context/AuthContent'


export default function login() {
  
  const {user,setUser,userChallenges, setUserChallenges,setParticipateChallenges} = useGlobalContext()
  // const [user,setUser] = useState(null)
  const [form, setForm] = useState({
    email:"samirhaddadi@gmail.com",
    password:"Samir@2024"
  })
  const [message,setMessage] = useState("")
  
  const handleLogin =()=> {
     authLogin(form,setUser,setMessage)
  }

  useEffect(() => {
    if(user) {
      getUserChallenges(user._id,setUserChallenges)
      getUserParticipateChallenges(user._id ,setParticipateChallenges)
      router.push('/timeline')
    }
  }, [user])

 
  useEffect(() => {
    isAuthenticated(setUser)
   },[])
 
  
  
  return (
    <SafeAreaView className=" flex-1 bg-primary ">
      <ScrollView className="w-full h-full  bg-primary ">
       <ImageBackground
        source={images.night_bg}>
         <View className="min-w-full justify-start flex-col items-center min-h-[100vh] px-4 py-0">
          
              <View className="w-full justify-center flex-row items-center gap-0 ">
                  <Image 
                    source={images.challenge_logo} 
                    resizeMode='contain' 
                    className="w-[70%] h-[25vh]"/>          
              </View>
           
              <View className='w-full h-20 mt-10 items-center'>
                <Text className="text-2xl text-white font-bold">
                   LOGIN
                </Text>
              </View>
              <View className="w-full justify-start gap-9 flex-col items-start">  
                    <FormField 
                    title="Email" 
                    value={form.email.toLowerCase()}
                    placeholder="email"
                    handleChangeText={(e)=> setForm({...form,email:e})}
                    keyboardType="email-address"
                    />
                    <FormField 
                    title="Password" 
                    value={form.password}
                    placeholder="password"
                    keyboardType="email-address"
                    handleChangeText={(e)=> setForm({...form,password:e})}
                  />
                   <TouchableOpacity onPress={handleLogin}
                      className="bg-blue-400 mt-5 rounded-xl w-[100%] h-16 justify-center items-center">
                        <Text className="text-primary font-semibold text-lg">Log in</Text>
                    </TouchableOpacity>

                    <View className="justify-center items-center w-full pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-200 font-semibold">
                          Don't have an account ?
                        </Text>
                        <Link className=" text-lg text-blue-600 font-semibold"
                        href="/signup">
                          Sign Up
                        </Link>
                    </View>
              </View>
           
              
         </View>
        </ImageBackground>
        </ScrollView> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})