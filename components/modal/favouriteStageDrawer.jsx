
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
// View,
// Text,
// TouchableOpacity,
// FlatList,
// useWindowDimensions,
// Dimensions,
// Animated
// } from "react-native";
// import  {
// useSharedValue,
// useAnimatedStyle,
// withSpring,
// withTiming,
// runOnJS,
// } from "react-native-reanimated";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import StageDisplayer from "../talent/stageDisplayer";


// const { width , height } = Dimensions.get("window");

// /* ---------------- SELECTOR CONFIG ---------------- */

// const ICON_SIZE = 70;
// const ICON_MARGIN = 18;

// const ITEM_WIDTH = ICON_SIZE + ICON_MARGIN * 2;
// const SNAP_INTERVAL = ITEM_WIDTH;

// /* ---------------- MAIN CAROUSEL ---------------- */

// const MAIN_ITEM_WIDTH = width * 0.95;
// const MAIN_ITEM_MARGIN = 2;
// const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
// const SIDE_SPACING = (width - MAIN_ITEM_WIDTH) / 2;

// export default function FavouriteStageDrawer({ visible, onClose }) {
// const insets = useSafeAreaInsets();
// const drawerWidth = width ;
// const translateX = useSharedValue(drawerWidth);
// const flatListRef = useRef(null);
// const { user ,favouriteStages , setFavouriteStages } = useGlobalContext();
// const nativeGesture = Gesture.Native();
// const [scrollEnabled, setScrollEnabled] = useState(true);
// const [activeTab, setActiveTab] = useState("competition");
// const indicator = useSharedValue(0);
// const mainScrollX = useRef(new Animated.Value(0)).current;
// const mainFlatListRef = useRef(null);



// useEffect(() => {
//   if (visible) {
//     translateX.value = withSpring(0, {
//     damping: 18,
//     stiffness: 160,
//     overshootClamping: true
//     });
//   } else {
//     translateX.value = withTiming(drawerWidth);
//   }
// }, [visible]);

// const closeDrawer = () => {
// onClose();
// };

// const panGesture = Gesture.Pan()
// .activeOffsetX([-10, 10])   // only triggers for horizontal swipe
// .failOffsetY([-10, 10])     // vertical motion fails the gesture
// .onUpdate((event) => {
//   translateX.value = Math.max(0, event.translationX); 
// })
// .onEnd(() => {
//   if (translateX.value > 120) {
//       translateX.value = withTiming(width);
//       runOnJS(onClose)();
//   } else {
//       translateX.value = withSpring(0);
//   }
// });



// const animatedStyle = useAnimatedStyle(() => ({
// transform: [{ translateX: translateX.value }]
// }));

// const renderItem = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * MAIN_SNAP_INTERVAL,
//       index * MAIN_SNAP_INTERVAL,
//       (index + 1) * MAIN_SNAP_INTERVAL,
//     ];
//     const scale = mainScrollX.interpolate({
//       inputRange,
//       outputRange: [0.85, 1, 0.85],
//       extrapolate: "clamp",
//     });
//     const translateY = mainScrollX.interpolate({
//         inputRange,
//         outputRange: [30, 0, 20],
//         extrapolate: "clamp",
//       });
//     return (
//       <Animated.View
//         style={{
//           width: MAIN_ITEM_WIDTH,
//           marginHorizontal: MAIN_ITEM_MARGIN,
//           transform: [{ scale } , {translateY}],
//         }}
//       >
//         <StageDisplayer
//           userTalent={item}
//           user={user}
//           userProfile={user}
//           activity={true}
//           width={MAIN_ITEM_WIDTH}
//           height={height * 0.3}
//         />
//       </Animated.View>
//     );
//   };



// if (!visible) return null;

// return (

// <View className="absolute inset-0 z-50">

// <GestureDetector gesture={panGesture}>

// <Animated.View
//   style={[
//   animatedStyle,
//   {
//   width: drawerWidth,
//   top: insets.top,
//   bottom: 0
//   }
//   ]}
//   className="absolute right-0 bg-zinc-900">

//     <View className="flex-1 bg-[#000000] /40 p- 2">
//     {/* HEADER */}
//       <View className="flex-row justify-between items-center px-5 py-2 mt-2 bg-zinc-900">
//         <Text
//             style ={{}}
//             className="font-bebas text-center text-lg text-pink-400 tracking-widest mb-1" >
//             Favorite Stages
//         </Text>
//         <TouchableOpacity onPress={onClose}>
//           <Text className="text-gray-400 text-3xl">X</Text>
//         </TouchableOpacity>
//           {/* SEGMENTED CONTROL */}
//       </View>
     

//       {/* LIST */}
//       <GestureDetector gesture={nativeGesture}>
//         {/* <View
//           style={{  minHeight: width /2  + width / 4.5 + width * 0.1   }}
//           className="flex-1  items-start justify-center"> */}
//                 <Animated.FlatList
//                     ref={mainFlatListRef}
//                     // vertical = {true}
//                     data={favouriteStages}
//                     // extraData={globalRefresh}  
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item._id}
//                     showsHorizontalScrollIndicator={false}
//                     snapToInterval={MAIN_SNAP_INTERVAL}
//                     decelerationRate="fast"
//                     bounces={false}
//                     contentContainerStyle={{
//                     paddingHorizontal: SIDE_SPACING- MAIN_ITEM_MARGIN,
//                     marginVertical: 20,
//                     }}
//                     onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { x: mainScrollX } } }],
//                     { useNativeDriver: true }
//                     )}
//                     scrollEventThrottle={16}
//                     initialNumToRender={2}
//                     maxToRenderPerBatch={5}
//                     windowSize={5}
//                 />
            
//         {/* </View> */}
//       </GestureDetector>
//       <View className="flex-row justify-between items-center h-[5%]  b g-zinc-800" />

//     </View>

// </Animated.View>

// </GestureDetector>
        
// </View>

// );

// }


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

  const { favouriteStages, user } =
    useGlobalContext();

  const drawerWidth = width * 0.95;

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
    .onUpdate((e) => {
      if (e.translationX > 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value > drawerWidth * 0.25) {
        runOnJS(closeDrawer)();
      } else {
        translateX.value = withTiming(0);
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
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
              top: 0,
              bottom: 0,
              width: drawerWidth,
              backgroundColor: "#050505",
            },
          ]}
        >
          {/* GOLD GLOW */}

          <View
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
          />

          {/* HEADER */}

          <View
            style={{
              paddingTop: insets.top,
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
                    fontSize: width / 15,
                    fontWeight: "900",
                  }}
                >
                  Favourite Stages
                </Text>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.45)",
                    fontSize: width / 34,
                    marginTop: 4,
                  }}
                >
                  Your saved competitions
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
                  name="close"
                  size={width / 18}
                  color="#EAB308"
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