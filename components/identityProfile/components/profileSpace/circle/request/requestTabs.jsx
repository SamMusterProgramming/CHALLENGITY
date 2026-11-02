import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../../../../context/GlobalProvider";
import { useProfileSpace } from "../../../context/ProfileSpaceContext";

const GOLD = "#E8B95A";

export default function RequestsTabs({
  activeFriendTab,
  setActiveFriendTab,
  width,
}) {
  const { scale, spacing } = useGlobalContext();
  const { activeSpace } = useProfileSpace();

  const [isOpen, setIsOpen] = useState(false);

  if (activeSpace !== "circle") return null;

  const tabs = [
    {
      id: "myFriendQuests",
      label: "RECEIVED REQUESTS",
      sub: "requests received",
      icon: "grid-outline",
    },
    {
      id: "myRequests",
      label: "MY REQUESTS",
      sub: "requests sents",
      icon: "star-outline",
    },
  ];

  const activeTab =
    tabs.find((tab) => tab.id === activeFriendTab) ||
    tabs[0];

  const handleSelect = (tab) => {
    setActiveFriendTab(tab.id);
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
          backgroundColor: "rgba(25,29,34,0.97)",
          borderWidth: scale(1),
          borderColor: isOpen
            ? "rgba(232,185,90,0.30)"
            : "rgba(145,160,175,0.12)",
          shadowColor: isOpen
            ? GOLD
            : "#000",
          shadowOpacity: isOpen
            ? 0.14
            : 0.20,
          shadowRadius: isOpen
            ? scale(8)
            : scale(5),
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
            backgroundColor: isOpen
              ? "rgba(232,185,90,0.09)"
              : "rgba(115,135,155,0.07)",
          }} >
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
              color: "rgba(190,201,213,0.54)",
            }}  >
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
            name={
              isOpen
                ? "chevron-up"
                : "chevron-down"
            }
            size={scale(22)}
            color={
              isOpen
                ? GOLD
                : "rgba(180,195,210,0.42)"
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
          padding: scale(10),
          gap : scale(8),
          borderRadius: scale(9),
          backgroundColor: "rgba(13,17,21,0.99)",
          borderWidth: scale(1),
          borderColor: "rgba(145,160,175,0.13)",
          zIndex: 1001,
          elevation: 1001,
          shadowColor: "#000",
          shadowOpacity: 0.50,
          shadowRadius: scale(10),
          shadowOffset: {
            width: 0,
            height: scale(5),
          },
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            tab.id === activeFriendTab;

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
                  ? "rgba(232,185,90,0.09)"
                  : "rgba(255,255,255,0.015)",
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
                    : "rgba(110,130,150,0.055)",
                }}
              >
                <Ionicons
                  name={tab.icon}
                  size={scale(17)}
                  color={
                    isActive
                      ? GOLD
                      : "rgba(170,185,200,0.46)"
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
                      : "rgba(205,215,225,0.70)",
                  }}
                >
                  {tab.label}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: spacing(1),
                    fontSize: scale(7.5),
                    fontWeight: "600",
                    letterSpacing: scale(0.15),
                    color: isActive
                      ? "rgba(190,201,213,0.54)"
                      : "rgba(155,170,185,0.38)",
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
        position: "relative",
        zIndex: 1000,
        elevation: 1000,
      }}  >
      {renderSelector()}
      {renderDropdown()}
    </View>
  );
}