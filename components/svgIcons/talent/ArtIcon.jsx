
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

const ArtIcon = ({ size = 32, color = GOLD }) => {
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
          id="artGold"
          x1="17"
          y1="85"
          x2="83"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#89500F" />
          <Stop offset="0.23" stopColor="#C98725" />
          <Stop offset="0.45" stopColor="#FFE68A" />
          <Stop offset="0.62" stopColor="#FFF2B0" />
          <Stop offset="0.8" stopColor={color} />
          <Stop offset="1" stopColor="#986019" />
        </LinearGradient>

        <LinearGradient
          id="artPalette"
          x1="17"
          y1="30"
          x2="72"
          y2="82"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFE68A" />
          <Stop offset="0.3" stopColor="#E4A438" />
          <Stop offset="0.65" stopColor="#B8751D" />
          <Stop offset="1" stopColor="#89500F" />
        </LinearGradient>

        <LinearGradient
          id="artBrush"
          x1="53"
          y1="77"
          x2="84"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#89500F" />
          <Stop offset="0.25" stopColor="#D18B28" />
          <Stop offset="0.48" stopColor="#FFF0A0" />
          <Stop offset="0.7" stopColor={color} />
          <Stop offset="1" stopColor="#986019" />
        </LinearGradient>

        <LinearGradient
          id="artFerrule"
          x1="47"
          y1="69"
          x2="62"
          y2="78"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#89500F" />
          <Stop offset="0.4" stopColor="#FFE68A" />
          <Stop offset="0.65" stopColor="#D18B28" />
          <Stop offset="1" stopColor="#89500F" />
        </LinearGradient>

        <LinearGradient
          id="artBristle"
          x1="43"
          y1="91"
          x2="58"
          y2="74"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#89500F" />
          <Stop offset="0.45" stopColor="#D18B28" />
          <Stop offset="0.75" stopColor="#FFE68A" />
          <Stop offset="1" stopColor="#A66514" />
        </LinearGradient>

        <RadialGradient
          id="artGlow"
          cx="38"
          cy="44"
          r="44"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFF4AE" stopOpacity={0.3} />
          <Stop offset="0.5" stopColor="#E8B95A" stopOpacity={0.1} />
          <Stop offset="1" stopColor="#C47714" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* Ambient glow */}
      <Circle cx="43" cy="50" r="42" fill="url(#artGlow)" />

      {/* Artist palette silhouette */}
      <Path
        d="
          M46 19
          C30 19 17.5 28.2 13.5 41.8
          C9.3 55.8 15.7 71.3 28.2 79.1
          C38.4 85.5 51.5 85.7 61.5 79.7
          C65.6 77.2 66.9 73.4 64.7 70.3
          C62.5 67.3 58.7 67.5 55.1 68.9
          C49.3 71.2 43.3 69.5 40.1 65.1
          C36.5 60.2 37.3 53.7 41.7 49.7
          C46.2 45.7 52.5 45.1 57.7 47.2
          C64.4 49.9 72.2 47.3 75.5 41.4
          C80.4 32.8 66.7 19 46 19
          Z
        "
        fill="url(#artPalette)"
        stroke="#986019"
        strokeWidth={1.25}
        strokeLinejoin="round"
      />

      {/* Inner palette highlight */}
      <Path
        d="
          M19 43
          C23.2 29.8 34.3 23 47 22.5
          C58 22.1 67.4 27 71.4 33.2
        "
        stroke="#FFF2A0"
        strokeWidth={1.15}
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* Palette lower contour */}
      <Path
        d="M17.5 53 C17.2 64 23.4 73.4 33 78.2"
        stroke="#89500F"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.65}
      />

      {/* Paint dabs */}
      <Circle cx="29" cy="39" r="4.1" fill="url(#artGold)" />
      <Circle cx="44" cy="31.5" r="4.3" fill="url(#artGold)" />
      <Circle cx="59" cy="37" r="4.1" fill="url(#artGold)" />
      <Circle cx="25" cy="54" r="3.9" fill="url(#artGold)" />
      <Circle cx="32" cy="67" r="3.8" fill="url(#artGold)" />

      {/* Paint highlights */}
      <Circle cx="27.8" cy="37.7" r="0.85" fill="#FFFBE5" opacity={0.85} />
      <Circle cx="42.7" cy="30.2" r="0.85" fill="#FFFBE5" opacity={0.8} />
      <Circle cx="57.7" cy="35.8" r="0.85" fill="#FFFBE5" opacity={0.8} />

      {/* Thumb hole */}
      <Ellipse
        cx="57.5"
        cy="60"
        rx="7.3"
        ry="6"
        fill="#71400D"
        opacity={0.85}
      />
      <Ellipse
        cx="57.5"
        cy="60"
        rx="5.6"
        ry="4.5"
        fill="#100B06"
      />
      <Path
        d="M54.5 58.8 C56 57.5 58.5 57.3 60 58.2"
        stroke="#FFE68A"
        strokeWidth={0.7}
        strokeLinecap="round"
        opacity={0.25}
      />

      {/* Brush handle shadow */}
      <Path
        d="M53 72 L81 17"
        stroke="#6D3C09"
        strokeWidth={6.8}
        strokeLinecap="round"
        opacity={0.45}
      />

      {/* Brush handle */}
      <Path
        d="M53.5 70.8 L81.2 16.8"
        stroke="url(#artBrush)"
        strokeWidth={4.8}
        strokeLinecap="round"
      />

      {/* Handle highlight */}
      <Path
        d="M55 66.5 L79.5 19"
        stroke="#FFF5B8"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* Brush ferrule */}
      <Path
        d="
          M47.8 74.8
          L54.2 62.3
          L62.2 66.4
          L55.8 78.9
          Z
        "
        fill="url(#artFerrule)"
        stroke="#89500F"
        strokeWidth={0.8}
        strokeLinejoin="round"
      />

      {/* Ferrule rim */}
      <Path
        d="M51 68.5 L59 72.5"
        stroke="#FFF2A0"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* Brush bristles */}
      <Path
        d="
          M47.8 74.8
          C45.2 78.3 43.6 83.5 42.8 89.8
          C48.1 87.6 52.5 83.9 55.8 78.9
          Z
        "
        fill="url(#artBristle)"
        stroke="#89500F"
        strokeWidth={0.8}
        strokeLinejoin="round"
      />

      {/* Bristle detail */}
      <Path
        d="M48.5 77.8 C46.6 81.4 45.1 84.6 44.1 87.5"
        stroke="#FFE68A"
        strokeWidth={0.75}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* Small upper sparkle */}
      <Path
        d="
          M77 7
          C77.35 10.3 78.2 11.2 81.5 11.5
          C78.2 11.85 77.35 12.7 77 16
          C76.65 12.7 75.8 11.85 72.5 11.5
          C75.8 11.2 76.65 10.3 77 7
          Z
        "
        fill="url(#artGold)"
      />

      <Circle cx="77" cy="11.5" r="0.6" fill="#FFFBE5" />

      {/* Small side glint */}
      <Path
        d="
          M11 67
          C11.3 69.6 12 70.3 14.6 70.6
          C12 70.9 11.3 71.6 11 74.2
          C10.7 71.6 10 70.9 7.4 70.6
          C10 70.3 10.7 69.6 11 67
          Z
        "
        fill="#FFE68A"
        opacity={0.85}
      />

      <Circle cx="82" cy="52" r="0.8" fill="#FFFBE5" opacity={0.8} />
    </Svg>
  );
};

export default ArtIcon;
