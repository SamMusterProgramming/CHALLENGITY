
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { generateChallengeTalentGuinessData, getAllTalentStages } from "../../apiCalls";
import StageDisplayer from "../talent/stageDisplayer";
import { useLoading } from "../../context/loadingContext";
import { useGlobalContext } from "../../context/GlobalProvider";
import LoadingModal from "../modal/loadingModal";
import LoadingActivity from "../modal/loadingActivity";
import { countries, stageDescriptions, stageImages } from "../../utilities/TypeData";
import StageHero from "../custom/stageHero";
import CarouselIndicator from "../custom/carouselIndicator";
import { icons, images } from "../../constants";

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

const stageIcons = {
  "Global Stages" : "🌍",
  "Trending Stages": "📈",
  "Hot Stages": "🔥",
  "Singing": "🎤",
  Dancing: "💃",
  Fitness: "🏋️",
  Magic: "🪄",
  Food: "🍔",
  Adventure: "🏕️",
  Sport: "⚽",
  Melody: "🎸",
  Gaming: "🎮",
  Art: "🎨",
  Tech: "🧠",
  Comedy: "🎭",
};

const continentIcons = {
    Africa: "🌍",      // Globe showing Africa/Europe
    Americas: "🌎",    // Globe showing Americas
    Asia: "🌏",        // Globe showing Asia/Oceania
    Europe: "🌍",    
  };

/* ---------------- COMPONENT ---------------- */

function PerformanceDescription({stageData , user}) {
       return (
        <>
        {stageData.contestants?.find(c => c.user_id === user._id) && (
            <Text className="text-white text-sm leading-relaxed">
                You are on stage and currently{" "}
                {stageData.contestants.find(c => c.user_id === user._id).rank <= 4 ? `Top ${stageData.contestants.find(c => c.user_id === user._id).rank}` : 
                `Ranked #${stageData.contestants.find(c => c.user_id === user._id).rank}`}.{" "}
                You've earned {stageData.contestants.find(c => c.user_id === user._id).votes} votes .{" "}
                 shine and inspire more votes by adding performances.
            </Text>
        ) }
        {stageData.queue?.find(c => c.user_id === user._id) && (
            <Text className="text-gray-300 text-sm leading-relaxed">
                Your performance is in queue. You will be notified when you reach the stage.{" "}
                Enter the stage to track progress.
            </Text>
        ) }
         {stageData.eliminations?.find(c => c.user_id === user._id) && (
            <Text className="text-gray-300 text-sm leading-relaxed">
                You have been eliminated from the contest. Don’t give up — you can return
                by updating your performances to rejoining the queue.
            </Text>
        ) }
      
       </>
      )
}

export default function Performances({ user }) {
  
  const { isLoading , setIsLoading , hotStages , setHotStages ,  activeIndex, setActiveIndex,
          userTalents, setUserTalents, userTalentPerformances ,globalRefresh ,setGlobalRefresh, setUserTalentPerformances , notifications, topTalents
          ,setTopTalents } = useGlobalContext()
  const [stageData, setStageData] = useState(userTalents[0]);
  const [description, setDescription] = useState("");

  const mainScrollX = useRef(new Animated.Value(0)).current;
  const mainFlatListRef = useRef(null);

//   useEffect(() => {
//     if(!stageData) return ;
//     const text = stageData.contestants.find(c => c.user_id === user._id) ? 
//     setDescription(text)
// }, [stageData])
  

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
          height={height * 0.5}
        />
      </Animated.View>
    );
  };

 
  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
    const safeIndex = Math.max(0, Math.min(index, (hotStages?.length || 1) - 1));
    setStageData({...userTalents[safeIndex]});
  };

  const getItemLayout = (_, index) => ({
    length: MAIN_SNAP_INTERVAL,
    offset: MAIN_SNAP_INTERVAL * index,
    index,
  });
  

  return (
    <View
    className ="flex-1 items-center  ">
        
        <View className="px-3 w-full pt-6 pb- 2 bg-dark Bg">
          <Text
              style ={{}}
              className="font-bebas text-xl text-white tracking-widest mb- 1" >
               Performances
          </Text>
          
          <Text className="text-gray-200 text-sm mt- 2 leading-relaxed">
          Relive your performances, stay active in the contest, and keep inspiring more votes with every new upload.
          </Text>
          </View>
        <View
      
        //   style={{  minHeight: width /2  + width / 4.5 + width * 0.1   }}
          className="flex-1 bg-[#392a0e]/30 w-full  items-center justify-center">

              {userTalents.length > 0 ? (
                 <Animated.FlatList
                 ref={mainFlatListRef}
                 horizontal
                 data={userTalents}
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
                 onMomentumScrollEnd={handleScrollEnd} 
                 getItemLayout={getItemLayout} 
              />
              ) : (
                <View 
                  style={{
                    height: 0.48 * height,
                    // width,
                    marginVertical: 20,
                  }}
                  className="flex-1 w-[96%] justify-center rounded-xl bg-[#1c1cbc]/15 items-center">
                    <Pressable
                    onPress={()=> {setActiveIndex(0)}}
                    className ="items-center justify-center"
                     >
                      <Image
                      source={images.empty}
                      className ="w-24 h-24"
                      />
                      <Text
                        className="text-white mt- 3 font-normal tracking-wider"
                        style={{
                          fontSize: width / 40,
                        }}
                      >
                        Find Stage
                      </Text>
                    </Pressable>
                </View>
              )}
                
            
            </View>
            {userTalents.length > 0 && ( 
            <View className="w-full px-3 items-end py- 2 ">
               <Text
                 style={{
                  fontSize: width / 36,
                  lineHeight: width / 24,
                  letterSpacing: 0.3,
                }}           
                 className="text-white mr-auto mb-1 font-extrabold leading-tight">
                {stageData.name} Stage {'  -  '}
                    <Text 
                      style={{fontSize:width/42}}
                      className="text-gray-300 tex t-sm uppercase tracki ng-widest ">
                      {countries.find(c => c.code === stageData.region)?.name} {' '}
                          <Text
                          style={{fontSize:width/39}}
                          className="text-gray-300   uppercase tracking-widest ">
                          {countries.find(c => c.code === stageData.region)?.flag}
                          </Text>
                      </Text>
                    </Text>
            
                    <PerformanceDescription stageData={stageData} user={user} />
                    <CarouselIndicator
                            title="Stages"
                            count={userTalents.length}
                            scrollX={mainScrollX}
                            width={width}
                            // absolute = {false}
                            position={{
                              top: 0,
                              right: 15,
                            }}
                            size={width/34}
                          /> 
            </View>
            )}
            

    </View>

  );
}