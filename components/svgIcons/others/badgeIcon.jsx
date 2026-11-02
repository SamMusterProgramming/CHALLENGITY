import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const BadgeIcon = ({
  size = 28,
  color = GOLD,
  strokeWidth = 3.2,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="14 11 72 67"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient
          id="victoryMetal"
          x1="20"
          y1="15"
          x2="80"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={color} stopOpacity={0.7} />
          <Stop offset="0.3" stopColor={color} />
          <Stop offset="0.55" stopColor={color} stopOpacity={0.95} />
          <Stop offset="0.8" stopColor={color} stopOpacity={0.72} />
          <Stop offset="1" stopColor={color} />
        </LinearGradient>
      </Defs>

      {/* Outer portal with visible top gap */}
      <Path
        d="M19 66 V39 C19 26.8 28.8 17.5 41 17.5"
        stroke="url(#victoryMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M59 17.5 C71.2 17.5 81 26.8 81 39 V66"
        stroke="url(#victoryMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner portal details */}
      <Path
        d="M27.5 63 V43 C27.5 34.9 33.7 28.5 41.5 28.5"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
        opacity={0.24}
      />
      <Path
        d="M72.5 63 V43 C72.5 34.9 66.3 28.5 58.5 28.5"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
        opacity={0.24}
      />

      {/* Trophy cup */}
      <Path
        d="M39 32 H61 V41 C61 49 56.5 54 50 54 C43.5 54 39 49 39 41 Z"
        fill="url(#victoryMetal)"
        fillOpacity={0.2}
        stroke="url(#victoryMetal)"
        strokeWidth={2.8}
        strokeLinejoin="round"
      />

      {/* Trophy rim */}
      <Path
        d="M39 34 H61"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* Trophy handles */}
      <Path
        d="M39 36 H34 C31 36 30 38 30 41 C30 46 34 49 42 49"
        stroke="url(#victoryMetal)"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M61 36 H66 C69 36 70 38 70 41 C70 46 66 49 58 49"
        stroke="url(#victoryMetal)"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Trophy star */}
      <Path
        d="M50 36 L52 40.3 L56.7 41 L53.3 44.3 L54.1 49 L50 46.8 L45.9 49 L46.7 44.3 L43.3 41 L48 40.3 Z"
        fill="url(#victoryMetal)"
      />

      {/* Stem */}
      <Path
        d="M50 54 V60"
        stroke="url(#victoryMetal)"
        strokeWidth={3.2}
        strokeLinecap="round"
      />

      {/* Trophy base */}
      <Path
        d="M43 61 H57"
        stroke="url(#victoryMetal)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M40 65 H60"
        stroke="url(#victoryMetal)"
        strokeWidth={3.2}
        strokeLinecap="round"
      />

      {/* Small victory sparkles */}
      <Path
        d="M33 28 V32 M31 30 H35 M67 27 V31 M65 29 H69"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />

      {/* Portal base */}
      <Path
        d="M17 73 C27 69.2 38.3 68 50 68 C61.7 68 73 69.2 83 73"
        stroke="url(#victoryMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M25 72.6 C33.3 70.1 41.6 69.2 50 69.2 C58.4 69.2 66.7 70.1 75 72.6"
        stroke={color}
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.42}
      />
    </Svg>
  );
};

export default BadgeIcon;