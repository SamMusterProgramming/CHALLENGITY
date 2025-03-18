import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function SelectButton({color,title,bgColor,action}) {
  return (
   <TouchableOpacity
        onPressIn={action}
        className ="rounded-lg w-[18%] h-[30px] flex-col justify-center items-center "
        style= {{backgroundColor:bgColor}}>
        <Text 
        style={{fontSize:9}}
        className="font-black text-white text-xs">
         {title}
        </Text>
      
   </TouchableOpacity>
  )
}