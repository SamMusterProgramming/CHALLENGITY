import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {  MaterialCommunityIcons } from "@expo/vector-icons";

// import {
//   deleteArenaPost,
//   isUserFiredPost,
//   toggleArenaPostFire,
//   toggleArenaPostSpotlight,
// } from "../../../apiCalls";
import { useLoading } from "../../../context/loadingContext";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { countries, stageIcons } from "../../../utilities/TypeData";
import RisingStarIcon from "../../svgIcons/RisingStarIcon";
import ArenaIcon from "../../svgIcons/tab/ArenaIcon";
import ArenaPortalIcon from "../../svgIcons/ArenaPortalIcon";
import { formatCount } from "../../../helper";
import TalentIcon from "../../custom/TalentIcon";
import CountryFlag from "../../common/CountryFlag";



export default function FeaturedCard({
  entry,
  setSelectedPost,
  onPress,
  width,
  height,
}) {

  const {
    user,
    setSelectedArena,
    setUserArenas,
    setOpenArenaAlertModal,
    setArenaActionModal,
    scale,
    spacing,
    getFeaturedThumbnailHeight
  } = useGlobalContext();
  const { showLoading, hideLoading } = useLoading();

  const [hasFired, setHasFired] = useState(false);
  const [isReady, setIsReady] = useState(entry?.temp || false);

  const isLocalSpotlight = !!entry?.localSpotlight?.spotlight;
  const isRegionalSpotlight = !!entry?.regionalSpotlight?.spotlight;
  const isGlobalSpotlight = !!entry?.globalSpotlight?.spotlight;

  const isSpotlight =
    isLocalSpotlight ||
    isRegionalSpotlight ||
    isGlobalSpotlight;

  const spotlightTypes = [
    isLocalSpotlight && "LOCAL",
    isRegionalSpotlight && "REGIONAL",
    isGlobalSpotlight && "GLOBAL",
  ].filter(Boolean);

  const spotlightLabel = spotlightTypes.length
    ? spotlightTypes.join(" • ")
    : "PROGRESSIVE";

  const fires = entry?.fireCount ?? entry?.fireCounth ?? 0;
  const comments = entry?.commentCount ?? entry?.ccommentCount ?? 0;
  const views = entry?.viewCount ?? entry?.views ?? 0;
  const shares = entry?.shareCount ?? entry?.shares ?? 0;

  const duration =
      entry?.duration ||
      entry?.videoDuration ||
      entry?.media?.duration ||
    null;

  const thumbnail =
    entry?.media?.thumbnail?.cdnUrl ||
    entry?.media?.thumbnail?.url;

  const caption =
      entry?.caption ||
      entry?.title ||
      entry?.performanceName ||
     "Performance";

  const performerName =
      entry?.userName ||
      entry?.username ||
      entry?.ownerName ||
      entry?.arena.arenaName ||
    "Arena performer";

  const openPerformance = () => {
    setSelectedPost?.(entry);
    onPress?.(entry);
  };

  return (
    <View
      style={{
        width,
        height: spacing(420),
      }}
      className="justify-start  items-center  bg-[#000000]"
    >



      <TouchableOpacity
        activeOpacity={0.96}
        onPress = { () => setSelectedPost(entry) } 
        className = "w-full p-2 flex-1 rounded-t-3xl bg-black border-l-2 border-r-2 border-t-2 border-[#252424] justify-center items-center "  
        >
        <View
          style={{
            // width: "100%",
            // height:  getFeaturedThumbnailHeight(),
            // backgroundColor: "#111315",
            // position: "relative",
          }}
          className="flex-row justify-center items-start flex-1"
          >
          {thumbnail ? (
            <Image
              source={{ uri: thumbnail }}
              // resizeMode="cover"
              resizeMethod= "cover"
              style={{
                width: "100%",
                height: "95%",
                // alignSelf : "center"
              }}
              className = "rounded-t-xl"
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="video-outline"
                size={40}
                color="#45494D"
              />
            </View>
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
              position: "absolute",
              top: 5,
              left: 5,
              // right: 11,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}  >

            {isSpotlight && (
            <View
              style={{
                flexDirection: "col",
                alignItems: "center",
                paddingHorizontal: 9,
                paddingVertical: 6,
                // borderRadius: 999,
              }}
              className = "bg-black/40 p-1 rounded-md"  >
            
              <RisingStarIcon size={scale(30)} />
              
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
            ) }
            
          </View>

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
                  size={scale(14)}
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
                  name={hasFired ? "fire" : "fire"}
                  size={scale(14)}
                  color={hasFired ? "#EAB308" : "#FFFFFF"}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: hasFired ? "#EAB308" : "#FFFFFF",
                    fontSize: scale(9),
                    fontWeight: "800",
                  }}
                >
                  {formatCount(fires)}
                </Text>
              </TouchableOpacity>
{/* 
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
                source={{ uri: entry.arena.profileImage.publicUrl }}
                resizeMode="cover"
                style={{
                  width: scale(70),
                  height: scale(70),
                }}
                className ="rounded-full"
              />
            </View>
 
        </View>

      </TouchableOpacity>




      {/* <View
      style = {{
        paddingVertical : spacing(12),
        paddingHorizontal : spacing(12)
      }}
        className = " bg-[#121212]  w-full   " >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          className = "rounded-full flex-1"  >
        
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 11,
                  overflow: "hidden",
                  backgroundColor: "#191C1F",
                  alignItems: "center",
                  justifyContent: "center",
                }}  >
                {entry?.profileImage ? (
                  <Image
                    source={{ uri:entry.profileImage }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <ArenaPortalIcon  size={scale(20)}  color = "#EAB308" />
                )}
              </View>

              <Text
                numberOfLines={1}
                style={{
                  marginLeft: 6,
                  color: "#FFF",
                  fontSize: scale(13),
                  fontWeight: "800",
                }}
                className = "text-gray-300"
              >
                {performerName}
              </Text>

            
            </View>

          </View>
          
          <View
            style={{
              flex: 1,
              paddingRight: 10,
              marginTop: 8,
              width
            }} >
             <View
             className = "flex-row w-full pr-4 ">
                
                <Text
                  // numberOfLines={1}
                  style={{
                    color: "#c0c0c0",
                    fontSize: scale(10) ,
                    fontWeight: "700",
                  }} 
                  className = "uppercase">
                    {entry.arena?.talentType || "Performance"}  .
                </Text>
                <Text
                  // numberOfLines={1}
                  style={{
                    color: "#c0c0c0",
                    fontSize: scale(10) ,
                    fontWeight: "700",
                  }} 
                  className = "uppercase">
                   {' '} {countries.find(c => c.code == entry.arena?.region).name }{'  '}
                </Text>
                
                <View
                 className = " flex-row justify-start tex t-center items-center px-2 flex-1 ">
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#c0c0c0",
                      fontSize: scale(10),
                      fontWeight: "600",
                      letterSpacing: -0.15,
                      // width :200
                    }}
                  >
                  | {' '} {caption}  
                  </Text>
                </View>
            </View>
       
        </View>
      </View> */}



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
                      <TalentIcon talent={entry.arena.talentType} size={scale(29)} color={"white"}/>
                      <Text
                          style={{
                          // marginTop: spacing(3),
                          color: "white",
                          fontSize: scale(9),
                          fontWeight: "800",
                          letterSpacing: scale(0.3),
                          }}  >
                          {entry.arena.talentType.toUpperCase()}
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
                            {entry.arena.arenaName}
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
                            code={entry.arena.region}
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
                            {entry.arena.region}
                        </Text>
                    </View>
                </View>

            </View>
         
        </View>

      
    </View>
  );
}