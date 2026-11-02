import React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const RisingStarIcon = ({
  size = 32,
  color = GOLD,
  strokeWidth = 2.2,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="14 10 72 66"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient
          id="risingStarGold"
          x1="25"
          y1="76"
          x2="76"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor={color}
            stopOpacity="0.78"
          />

          <Stop
            offset="0.48"
            stopColor="#FFD978"
            stopOpacity="1"
          />

          <Stop
            offset="1"
            stopColor={color}
            stopOpacity="0.86"
          />
        </LinearGradient>
      </Defs>

      {/* LEFT OUTER PORTAL */}
      <Path
        d="
          M20 64
          V38
          C20 26.8 29 17.5 40.5 17.5
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* RIGHT OUTER PORTAL */}
      <Path
        d="
          M80 64
          V38
          C80 26.8 71 17.5 59.5 17.5
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* INNER PORTAL SUPPORTS */}
      <Path
        d="M29 43 V67"
        stroke={color}
        strokeWidth={1.45}
        strokeLinecap="round"
        opacity={0.9}
      />

      <Path
        d="M71 43 V67"
        stroke={color}
        strokeWidth={1.45}
        strokeLinecap="round"
        opacity={0.9}
      />

      {/* MAIN FOUR-POINT RISING STAR */}
      <Path
        d="
          M50 13.5
          C51.3 24
          55.5 29.5
          65.8 30.8
          C55.5 32.1
          51.3 37.5
          50 48
          C48.7 37.5
          44.5 32.1
          34.2 30.8
          C44.5 29.5
          48.7 24
          50 13.5
          Z
        "
        fill="url(#risingStarGold)"
      />

      {/* INNER STAR HIGHLIGHT */}
      <Path
        d="
          M50 17.5
          C51 25
          54 29
          60.8 30.7
          C54 31.7
          51 35.5
          50 43.2
          C49 35.5
          46 31.7
          39.2 30.7
          C46 29
          49 25
          50 17.5
          Z
        "
        fill="#FFE39A"
        opacity={0.20}
      />

      {/* RISING SUPPORT LINES */}
      <Path
        d="M34.2 47.8 V62.8"
        stroke={color}
        strokeWidth={1.55}
        strokeLinecap="round"
      />

      <Path
        d="M65.8 47.8 V62.8"
        stroke={color}
        strokeWidth={1.55}
        strokeLinecap="round"
      />

      {/* INNER ASCENT LINES */}
      <Path
        d="M41 53 V63.4"
        stroke={color}
        strokeWidth={1.05}
        strokeLinecap="round"
        opacity={0.9}
      />

      <Path
        d="M59 53 V63.4"
        stroke={color}
        strokeWidth={1.05}
        strokeLinecap="round"
        opacity={0.9}
      />

      {/* SEALED LOWER HORIZON */}
      <Path
        d="
          M17 72.7
          C27.7 69.1
          38.8 67.7
          50 67.7
          C61.2 67.7
          72.3 69.1
          83 72.7
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* HORIZON HIGHLIGHT */}
      <Path
        d="
          M25 72.8
          C34.1 70.6
          42.1 69.7
          50 69.7
          C57.9 69.7
          65.9 70.6
          75 72.8
        "
        stroke="#FFE39A"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.34}
      />

      {/* SMALL LIGHT UNDER STAR */}
      <Path
        d="
          M47 67
          C48 65.4
          49 64.6
          50 64.6
          C51 64.6
          52 65.4
          53 67
        "
        stroke="#FFF0B7"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.52}
      />
    </Svg>
  );
};

export default RisingStarIcon;