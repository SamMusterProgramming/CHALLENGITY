import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { countries, stageIcons } from "../../../utilities/TypeData";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import ArenaIcon from "../../svgIcons/tab/ArenaIcon";
import ArenaPortalIcon from "../../svgIcons/ArenaPortalIcon";
import CountryFlag from "../../common/CountryFlag";
import MagicIcon from "../../svgIcons/talent/MagicIcon";
import TalentIcon from "../../custom/TalentIcon";

const ArenaCard = ({
  entry,
  width = null,
}) => {


  const {scale , getArenaPerformanceThumbnailHeight , spacing} = useGlobalContext()
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
          height :"95%"
        }}
        className=" flex-1 "
      >
  
        {imageUri ? (
          <>
          <Image
            source={{
              uri: imageUri,
            }}
            className="absolute rounded-3xl inset-0 "
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
              "rgba(0,0,0,0.05)",
              "rgba(0,0,0,0.15)",
              "rgba(0,0,0,0.28)",
              "rgba(0,0,0,0.76)",
            ]}
            locations={[0, 0.38, 0.62, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "98%",
            }}
          />


          <View className="absolute inset-x-4 bg -black/55  bottom-4 rounded-lg">
            <View
             style= {{
              justifyContent : index == 0 ? "flex-start" : "flex-end"
            }}
             className="flex-row w-full  items-center justi fy-between p-1 gap-4 ">
             
              <View 
             
              className="mr-[7px] flex-row  items-center">
                <Ionicons
                  name="eye"
                  size={scale(14)}
                  color="#FFFFFF"
                />
                <Text
                style = {{
                  fontSize : scale(11)
                }}
                 className="ml-[3px] text -[8px] font-bold text-white/85">
                  {formatNumber(
                    performance?.viewCount
                  )}
                </Text>
              </View>

              <View className="mr- [7px] flex-row items-center">
                <MaterialCommunityIcons
                  name="fire"
                  size={scale(14)}
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
        // height,
      }}
      className="self-center  "
    >

    

      {/*
       * =====================================================
       * PERFORMANCE GALLERY
       * =====================================================
       */}

      <View
      style ={{
        height : getArenaPerformanceThumbnailHeight(),
        gap: spacing(6),
        paddingBottom: spacing(6),

      }}
      className=" p-1 rounded-t-3xl bg-black border-l-2 border-r-2 border-t-2 border-[#252424] justify-center    flex-row ">
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

            <View
                className="bg-[gold]/60 items-center rounded-full absolute bot tom-0  justify-center"
                style={{
                  bottom :-scale(5) ,
                  padding : scale(3),
                  zIndex :1002,
                }} 
             
                 >
                {/* <ArenaPortalIcon size={scale(30)} /> */}
                <Image
                source={{ uri: entry.profileImage.publicUrl }}
                resizeMode="cover"
                style={{
                  width: scale(70),
                  height: scale(70),
                }}
                className ="rounded-full"
              />
            </View>

           

       </View>

       {/* footer */}

       
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
                      <TalentIcon talent={entry.talentType} size={scale(29)} color={"white"}/>
                      <Text
                          style={{
                          // marginTop: spacing(3),
                          color: "white",
                          fontSize: scale(9),
                          fontWeight: "800",
                          letterSpacing: scale(0.3),
                          }}  >
                          {entry.talentType.toUpperCase()}
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
                            {entry.arenaName}
                        </Text>

                        <Text
                          numberOfLines={1}
                          style={{
                            marginTop: spacing(14),
                            color: "#c0c0c0",
                            fontSize: scale(11),
                            lineHeight: spacing(12),
                            fontWeight: "600",
                          }}
                        >
                          {entry.biography}
                        </Text>

                      </View>

                    
                    </View>
                  </Pressable>
             
           
                    {/* <View
                          className=" items-center gap-2 absolute top-2 left-0 justify-center">
                           
                            <Text
                              style={{
                              // marginTop: spacing(3),
                              color: "#c0c0c0",
                              fontSize: scale(8),
                              fontWeight: "700",
                              letterSpacing: scale(0.3),
                              }} >
                              FOLLOWERS
                            </Text>
                            <Text
                                style={{
                                // marginLeft: spacing(4),
                                fontSize: scale(10),
                                color: "gold",
                                fontWeight: "700",
                                }}     >
                                {entry.followerCount}
                            </Text>
                     </View>
                     <View
                        className="fle x-row items-center absolute top-2 right-2 gap-2 justify-center">
                        
                            <Text
                                  style={{
                                    color: "#c0c0c0",
                                    fontSize: scale(8),
                                    fontWeight: "700",
                                    letterSpacing: scale(0.3),
                                  }} >
                                  STARS
                            </Text>
                            <Text
                                style={{
                                // marginLeft: spacing(4),
                                fontSize: scale(10),
                                color: "#E8B95A",
                                fontWeight: "700",
                                }}
                            >
                                {entry.starCount}
                            </Text>
                      </View> */}

                      <View
                          className="bg- [black]/80 border-b-2 border-b-goldSoft/50 items-center  absolute   justify-center"
                          style={{
                            top : 0 ,
                            left:  -scale(0),
                            paddingVertical : scale(3),
                            zIndex :1002,
                          }}   >
                            <Text
                                    className = "text-goldSoft/90"
                                    style={{
                                    // color: "gold",
                                    fontSize: scale(10),
                                    fontWeight: "800",
                                    letterSpacing: scale(0.3),
                                    }}  >
                                  ARENA
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
                            code={entry.region}
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
                            {entry.region}
                        </Text>
                    </View>
                </View>

            </View>
         
        </View>
      


    </TouchableOpacity>
  );
};

export default ArenaCard;