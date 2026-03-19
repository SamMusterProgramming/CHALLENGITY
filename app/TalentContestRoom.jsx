import { View, Text, Platform, TouchableOpacity, Image, useWindowDimensions, Dimensions, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { addContestantToQue, addTalentRoomToFavourite,  createTalentRoom, deleteContestant, eliminationTalentRoom, getUserTalent, getUserTalentPerformances, removeTalentRoomFromFavourite } from '../apiCalls';
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
import BottomContestantBar from '../components/talent/BottomContestantBar';
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { storage } from '../firebase';
import ContestantList from '../components/talent/ContestantList';
import { useKeepAwake } from 'expo-keep-awake';
import CentralContestantPlayer from '../components/talent/CentralContestantPlayer';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { getIcon, getStageLogo } from '../helper';
import SwingingTitle from '../components/custom/SwingingTitle';
import CentralQueuePlayer from '../components/talent/CentralQueuePlayer';
import CentralElimineePlayer from '../components/talent/CentralElimineePlayer';
import TalentParticipation from '../components/talent/TalentParticipation';
import { getVideo, getVideoUrl, migrateToBackblaze } from '../videoFiles';
import { getUploadUrl, uploadImageToBlackBlaze, uploadVideoToBackblaze } from '../uploadFileToBlackBlaze';
import CommentDrawer from '../components/talent/modal/CommentDrawer';
import CommentSheet from '../components/talent/modal/CommentDrawer';
import { continentIcons, stageIcons } from '../utilities/TypeData';



export default function TalentContestRoom() {
const {user , setUserTalents ,setGlobalRefresh , favouriteList,setFavouriteList, setUserTalentPerformance} = useGlobalContext()

const {region, regionIcon, selectedTalent , selectedIcon ,startIntroduction ,contestant_id , showGo , location} =  useLocalSearchParams(); 
const [talentRoom , setTalentRoom] = useState(null)
const [isLoading ,setIsLoading] = useState(true)
const [isPlaying, setIsPlaying] = useState(false);
const [isFavourite, setIsFavourite] = useState(false);

// const [isContestantVisible, setIsContestantVisible] = useState(false);
const [userContestantStatus , setUserContestantStatus] = useState(null);
const [isModalVisible, setIsModalVisible] = useState(false)
const [text,setText] = useState("")
const [action,setAction] = useState("")


const [show,setShow] = useState(true)
const [start,setStart] = useState(
  // startIntroduction =="true"? true : 
  true )

const [displayComment,setDisplayComment] = useState(false)
const [displayThumbnail ,setDisplayThumbnail] = useState(false)
const [selectedContestant, setSelectedContestant] = useState(null); 
const [userParticipation, setUserParticipation] = useState(null);
const [volume, setVolume] = useState(0.5); 
const {width ,height} = useWindowDimensions()
const insets = useSafeAreaInsets();
const [isExpired , setIsExpired] = useState(false)
const [isRefreshing , setIsRefreshing] = useState(false)
const [usedLocalParams , setUsedLocalParams] = useState(false)
const [numberOfContestants , setNumberOfContestants] = useState(0)
const [participationType , setParticipationType] = useState(null)
const [edition,setEdition] = useState(null)

const [newChallenge,setNewChallenge] = useState(false)
const [replayRecording,setReplayRecording] = useState(false)
const [participantTrackerId , setParticipantTrackerId] = useState(null)
const [selectedPostIndex , setSelectedPostIndex] = useState(0)
const [data,setData] = useState(null)
const [isScrolling , setIsScrolling] = useState(false)
const [selection , setSelection] = useState("stage")
const [stage , setStage] = useState(true)

const [selectedThumbnailUrl , setSelectedThumbnailUrl] = useState(null)
const [selectedVideoUrl , setSelectedVideoUrl] = useState(null)
const [selectedPerformance , setSelectedPerformance] = useState(null)

const modalRef = useRef(null);

const openComments = () => {
  modalRef.current?.present();
};


useKeepAwake();
//************************************ Player set up  */
const player = useVideoPlayer
(
  null
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
    createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation, setEdition, setIsLoading)
}, [])



