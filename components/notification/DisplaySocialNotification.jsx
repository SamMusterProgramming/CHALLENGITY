import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, useWindowDimensions, LayoutAnimation, Platform, UIManager 
} from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { acceptFriendRequest, deleteUserNotification, getNotificationByUser, getUserById, removeFriendRequest, updateNotificationByUser } from '../../apiCalls';
import { countries, stageIcons } from '../../utilities/TypeData';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DisplaySocialNotification({ notification, setNotifications, user }) {

  const { width, height } = useWindowDimensions();
  const { userFriendData, setUserFriendData  } = useGlobalContext();
  const [isRead, setIsRead] = useState(notification.is_read);
  const [showDelete, setShowDelete] = useState(false);
  const [not, setNot] = useState(null);
  const [profile , setProfile] = useState(null)

  // Animate layout changes
  const toggleDelete = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowDelete(!showDelete);
    
  };

  const markAsRead = () => {
    if (!isRead) {
      setIsRead(true);
      updateNotificationByUser(notification._id, setNot);
    }
  };

  useEffect(() => {
     if(not){
      getNotificationByUser(user._id, setNotifications);
      setNot(null)
     }
  }, [not])
  
  const handleAction = () => {
    markAsRead();
    switch (notification.type) {
      case 'followers':
        router.push({
          pathname: 'FSinstantChallengeDisplayer',
          params: { challenge_id: notification.content.challenge_id }
        });
        break;
      case 'friend_request_accepted':
            getUserById(notification.sender_id , setProfile)
            break;
      case 'friend_request_accepted_byou':
            getUserById(notification.sender_id , setProfile)
            break;
      case 'friend_request':
            getUserById(notification.sender_id , setProfile)
      default:
        break;
    }
  };

  useEffect(() => {
    if(!profile) return ;
    router.push({
        pathname: "/ProfileScreen",
        params: {
          userProfile: JSON.stringify(
            profile
          ),
          arena_id : null // selectedArena._id
        },
    });
  }, [profile])
  

  const deleteNotification = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    deleteUserNotification(notification._id, setNot);
    setNotifications(prev => prev.filter(n => n._id !== notification._id));
  };

  useEffect(() => {
    if (showDelete) {
      const timer = setTimeout(() => setShowDelete(false), 5000); // hide after 5s
      return () => clearTimeout(timer);
    }
  }, [showDelete]);

  const acceptFRequest =()=>{
    const rawBody ={
      user_id:user._id,
      _id:notification._id
    }
    acceptFriendRequest(notification.sender_id,rawBody,setUserFriendData)
  }

  const denyFriendRequest =()=>{
    markAsRead() ;
    const rawBody ={
      _id:notification.sender_id,
    }
    removeFriendRequest(user._id,rawBody,setUserFriendData)
  }

  useEffect(() => {
    getNotificationByUser(user._id,setNotifications)
  }, [not,userFriendData])


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleAction}
      style ={{
      }}
      className={`mx-1 mb-4 rounded-xl z-50  border overflow-hidden ${
        isRead
          ? "bg-[#111111] border-white/5"
          : "bg-[#17120A] border-[#F4C542]/25"
      }`}
      >
      {/* Gold Accent */}
      {!isRead && (
        <View className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F4C542]" />
      )}
      {!isRead && (
        <View className="absolute left -0 top-0 bott om-0 w-[100%] h-[3px] bg-[#F4C542]" />
      )}
      
      <View className="flex-row items-center px-4 py-4">
         {/* Thumbnail */}
         <View className="ml- 4">
          <Image
            source={{
              uri:
                notification.presentation.image ||
                user.profileImage.publicUrl,
            }}
            resizeMode="cover"
            className="w-20 h-20 rounded-full border border-[#F4C542]/20"
          />
        </View>
       
        {/* Content */}
        <View className="flex-1 h-20 ml-4">
  
          <View className="flex-row items-center">
            
            <Text
              numberOfLines={1}
              className="text-white font-extrabold mr-4"
              style={{
                fontSize: width / 27,
              }}
            >
              {notification.metadata.sender_name} 
            </Text>
            {!isRead && (
              <View className="flex-row ml-4 rounded-full b g-[#F4C542]" >
                 <View className="w-2 h-2 ml-4 rounded-full bg-[#F4C542]" />
                 <Text
                    numberOfLines={1}
                    className="text-white pb-2  font-extrabold ml-2"
                    style={{
                        fontSize: width / 47,
                    }}
                    >
                              New
                  </Text>
              </View>
            )}
            {/* <Text
              style={{
                fontSize: width / 32,
              }}
            >
              {stageIcons[notification.metadata.stageName]}
            </Text> */}
          </View>
  
          <Text
            className="text-[#F4C542] font-bold mt-2"
            style={{
              fontSize: width / 32,
            }}
          >
            {
              countries.find(
                c =>
                  c.code ===
                  notification.metadata.sender_region
              )?.name || "united states"
            }
           {" "}
           {
              countries.find(
                c =>
                  c.code ===
                  notification.metadata.sender_region
              )?.flag || countries.find(
                c =>
                  c.code === 'US'
              )?.flag
            }
          </Text>
  
          <Text
            numberOfLines={2}
            className="text-zinc-300 mt-auto"
            style={{
              fontSize: width / 36,
              lineHeight: 19,
            }}
          >
            {notification.presentation.text}
          </Text>


          <TouchableOpacity
                  onPress={toggleDelete}
                  style={{
                    // width: width/18,
                    // height: width/18,
                    // borderRadius: 999,
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    // backgroundColor:
                    //   "#1d1d1d",
                  }}
                  className ="p-4 absolute -top-4 -right-4"
                >
                  <MaterialCommunityIcons
                    name="menu"
                    size={22}
                    color="#F4C542"
                  />
            </TouchableOpacity>
       
            
              {/* FLOATING MENU */}
              {showDelete && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 32,
                      // width: width -153,
                      backgroundColor:
                        "#161616",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor:
                        "#2d2d2d",
                      overflow: "hidden",
                      zIndex: 1,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 6,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      elevation: 12,
                      zIndex: 1,
               
                    }}
                    className = "py-2"
                  >
                    {/* MARK READ */}
                    <TouchableOpacity
                      onPress={() => {
                        markAsRead();
                        setShowDelete(false);
                      }}
                      style={{
                        paddingVertical: 7,
                        paddingHorizontal: 14,
                        zIndex: 1,
                      }}
                      className = "px-6"
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          fontSize:width/34
                        }}
                      >
                        ✓ Mark as Read
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 1,
                        backgroundColor:
                          "#2d2d2d",
                      }}
                    />
                    <View
                      style={{
                        height: 1,
                        backgroundColor:
                          "#2d2d2d",
                      }}
                    />
  
                    {/* DELETE */}
                    <TouchableOpacity
                      onPress={() => {
                        setShowDelete(false);
                        deleteNotification();
                      }}
                      style={{
                        paddingVertical: 7,
                        paddingHorizontal: 14,
                      }}
                    >
                      <Text
                        style={{
                          color: "#f87171",
                          fontWeight: "700",
                          fontSize:width/34
                        }}
                      >
                        🗑 Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
           
        </View>
            
      </View>

      {notification.type == "friend_request" && (
      <View className="flex-row items-center mt-4 mb-4 px-4">
            <TouchableOpacity
            activeOpacity={0.85}
            onPress={acceptFRequest}
            className="flex-row flex-1 h-10 rounded-xl bg-[#F4C542] items-center justify-center"
            >
                <Ionicons
                    name="checkmark"
                    size={18}
                    color="#000"
                />
                <Text className="ml-2 text-black font-bold">
                    Accept
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.85}
            onPress={denyFriendRequest}
            className="flex-row flex-1 h-10 ml-3 rounded-xl bg-[#171717] border border-white/10 items-center justify-center"
            >
            <Ionicons
                name="close"
                size={18}
                color="#fff"
            />
            <Text className="ml-2 text-white font-semibold">
                Decline
            </Text>
            </TouchableOpacity>
      </View>
      )}
         {!isRead && (
              <View className="absolute bottom-4 right-6 w-2 h-2 rounded-full bg-[#F4C542]" />
            )}
     
    </TouchableOpacity>
  );
}
