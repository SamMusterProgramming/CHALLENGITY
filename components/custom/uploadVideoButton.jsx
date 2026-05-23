import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";

import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function UploadVideoButton({
  onPress,
  loading = false,
}) {

  const {height , width} = useWindowDimensions()


  return (

    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={loading}
      style={{
        // width: "50%",
        // height: 62,
        borderRadius: 22,
        backgroundColor: "#111111",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        overflow: "hidden",
        justifyContent: "center",
        shadowColor: "#D4AF37",
        shadowOpacity: 0.18,
        shadowRadius: 18,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        elevation: 8,
      }}
      className ="flex-col items-center p-4"
    >

      {/* GOLD GLOW */}
      {/* <View
        style={{
          position: "absolute",
          right: -30,
          top: -25,
          width: 120,
          height: 120,
          borderRadius: 999,
          backgroundColor:
            "rgba(212,175,55,0.16)",
        }}
      /> */}

      {/* CONTENT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >

        {/* ICON */}
        <View
          style={{
            // width: 42,
            // height: 42,
            padding:3,
            borderRadius: 10,
            backgroundColor:
              "rgba(212,175,55,0.14)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <MaterialCommunityIcons
            name="video-plus"
            size={36}
            color="#D4AF37"
          />

        </View>

        {/* TEXT */}
        <View>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: width/36,
              fontWeight: "800",
              letterSpacing: 0.3,
            }}
          >
            Upload 
          </Text>

          <Text
            style={{
              marginTop: 2,
              color: "rgba(255,255,255,0.42)",
              fontSize: width/49,
              fontWeight: "500",
            }}
          >
            Performance
          </Text>

        </View>

        {/* RIGHT ICON */}
        <View
          style={{
            marginLeft: 0,
          }}
        >

          {loading ? (
            <ActivityIndicator
              color="#D4AF37"
              size="small"
            />
          ) : (
            <Feather
              name="arrow-up-right"
              size={20}
              color="#D4AF37"
            />
          )}

        </View>

      </View>

    </TouchableOpacity>
  );
}