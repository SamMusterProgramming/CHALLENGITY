
import React, {
  useMemo,
} from "react";

import {
  View,
  Text,
  Pressable,
} from "react-native";

import {
  useGlobalContext,
} from "../../../../context/GlobalProvider";

import ArenaPortalIcon
  from "../../../svgIcons/ArenaPortalIcon";
import { ProfileIcon } from "../../../svgIcons/profileIcon";
import { useProfileSpace } from "../context/ProfileSpaceContext";
import LegacyIcon from "../../../svgIcons/others/legacyIcon";
import CircleIcon from "../../../svgIcons/others/circleIcon";

export default function IdentitySpace({}) {
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
      className="w-[100%] self-center"
      style={{
        // paddingHorizontal: spacing(18),
        paddingTop: spacing(16),
        // paddingBottom: spacing(22),
      }}
    >

      <View
        className="flex-row"
        style={{
          gap: spacing(10),
        }}
      >
        {[...spaces]
          .sort(
            (a, b) =>
              Number(b.id === activeSpace) -
              Number(a.id === activeSpace)
          )
          .map((space) => {
            const Icon = space.icon;
            const isActive =
              activeSpace === space.id;

            return (
              <Pressable
                key={space.id}
                onPress={() =>
                  changeSpace(space.id)
                }
                className={`fle x-1 z-40 overfl ow-hidden justify-center items-center ${
                  isActive
                    ? "border-x-[rgba(232,185,90,0.38)] w-[60%] border-t-[rgba(232,185,90,0.38)] border-[1px] rounded-t-3xl"
                    : "border-[rgba(255,255,255,0.40)] flex-1 border-[1px] rounded-3xl "
                }`}
                style={{
                  height: isActive
                    ? spacing(142)
                    : spacing(130),

                  backgroundColor:
                    isActive
                      ? "rgba(0,0,0.1)"
                      : "rgba(0,0,0.1)",

                  paddingHorizontal: spacing(10),
                  paddingVertical: spacing(18),
                }}
              >
                {/* ICON + TITLE */}

                <View
                  className="flex-col gap-4 items-center justify-center"
                  style={{
                    minHeight: spacing(34),
                  }}
                >
                  <Icon
                    size={
                      isActive
                        ? scale(40)
                        : scale(30)
                    }
                  />

                  <Text
                    style={{
                      marginLeft: spacing(7),
                      color: isActive
                        ? "#F4C542"
                        : "rgba(255,255,255,0.88)",
                      fontSize: isActive
                        ? scale(16)
                        : scale(13),
                      lineHeight: spacing(17),
                      fontWeight: "800",
                      letterSpacing: scale(1.5),
                    }}
                  >
                    {space.title}
                  </Text>
                </View>

                {/* DESCRIPTION */}

                <Text
                  numberOfLines={2}
                  className="text-center"
                  style={{
                    marginTop: isActive ? scale(16) : spacing(6),
                    color: isActive
                      ? "rgba(232,185,90,0.62)"
                      : "rgba(255,255,255,0.38)",
                    fontSize: isActive
                      ? scale(10)
                      : scale(8),
                    lineHeight: spacing(15),
                    fontWeight: "600",
                    letterSpacing: scale(0.25),
                  }}
                >
                  {space.description}
                </Text>
              </Pressable>
            );
          })}
      </View>
    </View>
  );
}
