
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

const VentriloquistIcon = ({ size = 32, color = GOLD }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="21.5 3.2 57.5 86.8"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        <LinearGradient id="ventriloGold" x1="25" y1="10" x2="75" y2="85">
          <Stop offset="0" stopColor="#8F5110" />
          <Stop offset="0.2" stopColor="#D58B20" />
          <Stop offset="0.42" stopColor="#FFD95B" />
          <Stop offset="0.55" stopColor="#FFF3A0" />
          <Stop offset="0.7" stopColor="#F5C13F" />
          <Stop offset="0.84" stopColor="#D98C20" />
          <Stop offset="0.94" stopColor={color} />
          <Stop offset="1" stopColor="#8D5010" />
        </LinearGradient>

        <RadialGradient id="ventriloFace" cx="45%" cy="30%" r="75%">
          <Stop offset="0" stopColor="#FFF5B0" />
          <Stop offset="0.45" stopColor="#FFD95A" />
          <Stop offset="0.78" stopColor="#E6A12B" />
          <Stop offset="1" stopColor="#A45E12" />
        </RadialGradient>

        <LinearGradient id="ventriloShadow" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F6BD3C" />
          <Stop offset="0.5" stopColor="#C87915" />
          <Stop offset="1" stopColor="#7C430B" />
        </LinearGradient>
      </Defs>

      {/* Puppet strings */}
      <Path
        d="M43 5 L43 19 M57 5 L57 19"
        stroke="url(#ventriloGold)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Circle cx="43" cy="5" r="1.5" fill="#FFF3A0" />
      <Circle cx="57" cy="5" r="1.5" fill="#FFF3A0" />

      {/* Rounded wooden puppet head */}
      <Path
        d="
          M34 24
          C35 19 40 17 50 17
          C60 17 65 19 66 24
          C69 29 70 36 68 45
          C67 51 64 57 59 61
          L58 68
          C55 72 45 72 42 68
          L41 61
          C36 57 33 51 32 45
          C30 36 31 29 34 24 Z
        "
        fill="url(#ventriloFace)"
        stroke="url(#ventriloShadow)"
        strokeWidth="1.8"
      />

      {/* Hair cap */}
      <Path
        d="
          M33 30
          C31 22 37 16 45 16
          C51 12 62 16 66 22
          C68 25 68 29 67 32
          C62 27 58 25 52 25
          C45 25 39 27 33 32 Z
        "
        fill="url(#ventriloShadow)"
        stroke="url(#ventriloGold)"
        strokeWidth="1.5"
      />

      {/* Eyes */}
      <Path
        d="M38 36 Q43 32 47 36"
        stroke="#8D5010"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M53 36 Q58 32 62 36"
        stroke="#8D5010"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="43" cy="38" r="2.1" fill="#FFF3A0" />
      <Circle cx="57" cy="38" r="2.1" fill="#FFF3A0" />
      <Circle cx="43" cy="38" r="0.9" fill="#7C430B" />
      <Circle cx="57" cy="38" r="0.9" fill="#7C430B" />

      {/* Nose */}
      <Path
        d="M48 39 Q46 45 49 47 Q51 48 53 46"
        stroke="#A45E12"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Upper mouth */}
      <Path
        d="M40 51 Q50 55 60 51"
        stroke="#8D5010"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Hinged lower jaw */}
      <Path
        d="
          M39 53
          Q50 59 61 53
          L59 62
          Q50 69 41 62 Z
        "
        fill="url(#ventriloShadow)"
        stroke="url(#ventriloGold)"
        strokeWidth="1.5"
      />

      {/* Jaw separation */}
      <Path
        d="M40 53 Q50 58 60 53"
        stroke="#7C430B"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Jaw hinge details */}
      <Circle cx="39" cy="53" r="1.7" fill="#FFF3A0" />
      <Circle cx="61" cy="53" r="1.7" fill="#FFF3A0" />

      {/* Puppet neck */}
      <Path
        d="M43 69 L43 75 Q50 79 57 75 L57 69"
        stroke="url(#ventriloGold)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Decorative highlights */}
      <Path
        d="M36 27 Q40 22 46 22"
        stroke="#FFF3A0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <Path
        d="M35 43 Q36 48 38 49"
        stroke="#FFF3A0"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </Svg>
  );
};

export default VentriloquistIcon;
