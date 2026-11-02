import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const PerformanceIcon = ({
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
          id="performanceMetal"
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
        stroke="url(#performanceMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M59 17.5 C71.2 17.5 81 26.8 81 39 V66"
        stroke="url(#performanceMetal)"
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

      {/* Performance spotlight */}
      <Path
        d="M50 28 L53 35 L60 38 L53 41 L50 48 L47 41 L40 38 L47 35 Z"
        fill="url(#performanceMetal)"
        opacity={0.95}
      />

      {/* Performance stage */}
      <Path
        d="M34 53 H66 L62 61 H38 Z"
        fill="url(#performanceMetal)"
        opacity={0.18}
      />
      <Path
        d="M34 53 H66 L62 61 H38 Z"
        stroke="url(#performanceMetal)"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Path
        d="M38 61 H62"
        stroke="url(#performanceMetal)"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* Performer */}
      <Circle
        cx="50"
        cy="40"
        r="4.2"
        fill={color}
      />
      <Path
        d="M44 51 C44.5 46.5 46.7 44.5 50 44.5 C53.3 44.5 55.5 46.5 56 51"
        stroke="url(#performanceMetal)"
        strokeWidth={3.4}
        strokeLinecap="round"
      />

      {/* Spotlight rays */}
      <Path
        d="M36 34 L32.5 31 M64 34 L67.5 31 M50 23 V19"
        stroke="url(#performanceMetal)"
        strokeWidth={1.8}
        strokeLinecap="round"
      />

      {/* Base */}
      <Path
        d="M17 73 C27 69.2 38.3 68 50 68 C61.7 68 73 69.2 83 73"
        stroke="url(#performanceMetal)"
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

export default PerformanceIcon;