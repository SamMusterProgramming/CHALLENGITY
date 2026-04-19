
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Dimensions } from "react-native";
import StageDisplayer from "../talent/stageDisplayer";
import { useGlobalContext } from "../../context/GlobalProvider";


const { width , height } = Dimensions.get("window");



/* ---------------- SELECTOR CONFIG ---------------- */

const ICON_SIZE = 70;
const ICON_MARGIN = 18;

const ITEM_WIDTH = ICON_SIZE + ICON_MARGIN * 2;
const SNAP_INTERVAL = ITEM_WIDTH;

/* ---------------- MAIN CAROUSEL ---------------- */

const MAIN_ITEM_WIDTH = width * 0.95;
const MAIN_ITEM_MARGIN = 2;
const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
const SIDE_SPACING = (width - MAIN_ITEM_WIDTH) / 2;


export default function Favourites({ user }) {
  
  const { isLoading , setIsLoading , hotStages , setHotStages ,favouriteStages, setFavouriteStages,
          userTalents, setUserTalents, userTalentPerformances ,globalRefresh ,setGlobalRefresh, setUserTalentPerformances , notifications, topTalents
          ,setTopTalents } = useGlobalContext()

  const [selection, setSelection] = useState(null)
  const mainScrollX = useRef(new Animated.Value(0)).current;
  const mainFlatListRef = useRef(null);

 


  const renderMainItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * MAIN_SNAP_INTERVAL,
      index * MAIN_SNAP_INTERVAL,
      (index + 1) * MAIN_SNAP_INTERVAL,
    ];
    const scale = mainScrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: "clamp",
    });
    const translateY = mainScrollX.interpolate({
        inputRange,
        outputRange: [30, 0, 20],
        extrapolate: "clamp",
      });
    return (
      <Animated.View
        style={{
          width: MAIN_ITEM_WIDTH,
          marginHorizontal: MAIN_ITEM_MARGIN,
          transform: [{ scale } , {translateY}],
        }}
      >
        <StageDisplayer
          userTalent={item}
          user={user}
          userProfile={user}
          activity={true}
          width={MAIN_ITEM_WIDTH}
          height={height * 0.5}
        />
      </Animated.View>
    );
  };


  

  return (
    <>
        
        <View className="px-5  pt-12 pb-2 bg-darkBg">
        <Text
            style ={{}}
            className="font-bebas text-lg text-netflixRed tracking-widest mb-1" >
            Favorite Stages
        </Text>
        <Text
        style={{fontSize:width/40}}
            className="
            font-montserrat
            text-sm
            text-gray-200
            leading-1
            max-w-[90%]
            " >
            Revisit the stages you've marked as favorites.
        </Text>
        </View>

        <View
          style={{  minHeight: width /2  + width / 4.5 + width * 0.1   }}
          className="flex-1  items-start justify-center">
                <Animated.FlatList
                    ref={mainFlatListRef}
                    horizontal
                    data={favouriteStages}
                    extraData={globalRefresh}  
                    renderItem={renderMainItem}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={MAIN_SNAP_INTERVAL}
                    decelerationRate="fast"
                    bounces={false}
                    contentContainerStyle={{
                    paddingHorizontal: SIDE_SPACING- MAIN_ITEM_MARGIN,
                    marginVertical: 20,
                    }}
                    onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: mainScrollX } } }],
                    { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    initialNumToRender={2}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                />
            
            </View>
   

    </>

  );
}