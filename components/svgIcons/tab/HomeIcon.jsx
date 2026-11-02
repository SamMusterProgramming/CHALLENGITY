import React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const HomeIcon = ({ size = 28, color = GOLD, strokeWidth = 3.2 }) => {
  const metallic = color;

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
          id="homeMetal"
          x1="20"
          y1="15"
          x2="80"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={metallic} stopOpacity={0.65} />
          <Stop offset="0.28" stopColor={metallic} />
          <Stop offset="0.52" stopColor={metallic} stopOpacity={0.95} />
          <Stop offset="0.78" stopColor={metallic} stopOpacity={0.72} />
          <Stop offset="1" stopColor={metallic} />
        </LinearGradient>
      </Defs>

      {/* Outer portal with visible top gap */}
      <Path
        d="M19 66 V39 C19 26.8 28.8 17.5 41 17.5"
        stroke="url(#homeMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M59 17.5 C71.2 17.5 81 26.8 81 39 V66"
        stroke="url(#homeMetal)"
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

      {/* Home */}
      <Path
        d="M50 29 L28.5 48.5 H34 V63 H45 V53.5 C45 50.8 47.2 48.5 50 48.5 C52.8 48.5 55 50.8 55 53.5 V63 H66 V48.5 H71.5 Z"
        fill="url(#homeMetal)"
        stroke={color}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />

      {/* Roof highlight */}
      <Path
        d="M34 47.5 L50 33.2 L66 47.5"
        stroke={color}
        strokeWidth={1.05}
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* Base */}
      <Path
        d="M17 73 C27 69.2 38.3 68 50 68 C61.7 68 73 69.2 83 73"
        stroke="url(#homeMetal)"
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

export default HomeIcon;