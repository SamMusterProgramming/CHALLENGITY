import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const LegacyIcon = ({
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
          id="legacyMetal"
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
        stroke="url(#legacyMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M59 17.5 C71.2 17.5 81 26.8 81 39 V66"
        stroke="url(#legacyMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner portal */}
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

      {/* Spotlight rays */}
      <Path
        d="M50 28 V33 M39 34 L42.5 37 M61 34 L57.5 37"
        stroke="url(#legacyMetal)"
        strokeWidth={1.8}
        strokeLinecap="round"
      />

      {/* Legacy star */}
      <Path
        d="
          M50 31
          L53.2 38
          L60.8 39
          L55.2 44.2
          L56.7 51.8
          L50 48
          L43.3 51.8
          L44.8 44.2
          L39.2 39
          L46.8 38
          Z
        "
        fill="url(#legacyMetal)"
        stroke={color}
        strokeWidth={0.8}
        strokeLinejoin="round"
      />

      {/* Performance platforms */}
      <Path
        d="M31 61 H69"
        stroke="url(#legacyMetal)"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Path
        d="M36 59 V55 H44 V59"
        stroke="url(#legacyMetal)"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M47 59 V52 H55 V59"
        stroke="url(#legacyMetal)"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M58 59 V55 H66 V59"
        stroke="url(#legacyMetal)"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Platform highlights */}
      <Path
        d="M37 55 H43 M48 52 H54 M59 55 H65"
        stroke={color}
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.6}
      />

      {/* Base */}
      <Path
        d="M17 73 C27 69.2 38.3 68 50 68 C61.7 68 73 69.2 83 73"
        stroke="url(#legacyMetal)"
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

export default LegacyIcon;