import React, { useEffect, useRef, useState, memo } from 'react'
import { formatTime } from '../../helper';
import { Text, useWindowDimensions, View } from 'react-native';


export const RecordingTimer = ({ timer }) => {
    const {height , width} = useWindowDimensions()

    return (
      <View
        style={{
          position: "absolute",
          top: 80,
          alignSelf: "center",
          backgroundColor: "rgba(0,0,0,0.65)",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          zIndex: 99999,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: width/44,
            fontWeight: "900",
          }}
        >
          {formatTime(timer)}
        </Text>
      </View>
    );
  };