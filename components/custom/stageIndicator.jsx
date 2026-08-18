// import React from "react";
// import { View, Text, Animated } from "react-native";
// import StatusDisplayer from "./statusDisplayer";
// import { useGlobalContext } from "../../context/GlobalProvider";

// export default function StageIndicator({
//   title = "Performances",
//   count = 0,
//   scrollX,
//   width,
//   position,
//   absolute = true,
//   size = width / 45,
//   rank = null,
//   votes = null,
//   status = null,
//   left,
// }) {
//     const {colorTheme} = useGlobalContext()
//   return (
//     <View
//       style={{
    
//       }}
//       className="flex-row w-full px- 2 items-end  gap-2 h- 8"
//     >
//       <Text
//         style={{ fontSize: size * 1.2 }}
//         className="text-white font-bold uppercase tracking-wider"
//       >
//         {title}
//       </Text>

//       <View className="flex-row justify-center items-center gap-3">
//         {Array.from({ length: count }).map((_, index) => {
//           const inputRange = [
//             (index - 1) * width,
//             index * width,
//             (index + 1) * width,
//           ];

//           const indicatorOpacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0, 1, 0],
//             extrapolate: "clamp",
//           });

//           const scale = scrollX.interpolate({
//             inputRange,
//             outputRange: [1, 1, 1],
//             extrapolate: "clamp",
//           });

//           const textOpacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.7, 1.4, 0.7],
//             extrapolate: "clamp",
//           });

//           return (
//             <Animated.View
//               key={index}
//               style={{
//                 width: width / 48,
//                 height: size + 10,
//                 transform: [{ scale }],
//               }}
//               className="items-center gap- 2 justify-end "
//             >
//               {/* Active Top Border */}
//               {/* <Animated.View
//                 style={{
//                   position: "absolute",
//                   top: 2,
//                   left: 0,
//                   right: 0,
//                   height: 2,
//                   backgroundColor: "#D4AF37",
//                   opacity: indicatorOpacity,
//                 }}
//               /> */}

//               <Animated.Text
//                 style={{
//                   fontSize: size / 0.9,
//                   opacity: textOpacity,
//                   color: colorTheme
//                 }}
//                 className="text-gold font-semibold"
//               >
//                 {index + 1}
//               </Animated.Text>
//             </Animated.View>
//           );
//         })}
//       </View>
//         {(rank || votes || status) && (
//         <StatusDisplayer
//           rank={rank}
//           votes={votes}
//           status={status}
//       />
//       )}
//     </View>
//   );
// }

import React from "react";
import {
  View,
  Text,
  Animated,
} from "react-native";

import StatusDisplayer from "./statusDisplayer";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function StageIndicator({
  title = "Performances",
  count = 0,
  width,
  currentStage
}) {
  const { colorTheme } = useGlobalContext();

 

  return (
    <View className="w-full px- 4">

      <View className="flex-row items-center bg-black py-4 px-2 mt- 1 justify-between">

        {/* LEFT */}
        <View
        className ="flex-row gap-2 items-end justify-center">

          <Text
            style={{
              fontSize: width / 34,
              fontWeight : "900"
              // letterSpacing: 1,
            //   color: colorTheme
            }}
            className="text-zinc-200 uppercase fon t-bold"
          >
            {title}
          </Text>

          <View className="flex-row items-center mt- 1">
            <Text
                style={{
                    fontSize: width / 30,
                    color: colorTheme,
                    fontWeight: "800",
                }}
                >
                {currentStage + 1}
                </Text>

                <Text
                className="text-white ml-1"
                style={{
                    fontSize: width / 30,
                    fontWeight: "800",
                }}
                >
                / {count}
            </Text>
          </View>
        </View>

        {/* CENTER DOTS */}
        {count > 1 && (
          <View className="flex-row items-center gap-2">
            {Array.from({ length: count }).map(
              (_, index) => {

                // const inputRange = [
                //   (index - 1) * width,
                //   index * width,
                //   (index + 1) * width,
                // ];

                // const opacity =
                //   scrollX?.interpolate({
                //     inputRange,
                //     outputRange: [0.25, 1, 0.25],
                //     extrapolate: "clamp",
                //   }) || 0.25;

                // const scale =
                //   scrollX?.interpolate({
                //     inputRange,
                //     outputRange: [1, 1.1, 1],
                //     extrapolate: "clamp",
                //   }) || 1;

                return (
                  <View
                    key={index}
                    style={{
                      // opacity,
                      // transform: [{ scale }],
                      width: width / 45,
                      height: width / 45,
                      borderRadius: 999,
                      backgroundColor: currentStage === index ? colorTheme : "rgba(255,255,255,0.25)" ,
                    }}
                  />
                );
              }
            )}

          </View>
        )}

        {/* RIGHT */}
       

      </View>

    </View>
  );
}