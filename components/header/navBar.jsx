


import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import HomeIcon from "../svgIcons/tab/HomeIcon";
import DiscoveryIcon from "../svgIcons/tab/DiscoveryIcon";
import ArenaIcon from "../svgIcons/tab/ArenaIcon";
import JourneyIcon from "../svgIcons/tab/JourneyIcon";
import ProfileIcon from "../svgIcons/tab/profileIcon";
// import  PerformanceLensIcon from "../svgIcons/DiscoveryEyeIcon";


const TABS = [
  {
    name: "Home",
    icon: "home-variant-outline",
    activeIcon: "home-variant",
  },
  {
    name: "Discovery",
    icon: "map-search-outline",
    activeIcon: "map-search",
  },
  {
    name: "Journey",
    icon: "book-open-page-variant-outline",
    activeIcon: "book-open-page-variant",
  },
  {
    name: "Profile",
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
  const { scale , spacing } = useGlobalContext();
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

  const iconPicker = (name ,color) => {
    switch (name) {
      case "Home":
        return <HomeIcon size={scale(23)} color = {color} />;
        break;
      case "Discovery":
        return <DiscoveryIcon size={scale(23)} color = {color} />;
        break;
      case "Journey":
        return <JourneyIcon  size={scale(23)}  color = {color} />;
        break;
      case "Profile":
        return <ProfileIcon  size={scale(23)}  color = {color} />;
        break;
      default:
        return null;
    }
  };

  return (
    <View
      style={{
        // height: width/7,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        borderTopWidth: 1,
        borderColor: "rgba(244,197,66,.14)",
        paddingHorizontal: scale(1),
        // paddingVertical :spacing (16),
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
          const color = isActive ? "#E8B95A" : "#fff";
          const opacity =  animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.75, 1],
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
                  }}  >
             
                    <Text
                      numberOfLines={1}
                      style={{
                        color: isActive ?"#EAB303": "#fff",
                        fontSize: scale(9),
                        fontWeight: isActive ? "600" : "600",
                      }}  >
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
                  {/* <MaterialCommunityIcons
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
                  /> */}
                     {iconPicker(tab.name ,color)}
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