useEffect(() => {
 if(isExpired) {
  createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation,setEdition, setIsLoading)
  setSelectedContestant(null)
  setTimeout(() => {
       setIsExpired(false)
  }, 1500);  
      }
}, [isExpired])



useEffect(() => {
   if (talentRoom) {
     setIsPlaying(false)
     setNumberOfContestants(talentRoom.contestants.length)
     if(talentRoom.contestants.length > 0) {     
        const userP = talentRoom.contestants.find((contestant)=> contestant.user_id === user._id) 
        userP ? setUserContestantStatus("P") : setUserContestantStatus("NP")
        setUserParticipation(userP)
      } else {
       setUserContestantStatus("NP")
       setUserParticipation(null)
      }
      if (!usedLocalParams && contestant_id) {
        if(talentRoom.contestants.length > 0) {     
           setSelectedContestant(location == "contest" ? talentRoom.contestants.find((contestant)=> contestant.user_id === contestant_id) 
                                               : talentRoom.contestants[0])
           setStage(showGo =="true"? true : false)
           setStart(true)
           setUsedLocalParams(true)
         } 
      } 
      let d = [] ; 
      talentRoom.contestants.forEach((p , index) => {
          d.push({...p,rank:index + 1})
      })
      setData([...d])

      // !participantTrackerId && talentRoom.contestants.length > 0 &&  setParticipantTrackerId(talentRoom.contestants[0]._id) 
      // participantTrackerId && talentRoom.contestants.length == 0 &&  setParticipantTrackerId(null) 

      
     if(selectedContestant){
        if(talentRoom.contestants.find(c=> c.user_id === selectedContestant.user_id)){
          // setParticipantTrackerId(selectedContestant)
          setSelectedContestant(d.find(p => p.user_id ===  selectedContestant.user_id))
        }else {
          setSelectedContestant(null)
          // setParticipantTrackerId(talentRoom.contestants[0]._id)
          // setSelectedPostIndex(0)
        }
     }

     if(favouriteList){
       setIsFavourite(favouriteList.favourites.find(f=> f._id == talentRoom._id))
     }else setIsFavourite(false)
   }
  
}, [talentRoom])


useEffect(() => {
  favouriteList && talentRoom &&  setIsFavourite(favouriteList.favourites.find(f=> f._id == talentRoom._id))
}, [favouriteList])


//******************************handle actions , participation , resign .....  */
const handleTalentParticipation  = () => {
    setIsModalVisible(false)
    // setParticipationType(null)
    setNewChallenge(true)
}

const handleTalentResignition = () => {
      setIsModalVisible(false)
      setParticipationType(null)
      let post_id = null ;
    

    if(participationType == "resign") {
     post_id = userParticipation._id  
     }
     if(participationType == "eliminated") {
              const userElimination = talentRoom.eliminations.find(u => u.user_id == user._id) 
              post_id = userElimination._id
     }
     if(participationType == "queued") {
             const userQueuedReservation =  talentRoom.queue.find( u => u.user_id == user._id) 
             post_id = userQueuedReservation._id
      }

    deleteContestant(talentRoom._id,{user_id:user._id, post_id:post_id,type:participationType},setTalentRoom , setIsLoading)
    getUserTalent(user._id , setUserTalents)
    setGlobalRefresh(true)
}

const handleQueue = () => {
 setIsModalVisible(false)
 setParticipationType(null)
 addContestantToQue(talentRoom._id,{
                   user_id:user._id,
                   profile_img:user.profile_img,
                   name:user.name
                  },
                    setTalentRoom , setIsLoading
                  )
}

const addFavourite  = () => {
  setIsModalVisible(false)
  addTalentRoomToFavourite(user._id,{talentRoom_id:talentRoom._id},setFavouriteList,setIsExpired)
}
const removeFromFavourite = ()=> {
  setIsModalVisible(false)
  removeTalentRoomFromFavourite(user._id,{talentRoom_id:talentRoom._id},setFavouriteList,setIsExpired)
}

