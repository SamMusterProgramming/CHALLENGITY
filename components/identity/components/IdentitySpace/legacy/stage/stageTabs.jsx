import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useGlobalContext } from "../../../../../../context/GlobalProvider";
import { useProfileSpace } from "../../../context/ProfileSpaceContext";

const GOLD = "#E8B95A";

export default function StageTabs({
  activeStageTab,
  setActiveStageTab,
  width,
}) {
  const { scale, spacing } = useGlobalContext();
  const { activeSpace } = useProfileSpace();

  const [isOpen, setIsOpen] = useState(false);

  if (activeSpace !== "legacy") return null;

  const tabs = [
    {
      id: "myEntries",
      label: "MY ENTRIES",
      sub: "Your Competitions",
      icon: "grid-outline",
    },
    {
      id: "myFavourites",
      label: "FAVOURITES",
      sub: "Favourite Stages",
      icon: "star-outline",
    },
    {
      id: "myFriends",
      label: "FRIENDS",
      sub: "Friend's Stages",
      icon: "people-outline",
    },
  ];

  const activeTab =
    tabs.find((tab) => tab.id === activeStageTab) ||
    tabs[0];

  const handleSelect = (tab) => {
    setActiveStageTab(tab.id);
    setIsOpen(false);
  };

  const renderSelector = () => {
    return (
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        accessibilityRole="button"
        accessibilityState={{
          expanded: isOpen,
          selected: true,
        }}
        style={{
          width: "100%",
          minHeight: scale(50),
          borderRadius: scale(8),
          overflow: "hidden",
          zIndex: 1002,
        }}
        className="flex-row justify-between items-center"
      >
        <LinearGradient
          colors={
            isOpen
              ? [
                  "rgba(8,9,11,0.96)",
                  "rgba(19,21,25,0.99)",
                  "rgba(29,32,37,0.98)",
                ]
              : [
                "rgba(8,9,11,0.96)",
                "rgba(19,21,25,0.99)",
                "rgba(29,32,37,0.98)",
              ]
          }
          locations={[0, 0.82, 1]}
          style={{
            flex: 1,
            paddingHorizontal: spacing(11),
            paddingVertical: spacing(8),
            borderRadius: scale(8),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ICON */}
          <View
            style={{
              width: scale(28),
              height: scale(28),
              borderRadius: scale(7),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name={activeTab.icon}
              size={scale(22)}
              color="#FFF"
            />
          </View>

          {/* TITLE + DESCRIPTION */}
          <View
            style={{
              marginLeft: spacing(9),
            }}
            className = "justify-center items-center"
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: scale(11),
                fontWeight: "800",
                letterSpacing: scale(0.45),
                // color: "#FFF",
              }}
              className = " text-[#eaddcc]"
            >
              {activeTab.label}
            </Text>

            {/* <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                marginTop: spacing(4),
                fontSize: scale(9),
                fontWeight: "600",
                letterSpacing: scale(0.2),
                color: "#C0C0C0",
              }}
            >
              {activeTab.sub}
            </Text> */}
          </View>

          {/* CHEVRON */}
          <View
            style={{
              width: scale(22),
              height: scale(22),
              alignItems: "center",
              justifyContent: "center",
              marginLeft: spacing(4),
            }}
          >
            <Ionicons
              name={
                isOpen
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={scale(22)}
              color={
                isOpen
                  ? GOLD
                  : "rgba(255,255,255,0.48)"
              }
            />
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  const renderDropdown = () => {
    if (!isOpen) return null;

    return (
      <View
        style={{
          position: "absolute",
          top:
            spacing(8) +
            scale(50) +
            spacing(6),
          width: "100%",
          padding: scale(10),
          gap: scale(8),
          borderRadius: scale(9),

          // MATCHING GRAPHITE DROPDOWN SURFACE
          backgroundColor: "rgba(16,18,22,0.99)",
          borderWidth: scale(1),
          borderColor: "rgba(255,255,255,0.10)",

          zIndex: 1001,
          elevation: 1001,

          shadowColor: "#000",
          shadowOpacity: 0.55,
          shadowRadius: scale(11),
          shadowOffset: {
            width: 0,
            height: scale(5),
          },
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            tab.id === activeStageTab;

          return (
            <Pressable
              key={tab.id}
              onPress={() => handleSelect(tab)}
              accessibilityRole="button"
              accessibilityState={{
                selected: isActive,
              }}
              style={{
                minHeight: scale(40),
                borderRadius: scale(6),
                overflow: "hidden",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <LinearGradient
                colors={
                  isActive
                    ? [
                        "rgba(38,42,49,0.99)",
                        "rgba(24,27,33,0.99)",
                        "rgba(32,36,43,0.99)",
                      ]
                    : [
                        "rgba(25,28,33,0.98)",
                        "rgba(16,18,22,0.99)",
                        "rgba(25,30,35,0.98)",
                      ]
                }
                locations={[0, 0.42, 1]}
                style={{
                  flex: 1,
                  minHeight: scale(50),
                  paddingHorizontal: spacing(8),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: scale(6),

                  borderWidth: scale(0.5),
                  borderColor: isActive
                    ? "rgba(232,185,90,0.24)"
                    : "rgba(255,255,255,0.07)",
                }}
              >
                {/* OPTION ICON */}
                <View
                  style={{
                    width: scale(25),
                    height: scale(25),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: scale(6),

                    backgroundColor: isActive
                      ? "rgba(232,185,90,0.10)"
                      : "rgba(255,255,255,0.025)",

                    borderWidth: scale(0.5),
                    borderColor: isActive
                      ? "rgba(232,185,90,0.18)"
                      : "rgba(255,255,255,0.05)",
                  }}
                >
                  <Ionicons
                    name={tab.icon}
                    size={scale(22)}
                    color={
                      isActive
                        ? GOLD
                        : "rgba(255,255,255,0.48)"
                    }
                  />
                </View>

                {/* OPTION TEXT */}
                <View
                  style={{
                    flex: 1,
                    marginLeft: spacing(8),
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: scale(11),
                      fontWeight: "800",
                      letterSpacing: scale(0.35),
                      color: isActive
                        ? "#F2D88F"
                        : "rgba(255,255,255,0.76)",
                    }}
                  >
                    {tab.label}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: spacing(4),
                      fontSize: scale(9),
                      fontWeight: "600",
                      letterSpacing: scale(0.15),
                      color: isActive
                        ? "rgba(255,255,255,0.55)"
                        : "rgba(255,255,255,0.40)",
                    }}
                  >
                    {tab.sub}
                  </Text>
                </View>

                {/* ACTIVE INDICATOR */}
                {isActive && (
                  <View
                    style={{
                      width: scale(5),
                      height: scale(5),
                      borderRadius: scale(3),
                      backgroundColor: GOLD,
                      shadowColor: GOLD,
                      shadowOpacity: 0.7,
                      shadowRadius: scale(4),
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                    }}
                  />
                )}
              </LinearGradient>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={{
        width,
        alignItems: "center",
        paddingTop: spacing(4),
        position: "relative",
        zIndex: 1000,
        elevation: 1000,
      }}
    >
      {renderSelector()}
      {renderDropdown()}
    </View>
  );
}