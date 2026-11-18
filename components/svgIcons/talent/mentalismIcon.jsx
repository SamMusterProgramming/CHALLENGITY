
import React from "react";
import Svg, {
  Path,
  Circle,
  LinearGradient,
  Stop,
  Defs,
} from "react-native-svg";

const GOLD = "#A88B59";

const MentalismIcon = ({ size = 32, color = GOLD }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
  >
    <Defs>
      <LinearGradient id="mentalismGoldV2" x1="15" y1="10" x2="85" y2="90">
        <Stop offset="0" stopColor="#BCA477" />
        <Stop offset="0.5" stopColor={color} />
        <Stop offset="1" stopColor="#806641" />
      </LinearGradient>
    </Defs>

    {/* Solid central eye */}
    <Path
      d="M8 50 C27 24 73 24 92 50 C73 76 27 76 8 50 Z"
      fill="url(#mentalismGoldV2)"
    />
    <Circle cx="50" cy="50" r="17" fill="#302719" />
    <Circle cx="50" cy="50" r="9" fill="url(#mentalismGoldV2)" />

    {/* Mind waves */}
    <Path
      d="M35 13 C43 4 57 4 65 13"
      stroke="url(#mentalismGoldV2)"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <Path
      d="M41 23 C46 18 54 18 59 23"
      stroke="url(#mentalismGoldV2)"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Focus rays */}
    <Path
      d="M50 5 V1 M15 23 L10 18 M85 23 L90 18"
      stroke="url(#mentalismGoldV2)"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

export default MentalismIcon;

