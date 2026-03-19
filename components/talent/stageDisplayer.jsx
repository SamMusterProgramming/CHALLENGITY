// import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { icons } from '../../constants';
// import { router } from 'expo-router';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { getIcon, getStageLogo } from '../../helper';
// import Contestant from './Contestant';
// import SwingingTitle from '../custom/SwingingTitle';
// import VacntSpotContestant from './VacntSpotContestant';
// import { useGlobalContext } from '../../context/GlobalProvider';
// import PostTalentHeader from '../activityHeader/PostTalentHeader';
// import TalentActivityHeader from '../activityHeader/TalentActivityHeader';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { getVideo, migrateToBackblaze, migrateToBackblaze2 } from '../../videoFiles';
// import StageHeader from './custom/StageHeader';

// export default function StageDisplayer({userTalent, user , userProfile ,activity ,width}) {
//     const {boxBgColor} = useGlobalContext()
//     const[ userParticipation , setUserParticipation ] = useState(null)
//     const[ rank , setRank ] = useState(0)
//     const[ roundTitle , setRoundTitle ] = useState(null)
//     const[ name , setName ] = useState(null)
//     const { screenWidth, height } = useWindowDimensions();
//     const participationStatus = userTalent.contestants.find( c => c.user_id === user._id ) ? "ON STAGE" :
//                                 userTalent.queue.find( c => c.user_id === user._id ) ? "IN QUEUE":
//                                 userTalent.eliminations.find( c => c.user_id === user._id ) ?  "ELIMINATED":"NOT CONTESTANT"
//     const insets = useSafeAreaInsets();
//     const [selectedContestant , setSelectedContestant] = useState(userTalent.contestants[0] || null)
//     const [vacantSpots, setVacantSpots] = useState([])
    
//     const [selectedContestantImg , setSelectedContestantImg] = useState(null)
//     const [selectedContestantThumbNail , setSelectedContestantThumbNail] = useState(null)

//     const h = width 
//     const contestants = userTalent.contestants 

//     useEffect(() => {
//         userTalent.contestants.find(c => c.user_id === user._id) && setUserParticipation(
//                       {...userTalent.contestants.find(c => c.user_id === user._id), status:participationStatus}
//                       )
//         userTalent.queue.find(c => c.user_id === user._id) && setUserParticipation(
//                         {...userTalent.queue.find(c => c.user_id === user._id), status:userParticipation}
//                       )
//         userTalent.eliminations.find(c => c.user_id === user._id) && setUserParticipation(
//                         {...userTalent.eliminations.find(c => c.user_id === user._id), status : userParticipation}
//                       )
//        setRank(userTalent.contestants.findIndex(c => c.user_id === user._id) + 1)
//        const edition = userTalent.editions.find(e => e.status == "open") || null
//        switch (edition && edition.round) {
//         case 1:
//             setRoundTitle("Elimination-Round 1")
//             break;
//         case 2:
//             setRoundTitle("Elimination-Round 2")
//             break;
//         case 3:
//             setRoundTitle("Elimination-Round 3")
//             break;
//         case 4:
//             setRoundTitle("Eighth-finals")
//             break;
//         case 5:
//             setRoundTitle("Quarter Final")
//             break;
//         case 6:
//             setRoundTitle("Semi Final")
//             break;
//         case 7:
//             setRoundTitle("Grand Final")
//             break;
//         case 8:
//             setRoundTitle("Winner")
//             break;
//         default:
//           break;
//        }
//     }, [])

//     useEffect(() => {
//       const userTalentMaterial = async() => {
//        if(selectedContestant) { 
//            const splitName = selectedContestant.name.split(" ")
//            setName({
//            part1 : splitName[0],
//            part2: splitName[1] && splitName[1]
//             })
//           let vs = []
//           for (let index = 0; index < 22 ; index++) {
//                 vs.push({index : index})    
//           }
//           setVacantSpots(vs)  

      
//            await  migrateToBackblaze2 (userTalent._id, selectedContestant.user_id)
//            setSelectedContestantImg(selectedContestant.profile_img)


//           }
//         }    
//         userTalentMaterial()
//     }, [selectedContestant])

//   return (

