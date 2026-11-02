import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ITRILogo = ({ scale = (v) => v, size = 30 }) => {
  const gold = "#D4AF5A";
  const softGold = "#9F7B32";

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        // width: size * 6.8,
        flex:1,
        // height: size * 2.2,
      }}
    >

      {/* Left ornament */}
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
        //   marginTop: -scale(4),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="star-four-points"
          size={scale(9)}
          color={gold}
        />

        <View
          style={{
            width: size * 0.65,
            height: 2,
            backgroundColor: softGold,
            marginLeft: 5,
          }}
        />
      </View>

      {/* Right ornament */}
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          marginTop: -scale(4),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: size * 0.65,
            height: 2,
            backgroundColor: softGold,
            marginRight: 5,
          }}
        />

        <MaterialCommunityIcons
          name="star-four-points"
          size={scale(7)}
          color={gold}
        />
      </View>

      {/* Wordmark */}
      <Text
        style={{
        //   color: "rgb(212, 175, 90)",
          fontSize: size,
          fontWeight: "600",
          letterSpacing: size * 0.1,
          includeFontPadding: false,
          textAlign: "center",
          marginLeft: size * 0.28,
        //   textShadowColor: "rgba(212,175,90,0.3)",
        //   textShadowOffset: { width: 0, height: 0 },
        //   textShadowRadius: 7,
        }}
        className = "text-goldSoft"
      >
        ITRI
      </Text>

      {/* Bottom diamond */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left:size * 0.65 /2,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
         <Text
            style={{
                color: "#fff",
                fontSize: scale(15),
                fontWeight: "500",
                textAlign: "center",
            }}
            >
            ⵣ
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          top: 0,
          right:size * 0.65/2,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
         <Text
            style={{
                color: "#fff",
                fontSize: scale(15),
                fontWeight: "500",
                textAlign: "center",
            }}
            >
            ⵣ
        </Text>
      </View>
    </View>
  );
};

export default ITRILogo;