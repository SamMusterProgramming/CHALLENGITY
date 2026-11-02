// import React from "react";
// import Svg, {
//   Path,
//   Circle,
//   Defs,
//   LinearGradient,
//   Stop,
// } from "react-native-svg";

// const GOLD = "#E8B95A";

// const ArenaIcon = ({
//   size = 32,
//   color = GOLD,
// }) => {
//   return (
//     <Svg
//       width={size}
//       height={size}
//       viewBox="0 0 100 100"
//       fill="none"
//     >
//       <Defs>
//         <LinearGradient
//           id="arenaOrbitGold"
//           x1="20"
//           y1="78"
//           x2="80"
//           y2="22"
//           gradientUnits="userSpaceOnUse"
//         >
//           <Stop
//             offset="0"
//             stopColor={color}
//             stopOpacity="0.78"
//           />

//           <Stop
//             offset="0.48"
//             stopColor={color}
//             stopOpacity="1"
//           />

//           <Stop
//             offset="1"
//             stopColor={color}
//             stopOpacity="0.86"
//           />
//         </LinearGradient>
//       </Defs>

//       {/* =====================================================
//           ORBIT — BACK SECTION
//           Elegant single elliptical sweep behind the talent.
//       ===================================================== */}

//       <Path
//         d="
//           M17.8 67.8
//           C25.4 51.0 45.8 34.5 66.8 29.0
//           C75.0 26.8 81.1 27.8 82.8 32.1
//           C84.5 36.6 80.6 42.5 73.0 48.3
//         "
//         stroke="url(#arenaOrbitGold)"
//         strokeWidth={3.8}
//         strokeLinecap="round"
//         fill="none"
//       />

//       {/* Soft highlight on upper orbit */}
//       <Path
//         d="
//           M65.8 30.0
//           C74.0 27.8 79.2 28.8 80.8 32.0
//         "
//         stroke="#FFE39A"
//         strokeWidth={0.85}
//         strokeLinecap="round"
//         opacity={0.28}
//       />

//       {/* =====================================================
//           ORBIT — FRONT SECTION
//           This is the strong sweeping foreground stroke.
//       ===================================================== */}

//       <Path
//         d="
//           M73.0 48.3
//           C63.0 57.0 49.0 66.5 34.7 73.2
//           C25.4 77.6 18.7 78.4 16.8 74.7
//           C15.0 71.1 18.2 65.0 23.9 58.2
//         "
//         stroke="url(#arenaOrbitGold)"
//         strokeWidth={4.0}
//         strokeLinecap="round"
//         fill="none"
//       />

//       {/* Foreground orbit highlight */}
//       <Path
//         d="
//           M70.0 51.0
//           C60.0 59.2 47.5 66.9 34.8 72.7
//           C26.6 76.4 20.9 77.0 19.1 74.5
//         "
//         stroke="#FFE39A"
//         strokeWidth={0.85}
//         strokeLinecap="round"
//         opacity={0.25}
//       />

//       {/* =====================================================
//           TALENT HEAD
//       ===================================================== */}

//       <Circle
//         cx={49.8}
//         cy={30.0}
//         r={6.3}
//         fill="url(#arenaOrbitGold)"
//       />

//       {/* Head highlight */}
//       <Circle
//         cx={47.8}
//         cy={28.0}
//         r={1.45}
//         fill="#FFE39A"
//         opacity={0.30}
//       />

//       {/* =====================================================
//           TALENT BODY
//           Clean vertical diamond, matching the reference.
//       ===================================================== */}

//       <Path
//         d="
//           M49.8 37.2
//           L59.5 48.1
//           L49.8 65.8
//           L40.1 48.1
//           Z
//         "
//         fill="url(#arenaOrbitGold)"
//       />

//       {/* Body inner metallic light */}
//       <Path
//         d="
//           M49.8 39.0
//           L49.8 64.0
//           L52.8 58.5
//           L57.6 48.3
//           Z
//         "
//         fill="#FFE39A"
//         opacity={0.20}
//       />

//       {/* Fine body glint */}
//       <Path
//         d="
//           M49.8 39.5
//           V62.0
//         "
//         stroke="#FFF0B7"
//         strokeWidth={0.7}
//         strokeLinecap="round"
//         opacity={0.20}
//       />

//       {/* =====================================================
//           UPPER ORBIT NODE
//           Small floating talent marker.
//       ===================================================== */}

//       <Circle
//         cx={27.0}
//         cy={30.0}
//         r={3.3}
//         fill="url(#arenaOrbitGold)"
//       />

//       {/* Upper node highlight */}
//       <Circle
//         cx={26.0}
//         cy={29.0}
//         r={0.9}
//         fill="#FFE39A"
//         opacity={0.35}
//       />

//       {/* =====================================================
//           RIGHT ORBIT NODE
//       ===================================================== */}

//       <Circle
//         cx={70.8}
//         cy={48.0}
//         r={4.7}
//         fill="url(#arenaOrbitGold)"
//       />

//       {/* Right node highlight */}
//       <Circle
//         cx={69.3}
//         cy={46.5}
//         r={1.15}
//         fill="#FFE39A"
//         opacity={0.30}
//       />

//       {/* =====================================================
//           SUBTLE CONNECTION GLINT
//       ===================================================== */}

