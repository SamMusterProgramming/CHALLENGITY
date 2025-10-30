import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getIcon, getInition } from '../../helper'
import { acceptFriendRequest, deleteUserNotification, getNotificationByUser, removeFriendRequest, updateNotificationByUser } from '../../apiCalls';
import { router } from 'expo-router';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
    <View
      style={{
        // backgroundColor:isRead ?'rgba(250,250 , 250 , 0.5)' :'rgba(255,255 , 255 ,1)'
      }}
      className={isRead ? "w-[100%] h-[60px] bg-[#000000] border-b-2 border-white mb-1 shad ow-xl  elevation-lg  flex-row justify-between    items-center "
                        :"w-[100%] h-[60px] bg-[#2b2c2e] mb-1 shad ow-xl elevation-lg flex-row justify-between     items-center"}>
         
         <TouchableOpacity
                onPress={()=> {router.push({ pathname: '/ViewProfile', params: {user_id:notification.content.sender_id} })}}
                style ={{
                  // backgroundColor : notification.isRead ? "#050505" : "#a3a5a8"
                }}
                 className="h-[100%] flex-col  items-center justify-center bg -white px-2 py- 1 shadow-xl">
                   <Image
                                style={{ width:45 , height:45}}
                                className="w-5 h-5 rounded-full"
                                source={{uri:notification.content.profile_img }}
                                    />   
                   {/* <Image
                                style={{ width:30 , height:30}}
                                className="w-10 h-10 absolute right-0 bottom-2 rounded-full b g-blue-500"
                                source={ (notification.type == "friends" || notification.type == "friend request") ?
                                  icons.accept :  notification.type == "talent" ? icons.talent :
                                  icons.challenge}
                                    /> */}
                     <View
                          className="w- 0 h- 0 absolute right-0 bottom-2 b g-black">
                                <MaterialCommunityIcons name={notification.type == "friends" || notification.type == "friend request" ?
                                  "account" :  notification.type == "talent" ? "star" :
                                  "sword-cross"} size={25} color = "lightblue" />
                     </View>
         </TouchableOpacity>
         
         <View
         className={isRead ? "h- [100%] flex-1 px-1 flex-col sha dow-xl  justify-center items-center  bg -[#ffffff]  "
          :"h- [100%] flex-1 px- 1 flex-col sha dow-xl  justify-center items-center  b g-[#cfe3f2] "}
         >
              {/* <View
              className="w-[100%] h-[100%] b g-[#fddcdc] flex-col justify-center items-start "> */}
                          <View
                              className=" w-[100%] h- [100%] b g-[#ffffff]  flex-row   gap-2 px-2 py-1 justify-start items-center">  
                                
                                <Text className=" text-white  font-black"
                                style={{ fontSize:9 }}
                                >
                                    {notification.content.name}
                                </Text> 

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
                                  className = "flex-row w-[100%] px- 12 flex-1 gap-2 justify-start items-center">
                                  
                                    <Text className=" text-yellow-400   font-black"
                                            style={{fontSize:9}}
                                             >
                                            challenge Contest
                                    </Text> 

                                    <TouchableOpacity 
                                        onPress={handleAction}
                                        className=" h- [100%] b g-[#ffffff] ml-auto flex-row-reverse rounded-br-3xl  gap-2 px-2 py- 1 justify-center items-center">  
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

                                {/* {notification.type == "talent" && (
                                <View
                                  className = "flex-row w-[100%] px- 12 flex-1 gap-2 justify-start items-center">
                                   
                                    <Text className=" text-yellow-400   font-black"
                                            style={{fontSize:9}}
                                             >
                                            {notification.content.talentName} Contest
                                    </Text> 
                                    <TouchableOpacity 
                                        onPress={handleAction}
                                        className=" h- [100%] ml-auto bg- [#eeeded] flex-row-reverse rounded-br-3xl  gap-2 px-2 py-1 justify-center items-center">  
                                            <Image
                                            style={{ width:20 , height:20}}
                                            className="w-8 h-8 rounded-full bg-blue-500"
                                            source={icons.play}
                                                />
                                            <Text className=" text-white  font-black"
                                            style={{ fontSize:10 }}
                                            >
                                                Play 
                                            </Text> 
                                      </TouchableOpacity>  
                                   
                                </View>
                                )} */}

                                {/* {notification.type == "followers" && (
                                <View
                                  className = "flex-row w-[100%] px- 12 flex-1 gap-2 justify-start items-center">
                                  
                                    <Text className=" text-yellow-400   font-black"
                                            style={{fontSize:9}}
                                             >
                                            challenge Contest
                                    </Text> 

                                    <TouchableOpacity 
                                        onPress={handleAction}
                                        className=" h- [100%] b g-[#ffffff] ml-auto flex-row-reverse rounded-br-3xl  gap-2 px-2 py-1 justify-center items-center">  
                                            <Image
                                            style={{ width:20 , height:20}}
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
                                )} */}
                                {/* {(notification.type == "friend request" && !notification.isRead) && (
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
                                )} */}

                          </View>
 
                          {/* {notification.type == "talent" && (
                          <>
                          <View
                          className = "absolute left-1 top-1 flex-col justify-start items-center">
                               <Image
                                className="w-5 h-5 rounded-full b g-blue-500"
                                source={getIcon(notification.content.talentName)}
                                    />
                                <Text className=" text-gray-100   font-black"
                                  style={{fontSize:6,color: isRead ? "white":"white"}} >
                                  {notification.content.talentName}
                                </Text> 
                          </View>
                          <View
                              className = "absolute right-1 bottom-1 flex-col justify-start items-center">
                                         <Image
                                          className="w-5 h-5 rounded-full b g-blue-500"
                                          source={getIcon(notification.content.region)}
                                              />
                                          <Text className=" text-gray-100   font-black"
                                            style={{fontSize:7,color: isRead ? "white":"white"}} >
                                            {notification.content.region}
                                          </Text> 
                           </View>
                           </>
                          )} */}


                          {/* {notification.type == "followers" && (
                          <>
                          <View
                          className = "absolute left-1 top-1  flex-col justify-start items-center">
                                          <Image
                                          className="w-5 h-5 rounded-full b g-blue-500"
                                          source={getIcon(notification.content.challengeType)}
                                              />
                                          <Text className=" text-gray-100   font-black"
                                            style={{fontSize:6,color: isRead ? "black":"black"}} >
                                            {notification.content.challengeType}
                                          </Text> 
                          </View>
                          <View
                              className = "absolute right-1 top-1 flex-col justify-start items-center">
                                
                                         <Image
                                          className="w-5 h-5 rounded-full b g-blue-500"
                                          source={getIcon(notification.content.challengePrivacy)}
                                              />
                                          <Text className=" text-gray-100   font-black"
                                            style={{fontSize:6,color: isRead ? "black":"black"}} >
                                            {notification.content.challengePrivacy}
                                          </Text> 
                                   
                           </View>
                           </>
                          )} */}

              {/* </View> */}
             
        </View> 


        <TouchableOpacity
         onPress={notification.type == "friend request" && !notification.isRead ? denyFriendRequest:deleteNotification }
         style = {{
          // backgroundColor : notification.isRead ? "white" : "#cfe3f2"
            }}
          className="h-[100%] flex-col  items-center justify-center bg -white px-2 py- 1 elevation-lg sha dow-md">
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
        </TouchableOpacity>
    
    </View>
  )
}