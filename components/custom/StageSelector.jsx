
// import React, { useState, useRef, useEffect } from "react";
// import { View, Text, Animated, Pressable, Dimensions, Image, TouchableOpacity, ActivityIndicator } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import StageDisplayer from "../talent/stageDisplayer";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import RectangularStageSelector from "./rectangularStageSelector";
// import { countries, stageDescriptions, stageImages } from "../../utilities/TypeData";
// import CountrySelector from "./countrySelector";
// import { createTalentRoom, getRegionTalentStages } from "../../apiCalls";
// import StageHero from "./stageHero";
// import CountrySelectorModal from "../modal/countrySelectorModal";
// import CarouselIndicator from "./carouselIndicator";

// const { width , height } = Dimensions.get("window");



// /* ---------------- MAIN CAROUSEL ---------------- */

// const MAIN_ITEM_WIDTH = width * 0.94;
// const MAIN_ITEM_MARGIN = 8;
// const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
// const SIDE_SPACING = (width - MAIN_ITEM_WIDTH) / 2;
// /* ---------------- STAGES ---------------- */

// const talentStages = [
//   // { id: "20", name: "Global Stages" },
//   // { id: "0", name: "Trending Stages" },
//   // { id: "1", name: "Hot Stages" },
//   { id: "1", name: "Singing" },
//   { id: "2", name: "Dancing" },
//   { id: "3", name: "Fitness" },
//   { id: "4", name: "Magic" },
//   // { id: "5", name: "Food" },
//   // { id: "6", name: "Adventure" },
//   { id: "7", name: "Sport" },
//   { id: "8", name: "Melody" },
//   // { id: "9", name: "Gaming" },
//   { id: "10", name: "Art" },
//   { id: "12", name: "Comedy" },
// ];

// const stageIcons = {
//   "Global Stages" : "🌍",
//   "Trending Stages": "📈",
//   "Hot Stages": "🔥",
//   "Singing": "🎤",
//   Dancing: "💃",
//   Fitness: "🏋️",
//   Magic: "🪄",
//   Food: "🍔",
//   Adventure: "🏕️",
//   Sport: "⚽",
//   Melody: "🎸",
//   Gaming: "🎮",
//   Art: "🎨",
//   Tech: "🧠",
//   Comedy: "🎭",
// };

// const image = "https://images.unsplash.com/photo-1511379938547-c1f69419868d"

// /* ---------------- COMPONENT ---------------- */

// export default function StageSelector({ user ,onReady }) {
//   const {allStages ,setRegionStages , regionStages , globalRefresh, setGlobalRefresh, gpsLocation , setGpsLocation ,
//     globalSelectedStageName , setGlobalSelectedStageName ,globalSelectedRegion , setGlobalSelectedRegion
//    } = useGlobalContext()

 
//   const [scrollX, setScrollX] = useState(null);
//   const [open, setOpen] = useState(false);
//   const mainScrollX = useRef(new Animated.Value(0)).current;
//   const mainFlatListRef = useRef(null); 

//   const [loadingStages, setLoadingStages] = useState(false);
//   const [showCarousel, setShowCarousel] = useState(true);

  

//   /* ------------ FILTER DATA ------------ */

//   // useEffect(() => {
//   //   if(!globalSelectedRegion || (globalSelectedRegion === regionStages[0]?.region)) return 
//   //     const getStages = async () => {
//   //     await getRegionTalentStages(globalSelectedRegion, setRegionStages)
//   //   }
//   //   getStages()
//   // }, [globalSelectedRegion , globalRefresh]);

  
//   useEffect(() => {
//     if (
//       !globalSelectedRegion ||
//       globalSelectedRegion === regionStages?.[0]?.region
//     ) {
//       return;
//     }
  
//     let mounted = true;
  
//     const loadStages = async () => {
//       try {
//         // immediately unmount carousel
//         setShowCarousel(false);
  
//         // show loader
//         setLoadingStages(true);
  
//         // small delay for smooth fade-out feeling
//         await new Promise(resolve => setTimeout(resolve, 120));
  
