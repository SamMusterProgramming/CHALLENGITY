import { View, Text, FlatList, useWindowDimensions, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import SwingingTitle from '../custom/SwingingTitle'
// import InstantPlayer from './InstantPlayer';

// import { getInition, sortChallengeByVotes } from '../../helper';
import { router, useLocalSearchParams } from 'expo-router';
import { addChallengeToFavourite, deleteChallenge, getChallengeById, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, quitChallenge, removeChallengeFromFavourite } from '../apiCalls';

import { icons } from '../constants';
import SwingingTitle from '../components/custom/SwingingTitle';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';

import ChallengeAction from '../components/modal/ChallengeAction';

import { useGlobalContext } from '../context/GlobalProvider';
import { deleteObject,  ref } from 'firebase/storage'
import { storage } from '../firebase';
import ChallengeExpired from '../components/challenge/ChallengeExpired';

import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MotiView } from 'moti';

import ProgresssBarVideo from '../components/custom/ProgresssBarVideo';

import LeftBarChallenge from '../components/challenge/LeftBarChallenge';
import RightBarChallenge from '../components/challenge/RightBarChallenge';
import BottomBarChallenge from '../components/challenge/BottomBarChallenge';
import ParticipantPostData from '../components/challenge/ParticipantPostData';
import CommentModal from '../components/talent/modal/CommentModal';
import ParticipantRoom from '../components/challenge/ParticipantRoom';
import ChallengeParticipation from '../components/challenge/ChallengeParticipation';
import TopBarParticipants from '../components/challenge/TopBarParticipants';
import BottomBarParticipants from '../components/challenge/BottomBarParticipants';
import CentralParticipantPlayer from '../components/challenge/CentralParticipantPlayer';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Invites from '../components/challenge/Invites';



