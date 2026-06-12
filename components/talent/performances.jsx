
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Dimensions, Image, FlatList } from "react-native";
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
import StageDiscoveryFooter from "../footers/stageDiscoveryFooter";

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
  const contestant = stageData.contestants?.find(
    c => c.user_id === user._id
  );
  
  return (
    <>
      {contestant && (
        <Text className="text-zinc-300 text-start text-sm leading-6">
          You're currently{" "}
          <Text className="text-[#eab308] font-bold">
            {contestant.rank <= 4
              ? `Top ${contestant.rank}`
              : `Ranked #${contestant.rank}`}
          </Text>
          {" "}on this stage with{" "}
          <Text className="text-[#eab308] font-bold">
            {contestant.votes} votes .{"\n"}
          </Text>
            Perform. Earn votes. Rise higher. ✨
          </Text>
      )}
  
      {stageData.queue?.find(
        c => c.user_id === user._id
      ) && (
        <Text className="text-zinc-300 text-sm leading-6">
          Your performance is currently in the{" "}
          <Text className="text-[#eab308] font-semibold">
            queue
          </Text>
          . You'll be notified as soon as you secure a place on stage.
        </Text>
      )}
  
      {stageData.eliminations?.find(
        c => c.user_id === user._id
      ) && (
        <Text className="text-zinc-300 text-sm leading-6">
          You've been eliminated from this stage . Your journey isn't over. Rejoin with a stronger performance
        </Text>
      )}
    </>
  );
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

  const renderMainItem = ({ item }) => {
    return (
      <View
        style={{
          width: width * 0.96,
          alignSelf: "center",
          marginBottom: 16,
        }}
      >
        <StageDisplayer
          userTalent={item}
          user={user}
          userProfile={user}
          activity={true}
          width={width * 0.96}
          height={height * 0.3}
        />
       <View className="w- full px- 3 bg-[#010101]  items-ce nter py-2 mt-2 ">
               <PerformanceDescription stageData={item} user={user} />
       </View>
       <View
            style={{
                alignSelf: "start",
                width: width * 0.4,
                height: 1,
                backgroundColor: "rgba(212,175,55,0.52)",
                // marginVertical: 20,
            }}
            className="  [95%] px-2 h-[2] bg-gold/40 mb-6 mt-6"
        />
      </View>
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
        
        <View className="px- 3 w-full mt-4 mb-4 bg-dark Bg">
          <Text
               style={{
                fontSize: width / 30,
                lineHeight: width / 20,
                letterSpacing: 0.3,
                fontWeight:700,
              }}
              className="fon t-bold uppercase te xt-center te xt-xl text-white tracking-widest mb- 1" >
               Performances
          </Text>
          
          <Text  style={{
                  fontSize: width / 30,
                  lineHeight: width / 24,
                  letterSpacing: 0.3,
                  // fontWeight:700,
                }}
                  className="text-gray-200 mt-1 font-semiMontserrat tex t-center mt- ">
                    Keep competing, share new performances, and inspire more votes.         
          </Text>
       </View>
       

       <View
            style={{
                alignSelf: "start",
                width: width * 0.4,
                height: 1,
                backgroundColor: "rgba(212,175,55,0.52)",
                // marginVertical: 20,
            }}
            className="  [95%] px-2 h-[2] bg-gold/40 mb-10 mt-4"
        />

        <View
        //   style={{  minHeight: width /2  + width / 4.5 + width * 0.1   }}
          className="flex-1 bg-[#392a0e]/30 w-full  items-center justify-center">
              {userTalents.length > 0 ? (
                <FlatList
                ref={mainFlatListRef}
                data={userTalents}
                extraData={globalRefresh}
                renderItem={renderMainItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                bounces={false}
                removeClippedSubviews={true}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                updateCellsBatchingPeriod={50}
                windowSize={5}
                scrollEventThrottle={16}
                contentContainerStyle={{
                  paddingVertical: 16,
                  paddingBottom: 120,
                }}
                onEndReachedThreshold={0.3}
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
  

    </View>

  );
}