//     <View
//         style={{height: h + width/3.5  + width * 0.10, width : width ,          borderRadius: 20,
//         }}
//         className=" mb-8 w-[100%]   rounded-lg gap-1  flex-col  justify-start items-center bg-gradient-to-r from-[#0f0f1a] to-black  border border-white/30 ">
            
        
//                 <StageHeader
//                             stageLogo={getStageLogo(userTalent.name)}
//                             stageTitle={userTalent.name}
//                             contestants={userTalent.contestants.length}
//                             round={roundTitle}
//                             continentLogo={getStageLogo(userTalent.region)}
//                             continentName= {userTalent.region}
//                             width={width}
//                          />  

//     {contestants.length >0 && (

//     <>
          
//       <View
//         style={{  height : h * 0.138  , backgroundColor : boxBgColor}}
//         className=" border-b border-white/30 w- [66%] py-4 px-2  flex-row rounded-xl justify-center gap-4 items-center  ">
//               {contestants.slice(0,5).map((contestant , index) =>{
//                                     return(
//                                         <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
//                                         participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.108}
//                                         talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
//                                         )
//               })}
         
//         </View>
       

//         <View
//         style={{ 
//             width : width * 0.8 }}
//         className="  mb-1 flex-1 [#f6f4f4]  [#4a4646] [#deddd9] [#333132] [#630d20] p- 1 [#3b4348] [#3b4348] w-[66%] gap-1 h-[56%] rounded-b-md flex-col justify-start items-center  ">
                  
//                   <View 
//                                     style={{}}
//                                     className ="w-[100%] flex-1 pb-1 pt-1 "
//                                     >
                                      
//                                         <TouchableOpacity
//                                                     onPress={
//                                                         ()=> {   
//                                                             router.push({ pathname:'TalentContestRoom', params:{
//                                                               region:userTalent.region,
//                                                               selectedTalent:userTalent.name , 
//                                                               selectedIcon: getIcon(userTalent.name),
//                                                               regionIcon : getIcon(userTalent.region),
//                                                               startIntroduction :"true",
//                                                               showGo:"true",
//                                                               location : "contest",
//                                                               contestant_id : selectedContestant.user_id
//                                                             } })
//                                                            }
//                                                     }
//                                                 style ={{ 
                                    
//                                                 }}
//                                                 className=" w-[100%] min-h-[100%] flex-1 rounde d-md bord er-t-8 border-black flex-row justify-center items-center   ">
                                                
//                                                             <Image
//                                                                 className="w-[100%] h-[100%] opacity-70 rounded-md"
//                                                                 source={{uri: selectedContestant.thumbnail?.publicUrl }}
//                                                                 // source ={icons.big_heart}
//                                                                 resizeMethod='contain' /> 
//                                                                 <Image  
//                                                                 className="absolute  w-10 h-10 rounded-xl"
//                                                                 source={icons.play}
//                                                                 resizeMethod='contain'/> 
//                                         </TouchableOpacity>
//                   </View>

//                   <View
//                                 className=" absolute rounded-tl-3xl bottom-0 right-0 bg-[#030303] pl-2 pt-2 flex-row  justify-between gap-3 items-end"> 
                                   
//                                     <TouchableOpacity
//                                                 onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
//                                                 className="  flex-col  [#deddd9] [#333132] [#630d20]  [#3b4348]  rounded-full justify-center p- 2 items-start gap-2 ">
//                                                     <Image
//                                                     source={{uri:selectedContestantImg}}
//                                                     style ={{ width:width/10 , height:width/10}}
//                                                     className ="w-[50px] h-[50px] m- rounded-full"
//                                                     resizeMethod='cover'
//                                                     />  
                                                  
//                                     </TouchableOpacity>
//                                     <View
//                                             className=" h- [100%] flex-col justify-start items-start gap-1 ">
//                                                         <Text 
//                                                          style ={{fontSize:width/55}}
//                                                          className="tex t-xl text-center p-0 font-black text-[#3962cb]"> 
//                                                             Votes {' '}
//                                                             <Text 
//                                                               style ={{fontSize:width/55}}
//                                                               className="tex t-xl  font-black text-end text-gray-100"> 
//                                                                 {selectedContestant && selectedContestant.votes }
//                                                             </Text>
//                                                         </Text> 
//                                                         <Text 
//                                                         style ={{fontSize:width/55}}
//                                                         className=" mb- font-black text-red-300"> 
//                                                         {selectedContestant && selectedContestant.rank < 4 ? "Top" :"Ranked"}{' '}
//                                                             <Text 
//                                                                 style ={{fontSize:width/55}}
//                                                                 className="tex t-xl  font-black text-gray-100"> 
//                                                                 {selectedContestant && selectedContestant && selectedContestant.rank}
//                                                             </Text>
//                                                         </Text>
//                                                         <Text 
//                                                                 style ={{fontSize:width/50}}
//                                                                 className="font-black text-gray-100"> 
//                                                                 {selectedContestant && selectedContestant.name.slice(0,10)}
//                                                       </Text>
                                                   
