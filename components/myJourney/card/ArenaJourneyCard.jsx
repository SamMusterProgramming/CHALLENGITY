import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { countries, stageIcons } from "../../../utilities/TypeData";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import ArenaPortalIcon from "../../svgIcons/ArenaPortalIcon";
import CountryFlag from "../../common/CountryFlag";
import TalentIcon from "../../custom/TalentIcon";

const ArenaJourneyCard = ({
  entry,
  width,
  height,

}) => {


  const {scale ,getArenaPerformanceThumbnailHeight , spacing} = useGlobalContext()
  const performances = entry.posts || [];
  
  const sortedPerformances = useMemo(() => {
    return [...performances].sort(
      (a, b) =>
        new Date(b?.createdAt || 0).getTime() -
        new Date(a?.createdAt || 0).getTime()
    );
  }, [performances]);

 
  const visiblePerformances = sortedPerformances.slice(
    0,
    2
  );

  const remainingCount = Math.max(
    sortedPerformances.length - 2,
    0
  );


  const getThumbnailUrl = (performance) => {
    return (
      performance?.media?.thumbnail?.cdnUrl ||
      performance?.media?.thumbnail?.publicUrl ||
      null
    );
  };


  const formatNumber = (value) => {
    const number = Number(value) || 0;

    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(
        number >= 10000000 ? 0 : 1
      )}M`;
    }

    if (number >= 1000) {
      return `${(number / 1000).toFixed(
        number >= 10000 ? 0 : 1
      )}K`;
    }

    return number.toString();
  };

  const renderPerformance = (
    performance,
    index
  ) => {
    const imageUri =  getThumbnailUrl(performance);
    const isLastVisible = index === 1 && remainingCount > 0;
    return (
      <View
        key={
          performance?._id?.toString() ||
          `${entry._id}_${index}`
        }
        activeOpacity={0.9}
        
        style ={{
        }}
        className=" flex-1 overflow-hidden rounded-t-xl border border-white/[0.07] bg-[#000000]"
      >
  
        {imageUri ? (
          <>
          <Image
            source={{
              uri: imageUri,
            }}
            className="absolute inset-0 h- full w- full"
            resizeMode="cover"
          />
       
          </>
        ) : (
          <View className="flex-1 items-center justify-center bg-[#000000]">
            <Ionicons
              name="videocam-outline"
              size={27}
              color="rgba(255,255,255,0.28)"
            />
          </View>
        )}

        {isLastVisible && (
          <View className="absolute  inset-0 items-center justify-center bg-black/35">
            <Text className="text-[25px] font-extrabold tracking-[-0.5px] text-white">
              +{remainingCount}
            </Text>

            <Text className="mt-[1px] text-[8px] font-extrabold tracking-[1px] text-yellow-500">
              MORE
            </Text>
          </View>
        )}
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


          <View className="absolute inset-x-4 bg -black/55  bottom-4 rounded-lg">
            <View className="flex-row w-full  items-center justi fy-between p-1 gap-4 ">
             
              <View className="mr-[7px] flex-row items-center">
                <Ionicons
                  name="eye"
                  size={scale(18)}
                  color="#FFFFFF"
                />
                <Text
                style = {{
                  fontSize : scale(10)
                }}
                 className="ml-[3px] text -[8px] font-semibold text-white/85">
                  {formatNumber(
                    performance?.viewCount
                  )}
                </Text>
              </View>

              <View className="mr- [7px] flex-row items-center">
                <MaterialCommunityIcons
                  name="fire"
                  size={scale(18)}
                  color="#fff"
                />
                <Text
                style = {{
                  fontSize : scale(10) ,
                  color : "#fff"
                }}
                 className="ml-[3px] t ext-[8px] font-bold text-white/85">
                  {formatNumber(
                    performance?.fireCount
                  )}
                </Text>
              </View>
              
          
              

            </View>
          </View>
        {/* )} */}
      </View>
    );
  };

  const performanceCount =
    entry.postCount ??
    entry.posts?.length ??
    0;

  const starCount =
    entry.starCount ?? 0;

  const followerCount =
    entry.followerCount ?? 0;


  return (
    <TouchableOpacity
      activeOpacity={0.94}
      onPress={() =>
        // onPress?.(entry)
        router.push({
          pathname:
            "/arenaProfile",
          params: {
            arena_id:
              entry._id,
          },
        })
      }
      
      style={{
        width,
      }}
      className="self-center bg- [#1c1a1a] gap-1 overflow-hidden rounded-[5px] b g-[#181818] px- [14px] pb- [11px] pt- [13px]"
    >

     

   
      <View
      style ={{
        height :getArenaPerformanceThumbnailHeight()
      }}
      className=" mt-1 justify-center  bg-[black] border-l-[0.5px] border-r-[0.5px] bo rder-[gold]/40 flex-1 flex-row gap-[5px] overfl ow-hidden">
        {visiblePerformances.map(
          renderPerformance
        )}

        {visiblePerformances.length === 0 && (
          <View className="flex-1 items-center justify-center rounded-[13px] border-t border-b bor der-white/[0.76] bg-[#171717]">
            
  
            <Ionicons
              name="videocam-outline"
              size={38}
              color="rgba(255,255,255,0.48)"
            />

            <Text
            style = {{
              fontSize : scale(12)
            }}
             className="mt-[5px]  font-medium text-white/45">
              No performances yet
            </Text>

          </View>
        )}

      </View>

      <View
       style = {{
        paddingVertical : spacing(10) ,
        paddingHorizontal : spacing(10) 
      }}
        className="rounde d-b-xl bg-[#121212] w-full  flex-row items-center bor der-b-2 bo rder-l-2 bord er-r-2 bor der-[gold]/15 justify-between">
          <View className="flex-1  flex-row items-center">
            <View
            style ={{
              // width : width /10 ,
              // height :width/10
            }}
            className=" p- 2 ">
                <View className="fl ex-1 items-center rounded-lg justify-center">
                  <ArenaPortalIcon  size={scale(40)}  color = "#EAB308" />
                  <View
                  className = "absolute top-0 left-0">
                          <CountryFlag code  = {entry.region} size={scale(15)} />
                  </View>
                </View>
            </View>

            <View className="ml-[10px] flex- 1">
              <View className="flex-row flex- 1  items-center">
                <View className = "flex-row flex -1">
                  <Text
                    numberOfLines={1}
                    style ={{
                      fontSize :  scale(14)
                    }}
                    className="max-w -[85%]  font-bold tracking-[0.1px] text-white" >
                    {entry.arenaName}
                  </Text>
                  {/* {entry.verified && ( */}
                  <Ionicons
                    name="checkmark-circle"
                    size={15}
                    color="#EAB308"
                    style={{
                      marginLeft: 5,
                    }}
                  />
                </View>

                <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 25,
                    }}
                    className ="gap-1 "   >
                    <MaterialCommunityIcons
                      name= "star"
                      size= {scale(13)}
                      color= "#fff"
                    />
                    
                     <Text
                      style={{
                        color: "#F1F1F2",
                        fontSize: scale(11),
                        fontWeight: "700",
                        letterSpacing: -0.2,
                      }}  >
                      {entry.starCount} 
                     </Text>
                 </View>


                 <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 20,
                    }}
                    className ="gap-1"   >
                    <MaterialCommunityIcons
                      name="account-group"
                      size={scale(13)}
                      color="#fff"
                    />
                     <Text
                      style={{
                        color: "#F1F1F2",
                        fontSize: scale(11),
                        fontWeight: "700",
                        letterSpacing: -0.2,
                      }}  >
                      {entry.followerCount} 
                     </Text>
                 </View>

              </View>

              <View className="mt-[4px] flex-row items-center">
            
                <Text 
                style = {{
                  fontSize : scale(10)
                }}
                className="ml- [3px]  font-bold uppercase tracking-[0.3px] text-[#c0c0c0]">
                  # {entry.talentType}{' '}
                </Text>

                <View
                className = "justify-center items-center">
                      <View className = "h-1 w-1 rounded-full self-center  bg-white m-3" />
                </View>

                <View className=" h-[3px] w-[3px] rounded-full bg-white/25" />
                  <Text
                  style = {{
                    fontSize : scale(10)
                  }}
                    numberOfLines={1}
                    className="text- [11px] font-bold uppercase tracking-[0.3px] text-[#c0c0c0]"  >
                    # {countries.find(c => c.code == entry.region)?.name} 
                  </Text>
                </View>

            </View>

            <View className=" ml-auto flex-row justify-center items-center">
               <TalentIcon talent= {entry.talentType} size={scale(35)} />
            </View>

          </View>
          </View>
     

    </TouchableOpacity>
  );
};

export default ArenaJourneyCard;