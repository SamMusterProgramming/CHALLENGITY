import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FollowArenaButton from './custom/followArenaButton'

export default function ArenaPostFooter({post ,width , loadProfile , isFollower ,toggleFollower }) {
  return (
    <TouchableOpacity
    onPress={loadProfile}
    style={{
        position: "absolute",
        bottom: 80,
        left: 14,
        zIndex:50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical:0
    }}
    className = "rounded-t-3xl"
    >
        {/* AVATAR */}

        <Image
            source={{
            uri:
                post?.profileImage
                ?.publicUrl,
            }}
            style={{
            width: width/13,
            height: width/13,
            borderRadius: 999,
            borderWidth: 1.5,
            borderColor:
                "rgba(234,179,8,0.45)",
            }}
        />

        {/* INFO */}

        <View
            style={{
            // flex: 1,
            marginLeft: 20,
            marginRight:20
            }}
        >
            <Text
            numberOfLines={1}
            style={{
                color: "#fff",
                fontSize: width / 38,
                fontWeight: "800",
            }}
            >
            {post?.arenaName}
            </Text>
            <Text
            numberOfLines={1}
            style={{
                marginTop: 4,
                color: "#eab308",
                fontSize: width / 42,
                fontWeight: "700",
            }}
            >
            {post?.talentType}
            {" • "}
            {post?.region}
            </Text>
        </View>
        {/* FOLLOW */}
        {/* <FollowArenaButton onPress={toggleFollower} width={width} isFollowed = {isFollower} /> */}
{/* 
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
        </TouchableOpacity> */}
    </TouchableOpacity>
  )
}
