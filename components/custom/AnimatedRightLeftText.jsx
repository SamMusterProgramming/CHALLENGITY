
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedRightLeftText = ({title, width}) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    const animateText = () => {
      translateX.value = withTiming(100, { duration: 2000, easing: Easing.linear }, () => {
        opacity.value = withTiming(0, { duration: 500 }, () => {
          translateX.value = withTiming(0, { duration: 0 }, () => {
            opacity.value = withTiming(1, { duration: 500 }, () => {
              translateX.value = withTiming(0, { duration: 0 }, () => {
                animateText(); // Loop the animation
              });
            });
          });
        });
      });
    };
    animateText();
  }, []);

  return (
    // <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.View style={animatedStyle}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
     </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: "100%", // Set the desired width
    // overflow: 'hidden',
  },
  text: {
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default AnimatedRightLeftText;