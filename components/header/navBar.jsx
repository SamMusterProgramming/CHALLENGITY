// import { View, Text, TouchableOpacity, Animated } from "react-native";
// import { useRef, useEffect } from "react";

// const tabs = [
//   { name: "Home" },
//   { name: "Performances" },
//   { name: "Challenges" },
//   // { name: "Stats" },
//   { name: "Profile" }
// ];

// export default function TopStageNavBar({ activeIndex, setActiveIndex, width , headerHeight}) {

//   const animValues = useRef(tabs.map(() => new Animated.Value(0))).current;
//   useEffect(() => {
//     animValues.forEach((anim, i) => {
//       Animated.timing(anim, {
//         toValue: i === activeIndex ? 1 : 0,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();
//     });
//   }, [activeIndex]);

//   return (
//     <View
//       className ="flex- 1 items-center rounded-tr-xl flex-row bg-[#181818]"
//       style={{
//         // backgroundColor: "#0A0B0D",
//         // borderBottomWidth: 0.5,
//         borderColor: "rgba(255,255,255,0.05)",
//         // paddingVertical: 16,
//         width,
//         height : headerHeight * 0.45
//       }}
//     >
//       {/* 🔥 FIXED ROW */}
//       <View 
//       className ="flex-1 items-center flex-row justify-between px-3"
//       style={{ flexDirection: "row" }}>
//         {tabs.map((tab, index) => {
//           const scale = animValues[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: [0.95, 1.08],
//           });
//           const opacity = animValues[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: [0.8, 1],
//           });
//           return (
//             <TouchableOpacity
//               //  className = " w-[25%] "
//               key={tab.name}
//               onPress={() => setActiveIndex(index)}
//               activeOpacity = {0.8}
//               style={{
//                 // flex: 1,        
//                 alignItems: "center",  
//                 justifyContent : "center",
//               }}  >
//               <Animated.View
//                 style={{
//                   flex: 1,
//                   alignItems: "center",
//                   justifyContent : "center",
//                   transform: [{ scale }],
//                   opacity,
//                 }} >
//                 <Text
//                   style={{
//                     fontSize: width / 44,
//                     letterSpacing: 1.2,
//                     color: index === activeIndex ? "#E6C068" : "white",
//                   }}
//                   className="font-bold uppercase" >
//                   {tab.name}
//                 </Text>
                
//                 <Animated.View
//                   className = "justify-center absolute bottom-[15%] items-center mr-[0px]"
//                   style={{
//                     // marginTop: 4,
//                     height: 1,
//                     width:  tab.name.length * 7,
//                     borderRadius: 2,
//                     backgroundColor:"#E6C068",
//                     opacity: animValues[index],
//                   }}
//                  />
//               </Animated.View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Animated,
// } from "react-native";
// import {
//   useRef,
//   useEffect,
// } from "react";

// const tabs = [
//   {
//     name: "Home",
//     icon: "⌂",
//   },
//   {
//     name: "Performances",
//     icon: "▶",
//   },
//   {
//     name: "Challenges",
//     icon: "★",
//   },
//   {
//     name: "Profile",
//     icon: "◉",
//   },
// ];

// export default function TopStageNavBar({
//   activeIndex,
//   setActiveIndex,
//   width,
//   headerHeight,
// }) {

//   const animValues = useRef(
//     tabs.map(() => new Animated.Value(0))
//   ).current;

//   useEffect(() => {
//     animValues.forEach((anim, i) => {
//       Animated.timing(anim, {
//         toValue: i === activeIndex ? 1 : 0,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();
//     });
//   }, [activeIndex]);

//   return (
//     <View
//       style={{
//         width,
//         height: headerHeight * 0.5,
//         // backgroundColor: "#111010",
//         justifyContent: "center",
//       }}
//       className = "bg-white -[#111010] items-center"
//     >
//       <View
//         style={{
//           width,
//           flexDirection: "row",
//           // justifyContent: "space-evenly",
//           alignItems: "center",
//           // paddingHorizontal: 10,
//         }}
//         className = "justify-between px-3"
//       >
//         {tabs.map((tab, index) => {
//           const scale =
//             animValues[index].interpolate({
//               inputRange: [0, 1],
//               outputRange: [1, 1.08],
//             });
//           return (
//             <TouchableOpacity
//               key={tab.name}
//               activeOpacity={0.8}
//               onPress={() =>
//                 setActiveIndex(index)
//               }
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Animated.View
//                 style={{
//                   alignItems: "center",
//                   transform: [{ scale }],
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: width / 30,
//                     marginBottom: 2,
//                     color:
//                       index === activeIndex
//                         ? "#D4AF37"
//                         : "#777",
//                   }}
//                 >
//                   {tab.icon}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: width / 50,
//                     fontWeight: "800",
//                     letterSpacing: 0.2,
//                     color:
//                       index === activeIndex
//                         ? "#D4AF37"
//                         : "white",

//                     textShadowColor:
//                       index === activeIndex
//                         ? "rgba(212,175,55,0.35)"
//                         : "transparent",

//                     textShadowRadius: 8,
//                   }}
//                 >
//                   {tab.name.toUpperCase()}
//                 </Text>
//               </Animated.View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import {
  Home,
  Play,
  Trophy,
  User,
} from "lucide-react-native";

const TABS = [
  { name: "Home", Icon: Home },
  { name: "Stage", Icon: Play },
  { name: "Entry", Icon: Trophy },
  { name: "Arena", Icon: User },
];

export default function NavBar({
  activeIndex,
  setActiveIndex,
  width,
  headerHeight,
}) {
  const animValues = useRef(
    TABS.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animValues.map((anim, i) =>
      Animated.spring(anim, {
        toValue: i === activeIndex ? 1 : 0,
        useNativeDriver: true,
        friction: 7,
        tension: 80,
      })
    );
    Animated.parallel(animations).start();
  }, [activeIndex]);

  return (
    <View
      style={{ width, height: headerHeight * 0.4 }}
      className="bg -white/10 [primary] [#2a1f08] /80 justify-center border-b bor der-b b order-gold/40 [#35270c]"
    >
      <View className="flex-row items-center justify-between px-6">
        {TABS.map((tab, index) => {
          const scale = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1],
          });

          const opacity = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.45, 1],
          });

          const translateY = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, -2],
          });

          const Icon = tab.Icon;

          const isActive = index === activeIndex;

          return (
            <TouchableOpacity
              key={tab.name}
              activeOpacity={0.8}
              onPress={() => setActiveIndex(index)}
              className="fle x-1 items-center justify-center"
              style ={{
                height : "100%"
              }}
            >
              <Animated.View
                className="items-center justify-center gap-1 "
                style ={{
                  height : "100%"
                }}
              >
      
                {/* <Icon
                  size={12}
                  color={isActive ? "rgb(240 ,197,55, 1)" : "#8A8A8A"}
                  strokeWidth={3}
                /> */}

                <Text
                  className={` tracking-wide font-black ${
                    isActive ? "text-[#eab308]" : "text-white/90"
                  }`}
                  style={{ fontSize: width/30 }}  >
                  {tab.name.toUpperCase()}
                </Text>

              <Animated.View
                  className = "justify-center absolute bottom-[2] items-center "
                  style={{
                    // marginTop: 4,
                    height: 6,
                    width:  tab.name.length * 12,
                    borderRadius: 2,
                    backgroundColor: "#eab308" , //"rgb(240 ,197,55, 0.8)",
                    opacity: animValues[index],
                  }}
                 />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}