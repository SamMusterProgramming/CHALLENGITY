import React from "react";
import { View, Text, Image } from "react-native";

export default function StageHeader({
  stageLogo,
  stageTitle,
  contestants,
  round,
  continentLogo,
  continentName,
  width
}) {
  return (
    <View className="mx-2 mt- 2 w-[100%] rounded-2xl bg-gradient-to-r from-[#0f0f1a] to-black p-2 ">

     {/* TOP GOLD ACCENT */}
     {/* <View className="h-1 bg-yellow-500" /> */}

<View className="py- 2">

  {/* TOP ROW */}
  <View className="flex-row items-center px-2 justify-between">

    {/* Stage Logo */}
    <View className="p- 2 ml-[-10] items-center justify-center">
      <Image
      style={{height:width/5,width:width/5}}
        source={stageLogo}
        resizeMode="contain"
        // className="w-12 h-12"
      />
    </View>

    {/* Continent */}
    {/* <View className="items-center"> */}
      <View className="p-2 rounded-full bg-black border bor der-yellow-500 items-center justify-center">
        <Image
          source={continentLogo}
          resizeMode="contain"
          className="w-7 h-7"
          style={{height:width/5,width:width/4}}
        />
      </View>
    {/* </View> */}

  </View>

  {/* CENTER CONTENT */}
  <View className="items-center mt-[-60]">

    {/* TITLE */}
    <Text 
    style={{ fontSize : width/28}}
    className="text-white text-xl font-extrabold tracking-widest">
      {stageTitle.toUpperCase()}
    </Text>

    {/* Contestants */}
    <Text 
    style={{ fontSize : width/36}}
    className="text-gray-400 text-sm mt-1 tracking-wide">
      {contestants} COMPETITORS
    </Text>

    {/* ROUND BADGE */}
    <View className="mt-4 px-6 py-2 rounded-full bg-yellow-500/20 border border-yellow-500">
      <Text className="text-yellow-400 text-xs font-bold tracking-[2px]">
        {round.toUpperCase()}
      </Text>
    </View>

  </View>

</View>

     </View>
  );
}