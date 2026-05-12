
// import React, { useEffect, useRef, useState, useMemo } from "react";
// import {
//   View,
//   Text,
//   Image,
//   useWindowDimensions,
//   Animated,
//   Pressable,
//   Platform,
//   TouchableOpacity,
// } from "react-native";
// import { icons } from "../../constants";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import UserCard from "./UserCard";
// import ShuffleLetters from "../custom/ShuffleLetters";
// import { getTimeLapse } from "../../helper";
// import CountryFlag from "react-native-country-flag";
// import { LinearGradient } from "expo-linear-gradient";
// import CarouselIndicator from "../custom/carouselIndicator";
// import StatusDisplayer from "../custom/statusDisplayer";

// const ContestantRoom = ({
//   user,
//   userParticipation,
//   confirmAction,
//   setStage,
//   player,
//   isPlaying,
//   setIsPlaying,
//   setPerformanceToDelete,
//   updatePerformanceIndex,
//   w,
//   h,
//   top,
//   bottom,
//   numberOfContestants,
//   setSelectedContestant,
//   setParticipationType,
//   talentRoom,
//   edition,
// }) => {
//   const { userCountryCode } = useGlobalContext();
//   const { width , height } = useWindowDimensions();

//   const flatListRef = useRef(null);
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const MAX = talentRoom.MAXCONTESTANTS;
//   const [type , setType] = useState("")
//   /* ---------------- DATA ---------------- */

//   const userQueue = talentRoom.queue.find(u => u.user_id === user._id);
//   const userEliminated = talentRoom.eliminations.find(u => u.user_id === user._id);

//   const data =
//     userParticipation?.performances ||
//     userQueue?.performances ||
//     userEliminated?.performances ||
//     null;
//   // console.log(data)
//   /* ---------------- STATUS LOGIC (CLEAN) ---------------- */

//   const status = useMemo(() => {
//     if (userParticipation){ setType("deleteContestantStage") ; return "Joined"};
//     if (userEliminated) { setType("deleteContestantElimination") ;return "Eliminated"};
//     if (userQueue) {setType("deleteContestantQueue"); return "Queued"};
//     if (numberOfContestants < MAX) {
//       edition.round < 4  && setType("new") 
//       edition.round >= 4  && setType("queue") 
//       return edition.round < 4 ? "Join" : "Queue";
//     }
//     setType("queue")
//     return "Queue";
//   }, [userParticipation, userQueue, userEliminated]);

//   const statusLabel = {
//     Joined: "Resign",
//     Queued: "Delete",
//     Eliminated: "Delete",
//     Join: "Join",
//     Queue: "Join Queue",
//   };

//   /* ---------------- LAYOUT ---------------- */

//   const ITEM_WIDTH = w ;
//   const SNAP = ITEM_WIDTH + 2;
//   const SIDE = (w - ITEM_WIDTH) / 2;

//   /* ---------------- HANDLERS ---------------- */

//   const handlePlay = async (item, index) => {
//     if (!item?.video?.cdnUrl) return;

//     setSelectedContestant(userParticipation);
//     updatePerformanceIndex(userParticipation?._id, index);

//     await player.replaceAsync(item.video.cdnUrl);

//     setTimeout(() => {
//       if (isPlaying) {
//         player.pause();
//         setIsPlaying(false);
//       } else {
//         player.play();
//         setIsPlaying(true);
//       }
//     }, 200);
//   };

//   const handleDelete = (item) => {
//     setPerformanceToDelete(item);

//     if (userParticipation) {
//       setParticipationType("DeletePerformanceStage");
//     } else if (userQueue) {
//       setParticipationType(
//         data.length > 1
//           ? "DeletePerformanceQueue"
//           : "DeleteContestantQueue"
//       );
//     }

//     confirmAction();
//   };

//   /* ---------------- RENDER ITEM ---------------- */

//   const renderItem = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * SNAP,
//       index * SNAP,
//       (index + 1) * SNAP,
//     ];
//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.85, 1, 0.85],
//       extrapolate: "clamp",
//     });

