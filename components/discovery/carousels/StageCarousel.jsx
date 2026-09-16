
import React, { useState, useRef } from "react";
import { View, Text, Animated,  Dimensions } from "react-native";
import { useGlobalContext } from "../../../context/GlobalProvider";
import LoadingActivity from "../../modal/loadingActivity";
import {  REGION_TITLES } from "../../../utilities/TypeData";

import { getRegionName } from "../../../helper";
import StageIndicator from "../../custom/stageIndicator";
import StageCard from "../cards/StageCard";



const { width ,height } = Dimensions.get("window");

const ICON_SIZE = 70;
const ICON_MARGIN = 18;



const MAIN_ITEM_WIDTH = width * 0.96;
const MAIN_ITEM_MARGIN = 8;
const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;



export default function StageCarousel({
            type = "local"
         }) {

  const { isLoading ,globalRefresh, userCountryCode, trendingStages , hotStages } = useGlobalContext();
  const mainScrollX = useRef(new Animated.Value(0)).current;
  const mainFlatListRef = useRef(null);
  const [currentStage, setCurrentStage] = useState(0);
  const {colorTheme , scale} = useGlobalContext()

  const stages = type === "global" ? hotStages :  
                 type === "regional" ? trendingStages :
                 type === "local" ? trendingStages : []

  const title = type == "global" ?  "Hot Stages" : type === "regional" ? " Regional Stages ": "Trending Stages"
  const subTitle = type == "global" ?  " Discover where talent is making waves right now" :
                type == "regional" ? "Stages from your region" : `Explore  stages near you and across ${getRegionName(userCountryCode)}`

  const renderMainItem = ({ item, index }) => {

    return (
      <View
        style={{
          width: MAIN_ITEM_WIDTH ,
          marginHorizontal: MAIN_ITEM_MARGIN,
          // transform: [{ scaleJob } ],
        }}
        className =""
      >
        <StageCard
          entry={item}
          width={width * 0.95}
          height={width / 1.2}
        />
      </View>
    );
  };


  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
    const safeIndex = Math.max(0, Math.min(index, (trendingStages?.length || 1) - 1));
    setCurrentStage(safeIndex)

  };


  
  if(globalRefresh || !stages?.length) return null ; 

  return (
    <View
    style={{
      width:"100%",
      alignItems:"center",
      // marginTop:16,
    }}
    className ="mt-1 mb- 4 pb -4 pt- 4 px- 4 b g-[#18191e]  rounde d-3xl">
        
        <View className="px-6 w-[100%] text-center pb- 4 bg-[black] roun ded-t-full ">
            <Text
                style={{
                    color: colorTheme,
                    fontSize: scale(14),
                    fontWeight: "800",
                    // letterSpacing: 0.6,
                    textAlign: "center",
                  }}
                  className = "text-center b g-[black] pt-4 pb- 2 rounde d-t-xl" >
                 {title}
            </Text>
            <Text 
              style={{
                marginTop:6,
                color:"rgba(255,255,255,0.9)",
                fontSize:scale(12),
                // fontWeight:"500",
                // letterSpacing:0.3,
              }}
              className=" b g-[black] pb-2 px- 6 rou nde d-t-xl font-semiMontserrat text-center  ">
              {subTitle}
            </Text>
           
        </View>


        <View
          style={{
            // height: 0.32 * height,
            width,
          }}
          className="flex-1 pb-2 pt-2 4 h-[100%] w-full items-start justify-center  bg-[#000000] /30">
                <LoadingActivity visible = {isLoading} />
                <Animated.FlatList
                    ref={mainFlatListRef}
                    horizontal
                    data={stages.slice(0,20)}
                    extraData={globalRefresh}
                    renderItem={renderMainItem}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={MAIN_SNAP_INTERVAL}
                    decelerationRate="fast"  
                    removeClippedSubviews= {true}
                    bounces={false}
                    contentContainerStyle={{
                    // paddingHorizontal: SIDE_SPACING - MAIN_ITEM_MARGIN,
                    // marginVertical: 20,
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
                    />
            </View>

            <StageIndicator
                title="Stages"
                count={trendingStages.length}
                scrollX={mainScrollX}
                width={width}
                currentStage = {currentStage}
                absolute = {false}
                position={{
                  top: 0,
                  right: 15,
                }}
                size={width/44}
            /> 

    </View>

  );
}