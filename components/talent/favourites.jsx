
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Dimensions } from "react-native";
import StageDisplayer from "../talent/stageDisplayer";
import { useGlobalContext } from "../../context/GlobalProvider";
import StageIndicator from "../custom/stageIndicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const { width , height } = Dimensions.get("window");



/* ---------------- SELECTOR CONFIG ---------------- */

const ICON_SIZE = 70;
const ICON_MARGIN = 18;

const ITEM_WIDTH = ICON_SIZE + ICON_MARGIN * 2;
const SNAP_INTERVAL = ITEM_WIDTH;

/* ---------------- MAIN CAROUSEL ---------------- */

const MAIN_ITEM_WIDTH = width * 0.95;
const MAIN_ITEM_MARGIN = 2;
const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
const SIDE_SPACING = (width - MAIN_ITEM_WIDTH) / 2;


export default function Favourites({ user }) {
  
  const { isLoading , setIsLoading , hotStages , setHotStages ,favouriteStages, setFavouriteStages,
          userTalents, setUserTalents, userTalentPerformances ,globalRefresh ,setGlobalRefresh, setUserTalentPerformances , notifications, topTalents
          ,setTopTalents } = useGlobalContext()

  const [selection, setSelection] = useState(null)
  const mainScrollX = useRef(new Animated.Value(0)).current;
  const mainFlatListRef = useRef(null);
  const [currentStage, setCurrentStage] = useState(0);


 


  const renderMainItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * MAIN_SNAP_INTERVAL,
      index * MAIN_SNAP_INTERVAL,
      (index + 1) * MAIN_SNAP_INTERVAL,
    ];
    const scale = mainScrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: "clamp",
    });
    const translateY = mainScrollX.interpolate({
        inputRange,
        outputRange: [30, 0, 20],
        extrapolate: "clamp",
      });
    return (
      <Animated.View
        style={{
          width: MAIN_ITEM_WIDTH,
          marginHorizontal: MAIN_ITEM_MARGIN,
          transform: [{ scale } , {translateY}],
        }}
      >
        <StageDisplayer
          userTalent={item}
          user={user}
          userProfile={user}
          activity={true}
          width={MAIN_ITEM_WIDTH}
          height={height * 0.3}
        />
      </Animated.View>
    );
  };
  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
    const safeIndex = Math.max(0, Math.min(index, (hotStages?.length || 1) - 1));
    setCurrentStage(safeIndex)
  };

  

  return (
    <View
      style ={{
        paddingBottom : height * 0.059 ,
      }}
      className="flex-1 3 mt- 4  bg-darkBg">
      <View
       className="px- 3 mt- 4  bg-darkBg">
        <Text
            style={{
              fontSize: width / 30,
              lineHeight: width / 20,
              letterSpacing: 0.3,
              fontWeight:700,
            }}
            className="fon t-bold uppercase tex t-center te xt-xl text-white tracking-widest mb- 1" >
            Favorite Stages
        </Text>
        <Text
        style={{
          fontSize: width / 32,
          lineHeight: width / 24,
          letterSpacing: 0.3,
          // fontWeight:700,
        }}
          className="text-gray-200 mt-1 font-semiMontserrat tex t-center mt- ">
            Revisit the stages you've marked as favorites.
        </Text>
      </View>

        <View
             style={{
              height: 0.34 * height,
              width,
              }}
             className="flex-1  items-start justify-center">
              {favouriteStages?.length === 0 ? (
                <View
                    style={{
                      flex: 1,
                      justifyContent:
                        "center",
                      alignItems: "center",
                      paddingHorizontal:
                        width / 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="star-outline"
                      size={width / 6}
                      color="rgba(234,179,8,0.35)"
                    />

                    <Text
                      style={{
                        color: "#FFF",
                        fontSize: width / 20,
                        fontWeight: "700",
                        marginTop:
                          height / 40,
                      }}
                    >
                      No favourites yet
                    </Text>

                    <Text
                      style={{
                        color:
                          "rgba(255,255,255,0.45)",
                        fontSize: width / 30,
                        textAlign: "center",
                        marginTop:
                          height / 80,
                      }}
                    >
                      Save stages to access
                      them quickly later.
                    </Text>
                  </View>
                ) : (
                <Animated.FlatList
                    ref={mainFlatListRef}
                    horizontal
                    data={favouriteStages}
                    extraData={globalRefresh}  
                    renderItem={renderMainItem}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={MAIN_SNAP_INTERVAL}
                    decelerationRate="fast"
                    bounces={false}
                    contentContainerStyle={{
                    // paddingHorizontal: SIDE_SPACING- MAIN_ITEM_MARGIN,
                    marginVertical: 20,
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
               )}
        </View>
        {favouriteStages?.length > 0 && (
        <StageIndicator
                title="Stages"
                count={favouriteStages.length}
                scrollX={mainScrollX}
                width={width}
                currentStage={currentStage}
                absolute = {false}
                position={{
                  top: 0,
                  right: 15,
                }}
                size={width/44}
            /> 
        )}
        {/* <View className=" px-2 w-full h-[3] bg-gold/40 mt- 4 mt-4" /> */}

   

    </View>

  );
}