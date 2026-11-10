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
                height: "86%",
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
              bottom: 2,
              height: "88%",
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
            
            </View>

            <View
              className="bg-[gold]/60  items-center rounded-full absolute bot tom-0  justify-center"
              style={{
                bottom :spacing(20) ,
                left: "23%",
                padding : spacing(2),
                zIndex :1002,
              }}  >
                <Image
                source={{ uri: entry.arena.profileImage.publicUrl }}
                resizeMode="cover"
                style={{
                  width: scale(90),
                  height: scale(90),
                }}
                className ="rounded-full"
              />
            </View>

            <Text
                className = "absolute bottom-2 right-2 uppercase"
                style={{
                // marginTop: spacing(3),
                  color: "#c0c0c0",
                  fontSize: scale(9),
                  fontWeight: "700",
                  // letterSpacing: scale(0.3),
                  
                }}  >
                        {countries.find(c=> c.code == entry.arena.region)?.name}
            </Text>
            <Text
                           className = "absolute bottom-2 left-2 uppercase"
                           style={{
                           // marginTop: spacing(3),
                             color: "#c0c0c0",
                             fontSize: scale(9),
                             fontWeight: "700",
                             // letterSpacing: scale(0.3),
                             
                           }}  >
                          {entry.arena.talentType.toUpperCase()}
            </Text>
 
        </View>

      </TouchableOpacity>



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
                      <TalentIcon talent={entry.arena.talentType}  size={scale(27)} color={"gold"}/>
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
                      paddingLeft : spacing(90),
                      paddingTop : spacing(4)
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
                            fontSize: scale(8),
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
                          marginTop: spacing(12),
                          color: "#F1EEE7",
                          fontSize: scale(14),
                          fontWeight: "800",
                          letterSpacing: scale(0.2),
                        }}  >
                            {entry.arena.arenaName}
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
                              code={entry.arena.region}
                              size={scale(30)}
                          />
              </View>
        </View>

      
    </View>
  );
}