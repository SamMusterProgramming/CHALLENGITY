import React from "react";
import { View, Text, Image } from "react-native";
import { continentIcons, stageIcons } from "../../../utilities/TypeData";

export default function StageHeader({
  stageLogo,
  stageTitle,
  region,
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
    <View className="p- 2 ml- [-10] items-center justify-center">
  
      <Text 
       style={{ fontSize : width/10}}
       className="text-white  font-extrabold tracking-widest">
           {stageIcons[stageTitle]}
       </Text>
       <Text 
       style={{ fontSize : width/40}}
       className="text-white t font-extrabold tracking-widest">
           {stageTitle}
       </Text>
    </View>

    {/* Continent */}
    {/* <View className="items-center"> */}
      <View className=" rounded-full items-center justify-center">
       <Text 
       style={{ fontSize : width/10}}
       className="text-white t font-extrabold tracking-widest">
           {continentIcons[region]}
       </Text>
       <Text 
       style={{ fontSize : width/40}}
       className="text-white t font-extrabold tracking-widest">
           {region}
       </Text>
      </View>
    {/* </View> */}

  </View>

  {/* CENTER CONTENT */}
  <View className="items-center mt-[-30]">

    {/* TITLE */}
    <Text 
    style={{ fontSize : width/32}}
    className="text-white text-xl font-extrabold tracking-widest">
      {stageTitle.toUpperCase()}
    </Text>

    {/* Contestants */}
    <Text 
    style={{ fontSize : width/39}}
    className="text-gray-400 text-sm mt-1 tracking-wide">
      {contestants} COMPETITORS
    </Text>

    {/* ROUND BADGE */}
    <View className="mt-2 px-6 py-1  mb-2 rounded-full bg-yellow-500/20 border border-yellow-500">
      <Text
       style={{ fontSize : width/45}}
       className="text-yellow-400 text-xs font-bold tracking-[2px]">
        {round?.toUpperCase()}
      </Text>
    </View>

  </View>

</View>

     </View>
  );
}