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
      className ="flex- 1 items-center rounded-tr-xl flex-row bg-[#181818]"
      style={{
        // backgroundColor: "#0A0B0D",
        // borderBottomWidth: 0.5,
        borderColor: "rgba(255,255,255,0.05)",
        // paddingVertical: 16,
        width,
        height : headerHeight * 0.5
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
            outputRange: [0.8, 1],
          });

          return (
            <TouchableOpacity
              //  className = " w-[25%] "
              key={tab.name}
              onPress={() => setActiveIndex(index)}
              activeOpacity = {0.8}
              style={{
                flex: 1,        
                alignItems: "center",  
                justifyContent : "center",
              }}  >
              <Animated.View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent : "center",
                  transform: [{ scale }],
                  opacity,
                }} >
                <Text
                  style={{
                    fontSize: width / 35,
                    letterSpacing: 1.2,
                    color: index === activeIndex ? "#E6C068" : "white",
                  }}
                  className="font-bebas" >
                  {tab.name.toUpperCase()}
                </Text>
                
                <Animated.View
                  className = "justify-center absolute bottom-[22%] items-center mr-[2px]"
                  style={{
                    // marginTop: 4,
                    height: 2,
                    width:  tab.name.length * 7,
                    borderRadius: 2,
                    backgroundColor:"#E6C068",
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