export default function FSinstantChallengeDisplay() {

    const flatRef = useRef()
    const [viewableItems, setViewableItems] = useState([]);
    const [finishPlaying ,setFinishPlaying] = useState(false)
    const [currentIndex,setCurrentIndex] = useState(0)
    const { width, height } = useWindowDimensions();
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(false)
    const [data,setData] = useState(null)
    const [displayData,setDisplayData] = useState([])
    const [indexList , setIndexList] = useState(1)
    const [challenge , setChallenge] = useState(null)
    const { challenge_id } = useLocalSearchParams()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [participantStatus,setParticipantStatus] = useState("")
    const [text,setText] = useState("")
    const [action,setAction] = useState("")
    const[isFavourite,setIsFavourite] = useState(null)
    const[isExpired,setIsExpired] = useState(false)
    const [isPlayerModalVisible, setIsPlayerModalVisible] = useState(false)
    const [selectedPost ,setSelectedPost] = useState(null)
  
    const [descriptionType,setDescriptionType] = useState(null)
    const [icon,setIcon] = useState("")
    
    
    const insets = useSafeAreaInsets();
    const [selectedParticipant,setSelectedParticipant] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false);
    const [matric , setMatric] = useState(null)
    const [displayComment,setDisplayComment] = useState(false)
    const [isRefreshing , setIsRefreshing] = useState(false)
    const [stage , setStage] = useState(false)
    const [participationType,setParticipationType] = useState("")
    const [newChallenge,setNewChallenge] = useState(false)
    const [replayRecording,setReplayRecording] = useState(false)
    const [participantTrackerId , setParticipantTrackerId] = useState(null)
    const [selectedPostIndex , setSelectedPostIndex] = useState(0)
    const [isScrolling , setIsScrolling] = useState(false)
    const [selection , setSelection] = useState("participants")

    const { participant_id } =  useLocalSearchParams(); 
    const [isParamed , setIsParamed] = useState(false)



    // useEffect(() => {
     
    // }, [])
    

    //*************************************  player */

    const player = useVideoPlayer
      (
        null
        , (player) => {
        player.loop = false;
        player.volume = 0.1
        player.pause() ;
        player.timeUpdateEventInterval = 0.1;
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


      //************** */
    
    useEffect(() => {
      if(challenge_id) getChallengeById(challenge_id, setChallenge , setIsExpired)
    }, [])
    
    const {user,favouriteList,favouriteChallenge , setFavouriteList,setPublicParticipateChallenges,setPrivateParticipateChallenges,
        setUserPrivateChallenges,setUserPublicChallenges,userFriendData,participateChallenges,setParticipateChallenges,notifications,setNotifications} = useGlobalContext()
    
    
     useEffect(() => {
           selectedPost && setIsPlayerModalVisible(true)
     }, [selectedPost]) 
   
    //************************************ favourites */

    // useEffect(() => {
    //     challenge && favouriteChallenge &&  setIsFavourite(favouriteChallenge.favourites.find(chall=>chall._id === challenge._id))  
    // }, [favouriteChallenge,challenge]) 
    
    // const addToFavourite  = ()=> {
    //     setIsModalVisible(false)
    //     addChallengeToFavourite(user._id,challenge,setFavouriteChallenge,setIsExpired)
    //   }
      
    //   const removeFromFavourite = ()=> {
    //     setIsModalVisible(false)
    //     removeChallengeFromFavourite(user._id,challenge,setFavouriteChallenge,setIsExpired)
    //  }

    const confirmAddToFavourite  = ()=> {
        setIsModalVisible(true)
        setAction("FA")
        setText("You are about to add the challenge to your Watchlist list")
        }
   

    //************************************ restructure challenge based on participants and invites */

    useEffect(() => {
     if(challenge){
      let d = [] ; 
      challenge.participants.forEach((p , index) => {
          d.push({...p,rank:index + 1})
      })
      let invites = [] 
      if(challenge.privacy == "Private")(
         challenge.invited_friends.forEach((friend) =>{ 
           if(!challenge.participants.find(p => p.user_id === friend.user_id))  invites.push(
               {...friend , 
                video_url : null,
                _id:friend.user_id
               })
         })
      )
      // d.push(...invites)
      setData([...d])
        
     !setParticipantTrackerId ?  setParticipantTrackerId(challenge.participants[0]._id) :
                                 setParticipantTrackerId(selectedParticipant)
     selectedParticipant && setSelectedParticipant(d.find(p => p.user_id ===  selectedParticipant.user_id))
     if(participant_id && !isParamed){
      setSelectedParticipant(d.find(p => p.user_id === participant_id))
      setIsParamed(true)
    }
    if(favouriteList){
      setIsFavourite({status:favouriteList.favourites.find(f=> f._id == challenge._id)})
    }else setIsFavourite(false)
    }
    }, [challenge])


    useEffect(() => {
      favouriteList && challenge &&  setIsFavourite(
            {status:favouriteList.favourites.find(f=> f._id == challenge._id)}
             )
    }, [favouriteList])


//****************************** confirm challenge action */
        const joinChallenge = () => {
            setIsModalVisible(false)
            setNewChallenge(true)
            // router.push({ pathname: '/CreateParticipateChallenge', params: {challenge_id:challenge._id} })
         }
        
         const resignChallenge = async() => {
          setIsModalVisible(false)
          // setVisible(true)
          await quitChallenge(challenge._id,user._id).
          then(res => {
            if(challenge.origin_id == user._id) {
              getUserPublicChallenges(user._id,setUserPublicChallenges)
              getUserPrivateChallenges(user._id,setUserPrivateChallenges)
            }else {
              getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
              getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
              
            }
            handleRefresh()
            setStage(true)
            setTimeout(() => {
            // setVisible(false)
            }, 1000);
             const you = challenge.participants.find(participant => participant.user_id == user._id)
             const videoRef = ref(storage,you.video_url);
             const thumbnailRef = ref(storage,you.thumbNail_URL);
             Promise.all([deleteObject(videoRef),deleteObject(thumbnailRef)])
              .then(() => {
               console.log("both deleted successfully!");
               })
              .catch((error) => {
              console.error("Error deleting file:", error);
               });
          })
        }
        
         const removeChallenge = async() => {
          setIsModalVisible(false)
          await deleteChallenge(challenge._id,user._id).
           then((res) => {    
                // setVisible(true)
                const you = challenge.participants.find(participant => participant.user_id == user._id);
                const videoRef = ref(storage,you.video_url); 
                const thumbnailRef = ref(storage,you.thumbNail_URL); 
                
                if(user._id == challenge.origin_id) 
                  { 
                   getUserPublicChallenges(user._id , setUserPublicChallenges)
                   getUserPrivateChallenges(user._id , setUserPrivateChallenges)
                   router.back() 
              
                   }              
                else {
                     challenge.privacy === "Public"? getUserPublicParticipateChallenges(user._id , setPublicParticipateChallenges)
                     :getUserPrivateParticipateChallenges(user._id , setPrivateParticipateChallenges)
                   
                    setTimeout(() => {
                        router.back()
                      }, 1000);
                  
                   }
        
                    setTimeout(() => {
                          // setVisible(false)
                    }, 1500);
        
                   Promise.all( [deleteObject(videoRef),deleteObject(thumbnailRef)])
                   .then(() => {
                     console.log("both deleted successfully!");
                   })
                   .catch((error) => {
                     console.error("Error deleting file:", error);
                   });  
                
           })
         
        }

      
      const addFavourite  = () => {
          setIsModalVisible(false)
          addChallengeToFavourite(user._id,{challenge_id:challenge._id},setFavouriteList,setIsExpired)
          setIsFavourite(null)
      }
      const removeFromFavourite = ()=> {
          setIsModalVisible(false)
          removeChallengeFromFavourite(user._id,{challenge_id:challenge._id},setFavouriteList,setIsExpired)
          setIsFavourite(null)
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
              case "Join":
                setAction("JN")
                setText("Are you sure you want to join the challenge")
                break;
              case "Invited":
                setAction("JN")
                setText("Are you sure you want to join the challenge")
                break;
                case "Uninvited":
                setAction("OK")
                setText("you are not invited to the challenge")
                break;
              case "Resign":
                setAction("RS")
                setText("Are you sure you want to resign and delete your participation from the challenge")
                break;
              case "Delete":
                setAction("DT")
                setText("Are you sure you want to delete the challenge")
                break;
              default:
                break;
            }
        }
      }, [participationType])
