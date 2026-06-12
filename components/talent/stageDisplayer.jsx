
import { View, Text,  useWindowDimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIcon, getStageLogo } from '../../helper';
import StageHeader from './custom/StageHeader';
import { useGlobalContext } from '../../context/GlobalProvider';
import PostTalentHeader from '../activityHeader/PostTalentHeader';
import { icons, images } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { countries, stageCenterImages, stageCoverImages, stageIcons } from '../../utilities/TypeData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StageDisplayer({ userTalent, user, width , height }) {
  const { screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [roundTitle, setRoundTitle] = useState(null);
  const {colorTheme} = useGlobalContext()
  const region = countries.find(
    c => c.code === userTalent.region
  );
  // 🎭 Round title
  useEffect(() => {
    const edition = userTalent.editions?.find(e => e.status === "open") || null;
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

    setRoundTitle(roundMapping[edition.round] || null);
  }, [userTalent.editions]);

  // 🎤 Selected contestant
  useEffect(() => {
    if (!userTalent?.contestants?.length) {
      setSelectedContestant(null);
      return;
    }
    const contestant =
      userTalent.contestants.find(c => c.user_id === user?._id) ||
      userTalent.contestants[0];
    setSelectedContestant(contestant);
  }, [userTalent]);

  return (
    <View
      style={{
        height,
        width,
        // position: "relative",
        overflow: "hidden",
        // backgroundColor : colorTheme
      }}
      className="bord er-2 bo rder-[#35270c]  bg-[#b68b0b]/20 p- 2"
    >
      <Pressable
        onPress={() =>
          router.push({
            pathname: "TalentContestRoom",
            params: {
              region: userTalent.region,
              selectedTalent: userTalent.name,
              selectedIcon: getIcon(userTalent.name),
              regionIcon: getIcon(userTalent.region),
              startIntroduction: "true",
              showGo: "true",
              location: "contest",
              contestant_id: selectedContestant?.user_id ?? null,
              startPlayer : "true"
            },
          })
        }
        style={{ flex: 1 }}
        className="round ed-2xl justify-center bg-black items-center" >
        {selectedContestant ? (
          <Image
            source={{
              uri: selectedContestant?.performances?.[0]?.thumbnail?.publicUrl,
            }}
            style={{
              width: "100%",
              height: "100%",
              opacity:0.7
            }}
            resizeMethod="cover"
            className ="rou nded-[5px] "
          />
        ) : (
          <Image
          source={
            stageCenterImages[userTalent.name]
          }
          style={{
            width: "100%",
            height: "100%",
            opacity:0.7
          }}
          resizeMethod="cover"
          className ="roun ded-[5px] "
        />
        )}


         {/* STAGE */}
         <View className="flex-row absolute top-1 left-1  items-center bg-black/65 rounded-lg  p-2 " >
                <Text
                  style={{
                    fontSize: width /32,
                  }}
                >
                  {stageIcons[userTalent.name]}
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
                    tracking-widest
                    uppercase
                  " >
                  {userTalent.name}
                </Text>
         </View>

         <View
                className="
                  flex-row
                  justify-end
                  absolute top-1 right-1
                  items-center bg-black/65 rounded-lg  p-2
                " >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: width / 30,
                    marginLeft: 6,
                  }}
                  className="
                    text-white
                    font-bebas
                    tracking-widest
                    uppercase
                  " >
                  {region?.name} {'  '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: width /30,
                  }}
                    className="ml-auto"
                >
                  {region?.flag}{' '} 
                </Text>
          </View>

  
        {/* 🎤 Stage Header */}
        {/* <View
          style={{
            position: "absolute",
            top: 30,
            // left: 0,
            // right: 0,
            zIndex: 20,
            // paddingTop: 30,
            paddingHorizontal: 10,
  
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 10,
          }}
          className = "justify-center w-full items-center"
        >
          <StageHeader
            stageLogo={getStageLogo(userTalent.name)}
            stageTitle={userTalent.name}
            region={userTalent.region}
            contestants={userTalent.contestants.length}
            round={roundTitle}
            continentLogo={getStageLogo(userTalent.region)}
            continentName={userTalent.region}
            width={width}
            height ={height}
          />
        </View> */}
  
        {/* ▶️ Play Button */}
{/*        
          <View className="absolute inset-0 justify-center items-center z-10">
            <View className="bg -black/60 p- 2 rounded-full bor der bor der-yellow-500/40">
              <Image
                style={{
                  width: height / 7,
                  height: height / 7,
                }}
                source={icons.play}
                contentFit="contain"
              />
            </View>
          </View> */}

          <View
              style={{
                position: "absolute",
                width: 34,
                height: 34,
                borderRadius: 24,
                backgroundColor: "rgba(0,0,0,0.55)",
                justifyContent: "center",
                alignItems: "center",
              }}
              // className = "bg-goldSoft/40"
            >
              <MaterialCommunityIcons
                name="play"
                size={20}
                color = "white"
              />
          </View>
      


  
        {/* 👤 Bottom User Header */}
        <View
          style={{
            position: "absolute",
            bottom: 5,
            left: 3,
            right: 3,
            zIndex: 20,
            // paddingBottom: 8,
            
          }}
          className="bg-black/60 justify-center rounded-2xl items-center"
        >
          <PostTalentHeader
            data={userTalent}
            width={width}
            user={user}
            height={height}
          />
        </View>

      </Pressable>
    </View>
  );
}