import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants'

const FormField = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    // <View className=" gap-0 w-full">
      <View 
      style={{width:props.width, height:props.height}}
      className={!props.invalid ? "border- 2 border-white  w-full h- 14 px-2 py- rounded-md bg-white flex-row justify-center items-center"
      :"border-2 border-red-500  w-full h- 16 px-2 py- rounded-lg bg-white  flex-row justify-center items-center"}>
          <TextInput
          style={{
            // fontSize:11,
            textAlignVertical: 'center',
            marginBottom: 5,
             
            // height:props.height
          }}
          className="flex-1  w-full text -center h-[100%] borde r-2 border-black  font-semibold text-base"
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={props.handleChangeText}
          secureTextEntry={(props.title == "Password"|| props.title == "Confirm") && !showPassword}
          keyboardType = {props.keyboardType}
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