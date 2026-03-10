import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants'

const FormField = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    
      <View
      style={{width:props.width}}>
          <TextInput
          style ={{ width:props.width}}
          className="bg-[#14110a] min-w-[100%] border border-yellow-600/40 text-white p-4 rounded-xl mb-2"
          // value={props.value}
          placeholderTextColor="#c9b37a"
          placeholder={props.placeholder}
          onChangeText={props.handleChangeText}
          secureTextEntry={(props.title == "Password"|| props.title == "Confirm") && !showPassword}
          keyboardType = {props.keyboardType}
          textContentType = {props.keyboardType}
           />
           {props.title == "Password"  &&
           (
            <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
               <Image className ="w-10 h-10 absolute top-2 right-2"
               resizeMode='contain'
               source={!showPassword  ? icons.eye : icons.eyeHide} />
            </TouchableOpacity>
           )
          }
            
    
    </View>
  )
}

export default FormField