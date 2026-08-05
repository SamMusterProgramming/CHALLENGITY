import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function StarArenaButton({isStarred , width , onPress}) {
  return (
    <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={{
            // height: width/3,
            // width : width/3,
            borderRadius: 9,
            flexDirection: "col",
            borderColor:
            isStarred
                ? "rgba(234,179,8,0.45)"
                : "rgba(255,255,255,0.08)",
           }}
           className= "z-50 justify-center p-2 items-center bg-[#181416] "
        >
      
        <MaterialCommunityIcons
            name={
            isStarred
                ? "star"
                : "star"
            }
            size={width/12}
            color = {
            isStarred
            ? "rgba(234,179,8,0.95)"
            : "rgba(255,255,255,0.95)"
            }
        />
       
    </TouchableOpacity>
  )
}