//                                     </View>
                                  
//                   </View>
                  


//         </View>
//         </>
//          )}
       

    

//         {activity ? (
//          <TalentActivityHeader data={userTalent} width={width} userProfile = {userProfile} activity = {true} user = {user} type = "talent"/>
//          ):(
//          <PostTalentHeader data={userTalent} width={width} user={user}/>
//          )}
           
//      </View>

   



   

//   )
// }

import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIcon, getStageLogo } from '../../helper';
import Contestant from './Contestant';
import StageHeader from './custom/StageHeader';
import { useGlobalContext } from '../../context/GlobalProvider';
import PostTalentHeader from '../activityHeader/PostTalentHeader';
import TalentActivityHeader from '../activityHeader/TalentActivityHeader';
import { icons, images } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';

export default function StageDisplayer({ userTalent, user, userProfile, activity, width }) {
  const { boxBgColor } = useGlobalContext();
  const { screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const contestants = userTalent.contestants || [];
  const [selectedContestant, setSelectedContestant] = useState(contestants[0] || null);
  const [selectedContestantImg, setSelectedContestantImg] = useState(null);

  const participationStatus = userTalent.contestants.find(c => c.user_id === user._id)
    ? "ON STAGE"
    : userTalent.queue.find(c => c.user_id === user._id)
    ? "IN QUEUE"
    : userTalent.eliminations.find(c => c.user_id === user._id)
    ? "ELIMINATED"
    : "NOT CONTESTANT";

  const [roundTitle, setRoundTitle] = useState(null);

  // Set round title
  useEffect(() => {
    const edition = userTalent.editions?.find(e => e.status === "open") || null;
    if (!edition) return;

    const roundMapping = {
      1: "Elimination-Round 1",
      2: "Elimination-Round 2",
      3: "Elimination-Round 3",
      4: "Eighth-finals",
      5: "Quarter Final",
      6: "Semi Final",
      7: "Grand Final",
      8: "Winner",
    };

    setRoundTitle(roundMapping[edition.round] || null);
  }, [userTalent.editions]);

  // Update selected contestant image
  useEffect(() => {
    if (selectedContestant) {
      setSelectedContestantImg(selectedContestant.profile_img);
    }
  }, [selectedContestant]);

  // Handle case when there are no contestants
  const renderContestants = () => {
    if (contestants.length === 0) {
      return (
        <>
            <View className="flex- 1 justify-center items-center py- 6">
                <Text 
                style ={{ fontSize :width / 40}}
                className="text-gray-400 tex t-lg font-semibold">
                    No contestants yet
                </Text>
                <Text
                style ={{ fontSize :width / 37}}
                className="text-gray-400 tex t-sm mt-1">
                    Stay tuned, contestants will appear here soon!
                </Text>
            </View>      
        </>

        
      );
    }

    return (

        <View
        style={{  height : width * 0.138  , backgroundColor : boxBgColor}}
        className=" bord er-b bor der-white/30 w-[76%] py-4 px-2  flex-row rounded-xl justify-center gap-4 items-center  ">
        {contestants.slice(0, 5).map((contestant, index) => (
          <Contestant
            key={index}
            contestant={contestant}
            selectedContestant={selectedContestant}
            setSelectedContestant={setSelectedContestant}
            f={width * 0.098}
            w="90%"
            h="30%"
          />  
        ))}
        </View>
 
    );
  };

  return (
    <View
      style={{
        height: width + width / 2.5 + width * 0.1,
        width: width,
        borderRadius: 0,
      }}
      className="bg-black mb- 12 w-full roun ded-lg flex-col justify-start items-center bg-gradient-to-r  from-[#0f0f1a] to-black bor der bor der-white/30"
    >
    
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(255,255,255,0.25)", "transparent"]}
          style={{
            position: "absolute",
            top: 0,
            alignSelf: "center",
            width: "100%",
            height: 30,
            borderRadius: 5,
          }}
        />
          <LinearGradient
          pointerEvents="none"
          colors={[ "transparent","rgba(255,255,255,0.25)"]}
          style={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: "100%",
            height: 30,
            borderRadius: 5,
          }}
       />
          <LinearGradient
          pointerEvents="none"
          colors={["transparent", "rgba(255,255,255,0.25)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: width/10,
            borderRadius: 5,
          }}
        /> 
          <LinearGradient
          pointerEvents="none"
          colors={["transparent", "rgba(255,255,255,0.25)"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: width/10,
            borderRadius: 5,

          }}
        /> 
    
      {/* Stage Header */}
      <StageHeader
                            stageLogo={getStageLogo(userTalent.name)}
                            stageTitle={userTalent.name}
                            region={userTalent.region}
                            contestants={userTalent.contestants.length}
                            round={roundTitle}
                            continentLogo={getStageLogo(userTalent.region)}
                            continentName= {userTalent.region}
                            width={width}
                         />  

      {/* Contestant Thumbnails Section */}
      <View
        style={{ height: width * 0.118, backgroundColor: boxBgColor }}
        className="bord er-b b order-white/30 w-[86%] mb-2 flex-row justify-center items-center rounded-xl"
      >
        {renderContestants()}
      </View>

      {/* Selected Contestant Display */}
      {selectedContestant && (
        <TouchableOpacity
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
          className="w-[85%] flex-1 rounded-md mt-2 pb-2   items-center justify-center"
        >
          <Image
            className="w-[100%] h-[100%] opacity-70 rounded-md"
            source={{uri: selectedContestant.performances[0].thumbnail?.publicUrl }}
            resizeMethod="cover"
          />
          <Image
            className="absolute w-10 h-10 rounded-xl top- 2 right- 2"
            source={icons.play}
            resizeMethod="contain"
          />

          {/* Contestant Info Overlay */}
          <View className="absolute bottom-2 rounded-xl bg-[rgba(0,0,0,0.3)] w-[80%] p-1 flex-row justify-between items-end ">
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: '/ViewProfile',
                  params: { user_id: selectedContestant.user_id },
                })
              }
            >
              <Image
                source={{ uri: selectedContestantImg }}
                style={{ width: width / 12, height: width / 12 }}
                className="rounded-full"
                resizeMethod="cover"
              />
            </TouchableOpacity>

            <View className="flex-row flex-1 justify-evenly items-start ml- 2">
              <Text 
              style ={{ fontSize :width / 44}}
              className="text-gray-100 font-black text-[14px]">
                {selectedContestant.name.slice(0, 10)}
              </Text>
              <Text 
              style ={{ fontSize :width / 47}}
              className="text-[#406de0] font-black text-[12px]">
                Votes: <Text className="text-gray-100">{selectedContestant.votes}</Text>
              </Text>
              <Text 
              style ={{ fontSize :width / 47}}
              className="text-red-300 font-black text-[12px]">
                {selectedContestant.rank < 4 ? 'Top' : 'Ranked'}{' '}
                <Text className="text-gray-100">{selectedContestant.rank}</Text>
              </Text>
            
            </View>
          </View>
        </TouchableOpacity>
      )}

      {contestants.length == 0 && (
        <TouchableOpacity
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
        className="w-[80%] flex-1 rounded-md mt-2 overflow-hidden relative items-center justify-center"
        >
        <Image
            className="w- full h- full opacity-70 rounded-md"
            source={images.night_bg}
            resizeMethod="cover"
        />
        <Image
            className="absolute w-10 h-10 rounded-xl top- 2 right- 2"
            source={icons.play}
            resizeMethod="contain"
        />
  </TouchableOpacity>
      )}
      {/* {!activity ? (
        <TalentActivityHeader
          data={userTalent}
          width={width}
          userProfile={userProfile}
          activity={true}
          user={user}
          type="talent"
        />
      ) : (
        <PostTalentHeader data={userTalent} width={width} user={user} />
      )} */}
              <PostTalentHeader data={userTalent} width={width} user={user} />

    </View>
  );
}