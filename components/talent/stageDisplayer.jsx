
// import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { router } from 'expo-router';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { getIcon, getStageLogo } from '../../helper';
// import Contestant from './Contestant';
// import StageHeader from './custom/StageHeader';
// import { useGlobalContext } from '../../context/GlobalProvider';
// import PostTalentHeader from '../activityHeader/PostTalentHeader';
// import TalentActivityHeader from '../activityHeader/TalentActivityHeader';
// import { icons, images } from '../../constants';
// import { LinearGradient } from 'expo-linear-gradient';
// import { stageIcons } from '../../utilities/TypeData';

// export default function StageDisplayer({ userTalent, user, userProfile, activity, width , height }) {
//   const { boxBgColor } = useGlobalContext();
//   const { screenWidth } = useWindowDimensions();
//   const insets = useSafeAreaInsets();

//   const [selectedContestant, setSelectedContestant] = useState( null);
//   const [selectedContestantImg, setSelectedContestantImg] = useState(null);
//   const [isReady, setIsReady] = useState(false);

//   const participationStatus = userTalent.contestants.find(c => c.user_id === user._id)
//     ? "ON STAGE"
//     : userTalent.queue.find(c => c.user_id === user._id)
//     ? "IN QUEUE"
//     : userTalent.eliminations.find(c => c.user_id === user._id)
//     ? "ELIMINATED"
//     : "NOT CONTESTANT";

//   const [roundTitle, setRoundTitle] = useState(null);

//   // Set round title
//   useEffect(() => {
//     const edition = userTalent.editions?.find(e => e.status === "open") || null;
//     if (!edition) return;

//     const roundMapping = {
//       1: "Elimination-Round 1",
//       2: "Elimination-Round 2",
//       3: "Elimination-Round 3",
//       4: "Eighth-finals",
//       5: "Quarter Final",
//       6: "Semi Final",
//       7: "Grand Final",
//       8: "Winner",
//     };

//     setRoundTitle(roundMapping[edition.round] || null);
//   }, [userTalent.editions]);


//   useEffect(() => {
//     if (!userTalent?.contestants?.length) {
//       setSelectedContestant(null);
//       return;
//     }
  
//     const contestant =
//       userTalent.contestants.find(
//         (c) => c.user_id === user?._id
//       ) || userTalent.contestants[0];
  
//     setSelectedContestant(contestant);
//   }, [userTalent]);

  
 

//   return (
 
//     <View
//       style={{
//         height: height * 0.4, // + width / 8.5 ,
//         width: width,
//         borderRadius: 0,
//       }}
//       className = "justify-start items-center "
//     >

//        <View 
//          className="bg-neutral-950 flex-1 mb- 12 w-full roun ded-lg flex-col justify-start items-center bg-gradient-to-tr  fro m-[#3838a1] to-[#0 672de] or der bor der-white/30">
//         <LinearGradient
//           pointerEvents="none"
//           colors={["rgba(255,255,255,0.25)", "transparent"]}
//           style={{
//             position: "absolute",
//             top: 0,
//             alignSelf: "center",
//             width: "100%",
//             height: 30,
//             borderRadius: 5,
//           }}
//         />
//           <LinearGradient
//           pointerEvents="none"
//           colors={[ "transparent","rgba(255,255,255,0.25)"]}
//           style={{
//             position: "absolute",
//             bottom: 0,
//             alignSelf: "center",
//             width: "100%",
//             height: 30,
//             borderRadius: 5,
//           }}
//        />
//           <LinearGradient
//           pointerEvents="none"
//           colors={["transparent", "rgba(255,255,255,0.25)"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={{
//             position: "absolute",
//             right: 0,
//             top: 0,
//             bottom: 0,
//             width: width/10,
//             borderRadius: 5,
//           }}
//         /> 
//           <LinearGradient
//           pointerEvents="none"
//           colors={["transparent", "rgba(255,255,255,0.25)"]}
//           start={{ x: 1, y: 0 }}
//           end={{ x: 0, y: 0 }}
//           style={{
//             position: "absolute",
//             left: 0,
//             top: 0,
//             bottom: 0,
//             width: width/15,
//             borderRadius: 5,

//           }}
//         /> 
    
//       {/* Stage Header */}
//       <StageHeader
//                             stageLogo={getStageLogo(userTalent.name)}
//                             stageTitle={userTalent.name}
//                             region={userTalent.region}
//                             contestants={userTalent.contestants.length}
//                             round={roundTitle}
//                             continentLogo={getStageLogo(userTalent.region)}
//                             continentName= {userTalent.region}
//                             width={width}
//                          />  

 
//       {selectedContestant && (
//         <TouchableOpacity
//           onPress={() =>
//             router.push({
//               pathname: 'TalentContestRoom',
//               params: {
//                 region: userTalent.region,
//                 selectedTalent: userTalent.name,
//                 selectedIcon: getIcon(userTalent.name),
//                 regionIcon: getIcon(userTalent.region),
//                 startIntroduction: "true",
//                 showGo: "true",
//                 location: "contest",
//                 contestant_id: selectedContestant.user_id,
//               },
//             })
//           }
//           className="w-[85%] flex-1 rounded-md mt-2 pb-2   items-center justify-center"
//         >
//           <Image
//             className="w-[100%] h-[100%] opacity-60 rounded-md"
//             source={{uri: selectedContestant?.performances[0].thumbnail?.publicUrl }}
//             resizeMethod="cover"
//           />
//           <Image
//             className="absolute w-10 h-10 rounded-xl top- 2 right- 2"
//             source={icons.play}
//             resizeMethod="contain"
//           />

         
//         </TouchableOpacity>
//       )}

