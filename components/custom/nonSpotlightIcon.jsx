import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function NonSpotlightIcon({size}) {
  return (
        <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:"white"            
              }}
              className = "rounded-full p-1" >
            
            <MaterialCommunityIcons
              name="progress-clock"
              size={size*1.4}
              color="black"
            />
  
        </View> 
  )
}