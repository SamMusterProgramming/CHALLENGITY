import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function EmptyPostArena({width , onUploadPerformance }) {
  return (
<View
    style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
        marginTop : 0,
        borderRadius: 22,
        overflow: "hidden",
    }}
    >
    {/* Background Glow */}
    {/* <View
        style={{
        position: "absolute",
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: "rgba(234,179,8,.05)",
        top: -80,
        right: -60,
        }}
    /> */}

    {/* <View
        style={{
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: "rgba(234,179,8,.08)",
        bottom: -50,
        left: -40,
        }}
    /> */}

    {/* Icon */}
    <View
        style={{
        width: width/7,
        height: width/7,
        borderRadius: 41,
        backgroundColor: "rgba(234,179,8,.12)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(234,179,8,.25)",
        }}
    >
        <MaterialCommunityIcons
        name="movie-open-play-outline"
        size={30}
        color="#eab308"
        />
    </View>

    {/* Title */}
    <Text
        style={{
        color: "#FFF",
        fontSize: width/25,
        fontWeight: "700",
        marginTop: 24,
        letterSpacing: 0.4,
        }}
    >
        Your Stage Awaits
    </Text>

    {/* Description */}
    <Text
        style={{
        marginTop: 14,
        color: "rgba(255,255,255,.70)",
        textAlign: "center",
        lineHeight: 23,
        fontSize: 15,
        maxWidth: width * 0.82,
        }}
    >
        This arena doesn't have any performances yet.
        {"\n\n"}
        Upload your first performance to introduce your talent, attract the
        itri community, gain followers, and earn a chance to reach the Spotlight.
    </Text>

    {/* CTA */}
    
    {/* Bottom Hint */}
    <View
        style={{
        // position: "absolute",
        // bottom: 22,
        flexDirection: "row",
        alignItems: "center",
        marginTop : 24,

        }}
    >
            <MaterialCommunityIcons
            name="star-four-points"
            size={14}
            color="#eab308"
            />

            <Text
            style={{
                color: "#eab308",
                marginLeft: 6,
                fontSize: width/38,
                fontWeight: "600",
            }}
            >
            Great performances can be featured in Spotlight
            </Text>
        </View>
</View>
  )
}