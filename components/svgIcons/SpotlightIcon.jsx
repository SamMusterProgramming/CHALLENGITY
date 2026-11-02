import React from "react";
import Svg, {
  Path,
  Ellipse,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#EAB303";

const SpotlightIcon = ({
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
        {/* =====================================================
            GOLD METAL
        ===================================================== */}

        <LinearGradient
          id="spotlightMetal"
          x1="24"
          y1="20"
          x2="76"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor="#B87918"
            stopOpacity="0.95"
          />

          <Stop
            offset="0.18"
            stopColor={color}
            stopOpacity="1"
          />

          <Stop
            offset="0.48"
            stopColor="#FFF0A8"
            stopOpacity="1"
          />

          <Stop
            offset="0.62"
            stopColor={color}
            stopOpacity="1"
          />

          <Stop
            offset="1"
            stopColor="#B97818"
            stopOpacity="0.95"
          />
        </LinearGradient>

        {/* =====================================================
            BRIGHT BEAM
        ===================================================== */}

        <LinearGradient
          id="spotlightBeam"
          x1="50"
          y1="25"
          x2="50"
          y2="84"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor="#FFFBE1"
            stopOpacity="0.92"
          />

          <Stop
            offset="0.18"
            stopColor="#FFF0A8"
            stopOpacity="0.72"
          />

          <Stop
            offset="0.55"
            stopColor="#FFE28A"
            stopOpacity="0.40"
          />

          <Stop
            offset="1"
            stopColor="#FFD45F"
            stopOpacity="0.08"
          />
        </LinearGradient>

        {/* =====================================================
            BEAM CORE
        ===================================================== */}

        <LinearGradient
          id="spotlightCore"
          x1="50"
          y1="27"
          x2="50"
          y2="82"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor="#FFFFFF"
            stopOpacity="0.82"
          />

          <Stop
            offset="0.35"
            stopColor="#FFF5C9"
            stopOpacity="0.52"
          />

          <Stop
            offset="1"
            stopColor="#FFE28A"
            stopOpacity="0.02"
          />
        </LinearGradient>

        {/* =====================================================
            LENS GLOW
        ===================================================== */}

        <RadialGradient
          id="spotlightLens"
          cx="50"
          cy="28"
          r="17"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor="#FFFFFF"
            stopOpacity="1"
          />

          <Stop
            offset="0.35"
            stopColor="#FFF7CE"
            stopOpacity="1"
          />

          <Stop
            offset="0.72"
            stopColor="#FFE38A"
            stopOpacity="0.95"
          />

          <Stop
            offset="1"
            stopColor={color}
            stopOpacity="0.55"
          />
        </RadialGradient>

        {/* =====================================================
            BOTTOM LIGHT GLOW
        ===================================================== */}

        <RadialGradient
          id="spotlightPool"
          cx="50"
          cy="81"
          rx="42"
          ry="13"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor="#FFFFFF"
            stopOpacity="0.98"
          />

          <Stop
            offset="0.22"
            stopColor="#FFF5C4"
            stopOpacity="0.92"
          />

          <Stop
            offset="0.55"
            stopColor="#FFD967"
            stopOpacity="0.62"
          />

          <Stop
            offset="0.82"
            stopColor={color}
            stopOpacity="0.25"
          />

          <Stop
            offset="1"
            stopColor={color}
            stopOpacity="0"
          />
        </RadialGradient>
      </Defs>

      {/* =====================================================
          LARGE OUTER LIGHT GLOW
      ===================================================== */}

      <Ellipse
        cx="50"
        cy="81"
        rx="43"
        ry="10"
        fill="url(#spotlightPool)"
        opacity={0.72}
      />

      {/* =====================================================
          MAIN LIGHT BEAM
          Wide and strongly expanding toward the bottom.
      ===================================================== */}

      <Path
        d="
          M37.2 27.5
          L17.0 79.5
          C16.6 80.8 17.7 82.0 19.0 82.0
          H81.0
          C82.3 82.0 83.4 80.8 83.0 79.5
          L62.8 27.5
          Z
        "
        fill="url(#spotlightBeam)"
      />

      {/* =====================================================
          LEFT BEAM EDGE
      ===================================================== */}

      <Path
        d="
          M37.2 28
          L17.8 79.5
        "
        stroke="#FFE89A"
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* =====================================================
          RIGHT BEAM EDGE
      ===================================================== */}

      <Path
        d="
          M62.8 28
          L82.2 79.5
        "
        stroke="#FFE89A"
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* =====================================================
          CENTRAL BEAM CORE
      ===================================================== */}

      <Path
        d="
          M44.5 28
          L34.8 79.5
          H65.2
          L55.5 28
          Z
        "
        fill="url(#spotlightCore)"
        opacity={0.85}
      />

      {/* =====================================================
          SUBTLE BEAM RAYS
      ===================================================== */}

      <Path
        d="
          M40.5 30
          L28 77
        "
        stroke="#FFF3BE"
        strokeWidth={0.65}
        strokeLinecap="round"
        opacity={0.24}
      />

      <Path
        d="
          M59.5 30
          L72 77
        "
        stroke="#FFF3BE"
        strokeWidth={0.65}
        strokeLinecap="round"
        opacity={0.24}
      />

      {/* =====================================================
          LARGE BOTTOM LIGHT POOL
      ===================================================== */}

      <Ellipse
        cx="50"
        cy="80.5"
        rx="32"
        ry="7.8"
        fill="url(#spotlightPool)"
        opacity={0.95}
      />

      {/* Bright outer rim */}
      <Ellipse
        cx="50"
        cy="80.3"
        rx="30"
        ry="6.5"
        stroke="#FFE58A"
        strokeWidth={1.35}
        opacity={0.85}
      />

      {/* Main luminous pool */}
      <Ellipse
        cx="50"
        cy="80"
        rx="24"
        ry="4.5"
        fill="#FFF0A8"
        opacity={0.58}
      />

      {/* Hot center */}
      <Ellipse
        cx="50"
        cy="79.5"
        rx="14"
        ry="2.35"
        fill="#FFFFFF"
        opacity={0.80}
      />

      {/* =====================================================
          SPOTLIGHT HOUSING
      ===================================================== */}

      <Path
        d="
          M34.2 17.5
          C34.2 14.7 36.6 12.5 39.4 12.5
          H60.6
          C63.4 12.5 65.8 14.7 65.8 17.5
          L66.8 27.2
          C66.9 29.4 65.1 31.2 62.9 31.2
          H37.1
          C34.9 31.2 33.1 29.4 33.2 27.2
          Z
        "
        fill="url(#spotlightMetal)"
      />

      {/* =====================================================
          TOP CAP
      ===================================================== */}

      <Ellipse
        cx="50"
        cy="14.2"
        rx="10.5"
        ry="3.8"
        fill="url(#spotlightMetal)"
      />

      <Path
        d="
          M39.5 14.5
          C40.0 11.8 43.9 9.8 50 9.8
          C56.1 9.8 60.0 11.8 60.5 14.5
        "
        fill="none"
        stroke="#FFF0A8"
        strokeWidth={0.8}
        opacity={0.35}
      />

      {/* =====================================================
          LOWER METAL RIM
      ===================================================== */}

      <Ellipse
        cx="50"
        cy="29"
        rx="17.2"
        ry="5.8"
        fill="url(#spotlightMetal)"
      />

      {/* Inner rim */}
      <Ellipse
        cx="50"
        cy="28.3"
        rx="14.1"
        ry="4.15"
        fill="#C98A26"
        opacity={0.72}
      />

      {/* =====================================================
          BRIGHT LENS
      ===================================================== */}

      <Ellipse
        cx="50"
        cy="27.6"
        rx="11.8"
        ry="3.55"
        fill="url(#spotlightLens)"
      />

      {/* Lens hot center */}
      <Ellipse
        cx="50"
        cy="27.2"
        rx="7.1"
        ry="1.85"
        fill="#FFFBE7"
        opacity={0.92}
      />

      {/* Lens reflection */}
      <Ellipse
        cx="46.8"
        cy="26.5"
        rx="3.3"
        ry="0.75"
        fill="#FFFFFF"
        opacity={0.52}
      />
    </Svg>
  );
};

export default SpotlightIcon;