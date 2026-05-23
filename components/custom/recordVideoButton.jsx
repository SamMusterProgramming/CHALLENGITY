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

export default function RecordVideoButton({
  onPress,
  loading = false,
}) {

  const { width } = useWindowDimensions();

  return (

    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={loading}
      className="p-4"
      style={{
        borderRadius: 24,
        backgroundColor: "#0F0F10",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.07)",
        overflow: "hidden",
        justifyContent: "center",
        shadowColor: "#D4AF37",
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: {
          width: 0,
          height: 6,
        },

        elevation: 7,
      }}
    >

      {/* GOLD LIGHT */}
      {/* <View
        style={{
          position: "absolute",
          top: -20,
          right: -25,
          width: 90,
          height: 90,
          borderRadius: 999,
          backgroundColor:
            "rgba(212,175,55,0.10)",
        }}
      /> */}

      {/* CONTENT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

        {/* LEFT */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // flex: 1,
          }}
        >

          {/* ICON */}
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
              backgroundColor:
                "rgba(212,175,55,0.14)",

              justifyContent: "center",
              alignItems: "center",

              marginRight: 10,
            }}
          >

            <MaterialCommunityIcons
              name="record-rec"
              size={42}
              color="#D4AF37"
            />

          </View>

          {/* TEXT */}
          <View
            style={{
            //   flex: 1,
            }}
          >

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: width/36,
                fontWeight: "800",
                letterSpacing: 0.3,
              }}
            >
              Record 
            </Text>

            <Text
              style={{
                marginTop: 3,
                color:
                  "rgba(255,255,255,0.42)",
                fontSize: width / 38,
                fontWeight: "500",
              }}
            >
              Performance
            </Text>

          </View>

        </View>

        {/* RIGHT */}
        <View
          style={{
            marginLeft: 2,
          }}
        >

          {loading ? (
            <ActivityIndicator
              color="#D4AF37"
              size="small"
            />
          ) : (
            <Feather
              name="chevron-right"
              size={24}
              color="#D4AF37"
            />
          )}

        </View>

      </View>

    </TouchableOpacity>
  );
}