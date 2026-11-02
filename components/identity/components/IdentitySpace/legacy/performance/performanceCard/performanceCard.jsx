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
                          height : "95%"
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
              bottom: -2,
              height: "58%",
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
                left: 23,
                right: 13,
                bottom: scale(30),
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

              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={scale(16)}
                  color="#FFFFFF"
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#FFFFFF",
                    fontSize: scale(10),
                    fontWeight: "800",
                  }}
                >
                  {formatCount(comments)}
                </Text>
              </View> */}

           </View>

           <View
                className="bg-[gold]/60  items-center rounded-full absolute bot tom-0  justify-center"
                style={{
                  bottom :-spacing(5) ,
                  padding : spacing(4),
                  zIndex :1002,
                }}  >
                {/* <ArenaPortalIcon size={scale(30)} /> */}
                <Image
                source={{ uri: performance.arena.profileImage.publicUrl }}
                resizeMode="cover"
                style={{
                  width: scale(70),
                  height: scale(70),
                }}
                className ="rounded-full"
              />
           </View>

     </View>






       <View
            className="flex-row bg- [#161a20] rounded- b-[30px]  justify-between w-full"
            style={{
                // marginTop: spacing(6),
                height : scale(110)
            }}  >

             <View 
             style = {{
              paddingVertical: spacing(16),
              paddingHorizontal: spacing(12),
             }}
             className = "flex-row justify-center items-center bg-[#202021] rounded-bl-[10px] rounded-tr-full  gap -4" >

                <View
                className="items-center justify-center"
                style={{
                   }}  >
                    <View
                    className="items-center  gap-4 justify-center"
                    style={{

                    }}  >
                      <TalentIcon talent={talent} size={scale(29)} color={"white"}/>
                      <Text
                          style={{
                          // marginTop: spacing(3),
                          color: "white",
                          fontSize: scale(9),
                          fontWeight: "800",
                          letterSpacing: scale(0.3),
                          }}  >
                          {talent.toUpperCase()}
                      </Text>
                    </View>
              </View>
            </View>


            {/* METRICS */}
             <View
             className = "flex-1  justify-center bg-[#202021] items-center">
                   
                <Pressable
                    android_ripple={{
                      color: "rgba(232,185,90,0.06)",
                    }}
                    style={{
                        // paddingBottom: spacing(16),
                        paddingHorizontal: spacing(12),
                        paddingTop : scale(28)
                        
                    }}
                    className = "justify-start mb-4  flex-1 rounded-b-[50px] bg-black items-center"
                  >
                    <View className="flex-row items-center  ">

                        <View
                          className="flex-1 items-center justify-center"
                          style={{
                            paddingRight: spacing(8),
                          }}   >
                          <Text
                            numberOfLines={1}
                            style={{
                              color: "#F4F4F2",
                              fontSize: scale(14),
                              lineHeight: spacing(16),
                              fontWeight: "800",
                              letterSpacing: scale(0.25),
                            }}  >
                            {name}
                        </Text>

                        <Text
                          numberOfLines={1}
                          style={{
                            marginTop: spacing(14),
                            color: "rgba(255,255,255,0.92)",
                            fontSize: scale(11),
                            lineHeight: spacing(12),
                            fontWeight: "500",
                          }}
                        >
                          {caption}
                        </Text>

                      </View>

                    
                    </View>
                  </Pressable>
             
          

                      <View
                          className="bg- [black]/70 border-b-2 border-b-goldSoft/50 items-center  absolute   justify-center"
                          style={{
                            top : -scale(4) ,
                            left:  -scale(8),
                            paddingVertical : scale(3),
                            zIndex :1002,
                          }}   >
                            <Text
                                    className = "text-goldSoft/100"
                                    style={{
                                    fontSize: scale(8),
                                    fontWeight: "800",
                                    letterSpacing: scale(0.4),
                                    }}  >
                                 {isSpotlight ? "SPOTLIGHT":"PERFORMANCE"} 
                            </Text>
                      </View>

              </View>

              <View 
             style = {{
              paddingVertical: spacing(16),
              paddingHorizontal: spacing(16),
             }}
             className = "flex-row bg-[#202021] rounded-br-[10px] rounded-tl-full  gap -4" >
                <View
                    className="items-center justify-center"
                    style={{
                    //   width: spacing(60),
                    }}  >
                    <View
                      className="items-center gap-4 justify-center"
                      style={{
                          // width: spacing(55),
                          // height: spacing(70),
                      }}
                      >
                        <CountryFlag
                            code={country}
                            size={scale(27)}
                        />
                        <Text
                            style={{
                            // marginTop: spacing(3),
                             color: "white",
                              fontSize: scale(10),
                              fontWeight: "700",
                              letterSpacing: scale(0.3),
                            }}  >
                            {country}
                        </Text>
                    </View>
                </View>

            </View>
         
        </View>


    </View>
  );
}