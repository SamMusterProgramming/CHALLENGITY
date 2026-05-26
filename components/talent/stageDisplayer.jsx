
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
import { stageCenterImages, stageCoverImages, stageIcons } from '../../utilities/TypeData';


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
        height,
        width,
        position: "relative",
        overflow: "hidden",
        // borderRadius: 20,
      }}
      className="border-2 border-white/30 primary rounded-[5px] p- 1"
    >
      {/* 🎬 Main Stage Area */}
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
            },
          })
        }
        style={{
          flex: 1,
          // position: "relative",
        }}
        className="round ed-2xl"
      >
        {/* 🖼 Thumbnail Background */}
        {selectedContestant ? (
          <Image
            source={{
              uri: selectedContestant?.performances?.[0]?.thumbnail?.publicUrl,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              opacity:0.3
            }}
            resizeMethod="cover"
            className ="rounded-[5px] "
            // cachePolicy="disk"
          />
        ) : (
          <Image
          source={
            stageCenterImages[userTalent.name]
          }
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            opacity:0.3
          }}
          resizeMethod="cover"
          className ="rounded-[5px] "
          // cachePolicy="disk"
        />
        )}
  
        {/* 🎭 Stage Cover Overlay */}
        <Image
          source={stageCoverImages[userTalent.name]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            opacity: 0.8,
          }}
          resizeMethod="cover"
          className ="rounded-[5px]  "
          // cachePolicy="disk"
        />
  
        {/* 🌑 Dark Overlay for readability */}
        {/* <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        /> */}
  
        {/* 🎤 Stage Header */}
        <View
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
        </View>
  
        {/* ▶️ Play Button */}
        {/* {selectedContestant && ( */}
          <View className="absolute inset-0 justify-center items-center z-10">
            <View className="bg-black/60 p-2 rounded-full border border-yellow-500/40">
              <Image
                style={{
                  width: height / 16,
                  height: height / 16,
                }}
                source={icons.play}
                contentFit="contain"
              />
            </View>
          </View>
        {/* )} */}
  
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