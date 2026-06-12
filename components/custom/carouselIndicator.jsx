// import React from "react";
// import { View, Text, Animated } from "react-native";
// import StatusDisplayer from "./statusDisplayer";

// export default function CarouselIndicator({
//   title ="Performances",
//   count = 0,
//   scrollX,
//   width,
//   position,
//   absolute = true,
//   size = width /45 ,
//   rank = null,
//   votes = null,
//   status = null,
//   left
// }) {
//   return (
//     <View 
//     style = {{ 
//                position : absolute && "absolute",
//                bottom : absolute && position.bottom && position.bottom ,
//                top : absolute && position.top && position.top , 
//                left: absolute && position.left && position.left,
//                right: absolute && position.right && position.right}}
//     className=" flex-row items-end  gap-2 h-8 b g-black ">
     
//       <Text
//         style={{ fontSize: size }}
//         className="text-gold font-black uppercase trac king-wider " >
//         {title}{" "}
//       </Text>

//       <View className="flex-row justify-center items-center gap-1 ">
//         {Array.from({ length: count }).map((_, index) => {
//           const inputRange = [
//             (index - 1) * width,
//             index * width,
//             (index + 1) * width,
//           ];

//           const opacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.5, 1.6, 0.5],
//             extrapolate: "clamp",
//           });

//           const scale = scrollX.interpolate({
//             inputRange,
//             outputRange: [1, 1, 1],
//             extrapolate: "clamp",
//           });

//           return (
//             <Animated.View
//               key={index}
//               style={{
//                 opacity,
//                 transform: [{ scale }],
//                 width: width/40,
//                 height: size + 8,
//                 // borderRadius: 50,
//                 // backgroundColor:  "#facc15", 
//               }}
//               className ="items-center justify-end border-t-2 border-white"
//             >
//                 <Text
//                   style={{
//                      fontSize: size / 0.8,
//                     //  borderBottomWidth : 2,
//                     //  borderColor : "white"
//                      }}
                  
//                   className="text-gold font-semibold ">
//                      {index + 1}
//                 </Text>
//             </Animated.View>
//           );
//         })}
//       </View>
   

//     </View>
//   );
// }

import React from "react";
import { View, Text, Animated } from "react-native";
import StatusDisplayer from "./statusDisplayer";

export default function CarouselIndicator({
  title = "Performances",
  count = 0,
  scrollX,
  width,
  position,
  absolute = true,
  size = width / 45,
  rank = null,
  votes = null,
  status = null,
  left,
}) {
  return (
    <View
      style={{
        position: absolute ? "absolute" : "relative",
        bottom: absolute ? position?.bottom : undefined,
        top: absolute ? position?.top : undefined,
        left: absolute ? position?.left : undefined,
        right: absolute ? position?.right : undefined,
      }}
      className="flex-col-reverse items-center  gap-2 h- 8"
    >
      <Text
        style={{ fontSize: size }}
        className="text-white font-bold uppercase tracking-wider"
      >
        {title}
      </Text>

      <View className="flex-row justify-center items-center gap-3">
        {Array.from({ length: count }).map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const indicatorOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.15, 1],
            extrapolate: "clamp",
          });

          const textOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: width / 48,
                height: size + 12,
                transform: [{ scale }],
              }}
              className="items-center gap- 2 justify-end "
            >
              {/* Active Top Border */}
              <Animated.View
                style={{
                  position: "absolute",
                  top: 2,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: "#D4AF37",
                  opacity: indicatorOpacity,
                }}
              />

              <Animated.Text
                style={{
                  fontSize: size / 0.8,
                  opacity: textOpacity,
                }}
                className="text-gold font-semibold"
              >
                {index + 1}
              </Animated.Text>
            </Animated.View>
          );
        })}
      </View>

      {(rank || votes || status) && (
        <StatusDisplayer
          rank={rank}
          votes={votes}
          status={status}
        />
      )}
    </View>
  );
}