//         // fetch new data
//         await getRegionTalentStages(
//           globalSelectedRegion,
//           setRegionStages
//         );
  
//         // allow layout to stabilize
//         await new Promise(resolve => setTimeout(resolve, 180));
  
//         if (!mounted) return;
  
//         // remount carousel
//         setShowCarousel(true);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         if (mounted) {
//           setLoadingStages(false);
//         }
//       }
//     };
  
//     loadStages();
//     return () => {
//       mounted = false;
//     };
//   }, [globalSelectedRegion , globalRefresh]);


//   /* ------------ RESET MAIN LIST ------------ */

//   // useEffect(() => {
//   //    const index = talentStages.findIndex( t => t.name === globalSelectedStageName)
//   //    const offset = index * MAIN_ITEM_WIDTH
//   //    if(regionStages?.length < 1) return ;
//   //      mainFlatListRef.current?.scrollToIndex({
//   //      index: index,
//   //      animated: false,
//   //   });
//   //    mainScrollX.setValue(offset);
//   // }, [globalSelectedStageName , regionStages]);

//   useEffect(() => {
//     if (!showCarousel) return;
//     if (!regionStages?.length) return;
//     const index = talentStages.findIndex(
//       t => t.name === globalSelectedStageName
//     );
//     const safeIndex = Math.max(0, index);
//     requestAnimationFrame(() => {
//       setTimeout(() => {
//         mainFlatListRef.current?.scrollToIndex({
//           index: safeIndex,
//           animated: false,
//           // viewPosition: 0.5,
//         });
//       }, 150);
//     });
//   }, [showCarousel, regionStages,globalSelectedStageName]);
 
//   const getItemLayout = (_, index) => ({
//     length: MAIN_SNAP_INTERVAL,
//     offset: MAIN_SNAP_INTERVAL * index,
//     index,
//   });

 
//   /* ------------ MAIN STAGE CARD ------------ */

//   const renderMainItem = ({ item, index }) => {

//     const inputRange = [
//       (index - 1) * MAIN_SNAP_INTERVAL,
//       index * MAIN_SNAP_INTERVAL,
//       (index + 1) * MAIN_SNAP_INTERVAL,
//     ];

//     const scale = mainScrollX.interpolate({
//       inputRange,
//       outputRange: [1, 1, 1],
//       extrapolate: "clamp",
//     });

//     const translateY = mainScrollX.interpolate({
//       inputRange,
//       outputRange: [0, 0, 0],
//       extrapolate: "clamp",
//     });
  
   
//     return (
//       <Animated.View
//         style={{
//           width: MAIN_ITEM_WIDTH,
//           marginHorizontal: MAIN_ITEM_MARGIN,
//           transform: [{ scale }, {translateY}],
//         }}
//       >
//         <StageDisplayer
//           userTalent={item}
//           user={user}
//           userProfile={user} 
//           activity={true}
//           width={MAIN_ITEM_WIDTH}
//           height ={0.47 * height}
//         />
//       </Animated.View>
//     );
//   };

//   /* ------------ RENDER ------------ */


//   const handleScrollEnd = (event) => {
//     const offsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
//     setScrollX(offsetX)
//     const safeIndex = Math.max(0, Math.min(index, (regionStages?.length || 1) - 1));
//     setGlobalSelectedStageName(talentStages[safeIndex].name);
//     onReady?.();
//   };

//   return (
//     <View className ="flex-1">

//       <View className="px-5 pt-8 pb-2 bg-dark Bg">
//             <Text className="font-bebas text-lg text-white tracking-widest mb-1">
//               EXPLORE STAGES
//             </Text>
//       </View>

//       <View
//       className ="flex-row flex-1 w-full  justify-start items-center">
//         <View 
          
//                   className ="flex-row w-[100%] f b g-black-200 justify-start items-center">
//                   <CountrySelector
//                             data={countries}
//                             setSelectedCountryCode = { setGlobalSelectedRegion} 
//                             selectedCountryCode={globalSelectedRegion}
//                           />
//                    <TouchableOpacity
//                             onPress={() => setOpen(true)}
//                             className="items-center justify-center p-2 px-4 round ed-xl b g-gold/20 absolute top-0 right-4">
//                                   <Text 
//                                   style ={{fontSize : width/45}}
//                                   className="font-bebas  text-blue-300 tracking-widest ">
//                                     Select Region
//                                   </Text>
//                    </TouchableOpacity>
                 
