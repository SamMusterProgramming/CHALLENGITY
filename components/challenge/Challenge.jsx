import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, AppState } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import { findTopChallengers, getTimeLapse } from '../../helper'
import { Video } from 'expo-av'
import { useGlobalContext } from '../../context/GlobalProvider'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { storage } from '../../firebase'
import { router } from 'expo-router'
import { addChallengeToFavourite, deleteChallenge, getUserParticipateChallenges, getUserPrivateChallenges, getUserPrivateParticipateChallenges,
   getUserPublicChallenges,
   getUserPublicParticipateChallenges, quitChallenge, 
   removeChallengeFromFavourite,
   updateChallengeMode} from '../../apiCalls'
import ParticipantPost from './ParticipantPost'
import SwingingTitle from '../custom/SwingingTitle'
import { Ionicons } from '@expo/vector-icons'
import ChallengeExpired from './ChallengeExpired'
import CustomAlert from '../custom/CustomAlert'
import LoadModel from '../custom/LoadModal'
import DisplayChallengers from './DisplayChallengers'
import DisplayInvites from './DisplayInvites'
import * as NavigationBar from 'expo-navigation-bar';
import DisplayMode from './DisplayMode'
import ViewDetail from './ViewDetail'




export default function Challenge({challenge,isVisibleVertical}) {

    const[topChallenger , setTopChallenger] = useState(challenge.participants[0])
    const [ownChallenge , setOwnChallenge ] = useState(false)
    const {user,SetUser,userPublicChallenges , setUserPublicChallenges,serPrivateChallenges , setUserPrivateChallenges,userPrivateChallenges,
      privateParticipateChallenges,setPrivateParticipateChallenges,favouriteChallenge , setFavouriteChallenge,
      setPublicParticipateChallenges,publicParticipateChallenges} = useGlobalContext()

    const[canJoin,setCanJoin] = useState(false)
    const[isFavourite,setIsFavourite] = useState(false)
    const[isExpired ,setIsExpired] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const [action, setAction] = useState("");
    const [text,setText] = useState()

    const [isListVisible,setIsListVisible] = useState(false)
    const [isInviteListVisible,setIsInviteListVisible] = useState(false)
    const [displayDetail,setDisplayDetail] = useState(false)

    const [modeDatae,setModeData] = useState(
                                   [
                                    {id:"1",value:"Open"},
                                    {id:"2",value:"Restricted"},
                                    {id:"3",value:"Strict"}
                                  ])
    const [isModeVisible,setIsModeVisible] = useState(false)
    const [selectedMode,setSelectedMode] = useState(challenge.audience)
    const [updateChallenge,setUpDateChallenge] = useState(challenge)

    const isYourChallenge = challenge.origin_id == user._id

    const [isOwner,setIsOwner] = useState (user._id == challenge.origin_id) 

    useEffect(() => {
     const top = findTopChallengers(challenge.participants)
     setTopChallenger(top)   
    }, [])
    
    const hideNavigationBar = async () => {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBehaviorAsync('overlay-swipe'); // Optional, for a better user experience
    };
  

    useEffect(() => {
     favouriteChallenge &&  setIsFavourite(favouriteChallenge.favourites.find(chall=>chall._id === challenge._id))  
     }, [favouriteChallenge])

    useEffect(() => {
      challenge.privacy === "Public" ? setCanJoin(true):
      challenge.invited_friends.find(friend=>friend.sender_id === user._id) ?setCanJoin(true) :setCanJoin(false)
     }, [])

    useEffect(() => {
      challenge.participants.map(participant =>{
      if(participant.user_id === user._id) {
            setOwnChallenge( prev => !prev)
         } 
      })
      }, [])


    
//**************************** confirm favourite adding option ************************ */

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
    setText("Are you sure you want to add the challenge to your favourite list")
    }
    const confirmRemoveFromFavourite  = ()=> {
      setIsModalVisible(true)
      setAction("RF")
      setText("Are you sure you want to remove  the challenge from your favourite list")
    }
   
  //**************************** confirm join delete design challenge ************************ */


    const joinChallenge = () => {
       setIsModalVisible(false)
       canJoin && router.push({ pathname: '/CreateParticipateChallenge', params: {challenge_id:challenge._id} })
    }

    const resignChallenge = async() => {
      console.log(isYourChallenge)
      setIsModalVisible(false)
      await quitChallenge(challenge._id,user._id).
      then(res => {
        setVisible(true)
        if(isYourChallenge) {
          challenge.privacy == "Public"? getUserPublicChallenges(user._id,setUserPublicChallenges)
          :getUserPrivateChallenges(user._id,setUserPrivateChallenges)
        }else {
          challenge.privacy == "Public"? getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
          :getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
        }
        router.push({ pathname: '/profile',params: {
          priv:challenge.privacy === "Private" && isYourChallenge ? "true":"false", 
          publ:challenge.privacy === "Public" && isYourChallenge ? "true":"false",
          participate: !isYourChallenge && challenge.privacy=="Public"?"true":"false" , 
          invited:!isYourChallenge && challenge.privacy=="Private" && challenge.audience !== "Strict" ?"true":"false" ,
          strict :!isYourChallenge && challenge.privacy=="Private" && challenge.audience == "Strict"?"true":"false"
        } }) 
        setTimeout(() => {
          // router.push({ pathname: '/profile'})
          setVisible(false)
        }, 1500);
        const you = challenge.participants.find(participant => participant.user_id == user._id)
         const fileRef = ref(storage,you.video_url); 
         deleteObject(fileRef)
          .then(() => {
           console.log("File deleted successfully!");
    
           })
          .catch((error) => {
          console.error("Error deleting file:", error);
           });  

 
      })
    }

    const removeChallenge = async() => {
      console.log(isYourChallenge)
      setIsModalVisible(false)
      await deleteChallenge(challenge._id,user._id).
       then((res) => { 
            setVisible(true)
            const you = challenge.participants.find(participant => participant.user_id == user._id);
            const fileRef = ref(storage,you.video_url); 
            if(user._id == challenge.origin_id) 
              { 
               challenge.privacy === "Public"? getUserPublicChallenges(user._id , setUserPublicChallenges)
               :getUserPrivateChallenges(user._id , setUserPrivateChallenges)
               router.push({ pathname: '/profile',params: {
                 priv:challenge.privacy == "Private"?"true":"false", publ:challenge.privacy === "Public"? "true":"false",
                 participate:"false" , invited:"false" , strict :"false"
               
               } }) 
               }              
            else {
                 challenge.privacy === "Public"? getUserPublicChallenges(user._id , setPublicParticipateChallenges)
                 :getUserPrivateChallenges(user._id , setPrivateParticipateChallenges)
                 router.push({ pathname: '/profile',params: {
                   priv:challenge.privacy == "Private"?"false":"false", publ:challenge.privacy === "Public"? "false":"false",
                   participate:  challenge.privacy=="Public"?"true":"false" , 
                   invited: challenge.privacy=="Private" && challenge.audience !== "Strict" ?"true":"false" ,
                   strict : challenge.privacy=="Private" && challenge.audience == "Strict"?"true":"false"
                 } }) 
               }
            setTimeout(() => {
                  setVisible(false)
            }, 3500);

             deleteObject(fileRef)
               .then(() => {
                 console.log("File deleted successfully!");
                 // router.push('/profile')
               })
               .catch((error) => {
                 console.error("Error deleting file:", error);
               });  
             
              
       })
     
   }


    const confirmJoinChallenge  = ()=> {
    setIsModalVisible(true)
    if(canJoin){
        setAction("JN")
        setText("Are you sure you want to join the challenge")
    }else {
      setAction("OK")
      setText("this is a private challenge , you are not invited to participate")
    }
    }
    const confirmDeleteChallenge  = ()=> {
      setIsModalVisible(true)
      setAction("DT")
      setText("Are you sure you want to delete the challenge")
    }
    const confirmResignChallenge  = ()=> {
      setIsModalVisible(true)
      setAction("RS")
      setText("Are you sure you want to resign and delete your participation from the challenge")
    }
    
    
  useEffect(() => {
    !isVisibleVertical && (setIsListVisible(false),setIsInviteListVisible(false),setIsModeVisible(false),setDisplayDetail(false))
  }, [isVisibleVertical])
  
  useEffect(() => {
     isListVisible && hideNavigationBar
    isListVisible && (setIsInviteListVisible(false))
    isListVisible && setIsModeVisible(false)
    isListVisible && setDisplayDetail(false)

  }, [isListVisible])

  useEffect(() => {
    isInviteListVisible && (setIsListVisible(false))
    isInviteListVisible && setIsModeVisible(false)
    isInviteListVisible && setDisplayDetail(false)
  }, [isInviteListVisible])

  useEffect(() => {
    isModeVisible && (setIsListVisible(false))
    isModeVisible && setIsInviteListVisible(false)
    isModeVisible && setDisplayDetail(false)
  }, [isModeVisible])

  useEffect(() => {
    displayDetail && (setIsListVisible(false))
    displayDetail && setIsInviteListVisible(false)
    displayDetail && setIsModeVisible(false)
  }, [displayDetail])

  const handleModeChange = ()=> {
   updateChallenge && updateChallenge.audience !== selectedMode && 
   updateChallengeMode(challenge._id,{mode : selectedMode},setUpDateChallenge)
  }

  useEffect(() => {
    updateChallenge && updateChallenge.audience !== selectedMode && 
    updateChallengeMode(challenge._id,{mode : selectedMode},setUpDateChallenge)
  }, [selectedMode])



   if(isExpired) return <ChallengeExpired challenge_id={challenge._id}/>



  

  //  const setNavigationBarStyle = () => {
  //   NavigationBar.setVisibilityAsync('sticky-immersive');
  // };

  // useEffect(() => {
  //   setNavigationBarStyle();
  //   const subscription = AppState.addEventListener('change', state => {
  //     if (state === 'active') {
  //         setNavigationBarStyle();
  //     }
  //     });

  //   return () => {
  //     subscription.remove();
  //    };
  // }, [isModalVisible]);




  return (
    <>
    <View className="justify-start h-[740px] w-[100vw] mt-3 mb-3 items-center flex-col gap-0">
             <View className="min-w-full flex-1   border-t-2 border-gray-700 border-l-2 border-r-2
                  rounded-tl-lg rounded-tr-lg flex-row items-center justify-start min-h-[5%]">
                 <TouchableOpacity  
                  onPress={()=> router.navigate({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
                  className="w-[18%]  min-h-[90%] ml-0 border-2 rounded-lg bg-yellow-400  flex-col justify-center  items-center  ">
                    <Text className="text-gray-900 text-sm  font-bold font-pregular ">
                       View
                    </Text>
                 </TouchableOpacity>
                 
                 <View className="w-[62%] min-h-[97%] border-x-white bg-blue-1000  flex-col justify-center gap-1 items-center" >
             
                     <SwingingTitle text={challenge.desc} color="white" fontSize={10}/>
                       
             
                 </View>

                 {!ownChallenge? (          
                 <TouchableOpacity
                   onPress={
                    confirmJoinChallenge
                  }
                    style={{backgroundColor: !canJoin?"gray" :"lightblue"}}
                    className="w-[18%] rounded-md h-[90%] mr-0  border-2 flex-1 flex-col justify-center  items-center">
          
                    <Text
                    style={{color: !canJoin?"black" :""}}
                    className="text-blue-700 text-sm  font-bold font-pregular">
                       Join 
                    </Text>
                 </TouchableOpacity>
    
                ):(
                  <>
                  {challenge.participants.length == 1 ? 
                    (
                      <TouchableOpacity onPress={confirmDeleteChallenge}
                       className="w-[18%] h-[90%] flex-1 flex-col justify-center  rounded-md
                        bg-violet-300 items-center">
                        <Text className="text-red-700 text-sm font-bold font-pregular ">
                          Delete      
                        </Text>    
                      </TouchableOpacity>
                     ):(
                      <TouchableOpacity  onPress={confirmResignChallenge}
                       className="w-[20%] h-[90%] flex-col justify-center mr-1 rounded-lg  bg-pink-200 items-center">
                        <Text className="text-red-700 text-sm font-bold ">
                          Resign
                        </Text>
                      </TouchableOpacity>
                     )} 
                     </>
                     )}  
 
             </View>
             <View className="min-w-full flex-1  border-gray-700 border-l-2 border-r-2 
                   flex-row items-center justify-start min-h-[5%]">
                 <TouchableOpacity  
                  onPress={()=> router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
                  className="min-w-[24%]  h-[98%]  border-2 rounded-lg flex-col justify-center  items-center  "
                  >
                    <Text className="text-gray-50 text-sm  font-black font-pregular "
                      style={{fontSize:9}}>
                       CHALLENGE 
                    </Text>
                 </TouchableOpacity>

                 <View  className="min-w-[24%]  h-[98%]  border-2 rounded-lg flex-col justify-center  items-center  " >
                    <Text className="text-gray-50 text-sm  font-bold font-pregular "
                       style={{fontSize:9}}>
                        {challenge.type.toUpperCase()}
                    </Text>
                 </View>
                 <View  className="min-w-[24%]  h-[98%]  border-2 rounded-lg flex-col justify-center  items-center  " >
                    <Text className={challenge.privacy == "Public"?"text-blue-500 text-sm  font-black font-pregular ":
                                                          "text-red-500  font-black font-pregular "
                    }
                       style={{fontSize:9}}>
                        {challenge.privacy.toUpperCase()}
                     
                    </Text>
                 </View>
                
                 <TouchableOpacity  
                  onPress={!isFavourite?confirmAddToFavourite:confirmRemoveFromFavourite}
                  className="min-w-[25%]  h-[98%]  border-2 rounded-lg flex-row justify-center gap-3  items-center  "
                  >
                    <Text className="text-blue-400 text-sm  font-black font-pregular "
                    style={{fontSize:11}}>
                     {isFavourite?"FAV":"ADD"} 
                    </Text>
                    <Ionicons name='heart' size={18} color={isFavourite?"red":"pink"} />
                 </TouchableOpacity>

 
             </View>          
            
             <ParticipantPost  participants={challenge.participants} isVisibleVertical={isVisibleVertical} challenge={challenge} />
             
        
            <View className="min-w-full flex-1  bg-gray-800 flex-row items-center justify-evenly min-h-[5%] 
            border-b-2 border-gray-700 border-l-2 border-r-2 rounded-bl-lg rounded-br-lg">
                 
                 <TouchableOpacity
                   onPress={() =>{setIsInviteListVisible(!isInviteListVisible)}}
                   className="min-w-[20%]  flex-1 h-[90%]  bg-red-800 rounded-md
                   flex-col justify-center  items-center" >
                     <Text 
                     style={{fontSize:9}}
                     className="text-white text-xs font-black"> 
                         Invites 
                    </Text>
                 </TouchableOpacity>

                {challenge.origin_id == user._id && challenge.privacy == "Private" ? (
                    <TouchableOpacity 
                         onPress={() =>{setIsModeVisible(!isModeVisible)}}
                         className="min-w-[21%] min-h-[90%] flex-1 flex-row   border-2 rounded-sm
                                             gap-1 px-2 justify-center  items-center" >
                         <Text
                           style={{fontSize:10}}
                           className="text-Black text-xs font-bold ">
                        
                         </Text>
                         <Text
                           style={selectedMode=="Open"?{fontSize:10 ,color:"green"}:selectedMode == "Restricted"?
                           {fontSize:10  ,color:"pink"}:{fontSize:10,color:"red"} }
                           className="text-green-600 text-xs  font-black ">
                             {
                             !updateChallenge ? 
                             challenge.audience 
                             : updateChallenge.audience
                              }
                         </Text>
                    </TouchableOpacity>
                   ):(
                    <TouchableOpacity
                          onPress={() =>{setIsModeVisible(!isModeVisible)}}
                          className="min-w-[21%] min-h-[90%] flex-1 flex-row  border-2 rounded-sm
                                              gap-1 px-2 justify-center  items-center" >
                          <Text
                            style={selectedMode=="Open"?{fontSize:10 ,color:"white"}:selectedMode == "Restricted"?
                            {fontSize:10  ,color:"pink"}:{fontSize:10 ,color:"red"} }
                            className="text-gray-200 text-xs  font-black ">
                              {challenge.audience}
                          </Text>
                    </TouchableOpacity>
                   )}
                
                 
                 <TouchableOpacity 
                    onPress={() =>{setDisplayDetail(!displayDetail)}}
                    className="min-w-[21%] min-h-[90%] flex-1 flex-row  border-2 rounded-sm
                                          gap-1 px-2 justify-center  items-center" >
                        <Text
                          style={{fontSize:9}}
                          className="text-white text-xs font-black ">
                          View Details
                        </Text>             
                 </TouchableOpacity>
                 
                
                 <TouchableOpacity
                   onPress={() =>{setIsListVisible(!isListVisible)}}
                   className="min-w-[21%]  flex-1 h-[90%]  bg-blue-800 rounded-md
                   flex-col justify-center  items-center" >
                     <Text
                      style={{fontSize:9}}
                      className="text-white text-xs font-black"> Challengers </Text>
                 </TouchableOpacity>
      
            </View>

           
  
            
      </View>


         {isListVisible && (
            <DisplayChallengers friendList={challenge.participants} user = {user}   setIsListVisible={setIsListVisible} />
           )}

          {displayDetail && (
            <ViewDetail challenge ={challenge} />
           )}

          {isModalVisible && (  
                <CustomAlert text={text} action={action} isModalVisible={isModalVisible} removeFromFavourite={removeFromFavourite}
                       setIsModalVisible={setIsModalVisible} addToFavourite={addToFavourite} joinChallenge ={joinChallenge }
                       resignChallenge={resignChallenge} removeChallenge={removeChallenge}/>
            )}
         
         {isInviteListVisible && (
            <DisplayInvites inviteList={challenge.privacy =="Private"? challenge.invited_friends:[{sender_id:user._id,name:user.name,profile_img:user.profile_img}]} 
                            participantList ={challenge.participants} challenge={challenge}
                            isParticipant={challenge.participants.find(participant => participant.user_id == user._id)} user= {user}  />
           )}

          {isModeVisible && (
            <DisplayMode  modeData={modeDatae} setIsModeVisible={setIsModeVisible} selectedMode={selectedMode}
                          setSelectedMode ={setSelectedMode} isOwner={isOwner} action ={handleModeChange} />
           )}
        
          {visible && (
          <LoadModel visible={visible} setVisible={setVisible}/>
        )}

    </>
        
  )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover', // or 'contain', 'stretch', 'repeat'
      justifyContent: 'center', // Optional: center content vertically
      alignItems: 'center', // Optional: center content horizontally
    },
    text: {
      color: 'white', 
      fontSize: 24,
    },
  });