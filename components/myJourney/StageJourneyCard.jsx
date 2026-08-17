

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { countries, stageIcons } from "../../utilities/TypeData";

const StageJourneyCard = ({
  entry,
  width,
  height,
  onPress,
  onPerformancePress,
}) => {
  if (!entry) {
    return null;
  }

  const performances = entry.performances || [];

  /*
   * =========================================================
   * SORT PERFORMANCES
   * Newest first
   * =========================================================
   */

  const sortedPerformances = useMemo(() => {
    return [...performances].sort(
      (a, b) =>
        new Date(b?.date || b?.createdAt || 0).getTime() -
        new Date(a?.date || a?.createdAt || 0).getTime()
    );
  }, [performances]);

  /*
   * =========================================================
   * PERFORMANCE DISPLAY
   * =========================================================
   */

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

  /*
   * =========================================================
   * STATUS
   * =========================================================
   */

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

  /*
   * =========================================================
   * RANK
   * =========================================================
   */

  const hasRank =
    entry.rank !== undefined &&
    entry.rank !== null &&
    entry.rank > 0;

  const isWinner = entry.rank === 1;

  /*
   * =========================================================
   * PERFORMANCE TILE
   * =========================================================
   */

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
        // onPress={() =>
        //   onPerformancePress?.(
        //     performance,
        //     entry
        //   )
        // }
        style ={{
          height
        }}
        className="relative flex-1 overflow-hidden rounded-[5px] border border-white/[0.07] bg-[#1A1A1A]"
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            resizeMode="cover"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <View className="flex-1 items-center justify-center bg-[#181818]">
            <Ionicons
              name="videocam-outline"
              size={28}
              color="rgba(255,255,255,0.35)"
            />
          </View>
        )}

        {/*
         * Cinematic gradient
         */}
        <LinearGradient
          pointerEvents="none"
          colors={[
            "transparent",
            "rgba(0,0,0,0.65)",
          ]}
          className="absolute inset-0"
        />

        {/*
         * +N MORE
         */}
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

        {/*
         * Performance number
         */}
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

  /*
   * =========================================================
   * CARD
   * =========================================================
   */

  return (
    <TouchableOpacity
      activeOpacity={0.94}
      onPress={() => onPress?.(entry)}
      style={{
        width,
        // height,
      }}
      className="self-center gap-1 rounded-[5px] bg -[#202125] px- [14px] pb- [11px] pt- [13px] shadow-black/25"
    >
      {/*
       * =====================================================
       * HEADER
       * =====================================================
       */}

      <View className="rounded-[5px] bg-[#202125] p-2 flex-row items-center justify-between">
        {/*
         * Identity
         */}
        <View className="flex-1 flex-row items-end">
      
          <View className="h-[42px] w-[42px] items-center justify-center rounded-[8px] border border-yellow-500/20 bg-yellow-500/[0.09]">
            <Ionicons
              name="trophy"
              size={width/15}
              color="#EAB308"
            />
          </View>

          {/*
           * Stage information
           */}
          <View className="ml-[10px] flex-1">
            <Text
              numberOfLines={1}
              style = {{
                fontSize : width/25
              }}
              className="te xt-[17px] font-bold tracking-[0.1px] text-white"
            >
              {entry.stageName}  {' '} 
            </Text>

            <View className="mt-[6px] flex-row  items -end">
            
              <Ionicons
                name="location-outline"
                size={12}
                color="rgba(255,255,255,0.78)"
              />

              <Text
              style = {{
                fontSize : width/38
              }}
               className="ml-[3px] te xt-[11px] mt-[1px] font-bold tracking-[0.4px] text-white/75">
                {countries.find(c => c.code == entry.region)?.name} {' '}
                {/* {'(' + entry.region + ')'}  */}
                {countries.find(c => c.code == entry.region)?.flag}
              </Text>
            </View>
          </View>
        </View>

        {/*
         * ===================================================
         * RIGHT SIDE
         * ===================================================
         */}

        <View className="items-end  ">
          {/*
           * Rank
           */}
          {hasRank && (
            <View className="mb-[4px]  flex-row items-center justify-between">
              <Text 
              style = {{
                fontSize : width/34
              }}
              className="tex t-[12px] mr-4 font-extrabold text-yellow-500">
               {entry.rank < 4 ? "TOP" : "Rank"}  {''} {entry.rank}
              </Text>

              {/* {isWinner && (
                <Ionicons
                  name="trophy"
                  size={11}
                  color="#EAB308"
                  style={{
                    marginLeft: 3,
                  }}
                />
              )} */}
            </View>
          )}

          {/*
           * Status badge
           */}
          <View
            className={`h- [23px] p-1 mt-1 flex-row items-center rounded-md border  ${status.badgeClass}`}
          >
            <Ionicons
              name={status.icon}
              size={11}
              color="#FFFFFF"
            />

            <Text className="ml-[4px] text-[8px] font-extrabold tracking-[0.7px] text-white/80">
              {status.label}
            </Text>
          </View>
        </View>
      </View>

      {/*
       * =====================================================
       * PERFORMANCE GALLERY
       * =====================================================
       */}

      <View className="mt-[5px] mb-[5px] flex-1 flex-row gap-[7px] overflow-hidden">
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
              color="rgba(255,255,255,0.35)"
            />

            <Text className="mt-[5px] text-[10px] font-medium text-white/40">
              No performances yet
            </Text>
          </View>
        )}
      </View>

      {/*
       * =====================================================
       * FOOTER
       * =====================================================
       */}

      <View className="p-2 bg-[#202125] rounded-[5px]  flex-row items-end justify-between">
     
        
          {/* <View className="flex-row items-end"> */}

          <View className="items-center">
              <View className="flex-row items-center">
                <Ionicons
                  name="layers"
                  size={width/27}
                  color="#EAB308"
                />

                <Text
                 style ={{
                  fontSize : width/30
                 }}
                 className="ml-[4px] text-[16px] font-bold text-white/85">
                {performances.length}{"  "}
                </Text>
              </View>

              <Text 
              style = {{
                fontSize : width/40
              }}
              className="ml-[5px] mt-[4px] text-[9px] font-bold text-white/65">
                {performances.length === 1
                  ? "PERFORMANCE"
                  : "PERFORMANCES"}
              </Text>
          </View>
            {/* <Ionicons
              name="star-outline"
              size={13}
              color="#EAB308"
            />

            <Text 
            style = {{
              fontSize : width/34
            }}
            className="ml-[5px] tex t-[10px] font-bold text-gold/70">
                round 1 . {entry.stage.attendeesNumber} Contestants
            </Text> */}
            <View className="items-center">
              <View className="flex-row items-center">
                <Ionicons
                  name="people"
                  size={width/27}
                  color="gold"
                />

                <Text
                 style = {{
                  fontSize : width/30
                }}
                 className="ml-[4px] tex t-[16px] font-bold text-white/85">
                  {entry.stage.contestantCount ?? 0}
                </Text>
              </View>

              <Text className="mt-[4px] text-[9px] font-semibold tracking-[0.8px] text-white/65">
                CONTESTANTS
              </Text>
            </View>

          {/* </View> */}
        {/* </View> */}

        {/*
         * Stats
         */}
        {/* <View className="flex-row items-center gap-[18px]"> */}

        {/* Likes */}
        <View className="items-center">
          <View className="flex-row items-center">
            <Ionicons
              name="thumbs-up"
              size={width/27}
              color="lightblue"
            />

            <Text 
             style = {{
              fontSize : width/30
            }}
            className="ml-[4px] text- [16px] font-bold tracking-[0.1px] text-white/85">
              {entry.likes ?? 0}
            </Text>
          </View>

          <Text
           style = {{
            fontSize : width/40
          }}
           className="mt-[4px] text- [9px] font-bold tracking-[0.8px] text-white/65">
            LIKES
          </Text>
        </View>

        {/* Votes */}
        <View className="items-center">
          <View className="flex-row items-center">
            <Ionicons
              name="trophy"
              size={width/27}
              color="#EAB308"
            />

            <Text 
             style = {{
              fontSize : width/30
            }}
            className="ml-[4px] text- [16px] font-bold tracking-[0.1px] text-white/85">
              {entry.votes ?? 0}
            </Text>
          </View>

          <Text 
           style = {{
            fontSize : width/40
          }}
          className="mt-[4px] text- [9px] font-semibold tracking-[0.8px] text-white/65">
            VOTES
          </Text>
        </View>

        </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default StageJourneyCard;