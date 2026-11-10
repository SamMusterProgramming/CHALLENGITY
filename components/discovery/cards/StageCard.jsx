

import { Ionicons, MaterialCommunityIcons, } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { countries, stageCenterImages, stageIcons } from "../../../utilities/TypeData";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import CountryFlag from "../../common/CountryFlag";
import TalentIcon from "../../custom/TalentIcon";
import { formatCount, talentAvatar } from "../../../helper";

const normalizeId = (value) => {
  if (value === null || value === undefined) return "";
  return value?.toString?.() ?? String(value);
};

const getEntryUserId = (entry) => {
  if (entry === null || entry === undefined) return "";

  if (typeof entry === "string" || typeof entry === "number") {
    return normalizeId(entry);
  }

  return normalizeId(
    entry?.user_id ??
      entry?.userId ??
      entry?.user?.id ??
      entry?.user?._id ??
      entry?._id
  );
};

const getEntryPerformances = (entry) => {
  if (!entry || typeof entry !== "object") return [];

  if (Array.isArray(entry.performances)) {
    return entry.performances;
  }

  if (Array.isArray(entry.performance)) {
    return entry.performance;
  }

  return [];
};


const StageCard = ({
  entry,
  width = null,
  height,
}) => {

  const {user , scale ,getArenaPerformanceThumbnailHeight , spacing} = useGlobalContext()
  const performances = [...entry.contestants.map(c =>  {
       return c.performances[0]
  })]|| [];


  const currentUserId = user?._id;

  const contestants = Array.isArray(entry?.contestants)
    ? entry.contestants
    : [];

  const queue = Array.isArray(entry?.queue) ? entry.queue : [];

  const eliminations = Array.isArray(entry?.eliminations)
    ? entry.eliminations
    : [];

  /*
   * ---------------------------------------------------------
   * USER PARTICIPATION
   * ---------------------------------------------------------
   */

  const participation = useMemo(() => {
    const contestant = contestants.find(
      (entry) => getEntryUserId(entry) === currentUserId
    );

    if (contestant) {
      return {
        type: "contestant",
        status: "ON STAGE",
        entry: contestant,
        performances: getEntryPerformances(contestant),
        rank: contestant?.rank ?? null,
      };
    }

    const queued = queue.find(
      (entry) => getEntryUserId(entry) === currentUserId
    );

    if (queued) {
      return {
        type: "queue",
        status: "IN QUEUE",
        entry: queued,
        performances: getEntryPerformances(queued),
        rank: null,
      };
    }

    const eliminated = eliminations.find(
      (entry) => getEntryUserId(entry) === currentUserId
    );

    if (eliminated) {
      return {
        type: "eliminated",
        status: "ELIMINATED",
        entry: eliminated,
        performances: getEntryPerformances(eliminated),
        rank: eliminated?.rank ?? null,
      };
    }

    return {
      type: null,
      status: null,
      entry: null,
      performances: [],
      rank: null,
    };
  }, [
    contestants,
    queue,
    eliminations,
    currentUserId,
  ]);

  

  const totalPerformances = () => {
    let total = 0 ;
    entry.contestants.map(c => {
     total = total + c.performances.length
  }) 
  return total
} 
 


  const visiblePerformances =
    performances.slice(0, 2);

  const remainingCount = Math.max(
    performances.length - 2,
    0
  );

  const getMediaUrl = (media) => {
    if (!media) {
      return null;
    }

    if (typeof media === "string") {
      return media;
    }

    return (
      media?.publicUrl ||
      media?.url ||
      media?.uri ||
      media?.secure_url ||
      null
    );
  };


  const statusConfig = {
    "On Stage": {
      icon: "mic",
      label: "ON STAGE",
      badgeClass:
        "bg-green-500/15 border-green-500/20",
    },

    "In Queue": {
      icon: "time-outline",
      label: "IN QUEUE",
      badgeClass:
        "bg-yellow-500/15 border-yellow-500/20",
    },

    Eliminated: {
      icon: "close-circle",
      label: "ELIMINATED",
      badgeClass:
        "bg-red-500/15 border-red-500/20",
    },
  };

  const status =
    statusConfig[entry.status] ||
    statusConfig["On Stage"];

 
  const hasRank =
    entry.rank !== undefined &&
    entry.rank !== null &&
    entry.rank > 0;

  const isWinner = entry.rank === 1;

  const selectedContestant =  entry.contestants?.find(c => c.user_id === user?._id) ||
                              entry.contestants[0] || null

  const renderPerformance = (
    performance,
    index
  ) => {
    const imageUri =
      getMediaUrl(performance?.thumbnail) ||
      getMediaUrl(performance?.video);

    const isLastVisible =
      index === 1 &&
      remainingCount > 0;

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
            source={{ uri: imageUri }}
            resizeMode="cover"
            className="absolute rounded-3xl inset-0 h-full w-full opacity-80"
          />
          </>
        ) : (
          <View className="flex-1 items-center justify-center bg-[#121111]">
            <Ionicons
              name="videocam-outline"
              size={28}
              color="rgba(255,255,255,0.35)"
            />
          </View>
        )}

   
        {isLastVisible && (
          <View className="absolute inset-0 items-center justify-center bg-black/55">
            <Text className="text-[25px] font-extrabold tracking-[-0.5px] text-white">
              +{remainingCount}
            </Text>

            <Text className="mt-[1px] text-[8px] font-extrabold tracking-[1px] text-yellow-500">
              MORE
            </Text>
          </View>
        )}

      
      </View>
    );
  };

  
  return (
    <TouchableOpacity
      activeOpacity={0.94}
      onPress={() => 
        router.push({
        pathname: "TalentContestRoom",
        params: {
            region: entry.region,
            selectedTalent: entry.name,
            startIntroduction: "false",
            showGo: "true",
            location: "contest",
            contestant_id: selectedContestant?._id || null,
            startPlayer : "true"
        },
        })
      }
      style={{
        width ,
      }}
      className="self-center  rounded -[5px] bg -[#202125]  sha dow-black/25" >

      <View
      style ={{
        height :getArenaPerformanceThumbnailHeight(),
        gap: spacing(6),
        paddingBottom: spacing(6),
      }}
       className=" p-1 rounded-t-3xl bg-black border-l-2 border-r-2 border-t-2 border-[#252424] justify-center flex -1 flex-row  ">
        {visiblePerformances.map(
          renderPerformance
        )}

        {visiblePerformances.length === 0 && (
          <View
          style = {{
            height : "86%"
          }}
           className="flex-1 items-center justify-center rounded-[13px] border border-white/[0.06] bg-[#171717]">
             <Image
                   source={{ uri: talentAvatar[entry.name.toLowerCase()]?.publicUrl }}
                  resizeMode="cover"
                  style={{
                    height : "86%"
                  }}
                  className="opacity-50  w-full rounded-xl"
               />
           
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
              source={{ uri: user.profileImage.publicUrl }}
              resizeMode="cover"
              style={{
                width: scale(90),
                height: scale(90),
              }}
              className ="rounded-full"
            />
          </View>

          <Text
                className = "absolute bottom-4 right-4 uppercase"
                style={{
                // marginTop: spacing(3),
                  color: "#c0c0c0",
                  fontSize: scale(9),
                  fontWeight: "700",
                  // letterSpacing: scale(0.3),
                  
                }}  >
                        {countries.find(c=> c.code == entry.region)?.name}
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
               {entry.name.toUpperCase()}
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
                      <TalentIcon talent={entry.name}  size={scale(27)} color={"gold"}/>
            </View>


             {/* METRICS */}
             <View
              className = "flex-1  justify-start bg- [#202021] items-center">
                   
                  <Pressable
                    android_ripple={{
                      color: "rgba(232,185,90,0.06)",
                    }}
                    style={{
                        
                        // marginBottom: spacing(4),
                      }}
                      className = "justify-end b g-black  flex-1  bg- black items-center"                      >
                       <View
                        style={{
                          // marginBottom: spacing(4),
                          paddingBottom : scale(4)
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
                                {entry?.name}Stage{entry.region}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{
                              marginTop: spacing(16),
                              color: "rgba(255,255,255,0.92)",
                              fontSize: scale(10),
                              lineHeight: spacing(12),
                              fontWeight: "500",
                            }}
                          >
                          {participation.status}   {/* {biography} */}.  {' '}
                            <Text
                                style={{
                                fontSize: scale(10),
                                marginTop: spacing(1),
                                letterSpacing: scale(0.2),
                                }}
                                className="uppercase font-bold text-[#b9b7b2]"  >
                                Rank {' '}
                                <Text
                                    style={{
                                    fontSize: scale(10),
                                    }}
                                    className="font-semibold text-[#E8B95A]"  >
                                    {participation.rank
                                    ? `#${participation.rank}`
                                    : "—"}
                                </Text>
                            </Text>
                          </Text>
                      </View>

                       {/* Statistics */}
      
                      <View
                      className = "  min-w-[90%] rounded-xl mb-4 border-[1px] self-center py-3 px-4 b g-[gold]/5  bor der-[gold]/20 flex-row justify-between   "
                      >
                        {[
                          {
                            label: "ON STAGE",
                            value: entry.contestants.length,
                            icon: "play-box-multiple-outline",
                          },
                          {
                            label: "ROUND",
                            value: 1,
                            icon: "account-group-outline",
                          },
                          {
                            label: "STARS",
                            value: 6,
                            icon: "star",
                          },
                        ].map((stat,index) => (
                          <View 
                          className = " flex-row flex-1 justify-center"
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
                               <Text
                                  numberOfLines={1}
                                  style={{
                                    color: "#F4F4F2",
                                    fontSize: scale(8.5),
                                    // lineHeight: spacing(16),
                                    fontWeight: "500",
                                    // letterSpacing: scale(0.25),
                                  }}  >
                                      {stat.label}
                                </Text>
                              </View>
                          
                              <Text
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                minimumFontScale={0.8}
                                style={{
                                  flexShrink: 1,
                                  color: "white",
                                  fontSize: scale(10),
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

export default StageCard;