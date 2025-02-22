import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
import { authLogin } from '../../apiCalls'

export default function signup() {


  const [user,setUser] = useState(null)
  const [form, setForm] = useState({
    email:"",
    username:"",
    password:"",
    confirm:""
  })
  const [message,setMessage] = useState("")
  
  const handleLogin =()=> {
    console.log(form)
     authLogin(form,setUser,setMessage)
   
  }

  useEffect(() => {
    if(user) {
      router.push('/timeline')
    }
  }, [user])
  return (
    <SafeAreaView className="w-full bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-start flex-col items-center h-full px-4 py-0">
       
           <View className="w-full justify-center flex-row items-center gap-0 ">
               <Image 
                 source={images.challenge_logo} 
                 resizeMode='contain' 
                 className="w-[30%] h-[25vh]"/>
                  <Image 
                 source={images.logo} 
                 resizeMode='contain' 
                 className="w-[70%] h-[25vh]"/>
               {/* <Text className="text-3xl  text-white font-semibold">Login</Text> */}
           </View>
           <View className='w-full h-10 items-center'>
                <Text className="text-2xl text-white font-bold">
                   REGISTER
                </Text>
           </View> 
           <View className="w-full justify-start gap-9 flex-col items-start">  
                 <FormField 
                 title="Email" 
                 value={form.email}
                 placeholder="email"
                 handleChangeText={(e)=> setForm({...form,email:e})}
                 keyboardType="email-address"
                 />
                 <FormField 
                 title="Password" 
                 value={form.password}
                 placeholder="Password"
                 handleChangeText={(e)=> setForm({...form,password:e})}
                 />
                  <FormField 
                 title="Confirm" 
                 value={form.confirm}
                 placeholder="Confirm"
                 handleChangeText={(e)=> setForm({...form,confirm:e})}
               />
                <TouchableOpacity onPress={handleLogin}
                   className="bg-secondary-100 mt-5 rounded-xl w-[100%] h-16 justify-center items-center">
                     <Text className="text-primary font-semibold text-lg">Log in</Text>
                 </TouchableOpacity>

                 <View className="justify-center items-center w-full pt-5 flex-row gap-2">
                     <Text className="text-lg text-gray-200 font-semibold">
                       Already have an account ?
                     </Text>
                     <Link className=" text-lg text-secondary font-semibold"
                     href="/login">
                       Login
                     </Link>
                 </View>
           </View>
        
           
      </View>
    </ScrollView>
 </SafeAreaView>
  )
}

const styles = StyleSheet.create({})