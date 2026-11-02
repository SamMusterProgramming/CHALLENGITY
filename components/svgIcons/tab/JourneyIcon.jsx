import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const JourneyIcon = ({ size = 28, color = GOLD, strokeWidth = 3.2 }) => {
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
          id="journeyMetal"
          x1="20"
          y1="15"
          x2="80"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={color} stopOpacity={0.65} />
          <Stop offset="0.28" stopColor={color} />
          <Stop offset="0.52" stopColor={color} stopOpacity={0.95} />
          <Stop offset="0.78" stopColor={color} stopOpacity={0.72} />
          <Stop offset="1" stopColor={color} />
        </LinearGradient>
      </Defs>

      {/* Outer portal with visible top gap */}
      <Path
        d="M19 66 V39 C19 26.8 28.8 17.5 41 17.5"
        stroke="url(#journeyMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M59 17.5 C71.2 17.5 81 26.8 81 39 V66"
        stroke="url(#journeyMetal)"
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

      {/* Progress path */}
      <Path
        d="M30 60 C36 56 39 49 44 47 C49 45 51 50 55 46 C59 42 61 34 68 31"
        stroke="url(#journeyMetal)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M30 60 C36 56 39 49 44 47 C49 45 51 50 55 46 C59 42 61 34 68 31"
        stroke={color}
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* Milestones */}
      <Circle cx="30" cy="60" r="3.1" fill={color} />
      <Circle cx="44" cy="47" r="3.1" fill={color} />
      <Circle cx="55" cy="46" r="3.1" fill={color} />
      <Circle cx="68" cy="31" r="3.1" fill={color} />

      {/* Destination sparkle */}
      <Path
        d="M50 26 L52.5 31.5 L58 34 L52.5 36.5 L50 42 L47.5 36.5 L42 34 L47.5 31.5 Z"
        fill={color}
      />

      {/* Base */}
      <Path
        d="M17 73 C27 69.2 38.3 68 50 68 C61.7 68 73 69.2 83 73"
        stroke="url(#journeyMetal)"
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

export default JourneyIcon;