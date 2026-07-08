import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function FollowArenaButton({width,onPress, isFollowed}) {
  return (
    <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={{
            // marginTop: 12,
            flex:1,
            borderRadius: 12,
            backgroundColor: isFollowed
                ? "rgba(234,179,8,0.08)"
                : "rgba(255,255,255,0.07)",
            // borderWidth: 1,
            // borderColor: isFollowed
            //     ? "rgba(234,179,8,0.45)"
            //     : "rgba(234,179,8,0.18)",
            justifyContent: "center",
            alignItems: "center",
            // premium glass depth
            // shadowColor: "#eab308",
            // shadowOpacity: isFollowed ? 0.18 : 0.08,
            // shadowRadius: 10,
            // elevation: 4,
            }}
            className="py-4"
        >
        <Text
        style={{
            color: isFollowed
            ?   "#fff"
            : "#fff",
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