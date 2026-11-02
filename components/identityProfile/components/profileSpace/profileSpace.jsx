import React, {
    useMemo,
  } from "react";
  
  import {
    View,
    Text,
    Pressable,
  } from "react-native";
  

  

import LegacyIcon from "../../../svgIcons/others/legacyIcon";
import CircleIcon from "../../../svgIcons/others/circleIcon";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { useProfileSpace } from "../context/ProfileSpaceContext";

export default function ProfileSpace({
  }) {
    const {
      scale,
      spacing,
    } = useGlobalContext();

    const {
      activeSpace,
      changeSpace,
    } = useProfileSpace();
  
    const spaces = useMemo(
      () => [
        {
          id: "legacy",
          title: "LEGACY",
          description: "ARENAS · STAGES · SPOTLIGHTS",
          icon: LegacyIcon,
        },
        {
          id: "circle",
          title: "CIRCLE",
          description: "FRIENDS · FOLLOWERS · FOLLOWING",
          icon: CircleIcon,
        },
      ],
      []
    );
  
    return (
      <View
        className="w-[95%] self-center"
        style={{
          // paddingHorizontal: spacing(18),
          paddingTop: spacing(16),
          paddingBottom: spacing(22),
        }}
      >
  
        {/* ================================================== */}
        {/* SPACES                                            */}
        {/* ================================================== */}
  
        <View
          className="flex-row"
          style={{
            gap: spacing(10),
          }}
        >
          {spaces.map((space) => {
            const Icon = space.icon;
            const isActive =
              activeSpace === space.id;
  
            return (
              <Pressable
                key={space.id}
                onPress={() =>
                  changeSpace(space.id)
                }
                className="flex-1   overflow-hidden"
                style={{
                  minHeight: spacing(112),
                  // padding : spacing (22),
                  borderRadius: scale(15),
                  borderWidth: scale(1),
                  borderColor: isActive
                    ? "rgba(232,185,90,0.68)"
                    : "rgba(255,255,255,0.40)",
                  backgroundColor:
                    isActive
                      ? "rgba(0,0,0.1)"//"rgba(232,185,90,0.045)"
                      : "rgba(0,0,0.1)",
  
                  paddingHorizontal: spacing(20),
                  paddingVertical: spacing(20),
                }}
              >
  
                {/* ======================================== */}
                {/* ICON + TITLE                              */}
                {/* ======================================== */}
  
                <View
                  className="flex-col gap-2 items-center justify-center"
                  style={{
                    minHeight: spacing(34),
                  }}
                >
                  <Icon
                    size={scale(30)}
                  />
  
                  <Text
                    style={{
                      marginLeft: spacing(7),
                      color: isActive
                        ? "#F4C542"
                        : "rgba(255,255,255,0.88)",
                      fontSize: scale(13),
                      lineHeight: spacing(17),
                      fontWeight: "800",
                      letterSpacing: scale(1.5),
                    }}
                  >
                    {space.title}
                  </Text>
                </View>
  
                {/* ======================================== */}
                {/* DESCRIPTION                               */}
                {/* ======================================== */}
  
                <Text
                  numberOfLines={2}
                  className="text-center"
                  style={{
                    marginTop: spacing(6),
                    color: isActive
                      ? "rgba(232,185,90,0.62)"
                      : "rgba(255,255,255,0.38)",
                    fontSize: scale(7.5),
                    lineHeight: spacing(15),
                    fontWeight: "600",
                    letterSpacing: scale(0.25),
                  }}  >
                  {space.description}
                </Text>
  
        
              </Pressable>
            );
          })}
        </View>
  
      </View>
    );
  }