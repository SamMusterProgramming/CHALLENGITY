import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { countries } from "../../utilities/TypeData";

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

  /*
   * Newest performances first
   */
  const sortedPerformances = useMemo(() => {
    return [...performances].sort(
      (a, b) =>
        new Date(b?.createdAt || 0).getTime() -
        new Date(a?.createdAt || 0).getTime()
    );
  }, [performances]);

  /*
   * Only display 3 performances
   */
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
      performance?.media?.video?.cdnUrl ||
      null
    );
  };

  /*
   * =========================================================
   * FORMAT NUMBER
   * =========================================================
   */

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
    const imageUri =
      getThumbnailUrl(performance);

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
        // onPress={() =>
        //   onPerformancePress?.(
        //     performance,
        //     entry
        //   )
        // }
        className="relative flex-1 overflow-hidden rounded-[5px] border border-white/[0.07] bg-[#000000]"
      >
  

        {imageUri ? (
          <Image
            source={{
              uri: imageUri,
            }}
            className="absolute inset-0 h-full w-full"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center bg-[#000000]">
            <Ionicons
              name="videocam-outline"
              size={27}
              color="rgba(255,255,255,0.28)"
            />
          </View>
        )}

  

        <LinearGradient
          pointerEvents="none"
          colors={[
            "transparent",
            "rgba(0,0,0,0.55)",
            "rgba(0,0,0,0.88)",
          ]}
          className="absolute inset-0"
        />

       

        {!isLastVisible && (
          <View className="absolute left-[7px] top-[7px] h-[22px] w-[22px] items-center justify-center rounded-full bg-black/55">
            <Text className="text-[9px] font-bold text-white/90">
              {index + 1}
            </Text>
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

       

        {/* {!isLastVisible && ( */}
          <View className="absolute inset-x-1 bg-black/55 bottom-1 rounded-lg">
            <View className="flex-row w-full items-center justify-between p-2 ">

              {/* Fires */}

              <View className="mr-[7px] flex-row items-center">
                <MaterialCommunityIcons
                  name="fire"
                  size={10}
                  color="#EAB308"
                />

                <Text className="ml-[3px] text-[8px] font-semibold text-white/85">
                  {formatNumber(
                    performance?.fireCount
                  )}
                </Text>
              </View>

              {/* Views */}

              <View className="mr-[7px] flex-row items-center">
                <Ionicons
                  name="eye"
                  size={10}
                  color="#EAB308"
                />

                <Text className="ml-[3px] text-[8px] font-semibold text-white/85">
                  {formatNumber(
                    performance?.viewCount
                  )}
                </Text>
              </View>

              {/* Comments */}

              <View className="flex-row items-center">
                <Ionicons
                  name="chatbubble"
                  size={9}
                  color="#EAB308"
                />

                <Text className="ml-[3px] text-[8px] font-semibold text-white/75">
                  {formatNumber(
                    performance?.commentCount
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
        onPress?.(entry)
      }
      style={{
        width,
        // height,
      }}
      className="self-center gap-1 overflow-hidden rounded-[5px] b g-[#181818] px- [14px] pb- [11px] pt- [13px]"
    >

      <View className="h- [48px] p-3 flex-row items-center justify-between bg-[#181818] rounded-[5px]">

        <View className="fle x-1 flex-row items-center">
          
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
                className="h-full w-full"
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

          <View className="ml-[10px] flex-1">
            <View className="flex-row items-center">
              <Text
                numberOfLines={1}
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

              <Ionicons
                name="location-outline"
                size={11}
                color="rgba(255,255,255,0.52)"
              />

              <Text className="ml-[3px] text-[11px] font-medium tracking-[0.3px] text-white/55">
                {entry.talentType}
              </Text>

              <View className="mx-[5px] h-[3px] w-[3px] rounded-full bg-white/25" />

              <Text
                numberOfLines={1}
                className="text-[11px] font-medium tracking-[0.3px] text-white/55"
              >
                {entry.region} {countries.find(c => c.code == entry.region)?.flag}
              </Text>

            </View>
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
        height
      }}
       className="mt-[5px] mb-[5px] fl ex-1 flex-row gap-[7px] overflow-hidden bg-black">

        {visiblePerformances.map(
          renderPerformance
        )}

        {/*
         * No performances
         */}

        {visiblePerformances.length === 0 && (
          <View className="flex-1 items-center justify-center rounded-[13px] border border-white/[0.06] bg-[#171717]">

            <Ionicons
              name="videocam-outline"
              size={28}
              color="rgba(255,255,255,0.28)"
            />

            <Text className="mt-[5px] text-[10px] font-medium text-white/40">
              No performances yet
            </Text>

          </View>
        )}

      </View>

      {/*
       * =====================================================
       * ARENA FOOTER
       * =====================================================
       *
       * IMPORTANT:
       *
       * These statistics describe the ARENA,
       * not individual performances.
       *
       * ⭐ Stars
       * 👥 Followers
       * ▤ Performances
       */}

      <View className="p-3 bg-[#181818] rounded-[5px] flex-row items-center justify-between">

        {/*
         * ===================================================
         * STARS
         * ===================================================
         */}

        <View className="items-center p- 1">

          <View className="flex-row  items-center">

            <Ionicons
              name="star"
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
            fontSize : width/40
          }}
          className="mt-[5px] text -[9px] font-bold tracking-[0.7px] text-white/75">
            STARS
          </Text>

        </View>

        {/*
         * ===================================================
         * FOLLOWERS
         * ===================================================
         */}

        <View className="items-center">

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
            fontSize : width/40
          }}
          className="mt-[5px] text -[9px] font-bold tracking-[0.7px] text-white/75">
            FOLLOWERS
          </Text>

        </View>

        {/*
         * ===================================================
         * PERFORMANCES
         * ===================================================
         */}

        <View className="items-center">

          <View className="flex-row items-center">

            <Ionicons
              name="layers-outline"
              size={width/27}
              color="#EAB308"
            />

            <Text
             style = {{
                fontSize : width/30
              }}
             className="ml-[4px] text- [14px] font-bold text-white/85">
              {formatNumber(
                performanceCount
              )}
            </Text>

          </View>

          <Text 
           style = {{
            fontSize : width/40
          }}
          className="mt-[5px] text- [9px] font-semibold tracking-[0.7px] text-white/75">
            PERFORMANCES
          </Text>

        </View>

      </View>

    </TouchableOpacity>
  );
};

export default ArenaJourneyCard;