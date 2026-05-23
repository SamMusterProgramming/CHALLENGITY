
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";

import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Animated,
  Pressable,
  StatusBar,
} from "react-native";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

import UserCard from "./UserCard";
import CarouselIndicator from "../custom/carouselIndicator";
import StatusDisplayer from "../custom/statusDisplayer";

import { getTimeLapse } from "../../helper";
import { stageIcons } from "../../utilities/TypeData";

const ContestantRoom = ({
  user,
  userParticipation,
  confirmAction,
  setStage,
  player,
  isPlaying,
  setIsPlaying,
  setPerformanceToDelete,
  updatePerformanceIndex,
  w,
  h,
  top,
  bottom,
  numberOfContestants,
  setSelectedContestant,
  setParticipationType,
  talentRoom,
  edition,
  show 
}) => {

  const { userCountryCode } = useGlobalContext();

  const { width, height } = useWindowDimensions();

  const flatListRef = useRef(null);

  const scrollX = useRef(
    new Animated.Value(0)
  ).current;

  const MAX = talentRoom.MAXCONTESTANTS;

  const [type, setType] = useState("");

  /* ---------------------------------- */
  /* USER STATES */
  /* ---------------------------------- */

  const userQueue = talentRoom.queue.find(
    (u) => u.user_id.toString() === user._id
      // String(u.user_id) === String(user._id)
  );

  const userEliminated =
    talentRoom.eliminations.find(
      (u) =>
        String(u.user_id) ===
        String(user._id)
    );

  const contestant =
    userParticipation ||
    userQueue ||
    userEliminated;

  const data =
    contestant?.performances
      ?.slice()
       || [];
  /* ---------------------------------- */
  /* STATUS */
  /* ---------------------------------- */

  const status = useMemo(() => {
    if (userParticipation) {
      setType("DeleteContestantStage");
      return "Joined";
    }
    if (userEliminated) {
      setType(
        "DeleteContestantElimination"
      );
      return "Eliminated";
    }
    if (userQueue) {
      setType("DeleteContestantQueue");
      return "Queued";
    }
    if (numberOfContestants < MAX) {
      edition.round < 4
        ? setType("new")
        : setType("queue");

      return edition.round < 4
        ? "Join"
        : "Queue";
    }
    setType("queue");
    return "Queue";
  }, [
    userParticipation,
    userQueue,
    userEliminated,
    numberOfContestants,
    edition,
  ]);

  const statusLabel = {
    Joined: "RESIGN",
    Queued: "LEAVE QUEUE",
    Eliminated: "DELETE",
    Join: "JOIN STAGE",
    Queue: "JOIN QUEUE",
  };

  /* ---------------------------------- */
  /* CAROUSEL */
  /* ---------------------------------- */

  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = h;
  const SNAP = ITEM_WIDTH;

  /* ---------------------------------- */
  /* ACTIONS */
  /* ---------------------------------- */

  const togglePlayback = async (
    item,
    index
  ) => {
    if (!item?.video?.cdnUrl) return;
    if(status === "Queued" || status == "Eliminated") {
      await player.replaceAsync(
        item.video.cdnUrl
      );
      player.play();
       setIsPlaying(true)
       return  ;
    }
    setStage(true);
    setSelectedContestant(contestant);
    updatePerformanceIndex(
      contestant?._id,
      index
    );
    await player.replaceAsync(
      item.video.cdnUrl
    );
    setTimeout(() => {
      if (isPlaying) {
        player.pause();
        setIsPlaying(false);
      } else {
        player.play();
        setIsPlaying(true);
      }
    }, 120);
  };

  const deletePerformance = (item) => {
    setPerformanceToDelete(item);
    if (userParticipation) {
      setParticipationType(
        data.length > 1
          ? "DeletePerformanceStage"
          : "DeleteContestantStage"
      );
    }
    if (userQueue || userEliminated) {
      setParticipationType(
        data.length > 1
          ? "DeletePerformanceQueue"
          : "DeleteContestantQueue"
      );
    }
    confirmAction;
  };

  /* ---------------------------------- */
  /* RENDER ITEM */
  /* ---------------------------------- */

  const renderItem = useCallback(
    ({ item, index }) => {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ];
      /* 🎬 FLIP EFFECT */
      const rotateY = scrollX.interpolate({
        inputRange,
        outputRange: ["90deg", "0deg", "-90deg"],
        extrapolate: "clamp",
      });
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 1, 0.3],
        extrapolate: "clamp",
      });

      return (
        <View 
      className ="flex-1"
         style={{ 
           width: w,
          height: h,
         }}
         >
            <Animated.View
              style={{
                flex:1,
                transform: [
                  { perspective: 1000 },
                  { rotateY },
                ],
              }}
            >
              <Pressable
                // activeOpacity={1}
                onPress={async () => {
                  await togglePlayback(
                    item,
                    index
                  );
                }}
                style={{
                  flex:1
                }}
                className="fl ex-1"
              >

                {/* BACKGROUND IMAGE */}

                <Image
                  source={{
                    uri:
                      item.thumbnail?.publicUrl ||
                      "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
                  }}
                  resizeMode="cover"
                  style={{
                    width:"100%",
                  height: "100%",
                  }}
                  className=""
                />

                {/* CINEMATIC OVERLAY */}

                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0.15)",
                    "rgba(0,0,0,0.45)",
                    "rgba(0,0,0,0.92)",
                  ]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />

                {/* TOP LIVE BADGE */}

                <View className="absolute top-2  left-2">

                  <BlurView
                    intensity={25}
                    tint="dark"
                    style={{
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >

                    <View className="px-3 py-2 flex-row items-center">

                      <View className="w-3 h-3 rounded-xl bg-red-500 mr-2" />

                      <Text 
                        style={{
                          fontSize:
                            width / 39,
                        }}
                        className="text-white font-bold track ing-wide"
                      >
                        LIVE PERFORMANCE
                      </Text>

                    </View>

                  </BlurView>

                </View>

                {/* CENTER PLAY */}

                <View className="absolute inset-0 justify-center items-center">

                  <View className="w-20 h-20 rounded-full bg-black/40 border border-white/10 justify-center items-center">

                    <Image
                      source={icons.play}
                      className="w-12 h-12"
                      tintColor="white"
                    />

                  </View>

                </View>

                {/* BOTTOM PERFORMANCE INFO */}

                <View 
                  style = {{
                  bottom: bottom * 2  }}
                  className="absolute flex-row px-2  w-full">
                  {/* <View className=" flex-row items-end flex-1 justify-between"> */}
                     
                        <View className="px-2 w- full flex-row py-2 gap-1">
                          {data.length > 0 && (
                          <CarouselIndicator
                                count={data.length}
                                scrollX={scrollX}
                                width={width }
                                absolute ={false}
                                position={{
                                  bottom: bottom * 2 - 10,
                                  left: null,
                                  }}
                                rank={
                                  userParticipation?.rank ||
                                  null
                                }
                                votes={
                                  userParticipation?.votes +
                                    1 || null
                                }
                                status={status}
                                size={width/44}
                              />
                            )} 
                          <Text
                            style={{
                              fontSize:
                                width / 55,
                            }}
                            className="text-gray-300 ml-6" >
                            {index === 0  ? "Recent " : "Prev"}{'  .  '}
                            <Text
                              style={{
                                fontSize:
                                  width / 55,
                              }}
                              className="text-white font-semibold"   >
                              {getTimeLapse(
                                item.date
                              )} ago
                            </Text>
                          </Text>
                        </View>

                        <Pressable
                            onPress={() =>{
                              // deletePerformance(item)
                              setPerformanceToDelete(item);
                              if (userParticipation) {
                                setParticipationType(
                                  data.length > 1
                                    ? "DeletePerformanceStage"
                                    : "DeleteContestantStage1"
                                );
                              }
                              if (userQueue || userEliminated) {
                                setParticipationType(
                                  data.length > 1
                                    ? "DeletePerformanceQueue"
                                    : "DeleteContestantQueue1"
                                );
                              }
                              if (userEliminated) {
                                setParticipationType(
                                  data.length > 1
                                    ? "DeletePerformanceQueue"
                                    : "DeleteContestantElimination"
                                );
                              }
                              confirmAction;
                            }
                            }
                            className="px-4 py-2 ml-auto bor der border-red-500/20" >
                                <Text
                                  style={{
                                    fontSize:
                                      width / 49,
                                  }}
                                  className="text-red-400 font-bold"
                                >
                                  REMOVE
                                </Text>
                          </Pressable>

                </View>

              </Pressable>

            </Animated.View>
        </View>
      );
    },
    [
      isPlaying,
      contestant,
      data
    ]
  );

  /* ---------------------------------- */
  /* EMPTY STATE */
  /* ---------------------------------- */

  const renderEmptyState = () => {

    return (

      <View className="flex-1 justify-center items-center px-10">

        <LinearGradient
          colors={[
            "rgba(255,255,255,0.03)",
            "rgba(255,255,255,0.01)",
          ]}
          className="w-full rounded-[34px] p-8 border border-white/10"
        >

          <View className="items-center">

            <Text
              style={{
                fontSize:
                  width / 7,
              }}
            >
               {stageIcons[talentRoom.name]}
            </Text>

            <Text
              style={{
                fontSize:
                  width / 22,
              }}
              className="text-white font-black mt-4 text-center"
            >
              JOIN THE STAGE
            </Text>

            <Text
              style={{
                fontSize:
                  width / 30 ,
                lineHeight: 26,
              }}
              className="text-gray-400 text-center mt-4"
            >
              Showcase your talent,
              climb the rankings,
              and captivate the audience.
            </Text>

          </View>

        </LinearGradient>

      </View>
    );
  };

  /* ---------------------------------- */
  /* MAIN UI */
  /* ---------------------------------- */

  if(!show) return null ; 

  return (

    <View
      style={{
        opacity : isPlaying ? 0 : 1,
        position: "absolute",
        top,
        width: w,
        height: h,
      }}
      className="bg-black flex -1 justify-center items-center "
    >

        {data?.length > 0 ? (
          <Animated.FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, i) =>
              item.video?.fileId ||
              i.toString()
            }
            snapToInterval={SNAP}
            decelerationRate="fast"
            disableIntervalMomentum
            bounces={false}
            removeClippedSubviews={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              // paddingHorizontal: 0,
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              }
            )}
            scrollEventThrottle={16}
          />

        ) : (
          renderEmptyState()
        )}

         {/* {data.length > 0 && (
         <CarouselIndicator
              count={data.length}
              scrollX={scrollX}
              width={width }
              position={{
                bottom: bottom * 2 - 10,
                left: null,
                 }}
              rank={
                userParticipation?.rank ||
                null
              }
              votes={
                userParticipation?.votes +
                  1 || null
              }
              status={status}
            />
           )}  */}
      <View
      style= {{ bottom:bottom }}
       className="absolute gap-2 w-full px-2 " 
       >
        <View className="flex-row flex-1 items-center justify-center">
            {/* SECONDARY BUTTON */}
            {(userParticipation ||
              userQueue ||
              userEliminated) && (
              <Pressable
                onPress={() => {

                  userQueue &&
                    setParticipationType(
                      "qupdate"
                    );

                  userEliminated &&
                    setParticipationType(
                      "backInQueue"
                    );

                  userParticipation &&
                    setParticipationType(
                      "update"
                    );

                  confirmAction;
                }}
                className ="flex-1"
              >
                  <View className="px-4 py-3 rounded-xl bg-gold/40 items-center flex-1 border border-white/10">
                    <Text
                      style={{
                        fontSize:
                          width / 46,
                      }}
                      className="text-white font-bold"
                    >
                      {userEliminated
                        ? "BACK IN QUEUE"
                        : "ADD PERFORMANCE"}
                    </Text>

                  </View>
              </Pressable>
            )}
        </View>
        <BlurView
          intensity={40}
          tint="dark"
          style={{
            flex:1,
            borderRadius: 18,
            overflow: "hidden",
          }} >    
          <View className="px-2 py-4 w-full border gap-6 border-white/10">

            <View className="flex-row w-full gap-6 justify-center  items-end">

              <UserCard
                selectedContestant={
                  contestant || {
                    ...user,
                    profile_img:
                      user.profileImage
                        .publicUrl,
                  }
                }
                height={height / 22}
                width={width * 0.72}
              />

              <StatusDisplayer
                          status = {status}
                          bottom={0}
                        />

             <Pressable
                onPress={() => {
                  if (false
                    // status === "Join"
                    //  &&
                    // userCountryCode ==
                    //   talentRoom.region
                  ) {
                    setParticipationType(
                      "CNTJ"
                    );
                    return;
                  }
                  setParticipationType(type);
                  confirmAction;
                }}
                className ="flex- 1 ml-auto justify-start items-end"
              >

                <LinearGradient
                  colors = {
                    status === "Join"
                      ? [
                          "#F59E0B",
                          "#EA580C",
                        ]
                      : status ===
                        "Queue"
                      ? [
                          "#2563EB",
                          "#0891B2",
                        ]
                      : [
                          "#991B1B",
                          "#DC2626",
                        ]
                  }
                  style={{
                    borderRadius: 11,
                  }}>
                  <View className="px-4 py-3">
                    <Text
                      style={{
                        fontSize:
                          width / 48,
                      }}
                      className="text-white font-bold tracking-widest"
                    >
                      {
                        statusLabel[
                          status
                        ]
                      }
                    </Text>
                  </View>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
};

export default ContestantRoom;