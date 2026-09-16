
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  useWindowDimensions
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import {  getRegionTalentStages, getStageByNameAndRegion, getUserTalent } from "../../apiCalls";
import FeaturedCarousel from "../discovery/carousels/FeaturedCarousel";
import ArenaCarousel from "../discovery/carousels/ArenaCarousel";
import StageCarousel from "../discovery/carousels/StageCarousel";
export const homeState = {
  scrollY: 0,
};
export default function HomePage({onScroll}) {
  const { user , setUserTalents ,hotStages ,  setHotStages ,globalSelectedRegion, isLoading , userArenas, localArenas , 
    regionStages,setRegionStages, hotStageScrolledIndex  , globalRefresh , setGlobalRefresh
  } = useGlobalContext();
  const sections = [
    {id:"spotlightPerformancesL"},
    {id:"spotlightPerformancesR"},
    {id:"spotlightPerformancesG"},
    { id: "trendingStage" },
    { id: "hotStage" },
    {id: "localArenas"},
    {id: "regionalArenas"}
  ];
  const flatListRef = useRef(null);
  const [isHotStageReady, setIsHotStageReady] = useState(false);
  const scrollY = useRef(homeState.scrollY || 0);
  const{width , height} = useWindowDimensions()


  useEffect(() => {
    if (!globalRefresh) return;
    const fetchData = async () => {
      try {
        await Promise.all([
          getRegionTalentStages(globalSelectedRegion,setRegionStages),
          getUserTalent(user._id , setUserTalents),
        ]);
        const updatedStae = hotStages[hotStageScrolledIndex]
        const stage = await getStageByNameAndRegion({
          name:updatedStae.name,
          region:updatedStae.region
          })
        setHotStages((prev) => prev.map((s) =>
                              s._id === stage._id ? { ...s, ...stage } : s
                               ));
      } catch (error) {
        console.error("Error refreshing data:", error);
      } finally {
        setTimeout(() => {
          setGlobalRefresh(false);
        }, 100);
      }
    };
    fetchData();
  }, [globalRefresh])

  useEffect(() => {
          if(!globalRefresh) return ; 
          if(regionStages?.length < 1) return ;
          setHotStages((prev) => {
            const updatesMap = new Map(
              regionStages.map((s) => [s._id, s])
            );
            return prev.map((stage) =>
              updatesMap.has(stage._id)
                ? { ...stage, ...updatesMap.get(stage._id) }
                : stage
            );
          });
  }, [regionStages])

  // const [isFocused, setIsFocused] = useState(true);
  // useFocusEffect(
  //   useCallback(() => {
  //     setIsFocused(true);
    
  //     return () =>  {
  //               setIsFocused(false);
            
  //             }
  //   }, [])
  // );
  
  // const handleScroll = (e) => {

  // };

  // if (!isFocused) { return null; }

  return (
    
    <View
    style ={{
      // paddingBottom : height * 0.059 ,
    }}
    className="flex-1 w-[100%]  px- 1 bg-[#15171e] [#161515] gap-1">
      <FlatList
            ref={flatListRef}
            onScroll={onScroll}
            scrollEventThrottle={16}
          
            // 🔥 helps stability when restoring
            initialNumToRender={10}
            windowSize={10}
            data={sections}
            extraData={globalRefresh} 
            renderItem={({ item }) => 
              {switch (item.id) {
                case  "spotlightPerformancesL" :
                  return (
                    <FeaturedCarousel
                      height = {height * 0.31} 
                      type = "local"
                     />
                  )
                case  "spotlightPerformancesR" :
                   return (
                    <FeaturedCarousel
                      height = {height * 0.31} 
                      type = "regional"
                     />
                   )
                case  "spotlightPerformancesG" :
                   return (
                    <FeaturedCarousel
                        height = {height * 0.31} 
                        type = "global"
                     />
                   )
                case "trendingStage":
                    return (
                      <StageCarousel type = "local"   />
                    )
                  break;
                case "hotStage":
                  return (
                      <StageCarousel type = "global"  />
                  )
                break;
                // case "favourite":
                //   return (
                //      <Favourites user={user} />
                //   )
                // break;
                case "localArenas" : 
                  return (
                    <ArenaCarousel
                      type ="local"
                      height={height * 0.31}
                    />
                  )
                  break;
                // case "regionalArenas" : 
                //   return (
                //     <ArenaCarousel
                //       // arenas={localArenas}
                //       type ="local"
                //       height={height * 0.31}
                //     />
                //   )
                //   break;
                default:
                  break;
              }}
           
            }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}  
            contentContainerStyle={{
              // backgroundColor: "black",  
              // paddingBottom: 20,
            }}
            keyboardShouldPersistTaps="handled"
            // ListFooterComponent={()=>{
            //   return(
            //     <View
            //     className="min-h-[10%] w-full bg-black "/>
            //   )
            // }}
          />
    </View>
  );

}