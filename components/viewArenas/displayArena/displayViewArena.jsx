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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { countries } from "../../../utilities/TypeData";
import StarArenaButton from "../custom/starArenaButton";
import FollowArenaButton from "../custom/followArenaButton";
import { AnimatePresence, MotiView } from "moti";
import ArenaJourneyCard from "../../myJourney/ArenaJourneyCard";
import NoArena from "../../profile/arena/NoArena";

export default function DisplayViewArena({
                                            userArenas,
                                            onPressArena,
                                            selectedArena,
                                            setSelectedArena,
                                            toggleStar,
                                            toggleFollower
                                        }) {
    const {setArenaActionModal,
          openArenaAlertModal, 
          setOpenArenaAlertModal} = useGlobalContext()
          
    const [showSwipeHint, setShowSwipeHint] = useState(userArenas.length > 1);

    useEffect(() => {
        if (!showSwipeHint) return;
        const timer = setTimeout(() => {
        setShowSwipeHint(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [showSwipeHint]);

    const { width } = useWindowDimensions();
    const CARD_WIDTH = width * 0.95 ;
    const SPACING = 14;
    const SIDE_PADDING = (width - CARD_WIDTH) / 2;
    const ITEM_SIZE = CARD_WIDTH + SPACING;
    const flatListRef = useRef()
    const arenas = [
        ...userArenas
    ];

    const currentArenaIndex = arenas.findIndex(
        (arena) => arena._id === selectedArena?._id
      );
      
    const hasMoreArenas = arenas.length > 1;


    return (
        <>
         {!arenas.length ? (
        <View
        style ={{
            marginTop : 14,
            height : width,
            width
        }}
        className = "px-4">
             <NoArena />
        </View>
        ) : (
        <FlatList
        ref={flatListRef}
        horizontal
        data={userArenas}
        keyExtractor={(item) => item._id}
        extraData={selectedArena}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING }
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum={false}
        initialScrollIndex={userArenas.findIndex(a => a._id === selectedArena._id)||0}
        contentContainerStyle={{
            paddingHorizontal: SIDE_PADDING,
                        // paddingRight:
            //     width -
            //     CARD_WIDTH -
            //     SIDE_PADDING,
            paddingTop: 12,
        }}
        ItemSeparatorComponent={() => (
            <View style={{ width: SPACING }} />
        )}
        onMomentumScrollEnd={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            const index = Math.round(
                offsetX / (CARD_WIDTH + SPACING)
            );
            setSelectedArena(arenas[index]);
        }}
        getItemLayout={(_, index) => ({
            length: ITEM_SIZE,
            offset: ITEM_SIZE * index,
            index,
          })}
        renderItem={({item})=>{
             return (
                <View
                    style={{
                    // width: "100%",
                    alignItems: "center",
                    // marginBottom: 24,
                    // padding: selectedArena._id == item._id ? 1 : 1
                    }} className ="justify-center" >
                    <ArenaJourneyCard
                        entry={item}
                        width={CARD_WIDTH}
                        height= {(width / 6.9) * 5.9}
                        />
                </View>
            )
        }}
        />
       )}


{arenas.length > 0 && (
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
                name="stadium-outline"
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
                ARENAS
            </Text>

            {hasMoreArenas && currentArenaIndex === 0 && (
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
                }}
            >
                {arenas.map((arena, index) => {
                const active = index === currentArenaIndex;

                return (
                    <TouchableOpacity
                    key={arena._id}
                    activeOpacity={0.8}
                    onPress={() => {
                        flatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        });

                        setSelectedArena(arena);
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
                size={width/18}
                color="#eab308"
            />
            <Text
                style={{
                    color:"#FFF",
                    marginLeft:4,
                    fontWeight:"600",
                    fontSize:width/28,
                }}
            >
                {value}
            </Text>
        </View>
    )
}