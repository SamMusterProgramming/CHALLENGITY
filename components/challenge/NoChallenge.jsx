import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// import { icons, images } from '../constants'
import { router } from 'expo-router'
import { icons, images } from '../../constants'

export default function NoChallenge() {
  return (
    <View className=" w-full h-[25vh] flex-col mt-5 justify-center gap-5 items-center" > 
       <Image
       className="w-44 h-44"
       resizeMethod='cover'
       source={images.empty} />
       <TouchableOpacity
       onPress={()=>{ 
        router.push({pathname: '/CreateChallenge', params:{}}) }}
       className="w-[60%] h-[50px] flex-row rounded-lg bg-blue-500 justify-center gap-4 items-center" >
          <Image 
          className="w-8 h-8"
          resizeMethod='cover'
          source={icons.challenge}/>
          <Text
          className="text-white text-xl font-bold" >
              New Challenge
          </Text>
       </TouchableOpacity>
    </View>
  )
}