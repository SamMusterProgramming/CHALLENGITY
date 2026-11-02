import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

/**
 * ITRI — Circle / Friends
 *
 * Group of people inside a curved social portal.
 *
 * Main person = user
 * Smaller people = friends / circle
 */

export const ProfileIcon = ({
  size = 30,
  color = GOLD,
  strokeWidth = 2.35,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="14 13 72 63"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient
          id="profileGold"
          x1="20"
          y1="74"
          x2="80"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor={color}
            stopOpacity="0.78"
          />

          <Stop
            offset="0.5"
            stopColor="#FFD978"
            stopOpacity="1"
          />

          <Stop
            offset="1"
            stopColor={color}
            stopOpacity="0.86"
          />
        </LinearGradient>
      </Defs>

      {/* =========================================
          CURVED CIRCLE COVER
          ========================================= */}

      <Path
        d="
          M19 66
          V39
          C19 26.8 28.8 17.5 41 17.5
        "
        stroke="url(#profileGold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="
          M81 66
          V39
          C81 26.8 71.2 17.5 59 17.5
        "
        stroke="url(#profileGold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="
          M41 17.5
          C44.2 16.1 47.1 15.5 50 15.5
          C52.9 15.5 55.8 16.1 59 17.5
        "
        stroke={color}
        strokeWidth={1.45}
        strokeLinecap="round"
        opacity={0.78}
      />

      {/* =========================================
          BACK LEFT PERSON
          ========================================= */}

      <Circle
        cx="36"
        cy="37"
        r="5.8"
        fill="url(#profileGold)"
        opacity={0.62}
      />

      <Path
        d="
          M24.5 64
          C24.8 55.8 29.5 49.8 36 49.8
          C39.2 49.8 42 51.1 44.1 53.2
        "
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.58}
      />

      {/* =========================================
          BACK RIGHT PERSON
          ========================================= */}

      <Circle
        cx="64"
        cy="37"
        r="5.8"
        fill="url(#profileGold)"
        opacity={0.62}
      />

      <Path
        d="
          M55.9 53.2
          C58 51.1 60.8 49.8 64 49.8
          C70.5 49.8 75.2 55.8 75.5 64
        "
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.58}
      />

      {/* =========================================
          MAIN PERSON
          ========================================= */}

      {/* Main head */}
      <Circle
        cx="50"
        cy="32"
        r="7.3"
        fill="url(#profileGold)"
      />

      {/* Main shoulders — LOWERED */}
      <Path
        d="
          M31 69
          C31 58.5 39.2 50.2 50 50.2
          C60.8 50.2 69 58.5 69 69
        "
        stroke="url(#profileGold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main inner highlight — lowered with shoulders */}
      <Path
        d="
          M37 66.2
          C39 59.4 43.2 54.5 50 54.5
          C56.8 54.5 61 59.4 63 66.2
        "
        stroke="#FFE39A"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.30}
      />

      {/* =========================================
          SUBTLE INNER PORTAL CONTOUR
          ========================================= */}

      <Path
        d="
          M27.5 63
          V43
          C27.5 34.9 33.7 28.5 41.5 28.5
        "
        stroke={color}
        strokeWidth={1.05}
        strokeLinecap="round"
        opacity={0.22}
      />

      <Path
        d="
          M72.5 63
          V43
          C72.5 34.9 66.3 28.5 58.5 28.5
        "
        stroke={color}
        strokeWidth={1.05}
        strokeLinecap="round"
        opacity={0.22}
      />

      {/* =========================================
          GROUP BASE
          ========================================= */}

      <Path
        d="
          M17 72.5
          C26.8 69.5 38.2 68
          50 68
          C61.8 68 73.2 69.5 83 72.5
        "
        stroke="url(#profileGold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Path
        d="
          M25 72.3
          C33.1 69.9 41.5 68.9 50 68.9
          C58.5 68.9 66.9 69.9 75 72.3
        "
        stroke="#FFE39A"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.30}
      />
    </Svg>
  );
};

export default ProfileIcon;