
import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#B99A60";

const ViolinIcon = ({ size = 32, color = GOLD }) => {
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
          id="violinBodyGold"
          x1="25"
          y1="24"
          x2="75"
          y2="91"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D6BD87" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#8C7148" />
        </LinearGradient>

        <LinearGradient
          id="violinNeckGold"
          x1="43"
          y1="8"
          x2="57"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D6BD87" />
          <Stop offset="0.55" stopColor={color} />
          <Stop offset="1" stopColor="#8C7148" />
        </LinearGradient>
      </Defs>

      {/* Neck and fingerboard */}
      <Path
        d="M44 49L44 15L56 15L56 49Z"
        fill="url(#violinNeckGold)"
        stroke="#806640"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Scroll */}
      <Path
        d="
          M44 17
          C39 15 37 11 40 7
          C43 3 50 4 52 8
          C54 11 51 14 48 13
          C46 12 47 9 49 9
          C46 7 43 9 43 12
          C43 14 45 15 47 15
          L47 18
          Z
        "
        fill="url(#violinNeckGold)"
        stroke="#806640"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Pegs */}
      <Path
        d="M44 19L35 16M56 19L65 16M44 25L35 28M56 25L65 28"
        stroke="#806640"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="34.5" cy="15.5" r="2.5" fill={color} />
      <Circle cx="65.5" cy="15.5" r="2.5" fill={color} />
      <Circle cx="34.5" cy="28.5" r="2.5" fill={color} />
      <Circle cx="65.5" cy="28.5" r="2.5" fill={color} />

      {/* Violin body */}
      <Path
        d="
          M44 42
          C39 40 33 42 29 47
          C25 52 27 58 31 62
          C34 65 34 69 30 74
          C25 81 29 91 38 94
          C43 96 47 93 50 89
          C53 93 57 96 62 94
          C71 91 75 81 70 74
          C66 69 66 65 69 62
          C73 58 75 52 71 47
          C67 42 61 40 56 42
          Z
        "
        fill="url(#violinBodyGold)"
        stroke="#806640"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      {/* Subtle body contour */}
      <Path
        d="
          M43 46
          C37 44 32 48 31 53
          C30 57 34 61 37 64
          C39 68 34 74 33 79
          C31 85 36 90 42 91
          M57 46
          C63 44 68 48 69 53
          C70 57 66 61 63 64
          C61 68 66 74 67 79
          C69 85 64 90 58 91
        "
        stroke="#E1C994"
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {/* Strings */}
      <Path
        d="M46 14L47 86M48.7 14L49 86M51.3 14L51 86M54 14L53 86"
        stroke="#E9D9B8"
        strokeWidth="0.65"
        strokeOpacity="0.85"
      />

      {/* Bridge */}
      <Path
        d="M42 70L58 70L56 76L44 76Z"
        fill="#806640"
        stroke="#D6BD87"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />

      {/* F-holes */}
      <Path
        d="M38 60C34 62 35 67 38 69C40 71 39 74 37 76"
        stroke="#624B2C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M62 60C66 62 65 67 62 69C60 71 61 74 63 76"
        stroke="#624B2C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="37.5" cy="60" r="1.5" fill="#624B2C" />
      <Circle cx="62.5" cy="60" r="1.5" fill="#624B2C" />

      {/* Tailpiece */}
      <Path
        d="M46 78L54 78L53 88Q50 92 47 88Z"
        fill="#806640"
        stroke="#D6BD87"
        strokeWidth="0.8"
      />

      {/* Chinrest */}
      <Path
        d="M42 89Q50 94 58 89"
        stroke="#D6BD87"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ViolinIcon;
