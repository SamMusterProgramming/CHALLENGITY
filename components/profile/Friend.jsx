import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

export default function Friend({friend}) {
  const {user,setUser,isViewed ,setIsViewed} = useGlobalContext()
  return (
    <TouchableOpacity
    onPress={() => {
        if(user._id === friend.id){
          router.push('/profile')
        }
        else{
         if(isViewed) 
          {  console.log("i am here routttterrrrr")
             setIsViewed(false) 
            router.push({ pathname: '/ViewProfile', params: {user_id:friend.id} })
          }
          else router.replace({ pathname: '/ViewProfile', params: {user_id:friend.id} })
        }
      } }
     className="w-24 h-[100%] flex-col justify-center gap-1 items-center">
        <Image
         className="w-12 h-12 rounded-full"
         source={{uri:friend.profile_img}}
        />
      <Text className="text-white text-xs font-bold"
      style={{fontSize:8}}>{friend.name}</Text>
    </TouchableOpacity>
  )
}