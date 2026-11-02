import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const FeedIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        {/* Main metallic gold */}
        <LinearGradient
          id="feedGold"
          x1="22"
          y1="84"
          x2="78"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8A4F08" />
          <Stop offset="0.16" stopColor="#C77A0D" />
          <Stop offset="0.32" stopColor="#FFD34D" />
          <Stop offset="0.48" stopColor="#FFF1A0" />
          <Stop offset="0.62" stopColor="#E7A11D" />
          <Stop offset="0.82" stopColor="#B96509" />
          <Stop offset="1" stopColor="#754006" />
        </LinearGradient>

        {/* Gold side / highlights */}
        <LinearGradient
          id="feedGoldSide"
          x1="25"
          y1="25"
          x2="76"
          y2="84"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF0A0" />
          <Stop offset="0.2" stopColor="#FFD34D" />
          <Stop offset="0.42" stopColor="#E89A18" />
          <Stop offset="0.7" stopColor="#B96509" />
          <Stop offset="1" stopColor="#6F3A06" />
        </LinearGradient>

        {/* Light subtle gold inner background */}
        <RadialGradient
          id="feedInner"
          cx="50"
          cy="46"
          r="48"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBEA" />
          <Stop offset="0.45" stopColor="#FFF4C9" />
          <Stop offset="0.78" stopColor="#F8E6A5" />
          <Stop offset="1" stopColor="#EED38A" />
        </RadialGradient>
      </Defs>

      {/* Main bubble */}
      <Path
        d="
          M40 18
          H80
          C86 18 90 23 90 29
          V83
          C90 89 86 93 80 93
          H40
          C36 89 31 86 25 84
          C27 87 29 90 30 93
          H20
          C14 93 10 89 10 83
          V29
          C10 23 14 18 20 18
          H28
          C27 13 24 10 20 7
          C28 10 36 13 40 18
          Z
        "
        fill="url(#feedGold)"
      />

      {/* Light gold inner background */}
      <Path
        d="
          M21 24
          C18 24 16 27 16 31
          V81
          C16 85 18 87 22 87
          H78
          C82 87 84 85 84 81
          V31
          C84 27 82 24 78 24
          Z
        "
        fill="url(#feedInner)"
      />

      {/* Subtle inner edge */}
      <Path
        d="
          M21 24
          C18 24 16 27 16 31
          V79
          C16 82 16.5 84 17.5 85.5
        "
        stroke="#FFFDF0"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Top tail highlight */}
      <Path
        d="
          M20 18
          C27 18 34 18 40 18
          C36 13 29 10 20 7
          C24 10 26 14 28 18
          Z
        "
        fill="url(#feedGoldSide)"
        opacity="0.9"
      />

      {/* Comment dots */}
      <Circle cx="35" cy="54" r="5" fill="#171109" />
      <Circle cx="50" cy="54" r="5" fill="#171109" />
      <Circle cx="65" cy="54" r="5" fill="#171109" />

      {/* Dot highlights */}
      <Circle
        cx="34"
        cy="52.8"
        r="1"
        fill="#FFF4B0"
        opacity="0.9"
      />
      <Circle
        cx="49"
        cy="52.8"
        r="1"
        fill="#FFF4B0"
        opacity="0.9"
      />
      <Circle
        cx="64"
        cy="52.8"
        r="1"
        fill="#FFF4B0"
        opacity="0.9"
      />
    </Svg>
  );
};

export default FeedIcon;