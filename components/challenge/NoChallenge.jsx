import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// import { icons, images } from '../constants'
import { router } from 'expo-router'
import { icons, images } from '../../constants'

export default function NoChallenge({title}) {
  return (
    <View className=" w-full h-[25vh] flex-col mt-2 justify-center gap-2 items-center" > 
       <Image
       className="w-32 h-32"
       resizeMethod='cover'
       source={images.empty} />
       <TouchableOpacity
       onPress={()=>{ 
       {title == "New Challenge" ? router.push({ pathname: '/CreateChallenge', params:{}}) 
                                 :router.push({ pathname: '/timeline', params:{}}) }
                                }}
       className="w-[50%] h-[50px] flex-row rounded-lg bg-blue-500 justify-center gap-4 items-center" >
          <Image 
          className="w-7 h-7"
          resizeMethod='cover'
          source={icons.challenge}/>
          <Text
          className="text-white text-sm font-bold" >
              {title}
          </Text>
       </TouchableOpacity>
    </View>
  )
}