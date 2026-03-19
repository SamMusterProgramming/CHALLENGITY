import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

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

    <View className="b g-[#1d1c1c] borde r-b-2 bor der-[#444040]">

      <View className="flex-row h-[100%] justify-center items-center ">

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
                  size={screenWidth/25}
                  color={active ? "#F5C542" : "#fff"}
                />
              </View>

              <Text
              style={{fontSize:width/47}}
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
          bottom: "17%",
          height: 1,
          width: tabWidth - 30,
          backgroundColor: "#F5C542",
          transform: [{ translateX: slideAnim }]
        }}
      />

    </View>
  );
}