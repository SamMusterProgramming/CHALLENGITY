import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIcon } from '../../helper';
import Contestant from './Contestant';
import SwingingTitle from '../custom/SwingingTitle';
import VacntSpotContestant from './VacntSpotContestant';

export default function TalentDisplayer({userTalent, user }) {
    const[ userParticipation , setUserParticipation ] = useState(null)
    const[ rank , setRank ] = useState(0)
    const[ name , setName ] = useState(null)

    const[ roundTitle , setRoundTitle ] = useState(null)

    const { width, height } = useWindowDimensions();
    const participationStatus = userTalent.contestants.find(c => c.user_id === user._id)? "ON STAGE" :
                                userTalent.queue.find(c => c.user_id === user._id) ? "IN QUEUE":"ELIMINATED"
    
    const insets = useSafeAreaInsets();
    const [selectedContestant , setSelectedContestant] = useState(null)
    const h = width +  - 7
    const [contestants, setContestants ]= useState([])
    const [vacantSpots, setVacantSpots] = useState([])


    useEffect(() => {
        userTalent.contestants.find(c => c.user_id === user._id) && setUserParticipation(
                      {...userTalent.contestants.find(c => c.user_id === user._id), status:participationStatus}
                    )
        userTalent.queue.find(c => c.user_id === user._id) && setUserParticipation(
                        {...userTalent.queue.find(c => c.user_id === user._id), status:userParticipation}
                      )
        userTalent.eliminations.find(c => c.user_id === user._id) && setUserParticipation(
                        {...userTalent.eliminations.find(c => c.user_id === user._id), status:userParticipation}
                      )
       setRank(userTalent.contestants.findIndex(c => c.user_id === user._id) + 1)
       const edition = userTalent.editions.find( e => e.status == "open")
       switch (edition.round) {
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

       let vs = []
       for (let index = 0; index < 22 - userTalent.contestants.length; index++) {
             vs.push({index : index})    
       }
       setVacantSpots(vs)
       setContestants(userTalent.contestants)
       setSelectedContestant(userTalent.contestants[0])
    
    
    }, [userTalent])

    useEffect(() => {
     if(selectedContestant) { 
        const splitName = selectedContestant.name.split(" ")
        setName({
        part1 : splitName[0],
        part2: splitName[1]
         })
       }
    }, [selectedContestant])
    
    

  return (
   <>
    {roundTitle && (     
    <>
    <View  
        className=" bg- primary  black [#353232] [#676c73] w-[100%] mt- 1 h-[32%] round ed-t-lg flex-col  justify-start items-start rounded-md ">
            
            <View
              className="bg- [#edebeb] [#353232] w-[100%] h- [33%] py-1 rounded-md flex-row  gap- 1 px-1 justify-between gap- 1  items-center">
                    {contestants.slice(0,8).map((contestant , index) =>{
                             return(
                                <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h * 0.114}
                                talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                )
                            })}
                    {vacantSpots.slice(contestants.slice(0,8).length  ,8).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.114} /> 
                                        )
                                }) }
            </View>

            <View
            className="b g-[#ecf2fc] w-[100%] flex- 1  h-[70%] rounded-b-xl  flex-row justify-between  items-start ">
                
                 <View
                    className = "bg- [#edebeb] [#353232] h- [100%] py-1 w-[13%] mt-2 rounded-md flex-col round ed-b-xl  bor der-black gap-2 justify-center py- 1  items-start pl-1 ">
                        {contestants.slice(8,12).filter((element, index) => { return index % 2 === 0}).map((contestant , index) =>{
                            return (
                                <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={ h * 0.114}
                                talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                               )
                        })}
                        {vacantSpots.slice(contestants.slice(8,12).length  ,2).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.114} /> 
                                        )
                                }) }
                 </View>

                 <View
                    className = "w-[74%]  h-[100%] bg- [#29374e] primary  [#010101]  flex-col py- 2 justify-start items-center  ">
                        <View
                            className = "bg- [#edebeb] [#353232] h- [50%] w- [98%] mt-2 fle x-1 rounded-md flex-row  gap-2 justify-center py-1  items-center px-1">
                                {contestants.slice(12,17).map((contestant , index) =>{
                                    return (
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={ h * 0.114}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                    )
                                })}
                                {vacantSpots.slice(contestants.slice(12,17).length  ,5).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.114} /> 
                                        )
                                }) }
                        </View>
                        <View
                            className = "bg- [#29374e] primary  black w-[100%] h-[50%] mt-1 flex-col justify-start py-2 gap-2 items-center">
                                            <View
                                                className=" flex-col justify-center items-center">
                                                        <Text
                                                        style={{fontSize:9}}
                                                        className="text-center  font-black  text-white">
                                                            {userTalent.name} Contest
                                                        </Text>
                                                    
                                            </View>
                                           
                                            <View
                                            className="  w-[100%]    g-white  px-8 flex-col text-center rounde d-xl justify-center  items-center "> 
                                                <SwingingTitle text={roundTitle} color={"orange"} fontSize={10} />
                                            </View>

                                            <View
                                            className = "absolute top-2 left-4 flex-col justify-start items-center gap-1" >
                                                       <Image
                                                        source={getIcon(userTalent.name)}
                                                        className ="w-5 h-5 rounded-full"
                                                        esizeMethod='cover'
                                                        />  
                                                       <Text
                                                                style={{fontSize:7}}
                                                                className="font-black  text-white">
                                                                    {userTalent.name}
                                                      </Text>
                                            </View>
                                            
                                            <View
                                            className = "absolute  top-2 right-4 flex-col justify-start items-center gap-1" >
                                                        <Image
                                                            source={getIcon(userTalent.region)}
                                                            className ="w-5 h-5  rounded-full"
                                                            esizeMethod='cover'
                                                            />  
                                                       <Text
                                                                style={{fontSize:7}}
                                                                className="font-black  text-white">
                                                                    {userTalent.region}
                                                      </Text>
                                            </View>

                                            <View
                                            className = "absolute  top-2 right-[20%] flex-row justify-start items-end gap-1" >
                                                        <Text
                                                                style={{fontSize:10}}
                                                                className="font-black  text-white">
                                                                    {userTalent.contestants.length}
                                                        </Text>
                                                        <Image
                                                            source={icons.contestant}
                                                            className ="w-4 h-4  rounded-full"
                                                            esizeMethod='cover'
                                                            />  
                                                       
                                            </View>
                                            
                        </View>

                 </View>

                 <View
                    className=" bg- [#edebeb] [#353232] rounded-md h- [100%] w-[13%] mt-2 flex-col  gap-2   justify-center  py-1  items-center px-2 pr -3">
                        {contestants.slice(8,12).filter((element, index) => { return index % 2 === 1}).map((contestant , index) =>{
                             return(
                                <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={h* 0.1157}
                                talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                )
                        })}
                        {vacantSpots.slice(contestants.slice(8,12).filter((element, index) => { return index % 2 === 1}).length  ,2).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.1157} /> 
                                        )
                                }) }
                 </View>

            </View>
           
        </View>

        
        <View
        className=" bg-black primary  [#303030] w-[68%] py- 2 h-[56%] rounded-b-xl flex-col justify-start items-center  ">
            {selectedContestant ? (
                <>
                  <View
                                className=" flex- 1 w-[100%]  px-2 mb- 2 flex-row h- [10%] pb-2 pt-4 justify-between gap-8 items-center"> 
            
                                    <View
                                            className=" h-[100%] flex-row justify-center items-center gap-1 ">
                                                       <Text 
                                                         style ={{fontSize:10}}
                                                         className="tex t-xl text-center p-0 font-black text-white"> 
                                                            💙 
                                                        </Text>
                                                                    
                                                        <Text 
                                                           style ={{fontSize:10}}
                                                           className="tex t-xl  font-bold text-end text-white"> 
                                                              {selectedContestant && selectedContestant.votes }
                                                        </Text>
                                    </View>
                                    <View
                                           className="flex- 1 h-[100%] flex-row justify-center items-center gap-1 ">
                                                <Text 
                                                   style ={{fontSize:10}}
                                                    className="tex t-xl text-ce nter  p-0 font-black text-yellow-400"> 
                                                    {selectedContestant && selectedContestant.rank < 4 ? "TOP" :"RK"}
                                                    </Text>
                                                    <Text 
                                                        style ={{fontSize:10}}
                                                        className="tex t-xl  font-bold text-white"> 
                                                           {selectedContestant && selectedContestant && selectedContestant.rank}
                                                    </Text>
                                    </View>
                  </View>
                  <View 
                                    style={{}}
                                    className ="w-[100%] flex-1 mb-1 px-1 h-[60%]"
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
                                                className=" w-[100%] h-[100%] fle x-1 round ed-lg  flex-row justify-center items-center   ">
                                                
                                                            <Image
                                                                className="w-[100%] h-[100%]  round ed-md"
                                                                source={{uri: selectedContestant && selectedContestant.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                                                resizeMethod='contain' /> 
                                                                <Image
                                                                className="absolute  w-10 h-10 round ed-xl"
                                                                source={icons.play}
                                                                resizeMethod='contain' /> 
                                        </TouchableOpacity>
                                       
                  </View>
                  <TouchableOpacity
                                                onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
                                                className="absolute top-2 flex-col bg-primary  black [#303030] [#676c73] rounded-full justify-center p-1 items-start gap-2 ">
                                                    <Image
                                                    source={{uri:selectedContestant && selectedContestant.profile_img}}
                                                    className ="w-[35px] h-[35px] m- rounded-full"
                                                    esizeMethod='cover'
                                                    />  
                                                
                   </TouchableOpacity>
                   <View
                   className = "absolute w-[25%] top-5 left-[17%] flex-row justify-end items-center b g-white">
                         <Text   
                         style ={{fontSize:9}}
                         className="font-black text-white ">
                                  {name && name.part1}  
                         </Text>
                   </View>
                   <View
                   className = "absolute w-[25%] top-5 right-[17%] flex-row justify-start items-center b g-white">
                        <Text   
                            style ={{fontSize:9}}
                            className="font-black text-white">
                                 {name && name.part2}  
                        </Text>
                   </View>
                  </>
            ):(
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
                                    // contestant_id : selectedContestant.user_id
                                    } })
                                }
                            }
                        style ={{ 

                        }}
                        className=" w-[100%] flex-1 h-[50%] bg-primary mt-3 rounded-lg  flex-row justify-center items-center   ">
                                    <Text   
                                    style ={{fontSize:25}}
                                    className="font-black  text-yellow-600 ">
                                            Enter 
                                    </Text>
                 </TouchableOpacity>
            )}
              
                  <View
                            className = " bg- [#29374e]  [#edebeb] rounded-lg h- [50%] w-[100%] mb-1 mt-1 flex -1 rounde d-t-xl flex-row  gap-2 justify-center py-1  items-start px-1">
                                {contestants.slice(17,22).map((contestant , index) =>{
                                    return (
                                        <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                                        participantTrackerId = {null} setSelectedContestant={setSelectedContestant} f={ h * 0.1157}
                                        talentRoom={userTalent} regionIcon={getIcon(userTalent.region)} selectedIcon = {userTalent.name} index ={index +19} w = {"90%"} h={"30%"}/> 
                                    )
                                })}
                                {vacantSpots.slice(contestants.slice(17,22).length  ,5).map((element , index) =>{
                                    return (
                                        <VacntSpotContestant key={index} f={h * 0.114} /> 
                                        )
                                }) }
                  </View>

                  {/* <TouchableOpacity
                                                onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
                                                className="absolute top-2 flex-col bg-black [#303030] [#676c73] rounded-full justify-center p-2 items-start gap-2 ">
                                                    <Image
                                                    source={{uri:selectedContestant && selectedContestant.profile_img}}
                                                    className ="w-[35px] h-[35px] m- rounded-full"
                                                    esizeMethod='cover'
                                                    />  
                                                
                   </TouchableOpacity>
                   <View
                   className = "absolute w-[25%] top-5 left-[17%] flex-row justify-end items-center b g-white">
                         <Text   
                         style ={{fontSize:9}}
                         className="font-black text-white ">
                                  {name && name.part1}  
                         </Text>
                   </View>
                   <View
                   className = "absolute w-[25%] top-5 right-[17%] flex-row justify-start items-center b g-white">
                        <Text   
                            style ={{fontSize:9}}
                            className="font-black text-white">
                                 {name && name.part2}  
                        </Text>
                   </View> */}
                 
                 {/* </>
            ):(
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
                                    // contestant_id : selectedContestant.user_id
                                    } })
                                }
                            }
                        style ={{ 

                        }}
                        className=" w-[70%] h-[50%] bg-primary rounded-lg mt-12 flex-row justify-center items-center   ">
                                    <Text   
                                    style ={{fontSize:25}}
                                    className="font-black  text-yellow-600 ">
                                            Enter 
                                    </Text>
                 </TouchableOpacity>
            )} */}

        </View>
        
     </>
    )} 
    </>
  )
}