import React from "react";
import Svg, { Path } from "react-native-svg";

const GoogleIcon = ({ size = 20 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <Path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64Z"
      />

      <Path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.89l-3.87-3c-1.07.72-2.44 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.97H1.25v3.09A12 12 0 0 0 12 24Z"
      />

      <Path
        fill="#FBBC05"
        d="M5.25 14.29A7.22 7.22 0 0 1 4.87 12c0-.79.14-1.56.38-2.29V6.62H1.25A12 12 0 0 0 0 12c0 1.94.46 3.78 1.25 5.38l4-3.09Z"
      />

      <Path
        fill="#EA4335"
        d="M12 4.74c1.77 0 3.36.61 4.61 1.8l3.45-3.45C17.95 1.12 15.23 0 12 0A12 12 0 0 0 1.25 6.62l4 3.09C6.2 6.86 8.86 4.74 12 4.74Z"
      />
    </Svg>
  );
};

export default GoogleIcon;