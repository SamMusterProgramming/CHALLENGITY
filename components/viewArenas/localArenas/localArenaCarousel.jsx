import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
} from "react-native";

import ArenaCard from "../displayArena/arenaCard";
import { useGlobalContext } from "../../../context/GlobalProvider";
import StageIndicator from "../../custom/stageIndicator";


export default function LocalArenaCarousel({
  arenas = [],
  height,
}) {

  const { width } = Dimensions.get("window");
  const { colorTheme } = useGlobalContext();
  const [currentIndex, setCurrentIndex] =useState(0);
  const CARD_WIDTH = width * 0.96;

  return (

    <View
      style={{
        width:"100%",
        alignItems:"center",
        // marginTop:16,
      }}
      className ="mb-6"
    >

      {/* HEADER */}

      <View className="px- 3 w-full text-center pb-4 b g-darkBg">
        <Text
          style={{
            color:colorTheme,
            fontSize:width/20,
            fontWeight:"800",
            letterSpacing:0.6,
            textTransform:"uppercase",
          }}
        >
          Local Arenas
        </Text>
        <Text
          style={{
            marginTop:6,
            color:"rgba(255,255,255,0.7)",
            fontSize:width/30,
            fontWeight:"700",
            letterSpacing:0.3,
          }}
          className="text-gray-100 mt-1 mb-2 font-semiMontserrat tex t-center mt- "
        >
          Explore talent arenas and creators near you
        </Text>
      </View>

      {/* CAROUSEL */}
      <View
          style={{
            height: height,
            width,
            }}
          className="flex- 1 h-[100%] w-full items-start justify-center mb-6 bg-[#392a0e]/30">
            <FlatList
                style={{
                width,
                }}
                horizontal
                data={arenas}
                keyExtractor={(item)=>item._id}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                decelerationRate="fast"
                onMomentumScrollEnd={(event)=>{
                const index =
                    Math.round(
                    event.nativeEvent.contentOffset.x /
                    width
                    );
                setCurrentIndex(index);
                }}
                renderItem={({item})=>(
                <View
                    style={{
                    width,
                    alignItems:"center",
                    justifyContent:"center",
                    }}
                >
                    <ArenaCard
                    arena={item}
                    width={CARD_WIDTH}
                    height={height}
                    />
                </View>
                )}
            />
      </View>

      {/* INDICATOR */}

      { arenas.length > 1 && (
        <StageIndicator
                title="Arena"
                count={arenas.length}
                currentStage={currentIndex}
                width={width}
            /> 

        )}

        <View
            style={{
                alignSelf: "start",
                width: width ,
                height: 8,
                backgroundColor: "rgba(212,175,55,0.52)",
                // marginVertical: 20,
            }}
            className="  [95%] px-2 h-[8] bg-gold/90 mb-6 mt-6"
        />

    </View>

  );
}