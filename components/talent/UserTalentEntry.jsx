import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIcon } from '../../helper';
import Contestant from './Contestant';
import SwingingTitle from '../custom/SwingingTitle';
import VacntSpotContestant from './VacntSpotContestant';
import { useGlobalContext } from '../../context/GlobalProvider';
import PostTalentHeader from '../activityHeader/PostTalentHeader';
import TalentActivityHeader from '../activityHeader/TalentActivityHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getVideo } from '../../videoFiles';

export default function UserTalentEntry({userTalent, user , userProfile ,activity}) {
    const {boxBgColor} = useGlobalContext()
    const[ userParticipation , setUserParticipation ] = useState(null)
    const[ rank , setRank ] = useState(0)
    const[ roundTitle , setRoundTitle ] = useState(null)
    const[ name , setName ] = useState(null)
    const { width, height } = useWindowDimensions();
    const participationStatus = userTalent.contestants.find( c => c.user_id === user._id ) ? "ON STAGE" :
                                userTalent.queue.find( c => c.user_id === user._id ) ? "IN QUEUE":
                                userTalent.eliminations.find( c => c.user_id === user._id ) ?  "ELIMINATED":"NOT CONTESTANT"
    const insets = useSafeAreaInsets();
    const [selectedContestant , setSelectedContestant] = useState(userTalent.contestants[0] || null)
    const [vacantSpots, setVacantSpots] = useState([])
    
    const [selectedContestantImg , setSelectedContestantImg] = useState(null)
    const [selectedContestantThumbNail , setSelectedContestantThumbNail] = useState(null)

    const h = width +  - 7
    const contestants = userTalent.contestants 

    useEffect(() => {
        userTalent.contestants.find(c => c.user_id === user._id) && setUserParticipation(
                      {...userTalent.contestants.find(c => c.user_id === user._id), status:participationStatus}
                      )
        userTalent.queue.find(c => c.user_id === user._id) && setUserParticipation(
                        {...userTalent.queue.find(c => c.user_id === user._id), status:userParticipation}
                      )
        userTalent.eliminations.find(c => c.user_id === user._id) && setUserParticipation(
                        {...userTalent.eliminations.find(c => c.user_id === user._id), status : userParticipation}
                      )
       setRank(userTalent.contestants.findIndex(c => c.user_id === user._id) + 1)
       const edition = userTalent.editions.find(e => e.status == "open") || null
       switch (edition && edition.round) {
        case 1:
            setRoundTitle("Elimination-Round 1")
            break;
        case 2:
            setRoundTitle("Elimination-Round 2")
            break;
        case 3:
            setRoundTitle("Elimination-Round 3")
            break;
        case 4:
            setRoundTitle("Eighth-finals")
            break;
        case 5:
            setRoundTitle("Quarter Final")
            break;
        case 6:
            setRoundTitle("Semi Final")
            break;
        case 7:
            setRoundTitle("Grand Final")
            break;
        case 8:
            setRoundTitle("Winner")
            break;
        default:
          break;
       }
    }, [])

    useEffect(() => {
        if(selectedContestant) { 
           const splitName = selectedContestant.name.split(" ")
           setName({
           part1 : splitName[0],
           part2: splitName[1] && splitName[1]
            })
          let vs = []
          for (let index = 0; index < 22 - contestants.length; index++) {
                vs.push({index : index})    
          }
          setVacantSpots(vs)

          getVideo(selectedContestant.profile_img).then(path =>{
            setSelectedContestantImg(path)
           });
           getVideo(selectedContestant.thumbNail_URL).then(path =>{
            setSelectedContestantThumbNail(path)
           });

          }
    }, [selectedContestant])

  return (
   <>
    {name &&  (   
    <>
     {activity ? (
         <TalentActivityHeader data={userTalent} userProfile = {userProfile} activity = {true} user = {user} type = "talent"/>
      ):(
         <PostTalentHeader data={userTalent} user={user}/>
     )}
    <View
        style={{height: h + 50 }}
        className="bg-black [#616262] mt- 2  w-[100%]  h-[100%] flex-col  justify-start items-center  ">
            
            <View
              style={{ height: h * 0.13}}
              className="w-[100%] bg- [#fefeff]  flex-row py -1   px- 2 justify-center  items-center">
                       
                           
                    
                    
                        <View
                            style={{ minWidth: h * 0.26 , backgroundColor : boxBgColor}}
                            className=" h-[100%] bg-[#fefeff] flex -1 px-2 bg- black rounded-br-md flex-row   gap-2 justify-start py-1  items-center ">
                                 {contestants.slice(0,2).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.105}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
                                 })}
                                 {contestants.length < 2 && vacantSpots.slice(contestants.length,2).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.105} /> 
                                        )
                                 }) }
                         </View>
                         <View
                            style={{ minWidth: h * 0.26 , backgroundColor : boxBgColor}}
                            className=" h-[100%] bg-[#fefeff] flex -1 px-2 bg- black rounded-bl-md flex-row   gap-2 justify-center py-1  items-center ">
                                {contestants.slice(2,4).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.105}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
                                })}
                                { vacantSpots.slice(contestants.slice(2,4).length,2).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.105} /> 
                                        )
                                 }) }
                        </View>
                       
                    
            </View>

            <View
            style={{ height:50}}
            className=" gap-1 b g-[#fefeff] w-[100%] h-[100%] borde r-t-4 bord er-l-4 bor der-r-4 bo rder-[#deddd9] rounde d-t-xl flex-row justify-between items-end ">
                 
                 <View
                 style={{width: width * 0.08  , backgroundColor : boxBgColor} }
                    className=" h-[100%] bg-[#fefeff]   gap-2  flex-col justify-center items-center">
                 </View>
                 <View
                 style={{width:width - width * 0.26 + 2}}
                    className=" h-[100%] bg-primary  black  rounded-tr-full gap-2 rounded-tl-full flex-col justify-center items-center">
                        <Text
                            style={{fontSize:10}}
                            className="text-center mb- 4 font-black  text-white">
                                     {userTalent.name} Contest
                        </Text>             
                        <View
                            className = "w-[100%]  h- [100%]  flex-col justify-start  gap-3 items-center">
                                            <View
                                            className="  w-[100%] b g-[#3a3a3a]  py- 2 flex-col text-center  justify-center  items-center "> 
                                                <SwingingTitle text={roundTitle} color={"yellow"} fontSize={9} />
                                            </View>           
                        </View>
                       
                         <View
                              className="absolute top-0 left-[20%] w- [30px] h- [30px] roun ded-full b g-black">
                                 <MaterialCommunityIcons name="star" size={20} color = "yellow"  />
                         </View> 
                 </View>
                 <View
                 style={{width: width * 0.08 , backgroundColor : boxBgColor }}
                    className=" h-[100%] bg-[#fefeff]   gap-2  flex-col justify-center items-center">
                 </View>
                 
                        {/* <TouchableOpacity
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
                                                                className=" bg-black absolute top-0 left-0 border-4 border-green-400 rounded-lg w- [20%]  gap-1 flex-col px-2 py-1  justify-center items-center">
                                                                    <Text
                                                                        style={{fontSize:7}}
                                                                        className="text-center font-black mt- auto text-white">
                                                                           {participationStatus !== "NOT CONTESTANT" ? "YOU ARE" : "JOIN"}
                                                                    </Text>
                                                                    <Text
                                                                        style={{fontSize:7}}
                                                                        className="text-center font-black mt- auto text-blue-200">
                                                                            {participationStatus !== "NOT CONTESTANT" ? participationStatus :"CONTEST"}
                                                                    </Text>
                                                                    
                        </TouchableOpacity>
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
                                                                } })
                                                            }
                                                        }
                                                        className=" bg-black absolute top-0 right-0 border-4 border-blue-400 rounded-lg w- [23%]  gap-1 flex-col px-2 py-1  justify-center items-center">
                                                                <Text
                                                                 style={{fontSize:8}}
                                                                 className="text-c enter font-black  text-white">
                                                                    {userTalent.contestants.length}
                                                                </Text>
                                                                <Text
                                                                style={{fontSize:8}}
                                                                className="text-ce nter font-black  text-blue-200">
                                                                    Contestants
                                                                </Text>
                        </TouchableOpacity> */}
                    
                
                
        </View>

       

        <View
        style={{ 
            height:h - h * 0.32 - 0, 
            width : width - h * 0.26 - 6 }}
        className=" bg-primary   fle x-1 [#f6f4f4] [#4a4646] [#deddd9] [#333132] [#630d20] p- 1 [#3b4348] [#3b4348] w-[66%] gap-1 h-[56%] rounded-b-md flex-col justify-start items-center  ">
                   <View
                                className=" flex- 1 w-[100%] bg-[#f6f4f4] px-4 py-3 flex-row h- [10%] pb- 2 mt- 1 justify-between gap-8 items-center"> 
                                    <View
                                            className=" h- [100%] flex-row justify-center items-center gap-1 ">
                                                        <Text 
                                                         style ={{fontSize:8}}
                                                         className="tex t-xl text-center p-0 font-black text-[#2439f4]"> 
                                                            VOTES
                                                        </Text>
                                                                    
                                                        <Text 
                                                           style ={{fontSize:10}}
                                                           className="tex t-xl  font-black text-end text-gray-800"> 
                                                              {selectedContestant && selectedContestant.votes }
                                                        </Text>
                                    </View>
                                    <View
                                           className="flex- 1 h-[100%] flex-row justify-center items-center gap-1 ">
                                                    <Text 
                                                     style ={{fontSize:8}}
                                                     className="tex t-xl text-ce nter  p-0 font-black text-red-600"> 
                                                       {selectedContestant && selectedContestant.rank < 4 ? "TOP" :"RANKED"}
                                                    </Text>
                                                    <Text 
                                                        style ={{fontSize:9}}
                                                        className="tex t-xl  font-black text-gray-800"> 
                                                           {selectedContestant && selectedContestant && selectedContestant.rank}
                                                    </Text>
                                    </View>
                  </View>
                  <View 
                                    style={{}}
                                    className ="w-[100%] flex-1 pb-1 "
                                    >
                                      
                                        <TouchableOpacity
                                                    onPress={
                                                        ()=> {   
                                                            router.push({ pathname:'TalentContestRoom', params:{
                                                              region:userTalent.region,
                                                              selectedTalent:userTalent.name , 
                                                              selectedIcon: getIcon(userTalent.name),
                                                              regionIcon : getIcon(userTalent.region),
                                                              startIntroduction :"true",
                                                              showGo:"true",
                                                              location : "contest",
                                                              contestant_id : selectedContestant.user_id
                                                            } })
                                                           }
                                                    }
                                                style ={{ 
                                    
                                                }}
                                                className=" w-[100%] min-h-[100%] flex-1 rounde d-md bord er-t-8 border-black flex-row justify-center items-center   ">
                                                
                                                            <Image
                                                                className="w-[100%] h-[100%]  round ed-xl"
                                                                source={{uri: selectedContestantThumbNail || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                                                // source ={icons.big_heart}
                                                                resizeMethod='contain' /> 
                                                                <Image  
                                                                className="absolute  w-10 h-10 rounded-xl"
                                                                source={icons.play}
                                                                resizeMethod='contain'/> 
                                        </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                                                onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
                                                className="absolute top-[12px] flex-col bg-[#000000] [#deddd9] [#333132] [#630d20]  [#3b4348]  rounded-full justify-center p-1 items-start gap-2 ">
                                                    <Image
                                                    source={{uri:selectedContestantImg}}
                                                    // source ={icons.big_heart}
                                                    className ="w-[40px] h-[40px] m- rounded-full"
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
       

        <View
        style={{ height: h * 0.13 , width : width - h * 0.28 + 10 , backgroundColor : boxBgColor }}
        className=" bg-[#fefeff] [#3b4348] [#676c73] w- [66%] py-2  rounded-b-md flex-row justify-center gap-2 items-center  ">
              {contestants.slice(16,22).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.109}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
              })}
              { vacantSpots.slice(vacantSpots.length + contestants.slice(16,22).length - 6 ,vacantSpots.length).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.109} /> 
                                        )
              }) }
        </View>

        

        <View
        style={{ width : h * 0.13 , height : h - h * 0.24  , bottom: h * 0.14 , backgroundColor : boxBgColor}}
        className=" bg-[#fefeff] [#43434a] [#3b4348] [#676c73] [#3b4348] w- [66%] py-1 absolute bottom-1 left-0 flex-col rounded-bl-md rounded-tr-md justify-start gap-2 items-center  ">
              {contestants.slice(4,16).filter((element, index) => { return index % 2 === 0}).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.108}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
              })}
              { vacantSpots.slice(contestants.slice(4,16).filter((element, index) => { return index % 2 === 0}).length ,6).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.108} /> 
                                        )
              }) }
        </View>

        <View
        style={{ width : h * 0.13 , height : h - h * 0.24  , bottom: h * 0.14 , backgroundColor : boxBgColor}}
        className=" bg-[#f6f4f4] [#43434a] [#3b4348] [#676c73] [#3b4348] w- [66%] py-1 absolute bottom-1 right-0 flex-col rounded-br-md rounded-tl-md justify-start gap-2 items-center  ">
              {contestants.slice(4,16).filter((element, index) => { return index % 2 === 1}).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.108}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
              })}
              { vacantSpots.slice(contestants.slice(4,16).filter((element, index) => { return index % 2 === 1}).length ,6).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.108} /> 
                                        )
              }) }
        </View>

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
                                                                className=" bg-[#353131] absolute top-8 left-0  rounded-lg w- [20%]  gap-1 flex-col px-2 py-2  justify-center items-center">
                                                                    <Text
                                                                        style={{fontSize:7}}
                                                                        className="text-center font-black mt- auto text-white">
                                                                           {participationStatus !== "NOT CONTESTANT" ? "YOU ARE" : "JOIN"}
                                                                    </Text>
                                                                    <Text
                                                                        style={{fontSize:7}}
                                                                        className="text-center font-black mt- auto text-blue-200">
                                                                            {participationStatus !== "NOT CONTESTANT" ? participationStatus :"CONTEST"}
                                                                    </Text>
                                                                    
        </TouchableOpacity>
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
                                                                } })
                                                            }
                                                        }
                                                        className=" absolute top-8 bg-[#353131] right-0 bord er-4 bo rder-blue-400 rounded-lg w- [23%]  gap-1 flex-col px-2 py-2  justify-center items-center">
                                                                <Text
                                                                 style={{fontSize:8}}
                                                                 className="text-c enter font-black  text-white">
                                                                    {userTalent.contestants.length}
                                                                </Text>
                                                                <Text
                                                                style={{fontSize:7}}
                                                                className="text-ce nter font-black  text-blue-200">
                                                                    CONTESTANTS
                                                                </Text>
        </TouchableOpacity>

        
           
     </View>
    </>
    )} 
    </>
  )
}