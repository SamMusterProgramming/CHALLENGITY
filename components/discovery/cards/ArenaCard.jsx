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
import { formatCount, talentAvatar } from "../../../helper";
import TalentIconSelector from "../../common/talentIconSelector";

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
      }}
      className="self-center  "
    >

    


      <View
      style ={{
        height : getArenaPerformanceThumbnailHeight() - scale(16),
        gap: spacing(6),
        paddingBottom: spacing(6),

      }}
      className=" p-1 rounded-t-3xl bg-black border-l-2 border-r-2 border-t-2 border-[#252424] justify-center    flex-row ">
      
      
        {/* {visiblePerformances.map(
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
          </View> */}

            <View
                  className="flex-row flex-1"
                  style={{
                    gap: spacing(6),
                    // paddingVertical: spacing(6),

                  }}  >
                    <Image
                        source={{ uri:  talentAvatar[entry.talentType.toLowerCase()]?.publicUrl}}
                        resizeMode="cover"
                        style={{
                          height : "100%"
                        }}
                        className="h- full w-full  rounded-xl"
                        />  
            </View>

            <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(0,0,0,0.04)",
              "rgba(0,0,0,0.34)",
              "#000",
            ]}
            locations={[0, 0.73, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />


       </View>


       <View
          className="flex-col rounded-b-3xl border-x-2 border-b-2 border-[#252424]  items-start justify-start w-full"
          style={{
              height : scale(145),
              paddingHorizontal : spacing(24)
          }}  >

            <View
                  style={{
                    // position: "absolute",
                    // bottom: -40,
                    // left: scale(15),
                    // right: scale(15),
                    // transform: [{ translateY: 38 }],
                    flexDirection: "row",
                    marginTop: -spacing(56),
                  //   alignItems: "flex- end",
                  }}
                >
                  <View
                    style={{
                      width: scale(90),
                      height: scale(90),
                      borderRadius: 26,
                      padding: 3,
                      backgroundColor: "#181713",
                      borderWidth: 1,
                      borderColor: "#B8943D",
                      overflow: "hidden",
                    }}
                  >
                    { entry?.profileImage ? (
                      <Image
                        source={{ uri: entry.profileImage.publicUrl }}
                        resizeMode="cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 22,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 22,
                          backgroundColor: "#222019",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="shield-star-outline"
                          size={42}
                          color={GOLD}
                        />
                      </View>
                    )}
                  </View>
          
                  {/* arena identity  */}
                  <View
                    style={{
                      // borderRadius: 26,
                      // padding: 3,
                      overflow: "hidden",
                      marginLeft : spacing(26)
                    }}
                    className = "items-start justify-between"
                        >

                      <Text
                        style={{
                          color: "#F5F3ED",
                          fontSize: scale(16),
                          // lineHeight: scale(33),
                          fontWeight: "900",
                          letterSpacing: -0.6,
                        }}
                      >
                        {entry?.arenaName || "Arena"}
                      </Text>

                      <View
                        style={{
                          paddingTop: 7,
                          // height: scale(80),
                        }}
                        className = "flex-row flex-1 items-end"
                        >
                          <View
                          className = "flex-col gap-3 items-center ">
                              <TalentIconSelector code={entry.talentType} size={scale(27)} />
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: scale(9),
                                  fontWeight: "600",
                                }}
                              >
                                {entry.talentType.toUpperCase() || "Talent type"}
                              </Text>
                          </View>
                          <View
                          className="justify-center h-full items-center">
                            <View
                            className ="mx-6 h-2 w-2 bg-[#c0c0c0] rounded-full "
                              />
                          </View>
                          <View
                          className = "flex-col gap-4 ml-3 items-center">
                              
                              <CountryFlag code={entry.region} size={scale(21)} />
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: scale(9),
                                  fontWeight: "600",
                                  letterSpacing : 2.8
                                }}
                              >
                                {entry.region || "US"}
                              </Text>
                          </View>
                      </View>


                  </View>

                </View>
               
               <View
               style = {{
                // marginTop: "auto",
                flex:1,
                marginBottom : spacing(16),
               }}
               className = "justify-end"
               >
                  <Text
                      numberOfLines={1}
                      style={{
                        color: "#fff",
                        fontSize: scale(11),
                        lineHeight: scale(22),
                      }}
                    >
                      {entry.biography.trim() ||
                        "Your biography will appear here. Introduce yourself and give visitors a sense of your arena."}
                  </Text>

                  <View
                  style = {{
                    marginTop : spacing(8),
                  }}
                    className = "  min-w -[90%] w-full rounded-xl border- [1px] sel f-start py-2  flex-row justify-start   "
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
                        value:entry.starCount,
                        icon: "star",
                      },
                    ].map((stat,index) => (
                      <View 
                       className = " flex-row flex-1 justify-start  between"
                       key={stat.label}>
                        <View
                        // key={stat.label}
                        className="flex-row flex-1 items-center gap-2 justify-between">
                      

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
                        className = "h-[90%] w-[1px] mr-[30%] bg-gray-400 self-center rounded-full"
                        />
                      )}
                      </View>
                    ))}
                  </View>



               </View>
               
        </View>
      


    </TouchableOpacity>
  );
};

export default ArenaCard;