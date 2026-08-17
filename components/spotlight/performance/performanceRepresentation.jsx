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
import SpotlightIcon from "../../custom/spotlightIcon";


export default function PerformanceRepresentation({
  performance,
  width,
  height,
  loadUProfile,
  playPerformance,
  setSelectedProfile , 
  setSelectedPost
  }) {

  const thumbnail = performance.media?.thumbnail.cdnUrl 
  const region = countries.find(  c => c.code === performance.arena.region );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress = { () => setSelectedPost(performance) }
      style={{
        width,
        height: height ,
        // borderRadius: 18,
        overflow:"hidden",
        backgroundColor:"#111",
        borderWidth:1,
        // borderColor:
        //   "rgba(234,179,8,0.18)",
      }}
      className ="justify-center items-center bg-black p- 2"
    >
      {/* THUMBNAIL */}
      <Image
        source={{
          uri: thumbnail
        }}
        style={{
          width:"100%",
          height:"100%",
        }}
        resizeMode="cover"
        className = "rounded-xl"
      />
      {/* PLAY BUTTON */}
      <View
              style={{
                position: "absolute",
                width: width/11,
                height: width/11,
                borderRadius: 999,
                backgroundColor:  "rgba(255,255,255,0.9)",
                justifyContent: "center",
                alignItems: "center",
              }} >
              <MaterialCommunityIcons
                name="play"
                size={20}
                color = "black"
              />
      </View>
      {/* INFO OVERLAY */}
      <TouchableOpacity
          onPress = {() => {
            setSelectedProfile({
                _id : performance.owner._id,
                name: performance.owner.name,
                profileImage : performance.owner.profileImage ,
                coverImage : performance.owner.coverImage,
                city : performance.owner.city ,
                state: performance.owner.state ,
                country : performance.owner.country ,
            })
            // loadUProfile
          }}
        style={{
          position:"absolute",
          left:10,
          right:10,
          bottom:10,
          backgroundColor:
            "rgba(0,0,0,0.55)",
          borderRadius :18
        }}
        className = "p-3"  >
        <View
          style={{
            flexDirection:"row",
            alignItems:"center",
          }} >
          {/* PROFILE IMAGE */}
          <Image
            source={{
              uri:
              performance?.owner.profileImage?.publicUrl
            }}
            style={{
              width:width/9,
              height:width/9,
              borderRadius:999,
              borderWidth:2,
              borderColor:"#eab308",
              backgroundColor:"#111",
            }}
          />
          <View
            style={{
              marginLeft:14,
              flex:1,
            }} 
            className = ""
             >
            {/* NAME */}
                <View
                className = "flex-row">
                    <Text
                    numberOfLines={1}
                    style={{
                        color:"#fff",
                        fontSize:width/32,
                        fontWeight:"900",
                        width :width/3
                    }} >
                    {performance.owner.name}
                    </Text>
                    <View
                    style={{
                        flex:1,
                        // padding : 10 ,
                        marginLeft : 24,
                        marginRight : 12,
                    }}
                    className = " rounded-3xl flex-row justify-between items-center b g-[#000]/40"
                    > 
                        <View
                            style={{
                            }}
                            className ="flex-row gap-2 items-center" >
                            <MaterialCommunityIcons
                                name="eye"
                                size={17}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/42 }}>
                                {performance.viewCount || 0}
                            </Text>
                        </View>
                        
                        <View
                            style={{
                            }}  className ="flex-row gap-2 items-center"  >
                            <MaterialCommunityIcons
                                name="star-four-points"
                                size={17}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/42 }}>
                                {performance.fireCount || 0}
                            </Text>
                        </View>

                        <View
                            style={{
                            }}  className ="flex-row gap-2 items-center"  >
                            <MaterialCommunityIcons
                                name="message"
                                size={17}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/42 }}>
                                {performance.commentCount || 0}
                            </Text>
                        </View>
                </View>
            </View>
            {/* TYPE */}
           <View
           style ={{
            marginTop:8,
           }}
           className ="flex-row justify-start items-center">
              <Text
              style={{
          
                color:"#eab308",
                fontSize:width/34,
                fontWeight:"700",
              }}  >

              {performance.arena.talentType}
              {" "}
              {stageIcons[performance.arena.talentType]}

              {"  •  "}

              <Text
                style={{
                  color:
                  "rgba(255,255,255,0.65)",
                  fontSize:width/34,
                }}
              >
                {region?.flag}
                {" "}
                {region?.name} {'    '}
              </Text>

            </Text>

           </View>
          </View>
        </View>
      </TouchableOpacity>

      <View
      className = "absolute top-4 right-4">
                <SpotlightIcon  size ={17} />
      </View>
    </TouchableOpacity>
  );
}