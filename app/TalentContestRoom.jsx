import { View, Text, Platform, TouchableOpacity, Image, useWindowDimensions, Dimensions, ActivityIndicator, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { addContestantToQue,  backInQueue,  createTalentRoom,  deleteContestantElimination,  deleteContestantQueue,  deleteContestantStage, deletePerformanceQueue, deletePerformanceStage, eliminationTalentRoom, getUserTalent, getUserTalentPerformances,  toggleFavouriteStage } from '../apiCalls';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { icons } from '../constants';
import SideBarLeft from '../components/talent/SideBarLeft';
import SideBarRight from '../components/talent/SideBarRight';
import { useGlobalContext } from '../context/GlobalProvider';
import ProgresssBarVideo from '../components/custom/ProgresssBarVideo';
import VolumeControl from '../components/custom/VolumeControl';
import DisplayContestant from '../components/talent/DisplayContestant';
import ChallengeAction from '../components/modal/ChallengeAction';
import { MotiView } from 'moti';
import ContestantRoom from '../components/talent/ContestantRoom';
import ContestantPostDetails from '../components/talent/ContestantPostDetails';
import { useKeepAwake } from 'expo-keep-awake';
import CentralContestantPlayer from '../components/talent/CentralContestantPlayer';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import CentralQueuePlayer from '../components/talent/CentralQueuePlayer';
import CentralElimineePlayer from '../components/talent/CentralElimineePlayer';
import TalentParticipation from '../components/talent/TalentParticipation';
import CommentSheet from '../components/talent/modal/CommentDrawer';
import {  countries, stageIcons } from '../utilities/TypeData';
import AuthLoadingScreen from '../components/auth/authLoadingScreen';
import { useLoading } from '../context/loadingContext';
import UserModal from '../components/modal/userModal';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ContestantsDisplayer from '../components/talent/contestantsDisplayer';
import StageMenu from '../components/talent/stageMenu';
import SidePostData from '../components/talent/sidePostData';
import StageCoverIntroduction from '../components/talent/stageCoverIntroduction';



export default function TalentContestRoom() {
const {user , setUserTalents ,globalRefresh,setGlobalRefresh , favouriteStages , setFavouriteStages , favouriteList , setFavouriteList,  setUserTalentPerformance} = useGlobalContext()

const {region,
      regionIcon, 
      selectedTalent , 
      selectedIcon ,
      startIntroduction ,
      contestant_id ,
      showGo ,
      location ,
      startPlayer 
      } =  useLocalSearchParams(); 
const [talentRoom , setTalentRoom] = useState(null)
const [stageName, setStageName] = useState(selectedTalent)
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
const [performanceIndex , setPerformanceIndex] = useState (0)
const [performanceToDelete , setPerformanceToDelete] = useState (null)
const [contestantsPerformanceIndex , setContestantsPerformanceIndex] = useState ([])
const [selectedPerformance , setSelectedPerformance] = useState(null)
const [videoCount , setVideoCount] = useState(0)
const [openUserModal,setOpenUserModal] = useState(false)
const { showLoading, hideLoading } = useLoading();
const [showIntroduction , setShowIntroduction] = useState(true)
const [showResult , setShowResult] = useState(false)


const SCREEN_HEIGHT = height - insets.top
const MENU_HEIGHT =  SCREEN_HEIGHT / 6
const STAGE_HEIGHT = SCREEN_HEIGHT -  MENU_HEIGHT 
const CARD_DIMENSION = (STAGE_HEIGHT) / 15

const PANEL_HEIGHT = STAGE_HEIGHT - (4 * CARD_DIMENSION) + 30
const VERTICAL_CARD_COUNT  = (width % CARD_DIMENSION)

const modalRef = useRef(null);
const translateX = useRef(new Animated.Value(0)).current;
const opacity = useRef(new Animated.Value(1)).current;

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

const nextPlayer = useVideoPlayer(null, (player) => {
  player.loop = false;
  player.volume = volume
  player.pause();
  player.timeUpdateEventInterval = 0.1;
});

const playerRef = useRef(player);
const nextPlayerRef = useRef(nextPlayer);
const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

useEffect(() => {
    // if (player && player.current) {
        player.volume = volume;
    // }
}, [volume]);

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
    const statusSubscription = playerRef?.current.addListener(
      'timeUpdate',
      ({isPlaying}) => {
        const finishedThreshold = playerRef.current.duration - 0.2 ;
        if (
          playerRef.current.currentTime >= finishedThreshold &&
          playerRef.current.currentTime > 0 
        ) {
          handleNextPerformance();
        }
      },
    );
    return () => {
      statusSubscription.remove();
    };
  }, [selectedContestant, contestantsPerformanceIndex]);

  //************************** swap player , play next video with animation ************* */

  const scale = useRef(new Animated.Value(1)).current;
  const isTransitioning = useRef(false);

  const animateZoom = (onSwapped) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    // zoom OUT
    Animated.timing(scale, {
      toValue: 1.05,
      duration: 120,
      useNativeDriver: true,
    }).start();
    // 👉 swap EXACTLY in the middle
    setTimeout(() => {
      onSwapped?.();
    }, 100);
    // zoom IN
    setTimeout(() => {
      scale.setValue(0.76);
      Animated.timing(scale, {
        toValue: 1,
        duration: 1080,
        useNativeDriver: true,
      }).start(() => {
        isTransitioning.current = false; // unlock
      });
    }, 130);
  };

  const swapPlayers = () => {
    const temp = playerRef.current;
    playerRef.current = nextPlayerRef.current;
    nextPlayerRef.current = temp;
    nextPlayerRef.current.pause()
  };

  const handleNextPerformance = () => {
    animateZoom(() => {
      if (!selectedContestant?.performances?.length) return;
      const total = selectedContestant.performances.length;
      if (getPerformanceIndex(selectedContestant._id)  < total - 1) {
        swapPlayers();
        setVideoCount(prev => prev + 1)
        setIsPlaying(true);
        playerRef.current.play();
        updatePerformanceIndex(selectedContestant._id , getPerformanceIndex(selectedContestant._id) + 1)
      } else {
          const next =  getNextContestant(selectedContestant.rank)
          if(next) {
            swapPlayers();
            setVideoCount(prev => prev + 1)
            setIsPlaying(true);
            playerRef.current.play();
            updatePerformanceIndex(next._id , 0)
            setSelectedContestant({...next})
          }
          if(!next){
            setIsPlaying(false);
            playerRef.current.pause();
          } 
      }
    });
  
  };

  //**************** handle player touch */

  const touchStart = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      time: Date.now(),
    };
  };

  const SWIPE_THRESHOLD = 70;   // slightly lower for Android stability
  const TAP_MAX_MOVE = 12;

  const handleTouchEnd = (e) => {
    const dx = e.nativeEvent.pageX - touchStart.current.x;
    const dy = e.nativeEvent.pageY - touchStart.current.y;
    const dt = Date.now() - touchStart.current.time;
  
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
  
    const isSwipe = absX > SWIPE_THRESHOLD && absX > absY;
  
    if (Platform.OS === "ios" && isSwipe) {
      if (dx < 0) handleNextPerformance();
      else 
      { 
        getPerformanceIndex(selectedContestant._id) !== 0 &&  updatePerformanceIndex (selectedContestant._id,getPerformanceIndex(selectedContestant._id) - 1)}
      return;
    }
    const isTap =
      dt < 250 &&
      absX < TAP_MAX_MOVE &&
      absY < TAP_MAX_MOVE;
  
    if (isTap) {
      togglePlayPause();
    }
   };

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

