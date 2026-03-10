import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getIcon, getInition, getStageLogo } from '../../helper'
import { acceptFriendRequest, deleteUserNotification, getNotificationByUser, removeFriendRequest, updateNotificationByUser } from '../../apiCalls';
import { router } from 'expo-router';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export default function DisplayNotification({notification,setNotifications,user,setDisplayNotificationsModal }) {

  const {userFriendData,setUserFriendData } = useGlobalContext()
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
  const { width, height } = useWindowDimensions();

  const [name , setName] = useState(null)


  useEffect(() => {
      const splitName = notification.content.name.split(" ")
      setName({
      part1 : splitName[0],
      part2: splitName[1]
       })
  }, [])

 
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
    router.push({ pathname:'TalentContestRoom', params:{
      region:notification.content.region,
      selectedTalent:notification.content.talentName,
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
     switch (notification.type) {
      case "talent":
        handleViewTalent();
        break;
      case "followers":
        handleViewChallenge();
        break;
      case "friends":
          router.navigate({ pathname: '/ViewProfile', params: {user_id:notification.content.sender_id} })
        break;
      default:
        break;
     }
  }

  
  return (
    <ReanimatedSwipeable
    // renderRightActions={renderRightActions}
    onSwipeableOpen={() => deleteNotification()}   >

        <TouchableOpacity  
           onPress={handleAction}
           className={isRead ? " bg-zinc-800/80 border border-yellow-400/20 rounded-xl p-2 mb-3 gap-2 elevation-lg flex-row   "
                        :" bg-zinc-800/20 border border-yellow-400/20 rounded-xl p-2 mb-3 gap-2  elevation-lg flex-row "}>
        
        
         <View
              
                 className="flex-row gap-2 items-end ">
                    <Image
                                          resizeMethod='contain'
                                          style= {{width :width/9 , height:height/9}}
                                          // className="w-12 h-12 "
                                          source={getStageLogo(notification.content.talentName)}
                                              />
              
               
         </View>
         
         <View
         className={isRead ? " flex-1 px-1 flex-col   justify-start p-2 items-start  bg -[#ffffff]  "
          :"flex-1 px- 1 flex-col   justify-center items-center  b g-[#cfe3f2] "} >
                  <Text className="text-white mb-2 font-semibold text-[13px]">
                         Dancing Stage
                  </Text>
                  <Text className=" text-yellow-100   font-bold"
                                  style={{fontSize:width/40,color: isRead ? "white":"white"}} >
                                  {notification.content.name}
                  </Text> 
                  <Text className=" text-yellow-100   font-bold"
                                  style={{fontSize:10,color: isRead ? "white":"white"}} >
                                  {notification.message}
                  </Text> 
           
                          {/* <View
                              className="   flex-row   gap-2 px-2 py-1 justify-start items-center">  
                                
                                {notification.type == "talent" && (
                                <View
                                  className = "flex-row w- [100%] px- 12 flex-1 gap-2 justify-start items-center">
                                   
                                    <Text className=" text-yellow-400   font-black"
                                            style={{fontSize:9}}
                                             >
                                            {notification.content.talentName} Contest
                                    </Text> 
                                    <TouchableOpacity 
                                        onPress={handleAction}
                                        className=" h- [100%] ml-auto bg- [#eeeded] flex-row-reverse rounded-br-3xl  gap-2 px-2 py- 1 justify-center items-center">  
                                            <Image
                                            style={{ width:15 , height:15}}
                                            className="w-8 h-8 rounded-full bg-blue-500"
                                            source={icons.play}
                                                />
                                            <Text className=" text-white  font-black"
                                            style={{ fontSize:9 }}
                                            >
                                                Play 
                                            </Text> 
                                      </TouchableOpacity>  
                                   
                                </View>
                                )}
                                {notification.type == "followers" && (
                                <View
                                  className = "flex-row w- [100%] px- 12 flex-1 gap-2 justify-start items-center">
                                  
                                    <Text className=" text-yellow-400   font-black"
                                            style={{fontSize:9}}
                                             >
                                            challenge Contest
                                    </Text> 

                           
                                   
                                </View>
                                )}
                                 {(notification.type == "friend request" && !notification.isRead) && (
                                <TouchableOpacity
                                  onPress={acceptFRequest}
                                  className = "flex-row w-[100%] px- 12 flex-1 gap-2 justify-start items-center"> 
                                      <Image
                                      style={{ width:20 , height:20}}
                                      className="w-8 h-8 rounded-full b g-blue-500"
                                      source={icons.accept}
                                          />
                                      <Text className=" text-white  font-black"
                                      style={{ fontSize:9 }}
                                      >
                                          Accept Request
                                      </Text> 
                                </TouchableOpacity>  
                                )}

                          </View> 

                           <View
                           className="flex- 1 w-[100%] px-2 flex-col justify-center items-start">
                                <Text className=" text-gray-100   font-bold"
                                  style={{fontSize:10,color: isRead ? "white":"white"}} >
                                  {notification.message}
                           </Text> 
             
            </View>  */}
        </View>


        {/* <TouchableOpacity
         onPress={notification.type == "friend request" && !notification.isRead ? denyFriendRequest:deleteNotification }
         style = {{
            }}
          className="h- [100%] flex-col  items-center justify-center bg -white px-2 py- 1 elevation-lg sha dow-md">
                <View className="h- [100%] p-1">
                    <Ionicons name="notifications-outline" size={24} color="white" />
                   {!notification.isRead && (<View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />)} 
                </View>
                <TouchableOpacity 
                      onPress={notification.type == "friend request" && !notification.isRead ? denyFriendRequest:deleteNotification }
                      className="  justify-center items-center">
                          <Text className=" font-bold text-white"
                              style={{fontSize:9}} >
                                {notification.type == "friend request" && !notification.isRead ? "Deny" : "Delete"} 
                          </Text> 
                </TouchableOpacity>  
        </TouchableOpacity> */}

         </TouchableOpacity>
      </ReanimatedSwipeable>
     
  )

}