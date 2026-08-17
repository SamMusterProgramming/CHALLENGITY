


import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSpring,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import StageDisplayer from "../talent/stageDisplayer";
import ArenaCard from "../viewArenas/displayArena/arenaCard";
import { LinearGradient } from "expo-linear-gradient";
import FollowArenaButton from "../viewArenas/custom/followArenaButton";

const { width, height } = Dimensions.get("window");

export default function FavouriteStageDrawer({
  visible,
  onClose,
}) {
  const insets = useSafeAreaInsets();

  const { favouriteStages, user, userFollowedArenas } =
    useGlobalContext();
  const drawerWidth = width ;
  const translateX = useSharedValue(drawerWidth);
  const [selectedTab,setSelectedTab] = useState("arenas")

 
 
  useEffect(() => {
    translateX.value = visible
      ? withTiming(0, { duration: 250 })
      : withTiming(drawerWidth, { duration: 250 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const closeDrawer = () => {
    translateX.value = withTiming(
      drawerWidth,
      { duration: 200 },
      () => {
        runOnJS(onClose)();
      }
    );
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.max(
        0,
        event.translationX
      );
    })
    .onEnd(() => {
      if (translateX.value > 120) {
        translateX.value =
          withTiming(width);

        runOnJS(onClose)();
      } else {
        translateX.value =
          withSpring(0);
      }
    });

    const filteredData =
    useMemo(() => {
      switch (selectedTab) {
        case "arenas":
          return userFollowedArenas;

        case "stages":
          return favouriteStages;

        default:
          break;
      }
      // return notifications.filter(
      //   (n) =>
      //     n.category === activeTab
      // );
    }, [userFollowedArenas, favouriteStages, selectedTab]);

    useEffect(() => {
      if (visible) {
        translateX.value = withSpring(0, {
          damping: 18,
          stiffness: 160,
          overshootClamping: true,
        });
      } else {
        translateX.value =
          withTiming(drawerWidth);
      }
    }, [visible]);

  

  if (!visible) return null;


  return (
    <View
      style={{
        position: "absolute",
        inset : 0 ,
        zIndex : 9999
      }}
      className = "z-0"
    >
      {/* BACKDROP */}

      <TouchableOpacity
        activeOpacity={1}
        onPress={closeDrawer}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor:
            "rgba(0,0,0,0.55)",
        }}
      />

      <GestureDetector gesture={panGesture}>
      <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              right: 0,
              top: insets.top,
              bottom: 0,
              width: drawerWidth,
              backgroundColor:
                "#070707",
              borderTopLeftRadius: 28,
              borderBottomLeftRadius: 28,
              borderLeftWidth: 1,
              overflow: "hidden",
            },
          ]}
        >
         
         <View
            style={{
              flex: 1,
              backgroundColor:
                "#090909",
            }}
          >
          

          {/* HEADER */}        
          <View
            className="pl-2 pt-2 pb- 2 mb- 2 w-full  flex-row justify-between items-center borde r-b bo rder-[rgba(234,179,8,.50)]">
            <View
              className = "flex-1 px-2"
            >
              <Text
                style={{
                  color: "#EAB308",
                  fontSize: width / 20,
                  fontWeight: "900",
                }}
              >
                FOLLOWINGS {'  '}
              </Text>
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.45)",
                  fontSize: width / 34,
                  marginTop: 4,
                }} >
                Arenas and Stages you followed
              </Text>
            </View>
            <TouchableOpacity 
              className ="p-2 px-4 b g-white justify-center items-center"
              onPress={closeDrawer}>
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={55}
                    color="#eab308"
                />
            </TouchableOpacity>
          </View>
       


          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 8,
              marginTop: 12,
              marginBottom: 18,
            }}
          >
            {[
              {
                key: "arenas",
                label: "Arenas",
                icon: "stadium",
              },
              {
                key: "stages",
                label: "Stages",
                icon: "trophy",
              },
            ].map((item) => {
              const isActive = selectedTab === item.key;

              return (
            
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={item.key}
                  onPress={() => {
                    setSelectedTab(item.key);
                    // indicator.value = withSpring(index);
                  }}
                  style={{
                    width: "48%",
                    // height: height/10,
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isActive
                      ? "rgba(244,197,66,.10)"
                      : "#0F0F10",           
                  }}
                  className ="py-4 flex-row gap-2"
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={28}
                    color={
                      isActive
                        ? "#F4C542"
                        : "#8C8C8C"
                    }
                  />
              
                  <Text
                    style={{
                      marginTop: 6,
                      fontWeight: "700",
                      fontSize:  width / 28,
                      color: isActive
                        ? "#F4C542"
                        : "#8C8C8C",
                    }}
                  >
                    {item.label}
                  </Text>
              
                  {item.badge > 0 && (
                    <View
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#F4C542",
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* CONTENT */}

          {favouriteStages?.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent:
                  "center",
                alignItems: "center",
                paddingHorizontal:
                  width / 10,
              }}
            >
              <MaterialCommunityIcons
                name="star-outline"
                size={width / 4}
                color="rgba(234,179,8,0.35)"
              />

              <Text
                style={{
                  color: "#FFF",
                  fontSize: width / 18,
                  fontWeight: "700",
                  marginTop:
                    height / 40,
                }}
              >
                No favourites yet
              </Text>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.45)",
                  fontSize: width / 30,
                  textAlign: "center",
                  marginTop:
                    height / 80,
                }}
              >
                Save stages to access
                them quickly later.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={({item}) =>{
                switch (selectedTab) {
                  case "stages":
                    return (
                      <View
                        style={{
                          marginBottom: height / 45,
                          alignItems: "center",
                            }} >
                            <StageDisplayer
                              userTalent={item}
                              user={user}
                              userProfile={user}
                              activity={true}
                              width={drawerWidth * 0.95}
                              height={width * 0.7}
                            />
                      </View>
                    );
                  case "arenas":
                    return (<View
                      style={{
                        marginBottom: height / 55,
                        alignItems: "center",
                          }} className ="mb-4" >
                          <ArenaCard
                            arena={item}
                            user={user}
                            userProfile={user}
                            activity={true}
                            width={drawerWidth }
                            height={width * 0.7}
                          />
                    </View>)
                  default:
                    break;
                }
                // renderNotification
               }}
              keyExtractor={(item) => item._id.toString() }
              nestedScrollEnabled
              showsVerticalScrollIndicator={ false }
              contentContainerStyle={{
                paddingBottom:
                  height / 28,
              }}
              scrollEventThrottle={16}
              
            />
          )}
         
         </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}