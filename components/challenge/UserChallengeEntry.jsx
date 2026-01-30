import { View, Text, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MotiView } from 'moti'
import { getIcon } from '../../helper';
import Participant from './Participant';
import { router } from 'expo-router';
import { icons } from '../../constants';
import SwingingTitle from '../custom/SwingingTitle';
import VacntSpotContestant from '../talent/VacntSpotContestant';
import PostChallengeHeader from '../activityHeader/PostChallengeHeader';
import ChallengeActivityHeader from '../activityHeader/ChallengeActivityHeader';
import { useGlobalContext } from '../../context/GlobalProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getVideo } from '../../videoFiles';

export default function UserChallengeEntry({challenge, user , userProfile ,activity}) {
  const {boxBgColor} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const h = width +  - 7
  const [selectedParticipant , setSelectedParticpant] = useState(challenge.participants[0]) 
  const [refresh , setRefresh] = useState(false)
  const[ name , setName ] = useState(null)
  const [vacantSpots, setVacantSpots] = useState([])

  const [selectedParticipantImg , setSelectedParticipantImg] = useState(null)
  const [selectedParticipantThumbNail , setSelectedParticipantThumbNail] = useState(null)

  const handleRefresh = () =>{
    setRefresh(true)

    setTimeout(() => {
       setRefresh(false)
    }, 1000);
  }

  useEffect(() => {
    if(selectedParticipant) { 
       const splitName = selectedParticipant.name.split(" ")
       setName({
       part1 : splitName[0],
       part2: splitName[1]
        })
        let vs = []
        for (let index = 0; index < 22 - challenge.participants.length; index++) {
              vs.push({index : index})    
        }
        setVacantSpots(vs)

        getVideo(selectedParticipant.profile_img).then(path =>{
            setSelectedParticipantImg(path)
        });
        getVideo(selectedParticipant.thumbNail_URL).then(path =>{
            setSelectedParticipantThumbNail(path)
        });
        
      }
   }, [selectedParticipant])

  return (
    <>
      {activity ? (
        <ChallengeActivityHeader data={challenge} userProfile={userProfile} user={user} type="challenge" />
      ):(
        <PostChallengeHeader data={challenge} user={user} />
      )}
    <View
    className="bg-black  [#ecf2fc] w-[100%]  4 h-[100%] flex-col  justify-start items-center  "
    style ={{ 
        height: h + 50 , 
       }} >
            
            <View
              style={{ height: h * 0.13  }}
              className="w-[100%] bg-black [#fefeff]  flex-row py -1   px- 2 justify-between  items-center">
                        
                        <View
                        style = {{ backgroundColor : boxBgColor}}
                        className = "w- [20%] bg-[#fefeff] h-[100%] justify-center items-center px-1">
                                <TouchableOpacity
                                                                onPress={
                                                                    ()=> {   
                                                                        router.push({ pathname:'TalentContestRoom', params:{
                                                                        region:userTalent.region,
                                                                        selectedTalent:userTalent.name , 
                                                                        selectedIcon: getIcon(userTalent.name),
                                                                        regionIcon : getIcon(userTalent.region),
                                                                        startIntroduction :"true",
                                                                        showGo:participationStatus == "ON STAGE" ?"true" :"false",
                                                                        location : participationStatus == "ON STAGE" ? "contest" :"condidate",
                                                                        contestant_id :userParticipation && userParticipation.user_id 
                                                                        } })
                                                                    }
                                                                }
                                                                className=" bg-[#353131]   rounded-lg min-w- [23%]  gap-1 flex-col px-4 py-2  justify-center items-center">
                                                                    <Text
                                                                        style={{fontSize:7}}
                                                                        className="text-center font-black mt- auto text-white">
                                                                            you are
                                                                        </Text>
                                                                        <Text
                                                                        style={{fontSize:7}}
                                                                        className="text-center font-black mt- auto text-blue-200">
                                                                            On Stage
                                                                        </Text>
                                                                    
                                </TouchableOpacity>
                        </View>
                        
                        <View
                        style={{width:width - width * 0.26 + 2}}
                            className=" h- [100%] flex-1 bg-black py- rounded-tr-full gap-2 rounded-tl-full flex-col justify-center items-center">  
                            <Text
                                style={{fontSize:width/45}}
                                className="tex t-center tex t-sm  font-black mt- auto text-gray-200">
                                    Challenge
                                    <Text
                                        style={{fontSize:width/45}}
                                        className="tex t-center tex t-sm  font-black mt- auto text-blue-300">
                                           {''} By
                                    </Text>   
                            </Text>
                            
                            <Image
                                className="w-10 h-10 absolute top-0 right-2 rounded-full"
                                source={{uri:challenge.profile_img}}
                                resizeMode='cover'/>
                            <Text
                                style={{fontSize:width/43}}
                                className="tex t-center tex t-sm  font-black text-white">
                                    {challenge.name.slice(0,13)}
                            </Text> 
                            <View
                              className="absolute top-0 left-2 w- [30px] h- [30px] roun ded-full b g-black">
                                 <MaterialCommunityIcons name="sword-cross" size={20} color = "#F97316"  />
                            </View>
                        </View>
                        <View
                        style = {{ backgroundColor : boxBgColor}}
                        className = "w-[20%] bg-[#fefeff] rounded-bl-md h-[100%] justify-center items-center ">
                                <TouchableOpacity
                                                          onPress={
                                                            () =>  router.push({ pathname: '/FSinstantChallengeDisplayer', params: {
                                                                challenge_id:challenge._id ,
                                       
                                                               } }) }
                                                               className=" bg-[#353131] rounded-lg w- [23%]  gap-1 flex-col px-2 py-2  justify-center items-center">
                                                            <Text
                                                                style={{fontSize:8}}
                                                                className="text-c enter font-black mt- auto text-white">
                                                                    {challenge.participants.length}
                                                                </Text>
                                                                <Text
                                                                style={{fontSize:7}}
                                                                className="text-ce nter font-black mt- auto text-gray-100">
                                                                    PARTICIPANTS
                                                                </Text>          
                                </TouchableOpacity>
                        </View>
                        
                       
            </View>

           
     <View
            style={{ height:50}}
            className=" gap- 1 bg-black w-[100%] h-[100%]  flex-col justify-center items-center ">
                <View
                 style={{width:width - width * 0.26 + 2}}
                    className=" h- [100%] flex-1 bg-black py- rounded-tr-full gap-2 rounded-tl-full flex-row justify-center items-center">  
                    <View
                            className = "w-[100%] h-[100%]  flex-col justify-center  gap-1 items-center">
                                    
                                    <View
                                       className="  w-[60%] py-2  flex-col text-center justify-center  items-center "> 
                                            <SwingingTitle text={challenge.desc} color={"yellow"} fontSize={10} />
                                    </View>

                                   
                    </View>
                    
                    <View
                                                className="absolute left-4 top-0 p- 1 gap-1 flex-col justify-center items-center">
                                                    <Image
                                                        className="w-8 h-8"
                                                        source={getIcon(challenge.type)}                                                        resizeMode='cover'/>
                                                        <Text
                                                        style={{fontSize:8}}
                                                        className="text-center text- sm  font-black text-gray-100">
                                                             {challenge.type.slice(0,7)}
                                                        </Text>
                    </View>
                    <View
                                                className="absolute right-4 top-0 p- 1 gap-1 flex-col justify-center items-center">
                                                     <Image
                                                        className="w-8 h-8"
                                                        source={getIcon(challenge.privacy)}
                                                        resizeMode='cover'/>
                                                    <Text
                                                        style={{fontSize:8}}
                                                        className="text-center   font-black text-gray-100">
                                                          {challenge.privacy}
                                                    </Text>
                    </View>
                </View>
            
     </View>

    


     <View
        style={{ 
            height:h - h * 0.32 - 0, 
            width : width - h * 0.26 - 0 }}
            className=" bg-black fle x -1 px-1 [#f6f4f4] [#4a4646] [#deddd9] [#333132] [#630d20] p- 1 [#3b4348] [#3b4348] w-[66%] gap-1 h-[56%] rounded-b-md flex-col justify-start items-center  ">
                   <View
                                className=" flex- 1 w-[100%] rounded-md bg-[#f6f4f4] px-4 py-3 flex-row h- [10%] pb- 2 mt- 1 justify-between gap-8 items-center"> 
                                    <View
                                            className=" h-[100%] flex-row justify-center items-center gap-1 ">
                                                       <Text 
                                                         style ={{fontSize:8}}
                                                         className="tex t-xl text-center p-0 font-black text-[#2439f4]"> 
                                                            VOTES
                                                        </Text>
                                                                    
                                                        <Text 
                                                           style ={{fontSize:9}}
                                                           className="tex t-xl  font-black text-end text-gray-800"> 
                                                              {selectedParticipant && selectedParticipant.votes }
                                                        </Text>
                                    </View>
                                    <View
                                           className="flex- 1 h-[100%] flex-row justify-center items-center gap-1 ">
                                                <Text 
                                                   style ={{fontSize:8}}
                                                    className="tex t-xl text-ce nter  p-0 font-black text-red-600"> 
                                                    {selectedParticipant && selectedParticipant.rank < 4 ? "TOP" :"RANK"}
                                                    </Text>
                                                    <Text 
                                                        style ={{fontSize:9}}
                                                        className="tex t-xl  font-black text-gray-900"> 
                                                           { selectedParticipant && selectedParticipant.rank}
                                                    </Text>
                                    </View>
                  </View>
                  <View 
                                    style={{}}
                                    className ="w-[100%]  flex-1 pb-1 "
                                    >
                                        <TouchableOpacity
                                                    onPress={
                                                        () =>  router.push({ pathname: '/FSinstantChallengeDisplayer', params: {
                                                            challenge_id:challenge._id ,
                                                            participant_id : selectedParticipant.user_id
                                                           } }) }
                                                style ={{ 
                                    
                                                }}
                                                className=" w-[100%] min-h-[100%] flex-1 bord er-t-8 border-black  flex-row justify-center items-center ">
                                                            <Image
                                                                className="w-[100%] h-[100%]  rounded-md"
                                                                source={{uri: selectedParticipantThumbNail || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                                                // source ={icons.big_heart}
                                                                resizeMethod='contain' /> 
                                                                <Image 
                                                                className="absolute  w-10 h-10 rounded-xl"
                                                                source={icons.play}
                                                                resizeMethod='contain' /> 
                                        </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                                                onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
                                                className="absolute top-[8px] flex-col bg-[#000000] [#303030] [#213457]  rounded-full justify-center p-1 items-start gap-2 ">
                                                    <Image
                                                    source={{uri:selectedParticipant && selectedParticipant.profile_img}}
                                                    className ="w-[40px] h-[40px] m-  rounded-full"
                                                    esizeMethod='cover'
                                                    />  
                   </TouchableOpacity>
                   <View
                   className = "absolute w-[25%] top-5 left-[15%] flex-row justify-end items-center b g-white">
                         <Text   
                         style ={{fontSize:8}}
                         className="font-black text-gray-800 ">
                                  {name && name.part1}  
                         </Text>
                   </View>
                   <View
                   className = "absolute w-[25%] top-5 right-[15%] flex-row justify-start items-center b g-white">
                        <Text   
                            style ={{fontSize:8}}
                            className="font-black text-gray-800">
                                 {name && name.part2}  
                        </Text>
                   </View>
        </View>

        {/* <View
              style={{ height: h * 0.06  + 6 }}
              className="w-[100%] h-[50%]  bg- [#f6f4f4] [#4a4646] flex-row  justify-center items-center">
                        <View
                            className = "w-[100%] h-[100%]  flex-col justify-center  gap-1 items-center">
                                    
                                    <View
                                       className="  w-[60%] py-2   bg-[#3a3a3a] flex-col text-center justify-center  items-center "> 
                                            <SwingingTitle text={challenge.desc} color={"white"} fontSize={9} />
                                    </View>

                                   
                        </View>
        </View> */}

        {/* <View
        style={{  height: h * 0.08 }}
        className=" bg-[#f6f4f4]  w- [66%] py-2 mt-1  rounde d-b-xl flex-row justify-center gap-2 items-center  ">
              
              <View
               className ="w-[100%] px-8 h- [50%] rounde d-t-full flex-row justify-center items-center  bg-[#f6f4f4] [#4a4646]">
                  <Text 
                      style={{fontSize:9}}
                       className="font-black  text-blue-700">
                         Explore Challenge 
                 </Text> 
              </View> 
        </View> */}

       <View
        style={{ backgroundColor : boxBgColor, height: h * 0.13 , width : width - h * 0.28 + 10 }}
        className=" bg-[#fefeff] [#3b4348] [#676c73] w- [66%] py-2  rounded-b-md flex-row justify-center gap-2 items-center  ">
              {challenge.participants.slice(7,13).map((participant , index) =>{
                                  return (
                                    <Participant key={index} participant={participant} selectedParticipant = {selectedParticipant}
                                    participantTrackerId = {null} setSelectedParticipant={setSelectedParticpant} f={ h * 0.105}
                                    challenge = {challenge}  index ={19} w = {"90%"} h={"30%"}/> 
                                    )  
                                })}
              { vacantSpots.slice(challenge.participants.slice(7,13).length + 7 ,13).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.105} /> 
                                        )
                                }) }
        </View>

        <View
        style={{ backgroundColor : boxBgColor, width : h * 0.13 , height : h - h * 0.13  , bottom: h * 0.12}}
        className=" bg-[#fefeff] [#43434a] [#3b4348] [#676c73] [#3b4348] w- [66%] py-2 absolute bottom-1 left-0 flex-col rounded-bl-md round ed-tl-xl justify-start gap-2 items-center  ">
              {challenge.participants.slice(0,7).map((participant , index) =>{
                                     return (
                                        <Participant key={index} participant={participant} selectedParticipant = {selectedParticipant}
                                        participantTrackerId = {null} setSelectedParticipant={setSelectedParticpant} f={ h * 0.105}
                                        challenge = {challenge}  index ={19} w = {"90%"} h={"30%"}/> 
                                        )  
              })}
              { vacantSpots.slice(challenge.participants.slice(0,7).length ,7).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.105} /> 
                                        )
              }) }
        </View>

        <View
       style={{backgroundColor : boxBgColor, width : h * 0.13 , height : h - h * 0.13  , bottom: h * 0.12}}
       className=" bg-[#fefeff] [#f6f4f4] [#43434a] [#3b4348] [#676c73] [#3b4348] w- [66%] py-1 absolute bottom-1 right-0 flex-col-reverse rounded-br-md roun ded-tr-xl justify-start gap-2 items-center  ">
              {challenge.participants.slice(13,20).map((participant , index) =>{
                                    return (
                                        <Participant key={index} participant={participant} selectedParticipant = {selectedParticipant}
                                        participantTrackerId = {null} setSelectedParticipant={setSelectedParticpant} f={ h * 0.105}
                                        challenge = {challenge}  index ={19} w = {"90%"} h={"30%"}/> 
                                        )  
              })}
              { vacantSpots.slice(challenge.participants.slice(13,20).length  ,7).map((element , index) =>{
                                    return (  <VacntSpotContestant key={index} f={h * 0.105} />  )
              }) }
        </View>
 

     </View>
     </>
  )
}