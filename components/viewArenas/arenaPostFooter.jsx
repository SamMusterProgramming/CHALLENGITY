import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ArenaPostFooter({arena ,width}) {
  return (
    <View
    style={{
        position: "absolute",
        bottom: 5,
        left: 5,
        right: 5,
        zIndex:50,
        // height: 72,
        borderRadius: 18,
        backgroundColor:"rgba(10,10,10,0.55)",
        borderWidth: 1,
        borderColor: "rgba(234,179,8,0.12)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical:8
    }}
    >
        {/* AVATAR */}

        <Image
            source={{
            uri:
                arena?.profileImage
                ?.publicUrl,
            }}
            style={{
            width: width/10,
            height: width/10,
            borderRadius: 999,
            borderWidth: 1.5,
            borderColor:
                "rgba(234,179,8,0.45)",
            }}
        />

        {/* INFO */}

        <View
            style={{
            flex: 1,
            marginLeft: 10,
            }}
        >
            <Text
            numberOfLines={1}
            style={{
                color: "#fff",
                fontSize: width / 34,
                fontWeight: "800",
            }}
            >
            {arena?.arenaName}
            </Text>
            <Text
            numberOfLines={1}
            style={{
                marginTop: 4,
                color: "#eab308",
                fontSize: width / 38,
                fontWeight: "700",
            }}
            >
            {arena?.talentType}
            {" • "}
            {arena?.region}
            </Text>
        </View>
        {/* FOLLOW */}
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
            height: 36,
            paddingHorizontal: 34,
            borderRadius: 9,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
                "rgba(234,179,8,0.08)",
            borderWidth: 1,
            borderColor:
                "rgba(234,179,8,0.35)",
            }}
        >
            <Text
            style={{
                color: "#eab308",
                fontWeight: "700",
                fontSize: width / 38,
            }}
            >
            Follow Arena
            </Text>
        </TouchableOpacity>
    </View>
  )
}