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

const FireIcon = ({
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
        {/* Outer fire */}
        <LinearGradient
          id="fireOuter"
          x1="35"
          y1="87"
          x2="69"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FF4A08" />
          <Stop offset="0.18" stopColor="#FF7410" />
          <Stop offset="0.38" stopColor="#FF9D18" />
          <Stop offset="0.58" stopColor="#FF6A08" />
          <Stop offset="0.78" stopColor="#FF9D18" />
          <Stop offset="1" stopColor="#FF4B05" />
        </LinearGradient>

        {/* Deep red/orange flame edges */}
        <LinearGradient
          id="fireRed"
          x1="72"
          y1="83"
          x2="53"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#C52B05" />
          <Stop offset="0.3" stopColor="#F04406" />
          <Stop offset="0.62" stopColor="#FF7110" />
          <Stop offset="1" stopColor="#FF9D1C" />
        </LinearGradient>

        {/* Main yellow flame */}
        <LinearGradient
          id="fireYellow"
          x1="39"
          y1="86"
          x2="56"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFB300" />
          <Stop offset="0.2" stopColor="#FFD21C" />
          <Stop offset="0.42" stopColor="#FFF15A" />
          <Stop offset="0.62" stopColor="#FFE45A" />
          <Stop offset="0.82" stopColor="#FFB719" />
          <Stop offset="1" stopColor="#FF7B08" />
        </LinearGradient>

        {/* White-hot center */}
        <LinearGradient
          id="fireCore"
          x1="46"
          y1="87"
          x2="49"
          y2="41"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF3A0" />
          <Stop offset="0.25" stopColor="#FFF9C7" />
          <Stop offset="0.5" stopColor="#FFFDE4" />
          <Stop offset="0.72" stopColor="#FFF5A0" />
          <Stop offset="1" stopColor="#FFD43A" />
        </LinearGradient>

        {/* Gold pedestal */}
        <LinearGradient
          id="fireBaseGold"
          x1="23"
          y1="88"
          x2="76"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#7D4308" />
          <Stop offset="0.12" stopColor="#C9790D" />
          <Stop offset="0.28" stopColor="#FFD34D" />
          <Stop offset="0.45" stopColor="#FFF0A0" />
          <Stop offset="0.58" stopColor="#E89A18" />
          <Stop offset="0.78" stopColor="#B96509" />
          <Stop offset="1" stopColor="#6F3A06" />
        </LinearGradient>

        <LinearGradient
          id="fireBaseSide"
          x1="25"
          y1="78"
          x2="76"
          y2="91"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8A4907" />
          <Stop offset="0.2" stopColor="#D77F0C" />
          <Stop offset="0.42" stopColor="#FFCB3C" />
          <Stop offset="0.6" stopColor="#E79516" />
          <Stop offset="0.82" stopColor="#A95806" />
          <Stop offset="1" stopColor="#703805" />
        </LinearGradient>

        {/* Flame glow */}
        <RadialGradient
          id="fireGlow"
          cx="50"
          cy="67"
          r="39"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF5A0" stopOpacity="0.95" />
          <Stop offset="0.28" stopColor="#FFB300" stopOpacity="0.55" />
          <Stop offset="0.58" stopColor="#FF6205" stopOpacity="0.25" />
          <Stop offset="1" stopColor="#FF4500" stopOpacity="0" />
        </RadialGradient>

        <RadialGradient
          id="emberGlow"
          cx="50"
          cy="50"
          r="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBCB" />
          <Stop offset="0.3" stopColor="#FFE23B" />
          <Stop offset="0.7" stopColor="#FF8A0A" />
          <Stop offset="1" stopColor="#FF4500" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Ambient fire glow */}
      <Ellipse
        cx="50"
        cy="64"
        rx="34"
        ry="31"
        fill="url(#fireGlow)"
      />

      {/* Floating embers */}
      <Circle
        cx="23"
        cy="48"
        r="1.8"
        fill="url(#emberGlow)"
      />

      <Circle
        cx="29"
        cy="31"
        r="1.35"
        fill="url(#emberGlow)"
      />

      <Circle
        cx="39"
        cy="19"
        r="1.15"
        fill="url(#emberGlow)"
      />

      <Circle
        cx="64"
        cy="18"
        r="1.2"
        fill="url(#emberGlow)"
      />

      <Circle
        cx="76"
        cy="39"
        r="1.8"
        fill="url(#emberGlow)"
      />

      <Circle
        cx="82"
        cy="54"
        r="1.1"
        fill="url(#emberGlow)"
      />

      <Circle
        cx="27"
        cy="61"
        r="1"
        fill="#FFF3A0"
        opacity="0.9"
      />

      <Circle
        cx="73"
        cy="27"
        r="0.9"
        fill="#FFF3A0"
        opacity="0.85"
      />

      {/* Small detached flame tongue - left */}
      <Path
        d="
          M30 53
          C25 48 25 42 29 37
          C29.5 42 32 44 34 46
          C35 49 33 52 30 53
          Z
        "
        fill="url(#fireOuter)"
      />

      {/* Small detached flame tongue - upper left */}
      <Path
        d="
          M35 32
          C32 28 34 23 38 20
          C37 25 39 27 40 29
          C39 31 37 32 35 32
          Z
        "
        fill="url(#fireYellow)"
      />

      {/* Main outer flame silhouette */}
      <Path
        d="
          M50 87
          C37 87 27 79 25 67
          C23 56 28 47 35 40
          C41 34 43 27 42 19
          C49 25 52 31 51 38
          C57 31 62 22 61 12
          C69 22 71 32 67 42
          C64 49 65 53 71 58
          C78 65 78 76 71 82
          C66 87 59 89 50 87
          Z
        "
        fill="url(#fireOuter)"
      />

      {/* Deep red right flame ribbon */}
      <Path
        d="
          M58 84
          C67 80 71 73 69 65
          C67 59 61 55 60 49
          C59 43 63 36 67 29
          C68 39 66 46 70 52
          C74 58 80 64 78 72
          C77 80 69 86 58 88
          Z
        "
        fill="url(#fireRed)"
      />

      {/* Left orange flame ribbon */}
      <Path
        d="
          M42 85
          C32 81 28 74 29 66
          C30 58 36 53 40 47
          C44 41 44 35 42 29
          C50 37 52 45 49 52
          C46 59 41 63 41 70
          C41 76 45 81 48 85
          Z
        "
        fill="url(#fireYellow)"
      />

      {/* Tall central flame */}
      <Path
        d="
          M49 87
          C41 81 39 74 41 67
          C43 60 49 57 52 50
          C55 43 52 36 51 30
          C59 38 62 47 58 55
          C55 61 57 65 61 70
          C65 77 59 84 49 87
          Z
        "
        fill="url(#fireYellow)"
      />

      {/* Long sweeping upper flame */}
      <Path
        d="
          M51 67
          C48 58 48 50 53 44
          C58 38 64 34 64 25
          C64 20 63 16 62 12
          C70 24 70 34 66 42
          C62 51 57 54 58 62
          C59 67 57 71 51 76
          Z
        "
        fill="url(#fireOuter)"
      />

      {/* Bright left inner flame */}
      <Path
        d="
          M48 85
          C43 79 43 72 46 66
          C49 60 54 56 55 50
          C56 45 54 40 52 36
          C61 44 62 51 58 58
          C55 63 52 67 53 73
          C54 78 52 82 48 85
          Z
        "
        fill="url(#fireCore)"
      />

      {/* White-hot central core */}
      <Path
        d="
          M49 87
          C45 81 45 75 47 70
          C49 65 53 61 53 56
          C53 51 50 47 49 43
          C46 51 42 57 43 64
          C43 70 46 76 49 87
          Z
        "
        fill="url(#fireCore)"
      />

      {/* Core highlight */}
      <Path
        d="
          M49 82
          C47 77 47 73 49 69
          C51 65 52 62 52 59
          C49 64 47 68 47 73
          C47 77 48 80 49 82
          Z
        "
        fill="#FFFDEB"
        opacity="0.9"
      />

      {/* Bright flame edge highlights */}
      <Path
        d="
          M35 73
          C31 65 33 58 39 51
          C43 46 45 40 44 35
        "
        stroke="#FFE978"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      <Path
        d="
          M62 77
          C68 70 67 64 63 59
          C60 55 60 51 63 46
        "
        stroke="#FFD84A"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Tiny flame sparks */}
      <Path
        d="
          M25 40
          C22 37 23 34 26 31
          C26 35 28 37 25 40
          Z
        "
        fill="#FFB313"
      />

      <Path
        d="
          M75 47
          C72 44 74 41 77 39
          C76 43 78 45 75 47
          Z
        "
        fill="#FFD43B"
      />

      {/* Fire basin opening */}
      <Ellipse
        cx="50"
        cy="81"
        rx="27"
        ry="7.5"
        fill="#5A2C04"
      />

      <Ellipse
        cx="50"
        cy="79.8"
        rx="24.5"
        ry="5.7"
        fill="#180D02"
      />

      <Ellipse
        cx="50"
        cy="80"
        rx="21"
        ry="4.2"
        fill="#FF9E13"
        opacity="0.65"
      />

      {/* Flame overlaps basin */}
      <Path
        d="
          M32 78
          C36 84 43 87 50 87
          C58 87 65 84 68 78
          C63 81 57 83 50 83
          C43 83 37 81 32 78
          Z
        "
        fill="url(#fireOuter)"
      />

      {/* Premium gold pedestal top */}
      <Path
        d="
          M20 78
          C20 73.5 33.4 70 50 70
          C66.6 70 80 73.5 80 78
          C80 82.5 66.6 86 50 86
          C33.4 86 20 82.5 20 78
          Z
        "
        fill="url(#fireBaseGold)"
      />

      {/* Inner pedestal ring */}
      <Ellipse
        cx="50"
        cy="77.5"
        rx="25.5"
        ry="6"
        fill="#5E3106"
      />

      <Ellipse
        cx="50"
        cy="76.8"
        rx="23"
        ry="4.4"
        fill="#FFCC43"
      />

      <Ellipse
        cx="50"
        cy="76.4"
        rx="20"
        ry="3.1"
        fill="#241203"
      />

      {/* Front pedestal body */}
      <Path
        d="
          M20 78
          C22 83.2 34 87.8 50 87.8
          C66 87.8 78 83.2 80 78
          V86
          C79 91 66 95 50 95
          C34 95 21 91 20 86
          Z
        "
        fill="url(#fireBaseSide)"
      />

      {/* Pedestal lower lip */}
      <Path
        d="
          M27 90
          C31 93.5 39 95.5 50 95.5
          C61 95.5 69 93.5 73 90
          L70 94
          C66 97 58 98 50 98
          C42 98 34 97 30 94
          Z
        "
        fill="url(#fireBaseGold)"
      />

      {/* Pedestal top highlight */}
      <Path
        d="
          M25 77
          C30 73.7 39 72 50 72
          C61 72 70 73.7 75 77
        "
        stroke="#FFF0A0"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Pedestal front highlight */}
      <Path
        d="
          M28 84
          C35 88 43 89.5 50 89.5
          C57 89.5 65 88 72 84
        "
        stroke="#FFD95B"
        strokeWidth="1.15"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Gold glints */}
      <Circle
        cx="31"
        cy="82"
        r="1"
        fill="#FFF7BF"
        opacity="0.95"
      />

      <Circle
        cx="69"
        cy="82"
        r="0.8"
        fill="#FFF7BF"
        opacity="0.9"
      />

      {/* Small ember above flame */}
      <Circle
        cx="55"
        cy="9"
        r="0.85"
        fill="#FFD83D"
        opacity="0.9"
      />
    </Svg>
  );
};

export default FireIcon;