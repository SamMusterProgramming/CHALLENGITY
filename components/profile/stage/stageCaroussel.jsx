import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { AnimatePresence, MotiView } from "moti";
import StageDisplayer from "../../talent/stageDisplayer";
import StageDiscoveryFooter from "../../footers/stageDiscoveryFooter";
import StageJourneyCard from "../../myJourney/StageJourneyCard";
import { extractStageEntries } from "../../../helper";
import { router } from "expo-router";


export default function StageCaroussel({
    onPress, stages , user
}) {
    // const { user} = useGlobalContext()
    const { width ,height } = useWindowDimensions();
    const CARD_WIDTH = width * 0.95;
    const SPACING = 14;
    const SIDE_PADDING = (width - CARD_WIDTH) / 2;
    const ITEM_SIZE = CARD_WIDTH + SPACING;
    const flatListRef = useRef()
    const [showSwipeHint, setShowSwipeHint] = useState(false);
    const [selectedStage, setSelectedStage] = useState(stages[0])

    const currentStageIndex = stages.findIndex(
        (stage) => stage._id === selectedStage?._id
      );
    const hasMoreArenas = stages.length > 1;

 

    useEffect(() => {
        if (!showSwipeHint) return;
        const timer = setTimeout(() => {
        setShowSwipeHint(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [showSwipeHint]);

    const content = useMemo(() => {
      const stgs = extractStageEntries(
        stages || [],
        user?._id
      ).map((stage) => ({
        ...stage,
        src: "stage",
      }));
      return [...stgs].sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    }, [user?._id]);

    const openStage = (entry) =>{

      router.push({
        pathname: "TalentContestRoom",
        params: {
          region: entry.stage.region,
          selectedTalent: entry.stage.name,
          // selectedIcon: getIcon(userTalent.name),
          // regionIcon: getIcon(userTalent.region),
          startIntroduction: "true",
          showGo: "true",
          location: "contest",
          contestant_id: user?._id ?? null,
          startPlayer : "true"
        },
      })
    }
  
    // const initialIndex =  arenas.findIndex( arena => arena._id === selectedArena?._id) || 0;

    const renderMainItem = ({ item }) => {
        return (
          <View
            style={{
              width: CARD_WIDTH,
            //   alignSelf: "center",
              // marginBottom: 16,
            }}
            className ="justify-center items-center"
          >
             <StageJourneyCard
                entry={item}
                width={width * 0.95}
                height= {(width / 6.9) * 5.9}
                />
        
          </View>
        );
      };
   

    return (
        <>
        {!stages.length ? (
         <View
         style ={{
             marginTop : 14,
             height : width,
             width
         }}
         className = "px-4"
         >
             <StageDiscoveryFooter onPress = {onPress} height ={height} width={width}/>
          </View>
          ) : (
            <FlatList
            ref={flatListRef}
            horizontal
            data={ content}
            keyExtractor={(item) => item._id}
            // extraData={selectedArena}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + SPACING }
            snapToAlignment="start"
            decelerationRate="fast"
            disableIntervalMomentum={false}
            // initialScrollIndex={initialIndex || 0}
            contentContainerStyle={{
                paddingHorizontal: SIDE_PADDING,
                paddingTop: 14,
            }}
            ItemSeparatorComponent={() => (
                <View style={{ width: SPACING }} />
            )}
            getItemLayout={(_, index) => ({
                length: ITEM_SIZE,
                offset: ITEM_SIZE * index,
                index,
              })}
            renderItem={renderMainItem}
            onMomentumScrollEnd={(e) => {
                const offsetX = e.nativeEvent.contentOffset.x;
                const index = Math.round(
                    offsetX / (CARD_WIDTH + SPACING)
                );
                setSelectedStage(stages[index]);
            }}
            />
        )}
       
       {content.length > 0 && (
        <View
            style={{
            width: "100%",
            paddingHorizontal: SIDE_PADDING,
            // marginTop: 18,
            marginBottom: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            }} className = "mt-6"  >
            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
            }}
            >
            <MaterialCommunityIcons
                name="trophy-outline"
                size={16}
                color="#EAB308"
            />

            <Text
                style={{
                marginLeft: 5,
                fontSize: width / 32,
                fontWeight: "800",
                letterSpacing: 0.8,
                color: "rgba(255,255,255,0.55)",
                }}
            >
                STAGES
            </Text>

            {hasMoreArenas && currentStageIndex === 0 && (
                <View
                style={{
                    marginLeft: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}
                >
                <Ionicons
                    name="swap-horizontal-outline"
                    size={14}
                    color="rgba(255,255,255,0.35)"
                />

                <Text
                    style={{
                    marginLeft: 3,
                    fontSize: 12,
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.3)",
                    }}
                >
                    SWIPE
                </Text>
                </View>
            )}
            </View>

            {/* RIGHT — DOTS */}
            {hasMoreArenas && (
            <View
                style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                }}  >
                {stages.map((arena, index) => {
                const active = index === currentStageIndex;

                return (
                    <TouchableOpacity
                    key={arena._id}
                    activeOpacity={0.8}
                    onPress={() => {
                        flatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        });
                    
                        setSelectedStage(arena);
                    }}
                    style={{
                        marginLeft: index === 0 ? 0 : 5,
                        width: active ? 18 : 18,
                        height: 8,
                        borderRadius: 10,
                        backgroundColor: active
                        ? "#EAB308"
                        : "rgba(255,255,255,0.18)",
                    }}
                    />
                );
                })}
            </View>
            )}
        </View>
        )}


        </>
    );
}

function Stat({icon,value,width}){
    return(
        <View
            style={{
                flexDirection:"row",
                alignItems:"center",
            }}
        >
            <MaterialCommunityIcons
                name={icon}
                size={width/26}
                color="#eab308"
            />
            <Text
                style={{
                    color:"#FFF",
                    marginLeft:4,
                    fontWeight:"600",
                    fontSize:width/34,
                }}
            >
                {value}
            </Text>
        </View>
    )
}