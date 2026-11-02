import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../../../context/GlobalProvider";
import { useProfileSpace } from "../../context/ProfileSpaceContext";

const GOLD = "#E8B95A";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CircleOverview = () => {
  const {
    userFriends = [],
    userFollowers = [],
    userFollowing = [],
    scale,
    spacing,
  } = useGlobalContext();

  const { activeSpace } = useProfileSpace();

  const [expanded, setExpanded] = useState(false);

  /*
   * ---------------------------------------------------------
   * CIRCLE STATS
   * ---------------------------------------------------------
   */

  const stats = useMemo(() => {
    const friends = Array.isArray(userFriends)
      ? userFriends
      : [];

    const followers = Array.isArray(userFollowers)
      ? userFollowers
      : [];

    const following = Array.isArray(userFollowing)
      ? userFollowing
      : [];

    return {
      friends: friends.length,
      followers: followers.length,
      following: following.length,
    };
  }, [
    userFriends,
    userFollowers,
    userFollowing,
  ]);

  if (activeSpace !== "circle") {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * NETWORK ITEMS
   * ---------------------------------------------------------
   */

  const connections = [
    {
      value: stats.friends,
      label: "FRIENDS",
      description:
        stats.friends === 0
          ? "Your circle is waiting to grow."
          : stats.friends === 1
          ? "One connection is part of your circle."
          : `${stats.friends} people are part of your circle.`,
      icon: "people-outline",
    },

    {
      value: stats.followers,
      label: "FOLLOWERS",
      description:
        stats.followers === 0
          ? "No followers have joined your circle yet."
          : stats.followers === 1
          ? "One person is following your journey."
          : `${stats.followers} people are following your journey.`,
      icon: "radio-outline",
    },

    {
      value: stats.following,
      label: "FOLLOWING",
      description:
        stats.following === 0
          ? "You're not following anyone yet."
          : stats.following === 1
          ? "You're following one person."
          : `You're connected to ${stats.following} people through following.`,
      icon: "person-add-outline",
    },
  ];

  /*
   * ---------------------------------------------------------
   * TOGGLE
   * ---------------------------------------------------------
   */

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setExpanded((prev) => !prev);
  };

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  return (
    <View
      style={{
        marginVertical : spacing(12),
        paddingHorizontal: spacing(18),
        paddingTop: spacing(4),
        paddingBottom: spacing(18),
      }}
      className="px-5 pt-6 pb-3"
    >
      {/* SECTION HEADING */}

      <View className="flex-row items-center mb-4">
        <View>
          <Text
            className="font-bold text-[#E8B95A]"
            style={{
              fontSize: scale(9),
              letterSpacing: scale(2.5),
              marginBottom: scale(3),
            }}
          >
            YOUR CIRCLE
          </Text>

          <Text
            className="font-bold text-[#F5F1E8]"
            style={{
              fontSize: scale(16),
              letterSpacing: scale(0.2),
            }}
          >
            Network Overview
          </Text>
        </View>
      </View>

      {/* MAIN CARD */}

      <LinearGradient
        colors={[
          "#202126",
          "#111216",
          "#202126",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="overflow-hidden rounded-[18px] border"
        style={{
          borderColor:
            "rgba(120,145,170,0.16)",
        }}
      >
        {/* HEADER */}

        <Pressable
          onPress={toggleExpanded}
          accessibilityRole="button"
          accessibilityLabel={
            expanded
              ? "Collapse circle overview"
              : "Explore circle overview"
          }
          className="flex-row items-center active:opacity-80"
          style={{
            padding: scale(17),
          }}
        >
          {/* ICON */}

          <View
            className="items-center justify-center rounded-xl border"
            style={{
              width: scale(40),
              height: scale(40),
              marginRight: scale(12),

              backgroundColor:
                "rgba(232,185,90,0.075)",

              borderColor:
                "rgba(232,185,90,0.20)",
            }}
          >
            <Ionicons
              name="people-outline"
              size={scale(21)}
              color={GOLD}
            />
          </View>

          {/* HEADER TEXT */}

          <View className="flex-1">
            <Text
              className="font-bold text-[#F4E9CF]"
              style={{
                fontSize: scale(15),
              }}
            >
              Your connections
            </Text>

            <Text
              className="text-[#888A91]"
              style={{
                fontSize: scale(11),
                marginTop: scale(3),
              }}
            >
              {expanded
                ? "Explore the people around your circle."
                : "Discover the people around your circle."}
            </Text>
          </View>

          {/* CHEVRON */}

          <View
            className="items-center justify-center rounded-full border"
            style={{
              width: scale(32),
              height: scale(32),
              marginLeft: scale(10),

              backgroundColor: expanded
                ? "rgba(232,185,90,0.11)"
                : "rgba(255,255,255,0.035)",

              borderColor: expanded
                ? "rgba(232,185,90,0.25)"
                : "rgba(255,255,255,0.08)",
            }}
          >
            <Ionicons
              name={
                expanded
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={scale(17)}
              color={GOLD}
            />
          </View>
        </Pressable>

        {/* COLLAPSED ACTION */}

        {!expanded && (
          <Pressable
            onPress={toggleExpanded}
            className="flex-row items-center justify-center border-t border-white/[0.04] active:opacity-70"
            style={{
              paddingVertical: scale(11),
              paddingHorizontal: scale(17),
            }}
          >
            <Text
              className="font-bold uppercase text-[#8C7954]"
              style={{
                fontSize: scale(8),
                letterSpacing: scale(1.8),
              }}
            >
              EXPLORE YOUR CIRCLE
            </Text>

            <Ionicons
              name="arrow-down"
              size={scale(12)}
              color="#8C7954"
              style={{
                marginLeft: scale(6),
              }}
            />
          </Pressable>
        )}

        {/* EXPANDED CONNECTIONS */}

        {expanded && (
          <View
            className="border-t"
            style={{
              borderTopColor:
                "rgba(232,185,90,0.16)",

              paddingHorizontal: scale(17),
            }}
          >
            {connections.map(
              (item, index) => (
                <View key={item.label}>
                  {/* CONNECTION ROW */}

                  <View
                    className="flex-row items-center"
                    style={{
                      paddingVertical: scale(13),
                    }}
                  >
                    {/* ICON / NUMBER */}

                    <View
                      className="items-center justify-center rounded-[13px] border"
                      style={{
                        width: scale(48),
                        height: scale(48),
                        marginRight: scale(13),

                        backgroundColor:
                          "rgba(232,185,90,0.055)",

                        borderColor:
                          "rgba(232,185,90,0.16)",
                      }}
                    >
                      <Ionicons
                        name={item.icon}
                        size={scale(18)}
                        color={
                          item.value > 0
                            ? GOLD
                            : "rgba(232,185,90,0.42)"
                        }
                        style={{
                          marginBottom:
                            scale(2),
                        }}
                      />

                      <Text
                        className="font-extrabold text-[#E8B95A]"
                        style={{
                          fontSize: scale(11),
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>

                    {/* CONTENT */}

                    <View className="flex-1">
                      <Text
                        className="font-extrabold text-[#DCCBA6]"
                        style={{
                          fontSize: scale(9),
                          letterSpacing: scale(1.1),
                          marginBottom: scale(5),
                        }}
                      >
                        {item.label}
                      </Text>

                      <Text
                        className="text-[#AAA69E]"
                        style={{
                          fontSize: scale(11),
                          lineHeight: scale(16),
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>

                    {/* ARROW */}

                    <View
                      className="items-center justify-center rounded-full"
                      style={{
                        width: scale(25),
                        height: scale(25),
                        marginLeft: scale(8),
                        backgroundColor:
                          "rgba(255,255,255,0.035)",
                      }}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={scale(13)}
                        color="rgba(205,195,175,0.48)"
                      />
                    </View>
                  </View>

                  {/* DIVIDER */}

                  {index !==
                    connections.length - 1 && (
                    <View
                      className="h-px"
                      style={{
                        marginLeft: scale(61),
                        backgroundColor:
                          "rgba(255,255,255,0.055)",
                      }}
                    />
                  )}
                </View>
              )
            )}

            {/* FOOTER */}

            <View
              className="items-center border-t"
              style={{
                borderTopColor:
                  "rgba(232,185,90,0.13)",

                paddingTop: scale(13),
                marginTop: scale(3),
                paddingBottom: scale(13),
              }}
            >
              <Text
                className="font-bold text-center text-[#8C7954]"
                style={{
                  fontSize: scale(8),
                  letterSpacing: scale(1.8),
                }}
              >
                YOUR PEOPLE. YOUR CIRCLE. YOUR CONNECTIONS.
              </Text>
            </View>

            {/* CLOSE */}

            <Pressable
              onPress={toggleExpanded}
              className="flex-row items-center justify-center border-t border-white/[0.04] active:opacity-70"
              style={{
                marginHorizontal: scale(-17),
                paddingVertical: scale(11),
              }}
            >
              <Text
                className="font-bold uppercase text-[#8C7954]"
                style={{
                  fontSize: scale(8),
                  letterSpacing: scale(1.8),
                }}
              >
                CLOSE CIRCLE
              </Text>

              <Ionicons
                name="chevron-up"
                size={scale(12)}
                color="#8C7954"
                style={{
                  marginLeft: scale(6),
                }}
              />
            </Pressable>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default CircleOverview;