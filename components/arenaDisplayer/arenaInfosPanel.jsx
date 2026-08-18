import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    ActivityIndicator,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stats } from "../profile/custom/stats";
import { router } from "expo-router";
import { toggleFollowerArena } from "../../apiCalls";
import { countries, stageIcons } from "../../utilities/TypeData";
import { useGlobalContext } from "../../context/GlobalProvider";

const ArenaInfoPanel = ({
    arena,
    onPressFollow,
    onPressStar,
    onPressOwner,
    isMe
}) => {

const { width, height } = useWindowDimensions();
const {setOpenArenaAlertModal,arenaActionModal,setArenaActionModal  ,uploadPerformanceLoading} = useGlobalContext()

const statData = [
    
    {
      icon: "video",
      label: "videos",
      value: arena?.postCount,
    },
  
    {
      icon: "account-plus",
      label: "Followers",
      value: arena?.followerCount,
    },
    {
      icon: "star",
      label: "Stars",
      value: arena?.starCount,
    },
   
  ];


if (!arena) return null;

return (

<View
    style={{
        // height: height * 0.25,
        backgroundColor: "#090909",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        // borderTopWidth: 1,
        // borderColor: "rgba(255,255,255,.95)",
        overflow: "hidden",
        zIndex :1,
        flex:1
    }} className = "justify-end gap-3 mb-1" >

        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
                // paddingTop:20,
                // flex:1
            }} className ="bg-black-200-white mb-" >

            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onPressOwner(arena.owner?._id)} >

                <Image
                    source={{
                        uri: arena.profileImage?.publicUrl,
                    }}
                    style={{
                        width: width/8,
                        height: width/8,
                        borderRadius: 29,
                        borderWidth: 2,
                        borderColor: "#EAB308",
                        // marginTop:-24
                    }}
                />
            </TouchableOpacity>

            <View
                style={{
                    flex: 1,
                    marginLeft: 14,
                }} className = "justify-end"  >

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }} >
                    <Text
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            color: "#FFF",
                            fontWeight: "900",
                            fontSize: width / 27,
                        }}
                    >
                        {arena.arenaName} {'  -  '}
                              <Text
                              style={{
                                  color: "#AAA",
                                //   fontWeight: "600",
                                //   fontSize: width / 36,
                              }}
                            >
                             {/* {isMe ?  "Your Arena":`${arena.owner.fullname}' arena` } */}
                          </Text>    
                 
                    </Text>
                    {arena.verified && (

                        <MaterialCommunityIcons
                            name="check-decagram"
                            size={18}
                            color="#EAB308"
                        />

                    )}

                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 12,
                    }}    >

                    <View
                        style={{
                            backgroundColor: "rgba(234,179,8,.12)",
                            borderRadius: 999,
                            // paddingHorizontal: 10,
                            // paddingVertical: 4,
                        }}
                    >

                        <Text
                            style={{
                                color: "#EAB308",
                                fontWeight: "800",
                                fontSize: width / 30,
                            }} >
                            {arena.talentType} {' '} {stageIcons[arena.talentType]} {' .'}
                        </Text>


                    </View>

                    <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        color="#999"
                        style={{
                            marginLeft: 12,
                        }}
                    />
                    <Text
                        style={{
                            color: "#fff",
                            marginLeft: 4,
                            fontSize: width / 30,
                        }}
                    >
                        {countries.find(c => c.code == arena.region)?.name} - {arena.region} {countries.find(c => c.code == arena.region)?.flag}
                    </Text>

                </View>

            </View>

        </View>

        {/* Biography */}

        {/* <Text
            numberOfLines={2}
            style={{
                color: "#fff",
                marginHorizontal: 18,
                marginTop: 14,
                lineHeight: 20,
                fontSize: width / 33,
            }}
        >
            {arena.biography}
        </Text> */}


        <View
            style={{
                // flex: 1,
                marginHorizontal: 7,
                alignSelf : "center"
            }} className = "justify-between m t- auto mb-1 mt-2 6 gap-2 w-[95%] items-center flex-row "  >
                {!isMe && (
                <>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPressFollow}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor:
                            arena.isFollower
                                ? "rgba(255,255,255,.09)"
                                : "rgba(255,255,255,.09)",
                        borderRadius: 5,
                        // paddingHorizontal: 18,
                        // paddingVertical: 10,
                    }} className = "w-[50%] justify-center py-3"   >

                    <MaterialCommunityIcons
                        name={
                            arena.isFollower
                                ? "heart"
                                : "heart-outline"
                        }
                        color={
                            arena.isFollower
                                ? "#EAB308"
                                : "#EAB308"
                        }
                        size={width/22}
                    />

                    <Text
                        style={{
                            marginLeft: 8,
                            fontSize : width/34,
                            color:
                                arena.isFollower
                                    ? "#fff"
                                    : "#FFF",

                            fontWeight: "700",
                        }}
                    >
                        {arena.isFollower
                            ? "Following"
                            : "Follow"}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onPressStar}
                        style={{
                            // width: 46,
                            // height: 46,
                            borderRadius: 5,
                            backgroundColor:  "rgba(255,255,255,.09)",
                            // justifyContent: "center",
                            alignItems: "center",
                            flexDirection : "row"
                        }}
                        className = "w-[47%] justify-center py-3" 
                    >

                        <MaterialCommunityIcons
                            name={
                                arena.isStarred
                                    ? "star"
                                    : "star-outline"
                            }
                            color="#EAB308"
                            size={width/22}
                        />
                        <Text
                        style={{
                            marginLeft: 8,
                            fontSize : width/34,
                            color:
                                arena.isStarred
                                    ? "#fff"
                                    : "#FFF",

                            fontWeight: "700",
                            }}   >
                            {arena.isStarred
                                ? "Starred"
                                : "Star"}
                        </Text>
                </TouchableOpacity>
                </>
                )}

                {isMe && (
                <TouchableOpacity
                     activeOpacity={0.9}
                     disabled={uploadPerformanceLoading}
                     onPress={() => {
                       if (uploadPerformanceLoading) return;
                   
                       setArenaActionModal("create_performance");
                       setOpenArenaAlertModal(true);
                     }}
                     style={{
                       borderRadius: 5,
                       backgroundColor: uploadPerformanceLoading
                         ? "rgba(234,179,8,0.65)"
                         : "#EAB308",
                       alignItems: "center",
                       flexDirection: "row",
                     }}
                     className="w-[100%] self-center justify-center py-3"
                   >
                     {uploadPerformanceLoading ? (
                       <>
                         <ActivityIndicator
                           size="small"
                           color="#000"
                         />
                   
                         <Text
                           style={{
                             marginLeft: 8,
                             fontSize: width / 36,
                             color: "#000",
                             fontWeight: "700",
                           }}
                         >
                           Uploading...
                         </Text>
                       </>
                     ) : (
                       <Text
                         style={{
                           marginLeft: 8,
                           fontSize: width / 36,
                           color: "#000",
                           fontWeight: "700",
                         }}
                       >
                         Add Performance
                       </Text>
                     )}
                   </TouchableOpacity>
                )}

        
        </View>
     
        <View
        clas ="fle x-1  justify-center items-center">
            <View
            style = {{
                alignSelf :"center"
            }}
            className="flex-row w-[95%] pb-1 px-2 justify-evenly border rounded-md border-white/30 mt -8 ">
                            {statData.map((item, index) => (
                            <React.Fragment key={item.label}>
                                <Stats
                                    {...item}
                                    width={width}
                                />
                                {index !== statData.length - 1 && (
                                    <View
                                        className="h-8 w-px mt-4 bg-white/40"
                                    />
                                )}
                            </React.Fragment>
                            ))}
            </View>
        </View>

        <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={()=> 
                            router.back()
                        }
                        style={{
                            // width: 46,
                            // height: 46,
                            borderRadius: 23,
                            // backgroundColor:
                            //     "rgba(255,255,255,.06)",
                            // justifyContent: "center",
                            alignItems: "center",
                            flexDirection : "row"
                        }}
                        className = " absolute top-4 right-4 justify-center"  >

                        <MaterialCommunityIcons
                            name= "close"
                            color="#EAB308"
                            size={width/14}
                        />

        </TouchableOpacity>



    </View>

);

};

const Metric = ({ title, value , width}) => (

<View
    style={{
        // flex: 1,
        alignItems: "center",
    }}
>

    <Text
        style={{
            color: "#FFF",
            fontWeight: "900",
            fontSize: width/34,
        }}
    >
        {value}
    </Text>

    <Text
        style={{
            color: "#8D8D8D",
            marginTop: 3,
            fontSize: width/38,
            fontWeight: "600",
        }}
    >
        {title}
    </Text>

</View>

);

export default ArenaInfoPanel;