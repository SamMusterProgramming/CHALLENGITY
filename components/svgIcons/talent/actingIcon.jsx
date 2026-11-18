
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

const ActingIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="21.5 3.2 57.5 86.8"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="actingGold"
          x1="20"
          y1="18"
          x2="82"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8F5110" />
          <Stop offset="0.12" stopColor="#D58B20" />
          <Stop offset="0.27" stopColor="#FFD95B" />
          <Stop offset="0.43" stopColor="#FFF3A0" />
          <Stop offset="0.55" stopColor="#F5C13F" />
          <Stop offset="0.72" stopColor="#D98C20" />
          <Stop offset="0.88" stopColor={color} />
          <Stop offset="1" stopColor="#8D5010" />
        </LinearGradient>

        <RadialGradient
          id="actingGlow"
          cx="50"
          cy="43"
          r="38"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF5B0" stopOpacity={0.8} />
          <Stop offset="0.4" stopColor="#FFD95A" stopOpacity={0.4} />
          <Stop offset="1" stopColor="#A45E12" stopOpacity={0} />
        </RadialGradient>

        <LinearGradient
          id="actingShadow"
          x1="30"
          y1="30"
          x2="72"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#F6BD3C" />
          <Stop offset="0.45" stopColor="#C87915" />
          <Stop offset="1" stopColor="#7C430B" />
        </LinearGradient>
      </Defs>

      {/* Back tragedy mask */}
      <Path
        d="
          M53 17
          C66 13 76 22 76 36
          C76 49 70 61 60 68
          C58 69 56 69 55 67
          C49 58 46 47 46 35
          C46 26 48 20 53 17 Z
        "
        fill="url(#actingGold)"
      />

      <Path
        d="
          M55 20
          C66 17 73 25 73 37
          C73 48 68 58 59 64
          C54 54 52 43 52 34
          C52 27 53 23 55 20 Z
        "
        fill="url(#actingGlow)"
      />

      {/* Tragedy eye */}
      <Path
        d="M55 35 Q62 30 68 35 Q62 40 55 35 Z"
        fill="#090A08"
      />

      {/* Tragedy tear */}
      <Path
        d="M62 41 C58 47 59 50 62 51 C65 50 66 47 62 41 Z"
        fill="url(#actingShadow)"
      />

      {/* Tragedy mouth */}
      <Path
        d="M56 53 Q62 48 68 53 Q62 60 56 53 Z"
        fill="#090A08"
      />

      {/* Front comedy mask */}
      <Path
        d="
          M47 21
          C34 17 24 26 24 40
          C24 54 31 67 42 75
          C45 77 47 77 49 75
          C59 67 65 54 65 40
          C65 26 58 21 47 21 Z
        "
        fill="url(#actingGold)"
      />

      {/* Comedy mask face glow */}
      <Path
        d="
          M46 24
          C35 21 28 29 28 41
          C28 53 34 65 44 71
          C54 63 61 52 61 40
          C61 29 55 24 46 24 Z
        "
        fill="url(#actingGlow)"
        opacity={0.8}
      />

      {/* Comedy eyes */}
      <Path
        d="M29 39 Q36 32 43 39 Q36 44 29 39 Z"
        fill="#090A08"
      />
      <Path
        d="M46 39 Q53 32 60 39 Q53 44 46 39 Z"
        fill="#090A08"
      />

      {/* Comedy smiling mouth */}
      <Path
        d="
          M31 51
          Q45 62 59 51
          C56 64 51 69 45 69
          C39 69 34 64 31 51 Z
        "
        fill="#090A08"
      />

      {/* Smile highlight */}
      <Path
        d="M34 54 Q45 60 56 54"
        stroke="#FFF3A0"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Small top reflection */}
      <Path
        d="M34 29 Q40 24 46 25"
        stroke="#FFF4AF"
        strokeWidth={1.6}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Bottom gold reflection */}
      <Path
        d="M36 72 Q44 78 49 73"
        stroke="#FFF1A0"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.6}
      />

      {/* Decorative glint */}
      <Path
        d="
          M76 7
          C76.5 11 78 12 82 12.5
          C78 13 76.5 14.5 76 18.5
          C75.5 14.5 74 13 70 12.5
          C74 12 75.5 11 76 7 Z
        "
        fill="url(#actingGold)"
      />
    </Svg>
  );
};

export default ActingIcon;
