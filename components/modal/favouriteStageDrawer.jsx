


import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
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

  if (!visible) return null;

  const renderStage = ({ item }) => (
    <View
      style={{
        marginBottom: height / 45,
        alignItems: "center",
      }}
    >
      <StageDisplayer
        userTalent={item}
        user={user}
        userProfile={user}
        activity={true}
        width={drawerWidth * 0.95}
        height={height * 0.28}
      />
    </View>
  );

  return (
    <View
      style={{
        position: "absolute",
        inset : 0
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
          {/* GOLD GLOW */}

          {/* <View
            style={{
              position: "absolute",
              top: -height / 8,
              alignSelf: "center",
              width: width,
              height: height / 3,
              borderRadius: width,
              backgroundColor:
                "rgba(234,179,8,0.05)",
            }}
          /> */}

          {/* HEADER */}

          <View
            style={{
              // paddingTop: insets.top,
              paddingHorizontal: width / 18,
              paddingBottom: height / 50,
              borderBottomWidth: 1,
              borderBottomColor:
                "rgba(234,179,8,0.15)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <View>
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
                  }}
                >
                  Arenas and Stages you followed
                </Text>
              </View>

              <TouchableOpacity
                onPress={closeDrawer}
                style={{
                  width: width / 10,
                  height: width / 10,
                  borderRadius:
                    width / 20,
                  backgroundColor:
                    "rgba(255,255,255,0.05)",
                  justifyContent:
                    "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                      name="chevron-right"
                      size={55}
                      color="#eab308"
                  />
              </TouchableOpacity>
            </View>
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
              data={favouriteStages}
              renderItem={renderStage}
              keyExtractor={(item) =>
                item._id
              }
              showsVerticalScrollIndicator={
                false
              }
              contentContainerStyle={{
                paddingTop:
                  height / 50,
                paddingBottom:
                  height / 8,
                paddingHorizontal:
                  width / 40,
              }}
            />
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}