
import React from "react";
import Svg, {
  Path,
  Circle,
  LinearGradient,
  Stop,
  Defs,
  Ellipse,
} from "react-native-svg";

const GOLD = "#B99A60";

const SkatingIcon = ({ size = 32, color = GOLD }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
  >
    <Defs>
      <LinearGradient id="skatingGold" x1="15" y1="10" x2="85" y2="90">
        <Stop offset="0" stopColor="#D6BD87" />
        <Stop offset="0.5" stopColor={color} />
        <Stop offset="1" stopColor="#8C7148" />
      </LinearGradient>
    </Defs>

    {/* Head */}
    <Circle cx="59" cy="17" r="7" fill="url(#skatingGold)" />

    {/* Body */}
    <Path
      d="M55 28 L43 43 L58 51"
      stroke="url(#skatingGold)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Arms */}
    <Path
      d="M49 34 L31 25 L21 29"
      stroke="url(#skatingGold)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M51 35 L69 28 L82 32"
      stroke="url(#skatingGold)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Front leg */}
    <Path
      d="M58 50 L73 61 L87 59"
      stroke="url(#skatingGold)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Back leg */}
    <Path
      d="M58 50 L43 63 L29 59"
      stroke="url(#skatingGold)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Skateboard */}
    <Path
      d="M17 77 Q50 84 84 76"
      stroke="url(#skatingGold)"
      strokeWidth="6"
      strokeLinecap="round"
    />

    {/* Wheels */}
    <Circle cx="29" cy="84" r="4" fill="url(#skatingGold)" />
    <Circle cx="73" cy="82" r="4" fill="url(#skatingGold)" />

    {/* Motion accents */}
    <Path
      d="M12 48 L22 45 M15 56 L25 54"
      stroke="url(#skatingGold)"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.7"
    />
  </Svg>
);

export default SkatingIcon;
