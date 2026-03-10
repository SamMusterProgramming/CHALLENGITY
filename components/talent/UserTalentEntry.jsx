import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIcon, getStageLogo } from '../../helper';
import Contestant from './Contestant';
import SwingingTitle from '../custom/SwingingTitle';
import VacntSpotContestant from './VacntSpotContestant';
import { useGlobalContext } from '../../context/GlobalProvider';
import PostTalentHeader from '../activityHeader/PostTalentHeader';
import TalentActivityHeader from '../activityHeader/TalentActivityHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getVideo, migrateToBackblaze, migrateToBackblaze2 } from '../../videoFiles';
import StageHeader from './custom/StageHeader';

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

    const h = width 
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
      const userTalentMaterial = async() => {
       if(selectedContestant) { 
           const splitName = selectedContestant.name.split(" ")
           setName({
           part1 : splitName[0],
           part2: splitName[1] && splitName[1]
            })
          let vs = []
          for (let index = 0; index < 22 ; index++) {
                vs.push({index : index})    
          }
          setVacantSpots(vs)  

        //   if(!selectedContestant.profileImageUrl && selectedContestant.name == "Samir Haddadi" ){
        //     console.log("i am here")
        //      const contestant = await  migrateToBackblaze2 (userTalent._id, selectedContestant.user_id)
         
        //   }
        //   else {   
        //     setSelectedContestantImg(selectedContestant.profile_img)
        //   }
           await  migrateToBackblaze2 (userTalent._id, selectedContestant.user_id)
           setSelectedContestantImg(selectedContestant.profile_img)


        //   getVideo(selectedContestant.profile_img).then(path =>{
        //     setSelectedContestantImg(path)
        //    });
        //    getVideo(selectedContestant.thumbnail.signedUrl || selectedContestant.thumbnail.publicdUrl).then(path =>{
        //     setSelectedContestantThumbNail(path)
        //    });
          }
        }    
        userTalentMaterial()
    }, [selectedContestant])

  return (
   <>
    {name &&  (   
    <>
    <View
        style={{height: h + width/3.5  + width * 0.10, width:width }}
        className=" mb-8 w-[100%] rounded-lg gap-1  flex-col  justify-start items-center bg-gradient-to-r from-[#0f0f1a] to-black  border border-white/30 ">
            
            {/* <View
               style={{
                 height:60 ,
                  width:width
                }}
               className=" gap-1 bg-[#292828] w-[100%]    flex-row justify-between items-center "> */}
                
                 {/* <View
                 style={{ height:70 , width:70}}
                 className=" flex-row justify-center mt -2 items-center">
                   <Image
                    style={{ height:55, width:65}}
                    source={getStageLogo(userTalent.name)}
                    resizeMode='cover'/>        
                 </View>    
                 <View
                  
                        style={{ height:55 , width:width-130}}
                        className=" h- [80%] b g-[#0f1011]  rounded-lg gap- 2  flex-col justify-evenly pb- 1 items-center">
                            <Text
                                style={{fontSize:10}}
                                className="text-center mb- 4 font-black  text-gray-100">
                                        {userTalent.name} Contest
                            </Text>   
                            <View
                            >
                                                                <Text
                                                                 style={{fontSize:8}}
                                                                 className="text-c enter font-black  text-[white]">
                                                                    {userTalent.contestants.length}
                                                                    <Text
                                                                      style={{fontSize:7}}
                                                                      className="text-ce nter font-black  text-blue-200">
                                                                      {' '} Contestants
                                                                    </Text>
                                                                </Text>
                                                               
                            </View>          
                            <View
                                className = "w-[100%]  h- [100%]  flex-col justify-start  gap- 3 items-center">
                                                <View
                                                className="  w-[100%] b g-[#3a3a3a]  py- 2 flex-col text-center  justify-center  items-center "> 
                                                    <SwingingTitle text={roundTitle} color={"gold"} fontSize={8} />
                                                </View>           
                            </View>
                        
                      
                 </View>
                   
                 <View
                 style={{ height:70 , width:60}}
                 className=" flex-row justify-center  items-center">
                   <Image
                    style={{ height:70, width:70}}
                    source={getStageLogo(userTalent.region)}
                    resizeMode='cover'/>       
                 <View/>
                

              </View>    */}
                <StageHeader
                            stageLogo={getStageLogo(userTalent.name)}
                            stageTitle={userTalent.name}
                            contestants={userTalent.contestants.length}
                            round={roundTitle}
                            continentLogo={getStageLogo(userTalent.region)}
                            continentName= {userTalent.region}
                            width={ width}
                         />  

            {/* </View> */}

            {/* <View
              style={{ height: h * 0.13}}
              className="w-[100%] bg- [#fefeff]  flex-row px- 1   px- 2 justify-center  items-center">
                        <View
                            style={{  backgroundColor : boxBgColor}}
                            className=" h-[100%] w-[100%] bg-[#fefeff] flex -1 px-1 bg- black rounded-br-md flex-row   gap- 2 justify-between py-1  items-center ">
                                 {contestants.slice(0,8).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant = {contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.108}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
                                 })}
                                 {contestants.length < 8 && vacantSpots.slice(contestants.length,8).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.108} /> 
                                        )
                                 }) }
                         </View>
                       
                    
            </View> */}

          
      <View
        style={{  height : h * 0.138  , backgroundColor : boxBgColor}}
        className=" border-b border-white/30 w- [66%] py-4 px-2  flex-row rounded-xl justify-center gap-4 items-center  ">
              {contestants.slice(0,5).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.108}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
              })}
         
        </View>
       

        <View
        style={{ 
            // height:h - h * 0.14 , 
            width : width * 0.8 }}
        className="  mb-1 flex-1 [#f6f4f4]  [#4a4646] [#deddd9] [#333132] [#630d20] p- 1 [#3b4348] [#3b4348] w-[66%] gap-1 h-[56%] rounded-b-md flex-col justify-start items-center  ">
                  
                  <View 
                                    style={{}}
                                    className ="w-[100%] flex-1 pb-1 pt-1 "
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
                                                                className="w-[100%] h-[100%] opacity-70 rounded-md"
                                                                source={{uri: selectedContestant.thumbnail?.publicUrl }}
                                                                // source ={icons.big_heart}
                                                                resizeMethod='contain' /> 
                                                                <Image  
                                                                className="absolute  w-10 h-10 rounded-xl"
                                                                source={icons.play}
                                                                resizeMethod='contain'/> 
                                        </TouchableOpacity>
                  </View>

                  <View
                                className=" absolute rounded-tl-3xl bottom-0 right-0 bg-[#030303] pl-2 pt-2 flex-row  justify-between gap-3 items-end"> 
                                   
                                    <TouchableOpacity
                                                onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
                                                className="  flex-col  [#deddd9] [#333132] [#630d20]  [#3b4348]  rounded-full justify-center p- 2 items-start gap-2 ">
                                                    <Image
                                                    source={{uri:selectedContestantImg}}
                                                    style ={{ width:width/10 , height:width/10}}
                                                    className ="w-[50px] h-[50px] m- rounded-full"
                                                    esizeMethod='cover'
                                                    />  
                                                  
                                    </TouchableOpacity>
                                    <View
                                            className=" h- [100%] flex-col justify-start items-start gap-1 ">
                                                        <Text 
                                                         style ={{fontSize:width/55}}
                                                         className="tex t-xl text-center p-0 font-black text-[#3962cb]"> 
                                                            Votes {' '}
                                                            <Text 
                                                              style ={{fontSize:width/55}}
                                                              className="tex t-xl  font-black text-end text-gray-100"> 
                                                                {selectedContestant && selectedContestant.votes }
                                                            </Text>
                                                        </Text> 
                                                        <Text 
                                                        style ={{fontSize:width/55}}
                                                        className=" mb- font-black text-red-300"> 
                                                        {selectedContestant && selectedContestant.rank < 4 ? "Top" :"Ranked"}{' '}
                                                            <Text 
                                                                style ={{fontSize:width/55}}
                                                                className="tex t-xl  font-black text-gray-100"> 
                                                                {selectedContestant && selectedContestant && selectedContestant.rank}
                                                            </Text>
                                                        </Text>
                                                        <Text 
                                                                style ={{fontSize:width/50}}
                                                                className="font-black text-gray-100"> 
                                                                {selectedContestant && selectedContestant.name.slice(0,10)}
                                                       </Text>
                                                   
                                    </View>
                                    {/* <View
                                           className="flex- 1 h-[100%] flex-row justify-center items-center gap-1 ">
                                                    <Text 
                                                     style ={{fontSize:8}}
                                                     className="tex t-xl text-ce nter  p-0 font-black text-red-300"> 
                                                       {selectedContestant && selectedContestant.rank < 4 ? "TOP" :"RANKED"}
                                                    </Text>
                                                    <Text 
                                                        style ={{fontSize:9}}
                                                        className="tex t-xl  font-black text-gray-100"> 
                                                           {selectedContestant && selectedContestant && selectedContestant.rank}
                                                    </Text>
                                    </View> */}
                  </View>


                  {/* <TouchableOpacity
                                                onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
                                                className="absolute top-[5px] flex-col bg-[#000000] [#deddd9] [#333132] [#630d20]  [#3b4348]  rounded-full justify-center p-2 items-start gap-2 ">
                                                    <Image
                                                    source={{uri:selectedContestantImg}}
                                                    className ="w-[50px] h-[50px] m- rounded-full"
                                                    esizeMethod='cover'
                                                    />  
                                                  
                   </TouchableOpacity> */}
                   {/* <View
                   className = "absolute w-[25%] top-5 left-[14%] flex-row justify-end items-center b g-white">
                         <Text   
                         style ={{fontSize:8}}
                         className="font-black text-gray-100 ">
                                  {name && name.part1}  
                         </Text>
                   </View>
                   <View
                   className = "absolute w-[25%] top-5 right-[14%] flex-row justify-start items-center b g-white">
                        <Text   
                            style ={{fontSize:8}}
                            className="font-black text-gray-100">
                                 {name && name.part2}  
                        </Text>
                   </View> */}
        </View>
       

        {/* <View
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
        </View> */}

        

        {/* <View
        style={{ width : h * 0.14 , height : h / 2 + 30  , bottom: h * 0.27 ,left:5 , backgroundColor : boxBgColor}}
        className=" bg-[#000000]  [#43434a] [#3b4348] [#676c73] [#3b4348] w- [66%] py-4  absolute   flex-col rounded-full justify-start gap-4 items-center  ">
              {contestants.slice(0,5).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.108}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
              })}
         
        </View> */}

        {/* <View
        style={{ width : h * 0.12 , height : h - h * 0.30  , bottom: h * 0.27 ,right: 1 , backgroundColor : boxBgColor}}
        className=" bg-[#f6f4f4] [#43434a] [#3b4348] [#676c73] [#3b4348] w- [66%] py-1 absolute bottom- 1 right-0 flex-col rounded-br-md rounded-tl-md justify-between gap-2 items-center  ">
              {contestants.slice(8,22).filter((element, index) => { return index % 2 === 1}).map((contestant , index) =>{
                                    return(
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.108}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                        )
              })}
              { vacantSpots.slice(contestants.slice(8,22).filter((element, index) => { return index % 2 === 1}).length ,7).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.108} /> 
                                        )
              }) }
        </View> */}

        {activity ? (
         <TalentActivityHeader data={userTalent} userProfile = {userProfile} activity = {true} user = {user} type = "talent"/>
         ):(
         <PostTalentHeader data={userTalent} user={user}/>
         )}
           
     </View>

   


    </>
    )} 
   
   
    </>
  )
}