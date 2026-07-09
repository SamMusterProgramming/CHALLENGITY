import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function WelcomeToCreateArena({
   setOpenArenaAlertModal , setArenaActionModal
}) {
  const { width, height } =
    useWindowDimensions();

  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: "#050505",
      }}
    >
      {/* <View
      
       
      > */}
        {/* HERO */}

        <View
          style={{
            alignItems: "center",
            // paddingTop: height * 0.02,
            paddingHorizontal: 25,
          }}
        >
          

          <Text
            style={{
              color: "#eab308",
              fontSize: width / 20,
              fontWeight: "900",
              marginTop: 12,
              letterSpacing: 1,
            }}
          >
            YOUR ARENA
          </Text>

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: width / 24,
              fontWeight: "900",
              textAlign: "center",
              marginTop: 8,
            //   lineHeight: 45,
            }}
          >
            Where Talent
          </Text>

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: width / 24,
              fontWeight: "900",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Becomes Identity
          </Text>

          <Text
            style={{
              color: "#9CA3AF",
              textAlign: "center",
              marginTop: 20,
              lineHeight: 24,
              fontSize: width / 26,
            }}
          >
            Create your personal talent space,
            showcase your journey, build an
            audience, and let people discover
            what makes you unique.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>{
            setOpenArenaAlertModal(true)
            setArenaActionModal("create_arena")
            // setVisible(false)
          }}
          style={{
            marginHorizontal: 22,
            marginTop: 15,
            // height: 62,
            borderRadius: 12,
            backgroundColor:
              "#eab308",
            justifyContent: "center",
            alignItems: "center",
          }}
          className = "py-4"
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "900",
              fontSize: width / 28,
            }}
          >
            Create My Arena
          </Text>
        </TouchableOpacity>

       
    </View>
  );
}