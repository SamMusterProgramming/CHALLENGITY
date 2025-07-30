import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getInition } from '../../helper'
import { acceptFriendRequest, deleteUserNotification, getNotificationByUser, removeFriendRequest, updateNotificationByUser } from '../../apiCalls';
import { router } from 'expo-router';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';

export default function DisplayNotification({notification,setNotifications,user,setDisplayNotificationsModal }) {

  const {userFriendData,setUserFriendData } = useGlobalContext()
  const name = notification.content.name;  
  const isRead = notification.isRead;
  let friendRequestNotif = false;
  let friendRequestAcceptNotif = false;
  let challengeNotif = false;
  let talentNotif = false;
  notification.type == "friend request" ? friendRequestNotif = true : 
  notification.type == "friends"? friendRequestAcceptNotif = true :
  notification.type == "followers"? challengeNotif =true : challengeNotif =false
  notification.type == "talent"? talentNotif =true : talentNotif =false

  const [not,setNot] = useState(notification)
  // const [userFriendData,setUserFriendData] = useState(null)

  const [type,setType] = useState(notification.type)


 
  const deleteNotification =()=>{
    deleteUserNotification(notification._id,setNot)
  }

  const handleViewChallenge = ()=> {   
    console.log(notification.content.challenge_id)
    updateNotificationByUser(notification._id,setNot)
    router.push({ pathname:'FSinstantChallengeDisplayer', params:{challenge_id:notification.content.challenge_id} })
   }

   const handleViewTalent = ()=> {   
    updateNotificationByUser(notification._id,setNot)
    setDisplayNotificationsModal(false)
    router.push({ pathname:'TalentContestRoom', params:{
      region:notification.content.region,
      selectedTalent:notification.content.talentName , 
      selectedIcon: icons.dance,
      regionIcon : icons.africa,
      startIntroduction :"true",
      showGo:"true",
      location : "contest",
      contestant_id : notification.content.sender_id
    } })
   }

  const acceptFRequest =()=>{
    const rawBody ={
      _id:user._id,
      name:user.name,
      email:user.email,
      profile_img:user.profile_img
    }
    acceptFriendRequest(notification.content.sender_id,rawBody,setUserFriendData)
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


  const handleAction = ()=> {
    setDisplayNotificationsModal(false)
     switch (notification.type) {
      case "talent":
        handleViewTalent();
        break;
      case "friends":
          router.navigate({ pathname: '/ViewProfile', params: {user_id:notification.content.sender_id} })
        break;
      default:
        break;
     }
  }

  return (
    <View
      style={{backgroundColor:isRead ?'rgba(90,90 , 90 , 0.5)' :'rgba(150,150 , 150 , 0.5)'}}
      className={isRead ? "w-[48vw] px-2 py-1 m-1 mb-2  g-[#96daf7] flex-col justify-between  rounded-lg rounde-tr-xl items-center "
            :"w-[48vw] px-2 py-1 m-1 mb-2 g-[#1499e0] flex-col justify-between  py- rounded-tl-xl rounded-lg items-center"}>
         <View
         className="w-[100%] px-1 flex-row justify-between items-end ">

             <TouchableOpacity 
              onPress={notification.type == "friend request" && !notification.isRead ? acceptFRequest : handleAction }
              className="w- [20%] p-2 flex-col bg-green-200 rounded-lg  justify-center items-center">
                  <Text className=" text- black font-bold"
                      style={{fontSize:8}} >
                      {notification.type == "friend request" && !notification.isRead ? "Accept" :"View"} 
                  </Text> 
             </TouchableOpacity>  

            <View className="flex-1 -12 flex-col gap-2 py- justify-center px- items-center">
              <Image
              className="w-6 h-6 rounded-full"
              source={{uri:notification.content.profile_img}}
                  />
              <View className="justify-end gap-1 items-start -[80%] flex-col">
                  <Text className=" text-black elevation-2xl font-black"
                    style={{fontSize:8 ,color: isRead ? "white":"white"}} >
                    {name.length > 15 ? name.slice(0,15) + '...': name}
              </Text> 
            
              </View>            
            </View> 

            <TouchableOpacity 
            onPress={notification.type == "friend request" && !notification.isRead ? denyFriendRequest:deleteNotification }
            className=" [20%]  py-2 px-2 flex-col  bg-red-200 rounded-lg  justify-center items-center">
                <Text className=" text-black font-bold"
                    style={{fontSize:8}} >
                       {notification.type == "friend request" && !notification.isRead ? "Ignore" : "Delete"} 
                </Text> 
           </TouchableOpacity>  

          
        </View> 
        <View className="w-[95%] min-h- mt-2 mb-1 min-h- [50px] py-2 px-2 bg-white mt  rounded-lg flex-row gap- justify-center items-center">
                  <Text className=" text-black text-center  font-bold"
                    style={{fontSize:8,color: isRead ? "gray":"black"}} >
                    {notification.message}
                  </Text> 
        </View>
      {/* <View className="w-[25%] h-12 flex-row gap- justify-evenly items-center">
        {isRead ? (
          <>
    
              <TouchableOpacity 
              onPress={ challengeNotif? handleViewChallenge : talentNotif? handleViewTalent: ()=> {} }
              className="w-[40%] h-8 flex-col bg-green-200 rounded-lg  justify-center items-center">
                  <Text className=" text- black font-bold"
                      style={{fontSize:8}} >
                      {challengeNotif ? "Play" :"View"} 
                  </Text> 
             </TouchableOpacity>  
    
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
            onPress={friendRequestNotif ? acceptFRequest : challengeNotif ? handleViewChallenge : talentNotif? handleViewTalent: ()=>{} }
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

  
      </View> */}
    
    </View>
  )
}