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

const LegacyOverview = () => {
  const { userArenas = [], userTalents = [], scale , spacing } =
    useGlobalContext();

  const { activeSpace } = useProfileSpace();

  const [expanded, setExpanded] = useState(false);

  const stats = useMemo(() => {
    const arenas = Array.isArray(userArenas) ? userArenas : [];

    const performanceIds = new Set();

    arenas.forEach((arena) => {
      const performances = Array.isArray(arena?.performances)
        ? arena.performances
        : Array.isArray(arena?.posts)
        ? arena.posts
        : [];

      performances.forEach((performance) => {
        const id = performance?._id || performance?.id;

        if (id) {
          performanceIds.add(id);
        }
      });
    });

    return {
      arenas: arenas.length,
      stages: Array.isArray(userTalents) ? userTalents.length : 0,
      performances: performanceIds.size,
      spotlights: 7,
    };
  }, [userArenas, userTalents]);

  if (activeSpace !== "legacy") return null;

  const milestones = [
    {
      value: stats.arenas,
      label: "ARENAS CREATED",
      description:
        stats.arenas === 1
          ? "You've established your first arena."
          : `You've established ${stats.arenas} arenas to showcase your talent.`,
    },
    {
      value: stats.stages,
      label: "STAGES JOINED",
      description:
        stats.stages === 1
          ? "You've taken your talent to a competition stage."
          : `You've taken your talent to ${stats.stages} competition stages.`,
    },
    {
      value: stats.performances,
      label: "PERFORMANCES",
      description:
        stats.performances === 1
          ? "You've shared your talent through a performance."
          : `You've shared ${stats.performances} performances across your arenas.`,
    },
    {
      value: stats.spotlights,
      label: "SPOTLIGHTS",
      description:
        stats.spotlights === 1
          ? "One of your performances has reached the spotlight."
          : `${stats.spotlights} of your performances have reached the spotlight.`,
    },
  ];

  const toggleExpanded = () => {
    // LayoutAnimation.configureNext(
    //   LayoutAnimation.Presets.easeInEaseOut
    // );

    setExpanded((prev) => !prev);
  };

  return (
    <View 
    style={{
      paddingTop: spacing(16),
      paddingBottom: spacing(30),
    }}
    className="w-[95%] self-center"
  >
     
      

      {/* SECTION HEADING */}
      <View 
      style = {{
        paddingBottom : spacing(20)
      }}
      className="flex-row justify-center w-full items-center ">
      

        <View
        className = "items-center">
          <Text
            className="font-bold text-[#E8B95A]"
            style={{
              fontSize: scale(9),
              letterSpacing: scale(2.5),
              marginBottom: scale(3),
            }}
          >
            YOUR JOURNEY
          </Text>

          <Text
            className="font-bold text-[#F5F1E8]"
            style={{
              fontSize: scale(16),
              letterSpacing: scale(0.2),
            }}
          >
            Legacy Overview
          </Text>
        </View>
      </View>

      {/* MAIN CARD */}
      <LinearGradient
        colors={["#1C2229", "#0D1115", "#1A2026"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="overflow-hidden  rounded-[18px] border"
        style={{
          borderColor: "rgba(232,185,90,0.22)",
        }} >

        {/* HEADER — ALWAYS VISIBLE */}
        <Pressable
          onPress={toggleExpanded}
          accessibilityRole="button"
          accessibilityLabel={
            expanded
              ? "Collapse legacy milestones"
              : "Explore legacy milestones"
          }
          className="flex-row items-center  active:opacity-80"
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
              backgroundColor: "rgba(232,185,90,0.09)",
              borderColor: "rgba(232,185,90,0.25)",
            }}
          >
            <Text
              className="text-[#E8B95A]"
              style={{
                fontSize: scale(22),
                lineHeight: scale(25),
              }}
            >
              ✦
            </Text>
          </View>

          {/* HEADER TEXT */}
          <View className="flex-1 ">
            <Text
              className="font-bold text-[#F4E9CF]"
              style={{
                fontSize: scale(15),
              }}
            >
              Your milestones
            </Text>

            <Text
              className="text-[#88847C]"
              style={{
                fontSize: scale(11),
                marginTop: scale(3),
              }}
            >
              {expanded
                ? "Explore the achievements shaping your legacy."
                : "Discover the achievements shaping your legacy."}
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
                ? "rgba(232,185,90,0.12)"
                : "rgba(255,255,255,0.035)",
              borderColor: expanded
                ? "rgba(232,185,90,0.28)"
                : "rgba(255,255,255,0.08)",
            }}
          >
            <Ionicons
              name={expanded ? "chevron-up" : "chevron-down"}
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
              EXPLORE MILESTONES
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

        {/* EXPANDED MILESTONES */}
        {expanded && (
          <View
            className="border-t"
            style={{
              borderTopColor: "rgba(232,185,90,0.20)",
              paddingHorizontal: scale(17),
              // height : scale(200)
            }}
          >

            {milestones.map((item, index) => (
              <View key={item.label}>

                {/* MILESTONE ROW */}
                <View
                  className="flex-row items-center"
                  style={{
                    paddingVertical: scale(13),
                  }}
                >

                  {/* NUMBER */}
                  <View
                    className="items-center justify-center rounded-[13px] border"
                    style={{
                      width: scale(48),
                      height: scale(48),
                      marginRight: scale(13),
                      backgroundColor: "rgba(232,185,90,0.07)",
                      borderColor: "rgba(232,185,90,0.18)",
                    }}
                  >
                    <Text
                      className="font-extrabold text-[#E8B95A]"
                      style={{
                        fontSize: scale(19),
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

                </View>

                {/* ROW DIVIDER */}
                {index !== milestones.length - 1 && (
                  <View
                    className="h-px"
                    style={{
                      marginLeft: scale(61),
                      backgroundColor: "rgba(255,255,255,0.055)",
                    }}
                  />
                )}

              </View>
            ))}

            {/* FOOTER */}
            <View
              className="items-center border-t"
              style={{
                borderTopColor: "rgba(232,185,90,0.15)",
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
                YOUR TALENT. YOUR JOURNEY. YOUR LEGACY.
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
                CLOSE MILESTONES
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

export default LegacyOverview;