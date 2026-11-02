import React from "react";
import Svg, {
  Path,
  Ellipse,
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const MagicIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="8.5 2.2 84.8 91"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="magicGold"
          x1="28"
          y1="78"
          x2="70"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#985A12" />
          <Stop offset="0.18" stopColor="#C98219" />
          <Stop offset="0.38" stopColor="#F5C84F" />
          <Stop offset="0.52" stopColor="#FFF0A0" />
          <Stop offset="0.68" stopColor="#EAB13A" />
          <Stop offset="0.86" stopColor={color} />
          <Stop offset="1" stopColor="#A96514" />
        </LinearGradient>

        <LinearGradient
          id="magicBrim"
          x1="20"
          y1="45"
          x2="80"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#B66D13" />
          <Stop offset="0.22" stopColor="#E8AA32" />
          <Stop offset="0.48" stopColor="#FFF0A0" />
          <Stop offset="0.62" stopColor="#FFD65B" />
          <Stop offset="0.82" stopColor="#D9901F" />
          <Stop offset="1" stopColor="#9C5D13" />
        </LinearGradient>

        <LinearGradient
          id="magicHat"
          x1="28"
          y1="48"
          x2="72"
          y2="82"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#A96513" />
          <Stop offset="0.2" stopColor="#E5A62E" />
          <Stop offset="0.42" stopColor="#FFD967" />
          <Stop offset="0.55" stopColor="#EAB33D" />
          <Stop offset="0.78" stopColor="#C27A18" />
          <Stop offset="1" stopColor="#70400D" />
        </LinearGradient>

        <LinearGradient
          id="magicHighlight"
          x1="38"
          y1="48"
          x2="48"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBE0" />
          <Stop offset="0.35" stopColor="#FFE78A" />
          <Stop offset="0.75" stopColor="#F2BE43" />
          <Stop offset="1" stopColor="#D78C1E" stopOpacity="0" />
        </LinearGradient>

        <LinearGradient
          id="magicWand"
          x1="46"
          y1="45"
          x2="83"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#A96814" />
          <Stop offset="0.2" stopColor="#E3A32A" />
          <Stop offset="0.42" stopColor="#FFF0A0" />
          <Stop offset="0.58" stopColor="#FFD65A" />
          <Stop offset="0.82" stopColor="#E2A02A" />
          <Stop offset="1" stopColor="#A76514" />
        </LinearGradient>

        <RadialGradient
          id="magicGlow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(47 45) rotate(90) scale(5)"
        >
          <Stop offset="0" stopColor="#FFFBE4" />
          <Stop offset="0.35" stopColor="#FFF0A0" />
          <Stop offset="0.7" stopColor="#FFD65A" stopOpacity="0.55" />
          <Stop offset="1" stopColor="#FFD65A" stopOpacity="0" />
        </RadialGradient>

        <LinearGradient
          id="magicOpening"
          x1="50"
          y1="43"
          x2="50"
          y2="51"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#050505" />
          <Stop offset="1" stopColor="#17120A" />
        </LinearGradient>
      </Defs>

      {/* Large upper sparkle */}
      <Path
        d="
          M61 4
          C61.8 11 64 13.2 71 14
          C64 14.8 61.8 17 61 24
          C60.2 17 58 14.8 51 14
          C58 13.2 60.2 11 61 4
          Z
        "
        fill="url(#magicGold)"
      />

      {/* Large left sparkle */}
      <Path
        d="
          M36 14
          C36.7 19.8 38.4 21.7 44.2 22.5
          C38.4 23.2 36.7 25.1 36 31
          C35.3 25.1 33.6 23.2 27.8 22.5
          C33.6 21.7 35.3 19.8 36 14
          Z
        "
        fill="url(#magicGold)"
      />

      {/* Small left sparkle */}
      <Path
        d="
          M22.5 28
          C22.9 31.6 24 32.7 27.5 33.2
          C24 33.7 22.9 34.8 22.5 38.5
          C22.1 34.8 21 33.7 17.5 33.2
          C21 32.7 22.1 31.6 22.5 28
          Z
        "
        fill="#FFE991"
      />

      {/* Small upper-right sparkle */}
      <Path
        d="
          M68.5 18
          C68.9 21.5 70 22.6 73.5 23
          C70 23.4 68.9 24.5 68.5 28
          C68.1 24.5 67 23.4 63.5 23
          C67 22.6 68.1 21.5 68.5 18
          Z
        "
        fill="#FFE68A"
      />

      {/* Right sparkle */}
      <Path
        d="
          M78 32
          C78.4 36.3 79.7 37.6 84 38
          C79.7 38.4 78.4 39.7 78 44
          C77.6 39.7 76.3 38.4 72 38
          C76.3 37.6 77.6 36.3 78 32
          Z
        "
        fill="url(#magicGold)"
      />

      {/* Tiny floating sparkles */}
      <Circle
        cx="47"
        cy="25"
        r="1.1"
        fill="#FFF1A0"
      />

      <Circle
        cx="57"
        cy="29"
        r="0.8"
        fill="#FFD968"
      />

      <Circle
        cx="83"
        cy="22"
        r="0.7"
        fill="#FFD968"
      />

      {/* Hat crown */}
      <Path
        d="
          M31 45
          C31.8 51.8 32 59.2 31.6 66
          C31.2 71.5 30.5 76.4 29.6 79.4
          C34.5 82.3 41.8 83.8 50 84
          C58.2 83.8 65.5 82.3 70.4 79.4
          C69.5 76.4 68.8 71.5 68.4 66
          C68 59.2 68.2 51.8 69 45
          Z
        "
        fill="url(#magicHat)"
      />

      {/* Bright crown face */}
      <Path
        d="
          M35 46
          C35.2 54 35.4 62.8 35 68.5
          C34.7 73.6 34.2 76.9 33.5 78.5
          C37.2 80.4 41.3 81.5 45.4 81.9
          C43.5 75.7 43 68.1 43.3 61
          C43.5 55 44.4 49.8 45.6 45
          Z
        "
        fill="url(#magicHighlight)"
        opacity={0.72}
      />

      {/* Dark right-side crown shading */}
      <Path
        d="
          M60.5 45
          C64 53.7 65.1 64.8 64.2 73.1
          C63.7 77 62.7 79.6 61.7 81.1
          C65 80.6 67.7 79.8 70.1 78.7
          C69 70.8 68.4 61.4 68.5 53.1
          C68.5 49.7 68.7 47 69 45
          Z
        "
        fill="#70400D"
        opacity={0.38}
      />

      {/* Hat opening */}
      <Ellipse
        cx="50"
        cy="43.8"
        rx="24.5"
        ry="7.1"
        fill="url(#magicOpening)"
      />

      <Ellipse
        cx="50"
        cy="43.8"
        rx="23.2"
        ry="5.8"
        fill="#090806"
        opacity={0.95}
      />

      {/* Hat brim */}
      <Path
        d="
          M25.5 38.7
          C18.8 39.4 13.7 41.3 11.7 43.7
          C9.7 46.1 12.7 49.1 18.2 51.1
          C25.9 53.9 37.3 55.1 50 55.1
          C62.7 55.1 74.1 53.9 81.8 51.1
          C87.3 49.1 90.3 46.1 88.3 43.7
          C86.3 41.3 81.2 39.4 74.5 38.7
          C67.8 37.9 59.3 37.5 50 37.5
          C40.7 37.5 32.2 37.9 25.5 38.7
          Z
        "
        fill="url(#magicBrim)"
      />

      {/* Opening on top of brim */}
      <Ellipse
        cx="50"
        cy="43.4"
        rx="24.2"
        ry="6.5"
        fill="url(#magicOpening)"
      />

      {/* Bright front brim */}
      <Path
        d="
          M13 45.1
          C18.3 49.8 32.8 52.4 50 52.4
          C67.2 52.4 81.7 49.8 87 45.1
          C86.2 49.5 72.3 54 50 54
          C27.7 54 13.8 49.5 13 45.1
          Z
        "
        fill="#E8AC32"
        opacity={0.82}
      />

      {/* Front brim highlight */}
      <Path
        d="
          M17 46.2
          C24 50.2 36.5 51.8 50 51.8
          C63.5 51.8 76 50.2 83 46.2
          C78.3 50.3 65.9 53 50 53
          C34.1 53 21.7 50.3 17 46.2
          Z
        "
        fill="#FFF0A0"
        opacity={0.28}
      />

      {/* Wand shadow */}
      <Path
        d="M48 44.8 L81.7 15.8"
        stroke="#9A5A12"
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* Main wand */}
      <Path
        d="M47.7 43.7 L81.8 14.8"
        stroke="url(#magicWand)"
        strokeWidth={4.2}
        strokeLinecap="round"
      />

      {/* Wand bright edge */}
      <Path
        d="M49.1 42.5 L80.9 15.6"
        stroke="#FFF1A0"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* Wand tip */}
      <Circle
        cx="47.5"
        cy="43.8"
        r="3.2"
        fill="url(#magicGlow)"
      />

      <Circle
        cx="47.5"
        cy="43.8"
        r="1.6"
        fill="#FFFBE7"
      />

      {/* Tiny wand sparkle */}
      <Circle
        cx="50.5"
        cy="40.7"
        r="0.75"
        fill="#FFFBE7"
        opacity={0.9}
      />
    </Svg>
  );
};

export default MagicIcon;