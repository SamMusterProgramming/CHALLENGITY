import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export const AnimatedCard = ({
  contestant,
  index = 0,
  total = 1,
}) => {

  /**
   * 🎯 LAYOUT
   */

  const ITEMS_PER_ROW = 5;

  const avatarSize = width / 10.5;

  /**
   * 🎯 ROW POSITIONS
   */

  const rowPositions = [
    height * 0.06, // top
    height * 0.18, // middle top
    height * 0.7, // middle bottom
    height * 0.83, // bottom
  ];

  /**
   * 🎯 WHICH ROW/COLUMN
   */

  const rowIndex = Math.floor(
    index / ITEMS_PER_ROW
  );

  const columnIndex =
    index % ITEMS_PER_ROW;

  /**
   * 🎯 HOW MANY ITEMS
   * ARE INSIDE THIS ROW
   */

  const remainingItems =
    total - rowIndex * ITEMS_PER_ROW;

  const currentRowCount =
    Math.min(
      ITEMS_PER_ROW,
      remainingItems
    );

  /**
   * 🎯 SPACING
   */

  const itemSpacing =
    avatarSize * 2.2;

  /**
   * 🎯 CENTER ROW
   */

  const totalRowWidth =
    (currentRowCount - 1) *
    itemSpacing;

  const startX =
    (width - totalRowWidth) / 2;

  /**
   * 🎯 FINAL POSITION
   */

  const finalX =
    startX +
    columnIndex * itemSpacing -
    avatarSize / 2;

  const finalY =
    rowPositions[
      Math.min(rowIndex, 3)
    ];

  /**
   * 🎬 ANIMATION VALUES
   */

  const translateX =
    useSharedValue(width / 2);

  const translateY =
    useSharedValue(height / 2);

  const scale =
    useSharedValue(0.25);

  const rotate =
    useSharedValue(
      columnIndex % 2 === 0
        ? -15
        : 15
    );

  const opacity =
    useSharedValue(0);

  /**
   * 🎬 ENTRY ANIMATION
   */

  useEffect(() => {

    const delay =
      rowIndex * 450 +
      columnIndex * 120;

    translateX.value = withDelay(
      delay,
      withSpring(finalX, {
        damping: 16,
        stiffness: 90,
      })
    );

    translateY.value = withDelay(
      delay,
      withSpring(finalY, {
        damping: 18,
        stiffness: 80,
      })
    );

    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 14,
        stiffness: 120,
      })
    );

    rotate.value = withDelay(
      delay,
      withTiming(0, {
        duration: 700,
      })
    );

    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 400,
      })
    );

  }, []);

  /**
   * 🎨 ANIMATED STYLE
   */

  const animatedStyle =
    useAnimatedStyle(() => ({
      position: 'absolute',
      top: 0,
      left: 0,

      opacity: opacity.value,

      transform: [
        {
          translateX:
            translateX.value,
        },
        {
          translateY:
            translateY.value,
        },
        {
          rotate:
            `${rotate.value}deg`,
        },
        {
          scale: scale.value,
        },
      ],
    }));

  /**
   * 🖼 IMAGE
   */

  const imageUri =
    contestant?.performances?.[0]
      ?.thumbnail?.publicUrl ||
    'https://via.placeholder.com/150';

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={{
          width: avatarSize + 14,
          alignItems: 'center',
        }}
      >

        {/* ✨ GLOW */}
        <View
          style={{
            position: 'absolute',

            width: avatarSize + 16,
            height: avatarSize + 26,

            borderRadius: 999,

            // backgroundColor:
            //   'rgba(250,204,21,0.18)',
          }}
        />

        {/* 👤 AVATAR */}
        <View
          style={{
            width: avatarSize + 8,
            height: avatarSize + 8,
            borderRadius: 999,
            overflow: 'hidden',
            borderWidth: 0.5,
            borderColor: '#facc15',
            backgroundColor: '#111',

            // shadowColor: '#facc15',
            // shadowOpacity: 0.45,
            // shadowRadius: 10,

            // elevation: 12,
          }}
        >
          <Image
            source={{ uri: imageUri }}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        {/* 🏷 NAME */}
        <Text
          numberOfLines={1}
          style={{
            marginTop: 12,
            color: 'white',
            fontWeight: '900',
            fontSize: width / 55,
            width: avatarSize + itemSpacing/4,
            textAlign: 'center',
            textShadowColor:
              'rgba(0,0,0,0.9)',
            textShadowOffset: {
              width: 0,
              height: 2,
            },

            textShadowRadius: 8,
          }}
        >
          {contestant?.name || 'Unknown'}
        </Text>
      </View>
    </Animated.View>
  );
};