
import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#B99A60";

const DrummingIcon = ({ size = 32, color = GOLD }) => {
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
          id="drumGold"
          x1="25"
          y1="38"
          x2="76"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D6BD87" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#8C7148" />
        </LinearGradient>
      </Defs>

      {/* Left drumstick */}
      <Path
        d="M17 17L68 65"
        stroke="#806640"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Path
        d="M17 17L68 65"
        stroke="#D6BD87"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Circle cx="16" cy="16" r="3.5" fill="#D6BD87" />

      {/* Right drumstick */}
      <Path
        d="M83 17L32 65"
        stroke="#806640"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Path
        d="M83 17L32 65"
        stroke="#D6BD87"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Circle cx="84" cy="16" r="3.5" fill="#D6BD87" />

      {/* Snare drum shell */}
      <Path
        d="M23 52L77 52L73 82Q50 91 27 82Z"
        fill="url(#drumGold)"
        stroke="#806640"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Drum head */}
      <EllipseFallback />

      {/* Drum rim */}
      <Path
        d="M23 52Q50 40 77 52"
        stroke="#E2CCA0"
        strokeWidth="2.5"
      />
      <Path
        d="M23 55Q50 67 77 55"
        stroke="#806640"
        strokeWidth="1.2"
      />

      {/* Drum lugs */}
      <Path
        d="M29 60L29 76M39 64L39 83M61 64L61 83M71 60L71 76"
        stroke="#E2CCA0"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Bottom rim */}
      <Path
        d="M27 81Q50 91 73 81"
        stroke="#806640"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Snare wires */}
      <Path
        d="M34 84L34 87M40 86L40 89M46 87L46 90M52 87L52 90M58 86L58 89M64 84L64 87"
        stroke="#E2CCA0"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Sound accents */}
      <Path
        d="M12 42L17 38M88 42L83 38"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
};

// Drumhead ellipse component
const EllipseFallback = () => (
  <Path
    d="M23 52Q50 39 77 52Q50 65 23 52Z"
    fill="#D6BD87"
    fillOpacity="0.65"
    stroke="#806640"
    strokeWidth="1.3"
  />
);

export default DrummingIcon;
