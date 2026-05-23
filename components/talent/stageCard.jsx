// import { View, Text } from 'react-native'
// import React from 'react'
// import { stageIcons } from '../../utilities/TypeData';

// export default function StageCard({
//                             stageData,
//                             width,
//                             height,
//                             region
//                            }) {
  
//     return (
//       <View
//         style={{
//           width: width * 0.44,
//           height: height * 0.2,
//         }}
//         className="
//           bg-[#111114]
//           border
//           border-[#F5D77A]/10
//           rounded-[5px]
//           items-center
//           justify-center
//           overflow-hidden
//           mb-3
//         "
//       >
  
//         {/* GOLD GLOW */}
//         <View
//           className="
//             absolute
//             top-0
//             left-0
//             right-0
//             h-[2px]
//             bg-[#F5D77A]
//           "
//         />
  
//         <Text
//           style={{
//             fontSize: width * 0.08,
//           }}
//         >
//           {stageIcons[stageData.name]}
//         </Text>
  
//         <Text
//           style={{
//             fontSize: width * 0.033,
//             marginTop: 6,
//             letterSpacing: 1,
//           }}
//           className="
//             text-[#F5D77A]
//             font-bebas
//           "
//         >
//           {stageData.name}
//         </Text>
  
//       </View>
//     );
//   };

import React, {
    useEffect,
    useState,
  } from "react";
  
  import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
  } from "react-native";
