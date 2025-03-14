import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function SelectButton({color,title,bgColor,action}) {
  return (
   <TouchableOpacity
   onPress={action}
        className ="rounded-lg w-[23%] h-[40px] flex-col justify-center items-center "
        style= {{backgroundColor:bgColor}}>
        <Text className="font-black text-white text-xs">
         {title}
        </Text>
      
   </TouchableOpacity>
  )
}