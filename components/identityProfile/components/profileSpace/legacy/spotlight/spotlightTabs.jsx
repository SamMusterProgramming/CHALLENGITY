import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../../../../context/GlobalProvider";
import { useProfileSpace } from "../../../context/ProfileSpaceContext";

const GOLD = "#E8B95A";

export default function SpotlightTabs({
  activeSpotlightTab,
  setActiveSpotlightTab,
  width,
}) {
  const { scale, spacing } = useGlobalContext();
  const { activeSpace } = useProfileSpace();

  const [isOpen, setIsOpen] = useState(false);

  if (activeSpace !== "legacy") return null;

  const tabs = [
    {
      id: "mySpotlights",
      label: "MY SPOTLIGHTS",
      sub: "Your Space",
      icon: "grid-outline",
    },
    {
      id: "myFollowings",
      label: "MY RECORDS",
      sub: "Spotlight saved",
      icon: "star-outline",
    },
    {
      id: "myFriends",
      label: "MY FRIENDS",
      sub: "friend's spotlights",
      icon: "people-outline",
    },
  ];

  const activeTab =
    tabs.find((tab) => tab.id === activeSpotlightTab) || tabs[0];

  /*
   * IMPORTANT:
   * Keep the original parent setter behavior.
   * Do not maintain a second copy of the active tab locally.
   */
  const handleSelect = (tab) => {
    if (tab.id === activeSpotlightTab) {
      setIsOpen(false);
      return;
    }

    // Update the parent exactly like the original tabs did.
    setActiveSpotlightTab(tab.id);

    // Close the dropdown after selection.
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
          width: "80%",
          minHeight: scale(48),
          paddingHorizontal: spacing(11),
          paddingVertical: spacing(8),
          borderRadius: scale(8),
          backgroundColor: "rgba(38,35,31,0.96)",
          borderWidth: scale(1),
          borderColor: isOpen
            ? "rgba(232,185,90,0.32)"
            : "rgba(232,185,90,0.12)",
          shadowColor: GOLD,
          shadowOpacity: isOpen ? 0.14 : 0.06,
          shadowRadius: isOpen ? scale(8) : scale(4),
          shadowOffset: {
            width: 0,
            height: scale(2),
          },
          elevation: isOpen ? 4 : 2,
          zIndex: 1002,
        }}
        className="flex-row flex-1 justify-between items-center"
      >
        {/* ICON */}
        <View
          style={{
            width: scale(28),
            height: scale(28),
            borderRadius: scale(7),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(232,185,90,0.08)",
          }}
        >
          <Ionicons
            name={activeTab.icon}
            size={scale(22)}
            color={GOLD}
          />
        </View>

        {/* TITLE + DESCRIPTION */}
        <View
          style={{
            // flex: 1,
            marginLeft: spacing(9),
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: scale(10),
              fontWeight: "800",
              letterSpacing: scale(0.45),
              color: "#F2D88F",
            }}
          >
            {activeTab.label}
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              marginTop: spacing(2),
              fontSize: scale(8),
              fontWeight: "600",
              letterSpacing: scale(0.2),
              color: "rgba(255,255,255,0.52)",
            }}
          >
            {activeTab.sub}
          </Text>
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
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={scale(22)}
            color={
              isOpen
                ? GOLD
                : "rgba(255,255,255,0.42)"
            }
          />
        </View>
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
            scale(48) +
            spacing(6),
          width: "80%",
          padding: scale(4),
          borderRadius: scale(9),
          backgroundColor: "rgba(17,16,15,0.98)",
          borderWidth: scale(1),
          borderColor: "rgba(232,185,90,0.14)",
          /*
           * Keep dropdown above the content below.
           */
          zIndex: 1001,
          elevation: 1001,
          shadowColor: "#000",
          shadowOpacity: 0.45,
          shadowRadius: scale(10),
          shadowOffset: {
            width: 0,
            height: scale(5),
          },
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            tab.id === activeSpotlightTab;

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
                paddingHorizontal: spacing(8),
                borderRadius: scale(6),
                backgroundColor: isActive
                  ? "rgba(232,185,90,0.10)"
                  : "transparent",
                flexDirection: "row",
                alignItems: "center",
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
                    ? "rgba(232,185,90,0.08)"
                    : "rgba(255,255,255,0.025)",
                }}
              >
                <Ionicons
                  name={tab.icon}
                  size={scale(17)}
                  color={
                    isActive
                      ? GOLD
                      : "rgba(255,255,255,0.45)"
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
                    fontSize: scale(9),
                    fontWeight: "800",
                    letterSpacing: scale(0.35),

                    color: isActive
                      ? "#F2D88F"
                      : "rgba(255,255,255,0.70)",
                  }}
                >
                  {tab.label}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: spacing(1),
                    fontSize: scale(8),
                    fontWeight: "600",
                    letterSpacing: scale(0.15),

                    color: isActive
                      ? "rgba(255,255,255,0.54)"
                      : "rgba(255,255,255,0.36)",
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

        /*
         * Establish stacking context for the dropdown.
         */
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