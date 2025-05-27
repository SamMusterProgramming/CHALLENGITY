import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants'

const FormField = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    // <View className=" gap-0 w-full">
      <View 
      style={{width:props.width, height:props.height}}
      className={!props.invalid ?"border-2 border-white  w-full h-14 px-2 rounded-lg bg-white flex-row items-center"
      :"border-2 border-red-500  w-full h-16 px-2 rounded-lg bg-white  flex-row items-center"}>
          <TextInput
          // style={{fontSize:11}}
          className="flex-1  w-full h-[100%] font-bold text-base"
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={props.handleChangeText}
          secureTextEntry={(props.title == "Password"|| props.title == "Confirm") && !showPassword}
          keyboardType= "default"
          // {props.keyboardType}
           />
           {props.title == "Password"  &&
           (
            <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
               <Image className ="w-10 h-10"
               resizeMode='contain'
               source={!showPassword  ? icons.eye : icons.eyeHide} />
            </TouchableOpacity>
           )
          }
            
      </View>
    // </View>
  )
}

export default FormField