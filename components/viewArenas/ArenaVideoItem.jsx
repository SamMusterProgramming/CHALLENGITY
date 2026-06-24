import React, {
    useEffect,
    useState,
  } from "react";
  
import {
View,
Text,
TouchableOpacity,
Pressable,
} from "react-native";

import {
Ionicons,
MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
VideoView,
useVideoPlayer,
} from "expo-video";
import ArenaPostData from "./arenaPostData";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArenaPostFooter from "./arenaPostFooter";
  
  export default function ArenaVideoItem({
    item,
    index,
    currentIndex,
    width,
    height,
    selectedArena
  }) {
  
    const [ paused,  setPaused, ] = useState(false);

    const insets = useSafeAreaInsets();

    const isVisible = index === currentIndex;
    const player =
      useVideoPlayer(
        item?.media?.video?.cdnUrl,
        player => {
          player.loop = true;
        }
      );
  
    useEffect(() => {
      if (!player) return;
      if (isVisible) {
        if (!paused) {
          player.play();
        }
      } else {
        player.pause();
        if (paused) {
          setPaused(false);
        }
      }
    }, [
      isVisible,
      paused,
    ]);
  
    const togglePlay = () => {
      if (!player) return;
      if (!isVisible) return;
      if (paused) {
        setPaused(false);
        requestAnimationFrame(
          () => {
            player.play();
          }
        );
      } else {
        player.pause();
        setPaused(true);
      }
    };
  
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={togglePlay}
        style={{
          width,
          height,
          backgroundColor:  "#000",
        }}
        className = "items-center  justify-center"
      >
        <View
            style={{
                width: "100%",
                height: "100%",
            }}
            >
            <VideoView
                player={player}
                nativeControls={false}
                contentFit="cover"
                allowsPictureInPicture={false}
                style={{
                width: "100%",
                height: "100%",
                }}
            />

            <Pressable
                onPress={togglePlay}
                style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                }}
            />
            </View>
        {paused && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor:"rgba(0,0,0,0.4)",
              justifyContent:"center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="play-circle"
              size={60}
              color="rgba(255,255,255,0.4)"
            />
          </View>
        )}
  
        {item?.spotlight && paused && (
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderRadius:9,
            //   borderWidth:  1,
            //   borderColor: "#eab308",
              backgroundColor: "rgba(0,0,0,0.15)",
            }}
          >
            <Text
              style={{
                color: "#eab308",
                fontWeight: "700",
              }}
            >
              ⭐ Spotlight
            </Text>
          </View>
        )}
  
        <ArenaPostData item={item} width={width} />

        {/* <LinearGradient
            colors={[
                 "rgba(0,0,0,0.92)",
                "transparent",
                "rgba(0,0,0,0.15)",
               ,
            ]}
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom:  50,
                height: 140,
            }}
            /> */}
  
        <View
          style={{
            position: "absolute",
            left: 9,
            right: 9,
            bottom: 80,
          }}
          className = "flex-row w-full p- 2 b g-[#edebeb]  items-end gap-2"  >
          <Text
            style={{
              color:"#fff",  
              fontWeight:"700",
              fontSize: width/42,
            }}
          >
            Performance :
          </Text>
          <Text
            numberOfLines={
              paused
                ? 1
                : 1
            }
            style={{
              color:"#edebeb",
            //   lineHeight:20,
            fontSize: width/42,
            fontWeight:"600",

            }}
          >
            {item?.caption}
          </Text>
        </View>

        <ArenaPostFooter arena = {selectedArena} width={width} />

      </TouchableOpacity>
    );
  }