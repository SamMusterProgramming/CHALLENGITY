import React, { useState } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const tabs = [
  {
    key: "arenas",
    label: "Arenas",
    icon: "stadium",
  },
  {
    key: "stages",
    label: "Stages",
    icon: "trophy",
  }
  ,
  {
    key: "people",
    label: "People",
    icon: "account-group-outline",
  },
  // {
  //   key: "followers",
  //   label: "Followers",
  //   icon: "heart-outline",
  // },
 
];

export default function ProfileTabs({selectedTab , setSelectedTab ,setActiveTab}) {
  const { width ,height} = useWindowDimensions();
  const tabWidth = (width - 40) / tabs.length;

  return (
    <View
      style={{
        marginHorizontal: 13,
        marginTop: 32,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        // borderColor: "rgba(255,255,255,.08)",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
        className ="justify-between  items-center"
      >
        {tabs.map((tab) => {
          const active = selectedTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.85}
              onPress={() => 
                        {   
                            setSelectedTab(tab.key)
                            setActiveTab(tab.key)
                        }}
              style={{
                // width: tabWidth,
                alignItems: "center",
                justifyContent: "center",
                // paddingBottom: 14,
              }}
              className = {`flex-row w-[32%] items-center justify-center rounded-full py-3 gap-2
                ${
                  active
                    ? "border-yellow-500/40 bg-yellow-500/[0.12]"
                    : "border-white/[0.27] bg-white/[0.13]"
                } `}
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={15}
                color={active ? "#eab308" : "rgba(255,255,255,.95)"}
                
              />

              <Text
                style={{
                //   marginTop: 6,
                  color: active ? "#eab308" : "rgba(255,255,255,.95)",
                  fontSize: width/34,
                  fontWeight: active ? "700" : "700",
                  letterSpacing: 0.4,
                }}
                className ="font-black mt-1"
              >
                {tab.label}
              </Text>

              {/* Gold Indicator */}
              {/* {active && (
                <View
                    style={{
                        position: "absolute",
                        bottom: -1,
                        // flex:1,
                        // right:0,
                        width: tabWidth /1.3 ,
                        height: 2,
                        borderRadius: 999,
                        backgroundColor: "#eab308",
                        shadowColor: "#eab308",
                        shadowOpacity: .55,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                />
                )} */}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}