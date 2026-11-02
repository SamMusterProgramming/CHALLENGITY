import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const SportIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="6 5 88 90"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="sportGold"
          x1="20"
          y1="82"
          x2="78"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8E5010" />
          <Stop offset="0.16" stopColor="#D58B20" />
          <Stop offset="0.34" stopColor="#FFD95B" />
          <Stop offset="0.5" stopColor="#FFF2A0" />
          <Stop offset="0.66" stopColor="#F3BC3A" />
          <Stop offset="0.84" stopColor={color} />
          <Stop offset="1" stopColor="#8B4E0D" />
        </LinearGradient>

        <RadialGradient
          id="sportBallGlow"
          cx="50"
          cy="47"
          r="36"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF8C8" stopOpacity="0.9" />
          <Stop offset="0.35" stopColor="#FFD75A" stopOpacity="0.35" />
          <Stop offset="1" stopColor="#C47714" stopOpacity="0" />
        </RadialGradient>

        <LinearGradient
          id="sportHighlight"
          x1="25"
          y1="25"
          x2="72"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF7BD" />
          <Stop offset="0.32" stopColor="#FFD965" />
          <Stop offset="0.68" stopColor="#D98E20" />
          <Stop offset="1" stopColor="#8C4F0D" />
        </LinearGradient>

        <RadialGradient
          id="sportSparkle"
          cx="50"
          cy="50"
          r="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF8C7" />
          <Stop offset="0.35" stopColor="#FFD95D" />
          <Stop offset="1" stopColor="#D58A1C" />
        </RadialGradient>
      </Defs>

      {/* Soft glow behind the ball */}
      <Circle
        cx="50"
        cy="49"
        r="36"
        fill="url(#sportBallGlow)"
      />

      {/* Motion streaks */}
      <Path
        d="M13 65C18 62 22 58 25 54"
        stroke="url(#sportGold)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />

      <Path
        d="M10 74C17 71 23 67 28 61"
        stroke="url(#sportGold)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Main sports ball */}
      <Circle
        cx="53"
        cy="48"
        r="28"
        fill="url(#sportGold)"
        stroke="#9A5A12"
        strokeWidth="1.4"
      />

      {/* Inner ball surface */}
      <Circle
        cx="53"
        cy="48"
        r="24.5"
        fill="url(#sportHighlight)"
        opacity="0.92"
      />

      {/* Ball panel curves */}
      <Path
        d="M31 39C39 43 45 49 48 57C50 63 49 69 46 75"
        stroke="#8F510F"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      <Path
        d="M55 24C57 32 61 38 69 42C75 45 79 49 81 54"
        stroke="#8F510F"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      <Path
        d="M39 27C44 33 47 39 47 46"
        stroke="#FFF0A0"
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      <Path
        d="M60 53C67 57 72 63 73 70"
        stroke="#8D4F0E"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* Central panel */}
      <Path
        d="M47 46C49 42 53 40 57 42C61 44 63 48 62 52C61 56 57 59 53 58C49 57 46 52 47 46Z"
        fill="#D78C20"
        opacity="0.9"
      />

      <Path
        d="M50 44C52 42.5 55 42.5 57 44"
        stroke="#FFF2A0"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Main highlight */}
      <Path
        d="M36 36C40 30 47 27 54 27"
        stroke="#FFF8C5"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.72"
      />

      <Path
        d="M34 42C35 38 36 36 38 34"
        stroke="#FFFBE0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Top-right large sparkle */}
      <Path
        d="M82 10L84 16L90 18L84 20L82 27L80 20L74 18L80 16L82 10Z"
        fill="url(#sportSparkle)"
      />

      <Circle
        cx="82"
        cy="18"
        r="1.4"
        fill="#FFF8C7"
      />

      {/* Lower-left sparkle */}
      <Path
        d="M18 25L19.5 29.5L24 31L19.5 32.5L18 37L16.5 32.5L12 31L16.5 29.5L18 25Z"
        fill="url(#sportSparkle)"
        opacity="0.95"
      />

      {/* Small accent sparkles */}
      <Path
        d="M82 70L83.2 73.5L87 75L83.2 76.2L82 80L80.8 76.2L77 75L80.8 73.5L82 70Z"
        fill="#FFD967"
        opacity="0.9"
      />

      <Circle
        cx="25"
        cy="45"
        r="1.7"
        fill="#FFF1A0"
        opacity="0.9"
      />
    </Svg>
  );
};

export default SportIcon;