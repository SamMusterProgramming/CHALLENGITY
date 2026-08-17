import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SpotlightIcon({size}) {
  return (
         <View
            style={{
              width: size * 2.4,
              height: size * 2.4,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black" , //"rgba(234,179,8,0.28)",
              borderWidth: 1,
              borderColor: "rgba(234,179,8,0.18)",
            }}
          >
{/*   
            <MaterialCommunityIcons
              name="spotlight-beam"
              size={size}
              color="#eab308"
            /> */}
             <Text
             style = {{
              fontSize : size/1
             }}
             className="text-[#eab308]  font-bold">
                 S
             </Text>
  
            <MaterialCommunityIcons
              name="star-four-points"
              size={size/2}
              color="#eab308"
              style={{
                position: "absolute",
                top: size /4,
                right: size /3,
              }}
            />

            <MaterialCommunityIcons
              name="star-four-points"
              size={size/2}
              color="#eab308"
              style={{
                position: "absolute",
                bottom: size /4,
                right: size /3,
              }}
            />
            <MaterialCommunityIcons
              name="star-four-points"
              size={size/2}
              color="#eab308"
              style={{
                position: "absolute",
                top: size /4,
                left : size /3,
              }}
            />
  
            <MaterialCommunityIcons
              name="star-four-points"
              size={size/2}
              color="#eab308"
              style={{
                position: "absolute",
                bottom: size /4,
                left: size/3,
              }}
            />
  
          </View> 
  )
}