//     return (
//       <Animated.View
//         style={{
//           width: ITEM_WIDTH,
//           height: h ,
//           // height:h/2 ,
//           // marginHorizontal: 4,
//           transform: [{ scale }],
//         }}
//         className="items-center "
//       > 
       
//         {/* VIDEO CARD */}
//         <Pressable
//           onPress={async()=> {
//                      userParticipation && setStage(true)
//                      userParticipation && setSelectedContestant(userParticipation && userParticipation )
//                      updatePerformanceIndex(userParticipation._id , index)
//                      userQueue  && await player.replaceAsync(item.video?.cdnUrl)
//                      setTimeout(() => {
//                        userParticipation && (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )
//                        userQueue && (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )
//                        }, 300);
//                    }}
//           className="w-full h-[100%]  rounde d-2xl overflow-hidden bo rder bo rder-yellow-700/30"
//         >
//           <Image
//             source={{
//               uri:
//                 item.thumbnail?.publicUrl ||
//                 "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
//             }}
//             className="w-full h-full opacity-80"
//           />

//           {/* overlay */}
//           <View className="absolute inset-0 bg-black/40" />

//           {/* play icon */}
//           <Image
//             source={icons.play}
//             className="absolute w-10 h-10 self-center top-[40%]"
//           />

//           {/* bottom info */}
//           <View className="absolute bottom-2 w-full px-3 flex-row justify-between">
//             <Text className="text-xs text-gray-300">
//               {index === 0 ? "Latest" : "Previous"}
//             </Text>
//             <Text className="text-xs text-gray-400">
//               {getTimeLapse(item.date)} ago
//             </Text>
//           </View>
//         </Pressable>

//         {/* DELETE BUTTON */}
//         <Pressable
//           onPress={() => {
//                            if(userParticipation) {
//                             if(data) { 
//                               data.length > 1 ? setParticipationType("DeletePerformanceStage"):
//                                                 setParticipationType("DeleteContestantStage")
//                                    }
//                                } 
//                             if(userQueue) {
//                               if(data) { 
//                                    data.length > 1 ? setParticipationType("DeletePerformanceQueue"):
//                                                      setParticipationType("DeleteContestantQueue")
//                                         }
//                                        }
//                             if(userEliminated) {
//                                 if(data) { 
//                                     data.length > 1 ? setParticipationType("DeletePerformanceQueue"):
//                                              setParticipationType("DeleteContestantQueue")
//                                           }
//                                         }
//                               setPerformanceToDelete(item)
//                               confirmAction
//                           }}
            
//           className=" px-4   absolute top-0  py-4 rounded-lg bor der bor der-yellow-700/30"
//         >
//           <Text className="text-xs text-yellow-400 font-semibold">
//             Remove
//           </Text>
//         </Pressable>
       
//       </Animated.View>
//     );
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <View
//       style={{
//         position: "absolute",
//         top: top,
//         height: h,
//         width: w,
//       }}
//       className="bg-[#0a0a0f] justify-center items-center "
//     >
      
      

//       <View
//         className ="flex-1 py- 4 items-center"
//         style={{
//           width: w,
//         }}
//       > 
//         {data ? (
//              <Animated.FlatList
//              ref={flatListRef}
//              data={data}
//              horizontal
//              keyExtractor={(item, i) => item.video?.fileId || i.toString()}
//              renderItem={renderItem}
//              snapToInterval={SNAP}
//              showsHorizontalScrollIndicator={false}
//              contentContainerStyle={{
//                paddingHorizontal: SIDE /2,
//              }}
//              onScroll={Animated.event(
//                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                { useNativeDriver: true }
//              )}
//            />

//         ) : (
          
