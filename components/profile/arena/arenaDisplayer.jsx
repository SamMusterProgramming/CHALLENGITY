import React, { useRef } from "react";
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

export default function ArenaDisplayer({
    userArenas,
    onPressArena,
    selectedArena,
    setSelectedArena
}) {
   
    const { width } = useWindowDimensions();
    const CARD_WIDTH = width * 0.76;
    const SPACING = 14;
    const SIDE_PADDING = 8;
    const flatListRef = useRef()
    return (
        <FlatList
        ref={flatListRef}
        horizontal
        data={userArenas}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING }
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum={false}
        contentContainerStyle={{
            paddingLeft: SIDE_PADDING,
            // allows the LAST card to snap completely left
            paddingRight:
                width -
                CARD_WIDTH -
                SIDE_PADDING,
    
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
            setSelectedArena(userArenas[index]);
            }}
            renderItem={({item})=>(
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=>onPressArena(item)}
                    style={{
                        width:CARD_WIDTH,
                        height:230,
                        borderRadius:12,
                        overflow:"hidden",
                        backgroundColor:"#000",
                        // borderWidth:selectedArena._id == item._id ? 0 : 2,
                        // borderColor:selectedArena._id == item._id ? "transparent" : "rgba(234,179,8,.15)",
                    }}  >

                    {/* Cover */}

                    <Image
                        source={{uri:item.coverImage.publicUrl}}
                        style={{
                            width:"100%",
                            height:"100%",
                            position:"absolute",
                        }}
                        resizeMode="cover"
                    />

                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,.15)",
                            "rgba(0,0,0,.75)",
                            "#000",
                        ]}
                        style={{
                            position:"absolute",
                            left:0,
                            right:0,
                            bottom:0,
                            height:"70%",
                        }}
                    />

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
                            right:width/4,
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
                                    width:52,
                                    height:52,
                                    borderRadius:26,

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
                                        marginTop:2,
                                        fontWeight:"700",
                                    }}
                                >
                                    {item.talentType} • {item.region}
                                </Text>

                            </View>

                        </View>

                        <Text
                            numberOfLines={2}
                            style={{
                                color:"rgba(255,255,255,.72)",
                                marginTop:12,
                                fontSize:13,
                                lineHeight:18,
                            }}
                        >
                            {item.biography}
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
                            />

                            <Stat
                                icon="play-box-multiple-outline"
                                value={item.postCount}
                            />

                            <Stat
                                icon="account-group-outline"
                                value={item.followerCount}
                            />

                            <Stat
                                icon="eye-outline"
                                value={item.viewCount}
                            />

                        </View>

                    </View>

                </TouchableOpacity>
            )}
        />
    );

}

function Stat({icon,value}){

    return(

        <View
            style={{
                flexDirection:"row",
                alignItems:"center",
            }}
        >

            <MaterialCommunityIcons
                name={icon}
                size={14}
                color="#eab308"
            />

            <Text
                style={{
                    color:"#FFF",
                    marginLeft:4,
                    fontWeight:"600",
                    fontSize:12,
                }}
            >
                {value}
            </Text>

        </View>

    )

}