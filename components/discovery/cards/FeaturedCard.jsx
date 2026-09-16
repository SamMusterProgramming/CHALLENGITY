import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  deleteArenaPost,
  isUserFiredPost,
  toggleArenaPostFire,
  toggleArenaPostSpotlight,
} from "../../../apiCalls";
import { useLoading } from "../../../context/loadingContext";
import SpotlightIcon from "../../custom/spotlightIcon";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { countries, stageIcons } from "../../../utilities/TypeData";

const formatCount = (value = 0) => {
  const number = Number(value) || 0;
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return `${number}`;
};

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
    scale
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

 


  // if (!isReady && !item?.temp) return null;

  return (
    <View
      style={{
        marginHorizontal: 8,
        borderRadius: 7,
        overflow: "hidden",
        // backgroundColor: "#0A0C0E",
        // borderWidth: 1,
        width,
        // borderColor:   "rgba(234,179,8,0.24)"
          //  "rgba(255,255,255,0.065)",
      }}
      className = " rounded-t-3xl"
    >
      <TouchableOpacity
        activeOpacity={0.96}
        onPress = { () => setSelectedPost(entry) }
      >
        <View
          style={{
            width: "100%",
            height: height,
            backgroundColor: "#111315",
            // position: "relative",
          }}
        >
          {thumbnail ? (
            <Image
              source={{ uri: thumbnail }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                alignSelf : "center"
              }}
              className = "rounded-3xl"
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
              "rgba(0,0,0,0.05)",
              "rgba(0,0,0,0.28)",
              "rgba(0,0,0,0.86)",
            ]}
            locations={[0, 0.38, 0.62, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
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
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 9,
                paddingVertical: 6,
                borderRadius: 999,
            
              }}
            >
              {isSpotlight && (
                <SpotlightIcon size={scale(15)} />
              ) }
            
            </View>
          </View>

          {/* {duration && !item?.temp && (
            <View
              style={{
                position: "absolute",
                right: 11,
                top: 11,
                paddingHorizontal: 7,
                paddingVertical: 4,
                borderRadius: 6,
                backgroundColor: "rgba(0,0,0,0.62)",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: "800",
                }}
              >
                {duration}
              </Text>
            </View>
          )} */}

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
                  name={hasFired ? "fire" : "fire"}
                  size={scale(18)}
                  color={hasFired ? "#EAB308" : "#FFFFFF"}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: hasFired ? "#EAB308" : "#FFFFFF",
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

              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="share-outline"
                  size={width/23}
                  color="#FFFFFF"
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#FFFFFF",
                    fontSize: width/38,
                    fontWeight: "800",
                  }}
                >
                  {formatCount(shares)}
                </Text>
              </View> */}
            </View>
 
        </View>
      </TouchableOpacity>




      <View
        className = "rounded-xl mt-2 py-4 px-3 w-full  bg-[#171616] "
      >
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
                  width: 21,
                  height: 21,
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
                  <MaterialCommunityIcons
                    name="stadium"
                    size={scale(15)}
                    color="#fff"
                  />
                )}
              </View>

              <Text
                numberOfLines={1}
                style={{
                  flexShrink: 1,
                  marginLeft: 6,
                  color: "#FFF",
                  fontSize: scale(13),
                  fontWeight: "800",
                }}
                className = "text-gray-300"
              >
                {performerName}
              </Text>

              {/* <View
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: 2,
                  marginHorizontal: 6,
                  backgroundColor: "#555A60",
                }}
              /> */}

            
            </View>

          </View>
          
          <View
            style={{
              flex: 1,
              paddingRight: 10,
              marginTop: 8,
              width
            }}
          >
             <View
             className = "flex-row w-full pr-4 gap- 1">
                
                <Text
                  // numberOfLines={1}
                  style={{
                    color: "#fff",
                    fontSize: scale(10) ,
                    fontWeight: "700",
                  }} 
                  className = "uppercase">
                    {entry.arena?.talentType || "Performance"}  .
                </Text>
                <Text
                  // numberOfLines={1}
                  style={{
                    color: "#fff",
                    fontSize: scale(10) ,
                    fontWeight: "700",
                  }} 
                  className = "uppercase">
                   {' '} {countries.find(c => c.code == entry.arena?.region).name }{'  '}
                </Text>
                
                <View
                 className = " flex-row justify-center tex t-center items-center px-8 flex-1 ">
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#aaa",
                      fontSize: scale(10) ,
                      fontWeight: "600",
                    }} >
                      {'Caption - '} 
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#fff",
                      fontSize: scale(10),
                      fontWeight: "600",
                      letterSpacing: -0.15,
                      // width :200
                    }}
                  >
                  {caption}  
                  </Text>
                </View>
            </View>
       
        </View>
      </View>

      
    </View>
  );
}