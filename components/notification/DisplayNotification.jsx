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

  
  // return (
  //   <ReanimatedSwipeable
  //   // renderRightActions={renderRightActions}
  //   onSwipeableOpen={() => deleteNotification()}   >

  //       <TouchableOpacity  
  //          onPress={handleAction}
  //          className={isRead ? " bg-zinc-800/80 border border-yellow-400/20 rounded-xl p-2 mb-3 gap-2 elevation-lg flex-row   "
  //                       :" bg-zinc-800/20 border border-yellow-400/20 rounded-xl p-2 mb-3 gap-2  elevation-lg flex-row "}>
        
        
  //        <View
              
  //                className="flex-row gap-2 items-end ">
  //                   <Image
  //                                         resizeMethod='contain'
  //                                         style= {{width :width/9 , height:height/9}}
  //                                         // className="w-12 h-12 "
  //                                         source={getStageLogo(notification.content.talentName)}
  //                                             />
              
               
  //        </View>
         
  //        <View
  //        className={isRead ? " flex-1 px-1 flex-col   justify-start p-2 items-start  bg -[#ffffff]  "
  //         :"flex-1 px- 1 flex-col   justify-center items-center  b g-[#cfe3f2] "} >
  //                 <Text className="text-white mb-2 font-semibold text-[13px]">
  //                        Dancing Stage
  //                 </Text>
  //                 <Text className=" text-yellow-100   font-bold"
  //                                 style={{fontSize:width/40,color: isRead ? "white":"white"}} >
  //                                 {notification.content.name}
  //                 </Text> 
  //                 <Text className=" text-yellow-100   font-bold"
  //                                 style={{fontSize:10,color: isRead ? "white":"white"}} >
  //                                 {notification.message}
  //                 </Text> 
           
                         
  //       </View>

  //        </TouchableOpacity>
  //     </ReanimatedSwipeable>
     
  // )
  return (
    <ReanimatedSwipeable
      onSwipeableOpen={deleteNotification}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleAction}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isRead
            ? "#111111"
            : "#17120A",
          borderRadius: 24,
          borderWidth: 1,
          borderColor: isRead
            ? "rgba(255,255,255,.05)"
            : "rgba(244,197,66,.22)",
          marginBottom: 18,
          padding: 16,
          overflow: "hidden",
        }}
      >
        {!isRead && (
          <View
            style={{
              position: "absolute",
              left: -4,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#F4C542",
            }}
          />
        )}
  
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 29,
            backgroundColor: "rgba(244,197,66,.10)",
            borderWidth: 1,
            borderColor: "rgba(244,197,66,.25)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={getStageLogo(notification.content.talentName)}
            resizeMode="contain"
            style={{
              width: 34,
              height: 34,
            }}
          />
        </View>
  
        <View
          style={{
            flex: 1,
            marginLeft: 16,
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: "#FFFFFF",
              fontSize: width / 28,
              fontWeight: "700",
            }}
          >
            {notification.content.name}
          </Text>
  
          <Text
            numberOfLines={2}
            style={{
              color: "#C6C6C6",
              marginTop: 6,
              fontSize: width / 34,
              lineHeight: 20,
            }}
          >
            {notification.message}
          </Text>
  
          <Text
            style={{
              color: "#8B8B8B",
              marginTop: 8,
              fontSize: 11,
            }}
          >
            2 min ago
          </Text>
        </View>
  
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "rgba(244,197,66,.30)",
            marginLeft: 14,
          }}
        >
          <Image
            source={getStageLogo(notification.content.talentName)}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );

}