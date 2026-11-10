
import React from "react";
import Svg, {
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const FitnessIcon = ({ size = 32, color = GOLD }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="fitnessMetal"
          x1="10"
          y1="25"
          x2="90"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#F0D18B" />
          <Stop offset="0.48" stopColor={color} />
          <Stop offset="1" stopColor="#A87529" />
        </LinearGradient>

        <LinearGradient
          id="fitnessShaft"
          x1="12"
          y1="45"
          x2="88"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#A87529" />
          <Stop offset="0.5" stopColor="#F4D28A" />
          <Stop offset="1" stopColor="#A87529" />
        </LinearGradient>
      </Defs>

      {/* One continuous bar running through the weights */}
      <Rect
        x="8"
        y="46.5"
        width="84"
        height="7"
        rx="3.5"
        fill="url(#fitnessShaft)"
      />

      {/* Left outer weight plate */}
      <Path
        d="
          M15 25
          C11.1 25 8 28.1 8 32
          V68
          C8 71.9 11.1 75 15 75
          H21
          C24.9 75 28 71.9 28 68
          V32
          C28 28.1 24.9 25 21 25
          Z
        "
        fill="url(#fitnessMetal)"
      />

      {/* Left inner plate */}
      <Path
        d="
          M30 33
          C27.2 33 25 35.2 25 38
          V62
          C25 64.8 27.2 67 30 67
          H34
          C36.8 67 39 64.8 39 62
          V38
          C39 35.2 36.8 33 34 33
          Z
        "
        fill="url(#fitnessMetal)"
      />

      {/* Right outer weight plate */}
      <Path
        d="
          M85 25
          C88.9 25 92 28.1 92 32
          V68
          C92 71.9 88.9 75 85 75
          H79
          C75.1 75 72 71.9 72 68
          V32
          C72 28.1 75.1 25 79 25
          Z
        "
        fill="url(#fitnessMetal)"
      />

      {/* Right inner plate */}
      <Path
        d="
          M70 33
          C72.8 33 75 35.2 75 38
          V62
          C75 64.8 72.8 67 70 67
          H66
          C63.2 67 61 64.8 61 62
          V38
          C61 35.2 63.2 33 66 33
          Z
        "
        fill="url(#fitnessMetal)"
      />

      {/* Subtle plate separation grooves */}
      <Path
        d="M18 31 V69 M82 31 V69"
        stroke="#82551D"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Inner collars */}
      <Path
        d="M38 39 V61 M62 39 V61"
        stroke="#8E5F21"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Engraved grip texture — no black block */}
      <Path
        d="
          M43 47 L47 53
          M47 47 L51 53
          M51 47 L55 53
          M55 47 L59 53
        "
        stroke="#8E5F21"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Restrained upper shaft highlight */}
      <Path
        d="M31 47.8 H69"
        stroke="#FFF0C2"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.65"
      />
    </Svg>
  );
};

export default FitnessIcon;
