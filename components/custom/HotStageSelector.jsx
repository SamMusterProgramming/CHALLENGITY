import React, { useEffect, useRef, useState } from "react";
import {
  View,

  Dimensions,
  Animated,
  Pressable
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useGlobalContext } from "../../context/GlobalProvider";
import { generateChallengeTalentGuinessData } from "../../apiCalls";

import StageCategorySelector from "../custom/StageCategorySelector";
import UserTalentEntry from "../talent/UserTalentEntry";

const { width, height } = Dimensions.get("window");

/* ---------- Carousel Layout ---------- */

const ITEM_WIDTH = width * 0.88;
const ITEM_MARGIN = 12;

const SNAP_INTERVAL = ITEM_WIDTH + ITEM_MARGIN * 2;

const SIDE_SPACING = (width - ITEM_WIDTH) / 2 - ITEM_MARGIN;

/* ---------- Component ---------- */

export default function HotStageSelector({data}) {

  const { user } = useGlobalContext();


  const scrollX = useRef(new Animated.Value(0)).current;






  const renderItem = ({ item, index }) => {

    const inputRange = [
      (index - 1) * SNAP_INTERVAL,
      index * SNAP_INTERVAL,
      (index + 1) * SNAP_INTERVAL
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.78, 1.05, 0.88],
      extrapolate: "clamp"
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: "clamp"
    });

    return (

      <Animated.View
        style={{
          width: ITEM_WIDTH,
          marginHorizontal: ITEM_MARGIN,
          transform: [{ scale }],
          opacity,
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <Pressable
          style={{
            width: ITEM_WIDTH,
            borderRadius: 20,
            overflow: "hidden"
          }}
          onPress={() =>
            console.log("Stage Selected:", item.title)
          }
        >
          <UserTalentEntry
            userTalent = {item}
            user = {user}
            userProfile = {user}
            activity = {true}
            width = {ITEM_WIDTH}
          />

        </Pressable>

      </Animated.View>

    );

  };

  /* ---------- UI ---------- */

  return (

    

     

      <View
      className = "mt-4"
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Animated.FlatList
          data={data || []}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: SIDE_SPACING
          }}

          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}

          scrollEventThrottle={16}

        />

        {/* Top Fade Mask */}

        {/* <LinearGradient
        pointerEvents="none"
        colors={["rgba(255, 80, 80, 0.5)", "transparent"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0 ,
          right: 0,
          height: width/8
        }}
      />



        <LinearGradient
          pointerEvents="none"
          colors={["transparent", "rgba(255, 80, 80, 0.5)"]}
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            height: width/8

          }}
        />
        <LinearGradient
            pointerEvents="none"
            colors={["rgba(255, 80, 80, 0.5)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 30,
              width: width/10

            }}
          />
          <LinearGradient
            pointerEvents="none"
            colors={["transparent", "rgba(255, 80, 80, 0.5)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 30,
              width: width/10
            }}
          /> */}

      </View>

  );

}