import Svg, { Path } from "react-native-svg";

export default function FireIcon({
  size = 24,
  fired = false,
}) {
  const outerColor = fired
    ? "#ef4444"
    : "rgba(255,255,255,0.35)";

  const innerColor = fired
    ? "#fca5a5"
    : "rgba(255,255,255,0.15)";

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Outer Flame */}
      <Path
        d="M12.5 2.5C12.5 5.2 10.2  6.7 8.9 8.7C7.8 10.4 7.2 12 7.2 13.8C7.2 17.5 9.9 20.5 12 20.5C15.8 20.5 18.8 17.5 18.8 13.8C18.8 10.8 17.2 8.2 14.8 5.9C14.2 5.3 13.5 4.2 12.5 2.5Z"
        fill={outerColor}
      />

      {/* Inner Flame */}
      <Path
        d="M12.1 9.2C12.1 10.8 10.6 11.6 10.1 12.9C9.8 13.5 9.7 14.1 9.7 14.8C9.7 16.8 11.1 18.3 12.8 18.3C14.6 18.3 16 16.8 16 14.8C16 13.2 15.1 11.9 13.8 10.7C13.2 10.2 12.6 9.8 12.1 9.2Z"
        fill={innerColor}
      />
    </Svg>
  );
}