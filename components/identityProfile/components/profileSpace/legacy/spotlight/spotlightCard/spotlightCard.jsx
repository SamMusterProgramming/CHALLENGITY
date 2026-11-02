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
import PerformanceIcon from "../../../../../../svgIcons/others/PerformanceIcon";
import FollowersIcon from "../../../../../../svgIcons/others/followersIcon";
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

export default function SpotlightCard({
  spotlight,
  width
}) {

  const {
    spacing,
    scale,
    userSpotlights
  } = useGlobalContext();

  const [expanded, setExpanded] = useState(true);

  const name =
    spotlight?.arena.arenaName ||
        "Unnamed Arena";

  const caption =
        spotlight?.biography ||
        spotlight?.bio ||
        spotlight?.caption ||
        "A space created for talent, competition, and discovery.";

  const talent =
     spotlight?.arena.talentType ||
    "Talent";

  const country =
    spotlight. arena?.region ||
        "DZ";
  const score = spotlight?.spotlightScore ?? 0;
  const thumbnail = spotlight.media?.thumbnail.cdnUrl || null

  const views = spotlight.viewCount 
  const fires = spotlight.fireCount
  const comments = spotlight.commentCount

  const playperformance = (selectedPost) =>{
    let refactoredPosts = [];

    userSpotlights.map((p) => {
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
        height: spacing(380),
        width :  width * 0.95,
        borderRadius : scale(10)
      }}
      className="justify-start bor der-2 bord er-[gold]/20 items-center  bg-[#000000]"
     >
   
     <View
          style={{
          }}
          className = "w-full flex-1"
        >
          {thumbnail ? (
            <View
              className="flex-row flex-1"
              style={{
            
              }}   >
                  <Pressable
                    onPress={() => 
                        playperformance(spotlight)
                    }
                    android_ripple={{
                      color: "rgba(232,185,90,0.12)",
                    }}
                    style={{
                      flex:  1,
                      borderRadius: scale(5),
                      overflow: "hidden",
                      backgroundColor: "#151515",
                    //   borderWidth: scale(1),
                    //   borderColor: "rgba(232,185,90,0.20)",
                    }}
                    className = "flex-1"
                  >
            
                      <Image
                        source={{ uri: thumbnail }}
                        resizeMode="cover"
                        style={{
                          flex:1
                        }}
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
              bottom: -1,
              height: "58%",
            }}
          />

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

            <View
              style={{
                position: "absolute",
                left: 23,
                right: 13,
                bottom: 20,
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
                  size={scale(18)}
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
                  size={scale(18)}
                  color= "#EAB308" //: "#FFFFFF"}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#FFFFFF",
                    fontSize: scale(10),
                    fontWeight: "800",
                  }}
                >
                  {formatCount(fires)}
                </Text>
              </TouchableOpacity>

              <View
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
              </View>

            
           </View>

     </View>

     
     <Pressable
        android_ripple={{
          color: "rgba(232,185,90,0.06)",
        }}
        onPress={() => router.push({
            pathname:
              "/arenaProfile",
            params: {
              arena_id:
                spotlight.arena._id,
            },
          })}
        style={{
            paddingTop: spacing(12),
            paddingBottom: spacing(12),
            paddingHorizontal : spacing(12)
        }}
        className = "justify-center items-center rounded-b-xl border-l-2 border-r-2  border-b-2 border-gold/25"
      >
        <View className="flex-row items-center w-full fl ex-1">



          <View
            className="items-center justify-center"
            style={{
            //   width: spacing(48),
              marginRight: spacing(12),
            }}
          >
            <View
              className="items-center mb- 4 justify-center"
              style={{
                padding: spacing(7),
                borderRadius: scale(30),
                borderWidth: scale(1),
                borderColor: "rgba(232,185,90,0.38)",
                // backgroundColor: "rgba(255,255,255,0.185)",
              }}  >
              <RisingStarIcon size={scale(20)} />
            
            </View>
           
          </View>

   

          <View
            className="flex-1 justify-center"
            style={{
              paddingRight: spacing(8),
            }}   >
            <Text
              numberOfLines={1}
              style={{
                color: "#F4F4F2",
                fontSize: scale(13),
                lineHeight: spacing(16),
                fontWeight: "800",
                letterSpacing: scale(0.25),
              }}  >
              {name}
            </Text>

            <Text
              numberOfLines={2}
              style={{
                marginTop: spacing(7),
                color: "rgba(255,255,255,0.92)",
                fontSize: scale(10),
                lineHeight: spacing(12),
                fontWeight: "500",
              }}
            >
              {caption}
            </Text>

          </View>

     
          <View className = "flex-row-reverse items-end gap-2" >
            <View
                className="items-center justify-center"
                style={{
                //   width: spacing(60),
                }}  >
                <View
                className="items-center justify-center"
                style={{
                    // width: spacing(55),
                    // height: spacing(70),
                }}
                >
                    <CountryFlag
                        code={country}
                        size={scale(22)}
                    />

                <Text
                    style={{
                    marginTop: spacing(3),
                    color: "#fff",
                    fontSize: scale(8),
                    fontWeight: "700",
                    letterSpacing: scale(0.8),
                    }}
                >
                    {country}
                </Text>
                </View>
            </View>

            <View
                className="items-center justify-center"
                style={{
                //   width: spacing(60),
                }}  >
                <View
                className="items-center justify-center"
                style={{
                    // width: spacing(55),
                    // height: spacing(70),
                }}
                >
                <TalentIcon talent={talent} size={scale(25)} color={"white"}/>

                <Text
                    style={{
                    marginTop: spacing(3),
                    color: "white",
                    fontSize: scale(8),
                    fontWeight: "700",
                    // letterSpacing: scale(0.8),
                    }}
                >
                    {talent.toUpperCase()}
                </Text>
                </View>
            </View>
          </View>
        </View>

      
      </Pressable>


    </View>
  );
}