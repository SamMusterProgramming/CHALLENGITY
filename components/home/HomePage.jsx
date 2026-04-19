
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
 
  FlatList
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { generateChallengeTalentGuinessData, getRegionTalentStages, getStageByNameAndRegion, getUserTalent } from "../../apiCalls";
import StageSelector from "../custom/StageSelector";
import HotStage from "../talent/hotStages";
import { useFocusEffect } from "expo-router";

export const homeState = {
  scrollY: 0,
};

export default function HomePage() {

  const { user , setUserTalents ,hotStages ,  setHotStages ,globalSelectedRegion, isLoading ,regionStages,setRegionStages, hotStageScrolledIndex  , globalRefresh , setGlobalRefresh} = useGlobalContext();
  const sections = [
    { id: "stageSelector" },
    { id: "hotStage" }
    
  ];
  const flatListRef = useRef(null);
  const [isHotStageReady, setIsHotStageReady] = useState(false);
  const scrollY = useRef(homeState.scrollY || 0);

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
      const timeout = setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: homeState.scrollY || 0,
          animated: false,
        });
      }, 80); 
      return () =>  {
                setIsFocused(false);
                clearTimeout(timeout);}
    }, [])
  );
  
  const handleScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.y;
    scrollY.current = offset;
    homeState.scrollY = offset; // persist
  };


  if (!isFocused) { return null; }


  return (


    <View
    className="flex-1 w-[100%] bg-black">
      <FlatList
            ref={flatListRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          
            // 🔥 helps stability when restoring
            initialNumToRender={10}
            windowSize={10}
            data={sections}
            extraData={globalRefresh} 
            renderItem={({ item }) =>
              item.id === "hotStage" ? (
                <HotStage user={user} onReady={() => setIsHotStageReady(true)}  />
              ) :  (
                <StageSelector user={user} />
              ) 
            }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}  
            contentContainerStyle={{
              backgroundColor: "black",  
              paddingBottom: 40,
            }}
            keyboardShouldPersistTaps="handled"
            
          />
    </View>
  );

}