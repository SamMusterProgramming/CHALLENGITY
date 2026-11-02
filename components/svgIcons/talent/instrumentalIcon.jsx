import React from "react";
import Svg, {
  Path,
  Circle,
  Line,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const InstrumentalIcon = ({
  size = 32,
  color = GOLD,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="instrumentGold"
          x1="20"
          y1="88"
          x2="82"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#8F5110" />
          <Stop offset="0.16" stopColor="#D58B20" />
          <Stop offset="0.31" stopColor="#FFD95B" />
          <Stop offset="0.46" stopColor="#FFF3A0" />
          <Stop offset="0.60" stopColor="#F5C13F" />
          <Stop offset="0.82" stopColor={color} />
          <Stop offset="1" stopColor="#8D5010" />
        </LinearGradient>

        <LinearGradient
          id="instrumentDarkGold"
          x1="22"
          y1="88"
          x2="78"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#7D450C" />
          <Stop offset="0.25" stopColor="#C47714" />
          <Stop offset="0.50" stopColor="#FFE078" />
          <Stop offset="0.72" stopColor="#C47714" />
          <Stop offset="1" stopColor="#81490C" />
        </LinearGradient>

        <RadialGradient
          id="bodyGlow"
          cx="45"
          cy="68"
          r="30"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor="#FFF7BE"
            stopOpacity={0.72}
          />
          <Stop
            offset="0.38"
            stopColor="#FFD85A"
            stopOpacity={0.30}
          />
          <Stop
            offset="1"
            stopColor="#C47714"
            stopOpacity={0}
          />
        </RadialGradient>
      </Defs>

      {/* TOP SPARKLE */}
      <Path
        d="
          M83 10
          C83.4 13.8 84.7 15.1 88.5 15.5
          C84.7 15.9 83.4 17.2 83 21
          C82.6 17.2 81.3 15.9 77.5 15.5
          C81.3 15.1 82.6 13.8 83 10
          Z
        "
        fill="url(#instrumentGold)"
      />

      {/* LEFT SPARKLE */}
      <Path
        d="
          M16 39
          C16.3 41.8 17.2 42.7 20 43
          C17.2 43.3 16.3 44.2 16 47
          C15.7 44.2 14.8 43.3 12 43
          C14.8 42.7 15.7 41.8 16 39
          Z
        "
        fill="url(#instrumentGold)"
      />

      {/* HEADSTOCK */}
      <Path
        d="
          M77.8 18.5
          C80 17.1 82.7 18.2 83.2 20.7
          L84.1 25
          C84.5 27 83.5 28.6 81.8 29.6
          L76.1 32.8
          L69.7 23.8
          Z
        "
        fill="url(#instrumentGold)"
      />

      <Path
        d="
          M77.8 18.5
          L69.7 23.8
          L76.1 32.8
          L81.8 29.6
        "
        stroke="#8A4E0D"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.75}
      />

      {/* TUNING PEGS */}
      <Circle
        cx="80.4"
        cy="21"
        r="1.9"
        fill="url(#instrumentDarkGold)"
      />

      <Circle
        cx="82.7"
        cy="25.6"
        r="1.9"
        fill="url(#instrumentDarkGold)"
      />

      <Circle
        cx="73.4"
        cy="26.1"
        r="1.9"
        fill="url(#instrumentDarkGold)"
      />

      {/* NECK */}
      <Path
        d="
          M70.5 25.5
          L76.8 34
          L54.2 59.5
          L47.0 51.4
          Z
        "
        fill="url(#instrumentGold)"
      />

      <Path
        d="
          M68.4 28.5
          L51.8 53.5
        "
        stroke="#FFF3A0"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.72}
      />

      {/* FRETS */}
      <Line
        x1="66.4"
        y1="31.4"
        x2="72.4"
        y2="37.5"
        stroke="#8A4E0D"
        strokeWidth={1}
        opacity={0.8}
      />

      <Line
        x1="62.2"
        y1="36.1"
        x2="68.2"
        y2="42.2"
        stroke="#8A4E0D"
        strokeWidth={1}
        opacity={0.8}
      />

      <Line
        x1="57.9"
        y1="40.8"
        x2="63.9"
        y2="46.9"
        stroke="#8A4E0D"
        strokeWidth={1}
        opacity={0.8}
      />

      <Line
        x1="53.7"
        y1="45.5"
        x2="59.7"
        y2="51.6"
        stroke="#8A4E0D"
        strokeWidth={1}
        opacity={0.8}
      />

      {/* =====================================================
          GUITAR BODY

          CENTER AXIS:
          upper neck junction  ->  (50,49)
          waist                 ->  (43,64)
          lower body            ->  (31,82)

          Everything moves DOWN-LEFT together.
          ===================================================== */}

      <Path
        d="
          M47.5 47.8

          C43.0 44.6 37.8 44.8 34.4 48.0
          C31.0 51.2 30.7 55.4 32.7 58.9

          C34.5 61.9 34.2 64.0 30.8 66.4

          C26.4 69.5 22.7 73.4 21.8 77.7

          C20.8 82.6 23.8 86.7 28.3 88.3

          C33.0 90.0 38.0 88.1 41.0 84.1

          C43.8 80.4 44.2 76.0 45.7 72.6

          C47.0 69.7 48.0 67.0 48.2 64.2

          C48.5 67.0 49.0 69.7 50.3 72.6

          C51.8 76.0 52.2 80.4 55.0 84.1

          C58.0 88.1 63.0 90.0 67.7 88.3

          C72.2 86.7 75.2 82.6 74.2 77.7

          C73.3 73.4 69.6 69.5 65.2 66.4

          C61.8 64.0 61.5 61.9 63.3 58.9

          C65.3 55.4 65.0 51.2 61.6 48.0

          C58.2 44.8 53.0 44.6 48.5 47.8

          C48.2 48.1 47.8 48.1 47.5 47.8

          Z
        "
        fill="url(#instrumentGold)"
      />

      {/* BODY GLOW */}
      <Path
        d="
          M47.3 50

          C43.3 47.1 39.0 47.4 36.1 50.1
          C33.3 52.8 33.2 56.0 34.8 58.8

          C36.5 61.8 36.1 64.3 32.8 66.7

          C28.8 69.7 25.1 73.5 24.4 77.5

          C23.7 81.4 26.2 84.7 29.9 86.0

          C33.8 87.3 37.6 85.7 40.1 82.1

          C42.7 78.3 42.9 74.3 44.7 70.8

          C46.0 68.3 47.0 65.5 47.1 63.0

          C47.2 65.5 48.0 68.3 49.3 70.8

          C51.1 74.3 51.3 78.3 53.9 82.1

          C56.4 85.7 60.2 87.3 64.1 86.0

          C67.8 84.7 70.3 81.4 69.6 77.5

          C68.9 73.5 65.2 69.7 61.2 66.7

          C57.9 64.3 57.5 61.8 59.2 58.8

          C60.8 56.0 60.7 52.8 57.9 50.1

          C55.0 47.4 50.7 47.1 46.7 50

          Z
        "
        fill="url(#bodyGlow)"
        opacity={0.72}
      />

      {/* BODY OUTLINE */}
      <Path
        d="
          M47.5 47.8
          C43.0 44.6 37.8 44.8 34.4 48.0
          C31.0 51.2 30.7 55.4 32.7 58.9
          C34.5 61.9 34.2 64.0 30.8 66.4
          C26.4 69.5 22.7 73.4 21.8 77.7
          C20.8 82.6 23.8 86.7 28.3 88.3
          C33.0 90.0 38.0 88.1 41.0 84.1
          C43.8 80.4 44.2 76.0 45.7 72.6
          C47.0 69.7 48.0 67.0 48.2 64.2
          C48.5 67.0 49.0 69.7 50.3 72.6
          C51.8 76.0 52.2 80.4 55.0 84.1
          C58.0 88.1 63.0 90.0 67.7 88.3
          C72.2 86.7 75.2 82.6 74.2 77.7
          C73.3 73.4 69.6 69.5 65.2 66.4
          C61.8 64.0 61.5 61.9 63.3 58.9
          C65.3 55.4 65.0 51.2 61.6 48.0
          C58.2 44.8 53.0 44.6 48.5 47.8
          C48.2 48.1 47.8 48.1 47.5 47.8
          Z
        "
        stroke="#8A4E0D"
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.55}
      />

      {/* SOUND HOLE */}
      <Circle
        cx="47.5"
        cy="62.8"
        r="7.1"
        fill="url(#instrumentDarkGold)"
      />

      <Circle
        cx="47.5"
        cy="62.8"
        r="5.1"
        fill="#090A08"
      />

      <Circle
        cx="47.5"
        cy="62.8"
        r="7.1"
        stroke="#FFF0A0"
        strokeWidth={1}
        fill="none"
        opacity={0.55}
      />

      {/* BRIDGE */}
      <Path
        d="
          M40.5 73.0
          C44.0 74.0 49.0 75.1 54.0 75.5
          L54.2 78.5
          C49.0 78.0 43.7 77.0 40.0 75.8
          Z
        "
        fill="url(#instrumentDarkGold)"
      />

      <Path
        d="
          M42.0 74.4
          C45.7 75.3 49.7 76.1 52.8 76.4
        "
        stroke="#FFF3A0"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* STRINGS */}
      <Path
        d="M70.8 23.5 L47.5 74.5"
        stroke="#FFF5B5"
        strokeWidth={0.42}
        strokeLinecap="round"
        opacity={0.9}
      />

      <Path
        d="M72.4 24.8 L49.0 75"
        stroke="#9A5A11"
        strokeWidth={0.4}
        strokeLinecap="round"
        opacity={0.8}
      />

      <Path
        d="M74 26 L50.5 75.4"
        stroke="#FFF5B5"
        strokeWidth={0.46}
        strokeLinecap="round"
        opacity={0.9}
      />

      <Path
        d="M75.3 27.3 L52 75.7"
        stroke="#9A5A11"
        strokeWidth={0.4}
        strokeLinecap="round"
        opacity={0.8}
      />

      <Path
        d="M76.5 28.5 L53.5 76"
        stroke="#FFF5B5"
        strokeWidth={0.42}
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* LEFT HIGHLIGHT */}
      <Path
        d="
          M35.5 49.0
          C32.5 52.0 32.3 55.5 33.8 58.6
          C35.5 61.8 35.0 64.0 31.5 66.8
          C27.5 69.8 24.5 73.7 23.7 77.6
          C23.2 81.0 25.0 84.0 28.0 85.8
        "
        stroke="#FFF2A0"
        strokeWidth={1}
        strokeLinecap="round"
        fill="none"
        opacity={0.62}
      />

      {/* RIGHT SHADOW */}
      <Path
        d="
          M61.0 48.9
          C64.0 51.9 64.2 55.5 62.7 58.6
          C61.0 61.8 61.5 64.0 65.0 66.8
          C69.0 69.8 72.0 73.7 72.8 77.6
          C73.3 81.0 71.5 84.0 68.5 85.8
        "
        stroke="#8A4E0D"
        strokeWidth={1}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />

      {/* LOWER RIGHT SPARKLE */}
      <Path
        d="
          M86 67
          C86.35 70.2 87.3 71.15 90.5 71.5
          C87.3 71.85 86.35 72.8 86 76
          C85.65 72.8 84.7 71.85 81.5 71.5
          C84.7 71.15 85.65 70.2 86 67
          Z
        "
        fill="url(#instrumentGold)"
      />

      {/* METALLIC GLINTS */}
      <Circle
        cx="79.2"
        cy="20"
        r="0.8"
        fill="#FFFBE5"
        opacity={0.95}
      />

      <Circle
        cx="34"
        cy="51"
        r="0.7"
        fill="#FFFBE5"
        opacity={0.72}
      />

      <Circle
        cx="65.5"
        cy="49"
        r="0.7"
        fill="#FFFBE5"
        opacity={0.65}
      />
    </Svg>
  );
};

export default InstrumentalIcon;