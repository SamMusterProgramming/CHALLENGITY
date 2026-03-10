import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

const tabs = [
  { name: "Home", icon: "home" },
  { name: "Talent", icon: "trophy" },
  { name: "Challenge", icon: "fire" },
  { name: "Stats", icon: "bars" },
  { name: "Profile", icon: "user" }
];

export default function TopStageNavBar({ activeIndex, setActiveIndex }) {

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

    <View className="bg-[#0D0D0D] border-b border-[#222]">

      <View className="flex-row">

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
                  color={active ? "#F5C542" : "#888"}
                />

              </View>

              <Text
                className={`text-xs mt-1 font-semibold ${
                  active ? "text-[#F5C542]" : "text-gray-400"
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
          position: "absolute",
          bottom: 2,
          height: 1,
          width: tabWidth - 30,
          backgroundColor: "#F5C542",
          transform: [{ translateX: slideAnim }]
        }}
      />

    </View>
  );
}