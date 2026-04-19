// import React from "react";
// import { View, Text, Image } from "react-native";
// import {  countries, stageIcons } from "../../../utilities/TypeData";

// export default function StageHeader({
//   stageTitle,
//   region,
//   contestants,
//   round,
//   width
// }) {
//   return (
//     <View className="mx-2 mt- 2 w-[100%] rounded-2xl bg-gradient-to-r from-[#0f0f1a] to-black p-2 ">

     

// <View className="py- 2">

//   {/* TOP ROW */}
//   <View className="flex-row items-center px-2 justify-between">

//     {/* Stage Logo */}
//     <View className="mt-2 gap-1 ite ms-between justify-center">
  
//       <Text 
//        style={{ width:width/6 ,fontSize : width/15}}
//        className="text-white bg -blue-500 text-center font-extrabold trac king-widest">
//            {stageIcons[stageTitle]}
//        </Text>
//        <Text 
//        style={{ width:width/6 , fontSize : width/32 ,}}
//        numberOfLines={1}
//        className="text-white  text-center font-bebas tracking-widest">
//            {stageTitle}
//        </Text>
//     </View>

//       <View className=" mt-2 gap-1 item s-center justify-center">
//        <Text 
//        style={{ width:width/6 , fontSize : width/15 ,}}
//         className="text-white text-center fon t-extrabold tracki ng-widest">
//            {countries.find(c => c.code.toLowerCase() === region?.toLowerCase())?.flag}
//        </Text>
//        <Text 
//        style={{ width:width/6 , fontSize : width/32 ,}}
//        numberOfLines={1}
//        className="text-white  text-center font-bebas tracking-widest">
//            {countries.find(c => c.code === region)?.name}
//        </Text>
//       </View>
//     {/* </View> */}

//   </View>

//   {/* CENTER CONTENT */}
//   <View className="items-center mt-[-35]">

//     {/* TITLE */}
//     <Text 
//     style={{ fontSize : width/30}}
//     className="text-white tex t-xl font-bold tracki ng-widest">
//       {stageTitle.toUpperCase()}
//     </Text>

//     {/* Contestants */}
//     <Text 
//     style={{ fontSize : width/42}}
//     className="text-gray-200 text-sm mt-1 tracking-wide">
//       {contestants} CONTESTANTS
//     </Text>

//     {/* ROUND BADGE */}
//     <View className="mt- 2 px-6 py-1  mb-2 rounded-lg b g-yellow-500/40 bo rder bo rder-yellow-500">
//       <Text
//        style={{ fontSize : width/43}}
//        className="text-yellow-400 text-xs font-black tracking-[0px]">
//         {round?.toUpperCase()}
//       </Text>
//     </View>

//   </View>

// </View>

//      </View>
//   );
// }

import React from "react";
import { View, Text } from "react-native";
import { countries, stageIcons } from "../../../utilities/TypeData";
import { LinearGradient } from "expo-linear-gradient";

export default function StageHeader({
  stageTitle,
  region,
  contestants,
  round,
  width
}) {

  const country = countries.find(
    c => c.code?.toLowerCase() === region?.toLowerCase()
  );

  const regionName = country?.name || region;
  const regionFlag = country?.flag || "🌍";

  return (
    <View className="w-full px-2 pt-2 pb-1">

      <View className="b g-[#0b0b0f] bo rder bor der-yellow-500/20 rounded-lg overflow-hidden">

        {/* ✨ Subtle Top Glow */}
       

        <View className="px-3 pt-2 pb-2">

          {/* 🔝 TOP ROW */}
          <View className="flex-row justify-between items-center">

            {/* Stage */}
            <View className="items-center">
              <Text
                style={{ fontSize: width / 18 }}
                className="text-yellow-400"
              >
                {stageIcons[stageTitle]}
              </Text>
            </View>

            {round && (
                <View className="px-2 py-[6px] flex-row b g-yellow-500/20 bor der bor der-yellow-500/40 rounded-full">
                  <Text
                    style={{ fontSize: width / 45 }}
                    className="text-yellow-400 tracking-widest"
                  >
                    {round.toUpperCase()} {'  '}
                  </Text>
                  <Text
                  style={{ fontSize: width / 45 }}
                  className="text-gray-300 b g-gray-700 tracking-widest"
                >
                    CONTESTANTS {contestants}
                </Text>
                </View>
                
              )}

            {/* Region */}
            <View className="items-center">
              <Text
                style={{ fontSize: width / 18 }}
                className="text-yellow-400"
              >
                {regionFlag}
              </Text>
            </View>
          </View>

          {/* 🎬 CENTER (Pulled Up + Compact) */}
          <View className="items-center mt-2">

            {/* Title */}
            <Text
              style={{ fontSize: width / 30 }}
              numberOfLines={1}
              className="text-white font-extrabold tracking-widest text-center"
            >
              {stageTitle.toUpperCase()}
            </Text>

            {/* Region Name (FIXED) */}
            <Text
              style={{ fontSize: width / 40 }}
              numberOfLines={1}
              className="text-gray-400 tracking-wide mt-[2px]"
            >
              {regionName}
            </Text>

            {/* 🎭 Inline Info Row */}
            <View className="flex-row items-center mt-2 gap-2">

              {/* Contestants */}
              {/* <View className="px-2 py-[2px] border border-white/20 rounded-full">
                <Text
                  style={{ fontSize: width / 45 }}
                  className="text-gray-300 tracking-widest"
                >
                  {contestants} CONTESTANTS
                </Text>
              </View> */}

              {/* Round */}
              {/* {round && (
                <View className="px-2 py-[2px] bg-yellow-500/20 border border-yellow-500/40 rounded-full">
                  <Text
                    style={{ fontSize: width / 45 }}
                    className="text-yellow-400 tracking-widest"
                  >
                    {round.toUpperCase()}
                  </Text>
                </View>
              )} */}

            </View>
          </View>

        </View>
      </View>
    </View>
  );
}