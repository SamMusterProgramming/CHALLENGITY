
import React from "react";
import Svg, {
  Path,
  Circle,
  LinearGradient,
  Stop,
  Defs,
} from "react-native-svg";

const GOLD = "#B99A60";

const ParkourIcon = ({ size = 32, color = GOLD }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
  >
    <Defs>
      <LinearGradient id="parkourGold" x1="15" y1="10" x2="85" y2="90">
        <Stop offset="0" stopColor="#D6BD87" />
        <Stop offset="0.5" stopColor={color} />
        <Stop offset="1" stopColor="#8C7148" />
      </LinearGradient>
    </Defs>

    {/* Head */}
    <Circle
      cx="61"
      cy="19"
      r="7"
      fill="url(#parkourGold)"
    />

    {/* Upper body */}
    <Path
      d="M57 29 L45 43 L59 51 L72 37"
      stroke="url(#parkourGold)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Forward arm */}
    <Path
      d="M54 33 L72 27 L84 32"
      stroke="url(#parkourGold)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Supporting arm */}
    <Path
      d="M49 37 L35 29 L25 34"
      stroke="url(#parkourGold)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Front leg */}
    <Path
      d="M59 50 L76 58 L88 52"
      stroke="url(#parkourGold)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Back leg */}
    <Path
      d="M58 50 L43 61 L30 55"
      stroke="url(#parkourGold)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Vaulting obstacle */}
    <Path
      d="M12 72 H88"
      stroke="url(#parkourGold)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <Path
      d="M20 72 V88 M80 72 V88"
      stroke="url(#parkourGold)"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </Svg>
);

export default ParkourIcon;
