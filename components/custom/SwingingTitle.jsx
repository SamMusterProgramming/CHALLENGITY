
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Text, View, Easing } from 'react-native';

export default function SwingingTitle({ text, color ,fontSize }) {
    const translateX = useRef(new Animated.Value(-100)).current; // Start off-screen to the left
    const [direction, setDirection] = useState('right');
  
    useEffect(() => {
      const animate = () => {
        Animated.timing(translateX, {
          toValue: direction === 'right' ? 30 : -30, // Move right or left
          duration: 2500,
          easing: Easing.easeInOut,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            setDirection(direction === 'right' ? 'left' : 'right'); // Reverse direction
            animate(); // Repeat animation
          }
        });
      };
  
      animate();
    }, [direction, translateX]);
  
    return (
      <View style={{ alignItems: 'center', overflow: 'hidden' ,width:"100%"}}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <Text style={{ fontSize: fontSize, color:color , fontWeight: 'bold' }}>{text}</Text>
        </Animated.View>
      </View>
    );
}