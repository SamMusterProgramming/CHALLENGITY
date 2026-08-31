import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { countries, stageIcons } from "../../utilities/TypeData";
import { router } from "expo-router";

const ArenaJourneyCard = ({
  entry,
  width,
  height,
  onPress,
  onPerformancePress,
}) => {
  if (!entry) {
    return null;
  }

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
        }}
        className="rela tive flex-1 overflow-hidden rounded-[5px] border border-white/[0.07] bg-[#000000]"
      >
  
        {imageUri ? (
          <>
          <Image
            source={{
              uri: imageUri,
            }}
            className="absolute inset-0 h- full w- full"
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

        {!isLastVisible && (
          <View className="absolute left-[7px] top-[7px] h-[22px] w-[22px] items-center justify-center rounded-full bg-black/55">
            <Text className="text-[9px] font-bold text-white/90">
              {index + 1}
            </Text>
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

          <View className="absolute inset-x-2 bg-black/55 bottom-2 rounded-lg">
            <View className="flex-row w-full items-center justify-between p-2 ">

              <View className="mr-[7px] flex-row items-center">
                <MaterialCommunityIcons
                  name="fire"
                  size={15}
                  color="#EAB308"
                />

                <Text
                style = {{
                  fontSize : width/38
                }}
                 className="ml-[3px] t ext-[8px] font-semibold text-white/85">
                  {formatNumber(
                    performance?.fireCount
                  )}
                </Text>
              </View>

              <View className="mr-[7px] flex-row items-center">
                <Ionicons
                  name="eye"
                  size={15}
                  color="#EAB308"
                />

                <Text
                style = {{
                  fontSize : width/38
                }}
                 className="ml-[3px] text -[8px] font-semibold text-white/85">
                  {formatNumber(
                    performance?.viewCount
                  )}
                </Text>
              </View>

            </View>
          </View>
        {/* )} */}
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
            "/arenaDisplayer",
          params: {
            arena_id:
              entry._id,
          },
        })
      }
      
      style={{
        width,
        height,
      }}
      className="self-center gap-1 overflow-hidden rounded-[5px] b g-[#181818] px- [14px] pb- [11px] pt- [13px]"
    >

      <View className="rounded-t-[5px] bg-[#000000] p-4 flex-row items-center border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-[gold]/40 justify-between">

        <View className="fle x-1 flex-row items-center">
          
          <View className="h-[42px] w-[42px] overflow-hidden rounded-[5px] border border-yellow-500/20 bg-yellow-500/[0.08]">
              <View className="flex-1 items-center justify-center">
                <MaterialCommunityIcons
                  name="stadium"
                  size={22}
                  color="#EAB308"
                />
              </View>
          </View>

          <View className="ml-[10px] flex-1">
            <View className="flex-row items-center">
              <Text
                numberOfLines={1}
                style ={{
                  fontSize : width/25
                }}
                className="max-w-[85%] text-[17px] font-bold tracking-[0.1px] text-white"
              >
                {entry.arenaName}
              </Text>
              {/* {entry.verified && ( */}
                <Ionicons
                  name="checkmark-circle"
                  size={19}
                  color="#EAB308"
                  style={{
                    marginLeft: 5,
                  }}
                />
              {/* )} */}
            </View>
            <View className="mt-[5px] flex-row items-center">
             
              <Text 
              style = {{
                fontSize : width/40
              }}
              className="ml- [3px]  font-medium uppercase tracking-[0.3px] text-white/95">
                {entry.talentType}{' '}
                <Text
                  style = {{
                     fontSize : width/47
                  }}>
                  {stageIcons[entry.talentType]} {" - "} 
                </Text>
              </Text>

              <View className=" h-[3px] w-[3px] rounded-full bg-white/25" />
              <Text
               style = {{
                fontSize : width/40
              }}
                numberOfLines={1}
                className="text- [11px] font-medium uppercase tracking-[0.3px] text-white/95"  >
                {countries.find(c => c.code == entry.region)?.name} {countries.find(c => c.code == entry.region)?.flag}
              </Text>
            </View>

          </View>

          <View className="h-[42px] w-[42px] overflow-hidden rounded-[5px] border border-yellow-500/20 bg-yellow-500/[0.08]">
            {entry?.profileImage?.publicUrl ||
            entry?.profileImage?.cdnUrl ? (
              <Image
                source={{
                  uri:
                    entry?.profileImage
                      ?.publicUrl ||
                    entry?.profileImage
                      ?.cdnUrl,
                }}
                className="h-full w-full rounded-md"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Ionicons
                  name="business-outline"
                  size={22}
                  color="#EAB308"
                />
              </View>
            )}
          </View>

        </View>
      </View>

      {/*
       * =====================================================
       * PERFORMANCE GALLERY
       * =====================================================
       */}

      <View
      style ={{
        // height
      }}
      className=" px-4 justify-center border-l-[0.5px] border-r-[0.5px] border-[gold]/40 flex-1 flex-row gap-[7px] overfl ow-hidden">
        {visiblePerformances.map(
          renderPerformance
        )}

        {/*
         * No performances
         */}

        {visiblePerformances.length === 0 && (
          <View className="flex-1 items-center justify-center rounded-[13px] border-t border-b bor der-white/[0.76] bg-[#171717]">
            
            {/* <Image
            source={{
              uri: entry?.coverImage?.publicUrl ,
            }}
            className="absolute opacity-50 inset-0 h-full w-full"
            resizeMode="cover"
          /> */}
            <Ionicons
              name="videocam-outline"
              size={38}
              color="rgba(255,255,255,0.48)"
            />

            <Text
            style = {{
              fontSize : width/28
            }}
             className="mt-[5px]  font-medium text-white/45">
              No performances yet
            </Text>

          </View>
        )}

      </View>

     

      <View className="p-2  bg-[#000000] mt-2 rounded-b-[5px] border-b-[0.8px] border-l-[0.5px] border-r-[0.5px] border-[gold]/40  flex-row items-end justify-between">
        <View className="items-center p-1 px-2">
          <View className="flex-row  items-center">

            <MaterialCommunityIcons
              name="star-four-points"
              size={width/27}
              color="#EAB308"
            />

            <Text
             style = {{
                fontSize : width/30
              }}
             className="ml-[4px] text -[14px] font-bold text-white/85">
              {formatNumber(
                starCount
              )}
            </Text>

          </View>

          <Text 
           style = {{
            fontSize : width/44
          }}
          className="mt-[5px] text -[9px] font-bold tracki ng-[0.7px] text-white/85">
            STARS
          </Text>

        </View>

        {/*
         * ===================================================
         * FOLLOWERS
         * ===================================================
         */}

        <View className="items-center p-1 px-2">

          <View className="flex-row items-center">

            <Ionicons
              name="people"
              size={width/27}
              color="#EAB308"
            />

            <Text
             style = {{
                fontSize : width/30
              }}
             className="ml-[4px] text- [14px] font-bold text-white/85">
              {formatNumber(
                followerCount
              )}
            </Text>

          </View>

          <Text 
           style = {{
            fontSize : width/44
          }}
          className="mt-[5px] text -[9px] font-bold trac king-[0.7px] text-white/85">
            FOLLOWERS
          </Text>

        </View>

        {/*
         * ===================================================
         * PERFORMANCES
         * ===================================================
         */}

        <View className="items-center p-1 px-2">

          <View className="flex-row items-center">

            <Ionicons
              name="play"
              size={width/27}
              color="#EAB308"
            />

            <Text
             style = {{
                fontSize : width/34
              }}
             className="ml-[4px] text- [14px] font-bold text-white/85">
              {formatNumber(
                performanceCount
              )}
            </Text>

          </View>

          <Text 
           style = {{
            fontSize : width/44
          }}
          className="mt-[5px] text- [9px] font-bold track ing-[0.7px] text-white/85">
            PERFORMANCES
          </Text>

        </View>

      </View>

    </TouchableOpacity>
  );
};

export default ArenaJourneyCard;