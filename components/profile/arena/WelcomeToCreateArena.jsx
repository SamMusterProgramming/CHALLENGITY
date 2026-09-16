
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalContext } from "../../../context/GlobalProvider";

export default function WelcomeToCreateArena({
  setOpenArenaAlertModal,
  setArenaActionModal,
}) {
  const { width, height } = useWindowDimensions();
  const { user, setShowProfile, setActiveIndex } = useGlobalContext();

  return (
    <View
      className="w-full flex-1 justify-center items-center overflow-hidden rounded-2xl bg-[#080808]"
      style={{
        alignSelf: "center",
        padding: 24,
      }}
    >
      {/* Ambient glow */}
      <View
        className="absolute inse t-0 rounded-full bg-yellow-500/5"
        style={{
          width: width * 0.85,
          height: width * 0.85,
          bottom :20
        }}
      />

      {/* Subtle corner sparks */}
      <View className="absolute left-5 top-5">
        <MaterialCommunityIcons
          name="star-four-points"
          size={22}
          color="#EAB308"
        />
      </View>

      <View className="absolute right-5 top-5">
        <MaterialCommunityIcons
          name="star-four-points"
          size={22}
          color="#EAB308"
        />
      </View>

      {/* CENTER CONTENT */}
      <View className="flex-1 items-center gap-4 justify-end">
        {/* Icon */}
        <View className="self-center mb-7">
       

          <View
           
            className="h-[82px] w-[82px] items-center justify-center rounded-full bor der bor der-yellow-500/25"
          >
            <MaterialCommunityIcons
              name="stadium-outline"
              size={width / 8}
              color="#EAB308"
            />
          </View>

        </View>

        {/* Main message */}
        <Text
          className="text-center font-black text-white"
          style={{
            fontSize: width / 16,
            letterSpacing: -0.5,
          }}
        >
          Create your Arena
        </Text>

        <Text
          className="mt-3 max-w-[290px] text-center font-medium text-neutral-500"
          style={{
            fontSize: width / 30,
            lineHeight: width / 22,
          }}
        >
          Your space for building your talent identity.
        </Text>

        {/* CTA */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            setShowProfile(false);
            setActiveIndex(3);
          }}
          style={{
           width : width * 0.85
          }}
          className="mt-8 h-[54px] w-full flex-row items-center justify-center rounded-xl bg-yellow-500"
        >
          <MaterialCommunityIcons
            name="plus"
            size={21}
            color="#080808"
          />

          <Text
            className="ml-2 font-black text-[#080808]"
            style={{
              fontSize: width / 27,
            }}
          >
            Create Arena
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom accent */}
      <View className="items-center pb-1">
        <View className="h-[2px] w-10 rounded-full bg-yellow-500/40" />
      </View>
    </View>
  );
}