import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'
import { MotiView } from 'moti'

export default function Friend({friend,w, h ,index}) {
  const {user,setUser,isViewed ,setIsViewed} = useGlobalContext()
  return (

    <TouchableOpacity
     onPress={()=> {router.push({ pathname: '/ViewProfile', params: {user_id:friend.user_id} })}}
     className=" p- 2 flex-col gap-2 justify-center items-center rounded-lg bg-gray-800 bg -[#313435] ">
        <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100, type: 'timing', duration:index * 100 }}
        className=" p-2 flex-col gap-2 justify-start items-center px-2"
        style={{width:w/6 , height:w/5.7}}
      >
       <Image
         style={{width:w/10 , height:w/10}}
         className="w-12 h-12 rounded-xl full"
         source={{uri:friend.profile_img}}
        />
      <Text className="text-gray-100 text-xs font-black"
      style={{fontSize:8}}>{friend.name.slice(0,10)}</Text>
        </MotiView>
    </TouchableOpacity>

  )
}