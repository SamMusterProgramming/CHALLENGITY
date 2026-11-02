import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const MusicIcon = ({
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
          id="gold"
          x1="30"
          y1="82"
          x2="73"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#A76416" />
          <Stop offset="0.22" stopColor="#D89527" />
          <Stop offset="0.43" stopColor="#F4BD42" />
          <Stop offset="0.55" stopColor="#FFF1A0" />
          <Stop offset="0.70" stopColor="#F5C44F" />
          <Stop offset="1" stopColor={color} />
        </LinearGradient>

        <LinearGradient
          id="shine"
          x1="42"
          y1="75"
          x2="65"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D58A20" />
          <Stop offset="0.42" stopColor="#FFE989" />
          <Stop offset="0.62" stopColor="#FFF9CF" />
          <Stop offset="1" stopColor="#E6A62D" />
        </LinearGradient>
      </Defs>

      {/* =================================================
          ORBIT
         ================================================= */}

      <Path
        d="
          M38 37
          C29 41 24 48 24 55
          C24 67 35 75 49 77
          C63 78 77 74 82 65
          C86 58 85 51 79 46
        "
        stroke="url(#gold)"
        strokeWidth={1.7}
        strokeLinecap="round"
        fill="none"
      />

      {/* subtle orbital highlight */}
      <Path
        d="
          M38 37
          C29 41 25 48 25 55
        "
        stroke="#F8C94F"
        strokeWidth={0.7}
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* =================================================
          TREBLE CLEF
          
          Much simpler construction:
          - narrow upper loop
          - long diagonal sweep
          - spacious lower loop
          - clean vertical stem
          - small bottom curl
         ================================================= */}

      {/* Upper loop + long sweeping body */}
      <Path
        d="
          M61.0 15.0

          C56.3 15.0 54.0 20.4 54.0 26.0
          C54.0 32.0 57.0 35.2 59.5 38.0

          C62.0 40.8 61.0 43.4 57.0 46.7

          C52.2 50.7 45.7 53.8 43.0 58.2

          C39.7 63.5 40.4 69.0 44.3 72.5
          C48.1 76.0 54.0 76.2 57.7 72.8
          C61.0 69.8 62.0 64.5 59.7 60.7

          C57.8 57.4 53.4 56.0 50.4 58.0
          C47.5 59.8 47.2 63.5 49.8 65.4
          C52.0 67.1 55.0 66.4 56.0 64.1
        "
        stroke="url(#gold)"
        strokeWidth={4.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Upper loop inner highlight */}
      <Path
        d="
          M60.8 16.2
          C57.1 17.0 55.7 21.2 55.8 25.9
          C55.9 30.4 57.5 33.1 59.4 35.5
        "
        stroke="#FFF5B4"
        strokeWidth={1.05}
        strokeLinecap="round"
        fill="none"
        opacity={0.9}
      />

      {/* Main diagonal highlight */}
      <Path
        d="
          M59.5 39.0
          C57.0 42.5 51.8 46.4 47.0 50.2
          C42.5 53.8 40.4 57.7 40.7 62.3
        "
        stroke="url(#shine)"
        strokeWidth={1.15}
        strokeLinecap="round"
        fill="none"
        opacity={0.9}
      />

      {/* =================================================
          LOWER CLEF LOOP
          
          This is deliberately wide and uncluttered.
         ================================================= */}

      <Path
        d="
          M58.2 43.8
          C58.0 48.5 57.7 53.4 57.6 58.0

          C57.5 63.3 57.6 68.6 58.0 73.7

          C58.4 79.0 58.5 82.8 56.2 85.0
        "
        stroke="url(#gold)"
        strokeWidth={4.4}
        strokeLinecap="round"
        fill="none"
      />

      {/* Lower horizontal/rounding stroke */}
      <Path
        d="
          M58.0 46.0
          C53.2 44.5 48.2 46.0 46.0 50.0
          C43.9 53.7 44.6 58.2 47.9 60.6
          C51.1 63.0 55.8 62.8 58.1 59.8
        "
        stroke="url(#gold)"
        strokeWidth={4.5}
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom curl */}
      <Path
        d="
          M56.3 83.8
          C55.0 87.2 50.9 88.5 47.0 87.0
          C43.3 85.6 42.0 82.3 43.5 79.7
          C44.8 77.4 47.6 77.0 49.4 78.7
          C51.1 80.3 50.5 82.5 48.6 83.0
        "
        stroke="url(#gold)"
        strokeWidth={4.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Fine highlight through lower loop */}
      <Path
        d="
          M47.0 49.2
          C45.2 52.7 45.8 56.5 48.7 58.6
          C51.2 60.4 54.6 60.2 56.7 58.3
        "
        stroke="#FFF1A0"
        strokeWidth={0.9}
        strokeLinecap="round"
        fill="none"
        opacity={0.8}
      />

      {/* =================================================
          SPARKLES
         ================================================= */}

      <Path
        d="
          M44 29
          C44.5 33.0 45.7 34.2 49.0 34.7
          C45.7 35.2 44.5 36.4 44 40.4
          C43.5 36.4 42.3 35.2 39 34.7
          C42.3 34.2 43.5 33.0 44 29
          Z
        "
        fill="url(#gold)"
      />

      <Path
        d="
          M73.5 35
          C74.0 40.2 75.4 41.7 79.9 42.3
          C75.4 42.9 74.0 44.4 73.5 49.6
          C73.0 44.4 71.6 42.9 67.1 42.3
          C71.6 41.7 73.0 40.2 73.5 35
          Z
        "
        fill="url(#gold)"
      />

      <Circle
        cx="44"
        cy="34.7"
        r="0.55"
        fill="#FFFBEA"
      />

      <Circle
        cx="73.5"
        cy="42.3"
        r="0.6"
        fill="#FFFBEA"
      />
    </Svg>
  );
};

export default MusicIcon;