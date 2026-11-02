import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

/**
 * ITRI — Discovery / Stage Portal
 *
 * Tight viewBox version:
 * The SVG viewport is cropped to the actual artwork,
 * minimizing invisible space around the icon.
 *
 * Usage:
 *   <StagePortalIcon size={32} />
 */
const GOLD = "#E8B95A";

const StagePortalIcon = ({
  size = 32,
  color = GOLD,
  strokeWidth = 2.35,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="14 13 72 63"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient
          id="stagePortalGold"
          x1="19"
          y1="82"
          x2="81"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={color} stopOpacity="0.78" />
          <Stop offset="0.5" stopColor="#FFD978" stopOpacity="1" />
          <Stop offset="1" stopColor={color} stopOpacity="0.84" />
        </LinearGradient>
      </Defs>

      <Path
        d="
          M20 65
          V38
          C20 26.6 29.1 17.5 40.5 17.5
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="
          M80 65
          V38
          C80 26.6 70.9 17.5 59.5 17.5
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M29 39 V68"
        stroke={color}
        strokeWidth={1.55}
        strokeLinecap="round"
        opacity={0.92}
      />

      <Path
        d="M71 39 V68"
        stroke={color}
        strokeWidth={1.55}
        strokeLinecap="round"
        opacity={0.92}
      />

      <Circle
        cx="50"
        cy="31.2"
        r="4.25"
        fill="url(#stagePortalGold)"
      />

      <Path
        d="
          M50 38
          L40.8 47.3
          L45.7 67.2
          H54.3
          L59.2 47.3
          Z
        "
        fill="url(#stagePortalGold)"
      />

      <Path
        d="M50 41.2 L47.3 48.1 L50 59.2 L52.7 48.1 Z"
        fill="#FFE39A"
        opacity={0.18}
      />

      <Path
        d="
          M17 72.7
          C27.7 69.1 38.8 67.7 50 67.7
          C61.2 67.7 72.3 69.1 83 72.7
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Path
        d="
          M25 72.8
          C34.1 70.6 42.1 69.7 50 69.7
          C57.9 69.7 65.9 70.6 75 72.8
        "
        stroke="#FFE39A"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.34}
      />
    </Svg>
  );
};

export default StagePortalIcon;