import { countries, stageIcons } from "../../utilities/TypeData";
import { router } from "expo-router";
import { getIcon } from "../../helper";
  

  
  export default function StageCard({
    stage,
    user,
    width,
    height,
    onPress,
  }) {
    const [roundTitle, setRoundTitle] = useState(null);
    const [selectedContestant, setSelectedContestant] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

  
    /* 🎭 ROUND TITLE */
    useEffect(() => {
  
      const edition =
        stage.editions?.find(
          e => e.status === "open"
        ) || null;
  
      if (!edition) return;
  
      const roundMapping = {
        1: "Elimination Round 1",
        2: "Elimination Round 2",
        3: "Elimination Round 3",
        4: "Eighth Finals",
        5: "Quarter Final",
        6: "Semi Final",
        7: "Grand Final",
        8: "Winner",
      };
  
      setRoundTitle(
        roundMapping[edition.round] || null
      );
  
    }, [stage.editions]);
  
    /* 🎤 SELECTED CONTESTANT */
    useEffect(() => {
      if (!stage?.contestants?.length) {
        setSelectedContestant(null);
        return;
      }
      const contestant =
        stage.contestants.find(
          c => c.user_id === user?._id
        ) || stage.contestants[0];

     const thumbnail =
        contestant?.performances?.[
         0
       ]?.thumbnail.publicUrl || null
      setSelectedContestant(contestant);
      setThumbnail(thumbnail)
    }, [stage]);
  
    const region = countries.find(
      c => c.code === stage.region
    );
  


    //   ||
    //   selectedContestant?.performances?.[
    //    0
    //   ]?.image;
  
    return (

        <TouchableOpacity
          activeOpacity={0.92}
          onPress={onPress}
          style={{
            width: width * 0.479,
            height: height ,
          }}
          className="
            rou nded-md
            overflow-hidden
            mb-2
            b g-[#171718]
            bo rder
            bor der-[#F5D77A]/15
            p-[2px]
          "
        >
      
          {/* SECOND BORDER */}
          <View
            className="
              flex-1
              rounded-[5px]  
              overflow-hidden
              bor der
              bor der-white/5
              b g-[#111114]
            "
          >
      
            {/* THUMBNAIL / SCREEN */}
            <Pressable
             onPress={() =>
                router.push({
                  pathname: 'TalentContestRoom',
                  params: {
                    region: stage.region,
                    selectedTalent: stage.name,
                    selectedIcon: getIcon(stage.name),
                    regionIcon: getIcon(stage.region),
                    startIntroduction: "true",
                    showGo: "true",
                    location: "contest",
                    contestant_id: selectedContestant?.user_id || null,
                  },
                })
              }
             className="flex-1 relative">
      
              {thumbnail ? (
      
                <Image
                  source={{
                    uri: thumbnail
                  }}
                  resizeMode="cover"
                  className="w-full h-full absolute"
                />
      
              ) : (
      
                <View
                  className="
                    flex-1
                    items-center
                    justify-center
                    bg-[#464648]
                  "
                >
      
                  <Text
                    style={{
                      fontSize: width * 0.07,
                    }}
                  >
                    {stageIcons[stage.name]}
                  </Text>
      
                </View>
      
              )}
      
              {/* DARK CINEMATIC OVERLAY */}
              <View
                className="
                  absolute
                  inset-0
                  bg-black/35
                "
              />
      
     
              <View
                className="
                  absolute
                  top-1
                  left-1
                  right-1
                  flex-row
                  items-start
                  justify-between
                "
              >
      
                {/* ROUND */}
                {roundTitle && (
                  <View
                    className="
                      bg-black/15
                      bor der
                      bor der-[#F5D77A]/15
                      px-2
                      py-[3px]
                      rounded-md
                    "
                  >
      
                    <Text
                      style={{
                        fontSize: width / 42,
                      }}
                      className="
                        text-[#F5D77A]
                        font-bebas
                        tracking-[1px]
                      "
                    >
                      {roundTitle}
                    </Text>
      
                  </View>
                )}
      
                {/* CONTESTANTS FRACTION */}
                <View
                  className="
                    bg-black/25
                    bor der
                    bord er-white/10
                    px-2
                    py-[3px]
                    rounded-md
                  "
                >
      
                  <Text
                    style={{
                      fontSize: width / 38,
                    }}
                    className="
                      text-white
                      font-bebas
                    "
                  >
                    {stage.contestants?.length || 0}
                    <Text className="text-zinc-400">
                      /{stage.MAXCONTESTANTS}
                    </Text>
                  </Text>
      
                </View>
      
              </View>
      
              {/* FLOATING DESCRIPTION */}
              {/* <View
                className="
                  absolute
                  left-3
                  top-[32%]
                  w-[72%]
                "
              >
      
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: width / 36,
                    lineHeight: width / 24,
                  }}
                  className="
                    text-white
                    font-semibold
                  "
                >
                  Discover rising talents competing in the{" "}
                  <Text className="text-[#F5D77A]">
                    {stage.name}
                  </Text>{" "}
                  arena and support performers fighting
                  for the spotlight.
                </Text>
      
              </View> */}
      
              {/* BOTTOM BAR */}
              <View
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  px-1
                  py-1
                  flex-row
                  items-center
                  justify-between
                  bg-black/25
                  bor der-t
                  bord er-white/5
                "
              >
      
                {/* STAGE */}
                <View
                  className="
                    flex-row
                    items-end
                  "
                >
      
                  <Text
                    style={{
                      fontSize: width / 42,
                    }}
                  >
                    {stageIcons[stage.name]}
                  </Text>
      
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: width / 40,
                      marginLeft: 6,
                    }}
                    className="
                      text-white
                      font-bebas
                      tracking-[1px]
                    "
                  >
                    {stage.name}
                  </Text>
      
                </View>
      
                {/* REGION */}
                <View
                  className="
                    flex-row
                    items-center
                    justify-end
                    w-[70%]
                  "
                >
                  <Text
                   numberOfLines={1}
                    style={{
                      fontSize: width / 40,
                    }}
                     className="ml-auto"
                  >
                    {region?.flag}{' '}
                            <Text
                            style={{
                            fontSize: width / 44,
                            marginLeft: 4,
                            }}
                            className="
                            text-zinc-300
                            font-semibold
                            "
                        >
                            {region?.name}
                        </Text>
                  </Text>
      
                </View>
      
              </View>
      
            </Pressable>
      
          </View>
      
        </TouchableOpacity>
      );
    }