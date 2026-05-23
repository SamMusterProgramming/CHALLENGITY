import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  Image
} from "react-native";
import { getInition } from "../../helper";

const { width ,height} = Dimensions.get("window");

const ITEM_SIZE = Math.round(height / 10);
const SPACING = 20;
const SNAP = Math.round(ITEM_SIZE + SPACING);

export default function ContestantsDisplayer({
  contestants = [],
  selectedContestant,
  setSelectedContestant,
  show
}) {

  const flatList = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const translateY = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: !show? -120 : 0,
        duration: 380,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnim, {
        toValue: !show ? 0 : 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [show]);



  // const renderItem = ({ item, index }) => {
   
  //   const inputRange = [
  //     (index - 1) * SNAP,
  //     index * SNAP,
  //     (index + 1) * SNAP,
  //   ];

  //   // cinematic transforms
  //   const scale = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [0.82, 1.0, 0.82],
  //     extrapolate: "clamp",
  //   });

  //   const opacity = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [0.28, 1, 0.28],
  //     extrapolate: "clamp",
  //   });

  //   const rotate = scrollX.interpolate({
  //     inputRange,
  //     outputRange: ["18deg", "0deg", "-18deg"],
  //     extrapolate: "clamp",
  //   });

  //   const blur = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [12, 0, 12],
  //     extrapolate: "clamp",
  //   });

  //   return (
  //     <Animated.View
  //       className = "items-center  justify-center"
  //       style={{
  //         width: ITEM_SIZE,
  //         marginHorizontal: SPACING / 2,
  //         alignItems: "center",
  //         transform: [
  //           // { translateY },
  //           { scale },
  //           { rotate },
  //         ],
  //         opacity,
  //       }} >
  //       {/* glow */}
  //       <Animated.View
  //         className = "items-center justify-center"
  //         style={{
  //           position: "absolute",
  //           width: ITEM_SIZE + 10,
  //           height: ITEM_SIZE + 10,
  //           borderRadius: 999,
  //           backgroundColor: "rgba(255,255,255,0.12)",
  //           opacity: scale,
  //         }}  />

  //       {/* avatar */}
  //       <Image
  //         source={{ uri: item.profileImage.publicUrl }}
  //       //   blurRadius={index === 0 ? 0 : 2}
  //         style={{
  //           width: ITEM_SIZE,
  //           height: ITEM_SIZE,
  //           borderRadius: 999,
  //           borderWidth: item.rank === 1 ? 3 : 2,
  //           borderColor:
  //             item.rank === 1
  //               ? "#FFD700"
  //               : "rgba(255,255,255,0.25)",
  //         }}
  //       />
  //     </Animated.View>
  //   );
  // };

  const renderItem = ({ item, index }) => {

    const inputRange = [
      (index - 1) * SNAP,
      index * SNAP,
      (index + 1) * SNAP,
    ];
  
    // cinematic transforms
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.82, 1.0, 0.82],
      extrapolate: "clamp",
    });
  
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.28, 1, 0.28],
      extrapolate: "clamp",
    });
  
    // const rotate = scrollX.interpolate({
    //   inputRange,
    //   outputRange: ["18deg", "0deg", "-18deg"],
    //   extrapolate: "clamp",
    // });
  
    return (
  
      <Animated.View
        className="items-center justify-center"
        style={{
          width: ITEM_SIZE ,
          height: ITEM_SIZE ,
          marginHorizontal: SPACING / 2,
          transform: [
            { scale },
            // { rotate },
          ],
          opacity,
        }}
      >
  
        {/* CINEMATIC GLOW */}
        <Animated.View
          className="absolute items-center  justify-center"
          style={{
            width: ITEM_SIZE ,
            height: ITEM_SIZE ,
            borderRadius: 999,
            // backgroundColor:
            //   item.rank === 1
            //     ? "rgba(255,215,0,0.18)"
            //     : "rgba(255,255,255,0.08)",
            opacity: scale,
          }}
        />
  
        {/* AVATAR WRAPPER */}
        <View
          className="items-center p-4 justify-center"
          style={{
            width: ITEM_SIZE  ,
            height: ITEM_SIZE,
          }}
        >
            {/* PROFILE IMAGE */}
            <Image
              source={{
                uri: item.profileImage.publicUrl
              }}
              style={{
                // width: ITEM_SIZE,
                // height: ITEM_SIZE,
                borderRadius: 999,
                borderWidth:
                  item.rank === 1 ? 3 : 2,
                borderColor:
                  item.rank === 1
                    ? "#FFD700"
                    : "rgba(255,255,255,0.22)",
              }}
              className ="flex-1 w-[100%] h-[100%]"
            />
        </View>

          <View
            className="
              absolute
              bottom-[-15]
              left -[0]
              px-1
              py-[3px]
              w-[100%]
              rounded-[5px]
              bo rder
              border-white/10
              bg-[white]/10
              items-center
            "
          >
            <Text
            numberOfLines={1}
              className="
                text-white
                font-bebas
                tracking-[1px]
                w-[100%]
                text-center
              "
              style={{
                fontSize: width / 47,
              }}
            >
              {item?.name}
            </Text>
          </View>
  
          {/* TOP RIGHT — RANK */}
          <View
            className="
              absolute
              flex-row
              gap -3
              top-[-15]
              rig ht-[-6]
              min -w -[42px]
              px-2
              py-[4px]
              rounded-md
              items-center
              justify-center
              bor der
            "
            style={{
              backgroundColor:
                item.rank < 4
                  ? "rgba(255,215,0,0.16)"
                  : "rgba(0,0,0,0.72)",
  
              borderColor:
                item.rank < 4
                  ? "rgba(255,215,0,0.25)"
                  : "rgba(255,255,255,0.08)",
            }}
          >
  
            <Text
              className="
                font-bebas
                tracking-[1px]
                text-[white]/70
              "
              style={{
                fontSize: width / 49,
               
              }}
            >
             Ranked #{item.rank}  .{'  '}
            </Text>

            <Text
              className="
                text-[white]/70
                font-bebas
                tracking-[1px]
              "
              style={{
                fontSize: width / 49,
              }}
            >
               VOTES {item?.votes || 0}
            </Text>
  
          </View>
  
         
  
  
          {/* GOLD DOT FOR #1 */}
          {item.rank <= 3 && (
            <View
              className="
                absolute
                bottom-[12]
                right-[8]
                w-[6px]
                h-[6px]
                rounded-full
                bg-[#FFD700]
              "
              style={{
                shadowColor: "#FFD700",
                shadowOpacity: 0.9,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
              }}
            />
          )}
  
    
  
      </Animated.View>
    );
  };

  if(!show) return null ; 

  return (
    <Animated.View
      // pointerEvents={!show ? "none" : "auto"}
      style={{
        // width: "100%",
        // height:height/6,
        alignItems: "center",
        // marginTop: 18,
        top:0,
        opacity: opacityAnim,
        transform: [{ translateY }],
      }}
       className ="absolute w-full "
    >

      <LinearGradient
           pointerEvents="none"
           colors={[  "rgba(0,0,0,0.95)" , "transparent" ]}
                style={{
                 position: "absolute",
                 top : 0,
                 alignSelf: "center",
                 width: width,
                 height:  height/3,
                 borderRadius: 0,
               }}
      />   
      {/* selected contestant title */}
      <View
       style={{
        // width: "100%",
        height:height/7
      }}
      className = "flex-1 w-full  justify-start items-center">
            <Animated.FlatList
                ref={flatList}
                data={contestants}
                horizontal
                keyExtractor={(item) => item._id}
                snapToInterval={SNAP}
                decelerationRate="fast"
                // disableIntervalMomentum
                pagingEnabled={false}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                paddingHorizontal: width / 2 - SNAP /2,
                alignItems: "center",
                justifyContent : "center"
                }}
                renderItem={renderItem}
                // onMomentumScrollEnd={(e) => {
                // const index = Math.round(
                //     e.nativeEvent.contentOffset.x / SNAP
                // );
                // const contestant = contestants[index];
                // if (contestant !== selectedContestant) {
                //     setSelectedContestant({...contestant});
                // }
                // }}
                onMomentumScrollEnd={(e) => {

                  const index = Math.round(
                      e.nativeEvent.contentOffset.x / SNAP
                  );
          
                  const contestant = contestants[index];
          
                  if (contestant !== selectedContestant) {
                      setSelectedContestant({ ...contestant });
                  }
                }}
                onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                    useNativeDriver: true,
                }
                )}
                scrollEventThrottle={16}
                initialScrollIndex={selectedContestant.rank-1}
                getItemLayout={(data, index) => ({
                    length: SNAP,
                    offset: SNAP * index,
                    index,
                })}
            />
      </View>
{/* 
      <View
        className = "w- full px-4 p-2 bg-primary/40 rounded-2xl items-center"
        style={{
        //   marginBottom: 22,
          alignItems: "center",
        }} >
        <Text
        className = "font-bebas tracking-widest"
          style={{
            color: "white",
            fontSize: width/40,
            fontWeight: "900",
            // letterSpacing: 0.5,
          }}
        >
          { getInition(selectedContestant?.name)}
        </Text>

        <Text
          style={{
            color: "rgba(255,255,255,0.8)",
            marginTop: 4,
            fontSize:  width/49,
            fontWeight: "700",
          }}
        >
          {selectedContestant?.rank <4 ? "TOP" : "RANK"} {selectedContestant?.rank} {"  "}•{"  "}
           VOTES {selectedContestant?.votes || 0}
        </Text>
      </View> */}

    </Animated.View>
  );
}