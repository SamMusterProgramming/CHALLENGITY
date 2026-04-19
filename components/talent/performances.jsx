
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { generateChallengeTalentGuinessData, getAllTalentStages } from "../../apiCalls";
import StageDisplayer from "../talent/stageDisplayer";
import { useLoading } from "../../context/loadingContext";
import { useGlobalContext } from "../../context/GlobalProvider";
import LoadingModal from "../modal/loadingModal";
import LoadingActivity from "../modal/loadingActivity";
import { countries } from "../../utilities/TypeData";

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
                You’ve earned {stageData.contestants.find(c => c.user_id === user._id).votes} votes .{" "}
                Step in, stay active, shine and inspire more votes by adding performances.
            </Text>
        ) }
        {stageData.queue?.find(c => c.user_id === user._id) && (
            <Text className="text-gray-300 text-sm leading-relaxed">
                Your performance is in queue. You will be notified when you reach the stage.{" "}
                Enter the stage to track progress and stay close to the competition.
            </Text>
        ) }
         {stageData.eliminations?.find(c => c.user_id === user._id) && (
            <Text className="text-gray-300 text-sm leading-relaxed">
                You have been eliminated from the contest. Don’t give up — you can return
                by updating your performances or rejoining the queue.{" "}
                Enter the stage to follow progress and make your comeback.
            </Text>
        ) }
      
       </>
      )
}

export default function Performances({ user }) {
  
  const { isLoading , setIsLoading , hotStages , setHotStages ,
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
    <>
        
        <View className="px-5  pt-3 pb-2 bg-darkBg">
      
        <Text
            style ={{}}
            className="font-bebas text-lg text-goldSoft tracking-widest mb-1" >
            Progress & Performances
        </Text>
        
        <Text className="text-gray-200 text-sm mt- 2 leading-relaxed">
            Relive your performances and watch your progress unfold.
        </Text>
        </View>

        <View
        //   style={{  minHeight: width /2  + width / 4.5 + width * 0.1   }}
          className="flex-1  items-start justify-center">
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
                
                <PerformanceDescription stageData={stageData} user={user} />
            </View>
            

    </>

  );
}