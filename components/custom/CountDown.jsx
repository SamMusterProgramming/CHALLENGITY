import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Countdown = () => {
  const [count, setCount] = useState(3);
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(timer);
          startEndAnimation();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count > 0) {
      startNumberAnimation();
    }
  }, [count]);

  const startNumberAnimation = () => {
      opacity.setValue(1);
      scale.setValue(1);
      Animated.parallel([
          Animated.timing(opacity, {
              toValue: 0,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
          }),
          Animated.timing(scale, {
              toValue: 2,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
          }),
      ]).start();
  };

    const startEndAnimation = () => {
        if (animationRef.current) {
            animationRef.current.fadeIn(500).then(() => {
                setTimeout(() => {
                    animationRef.current.fadeOut(500);
                }, 1000);
            });
        }
    };

  const animatedStyle = {
      opacity: opacity,
      transform: [{ scale: scale }],
  };

  return (
    <View style={styles.container}>
        {count > 0 ? (
            <Animated.View style={[styles.numberContainer, animatedStyle]}>
                <Text style={styles.number}>{count}</Text>
            </Animated.View>
        ) : (
            <Animatable.View ref={animationRef} style={styles.endTextContainer}>
                <Text style={styles.endText}>Go!</Text>
            </Animatable.View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  endTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
  endText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default Countdown;