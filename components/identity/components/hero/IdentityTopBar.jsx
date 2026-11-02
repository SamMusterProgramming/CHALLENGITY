import React from "react";

import {
  View,
  Animated,
  TouchableOpacity,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  useGlobalContext,
} from "../../../../context/GlobalProvider";

export default function IdentityTopBar({
  user,
  scrollY,
  topInset,
  onClose,
  onPress
}) {
  const {
    scale,
    spacing,
  } = useGlobalContext();

  // ============================================================
  // BUTTON OPACITY
  // ============================================================

  const buttonOpacity = scrollY.interpolate({
    inputRange: [
      0,
      spacing(60),
      spacing(150),
    ],
    outputRange: [
      0.95,
      0.95,
      1,
    ],
    extrapolate: "clamp",
  });

  // ============================================================
  // TITLE
  // ============================================================

  const titleOpacity = scrollY.interpolate({
    inputRange: [
      0,
      spacing(100),
      spacing(180),
    ],
    outputRange: [
      0,
      0,
      1,
    ],
    extrapolate: "clamp",
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [
      0,
      spacing(140),
    ],
    outputRange: [
      -spacing(6),
      0,
    ],
    extrapolate: "clamp",
  });

  // ============================================================
  // BACKGROUND OPACITY
  // ============================================================
  //
  // IMPORTANT:
  // We animate opacity, NOT backgroundColor.
  // backgroundColor cannot use the native driver.
  //

  const backgroundOpacity = scrollY.interpolate({
    inputRange: [
      0,
      spacing(80),
      spacing(180),
    ],
    outputRange: [
      0,
      0.72,
      0.96,
    ],
    extrapolate: "clamp",
  });

  return (
    <View
      className="absolute left-0 right-0 top-0 z-50"
      style={{
        height: topInset + spacing(56),
      }}
      pointerEvents="box-none"
    >

      {/* ====================================================== */}
      {/* DARK NAVIGATION BACKGROUND                             */}
      {/* ====================================================== */}

      <Animated.View
        className="absolute left-0 right-0 top-0 bottom-0 bg-[#08090B]"
        style={{
          opacity: backgroundOpacity,
        }}
        pointerEvents="none"
      />

      {/* ====================================================== */}
      {/* NAVIGATION                                             */}
      {/* ====================================================== */}

      <View
        className="flex-1 flex-row items-center justify-between"
        style={{
          paddingTop: topInset,
          paddingHorizontal: spacing(14),
        }}
        pointerEvents="box-none"
      >

        {/* ==================================================== */}
        {/* BACK                                                 */}
        {/* ==================================================== */}

        <Animated.View
          style={{
            opacity: buttonOpacity,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            className="items-center justify-center rounded-full b g-black/35"
            style={{
              width: scale(40),
              height: scale(40),
            }}
          >
          
          </TouchableOpacity>
        </Animated.View>

        {/* ==================================================== */}
        {/* TITLE                                                */}
        {/* ==================================================== */}

        <Animated.Text
          numberOfLines={1}
          className="absolute left-0 right-0 text-center text-[#F4C542]"
          style={{
            opacity: titleOpacity,
            transform: [
              {
                translateY: titleTranslateY,
              },
            ],
            fontSize: scale(15),
            fontWeight: "800",
            letterSpacing: scale(1),
            top: topInset + spacing(18),
          }}
          pointerEvents="none"
        >
          {user?.name?.toUpperCase() || "PROFILE"}
        </Animated.Text>

        {/* ==================================================== */}
        {/* SETTINGS                                             */}
        {/* ==================================================== */}

        <Animated.View
          style={{
            opacity: buttonOpacity,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress()}
            className="items-center justify-center "
            style={{
              width: scale(40),
              height: scale(40),
            }}
          >
            <MaterialCommunityIcons
              name="cog-outline"
              size={scale(31)}
              color="#F4C542"
            />
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
}