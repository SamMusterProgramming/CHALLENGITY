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
  const [type,setType] = useState(notification.type)


 
  const deleteNotification =()=>{
    deleteUserNotification(notification._id,setNot)
  }

  const handleViewChallenge = ()=> {   
    console.log(notification.content.challenge_id)
    updateNotificationByUser(notification._id,setNot)
    router.push({ pathname:'FSinstantChallengeDisplayer', params:{challenge_id:notification.content.challenge_id} })
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
    <View className={isRead ? "w-full h-12 bg-[#96daf7] flex-row justify-start py-2 rounded-tl-xl rounded-tr-xl items-center "
            :"w-full h-12 bg-[#1499e0] flex-row justify-start py-2 rounded-tl-xl rounded-tr-xl items-center"}>
      
      <View className="w-[25%] h-12 flex-row gap-2 py-2 justify-start px-1 items-end">
        <Image
        className="w-8 h-8 rounded-full"
        source={{uri:notification.content.profile_img}}
            />
        <View className="justify-end gap-1 items-start h-[80%] flex-col">
            <Text className=" text-black font-bold"
              style={{fontSize:8 ,color: isRead ? "black":"white"}} >
               {name.length > 15 ? name.slice(0,15) + '...': name}
            </Text> 
            <Text className=" text-white font-black"
            style={{fontSize:8 ,color: isRead ? "black":"white"}}>
               {getInition(notification.content.name)}Challenger
            </Text>
        </View>            
      </View> 

      <View className="w-[50%] h-12 flex-row gap-2 justify-center items-center">
            <Text className=" text-black font-bold"
              style={{fontSize:8,color: isRead ? "black":"white"}} >
               {notification.message}
            </Text> 
      </View>

      <View className="w-[25%] h-12 flex-row gap- justify-evenly items-center">
        {isRead ? (
          <>
          {/* {challengeNotif &&  ( */}
              <TouchableOpacity 
              onPress={ challengeNotif? handleViewChallenge : ()=> {} }
              className="w-[40%] h-8 flex-col bg-green-200 rounded-lg  justify-center items-center">
                  <Text className=" text- black font-bold"
                      style={{fontSize:8}} >
                      {challengeNotif ? "Play" :"View"} 
                  </Text> 
             </TouchableOpacity>  
          {/* )} */}
           <TouchableOpacity 
            onPress={deleteNotification}
            className="w-[40%] h-8 flex-col  bg-red-200 rounded-lg  justify-center items-center">
                <Text className=" text-black font-bold"
                    style={{fontSize:8}} >
                        Delete
                </Text> 
           </TouchableOpacity>  
          </>
        ):(
            <>
            <TouchableOpacity 
            onPress={friendRequestNotif ? acceptFRequest : challengeNotif ? handleViewChallenge : ()=>{} }
            className="w-[40%] h-8 flex-col bg-green-500 rounded-lg  justify-center items-center">
                <Text className=" text-black font-bold"
                    style={{fontSize:7}} >
                    {friendRequestNotif ? "Accept" : challengeNotif ? "Play" : "" }
                </Text> 
           </TouchableOpacity>  
            <TouchableOpacity
            onPress={friendRequestNotif ? denyFriendRequest : challengeNotif ? deleteNotification : ()=>{} }
            className="w-[40%] h-8 flex-col bg-red-400 rounded-lg  justify-center items-center">
                <Text className=" text-black font-bold"
                    style={{fontSize:8}} >
                    {friendRequestNotif ? "Deny" : challengeNotif ? "Ignore" : "Delete" }
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