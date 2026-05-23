import React from "react";
import { View, Text, Animated } from "react-native";
import StatusDisplayer from "./statusDisplayer";

export default function CarouselIndicator({
  title ="Performances",
  count = 0,
  scrollX,
  width,
  position,
  absolute = true,
  size = width /45 ,
  rank = null,
  votes = null,
  status = null,
  left
}) {
  return (
    <View 
    style = {{ 
               position : absolute && "absolute",
               bottom : absolute && position.bottom && position.bottom ,
               top : absolute && position.top && position.top , 
               left: absolute && position.left && position.left,
               right: absolute && position.right && position.right}}
    className=" flex-row items-center  gap-2  b g-black ">
     
      <Text
        style={{ fontSize: size }}
        className="text-gray-200 font-bebas tracking-wider mb- 2" >
        {title}{" "}
        {/* <Text
         style={{ fontSize: size  }}
         className="text-white font-semibold">
          {count}
        </Text> */}
      </Text>

      <View className="flex-row items-center gap-1 ">
        {Array.from({ length: count }).map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1, 1],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{
                opacity,
                transform: [{ scale }],
                width: width/60,
                height: size,
                borderRadius: 50,
                // backgroundColor:  "#facc15", 
              }}
            >
                <Text
                  style={{ fontSize: size /1.3 }}
                  className="text-white font-bold">
                     {index + 1}
                </Text>
            </Animated.View>
          );
        })}
      </View>
    {/* {rank !== null && (
      <Text
        style={{ fontSize: width / 42 }}
        className="text-gray-200 font-bebas ml-4 tracking-wider mb- 2"
      >
          {rank<5 ? "Top ":"Rank # "}       
        <Text
         style={{ fontSize: width / 38 }}
         className="text-yellow-400 font-bebas">
          {rank}
        </Text>
      </Text>
     )}
     {votes !== null && (
          <Text
          style={{ fontSize: width / 42 }}
          className="text-gray-200 font-bebas ml-4 tracking-wider mb- 2"
        >
            Votes {" "}      
          <Text
           style={{ fontSize: width / 38 }}
           className="text-pink-400 font-bebas">
            {votes - 1}
          </Text>
        </Text>
     )} */}
    

    </View>
  );
}