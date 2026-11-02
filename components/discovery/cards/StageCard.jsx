

import { Ionicons, MaterialCommunityIcons, } from "@expo/vector-icons";
import React from "react";
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
import StagePortalIcon from "../../svgIcons/StagePortalIcon";
import SingingIcon from "../../svgIcons/talent/SingingIcon";
import DancingIcon from "../../svgIcons/talent/DancingIcon";
import MagicIcon from "../../svgIcons/talent/MagicIcon";
import MusicIcon from "../../svgIcons/talent/musicIcon";
import ComedyIcon from "../../svgIcons/talent/ComedyIcon";
import InstrumentalIcon from "../../svgIcons/talent/instrumentalIcon";
import CountryFlag from "../../common/CountryFlag";
import TalentIcon from "../../custom/TalentIcon";

const StageCard = ({
  entry,
  width = null,
  height,
}) => {

  const {user , scale ,getArenaPerformanceThumbnailHeight , spacing} = useGlobalContext()
  const performances = [...entry.contestants.map(c =>  {
       return c.performances[0]
  })]|| [];
  

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
          height :"95%"
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
            height : "95%"
          }}
           className="flex-1 items-center justify-center rounded-[13px] border border-white/[0.06] bg-[#171717]">
            <Image
                source={stageCenterImages[entry.name]}
                resizeMode="cover"
                className="absolute opacity-30 inset-0 h-full w-full "
            />
           
          </View>
        )}

            <View
                className="bg-[gold]/50 items-center rounded-full absolute bot tom-0  justify-center"
                style={{
                  bottom :-spacing(5) ,
                  padding : scale(3),
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


          {/* footer */}

           
       <View
            className="flex-row bg- [#161a20] rounded- b-[30px]  justify-between w-full"
            style={{
                height : scale(110)
            }}  >

             <View 
             style = {{
              paddingVertical: spacing(16),
              paddingHorizontal: spacing(12),
             }}
             className = "flex-row justify-center items-center bg-[#202021] rounded-bl-[10px] rounded-tr-full gap -4" >
           
                <View
                className="items-center justify-center"
                style={{
                   }}  >
                    <View
                    className="items-center  gap-4 justify-center"
                    style={{

                    }}  >
                      <TalentIcon talent={entry.name} size={scale(29)} color={"white"}/>
                      <Text
                          style={{
                          // marginTop: spacing(3),
                          color: "white",
                          fontSize: scale(9),
                          fontWeight: "800",
                          letterSpacing: scale(0.3),
                          }}  >
                          {entry.name.toUpperCase()}
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
                        paddingTop : spacing(28)
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
                                {entry?.name}Stage{entry.country}
                        </Text>

                        <Text
                          numberOfLines={1}
                          style={{
                            marginTop: spacing(14),
                            color: "#c0c0c0",
                            fontSize: scale(11),
                            lineHeight: spacing(12),
                            fontWeight: "500",
                          }}
                        >
                          {/* {entry.biography} */}the stage is heating up
                        </Text>

                      </View>

                    
                    </View>
                  </Pressable>

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
                                    fontSize: scale(10),
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

export default StageCard;