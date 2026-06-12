
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  FlatList,
  useWindowDimensions
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { generateChallengeTalentGuinessData, getRegionTalentStages, getStageByNameAndRegion, getUserTalent } from "../../apiCalls";
import StageSelector from "../custom/StageSelector";
import HotStage from "../talent/hotStages";
import { useFocusEffect } from "expo-router";
import TrendingStages from "../talent/trendingStages";
import Favourites from "../talent/favourites";
export const homeState = {
  scrollY: 0,
};
export default function HomePage({onScroll}) {
  const { user , setUserTalents ,hotStages ,  setHotStages ,globalSelectedRegion, isLoading ,regionStages,setRegionStages, hotStageScrolledIndex  , globalRefresh , setGlobalRefresh} = useGlobalContext();
  const sections = [
    { id: "trendingStage" },
    { id: "hotStage" },
    { id: "favourite" }
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

  const [isFocused, setIsFocused] = useState(true);
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      // const timeout = setTimeout(() => {
      //   flatListRef.current?.scrollToOffset({
      //     offset: homeState.scrollY || 0,
      //     animated: false,
      //   });
      // }, 80); 
      return () =>  {
                setIsFocused(false);
                // clearTimeout(timeout);
              }
    }, [])
  );
  
  const handleScroll = (e) => {
    // const offset = e.nativeEvent.contentOffset.y;
    // scrollY.current = offset;
    // homeState.scrollY = offset; 
  };

  if (!isFocused) { return null; }

  return (
    
    <View
    style ={{
      // paddingBottom : height * 0.059 ,
    }}
    className="flex-1 w-[100%] mb- 4 px-2 bg-black">
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
              item.id === "trendingStage" ? (
                <TrendingStages user={user} onReady={() => setIsHotStageReady(true)}  />
              ) : item.id === "hotStage" ? (
                <HotStage user={user} />
                // <StageSelector user={user} />
              ) :(
                <Favourites user={user} />
              )
            }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}  
            contentContainerStyle={{
              backgroundColor: "black",  
              // paddingBottom: 40,
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