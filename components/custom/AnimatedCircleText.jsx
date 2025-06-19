import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const radius = 10; // Radius of the circle

const AnimatedCircleText = ({title}) => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    // Calculate circular placement based on rotation and radius
    const translateX = Math.sin(rotation.value * (Math.PI / 180)) * radius;
    const translateY = Math.cos(rotation.value * (Math.PI / 180)) * radius;

    return {
      transform: [
        { translateX: translateX },
        { translateY: translateY },
        { rotate: `${rotation.value}deg` }, // Rotate the text itself
      ],
    };
  });

  useEffect(() => {
    // Start the animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 10000, easing: Easing.linear }),
      -1 // Loop infinitely
    );
  }, []);

  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.Text style={[animatedStyle, { color:"white" ,fontSize:"9" }]}>
        {title}
      </Animated.Text>
    // </View>
  );
};

export default AnimatedCircleText;