import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const ArenaPortalIcon = ({
  size = 32,
  color = GOLD,
  strokeWidth = 2.35,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="14 11 72 67"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id="arenaCrestGold"
          x1="20"
          y1="77"
          x2="80"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor={color}
            stopOpacity={0.78}
          />
          <Stop
            offset="0.48"
            stopColor="#FFD978"
            stopOpacity={1}
          />
          <Stop
            offset="1"
            stopColor={color}
            stopOpacity={0.86}
          />
        </LinearGradient>
      </Defs>

      {/* OUTER ARENA COVER */}

      <Path
        d="M19 66 V38 C19 25.8 28.8 16.5 41 16.5"
        stroke="url(#arenaCrestGold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M81 66 V38 C81 25.8 71.2 16.5 59 16.5"
        stroke="url(#arenaCrestGold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M41 16.5 C44.1 15.1 47.1 14.5 50 14.5 C52.9 14.5 55.9 15.1 59 16.5"
        stroke={color}
        strokeWidth={1.45}
        strokeLinecap="round"
        opacity={0.78}
      />

      {/* INNER CONTOURS */}

      <Path
        d="M28 64 V42 C28 33.7 34.7 27 43 27"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        opacity={0.38}
      />

      <Path
        d="M72 64 V42 C72 33.7 65.3 27 57 27"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        opacity={0.38}
      />

      {/* CENTRAL ARENA CREST */}

      <Path
        d="M50 25 L63.5 30 V42 C63.5 51.2 57.9 57.4 50 61 C42.1 57.4 36.5 51.2 36.5 42 V30 Z"
        fill="url(#arenaCrestGold)"
        opacity={0.96}
      />

      <Path
        d="M50 29 L59.2 32.4 V41.4 C59.2 48.1 55.5 52.8 50 55.8 C44.5 52.8 40.8 48.1 40.8 41.4 V32.4 Z"
        fill="#08090B"
        opacity={0.92}
      />

      {/* TALENT MARK */}

      <Circle
        cx="50"
        cy="37"
        r="3.25"
        fill="url(#arenaCrestGold)"
      />

      <Path
        d="M50 41.5 L44.4 47 L46.7 52.2 H53.3 L55.6 47 Z"
        fill="url(#arenaCrestGold)"
      />

      <Path
        d="M50 43 L48.4 47 L50 50.5 L51.6 47 Z"
        fill="#FFE39A"
        opacity={0.24}
      />

      {/* SIDE MARKERS */}

      <Circle
        cx="25"
        cy="48"
        r="2.15"
        fill="url(#arenaCrestGold)"
      />

      <Circle
        cx="75"
        cy="48"
        r="2.15"
        fill="url(#arenaCrestGold)"
      />

      <Path
        d="M21 54 H28"
        stroke={color}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={0.6}
      />

      <Path
        d="M72 54 H79"
        stroke={color}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={0.6}
      />

      {/* ARENA FLOOR */}

      <Path
        d="M16 70 C25.5 65.3 37.3 63.2 50 63.2 C62.7 63.2 74.5 65.3 84 70"
        stroke="url(#arenaCrestGold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Path
        d="M24 69.7 C32.3 66.7 41.2 65.2 50 65.2 C58.8 65.2 67.7 66.7 76 69.7"
        stroke="#FFE39A"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.34}
      />

      {/* CROWN */}

      <Path
        d="M50 11.8 L51.1 14.8 L54.1 15.9 L51.1 17 L50 20 L48.9 17 L45.9 15.9 L48.9 14.8 Z"
        fill="#FFD978"
        opacity={0.92}
      />
    </Svg>
  );
};

export default ArenaPortalIcon;