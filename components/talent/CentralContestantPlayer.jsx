

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Animated,
  Pressable,
  Text,
} from "react-native";
import { icons } from "../../constants";
import CarouselIndicator from "../custom/carouselIndicator";
import { LinearGradient } from "expo-linear-gradient";
import { getTimeLapse } from "../../helper";

export default function CentralContestantPlayer({
  data,
  width,
  height,
  top,
  left,
  isPlaying,
  setIsPlaying,
  player,
  updatePerformanceIndex,
  selectedContestant,
  scrollToIndex
}) {
  const flatList = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(1)

  const handlePress = () => {
    if (isPlaying) {
      setTimeout(() => {
        player.pause();
        setIsPlaying(false);
      }, 500);
   
    } else {
      setTimeout(() => {
        player.play();
        setIsPlaying(true);    
      }, 500);
 
    }
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    /* 🎬 FLIP EFFECT */
    const rotateY = scrollX.interpolate({
      inputRange,
      outputRange: ["90deg", "0deg", "-90deg"],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: "clamp",
    });

    return (
      <View 
      className ="flex-1"
         style={{ width, height }}
         >
        <Animated.View
          style={{
            flex: 1,
            transform: [
              { perspective: 1000 },
              { rotateY },
            ],
            opacity,
          }}
        >
          <Pressable
            onPress={handlePress}
            style={{ flex: 1 }}
          >
            <Image
              source={{
                uri:
                  item.thumbnail?.publicUrl ||
                  "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />
            {/* dark cinematic overlay */}
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            />
            {/* play icon */}
            <Image
              source={icons.play}
              style={{
                position: "absolute",
                width: 50,
                height: 50,
                alignSelf: "center",
                top: "45%",
                opacity: 0.6,
              }}
            />
          </Pressable>
        </Animated.View>
      </View>
    );
  };


  useEffect(() => {
    if (scrollToIndex == null || !flatList.current) return;
    const timeout = setTimeout(() => {
      flatList.current.scrollToIndex({
        index: scrollToIndex,
        animated: false,
      });
    }, 50); // small delay is IMPORTANT for Android
    return () => clearTimeout(timeout);
  }, [scrollToIndex]);


  return (
    <View
      className ="flex-center flex- 1 items-center"
      style={{
        position: "absolute",
        top:0,
        // left,
        width,
        height,
        opacity: !isPlaying ? 1 : 0,
        backgroundColor: "#000",
      }}
     
    >
      <Animated.FlatList
        data={data}
        horizontal
        ref={flatList}
        pagingEnabled // ✅ native paging (no snap logic)
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) =>
          item.video?.fileId || i.toString()
        }
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
            updatePerformanceIndex(
            selectedContestant._id,
            index
          );
          setIndex(index + 1)
        }}
        scrollEventThrottle={16}
      />

        <LinearGradient
           pointerEvents="none"
           colors={[ "transparent" , "rgba(0,0,0,0.95)"]}
                style={{
                 position: "absolute",
                 bottom: 0,
                 alignSelf: "center",
                 width: width,
                 height:  height/1.5,
                 borderRadius: 0,
               }}
      />   
      <View
      style={{
        bottom : height/6 + height/11 ,  
        left : 15 
       }}
      className="absolute w- [60%] gap-8 flex-row items-center justify-start">
          <CarouselIndicator
            count = {data.length}
            scrollX = {scrollX}
            width = {width }
            absolute = {false}
            position = {
                  {
                    bottom : null ,// height/6 + height/11 ,  
                    left : null, //15 
                  }
            }
            rank = {selectedContestant.rank}
            votes = {selectedContestant.votes + 1}
            size={width/34}
          />
          <Text
            style={{ fontSize: width/55 }}
            className="text-white font-semibold ml-auto">
              {index == 1 ?"Recent": "Prev"}  .  {getTimeLapse(data[index-1].date)} ago
          </Text>
      </View>
      {/* <CarouselIndicator
          count = {data.length}
          scrollX = {scrollX}
          width = {width }
          position = {
                {
                  bottom : height/6 + height/11 ,  
                  left : 15 
                }
          }
          rank = {selectedContestant.rank}
          votes = {selectedContestant.votes + 1}
          size={width/38}
        /> */}
    </View>
  );
}