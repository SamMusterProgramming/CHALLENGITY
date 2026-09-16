

import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { countries, stageIcons } from "../../../utilities/TypeData";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";

const StageJourneyCard = ({
  entry,
  width,
  height,
}) => {
   
  const{user , scale} = useGlobalContext()
  const performances = entry.performances || [];

  const sortedPerformances = useMemo(() => {
    return [...performances].sort(
      (a, b) =>
        new Date(b?.date || b?.createdAt || 0).getTime() -
        new Date(a?.date || a?.createdAt || 0).getTime()
    );
  }, [performances]);

 
  const visiblePerformances =
    sortedPerformances.slice(0, 2);

  const remainingCount = Math.max(
    sortedPerformances.length - 2,
    0
  );

  /*
   * =========================================================
   * MEDIA
   * =========================================================
   */

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



  const renderPerformance = (
    performance,
    index
  ) => {
    const imageUri =
      getMediaUrl(performance?.thumbnail) ||
      getMediaUrl(performance?.video);

    const isLastVisible = index === 1 &&  remainingCount > 0;

    return (
      <View
        key={
          performance?._id?.toString() ||
          `${entry._id}_${index}`
        }
        activeOpacity={0.9}
    
        style ={{
          // height
        }}
        className="relative flex-1 overflow-hidden rounded-[5px] bo rder borde r-white/[0.07] bg-[#131111]"
      >
        {imageUri ? (
          <>
          <Image
            source={{ uri: imageUri }}
            resizeMode="cover"
            className="absolute rounded-xl inset-0 h-full w-full opaci ty-60"
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

       
        {!isLastVisible && (
          <View className="absolute bottom-[7px] left-[7px] h-[22px] w-[22px] items-center justify-center rounded-full bg-black/55">
            <Text className="text-[9px] font-bold text-white/90">
              {index + 1}
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
              region: entry.stage.region,
              selectedTalent: entry.stage.name,
              // selectedIcon: getIcon(userTalent.name),
              // regionIcon: getIcon(userTalent.region),
              startIntroduction: "true",
              showGo: "true",
              location: "contest",
              contestant_id: user?._id || entry.contestants[0]._id || null,
              startPlayer : "true"
            },
          })
        
      }
      style={{
        width,
        height,
      }}
      className="self-center gap-1 rounded-[5px] bg -[#202125] px- [14px] pb- [11px] pt- [13px] shadow-black/25"
    >
   

      <View className=" bg-[#1c1a1a] rounded-xl px -3 p-4 flex-row items-center borde r-t-[0.5px] bord er-l-[0.5px] bord er-r-[0.5px] bord er-[gold]/40 justify-between">
     
        <View className="flex-1  flex-row items-center">
      
          <View
          style ={{
            // width : width /10 ,
            // height :width/10
         }}
           className=" items-center p-2 justify-center rounded-[5px] border border-yellow-500/20 bg-yellow-500/[0.09]">
            <Ionicons
              name="trophy"
              size={scale(24)}
              color="#EAB308"
            />
          </View>

          <View className="ml-[10px]  flex-1">
            <Text
              numberOfLines={1}
              style = {{
                fontSize : scale(14)
              }}
              className="te xt-[17px] font-bold tracking-[0.1px] text-white"
            >
              {entry.stageName} Stage {' '} 
            </Text>

            <View className="mt-[7px] flex-row  items -end">
            
            <Text
                style = {{
                  fontSize : scale(10)
                }}
               className="ml- [3px] te xt-[11px] mt-[1px] uppercase font-medium tracking-[0.4px] text-white/95">
                {entry.stageName} {''}
                
                <Text
                style = {{
                  fontSize : scale(10)
                }}>
                  {stageIcons[entry.stageName]} {" -  "} 
                </Text>
              </Text>

              <Text
              style = {{
                fontSize : scale(10)
              }}
               className="ml- [3px] te xt-[11px] mt-[1px] uppercase font-medium tracking-[0.4px] text-white/95">
                {countries.find(c => c.code == entry.region)?.name} {' '}
                {/* {'(' + entry.region + ')'}  */}
                {countries.find(c => c.code == entry.region)?.flag}
              </Text>
            </View>
          </View>
        </View>

  
        <View className="items-center  ">
      
          {hasRank && (
            <View className="mb- [4px]  flex-row items-center justify-between">
              <Text 
              style = {{
                fontSize : scale(10)
              }}
              className="tex t-[12px] mr -4 font-extrabold text-yellow-500">
               {entry.rank < 4 ? "TOP" : "Rank"}  {''} {entry.rank}
              </Text>

            </View>
          )}

    
          <View
            className={`h- [23px] p-1 mt-2 flex-row items-center rounded-md border  ${status.badgeClass}`}
          >
            <Ionicons
              name={status.icon}
              size={scale(10)}
              color="#FFFFFF"
            />

            <Text
            style = {{
              fontSize : scale(8)
            }}
             className="ml-[4px]  font-extrabold tracking-[0.7px] text-white/80">
              {status.label}
            </Text>
          </View>
        </View>
      </View>


      <View className=" mt-1 justify-center border- l-[0.5px] border -r-[0.5px] bord er-[gold]/40 flex-1 flex-row gap-[7px] overfl ow-hidden">
        {visiblePerformances.map(
          renderPerformance
        )}

     
        {visiblePerformances.length === 0 && (
          <View className="flex-1 items-center justify-center rounded-[13px] border border-white/[0.06] bg-[#171717]">
            <Ionicons
              name="videocam-outline"
              size={28}
              color="rgba(255,255,255,0.35)"
            />

            <Text className="mt-[5px] text-[10px] font-medium text-white/40">
              No performances yet
            </Text>
          </View>
        )}
      </View>

  

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
                {performances.length}{"  "}
                </Text>
              </View>

              <Text 
              style = {{
                fontSize : scale(8)
              }}
              className="ml-[5px] mt-[4px] te xt-[9px] font-bold text-white/85">
                {performances.length === 1
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
                  {entry.stage.contestantCount ?? 0}
                </Text>
              </View>

              <Text
              style = {{
                fontSize : scale(8)
              }}
               className="mt-[4px] tex t-[9px] font-bold tracki ng-[0.8px] text-white/85">
                CONTESTANTS
              </Text>
            </View>

        {/* Votes */}
        <View className="items-center  p-1">
          <View className="flex-row items-center">
            <Ionicons
              name="trophy"
              size={scale(12)}
              color="#EAB308"
            />

            <Text 
             style = {{
              fontSize : scale(10)
            }}
            className="ml-[4px] text- [16px] font-bold tracking-[0.1px] text-white/85">
              {entry.votes ?? 0}
            </Text>
          </View>

          <Text 
           style = {{
            fontSize : scale(8)
          }}
          className="mt-[4px] text- [9px] font-bold trac king-[0.8px] text-white/85">
            VOTES
          </Text>
        </View>

        </View>
    </TouchableOpacity>
  );
};

export default StageJourneyCard;