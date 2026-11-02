
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  useWindowDimensions,
  Platform
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import {  getRegionTalentStages, getStageByNameAndRegion, getUserTalent } from "../../apiCalls";
import FeaturedCarousel from "../discovery/carousels/FeaturedCarousel";
import ArenaCarousel from "../discovery/carousels/ArenaCarousel";
import StageCarousel from "../discovery/carousels/StageCarousel";
import DiamandSeperator from "../custom/diamandSeperator";
import HeaderApp from "../header/headerApp";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const homeState = {
  scrollY: 0,
};
export default function HomePage({
              onScroll,
              user,
              showNotifications,
              showSearch,
              showFavourite ,
              setShowNotifications,
              setShowSearch,
              setShowFavourite,
              setShowProfile,
              width,
              height,
              headerHeight,
              setMissionVisible}) {

  const {  setUserTalents ,hotStages ,  setHotStages ,globalSelectedRegion, isLoading , userArenas, localArenas , 
    regionStages,setRegionStages, hotStageScrolledIndex  , globalRefresh , setGlobalRefresh , spacing , scale
  } = useGlobalContext();
  const insets = useSafeAreaInsets();

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
  // const{width , height} = useWindowDimensions()


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



  return (
    
    <View
    style ={{
      paddingBottom : spacing(32),
      paddingTop:Platform.OS == "ios" ? insets.top : insets.top
    }}
    className="flex-1 w-[100%] bg-black  12 [#161515] gap-1">

          <View
            className="w-full bg-black justify-center items-center mb- 4 " >
            <HeaderApp
              user={user && user || null}
              showNotifications = {showNotifications}
              showSearch = {showSearch}
              showFavourite = {showFavourite}
              setShowNotifications={setShowNotifications}
              setShowSearch={setShowSearch}
              setShowFavourite={setShowFavourite}
              setShowProfile={setShowProfile}
              width={width}
              height = {height}
              headerHeight={headerHeight}
              setMissionVisible ={setMissionVisible}
            />
       
          </View>
        
      <FlatList
            ref={flatListRef}
            onScroll={onScroll}
            scrollEventThrottle={16}
            initialNumToRender={10}
            windowSize={10}
            data={sections}
            extraData={globalRefresh} 
            renderItem={({ item }) => 
              {switch (item.id) {
                case  "spotlightPerformancesL" :
                  return (
                     <>
                        {/* <DiamandSeperator /> */}
                        <FeaturedCarousel  type = "local"  />
                     </>
                  )
                case  "spotlightPerformancesR" :
                   return (
                     <>
                        <FeaturedCarousel type = "regional"  />
                     </>
                   )
                case  "spotlightPerformancesG" :
                   return (
                     <>
                        <FeaturedCarousel type = "global" />
                     </>
                   )
                case "trendingStage":
                    return (
                     <>
                        <StageCarousel type = "local"   />
                     </>
                    )
                  break;
                case "hotStage":
                  return (
                     <>
                      <StageCarousel type = "global"  />
                     </>
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
              paddingBottom: 20,
              paddingTop: scale(20),

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