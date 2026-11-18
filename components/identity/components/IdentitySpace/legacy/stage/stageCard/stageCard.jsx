import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
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
import TalentIconSelector from "../../../../../../common/talentIconSelector";
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

const getstageUserId = (stage) => {
  if (stage === null || stage === undefined) return "";

  if (typeof stage === "string" || typeof stage === "number") {
    return normalizeId(stage);
  }

  return normalizeId(
    stage?.user_id ??
      stage?.userId ??
      stage?.user?.id ??
      stage?.user?._id ??
      stage?._id
  );
};

const getstagePerformances = (stage) => {
  if (!stage || typeof stage !== "object") return [];

  if (Array.isArray(stage.performances)) {
    return stage.performances;
  }

  if (Array.isArray(stage.performance)) {
    return stage.performance;
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

const StageCard = ({
  stage,
  width = null,
  height,
}) => {

  const {user , scale ,getArenaPerformanceThumbnailHeight , spacing} = useGlobalContext()
  
  const performances = [...stage.contestants.map(c =>  {
       return c.performances[0]
  })]|| [];

  const currentUserId = user?._id;

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
      (stage) => getstageUserId(stage) === currentUserId
    );

    if (contestant) {
      return {
        type: "contestant",
        status: "ON STAGE",
        stage: contestant,
        performances: getstagePerformances(contestant),
        rank: contestant?.rank ?? null,
      };
    }

    const queued = queue.find(
      (stage) => getstageUserId(stage) === currentUserId
    );

    if (queued) {
      return {
        type: "queue",
        status: "IN QUEUE",
        stage: queued,
        performances: getstagePerformances(queued),
        rank: null,
      };
    }

    const eliminated = eliminations.find(
      (stage) => getstageUserId(stage) === currentUserId
    );

    if (eliminated) {
      return {
        type: "eliminated",
        status: "ELIMINATED",
        stage: eliminated,
        performances: getstagePerformances(eliminated),
        rank: eliminated?.rank ?? null,
      };
    }

    return {
      type: null,
      status: null,
      stage: null,
      performances: [],
      rank: null,
    };
  }, [
    contestants,
    queue,
    eliminations,
    currentUserId,
  ]);


  
  const participantThumbnail1 = participation.status == "ON STAGE" ? participation.stage.performances[0]?.thumbnail.publicUrl
                                : contestants.length > 0 ? contestants[0]?.performances[0]?.thumbnail.publicUrl//user?.profileImage?.publicUrl || user.profileImage.publicUrl
                                : arenaProfileAvatar[stage.talentType.toLowerCase()]?.publicUrl

  const participantThumbnail2 = participation.status == "ON STAGE" && participation.rank == 1 ? contestants[1]?.performances[0].thumbnail.publicUrl     
                                : participation.status == "ON STAGE" && participation.rank == 2 ? contestants[0]?.performances[0].thumbnail.publicUrl
                                : contestants[1]?.performances[0].thumbnail.publicUrl

  const participantProfile1 =  participation.status == "ON STAGE" ? user.profileImage.publicUrl 
                              : contestants.length > 0 ? contestants[0]?.user?.profileImage?.publicUrl 
                              : null

  const participantProfile2 = contestants[1]?.user?.profileImage?.publicUrl || null

  

  const totalPerformances = () => {
    let total = 0 ;
    stage.contestants.map(c => {
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

  const stageProfileImage = participation.status ? user.profileImage.publicUrl :
                            stage.contestants.length > 0 ?  stage.contestants[0].profileImage?.publicUrl :
                            arenaProfileAvatar[stage.talentType.toLowerCase()]?.publicUrl

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
    statusConfig[stage.status] ||
    statusConfig["On Stage"];

 
  const hasRank =
    stage.rank !== undefined &&
    stage.rank !== null &&
    stage.rank > 0;

  const isWinner = stage.rank === 1;

  const selectedContestant =  stage.contestants?.find(c => c.user_id === user?._id) ||
                              stage.contestants[0] || null

  

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
          `${stage._id}_${index}`
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
            className="absolute rounded-xl inset-0 h-full w-full opacity-80"
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
            region: stage.region,
            selectedTalent: stage.name,
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
        height :getArenaPerformanceThumbnailHeight() - scale(30),
        gap: spacing(6),
        paddingBottom: spacing(6),
      }}
       className=" p-1 rounded-t-3xl bg-black border-l-2 border-r-2 border-t-2 border-[#252424] justify-center flex -1 flex-row  ">
       


        {/* {visiblePerformances.map(
          renderPerformance
        )}

        {visiblePerformances.length === 0 && (
          <View
          style = {{
            height : "86%"
          }}
           className="flex-1 items-center justify-center rounded-[13px] border border-white/[0.06] b g-[#171717]">
             <Image
                   source={{ uri: talentAvatar[stage.talentType.toLowerCase()]?.publicUrl }}
                  resizeMode="contain"
                  style={{
                    height : "100%"
                  }}
                  className="opacity-80  w-full rounded-xl"
               />
           
          </View>
        )} */}

          <View
                  className="flex-row flex-1"
                  style={{
                    gap: spacing(6),
                    // paddingVertical: spacing(6),

                  }}  >
                    <Image
                        source={{ uri:  talentAvatar[stage.talentType.toLowerCase()]?.publicUrl}}
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
              "rgba(0,0,0,0.14)",
              "rgba(0,0,0,0.34)",
              "#000",
            ]}
            locations={[0, 0.63, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />

       

      </View>


          {/* footer */}


        <View
          className="flex-col  rounded-b-3xl border-x-2 border-b-2 border-[#252424]  items-start justify-start w-full"
          style={{
              height : scale(175),
              paddingHorizontal : spacing(16)
          }}  >

            <View
                  style={{
                    flexDirection: "row",
                    marginTop: -spacing(66),
                    gap : spacing(4)
                  }}
                >
                  <View
                    style={{
                      width: scale(80),
                      height: scale(120),
                      borderRadius: 8,
                      padding: 1,
                      backgroundColor: "#181713",
                      borderWidth: 1,
                      // borderColor: "#B8943D",
                      overflow: "hidden",
                    }} 
                    // className = "z-0" 
                    >
                      { participantThumbnail1 && (
                        <Image
                          source={{ uri: participantThumbnail1 }}
                          resizeMode="cover"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 8,
                          }}
                          className = "opacity-65"
                        />
                      ) }
                  
                    
                  </View>

                  { participantThumbnail2 && (
                  <View
                    style={{
                      width: scale(80),
                      height: scale(120),
                      borderRadius: 8,
                      padding: 1,
                      backgroundColor: "#181713",
                      borderWidth: 1,
                      // borderColor: "#B8943D",
                      overflow: "hidden",
                    }}
                    className = "opacity-65"
                  >
                      <Image
                        source={{ uri: participantThumbnail2 }}
                        resizeMode="cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 8,
                        }}
                      />
                  
                  </View>
                  ) }
          
                  {/* arena identity  */}
                  <View
                    style={{
                      // borderRadius: 26,
                      // padding: 3,
                      overflow: "hidden",
                      marginLeft : spacing(16)
                    }}
                    className = "items-center flex-1 justify-between"
                        >

                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#F5F3ED",
                          fontSize: scale(14),
                          // lineHeight: scale(33),
                          fontWeight: "900",
                          letterSpacing: -0.6,
                        }}
                      >
                        {stage?.name || "Stage"}
                      </Text>

                      <View
                        style={{
                          paddingTop: 7,
                          // height: scale(80),
                        }}
                        className = "flex-row justify-center  flex-1 items-end"
                        >
                          <View
                          className = "flex-col gap-3 items-center ">
                              <TalentIconSelector code={stage.talentType} size={scale(43)} />
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: scale(9),
                                  fontWeight: "600",
                                }}
                              >
                                {stage.talentType.toUpperCase() || "Talent type"}
                              </Text>
                          </View>
                          <View
                          className="justify-center  h-full items-center">
                            <View
                            className ="mx-4  h-2 w-2 bg-[#c0c0c0] rounded-full "
                              />
                          </View>
                          <View
                          className = "flex-col gap-4 ml-3 items-center">
                              
                              <CountryFlag code={stage.region} size={scale(35)} />
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: scale(9),
                                  fontWeight: "600",
                                  letterSpacing : 2.8
                                }}
                              >
                                {stage.region || "US"}
                              </Text>
                          </View>
                      </View>


                  </View>

                </View>

                <View
                style = {{
                  marginTop : spacing(16),
                  gap : spacing(6)
                 }}
                className = "flex-row gap -4" >
                       {participantProfile1 ? ( 
                        <View
                          style = {{
                            width : scale(78),
                            paddingVertical : scale(8)
                          }}
                          className = " flex-row border  border-[gold]/25 rounded-3xl justify-center items-end gap-3" >
                              <Image
                                  source={{ uri: participantProfile1 }}
                                  resizeMode="cover"
                                  style={{
                                    width: scale(25),
                                    height: scale(25),
                                  }}
                                  className = " z-50 rounded-full"
                                />
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: "gold",
                                    fontSize: scale(11),
                                    // lineHeight: scale(33),
                                    fontWeight: "600",
                                    letterSpacing: -0.6,
                                  }}
                                >
                                #{''} {participation.status ? participation.rank : 1}
                                </Text>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: "white",
                                    fontSize: scale(8),
                                    // lineHeight: scale(33),
                                    fontWeight: "600",
                                    letterSpacing: -0.6,
                                  }}
                                  className = "absolute top-2 right-5"
                                >
                                 {participation.status && "YOU"}
                                </Text>
                          </View>
                          ):(
                            <View
                            style = {{
                              // width : scale(78),
                              paddingVertical : scale(12)
                            }}
                            className = " flex-row flex-1 border  border-[gold]/25 rounded-3xl justify-center items-end gap-2" >
                             <Text
                                numberOfLines={2}
                                style={{
                                  color: "#D8CBB2",
                                  fontSize: scale(10),
                                  lineHeight: scale(16),
                                  fontWeight: "500",
                                  letterSpacing: 0,
                                }}
                                  >
                                No contestants yet. Be the first to showcase your talent!
                              </Text>
                            </View>
                          )}

                          {participantProfile2  && (
                          <View
                          style = {{
                            // bottom : -spacing(15),
                            // left:4,
                            width : scale(78),
                            paddingVertical : scale(8)
                          }}
                          className = " flex-row border  border-[gold]/25 rounded-3xl justify-center items-end gap-3" >
                              <Image
                                  source={{ uri: participantProfile2 }}
                                  resizeMode="cover"
                                  style={{
                                    width: scale(25),
                                    height: scale(25),
                                  }}
                                  className = " z-50 rounded-full"
                                />
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: "gold",
                                    fontSize: scale(11),
                                    // lineHeight: scale(33),
                                    fontWeight: "600",
                                    letterSpacing: -0.6,
                                  }}
                                >
                                # {participation .status && participation.rank == 2 ? "1" : "2"}  
                                </Text>
                          </View>
                          )}

                         {contestants.length > 2 && (
                          <View
                          style = {{
                            // bottom : -spacing(15),
                            // left:4,
                            // width : scale(76),
                            paddingVertical : scale(8)
                          }}
                          className = " flex-row border flex-1 border-[gold]/25 rounded-3xl justify-center items-center gap-2" >
                              {/* <Image
                                  source={{ uri: participantProfile2 }}
                                  resizeMode="cover"
                                  style={{
                                    width: scale(25),
                                    height: scale(25),
                                  }}
                                  className = " z-50 rounded-full"
                                /> */}
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: "gold",
                                    fontSize: scale(12),
                                    // lineHeight: scale(33),
                                    fontWeight: "600",
                                    letterSpacing: -0.6,
                                  }}
                                >
                                + {' '} {contestants.length-2} {' '} Contestants
                                </Text>
                          </View>
                          )}
                </View>
               
               <View
               style = {{
                // marginTop: "auto",
                flex:1,
                marginBottom : spacing(16),
               }}
               className = "justify-end "
               >
                  {/* <Text
                      numberOfLines={1}
                      style={{
                        color: "#fff",
                        fontSize: scale(11),
                        lineHeight: scale(22),
                      }}
                    >
                      {stage.biography.trim() ||
                        "Your biography will appear here. Introduce yourself and give visitors a sense of your arena."}
                  </Text> */}

                  <View
                  style = {{
                    marginTop : spacing(8),
                  }}
                    className = "  min-w -[90%] w-full rounded-xl border- [1px] sel f-start py-2  flex-row justify-start   "
                      >
                    {[
                          {
                            label: "ON STAGE",
                            value: stage.contestants.length,
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
                             className = "h-[90%] w-[1px] mr-[20%] bg-gray-400 self-center rounded-full"
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

export default StageCard;