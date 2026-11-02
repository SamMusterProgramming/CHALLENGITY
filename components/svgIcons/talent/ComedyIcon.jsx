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

const ComedyIcon = ({
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
        {/* Main metallic gold */}
        <LinearGradient
          id="maskGold"
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

        {/* Face center glow */}
        <RadialGradient
          id="faceGlow"
          cx="50"
          cy="43"
          r="38"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF5B0" stopOpacity={0.9} />
          <Stop offset="0.3" stopColor="#FFD95A" stopOpacity={0.62} />
          <Stop offset="0.7" stopColor="#E6A12B" stopOpacity={0.2} />
          <Stop offset="1" stopColor="#A45E12" stopOpacity={0} />
        </RadialGradient>

        {/* Dark gold shadow */}
        <LinearGradient
          id="maskShadow"
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

        {/* Reflection */}
        <LinearGradient
          id="reflection"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.85} />
          <Stop offset="0.35" stopColor="#FFF5B0" stopOpacity={0.5} />
          <Stop offset="1" stopColor="#FFF5B0" stopOpacity={0} />
        </LinearGradient>
      </Defs>

      {/* Top sparkle */}
      <Path
        d="
          M69 5
          C69.5 10.1 71 11.7 76 12.3
          C71 12.9 69.5 14.5 69 19.6
          C68.5 14.5 67 12.9 62 12.3
          C67 11.7 68.5 10.1 69 5
          Z
        "
        fill="url(#maskGold)"
      />

      {/* Main gold mask */}
      <Path
        d="
          M50 16
          C34.2 16 23.5 27.3 23.5 43
          C23.5 61.5 32 76.8 47.2 87
          C48.3 87.8 49.3 88.5 50 88.5
          C50.7 88.5 51.7 87.8 52.8 87
          C68 76.8 76.5 61.5 76.5 43
          C76.5 27.3 65.8 16 50 16
          Z
        "
        fill="url(#maskGold)"
      />

      {/* Center gold texture / light */}
      <Path
        d="
          M50 18
          C37 18 27.5 28.2 27.5 43
          C27.5 59 34.5 72.8 48.2 82.5
          C49 83.1 49.6 83.5 50 83.5
          C50.4 83.5 51 83.1 51.8 82.5
          C65.5 72.8 72.5 59 72.5 43
          C72.5 28.2 63 18 50 18
          Z
        "
        fill="url(#faceGlow)"
        opacity={0.82}
      />

      {/* Left face volume */}
      <Path
        d="
          M28 28
          C24.8 35 25 44 27.2 52
          C30.2 63 36.2 72.8 45 79.8
          C37.2 68 34.5 54 35.2 41
          C35.7 34.7 38.1 28.6 42.2 22.5
          C36.5 23.5 31.5 25.5 28 28
          Z
        "
        fill="#FFF0A0"
        opacity={0.18}
      />

      {/* Right face shadow */}
      <Path
        d="
          M72 28
          C75.2 35 75 44 72.8 52
          C69.8 63 63.8 72.8 55 79.8
          C62.8 68 65.5 54 64.8 41
          C64.3 34.7 61.9 28.6 57.8 22.5
          C63.5 23.5 68.5 25.5 72 28
          Z
        "
        fill="#8B4D0B"
        opacity={0.18}
      />

      {/* Forehead highlight */}
      <Path
        d="
          M35 25
          C42 20.5 57 20.5 65 25
          C60 28 55 29.5 50 29.5
          C45 29.5 40 28 35 25
          Z
        "
        fill="#FFF4AF"
        opacity={0.26}
      />

      {/* Left happy eye */}
      <Path
        d="
          M31.5 41
          C35.8 34.5 43.8 33.5 48.2 39
          C44.6 42.3 37.2 43.8 31.5 41
          Z
        "
        fill="url(#maskShadow)"
      />

      <Path
        d="
          M34.5 40.5
          C38 37 42.8 36.8 46.2 39.5
          C43.2 42.3 38.1 42.9 34.5 40.5
          Z
        "
        fill="#090A08"
      />

      <Path
        d="
          M34.8 40.8
          C38.2 43.5 43.1 43.2 46.1 40
          C43.8 44.3 38.2 45.1 34.8 40.8
          Z
        "
        fill="#F7C747"
      />

      {/* Right happy eye */}
      <Path
        d="
          M51.8 39
          C56.2 33.5 64.2 34.5 68.5 41
          C62.8 43.8 55.4 42.3 51.8 39
          Z
        "
        fill="url(#maskShadow)"
      />

      <Path
        d="
          M53.8 39.5
          C57.2 36.8 62 37 65.5 40.5
          C61.9 42.9 56.8 42.3 53.8 39.5
          Z
        "
        fill="#090A08"
      />

      <Path
        d="
          M53.9 40
          C56.9 43.2 61.8 43.5 65.2 40.8
          C61.8 45.1 56.2 44.3 53.9 40
          Z
        "
        fill="#F7C747"
      />

      {/* Sculpted nose */}
      <Path
        d="
          M50 37
          C48.3 43.5 46.2 50 45.5 53.7
          C45 56.8 46.9 59 50 59
          C53.1 59 55 56.8 54.5 53.7
          C53.8 50 51.7 43.5 50 37
          Z
        "
        fill="url(#maskShadow)"
      />

      <Path
        d="
          M49.2 42
          C48.2 47 47.4 51 47.5 53.2
        "
        stroke="#FFF2A0"
        strokeWidth={1.3}
        strokeLinecap="round"
        opacity={0.65}
      />

      <Path
        d="
          M46.3 54.5
          C47.4 57 48.6 58 50 58
          C51.4 58 52.6 57 53.7 54.5
          C52.6 55.7 51.3 56.1 50 56.1
          C48.7 56.1 47.4 55.7 46.3 54.5
          Z
        "
        fill="#8D500D"
        opacity={0.6}
      />

      {/* Large smiling mouth */}
      <Path
        d="
          M31.5 55
          C36.3 64.2 42.4 68.8 50 68.8
          C57.6 68.8 63.7 64.2 68.5 55
          C67.6 69.8 61.3 78 50 78
          C38.7 78 32.4 69.8 31.5 55
          Z
        "
        fill="url(#maskShadow)"
      />

      {/* Open mouth */}
      <Path
        d="
          M35.5 59
          C39.3 62.8 44.2 64.8 50 64.8
          C55.8 64.8 60.7 62.8 64.5 59
          C62.7 68.8 57.7 73.6 50 73.6
          C42.3 73.6 37.3 68.8 35.5 59
          Z
        "
        fill="#080805"
      />

      {/* Teeth / upper smile */}
      <Path
        d="
          M37.5 59.8
          C41.1 62.4 45.2 63.6 50 63.6
          C54.8 63.6 58.9 62.4 62.5 59.8
          C60.5 64 56.3 66.2 50 66.2
          C43.7 66.2 39.5 64 37.5 59.8
          Z
        "
        fill="#FFF3A0"
      />

      <Path
        d="
          M40.5 61
          C43.4 62.4 46.5 63 50 63
          C53.5 63 56.6 62.4 59.5 61
        "
        stroke="#FFFBE5"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Lower mouth gold reflection */}
      <Path
        d="
          M40 69
          C43 72.4 46.3 73.8 50 73.8
          C53.7 73.8 57 72.4 60 69
          C57.7 73.5 54.3 76 50 76
          C45.7 76 42.3 73.5 40 69
          Z
        "
        fill="#C87515"
        opacity={0.55}
      />

      {/* Strong left reflection */}
      <Path
        d="
          M31 29
          C27.5 36 27 44 28.8 51
        "
        stroke="url(#reflection)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Small face glints */}
      <Circle
        cx="38"
        cy="29"
        r="1.25"
        fill="#FFFBE5"
        opacity={0.95}
      />

      <Circle
        cx="62.5"
        cy="25.5"
        r="0.8"
        fill="#FFFBE5"
        opacity={0.8}
      />

      {/* Bottom mask highlight */}
      <Path
        d="
          M42.5 82
          C45 84 47.5 85 50 85
          C52.5 85 55 84 57.5 82
        "
        stroke="#FFF1A0"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.55}
      />
    </Svg>
  );
};

export default ComedyIcon;