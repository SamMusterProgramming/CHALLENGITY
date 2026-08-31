import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import SpotlightIcon from "../../custom/spotlightIcon";
import { countries } from "../../../utilities/TypeData";

const SpotlightCard = ({
  entry,
  width,
  height,
  setSelectedPost,
  onPress,
  onPerformancePress,
}) => {
  if (!entry) {
    return null;
  }



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


  const imageUri =  getThumbnailUrl(entry);

  const renderPerformance = (
    performance,
    index
  ) => {
    const imageUri =  getThumbnailUrl(performance);
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
        className="rela tive flex-1 overflow-hidden rounded-[5px] border border-white/[0.07] bg-[#000000]"
      >
  

        {imageUri ? (
          <Image
            source={{
              uri: imageUri,
            }}
            className="absolute inset-0 h- full w- full"
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
      onPress = { () => setSelectedPost(entry) }
      style={{
        width,
      }}
      className="self-center gap-1 overflow-hidden rounded-[5px] b g-[#181818] px- [14px] pb- [11px] pt- [13px]"
    >

      <View className="rounded-t-[5px] bg-[#000000] p-4 flex-row items-center border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-[gold]/40 justify-between">

        <View className="fle x-1 flex-row items-center">
          
          <View className="h-[42px] w-[42px] overflow-hidden rounded-[5px] border border-yellow-500/20 bg-yellow-500/[0.08]">
              <View className="flex-1 items-center justify-center">
                <SpotlightIcon  size={20}/>
              </View>
          </View>

          <View className="ml-[10px] flex-1">
            <View className="flex-row items-center">
              <Text
                numberOfLines={1}
                style ={{
                  fontSize : width/28
                }}
                className="max-w-[85%] text-[17px] font-bold tracking-[0.1px] text-white"
              >
                Spotlight . {entry.arena.talentType}
              </Text>
            
            </View>
            <View className="mt-[6px]  flex-row gap-1 items-center">
              
              <Text className="ml-[3px] text-[11px] font-bold tracking-[0.3px] text-white/95">
                {entry.arena.arenaName}
              </Text>
              <MaterialCommunityIcons
                name="stadium"
                size={14}
                color="gold"
              />
              <View className="mx-[5px] h-[3px] w-[3px] rounded-full bg-white/85" />
              <Text
                numberOfLines={1}
                className="text-[11px] font-medium tracking-[0.3px] text-white/95" >
                {entry.arena.region} {countries.find(c => c.code == entry.arena.region)?.flag}
              </Text>
            </View>

          </View>

          <View className="h-[42px] w-[42px] overflow-hidden rounded-[5px] border border-yellow-500/20 bg-yellow-500/[0.08]">
            {entry?.owner.profileImage?.publicUrl ||
            entry?.owner.profileImage?.cdnUrl ? (
              <Image
                source={{
                  uri:
                    entry?.owner.profileImage
                      ?.publicUrl ||
                    entry?.owner.profileImage
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

 
      {/* <View
      style ={{

      }}
      className=" px-4 justify-center border-l-[0.5px] border-r-[0.5px] border-[gold]/40 flex-1 flex-row gap-[7px] overfl ow-hidden"> */}
       
     <View
        activeOpacity={0.9}
        style ={{ width  , height}}
        className="px-4 items-center justify-center fle x-1 overflow-hidden rounded-[5px] border-l border-r border-gold/40 bg-[#000000]"
        >
        {imageUri ? (
        <>
        <Image
            source={{
            uri: imageUri,
            }}
   
            className="rounded-[5px] inse t-0 h-full w-full"
            resizeMode="cover"
        />
          
           <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor:
                  "rgba(0,0,0,0.18)",
                justifyContent:
                  "center",
                alignItems:
                  "center",
              }}  >
              {/* <View
                style={{
                  width: width/11,
                  height: width/11,
                  borderRadius: 999,
                  backgroundColor:  "rgba(255,255,255,0.6)",
                  justifyContent: "center",
                  alignItems:
                    "center",
                }}  >
                <MaterialCommunityIcons
                  name="play"
                  size={20}
                  color="#000"
                />
              </View> */}
            </View>
            
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
     </View>

      {/* </View> */}

    

      <View className="p-2  bg-[#000000] mt-2 rounded-b-[5px] border-b-[0.8px] border-l-[0.5px] border-r-[0.5px] border-[gold]/40  flex-row items-end justify-between">
                <View
                    style={{
                        flex:1,
                        // padding : 10 ,
                        marginLeft : 24,
                        marginRight : 12,
                    }}
                    className = " rounded-3xl flex-row justify-between items-center b g-[#000]/40"
                    > 
                        <View
                            style={{
                            }}
                            className ="flex-row gap-2 items-center p-2" >
                            <MaterialCommunityIcons
                                name="eye"
                                size={17}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/42 }}>
                                {entry.viewCount || 0}
                            </Text>
                        </View>
                        
                        <View
                            style={{
                            }}  className ="flex-row gap-2 items-center"  >
                            <MaterialCommunityIcons
                                name="fire"
                                size={19}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/42 }}>
                                {entry.fireCount || 0}
                            </Text>
                        </View>

                        <View
                            style={{
                            }}  className ="flex-row gap-2 items-center"  >
                            <MaterialCommunityIcons
                                name="message"
                                size={17}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/42 }}>
                                {entry.commentCount || 0}
                            </Text>
                        </View>
                </View>
        </View>

    </TouchableOpacity>
  );
};

export default SpotlightCard;