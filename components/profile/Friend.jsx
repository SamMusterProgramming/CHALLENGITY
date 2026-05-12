import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { MotiView } from "moti";

export default function Friend({ friend, w, index }) {

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        delay: index * 60,
        type: "timing",
        duration: 400,
      }}
      style={{
        width: "31%", // 3 columns clean
        marginBottom: 18,
      }}
    >
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/ViewProfile",
            params: { user_id: friend.user_id },
          })
        }
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.96 : 1 }],
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <View
          style={{
            borderRadius: 14,
            backgroundColor: "rgba(255,255,255,0.04)",
            paddingVertical: 14,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          {/* IMAGE */}
          <Image
            source={{ uri: friend.profileImage?.publicUrl}}
            style={{
              width: w / 6,
              height: w / 6,
              borderRadius: 12,
              marginBottom: 10,
            }}
          />

          {/* NAME */}
          <Text
            numberOfLines={1}
            style={{
              color: "#E5E7EB",
              fontSize: w / 40,
              letterSpacing: 0.8,
            }}
            className="font-bebas"
          >
            {friend.name}
          </Text>
        </View>
      </Pressable>
    </MotiView>
  );
}