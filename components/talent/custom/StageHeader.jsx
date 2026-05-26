

import React from "react";
import { View, Text } from "react-native";
import { countries, stageIcons } from "../../../utilities/TypeData";
import { LinearGradient } from "expo-linear-gradient";

export default function StageHeader({
  stageTitle,
  region,
  contestants,
  round,
  width,
  height
}) {

  const country = countries.find(
    c => c.code?.toLowerCase() === region?.toLowerCase()
  );

  const regionName = country?.name || region;
  const regionFlag = country?.flag || "🌍";

  return (
  

  <View className="w- full fle x-1 bg-black/30 py-2 rounded-xl">

        {/* 🔝 TOP ROW */}
        <View className="flex-row justify-center items-center">
          {round && (
            <View className="px-2 py-[6px] flex-row">

              <Text
                style={{
                  fontSize: height / 32,
                  textShadowColor: "rgba(0,0,0,0.95)",
                  textShadowOffset: { width: 0, height: 3 },
                  textShadowRadius: 8,
                  elevation: 8,
                }}
                className="text-yellow-400 font-extrabold tracking-widest"
              >
                {round.toUpperCase()} {"  "}
              </Text>

              <Text
                style={{
                  fontSize: height / 32,
                  textShadowColor: "rgba(0,0,0,0.95)",
                  textShadowOffset: { width: 0, height: 3 },
                  textShadowRadius: 8,
                  elevation: 8,
                }}
                className="text-gray-200 font-extrabold tracking-widest"
              >
                CONTESTANTS {contestants}
              </Text>

            </View>
          )}
        </View>

        {/* 🎬 CENTER */}
        <View className="items-center w- full flex-row justify-center gap-6 mt-1">

          {/* 🎭 Stage Title */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: height / 28,
              textShadowColor: "rgba(0,0,0,1)",
              textShadowOffset: { width: 0, height: 4 },
              textShadowRadius: 12,
              elevation: 12,
            }}
            className="text-white font-extrabold tracking-[3px] text-center"
          >
            {stageTitle.toUpperCase()}{" "}

            <Text
              style={{
                fontSize: height / 22,
                textShadowColor: "rgba(0,0,0,1)",
                textShadowOffset: { width: 0, height: 3 },
                textShadowRadius: 10,
              }}
              className="text-yellow-400"
            >
              {stageIcons[stageTitle]}
            </Text>
          </Text>

          {/* 🌍 Region */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: height / 28,
              textShadowColor: "rgba(0,0,0,1)",
              textShadowOffset: { width: 0, height: 4 },
              textShadowRadius: 12,
              elevation: 12,
            }}
            className="text-white font-extrabold uppercase tracking-[2px]"
          >
            {regionName}{" "}

            <Text
              style={{
                fontSize: height / 22,
                textShadowColor: "rgba(0,0,0,1)",
                textShadowOffset: { width: 0, height: 3 },
                textShadowRadius: 10,
              }}
              className="text-yellow-400"
            >
              {regionFlag}
            </Text>
          </Text>

        </View>
  </View>

  );
}