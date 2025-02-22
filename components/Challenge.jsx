import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../constants'
import ParticipantPost from './ParticipantPost'
import { findTopChallengers } from '../helper'
import { Video } from 'expo-av'
import { useGlobalContext } from '../context/GlobalProvider'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { storage } from '../firebase'
import { router } from 'expo-router'
import { deleteChallenge, getUserChallenges, getUserParticipateChallenges, quitChallenge } from '../apiCalls'


export default function Challenge({challenge,isVisibleVertical}) {

    const[topChallenger , setTopChallenger] = useState(challenge.participants[0])
    const [ownChallenge , setOwnChallenge ] = useState(false)
    const {user,SetUser,userChallenges , setUserChallenges,setParticipateChallenges} = useGlobalContext()


    useEffect(() => {
     const top = findTopChallengers(challenge.participants)
     setTopChallenger(top)
    }, [])

    useEffect(() => {
      challenge.participants.map(participant =>{
        if(participant.user_id === user._id) {
            setOwnChallenge( prev => !prev)
         } 
      })
      }, [])

      const handleQuit = async() => {
        await quitChallenge(challenge._id,user._id).
        then(res => {
          const you = challenge.participants.find(participant => participant.user_id == user._id)
           const fileRef = ref(storage,you.video_url); 
           deleteObject(fileRef)
            .then(() => {
             console.log("File deleted successfully!");
             router.push('/timeline')
             })
            .catch((error) => {
            console.error("Error deleting file:", error);
             });  
            //  getTopChallenges(props.user._id,setTopChallenges)
             getUserParticipateChallenges(user._id,setParticipateChallenges)
            //  navigate('/home')
   
        })
      
}

    const handleDelete = async() => {
        console.log("mherrre")
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
                  getUserChallenges(user._id , setUserChallenges)
                  router.push('/profile')
                  }
                  else getUserParticipateChallenges(user._id,setParticipateChallenges)
                // router('/timeline')
        })
      
    }
    
  return (
    
    <View className="justify-start h-[780px] w-[100vw] mt- items-center flex-col gap-0">
           
             <View className="min-w-full flex-1 bg-white rounded-md flex-row items-center justify-start min-h-[5%]">
                 <TouchableOpacity  
                  onPress={()=> router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
                 className="min-w-[18%]  min-h-[95%] rounded-md bg-secondary-100 flex-1 flex-col justify-center  items-center  ">
                    <Text className="text-blue-800 text-sm  font-bold font-pregular ">
                       Challenge
                    </Text>
                 </TouchableOpacity>
                 
                 <View className="min-w-[58%] min-h-[97%] border-x-white bg-blue-1000 flex-1 flex-col justify-center gap-1 items-center" >
                     <Text className="text-black text-xs font-bold  backdrop-opacity-100">
                       -{challenge.desc}-
                     </Text>
                 </View>

                 {!ownChallenge? (          
                 <TouchableOpacity onPress={()=> router.push({ pathname: '/CreateParticipateChallenge', params: {challenge_id:challenge._id} })}
                   className="min-w-[20%] rounded-md min-h-[95%] border-pink-500 bg-blue-300 flex-1 flex-col justify-center  items-center">
                    <Text className="text-green-800 text-xl font-bold font-pregular ">
                       Join 
                    </Text>
                 </TouchableOpacity>
    
                ):(
                  <>
                  {challenge.participants.length == 1 ? 
                    (
                      <TouchableOpacity onPress={handleDelete}
                       className="min-w-[20%] min-h-[95%] flex-1 flex-col justify-center  bg-violet-300 items-center">
                        <Text className="text-red-500 text- font-bold ">
                          Delete
                        </Text>    
                      </TouchableOpacity>
                     ):(
                      <TouchableOpacity  onPress={handleQuit}
                       className="w-[20%] min-h-[95%] flex-col justify-center  bg-pink-200 items-center">
                        <Text className="text-red-700 text- font-bold ">
                          Resign
                        </Text>
                      </TouchableOpacity>
                     )} 
                     </>
                     )}  
 
             </View>

            
            
             <ParticipantPost  participants={challenge.participants} isVisibleVertical={isVisibleVertical} challenge={challenge} />
             
        
            <View className="min-w-full flex-1 bg-white flex-row items-center justify-center min-h-[5%]">
            
                 <View className="min-w-[25%] min-h-[100%] flex-1 flex-col justify-center  items-center" >
                     <Text className="text-gray-800 text-xs font-bold  ">Created By</Text>
                     <Text className="text-secondary-200 text-xs font-bold  ">{challenge.name.slice(0,13)}</Text>
                 </View>
                 <View className="min-w-[25%] min-h-[100%] flex-1 flex-col justify-center items-center" >
                     <Text className="text-gray-800 text-xs font-bold  ">Type</Text>
                     <Text className="text-secondary-100 text-xs font-bold  ">{challenge.type}</Text>
                 </View>
                 <View className="min-w-[30%] min-h-[100%] flex-1 flex-col justify-center items-center" >
                    <Text className="text-gray-800 text-xs font-bold  ">Privacy</Text>
                    <Text className="text-secondary-200 text-xs font-bold  ">{challenge.privacy}</Text>
                 </View>
                 <View className="min-w-[20%] min-h-[100%] flex-1 flex-col justify-center  items-center" >
                     <Text className="text-gray-800 text-xs font-bold  "> Participants </Text>
                     <Text className="text-secondary text-xs font-bold ">{challenge.participants.length}</Text>
                 </View>
      
            </View>
            <View  className="min-w-full min-h-5 bg-black"/>
          </View>
        
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