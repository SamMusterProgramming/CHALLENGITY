
import React from "react";
import Svg, {
  Path,
  Rect,
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const SingingIcon = ({ size = 32, color = GOLD }) => {
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
          id="singingGold"
          x1="24"
          y1="88"
          x2="77"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#89500F" />
          <Stop offset="0.24" stopColor="#C98725" />
          <Stop offset="0.46" stopColor="#FFE68A" />
          <Stop offset="0.62" stopColor="#FFF3B0" />
          <Stop offset="0.82" stopColor={color} />
          <Stop offset="1" stopColor="#986019" />
        </LinearGradient>

        <LinearGradient
          id="singingDarkGold"
          x1="38"
          y1="25"
          x2="62"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8D500F" />
          <Stop offset="0.45" stopColor="#D99B37" />
          <Stop offset="0.7" stopColor="#FFE68A" />
          <Stop offset="1" stopColor="#986019" />
        </LinearGradient>

        <LinearGradient
          id="singingWave"
          x1="8"
          y1="50"
          x2="92"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#986019" />
          <Stop offset="0.5" stopColor="#FFE68A" />
          <Stop offset="1" stopColor="#986019" />
        </LinearGradient>

        <RadialGradient
          id="singingGlow"
          cx="50"
          cy="38"
          r="38"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFE68A" stopOpacity={0.24} />
          <Stop offset="1" stopColor="#C98725" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* Ambient glow */}
      <Circle cx="50" cy="45" r="39" fill="url(#singingGlow)" />

      {/* Left sound waves */}
      <Path
        d="M23 29 C14 36 10 43 10 50 C10 57 14 64 23 71"
        stroke="url(#singingWave)"
        strokeWidth={1.7}
        strokeLinecap="round"
        opacity={0.9}
      />

      <Path
        d="M29 36 C24 40 22 45 22 50 C22 55 24 60 29 64"
        stroke="url(#singingWave)"
        strokeWidth={1.7}
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* Right sound waves */}
      <Path
        d="M77 29 C86 36 90 43 90 50 C90 57 86 64 77 71"
        stroke="url(#singingWave)"
        strokeWidth={1.7}
        strokeLinecap="round"
        opacity={0.9}
      />

      <Path
        d="M71 36 C76 40 78 45 78 50 C78 55 76 60 71 64"
        stroke="url(#singingWave)"
        strokeWidth={1.7}
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* Microphone capsule */}
      <Path
        d="
          M50 13
          C41.8 13 36.5 19.2 36.5 27.2
          V46
          C36.5 54 41.8 60.2 50 60.2
          C58.2 60.2 63.5 54 63.5 46
          V27.2
          C63.5 19.2 58.2 13 50 13
          Z
        "
        fill="url(#singingGold)"
        stroke="#986019"
        strokeWidth={1.15}
        strokeLinejoin="round"
      />

      {/* Capsule inner surface */}
      <Path
        d="
          M50 15.5
          C43.1 15.5 39 20.7 39 27.4
          V45.8
          C39 52.8 43.1 57.8 50 57.8
          C56.9 57.8 61 52.8 61 45.8
          V27.4
          C61 20.7 56.9 15.5 50 15.5
          Z
        "
        fill="url(#singingDarkGold)"
        opacity={0.2}
      />

      {/* Microphone grille background */}
      <Path
        d="M38 27.5 H62 V46 H38 Z"
        fill="#171109"
        opacity={0.9}
      />

      {/* Grille horizontal lines */}
      <Path
        d="
          M39 29.5 H61
          M38.5 34 H61.5
          M38.5 38.5 H61.5
          M38.5 43 H61.5
          M39 47 H61
        "
        stroke="url(#singingGold)"
        strokeWidth={1.15}
        strokeLinecap="round"
      />

      {/* Grille vertical detail */}
      <Path
        d="M44 28 V47 M50 28 V47 M56 28 V47"
        stroke="#FFF0A0"
        strokeWidth={0.45}
        opacity={0.4}
      />

      {/* Capsule highlight */}
      <Path
        d="M40 23 C41.5 18.5 45 16.2 48 16"
        stroke="#FFF5C5"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* Capsule side highlights */}
      <Path
        d="M37.8 28 V46 C37.8 51.5 40.5 55.8 44.5 58"
        stroke="#FFF0A0"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.65}
      />

      <Path
        d="M62.2 28 V46 C62.2 51.5 59.5 55.8 55.5 58"
        stroke="#89500F"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.6}
      />

      {/* Microphone holder */}
      <Path
        d="
          M31.5 44
          V47
          C31.5 58.2 39.5 66.5 50 66.5
          C60.5 66.5 68.5 58.2 68.5 47
          V44
        "
        stroke="url(#singingGold)"
        strokeWidth={2.6}
        strokeLinecap="round"
      />

      {/* Holder inner highlight */}
      <Path
        d="M33.5 47 V48 C33.5 57.8 40.5 64 50 64"
        stroke="#FFF1A0"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.65}
      />

      {/* Holder side joints */}
      <Circle cx="31.5" cy="44" r="1.6" fill="url(#singingGold)" />
      <Circle cx="68.5" cy="44" r="1.6" fill="url(#singingGold)" />

      {/* Microphone stem */}
      <Rect
        x="47.8"
        y="65.5"
        width="4.4"
        height="10"
        rx="1.5"
        fill="url(#singingGold)"
      />

      {/* Stem highlight */}
      <Path
        d="M48.8 67 V74"
        stroke="#FFF3B0"
        strokeWidth={0.75}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* Stand collar */}
      <Path
        d="M41 76 L59 76 L61 80 H39 Z"
        fill="url(#singingGold)"
        stroke="#986019"
        strokeWidth={0.8}
        strokeLinejoin="round"
      />

      {/* Stand */}
      <Rect
        x="48.8"
        y="79"
        width="2.4"
        height="10"
        rx="1.2"
        fill="url(#singingGold)"
      />

      {/* Base */}
      <Path
        d="
          M36 90
          Q36 87.5 39 87.5
          H61
          Q64 87.5 64 90
          Q64 92.5 61 92.5
          H39
          Q36 92.5 36 90
          Z
        "
        fill="url(#singingGold)"
        stroke="#986019"
        strokeWidth={0.8}
      />

      {/* Base highlight */}
      <Path
        d="M40 89 H60"
        stroke="#FFF4B8"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* Small upper sparkle */}
      <Path
        d="
          M73 12
          C73.35 15 74 15.65 77 16
          C74 16.35 73.35 17 73 20
          C72.65 17 72 16.35 69 16
          C72 15.65 72.65 15 73 12
          Z
        "
        fill="url(#singingGold)"
        opacity={0.9}
      />

      <Circle cx="73" cy="16" r="0.65" fill="#FFFBE5" />
    </Svg>
  );
};

export default SingingIcon;