//         </View>
       
//       </View>  

//       <View
//         style={{
//           height: 0.50 * height,
//           width,
//         }}
//         className="flex-1 w-full flex-row justify-center items-center bg-[#392a0e]/30"
//       >
//         {loadingStages ? (

//           <View className="flex-1 justify-center items-center">
//             <ActivityIndicator
//               size="small"
//               color="#D4AF37"
//             />

//             <Text
//               className="text-white mt-3 font-semibold"
//               style={{
//                 fontSize: width / 38,
//               }}
//             >
//               Loading stages...
//             </Text>
//           </View>

//         ) : showCarousel ? (

//           <>
//             <Animated.FlatList
//               ref={mainFlatListRef}
//               horizontal
//               data={regionStages}
//               renderItem={renderMainItem}
//               keyExtractor={(item) => item._id}
//               showsHorizontalScrollIndicator={false}
//               // pagingEnabled
//               snapToInterval={MAIN_SNAP_INTERVAL}
//               decelerationRate="fast"
//               bounces={false}
//               overScrollMode="never"
//               contentContainerStyle={{
//                 paddingHorizontal:
//                   SIDE_SPACING - MAIN_ITEM_MARGIN,
//               }}
//               onScroll={Animated.event(
//                 [
//                   {
//                     nativeEvent: {
//                       contentOffset: {
//                         x: mainScrollX,
//                       },
//                     },
//                   },
//                 ],
//                 {
//                   useNativeDriver: true,
//                 }
//               )}
//               scrollEventThrottle={16}
//               removeClippedSubviews={true}
//               onMomentumScrollEnd={handleScrollEnd}
//               getItemLayout={getItemLayout}
//             />

          
//           </>

//         ) : null}
//       </View>     
//             <View className="w- full  flex- 1 mt-2 roun ded-2xl overflow-hidden">
                   
//                    <StageHero title={globalSelectedStageName + " Stage"} 
//                         image={stageImages[globalSelectedStageName]}
//                         region={countries.find( c => c.code == globalSelectedRegion).name}
//                         flag = {countries.find( c => c.code == globalSelectedRegion).flag}
//                         description={stageDescriptions[globalSelectedStageName]}/>
//                   <CarouselIndicator
//                             title="Stages"
//                             count={regionStages.length}
//                             scrollX={mainScrollX}
//                             width={width}
//                             position={{
//                               top: 0,
//                               right: 20,
//                             }}
//                           />
                  
//             </View>
//             <CountrySelectorModal
//               visible={open}
//               onClose={() => setOpen(false)}
//               onSelect={(code) => {
//                 setGlobalSelectedRegion(code) 
//               }}
//             />
   

//     </View>
//   );
// }

import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, Animated, Pressable, Dimensions, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StageDisplayer from "../talent/stageDisplayer";
import { useGlobalContext } from "../../context/GlobalProvider";
import RectangularStageSelector from "./rectangularStageSelector";
import { countries, stageDescriptions, stageImages } from "../../utilities/TypeData";
import CountrySelector from "./countrySelector";
import { createTalentRoom, getRegionTalentStages } from "../../apiCalls";
import StageHero from "./stageHero";
import CountrySelectorModal from "../modal/countrySelectorModal";
import CarouselIndicator from "./carouselIndicator";

const { width , height } = Dimensions.get("window");



/* ---------------- MAIN CAROUSEL ---------------- */

