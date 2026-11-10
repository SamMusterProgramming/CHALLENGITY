import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { router } from "expo-router";
import {
    useGlobalContext,
  } from "../../../../../../../context/GlobalProvider";

import CountryFlag
  from "../../../../../../common/CountryFlag";

import TalentIcon
  from "../../../../../../custom/TalentIcon";
import StagePortalIcon from "../../../../../../svgIcons/StagePortalIcon";
import { LinearGradient } from "expo-linear-gradient";
import { formatCount, talentAvatar } from "../../../../../../../helper";
import { countries } from "../../../../../../../utilities/TypeData";
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

const getThumbnail = (performance) => {
  return (
    performance?.thumbnail?.cdnUrl ||
    performance?.thumbnail?.publicUrl ||
    performance?.thumbnail?.url ||
    null
  );
};

const StageCard = ({ stage, isLast = false, onOpenStage  , width}) => {
  const { user, spacing, scale } = useGlobalContext();

  const [expanded, setExpanded] = useState(true);

  const currentUserId = normalizeId(user?._id);

  const contestants = Array.isArray(stage?.contestants)
    ? stage.contestants
    : [];

  const queue = Array.isArray(stage?.queue) ? stage.queue : [];

  const eliminations = Array.isArray(stage?.eliminations)
    ? stage.eliminations
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

  /*
   * ---------------------------------------------------------
   * CURRENT ROUND
   * ---------------------------------------------------------
   */

  const currentEdition = useMemo(() => {
    const editions = Array.isArray(stage?.editions)
      ? stage.editions
      : [];

    return (
      editions.find((edition) => edition?.status === "open") ||
      editions[editions.length - 1] ||
      null
    );
  }, [stage?.editions]);

  const round = currentEdition?.round ?? 1;

  /*
   * ---------------------------------------------------------
   * PERFORMANCE THUMBNAILS
   * ---------------------------------------------------------
   */

  const performances = participation.performances || [];

  const thumbnails = useMemo(() => {
    return performances
      .map(getThumbnail)
      .filter(Boolean)
      .slice(0, 2);
  }, [performances]);

  const remainingPerformances = Math.max(
    performances.length - thumbnails.length,
    0
  );

  /*
   * ---------------------------------------------------------
   * ACTIONS
   * ---------------------------------------------------------
   */

  const toggleExpanded = useCallback(() => {
    LayoutAnimation.configureNext(ANIMATION_CONFIG);
    setExpanded((previous) => !previous);
  }, []);

  const handleOpenStage = useCallback(() => {
    if (onOpenStage) {
      onOpenStage(stage);
      return;
    }

    router.push({
      pathname: "/stageProfile",
      params: {
        stage_id: normalizeId(stage?._id),
      },
    });
  }, [stage, onOpenStage]);

  const country = stage?.region || "DZ";

  return (
    <View
      style={{
        height: spacing(420),
        width :  width * 0.99,
        // borderRadius : scale(10)
      }}
      className="justify-start   items-center "
    >


      {/* =====================================================
          EXPANDED PERFORMANCE SECTION
      ===================================================== */}

      {expanded && (
        <View
          style={{
            paddingBottom: spacing(6),
          }}
          className="flex-1 p-2 rounded-t-3xl  border-l-2 border-r-2 border-t-2 border-[#252424] justify-center items-center bg-black  w-full"
        >
          {/* PERFORMANCE GRID */}
          {thumbnails.length > 0 ? (
            <View
              style={{
                gap: spacing(6),
                // paddingVertical : scale(2)
              }}
              className="flex-row w-full flex-1"
            >
              {thumbnails.map((thumbnail, index) => {
                const showMore =
                  index === thumbnails.length - 1 &&
                  remainingPerformances > 0;

                return (
                  <View
                    key={`${thumbnail}-${index}`}
                    style={{
                      flex: 1,
                    //   height: scale(200),
                      borderRadius: scale(7),
                      overflow: "hidden",
                    }}
                    className = "  bg-[#0D0C09]"
                  >
                    <Image
                      source={{
                        uri: thumbnail,
                      }}
                      style={{
                        // flex:1,
                        height : "86%"
                      }}
                      resizeMode="cover"
                      className="h- full w-full rounded-xl"
                    />

                    {showMore && (
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                        }}
                        className="items-center justify-center bg-black/60"
                      >
                        <Text
                          style={{
                            fontSize: scale(14),
                            letterSpacing: scale(0.5),
                          }}
                          className="font-bold text-[#F0D58A]"
                        >
                          +{remainingPerformances} MORE
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ) : (
     

            <Pressable
              className="items-center w-full h-full  justify-start"
              // onPress={() => router.push({
              //   pathname:
              //     "/arenaProfile",
              //   params: {
              //     arena_id:
              //       arena._id,
              //   },
              // })}
              style={{
                // flex:1,
                borderRadius: scale(10),
                borderWidth: scale(1),
                // borderColor: "rgba(255,255,255,0.06)",
                // backgroundColor: "rgba(255,255,255,0.09)",
              }}
             
            >
              <Image
                   source={{ uri: talentAvatar[stage.name.toLowerCase()]?.publicUrl }}
                  resizeMode="cover"
                  style={{
                    height : "86%"
                  }}
                  className="opacity-50  w-full rounded-xl"
               />
      
            </Pressable>
          )}

            <View className="bg-[gold]/60  items-center rounded-full absolute bot tom-0  justify-center"
                style={{
                  bottom :spacing(20) ,
                  padding : spacing(2),
                  zIndex :1002,
                }} >
                {/* <ArenaPortalIcon size={scale(30)} /> */}
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
                        {countries.find(c=> c.code == country)?.name}
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
                          {stage.name.toUpperCase()}
            </Text>

        </View>
      )}



        <View
          className="flex-row rounded-b-3xl border-x-2 border-b-2 border-[#252424]   justify-between w-full"
          style={{
                // marginTop: spacing(6),
                height : scale(125)
            }}
            >
              <View 
                style = {{
                  paddingVertical: spacing(8),
                  paddingHorizontal: spacing(8),
                  // height : scale(60),
                  // width : scale(60)
                }}
                className = "flex-row z-50 absolute top-0 left-2 justify-center items-center bg-[#202021] round ed-bl-[10px] rounded-full  gap -4" >
                    <TalentIcon talent={stage.name} size={scale(27)} color={"gold"}/>
              </View>


            {/* METRICS */}
             <View
              className = "flex-1  justify-start bg- [#202021] items-center">
                   
                  <Pressable
                    android_ripple={{
                      color: "rgba(232,185,90,0.06)",
                    }}
                    style={{
                        // paddingBottom: spacing(16),
                        // paddingHorizontal: spacing(12),
                        // marginBottom: spacing(8),
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
                                {stage?.name}Stage{country}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{
                              marginTop: spacing(12),
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
                            value: stage.contestants.length,
                            icon: "play-box-multiple-outline",
                          },
                          {
                            label: "ROUND",
                            value: round,
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
                className = "flex-row absolute top-0 right-2 justify-center items-center bg-[#202021]  rounded-full  gap -4" >
                    <CountryFlag
                        code={country}
                        size={scale(30)}
                    />
              </View>

         
        </View>

     
    </View>
  );
};

export default StageCard;