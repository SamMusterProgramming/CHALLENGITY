
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
// View,
// Text,
// TouchableOpacity,
// FlatList,
// useWindowDimensions
// } from "react-native";
// import Animated, {
// useSharedValue,
// useAnimatedStyle,
// withSpring,
// withTiming,
// runOnJS
// } from "react-native-reanimated";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import DisplayTalentNotification from "../notification/DisplayTalentNotifications";

// export default function NotificationDrawer({ visible, onClose }) {
// const { width } = useWindowDimensions();
// const insets = useSafeAreaInsets();
// const drawerWidth = width ;
// const translateX = useSharedValue(drawerWidth);
// const flatListRef = useRef(null);
// const { notifications, setNotifications, user } = useGlobalContext();
// const nativeGesture = Gesture.Native();
// const [scrollEnabled, setScrollEnabled] = useState(true);
// const [activeTab, setActiveTab] = useState("competition");
// const indicator = useSharedValue(0);

// const competitionNotifications = notifications.filter((n) => n.category === "competition");
// const friendNotifications = notifications.filter((n) => n.category === "friends");
// const competitionBadgeNumber = competitionNotifications.length;
// const friendBadgeNumber = friendNotifications.length;

// const TABS = [
//   { key: "competition", label: "Competition" , badge : competitionBadgeNumber},
//   { key: "challenge", label: "Challenge" ,badge : friendBadgeNumber},
//   { key: "friends", label: "Friends" , badge : 0 },
//   { key: "followers", label: "Followers" , badge : 0 },
// ];



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

// const filteredNotifications = useMemo(() => {
//   switch (activeTab) {
//     case "competition":
//         return  competitionNotifications ; 
//     case "friends":
//       return  friendNotifications ; 
//     default:
//       break;
//   }
//   return notifications.filter((n) => n.category === activeTab);
// }, [notifications, activeTab]);

// const animatedStyle = useAnimatedStyle(() => ({
// transform: [{ translateX: translateX.value }]
// }));

// const renderNotification = ({ item }) => {
// if (item.category === "competition") {
//   return (
//   <DisplayTalentNotification
//     notification={item}
//     setNotifications={setNotifications}
//     user={user}
//   />
//   );
// }
// if (item.category === "friends") {
//   return (
//   <DisplayTalentNotification
//     notification={item}
//     setNotifications={setNotifications}
//     user={user}
//   />
//   );
// }
// if (item.category === "following") {
//   return (
//   <DisplayTalentNotification
//     notification={item}
//     setNotifications={setNotifications}
//     user={user}
//   />
//   );
// }
// return null;
// };

// const TabButton = ({ item, index }) => {
//   const isActive = activeTab === item.key;
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         setActiveTab(item.key);
//         indicator.value = withSpring(index);
//       }}
//       style={{
//         // paddingVertical: 10,
//         alignItems: "center",
//         width : "25%",
//         // backgroundColor : isActive ? "transparent" : "#8A8A8A",
//       }}
//       className = "p-2 px-2  " >
//       <Text
//         style={{
//           color: isActive ? "gold" : "#8A8A8A",
//           // fontWeight: "700",
//           fontSize: width /39,
//         }}
//         className = "font-bebas tracking-widest"
//       >   
//         {item.label}
//       </Text>

//       <View className="absolute top-[-2]  right-[4] bg-red-800 w-4 h-4 rounded-full items-center justify-center">
//         <Text className="text-white text-[7px] font-bold track ing-wide">
//           {item.badge}
//         </Text>
//       </View>
    
//     </TouchableOpacity>
//   );
// };


// if (!visible) return null;

// return (

// <View className="absolute inset-0 z-50">

// {/* BACKDROP */}
// {/* <TouchableOpacity
// className="absolute inset-0 bg-gold"
// onPress={onClose}
// /> */}

// {/* DRAWER */}
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
//         <Text className="text-white text-xl font-bold">
//             Notifications
//         </Text>
//         <TouchableOpacity onPress={onClose}>
//           <Text className="text-gray-400 text-3xl">X</Text>
//         </TouchableOpacity>
//           {/* SEGMENTED CONTROL */}
//       </View>
//       <View className="w-full flex-row bg-[#30240f] mt-2 roun ded-lg py-2 justify-between items-center ">
//                 {TABS.map((item, index) => (
//                   <TabButton key={item.key} item={item} index={index} />
//                 ))}
//       </View>

//       {/* LIST */}
//       <GestureDetector gesture={nativeGesture}>
//           <FlatList
//           ref={flatListRef}
//           data={filteredNotifications}
//           renderItem={renderNotification}
//           keyExtractor={(item) => item._id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//           // paddingBottom: 40,
//           // paddingHorizontal: 16,
//           paddingTop: 10
//           }}
//           keyboardShouldPersistTaps="handled"
//           nestedScrollEnabled
//           initialNumToRender={10}        
//           maxToRenderPerBatch={10}       
//           windowSize={10}                
//           removeClippedSubviews={true}   
//           scrollEnabled={scrollEnabled}
//           onScrollBeginDrag={() => setScrollEnabled(true)}
//           />
//       </GestureDetector>
//       <View className="flex-row justify-between items-center h-[5%]  b g-zinc-800" />

//     </View>

// </Animated.View>

// </GestureDetector>
        
// </View>

// );

