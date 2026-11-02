
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, {
  Path,
  Circle,
  G,
  Line,
} from "react-native-svg";

const GOLD = "rgb(212,175,30)";


// ─────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────

export const SearchIcon = ({ size = 34, color = GOLD }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <Circle
        cx="17"
        cy="17"
        r="11.5"
        stroke={color}
        strokeWidth="2.2"
      />

      <Path
        d="M25.5 25.5L34 34"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </Svg>
  );
};


// ─────────────────────────────────────────────
// FOLLOWING — two thin outlined people
// ─────────────────────────────────────────────

const FollowingIcon = ({ size = 38, color = GOLD }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 46 40"
      fill="none"
    >
      {/* Main person's head */}
      <Circle
        cx="18"
        cy="10"
        r="5.2"
        stroke={color}
        strokeWidth="2"
      />

      {/* Main person's shoulders/body */}
      <Path
        d="
          M7 31
          C7.7 24.7 12.2 21 18 21
          C23.8 21 28.3 24.7 29 31
        "
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Smaller person's head */}
      <Circle
        cx="32.5"
        cy="11.5"
        r="4.1"
        stroke={color}
        strokeWidth="1.8"
      />

      {/* Smaller person's body */}
      <Path
        d="
          M29 23
          C30.4 21.8 32.2 21.1 34.2 21.1
          C39 21.1 42 24.1 42.7 28.6
        "
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
};