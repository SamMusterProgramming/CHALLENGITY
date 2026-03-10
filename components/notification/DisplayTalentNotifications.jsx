// import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { getIcon, getInition, getStageLogo } from '../../helper'
// import { acceptFriendRequest, deleteUserNotification, getNotificationByUser, removeFriendRequest, updateNotificationByUser } from '../../apiCalls';
// import { router } from 'expo-router';
// import { icons } from '../../constants';
// import { useGlobalContext } from '../../context/GlobalProvider';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

// export default function DisplayTalentNotification({notification,setNotifications,user,setDisplayNotificationsModal }) {

//   const {userFriendData,setUserFriendData } = useGlobalContext()
//   const isRead = notification.isRead;
//   let friendRequestNotif = false;
//   let friendRequestAcceptNotif = false;
//   let challengeNotif = false;
//   let talentNotif = false;
//   notification.type == "friend request" ? friendRequestNotif = true : 
//   notification.type == "friends"? friendRequestAcceptNotif = true :
//   notification.type == "followers"? challengeNotif =true : challengeNotif =false
//   notification.type == "talent"? talentNotif =true : talentNotif =false

//   const [not,setNot] = useState(notification)

//   const [type,setType] = useState(notification.type)
//   const { width, height } = useWindowDimensions();

//   const [name , setName] = useState(null)


//   useEffect(() => {
//       const splitName = notification.content.name.split(" ")
//       setName({
//       part1 : splitName[0],
//       part2: splitName[1]
//        })
//   }, [])

 
//   const deleteNotification =()=>{
//     deleteUserNotification(notification._id,setNot)
//   }

//   const handleViewChallenge = ()=> {   
//     console.log(notification.content.challenge_id)
//     updateNotificationByUser(notification._id,setNot)
//     router.push({ pathname:'FSinstantChallengeDisplayer', params:{challenge_id:notification.content.challenge_id} })
//    }

//    const handleViewTalent = ()=> {   
//     updateNotificationByUser(notification._id,setNot)
//     router.push({ pathname:'TalentContestRoom', params:{
//       region:notification.content.region,
//       selectedTalent:notification.content.talentName,
//       selectedIcon: icons.dance,
//       regionIcon : icons.africa,
//       startIntroduction :"true",
//       showGo:"true",
//       location : "contest",
//       contestant_id : notification.content.sender_id
//     } })
//    }

//   const acceptFRequest =()=>{
//     const rawBody ={
//       _id:user._id,
//       name:user.name,
//       email:user.email,
//       profile_img:user.profile_img
//     }
//     acceptFriendRequest(notification.content.sender_id,rawBody,setUserFriendData)
//   }

//   const denyFriendRequest =()=>{
//     const rawBody ={
//       _id:notification.content.sender_id,
//       name:notification.content.name,
//       email:notification.content.email,
//       profile_img:notification.content.profile_img
//     }
//     removeFriendRequest(user._id,rawBody,setUserFriendData)
//   }

//   useEffect(() => {
//     getNotificationByUser(user._id,setNotifications)
//   }, [not,userFriendData])


//   const handleAction = ()=> {
//      switch (notification.type) {
//       case "talent":
//         handleViewTalent();
//         break;
//       case "followers":
//         handleViewChallenge();
//         break;
//       case "friends":
//           router.navigate({ pathname: '/ViewProfile', params: {user_id:notification.content.sender_id} })
//         break;
//       default:
//         break;
//      }
//   }

  
//   return (
//     <ReanimatedSwipeable
//     // renderRightActions={renderRightActions}
//     onSwipeableOpen={() => deleteNotification}   >

//         <TouchableOpacity  
//            onPress={handleAction}
//            className={isRead ? " bg-zinc-800/80 border border-yellow-400/20 rounded-xl px-2 mb-3 gap-2 elevation-lg flex-row items-end  "
//                         :" bg-zinc-600 border border-yellow-400/20 rounded-xl px-2 mb-3 gap-2  elevation-lg flex-row items-end "}>
        