//*************************************** challenge description */
        
const getIcon = (type) => {
    switch(type) {
      case "Public":
        return icons.publi
       break;
      case "Private":
        return icons.priv
       break;

       case "Open":
        return icons.open
       break;
      case "Restricted":
        return icons.restricted
       break;
       case "Strict":
        return icons.strict
       break;

      case "Adventure":
         return icons.adventure
        break;
      case "Dance":
         return icons.dance 
        break;
      case "Eating":
          return icons.eating 
         break;
      case "Fitness":
          return  icons.fitness 
         break;
      case "Magic":
        return icons.magic 
          break;
      case "Music":
        return icons.music 
           break;
      case "Science":
          return icons.science
           break;
      case "Sport":
           return icons.sport
           break;
      case "Game":
          return icons.game
          break;
      case "Diet":
          return icons.diet
      case "challenge":
          return icons.newChallenge
          break;
      case "participation":
         return icons.participate
      case "invite":
            return icons.invites
      default:
    
    }
}

const handleParticipationDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon("participation"))
    setDescriptionType("Participation")
  }

  const handleInviteDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon("invite"))
    setDescriptionType("Invite")
  }

const handleChallengeCompetitionDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon("challenge"))
    setDescriptionType("Challenge")
}
const handleTypeDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon(challenge.type))
    setDescriptionType(challenge.type)
}
const handlePrivacyDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon(challenge.privacy))
    setDescriptionType(challenge.privacy)
}
const handleAudienceDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon(challenge.audience))
    if(challenge.audience == "Open") {
         challenge.privacy == "Public" ? setDescriptionType("Open public") : setDescriptionType("Open")
         return true
       }
    setDescriptionType(challenge.audience)     
}



