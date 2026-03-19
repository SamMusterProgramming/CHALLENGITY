

// import { View, Text, Pressable, Animated, useWindowDimensions } from "react-native";
// import React, { useRef } from "react";

// export default function StageCategorySelector({ selected, onSelect }) {
//     const { width, height } = useWindowDimensions();

//   const Button = ({ id, label, icon }) => {
//     const isActive = selected === id;

//     const scaleAnim = useRef(new Animated.Value(1)).current;

//     const onPressIn = () => {
//       Animated.spring(scaleAnim, {
//         toValue: 0.95,
//         useNativeDriver: true,
//       }).start();
//     };

//     const onPressOut = () => {
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         friction: 4,
//         useNativeDriver: true,
//       }).start();
//     };

//     return (
//       <Animated.View
//         style={{
//           transform: [{ scale: scaleAnim }],
//           shadowColor: isActive ? "#FFD700" : "#000",
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: isActive ? 0.35 : 0,
//           shadowRadius: isActive ? 12 : 0,
//           elevation: isActive ? 8 : 0, 
//         }}
//       >
//         <Pressable
//           onPress={() => onSelect(id)}
//           onPressIn={onPressIn}
//           onPressOut={onPressOut}
//           className={`
//             px-5 py-2 rounded-full mx-1
//             ${isActive ? "bg-yellow-600" : "bg-zinc-800"}
//           `}
//         >
//           <Text
//           style ={{ fontSize :width/42}}
//             className={`
//               tex t-sm font-bold
//               ${isActive ? "text-black" : "text-zinc-300"}
//             `}
//           >
//             {icon} {label}
//           </Text>
//         </Pressable>
//       </Animated.View>
//     );
//   };

//   return (
//     <View className="flex-row justify-center mt-4 mb-4">
//       <Button id="hot" icon="🔥" label="HOT STAGES" />
//       <Button id="trending" icon="📈" label="TRENDING" />
//       <Button id="explore" icon="🌍" label="EXPLORE" />
//     </View>
//   );
// }

import { View, Text, Pressable, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

const categories = [
  { id: "hot", icon: "🔥", label: "HOT" },
  { id: "trending", icon: "📈", label: "TRENDING" },
  { id: "explore", icon: "🌍", label: "EXPLORE" }
];

export default function StageCategorySelector({ selected, onSelect }) {

  const indicator = useRef(new Animated.Value(0)).current;

  const itemWidth = width * 0.3;

  useEffect(() => {

    const index = categories.findIndex(c => c.id === selected);

    Animated.spring(indicator, {
      toValue: (index-1) * itemWidth + itemWidth / 12 ,
      useNativeDriver: true
    }).start();

  }, [selected]);

  return (

    <View
     className = "w-full justify-center items-center"
      style={{
        alignItems: "center",
        marginTop: 10,
        marginBottom: 0
      }}
    >

      {/* Glass container */}

      <View
        className = "w-full justify-center items-center"
        style={{
          flexDirection: "row",
        //   backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 14,
          padding: 6,
          overflow: "hidden",
          alignItems: "center",
        //   justifyContent: "center",
        }}
      >

        {/* Sliding highlight */}

        <Animated.View
          style={{
            position: "absolute",
            height: "100%",
            width: itemWidth,
            borderRadius: 12,
            // alignItems: "center",
            // justifyContent: "center",
            transform: [{ translateX: indicator }],

            backgroundColor: "rgba(120,180,255,0.38)",

            // shadowColor: "#78B4FF",
            // shadowOpacity: 0.5,
            // shadowRadius: 10,
            // shadowOffset: { width: 0, height: 0 },

            elevation: 6
          }}
        />

        {categories.map((c) => {

          const active = selected === c.id;

          return (

            <Pressable
              key={c.id}
              onPress={() => onSelect(c.id)}
              style={{
                width: itemWidth,
                paddingVertical: 10,
                alignItems: "center",
                justifyContent: "center"
              }}
            >

              <Text
                style={{
                  fontSize: width/40,
                  fontWeight: "700",
                  letterSpacing: 0.6,
                  color: active ? "#9ED0FF" : "white"
                }}
              >
                {c.icon} {c.label}
              </Text>

            </Pressable>

          );

        })}

      </View>

    </View>

  );

}