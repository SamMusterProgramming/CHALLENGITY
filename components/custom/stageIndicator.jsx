

import React from "react";
import {
  View,
  Text,
  Animated,
} from "react-native";

import StatusDisplayer from "./statusDisplayer";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function StageIndicator({
  title = "Performances",
  count = 0,
  width,
  currentStage
}) {
  const { colorTheme , scale } = useGlobalContext();

 

  return (
    <View className="w-full bg-black py-5 px-4 pb-6 6">

      <View className="flex-row items-center  mt- 1 justify-between">

        {/* LEFT */}
        <View
        className ="flex-row gap-2 items-end justify-center">

          <Text
            style={{
              fontSize: scale(12),
              fontWeight : "900"
              // letterSpacing: 1,
            //   color: colorTheme
            }}
            className="text-zinc-400 uppercase fon t-bold"
          >
            {title}
          </Text>

          <View className="flex-row items-center mt- 1">
            <Text
                style={{
                    fontSize: scale(12),
                    color: colorTheme,
                    fontWeight: "800",
                }}
                >
                {currentStage + 1}
                </Text>

                {/* <Text
                className="text-white ml-1"
                style={{
                    fontSize: width / 30,
                    fontWeight: "800",
                }}
                >
                / {count}
            </Text> */}
          </View>
        </View>

        {/* CENTER DOTS */}
        {count > 1 && (
          <View className="flex-row items-center gap-2">
            {Array.from({ length: count }).map(
              (_, index) => {

                // const inputRange = [
                //   (index - 1) * width,
                //   index * width,
                //   (index + 1) * width,
                // ];

                // const opacity =
                //   scrollX?.interpolate({
                //     inputRange,
                //     outputRange: [0.25, 1, 0.25],
                //     extrapolate: "clamp",
                //   }) || 0.25;

                // const scale =
                //   scrollX?.interpolate({
                //     inputRange,
                //     outputRange: [1, 1.1, 1],
                //     extrapolate: "clamp",
                //   }) || 1;

                return (
                  <View
                    key={index}
                    style={{
                      // opacity,
                      // transform: [{ scale }],
                      width: scale(12),
                      height: scale(12),
                      borderRadius: 999,
                      backgroundColor: currentStage === index ? colorTheme : "rgba(255,255,255,0.25)" ,
                    }}
                  />
                );
              }
            )}

          </View>
        )}

        {/* RIGHT */}
       

      </View>

    </View>
  );
}