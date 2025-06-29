import { View, Text, Platform, TouchableOpacity, Image, useWindowDimensions, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { createTalentRoom, deleteContestant } from '../apiCalls';
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
import ProgresssBarVideo from '../components/custom/ProgresssBarVideo';
import Slider from '@react-native-community/slider';
import VolumeControl from '../components/custom/VolumeControl';
import DisplayContestant from '../components/talent/DisplayContestant';
import TopContestantBar from '../components/talent/TopContestantBar';
import ChallengeAction from '../components/modal/ChallengeAction';
import TalentRoomIntroduction from '../components/talent/TalentRoomIntroduction';
import { MotiView } from 'moti';
import ContestantRoom from '../components/talent/ContestantRoom';
import ContestantPostDetails from '../components/talent/ContestantPostDetails';
import CommentDisplayer from '../components/comments/CommentDisplayer';
import CommentModal from '../components/talent/modal/CommentModal';



export default function TalentContestRoom() {
const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData} = useGlobalContext()
const {region, regionIcon, selectedTalent , selectedIcon ,startIntroduction } =  useLocalSearchParams(); 
const [talentRoom , setTalentRoom] = useState(null)
const [isLoading ,setIsLoading] = useState(true)
const [isPlaying, setIsPlaying] = useState(false);
const [isContestantVisible, setIsContestantVisible] = useState(false);
const [userContestantStatus , setUserContestantStatus] = useState(null);
const [isModalVisible, setIsModalVisible] = useState(false)
const [text,setText] = useState("")
const [action,setAction] = useState("")

const [show,setShow] = useState(false)
const [start,setStart] = useState(startIntroduction =="true"? true : false )
const [displayComment,setDisplayComment] = useState(false)

const [selectedContestant, setSelectedContestant] = useState(null); // Replace with your initial video URL
const [userParticipation, setUserParticipation] = useState(null);
const [volume, setVolume] = useState(0.5); 
const{width ,height} = useWindowDimensions()
const insets = useSafeAreaInsets();

//************************************ Player set up  */
const player = useVideoPlayer
(
  demo
  , (player) => {
  player.loop = false;
  player.volume = volume
  player.pause() ;
  player.timeUpdateEventInterval = 0.1;
});

const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

useEffect(() => {
    // if (player && player.current) {
        player.volume = volume;
    // }
}, [ volume]);

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
    const statusSubscription = player?.addListener(
      'playingChange',
      ({isPlaying}) => {
        const finishedThreshold = player.duration;
        if (
          player.currentTime >= finishedThreshold &&
          player.currentTime > 0 
        ) {
          player.currentTime = 0
          setIsPlaying(false)
        //   setFinishPlaying(true);
          return;
        }
      },
    );

    return () => {
    //   setFinishPlaying(false)
      statusSubscription.remove();
    };
  }, []);


useEffect(() => {
    createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation, setIsLoading)
}, [])

useEffect(() => {
   if (talentRoom) {
     if(talentRoom.contestants.length > 0) {     
        const userP = talentRoom.contestants.find((contestant)=> contestant.user_id === user._id) 
        userP ? setUserContestantStatus("P") : setUserContestantStatus("NP")
        setUserParticipation(userP)

        // talentRoom.contestants.map((contestant, index) => {

        // })
      }else {
       setUserContestantStatus("NP")
       setUserParticipation(null)
      }
   }
}, [talentRoom])

//******************************handle actions , participation , resign .....  */
const handleTalentParticipation  = () => {
    setIsModalVisible(false)
    router.replace({ pathname: '/CreateParticipateTalent',params: { 
        selectedIcon:selectedIcon,
        regionIcon:regionIcon,
        talentRoom_id : talentRoom._id
      } }) 
}

const handleTalentResignition = () => {
    setIsModalVisible(false)
   deleteContestant(talentRoom._id, user._id, setTalentRoom , setIsLoading)
}