const MAIN_ITEM_WIDTH = width * 0.96;
const MAIN_ITEM_MARGIN = 8;
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
    globalSelectedStageName , setGlobalSelectedStageName ,globalSelectedRegion , userCountryCode, setGlobalSelectedRegion
   } = useGlobalContext()

 
  const [scrollX, setScrollX] = useState(null);
  const [open, setOpen] = useState(false);
  const mainScrollX = useRef(new Animated.Value(0)).current;
  const mainFlatListRef = useRef(null); 

  const [loadingStages, setLoadingStages] = useState(false);
  const [showCarousel, setShowCarousel] = useState(true);

  

  /* ------------ FILTER DATA ------------ */

  useEffect(() => {
    if(!globalSelectedRegion || (globalSelectedRegion === regionStages[0]?.region)) return 
      const getStages = async () => {
        setLoadingStages(true)
      await getRegionTalentStages(globalSelectedRegion, setRegionStages)
      setTimeout(() => {
        setLoadingStages(false)
      }, 1000);
    }
    getStages()
  }, [globalSelectedRegion , globalRefresh]);

  
  // useEffect(() => {
  //   if (
  //     !globalSelectedRegion ||
  //     globalSelectedRegion === regionStages?.[0]?.region
  //   ) {
  //     return;
  //   }
  
  //   let mounted = true;
  
  //   const loadStages = async () => {
  //     try {
  //       // immediately unmount carousel
  //       setShowCarousel(false);
  
  //       // show loader
  //       setLoadingStages(true);
  
  //       // small delay for smooth fade-out feeling
  //       await new Promise(resolve => setTimeout(resolve, 120));
  
  //       // fetch new data
  //       await getRegionTalentStages(
  //         globalSelectedRegion,
  //         setRegionStages
  //       );
  
  //       // allow layout to stabilize
  //       await new Promise(resolve => setTimeout(resolve, 180));
  
  //       if (!mounted) return;
  
  //       // remount carousel
  //       setShowCarousel(true);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       if (mounted) {
  //         setLoadingStages(false);
  //       }
  //     }
  //   };
  
  //   loadStages();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [globalSelectedRegion , globalRefresh]);

  const initialStageIndex = useMemo(() => {
    const index = talentStages.findIndex(
      t => t.name === globalSelectedStageName
    );
    return Math.max(0, index);
  }, [globalSelectedStageName , globalRefresh]);





 
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
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        style={{
          width: MAIN_ITEM_WIDTH,
          marginHorizontal: MAIN_ITEM_MARGIN,
          transform: [{ scale }, {translateY}],
          backfaceVisibility: "hidden",
        }}>
            <StageDisplayer
              userTalent={item}
              user={user}
              userProfile={user} 
              activity={true}
              width={MAIN_ITEM_WIDTH}
              height ={0.47 * height}
            />
      </Animated.View>
    );
  };




  /* ------------ RENDER ------------ */


       
  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
    setScrollX(offsetX)
    const safeIndex = Math.max(0, Math.min(index, (regionStages?.length || 1) - 1));
     if(globalSelectedStageName !== talentStages[safeIndex].name) {
      console.log("i am here")
      setGlobalSelectedStageName(talentStages[safeIndex].name);
     }
    onReady?.();
  };
         
  return (
    <View
     className ="flex-1 items-center  ">

      <View className="px-3 w-full pt-6 pb-2 bg-dark Bg">
            <Text className="font-bebas text-lg text-white tracking-widest mb- 1">
              EXPLORE STAGES
            </Text>
            <Text
              style={{
                fontSize: width / 36,
                lineHeight: width / 24,
                letterSpacing: 0.3,
              }}
              className="text-gray-200 fo nt-medium  leading-relaxed px- 2"
            >
              Discover extraordinary talent from across the globe.
             Explore performances from different cultures, rising stars, and unique creative worlds.
            </Text>
           
      </View>
      
      

      <View
        className="w-[94%] items-center justify-center px- 3 mt-2" >
        <View
          style={{
            // height: width / 11.5,
            // backgroundColor: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
          className="flex-row w- full items-center gap-2 justify-between"
        >

          {/* YOUR REGION */}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              setGlobalSelectedRegion(userCountryCode)
            }
            style={{
              backgroundColor:
                globalSelectedRegion === userCountryCode
                  ? "rgba(212,175,55,0.18)"
                  : "rgba(255,255,255,0.08)",
            }}
            className="flex- 1 w-[50%] py-2 justify-center items-center rounded-md"
          >
            <Text
              style={{
                fontSize: width / 35,
                color:
                  globalSelectedRegion === userCountryCode
                    ? "#F5D77A"
                    : "#8E8E93",
                letterSpacing: 1,
              }}
              className="font-bebas"
            >
              Your Region
            </Text>
          </TouchableOpacity>

          {/* SELECT REGION */}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setOpen(true)}
            style={{
              backgroundColor:
                globalSelectedRegion !== userCountryCode
                  ? "rgba(212,175,55,0.18)"
                  : "rgba(255,255,255,0.08)",
            }}
            className="py-2 w-[50%] justify-center items-center rounded-md"
          >
            <Text
              style={{
                fontSize: width / 35,
                color:
                  globalSelectedRegion !== userCountryCode
                    ?"#F5D77A"
                    : "#8E8E93",
                letterSpacing: 1,
              }}
              className="font-bebas" >
              Select Region
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <View className=" w-[96%] py-1 roun ded-full mt-2  text-center bg- blue-400 flex-row items-center justify-start">
               <Text
                style={{fontSize:width/30}}
                className="text-gray-100  font-bold  mb- 1">
                    {/* {' '} Region  {"  "} */}
                   
              </Text>
              <Text
                style={{fontSize:width/20}}
                className="text-gray-100  font-bold  mb-1">
                    {countries.find( c => c.code == globalSelectedRegion).flag}{"  "}
                   
              </Text>
              <Text
                    style={{fontSize:width/40}}
                    className="text-gray-300  t ext-lg  uppercase tracki ng-widest ">
                        {countries.find( c => c.code == globalSelectedRegion).name} {' '}
              </Text>
              <View className ="ml-auto mr-2"  >
              <CarouselIndicator
                      title="Stages"
                      count={regionStages.length}
                      scrollX={mainScrollX}
                      width={width * 1}
                      // position={{
                      //   bottom: 0,
                      //   right: 0,
                      // }}
                      absolute = {false}
                      size = {width/34}
                    />
              </View>
             
      </View>

      <View
        style={{
          height: 0.50 * height,
          width,
        }}
        className="flex- 1 w-full flex-row justify-center items-center bg-[#392a0e]/30" >
        {loadingStages ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator
              size="small"
              color="#D4AF37"
            />
            <Text
              className="text-white mt-3 font-semibold"
              style={{
                fontSize: width / 38,
              }}
            >
              Loading stages...
            </Text>
          </View>
        ) : showCarousel && regionStages?.length > 0  ? (
          <>
           
            <Animated.FlatList
              // key={`${globalSelectedRegion}-${initialStageIndex}`}
              horizontal
              data={regionStages || []}
              initialScrollIndex={initialStageIndex}
              renderItem={renderMainItem}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              snapToInterval={MAIN_SNAP_INTERVAL}
              extraData={loadingStages}
              // snapToAlignment="start"
              // disableIntervalMomentum={true}
              decelerationRate="fast"
              bounces={false}
              // overScrollMode="never"
              contentContainerStyle={{
                paddingHorizontal:
                  SIDE_SPACING - MAIN_ITEM_MARGIN,
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: mainScrollX,
                      },
                    },
                  },
                ],
                {
                  useNativeDriver: true,
                }
              )}
              scrollEventThrottle={16}
              onMomentumScrollEnd={handleScrollEnd}
              getItemLayout={getItemLayout}
              removeClippedSubviews={true}
              initialNumToRender={2}
              maxToRenderPerBatch={2}
              windowSize={3}
            />
          </>

        ) : null}
      </View>      
  
      <View className=" w-[95%] justify-start py- 2">
              <StageHero title={globalSelectedStageName} 
                  image={stageImages[globalSelectedStageName]}
                  region={countries.find( c => c.code == globalSelectedRegion).name}
                  flag = {countries.find( c => c.code == globalSelectedRegion).flag}
                  description={stageDescriptions[globalSelectedStageName]}/>
              {/* <CarouselIndicator
                  title="Stages"
                  count={regionStages.length}
                  scrollX={mainScrollX}
                  width={width * 1}
                  position={{
                    top : 0,
                    right: 0,
                  }}
                /> */}
      </View>
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