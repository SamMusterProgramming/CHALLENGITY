import { Animated, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';


const ShuffleLetters = ({text, textSize}) => {
  const animatedColor =  useRef(new Animated.Value(0)).current;
  const headerText = text;
  const colors = [ 'rgb(255, 255, 255)', // Red
    'rgb(250, 255, 0)', 
    'rgb(250, 150, 0)'
 ] 

  useEffect(() => {
    const animateColors = () => {
      Animated.sequence(
        colors.map((_, index) =>
          Animated.timing(animatedColor, {
            toValue: index,
            duration: 1000,
            useNativeDriver: false, 
          })
        )
      ).start(() => animateColors()); // Loop the animation
    };
    animateColors();
  }, []);

  const interpolatedColor = animatedColor.interpolate({
    inputRange: colors.map((_, i) => i),
    outputRange: colors.map(color => `rgb(var(--${color}))`),
  });

  return (
    <View className="flex-row justify-center items-center py-">
      {headerText.split('').map((char, index) => (
        <Animated.Text
          key={index}
          className={`font-extrabold text-lg`} // NativeWind classes
          style={{ 
            color: interpolatedColor,
            fontSize:textSize
           }} // Apply animated color
        >
          {char}
        </Animated.Text>
      ))}
    </View>
  );
};

export default ShuffleLetters;