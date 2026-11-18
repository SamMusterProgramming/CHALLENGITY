
import React from "react";
import Svg, {
  Path,
  Circle,
  LinearGradient,
  Stop,
  Defs,
} from "react-native-svg";

const GOLD = "#B99A60";

const YogaIcon = ({ size = 32, color = GOLD }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
  >
    <Defs>
      <LinearGradient id="yogaGold" x1="15" y1="10" x2="85" y2="90">
        <Stop offset="0" stopColor="#D6BD87" />
        <Stop offset="0.5" stopColor={color} />
        <Stop offset="1" stopColor="#8C7148" />
      </LinearGradient>
    </Defs>

    {/* Head */}
    <Circle cx="50" cy="17" r="7" fill="url(#yogaGold)" />

    {/* Body */}
    <Path
      d="M50 29 L50 55"
      stroke="url(#yogaGold)"
      strokeWidth="8"
      strokeLinecap="round"
    />

    {/* Arms in relaxed meditation pose */}
    <Path
      d="M49 34 L32 45 L20 39"
      stroke="url(#yogaGold)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M51 34 L68 45 L80 39"
      stroke="url(#yogaGold)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Crossed legs */}
    <Path
      d="M50 55 L32 65 L20 77 Q17 82 25 83 H50"
      stroke="url(#yogaGold)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M50 55 L68 65 L80 77 Q83 82 75 83 H50"
      stroke="url(#yogaGold)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Lower seated base */}
    <Path
      d="M25 83 Q50 91 75 83"
      stroke="url(#yogaGold)"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </Svg>
);

export default YogaIcon;