useEffect(() => {
  if(participationType) {
  setIsModalVisible(true)
   switch (participationType) {
    case "addFavourite":
      setAction("FA")
      setText("Are you sure you want to add the contest to your favourite list")
      break;
    case "removeFavourite":
      setAction("RF")
      setText("Are you sure you want to remove the contest from your favourite list")
      break;
    case "new":
      setAction("NP")
      setText("Are you sure you want to join the talent Contest")
      break;
    case "update":
        setAction("NP")
        setText("Are you sure you want to update your participation Contest")
        break;
    case "qupdate":
        setAction("NP")
        setText("Are you sure you want to update your reservation")
        break;
    case "eupdate":
        setAction("NP")
        setText("Are you sure you want to update your eliminated post")
        break;
    case "queue":
        setAction("NP")
        setText("Are you sure you want to reserve a pot in a que")
        break;
    case "queued":
        setAction("P")
        setText("Are you sure you want to remove your que reservation")
        break;
    case "resign":
      setAction("P")
      setText("Are you sure you want to Resign from Talent Contestant")
      break;
    case "action":
        setAction("OK")
        setText("can't update your post yet , you need to wait 3 days ")
        break;
    case "eliminated":
        setAction("P")
        setText("are you sure want to delete your post forever? you can update your post and get back in queue")
        break;
    case "locked":
          setAction("OK")
          setText("Compeition is locked, when competion enters final phases users can not join , neither can resign from the competition")
          break;
    case "cplay":
          setAction("OK")
          setText("can't play a post from the queue , the contestant needs to enter the stage ")
          break;
    case "help":
          setAction("help")
          setText("can't play a post from the queue , the contestant needs to enter the stage ")
          break;
    default:
      break;
  }
}
}, [participationType])


useEffect(() => {

   const loadVideo = ()=>{
    
    if ( ! talentRoom || ! selectedContestant) return;
    try {
      setSelection("stage");
      setDisplayThumbnail(true)
      // setSelectedThumbnailUrl(selectedContestant.performances[0].thumbnail?.publicUrl)
      setSelectedPerformance({...selectedContestant.performances[0]})
      // if(!selectedContestant.video?.cdnURL){
      // getVideoUrl(
      //   talentRoom._id,     
      //   selectedContestant._id
      // ).then(url => {
      //   player.replaceAsync(url).then(()=> {setDisplayThumbnail(false)    })
      //   }) 
    //}
      // else{
      //     player.replaceAsync(selectedContestant.performances[0].video?.cdnURL).then(()=> {setDisplayThumbnail(false) })
      // }
     
      player.replaceAsync(selectedContestant.performances[0].video?.cdnUrl).then(()=> {setDisplayThumbnail(false) })

      // setStage(true);
      setSelection("stage");
      // setParticipantTrackerId(selectedContestant._id);
      // setSelectedPostIndex(selectedContestant.rank - 1);

    } catch (err) {
      console.error("Error loading video:", err);
    }
   }
  loadVideo()
}, [selectedContestant])

// useEffect(() => {
//   if(!selectedPerformance) return ;
//    setDisplayThumbnail(true)
//    player.replaceAsync(selectedPerformance.video?.cdnUrl).then(()=> {
//                   setTimeout(() => {
//                     setDisplayThumbnail(false) 
//                   }, 300); 
//                    })
// }, [selectedPerformance])


const handleRefresh =()=> {
  setIsRefreshing(true)
  createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation,setEdition, setIsLoading)
  setTimeout(() => {
       setIsRefreshing(false)
  }, 400);
}

