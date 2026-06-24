import Svg, { Path } from "react-native-svg";

export default function CommentIcon({
  size = 24,
  active = false,
}) {
  const color = active
    ? "#eab308"
    : "rgba(255,255,255,0.35)";

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      
      fill="none"
    >
      <Path
        d="M12 4C7.03 4 3 7.13 3 11C3 14.87 7.03 18 12 18C12.86 18 13.69 17.91 14.47 17.74L19.5 20L18.03 15.88C19.88 14.64 21 12.89 21 11C21 7.13 16.97 4 12 4Z"
        fill={color}
      />
    </Svg>
  );
}