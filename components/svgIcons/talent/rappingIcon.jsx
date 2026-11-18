
import React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#C9A45C";

const RappingIcon = ({ size = 32, color = GOLD }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <Defs>
        <LinearGradient id="rapGold" x1="30" y1="15" x2="68" y2="82">
          <Stop offset="0" stopColor="#E2C887" />
          <Stop offset="0.5" stopColor={color} />
          <Stop offset="1" stopColor="#9C7943" />
        </LinearGradient>
      </Defs>

      {/* Microphone capsule */}
      <Path
        d="M50 12
           C40 12 34 20 34 30
           V48
           C34 58 40 65 50 65
           C60 65 66 58 66 48
           V30
           C66 20 60 12 50 12Z"
        fill="url(#rapGold)"
        stroke="#8F713C"
        strokeWidth="2"
      />

      {/* Microphone grille */}
      <Path
        d="M36 30H64M34 38H66M34 46H66M36 54H64"
        stroke="#72572F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <Path
        d="M42 17V59M50 14V63M58 17V59"
        stroke="#E9D4A5"
        strokeWidth="0.8"
        strokeOpacity="0.6"
      />

      {/* Microphone lower collar */}
      <Path
        d="M38 62Q50 70 62 62L62 68Q50 76 38 68Z"
        fill="#A98649"
        stroke="#8F713C"
        strokeWidth="1.5"
      />

      {/* Handle */}
      <Path
        d="M44 69V76
           C44 80 47 83 50 83
           C53 83 56 80 56 76
           V69"
        stroke="url(#rapGold)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Stand */}
      <Path
        d="M50 83V88M37 91H63"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Sound waves */}
      <Path
        d="M24 29C18 39 18 49 24 59"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <Path
        d="M76 29C82 39 82 49 76 59"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Outer sound accents */}
      <Path
        d="M14 23C5 38 5 51 14 66M86 23C95 38 95 51 86 66"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* Small accent */}
      <Circle cx="50" cy="30" r="2" fill="#F0DDAF" />
    </Svg>
  );
};

export default RappingIcon;
