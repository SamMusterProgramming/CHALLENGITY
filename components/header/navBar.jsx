


import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";

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
    name: "Journey",
    icon: "star-four-points",
    activeIcon: "star-four-points",
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
  const { scale } = useGlobalContext();
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
      className = "py-4  b g-black"
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

          // const scale = animValues[index].interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [1, 1.03],
          // });

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
            >
              <Animated.View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  opacity,
                  // transform: [{ scale }],
                }}
                className = "gap-1 flex-col-reverse"
              >

                  {/* SELECTED LABEL */}

                  <View
                  style={{
          
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
             
                    <Text
                      numberOfLines={1}
                      style={{
                        color: isActive ?"#EAB303": "#aaa",
                        fontSize: width/42,
                        fontWeight: "900",
                        // letterSpacing: 0.5,
                      }}
                    >
                      {tab.name.toUpperCase()}
                    </Text>
        
                </View>

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
                    size={scale(20)}
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