const confirmAction  = ()=> {
    console.log(userContestantStatus)
    setIsModalVisible(true)
    switch (userContestantStatus) {
      case "NP":
        setAction("NP")
        setText("Are you sure you want to join the talent Contest")
        break;
      case "P":
        setAction("P")
        setText("Are you sure you want to Resign from Talent Contestant")
        break;
      
      default:
        break;
    }
}


useEffect(() => {
   if(selectedContestant) {
    player.replaceAsync(null);
    // setIsPlaying(true)
    setIsContestantVisible(true)
    setTimeout(() => {
        player.replaceAsync(selectedContestant.video_url).then(()=> {setIsPlaying(true)});
        player.play();
        // setIsContestantVisible(false)
    }, 2500);
    }
   
}, [selectedContestant])

return (
    <>
      {!isLoading &&  (
        <View
         style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
         className=" flex-1  flex-col justify-center items-center  bg-[#060606]">

                { start ?
                  (
                        <>
                            {show ? (

                                <>
                                    {selectedContestant ? (
                                          <TouchableOpacity
                                          activeOpacity={1}
                                        onPress={toggleVideoPlaying}
                                          className={isPlaying? "w-[100vw] h-[100vh] justify-center items-center opacity-100":"w-[100vw] h-[100vh] justify-center items-center opacity-100"}
                                              > 
                                              
                                              <VideoView 
                                                             style={{ width:'100%' ,height:'100%',opacity:100}}
                                                             player={player}
                                                             contentFit='contain'
                                                             nativeControls ={false}
                                                             pointerEvents='box-only'
                                              />
                                                 <ContestantPostDetails user={user} show = {!isContestantVisible && !isPlaying && selectedContestant} displayComment ={displayComment}
                                                  setDisplayComment = {setDisplayComment} selectedContestant={selectedContestant} 
                                                  width ={width } height={height} top = { insets.top} />       
                                             
                                              <TouchableOpacity 
                                                  hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                                                //   style={{zIndex:0}}
                                                  onPress={ () => {!isContestantVisible && (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )} }
                                                  className={
                                                          "w-full h-full flex-col absolute top-  justify-center items-center"
                                                  }>
                                                  <Image 
                                                  className="w-14 h-14 opacity-100"
                                                  source={!isPlaying && icons.play}/>
                                              </TouchableOpacity>

                                              
                                              {displayComment && (<CommentModal user={user} displayComment={displayComment} setDisplayComment={setDisplayComment} selectedContestant={selectedContestant}/>)}

                                              {isPlaying && ! isContestantVisible && (<ProgresssBarVideo player={player} visible={!isPlaying} bottom={82} />)}
                                              {isPlaying && ! isContestantVisible && (
                                              <VolumeControl volume = {volume} setVolume={setVolume} bottom = {95} right ={4} />
                                              )}
                                          </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                        activeOpacity={1}
                                        className={ "w-[100vw] h-[100vh] justify-center items-center opacity-100"}
                                            >    
                                                    <Text 
                                                        style ={{fontSize:12}}
                                                            className="text-xl font-base mb- text-gray-300"> 
                                                            select a contestant 
                                                    </Text>
                                        </TouchableOpacity>
                                    )}
                                      
                                </>
                            ) : (
                              <>
                               {/* {userContestantStatus && ( */}
                                <ContestantRoom regionIcon = {regionIcon} selectedIcon = {selectedIcon} user={user} confirmAction={confirmAction} setShow ={setShow}
                                setSelectedContestant={setSelectedContestant} userParticipation ={userParticipation} userContestantStatus ={userContestantStatus}/>
                               {/* )}   */}
                               </>
                            )}
                          
                        </>

                ) : (
                    <TalentRoomIntroduction selectedIcon ={selectedIcon} selectedTalent={selectedTalent} region={region} regionIcon={regionIcon} setStart={setStart} />
                )}
                    
        
            {!isPlaying && start && !displayComment && (
            <MotiView
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 800, type: 'timing', duration: 600 }}
                className ="-[20%] -[10%]  absolute bottom-36 flex-col g-white rounded-xl  justify-start items-center">
                <View
                  className ="-[100%] -[60%] px-  g-white rounded-xl flex-col justify-center items-center">
                 <View
                    className ="-[100%] -[60%] px-1 gap-6 g-white rounded-xl flex-row justify-center items-center">
                    <Image
                    source={selectedIcon}
                    className ="w-7 h-7"
                    />
                     <Text 
                            style ={{fontSize:15 ,fontStyle:"italic"}}
                            className="text-xl font-black -auto text-white"> 
                            {talentRoom.contestants.length} 
                    </Text>
                    <Image
                    source={regionIcon}
                    className ="w-7 h-7"
                    />
                 </View>
                    <Text 
                            style ={{fontSize:13}}
                            className="text-xl font-black -auto text-white"> 
                            Contestants
                    </Text>
                   
               
                </View>
                <TouchableOpacity
                    onPress={()=> {
                        setSelectedContestant(null)
                        setShow(!show)
                        createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation, setIsLoading)
                       }
                    }
                    className ="-[100%] -[40%] p-1 bg-gray-200 rounded-lg flex-row justify-center items-center">
                     <View
                       className ="-[98%] -[94%] px-12 bg-white rounded-lg flex-row justify-center items-center">
                           <Text 
                                style ={{fontSize:9}}
                                className="text-xl font-black -auto text-black"> 
                                  {show? "HIDE" :"SHOW"} 
                           </Text>
                     </View>
                </TouchableOpacity>
            </MotiView>
            )}
 
            <DisplayContestant show = {isContestantVisible} setIsContestantVisible = {setIsContestantVisible} selectedContestant={selectedContestant} 
             width ={width } height={height} top = { insets.top} />
            {/* <TopBar show = {!isPlaying} width ={width} height={height * 0.05 } top={insets.top} left ={null} right ={null}
                       region={region} regionIcon ={regionIcon} selectedTalent={selectedTalent}  selectedIcon ={selectedIcon}/> */}
            <TopContestantBar show = {!isPlaying && show && !isContestantVisible} width ={width} height={ height * 0.11  } top={height * 0.0 + insets.top  } selectedIcon={selectedIcon}
             left ={0} right ={null} regionIcon ={regionIcon}  contestants = {talentRoom.contestants.slice(0,3)} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            <SideBarLeft show = {!isPlaying && show && !isContestantVisible} width ={width * 0.22} height={height - height * 0.19 -  insets.top - insets.bottom } top={height * 0.10 + insets.top + height * 0.01 }
             left ={0} right ={null} regionIcon ={regionIcon} selectedIcon={selectedIcon}  contestants = {talentRoom.contestants.slice(3,32).filter((element, index) => {
                return index % 2 === 1;
              })} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            <SideBarRight show = {!isPlaying && show && !isContestantVisible} width ={width * 0.22} height={height - height * 0.19 -  insets.top - insets.bottom } top={height * 0.10 + insets.top + height * 0.01} 
             right ={0} left ={null} regionIcon ={regionIcon} selectedIcon={selectedIcon} contestants = {talentRoom.contestants.slice(3,32).filter((element, index) => {
                return index % 2 === 0;
              })} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            <BottomBar show = {!isPlaying && ! displayComment && ! isContestantVisible} width ={width} height={height * 0.07 } bottom={insets.bottom} left ={null} right ={null} user = {user}
              userContestantStatus = {userContestantStatus}  talentRoom ={talentRoom}  confirmAction = {confirmAction}  region={region} regionIcon ={regionIcon} selectedTalent={selectedTalent}  selectedIcon ={selectedIcon}/>          
          
          {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     handleTalentParticipation  = {handleTalentParticipation} handleTalentResignition = {handleTalentResignition}
              
                       />
                 )}
          {/* {displayComment && (<CommentModal displayComment={displayComment} setDisplayComment={setDisplayComment} selectedContestant={selectedContestant}/>)} */}
        </View>
      )}
    </>
    
  )
}