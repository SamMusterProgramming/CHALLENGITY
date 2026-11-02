import React from "react";
import Svg, {
  Path,
  Circle,
  Ellipse,
  Rect,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const ArtIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="7 5 86 90"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        {/* Main metallic gold */}
        <LinearGradient
          id="artMainGold"
          x1="22"
          y1="82"
          x2="76"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8C4E0D" />
          <Stop offset="0.15" stopColor="#C97C18" />
          <Stop offset="0.3" stopColor="#F2BD40" />
          <Stop offset="0.45" stopColor="#FFF1A0" />
          <Stop offset="0.58" stopColor="#FFD45A" />
          <Stop offset="0.75" stopColor="#D99020" />
          <Stop offset="0.88" stopColor={color} />
          <Stop offset="1" stopColor="#8B4D0D" />
        </LinearGradient>

        {/* Palette metallic surface */}
        <LinearGradient
          id="artPaletteGold"
          x1="20"
          y1="28"
          x2="66"
          y2="82"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#A66011" />
          <Stop offset="0.18" stopColor="#E1A02B" />
          <Stop offset="0.38" stopColor="#FFD968" />
          <Stop offset="0.52" stopColor="#F2BB3F" />
          <Stop offset="0.7" stopColor="#C87916" />
          <Stop offset="0.88" stopColor="#A05B0E" />
          <Stop offset="1" stopColor="#6D3D09" />
        </LinearGradient>

        {/* Palette glow */}
        <RadialGradient
          id="artPaletteGlow"
          cx="37"
          cy="35"
          r="43"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBE0" stopOpacity={0.8} />
          <Stop offset="0.3" stopColor="#FFE88A" stopOpacity={0.4} />
          <Stop offset="0.65" stopColor="#F0B63A" stopOpacity={0.12} />
          <Stop offset="1" stopColor="#A85F10" stopOpacity={0} />
        </RadialGradient>

        {/* Brush shaft */}
        <LinearGradient
          id="artBrushGold"
          x1="48"
          y1="76"
          x2="82"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8A4C0C" />
          <Stop offset="0.16" stopColor="#D68B1E" />
          <Stop offset="0.36" stopColor="#FFE58A" />
          <Stop offset="0.5" stopColor="#FFF2A4" />
          <Stop offset="0.64" stopColor="#E2A12C" />
          <Stop offset="0.84" stopColor={color} />
          <Stop offset="1" stopColor="#8A4C0C" />
        </LinearGradient>

        {/* Ferrule */}
        <LinearGradient
          id="artFerruleGold"
          x1="49"
          y1="69"
          x2="61"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#744009" />
          <Stop offset="0.25" stopColor="#D18A1F" />
          <Stop offset="0.48" stopColor="#FFF1A0" />
          <Stop offset="0.68" stopColor="#E0A02B" />
          <Stop offset="1" stopColor="#7A430A" />
        </LinearGradient>

        {/* Bristles */}
        <LinearGradient
          id="artBristles"
          x1="45"
          y1="88"
          x2="57"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#704009" />
          <Stop offset="0.28" stopColor="#AA6410" />
          <Stop offset="0.52" stopColor="#E5A632" />
          <Stop offset="0.75" stopColor="#FFE080" />
          <Stop offset="1" stopColor="#95530C" />
        </LinearGradient>

        {/* Sparkles */}
        <RadialGradient
          id="artSparkle"
          cx="50"
          cy="50"
          r="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBE5" />
          <Stop offset="0.25" stopColor="#FFF0A0" />
          <Stop offset="0.5" stopColor="#FFD45A" />
          <Stop offset="0.75" stopColor="#D98E20" />
          <Stop offset="1" stopColor="#8A4D0D" />
        </RadialGradient>

        {/* Soft central glow */}
        <RadialGradient
          id="artGlow"
          cx="43"
          cy="52"
          r="40"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF4AE" stopOpacity={0.25} />
          <Stop offset="0.45" stopColor="#FFD65A" stopOpacity={0.1} />
          <Stop offset="1" stopColor="#C47714" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* =====================================================
          DECORATIVE SPARKLES
          ===================================================== */}

      <Path
        d="
          M72 5
          C72.6 10.1 74 11.6 79.1 12.2
          C74 12.8 72.6 14.3 72 19.5
          C71.4 14.3 70 12.8 64.9 12.2
          C70 11.6 71.4 10.1 72 5
          Z
        "
        fill="url(#artSparkle)"
      />

      <Circle
        cx="72"
        cy="12.2"
        r="0.95"
        fill="#FFFBE5"
        opacity={0.95}
      />

      <Path
        d="
          M22 17
          C22.4 20.7 23.5 21.8 27.2 22.2
          C23.5 22.6 22.4 23.7 22 27.4
          C21.6 23.7 20.5 22.6 16.8 22.2
          C20.5 21.8 21.6 20.7 22 17
          Z
        "
        fill="url(#artSparkle)"
      />

      <Path
        d="
          M84 31
          C84.35 34.2 85.3 35.1 88.5 35.5
          C85.3 35.85 84.35 36.8 84 40
          C83.65 36.8 82.7 35.85 79.5 35.5
          C82.7 35.1 83.65 34.2 84 31
          Z
        "
        fill="#FFE68A"
      />

      {/* =====================================================
          PALETTE GLOW
          ===================================================== */}

      <Ellipse
        cx="42"
        cy="53"
        rx="34"
        ry="35"
        fill="url(#artGlow)"
      />

      {/* =====================================================
          ARTIST PALETTE
          ===================================================== */}

      <Path
        d="
          M48.5 23
          C33.5 23
          21.1 31.1
          16.8 43
          C11.9 56.5
          17.4 70.9
          29.2 79
          C38 85.1
          49.7 86.5
          59.2 82.1
          C65.1 79.4
          67.8 75
          65.3 71.6
          C62.8 68.2
          58.8 68.4
          55.3 69.7
          C51.5 71.1
          47.1 70.4
          44.3 67
          C41.3 63.3
          41.8 58.2
          45.1 54.9
          C48.1 51.9
          52.6 50.9
          57.1 52
          C63.4 53.5
          70.6 50.9
          74 45.1
          C79.1 36.4
          66.5 23
          48.5 23
          Z
        "
        fill="url(#artPaletteGold)"
      />

      {/* Inner palette lighting */}
      <Path
        d="
          M47.8 26
          C35.3 26
          24.8 33
          21 44.1
          C17.2 55.5
          21.9 67.5
          31.7 74.7
          C39.1 80.2
          48.7 81.6
          56.6 78.2
          C59.2 77.1
          61.7 75
          60.9 73.2
          C60.1 71.5
          57.6 71.8
          55.2 72.7
          C50.1 74.5
          44.5 72.9
          40.9 68.8
          C37 64.4
          37.5 57.8
          41.6 53.5
          C45.4 49.5
          51.2 48.2
          56.9 49.8
          C62.5 51.4
          68.5 49
          71.2 44.2
          C75.1 37.1
          64.3 26
          47.8 26
          Z
        "
        fill="url(#artPaletteGlow)"
        opacity={0.9}
      />

      {/* Palette top highlight */}
      <Path
        d="
          M21.5 43
          C25.8 32.7 35.7 26.3 47.9 26
          C58.8 25.7 67.5 30.6 70.7 36.4
        "
        stroke="#FFF2A0"
        strokeWidth={1.15}
        strokeLinecap="round"
        opacity={0.65}
      />

      {/* =====================================================
          PAINT DABS
          ===================================================== */}

      <Circle
        cx="30"
        cy="40"
        r="4.3"
        fill="url(#artMainGold)"
      />

      <Circle
        cx="44"
        cy="33.5"
        r="4.2"
        fill="url(#artMainGold)"
      />

      <Circle
        cx="58"
        cy="38"
        r="4.3"
        fill="url(#artMainGold)"
      />

      <Circle
        cx="26.5"
        cy="54"
        r="4.1"
        fill="url(#artMainGold)"
      />

      <Circle
        cx="32"
        cy="66.5"
        r="3.9"
        fill="url(#artMainGold)"
      />

      <Circle
        cx="52"
        cy="61"
        r="4"
        fill="url(#artMainGold)"
      />

      {/* Paint dab highlights */}
      <Circle
        cx="28.8"
        cy="38.7"
        r="0.95"
        fill="#FFFBE5"
        opacity={0.9}
      />

      <Circle
        cx="42.8"
        cy="32.2"
        r="0.9"
        fill="#FFFBE5"
        opacity={0.8}
      />

      <Circle
        cx="56.7"
        cy="36.7"
        r="0.9"
        fill="#FFFBE5"
        opacity={0.75}
      />

      {/* =====================================================
          THUMB HOLE
          ===================================================== */}

      <Ellipse
        cx="57.5"
        cy="61"
        rx="7.8"
        ry="6.1"
        fill="#6C3C09"
        opacity={0.9}
      />

      <Ellipse
        cx="57.5"
        cy="60.6"
        rx="5.8"
        ry="4.4"
        fill="#100B06"
      />

      <Ellipse
        cx="56.3"
        cy="59.4"
        rx="2.8"
        ry="1.8"
        fill="#FFF0A0"
        opacity={0.14}
      />

      {/* =====================================================
          PALETTE EDGE DETAIL
          ===================================================== */}

      <Path
        d="
          M18.5 51
          C17.5 61.5 22.3 70.8 31.2 76.8
        "
        stroke="#8A4D0D"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.55}
      />

      <Path
        d="
          M22.2 68.8
          C27 75.4 35.7 79.6 44.1 80.2
        "
        stroke="#FFF0A0"
        strokeWidth={0.75}
        strokeLinecap="round"
        opacity={0.35}
      />

      {/* =====================================================
          PAINT BRUSH
          ===================================================== */}

      {/* Brush dark shadow */}
      <Path
        d="
          M51.2 72.8
          L80.7 17.2
        "
        stroke="#6E3D09"
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* Main brush handle */}
      <Path
        d="
          M52.2 72
          L81.2 16.2
        "
        stroke="url(#artBrushGold)"
        strokeWidth={5.2}
        strokeLinecap="round"
      />

      {/* Handle highlight */}
      <Path
        d="
          M54 68.8
          L80 19
        "
        stroke="#FFF3A5"
        strokeWidth={0.95}
        strokeLinecap="round"
        opacity={0.78}
      />

      {/* Ferrule */}
      <Path
        d="
          M48.2 74
          L54.6 62
          L62.8 66.4
          L56.5 78.4
          Z
        "
        fill="url(#artFerruleGold)"
      />

      {/* Ferrule highlight */}
      <Path
        d="
          M51 70.8
          L58.8 67
        "
        stroke="#FFF5B2"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.72}
      />

      {/* Bristles */}
      <Path
        d="
          M48.2 74
          C45.9 77.7 44.4 81.8 44
          86.2
          C48.5 84.6 52.7 82
          56.5 78.4
          Z
        "
        fill="url(#artBristles)"
      />

      {/* Bristle highlight */}
      <Path
        d="
          M47.3 77
          C46.1 79.7 45.2 82.1 44.8 84.4
        "
        stroke="#FFF0A0"
        strokeWidth={0.75}
        strokeLinecap="round"
        opacity={0.6}
      />

      {/* =====================================================
          SMALL ART SPARKLES
          ===================================================== */}

      <Path
        d="
          M13 65
          C13.4 68.6 14.4 69.6 18 70
          C14.4 70.4 13.4 71.4 13 75
          C12.6 71.4 11.6 70.4 8 70
          C11.6 69.6 12.6 68.6 13 65
          Z
        "
        fill="#FFE991"
      />

      <Circle
        cx="80"
        cy="51"
        r="0.9"
        fill="#FFFBE5"
        opacity={0.85}
      />

      <Circle
        cx="67"
        cy="68"
        r="0.75"
        fill="#FFFBE5"
        opacity={0.8}
      />

      <Circle
        cx="24"
        cy="30"
        r="0.75"
        fill="#FFFBE5"
        opacity={0.8}
      />
    </Svg>
  );
};

export default ArtIcon;