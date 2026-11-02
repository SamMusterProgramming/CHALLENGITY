import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function DiamandSeperator() {

    const { spacing , scale} = useGlobalContext()
  return (
    <View
        style={{
          flexDirection: "row",
        //   marginTop: spacing(19),
          width : "100%"
        }}
        className = "justify-between gap -2 items-center"
      >
        <View
          style={{
            // flex: 1,
            width : "45%",
            height: 1,
            backgroundColor: "rgba(192, 192, 192, 0.25)",
          }}
        />

        <MaterialCommunityIcons
        name="star-four-points"
        size={scale(10)}
        color={"gold"}
         />
  
        <View
          style={{
            width : "45%",
            height: 1,
            backgroundColor: "rgba(192, 192, 192, 0.25)",
          }}
        />

      </View>
  )
}