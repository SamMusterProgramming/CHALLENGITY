import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getInition } from '../../helper'
import { acceptFriendRequest, deleteUserNotification, getNotificationByUser, removeFriendRequest, updateNotificationByUser } from '../../apiCalls';
import { router } from 'expo-router';

export default function DisplayNotification({notification,setNotifications,user}) {
  const name = notification.content.name;  
  const isRead = notification.isRead;
  let friendRequestNotif = false;
  let friendRequestAcceptNotif = false;
  let challengeNotif = false;
  notification.type == "friend request" ? friendRequestNotif = true : 
  notification.type == "friends"? friendRequestAcceptNotif = true :
  notification.type == "followers"? challengeNotif =true : challengeNotif =false
  
  const [not,setNot] = useState(notification)
  const [userFriendData,setUserFriendData] = useState(null)

 
  const deleteNotification =()=>{
    deleteUserNotification(notification._id,setNot)
  }

  const handleViewChallenge = ()=> {   
    console.log(notification.content.challenge_id)
    updateNotificationByUser(notification._id,setNot)
    router.push({ pathname:'ChallengeDisplayer', params:{challenge_id:notification.content.challenge_id} })
   }

  const acceptFRequest =()=>{
    const rawBody ={
      _id:notification.content.sender_id,
      name:notification.content.name,
      email:notification.content.email,
      profile_img:notification.content.profile_img
    }
    acceptFriendRequest(user._id,rawBody,setUserFriendData)
  }

  const denyFriendRequest =()=>{
    console.log("fsdgfsdgsfgfsg")
    const rawBody ={
      _id:notification.content.sender_id,
      name:notification.content.name,
      email:notification.content.email,
      profile_img:notification.content.profile_img
    }
    removeFriendRequest(user._id,rawBody,setUserFriendData)
  }

  useEffect(() => {
    getNotificationByUser(user._id,setNotifications)
  }, [not,userFriendData])

  return (
    <View className={isRead ? "w-full h-12 bg-blue-100 flex-row justify-start items-center "
            :"w-full h-12 bg-blue-300 flex-row justify-start items-center"}>
      
      <View className="w-[30%] h-12 flex-row gap-2 justify-center items-center">
        <Image
        className="w-10 h-10 rounded-md"
        source={{uri:notification.content.profile_img}}
            />

        <View className="justify-end gap-1 items-start h-[80%] flex-col">
            <Text className=" text-black font-bold"
              style={{fontSize:8}} >
               {name.length > 15 ? name.slice(0,15) + '...': name}
            </Text> 
            <Text className=" text-primary font-bold"
            style={{fontSize:10}}>
               {getInition(notification.content.name)}Challenger
            </Text>
        </View>            
      </View> 

      <View className="w-[40%] h-12 flex-row gap-2 justify-center items-center">
            <Text className=" text-black font-bold"
              style={{fontSize:9}} >
               {notification.message}
            </Text> 
      </View>

      <View className="w-[30%] h-12 flex-row gap-2 justify-center items-center">
        {isRead ? (
           <TouchableOpacity 
            onPress={deleteNotification}
            className="w-[40%] h-8 flex-col ml-[45%] bg-gray-400 rounded-lg  justify-center items-center">
                <Text className=" text-white font-bold"
                    style={{fontSize:9}} >
                        Delete
                </Text> 
           </TouchableOpacity>  
        ):(
            <>
            <TouchableOpacity 
            onPress={friendRequestNotif ? acceptFRequest : challengeNotif ? handleViewChallenge : ()=>{} }
            className="w-[40%] h-8 flex-col bg-green-500 rounded-lg  justify-center items-center">
                <Text className=" text-black font-bold"
                    style={{fontSize:9}} >
                    {friendRequestNotif ? "accept" : challengeNotif ? "View" : "" }
                </Text> 
           </TouchableOpacity>  
            <TouchableOpacity
            onPress={friendRequestNotif ? denyFriendRequest : challengeNotif ? deleteNotification : ()=>{} }
            className="w-[40%] h-8 flex-col bg-gray-400 rounded-lg  justify-center items-center">
                <Text className=" text-white font-bold"
                    style={{fontSize:9}} >
                    {friendRequestNotif ? "deny" : challengeNotif ? "ignore" : "delete" }
                </Text> 
           </TouchableOpacity>  
           </>
        )
        }
        {/* <TouchableOpacity
            className="w-[50%] h-8 flex-col bg-pink-300 rounded-lg  justify-center items-center">
            <Text className=" text-black font-bold"
                style={{fontSize:9}} >
                 Accept
            </Text> 
        </TouchableOpacity>   */}
      </View>

    
    </View>
  )
}