// }

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import DisplayTalentNotification from "../notification/DisplayTalentNotifications";
export default function NotificationDrawer({
  visible,
  onClose,
}) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const drawerWidth = width * 0.99;
  const translateX = useSharedValue(drawerWidth);
  const flatListRef = useRef(null);
  const {
    notifications,
    setNotifications,
    user,
  } = useGlobalContext();
  const nativeGesture = Gesture.Native();
  const [scrollEnabled, setScrollEnabled] =
    useState(true);
  const [activeTab, setActiveTab] =
    useState("competition");
  const indicator = useSharedValue(0);
  const competitionNotifications =
    notifications.filter(
      (n) => n.category === "competition"
    );
  const friendNotifications =
    notifications.filter(
      (n) => n.category === "friends"
    );
  const competitionBadgeNumber =
    competitionNotifications.length;
  const friendBadgeNumber =
    friendNotifications.length;
  const TABS = [
    {
      key: "competition",
      label: "Competition",
      badge: competitionBadgeNumber,
    },
    // {
    //   key: "challenge",
    //   label: "Challenge",
    //   badge: friendBadgeNumber,
    // },
    {
      key: "friends",
      label: "Friends",
      badge: friendBadgeNumber,
    },
    {
      key: "followers",
      label: "Followers",
      badge: 0,
    },
  ];

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

  const closeDrawer = () => {
    onClose();
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

  const filteredNotifications =
    useMemo(() => {
      switch (activeTab) {
        case "competition":
          return competitionNotifications;

        case "friends":
          return friendNotifications;

        default:
          break;
      }

      return notifications.filter(
        (n) =>
          n.category === activeTab
      );
    }, [notifications, activeTab]);

  const animatedStyle =
    useAnimatedStyle(() => ({
      transform: [
        {
          translateX:
            translateX.value,
        },
      ],
    }));

  const renderNotification = ({
    item,
  }) => {
    return (
      <DisplayTalentNotification
        notification={item}
        setNotifications={
          setNotifications
        }
        user={user}
      />
    );
  };

  const TabButton = ({
    item,
    index,
  }) => {
    const isActive =
      activeTab === item.key;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setActiveTab(item.key);

          indicator.value =
            withSpring(index);
        }}
        style={{
          height: 38,
          paddingHorizontal: 14,
          borderRadius: 9,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isActive
            ? "rgba(234,179,8,0.12)"
            : "#111114",
          borderWidth: 1,
          borderColor: isActive
            ? "rgba(234,179,8,0.25)"
            : "rgba(255,255,255,0.06)",
        }}
      >
        <Text
          style={{
            color: isActive
              ? "#eab308"
              : "#8A8A8A",

            fontSize: width / 34,

            fontWeight: "600",
          }}
        >
          {item.label}
        </Text>

        {item.badge > 0 && (
          <View
            style={{
              marginLeft: 6,

              minWidth: 18,

              height: 18,

              borderRadius: 999,

              backgroundColor:
                "#eab308",

              justifyContent:
                "center",

              alignItems: "center",

              paddingHorizontal: 4,
            }}
          >
            <Text
              style={{
                color: "#000",

                fontSize: 10,

                fontWeight: "700",
              }}
            >
              {item.badge}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 999,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeDrawer}
        style={{
          position: "absolute",
          inset: 0,

          backgroundColor:
            "rgba(0,0,0,0.55)",
        }}
      />

      <GestureDetector
        gesture={panGesture}
      >
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

              borderLeftColor:
                "rgba(234,179,8,0.15)",

              overflow: "hidden",
            },
          ]}
        >
          <View
            style={{
              position: "absolute",

              left: 0,

              top: 0,

              bottom: 0,

              width: 2,

              backgroundColor:
                "rgba(234,179,8,0.25)",
            }}
          />

          <View
            style={{
              flex: 1,

              backgroundColor:
                "#090909",
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,

                paddingTop: 16,

                paddingBottom: 18,

                borderBottomWidth: 1,

                borderBottomColor:
                  "rgba(255,255,255,0.05)",
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
                      color: "#fff",

                      fontSize:
                        width / 16,

                      fontWeight:
                        "800",
                    }}
                  >
                    Notifications
                  </Text>

                  <Text
                    style={{
                      color:
                        "#71717A",

                      marginTop: 3,

                      fontSize:
                        width / 34,
                    }}
                  >
                    {
                      notifications.length
                    }{" "}
                    updates
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={closeDrawer}
                  style={{
                    width: 38,

                    height: 38,

                    borderRadius: 999,

                    backgroundColor:
                      "#111114",

                    borderWidth: 1,

                    borderColor:
                      "rgba(255,255,255,0.06)",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",
                  }}
                >
                  <Text
                    style={{
                      color:
                        "#A1A1AA",

                      fontSize: 18,

                      fontWeight:
                        "700",
                    }}
                  >
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",

                  flexWrap: "wrap",

                  gap: 8,

                  marginTop: 18,
                }}
              >
                {TABS.map(
                  (
                    item,
                    index
                  ) => (
                    <TabButton
                      key={
                        item.key
                      }
                      item={item}
                      index={index}
                    />
                  )
                )}
              </View>
            </View>

            <GestureDetector
              gesture={nativeGesture}
            >
              <FlatList
                ref={flatListRef}
                data={
                  filteredNotifications
                }
                renderItem={
                  renderNotification
                }
                keyExtractor={(
                  item
                ) => item._id}
                showsVerticalScrollIndicator={
                  false
                }
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                initialNumToRender={
                  10
                }
                maxToRenderPerBatch={
                  10
                }
                windowSize={10}
                removeClippedSubviews
                scrollEnabled={
                  scrollEnabled
                }
                onScrollBeginDrag={() =>
                  setScrollEnabled(
                    true
                  )
                }
                contentContainerStyle={{
                  paddingHorizontal: 14,
                  paddingTop: 14,
                  paddingBottom: 60,
                }}
              />
            </GestureDetector>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}