useEffect(() => {
    showLoading("Stage is Loading...")
    setSelectedContestant(null)
    createTalentRoom({region:region , name:stageName}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation, setEdition, setIsLoading)
    setShowIntroduction(true)
}, [stageName])

useEffect(() => {
 if(isExpired) {
  createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation,setEdition, setIsLoading)
  // setSelectedContestant(null)
  setTimeout(() => {
       setIsExpired(false)
  }, 500);    
      }
}, [isExpired])


useEffect(() => { 
   if(!talentRoom ) return ;
   if (talentRoom) {
     showLoading("Stage is Loading...")
    //  setIsPlaying(false)
     setNumberOfContestants(talentRoom.contestants.length)
     if(talentRoom.contestants.length > 0) {     
        const userP = talentRoom.contestants.find((contestant)=> contestant.user_id === user._id) 
        userP ? setUserContestantStatus("P") : setUserContestantStatus("NP")
        setUserParticipation(userP)
      } else {
       setUserContestantStatus("NP")
       setUserParticipation(null)
      }
      if(!usedLocalParams) {
        if(talentRoom.contestants.length > 0 && contestant_id) {     
          const contestant = talentRoom.contestants.find((contestant)=> contestant.user_id === contestant_id) 
                             || talentRoom.contestants[0] || null
           setSelectedContestant( contestant )
           setStage(showGo =="true"? true : false)
           setStart(true)
           setTimeout(() => {
             startPlayer === "true" && contestant  &&  playerRef.current?.play();
             setIsPlaying(startPlayer === "true"? true : false)
             setShowIntroduction(startPlayer === "true"? false : true)
           }, 1000);
         } else {
          setSelectedContestant(null)
         }
         setUsedLocalParams(true)
      } 
      let d = [] ; 
      talentRoom.contestants.forEach((p , index) => {
          d.push({...p,rank:index + 1})
      })
      setData([...d])    
      if(selectedContestant){
          if(talentRoom.contestants.find(c => c.user_id === selectedContestant.user_id)){
            setSelectedContestant(d.find(p => p.user_id ===  selectedContestant.user_id))
          }else {
          if(d.length > 0 ) setSelectedContestant(d[0]) 
          else setSelectedContestant(null)
          }
      }
      else {
          if(usedLocalParams){
             const contestant = talentRoom.contestants.find((contestant)=> contestant.user_id.toString() === user._id) || d[0];
            //  if(d.length > 0 ) setSelectedContestant(d[0]) 
            //  else setSelectedContestant(null)
            setSelectedContestant(contestant)
          }
      }
     setIsFavourite(favouriteStages.some(f => f._id.toString() === talentRoom._id.toString()) )
     const contestantsIndex = []
     talentRoom.contestants.forEach((c,index) =>{
         const obj = {
              _id: c._id ,
              performanceIndex : 0,
              numberPerformances : c.performances.length
         }
         contestantsIndex.push(obj)
     })
     setContestantsPerformanceIndex(contestantsIndex)
     hideLoading()
   }
}, [talentRoom ])


