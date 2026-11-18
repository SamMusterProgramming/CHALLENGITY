
import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#B99A60";

const AcrobaticsIcon = ({ size = 32, color = GOLD }) => {
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
          id="acrobaticsGold"
          x1="20"
          y1="15"
          x2="80"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D6BD87" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#8C7148" />
        </LinearGradient>
      </Defs>

      {/* Suspension straps */}
      <Path
        d="M34 12V48M66 12V48"
        stroke="url(#acrobaticsGold)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Strap attachment points */}
      <Path
        d="M25 12H43M57 12H75"
        stroke="#8C7148"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Left gymnastics ring */}
      <Circle
        cx="34"
        cy="59"
        r="12"
        stroke="url(#acrobaticsGold)"
        strokeWidth="6"
      />

      {/* Right gymnastics ring */}
      <Circle
        cx="66"
        cy="59"
        r="12"
        stroke="url(#acrobaticsGold)"
        strokeWidth="6"
      />

      {/* Inner ring details */}
      <Path
        d="M29 52C26 56 26 62 30 65M61 52C58 56 58 62 62 65"
        stroke="#E2CCA0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Lower support detail */}
      <Path
        d="M34 76V83M66 76V83M34 83H66"
        stroke="#8C7148"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </Svg>
  );
};

export default AcrobaticsIcon;


