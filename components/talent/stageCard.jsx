

import React, {
    useEffect,
    useState,
  } from "react";
  
  import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
  } from "react-native";
import { countries, stageCenterImages, stageCoverImages, stageIcons } from "../../utilities/TypeData";
import { router } from "expo-router";
import { getIcon } from "../../helper";
import { Image } from "react-native";
import { icons } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
// import { Image } from 'expo-image';
  

  
export default function StageCard({
  stage,
  user,
  width,
  height,
  onPress,
}) {
  const CARD_WIDTH = (width - 20) / 2;
  const [roundTitle, setRoundTitle] = useState(null);
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
 const {colorTheme} = useGlobalContext()

  /* 🎭 ROUND TITLE */
  useEffect(() => {
    const edition =
      stage.editions?.find(
        e => e.status === "open"
      ) || null;

    if (!edition) return;

    const roundMapping = {
      1: "Round 1",
      2: " Round 2",
      3: " Round 3",
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
          width: CARD_WIDTH,
          height: height ,
        }}
        className="
          rou nded-md
          overflow-hidden
          mb-[8px]
          bg-primary
          border
          border- gold/40 [#35270c] /15
          rounded-[5px] 
        "
      >
    
        {/* SECOND BORDER */}
        <View
          className="
            flex-1
            rounded-[5px]  
            overflow-hidden
            p- [1px]
            bg-[#35270c]
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
                  startPlayer : "false"
                },
              })
            }
            className="flex-1  justify-center items-center ">
    
            {thumbnail ? (
            <>
              <Image
                source={{
                  uri: thumbnail 
                }}
                resizeMethod="cover"
                // cachePolicy="disk"
                className="w-full h-full "
                style={{
                  width: '100%',
                  height: "100%",
                  opacity:0.9
                }}
              />
             
            </>
            ) : (
            <>
                <Image
                source={
                  stageCenterImages[stage.name]
                }
                resizeMethod="cover"
                // cachePolicy="disk"
                className="w-full h-full "
                style={{
                  width: '100%',
                  height: "100%",
                  opacity:0.9
                }}
              />
            
            </>
            )}
    
            {/* DARK CINEMATIC OVERLAY */}
          
            <View
              style={{
                position: "absolute",
                width: 24,
                height: 24,
                borderRadius: 24,
                backgroundColor: "rgba(0,0,0,0.55)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="play"
                size={20}
                color = "white"
              />
            </View>


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
                bottom-2
                left-2
                right-2
                flex-row
                items-start
                justify-between
                " >
    
              {/* ROUND */}
              {roundTitle && (
                <View
                  className="
                    bg-black/65
                    bor der
                    bor der-[#F5D77A]/15
                    px-4
                    py-2
                    rounded-md
                  " >
                  <Text
                    style={{
                      fontSize: width / 49,
                    }}
                    className="
                      text-[#eab308]
                      font-bold
                      trackin g-[1px]
                    "
                  >
                    {roundTitle}
                  </Text>
                </View>
              )}
              {/* CONTESTANTS FRACTION */}
              <View
                className="
                  bg-black/65
                  bor der
                  bord er-white/10
                  px-2
                  py-2
                  rounded-md " >
    
                <Text
                  style={{
                    fontSize: width / 38,
                  }}
                  className="
                    text-white
                    font-bebas
                    "  >
                  {stage.contestants?.length || 0}
                  <Text className="text-zinc-100">
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
                top-2
                left-2
                right-1
                flex-row
                items-center
                justify-between
                bord er-white/5
              "
            >
    
              {/* STAGE */}
              <View
                className="
                  flex-row
                  items-center
                 bg-black/65
                  p-2
                  rounded-xl
                "
              >
                <Text
                  style={{
                    fontSize: width / 30,
                  }}
                >
                  {stageIcons[stage.name]}
                </Text>
    
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: width / 30,
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
                         
                </Text>
    
              </View>
    
            </View>
    
          </Pressable>
    
        </View>
    
      </TouchableOpacity>
    );
  }