import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { countries, stageIcons } from "../../utilities/TypeData";
import SpotlightIcon from "../custom/spotlightIcon";
import { useGlobalContext } from "../../context/GlobalProvider";


export default function UserPerformanceRepresentation({
  performance,
  width,
  height,
  setSelectedProfile = () => {} , 
  setSelectedPost = () => {} 
  }) {
  const {user} = useGlobalContext()
  const thumbnail = performance.media?.thumbnail.cdnUrl 
  const region = countries.find(  c => c.code === performance.region );

  const isLocalSpotlight = performance?.localSpotlight?.spotlight;
  const isRegionalSpotlight = performance?.regionalSpotlight?.spotlight;
  const isGlobalSpotlight = performance?.globalSpotlight?.spotlight;
  const isSpotLight = isLocalSpotlight  || isRegionalSpotlight ||  isGlobalSpotlight 

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
          opacity : 0.6
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
                    profileImage : user.profileImage ,
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
            right:60,
            bottom:10,
            backgroundColor:
                "rgba(0,0,0,0.65)",
            borderRadius : 12
            }}
            className = "pt-3 pl-3 pr-3 "  >

                <View
                    style={{
                        flexDirection:"row",
                        alignItems:"center",
                    }} >
                        <Image
                            source={{
                            uri:
                            user.profileImage?.publicUrl
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
                                    {performance.arenaName} {'  '}
                                    <MaterialCommunityIcons
                                                name="stadium"
                                                size={23}
                                                color="#eab308"
                                            />
                                    </Text>
                                
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

                                        {performance.talentType}
                                        {" "}
                                        {stageIcons[performance.talentType]}

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
                <View
                    style={{
                        flex:1,
                        padding : 10 ,
                        // marginLeft : 24,
                        // marginRight : 12,
                    }}
                    className = " rounded-3xl mt- 4 flex-row justify-between items-center b g-[#000]/40"
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
                                name="fire"
                                size={19}
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
      </TouchableOpacity>
      
      <View
      className = "absolute top-4 right-4">
         {isSpotLight ? (
            <SpotlightIcon  size ={16} />
         ):(
            <View className="flex-row items-center gap-1 rounded-full bg-black/70  p-2">
                <MaterialCommunityIcons
                  name="chart-line"
                  size={22}
                  color="#fff"
                />
            </View>
        )}
      </View>
    </TouchableOpacity>
  );
}