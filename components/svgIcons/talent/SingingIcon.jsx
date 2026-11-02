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

const SingingIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="5 3.5 90 83"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient
          id="singingGold"
          x1="30"
          y1="88"
          x2="70"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8F5110" />
          <Stop offset="0.15" stopColor="#D58B20" />
          <Stop offset="0.3" stopColor="#FFD95B" />
          <Stop offset="0.46" stopColor="#FFF3A0" />
          <Stop offset="0.6" stopColor="#F5C13F" />
          <Stop offset="0.8" stopColor={color} />
          <Stop offset="1" stopColor="#8D5010" />
        </LinearGradient>

        <LinearGradient
          id="grilleGold"
          x1="38"
          y1="25"
          x2="62"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8D500F" />
          <Stop offset="0.22" stopColor="#D58A20" />
          <Stop offset="0.5" stopColor="#FFE37A" />
          <Stop offset="0.75" stopColor="#D48A20" />
          <Stop offset="1" stopColor="#8D500F" />
        </LinearGradient>

        <LinearGradient
          id="waveGold"
          x1="5"
          y1="50"
          x2="95"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#955510" />
          <Stop offset="0.3" stopColor="#D99626" />
          <Stop offset="0.5" stopColor="#FFF0A0" />
          <Stop offset="0.7" stopColor="#D99626" />
          <Stop offset="1" stopColor="#955510" />
        </LinearGradient>

        <RadialGradient
          id="micGlow"
          cx="50"
          cy="36"
          r="32"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF7BE" stopOpacity={0.8} />
          <Stop offset="0.35" stopColor="#FFD85A" stopOpacity={0.35} />
          <Stop offset="1" stopColor="#C47714" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* Top sparkle */}
      <Path
        d="
          M31 5
          C31.6 10.1 33.1 11.7 38.2 12.3
          C33.1 12.9 31.6 14.5 31 19.6
          C30.4 14.5 28.9 12.9 23.8 12.3
          C28.9 11.7 30.4 10.1 31 5
          Z
        "
        fill="url(#singingGold)"
      />

      {/* LEFT WAVE 1 */}
      <Path
        d="
          M21 21
          C11.5 28.5 6 38.5 6 50
          C6 61.5 11.5 71.5 21 79
        "
        stroke="url(#waveGold)"
        strokeWidth={2.35}
        strokeLinecap="round"
        fill="none"
      />

      {/* LEFT WAVE 2 */}
      <Path
        d="
          M25 26
          C18.5 32.7 15.5 41 15.5 50
          C15.5 59 18.5 67.3 25 74
        "
        stroke="url(#waveGold)"
        strokeWidth={2.7}
        strokeLinecap="round"
        fill="none"
      />

      {/* LEFT WAVE 3 */}
      <Path
        d="
          M29 31
          C24.5 36.2 22.5 42.8 22.5 50
          C22.5 57.2 24.5 63.8 29 69
        "
        stroke="url(#waveGold)"
        strokeWidth={2.7}
        strokeLinecap="round"
        fill="none"
      />

      {/* RIGHT WAVE 3 */}
      <Path
        d="
          M71 31
          C75.5 36.2 77.5 42.8 77.5 50
          C77.5 57.2 75.5 63.8 71 69
        "
        stroke="url(#waveGold)"
        strokeWidth={2.7}
        strokeLinecap="round"
        fill="none"
      />

      {/* RIGHT WAVE 2 */}
      <Path
        d="
          M75 26
          C81.5 32.7 84.5 41 84.5 50
          C84.5 59 81.5 67.3 75 74
        "
        stroke="url(#waveGold)"
        strokeWidth={2.7}
        strokeLinecap="round"
        fill="none"
      />

      {/* RIGHT WAVE 1 */}
      <Path
        d="
          M79 21
          C88.5 28.5 94 38.5 94 50
          C94 61.5 88.5 71.5 79 79
        "
        stroke="url(#waveGold)"
        strokeWidth={2.35}
        strokeLinecap="round"
        fill="none"
      />

      {/* Microphone capsule */}
      <Path
        d="
          M50 16
          C43.5 16 39 20.8 39 27.2
          V47.2
          C39 53.7 43.5 58.5 50 58.5
          C56.5 58.5 61 53.7 61 47.2
          V27.2
          C61 20.8 56.5 16 50 16
          Z
        "
        fill="url(#singingGold)"
      />

      {/* Metallic center glow */}
      <Path
        d="
          M50 18
          C43.5 18 41 22.4 41 28
          V46
          C41 51.6 44.2 55.8 50 57
          C55.8 55.8 59 51.6 59 46
          V28
          C59 22.4 56.5 18 50 18
          Z
        "
        fill="url(#micGlow)"
        opacity={0.7}
      />

      {/* Microphone top highlight */}
      <Path
        d="
          M45.2 19
          C42.7 21.2 41.2 24.1 41.2 27.7
          V45.7
          C41.2 49.5 42.2 52 43.7 53.8
          V27
          C43.7 23.8 44.2 21.1 45.2 19
          Z
        "
        fill="#FFF4B0"
        opacity={0.42}
      />

      {/* Microphone grille */}
      <Rect
        x="37"
        y="27"
        width="26"
        height="3.2"
        rx="1.6"
        fill="url(#grilleGold)"
      />

      <Rect
        x="36"
        y="33.3"
        width="28"
        height="3.2"
        rx="1.6"
        fill="url(#grilleGold)"
      />

      <Rect
        x="36"
        y="39.6"
        width="28"
        height="3.2"
        rx="1.6"
        fill="url(#grilleGold)"
      />

      <Rect
        x="37"
        y="45.9"
        width="26"
        height="3.2"
        rx="1.6"
        fill="url(#grilleGold)"
      />

      {/* Dark grille gaps */}
      <Rect
        x="40"
        y="30.2"
        width="20"
        height="3.1"
        rx="1.55"
        fill="#090A08"
      />

      <Rect
        x="40"
        y="36.5"
        width="20"
        height="3.1"
        rx="1.55"
        fill="#090A08"
      />

      <Rect
        x="40"
        y="42.8"
        width="20"
        height="3.1"
        rx="1.55"
        fill="#090A08"
      />

      {/* Capsule edge highlights */}
      <Path
        d="
          M40.2 28
          V47
          C40.2 52.7 44.1 57.2 50 57.8
        "
        stroke="#FFF1A0"
        strokeWidth={1}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />

      <Path
        d="
          M59.8 28
          V47
          C59.8 52.7 55.9 57.2 50 57.8
        "
        stroke="#8A4E0D"
        strokeWidth={1}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />

      {/* U-shaped microphone holder */}
      <Path
        d="
          M34.5 43
          V48
          C34.5 57.7 41.2 64.8 50 64.8
          C58.8 64.8 65.5 57.7 65.5 48
          V43
        "
        stroke="url(#singingGold)"
        strokeWidth={3.3}
        strokeLinecap="round"
        fill="none"
      />

      {/* Holder highlight */}
      <Path
        d="
          M36.3 45
          V48
          C36.3 55.8 42 62.3 50 62.5
        "
        stroke="#FFF1A0"
        strokeWidth={0.9}
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />

      {/* Neck */}
      <Rect
        x="47"
        y="62.5"
        width="6"
        height="9"
        rx="1.2"
        fill="url(#singingGold)"
      />

      {/* Stand collar */}
      <Path
        d="
          M42.5 70
          H57.5
          L60 75
          H40
          Z
        "
        fill="url(#singingGold)"
      />

      {/* Collar highlight */}
      <Path
        d="M43.5 71 H56.5"
        stroke="#FFF1A0"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* Stand */}
      <Rect
        x="48.7"
        y="74"
        width="2.6"
        height="8"
        rx="1.3"
        fill="url(#singingGold)"
      />

      {/* Base */}
      <Path
        d="
          M35.5 82
          C35.5 80.4 36.8 79.2 38.4 79.2
          H61.6
          C63.2 79.2 64.5 80.4 64.5 82
          C64.5 83.6 63.2 84.8 61.6 84.8
          H38.4
          C36.8 84.8 35.5 83.6 35.5 82
          Z
        "
        fill="url(#singingGold)"
      />

      {/* Base highlight */}
      <Path
        d="M38.5 80.4 H61.5"
        stroke="#FFF1A0"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Metallic glints */}
      <Circle
        cx="55.5"
        cy="20.8"
        r="0.9"
        fill="#FFFBE5"
        opacity={0.95}
      />

      <Circle
        cx="43.5"
        cy="23.5"
        r="0.7"
        fill="#FFFBE5"
        opacity={0.65}
      />
    </Svg>
  );
};

export default SingingIcon;