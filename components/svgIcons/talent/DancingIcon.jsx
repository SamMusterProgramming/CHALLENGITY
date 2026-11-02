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

const DancingIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="7.5 3 85.5 90.5"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        {/* Main metallic gold */}
        <LinearGradient
          id="dancingGold"
          x1="28"
          y1="88"
          x2="70"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#91520F" />
          <Stop offset="0.16" stopColor="#D68C20" />
          <Stop offset="0.34" stopColor="#FFD85B" />
          <Stop offset="0.48" stopColor="#FFF3A3" />
          <Stop offset="0.62" stopColor="#F5C13F" />
          <Stop offset="0.82" stopColor={color} />
          <Stop offset="1" stopColor="#92530F" />
        </LinearGradient>

        {/* Body highlight */}
        <LinearGradient
          id="dancingLight"
          x1="43"
          y1="10"
          x2="58"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFDEB" />
          <Stop offset="0.28" stopColor="#FFF0A0" />
          <Stop offset="0.62" stopColor="#FFD45A" />
          <Stop offset="1" stopColor="#D58A1C" stopOpacity="0.1" />
        </LinearGradient>

        {/* Ribbon gold */}
        <LinearGradient
          id="dancingRibbon"
          x1="10"
          y1="50"
          x2="90"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#A76112" />
          <Stop offset="0.25" stopColor="#E4A32D" />
          <Stop offset="0.5" stopColor="#FFF0A0" />
          <Stop offset="0.75" stopColor="#E5A42E" />
          <Stop offset="1" stopColor="#9A5710" />
        </LinearGradient>

        {/* Star */}
        <RadialGradient
          id="starGold"
          cx="50"
          cy="50"
          r="50"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFBE1" />
          <Stop offset="0.35" stopColor="#FFE681" />
          <Stop offset="0.7" stopColor="#E8B95A" />
          <Stop offset="1" stopColor="#9A5B12" />
        </RadialGradient>
      </Defs>

      {/* Upper star / sparkle */}
      <Path
        d="
          M19 7
          C19.7 12.1 21.2 13.6 26.3 14.2
          C21.2 14.9 19.7 16.4 19 21.5
          C18.3 16.4 16.8 14.9 11.7 14.2
          C16.8 13.6 18.3 12.1 19 7
          Z
        "
        fill="url(#starGold)"
      />

      <Circle
        cx="19"
        cy="14.2"
        r="1.2"
        fill="#FFFBE5"
        opacity={0.75}
      />

      {/* Background dance ribbon */}
      <Path
        d="
          M45 32
          C32 35 18 42 14 49
          C9.8 56.5 17.4 63 29.5 64
          C41 65 53.8 60.9 66.2 54.8
          C77.4 49.2 84.6 43.1 87.8 45.4
          C91 47.8 86.3 54.7 78 60
        "
        stroke="url(#dancingRibbon)"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      />

      {/* Ribbon highlight */}
      <Path
        d="
          M14.5 50
          C14 56.5 21.2 61.2 30.1 62
          C40.5 62.9 52.1 59.2 63.2 54
        "
        stroke="#FFE88A"
        strokeWidth={0.7}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />

      {/* Head */}
      <Circle
        cx="55"
        cy="22"
        r="6.2"
        fill="url(#dancingGold)"
      />

      {/* Face / head shine */}
      <Path
        d="
          M51.2 20.2
          C52.1 17 54.2 15.4 56.7 15.5
          C59 15.6 60.8 17.1 61.5 19.2
          C58.1 18 54.4 18.4 51.2 20.2
          Z
        "
        fill="#FFF8D7"
        opacity={0.62}
      />

      {/* Hair / head silhouette */}
      <Path
        d="
          M50.1 19.8
          C49.8 16.8 51.8 13.9 55.1 13.5
          C59 13 62.2 15.4 62.7 18.7
          C61.1 16.9 58.8 16 56.3 16.2
          C53.5 16.5 51.6 17.7 50.1 19.8
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Raised left arm */}
      <Path
        d="
          M48 30.2
          C43.7 27.1 40.4 23.3 38.4 19
          C36.8 15.6 35.4 12.2 33.8 9.5
          C33.1 8.3 32.1 8 31.2 8.6
          C30.2 9.2 30.2 10.4 30.9 11.7
          C33 15.5 34.5 20 36.8 23.8
          C39.4 28.1 42.8 32 46.6 34.2
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Raised hand */}
      <Path
        d="
          M33.8 9.8
          C32.9 7.8 32.7 5.8 33.4 4.9
          C34 4.2 34.8 4.5 35.1 5.5
          L36.2 8.5
          C36.2 6.2 36.6 4.7 37.4 4.5
          C38.2 4.3 38.7 5.1 38.6 6.2
          L38.3 9.3
          C39 7.6 39.7 6.8 40.4 7
          C41.3 7.3 41.1 8.7 40.4 10.1
          C39.5 12 37.6 13 35.8 12.4
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Main female torso */}
      <Path
        d="
          M49 27
          C46.2 29.2 44.1 32.3 43.1 35.6
          C42.1 39.1 42.5 42.3 44.2 45.2
          C45.3 47 47.1 48.4 49.4 49.3

          C47.2 51.4 45.1 54.1 43.8 57.2

          C47.4 59.3 53.1 59.8 57.1 57.3

          C56.1 53.8 54.5 51.2 52.2 49.1

          C54.8 47.9 57 45.9 58.1 43.4
          C59.6 39.9 58.8 35.9 56.6 32.7

          C54.8 30.1 52.2 28 49 27
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Chest highlight */}
      <Path
        d="
          M48.4 29.1
          C47.1 32.8 47.2 37.4 49.1 40.6
          C50.3 42.7 52 44.2 54.1 45
          C51.3 45 48.9 43.8 47.5 41.7
          C45.5 38.6 46.2 32.8 48.4 29.1
          Z
        "
        fill="url(#dancingLight)"
        opacity={0.9}
      />

      {/* Waist highlight */}
      <Path
        d="
          M45.1 43.8
          C44.2 46.2 45.8 48.7 49.4 50
          C47.5 49.6 45.7 48.8 44.7 47.2
          C43.8 45.8 44 44.7 45.1 43.8
          Z
        "
        fill="#FFF0A0"
        opacity={0.45}
      />

      {/* Right extended arm */}
      <Path
        d="
          M55.4 31.7
          C60.5 34.5 65.7 37.6 71.2 39.3
          C76.3 40.9 81.3 41.2 86.7 40.2
          C88.2 39.9 89.1 40.7 89.1 41.8
          C89 43 87.9 43.7 86.4 44
          C80.3 45.2 74.1 44.9 68.3 43.3
          C62.8 41.8 57.5 39.1 52.8 36.2
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Right hand */}
      <Path
        d="
          M86 40.5
          C88.3 39.3 90.1 39 91 39.7
          C91.7 40.3 91.3 41.1 90.3 41.6
          L88.3 42.7
          C90.4 42.4 91.7 42.8 91.8 43.5
          C91.9 44.4 90.4 44.8 88.9 44.5
          L86 44
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Flowing skirt / dress */}
      <Path
        d="
          M44.1 48
          C41.5 52.8 39.1 57.3 35.9 61.2
          C32.3 65.8 28.2 68.8 24.8 72.4

          C31.3 72.7 37.3 70.9 42.3 67.7

          C46.7 64.9 50.4 61.6 53.3 57.8

          C55.1 62.8 58.3 67.5 63.1 70.4

          C66.9 72.7 71.1 73.4 75.4 72.5

          C70.6 69.5 66.7 65.6 63.6 61.3

          C60.2 56.6 57.9 52.1 56.2 48.2

          C52.8 50.5 48.2 51 44.1 48
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Skirt light */}
      <Path
        d="
          M43.7 51
          C40.7 57.6 35.6 64.8 28.8 70.3
          C35.3 68.8 41.4 65.1 46.1 59.9
          C48.4 57.3 50.2 54.7 51.5 52
          C48.8 52.6 46 52.3 43.7 51
          Z
        "
        fill="#FFF0A0"
        opacity={0.42}
      />

      <Path
        d="
          M54.3 51.5
          C57 58.1 62.1 65.9 70.9 71.4
          C65.2 70.1 60.3 66.4 56.7 61.5
          C54.7 58.8 53.1 55.8 52.2 53
          Z
        "
        fill="#FFF0A0"
        opacity={0.3}
      />

      {/* Left leg */}
      <Path
        d="
          M44.8 62.5
          C42.5 67.6 39.7 72.6 36.4 77.2
          C33.7 81 30.8 84.5 27.7 87.4
          C26.6 88.4 26.6 89.8 27.5 90.5
          C28.5 91.2 29.7 90.8 30.8 89.8
          C35.1 85.9 38.9 81.5 42.2 76.7
          C45.5 71.8 48 67.2 49.5 63.2
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Left leg highlight */}
      <Path
        d="
          M44.7 64
          C42.1 70.1 38.4 76.3 33.6 82.1
          C31.7 84.4 29.8 86.4 28.2 87.9
          C32.4 85.1 36.2 81.2 39.2 76.8
          C42.2 72.4 44.7 67.7 46.2 63.7
          Z
        "
        fill="#FFF0A0"
        opacity={0.35}
      />

      {/* Right leg */}
      <Path
        d="
          M51.1 62.2
          C53.8 67.7 56 73.2 57.7 78.7
          C59.1 83 60 87 61 90.1
          C61.4 91.4 62.5 92 63.5 91.5
          C64.5 91.1 64.8 89.9 64.4 88.6
          C62.8 82.4 61.4 76.8 59.6 71.6
          C57.9 66.4 55.6 62.1 53.5 59.7
          Z
        "
        fill="url(#dancingGold)"
      />

      {/* Right leg highlight */}
      <Path
        d="
          M53.2 63
          C55.3 68.4 57.2 74.3 58.6 79.3
          C59.8 83.5 61 87.6 62.1 90.3
          C60.4 86.7 58.9 82.5 57.6 78.1
          C56.1 72.8 54.6 67.2 53.2 63
          Z
        "
        fill="#FFF0A0"
        opacity={0.3}
      />

      {/* Front ribbon */}
      <Path
        d="
          M15.5 52
          C19.3 57.7 26.6 60.6 35.1 60.2
          C45 59.7 55.2 55.7 65.1 50
        "
        stroke="url(#dancingRibbon)"
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />

      {/* Body edge highlight */}
      <Path
        d="
          M47.1 29
          C48.3 34.1 47.1 39.4 44.9 43.2
        "
        stroke="#FFFBEA"
        strokeWidth={0.7}
        strokeLinecap="round"
        fill="none"
        opacity={0.58}
      />

      {/* Small gold glints */}
      <Circle
        cx="58.8"
        cy="18.2"
        r="0.9"
        fill="#FFFBE5"
        opacity={0.85}
      />

      <Circle
        cx="39.5"
        cy="67"
        r="0.75"
        fill="#FFFBE5"
        opacity={0.65}
      />
    </Svg>
  );
};

export default DancingIcon;