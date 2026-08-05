import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SpotlightIcon({size}) {
  return (
         <View
            style={{
              width: size * 2.2,
              height: size * 2.2,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(234,179,8,0.08)",
              borderWidth: 1,
              borderColor: "rgba(234,179,8,0.18)",
            }}
          >
  
            <MaterialCommunityIcons
              name="spotlight-beam"
              size={size}
              color="#FDE68A"
            />
  
            <MaterialCommunityIcons
              name="star-four-points"
              size={size/2}
              color="#FDE68A"
              style={{
                position: "absolute",
                top: size /4,
                right: size /3,
              }}
            />
  
            <MaterialCommunityIcons
              name="star-four-points"
              size={size/2}
              color="#FDE68A"
              style={{
                position: "absolute",
                bottom: size /4,
                left: size/3,
              }}
            />
  
          </View> 
  )
}