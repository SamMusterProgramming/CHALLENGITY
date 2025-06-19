import { View, Text, Platform, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { createTalentRoom } from '../apiCalls';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import demo from "../assets/video/demo1.mp4"
import { icons } from '../constants';
import SideBarLeft from '../components/talent/SideBarLeft';
import SideBarRight from '../components/talent/SideBarRight';
import TopBar from '../components/talent/TopBar';
import BottomBar from '../components/talent/BottomBar';
import { useGlobalContext } from '../context/GlobalProvider';

export default function TalentContestRoom() {
const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData} = useGlobalContext()
const {region, regionIcon, selectedTalent , selectedIcon} =  useLocalSearchParams(); 
const [talentRoom , setTalentRoom] = useState(null)
const [isLoading ,setIsLoading] = useState(true)
const [isPlaying, setIsPlaying] = useState(false);
const [selectedContestant, setSelectedContestant] = useState(null); // Replace with your initial video URL

const{width ,height} = useWindowDimensions()
const insets = useSafeAreaInsets();


const player = useVideoPlayer
(
  demo
  , (player) => {
  player.loop = false;
  player.volume = 0.6
  player.pause() ;
//   player.timeUpdateEventInterval = 0.1;
});

const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

const toggleVideoPlaying = () =>{
    if(isPlaying){
      player.pause()
      setIsPlaying(false)
    }else {
      player.play()
      setIsPlaying(true)
    }
}

useEffect(() => {
    createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , setIsLoading)
}, [])

const handleParticipate = () => {
    console.log(talentRoom)
    router.navigate({ pathname: '/CreateParticipateTalent',params: {
        // description:description,
        // challengeType:selectedType , 
        // challengePrivacy:selectedPrivacy  ,
        // challengeMode : selectedAudience ,
        // invited_friends: JSON.stringify(selectedFriends)
        selectedIcon:selectedIcon,
        regionIcon:regionIcon,
        talentRoom_id : talentRoom._id
      } }) 
}

// const selectContestantVideo = ()=> {
//     player.replace(newVideoUrl);
// }

useEffect(() => {
   if(selectedContestant) {
    player.replaceAsync(selectedContestant.video_url);
    player.play();
    setIsPlaying(true)
   }
}, [selectedContestant])

return (
    <>
      {!isLoading &&  (

        <View
         style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
         className=" flex-1  flex-col justify-start items-center  bg-[#060606]">

            <TouchableOpacity
                    onPress={toggleVideoPlaying }
                    activeOpacity={1}
                    className={isPlaying? "w-[100vw] h-[100vh]  opacity-100":"w-[100vw] h-[100vh] justify-center items-center opacity-40"}
                >    
                <VideoView 
                   
                        style={{ width:'100%' ,height:'100%',opacity:100}}
                        player={player}
                        contentFit='contain'
                        nativeControls ={false}
                        pointerEvents='box-only'
                      />
                <TouchableOpacity 
                    hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                    onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) } }
                    className={
                            "w-full h-full flex-col absolute top- justify-center items-center"
                    }>
                    <Image 
                    className="w-14 h-14 opacity-100"
                    source={!isPlaying && icons.play}/>
                </TouchableOpacity>
            </TouchableOpacity>

            {!isPlaying && (
            <View
              className ="w-[40%] h-[5%]  absolute top-32 flex-row bg-white rounded-xl  justify-start items-start">
                <View
                className ="w-[50%] h-[100%] px-2 bg-white rounded-xl flex-row justify-between items-center">
                    <Image
                    source={icons.contestant}
                    className ="w-[40%] h-[50%]"
                    />
                    <Image
                    source={regionIcon}
                    className ="w-[40%] h-[60%]"
                    />
                </View>
                <View
                className ="w-[50%] h-[100%] px-2 bg-red-600 rounded-r-xl flex-row justify-center items-center">
                    <Text 
                            style ={{fontSize:8}}
                            className="text-xl font-black -auto text-white"> 
                            Contestants
                    </Text>
                </View>
            </View>
            )}

           
            <TopBar show = {!isPlaying} width ={width} height={height * 0.05 } top={insets.top} left ={null} right ={null}
                     handleParticipate = {handleParticipate}  region={region} regionIcon ={regionIcon} selectedTalent={selectedTalent}  selectedIcon ={selectedIcon}/>
            <SideBarLeft show = {!isPlaying} width ={width * 0.22} height={height - height * 0.12 -  insets.top - insets.bottom } top={height * 0.05 + insets.top + height * 0.01 }
             left ={0} right ={null} regionIcon ={regionIcon}  contestants = {talentRoom.contestants} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            <SideBarRight show = {!isPlaying} width ={width * 0.22} height={height - height * 0.12 -  insets.top - insets.bottom } top={height * 0.05 + insets.top + height * 0.01} 
             right ={0} left ={null} regionIcon ={regionIcon} contestants = {talentRoom.contestants}/>
            <BottomBar show = {!isPlaying} width ={width} height={height * 0.05 } bottom={insets.bottom} left ={null} right ={null} user = {user}
                  handleParticipate = {handleParticipate}  region={region} regionIcon ={regionIcon} selectedTalent={selectedTalent}  selectedIcon ={selectedIcon}/>
                 
        </View>
      )}
    </>
    
  )
}