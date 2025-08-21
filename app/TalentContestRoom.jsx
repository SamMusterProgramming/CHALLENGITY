import { View, Text, Platform, TouchableOpacity, Image, useWindowDimensions, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { addContestantToQue, createTalentRoom, deleteContestant, eliminationTalentRoom } from '../apiCalls';
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



export default function TalentContestRoom() {
const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData} = useGlobalContext()
const {region, regionIcon, selectedTalent , selectedIcon ,startIntroduction ,contestant_id , showGo , location} =  useLocalSearchParams(); 
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
const [isExpired , setIsExpired] = useState(false)
const [isRefreshing , setIsRefreshing] = useState(false)
const [usedLocalParams , setUsedLocalParams] = useState(false)
const [numberOfContestants , setNumberOfContestants] = useState(0)
const [participationType , setParticipationType] = useState("")

const [edition,setEdition] = useState(null)
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
           const userP = location == "contest" ? talentRoom.contestants.find((contestant)=> contestant.user_id === contestant_id) 
                                         : talentRoom.queue.find( u => u.user_id === contestant_id)
           userP && setSelectedContestant(userP)
           setShow(showGo =="true"? true : false)
           setStart(true)
           setUsedLocalParams(true)

         } 
      }
   }
  
}, [talentRoom])



//******************************handle actions , participation , resign .....  */
const handleTalentParticipation  = () => {
    setIsModalVisible(false)
    router.replace({ pathname: '/CreateParticipateTalent',params: { 
        selectedIcon: selectedIcon,
        regionIcon: regionIcon,
        talentRoom_id : talentRoom._id,
        participation : participationType,
        videolURL : participationType == "update"? userParticipation.video_url :
        participationType == "qupdate" ? talentRoom.queue.find(u => u.user_id == user._id).video_url:
        participationType == "eupdate" ?talentRoom.eliminations.find(u => u.user_id == user._id).video_url:null,
        thumbURL: participationType == "update"? userParticipation.thumbNail_URL :
        participationType == "qupdate" ? talentRoom.queue.find(u => u.user_id == user._id).thumbNail_URL :
        participationType == "eupdate" ?talentRoom.eliminations.find(u => u.user_id == user._id).thumbNail_URL :null,
      } }) 
}