if(isExpired) return <ChallengeExpired challenge_id = {challenge_id} /> 


  useEffect(() => {
      if(selectedParticipant) {
           player.replaceAsync(selectedParticipant.video_url).then(()=> {setIsPlaying(true)});
           player.play();
           setStage(true)
           setParticipantTrackerId(selectedParticipant._id)
           setSelectedPostIndex(selectedParticipant.rank-1)
       }
   }, [selectedParticipant])


   const handleRefresh =()=> {
    setIsRefreshing(true)
    getChallengeById(challenge_id, setChallenge , setIsExpired)
    // setSelectedContestant(null)
    setTimeout(() => {
         setIsRefreshing(false)
    }, 1500);
  }

  return (
    <View
    style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top  }}
    className=" flex-1  min-w-[100vw] min-h-full flex-row justify-center items-center   bg-[#000000]" >
    <View
    style ={{
      // backgroundColor : 'rgb(173, 216, 230)'
    }}
    className=" flex-1  min-w-[100%] min-h-[100%] flex-row justify-center items-center   bg-black -[#363c4a]   [#786d6d]">

      {data && challenge && (
        <>
                     {stage ? (
                       <>
                          {selectedParticipant && (
                            <TouchableOpacity
                            activeOpacity={1}
                            onPress={toggleVideoPlaying}
                            className={ "w-[100vw] h-[100%] b g-white flex-col justify-center items-center opacity-100"}
                                > 
                                 <View
                                    className = {!isPlaying ? "opacity-50 w-[100%]" : "w-[100vw] opacity-100"}>
                                    <VideoView 
                                                  style={{ width:'100%' ,height:'100%',opacity:100}}
                                                  player={player}
                                                  contentFit='cover'
                                                  nativeControls ={false}
                                                  pointerEvents='box-only'
                                    />
                                </View>
                                <ParticipantPostData user={user} show = {!isPlaying} displayComment ={displayComment}
                                    setDisplayComment = {setDisplayComment} selectedParticipant={selectedParticipant} setIsExpired={setIsExpired} challenge={challenge}
                                    setSelectedParticipant={setSelectedParticipant}
                                    rank={5}
                                    handleRefresh ={handleRefresh}
                                    width ={width } height={height} top = { height/4} />       
                              
                                <TouchableOpacity 
                                    hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                                
                                    onPress={ () => { (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )} }
                                    className={
                                            "w-full h-full flex-col absolute top-  justify-center items-center"
                                    } >
                                    {/* <Image 
                                    className="w-14 h-14 opacity-100"
                                    source={!isPlaying && icons.play}/> */}
                                </TouchableOpacity>

                                {/* <DisplayContestant show = {isContestantVisible} setIsContestantVisible = {setIsContestantVisible} selectedContestant={selectedContestant} 
                                width ={width } height={height} top = { insets.top} setIsExpired={setIsExpired} /> */}

                                {displayComment && (<CommentModal user={user} displayComment={displayComment} setDisplayComment={setDisplayComment} selectedContestant={selectedParticipant}
                                 h = { Platform.OS == "ios" ?  width * 1.49 + insets.bottom/2 : 
                                  width * 1.49  } 
                                  top = {insets.top}  />)}

                                {isPlaying && (<ProgresssBarVideo player={player} visible={!isPlaying} bottom={82} />)}
                                {/* {isPlaying && ! isContestantVisible && (
                                <VolumeControl volume = {volume} setVolume={setVolume} bottom = {95} right ={4} />
                                )} */}
                            </TouchableOpacity>
                          ) 
                          // : (

                         
                          // <CentralParticipantPlayer data={data} selectedParticipant={selectedParticipant} h={width * (1.13)} w={width * 0.60}
                          //   participantTrackerId={participantTrackerId} setParticipantTrackerId={setParticipantTrackerId}
                          //   selectedPostIndex = {3}  top={insets.top} setSelectedParticipant={setSelectedParticipant} user={user}/>
                          // )
                          }
                        </>
                        ): (
                           <>
                           {!newChallenge ? (
                          <ParticipantRoom  user={user}  setStage = {setStage}
                          setSelectedParticipant={setSelectedParticipant}  challenge ={challenge}
                          setParticipationType = {setParticipationType} data={data}   h={width * (1.05)} w={width * 0.57} top={insets.top + width * 0.01}/>
                          ):(
                          <ChallengeParticipation challenge= {challenge} setReplayRecording={setReplayRecording} setNewChallenge={setNewChallenge}
                          user={user} setSelectedParticipant={setSelectedParticipant} setStage={setStage} setChallenge={setChallenge} setIsExpired={setIsExpired}
                           />
                          )}

                          </>
                        )}
      




                {!isPlaying  && !displayComment && !replayRecording &&  (
                <MotiView
                  from={{ opacity: 0, translateY: 40 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: 800, type: 'timing', duration: 600 }}
                  style = {{
                    height: Platform.OS == "ios" ? height - width * 1.49 - insets.top - 28 - height * 0.07:
                    height - width * 1.49 - 30 - 28 -height * 0.07 ,
                    width : width ,
                    bottom: !newChallenge? height * 0.07 : 0,
                    backgroundColor: stage? 'rgba(0,0, 0 , 0.7)' :'rgba(0,0 , 0 , 0.7)'
                }}
                  className ="absolute  flex-col b g-[#120564] rounded-t-xl  justify-start p-1  items-center"
                >
                

                <View
                   
                    className ="w-[100%] h-[100%] p- 2  mb- 12 g-white rounded-lg flex-col gap-2 justify-start items-center">
                           <Text 
                          style ={{fontSize:10}}
                          className="text-xl mt-2 font-black  text-yellow-500"> 
                              Challenge 
                           </Text>

                           <View
                           className = "w-[100%] min-h -[30%] flex-row text-end  justify-center items-center gap-2">
                              <Text 
                                style ={{fontSize:10}}
                                className="text-xl  font-black    text-gray-400"> 
                                  Created by
                              </Text>
                              
                              <Image 
                                   className="w-9 h-9 rounded-full"
                                   resizeMethod='contain'
                                   source={{uri:challenge.profile_img}}/>  
                            
                              <Text 
                                style ={{fontSize:10}}
                                className="text-xl  font-black  text-white"> 
                                  {challenge.name}
                              </Text>
                          </View>
                          <View
                           className = "w-[100%] mt-auto py-3 flex-row text-end  shad ow-white justify-center items-end gap-4">
                              
                              <View
                              style={{marginBottom:height * 0.07}}
                              className = "flex-1 py-3 flex-row  rounded-xl text-end bg-[#065e7c] shadow-black justify-center items-end gap-2">
                                           <SwingingTitle text={"Desc : "+challenge.desc} color={"white"} fontSize={10} />
                             </View>
                           </View>
                </View>

                <View
                className = "flex-row absolute h-7 left-0 ml-1 top-2 justify-start items-end gap-2">
                    <Image
                          source={getIcon(challenge.type)}
                          className = "w-7 h-7"
                          />
                    <Text 
                          style ={{fontSize:10}}
                          className="text-xl mt-2 font-black  text-white"> 
                              {challenge.type} 
                    </Text>
                </View>

                <View
                className = "flex-row absolute h-7 right-0 mr-2 top-2 justify-start items-end gap-2">
                    <Text  
                          style ={{fontSize:10}}
                          className="text-xl font-black mt-2 text-white"> 
                              {challenge.privacy} 
                    </Text>
                    <Image
                          source={getIcon(challenge.privacy)}
                          className ="w-7 h-7"
                          />
                </View>
                
                {isFavourite && (
                <TouchableOpacity
                                      onPress={() =>
                                        {
                                         !isFavourite.status ? setParticipationType("addFavourite") : setParticipationType("removeFavourite")
                                        }}
                                   
                                      className = "absolute b g-white gap-1 rounded-full top-14 left-8 flex-row justify-center items-end ">
                                              {isFavourite.status ?
                                               (
                                                <MaterialCommunityIcons name="heart" size={20} color = "#EC4899"  />
                                               ) : 
                                               (
                                                <MaterialCommunityIcons name="heart-outline" size={20} color = "#EC4899"  />
                                               )}
                                              <Text  
                                                    style ={{fontSize:8}}
                                                    className="tex t-xl font-black p- 1  text-white"> 
                                                       {isFavourite.status ? "Fav" : "Add"} 
                                              </Text>
                                         
                </TouchableOpacity>
                )}
              
            </MotiView>

            )}

            {!isPlaying  && !displayComment && !replayRecording && stage && !selectedParticipant && (
                <View
                  style = {{
                    height: Platform.OS == "ios" ? width * 0.10 : width * 0.10 ,
                    width : width * 0.50 ,
                    top : width * 6 * 0.18 + 30 + width * 0.08,
                  }}
                  className = "absolute  flex-row z-20 justify-center p-1 gap-12  items-center" >
                  <View>
                  <TouchableOpacity
                            onPress={() => {
                              setSelection("participants") 
                            }}
                            className = "flex-row justify-center items-center">
                      <Text  
                          style ={{fontSize:10,
                           color : selection === "participants" ? "#58a1d8" : "white",
                        
                          }}
                          className="text-xl font-black mt-2 text-[#58a1d8]"> 
                             PARTICIPANTS 
                      </Text>    
                   </TouchableOpacity> 
                  </View>  
                  
                  <View>
                  <TouchableOpacity
                            onPress={() => {
                              setSelection("invites") 
                            }}
                         
                            className = "flex-row justify-center items-center">
                      <Text  
                          style ={{fontSize:10,
                           color : selection === "invites" ? "#58a1d8" : "white",
                          }}
                          className="text-xl font-black mt-2 text-[#58a1d8]"> 
                             INVITES
                      </Text>    
                   </TouchableOpacity> 
                  </View>
              
                </View>
            )} 

            {selectedParticipant && !isPlaying && (
              <TouchableOpacity
               onPress={() => {
                setIsScrolling(true)
                setSelectedParticipant(null)}}
               className = "absolute top-36 ">
                       <AntDesign name="closecircle" size={45} color="white" /> 
              </TouchableOpacity>
            )}

             {!isPlaying && stage && !newChallenge && !selectedParticipant && selection === "participants" && (
                <CentralParticipantPlayer data={data} selectedParticipant = {selectedParticipant} h = { width * (1.05) }  w = { width * 0.57 }
                participantTrackerId={participantTrackerId} setParticipantTrackerId={setParticipantTrackerId} challenge={challenge}
                isScrolling = {isScrolling} setIsScrolling = {setIsScrolling}
                selectedPostIndex = {selectedPostIndex}  top={insets.top + width * 0.01} setSelectedParticipant={setSelectedParticipant} user={user}/>
             )}

             {!isPlaying && stage && !newChallenge && !selectedParticipant && selection === "invites" && (
                <Invites data={challenge.invited_friends} selectedParticipant = {selectedParticipant} h = { width * (1.05) }  w = { width * 0.57 }
                participantTrackerId={participantTrackerId} setParticipantTrackerId={setParticipantTrackerId} challenge={challenge}
                isScrolling = {isScrolling} setIsScrolling = {setIsScrolling}
                selectedPostIndex = {selectedPostIndex}  top={insets.top + width * 0.01} setSelectedParticipant={setSelectedParticipant} user={user}/>
             )}
           
             <TopBarParticipants show = {!isPlaying  && !newChallenge && !replayRecording } width ={width} height={ width * 0.18  } top={7 } participantTrackerId={participantTrackerId}
             left ={0} right ={null}   participants = {data.slice(0,4)} selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant}/>
     
            <LeftBarChallenge show = {!isPlaying  && !newChallenge && !replayRecording} width ={width * 0.19} height= {width * 1.13 } top= { width * 0.18  + 14 }
              participantTrackerId={participantTrackerId} left ={0} right ={null} participants ={data.slice(4,16).filter((element, index) => {
              return index % 2 === 1;
            })} selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant}
             />

            <RightBarChallenge show = {!isPlaying  && !newChallenge && !replayRecording} width ={width * 0.19} height={width * 1.13} top={width * 0.18 + 14 }
             participantTrackerId = {participantTrackerId} left ={null} right ={0} participants ={data.slice(4,16).filter((element, index) => {
              return index % 2 === 0;
            })} selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant}
             />

            <BottomBarParticipants show = {!isPlaying && !newChallenge && !replayRecording } width ={width} height = { width * 0.18  } top ={width * 1.31  + 21 }
             participantTrackerId={participantTrackerId} left ={0} right ={null}   participants = {data.slice(16,20)} 
             selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant}/>

            <BottomBarChallenge show = {!isPlaying  && !newChallenge && !replayRecording } width ={width} height={height * 0.07 } bottom={0} left ={null} right ={null} user = {user} setStage={setStage}
               stage={stage}    challenge={challenge} handleRefresh={handleRefresh} setSelectedParticipant={setSelectedParticipant} isRefreshing={isRefreshing}/>          
            
          
           {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible}  removeChallenge = {removeChallenge} removeFromFavourite={removeFromFavourite}
                     addFavourite={addFavourite} setIsModalVisible={setIsModalVisible}  joinChallenge={joinChallenge} resignChallenge={resignChallenge} 
                     setParticipationType = {setParticipationType}
                       />
           )}

     </>
  )}     
   </View>
  </View>
  )
}