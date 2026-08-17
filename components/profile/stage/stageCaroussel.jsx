import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { AnimatePresence, MotiView } from "moti";
import StageDisplayer from "../../talent/stageDisplayer";
import StageDiscoveryFooter from "../../footers/stageDiscoveryFooter";

function PerformanceDescription({stageData , user , width}) {
    const contestant = stageData.contestants?.find(
      c => c.user_id === user._id
    );
    
    return (
      <>
        {contestant && (
          <Text 
          numberOfLines={3}
          style={{
            fontSize :width /28,
            color:"#fff",
            lineHeight:24
          }}
          className="text-zinc-300 text-start te xt-sm lead ing-6">
            You're currently{" "}
            <Text className="text-[#eab308] font-bold">
              {contestant.rank <= 4
                ? `Top ${contestant.rank}`
                : `Ranked #${contestant.rank}`}
            </Text>
            {" "}on this stage with{" "}
            <Text className="text-[#eab308] font-bold">
              {contestant.votes} votes .{"\n"}
            </Text>
              Perform. Earn votes. Rise higher. ✨
            </Text>
        )}
    
        {stageData.queue?.find(
          c => c.user_id === user._id
        ) && (
          <Text 
          style={{
            fontSize :width /28,
            color:"#fff",
            lineHeight:24
          }}
          className="text-zinc-300 text-sm leading-6">
            Your performance is currently in the{" "}
            <Text className="text-[#eab308] font-semibold">
              queue
            </Text>
            . You'll be notified as soon as you secure a place on stage.
          </Text>
        )}
    
        {stageData.eliminations?.find(
          c => c.user_id === user._id
        ) && (
          <Text 
          style={{
            fontSize :width /30,
            color:"#fff",
            lineHeight:24
          }}
          className="text-zinc-300 text-sm leading-6">
            You've been eliminated from this stage . Your journey isn't over. Rejoin with a stronger performance
          </Text>
        )}
      </>
    );
  }

export default function StageCaroussel({
    onPress,
}) {
    const { userTalents, user} = useGlobalContext()
    const { width ,height } = useWindowDimensions();
    const CARD_WIDTH = width * 0.95;
    const SPACING = 14;
    const SIDE_PADDING = (width - CARD_WIDTH) / 2;
    const ITEM_SIZE = CARD_WIDTH + SPACING;
    const flatListRef = useRef()
   

    const [showSwipeHint, setShowSwipeHint] = useState(false);
    useEffect(() => {
        if (!showSwipeHint) return;
        const timer = setTimeout(() => {
        setShowSwipeHint(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [showSwipeHint]);
  
    // const initialIndex =  arenas.findIndex( arena => arena._id === selectedArena?._id) || 0;

    const renderMainItem = ({ item }) => {
        return (
          <View
            style={{
              width: CARD_WIDTH,
            //   alignSelf: "center",
              marginBottom: 16,
            }}
            className ="justify-center items-center"
          >
            <StageDisplayer
              userTalent={item}
              user={user}
              userProfile={user}
              activity={true}
              width={CARD_WIDTH}
              height={height * 0.35}
            />
           <View className="w-full px-2 3 bg-[#000000]  items-ce nter py-2 mt-4 ">
                   <PerformanceDescription  user={user} width={width}/>
           </View>
        
          </View>
        );
      };
   

    return (
        <>
        {!userTalents.length ? (
          <View
          className= "justify-center items-center w-[95%] self-center p-8 rounded-xl border-2 border-[#d79f08]/30 flex-1 mt-6">
             <StageDiscoveryFooter onPress = {onPress} height ={height/1.2} width={width/1.2}/>
          </View>
        ) : (
            <FlatList
            ref={flatListRef}
            horizontal
            data={userTalents}
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
                paddingTop: 24,
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
            />
        )}
       
         <AnimatePresence>
                {showSwipeHint && (
                    <MotiView
                        from={{
                            opacity: 0,
                            translateY: 8,
                        }}
                        animate={{
                            opacity: 1,
                            translateY: 0,
                        }}
                        exit={{
                            opacity: 0,
                            translateY: -8,
                        }}
                        transition={{
                            type: "timing",
                            duration: 350,
                        }}
                        style={{
                            alignSelf: "center",
                            marginTop: 12,
                            backgroundColor: "rgba(17,18,20,.92)",
                            borderRadius: 22,
                            borderWidth: 1,
                            borderColor: "rgba(234,179,8,.18)",
                            paddingHorizontal: 18,
                            height: 38,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gesture-swipe-horizontal"
                            size={18}
                            color="#eab308"
                        />
                        <Text
                            style={{
                                marginLeft: 8,
                                color: "#fff",
                                fontSize: 13,
                                fontWeight: "600",
                                letterSpacing: .2,
                            }}
                        >
                            Swipe to explore more stages
                        </Text>
                    </MotiView>
                )}
            </AnimatePresence>
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