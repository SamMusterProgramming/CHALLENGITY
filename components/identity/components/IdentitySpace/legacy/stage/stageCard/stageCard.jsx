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
                        height : "95%"
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
            <View
              style={{
                height: scale(90),
                borderRadius: scale(7),
              }}
              className="items-center justify-center border border-[#E8B95A]/10 bg-[#0D0C09]"
            >
              <StagePortalIcon size={scale(25)} />

              <Text
                style={{
                  fontSize: scale(9),
                  marginTop: spacing(6),
                  letterSpacing: scale(0.5),
                }}
                className="uppercase text-[#70695C]"
              >
                No performances yet
              </Text>
            </View>
          )}

            <View
                className="bg-[gold]/60  items-center rounded-full absolute bot tom-0  justify-center"
                style={{
                  bottom :-spacing(5) ,
                  padding : spacing(4),
                  zIndex :1002,
            
                }}  >
                {/* <ArenaPortalIcon size={scale(30)} /> */}
                <Image
                source={{ uri: user.profileImage.publicUrl }}
                resizeMode="cover"
                style={{
                  width: scale(70),
                  height: scale(70),
                }}
                className ="rounded-full"
              />
            </View>

        </View>
      )}



        <View
            className="flex-row bg- [#161a20] rounded- b-[30px]  justify-between w-full"
            style={{
                // marginTop: spacing(6),
                height : scale(110)
            }}
            >
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
                      <TalentIcon talent={stage?.name} size={scale(29)} color={"white"}/>
                      <Text
                          style={{
                          // marginTop: spacing(3),
                          color: "white",
                          fontSize: scale(9),
                          fontWeight: "800",
                          letterSpacing: scale(0.3),
                          }}  >
                          {stage?.name.toUpperCase()}
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
                                {stage?.name}Stage{country}
                          </Text>

                        <Text
                          numberOfLines={1}
                          style={{
                            marginTop: spacing(14),
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
                              contestant
                            </Text>
                            <Text
                                style={{
                                // marginLeft: spacing(4),
                                fontSize: scale(10),
                                color: "gold",
                                fontWeight: "700",
                                }}     >
                               {contestants.length}
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
                                  Round
                            </Text>
                            <Text
                                style={{
                                // marginLeft: spacing(4),
                                fontSize: scale(10),
                                color: "#E8B95A",
                                fontWeight: "700",
                                }}
                            >
                                {round}
                            </Text>
                      </View> */}
                      <View
                          className="bg- [black]/70 border-b-2 border-b-goldSoft/50 items-center  absolute   justify-center"
                          style={{
                            top :  -scale(4) ,
                            left:  -scale(8),
                            paddingVertical : scale(3),
                            zIndex :1002,
                          }}   >
                            <Text
                                    className = "text-goldSoft/90"
                                    style={{
                                    fontSize: scale(8),
                                    fontWeight: "800",
                                    letterSpacing: scale(0.3),
                                    }}  >
                                  STAGE
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
                            code={country}
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
                            {country}
                        </Text>
                    </View>
                </View>

            </View>
        </View>

     
    </View>
  );
};

export default StageCard;