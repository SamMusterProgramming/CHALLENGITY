import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function UserSelectButton({color,title,bgColor,action,setSelectedPrivacy}) {
  return (
    <TouchableOpacity
    onPress={setSelectedPrivacy(title)}
    className ="rounded-lg w-[23%] h-[40px] flex-col justify-center items-center "
    style= {{backgroundColor:bgColor}}>
    <Text className="font-black text-white text-xs">
     {title}
    </Text>
  
</TouchableOpacity>
  )
}