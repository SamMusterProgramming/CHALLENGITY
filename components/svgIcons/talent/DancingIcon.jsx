
import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const DancingIcon = ({ size = 32, color = GOLD }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient
          id="dancerGold"
          x1="15"
          y1="15"
          x2="83"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#F2D18B" />
          <Stop offset="0.45" stopColor={color} />
          <Stop offset="1" stopColor="#A87529" />
        </LinearGradient>

        <LinearGradient
          id="dancerFabric"
          x1="30"
          y1="45"
          x2="72"
          y2="87"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#F5D58F" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#B17A2E" />
        </LinearGradient>

        <LinearGradient
          id="dancerRibbon"
          x1="10"
          y1="45"
          x2="91"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#B17A2E" />
          <Stop offset="0.5" stopColor="#F0CA78" />
          <Stop offset="1" stopColor="#B17A2E" />
        </LinearGradient>
      </Defs>

      {/* Flowing movement behind the dancer */}
      <Path
        d="
          M46 39
          C31 35 17 39 13 49
          C9 59 22 66 36 64
          C48 62 61 54 71 49
          C80 44 86 44 89 48
          C91 52 86 58 80 61
        "
        stroke="url(#dancerRibbon)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Head */}
      <Circle
        cx="55"
        cy="16.5"
        r="5.8"
        fill="url(#dancerGold)"
      />

      {/* Hair bun */}
      <Circle
        cx="61"
        cy="11.5"
        r="3.4"
        fill="url(#dancerGold)"
      />

      {/* Raised arm */}
      <Path
        d="
          M48 29
          C44 25 41 20 38 15
          L34 7
          C33.5 6 32.4 6 31.8 7
          C31.2 7.8 31.8 9 32.3 10.1
          L36 19
          C38.3 24.5 41.8 30.3 46 34
          Z
        "
        fill="url(#dancerGold)"
      />

      {/* Raised hand */}
      <Path
        d="
          M33.5 9
          C31.5 7.1 30.5 5.2 31.3 4.5
          C32.2 3.9 33.1 5.1 34.4 6.7
          C34 4.8 34.4 3.7 35.3 3.7
          C36.2 3.7 36.7 5.6 37.1 7.5
          C38 5.8 39 5.3 39.7 6
          C40.5 6.8 39.2 9.6 37.5 11.2
          Z
        "
        fill="url(#dancerGold)"
      />

      {/* Torso */}
      <Path
        d="
          M49 24
          C45.5 26 43 29.5 42 34
          C40.7 39 43 44 47.4 47
          L44 54
          C47.7 57 54 57.2 58 54
          L53.8 47
          C58.1 43.8 60 39.1 58.5 34
          C57.4 29.8 53.8 26 49 24
          Z
        "
        fill="url(#dancerGold)"
      />

      {/* Extended arm */}
      <Path
        d="
          M55 28
          C60 30 65 33.5 70 35.2
          C75.5 37 81 37.5 87 36.2
          L92 35.4
          C93.3 35.2 94 36.1 93.5 37.1
          C93 38 91.8 38.3 90.5 38.7
          C83.4 40.8 76.4 41.2 69.7 39.6
          C63.4 38.1 57.7 35.4 52.5 32.5
          Z
        "
        fill="url(#dancerGold)"
      />

      {/* Flowing dress */}
      <Path
        d="
          M44.5 48
          C41.5 53 38.8 57.7 34.8 62
          C30.9 66.2 26.5 70 22 73
          C30.1 74.2 38.1 71.5 44.3 66.8
          C47.1 64.7 49.5 62.3 51.5 59.8
          C54 65.3 58.2 70.4 64 73.5
          C69.1 76 75.3 76.1 80 73.8
          C72.8 69.6 67.6 63.4 63.7 57
          C60.9 52.4 58.6 48.1 57 45.2
          C53.8 48.2 49 49.4 44.5 48
          Z
        "
        fill="url(#dancerFabric)"
      />

      {/* Dress folds */}
      <Path
        d="
          M45 51
          C40.8 59.4 33.6 67.5 26 72
          M51.5 53
          C49 61.5 42.3 69.4 35 72.5
          M56 51
          C60.4 61.2 68.3 69.4 76 73
        "
        stroke="#FFF0C2"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.42"
      />

      {/* Left leg */}
      <Path
        d="
          M45 64
          C42.5 69.7 39.4 75.2 35.6 80.2
          C32.4 84.4 29.2 88 25.7 91
          C24.8 91.8 25 93 26 93.3
          C27.1 93.7 28.1 92.9 29.2 92
          C34.3 87.8 38.7 83.1 42.4 78.1
          C46 73.2 48.7 68.7 50 65
          Z
        "
        fill="url(#dancerGold)"
      />

      {/* Right leg */}
      <Path
        d="
          M53 64
          C55.9 69.4 58.1 75 59.7 80.6
          C61 85 62 89.1 63.2 92
          C63.6 93.2 64.8 93.6 65.7 92.8
          C66.5 92.1 66.4 91 66.1 89.8
          C64.6 83.5 63 77.7 61 72.4
          C59.2 67.5 57 63.4 55 60.7
          Z
        "
        fill="url(#dancerGold)"
      />

      {/* Subtle silhouette detail */}
      <Path
        d="M46.5 28.5 C44.3 33 44.2 39 47.2 43.1"
        stroke="#FFF0C2"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.45"
      />
    </Svg>
  );
};

export default DancingIcon;
