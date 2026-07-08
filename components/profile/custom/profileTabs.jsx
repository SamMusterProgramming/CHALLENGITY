import React, { useState } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const tabs = [
  {
    key: "arenas",
    label: "Arenas",
    icon: "view-grid-outline",
  },
  {
    key: "stages",
    label: "Stages",
    icon: "account-plus-outline",
  }
  ,
  {
    key: "friends",
    label: "Friends",
    icon: "account-group-outline",
  },
  {
    key: "followers",
    label: "Followers",
    icon: "heart-outline",
  },
 
];

export default function ProfileTabs({selectedTab , setSelectedTab ,setActiveTab}) {
  const { width ,height} = useWindowDimensions();
  const tabWidth = (width - 40) / tabs.length;

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 24,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "rgba(255,255,255,.08)",
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
              className = "flex-row py-3 gap-2"
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={17}
                color={active ? "#eab308" : "rgba(255,255,255,.95)"}
              />

              <Text
                style={{
                //   marginTop: 6,
                  color: active ? "#eab308" : "rgba(255,255,255,.95)",
                  fontSize: width/36,
                  fontWeight: active ? "800" : "800",
                  letterSpacing: .4,
                }}
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