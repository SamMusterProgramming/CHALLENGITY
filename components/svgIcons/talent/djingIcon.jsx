
import React from "react";
import Svg, {
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#B99A60";

const DJingIcon = ({ size = 32, color = GOLD }) => {
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
          id="djGold"
          x1="18"
          y1="35"
          x2="82"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D6BD87" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#8C7148" />
        </LinearGradient>
      </Defs>

      {/* Headphone band */}
      <Path
        d="M32 35V27C32 15 40 8 50 8C60 8 68 15 68 27V35"
        stroke="#806640"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <Path
        d="M32 35V27C32 15 40 8 50 8C60 8 68 15 68 27V35"
        stroke="#D6BD87"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Left headphone cup */}
      <Path
        d="M27 25C22 25 19 29 19 35V42C19 48 23 51 28 49L33 46V30Z"
        fill="url(#djGold)"
        stroke="#806640"
        strokeWidth="1.5"
      />
      <Path
        d="M27 30V44"
        stroke="#E2CCA0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Right headphone cup */}
      <Path
        d="M73 25C78 25 81 29 81 35V42C81 48 77 51 72 49L67 46V30Z"
        fill="url(#djGold)"
        stroke="#806640"
        strokeWidth="1.5"
      />
      <Path
        d="M73 30V44"
        stroke="#E2CCA0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Controller body */}
      <Path
        d="M10 48Q10 44 15 44H85Q90 44 90 48V84Q90 89 85 89H15Q10 89 10 84Z"
        fill="url(#djGold)"
        stroke="#806640"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Controller top panel */}
      <Path
        d="M15 49H85V83H15Z"
        stroke="#E2CCA0"
        strokeOpacity="0.6"
        strokeWidth="1"
      />

      {/* Left turntable platter */}
      <Circle
        cx="29"
        cy="66"
        r="15"
        fill="#806640"
        stroke="#E2CCA0"
        strokeWidth="1.5"
      />
      <Circle
        cx="29"
        cy="66"
        r="12"
        stroke="#C9AD78"
        strokeWidth="1"
      />
      <Circle
        cx="29"
        cy="66"
        r="8"
        stroke="#B99A60"
        strokeWidth="1"
      />
      <Circle cx="29" cy="66" r="3" fill="#D6BD87" />

      {/* Right turntable platter */}
      <Circle
        cx="71"
        cy="66"
        r="15"
        fill="#806640"
        stroke="#E2CCA0"
        strokeWidth="1.5"
      />
      <Circle
        cx="71"
        cy="66"
        r="12"
        stroke="#C9AD78"
        strokeWidth="1"
      />
      <Circle
        cx="71"
        cy="66"
        r="8"
        stroke="#B99A60"
        strokeWidth="1"
      />
      <Circle cx="71" cy="66" r="3" fill="#D6BD87" />

      {/* Mixer center section */}
      <Path
        d="M47 52V79M53 52V79"
        stroke="#806640"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Mixer knobs */}
      <Circle cx="47" cy="56" r="2.5" fill="#E2CCA0" stroke="#806640" />
      <Circle cx="53" cy="56" r="2.5" fill="#E2CCA0" stroke="#806640" />

      {/* Vertical faders */}
      <Path
        d="M47 63V77M53 63V77"
        stroke="#806640"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M44.5 68H49.5M50.5 73H55.5"
        stroke="#E2CCA0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Crossfader */}
      <Path
        d="M39 82H61"
        stroke="#806640"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M49 82H53"
        stroke="#E2CCA0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Controller buttons */}
      <Circle cx="17" cy="53" r="1.5" fill="#E2CCA0" />
      <Circle cx="83" cy="53" r="1.5" fill="#E2CCA0" />

      {/* Small sound accents */}
      <Path
        d="M8 30Q3 36 8 42M92 30Q97 36 92 42"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </Svg>
  );
};

export default DJingIcon;
