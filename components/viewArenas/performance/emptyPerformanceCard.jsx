import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EmptyPerformanceCard({
  width,
  onFollowArena,
}) {
  return (
    <View
      style={{
        width,
        // paddingVertical: width / 8,
        paddingHorizontal: 28,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
        overflow: "hidden",
      }}
    >
     

      {/* Title */}

      <Text
        style={{
          marginTop: 12,
          color: "#FFF",
          fontSize: width / 28,
          fontWeight: "700",
          letterSpacing: 0.3,
        }}
      >
        The Stage Is Being Prepared
      </Text>

       {/* Premium Icon */}

       <View
        style={{
          width: width / 6.5,
          height: width / 6.5,
          borderRadius: width / 13,
          marginTop: 18,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(234,179,8,.10)",
          borderWidth: 1,
          borderColor: "rgba(234,179,8,.22)",
        }}
      >
        <MaterialCommunityIcons
          name="movie-open-play-outline"
          size={34}
          color="#eab308"
        />
      </View>

      {/* Description */}

      <Text
        style={{
          marginTop: 14,
          color: "rgba(255,255,255,.72)",
          textAlign: "center",
          lineHeight: 24,
          fontSize: width / 28,
          maxWidth: width * 0.82,
        }}
      >
        This arena hasn't published its first performance yet.
        {"\n\n"}
        Follow the arena to be among the first to discover new performances
        and receive updates whenever fresh content is released.
      </Text>

      

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 26,
        }}
      >
        <MaterialCommunityIcons
          name="star-four-points"
          size={14}
          color="#eab308"
        />

        <Text
          style={{
            marginLeft: 6,
            color: "#eab308",
            fontSize: width / 38,
            fontWeight: "600",
          }}
        >
          Discover tomorrow's Spotlight talents first
        </Text>
      </View>
    </View>
  );
}