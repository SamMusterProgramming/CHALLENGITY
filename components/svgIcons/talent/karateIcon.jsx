
import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#B99A60";

const KarateIcon = ({ size = 32, color = GOLD }) => {
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
          id="karateGold"
          x1="20"
          y1="25"
          x2="80"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D6BD87" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#8C7148" />
        </LinearGradient>
      </Defs>

      {/* Belt left end */}
      <Path
        d="M29 44L22 79L36 85L47 53L42 43Z"
        fill="url(#karateGold)"
        stroke="#806640"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      {/* Belt right end */}
      <Path
        d="M58 43L54 53L66 85L80 79L70 44Z"
        fill="url(#karateGold)"
        stroke="#806640"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      {/* Main belt band */}
      <Path
        d="M19 32Q50 23 81 32L77 49Q50 40 23 49Z"
        fill="url(#karateGold)"
        stroke="#806640"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Knot */}
      <Path
        d="
          M37 31
          L47 25
          L55 30
          L64 25
          L68 35
          L56 48
          L49 44
          L40 49
          L32 39Z
        "
        fill="url(#karateGold)"
        stroke="#806640"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Knot center */}
      <Path
        d="M43 33L55 41L49 47L38 39Z"
        fill="#8C7148"
        stroke="#D6BD87"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Fabric folds */}
      <Path
        d="M27 43L33 45M66 45L73 43"
        stroke="#E2CCA0"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Belt stitching */}
      <Path
        d="M26 53L22 74M73 53L78 74"
        stroke="#806640"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
    </Svg>
  );
};

export default KarateIcon;