useEffect(() => {
    if(!talentRoom) return ;
    const isFavourite = favouriteStages.some(f => f._id.toString() === talentRoom._id.toString())  
    setIsFavourite(isFavourite)
}, [favouriteStages])


//******************************handle actions , participation , resign .....  */
const handleTalentParticipation  = () => {
    setIsModalVisible(false)
    // setParticipationType("")
    // setParticipationType(null)
    setNewChallenge(true)
}

const handleDeleteContestantStage = async() => {
      setIsModalVisible(false)
      setParticipationType("")
      let post_id = userParticipation._id ;
      await deleteContestantStage(
                           talentRoom._id,
                           {
                            user_id:user._id, 
                            post_id:post_id
                           },  
                           setTalentRoom ,
                           setUserParticipation, 
                           setIsLoading
                          )    
      setGlobalRefresh(true)
}
   
const handleDeleteContestantQueue = async() => {
  setIsModalVisible(false)
  setParticipationType("")
  let post_id = talentRoom.queue.find(c => c.user_id == user._id)._id || null; 
  if(!post_id) return 
  console.log("mmm heerrre")
  await deleteContestantQueue(
                       talentRoom._id,
                       {
                        user_id:user._id, 
                        post_id:post_id
                       },
                       setTalentRoom ,
                       setUserParticipation, 
                       setIsLoading
                      )
 setGlobalRefresh(true)
}

const handleDeleteContestantElimination = async() => {
  setIsModalVisible(false)
  setParticipationType("")
  let post_id = talentRoom.eliminations.find(c => c.user_id == user._id)._id || null; 
  if(!post_id) return 
  await deleteContestantElimination(
                              talentRoom._id,
                              {
                                user_id:user._id, 
                                post_id:post_id
                              },
                              setTalentRoom , 
                              setUserParticipation,
                              setIsLoading
                            )
  setGlobalRefresh(true)
}