//              <View
//                  style={{ 
//                           backgroundColor:  'rgba(0,0, 0 , 0.1)'
//                       }}
//                  className = "flex-1 w-[70%] flex-col px-2 py-4 text-center mt- auto justify-center gap-4 b g-black rounded-xl items-center ">
//                     <Text 
//                         style ={{fontSize:width/35, }}
//                         className="text-xl font-bold text-center font-bebas tracking-widest  text-gray-200"> 
//                              { status == "join" ?"Join the contest, shine on stage, and show the world what you’ve got! The audience will watch, vote, and judge your performance." :
//                                status == "queue"?"The stage is full ! Join the queue, get ready to shine, and soon the audience will watch, vote, and judge your talent." :
//                                " You're not on stage yet! Want to showcase your talent? Join the Stage below"} 
//                      </Text>
//                     <Image 
//                        className="w-[30px] h-[30px] rounded-full"
//                        resizeMethod='cover'
//                        source={icons.down_arrow}/>
//              </View>
                        
//         )}
          
//       </View>
//       <LinearGradient
//            pointerEvents="none"
//            colors={[ "transparent" , "rgba(0,0,0,0.95)"]}
//                 style={{
//                  position: "absolute",
//                  bottom: 0,
//                  alignSelf: "center",
//                  width: width,
//                  height:  height/10,
//                  borderRadius: 0,
//                }}
//       />   
  
//       {/* 🔻 BOTTOM ACTIONS */}
//       <View
//       className="p- 2 w-full absolute bottom-0 flex-row justify-center items-end"
//         style={{
//           width: "100%",
//           // gap: 12,
//         }}
//       >
//         <View
//         className ="min-w-[25%] flex-row justify-center pb-2 items-center ">
//           <Pressable
//             onPress={() => {
//               if ( status == "Join" &&  userCountryCode !== talentRoom.region) {
//                 setParticipationType("CNTJ");
//                 return;
//               }
//               setParticipationType(type);
//               confirmAction
//             }}
//             className="px-6 py-2 border border-black-200 rounded-md bg-[#111110]"
//           >
//             <Text
//               style = {{ 
//                 color: status == "Join" ? "orange" : status == "Queue" ? "lightblue" : "#EF4444",
//                 fontSize : width/38
//               }}
//               className="text-yellow-400 font-bebas tracking-widest">
//               {statusLabel[status]}
//             </Text>
//           </Pressable>
//         </View>

//         <View
//                            style ={{ 
//                            // backgroundColor :"rgba(0,0,0,0.4)"
//                            }}
//                            className= "flex-row gap-4 p-2 w-[40%] rounded-lg justify-center items-end">
//                               <TouchableOpacity
//                                           style={{
//                                           //   width : width 
//                                           }}
//                                           className="flex- 1   flex-col justify-start  items-center gap-2 ">
                                                
//                                                 <UserCard   selectedContestant={userParticipation || userQueue || userEliminated || 
//                                                            {...user , profile_img: user.profileImage.publicUrl}}  
//                                                             height={height/22} width={width * 0.7 } />
                                                
//                               </TouchableOpacity>
                            
//          </View>

//          <View
//          className ="min-w-[25%] flex- 1 bg -white flex-row justify-center pb-2 items-center ">
//          {(userParticipation || userQueue || userEliminated) && (
//           <Pressable
            
//             onPressIn={()=> { 
//                             userQueue &&  setParticipationType("qupdate")
//                             userEliminated && setParticipationType("backInQueue")
//                              // postTimeLaps < 3 ?
//                             userParticipation && setParticipationType("update")
//                             // :setParticipationType("action")
//                             confirmAction;
//                              }}
//             className="px-4 py-2  rounded-md pt- 2 border border-yellow-700/40"
//           >
//             <Text 
//               style = {{ fontSize : width/44}}
//               className="text-white font-bebas tracking-wider">
//               {userEliminated ? "Back In Queue" : "Add Performance"}
//             </Text>
//           </Pressable>
//         )}
//         </View>
//       </View>
//       {data  && (
//         <>
//             <CarouselIndicator
//             count = {data && data.length}
//             scrollX = {scrollX}
//             width = {width}
//             position = {
//                   {
//                     bottom : h/12 ,
//                     right : null
//                   }
//             }
//             rank = {userParticipation?.rank || null }
//             votes={userParticipation?.votes + 1 || null}
//             status={status}
//           />
//           <StatusDisplayer status ={status} bottom = {h/9} />
//         </>
//       )}

      

     
  