const handleTalentResignition = () => {
    setIsModalVisible(false)

    let post_id = null ;
    let videoRef = null
    let thumbnailRef = null; 

    if(participationType =="resign") {
     post_id = userParticipation._id  
     }

    if(participationType =="eliminated") {
        const userElimination = talentRoom.eliminations.find(u => u.user_id == user._id) 
        post_id = userElimination._id
        videoRef = ref(storage , userElimination.video_url); 
        thumbnailRef = ref(storage , userElimination.thumbNail_URL); 
        Promise.all( [deleteObject(videoRef),deleteObject(thumbnailRef)])
      .then(() => {
        console.log("both deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });  
    }

    if(participationType =="queued") {
      const userQueuedReservation =  talentRoom.queue.find( u => u.user_id == user._id) 
      post_id = userQueuedReservation._id
      videoRef = ref(storage , userQueuedReservation.video_url); 
      thumbnailRef = ref(storage , userQueuedReservation .thumbNail_URL); 
      Promise.all( [deleteObject(videoRef),deleteObject(thumbnailRef)])
      .then(() => {
        console.log("both deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });  
    }
    // Promise.all( [deleteObject(videoRef),deleteObject(thumbnailRef)])
    // .then(() => {
    //   console.log("both deleted successfully!");
    // })
    // .catch((error) => {
    //   console.error("Error deleting file:", error);
    // });  

    deleteContestant(talentRoom._id,{user_id:user._id, post_id:post_id,type:participationType}, setTalentRoom , setIsLoading)
}

const handleQueue = () => {
 setIsModalVisible(false)
 addContestantToQue(talentRoom._id,{
                   user_id:user._id,
                   profile_img:user.profile_img,
                   name:user.name
                  },
                    setTalentRoom , setIsLoading
                  )
}
const confirmAction  = ()=> {
    setIsModalVisible(true)
    switch (participationType) {
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
      
      default:
        break;
    }
}




useEffect(() => {
   if(selectedContestant) {
    player.replaceAsync(null);
    setIsContestantVisible(true)
    setTimeout(() => {
        player.replaceAsync(selectedContestant.video_url).then(()=> {setIsPlaying(true)});
        player.play();
    }, 2000);
    }
}, [selectedContestant])

const handleRefresh =()=> {
  setIsRefreshing(true)
  createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation,setEdition, setIsLoading)
  // setSelectedContestant(null)
  setTimeout(() => {
       setIsRefreshing(false)
  }, 1500);
}

return (
    <>
      {!isLoading && ! isExpired && talentRoom &&  (
        
        <View
         style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
         className=" flex-1  flex-col justify-center items-center   bg-[#060606]">
               

                { start ?
                  (
                        <>
                            {show ? (

                                <>
                                    {selectedContestant ? (
                                          <TouchableOpacity
                                          activeOpacity={1}
                                          onPress={toggleVideoPlaying}
                                          className={ "w-[100vw] h-[100%] b g-white flex-col justify-center items-center opacity-100"}
                                              > 
                                              
                                              <VideoView 
                                                             style={{ width:'100%' ,height:'100%',opacity:100}}
                                                             player={player}
                                                             contentFit='cover'
                                                             nativeControls ={false}
                                                             pointerEvents='box-only'
                                              />
                                              <ContestantPostDetails user={user} show = {!isContestantVisible && !isPlaying && selectedContestant} displayComment ={displayComment}
                                                  setDisplayComment = {setDisplayComment} selectedContestant={selectedContestant} setIsExpired={setIsExpired} talentRoom={talentRoom}
                                                  // confirmAction = {confirmAction} setAction ={setAction} setText ={setText}
                                                  rank={selectedContestant.rank}
                                                  handleRefresh ={handleRefresh}
                                                  width ={width } height={height} top = { height/4} />       
                                             
                                              <TouchableOpacity 
                                                  hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                                               
                                                  onPress={ () => {!isContestantVisible && (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )} }
                                                  className={
                                                          "w-full h-full flex-col absolute top-  justify-center items-center"
                                                  }>
                                                  {/* <Image 
                                                  className="w-14 h-14 opacity-100"
                                                  source={!isPlaying && icons.play}/> */}
                                              </TouchableOpacity>

                                              <DisplayContestant show = {isContestantVisible} setIsContestantVisible = {setIsContestantVisible} selectedContestant={selectedContestant} 
                                              width ={width } height={height-insets.top} top = { insets.top} setIsExpired={setIsExpired} />

                                              {displayComment && (<CommentModal user={user} displayComment={displayComment} setDisplayComment={setDisplayComment} selectedContestant={selectedContestant}  />)}

                                              {isPlaying && ! isContestantVisible && (<ProgresssBarVideo player={player} visible={!isPlaying} bottom={82} />)}
                                              {isPlaying && ! isContestantVisible && (
                                              <VolumeControl volume = {volume} setVolume={setVolume} bottom = {95} right ={4} />
                                              )}
                                          </TouchableOpacity>
                                    ) : (
                                        // <TouchableOpacity
                                        //  activeOpacity={1}
                                        //  className={ "w-[100vw] h-[100vh] bg-[#050505] justify-center items-center opacity-100"}
                                        //     >    
                                        //             <Text 
                                        //                 style ={{fontSize:12}}
                                        //                     className="text-xl font-base mb- text-gray-300"> 
                                        //                     select a contestant 
                                        //             </Text>
                                        // </TouchableOpacity>
                                        <ContestantList contestants={talentRoom.contestants}  selectedIcon ={selectedIcon} selectedTalent={selectedTalent} setSelectedContestant={setSelectedContestant}
                                        talentRoom={talentRoom} edition={edition} region={region} regionIcon ={regionIcon} h={height * 0.5} w ={width * 0.5} top = { height * 0.11 + insets.top   } />
                                    )}
                                      
                                </>
                            ) : (
                              <>
                               {/* {userContestantStatus && ( */}
                                <ContestantRoom regionIcon = {regionIcon} selectedIcon = {selectedIcon} user={user} confirmAction={confirmAction} setShow ={setShow}
                                setSelectedContestant={setSelectedContestant} userParticipation ={userParticipation} userContestantStatus ={userContestantStatus} setStart={setStart}
                                numberOfContestants={numberOfContestants} setParticipationType ={setParticipationType} talentRoom={talentRoom} edition={edition}/>
                               {/* )}   */}
                               </>
                            )}
                          
                        </>

                ) : (
                    <TalentRoomIntroduction talentRoom={talentRoom} edition = {edition} selectedIcon ={selectedIcon} selectedTalent={selectedTalent} region={region} regionIcon={regionIcon} setStart={setStart} />
                )}
                    
        
            {!isPlaying && start && !displayComment && !isContestantVisible &&(
            <MotiView
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 800, type: 'timing', duration: 600 }}
                style ={{bottom: !show? height * 0.08 + insets.bottom : height * 0.12 + insets.bottom}}
                className ="w-[40%] -[10%] p-2  absolute bottom-36 flex-col bg-[#0f1457] rounded-xl  justify-start items-center">
                <TouchableOpacity
                       onPress={handleRefresh}
                       className="p-1 justify-center items-center"
                       >
                          {isRefreshing ?(
                                <ActivityIndicator size="small" color="white" />
                          ):(
                                <Image 
                                 source={icons.refresh} 
                                 className="w-6 h-6"/>
                          )}
                        
                </TouchableOpacity>
                {/* <TouchableOpacity
                       onPress={handleRefresh}
                       className="py -1 px-6 justify-center rounded-xl  bg-black items-center"
                       >
                      <Text 
                            style ={{fontSize:9}}
                            className="text-xl font-black -auto text-white"> 
                                Play All
                    </Text> 
                </TouchableOpacity> */}

                <View
                  className ="w-[100%] -[60%] px- py-1 gap-2 g-white rounded-xl flex-row justify-center items-start">

                    <Text 
                            style ={{fontSize:11 ,fontStyle:"italic"}}
                            className="text-xl font-black -auto text-white"> 
                            {talentRoom.contestants.length} 
                    </Text>
                  
                    <Text 
                            style ={{fontSize:11}}
                            className="text-xl font-black -auto text-white"> 
                                Contestants
                    </Text>

                </View>

                <TouchableOpacity
                    onPress={()=> {
                        setSelectedContestant(null)
                        setShow(!show)
                        createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation,setEdition, setIsLoading)
                       }
                    }
                    className ="w-[100%] -[40%] p-1 bg-gray-200 rounded-lg flex-row justify-center items-center">
                     <View
                       className ="w-[98%] -[94%] px-8 bg-white rounded-lg flex-row justify-center items-center">
                           <Text 
                                style ={{fontSize:9}}
                                className="text-xl font-black -auto text-black"> 
                                  {show? "EXIT STAGE" :"ENTER STAGE"} 
                           </Text>
                     </View>
                </TouchableOpacity>

                <Image
                          source={selectedIcon}
                          className ="absolute top-1 left-1 w-6 h-6"
                          />
                  <Image
                          source={regionIcon}
                          className ="absolute top-1 right-2 w-6 h-6"
                          />
            </MotiView>

            )}

           
              
 
             <DisplayContestant show = {isContestantVisible} setIsContestantVisible = {setIsContestantVisible} selectedContestant={selectedContestant} 
             width ={width } height={height} top = { insets.top} setIsExpired={setIsExpired} /> 
           
            <TopContestantBar show = {!isPlaying && show && !isContestantVisible} width ={width} height={ height * 0.11  } top={height * 0.0 + insets.top  } selectedIcon={selectedIcon} talentRoom={talentRoom}
             left ={0} right ={null} regionIcon ={regionIcon}  contestants = {talentRoom.contestants.slice(0,4)} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            <SideBarLeft show = {!isPlaying && show && !isContestantVisible} width ={width * 0.25} height={height - height * 0.22 -  insets.top - insets.bottom } top={height * 0.10 + insets.top + height * 0.01 }
             left ={0} right ={null} regionIcon ={regionIcon} selectedIcon={selectedIcon}  contestants = {talentRoom.contestants.slice(4,18).filter((element, index) => {
                return index % 2 === 1;
              })} talentRoom={talentRoom} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            <SideBarRight show = {!isPlaying && show && !isContestantVisible} width ={width * 0.25} height={height - height * 0.22 -  insets.top - insets.bottom } top={height * 0.10 + insets.top + height * 0.01} 
             right ={0} left ={null} regionIcon ={regionIcon} selectedIcon={selectedIcon} contestants = {talentRoom.contestants
              .slice(4,18).filter((element, index) => {return index % 2 === 0; })
            } talentRoom={talentRoom} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>
            
            <BottomContestantBar show = {!isPlaying && show && !isContestantVisible} width ={width} height={ height * 0.11  } bottom={height * 0.0 + insets.bottom  } selectedIcon={selectedIcon} talentRoom={talentRoom}
             left ={0} right ={null} regionIcon ={regionIcon}  contestants = {talentRoom.contestants.slice(18,22)} selectedContestant={selectedContestant} setSelectedContestant ={setSelectedContestant}/>

            <BottomBar show = {!isPlaying && ! displayComment && ! isContestantVisible && start && !(show && talentRoom.contestants.length > -1) } width ={width} height={height * 0.07 } bottom={insets.bottom} left ={null} right ={null} user = {user}
              userContestantStatus = {userContestantStatus}    confirmAction = {confirmAction}  region={region} regionIcon ={regionIcon} selectedTalent={selectedTalent}  selectedIcon ={selectedIcon}/>          
           
            {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     handleTalentParticipation  = {handleTalentParticipation} handleTalentResignition = {handleTalentResignition}
                     handleQueue ={handleQueue}
                       />
                 )}
        </View>
       
      )}

      {isExpired && (
        <View
        className="flex-1 bg-primary justify-center items-center">
                <Text 
                    style ={{fontSize:14}}
                    className="text-xl font-base mb- text-gray-300"> 
                        post does't exist
                </Text> 
        </View>  )}
    </>
    
  )
}