const handleQueue = async() => {
 setIsModalVisible(false)
 setParticipationType("")
 await addContestantToQue(talentRoom._id,
                    {
                    user_id:user._id,
                    profile_img:user.profile_img,
                    name:user.name
                    },
                    setTalentRoom , setIsLoading
                    )
setGlobalRefresh(true)
}

const handleDeletePerformanceStage = async() => {
    setIsModalVisible(false)
    setParticipationType("")
    let post_id = userParticipation?._id || null;;
    if(!post_id) return ; 
    await deletePerformanceStage(
                            talentRoom._id,
                            {
                            user_id:user._id, 
                            post_id:post_id ,
                            performanceToDelete:performanceToDelete
                            },
                            setTalentRoom,
                            setUserParticipation,
                            setIsLoading
                        )
    setPerformanceIndex(performanceIndex == 0 ? 0 : performanceIndex - 1)
    setGlobalRefresh(true)
}

const handleDeletePerformanceQueue = async() => {
  setIsModalVisible(false)
  setParticipationType("")
  let post_id = talentRoom.queue.find(c => c.user_id == user._id)._id || null;
  if(!post_id) return ; 
  await deletePerformanceQueue(
                          talentRoom._id,
                          {
                          user_id:user._id, 
                          post_id:post_id ,
                          performanceToDelete:performanceToDelete
                          },
                          setTalentRoom,
                          setUserParticipation,
                          setIsLoading
                      )
  setGlobalRefresh(true)
}

const handleBackInQueue = async() => {
  setIsModalVisible(false)
  setParticipationType("")
  let post_id = talentRoom.eliminations?.find(c => c.user_id == user._id)._id || null;
  if(!post_id) return ; 
  await backInQueue(
                          talentRoom._id,
                          {
                          user_id:user._id, 
                          post_id:post_id ,
                          },
                          setTalentRoom,
                          setUserParticipation,
                          setIsLoading
                      )
  setGlobalRefresh(true)
}

const toggleFavourite  = async() => {
  setIsModalVisible(false)
  await toggleFavouriteStage(user._id,{talentRoom_id:talentRoom._id},setFavouriteStages,setIsExpired)
  setGlobalRefresh(true)
}

// const removeFromFavourite = async()=> {
//   setIsModalVisible(false)
//   await removeTalentRoomFromFavourite(user._id,{talentRoom_id:talentRoom._id},setFavouriteList,setIsExpired)
//   setGlobalRefresh(true)
// }

