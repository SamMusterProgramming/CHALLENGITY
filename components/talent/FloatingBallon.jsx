import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

const FloatingBalloon = () => {
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-200, { duration: 3000, easing: Easing.linear }),
      -1, // Loop indefinitely
      true // Reverse animation on each loop
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.balloon, animatedStyle]} />
  );
};

const styles = StyleSheet.create({
  balloon: {
    width: 50,
    height: 70,
    backgroundColor: 'red',
    borderRadius: 35,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -25, // Center the balloon
  },
});

export default FloatingBalloon;