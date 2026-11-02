import React from "react";
import Svg, {
  Path,
  Circle,
  Polygon,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const GOLD = "#E8B95A";

const FollowingsIcon = ({
  size = 28,
  color = GOLD,
  strokeWidth = 3.2,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="8 8 84 84"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient
          id="followingMetal"
          x1="18"
          y1="16"
          x2="78"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={color} stopOpacity={0.58} />
          <Stop offset="0.24" stopColor={color} />
          <Stop offset="0.5" stopColor={color} stopOpacity={0.96} />
          <Stop offset="0.76" stopColor={color} stopOpacity={0.7} />
          <Stop offset="1" stopColor={color} />
        </LinearGradient>
      </Defs>

      {/* UPPER CONNECTION */}
      <Path
        d="M48 47 C43 39 37 32 30 27"
        stroke="url(#followingMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* LOWER-LEFT CONNECTION */}
      <Path
        d="M48 47 C40 51 34 58 28 65"
        stroke="url(#followingMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* LOWER-RIGHT CONNECTION */}
      <Path
        d="M48 47 C56 51 63 58 69 66"
        stroke="url(#followingMetal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* TOP TALENT */}
      <Circle
        cx="28"
        cy="25"
        r="7"
        fill="url(#followingMetal)"
      />

      <Circle
        cx="28"
        cy="25"
        r="2.4"
        fill={color}
        opacity={0.42}
      />

      {/* LEFT TALENT */}
      <Circle
        cx="25"
        cy="69"
        r="7"
        fill="url(#followingMetal)"
      />

      <Circle
        cx="25"
        cy="69"
        r="2.4"
        fill={color}
        opacity={0.42}
      />

      {/* RIGHT TALENT */}
      <Circle
        cx="72"
        cy="69"
        r="7"
        fill="url(#followingMetal)"
      />

      <Circle
        cx="72"
        cy="69"
        r="2.4"
        fill={color}
        opacity={0.42}
      />

      {/* CENTRAL USER / CONNECTION */}
      <Polygon
        points="48,37 58,47 48,57 38,47"
        fill="url(#followingMetal)"
      />

      <Polygon
        points="48,42 53,47 48,52 43,47"
        fill={color}
        opacity={0.28}
      />

      <Circle
        cx="48"
        cy="47"
        r="2.5"
        fill={color}
        opacity={0.82}
      />

      {/* TALENT HALOS */}
      <Circle
        cx="28"
        cy="25"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth={0.75}
        opacity={0.16}
      />

      <Circle
        cx="25"
        cy="69"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth={0.75}
        opacity={0.16}
      />

      <Circle
        cx="72"
        cy="69"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth={0.75}
        opacity={0.16}
      />

      <Circle
        cx="48"
        cy="47"
        r="7"
        fill="none"
        stroke={color}
        strokeWidth={0.8}
        opacity={0.22}
      />

      {/* LARGE FOLLOWING / FORWARD SYMBOL */}
      <Circle
        cx="76"
        cy="20"
        r="13"
        fill="none"
        stroke={color}
        strokeWidth={0.9}
        opacity={0.16}
      />

      {/* FORWARD DIRECTION */}
      <Path
        d="M67 20 H84"
        stroke="url(#followingMetal)"
        strokeWidth={4}
        strokeLinecap="round"
      />

      <Path
        d="M77 13 L84 20 L77 27"
        fill="none"
        stroke="url(#followingMetal)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ARROW INNER HIGHLIGHT */}
      <Path
        d="M69 20 H81"
        stroke={color}
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.38}
      />

      <Path
        d="M78 15 L83 20 L78 25"
        fill="none"
        stroke={color}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.38}
      />
    </Svg>
  );
};

export default FollowingsIcon;