import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const CircleIcon = ({
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
          id="circleMetal"
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
        stroke="url(#circleMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M59 17.5 C71.2 17.5 81 26.8 81 39 V66"
        stroke="url(#circleMetal)"
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

      {/* Network connections */}
      <Path
        d="M50 39 L35.5 48 M50 39 L64.5 48 M35.5 48 L50 57 M64.5 48 L50 57"
        stroke="url(#circleMetal)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />

      {/* Left connection */}
      <Circle
        cx="35.5"
        cy="46"
        r="5.2"
        fill="url(#circleMetal)"
      />
      <Path
        d="M28.5 60 C29.2 55.3 31.8 52.5 35.5 52.5 C38 52.5 40 53.7 41 55.8"
        stroke="url(#circleMetal)"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Right connection */}
      <Circle
        cx="64.5"
        cy="46"
        r="5.2"
        fill="url(#circleMetal)"
      />
      <Path
        d="M58 55.8 C59 53.7 61 52.5 64.5 52.5 C68.2 52.5 70.8 55.3 71.5 60"
        stroke="url(#circleMetal)"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Central profile */}
      <Circle
        cx="50"
        cy="36.5"
        r="7"
        fill="url(#circleMetal)"
        stroke={color}
        strokeWidth={0.8}
      />
      <Path
        d="M39 55 C40.2 48.8 44.2 45.5 50 45.5 C55.8 45.5 59.8 48.8 61 55"
        stroke="url(#circleMetal)"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Path
        d="M43 53 C44.5 49.5 47 48 50 48 C53 48 55.5 49.5 57 53"
        stroke={color}
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* Base */}
      <Path
        d="M17 73 C27 69.2 38.3 68 50 68 C61.7 68 73 69.2 83 73"
        stroke="url(#circleMetal)"
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

export default CircleIcon;