//     </View>
//   );
// };

// export default ContestantRoom;




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
    (u) =>
      String(u.user_id) === String(user._id)
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
      .reverse() || [];

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
    Eliminated: "REMOVE",
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

                  setStage(true);

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
                      className="w-8 h-8"
                      tintColor="white"
                    />

                  </View>

                </View>

                {/* BOTTOM PERFORMANCE INFO */}

                <View 
                  style = {{
                  bottom: bottom * 2  }}
                  className="absolute flex-row px-4 w-full">
                  
                  
            
                  <View className=" flex-row items-end flex-1 justify-between">

                    {/* TIME */}

                    <BlurView
                      intensity={20}
                      tint="dark"
                      style={{
                        borderRadius: 999,
                        overflow: "hidden",
                      }}
                    >
                     
                      <View className="px-4 flex-row py-2 gap-1">
                      <Text
                          style={{
                            fontSize:
                              width / 45,
                          }}
                          className="text-gray-300 "
                        >
                          {index === 0
                            ? "Most Recent "
                            : "Previous "}
                        </Text>

                        <Text
                          style={{
                            fontSize:
                              width / 45,
                          }}
                          className="text-white font-semibold"
                        >
                          {getTimeLapse(
                            item.date
                          )} ago
                        </Text>

                      </View>

                    </BlurView>
                    
                    

                    {/* REMOVE */}

                    <Pressable
                      onPress={() =>{
                        // deletePerformance(item)
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
                              : "DeleteContestantQueue1"
                          );
                        }
                        confirmAction;
                      }
                      }
                      className="px-4 py-2 border border-red-500/20"
                    >

                      <BlurView
                        intensity={20}
                        tint="dark"
                        style={{
                          borderRadius: 24,
                          overflow: "hidden",
                        }}
                      >

                        {/* <View className="px-4 py-2 border border-red-500/20"> */}

                          <Text
                            style={{
                              fontSize:
                                width / 40,
                            }}
                            className="text-red-400 font-bold"
                          >
                            REMOVE
                          </Text>

                        {/* </View> */}

                      </BlurView>

                    </Pressable>

                  </View>
             

                </View>

              </Pressable>

            </Animated.View>
        </View>
      );
    },
    [
      isPlaying,
      contestant,
      data,
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

  return (

    <View
      style={{
        position: "absolute",
        top,
        width: w,
        height: h,
      }}
      className="bg-black flex -1 justify-center items-center "
    >

      {/* <StatusBar barStyle="light-content" /> */}

      {/* BACKGROUND */}

      {/* <LinearGradient
        colors={[
          "#050507",
          "#0B0B12",
          "#111118",
          "#050507",
        ]}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      /> */}

      {/* CONTENT */}

      {/* <View className="flex-1"> */}

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

         {data.length > 0 && (
         <CarouselIndicator
              count={data.length}
              scrollX={scrollX}
              width={width}
              position={{
                bottom: bottom * 2 - 10,
                right: null,
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
           )} 
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
                          status={status}
                          bottom={0}
                        />

             <Pressable
                onPress={() => {

                  if (
                    status === "Join" &&
                    userCountryCode !==
                      talentRoom.region
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
                  }}
                  
                >

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

      {/* INDICATORS */}
{/* 
      {data?.length > 0 && (
        <>
          <CarouselIndicator
            count={data.length}
            scrollX={scrollX}
            width={width}
            position={{
              bottom: h / 5.8,
              right: null,
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

          <StatusDisplayer
            status={status}
            bottom={h / 4.4}
          />
        </>
      )} */}

    </View>
  );
};

export default ContestantRoom;