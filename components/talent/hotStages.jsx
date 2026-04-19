
import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, Animated,  Dimensions } from "react-native";
import StageDisplayer from "../talent/stageDisplayer";
import { useGlobalContext } from "../../context/GlobalProvider";
import LoadingActivity from "../modal/loadingActivity";
import { countries } from "../../utilities/TypeData";
import { useFocusEffect } from "expo-router";
import { getStageByNameAndRegion } from "../../apiCalls";

const { width ,height } = Dimensions.get("window");



/* ---------------- SELECTOR CONFIG ---------------- */

const ICON_SIZE = 70;
const ICON_MARGIN = 18;

const ITEM_WIDTH = ICON_SIZE + ICON_MARGIN * 2;
const SNAP_INTERVAL = ITEM_WIDTH;

/* ---------------- MAIN CAROUSEL ---------------- */

const MAIN_ITEM_WIDTH = width * 0.94;
const MAIN_ITEM_MARGIN = 2;
const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
const SIDE_SPACING = (width - MAIN_ITEM_WIDTH) / 2;

/* ---------------- STAGES ---------------- */

const talentStages = [
  { id: "20", name: "Global Stages" },
  { id: "0", name: "Trending Stages" },
  { id: "1", name: "Hot Stages" },
  { id: "14", name: "Singing" },
  { id: "2", name: "Dancing" },
  { id: "3", name: "Fitness" },
  { id: "4", name: "Magic" },
  { id: "5", name: "Food" },
  { id: "6", name: "Adventure" },
  { id: "7", name: "Sport" },
  { id: "8", name: "Melody" },
  { id: "9", name: "Gaming" },
  { id: "10", name: "Art" },
  { id: "11", name: "Tech" },
  { id: "12", name: "Comedy" },
];



/* ---------------- COMPONENT ---------------- */

export default function HotStage({ user }) {

  const { isLoading ,globalRefresh,  hotStages ,setGlobalRefresh, setHotStages, hotStageScrolledIndex , setHotStageScrolledIndex } = useGlobalContext();
  const [stageData, setStageData] = useState(hotStages[0]);
  const mainScrollX = useRef(new Animated.Value(0)).current;
  const mainFlatListRef = useRef(null);

//   useEffect(() => {
//     mainFlatListRef.current?.scrollToOffset({ offset: hotStageScrolledIndex, animated: false });
//   }, []);

  /* ------------ MAIN STAGE CARD ------------ */

  const renderMainItem = ({ item, index }) => {

    const inputRange = [
      (index - 1) * MAIN_SNAP_INTERVAL,
      index * MAIN_SNAP_INTERVAL,
      (index + 1) * MAIN_SNAP_INTERVAL,
    ];

    const scale = mainScrollX.interpolate({
      inputRange,
      outputRange: [1, 1, 1],
      extrapolate: "clamp",
    });
    const translateY = mainScrollX.interpolate({
        inputRange,
        outputRange: [0, 0, 0],
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
          height= {height * 0.5}
        />
      </Animated.View>
    );
  };

//   useEffect(() => {
//     if( !globalRefresh) return 
//       const getStage = async () => {
//             const stage = await getStageByNameAndRegion({
//                                             name:stageData.name,
//                                             region:stageData.region
//                                             })
//             setGlobalRefresh(false)
//       }
//     getStage()
//   }, [globalRefresh]);

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
    const safeIndex = Math.max(0, Math.min(index, (hotStages?.length || 1) - 1));
    setStageData(hotStages[safeIndex]);
    setHotStageScrolledIndex(index)
  };

  const getItemLayout = (_, index) => ({
    length: MAIN_SNAP_INTERVAL,
    offset: MAIN_SNAP_INTERVAL * index,
    index,
  });

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        console.log(hotStageScrolledIndex)
        mainFlatListRef.current?.scrollToOffset({
                            offset: hotStageScrolledIndex * MAIN_SNAP_INTERVAL,
                             animated: false });
      }, 80); 
      return () =>  {
                clearTimeout(timeout);}
    }, [])
  );
  
  if(globalRefresh) return null ; 

  return (
    <>
        
        <View className="px-5 mt-5 pt-6 pb-2 bg-darkBg">
      
        <Text
            style ={{}}
            className="font-bebas text-xl text-gold tracking-widest mb-1" >
             TRENDING STAGES
        </Text>
        <Text className="text-gray-200 text-sm mt-2 leading-relaxed">
            Competition is heating up. Watch, vote, and join when a spot opens.
        </Text>
        
        </View>

        <View
          style={{  minHeight: width /2  + width / 4.5 + width * 0.1   }}
          className="flex-1  items-center justify-center">
                <LoadingActivity visible = {isLoading} />
                <Animated.FlatList
                    ref={mainFlatListRef}
                    horizontal
                    data={hotStages}
                    extraData={globalRefresh}
                    renderItem={renderMainItem}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={MAIN_SNAP_INTERVAL}
                    decelerationRate="fast"
                    bounces={false}
                    contentContainerStyle={{
                    paddingHorizontal: SIDE_SPACING - MAIN_ITEM_MARGIN,
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
                    onMomentumScrollEnd={handleScrollEnd} 
                    getItemLayout={getItemLayout} 
                />
            
            </View>

       
       
       
       <View className="px-5">
     
         <Text className="text-white text-xl font-extrabold leading-tight">
           {stageData.name} Stage {'  -  '}
            <Text className="text-gray-300 text-sm uppercase tracki ng-widest mb-1">
              {countries.find(c => c.code === stageData.region)?.name} {' '}
                 <Text className="text-gray-300  text-lg  uppercase tracking-widest ">
                  {countries.find(c => c.code === stageData.region)?.flag}
                 </Text>
            </Text>
         </Text>
        
         <Text className="text-gray-200 text-sm mt-2 leading-relaxed">
             Step into the spotlight and let your voice move the world. This is your moment to shine, to be heard, and to rise
         </Text>

       </View>
   

    </>

  );
}