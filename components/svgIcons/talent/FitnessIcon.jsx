import React from "react";
import Svg, {
  Path,
  Rect,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const FitnessIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="5 4 90 92"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="fitnessGold"
          x1="20"
          y1="82"
          x2="78"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8A4C0D" />
          <Stop offset="0.14" stopColor="#C77B18" />
          <Stop offset="0.3" stopColor="#F4BD3E" />
          <Stop offset="0.45" stopColor="#FFF1A0" />
          <Stop offset="0.58" stopColor="#FFD45A" />
          <Stop offset="0.74" stopColor="#D99020" />
          <Stop offset="0.88" stopColor={color} />
          <Stop offset="1" stopColor="#8C4E0D" />
        </LinearGradient>

        <LinearGradient
          id="fitnessPlate"
          x1="18"
          y1="34"
          x2="34"
          y2="66"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8B4C0C" />
          <Stop offset="0.16" stopColor="#D48A1D" />
          <Stop offset="0.34" stopColor="#FFE274" />
          <Stop offset="0.48" stopColor="#FFF4AA" />
          <Stop offset="0.62" stopColor="#EAB13A" />
          <Stop offset="0.82" stopColor="#B96D13" />
          <Stop offset="1" stopColor="#70400A" />
        </LinearGradient>

        <LinearGradient
          id="fitnessPlateFace"
          x1="25"
          y1="38"
          x2="25"
          y2="62"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF0A0" />
          <Stop offset="0.22" stopColor="#F5C343" />
          <Stop offset="0.5" stopColor="#B96D12" />
          <Stop offset="0.78" stopColor="#E4A12B" />
          <Stop offset="1" stopColor="#7C430B" />
        </LinearGradient>

        <LinearGradient
          id="fitnessBar"
          x1="42"
          y1="46"
          x2="58"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#9A5710" />
          <Stop offset="0.18" stopColor="#E1A02A" />
          <Stop offset="0.4" stopColor="#FFF0A0" />
          <Stop offset="0.55" stopColor="#FFD45A" />
          <Stop offset="0.78" stopColor="#D58A1C" />
          <Stop offset="1" stopColor="#8C4E0D" />
        </LinearGradient>

        <LinearGradient
          id="fitnessGrip"
          x1="47"
          y1="43"
          x2="53"
          y2="57"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#70400A" />
          <Stop offset="0.18" stopColor="#B86D13" />
          <Stop offset="0.35" stopColor="#F0B83E" />
          <Stop offset="0.5" stopColor="#FFE88A" />
          <Stop offset="0.65" stopColor="#D9901F" />
          <Stop offset="0.84" stopColor="#A35E0E" />
          <Stop offset="1" stopColor="#613708" />
        </LinearGradient>

        <LinearGradient
          id="fitnessArc"
          x1="8"
          y1="50"
          x2="92"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8D4E0D" />
          <Stop offset="0.18" stopColor="#D78D20" />
          <Stop offset="0.42" stopColor="#FFE37A" />
          <Stop offset="0.5" stopColor="#FFF5B0" />
          <Stop offset="0.58" stopColor="#FFE37A" />
          <Stop offset="0.82" stopColor="#D78D20" />
          <Stop offset="1" stopColor="#8D4E0D" />
        </LinearGradient>

        <RadialGradient
          id="fitnessStar"
          cx="50"
          cy="50"
          r="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBE4" />
          <Stop offset="0.22" stopColor="#FFF0A0" />
          <Stop offset="0.48" stopColor="#FFD45A" />
          <Stop offset="0.72" stopColor="#D88D20" />
          <Stop offset="1" stopColor="#8B4D0C" />
        </RadialGradient>

        <RadialGradient
          id="fitnessGlow"
          cx="50"
          cy="50"
          r="40"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF5B0" stopOpacity={0.32} />
          <Stop offset="0.4" stopColor="#FFD65A" stopOpacity={0.12} />
          <Stop offset="1" stopColor="#C47714" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* Outer energy arcs */}
      <Path
        d="
          M17 35
          C21 22.8 33.2 13.8 47.2 11.8
          C61.8 9.7 76.4 15.3 84.2 27
        "
        stroke="url(#fitnessArc)"
        strokeWidth={2.1}
        strokeLinecap="round"
        fill="none"
      />

      <Path
        d="
          M83 65
          C79 77.2 66.8 86.2 52.8 88.2
          C38.2 90.3 23.6 84.7 15.8 73
        "
        stroke="url(#fitnessArc)"
        strokeWidth={2.1}
        strokeLinecap="round"
        fill="none"
      />

      <Path
        d="
          M18.8 34
          C23.8 22.8 34.7 15.5 47.3 13.8
        "
        stroke="#FFF0A0"
        strokeWidth={0.7}
        strokeLinecap="round"
        fill="none"
        opacity={0.65}
      />

      <Path
        d="
          M81.2 66
          C76.2 77.2 65.3 84.5 52.7 86.2
        "
        stroke="#FFF0A0"
        strokeWidth={0.7}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />

      {/* Top sparkle */}
      <Path
        d="
          M50 5
          C50.7 10.6 52.2 12.1 57.8 12.8
          C52.2 13.5 50.7 15 50 20.6
          C49.3 15 47.8 13.5 42.2 12.8
          C47.8 12.1 49.3 10.6 50 5
          Z
        "
        fill="url(#fitnessStar)"
      />

      <Circle
        cx="50"
        cy="12.8"
        r="1"
        fill="#FFFBE5"
        opacity={0.95}
      />

      {/* Upper-left sparkle */}
      <Path
        d="
          M32 17
          C32.45 20.8 33.5 21.8 37.3 22.3
          C33.5 22.8 32.45 23.8 32 27.6
          C31.55 23.8 30.5 22.8 26.7 22.3
          C30.5 21.8 31.55 20.8 32 17
          Z
        "
        fill="url(#fitnessStar)"
      />

      {/* Upper-right sparkle */}
      <Path
        d="
          M68 18
          C68.4 21.4 69.4 22.4 72.8 22.8
          C69.4 23.2 68.4 24.2 68 27.6
          C67.6 24.2 66.6 23.2 63.2 22.8
          C66.6 22.4 67.6 21.4 68 18
          Z
        "
        fill="url(#fitnessStar)"
      />

      {/* Center glow */}
      <Circle
        cx="50"
        cy="50"
        r="31"
        fill="url(#fitnessGlow)"
      />

      {/* Left outer collar */}
      <Rect
        x="10.5"
        y="44.2"
        width="7"
        height="11.6"
        rx="2.8"
        fill="url(#fitnessGold)"
      />

      <Path
        d="M12 45.5 H16"
        stroke="#FFF1A0"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Left weight plates */}
      <Ellipse
        cx="22"
        cy="50"
        rx="7.6"
        ry="15"
        fill="url(#fitnessPlate)"
      />

      <Ellipse
        cx="27"
        cy="50"
        rx="6.8"
        ry="14.2"
        fill="url(#fitnessPlate)"
      />

      <Ellipse
        cx="32"
        cy="50"
        rx="7"
        ry="15.8"
        fill="url(#fitnessPlateFace)"
      />

      <Ellipse
        cx="32"
        cy="50"
        rx="5.6"
        ry="14.2"
        fill="none"
        stroke="#8A4D0D"
        strokeWidth={1.1}
        opacity={0.8}
      />

      <Path
        d="
          M28.2 38.5
          C25.9 44.5 25.9 55.5 28.2 61.5
        "
        stroke="#FFF2A0"
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={0.65}
      />

      {/* Right weight plates */}
      <Ellipse
        cx="68"
        cy="50"
        rx="7"
        ry="15.8"
        fill="url(#fitnessPlateFace)"
      />

      <Ellipse
        cx="73"
        cy="50"
        rx="6.8"
        ry="14.2"
        fill="url(#fitnessPlate)"
      />

      <Ellipse
        cx="78"
        cy="50"
        rx="7.6"
        ry="15"
        fill="url(#fitnessPlate)"
      />

      <Ellipse
        cx="68"
        cy="50"
        rx="5.6"
        ry="14.2"
        fill="none"
        stroke="#8A4D0D"
        strokeWidth={1.1}
        opacity={0.8}
      />

      <Path
        d="
          M71.8 38.5
          C74.1 44.5 74.1 55.5 71.8 61.5
        "
        stroke="#FFF2A0"
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={0.65}
      />

      {/* Main bar */}
      <Rect
        x="31"
        y="47"
        width="38"
        height="6"
        rx="3"
        fill="url(#fitnessBar)"
      />

      <Path
        d="M34 48.1 H66"
        stroke="#FFF6B8"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.72}
      />

      {/* Left inner collar */}
      <Ellipse
        cx="35"
        cy="50"
        rx="3.3"
        ry="6.5"
        fill="url(#fitnessGold)"
      />

      <Ellipse
        cx="35"
        cy="50"
        rx="1.8"
        ry="4.5"
        fill="#8B4D0C"
        opacity={0.65}
      />

      {/* Right inner collar */}
      <Ellipse
        cx="65"
        cy="50"
        rx="3.3"
        ry="6.5"
        fill="url(#fitnessGold)"
      />

      <Ellipse
        cx="65"
        cy="50"
        rx="1.8"
        ry="4.5"
        fill="#8B4D0C"
        opacity={0.65}
      />

      {/* Center knurled grip */}
      <Rect
        x="43"
        y="44.3"
        width="14"
        height="11.4"
        rx="3"
        fill="url(#fitnessGrip)"
      />

      <Rect
        x="43.5"
        y="44.8"
        width="13"
        height="10.4"
        rx="2.5"
        fill="none"
        stroke="#8A4D0C"
        strokeWidth={0.8}
        opacity={0.8}
      />

      {/* Knurling */}
      <Path
        d="
          M44.5 46 L48 49.5
          M47 45 L51 49
          M50 45 L54 49
          M53 45 L56 48
          M44.5 51 L48 54.5
          M47 50 L51 54
          M50 50 L54 54
          M53 50 L56 53
        "
        stroke="#FFF0A0"
        strokeWidth={0.65}
        strokeLinecap="round"
        opacity={0.48}
      />

      <Path
        d="M45 45.8 H55"
        stroke="#FFFBE0"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Outer weight caps */}
      <Rect
        x="7.5"
        y="46"
        width="4.5"
        height="8"
        rx="2"
        fill="url(#fitnessGold)"
      />

      <Rect
        x="88"
        y="46"
        width="4.5"
        height="8"
        rx="2"
        fill="url(#fitnessGold)"
      />

      {/* Bottom sparkle */}
      <Path
        d="
          M50 78
          C50.7 83.6 52.2 85.1 57.8 85.8
          C52.2 86.5 50.7 88 50 93.6
          C49.3 88 47.8 86.5 42.2 85.8
          C47.8 85.1 49.3 83.6 50 78
          Z
        "
        fill="url(#fitnessStar)"
      />

      <Circle
        cx="50"
        cy="85.8"
        r="1"
        fill="#FFFBE5"
        opacity={0.95}
      />

      {/* Bottom-left sparkle */}
      <Path
        d="
          M32 76
          C32.4 79.4 33.4 80.4 36.8 80.8
          C33.4 81.2 32.4 82.2 32 85.6
          C31.6 82.2 30.6 81.2 27.2 80.8
          C30.6 80.4 31.6 79.4 32 76
          Z
        "
        fill="url(#fitnessStar)"
      />

      {/* Bottom-right sparkle */}
      <Path
        d="
          M68 75
          C68.4 78.4 69.4 79.4 72.8 79.8
          C69.4 80.2 68.4 81.2 68 84.6
          C67.6 81.2 66.6 80.2 63.2 79.8
          C66.6 79.4 67.6 78.4 68 75
          Z
        "
        fill="url(#fitnessStar)"
      />

      {/* Final highlights */}
      <Circle
        cx="17"
        cy="35"
        r="0.8"
        fill="#FFFBE5"
        opacity={0.85}
      />

      <Circle
        cx="83"
        cy="65"
        r="0.8"
        fill="#FFFBE5"
        opacity={0.75}
      />
    </Svg>
  );
};

export default FitnessIcon;