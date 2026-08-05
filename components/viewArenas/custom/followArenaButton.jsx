import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function FollowArenaButton({width,onPress, isFollowed}) {
  return (
    <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={{
            marginTop: 18,
            marginBottom : 10 ,
            // flex:1,
            // width : "50%",
            // borderRadius: 12,
            backgroundColor: isFollowed
                ? "rgba(234,179,8,0.98)"
                : "rgba(255,255,255,0.78)",
            borderWidth: 1,
            borderColor: isFollowed
                ? "rgba(0,0,8,0.95)"
                : "rgba(234,179,8,0.38)",
            justifyContent: "center",
            alignItems: "center",
            alignSelf : "center"
            // premium glass depth
            // shadowColor: "#eab308",
            // shadowOpacity: isFollowed ? 0.18 : 0.08,
            // shadowRadius: 10,
            // elevation: 4,
            }}
            className="py-4 flex-row gap-4 flex-1 rounded-xl"
        >
        {isFollowed && (
          <MaterialCommunityIcons
          name="check"
          size={17}
          color="#000"
        />
        )}
        <Text
        style={{
            color: isFollowed
            ?   "#000"
            : "#000",
            fontWeight: "700",
            fontSize: width / 32,
            letterSpacing: 0.3,
        }}
        >
        {isFollowed ? "Following" : "Follow Arena"}
        </Text>
    </TouchableOpacity>
  )
}