return (
    
     
        
  <View
  style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top  }}
  className=" flex-1  min-w-[100vw] min-h-full flex-row justify-center items-center   bg-[#000000]" >
      <View
       className=" flex-1  min-w-[100%] min-h-[100%] flex-row justify-center items-center   bg-black [#3d3c3a] [#041539]   [#786d6d]">
           {!isLoading && ! isExpired && talentRoom && data && (
         
                 <>
                            {stage ? (

                                <>
                                    {selectedContestant && (
                                          <TouchableOpacity
                                          activeOpacity={1}
                                          onPress={toggleVideoPlaying}
                                          className={ "w-[100vw] h-[100%] b g-white flex-col justify-center items-center "}
                                              > 
                                              <View
                                              className = {!isPlaying ? "opacity-35 w-[100%] " : "w-[100vw]  opacity-100"}>
                                                       {displayThumbnail ? (
                                                          <View
                                                          className="w-[100%] h-[100%] justify-center items-center">
                                                                <Image 
                                                                  className="w-[100%] h-[100%] opacity-100"
                                                                  resizeMethod='contain'
                                                                  source={{uri:selectedPerformance?.thumbnail.publicUrl}}/> 
                                                                 <ActivityIndicator className="absolute" size="large" color="white" />
 
                                                          </View>
                                                      
                                                       ):(
                                                        <VideoView 
                                                                  style={{ width:'100%' ,height:'100%'}}
                                                                  player={player}
                                                                  contentFit='cover'
                                                                  nativeControls ={false}
                                                                  pointerEvents='box-only'
                                                        />
                                                        )} 
                                               
                                              </View>
                                             
                                              <ContestantPostDetails user={user} show = { !isPlaying && selectedContestant} displayComment ={displayComment}
                                                  setDisplayComment = {setDisplayComment} selectedContestant={selectedContestant} setIsExpired={setIsExpired} talentRoom={talentRoom}
                                                  // confirmAction = {confirmAction} setAction ={setAction} setText ={setText}
                                                  setParticipationType ={setParticipationType}
                                                  rank={selectedContestant.rank}
                                                  handleRefresh ={handleRefresh}
                                                  openComments ={openComments}
                                                  width ={width } height={height} top = { height/7} />       
                                             
                                              <TouchableOpacity 
                                                  hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                                               
                                                  onPress={ () => { (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )} }
                                                  className={
                                                          "w-full h-full flex-col absolute top-  justify-center items-center"
                                                  }>
                                              </TouchableOpacity>


                                              {isPlaying && (<ProgresssBarVideo player={player} visible={!isPlaying} bottom={82} />)}
                                              {isPlaying &&  (
                                              <VolumeControl volume = {volume} setVolume={setVolume} bottom = {95} right ={4} />
                                              )}
                                          </TouchableOpacity>
                                    )}
                                      
                                </>
                            ) : (
                              <>
                                 {!newChallenge ? (
                                  <ContestantRoom regionIcon = {regionIcon} selectedIcon = {selectedIcon} user={user}  setShow ={setShow}
                                  h={width * (1.05)} w={width * 0.57} top={insets.top + width * 0.01} setStage ={setStage} setParticipationType={setParticipationType}
                                  setSelectedContestant={setSelectedContestant} userParticipation ={userParticipation} userContestantStatus ={userContestantStatus} setStart={setStart}
                                  numberOfContestants={numberOfContestants}  talentRoom={talentRoom} edition={edition}/>
                                ):(
                                  <TalentParticipation talentRoom= {talentRoom} setReplayRecording={setReplayRecording} setNewChallenge={setNewChallenge} 
                                  participation = {participationType} userParticipation ={userParticipation}
                                  user={user} setSelectedContestant={setSelectedContestant} setStage={setStage} setTalentRoom={setTalentRoom} setIsExpired={setIsExpired}
                                   />
                                  )}
                               </>
                            )}
                          
         


                    
         {!isPlaying && (
            <View
            style = {{ top : height * 0.1 ,left :10}}
                  className="w- [100%] h- [15%] absolute top-8 flex-col  justify-center  items-center ">
                        {/* <View
                        className = "w-[100%] gap-4 flex-row justify-center items-end">
                         
                            <Image
                                    source={getStageLogo(talentRoom.name)}
                                    style ={{ width:width/8 ,height :width/6 }}
                                    className ="bg -black-100"
                                    resizeMethod='cover'
                                    />  
                            <Text 
                            style ={{fontSize:width/50 ,fontStyle:"italic"}}
                            className="tex t-xl font-black mb-4 text-yellow-500"> 
                              {talentRoom.contestants.length}  Contestants
                           </Text>
                           <Text  
                            style ={{fontSize:width/50 ,fontStyle:"italic"}}
                            className="absolute top-6 right-0 font-black -auto text-white"> 
                              {talentRoom.region}  
                           </Text>
                        </View> */}
                      
                        
            </View>
         )}

      {/* bottom menue */}
             {!isPlaying  && !replayRecording &&  (
                <MotiView
                  from={{ opacity: 0, translateY: 40 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: 800, type: 'timing', duration: 600 }}
                  style = {{
                  
                    width : width ,
                    bottom: !newChallenge? height * 0 : 0,
                 
                  }}
                  className ="absolute py-2 flex-col b g-[#120564] border border-t-yellow-600  justify-center p -1  items-center"
                >
                <View
                   className ="w-[100%]  px-1 bg-[rgba(0,0 , 0 , 0.5)] gap-2 rounded-lg flex-row justify-center items-center">
                        
                        <TouchableOpacity
                                                  onPress={()=> { 
                                                      // setSelectedContestant(null)
                                                      !stage && setStage(!stage)
                                                    }
                                                  }
                                                  className ="w- [100%] h- [60%] p- 2 b g-[#7a2038] rounded- xl  g-white  flex-row justify-center items-center">
                                                  <View
                                                    style={{backgroundColor:stage ? "#871f30" : "#313536"}}
                                                    className =" px-4 bg-[#6f6b6c] min-w-[20%] rounded -t-md flex-row justify-center items-center">
                                                        <Text    
                                                              style ={{
                                                                fontSize: stage ? width/50 : width/55,
                                                                color: stage ? "white":"gray"
                                                              }}
                                                              className="text-xl font-black  text-gray-300"> 
                                                                Stage
                                                        </Text>
                                                  </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                                                  onPress={()=> {
                                                      // setSelectedContestant(null)
                                                      stage && setStage(!stage)
                                                    }
                                                  }
                                                  className ="w- [100%] h- [60%] p- 2 b g-[#7a2038] rounded- xl  g-white  flex-row justify-center items-center">
                                                  <View
                                                    style={{backgroundColor:stage ? "#313536" : "#871f30"}}
                                                    className =" px-4 bg-[#d7b6be] rounded  flex-row justify-center items-center">
                                                        <Text    
                                                              style ={{
                                                                 fontSize: !stage ? width/50 : width/55,
                                                                  color: !stage ? "white":"gray"
                                                              }}
                                                              className="text-xl font-black  text-white"> 
                                                                Performance
                                                        </Text>
                                                  </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                                                onPress={() =>
                                                  {
                                                  !isFavourite ? setParticipationType("addFavourite") : setParticipationType("removeFavourite")
                                                  }}
                                            
                                                className = " p-2 rounded-full ml-auto  flex-col justify-center items-center ">
                                                        {isFavourite ?
                                                        (
                                                          <MaterialCommunityIcons name="heart" size={20} color = "#EC4899"  />
                                                        ) : 
                                                        (
                                                          <MaterialCommunityIcons name="heart-outline" size={20} color = "#EC4899"  />
                                                        )}
                                                      
                                                  
                        </TouchableOpacity>

                        <TouchableOpacity
                                                  onPress={() =>
                                                            {
                                                                  setParticipationType("help")
                                                              }}
                                                                            
                                                                                  className = " p-2  rounded-full  flex-col justify-center items-center ">
                                                                                    <View
                                                                                    className = "p -1  rounde d-full ">
                                                                                        <MaterialCommunityIcons name="help" size={20} color = "white"  />
                                                                                        
                                                                                    </View>
                        </TouchableOpacity> 

                        <TouchableOpacity
                                    onPress={handleRefresh}
                                    // onPressIn={() =>{setSelectedContestant(null)}}
                                    className="p-2  rounded-tr-full flex-row g-green-600 -rota te-45   justify-center items-center">
                                        {isRefreshing ?(
                                              <ActivityIndicator size={20} color="red" />
                                        ):(
                                          <AntDesign name="reload" size={20} color="white" /> 
                                        )}
                        </TouchableOpacity>

                        <TouchableOpacity
                                        onPress={() => router.back()}
                                        className="  flex-row  p-2  justify-center items-center">
                                                   <AntDesign name="close" size={20} color="white" /> 
                        </TouchableOpacity>
                        

                </View>

                <View
                   
                    className ="w-[100%] h- [100%] py-2  rounded-lg flex-col  justify-center items-center">
                           

                           <View
                           style={{ backgroundColor: 'rgba(0,0, 0 , 0.1)' }}
                           className = "w-[100%] mt- auto p- 1 border- b- 2 bord er-blue-300 rounded-lg flex-col b g-[#0d123c] shad ow-white justify-start items-center  gap- 1">
                                    
                                      <View
                                      className = "w-[100%] pb -2  flex-row  rounded-xl text-center   g-[#065e7c] shadow-black justify-center items-center gap-1">
                                              <Text 
                                                style ={{fontSize:9}}
                                                className="text-xl  font-black   text-yellow-500"> 
                                                  {talentRoom.name} -
                                              </Text> 
                                              <Text 
                                                style ={{fontSize:10}}
                                                className="text-xl  font-black   text-white"> 
                                                  Stage
                                              </Text> 
                                              <Text 
                                                style ={{fontSize:9}}
                                                className="text-xl  font-black   text-yellow-500"> 
                                                  - {talentRoom.region} 
                                              </Text> 
                                      </View>
                                      <View
                                      className = "w-[100%] pb-2  flex-row  rounded-xl text-center   g-[#065e7c] shadow-black justify-center items-center gap-1">
                                              <Text 
                                                style ={{fontSize:9}}
                                                className="text-xl  font-black   text-orange-500"> 
                                                  {edition.title} 
                                              </Text> 
                          
                                      </View>
                                      {/* <View
                                      className = "w-[100%]  flex-row  rounded-xl text-center   g-[#065e7c] shadow-black justify-center items-end gap-1">
                                              <Text 
                                                style ={{fontSize:8}}
                                                className="text-xl  font-black   text-white"> 
                                                  vote for your favorites, and enjoy the show!
                                              </Text> 
                                              
                                      </View> */}


                                    
                           </View>

                          <View
                          className = "flex-col absolute top-2 left-[20]    justify-center items-center gap- 2">
                                <View className=" items-center justify-center">
                                    
                                    <Text 
                                    style={{ fontSize : width/17}}
                                    className="text-white  font-extrabold tracking-widest">
                                        {stageIcons[talentRoom.name]}
                                    </Text>
                                    <Text 
                                    style={{ fontSize : width/49}}
                                    className="text-white t font-extrabold tracking-widest">
                                        {talentRoom.name}
                                    </Text>
                                  </View>
                          </View>
                          <View
                          className = "flex-col absolute  top-4 right-[20]    justify-center items-center gap-2">
                               <View className=" rounded-full items-center justify-center">
                                  <Text 
                                  style={{ fontSize : width/17}}
                                  className="text-white t font-extrabold tracking-widest">
                                      {continentIcons[talentRoom.region]}
                                  </Text>
                                  <Text 
                                  style={{ fontSize : width/49}}
                                  className="text-white t font-extrabold tracking-widest">
                                      {talentRoom.region}
                                  </Text>
                                </View>                
                          </View>
                </View>
            </MotiView>

            )}


             {/* {!isPlaying  && !displayComment && !replayRecording && stage && !selectedContestant&& (
                <View
                  style = {{
                    width : width * 0.57 ,
                    top : width * 1.31 - 18
                  }}
                  className = "absolute rounded-lg px- 1 b g-white  flex-row  justify-evenly p- 1   items-center" >
                  <View>
                  <TouchableOpacity
                            onPress={() => {
                              setSelection("stage") 
                            }}
                            style ={{
                              backgroundColor :selection === "stage" ? "white" : "lightblue"
                            }}
                            className = "flex-row justify-center px-4 rounded-lg items-center">
                      <Text  
                          style ={{fontSize:9,
                           color : selection === "stage" ? "black" : "black",
                           
                        
                          }}
                          className="text-xl font-bold mt -2 text-[#58a1d8]"> 
                             STAGE 
                      </Text>    
                   </TouchableOpacity> 
                  </View>  
                  
                  <View>
                  <TouchableOpacity
                            onPress={() => {
                              setSelection("queue") 
                            }}
                            style ={{
                              backgroundColor :selection === "queue" ? "white" : "lightblue"
                            }}
                            className = "px-4 rounded-lg flex-row justify-center items-center">
                      <Text  
                          style ={{fontSize:9,
                           color : selection === "queue" ? "black" : "black",
                          }}
                          className="text-xl font-bold mt- 2 text-[#58a1d8]"> 
                             QUEUE
                      </Text>    
                   </TouchableOpacity> 
                  </View>

                  <View>
                  <TouchableOpacity
                            onPress={() => {
                              setSelection("elimination") 
                            }}
                            style ={{
                              backgroundColor :selection === "elimination" ? "white" : "lightblue"
                            }}
                            className = "px-4 rounded-lg flex-row justify-center items-center">
                      <Text  
                          style ={{fontSize:9,
                           color : selection === "elimination" ? "black" : "black",
                          }}
                          className="text-xl font-bold mt- 2 text-[#58a1d8]"> 
                             ELIMIN
                      </Text>    
                   </TouchableOpacity> 
                  </View>
              
                </View>
            )}  */}


           
              { !isPlaying && !newChallenge && selectedContestant &&
               selection === "stage" && stage &&
              (
              <CentralContestantPlayer
               data={selectedContestant.performances} setSelectedPerformance={setSelectedPerformance} selectedContestant = {selectedContestant} h = { width * (0.98) }  w = { width * 0.57 }
                participantTrackerId = {participantTrackerId} setParticipantTrackerId={setParticipantTrackerId} talentRoom={talentRoom}
                isScrolling = {isScrolling} setIsScrolling = {setIsScrolling} setIsPlaying = {setIsPlaying} isPlaying ={isPlaying} player ={player}
                selectedPostIndex = {selectedPostIndex}  top={insets.top + width * 0.01} setSelectedContestant={setSelectedContestant} user={user}/>
             )}

             {!isPlaying &&  !newChallenge && !selectedContestant && 
               selection === "queue" && stage &&
              (
              <CentralQueuePlayer data={talentRoom.queue} selectedContestant = {selectedContestant} h = { width * (0.98) }  w = { width * 0.57 }
                participantTrackerId = {participantTrackerId} setParticipantTrackerId={setParticipantTrackerId} talentRoom={talentRoom}
                isScrolling = {isScrolling} setIsScrolling = {setIsScrolling} setParticipationType ={setParticipationType}
                selectedPostIndex = {selectedPostIndex}  top={insets.top + width * 0.01} setSelectedContestant={setSelectedContestant} user={user}/>
             )}

             {!isPlaying &&  !newChallenge && !selectedContestant && 
               selection === "elimination" && stage &&
              (
              <CentralElimineePlayer data={talentRoom.eliminations} selectedContestant= {selectedContestant} h = { width * (1.05) }  w = { width * 0.57 }
                participantTrackerId = {participantTrackerId} setParticipantTrackerId={setParticipantTrackerId} talentRoom={talentRoom}
                isScrolling = {isScrolling} setIsScrolling = {setIsScrolling} setParticipationType ={setParticipationType} 
                selectedPostIndex = {selectedPostIndex}  top={insets.top + width * 0.01} setSelectedContestant={setSelectedContestant} user={user}/>
             )}
 
 
            <DisplayContestant show = {false}  selectedContestant={selectedContestant} 
             width ={width } height={height} top = { insets.top} setIsExpired={setIsExpired} /> 
           
            <TopContestantBar show = {!isPlaying && show && !newChallenge } width ={width} height={ width * 0.12  } top={0 }
             selectedIcon={selectedIcon} talentRoom={talentRoom} participantTrackerId={participantTrackerId}
             left ={0} right ={null} regionIcon ={regionIcon}  contestants = { edition.round >= 4 ? data.slice(0,7) :data.slice(0,7)} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            
            {/* <SideBarLeft show = {!isPlaying && show && !newChallenge } width ={width * 0.19} height= {width * 1.13 } top= { width * 0.18  + 20 }participantTrackerId={participantTrackerId}
             left ={0} right ={null} regionIcon ={regionIcon} selectedIcon={selectedIcon}  
              contestants = {
                edition.round >= 4 ? data.slice(4,16).filter((element, index) => { return index % 2 === 1}):
                                     data.slice(5,17).filter((element, index) => { return index % 2 === 1})
              } 
              talentRoom={talentRoom} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/> */}
           
            <SideBarRight show = {!isPlaying && show && !newChallenge }  width ={width * 0.12} height={ width * 1.53} top={width * 0.14 +5 } participantTrackerId={participantTrackerId}
             right ={0} left ={null} regionIcon ={regionIcon} selectedIcon={selectedIcon} 
             contestants = {
               data.slice(7,18) } 
             talentRoom={talentRoom} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            
            <BottomContestantBar show = {!isPlaying && show && !newChallenge && data.length > 19 } width ={width} height = { width * 0.12  } top ={width * 1.573} 
             selectedIcon={selectedIcon} talentRoom={talentRoom} participantTrackerId={participantTrackerId}
             left ={0} right ={width * 0.14} regionIcon ={regionIcon}  contestants = {data.slice(18,22)} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>

            {edition.round >= 4 && !selectedContestant && (
              <View
              style ={{
                height : width * 0.18 ,
                top : width * 1.31  + 27 
              }}
              className="flex-row w-[100%] absolute justify-center items-center ">
                    <SwingingTitle text={edition.title} fontSize={15} color="yellow" />
              </View>
            )}

            {/* <BottomBar show = {!isPlaying  && !newChallenge && !replayRecording } width ={width} height={height * 0.07 } bottom={insets.bottom} left ={null} right ={null} user = {user}
              isRefreshing={isRefreshing} stage={stage} setSelectedContestant={setSelectedContestant} setStage={(setStage)}
              userContestantStatus = {userContestantStatus} handleRefresh={handleRefresh}    region={region} regionIcon ={regionIcon} selectedTalent={selectedTalent}  selectedIcon ={selectedIcon}/>          
            */}


           {/* {selectedContestant && !isPlaying && (
              <TouchableOpacity
               onPress={() => {
                setIsScrolling(true)
                setSelectedContestant(null)}}
                style = {{right: width * 0.23 , top :width * 0.25   }}
               className = "absolute top-36 ">
                       <AntDesign name="close" size={30} color="white" /> 
              </TouchableOpacity>
            )} */}
   


            {/* {isModalVisible && (     
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     handleTalentParticipation  = {handleTalentParticipation} handleTalentResignition = {handleTalentResignition} 
                     addFavourite={addFavourite} removeFromFavourite={removeFromFavourite}
                     handleQueue ={handleQueue} setParticipationType ={setParticipationType} 
                       />
                 )} */}



           </>
         )}
          

      </View>
      <CommentSheet modalRef={modalRef} selectedContestant={ selectedContestant} user={user}/>
      {isModalVisible && (     
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     handleTalentParticipation  = {handleTalentParticipation} handleTalentResignition = {handleTalentResignition} 
                     addFavourite={addFavourite} removeFromFavourite={removeFromFavourite}
                     handleQueue ={handleQueue} setParticipationType ={setParticipationType} 
                       />
                 )}

    </View>




    
  )
}