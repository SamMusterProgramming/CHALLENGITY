

import { Ionicons, MaterialCommunityIcons, } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { countries, stageCenterImages, stageIcons } from "../../../utilities/TypeData";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";

const StageCard = ({
  entry,
  width,
  height,
}) => {

  const {user , scale} = useGlobalContext()
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
    
        className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-[#000000]"
      >
        {imageUri ? (
          <>
          <Image
            source={{ uri: imageUri }}
            resizeMode="cover"
            className="absolute inset-0 h-full w-full opacity-80"
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
        width,
        height
      }}
      className="self-center gap-1 rounded-[5px] bg -[#202125] px- [14px] pb- [11px] pt- [13px] shadow-black/25"
    >
      {/* HEADER*/}

     <View className=" bg-[#1c1a1a] rounded-xl p-4 flex-row items-center borde r-t-[0.5px] bord er-l-[0.5px] bord er-r-[0.5px] bord er-[gold]/40 justify-between">
      
        <View className="flex-1 flex-row items-center">
      
          <View 
           style ={{
       
         }}
          className="p-2 items-center justify-center rounded-[5px] border border-yellow-500/20 bg-yellow-500/[0.09]">
            <MaterialCommunityIcons
              name="trophy"
              size={scale(24)}
              color="#EAB308"
            />
          </View>

     
          <View className="ml-[10px] flex-1">
            <Text
              numberOfLines={1}
              style = {{
                fontSize : scale(14)
              }}
              className="te xt-[17px] font-bold tracking-[0.1px] text-white"
            >
              {entry.name} Stage {' '} 
            </Text>

            <View className="mt-[7px] flex-row  items -end">
              <Text
                style = {{
                  fontSize : scale(10)
                }}
               className="ml-[3px]  mt-[1px] font-medium uppercase tracking-[0.4px] text-white/95">
                {entry.name} {''}
                
                <Text
                style = {{
                  fontSize : scale(10)
                }}>
                  {stageIcons[entry.name]} {" -  "} 
                </Text>
              </Text>

              <Text
              style = {{
                fontSize : scale(10)
              }}
               className="ml- [3px] te xt-[11px] mt-[1px] font-medium uppercase tracking-[0.4px] text-white/95">
                {countries.find(c => c.code == entry.region)?.name} {' '}
                {/* {'(' + entry.region + ')'}  */}
                {countries.find(c => c.code == entry.region)?.flag}
              </Text>
            </View>
          </View>
          <View className=" ml-auto b g-white/40 flex-row justify-center items-center">
                <Text
                style = {{
                  fontSize : scale(18)
                }}>
                  {stageIcons[entry.name]}
          </Text>
         </View>
        </View>

       

      </View>



      <View className=" mt-1 justify-center border- l-[0.5px] bor der-r-[0.5px] borde r-[gold]/40 flex-1 flex-row gap-[4] overfl ow-hidden">
        {visiblePerformances.map(
          renderPerformance
        )}

        {visiblePerformances.length === 0 && (
          <View
          style = {{
         
          }}
           className="flex-1 items-center justify-center rounded-[13px] border border-white/[0.06] bg-[#171717]">
            <Image
                source={stageCenterImages[entry.name]}
                resizeMode="cover"
                className="absolute opacity-30 inset-0 h-full w-full "
            />
           
          </View>
        )}
      </View>

      {/* FOOTER */}

       <View className="p-4 bg-[#1c1a1a] rounded-xl mt-1    flex-row ite ms-end justify-between">
     
          <View className="items-center p-1">
              <View className="flex-row items-center">
                <Ionicons
                  name="play"
                  size={scale(12)}
                  color="#EAB308"
                />
                <Text
                 style ={{
                  fontSize : scale(10)
                 }}
                 className="ml-[4px] text-[16px] font-bold text-white/85">
                {totalPerformances()}{"  "}
                </Text>
              </View>

              <Text 
              style = {{
                fontSize : scale(8)
              }}
              className="ml-[5px] mt-[4px] te xt-[9px] font-bold text-white/85">
                {totalPerformances === 1
                  ? "PERFORMANCE"
                  : "PERFORMANCES"}
              </Text>
          </View>
           
            <View className="items-center p-1">
              <View className="flex-row items-center">
                <Ionicons
                  name="people"
                  size={scale(12)}
                  color="gold"
                />

                <Text
                 style = {{
                  fontSize : scale(10)
                }}
                 className="ml-[4px] tex t-[16px] font-bold text-white/85">
                  {entry.contestants.length ?? 0}
                </Text>
              </View>

              <Text
              style = {{ fontSize : scale(8) }}
               className="mt-[4px] tex t-[9px] font-bold tracki ng-[0.8px] text-white/85">
                CONTESTANTS
              </Text>
            </View>

   
            <View className="items-center p-1">
            <View className="flex-row items-center">
                <Ionicons
                    name="layers"
                    size={scale(12)}
                    color="#EAB308"
                    />

                <Text 
                style = {{
                fontSize : scale(10)
                }}
                className="ml-[4px] text- [16px] font-bold tracking-[0.1px] text-white/85">
                {entry.likes ?? 0}
                </Text>
            </View>

            <Text
            style = {{
                fontSize : scale(8)
            }}
            className="mt-[4px] text- [9px] font-bold track ing-[0.8px] text-white/85">
                EDITION
            </Text>
            </View>

            <View className="items-center p-1">
                <View className="flex-row items-center">
                <Ionicons
                    name="sync-circle"
                    size={scale(12)}
                    color="#EAB308"
                    />

                    <Text 
                    style = {{
                    fontSize : scale(10)
                    }}
                    className="ml-[4px] text- [16px] font-bold tracking-[0.1px] text-white/85">
                    1
                    </Text>
                </View>

                <Text 
                style = {{
                    fontSize : scale(8)
                }}
                className="mt-[4px] text- [9px] font-bold trac king-[0.8px] text-white/85">
                    ELIMINATION
                </Text>
            </View>

        </View>

    </TouchableOpacity>
  );
};

export default StageCard;