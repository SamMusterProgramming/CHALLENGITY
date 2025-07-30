import React, { useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function BlinkingHeader({text , textSize}) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1, // Fade in to full opacity
          duration: 3000, // 1 second
          useNativeDriver: true, // Use native driver for performance
        }),
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out to zero opacity
          duration: 500, // 1 second
          useNativeDriver: true, // Use native driver for performance
        }),
      ])
    );
    blink.start(); // Start the animation

    return () => blink.stop(); // Stop the animation on unmount
  }, [fadeAnim]); // Restart animation if fadeAnim changes

  return (
    // <View className="flex-1 justify-center items-center g-gray-900">
      <AnimatedText className="text-white text-xl font-bold" style={{ opacity: fadeAnim , fontSize:textSize}}>
         {text}
      </AnimatedText>
    // </View>
  );
}