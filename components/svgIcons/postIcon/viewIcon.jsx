import React from "react";
import Svg, {
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const ViewIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient
          id="viewGold"
          x1="20"
          y1="88"
          x2="80"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8B4D0B" />
          <Stop offset="0.16" stopColor="#D17F17" />
          <Stop offset="0.32" stopColor="#FFD65A" />
          <Stop offset="0.48" stopColor="#FFF1A0" />
          <Stop offset="0.62" stopColor="#F4BB38" />
          <Stop offset="0.82" stopColor={color} />
          <Stop offset="1" stopColor="#8A4D0C" />
        </LinearGradient>

        <LinearGradient
          id="viewLidGold"
          x1="18"
          y1="22"
          x2="82"
          y2="78"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#9A570F" />
          <Stop offset="0.22" stopColor="#E19A28" />
          <Stop offset="0.5" stopColor="#FFF0A0" />
          <Stop offset="0.72" stopColor="#D88B20" />
          <Stop offset="1" stopColor="#8C4E0C" />
        </LinearGradient>

        <RadialGradient
          id="irisGold"
          cx="50"
          cy="50"
          r="22"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF8BD" />
          <Stop offset="0.2" stopColor="#FFD95A" />
          <Stop offset="0.45" stopColor="#E99A20" />
          <Stop offset="0.7" stopColor="#A95B0A" />
          <Stop offset="1" stopColor="#4C2504" />
        </RadialGradient>

        <RadialGradient
          id="viewIrisGlow"
          cx="50"
          cy="49"
          r="18"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFDE0" stopOpacity="0.95" />
          <Stop offset="0.3" stopColor="#FFE56B" stopOpacity="0.72" />
          <Stop offset="0.7" stopColor="#FFB31A" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#D56F08" stopOpacity="0" />
        </RadialGradient>

        <LinearGradient
          id="eyeSurface"
          x1="50"
          y1="16"
          x2="50"
          y2="84"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF7CF" />
          <Stop offset="0.3" stopColor="#FFF1B0" />
          <Stop offset="0.55" stopColor="#E8A52C" />
          <Stop offset="1" stopColor="#8D4D0A" />
        </LinearGradient>

        <RadialGradient
          id="viewGlow"
          cx="50"
          cy="50"
          r="45"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFE77A" stopOpacity="0.32" />
          <Stop offset="0.45" stopColor="#E89A1B" stopOpacity="0.14" />
          <Stop offset="1" stopColor="#B86608" stopOpacity="0" />
        </RadialGradient>

        <RadialGradient
          id="viewSparkle"
          cx="50"
          cy="50"
          r="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBE0" />
          <Stop offset="0.3" stopColor="#FFE16A" />
          <Stop offset="0.7" stopColor="#E79A20" />
          <Stop offset="1" stopColor="#9A530B" />
        </RadialGradient>
      </Defs>

      {/* Ambient glow */}
      <Ellipse
        cx="50"
        cy="50"
        rx="43"
        ry="40"
        fill="url(#viewGlow)"
      />

      {/* Tall outer eye silhouette */}
      <Path
        d="
          M8 50
          C17 35 31 15 50 9
          C69 15 83 35 92 50
          C83 65 69 85 50 91
          C31 85 17 65 8 50
          Z
        "
        fill="url(#viewGold)"
      />

      {/* Inner eye cavity */}
      <Path
        d="
          M14 50
          C22 38 35 23 50 18
          C65 23 78 38 86 50
          C78 62 65 77 50 82
          C35 77 22 62 14 50
          Z
        "
        fill="#241304"
      />

      {/* Eye surface */}
      <Path
        d="
          M17 50
          C25 39 37 27 50 23
          C63 27 75 39 83 50
          C75 61 63 73 50 77
          C37 73 25 61 17 50
          Z
        "
        fill="url(#eyeSurface)"
      />

      {/* Iris outer ring */}
      <Circle
        cx="50"
        cy="50"
        r="20"
        fill="#6B3605"
        stroke="url(#viewGold)"
        strokeWidth="1.8"
      />

      {/* Iris */}
      <Circle
        cx="50"
        cy="50"
        r="17"
        fill="url(#irisGold)"
      />

      {/* Iris glow */}
      <Circle
        cx="50"
        cy="50"
        r="14"
        fill="url(#viewIrisGlow)"
      />

      {/* Iris details */}
      <Path
        d="M50 33V42"
        stroke="#FFE36A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />

      <Path
        d="M50 58V67"
        stroke="#B86608"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />

      <Path
        d="M33 50H42"
        stroke="#FFE36A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />

      <Path
        d="M58 50H67"
        stroke="#B86608"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />

      <Path
        d="M38 38L44 44"
        stroke="#FFF0A0"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />

      <Path
        d="M62 38L56 44"
        stroke="#B86608"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />

      <Path
        d="M38 62L44 56"
        stroke="#C8750D"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />

      <Path
        d="M62 62L56 56"
        stroke="#A95B08"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Pupil */}
      <Circle
        cx="50"
        cy="50"
        r="7"
        fill="#120A03"
      />

      {/* Eye reflection */}
      <Circle
        cx="47.5"
        cy="46.5"
        r="2.4"
        fill="#FFFBE1"
        opacity="0.98"
      />

      <Circle
        cx="53"
        cy="53"
        r="1"
        fill="#FFD95B"
        opacity="0.9"
      />

      {/* Tall upper eyelid */}
      <Path
        d="
          M8 50
          C17 35 31 15 50 9
          C69 15 83 35 92 50
        "
        stroke="url(#viewLidGold)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tall lower eyelid */}
      <Path
        d="
          M8 50
          C17 65 31 85 50 91
          C69 85 83 65 92 50
        "
        stroke="#9B570E"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Upper metallic highlight */}
      <Path
        d="
          M17 42
          C26 29 38 19 50 15
          C62 19 74 29 83 42
        "
        stroke="#FFF3A6"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Lower reflection */}
      <Path
        d="
          M25 62
          C33 72 42 78 50 80
          C58 78 67 72 75 62
        "
        stroke="#FFD45A"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Upper-left sparkle */}
      <Path
        d="
          M18 7
          C18.5 11 20 12.5 24 13
          C20 13.5 18.5 15 18 19
          C17.5 15 16 13.5 12 13
          C16 12.5 17.5 11 18 7
          Z
        "
        fill="url(#viewSparkle)"
      />

      {/* Upper-right sparkle */}
      <Path
        d="
          M81 8
          C81.5 11.5 82.8 12.8 86.5 13.3
          C82.8 13.8 81.5 15.1 81 18.5
          C80.5 15.1 79.2 13.8 75.5 13.3
          C79.2 12.8 80.5 11.5 81 8
          Z
        "
        fill="url(#viewSparkle)"
        opacity="0.9"
      />

      {/* Lower-left small sparkle */}
      <Path
        d="
          M19 77
          C19.35 79.7 20.3 80.7 23 81
          C20.3 81.35 19.35 82.3 19 85
          C18.65 82.3 17.7 81.35 15 81
          C17.7 80.7 18.65 79.7 19 77
          Z
        "
        fill="url(#viewSparkle)"
        opacity="0.8"
      />

      {/* Lower-right small sparkle */}
      <Path
        d="
          M81 76
          C81.35 78.7 82.3 79.7 85 80
          C82.3 80.35 81.35 81.3 81 84
          C80.65 81.3 79.7 80.35 77 80
          C79.7 79.7 80.65 78.7 81 76
          Z
        "
        fill="url(#viewSparkle)"
        opacity="0.8"
      />

      {/* Metallic glints */}
      <Circle
        cx="27"
        cy="27"
        r="1"
        fill="#FFF7C5"
        opacity="0.9"
      />

      <Circle
        cx="73"
        cy="29"
        r="0.8"
        fill="#FFF7C5"
        opacity="0.85"
      />
    </Svg>
  );
};

export default ViewIcon;