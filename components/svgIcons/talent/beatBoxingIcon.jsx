import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#C9A45C";

const BeatboxingIcon = ({ size = 32, color = GOLD }) => {
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
          id="beatboxGold"
          x1="22"
          y1="15"
          x2="76"
          y2="87"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#E2C887" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#92713F" />
        </LinearGradient>
      </Defs>

      {/* Head and neck silhouette */}
      <Path
        d="
          M48 13
          C34 13 25 23 25 37
          V47
          C25 53 29 58 34 61
          L34 72
          C34 77 30 81 24 83
          L18 87
          H62
          C68 87 71 82 68 77
          L60 67
          V60
          C66 56 70 50 70 42
          V35
          C70 22 61 13 48 13Z
        "
        fill="url(#beatboxGold)"
        stroke="#8F713C"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Face profile details */}
      <Path
        d="
          M60 37
          C65 39 68 42 72 44
          L66 49
          C65 53 62 56 58 58
        "
        stroke="#72572F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Eye */}
      <Circle cx="55" cy="35" r="2" fill="#624B2C" />

      {/* Mouth */}
      <Path
        d="M65 48Q69 51 73 48"
        stroke="#624B2C"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sound waves from mouth */}
      <Path
        d="M77 40C82 45 82 52 77 57"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <Path
        d="M84 34C92 42 92 55 84 63"
        stroke={color}
        strokeWidth="2.3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <Path
        d="M91 28C101 39 101 59 91 69"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Rhythm accents */}
      <Path
        d="M18 31V38M14.5 34.5H21.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Circle cx="15" cy="65" r="2" fill={color} />
      <Circle cx="24" cy="72" r="1.5" fill={color} />

      {/* Neck and shoulder detail */}
      <Path
        d="M35 72C43 77 53 77 62 70"
        stroke="#E2C887"
        strokeWidth="1.2"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default BeatboxingIcon;