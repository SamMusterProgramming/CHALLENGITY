
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DisplayNotification from "../notification/DisplayNotification";
import DisplaySocialNotification from "../notification/DisplaySocialNotification";
import DisplayArenaNotification from "../notification/DisplayArenaNotification";
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
  const [activeTab, setActiveTab] = useState("stage");
  const indicator = useSharedValue(0);

  const competitionNotifications =
    notifications.filter(
      (n) => n.category === "competition"
    );

  const friendNotifications =
    notifications.filter(
      (n) => n.category === "friends"
    );

  const arenaNotifications =
  notifications.filter(
    (n) => n.category === "arena"
  );
   
  const competitionBadgeNumber = competitionNotifications.length;
  const friendBadgeNumber = friendNotifications.length;


    const TABS = [
      {
        key: "stage",
        label: "Stage",
        icon: "trophy-outline",
        badge: 2,
      },
      {
        key: "arena",
        label: "Arena",
        icon: "stadium",
        badge: 1,
      },
      {
        key: "social",
        label: "Social",
        icon: "account-group-outline",
        badge: 6,
      },
      {
        key: "system",
        label: "System",
        icon: "bell-outline",
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
        case "stage":
          return competitionNotifications;
 
        case "arena":
          return arenaNotifications;

        case "social":
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

  const renderStageNotification = ({
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
    const isActive =  activeTab === item.key;
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setActiveTab(item.key);
            indicator.value = withSpring(index);
          }}
          style={{
            width: "23%",
            // height: height/10,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isActive
              ? "rgba(244,197,66,.10)"
              : "#0F0F10",
            borderWidth: 1,
            borderColor: isActive
              ? "rgba(244,197,66,.35)"
              : "rgba(255,255,255,.15)",
           
          }}
          className ="py-4"
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
              marginTop: 10,
              fontWeight: "700",
              fontSize: 12,
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
  };

  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        inset : 0
      }}
      className = "z-0"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeDrawer}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor:
            "rgba(0,0,0,1)",
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
                // paddingTop: 18,
                // paddingBottom: 18,
                paddingHorizontal: 2,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(234,179,8,.50)",
                backgroundColor: "#090909",
              }}
              className = "mb-4"
            >
         

               {/* HEADER */}
              <View className="pl-2 pt-2  flex-row justify-between items-center border-b border-[rgba(234,179,8,.50)]">
                <Text 
                style ={{
                  color :"#eab308",
                  fontSize: width / 20,
                  fontWeight : "800"
                }}
                className="text-white">
                  NOTIFICATION
                </Text>
                <TouchableOpacity 
                className ="p-2 px-4 b g-white justify-center items-center"
                onPress={onClose}>
                  <MaterialCommunityIcons
                      name="chevron-right"
                      size={35}
                      color="#eab308"
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // marginTop: 24,
                }}
                className = "items-center py-4"
              >
                {TABS.map((item, index) => (
                  <TabButton
                    key={item.key}
                    item={item}
                    index={index}
                  />
                ))}
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
                renderItem = {({item}) =>{
                  switch (activeTab) {
                    case "stage":
                      return (
                        <DisplayTalentNotification
                          notification={item}
                          setNotifications={
                            setNotifications
                          }
                          user={user}
                        />
                      );
                    case "arena":
                      return (
                        <DisplayArenaNotification
                          notification={item}
                          setNotifications={
                            setNotifications
                          }
                          user={user}
                        />
                      );
                    case "social":
                      return (
                        <DisplaySocialNotification
                          notification={item}
                          setNotifications={
                            setNotifications
                          }
                          user={user}
                        />
                      );
                    default:
                      break;
                  }
                  // renderNotification
                 }
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
                  paddingHorizontal: 0,
                  // paddingVertical : 18,
                  // paddingTop: 18,
                  paddingBottom: 20,
                  zIndex :999
                }}
              />
            </GestureDetector>

            <View
              className = "h-14 w-full"
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}