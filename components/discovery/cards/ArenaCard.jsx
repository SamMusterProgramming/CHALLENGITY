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
import { formatCount } from "../../../helper";

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
          height :"86%"
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
              className="bg-[gold]/60  items-center rounded-full absolute bot tom-0  justify-center"
              style={{
                bottom :spacing(20) ,
                padding : spacing(2),
                zIndex :1002,
              }}  >
              
              <Image
              source={{ uri: entry.profileImage.publicUrl }}
              resizeMode="cover"
              style={{
                width: scale(90),
                height: scale(90),
              }}
              className ="rounded-full"
            />
          </View>

          <Text
                className = "absolute bottom-4 right-10 uppercase"
                style={{
                // marginTop: spacing(3),
                  color: "#c0c0c0",
                  fontSize: scale(9),
                  fontWeight: "700",
                  // letterSpacing: scale(0.3),
                  
                }}  >
                        {entry.region}
          </Text>
          <Text
                           className = "absolute bottom-4 left-4 uppercase"
                           style={{
                           // marginTop: spacing(3),
                             color: "#c0c0c0",
                             fontSize: scale(9),
                             fontWeight: "700",
                             // letterSpacing: scale(0.3),
                             
                           }}  >
                          {entry.talentType.toUpperCase()}
          </Text>

       </View>

       {/* footer */}

       
       <View
          className="flex-row rounded-b-3xl border-x-2 border-b-2 border-[#252424]   justify-between w-full"
          style={{
              // marginTop: spacing(6),
              height : scale(125)
          }}  >

         
            <View 
             style = {{
              paddingVertical: spacing(8),
              paddingHorizontal: spacing(8),
             }}
             className = " justify-center absolute top-0 left-4 z-50 items-center bg-[#202021] round ed-bl-[10px] rounded-full  gap -4" >
                      <TalentIcon talent={entry.talentType}  size={scale(27)} color={"gold"}/>
            </View>



             {/* METRICS */}
             <View
             className = "flex-1 justify-start bg- [#202021] items-center">
                   
                   <Pressable
                    android_ripple={{
                      color: "rgba(232,185,90,0.06)",
                    }}
                    style={{
         
                    }}
                    className = "justify-start b g-black  flex-1   items-center"
                  >
                 
                    <View
                      style={{
                        // marginBottom: spacing(4),
                        paddingTop : scale(4)
                      }}
                      className=" bg-black bord er-x-2 min-w-full flex-1 bord er-[#252424] items-center ">
                       
                          <Text
                            numberOfLines={1}
                            style={{
                              color: "#F4F4F2",
                              fontSize: scale(15),
                              // lineHeight: spacing(16),
                              fontWeight: "800",
                              letterSpacing: scale(0.25),
                            }}  >
                              {entry.arenaName}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{
                              marginTop: spacing(12),
                              color: "rgba(255,255,255,0.92)",
                              fontSize: scale(11),
                              lineHeight: spacing(12),
                              fontWeight: "500",
                            }}
                          >
                            {entry.biography}
                          </Text>
                    </View>

                      {/* Statistics */}
      
                   <View
                    className = "  min-w-[90%] rounded-xl mb-4 border-[1px] self-center py-3 px-4 b g-[gold]/5  bor der-[gold]/20 flex-row justify-between   "
                    >
                    {[
                      {
                        label: "PERFORMANCES",
                        value: entry.postCount,
                        icon: "play-box-multiple-outline",
                      },
                      {
                        label: "FOLLOWERS",
                        value: entry.followerCount,
                        icon: "account-group-outline",
                      },
                      {
                        label: "STARS",
                        value: entry.starCount,
                        icon: "star",
                      },
                    ].map((stat,index) => (
                      <View 
                       className = " flex-row flex-1 justify-center between"
                       key={stat.label}>
                        <View
                        // key={stat.label}
                        className="flex-row flex-1 items-center gap-2 justify-center">
                      
                        {/* Icon and number in one row */}
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <View
                            style={{
                              // width: 29,
                              // height: 29,
                              borderRadius: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "rgba(232, 185, 90, 0.10)",
                              borderWidth: 1,
                              borderColor: "rgba(232, 185, 90, 0.14)",
                            }}
                          >
                            <MaterialCommunityIcons
                              name={stat.icon}
                              size={17}
                              color={"white"}
                            />
                          </View>
                      
                          <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            minimumFontScale={0.8}
                            style={{
                              flexShrink: 1,
                              color: "white",
                              fontSize: scale(11),
                              fontWeight: "700",
                              letterSpacing: -0.3,
                              fontVariant: ["tabular-nums"],
                            }}
                          >
                            {formatCount(stat.value)}
                          </Text>
                        </View>
                      </View>
                      { index !==2 && (
                        <View
                        className = "h-[90%] w-[1px] mx- 6 bg-gray-400 self-center rounded-full"
                        />
                      )}
                      </View>
                    ))}
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
                              code={entry.region}
                              size={scale(30)}
                          />
              </View>
         
        </View>
      


    </TouchableOpacity>
  );
};

export default ArenaCard;