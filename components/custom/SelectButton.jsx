import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function SelectButton({color,title,bgColor,action}) {
  const { width, height } = useWindowDimensions();

  return (
   <TouchableOpacity
        onPressIn={action}
        className ="rounded-lg w-[22%] h-[40px] flex-col justify-center items-center "
        style= {{backgroundColor:bgColor,height:width/11}}>
        <Text 
        style={{fontSize:width/38}}
        className="font-bold text-white ">
         {title}
        </Text>
      
   </TouchableOpacity>
  )
}