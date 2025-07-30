import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

export default function Friend({friend,w, h}) {
  const {user,setUser,isViewed ,setIsViewed} = useGlobalContext()
  return (
    <TouchableOpacity
     onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:friend.user_id} })}}
     className="-24 -[20%] p-2 flex-col gap-2 justify-start items-center ">
       <Image
         style={{width:w/7 , height:(h * 0.45)/6}}
         className="w-20 h-20 rounded-xl full"
         source={{uri:friend.profile_img}}
        />
      <Text className="text-white text-xs font-black"
      style={{fontSize:8}}>{friend.name.slice(0,10)}</Text>
    </TouchableOpacity>
  )
}