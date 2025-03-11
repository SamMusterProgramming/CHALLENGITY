import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
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
   removeChallengeFromFavourite} from '../../apiCalls'
import ParticipantPost from './ParticipantPost'
import SwingingTitle from '../custom/SwingingTitle'
import { Ionicons } from '@expo/vector-icons'
import ChallengeExpired from './ChallengeExpired'
import CustomAlert from '../custom/CustomAlert'


export default function Challenge({challenge,isVisibleVertical}) {

    const[topChallenger , setTopChallenger] = useState(challenge.participants[0])
    const [ownChallenge , setOwnChallenge ] = useState(false)
    const {user,SetUser,userPublicChallenges , setUserPublicChallenges,serPrivateChallenges , setUserPrivateChallenges,
      privateParticipateChallenges,setPrivateParticipateChallenges,favouriteChallenge , setFavouriteChallenge,
      setPublicParticipateChallenges,publicParticipateChallenges} = useGlobalContext()

    const[canJoin,setCanJoin] = useState(false)
    const[isFavourite,setIsFavourite] = useState(false)
    const[isExpired ,setIsExpired] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState("");
    const [text,setText] = useState()


    useEffect(() => {
     const top = findTopChallengers(challenge.participants)
     setTopChallenger(top)   
    }, [])
    

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
      await quitChallenge(challenge._id,user._id).
      then(res => {
        const you = challenge.participants.find(participant => participant.user_id == user._id)
         const fileRef = ref(storage,you.video_url); 
         deleteObject(fileRef)
          .then(() => {
           console.log("File deleted successfully!");
           router.replace('/profile')
           })
          .catch((error) => {
          console.error("Error deleting file:", error);
           });  
          //  getTopChallenges(props.user._id,setTopChallenges)
          challenge.privacy == "Public"? getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
          :getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
          router.push('/profile')

 
      })
    }

    const removeChallenge = async() => {
  
      await deleteChallenge(challenge._id,user._id).
       then((res) => { 
             const you = challenge.participants.find(participant => participant.user_id == user._id);
             const fileRef = ref(storage,you.video_url); 
         
             deleteObject(fileRef)
               .then(() => {
                 console.log("File deleted successfully!");
                 // router.push('/profile')
               })
               .catch((error) => {
                 console.error("Error deleting file:", error);
               });  
               if(user._id == challenge.origin_id) 
                { 
                 challenge.privacy === "Public"? getUserPublicChallenges(user._id , setUserPublicChallenges)
                 :getUserPrivateChallenges(user._id , setUserPrivateChallenges)
                 router.push({ pathname: '/profile',params: {
                   priv:selectedPrivacy == "Private"?"true":"false", publ:selectedPrivacy === "Public"? "true":"false",
                   yourChallenges:"true" , yourParticipations:"false"
                 } }) 
                 }
                 else {
                   challenge.privacy === "Public"? getUserPublicChallenges(user._id , setPublicParticipateChallenges)
                   :getUserPrivateChallenges(user._id , setPrivateParticipateChallenges)
                   router.push({ pathname: '/profile',params: {
                     priv:selectedPrivacy == "Private"?"true":"false", publ:selectedPrivacy === "Public"? "true":"false",
                     yourChallenges:"false" , yourParticipations:"true"
                   } }) 
                 }
              
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
    
    


   if(isExpired) return <ChallengeExpired challenge_id={challenge._id}/>


  return (
    <>
    <View className="justify-start h-[740px] w-[100vw] mt-3 mb-3 items-center flex-col gap-0">
     
             <View className="min-w-full flex-1 border-t-2 border-gray-700 border-l-2 border-r-2 rounded-tl-lg rounded-tr-lg
                   flex-row items-center justify-start min-h-[4%]">
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
                    <Text className="text-gray-50 text-sm  font-black font-pregular "
                       style={{fontSize:9}}>
                       Posted {getTimeLapse(challenge.createdAt)} ago
                    </Text>
                 </View>
                 <View  className="min-w-[24%]  h-[98%]  border-2 rounded-lg flex-col justify-center  items-center  " >
                    <Text className="text-gray-50 text-sm  font-black font-pregular "
                       style={{fontSize:9}}>
                        {challenge.participants.length}{'   '}Participants
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

             <View className="min-w-full flex-1  rounded-  border-gray-700 border-l-2 border-r-2
                   flex-row items-center justify-start min-h-[4%]">
                 <TouchableOpacity  
                  onPress={()=> router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
                  className="min-w-[18%]  min-h-[98%] ml-1 border-secondary-200 border-2 rounded-lg bg-yellow-400 flex-1 flex-col justify-center  items-center  ">
                    <Text className="text-gray-900 text-sm  font-bold font-pregular ">
                       View
                    </Text>
                 </TouchableOpacity>
                 
                 <View className="w-[60%] min-h-[97%] border-x-white bg-blue-1000  flex-col justify-center gap-1 items-center" >
                     {/* <Text className="text-black text-xs font-bold  backdrop-opacity-100"> */}
                     <SwingingTitle text={challenge.desc} color="white" fontSize={11}/>
                       
                     {/* </Text> */}
                 </View>

                 {!ownChallenge? (          
                 <TouchableOpacity
                   onPress={
                    confirmJoinChallenge
                    // ()=> canJoin && router.push({ pathname: '/CreateParticipateChallenge', params: {challenge_id:challenge._id} })
                  }
                    style={{backgroundColor: !canJoin?"gray" :"lightblue"}}
                    className="min-w-[18%] rounded-md min-h-[95%] mr-1  border-blue-300 border-2 flex-1 flex-col justify-center  items-center">
                    
                    <Text
                    style={{color: !canJoin?"black" :""}}
                    className="text-blue-700 text-sm font-bold font-pregular ">
                       Join 
                    </Text>
                 </TouchableOpacity>
    
                ):(
                  <>
                  {challenge.participants.length == 1 ? 
                    (
                      <TouchableOpacity onPress={confirmDeleteChallenge}
                       className="min-w-[20%] min-h-[95%] flex-1 flex-col justify-center mr-1 rounded-lg
                        border-violet-600 border-2 bg-violet-300 items-center">
                        <Text className="text-red-500 text-sm font-bold ">
                          Delete      
                        </Text>    
                      </TouchableOpacity>
                     ):(
                      <TouchableOpacity  onPress={confirmResignChallenge}
                       className="w-[20%] min-h-[95%] flex-col justify-center mr-1 rounded-lg  border-pink-400 border-2 bg-pink-200 items-center">
                        <Text className="text-red-700 text-sm font-bold ">
                          Resign
                        </Text>
                      </TouchableOpacity>
                     )} 
                     </>
                     )}  
 
             </View>

            
            
             <ParticipantPost  participants={challenge.participants} isVisibleVertical={isVisibleVertical} challenge={challenge} />
             
        
            <View className="min-w-full flex-1 bg-gray-800 flex-row items-center justify-center min-h-[5%]
            border-b-2 border-gray-700 border-l-2 border-r-2 rounded-bl-lg rounded-br-lg">
            
                 <View className="min-w-[25%] min-h-[100%] flex-1 flex-col justify-center  items-center" >
                     <Text className=" text-gray-200 text-xs font-bold  ">Created By</Text>
                     <Text className="text-secondary-200 text-xs font-bold  ">{challenge.name.slice(0,13)}</Text>
                 </View>
                 <View className="min-w-[25%] min-h-[100%] flex-1 flex-col justify-center items-center" >
                     <Text className="text-gray-200 text-xs font-bold  ">Type</Text>
                     <Text className="text-secondary-100 text-xs font-bold  ">{challenge.type.toLowerCase()}</Text>
                 </View>
                 <View className="min-w-[30%] min-h-[100%] flex-1 flex-col justify-center items-center" >
                    <Text className="text-gray-200 text-xs font-bold  ">Privacy</Text>
                    <Text className="text-secondary-200 text-xs font-bold  ">{challenge.privacy}</Text>
                 </View>
                 <View className="min-w-[20%] min-h-[100%] flex-1 flex-col justify-center  items-center" >
                     <Text className="text-gray-200 text-xs font-bold  "> Participants </Text>
                     <Text className="text-secondary text-xs font-bold ">{challenge.participants.length}</Text>
                 </View>
      
            </View>

            
      </View>

      
        {isModalVisible && (
          <CustomAlert text={text} action={action} isModalVisible={isModalVisible} removeFromFavourite={removeFromFavourite}
                       setIsModalVisible={setIsModalVisible} addToFavourite={addToFavourite} joinChallenge ={joinChallenge }
                       resignChallenge={resignChallenge} removeChallenge={removeChallenge}/>
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