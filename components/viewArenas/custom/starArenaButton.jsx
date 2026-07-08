import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function StarArenaButton({isStarred , width , onPress}) {
  return (
    <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={{
            height: width/3,
            width : width/3,
            // paddingHorizontal: 18,
            borderRadius: 9,
            flexDirection: "col",
            // alignItems: "center",
            // justifyContent: "center",
            // backgroundColor:
            //  isStarred
            //     ? "rgba(234,179,8,0.08)"
            //     : "rgba(255,255,255,0.03)",
            // borderWidth: 1,
            borderColor:
            isStarred
                ? "rgba(234,179,8,0.45)"
                : "rgba(255,255,255,0.08)",
            
           }}
           className= "z-50 justify-start items-end "
        >
        {/* <Text
            style={{
            marginRight: 10,
            fontSize: width / 30,
            fontWeight: "700",
            letterSpacing: 0.4,
            color:
                isStarred
                ? "#eab308"
                : "#E5E7EB",
            }}
            >
            {isStarred
            ? "Starred Arena"
            : "Star Arena"}
        </Text> */}
        <MaterialCommunityIcons
            name={
            isStarred
                ? "star"
                : "star"
            }
            size={width/9}
            color = {
            isStarred
            ? "rgba(234,179,8,0.95)"
            : "rgba(255,255,255,0.95)"
            }
        />
        {/* <Text
            style={{
            marginLeft: 6,
            fontSize: width / 30,
            fontWeight: "700",
            letterSpacing: 0.4,
            color:
                isStarred
                ? "#eab308"
                : "#E5E7EB",
            }}
            >
             Arena
        </Text> */}
    </TouchableOpacity>
  )
}