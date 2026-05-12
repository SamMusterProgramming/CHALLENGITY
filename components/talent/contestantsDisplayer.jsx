import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  Image
} from "react-native";

const { width ,height} = Dimensions.get("window");

const ITEM_SIZE = height/14;
const SPACING = 14;
const SNAP = ITEM_SIZE + SPACING;

export default function ContestantsDisplayer({
  contestants = [],
  selectedContestant,
  setSelectedContestant,
  show
}) {

  const flatList = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const translateY = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: !show? -120 : 0,
        duration: 380,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnim, {
        toValue: !show ? 0 : 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [show]);



  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * SNAP,
      index * SNAP,
      (index + 1) * SNAP,
    ];

    // cinematic transforms
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.72, 1.15, 0.72],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.48, 1, 0.48],
      extrapolate: "clamp",
    });

    const rotate = scrollX.interpolate({
      inputRange,
      outputRange: ["14deg", "0deg", "-14deg"],
      extrapolate: "clamp",
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [18, -12, 18],
      extrapolate: "clamp",
    });

    const blur = scrollX.interpolate({
      inputRange,
      outputRange: [12, 0, 12],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        className = "items-center  justify-center"
        style={{
          width: ITEM_SIZE,
          marginHorizontal: SPACING / 2,
          alignItems: "center",
          transform: [
            { translateY },
            { scale },
            { rotate },
          ],
          opacity,
        }}
      >
        {/* glow */}
        <Animated.View
          className = "items-center justify-center"
          style={{
            position: "absolute",
            width: ITEM_SIZE + 18,
            height: ITEM_SIZE + 18,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.12)",
            opacity: scale,
          }}
         
        />

        {/* avatar */}
        <Image
          source={{ uri: item.profileImage.publicUrl }}
        //   blurRadius={index === 0 ? 0 : 2}
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            borderRadius: 999,
            borderWidth: item.rank === 1 ? 3 : 2,
            borderColor:
              item.rank === 1
                ? "#FFD700"
                : "rgba(255,255,255,0.25)",
          }}
        />

        {/* rank */}
        {/* <View
          style={{
            position: "absolute",
            bottom: -6,
            backgroundColor: "black",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "800",
              fontSize: 11,
            }}
          >
            #{item.rank}
          </Text>
        </View> */}
      </Animated.View>
    );
  };

  return (
    <Animated.View
      pointerEvents={!show ? "none" : "auto"}
      style={{
        // width: "100%",
        height:height/6,
        alignItems: "center",
        // marginTop: 18,
        top:0,
        opacity: opacityAnim,
        transform: [{ translateY }],
      }}
       className ="absolute w-full"
    >

      <LinearGradient
           pointerEvents="none"
           colors={[  "rgba(0,0,0,0.95)" , "transparent" ]}
                style={{
                 position: "absolute",
                 top : 0,
                 alignSelf: "center",
                 width: width,
                 height:  height/3,
                 borderRadius: 0,
               }}
      />   
      {/* selected contestant title */}
      <View
      className = "flex-1 justify-start items-center">
            <Animated.FlatList
                ref={flatList}
                data={contestants}
                horizontal
                keyExtractor={(item) => item._id}
                snapToInterval={SNAP}
                decelerationRate="fast"
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                paddingHorizontal: width / 2 - SNAP /2,
                alignItems: "center",
                justifyContent : "center"
                }}
                renderItem={renderItem}
                onMomentumScrollEnd={(e) => {
                const index = Math.round(
                    e.nativeEvent.contentOffset.x / SNAP
                );
                const contestant = contestants[index];
                if (contestant !== selectedContestant) {
                    setSelectedContestant({...contestant});
                }
                }}
                onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                    useNativeDriver: true,
                }
                )}
                scrollEventThrottle={16}
                initialScrollIndex={selectedContestant.rank-1}
                
                getItemLayout={(data, index) => ({
                    length: SNAP,
                    offset: SNAP * index,
                    index,
                })}
            />
      </View>

      <View
        className = "w-full items-center"
        style={{
        //   marginBottom: 22,
          alignItems: "center",
        }} >
        <Text
        className = "font-bold tracking-wider"
          style={{
            color: "white",
            fontSize: width/42,
            fontWeight: "900",
            letterSpacing: 0.5,
          }}
        >
          {selectedContestant?.name}
        </Text>

        <Text
          style={{
            color: "rgba(255,255,255,0.6)",
            marginTop: 4,
            fontSize:  width/49,
            fontWeight: "600",
          }}
        >
          {selectedContestant?.rank <4 ? "TOP" : "RANK"} {selectedContestant?.rank} {"  "}•{"  "}
           VOTES {selectedContestant?.votes || 0}
        </Text>
      </View>

    </Animated.View>
  );
}