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
import WelcomeToCreateArena from "./WelcomeToCreateArena";

export default function ArenaDisplayer({
    userArenas,
    onPressArena,
    selectedArena,
    setSelectedArena,
    setOpenEditArenaModal,
}) {
    const {setArenaActionModal,
          openArenaAlertModal, 
          setOpenArenaAlertModal} = useGlobalContext()
    const [hamburgerMenu , setHamburgerMenu] = useState(false)
    const { width } = useWindowDimensions();

    const CARD_WIDTH = width * 0.95;
    const SPACING = 14;
    const SIDE_PADDING = (width - CARD_WIDTH) / 2;
    const ITEM_SIZE = CARD_WIDTH + SPACING;
    const flatListRef = useRef()
    const arenas = [
        ...userArenas,
        {
          _id: "create-arena",
          isCreateCard: true,
        },
    ];

    const [showSwipeHint, setShowSwipeHint] = useState(userArenas.length > 1);
    useEffect(() => {
        if (!showSwipeHint) return;
    
        const timer = setTimeout(() => {
        setShowSwipeHint(false);
        }, 10000);
    
        return () => clearTimeout(timer);
    }, [showSwipeHint]);
  
    const initialIndex =  arenas.findIndex( arena => arena._id === selectedArena?._id) || 0;


    useEffect(() => {
        if (!hamburgerMenu) return;
        const timer = setTimeout(() => {
            setHamburgerMenu(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [hamburgerMenu]);

    return (
        <>
        <FlatList
        ref={flatListRef}
        horizontal
        data={arenas}
        keyExtractor={(item) => item._id}
        extraData={selectedArena}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING }
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum={false}
        initialScrollIndex={initialIndex || 0}
        contentContainerStyle={{
            paddingHorizontal: SIDE_PADDING,
                        // paddingRight:
            //     width -
            //     CARD_WIDTH -
            //     SIDE_PADDING,
            paddingTop: 24,
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
            if (showSwipeHint) {
                setShowSwipeHint(false);
            }
        }}
        getItemLayout={(_, index) => ({
            length: ITEM_SIZE,
            offset: ITEM_SIZE * index,
            index,
          })}

        renderItem={({item})=>{
            // const active = selectedArena._id == item._id
            if (item.isCreateCard == true) {
                return (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        // onPress={onCreateArena}
                        style={{
                            width: CARD_WIDTH,
                            height: 180,
                            borderRadius: 18,
                            overflow: "hidden",
                            paddingVertical :16
                      
                        }}
                    >
                        {/* Background glow */}
        
                        <LinearGradient
                            colors={[
                                "rgba(234,179,8,.46)",
                                "rgba(234,179,8,.22)",
                                "#111214",
                            ]}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                        />
        
                        {/* Decorative circles */}
        
                        <View
                            style={{
                                position: "absolute",
                                width: 220,
                                height: 220,
                                borderRadius: 110,
                                backgroundColor: "rgba(234,179,8,.04)",
                                top: -70,
                                right: -70,
                            }}
                        />
        
                        <View
                            style={{
                                position: "absolute",
                                width: 140,
                                height: 140,
                                borderRadius: 70,
                                borderWidth: 1,
                                borderColor: "rgba(234,179,8,.08)",
                                bottom: -30,
                                left: -20,
                            }}
                        />

                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,.35)",
                            "rgba(0,0,0,.55)",
                            "rgba(0,0,0,.85)",
                            "#000",
                        ]}
                        style={{
                            position:"absolute",
                            left:0,
                            width: "100%",
                            bottom:0,
                            height:"40%",
                        }}
                    />
                    {/* )} */}
                  
        
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingHorizontal: 28,
                            }}
                        >
        
                            <Text
                                style={{
                                    color: "#FFF",
                                    fontSize: width/23,
                                    fontWeight: "700",
                                    marginTop: 12,
                                }}
                            >
                                Create Arena
                            </Text>
        
            
                            <View
                                style={{
                                width: width/5,
                                height: width/5,
                                borderRadius: 999,
                                backgroundColor:
                                    "rgba(0,0,0,0.38)",
                                justifyContent:
                                    "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor:
                                    "rgba(234,179,8,0.15)",
                                }}
                                className ="mt-auto"
                                 >
                                <MaterialCommunityIcons
                                name="star-four-points"
                                size={39}
                                color="#eab308"
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                );
             }
             else
             return (
              <>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onPressArena(item)}
                    style={{
                        width:CARD_WIDTH,
                        height:230,
                        borderRadius:12,
                        overflow:"hidden",
                        // backgroundColor: selectedArena._id == item._id ? "#000" : "gold",
                        // borderWidth:selectedArena._id == item._id ? 0 : 2,
                        // borderTopColor:selectedArena._id == item._id ? "transparent" : "rgba(234,179,8,.15)",
                        padding: selectedArena._id == item._id ? 1 : 1
                    }} 
                    className ="justi fy-center item s-center"
                     >

                    {/* Cover */}
                    <Image
                        source={{uri:item.coverImage.publicUrl}}
                        style={{
                            width:"100%",
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
                            "rgba(0,0,0,.35)",
                            "rgba(0,0,0,.55)",
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
                            "rgba(0,0,0,.15)",
                            "rgba(0,0,0,.75)",
                            "#111214",
                        ]}
                        style={{
                            position:"absolute",
                            left:0,
                            right:width/2,
                            bottom:50,
                            height:"50%",
                        }}
                    />

                    {/* Header */}

                    <View
                        style={{
                            position:"absolute",
                            left:16,
                            right:16,
                            bottom:16,
                        }}
                    >
                        <View
                            style={{
                                flexDirection:"row",
                                alignItems:"center",
                            }}
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
                                        fontSize:13,
                                        lineHeight:18,
                                        fontWeight : "700",
                                        fontSize : width/38
                                    }}
                                >
                                    {item.biography}
                                </Text>
                            </View>
                        </View>

                       

                        <Text 
                            numberOfLines={2}
                            style ={{
                                paddingTop :14,
                                paddingBottom :14,
                                lineHeight:18,
                                fontWeight : "600",
                                fontSize : width/39,
                                width:width * 0.75
                            }}
                            className="text-white  ">
                                {item.description} 
                        </Text> 
                        {/* Stats */}
                        <View
                            style={{
                                flexDirection:"row",
                                marginTop:14,
                                justifyContent:"space-between",
                            }}
                        >
                            <Stat
                                icon="star-four-points-outline"
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
                            <Stat
                                icon="eye-outline"
                                value={item.viewCount}
                                width={width}

                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={ () => {
                            setHamburgerMenu(!hamburgerMenu)
                        }
                        }
                        style={{
                            // width: width/12,
                            // height: width/12,
                            position : "absolute",
                            right:5,
                            top:5,
                            borderRadius: 26,
                            backgroundColor: "rgba(0,0,0,.55)",
                            borderWidth: 1,
                            borderColor: "rgba(234,179,8,.58)",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        className = "p-2 rounded-full bg-black"
                        >
                            <MaterialCommunityIcons
                                name="dots-horizontal"
                                size={20}
                                color="#f4d44d"
                            />
                    </TouchableOpacity>
                    {hamburgerMenu && (
                    <View
                        style={{
                            position: "absolute",
                            top: 45,
                            right: 10,
                            width: 215,
                            backgroundColor: "rgba(17,18,20,.98)",
                            borderRadius: 18,
                            borderWidth: 1,
                            borderColor: "rgba(234,179,8,.18)",
                            paddingVertical: 8,
                            zIndex : 999
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => {
                                setOpenEditArenaModal(true);
                                setHamburgerMenu(false)
                            }}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 18,
                                paddingVertical: 14,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="pencil-outline"
                                size={width/25}
                                color="#eab308"
                            />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    color: "#FFF",
                                    fontSize: width/36,
                                    fontWeight: "600",
                                }}
                            >
                                Edit Arena
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "rgba(255,255,255,.06)",
                                marginHorizontal: 16,
                            }}
                        />
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => { 
                                if(selectedArena.posts.length > 0) setArenaActionModal("delete_arena_deny")
                                else setArenaActionModal("delete_arena")
                                 setOpenArenaAlertModal(true)
                            }}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",

                                paddingHorizontal: 18,
                                paddingVertical: 14,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="delete-outline"
                                size={width/25}
                                color="#eab308"
                            />
                            <Text
                                style={{
                                    marginLeft: 14,
                                    color: "#FFF",
                                    fontSize: width/36,
                                    fontWeight: "600",
                                }}
                            >
                                Delete Arena
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )}


                </TouchableOpacity>
                </>
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