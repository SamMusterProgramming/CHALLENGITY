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
  Building2
} from "lucide-react-native";

const TABS = [
  { name: "Home", Icon: Home },
  { name: "Stage", Icon: Trophy },
  { name: "Entry", Icon: Play },
  { name: "Arena", Icon: Building2},
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
      style={{
        height: headerHeight * 0.48,
        // backgroundColor: "#16110A",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        borderTopWidth: 1,
        borderColor: "rgba(244,197,66,.18)",
        paddingBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.45,
        shadowRadius: 22,
        shadowOffset: {
          width: 0,
          height: -8,
        },
        elevation: 25,
        justifyContent: "center",
      }}
      className = "px-4"
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        {TABS.map((tab, index) => {
          const scale = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.99, 1],
          });
  
          const opacity = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.75, 1],
          });
  
          const translateY = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [6, 6],
          });
  
          const Icon = tab.Icon;
  
          const isActive = activeIndex === index;
  
          return (
            <TouchableOpacity
              key={tab.name}
              activeOpacity={0.85}
              onPress={() => setActiveIndex(index)}
              style={{
                // flex: 1,
                alignItems: "center",
              }}
            >
              <Animated.View
                style={{
                  // width: 78,
                  height: 40,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [
                    { scale },
                    { translateY },
                  ],
                  opacity,
                  // backgroundColor: isActive
                  //   ? "rgba(244,197,66,.12)"
                  //   : "transparent",
                  // borderWidth: isActive ? 1 : 0,
                  // borderColor: "rgba(244,197,66,.28)",
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={2.6}
                  color={
                    isActive
                      ? "#F4C542"
                      : "rgba(255,255,255,.95)"
                  }
                />
  
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 9,
                    fontWeight: "900",
                    letterSpacing: 1.6,
                    color: isActive
                      ? "#F4C542"
                      : "rgba(255,255,255,.95)",
                  }}
                >
                  {tab.name.toUpperCase()}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
  </View>
  );
}