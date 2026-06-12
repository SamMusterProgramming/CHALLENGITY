
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { generateChallengeTalentGuinessData, getRegionTalentStages, getStageByNameAndRegion, getUserTalent } from "../../apiCalls";
import StageSelector from "../custom/StageSelector";
import HotStage from "../talent/hotStages";
import { useFocusEffect } from "expo-router";
import StageSelectorFooter from "../custom/stageSelectorFooter";
import RegionalStages from "../talent/regionalStages";
import StageCard from "../talent/stageCard";

export const homeState = {
  scrollY: 0,
};

export default function StageHomePage({onScroll}) {
  const { user , setUserTalents ,hotStages ,  setHotStages ,globalSelectedRegion, isLoading ,regionStages,setRegionStages, hotStageScrolledIndex  , globalRefresh , setGlobalRefresh} = useGlobalContext();
  const sections = [
    { id: "stageSelector" },
    // { id: "hotStage" }
  ];
  const flatListRef = useRef(null);
  const [isHotStageReady, setIsHotStageReady] = useState(false);
  const [loadingStages, setLoadingStages] = useState(false);

  const { width, height } = Dimensions.get("window");

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


//   useEffect(() => {
//           if(!globalRefresh) return ; 
//           if(regionStages?.length < 1) return ;
//           setHotStages((prev) => {
//             const updatesMap = new Map(
//               regionStages.map((s) => [s._id, s])
//             );
//             return prev.map((stage) =>
//               updatesMap.has(stage._id)
//                 ? { ...stage, ...updatesMap.get(stage._id) }
//                 : stage
//             );
//           });
//   }, [regionStages])

useEffect(() => {
    if(!globalSelectedRegion || (globalSelectedRegion === regionStages[0]?.region)) return 
      const getStages = async () => {
        setLoadingStages(true)
      await getRegionTalentStages(globalSelectedRegion, setRegionStages)
      setTimeout(() => {
        setLoadingStages(false)
      }, 20);
    }
    getStages()
  }, [globalSelectedRegion , globalRefresh]);

  
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
                clearTimeout(timeout);
              }
    }, [])
  );

  const renderItem = ({ item }) => (
    <StageCard
      stage = {item}
      width={width}
      height={width/3.03}
      region = {globalSelectedRegion}
      user = {user}
    />
  );
  
  const handleScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.y;
    scrollY.current = offset;
    homeState.scrollY = offset; 
  };

  if (!isFocused) { return null; }


  return (
    
    <View
    style ={{
        marginBottom : height * 0.073 ,
    }}
    className="flex-1 px-2 mb-12 w-[100%] bg-black">
        <View className="px- 2 w-full mt-4 mb-4 item s-center pb- 2 bg-dark Bg">
            
            <Text 
            style={{
              fontSize: width / 30,
              lineHeight: width / 20,
              letterSpacing: 0.3,
              fontWeight:700,
            }}
            className="fon t-bold tex t-lg tex t-center text-white tracki ng-wide mb- 1">
              EXPLORE STAGES {' '}
            </Text>
          
        </View>
    
        <FlatList
            initialNumToRender={2}
            data={regionStages}
            extraData={loadingStages}
            renderItem={!loadingStages ? renderItem : ()=>{
            return (
                <View 
                style={{
                    height: width / 3.3,
                    width :width * 0.49,
                }}
                className=" mb- 4 flex-1 justify-center items-center">
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
            )
            }}
            keyExtractor={(item, index) =>
                item._id || index.toString()
            }
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
                justifyContent: "center",
                gap: 8
                
            }}
            contentContainerStyle={{
                gap: 4
            }}
            // onScroll={onScroll}
            
            />
          
          <StageSelectorFooter />
    </View>
  );

}