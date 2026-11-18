
import React from "react";
import Svg, {
  Path,
  Circle,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#B99A60";

const BeatMakingIcon = ({ size = 32, color = GOLD }) => {
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
          id="beatMakingGold"
          x1="18"
          y1="22"
          x2="82"
          y2="86"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D6BD87" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#8C7148" />
        </LinearGradient>
      </Defs>

      {/* Sampler body */}
      <Rect
        x="10"
        y="22"
        width="80"
        height="65"
        rx="7"
        fill="url(#beatMakingGold)"
        stroke="#806640"
        strokeWidth="1.8"
      />

      {/* Inner panel */}
      <Rect
        x="15"
        y="27"
        width="70"
        height="55"
        rx="4"
        stroke="#E2CCA0"
        strokeOpacity="0.65"
        strokeWidth="1"
      />

      {/* Display */}
      <Rect
        x="19"
        y="31"
        width="28"
        height="13"
        rx="2"
        fill="#624B2C"
        stroke="#806640"
        strokeWidth="1"
      />

      {/* Waveform on display */}
      <Path
        d="M22 38L25 38L27 34L30 41L33 35L36 39L39 36L43 38"
        stroke="#D6BD87"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Control knobs */}
      <Circle cx="57" cy="36" r="5" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />
      <Circle cx="57" cy="36" r="2" fill="#D6BD87" />

      <Circle cx="72" cy="36" r="5" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />
      <Circle cx="72" cy="36" r="2" fill="#D6BD87" />

      {/* Drum pads */}
      <Rect x="19" y="51" width="12" height="11" rx="2" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />
      <Rect x="34" y="51" width="12" height="11" rx="2" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />
      <Rect x="49" y="51" width="12" height="11" rx="2" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />
      <Rect x="64" y="51" width="12" height="11" rx="2" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />

      <Rect x="19" y="66" width="12" height="11" rx="2" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />
      <Rect x="34" y="66" width="12" height="11" rx="2" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />
      <Rect x="49" y="66" width="12" height="11" rx="2" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />
      <Rect x="64" y="66" width="12" height="11" rx="2" fill="#806640" stroke="#E2CCA0" strokeWidth="1" />

      {/* Pad highlights */}
      <Path
        d="M22 54H28M37 54H43M52 54H58M67 54H73"
        stroke="#D6BD87"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Active pad indicators */}
      <Circle cx="25" cy="59" r="1" fill="#D6BD87" />
      <Circle cx="55" cy="59" r="1" fill="#D6BD87" />
      <Circle cx="40" cy="74" r="1" fill="#D6BD87" />

      {/* Sound level accents */}
      <Path
        d="M36 14V18M43 10V18M50 13V18M57 8V18M64 12V18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default BeatMakingIcon;