//          <View
//                  className="flex-row gap-2 items -end ">
//                     <Image
//                         resizeMethod='cover'
//                         style= {{width :width/10 , height:height/18}}
//                         source={getStageLogo(notification.content.talentName)}
//                           />
//          </View>
         
//          <View
//          className={isRead ? " flex-1 px-1 flex-col   justify-center p-2 items-start  b g-[#ffffff]  "
//           :"flex-1 px- 1 flex-col   justify-center items-start  b g-[#cfe3f2] "} >
//                   <Text 
//                   style={{fontSize:width/38, }} 
//                   className="text-white mb- 2 font-semibold ">
                    
//                          {notification.content.talentName} {''}Stage
//                   </Text>
//                   <Text className=" text-yellow-100  pt-2 font-bold"
//                                   style={{fontSize:width/48, }} >
//                                   {notification.content.name}
//                   </Text> 
//                   <Text className=" text-yellow-100   font-bold"
//                                   style={{fontSize:10,color: isRead ? "white":"white"}} >
//                                   {notification.message}
//                   </Text> 
           
                        
//         </View>


       
//          </TouchableOpacity>
//       </ReanimatedSwipeable>
     
//   )

// }

import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, useWindowDimensions, Animated } from "react-native";
import { getStageLogo } from "../../helper";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function DisplayTalentNotification({ notification, setNotifications, user }) {
  const { width, height } = useWindowDimensions();
  const { userFriendData, setUserFriendData } = useGlobalContext();
  const [translateX] = useState(new Animated.Value(0));
  const [showDelete, setShowDelete] = useState(false);

  const handleAction = () => {
    if (showDelete) return; // prevent tap when swipe open
    switch (notification.type) {
      case "talent":
        router.push({
          pathname: "TalentContestRoom",
          params: {
            region: notification.content.region,
            selectedTalent: notification.content.talentName,
            startIntroduction: "true",
            showGo: "true",
            location: "contest",
            contestant_id: notification.content.sender_id,
          },
        });
        break;
      case "followers":
        router.push({
          pathname: "FSinstantChallengeDisplayer",
          params: { challenge_id: notification.content.challenge_id },
        });
        break;
      default:
        break;
    }
  };

  const deleteNotification = () => {
    setNotifications((prev) => prev.filter((n) => n._id !== notification._id));
    Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: true }).start();
  };

  const swipeLeft = () => {
    Animated.timing(translateX, { toValue: -80, duration: 200, useNativeDriver: true }).start(() => setShowDelete(true));
  };

  const swipeRight = () => {
    Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setShowDelete(false));
  };

  return (
    <View className="mb-3">
      {/* Delete Button */}
      {showDelete && (
        <TouchableOpacity
          onPress={deleteNotification}
          className="absolute right-0 top-0 bottom-0 bg-red-600 justify-center items-center rounded-xl px-5"
          style={{ width: 80 }}
        >
          <Text className="text-white font-bold">Delete</Text>
        </TouchableOpacity>
      )}

      {/* Notification Row */}
      <Animated.View
        style={{ transform: [{ translateX }] }}
        {...{ onTouchStart: swipeRight }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAction}
          onLongPress={swipeLeft}
          className={`flex-row items-center p-2 rounded-xl border border-yellow-400/20 ${
            notification.isRead ? "bg-zinc-800/80" : "bg-zinc-600"
          }`}
        >
          <Image
            resizeMode="cover"
            source={getStageLogo(notification.content.talentName)}
            style={{ width: width / 10, height: height / 18, borderRadius: 8 }}
          />
          <View className="flex-1 px-2 justify-center">
            <Text className="text-white font-semibold" style={{ fontSize: width / 38 }}>
              {notification.content.talentName} Stage
            </Text>
            <Text className="text-yellow-400 font-bold" style={{ fontSize: width / 48 }}>
              {notification.content.name}
            </Text>
            <Text className="text-white text-sm">{notification.message}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}