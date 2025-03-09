import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants'

const FormField = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className="space-y-2 gap-3 w-full">
      <Text className="text-gray-100 text-1xl font-medium">{props.title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-2 rounded-2xl
       bg-black-100 focus:border-secondary flex-row items-center">
          <TextInput
          className="flex-1 text-white w-full h-full font-semibold text-base"
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={props.handleChangeText}
          secureTextEntry={(props.title == "Password"|| props.title == "Confirm") && !showPassword}
          keyboardType={props.keyboardType}
           />
           {props.title == "Password" &&
           (
            <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
               <Image className ="w-9 h-9"
               resizeMode='contain'
               source={!showPassword ? icons.eye : icons.eyeHide} />
            </TouchableOpacity>
           )
          }
            
      </View>
    </View>
  )
}

export default FormField