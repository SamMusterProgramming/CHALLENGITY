// import React from "react";
// import { View, Text } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// export default function SpotlightIcon({
//   size = 18,
//   showLabel = false,
//   label = "SPOTLIGHT",
// }) {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         paddingHorizontal: showLabel ? 9 : 6,
//         paddingVertical: showLabel ? 5 : 6,
//         borderRadius: 999,
//         backgroundColor: "rgba(20,16,5,0.88)",
//         borderWidth: 1,
//         borderColor: "rgba(234,179,8,0.55)",
       
//       }}
//     >
//       <MaterialCommunityIcons
//         name="star-four-points"
//         size={size}
//         color="#EAB308"
//       />

//       {showLabel && (
//         <Text
//           style={{
//             marginLeft: 5,
//             color: "#EAB308",
//             fontSize: Math.max(9, size * 0.55),
//             fontWeight: "800",
//             letterSpacing: 0.45,
//           }}
//         >
//           {label}
//         </Text>
//       )}
//     </View>
//   );
// }

import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SpotlightIcon({
  size = 18,
  showLabel = true,
  label = "SPOTLIGHT",
}) {
  const textSize = Math.max(9, size * 0.55);

  return (
    <View
      className={[
        "flex-row items-center justify-center",
        "rounded-full",
        "border border-yellow-500/55",
        "b g-[#141005]/40",
        showLabel ? "px-[9px] py-[5px]" : "px-[6px] py-[6px]",
      ].join(" ")}
    >
      <MaterialCommunityIcons
        name="star-four-points"
        size={size}
        color="#EAB308"
      />

      {showLabel && (
        <Text
          className="ml-[5px] font-extrabold tracking-[0.45px] text-yellow-500"
          style={{
            fontSize: textSize,
          }}
        >
          {label}
        </Text>
      )}
    </View>
  );
}