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
import { countries } from "../../../utilities/TypeData";
import StarArenaButton from "../custom/starArenaButton";
import FollowArenaButton from "../custom/followArenaButton";
import { AnimatePresence, MotiView } from "moti";

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
    const CARD_WIDTH = width * 1;
    const SPACING = 14;
    const SIDE_PADDING = (width - CARD_WIDTH) / 2;
    const ITEM_SIZE = CARD_WIDTH + SPACING;
    const flatListRef = useRef()
    const arenas = [
        ...userArenas
    ];


    return (
        <>
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
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onPressArena(item)}
                    style={{
                        width:CARD_WIDTH ,
                        height:300,
                        borderRadius:12,
                        overflow:"hidden",
                        // backgroundColor: selectedArena._id == item._id ? "#000" : "gold",
                        // borderWidth:selectedArena._id == item._id ? 0 : 2,
                        // borderTopColor:selectedArena._id == item._id ? "transparent" : "rgba(234,179,8,.15)",
                        padding: selectedArena._id == item._id ? 1 : 1
                    }} 
                    className ="justify-center  items-center"
                     >
                    {/* Cover */}
                    <Image
                        source={{uri:item.coverImage.publicUrl}}
                        style={{
                            width:"95%",
                            height:"100%",
                            position:"absolute",
                            // borderRadius:12,
                        }}
                        resizeMode="cover"
                        className ="rounded-lg"
                    />
                   {/* {active && ( */}
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,.45)",
                            "rgba(0,0,0,.65)",
                            "rgba(0,0,0,.85)",
                            "#000",
                        ]}
                        style={{
                            position:"absolute",
                            left:0,
                            width: "100%",
                            bottom:0,
                            height:"80%",
                        }}
                    />
                    {/* )} */}
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,.75)",
                            "rgba(0,0,0,.75)",
                            "transparent",
                        ]}
                        style={{
                            position:"absolute",
                            left:0,
                            right:width/4,
                            bottom:110,
                            height:"50%",
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 30,
                        
                            overflow: "hidden",
                        }}
                    />

                    {/* Header */}

                    <View
                        style={{
                            position:"absolute",
                            left:10,
                            right:10,
                            bottom:16,
                        }}
                       
                    >
                        <View
                            style={{
                                flexDirection:"row",
                                alignItems:"center",
                            }}
                            className = "px-4"
                        >
                            <Image
                                source={{uri:item.profileImage.publicUrl}}
                                style={{
                                    width:width/6,
                                    height:width/6,
                                    borderRadius:50,

                                    borderWidth:2,
                                    borderColor:"#eab308",
                                }}
                            />
                            <View
                                style={{
                                    flex:1,
                                    marginLeft:12,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection:"row",
                                        alignItems:"center",
                                    }}
                                >
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            color:"#FFF",
                                            fontWeight:"700",
                                            fontSize:width/25,
                                            flex:1,
                                        }}
                                    >
                                        {item.arenaName}
                                    </Text>
                                    {item.verified && (

                                        <MaterialCommunityIcons
                                            name="check-decagram"
                                            size={18}
                                            color="#eab308"
                                        />

                                    )}

                                </View>
                                <Text
                                    style={{
                                        color:"#eab308",
                                        fontSize:width/32,
                                        marginTop:4,
                                        fontWeight:"700",
                                    }}
                                >
                                    {item.talentType} • {item.region}
                                </Text>
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        color:"rgba(255,255,255,.82)",
                                        marginTop:4,
                                        fontWeight : "700",
                                        fontSize : width/35,
                                        lineHeight:18,
                                    }} >
                                    {item.biography}
                                </Text>
                            </View>
                        </View>

                        

                        <Text 
                            numberOfLines={2}
                            style ={{
                                paddingTop :18,
                                paddingBottom :18,
                                // marginLeft : 18,
                                fontWeight : "600",
                                fontSize : width/32,
                                lineHeight : 18 ,
                                width : width * 0.75
                            }}
                        className="text-white ml-6 text-xs tracking-wide">
                        {item.description} 
                        </Text> 
                        {/* Stats */}
                        <View
                            style={{
                                flexDirection:"row",
                                marginTop:0,
                                justifyContent:"space-between",
                            }}
                            className = "px-4"
                        >
                            <Stat
                                icon="star"
                                value={item.starCount}
                                width={width}
                            />
                            <Stat
                                icon="play-box-multiple-outline"
                                value={item.postCount}
                                width={width}

                            />
                            <Stat
                                icon="account-group-outline"
                                value={item.followerCount}
                                width={width}

                            />
                             {/* <Stat
                                icon=""
                                value={""}
                                width={width}

                            /> */}
                        </View>
                        {item.posts.length >= 5 && (
                              <View
                              className ="flex-row w-full justify-start items-center gap-2">
                                    <FollowArenaButton width={width} onPress = {toggleFollower} isFollowed={item.isFollower} />
                              </View>
                        )}
                    
                    </View>

                    <View
                        className = "absolute top-4 right-8" >
                              <StarArenaButton
                                    width={CARD_WIDTH}
                                    isStarred={item.isStarred}
                                    onPress={toggleStar}
                                    />
                    </View>

                    {/* <View
                                style={{
                                // flex:1,
                                position:"absolute",
                                right:10,
                                bottom:86,
                                }}
                                >
                                    <StarArenaButton
                                    width={CARD_WIDTH}
                                    isStarred={item.isStarred}
                                    onPress={toggleStar}
                                    />
                    </View> */}

                </TouchableOpacity>
            )
        }}
        />
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
                            marginBottom: 12,
                            marginTop :-12,
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
                            Swipe to explore more arenas
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