import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function StarArenaButton({isStarred , width , onPress}) {
  return (
    <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={{
            // height: 52,
            paddingHorizontal: 18,
            borderRadius: 9,
            flexDirection: "col",
            alignItems: "center",
            justifyContent: "center",
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
           className= "py-4 gap-3 ite ms-end"
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
                : "star-outline"
            }
            size={35}
            color = {
            isStarred
                ? "#eab308"
                : "#9CA3AF"
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