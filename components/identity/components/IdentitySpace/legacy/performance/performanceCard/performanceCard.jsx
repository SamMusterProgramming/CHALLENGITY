import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from "react-native";

import {
  useGlobalContext,
} from "../../../../../../../context/GlobalProvider";

import ArenaPortalIcon
  from "../../../../../../svgIcons/ArenaPortalIcon";

import CountryFlag
  from "../../../../../../common/CountryFlag";

import TalentIcon
  from "../../../../../../custom/TalentIcon";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import RisingStarIcon from "../../../../../../svgIcons/RisingStarIcon";
import { formatCount } from "../../../../../../../helper";
import { LinearGradient } from "expo-linear-gradient";
import { countries } from "../../../../../../../utilities/TypeData";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ANIMATION_CONFIG = {
  duration: 280,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export default function PerformanceCard({
  performance,
  performances,
  width
}) {

  const {
    spacing,
    scale,
    userSpotlights
  } = useGlobalContext();

  const isPerformanceSpotlight = (post) =>
    post?.globalSpotlight?.spotlight === true ||
    post?.regionalSpotlight?.spotlight === true ||
    post?.localSpotlight?.spotlight === true;

  const isSpotlight = isPerformanceSpotlight(performance)

  const name =
    performance?.arena.arenaName ||
        "Unnamed Arena";

  const caption =
        performance?.biography ||
        performance?.bio ||
        performance?.caption ||
        "A space created for talent, competition, and discovery.";

  const talent =
     performance?.arena.talentType ||
    "Talent";

  const country =
    performance. arena?.region ||
        "DZ";
  const score = performance?.spotlightScore ?? 0;
  const thumbnail = performance.media?.thumbnail.cdnUrl || null

  const views = performance.viewCount 
  const fires = performance.fireCount
  const comments = performance.commentCount

  const playperformance = (selectedPost) =>{
    let refactoredPosts = [];

    performances.map((p) => {
      const post = {
        ...p,
        arenaName: p.arena.arenaName,
        talentType: p.arena.talentType,
        region: p.arena.region,
        profileImage: p.arena.profileImage,
      };
      refactoredPosts.push(post);
    });

    const updatedPosts = [
      refactoredPosts.find(
        (p) => p._id.toString() === selectedPost._id.toString()
      ),
      ...refactoredPosts.filter(
        (p) => p._id.toString() !== selectedPost._id.toString()
      ),
    ];
    router.push({
        pathname: "/arenaPerformancePlayer",
        params: {
          selectedPostId: selectedPost._id,
          arenaPosts: JSON.stringify(updatedPosts),
          arena: JSON.stringify([]),
        },
      });
  }


  return (
    <View
      style={{
        // paddingHorizontal: spacing(16),
        height: spacing(420),
        width :  width * 1,
        // borderRadius : scale(10)
      }}
      className="justify-start  items-center  bg-[#000000]"
     >
      
      <View
          style={{
          }}
          className = "w-full p-2 flex-1 rounded-t-3xl bg-black border-l-2 border-r-2 border-t-2 border-[#252424] justify-center items-center "  
        >
          {thumbnail ? (
            <View
              className="flex-row flex-1"
              style={{
            
              }}   >
                  <Pressable
                    onPress={() => 
                        playperformance(performance)
                    }
                    android_ripple={{
                      color: "rgba(232,185,90,0.12)",
                    }}
                    style={{
                      flex:  1,
                      borderRadius: scale(5),
                      overflow: "hidden",
                      backgroundColor: "#151515",
                    }}
                    className = "flex-1"  >
            
                      <Image
                        source={{ uri: thumbnail }}
                        resizeMode="cover"
                        style={{
                          height : "86%"
                        }}
                        className="h- full w-full rounded-2xl"
                      />

                  </Pressable>
            </View>
            ) : (
            <Pressable
              className="items-center justify-center"
              onPress={() => router.push({
                pathname:
                  "/arenaProfile",
                params: {
                  arena_id:
                    arena._id,
                },
                })}
                style={{
                  flex:1,
                  borderRadius: scale(10),
                  borderWidth: scale(1),
                  borderColor: "rgba(255,255,255,0.06)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: scale(8),
                  fontWeight: "600",
                }}
              >
                No performances yet
              </Text>
            </Pressable>
          )}

          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(0,0,0,0.35)",
              "rgba(0,0,0,0.28)",
              "rgba(0,0,0,0.16)",
              "transparent",
            ]}
            locations={[0, 0.38, 0.62, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "58%",
            }}
          />

          <LinearGradient
            pointerEvents="none"
            colors={[
              "transparent",
              "rgba(0,0,0,0.25)",
              "rgba(0,0,0,0.38)",
              "rgba(0,0,0,0.86)",
            ]}
            locations={[0, 0.38, 0.62, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 2,
              height: "88%",
            }}
          />
          
           {isSpotlight && (
            <View
                style={{
                    flexDirection: "col",
                    alignItems: "center",
                    paddingHorizontal: 9,
                    paddingVertical: 6,
                    // borderRadius: 999,
                }}
                className = "bg-black/40 p-1 rounded-md absolute top-2 left-2"  >
            
                    <RisingStarIcon size={scale(25)} />
            
                <Text
                    style={{
                        color: "#E8B95A",
                        fontSize: scale(7),
                        fontWeight: "700",
                        marginTop :5
                    }}
                    >
                    SPOTLIGHT
                </Text>
            </View>
            )}


            <View
              style={{
                position: "absolute",
                right: 23,
                right: 13,
                bottom: scale(55),
                flexDirection: "row",
                alignItems: "center",
              }}   >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 26,
                }}
              >
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={scale(15)}
                  color="#FFFFFF"
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#FFFFFF",
                    fontSize: scale(9),
                    fontWeight: "800",
                  }}
                >
                  {formatCount(views)}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.75}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 26,
                }}
              >
                <MaterialCommunityIcons
                  name={ "fire" }
                  size={scale(15)}
                  color= "#EAB308" //: "#FFFFFF"}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#FFFFFF",
                    fontSize: scale(9),
                    fontWeight: "800",
                  }}
                >
                  {formatCount(fires)}
                </Text>
              </TouchableOpacity>

           </View>

           <View
                 className="bg-[gold]/60  items-center rounded-full absolute bot tom-0  justify-center"
                 style={{
                   bottom :spacing(20) ,
                   left: "23%",
                   padding : spacing(2),
                   zIndex :1002,
                 }}  >
                {/* <ArenaPortalIcon size={scale(30)} /> */}
                <Image
                source={{ uri: performance.arena.profileImage.publicUrl }}
                resizeMode="cover"
                style={{
                  width: scale(90),
                  height: scale(90),
                }}
                className ="rounded-full"
              />
           </View>

           <Text
                className = "absolute bottom-2 right-4 uppercase"
                style={{
                // marginTop: spacing(3),
                  color: "#c0c0c0",
                  fontSize: scale(9),
                  fontWeight: "700",
                  // letterSpacing: scale(0.3),
                  
                }}  >
                        {countries.find(c=> c.code == country)?.name}
           </Text>
           <Text
                           className = "absolute bottom-2 left-4 uppercase"
                           style={{
                           // marginTop: spacing(3),
                             color: "#c0c0c0",
                             fontSize: scale(9),
                             fontWeight: "700",
                             // letterSpacing: scale(0.3),
                             
                           }}  >
                          {talent.toUpperCase()}
            </Text>

       </View>


       <View
            className="flex-row bg- [#161a20] rounded- b-[30px]  justify-between w-full"
            style={{
                // marginTop: spacing(6),
                height : scale(110)
            }}  >

            <View 
             style = {{
              paddingVertical: spacing(8),
              paddingHorizontal: spacing(8),
             }}
             className = " justify-center absolute top-0 left-4 z-50 items-center bg-[#202021] round ed-bl-[10px] rounded-full  gap -4" >
                      <TalentIcon talent={talent} size={scale(27)} color={"gold"}/>
            </View>


            {/* METRICS */}
             <View
             className = "flex-1  justify-center b g-[#202021] items-center">
                   
                  <Pressable
                    android_ripple={{
                      color: "rgba(232,185,90,0.06)",
                    }}
                    style={{
      
                    }}
                    className = "justify-start bg-black  flex-1   items-start"
                  >
                    <View 
                    style ={{
                      paddingLeft : spacing(80),
                      paddingTop : spacing(8)
                    }}
                     className=" bg-black border-x-2 border-b-2 rounded-b-3xl min-w-full flex-1 border-[#252424] items-start ">

                      {/* Performance classification */}
                      <View
                        className="flex-row items-center"
                        style={{
                          // marginTop: spacing(10),
                          paddingHorizontal: spacing(9),
                          paddingVertical: spacing(8),
                          borderRadius: scale(5),
                          backgroundColor: "rgba(232,185,90,0.09)",
                          borderWidth: scale(0.7),
                          borderColor: "rgba(232,185,90,0.25)",
                        }} >
                        <Text
                          style={{
                            color: "#E8B95A",
                            fontSize: scale(9),
                            fontWeight: "800",
                            letterSpacing: scale(0.8),
                          }}
                        >
                          {isSpotlight ? "SPOTLIGHT FEATURE" : "ARENA PERFORMANCE"}
                        </Text>
                      </View>

                      {/* Arena name */}
                      <Text
                        numberOfLines={1}
                        style={{
                          marginTop: spacing(16),
                          color: "#F1EEE7",
                          fontSize: scale(14),
                          fontWeight: "800",
                          letterSpacing: scale(0.2),
                        }}
                      >
                        {name}
                      </Text>

                    

                      {/* Caption */}
                      <Text
                        numberOfLines={2}
                        style={{
                          marginTop: spacing(8),
                          color: "rgba(255,255,255,0.76)",
                          fontSize: scale(11),
                          lineHeight: scale(16),
                          fontWeight: "400",
                          letterSpacing: scale(0.1),
                        }}
                      >
                        {caption}
                      </Text>

                    </View>
                  </Pressable>

                     

              </View>

              <View 
                style = {{
                  paddingVertical: spacing(8),
                  paddingHorizontal: spacing(8),
                  // height : scale(60),
                  // width : scale(60)
                  }}
                  className = "flex-row absolute top-0 right-4 justify-center items-center bg-[#202021]  rounded-full  gap -4" >
                        <CountryFlag
                            code={country}
                            size={scale(30)}
                        />
              </View>

           
         
        </View>


    </View>
  );
}