//       <Path
//         d="
//           M56.2 47.8
//           C61.5 47.2 66.0 47.2 69.2 47.8
//         "
//         stroke="#FFF0B7"
//         strokeWidth={0.65}
//         strokeLinecap="round"
//         opacity={0.18}
//       />
//     </Svg>
//   );
// };

// export default ArenaIcon;


import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#EAB303";

const ArenaIcon = ({
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
          id="arenaOrbitGold"
          x1="20"
          y1="78"
          x2="80"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor={color}
            stopOpacity="0.78"
          />

          <Stop
            offset="0.48"
            stopColor={color}
            stopOpacity="1"
          />

          <Stop
            offset="1"
            stopColor={color}
            stopOpacity="0.86"
          />
        </LinearGradient>

        <LinearGradient
          id="arenaNodeGold"
          x1="17"
          y1="42"
          x2="83"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <Stop
            offset="0"
            stopColor="#FFF0B7"
            stopOpacity="0.95"
          />

          <Stop
            offset="0.45"
            stopColor={color}
            stopOpacity="1"
          />

          <Stop
            offset="1"
            stopColor={color}
            stopOpacity="0.78"
          />
        </LinearGradient>
      </Defs>

      {/* =====================================================
          ORBIT — BACK SECTION
      ===================================================== */}

      <Path
        d="
          M17.8 67.8
          C25.4 51.0 45.8 34.5 66.8 29.0
          C75.0 26.8 81.1 27.8 82.8 32.1
          C84.5 36.6 80.6 42.5 73.0 48.3
        "
        stroke="url(#arenaOrbitGold)"
        strokeWidth={3.8}
        strokeLinecap="round"
        fill="none"
      />

      {/* Soft highlight on upper orbit */}
      <Path
        d="
          M65.8 30.0
          C74.0 27.8 79.2 28.8 80.8 32.0
        "
        stroke="#FFE39A"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.28}
      />

      {/* =====================================================
          ORBIT — FRONT SECTION
      ===================================================== */}

      <Path
        d="
          M73.0 48.3
          C63.0 57.0 49.0 66.5 34.7 73.2
          C25.4 77.6 18.7 78.4 16.8 74.7
          C15.0 71.1 18.2 65.0 23.9 58.2
        "
        stroke="url(#arenaOrbitGold)"
        strokeWidth={4.0}
        strokeLinecap="round"
        fill="none"
      />

      {/* Foreground orbit highlight */}
      <Path
        d="
          M70.0 51.0
          C60.0 59.2 47.5 66.9 34.8 72.7
          C26.6 76.4 20.9 77.0 19.1 74.5
        "
        stroke="#FFE39A"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.25}
      />

      {/* =====================================================
          TALENT HEAD
      ===================================================== */}

      <Circle
        cx={49.8}
        cy={30.0}
        r={6.3}
        fill="url(#arenaOrbitGold)"
      />

      {/* Head highlight */}
      <Circle
        cx={47.8}
        cy={28.0}
        r={1.45}
        fill="#FFE39A"
        opacity={0.30}
      />

      {/* =====================================================
          TALENT BODY
      ===================================================== */}

      <Path
        d="
          M49.8 37.2
          L59.5 48.1
          L49.8 65.8
          L40.1 48.1
          Z
        "
        fill="url(#arenaOrbitGold)"
      />

      {/* Body inner metallic light */}
      <Path
        d="
          M49.8 39.0
          L49.8 64.0
          L52.8 58.5
          L57.6 48.3
          Z
        "
        fill="#FFE39A"
        opacity={0.20}
      />

      {/* Fine body glint */}
      <Path
        d="
          M49.8 39.5
          V62.0
        "
        stroke="#FFF0B7"
        strokeWidth={0.7}
        strokeLinecap="round"
        opacity={0.20}
      />

      {/* =====================================================
          LEFT FLOATING DIAMOND
          Completely outside the orbit.
      ===================================================== */}

      <Path
        d="
          M22 33
          C22.7 36.4 23.6 37.3 27 38
          C23.6 38.7 22.7 39.6 22 43
          C21.3 39.6 20.4 38.7 17 38
          C20.4 37.3 21.3 36.4 22 33
          Z
        "
        fill="url(#arenaNodeGold)"
      />

      {/* Left diamond highlight */}
      <Path
        d="
          M22 35.2
          C22.3 36.7 22.9 37.4 24.2 38
          C22.9 38.3 22.3 39.0 22 40.8
        "
        stroke="#FFF2BC"
        strokeWidth={0.65}
        strokeLinecap="round"
        opacity={0.42}
      />

      {/* =====================================================
          RIGHT FLOATING DIAMOND
          Completely outside the orbit.
      ===================================================== */}

      <Path
        d="
          M80 52
          C80.7 55.4 81.6 56.3 85 57
          C81.6 57.7 80.7 58.6 80 62
          C79.3 58.6 78.4 57.7 75 57
          C78.4 56.3 79.3 55.4 80 52
          Z
        "
        fill="url(#arenaNodeGold)"
      />

      {/* Right diamond highlight */}
      <Path
        d="
          M80 54.2
          C80.3 55.7 80.9 56.4 82.2 57
          C80.9 57.3 80.3 58.0 80 59.8
        "
        stroke="#FFF2BC"
        strokeWidth={0.65}
        strokeLinecap="round"
        opacity={0.42}
      />
    </Svg>
  );
};

export default ArenaIcon;