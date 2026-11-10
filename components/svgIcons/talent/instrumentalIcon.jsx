
import React from "react";
import Svg, {
  Path,
  Circle,
  Rect,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const InstrumentalIcon = ({ size = 32, color = GOLD }) => {
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
          id="pianoGold"
          x1="15"
          y1="85"
          x2="85"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#89500F" />
          <Stop offset="0.25" stopColor="#C98725" />
          <Stop offset="0.48" stopColor="#FFE68A" />
          <Stop offset="0.7" stopColor={color} />
          <Stop offset="1" stopColor="#986019" />
        </LinearGradient>

        <LinearGradient
          id="pianoBody"
          x1="20"
          y1="75"
          x2="78"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#89500F" />
          <Stop offset="0.35" stopColor="#C98725" />
          <Stop offset="0.62" stopColor="#FFE68A" />
          <Stop offset="1" stopColor="#A96D1E" />
        </LinearGradient>

        <LinearGradient
          id="pianoLid"
          x1="24"
          y1="20"
          x2="80"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF0A0" />
          <Stop offset="0.45" stopColor={color} />
          <Stop offset="1" stopColor="#986019" />
        </LinearGradient>

        <LinearGradient
          id="pianoKeys"
          x1="30"
          y1="55"
          x2="70"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBEA" />
          <Stop offset="1" stopColor="#D8C9A4" />
        </LinearGradient>

        <RadialGradient
          id="pianoGlow"
          cx="48"
          cy="57"
          r="42"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFE68A" stopOpacity={0.2} />
          <Stop offset="1" stopColor="#C98725" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* Ambient gold glow */}
      <Circle cx="49" cy="54" r="42" fill="url(#pianoGlow)" />

      {/* Piano lid - open silhouette */}
      <Path
        d="
          M17 39
          L66 16
          Q70 14 74 17
          L88 28
          L39 52
          Z
        "
        fill="url(#pianoLid)"
        fillOpacity={0.24}
        stroke="url(#pianoGold)"
        strokeWidth={1.3}
        strokeLinejoin="round"
      />

      {/* Lid inner highlight */}
      <Path
        d="M23 38 L67 18"
        stroke="#FFF2B0"
        strokeWidth={0.75}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Main piano body */}
      <Path
        d="
          M16 40
          L39 51
          L88 28
          L88 65
          Q88 69 84 72
          L45 91
          Q41 93 37 91
          L16 80
          Q13 78 13 74
          L13 45
          Q13 41 16 40
          Z
        "
        fill="url(#pianoBody)"
        fillOpacity={0.28}
        stroke="url(#pianoGold)"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      {/* Piano front panel */}
      <Path
        d="
          M16 48
          L39 59
          L87 37
          L87 65
          Q87 68 83 70
          L44 89
          Q41 90 38 89
          L17 78
          Q15 77 15 74
          Z
        "
        fill="#100D08"
        fillOpacity={0.2}
        stroke="#C18A35"
        strokeWidth={0.75}
        strokeLinejoin="round"
      />

      {/* Keyboard surround */}
      <Path
        d="
          M22 43
          L39 51
          L81 31
          L86 34
          L40 57
          L21 48
          Z
        "
        fill="#8C5513"
        stroke="#FFF0A0"
        strokeWidth={0.8}
        strokeLinejoin="round"
      />

      {/* White keyboard */}
      <Path
        d="
          M23 44
          L39 52
          L82 32
          L85 34
          L40 56
          L22 47
          Z
        "
        fill="url(#pianoKeys)"
        stroke="#FFF1B0"
        strokeWidth={0.65}
        strokeLinejoin="round"
      />

      {/* White key separators */}
      <Path
        d="
          M29 47 L29 50
          M35 50 L35 53
          M42 50 L42 54
          M49 47 L49 51
          M56 44 L56 48
          M63 41 L63 45
          M70 38 L70 42
          M77 35 L77 39
        "
        stroke="#9D793C"
        strokeWidth={0.65}
        opacity={0.8}
      />

      {/* Black keys */}
      <Path
        d="
          M27 43 L30 45 L30 49 L27 47 Z
          M34 46 L37 48 L37 52 L34 50 Z
          M45 45 L48 47 L48 51 L45 49 Z
          M52 42 L55 44 L55 48 L52 46 Z
          M59 39 L62 41 L62 45 L59 43 Z
          M73 33 L76 35 L76 39 L73 37 Z
        "
        fill="#17120B"
        stroke="#D9A342"
        strokeWidth={0.45}
        strokeLinejoin="round"
      />

      {/* Piano side contour */}
      <Path
        d="M16 52 L16 75 Q16 77 19 79 L37 88"
        stroke="#FFF0A0"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.65}
      />

      {/* Front panel accent */}
      <Path
        d="M44 82 L81 64"
        stroke="#FFE68A"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* Piano legs */}
      <Path
        d="
          M24 79 L23 91
          Q23 94 26 94
          L29 92
          L30 82
        "
        fill="url(#pianoGold)"
        stroke="#89500F"
        strokeWidth={0.9}
        strokeLinejoin="round"
      />

      <Path
        d="
          M72 73 L74 87
          Q75 90 78 88
          L81 85
          L79 70
        "
        fill="url(#pianoGold)"
        stroke="#89500F"
        strokeWidth={0.9}
        strokeLinejoin="round"
      />

      {/* Pedal support */}
      <Path
        d="M42 88 L43 95 M49 85 L50 94"
        stroke="url(#pianoGold)"
        strokeWidth={1.15}
        strokeLinecap="round"
      />

      {/* Pedals */}
      <Path
        d="M39 95 L45 95 M47 94 L53 94"
        stroke="#FFE68A"
        strokeWidth={1.15}
        strokeLinecap="round"
      />

      {/* Lid support */}
      <Path
        d="M72 24 L68 42"
        stroke="#FFF0A0"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* Subtle metallic sparkle */}
      <Path
        d="
          M87 13
          C87.3 15.5 88 16.2 90.5 16.5
          C88 16.8 87.3 17.5 87 20
          C86.7 17.5 86 16.8 83.5 16.5
          C86 16.2 86.7 15.5 87 13
          Z
        "
        fill="url(#pianoGold)"
        opacity={0.85}
      />

      <Circle cx="87" cy="16.5" r="0.65" fill="#FFFBE5" />
    </Svg>
  );
};

export default InstrumentalIcon;

