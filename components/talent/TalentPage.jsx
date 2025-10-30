import { View, Text, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LeftSidePanel from './panels/LeftSidePanel'
import { icons } from '../../constants';
import RightSidePanel from './panels/RightSideBar';
import TopPanel from './panels/TopPanel';
import BottomPanel from './panels/BottomPanal';
import ShuffleLetters from '../custom/ShuffleLetters';
import { createTalentRoom } from '../../apiCalls';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import UserTalentEntry from './UserTalentEntry';
import TalentDisplayer from './TalentDisplayer';

export default function TalentPage() {
  const { width, height } = useWindowDimensions();
  const {user , globalRefresh, setGlobalRefresh} = useGlobalContext()
  const [show,setShow] = useState(true)
  const [selectedTalent,setSelectedTalent] = useState({name:"Music"})
  const [selectedRegion,setSelectedRegion] = useState({name:"Africa"})
  const [talentRoom , setTalentRoom] = useState(null)
  const [userContestantStatus , setUserContestantStatus] = useState(null);
  const [userParticipation, setUserParticipation] = useState(null);
  const [edition,setEdition] = useState(null)
  const [isLoading ,setIsLoading] = useState(true)


  const h = height * 0.68 
  const w = width 

  const talentRooms = [
    { id: '1', name: 'Music', icon: icons.music, iconPack: 'FontAwesome5',color:"#dee2e3" },
    { id: '2', name: 'Dancing', icon: icons.dance, iconPack: 'Entypo' ,color:"#bdc2c4" },
    { id: '3', name: 'Fitness', icon: icons.fitness, iconPack: 'MaterialIcons',color:"#eb34cc" },
    { id: '4', name: 'Magic', icon: icons.magic, iconPack: 'FontAwesome5', color:"#6709e3"},
    { id: '5', name: 'Food', icon: icons.eating, iconPack: 'FontAwesome5' , color:"#c26e08" },
    { id: '6', name: 'Adventure', icon: icons.adventure, iconPack: 'MaterialIcons', color:"#08c227" },
    { id: '7', name: 'Sport', icon: icons.sport, iconPack: 'FontAwesome5' , color:"#babfba"},
    { id: '8', name: 'Instrument', icon: icons.instrument, iconPack: 'FontAwesome5', color:"#a83707" },
    { id: '9', name: 'Gaming', icon: icons.game, iconPack: 'FontAwesome5', color:"#0774ab" },
    { id: '10', name: 'Art', icon: icons.art, iconPack: 'FontAwesome5' , color:"#ab3807"},
    { id: '11', name: 'Tech', icon: icons.tech, iconPack: 'FontAwesome5' , color:"#99970c"},
    { id: '12', name: 'Comedy', icon: icons.comedy, iconPack: 'MaterialIcons', color:"#8a0303" },
  ];

  const regions = [
    { id: '1', name: 'Africa', icon: icons.africa,color:"#dee2e3" },
    { id: '2', name: 'Asia', icon: icons.asia, color:"#dee2e3" },
    { id: '3', name: 'America', icon: icons.america,color:"#dee2e3" },
    { id: '4', name: 'Europe', icon: icons.europe,color:"#dee2e3" },
  ];

  useEffect(() => {
    if(selectedTalent && selectedRegion){
        createTalentRoom({region:selectedRegion.name , name:selectedTalent.name}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation, setEdition, setIsLoading)
    }
  }, [selectedTalent , selectedRegion])

  useEffect(() => {
    if(globalRefresh){
        createTalentRoom({region:selectedRegion.name , name:selectedTalent.name}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation, setEdition, setIsLoading)
        setGlobalRefresh(false)
      }
  }, [globalRefresh])
  
//   useEffect(() => {
//     setSelectedTalent({
//         name:"Music" ,
//         icon :icons.music
//     })
//     setSelectedRegion({
//         name:"Africa" ,
//         icon :icons.africa
//       })
//     createTalentRoom({region:"Africa" , name:"Music"}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation, setEdition, setIsLoading)
//   }, [])

  return (
    <View

    className= "flex-col w-[100%] h-[100%] items-center bg-black [#312e2e] black justify-start ">
        
        {talentRoom && (
            <TalentDisplayer  userTalent={talentRoom} user = {user}  />
        )}
      
        <LeftSidePanel show = { !selectedRegion || true } width ={width * 0.19} height = {h} top= {40 }
             left ={0} right ={null}  
             data ={talentRooms.slice(0,6)}
             selectedTalent ={selectedTalent}
             setSelectedTalent ={setSelectedTalent}
             />

        <RightSidePanel show = { !selectedRegion  || true } width ={width * 0.19} height = {h} top= {40 }
             right ={0} left ={null}  
             data ={talentRooms.slice(6,12)}
             selectedTalent ={selectedTalent}
             setSelectedTalent ={setSelectedTalent}
             />
    
        {/* <TopPanel show = {selectedTalent && !selectedRegion || true } width ={width * 0.19} height = {h} top= {40 }
             right ={0} left ={null}  
             data ={talentRooms.slice(0,4)}
             selectedTalent ={selectedTalent}
             setSelectedTalent ={setSelectedTalent}

             /> */}
        
        <BottomPanel show = {selectedTalent && !selectedRegion || true } width ={width * 0.19} height = {h} top= {40 }
             right ={0} left ={null}  
             data ={regions.slice(0,4)}
             setSelectedRegion ={setSelectedRegion}
             selectedRegion ={selectedRegion}
             />

    </View>
  )
}