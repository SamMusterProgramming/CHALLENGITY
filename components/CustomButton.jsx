import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomButton(props) {
  return (
     <TouchableOpacity className="bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center ">
       <Text className="text-primary font-semibold text-lg">{props.title}</Text>
     </TouchableOpacity>
  )
}