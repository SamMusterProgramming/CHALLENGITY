import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { countries, stageIcons } from "../../../utilities/TypeData";
import { router } from "expo-router";
import { getPostsArena, getUserById } from "../../../apiCalls";
import { LinearGradient } from "expo-linear-gradient";
import StarArenaButton from "../custom/starArenaButton";
import FollowArenaButton from "../custom/followArenaButton";


export default function ArenaCard({
  arena,
  width,
  height,
  setSelectedArena , 
  setSelectedPost
  }) {

 
const thumbnail = arena?.coverImage?.publicUrl;
const region = countries.find(  c => c.code === arena.region );

const handleOpenArena = () => {
  router.push({
    pathname:
      "/arenaDisplayer",
    params: {
      arena_id:
        arena._id,
      // arena:
      //   JSON.stringify(
      //     arena
      //   ),
      // arena : JSON.stringify(
      //   []
      // )
    },
  });
}
return (
<TouchableOpacity
                    activeOpacity={0.9}
                    onPress={ handleOpenArena}
                    style={{
                        width:width,
                        height:height,
                        borderRadius:12,
                        overflow:"hidden",
                    }} 
                    className ="justify-center mb- 4 p- 2 items-center"
                     >
                    {/* Cover */}
                    <Image
                        source={{uri:arena.coverImage.publicUrl}}
                        style={{
                            width:"100%",
                            height:"100%",
                            position:"absolute",
                            opacity : 0.4
                            // borderRadius:12,
                        }}
                        resizeMode="cover"
                        className ="rounded-xl"
                    />
                   

                    <View
                        style={{
                            position:"absolute",
                            left:10,
                            right:10,
                            bottom:10,
                        }}  >
                        <View
                            style={{
                                flexDirection:"row",
                                alignItems:"center",
                            }}
                            className = "px-4" >
                            <Image
                                source={{uri:arena.profileImage.publicUrl}}
                                style={{
                                    width:width/6,
                                    height:width/6,
                                    borderRadius:50,
                                    borderWidth:1,
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
                                            fontSize:width/23,
                                            flex:1,
                                        }}
                                    >
                                        {arena.arenaName} 
                                    </Text>
                                    {arena.verified && (

                                        <MaterialCommunityIcons
                                            name="check-decagram"
                                            size={18}
                                            color="#eab308"
                                        />

                                    )}

                                </View>
                                <View
                                className = "flex-row gap-4 mt-2" >
                                    <Text
                                        style={{
                                            color:"#eab308",
                                            fontSize:width/27,
                                            marginTop:8,
                                            fontWeight:"700",
                                        }}  >
                                       {arena.talentType} {' '} {stageIcons[arena.talentType]} {'.'}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#fff",
                                            marginTop: 8,
                                            fontSize: width / 27,
                                            fontWeight:"700",
                                        }}   >
                                        {countries.find(c => c.code == arena.region)?.name} - {arena.region} {countries.find(c => c.code == arena.region)?.flag}
                                    </Text>
                                </View>
                                
                            </View>
                        </View>
                        
                        <View
                            style={{
                                flexDirection:"row",
                                marginTop:20,
                                justifyContent:"space-between",
                                alignSelf : "center"
                            }}
                            className = "px-4 w-[93%] bg-black/40 p-3 rounded-xl "
                        >
                            <Stat
                                icon="star"
                                value={arena.starCount}
                                width={width }
                            />
                            <Stat
                                icon="play-box-multiple-outline"
                                value={arena.postCount}
                                width={width  * 1}

                            />
                            <Stat
                                icon="account-group-outline"
                                value={arena.followerCount}
                                width={width  }

                            />
                            
                        </View>
                    
                    </View>

                    <View
                        className = "absolute top-4 right-6" >
                              <MaterialCommunityIcons
                                  name= "stadium"
                                  size={38}
                                  color = "#F4C542"
                              />
                    </View>

            
         </TouchableOpacity>
)
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
              size={width/17}
              color="#eab308"
          />
          <Text
              style={{
                  color:"#FFF",
                  marginLeft:4,
                  fontWeight:"600",
                  fontSize:width/27,
              }}
          >
              {value}
          </Text>
      </View>
   )
  }