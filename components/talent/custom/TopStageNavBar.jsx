import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const tabs = [
  { name: "Home", icon: "home" },
  { name: "Talent", icon: "trophy" },
  { name: "Challenge", icon: "fire" },
  { name: "Stats", icon: "fire" },
  { name: "Profile", icon: "user" }
];

export default function TopStageNavBar({ activeIndex, setActiveIndex, width }) {

  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / (tabs.length );

  const slideAnim = useRef(new Animated.Value(activeIndex * tabWidth +15)).current;

  const handlePress = (index) => {
    setActiveIndex(index);
    Animated.spring(slideAnim, {
      toValue: index * tabWidth + 15,
      useNativeDriver: true
    }).start();
  };

  return (

    <View className="bg-[#000000] borde r-b-2 bor der-[#444040]">
 

      <View className="flex-row bg-[#10131f] rounde d-t-[50px] flex-1 justify-center items-center ">
         
        {tabs.map((tab, index) => {
          const active = activeIndex === index;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handlePress(index)}
              className="items-center py-2"
              style={{ width: tabWidth }}
            >
              <View className={`px3 py-0 rounded-lg ${active ? "bg-[#F5C542]/20" : ""}`}>
                <AntDesign
                  name={tab.icon}
                  size={screenWidth/22}
                  color={active ? "#F5C542" : "#fff"}
                />
              </View>

              <Text
              style={{fontSize:width/50}}
                className={`tex t-xs mt-1 font-bold ${
                  active ? "text-[#F5C542]" : "text-gray-200"
                }`}
              >
                {tab.name}
              </Text>

            </TouchableOpacity>
          );

        })}

      </View>

      {/* Sliding gold indicator */}

      <Animated.View
        style={{
          // position: "absolute",
          bottom: "13%",
          height: 1,
          width: tabWidth - 30,
          backgroundColor: "#F5C542",
          transform: [{ translateX: slideAnim }]
        }}
      />

    </View>
  );
}