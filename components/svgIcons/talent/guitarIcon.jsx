
import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#C9A45C";

const GuitarIcon = ({ size = 32, color = GOLD }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        <LinearGradient id="guitarBody" x1="24" y1="42" x2="72" y2="91">
          <Stop offset="0" stopColor="#E2C887" />
          <Stop offset="0.48" stopColor={color} />
          <Stop offset="1" stopColor="#A98649" />
        </LinearGradient>

        <LinearGradient id="guitarNeck" x1="38" y1="18" x2="66" y2="49">
          <Stop offset="0" stopColor="#E2C887" />
          <Stop offset="0.55" stopColor={color} />
          <Stop offset="1" stopColor="#9C7943" />
        </LinearGradient>
      </Defs>

      {/* Neck */}
      <Path
        d="M42 52L35 45L63 17L70 24L43 52Z"
        fill="url(#guitarNeck)"
        stroke="#8F713C"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      {/* Headstock, aligned with neck */}
      <Path
        d="M62 19L73 7
           Q76 4 79 7
           L84 12
           Q87 15 84 18
           L72 29Z"
        fill="#C9A45C"
        stroke="#8F713C"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      {/* Tuning pegs */}
      <Path
        d="M72 11L68 7M78 17L83 21M81 10L85 6"
        stroke="#E2C887"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Circle cx="67.5" cy="6.5" r="1.8" fill="#C9A45C" />
      <Circle cx="84" cy="22" r="1.8" fill="#C9A45C" />
      <Circle cx="86" cy="5.5" r="1.8" fill="#C9A45C" />

      {/* Guitar body */}
      <Path
        d="
          M43 47
          C36 40 25 42 20 50
          C15 58 19 67 26 71
          C17 79 21 91 31 94
          C40 97 48 90 51 83
          C55 91 65 97 74 92
          C85 86 83 76 75 70
          C83 63 81 51 73 46
          C64 40 54 43 50 52
          C48 50 46 48 43 47Z
        "
        fill="url(#guitarBody)"
        stroke="#8F713C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Subtle body contour */}
      <Path
        d="
          M42 52
          C35 46 27 48 24 55
          C21 62 27 68 32 71
          C25 78 27 87 34 89
          C42 91 47 82 51 75
          C55 83 63 91 71 87
          C79 83 76 75 69 70
          C76 64 75 55 68 51
          C60 47 54 52 50 60
        "
        stroke="#E2C887"
        strokeOpacity="0.5"
        strokeWidth="1"
      />

      {/* Sound hole */}
      <Circle
        cx="50"
        cy="68"
        r="7.5"
        fill="#624B2C"
        stroke="#E2C887"
        strokeWidth="1.4"
      />
      <Circle
        cx="50"
        cy="68"
        r="5.5"
        stroke="#A98649"
        strokeWidth="0.9"
      />

      {/* Bridge */}
      <Path
        d="M40 82L60 82"
        stroke="#624B2C"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Strings */}
      <Path
        d="M40 17L47 82M42.5 19L49 82M45 21L51 82M47.5 23L53 82"
        stroke="#F0DDAF"
        strokeWidth="0.55"
        strokeOpacity="0.8"
      />

      {/* Frets */}
      <Path
        d="
          M39 40L46 47
          M43 36L50 43
          M47 32L54 39
          M51 28L58 35
          M55 24L62 31
          M59 20L66 27
        "
        stroke="#80633A"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default GuitarIcon;
