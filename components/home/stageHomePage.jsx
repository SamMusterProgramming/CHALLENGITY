
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { generateChallengeTalentGuinessData, getLocalArenas, getRegionTalentStages, getStageByNameAndRegion, getUserTalent } from "../../apiCalls";
import StageSelector from "../custom/StageSelector";
import HotStage from "../talent/hotStages";
import { router, useFocusEffect } from "expo-router";
import StageSelectorFooter from "../custom/stageSelectorFooter";
import RegionalStages from "../talent/regionalStages";

import ArenaJourneyCard from "../myJourney/ArenaJourneyCard";
import StageCard from "../stage/StageCard";

export const homeState = {
  scrollY: 0,
};

export default function StageHomePage({onScroll}) {
  const { user , setUserTalents ,hotStages ,  setHotStages ,globalSelectedRegion, isLoading ,regionStages,setRegionStages,
          localArenas, hotStageScrolledIndex  , globalRefresh , setGlobalRefresh} = useGlobalContext();
  const sections = [
    { id: "stageSelector" },
    // { id: "hotStage" }
  ];
  const flatListRef = useRef(null);
  const [loadingStages, setLoadingStages] = useState(false);
  const {colorTheme} = useGlobalContext()
  const { width, height } = Dimensions.get("window");
  const [selectedTab, setSelectedTab] = useState("stages");
  const scrollY = useRef(homeState.scrollY || 0);
  const [arenas, setArenas] = useState([]);


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
    if(!globalSelectedRegion || ((globalSelectedRegion === regionStages[0]?.region)&& selectedTab === "stages") || 
    ((globalSelectedRegion === arenas[0]?.region)&& selectedTab === "arenas")) return 
    const loadData = async () => {
      try {
        setLoadingStages(true);
  
        await Promise.all([
          getRegionTalentStages(
            globalSelectedRegion,
            setRegionStages
          ),
          getLocalArenas(
            globalSelectedRegion,
            { userId: user._id },
            setArenas
          ),
        ]);
      } catch (error) {
        console.error("Error loading explore data:", error);
      } finally {
        setLoadingStages(false);
      }
    };
    loadData();
  }, [globalSelectedRegion , globalRefresh , selectedTab ]);


  const openArena = (entry) =>{
    router.push({
      pathname:
        "/arenaDisplayer",
      params: {
        arena_id:
          entry._id,
      },
    });
  }


  
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

  const renderItem = ({ item }) => {
    if (selectedTab === "stages") {
      return (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {/* <StageDisplayer
            userTalent={item}
            user={user}
            userProfile={user}
            activity={true}
            width={width * 0.95}
            height={height * 0.30}
          /> */}
            <StageCard
              entry={item}
              width={width * 0.95}
              height={width / 2}
              // onPress={openStage}
            />
        </View>
      );
    }
  
    return (
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 20,
          // height:height * 0.30

        }}
      >
        {/* <ArenaCard
          arena={item}
          width={width * 0.95}
          height={height * 0.30}
        /> */}
            <ArenaJourneyCard
                entry={item}
                width={width * 0.95}
                height={width / 2.36}
                onPress={openArena}
                />
      </View>
    );
  };
  
  if (!isFocused) { return null; }

  return (
    
    <View
    style ={{
        // marginBottom : height * 0.073 ,
       
    }}
    className="flex-1 px- mb -8 w-[100%] justify-center items-center bg-black">
   
        <View
          style={{
            width: "100%",
            // zIndex: 1000,
            // elevation: 1000,
          }}
          className = "justify-center items-center"
        >
          <StageSelectorFooter
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            // zIndex: 1,
            elevation: 1,
          }}
          className="flex-1 h- [100%] w-full items-center justify-center">
             {loadingStages ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}  >
                  <ActivityIndicator
                    size="small"
                    color="#EAB308"
                  />

                  <Text
                    style={{
                      marginTop: 12,
                      color: "rgba(255,255,255,0.65)",
                      fontSize: width / 34,
                    }}
                  >
                    Loading {selectedTab === "stages" ? "stages" : "arenas"}...
                  </Text>
                </View>
              ) : (
                <>
                 {!regionStages.length || (!arenas.length && selectedTab == "arenas")?
                  (
                    <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}  >
              
                    <Text
                      style={{
                        marginTop: 12,
                        color: "rgba(255,255,255,0.65)",
                        fontSize: width / 30,
                      }}
                    >
                      No Arena Found
                    </Text>
                  </View>
                  )
                 :(
                    <FlatList
                    ref={flatListRef}
                    data={selectedTab === "stages" ? regionStages : arenas}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    // onScroll={onScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                      paddingTop: 8,
                      paddingBottom: height * 0.055,
                    }}
                  />
                 )
                 }
                   
                </>
              )}
        </View>
       
    </View>
  );

}