//       {userTalent.contestants.length == 0 && (
//         <TouchableOpacity
//               onPress={() =>
//                   router.push({
//                   pathname: 'TalentContestRoom',
//                   params: {
//                       region: userTalent.region,
//                       selectedTalent: userTalent.name,
//                       selectedIcon: getIcon(userTalent.name),
//                       regionIcon: getIcon(userTalent.region),
//                       startIntroduction: "true",
//                       showGo: "true",
//                       location: "contest",
//                       contestant_id: null,
//                   },
//                   })
//               }
//               className="w-[85%] flex-1 border bg-gray-800 rounded-md mt-2  items-center justify-center"
//               >
//               <Text 
//                 style={{ fontSize : width/7}}
//                 className="text-white  font-extrabold tracking-widest">
//                     {stageIcons[userTalent.name]}
//               </Text>
          
//         </TouchableOpacity>
//       )}
     
//       <PostTalentHeader data={userTalent} width={width} user={user} />
//       </View>
 
//     </View>
//   );
// }

import { View, Text, Image, useWindowDimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIcon, getStageLogo } from '../../helper';
import StageHeader from './custom/StageHeader';
import { useGlobalContext } from '../../context/GlobalProvider';
import PostTalentHeader from '../activityHeader/PostTalentHeader';
import { icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { stageIcons } from '../../utilities/TypeData';

export default function StageDisplayer({ userTalent, user, width , height }) {
  const { screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [selectedContestant, setSelectedContestant] = useState(null);
  const [roundTitle, setRoundTitle] = useState(null);

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
        height: height ,
        width: width,
      }}
      className="justify-start items-center"
    >
      {/* 🎬 Cinematic Container */}
      <View className="flex-1 w-full items-center bg-[#010101] [#0a0a0a] bor der bo rder-yellow-500/20">

        {/* ✨ Gold Glow Edges */}
        {/* <LinearGradient
          colors={["rgba(255,215,0,0.25)", "transparent"]}
          style={{ position: "absolute", top: 0, width: "100%", height: 40 }}
        />
        <LinearGradient
          colors={["transparent", "rgba(255,215,0,0.2)"]}
          style={{ position: "absolute", bottom: 0, width: "100%", height: 40 }}
        /> */}

        {/* 🎭 Stage Header */}
        <StageHeader
          stageLogo={getStageLogo(userTalent.name)}
          stageTitle={userTalent.name}
          region={userTalent.region}
          contestants={userTalent.contestants.length}
          round={roundTitle}
          continentLogo={getStageLogo(userTalent.region)}
          continentName={userTalent.region}
          width={width}
        />

        {/* 🎬 Main Spotlight (Contestant / Stage Preview) */}
        {selectedContestant && (
          <Pressable
            onPress={() =>
              router.push({
                pathname: 'TalentContestRoom',
                params: {
                  region: userTalent.region,
                  selectedTalent: userTalent.name,
                  selectedIcon: getIcon(userTalent.name),
                  regionIcon: getIcon(userTalent.region),
                  startIntroduction: "true",
                  showGo: "true",
                  location: "contest",
                  contestant_id: selectedContestant.user_id,
                },
              })
            }
            className="w-[95%] p- 4 flex-1 bg-black-100 flex-row justify-center items-center overf low-hidden"
          >
            {/* 🎥 Background Image */}
            <Image
              className="w-[100%] h-[100%]  opacity-70"
              source={{ uri: selectedContestant?.performances[0].thumbnail?.publicUrl }}
              resizeMethod="cover"
            />

            {/* 🎬 Cinematic Overlay */}
            {/* <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.9)"]}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "60%",
                borderRadius: 8,
              }}
            /> */}

            {/* ▶️ Play Button */}
            <View className="absolute justify-center items-center">
              <View className="bg-black/60 p-3 rounded-full border border-yellow-500/40">
                <Image
                  className="w-6 h-6"
                  source={icons.play}
                  resizeMethod="contain"
                />
              </View>
            </View>
          </Pressable>
        )}

        {/* 🎭 Empty State */}
        {userTalent.contestants.length === 0 && (
          <Pressable
            onPress={() =>
              router.push({
                pathname: 'TalentContestRoom',
                params: {
                  region: userTalent.region,
                  selectedTalent: userTalent.name,
                  selectedIcon: getIcon(userTalent.name),
                  regionIcon: getIcon(userTalent.region),
                  startIntroduction: "true",
                  showGo: "true",
                  location: "contest",
                  contestant_id: null,
                },
              })
            }
            className="w-[95%]  flex-1 mt- 2 justify-center items-center bg-black-100 bor der bo rder-yellow-500/20"
          >
            <Text
              style={{ fontSize: width / 7 }}
              className="text-yellow-400/80 font-extrabold tracking-widest"
            >
              {stageIcons[userTalent.name]}
            </Text>

            <Text className="text-gray-400 text-xs mt-2 tracking-widest">
              BE THE FIRST TO PERFORM
            </Text>
          </Pressable>
        )}

        {/* 🎬 Footer */}
        <PostTalentHeader data={userTalent} width={width} user={user} />
      </View>
    </View>
  );
}