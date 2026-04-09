
import React, { useEffect, useRef, useState } from "react";
import {
View,
Text,
TouchableOpacity,
FlatList,
useWindowDimensions
} from "react-native";

import Animated, {
useSharedValue,
useAnimatedStyle,
withSpring,
withTiming,
runOnJS
} from "react-native-reanimated";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";
import DisplayTalentNotification from "../notification/DisplayTalentNotifications";

export default function NotificationDrawer({ visible, onClose }) {

const { width } = useWindowDimensions();
const insets = useSafeAreaInsets();

const drawerWidth = width * 0.9;

const translateX = useSharedValue(drawerWidth);

const flatListRef = useRef(null);

const { notifications, setNotifications, user } = useGlobalContext();

const nativeGesture = Gesture.Native();

const [scrollEnabled, setScrollEnabled] = useState(true);


useEffect(() => {

if (visible) {
translateX.value = withSpring(0, {
damping: 18,
stiffness: 160,
overshootClamping: true
});
} else {
translateX.value = withTiming(drawerWidth);
}

}, [visible]);

const closeDrawer = () => {
onClose();
};

// const panGesture = Gesture.Pan()
//   .activeOffsetX([20, 999])
//   .failOffsetY([-15, 15])
//   .simultaneousWithExternalGesture(nativeGesture)
//   .onUpdate((event) => {
//     if (event.translationX > 0) {
//       translateX.value = event.translationX;
//     }
//   })
//   .onEnd(() => {
//     if (translateX.value > drawerWidth * 0.35) {
//       translateX.value = withTiming(drawerWidth, {}, () => {
//         runOnJS(onClose)();
//       });
//     } else {
//       translateX.value = withSpring(0);
//     }
//   });

const panGesture = Gesture.Pan()
.activeOffsetX([-10, 10])   // only triggers for horizontal swipe
.failOffsetY([-10, 10])     // vertical motion fails the gesture
.onUpdate((event) => {
  translateX.value = Math.max(0, event.translationX); 
})
.onEnd(() => {
  if (translateX.value > 120) {
      translateX.value = withTiming(width);
      runOnJS(onClose)();
  } else {
      translateX.value = withSpring(0);
  }
});

const animatedStyle = useAnimatedStyle(() => ({
transform: [{ translateX: translateX.value }]
}));

const renderNotification = ({ item }) => {

if (item.type === "talent") {
return (
<DisplayTalentNotification
notification={item}
setNotifications={setNotifications}
user={user}
/>
);
}

return null;

};

if (!visible) return null;

return (

<View className="absolute inset-0 z-50">

{/* BACKDROP */}

<TouchableOpacity
className="absolute inset-0 bg-black/60"
onPress={onClose}
/>

{/* DRAWER */}

<GestureDetector gesture={panGesture}>

<Animated.View
style={[
animatedStyle,
{
width: drawerWidth,
top: insets.top,
bottom: 0
}
]}
className="absolute right-0 bg-zinc-900"
>

<View className="flex-1">

{/* HEADER */}

<View className="flex-row justify-between items-center px-5 py-4 border-b border-zinc-800">

<Text className="text-white text-xl font-bold">
Notifications
</Text>

<TouchableOpacity onPress={onClose}>
<Text className="text-gray-400 text-lg">✕</Text>
</TouchableOpacity>

</View>

{/* LIST */}
<GestureDetector gesture={nativeGesture}>
    <FlatList
    ref={flatListRef}
    data={notifications}
    renderItem={renderNotification}
    keyExtractor={(item) => item._id}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
    paddingBottom: 40,
    paddingHorizontal: 16,
    paddingTop: 10
    }}
    keyboardShouldPersistTaps="handled"
    nestedScrollEnabled
    initialNumToRender={10}        
    maxToRenderPerBatch={10}       
    windowSize={10}                
    removeClippedSubviews={true}   
    scrollEnabled={scrollEnabled}
    onScrollBeginDrag={() => setScrollEnabled(true)}
    />
</GestureDetector>

</View>

</Animated.View>

</GestureDetector>

</View>

);

}