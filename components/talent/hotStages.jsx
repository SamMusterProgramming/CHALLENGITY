
import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, Animated,  Dimensions } from "react-native";
import StageDisplayer from "../talent/stageDisplayer";
import { useGlobalContext } from "../../context/GlobalProvider";
import LoadingActivity from "../modal/loadingActivity";
import { countries, stageDescriptions, stageImages } from "../../utilities/TypeData";
import { useFocusEffect } from "expo-router";
import { getStageByNameAndRegion } from "../../apiCalls";
import CarouselIndicator from "../custom/carouselIndicator";
import StageHero from "../custom/stageHero";

const { width ,height } = Dimensions.get("window");



/* ---------------- SELECTOR CONFIG ---------------- */

const ICON_SIZE = 70;
const ICON_MARGIN = 18;

const ITEM_WIDTH = ICON_SIZE + ICON_MARGIN * 2;
const SNAP_INTERVAL = ITEM_WIDTH;

/* ---------------- MAIN CAROUSEL ---------------- */

const MAIN_ITEM_WIDTH = width * 0.96;
const MAIN_ITEM_MARGIN = 8;
const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
const SIDE_SPACING =  (width - MAIN_ITEM_WIDTH) / 2;

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
        outputRange: [40, 0, 40],
        extrapolate: "clamp",
      });

    return (
      <Animated.View
        style={{
          width: MAIN_ITEM_WIDTH ,
          marginHorizontal: MAIN_ITEM_MARGIN,
          transform: [{ scale } ],
        }}
        className =""
      >
        <StageDisplayer
          userTalent={item}
          user={user}
          userProfile={user}
          activity={true}
          width={MAIN_ITEM_WIDTH}
          height= {height * 0.3}
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
        const offset = hotStageScrolledIndex * MAIN_SNAP_INTERVAL ;
        mainFlatListRef.current?.scrollToOffset({
                            offset: offset,
                             animated: false });
        mainScrollX.setValue(offset);
      }, 80); 
      return () =>  {
                clearTimeout(timeout);}
    }, [])
  );
  
  if(globalRefresh) return null ; 

  return (
    <View
    className ="flex- 1 items-center   ">
        
        <View className="px-3 w-full text-center pb-4 b g-darkBg">
            <Text
                style ={{}}
                className="font-bebas te xt-center text-xl text-white tracking-widest mb- 1" >
                HOT STAGES
            </Text>
            <Text 
                style={{
                  fontSize: width / 32,
                  lineHeight: width / 24,
                  letterSpacing: 0.3,
                }}
                className="text-gray-200 tex t-center mt- 2 leading-relaxed">
                Competition is heating up. Watch, vote, and join when a spot opens.
            </Text>
        </View>

        <View
          style={{
            height: 0.3 * height,
            width,
          }}
          className="flex- 1 w-full items-start justify-center  bg-[#392a0e]/30">
                <LoadingActivity visible = {isLoading} />
                <Animated.FlatList
                    ref={mainFlatListRef}
                    horizontal
                    data={hotStages.slice(0,20)}
                    extraData={globalRefresh}
                    renderItem={renderMainItem}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={MAIN_SNAP_INTERVAL}
                    decelerationRate="fast"
                    removeClippedSubviews= {true}
                    bounces={false}
                    contentContainerStyle={{
                    // paddingHorizontal: SIDE_SPACING - MAIN_ITEM_MARGIN,
                    // marginVertical: 20,
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
                    // ListHeaderComponent={()=>{
                    //    return(
                    //     <View 
                    //      style ={{
                    //        height : height * 0.5,
                    //        width : width * 0.1
                    //      }}
                    //      className ="bg-white"
                    //     />
                    //    )
                    // }}
                    />
            
            </View>

            <View className="w-full px-3 text-center items-end py-2 ">
                        <StageHero title={stageData.name} 
                            image={null}
                            region={countries.find( c => c.code == stageData.region).name}
                            flag = {countries.find( c => c.code == stageData.region).flag}
                            description={stageDescriptions[stageData.region.name]}/>
                        {/* <CarouselIndicator
                                title="Stages"
                                count={8}
                                scrollX={mainScrollX}
                                width={width}
                                absolute = {false}
                                // position={{
                                //   bottom: 0,
                                //   right: 6,
                                // }}
                                size={width/34}
                              />  */}
            </View>
      
            <View className=" w-[95%] h-[1] bg-white/40 mt- 4 mb- 4" />

    </View>

  );
}