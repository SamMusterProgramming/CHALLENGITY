// import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
// import { useRef } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const tabs = [
//   { name: "Home", icon: "home" },
//   { name: "Performance", icon: "trophy" },
//   { name: "Challenge", icon: "fire" },
//   { name: "Stats", icon: "fire" },
//   { name: "Profile", icon: "user" }
// ];

// export default function TopStageNavBar({ activeIndex, setActiveIndex, width }) {

//   const screenWidth = Dimensions.get("window").width;
//   const tabWidth = screenWidth / (tabs.length );

//   const slideAnim = useRef(new Animated.Value(activeIndex * tabWidth +15)).current;

//   const handlePress = (index) => {
//     setActiveIndex(index);
//     Animated.spring(slideAnim, {
//       toValue: index * tabWidth + 15,
//       useNativeDriver: true
//     }).start();
//   };

//   return (

//     <View className="bg-[#000000] borde r-b-2 bor der-[#444040]">
 

//       <View className="flex-row bg-[#10131f] rounde d-t-[50px] flex-1 justify-center items-center ">
         
//         {tabs.map((tab, index) => {
//           const active = activeIndex === index;
//           return (
//             <TouchableOpacity
//               key={tab.name}
//               onPress={() => handlePress(index)}
//               className="items-center py-2"
//               style={{ width: tabWidth }}
//             >
//               <View className={`px3 py-0 rounded-lg ${active ? "bg-[#F5C542]/20" : ""}`}>
//                 <AntDesign
//                   name={tab.icon}
//                   size={screenWidth/22}
//                   color={active ? "#F5C542" : "#fff"}
//                 />
//               </View>

//               <Text
//               style={{fontSize:width/50}}
//                 className={`tex t-xs mt-1 font-bold ${
//                   active ? "text-[#F5C542]" : "text-gray-200"
//                 }`}
//               >
//                 {tab.name}
//               </Text>

//             </TouchableOpacity>
//           );

//         })}

//       </View>

//       {/* Sliding gold indicator */}

//       <Animated.View
//         style={{
//           // position: "absolute",
//           bottom: "13%",
//           height: 1,
//           width: tabWidth - 30,
//           backgroundColor: "#F5C542",
//           transform: [{ translateX: slideAnim }]
//         }}
//       />

//     </View>
//   );
// }

import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useRef, useEffect } from "react";

const tabs = [
  { name: "Home" },
  { name: "Performances" },
  { name: "Challenges" },
  // { name: "Stats" },
  { name: "profile" }
];

export default function TopStageNavBar({ activeIndex, setActiveIndex, width , headerHeight}) {

  const animValues = useRef(tabs.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animValues.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === activeIndex ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }, [activeIndex]);

  return (
    <View
      className ="flex- 1 items-center bor der-b-2 bor der-red-500 flex-row bg-[#181818]"
      style={{
        // backgroundColor: "#0A0B0D",
        // borderBottomWidth: 0.5,
        borderColor: "rgba(255,255,255,0.05)",
        paddingVertical: 12,
        width,
        // height : headerHeight * 0.5
      }}
    >
      {/* 🔥 FIXED ROW */}
      <View 
      className ="flex-1 items-center flex-row justify-evenly"
      style={{ flexDirection: "row" }}>

        {tabs.map((tab, index) => {

          const scale = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.95, 1.08],
          });

          const opacity = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          });

          return (
            <TouchableOpacity
              //  className = " w-[25%] "
              key={tab.name}
              onPress={() => setActiveIndex(index)}
              activeOpacity = {0.8}
              style={{
                // flex: 1,        
                alignItems: "center",  
                justifyContent : "center",
              }}
            >
              <Animated.View
                style={{
                  // flex: 1,
                  alignItems: "center",
                  justifyContent : "center",
                  transform: [{ scale }],
                  opacity,
                }}
              >
                
                {/* TEXT */}
                <Text
                  style={{
                    fontSize: width / 36,
                    letterSpacing: 1.5,
                    color: index === activeIndex ? "#E6C068" : "white",
                  }}
                  className="font-bebas" >
                  {tab.name.toUpperCase()}
                </Text>
                 {/* INDICATOR */}
                 <Animated.View
                  className = "justify-center items-center mr-[1px]"
                  style={{
                    marginTop: 4,
                    height: 1,
                    width:  tab.name.length * 6.3,
                    borderRadius: 2,
                    backgroundColor:"white",// "#E6C068",
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