useEffect(() => {
  if(participationType == "") return ;
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
    case "DeletePerformanceStage":
        setAction("DPS")
        setText("Are you sure you want to delete this performance from the Stage")
      break;
    case "DeletePerformanceQueue":
        setAction("DPQ")
        setText("Are you sure you want to delete this performance from the Queue")
      break;
    case "new":
      setAction("NP")
      setText("Are you sure you want to join the talent Contest")
      break;
    case "update":
        setAction("NP")
        setText("Are you sure you want to add a performance to the Stage")
        break;
    case "qupdate":
        setAction("NP")
        setText("Are you sure you want to add a performance to the Queue")
        break;
    case "backInQueue":
        setAction("BIQ")
        setText("Are you sure you want to get back in Queue")
        break;
    case "queue":
        setAction("NP")
        setText("Are you sure you want to reserve a pot in a que")
        break;
    case "DeleteContestantQueue":
        setAction("DCQ")
        setText("Are you sure you want to remove your reservation from the Queue")
        break;
    case "DeleteContestantQueue1":
        setAction("DCQ")
        setText("Are you sure you want this Performance.You will loose your spot in the queue")
        break;
    case "DeleteContestantStage":
      setAction("DCS")
      setText("Are you sure you want to Resign from Talent Contestant")
      break;
    case "DeleteContestantStage1":
        setAction("DCS")
        setText("if you delete this performance , you will automatically resign from Talent Contestant")
        break;
    case "DeleteContestantElimination":
      setAction("DCE")
      setText("Are you sure you want to delete you Elimination and delete all your performances")
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
    case "CNTJ":
          setAction("OK")
          setText("can't join the stage , only users from Stage region who can join the stage ")
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

const getPerformanceIndex = (_id)=> {
      return contestantsPerformanceIndex.find (c => c._id == _id).performanceIndex
}

const getPerformanceNumber = (_id)=> {
  return contestantsPerformanceIndex.find(c => c._id === _id).numberPerformances
}

const updatePerformanceIndex = (contestantId, newIndex) => {
  setContestantsPerformanceIndex((prevState) =>
    prevState.map((contestant) =>
      contestant._id === contestantId
        ? { ...contestant, performanceIndex: newIndex }
        : contestant
    )
  );
};

const getNextContestant = (rank) =>{
   const index = (rank) % data.length
   const next  =  data[index]
   return next ;
}

useEffect(() => {
  if (!selectedContestant?.performances?.length || !data) return;
  const performances = selectedContestant.performances;
  const index = getPerformanceIndex(selectedContestant._id)
  const current = performances[index];
  let  next = null;
  if(index === getPerformanceNumber(selectedContestant._id) - 1){
                    const nextContestant = getNextContestant(selectedContestant.rank)
                    next = nextContestant?.performances[0];
  } else{
                    next = performances[index + 1];
  }
  const loadVideos = async () => {
    if (current?.video?.cdnUrl ) {
      await playerRef.current.replaceAsync(current.video.cdnUrl)
    }
    if (next?.video?.cdnUrl) {
        new Promise((resolve) => setTimeout(resolve, 4000));
        await nextPlayerRef.current.replaceAsync(next.video.cdnUrl);
    }
  };
  loadVideos(); 
}, [selectedContestant, contestantsPerformanceIndex]);

useEffect(() => {
  if(!stage) return ;
  !selectedContestant && talentRoom && setSelectedContestant(talentRoom.contestants[0])
}, [stage])

const handleRefresh = ()=> {
  setIsRefreshing(true)
  showLoading("refreshing , please wait ...")
  createTalentRoom({region:region , name:stageName}, setTalentRoom , user._id , setUserContestantStatus , setUserParticipation , setEdition, setIsLoading)
  setTimeout(() => {
       setIsRefreshing(false)
  }, 400);  
}

if (isLoading ) {
  return  <AuthLoadingScreen />
}

if(showIntroduction) {
  return    <StageCoverIntroduction stageData={talentRoom} onFinish={() => {setShowIntroduction(false)}} visible={showIntroduction} />
}

return (
  <View
  style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top  }}
  className=" flex-1  min-w-[100vw] min-h-full flex-row justify-center items-center   bg-[#000000]" >
      <View
       className=" flex-1  w-[100%] h-[100%] flex-row justify-center items-center   bg-black [#3d3c3a] [#041539]   [#786d6d]">
           {!isLoading && !isExpired && talentRoom && data && (
                 <>
                            {stage ? (
                                <>
                                    {selectedContestant && (
                                          <View
                                          className={ "w-[100vw] h-[100%] b g-white flex-col justify-center items-center "}
                                              > 
                                              {isPlaying ? (
                                              <Animated.View
                                                 style={{
                                                  flex: 1,
                                                  transform: [ {scale}],
                                                 }}
                                                 onStartShouldSetResponder={() => true}
                                                 onResponderGrant={handleTouchStart}
                                                 onResponderRelease={handleTouchEnd}
                                                 className = {!isPlaying ? "opacity-40 w-[100%] " : "w-[100vw]  opacity-100"}>
                                                            <VideoView 
                                                                     style={{ width:'100%' ,height:'100%'}}
                                                                     player={playerRef.current}
                                                                     contentFit='cover'
                                                                     nativeControls ={false}
                                                                     pointerEvents="none" 
                                                                      />
                                                           {/* <VideoView
                                                             style={{ width: 0, height: 0 }}
                                                             player={nextPlayerRef.current}
                                                           /> */}
                          
                                              </Animated.View>                                             
                                              ):(
                                                <View
                                                className={ "flex-1  flex-col justify-center items-center "}
                                                    /> 
                                              )
                                              }
                                             
                                             <LinearGradient
                                                        pointerEvents="none"
                                                        colors={[ "transparent" , "rgba(0,0,0,0.6)"]}
                                                              style={{
                                                              position: "absolute",
                                                              bottom: 0,
                                                              alignSelf: "center",
                                                              width: width,
                                                              height:  height/5,
                                                              borderRadius: 0,
                                                            }}
                                                    />   

                                          

                                              {!newChallenge && selectedContestant &&
                                                // selection === "stage" && stage &&
                                                (
                                                <CentralContestantPlayer
                                                  key={selectedContestant?._id} CAROUSSEL_HEIGHT = { 4 * CARD_DIMENSION}
                                                  data={selectedContestant.performances} 
                                                  setSelectedPerformance={setSelectedPerformance} selectedContestant = {selectedContestant}
                                                  participantTrackerId = {participantTrackerId} setParticipantTrackerId={setParticipantTrackerId} talentRoom={talentRoom}
                                                  isScrolling = {isScrolling} setIsScrolling = {setIsScrolling} setIsPlaying = {setIsPlaying} isPlaying ={isPlaying} player ={playerRef.current}
                                                  selectedPostIndex = {selectedPostIndex}
                                                  width ={width} 
                                                  height ={height - insets.top}
                                                  // top={0} 
                                                  scrollToIndex = {getPerformanceIndex(selectedContestant._id)} 
                                                  updatePerformanceIndex={updatePerformanceIndex}
                                                  setSelectedContestant={setSelectedContestant} user={user}/>
                                              )}
                                             
                                              <ContestantPostDetails user={user} show = { selectedContestant} displayComment ={displayComment}
                                                  setDisplayComment = {setDisplayComment} 
                                                  selectedContestant={selectedContestant}
                                                  setIsExpired={setIsExpired} 
                                                  talentRoom={talentRoom}
                                                  // confirmAction = {confirmAction} setAction ={setAction} setText ={setText}
                                                  setParticipationType ={setParticipationType}
                                                  isExpired={isExpired}
                                                  rank={selectedContestant.rank}
                                                  handleRefresh ={handleRefresh}
                                                  width ={width} height={4 * CARD_DIMENSION}
                                                  bottom = { MENU_HEIGHT + 10}    
                                                  setOpenUserModal={setOpenUserModal} 
                                                  isPlaying={isPlaying}
                                                  />       
                                              
                                              <SidePostData user={user} show = {selectedContestant} 
                                                  displayComment ={displayComment}
                                                  setDisplayComment = {setDisplayComment} 
                                                  selectedContestant={selectedContestant} 
                                                  setIsExpired={setIsExpired} 
                                                  talentRoom={talentRoom}
                                                  // confirmAction = {confirmAction} setAction ={setAction} setText ={setText}
                                                  setParticipationType ={setParticipationType}
                                                  rank={selectedContestant.rank}
                                                  handleRefresh ={handleRefresh}
                                                  onPress ={openComments}
                                                  // width ={width}
                                                  height={4 * CARD_DIMENSION}
                                                  bottom = { MENU_HEIGHT +  height/10} 
                                                  setOpenUserModal={setOpenUserModal} 
                                                  isPlaying={isPlaying}
                                                  />       
                                                {isPlaying && (<ProgresssBarVideo  player={playerRef.current} visible={isPlaying} bottom={MENU_HEIGHT/4} />)}
                                                {isPlaying &&  (
                                              <VolumeControl volume = {volume} setVolume={setVolume} bottom = {95} left ={12} />
                                              )}
                                              <ContestantsDisplayer 
                                                                  //  key={selectedContestant._id}
                                                                   show={!isPlaying && !isRefreshing} contestants={data} 
                                                                   setSelectedContestant={setSelectedContestant} 
                                                                   selectedContestant={selectedContestant} />

                                              {/* <StageCoverIntroduction stageData={talentRoom} onFinish={() => {setShowIntroduction(false)}} visible={showIntroduction} /> */}
                                              
                                          </View>
                                      
                                    )}
                                      
                                </>
                                ) : (
                                !showResult ? (  
                                <View
                                className={ "w-[100vw] h-[100%]  flex-col justify-center items-center "}
                                    > 
                                  {!newChallenge ? (
                                    <>
                                    {isPlaying && (
                                      <View
                                      className = {!isPlaying ? "opacity-20 w-[100%] " : "w-[100vw]  opacity-100"}>
                                                  <VideoView 
                                                          style={{ width:'100%' ,height:'100%'}}
                                                          player={playerRef.current}
                                                          contentFit='cover'
                                                          nativeControls ={false}
                                                          pointerEvents='box-only'
                                                  />
                                                  <TouchableOpacity 
                                                    hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                                                  
                                                    onPress={ () => { (!isPlaying ? ( playerRef.current.play(), setIsPlaying(true) ) : ( playerRef.current.pause() , setIsPlaying(false) ) )} }
                                                    className={
                                                            "w-full h-full  flex-col absolute top-  justify-center items-center"
                                                    }>
                                                </TouchableOpacity>
                                      </View>
                                    )}
                                    
                                      <ContestantRoom regionIcon = {regionIcon} selectedIcon = {selectedIcon} user={user}  show ={!isRefreshing} 
                                      setPerformanceToDelete = {setPerformanceToDelete} updatePerformanceIndex={updatePerformanceIndex}
                                      setIsPlaying={setIsPlaying} isPlaying={isPlaying} player={playerRef.current} top={0}
                                      h ={height - insets.top}
                                      w = {width} bottom = {MENU_HEIGHT + 5} setStage ={setStage} setParticipationType={setParticipationType}
                                      setSelectedContestant={setSelectedContestant} userParticipation ={userParticipation}
                                      userContestantStatus ={userContestantStatus} setStart={setStart}
                                      numberOfContestants={numberOfContestants}  talentRoom={talentRoom} edition={edition}   
                                      />
                                      
                                  </>
                                  ):(
                                    <TalentParticipation talentRoom= {talentRoom} setReplayRecording={setReplayRecording} setNewChallenge={setNewChallenge} 
                                    participation = {participationType} userParticipation ={userParticipation} bottom = {MENU_HEIGHT + 5} 
                                    user={user} setSelectedContestant={setSelectedContestant} setStage={setStage} setTalentRoom={setTalentRoom} setIsExpired={setIsExpired}
                                    />
                                    )}
                                </View>
                                ):(
                                  <View
                                  className = {!isPlaying ? "opacity-20 w-[100%] " : "w-[100vw]  opacity-100"}>
                                    
                                  </View>
                                )
                              )}
                          
              {!isPlaying  && !replayRecording &&  (
              <StageMenu  height={MENU_HEIGHT} width ={width} setParticipationType={setParticipationType} isFavourite={isFavourite}
                          stage={stage} setStage = {setStage} handleRefresh ={handleRefresh} talentRoom ={talentRoom}
                          globalRefresh ={globalRefresh} edition ={edition}  isRefreshing ={isRefreshing} setNewChallenge={setNewChallenge}
                          stageName={stageName} setStageName={setStageName} setTalentRoom={setTalentRoom}
                          setShowIntroduction ={setShowIntroduction} showResult ={showResult} setShowResult ={setShowResult}
                          />    
              )}

             {!isPlaying &&  !newChallenge && !selectedContestant && 
               selection === "queue" && stage &&
              (
              <CentralQueuePlayer data={talentRoom.queue} selectedContestant = {selectedContestant} h = { width * (0.98) }  w = { width * 0.57 }
                participantTrackerId = {participantTrackerId} setParticipantTrackerId={setParticipantTrackerId} talentRoom={talentRoom}
                isScrolling = {isScrolling} setIsScrolling = {setIsScrolling} setParticipationType ={setParticipationType}
                selectedPostIndex = {selectedPostIndex}  top={insets.top} setSelectedContestant={setSelectedContestant} user={user}/>
             )}

             {!isPlaying &&  !newChallenge && !selectedContestant && 
               selection === "elimination" && stage &&
              (
              <CentralElimineePlayer data={talentRoom.eliminations} selectedContestant= {selectedContestant} h = { width * (1.05) }  w = { width * 0.57 }
                participantTrackerId = {participantTrackerId} setParticipantTrackerId={setParticipantTrackerId} talentRoom={talentRoom}
                isScrolling = {isScrolling} setIsScrolling = {setIsScrolling} setParticipationType ={setParticipationType} 
                selectedPostIndex = {selectedPostIndex}  top={insets.top + width * 0.01} setSelectedContestant={setSelectedContestant} user={user}/>
             )}
 
 
            {/* <DisplayContestant show = {false}  selectedContestant={selectedContestant} 
             width ={width } height={height} top = { insets.top} setIsExpired={setIsExpired} />  */}
           
            {/* <TopContestantBar show = {!isPlaying && show && !newChallenge && stage  } width ={ CARD_DIMENSION * 3 } height={ CARD_DIMENSION } top={0}
             selectedIcon={selectedIcon} talentRoom={talentRoom} participantTrackerId={participantTrackerId}
             left ={0} right ={null} regionIcon ={regionIcon}  contestants = { edition.round >= 4 ? data.slice(0,4) :data.slice(0,4)} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
             */}
            {/* <SideBarLeft show = {!isPlaying && show && !newChallenge && stage} width ={CARD_DIMENSION} height = {PANEL_HEIGHT } top = {30} 
              bottom = { MENU_HEIGHT + CARD_DIMENSION + 15}       participantTrackerId={participantTrackerId}
              left ={2} right ={null} regionIcon ={regionIcon} selectedIcon={selectedIcon}  
              contestants = {data.slice(0,20).filter((d,index) => index % 2 == 0 )  } 
              talentRoom={talentRoom} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/> */}
           
            {/* <SideBarRight show = {!isPlaying && show && !newChallenge && stage }  width ={CARD_DIMENSION} height = {PANEL_HEIGHT } top = {30} participantTrackerId={participantTrackerId}
             right = {2} left ={null} regionIcon ={regionIcon} selectedIcon={selectedIcon} bottom = { MENU_HEIGHT + CARD_DIMENSION + 15} 
             contestants = {
               data.slice(0,20).filter((d,index) => index % 2 ==1 ) } 
             talentRoom={talentRoom} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/> */}
            
            {/* <BottomContestantBar show = {!isPlaying && show && !newChallenge  && stage } width ={width - 2 * CARD_DIMENSION } height = { CARD_DIMENSION } bottom = { MENU_HEIGHT + 10} 
             selectedIcon={selectedIcon} talentRoom={talentRoom} participantTrackerId={participantTrackerId}
               regionIcon ={regionIcon}  contestants = {data.slice(0,4)} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/> */}

            {/* {edition.round >= 4 && !selectedContestant && (
              <View
              style ={{
                height : width * 0.18 ,
                top : width * 1.31  + 27 
              }}
              className="flex-row w-[100%] absolute justify-center items-center ">
                    <SwingingTitle text={edition.title} fontSize={15} color="yellow" />
              </View>
            )} */}

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
      {openUserModal && (
           <UserModal 
           user_id= {selectedContestant && selectedContestant.user_id}
           visible = {openUserModal}
           // setOpenUserModal ={setIsModalVisible}
           onClose={() => setOpenUserModal(false)}
          />
      )}

   
      <CommentSheet modalRef = {modalRef}  selectedContestant = {selectedContestant} user={user}/>
  

      {isModalVisible && (     
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     handleTalentParticipation  = {handleTalentParticipation}
                     handleDeleteContestantStage = {handleDeleteContestantStage} 
                     handleDeleteContestantQueue={handleDeleteContestantQueue}
                     toggleFavourite={toggleFavourite}
                     handleQueue ={handleQueue} setParticipationType ={setParticipationType} 
                     handleDeletePerformanceStage={handleDeletePerformanceStage}
                     handleDeletePerformanceQueue={handleDeletePerformanceQueue}
                     handleDeleteContestantElimination={handleDeleteContestantElimination}
                     handleBackInQueue={handleBackInQueue}

                       />
                 )}

    </View>




    
  )
}