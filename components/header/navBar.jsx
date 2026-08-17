
// import React, { useEffect, useRef } from "react";
// import { View, Text, TouchableOpacity, Animated } from "react-native";
// import {
//   Home,
//   Play,
//   Trophy,
//   Building2
// } from "lucide-react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const TABS = [
//   { name: "Home", Icon:"home" },
//   { name: "Discover", Icon: "compass" },
//   { name: "My Journey", Icon: "map-marker-path" },
//   { name: "Arena", Icon: "stadium"},
// ];

// export default function NavBar({
//   activeIndex,
//   setActiveIndex,
//   width,
//   headerHeight,
// }) {
//   const animValues = useRef(
//     TABS.map(() => new Animated.Value(0))
//   ).current;

//   useEffect(() => {
//     const animations = animValues.map((anim, i) =>
//       Animated.spring(anim, {
//         toValue: i === activeIndex ? 1 : 0,
//         useNativeDriver: true,
//         friction: 7,
//         tension: 80,
//       })
//     );
//     Animated.parallel(animations).start();
//   }, [activeIndex]);

//   return (
//     <View
//       style={{
//         height: headerHeight * 0.48,
//         // backgroundColor: "#16110A",
//         borderTopLeftRadius: 28,
//         borderTopRightRadius: 28,
//         borderTopWidth: 1,
//         borderColor: "rgba(244,197,66,.18)",
//         paddingBottom: 10,
//         shadowColor: "#000",
//         shadowOpacity: 0.45,
//         shadowRadius: 22,
//         shadowOffset: {
//           width: 0,
//           height: -8,
//         },
//         elevation: 25,
//         justifyContent: "center",
//       }}
//       className = "px-4"
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingHorizontal: 12,
//         }}
//       >
//         {TABS.map((tab, index) => {
//           const scale = animValues[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: [0.99, 1],
//           });
  
//           const opacity = animValues[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: [0.75, 1],
//           });
  
//           const translateY = animValues[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: [6, 6],
//           });
  
//           let Icon = tab.Icon;
//           if(activeIndex !== index && index !== 2) Icon = tab.Icon + "-outline"
//           else Icon = tab.Icon
        
  
//           const isActive = activeIndex === index;
  
//           return (
//             <TouchableOpacity
//               key={tab.name}
//               activeOpacity={0.85}
//               onPress={() => setActiveIndex(index)}
//               style={{
//                 // flex: 1,
//                 alignItems: "center",
//               }}
//             >
//               <Animated.View
//                 style={{
//                   // width: 78,
//                   height: 40,
//                   borderRadius: 5,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   transform: [
//                     { scale },
//                     { translateY },
//                   ],
//                   opacity,
//                   // backgroundColor: isActive
//                   //   ? "rgba(244,197,66,.12)"
//                   //   : "transparent",
//                   // borderWidth: isActive ? 1 : 0,
//                   // borderColor: "rgba(244,197,66,.28)",
//                 }}
//               >
//                 {/* <Icon
//                   size={20}
//                   strokeWidth={2.6}
//                   color={
//                     isActive
//                       ? "#F4C542"
//                       : "rgba(255,255,255,.95)"
//                   }
//                 /> */}
//                 <MaterialCommunityIcons
//                   name= {Icon}
//                   size={20}
//                   color="#EAB308"
//                 />
                  
//                 <Text
//                   style={{
//                     marginTop: 6,
//                     fontSize: 9,
//                     fontWeight: "900",
//                     letterSpacing: 0.5,
//                     color: isActive
//                       ? "#F4C542"
//                       : "rgba(255,255,255,.95)",
//                   }}
//                 >
//                   {tab.name.toUpperCase()}
//                 </Text>
//               </Animated.View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//   </View>
//   );
// }


import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TABS = [
  {
    name: "Home",
    icon: "home-variant-outline",
    activeIcon: "home-variant",
  },
  {
    name: "Discover",
    icon: "compass-outline",
    activeIcon: "compass",
  },
  {
    name: "My Journey",
    icon: "map-marker-path",
    activeIcon: "map-marker-path",
  },
  {
    name: "Arena",
    icon: "stadium-outline",
    activeIcon: "stadium",
  },
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
    Animated.parallel(
      animValues.map((anim, index) =>
        Animated.spring(anim, {
          toValue: index === activeIndex ? 1 : 0,
          useNativeDriver: true,
          friction: 8,
          tension: 70,
        })
      )
    ).start();
  }, [activeIndex]);

  return (
    <View
      style={{
        // height: width/7,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        borderTopWidth: 1,
        borderColor: "rgba(244,197,66,.14)",
        paddingHorizontal: 18,
        // paddingBottom: 8,
        justifyContent: "start",
        shadowColor: "#000",
        shadowOpacity: 0.45,
        shadowRadius: 22,
        shadowOffset: {
          width: 0,
          height: -8,
        },
        elevation: 25,
      }}
      className = "py-2  b g-black"
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {TABS.map((tab, index) => {
          const isActive = activeIndex === index;

          const scale = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.03],
          });

          const opacity = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.55, 1],
          });

          return (
            <TouchableOpacity
              key={tab.name}
              activeOpacity={0.8}
              onPress={() => setActiveIndex(index)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              className = ""
            >
              <Animated.View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  opacity,
                  transform: [{ scale }],
                }}
                className = "gap-1"
              >

                  {/* SELECTED LABEL */}

                  {/* <View
                  style={{
          
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
             
                    <Text
                      numberOfLines={1}
                      style={{
                        color: isActive ?"#EAB308": "#000",
                        fontSize: width/42,
                        fontWeight: "900",
                        // letterSpacing: 0.5,
                      }}
                    >
                      {tab.name.toUpperCase()}
                    </Text>
        
                </View> */}

                {/* ICON */}

                <View
                  style={{
                    // width: 52,
                    // height: 38,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isActive
                      ? "rgba(234,179,8,0.10)"
                      : "transparent",
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      isActive
                        ? tab.activeIcon
                        : tab.icon
                    }
                    size={width/12}
                    color={
                      isActive
                        ? "#EAB308"
                        : "rgba(255,255,255,0.72)"
                    }
                  />
                </View>

              
                {/* ACTIVE INDICATOR */}

                {/* <View
                  style={{
                    marginTop: 2,
                    width: isActive ? 22 : 4,
                    height: 3,
                    borderRadius: 10,
                    backgroundColor: isActive
                      ? "#EAB308"
                      : "transparent",
                  }}
                /> */}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}