import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, {
  Path,
  Circle,
  G,
  Line,
} from "react-native-svg";

const GOLD = "rgb(212,175,30)";


// ─────────────────────────────────────────────
// notification
// ─────────────────────────────────────────────

export const NotificationIcon = ({ size = 32, color = GOLD }) => {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
      >
        {/* Bell */}
        <Path
          d="
            M7.5 27.8
            C9.2 25.7 10.3 23.3 10.3 20
            V16.2
  
            C10.3 11.1 14.1 7.2 20 7.2
            C25.9 7.2 29.7 11.1 29.7 16.2
  
            V20
            C29.7 23.3 30.8 25.7 32.5 27.8
  
            H7.5
            Z
          "
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
  
        {/* Bottom clapper */}
        <Path
          d="
            M16.5 31
            C17.2 33
            18.3 34
            20 34
            C21.7 34
            22.8 33
            23.5 31
          "
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
  
        {/* Small top stem */}
        <Path
          d="M20 4.8 V6.8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    );
  };