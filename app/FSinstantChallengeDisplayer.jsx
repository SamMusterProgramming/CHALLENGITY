import { View, Text, FlatList, useWindowDimensions, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import SwingingTitle from '../custom/SwingingTitle'
// import InstantPlayer from './InstantPlayer';

// import { getInition, sortChallengeByVotes } from '../../helper';
import { router, useLocalSearchParams } from 'expo-router';
import { addChallengeToFavourite, deleteChallenge, getChallengeById, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, quitChallenge, removeChallengeFromFavourite } from '../apiCalls';
import { getInition, sortChallengeByVotes } from '../helper';
import { icons } from '../constants';
import InstantPlayer from '../components/challenge/InstantPlayer';
import SwingingTitle from '../components/custom/SwingingTitle';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import FSinstantPlayer from '../components/challenge/FSinstantPlayer';
import ChallengeAction from '../components/modal/ChallengeAction';
import ButtonChallengeAction from '../components/challenge/ButtonChallengeAction';
import { useGlobalContext } from '../context/GlobalProvider';
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { storage } from '../firebase';
import ChallengeExpired from '../components/challenge/ChallengeExpired';
import PostPlayerModal from '../components/modal/PostPlayerModal';
import ChallengeDescriptionModal from '../components/modal/ChallengeDescriptionModal';
import ProfileDisplayModal from '../components/modal/ProfileDisplayModal';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MotiView } from 'moti';
import ContestantPostDetails from '../components/talent/ContestantPostDetails';
import ProgresssBarVideo from '../components/custom/ProgresssBarVideo';
import TopBarChallenge from '../components/challenge/TopBarChallenge';
import LeftBarChallenge from '../components/challenge/LeftBarChallenge';
import RightBarChallenge from '../components/challenge/RightBarChallenge';
import BottomBarChallenge from '../components/challenge/BottomBarChallenge';
import ParticipantPostData from '../components/challenge/ParticipantPostData';
import CommentModal from '../components/talent/modal/CommentModal';
import ParticipantRoom from '../components/challenge/ParticipantRoom';
import ChallengeParticipation from '../components/challenge/ChallengeParticipation';
import TopBarParticipants from '../components/challenge/TopBarParticipants';
import BottomBarParticipants from '../components/challenge/BottomBarParticipants';



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
    const[isFavourite,setIsFavourite] = useState(false)
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
    
    const {user,setUser,userChallenges,setUserChallenges,favouriteChallenge , setFavouriteChallenge,setPublicParticipateChallenges,setPrivateParticipateChallenges,
        setUserPrivateChallenges,setUserPublicChallenges,userFriendData,participateChallenges,setParticipateChallenges,notifications,setNotifications} = useGlobalContext()

    
    useEffect(() => {
           selectedPost && setIsPlayerModalVisible(true)
     }, [selectedPost]) 
   
    //************************************ favourites */

    useEffect(() => {
        challenge && favouriteChallenge &&  setIsFavourite(favouriteChallenge.favourites.find(chall=>chall._id === challenge._id))  
    }, [favouriteChallenge,challenge]) 
    
    const addToFavourite  = ()=> {
        setIsModalVisible(false)
        addChallengeToFavourite(user._id,challenge,setFavouriteChallenge,setIsExpired)
      }
      
      const removeFromFavourite = ()=> {
        setIsModalVisible(false)
        removeChallengeFromFavourite(user._id,challenge,setFavouriteChallenge,setIsExpired)
     }

    const confirmAddToFavourite  = ()=> {
        setIsModalVisible(true)
        setAction("FA")
        setText("You are about to add the challenge to your Watchlist list")
        }
    const confirmRemoveFromFavourite  = ()=> {
          setIsModalVisible(true)
          setAction("RF")
          setText("You are  about to remove  the challenge from your Watchlist list")
        }

    //************************************ restructure challenge based on participants and invites */

    useEffect(() => {
     if(challenge){
      let d = [...challenge.participants] ; 
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
      d.push(...invites)
      setData(d)
      let m = {
         col:0,
         row:0
      }
      if(d.length == 1) {
        m.col = 1
      } else m.col = 2

      if(d.length <= 2 ){ m.row = 1 }
      if(d.length <= 4 && d.length >= 3  ){ m.row = 2 }
      if(d.length >= 5  ){ m.row = 3 }
      setMatric({...m})

    }
    }, [challenge])


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
    
    
      const confirmAction  = ()=> {
            setIsModalVisible(true)
            switch (participationType) {
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


const renderItem = ({ item ,index }) => (
      <MotiView
      key={index}
      from={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 100 * index , type: 'timing', duration: 300  }}
      className ="min w-[49%] h-[32%] shadow-lg elevation-2xl black pb-2 ml-1 justify-center rounded-xl items-center" 
      style ={{ 
          height: (width * (1.14) ) /  3 ,
          // marginLeft : index % 3 == 2 && "auto",
          width : matric.col == 1  ? "32%" :"32%"
          // marginRight : index % 2 == 0 && 3,
        // borderColor:generateNewMatches(challenge,notifications) !== " "? "white" :""
         }}
      >
           <TouchableOpacity
               onPress={
                () =>  {setSelectedParticipant(item) }}
                style ={{ 
    
              }}
                className="min w-[100%] h-[100%] rounded-lg  bg-black border- borde-[white] flex-col justify-start items-center rounde gap-  ">
                <View
                    className=" flex-col w-[100%] h-[100%] -2 bg-black  h- 8 g-black opacity-100 rounded-lg justify-center items-center gap- 1 ">
                       {item.video_url ? (
                        <>
                         <Image
                           className="w-[100%] h-[100%] shadow-lg elevation-2xl rounded-xl"
                           source={{uri:item.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                           resizeMethod='cover' /> 
                         <Image
                           className="absolute w-7 h-7 rounded-xl"
                           source={icons.play}
                           resizeMethod='cover' /> 
                        </>
                        ):(
                         <View
                          className=" w-[100%]  h-[100%] flex-col justify-between    items-center">  
                                <View
                                  className=" w-[100%] py-1 h- [10%] flex-row justify-center gap- py-  b g-white rounded-t-xl items-center">  
                                  <Text 
                                        style ={{fontSize:6}}
                                        className="text-white mt-aut text-sm font-bold">
                                          has not joined  yet
                                  </Text>
                                </View>
      
                               <View
                               className=" w-[100%]  h- [75%] flex-col justify-center gap-2  b g-[#0c1b51] items-center">  
                                 <Image
                                  className="rounded-full w-7 h-7"
                                  // style={{with:80,height:80}}
                                  contentFit='cover'
                                  source={{uri:item.profile_img || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                   />
                                 <Text 
                                      style ={{fontSize:7}}
                                      className="text-white mt-aut text-sm font-bold">
                                        {item.name}
                                 </Text>
                               </View>
      
      
                               <View
                                  className=" w-[100%]  h- [15%] py-1 flex-row justify-center gap- b g-white g-black rounded-b-xl items-center">  
                                 <Image
                                  className="rounded-full w-3 h-3"
                                  // style={{with:80,height:80}}
                                  contentFit='cover'
                                  source={icons.invites}
                                   />
                                  <View className = "w-[60%]  h- [100%] flex-col justify-center gap- px-2 py-2 g-black items-center">
                                      <Text 
                                          style ={{fontSize:7}}
                                          className="text-white m text-sm font-bold">
                                          { item._id == user._id ? " You are invited" :"is Invited"} 
                                      </Text>
                                  </View>
                                 
                               </View>
      
                             
                              
                          </View>
                        )} 
                </View>
           </TouchableOpacity>
       </MotiView>
    )

    useEffect(() => {
      if(selectedParticipant) {
    
           player.replaceAsync(selectedParticipant.video_url).then(()=> {setIsPlaying(true)});
           player.play();
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
    className=" flex-1  min-w-[100vw] min-h-full flex-row justify-center items-center   b g-[#000000]"
    >
    <View
    className=" flex-1  min-w-[100%] min-h-[100%] flex-row justify-center items-center   bg-[#786d6d]">

      {data && challenge && (
        <>
                     {stage ? (
                       <>
                          {selectedParticipant ? (
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
                                <ParticipantPostData user={user} show = {!isPlaying} displayComment ={displayComment}
                                    setDisplayComment = {setDisplayComment} selectedParticipant={selectedParticipant} setIsExpired={setIsExpired} challenge={challenge}
                                    rank={5}
                                    handleRefresh ={handleRefresh}
                                    width ={width } height={height} top = { height/4} />       
                              
                                <TouchableOpacity 
                                    hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                                
                                    onPress={ () => { (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )} }
                                    className={
                                            "w-full h-full flex-col absolute top-  justify-center items-center"
                                    } >
                                    <Image 
                                    className="w-14 h-14 opacity-100"
                                    source={!isPlaying && icons.play}/>
                                </TouchableOpacity>

                                {/* <DisplayContestant show = {isContestantVisible} setIsContestantVisible = {setIsContestantVisible} selectedContestant={selectedContestant} 
                                width ={width } height={height} top = { insets.top} setIsExpired={setIsExpired} /> */}

                                {displayComment && (<CommentModal user={user} displayComment={displayComment} setDisplayComment={setDisplayComment} selectedContestant={selectedParticipant}  />)}

                                {isPlaying && (<ProgresssBarVideo player={player} visible={!isPlaying} bottom={82} />)}
                                {/* {isPlaying && ! isContestantVisible && (
                                <VolumeControl volume = {volume} setVolume={setVolume} bottom = {95} right ={4} />
                                )} */}
                            </TouchableOpacity>
                          ) : (

                          <View
                          style={{
                            height: width * (1.14) ,
                            width:  width * 0.64,
                            top : width * 0.18 + insets.top + 1
                            }}
                          className="absolute w- [100vw] full b g-[#162142] p-2 shadow-lg flex-row justify-center items-center "
                          > 
                            { data.length >= 1 && data.length < 3 && renderItem({item:data[0] , index:0}) 
                            }
                            { 
                            data.length == 2 && renderItem({item:data[1] , index:1}) 
                            }

                          {data.length >= 3 && 
                            <FlatList
                            style={{width:"100%" ,height:"100%"}}
                            data={data}
                            numColumns={3}
                            keyExtractor={(item) => item._id}
                            renderItem={renderItem}
                            removeClippedSubviews={true} 
                            scrollEventThrottle = {16}
                            showsHorizontalScrollIndicator ={false}
                            showsVerticalScrollIndicator ={false}
                          /> 
                            }


                            {/* <FlatList
                              style={{width:"100%" ,height:"100%"}}
                              data={data}
                              numColumns={2}
                              keyExtractor={(item) => item._id}
                              renderItem={renderItem}
                              removeClippedSubviews={true} 
                              scrollEventThrottle = {16}
                            />   */}
                          </View>
                       
                          )}
                        </>
                        ): (
                           <>
                           {!newChallenge ? (
                          <ParticipantRoom  user={user} confirmAction={confirmAction} setStage = {setStage}
                          setSelectedParticipant={setSelectedParticipant}  
                          setParticipationType = {setParticipationType} challenge={challenge}/>
                          ):(
                          <ChallengeParticipation challenge= {challenge} setReplayRecording={setReplayRecording} setNewChallenge={setNewChallenge}
                          user={user} setSelectedParticipant={setSelectedParticipant} setStage={setStage} setChallenge={setChallenge} setIsExpired={setIsExpired}/>
                          )}

                          </>
                        )}
      




           {!isPlaying  && !displayComment && !replayRecording && !newChallenge && (
                <MotiView
                  from={{ opacity: 0, translateY: 40 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: 800, type: 'timing', duration: 600 }}
                  style = {{
                    height: Platform.OS == "ios" ? height - width * 1.49 - insets.top - 28 :height - width * 1.49 - 30 - 28,
                    width : width ,
                    bottom: 0,
                    backgroundColor: stage? 'rgba(0,0, 0 , 0.1)' :'rgba(0,0 , 0 , 0.1)'
                  }}
                  className ="absolute  flex-col b g-[#120564] rounded-xl  justify-center items-center"
                >
                

                <View
                  className ="w- [100%] absolute h- 7 top-0   gap- 2 g-white rounded-xl flex-col justify-center items-center">
                    <Text 
                            style ={{fontSize:12 ,fontStyle:"italic"}}
                            className="text-xl font-black -auto text-white"> 
                            {challenge.participants.length} 
                    </Text>
                  
                    <Text 
                            style ={{fontSize:11}}
                            className="text-xl font-black -auto text-white"> 
                                Participants
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={()=> {
                        setSelectedParticipant(null)
                        setStage(!stage)
                        // createTalentRoom({region:region , name:selectedTalent}, setTalentRoom , user._id ,setUserContestantStatus , setUserParticipation,setEdition, setIsLoading)
                       }
                    }
                    className ="w- [100%] -[40%] p-2  mb-12 g-white rounded-lg flex-row justify-center items-center">
                     <View
                       className ="w- [98%] -[94%] px-4 bg-white  rounded-lg flex-row justify-center items-center">
                           <Text 
                                style ={{fontSize:7}}
                                className="text-xl font-black -auto text-black"> 
                                  {stage? "EXIT STAGE" :"ENTER STAGE"} 
                           </Text>
                     </View>
                </TouchableOpacity>

              
              
                <View
                className = "flex-row absolute h-7 left-0 ml-1 top-2 justify-start items-end gap-2">
                    <Image
                          source={getIcon(challenge.type)}
                          className = "w-7 h-7"
                          />
                    <Text 
                          style ={{fontSize:11}}
                          className="text-xl mt-2 font-black  text-white"> 
                              {challenge.type} 
                    </Text>
                </View>

                <View
                className = "flex-row absolute h-7 right-0 mr-2 top-2 justify-start items-end gap-2">
                    <Text  
                          style ={{fontSize:11}}
                          className="text-xl font-black mt-2 text-white"> 
                              {challenge.privacy} 
                    </Text>
                    <Image
                          source={getIcon(challenge.privacy)}
                          className ="w-7 h-7"
                          />
                </View>
              
            </MotiView>

            )}


           
            {/* <TopBarChallenge show = {!isPlaying && !replayRecording } width ={width} height={ height * 0.07 } top = { width * 1.5 + insets.top  + 7 }
             challenge={challenge} typeIcon = {getIcon(challenge.type)} privacyIcon = {getIcon(challenge.privacy)}
             left ={0} right ={null} user ={user}
             />   */}

             <TopBarParticipants show = {!isPlaying && stage && !replayRecording } width ={width} height={ width * 0.18  } top={7 }
             left ={0} right ={null}   participants = {challenge.participants.slice(0,4)} selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant}/>

            <LeftBarChallenge show = {!isPlaying && stage && !replayRecording } width ={width * 0.19} height= {width * 1.13 } top= { width * 0.18  + 14 }
             left ={0} right ={null} participants ={challenge.participants.slice(0,12).filter((element, index) => {
              return index % 2 !== 10;
            })} selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant}
             />

            <RightBarChallenge show = {!isPlaying && stage && !replayRecording} width ={width * 0.19} height={width * 1.13} top={width * 0.18 + 14 }
              left ={null} right ={0} participants ={challenge.participants.slice(0,12).filter((element, index) => {
              return index % 2 !== 10;
            })} selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant}
             />

            <BottomBarParticipants show = {!isPlaying && stage && !replayRecording } width ={width} height = { width * 0.18  } top ={width * 1.31  + 21 }
             left ={0} right ={null}   participants = {challenge.participants.slice(0,4)} selectedParticipant={selectedParticipant} setSelectedParticipant={setSelectedParticipant}/>


            <BottomBarChallenge show = {!isPlaying  && !replayRecording } width ={width} height={height * 0.10 } bottom={0} left ={null} right ={null} user = {user}
                 confirmAction = {confirmAction}  challenge={challenge} handleRefresh={handleRefresh} setSelectedParticipant={setSelectedParticipant} isRefreshing={isRefreshing}/>          
      
         

            
           {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible}  removeChallenge = {removeChallenge} removeFromFavourite={removeFromFavourite}
                     addToFavourite={ addToFavourite} setIsModalVisible={setIsModalVisible}  joinChallenge={joinChallenge} resignChallenge={resignChallenge}
                       />
           )}

     
     </>
  )}     
   </View>
  </View>
  )
}