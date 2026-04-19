
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Dimensions, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StageDisplayer from "../talent/stageDisplayer";
import { useGlobalContext } from "../../context/GlobalProvider";
import RectangularStageSelector from "./rectangularStageSelector";
import { countries, stageDescriptions, stageImages } from "../../utilities/TypeData";
import CountrySelector from "./countrySelector";
import { createTalentRoom, getRegionTalentStages } from "../../apiCalls";
import StageHero from "./stageHero";
import CountrySelectorModal from "../modal/countrySelectorModal";

const { width , height } = Dimensions.get("window");

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
  // { id: "20", name: "Global Stages" },
  // { id: "0", name: "Trending Stages" },
  // { id: "1", name: "Hot Stages" },
  { id: "1", name: "Singing" },
  { id: "2", name: "Dancing" },
  { id: "3", name: "Fitness" },
  { id: "4", name: "Magic" },
  // { id: "5", name: "Food" },
  // { id: "6", name: "Adventure" },
  { id: "7", name: "Sport" },
  { id: "8", name: "Melody" },
  // { id: "9", name: "Gaming" },
  { id: "10", name: "Art" },
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

const image = "https://images.unsplash.com/photo-1511379938547-c1f69419868d"

/* ---------------- COMPONENT ---------------- */

export default function StageSelector({ user ,onReady }) {
  const {allStages ,setRegionStages , regionStages , globalRefresh, setGlobalRefresh, gpsLocation , setGpsLocation ,
    globalSelectedStageName , setGlobalSelectedStageName ,globalSelectedRegion , setGlobalSelectedRegion
   } = useGlobalContext()

 
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const mainScrollX = useRef(new Animated.Value(0)).current;
  const mainFlatListRef = useRef(null); 

  /* ------------ FILTER DATA ------------ */

  useEffect(() => {
    if(!globalSelectedRegion || (globalSelectedRegion === regionStages[0].region)) return 
      const getStages = async () => {
      await getRegionTalentStages(globalSelectedRegion, setRegionStages)
    }
    getStages()
  }, [globalSelectedRegion , globalRefresh]);


  // useEffect(() => {
  //   if(!globalRefresh) return 
  //     const getStages = async () => {
  //     await getRegionTalentStages(globalSelectedRegion, setRegionStages)
  //     setTimeout(() => {
  //       if(globalRefresh) setGlobalRefresh(false)
  //     }, 60);
  //    }
  //   getStages()
  // }, [globalRefresh]);

  // useEffect(() => {
  //   if (topFlatListRef.current) {
  //     topFlatListRef.current.scrollToOffset({
  //       offset: 2 * SNAP_INTERVAL, 
  //       animated: true,          
  //     });
  //   }
  // }, []);

  /* ------------ RESET MAIN LIST ------------ */

  useEffect(() => {
     if(regionStages?.length < 1) return ;
       mainFlatListRef.current?.scrollToIndex({
       index: talentStages.findIndex( t => t.name === globalSelectedStageName),
       animated: false,
    });
  }, [globalSelectedStageName , regionStages]);

 
  const getItemLayout = (_, index) => ({
    length: MAIN_SNAP_INTERVAL,
    offset: MAIN_SNAP_INTERVAL * index,
    index,
  });

 
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
          transform: [{ scale }, {translateY}],
        }}
      >
        <StageDisplayer
          userTalent={item}
          user={user}
          userProfile={user} 
          activity={true}
          width={MAIN_ITEM_WIDTH}
          height ={0.53 * height}
        />
      </Animated.View>
    );
  };

  /* ------------ RENDER ------------ */


  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
    const safeIndex = Math.max(0, Math.min(index, (regionStages?.length || 1) - 1));
    setGlobalSelectedStageName(talentStages[safeIndex].name);
    onReady?.();
  };

  return (
    <View className ="flex-1">

      <View className="px-5 pt-2 pb-2 bg-darkBg">
            <Text className="font-bebas text-xl text-gold tracking-widest mb-1">
              EXPLORE STAGES
            </Text>
      </View>

      <View
      className ="flex-row flex-1 w-full  justify-start items-center">
        <View 
          
                  className ="flex-row w-[70%] b g-black-200 justify-start items-center">
                  <CountrySelector
                            data={countries}
                            setSelectedCountryCode = { setGlobalSelectedRegion} 
                            selectedCountryCode={globalSelectedRegion}
                          />
                 
        </View>
        <TouchableOpacity
                  onPress={() => setOpen(true)}
                  className="items-center justify-center flex-1 p-2 b g-white">
                        <Text className="font-bebas text-xl text-gold tracki ng-widest ">
                           Select
                        </Text>
        </TouchableOpacity>
      </View>  

    

       <View 
        style ={{height: 0.57 * height ,width:width}}
       className="flex- 1 w-full flex-row justify-center items-center b g-[#392a0e]/30">
           
            {/* <View
            className="flex- 1  items-center justify-center"> */}
                    <Animated.FlatList
                        ref={mainFlatListRef}
                        horizontal
                        data={regionStages && regionStages}
                        renderItem={renderMainItem}
                        keyExtractor={(item) => item._id}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={MAIN_SNAP_INTERVAL}
                        decelerationRate="fast"
                        bounces={false}
                        extraData={globalRefresh}
                        contentContainerStyle={{
                        paddingHorizontal:  SIDE_SPACING - MAIN_ITEM_MARGIN ,
                        marginVertical: 20,
                        }}
                        onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: mainScrollX } } }],
                        { useNativeDriver: true }
                        )}
                        scrollEventThrottle={16}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        windowSize={5}
                        removeClippedSubviews={false}
                        onMomentumScrollEnd={handleScrollEnd} 
                        getItemLayout={getItemLayout} 
                    /> 
            
            </View>

            <StageHero title={globalSelectedStageName + " Stage"} 
                  image={stageImages[globalSelectedStageName]}
                  region={countries.find( c => c.code == globalSelectedRegion).name}
                  flag = {countries.find( c => c.code == globalSelectedRegion).flag}
                  description={stageDescriptions[globalSelectedStageName]}/>
    
            <CountrySelectorModal
              visible={open}
              onClose={() => setOpen(false)}
              onSelect={(code) => {
                setGlobalSelectedRegion(code) 
              }}
            />
   

    </View>
  );
}