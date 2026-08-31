import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, useWindowDimensions, LayoutAnimation, Platform, UIManager 
} from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { deleteUserNotification, getNotificationByUser, updateNotificationByUser } from '../../apiCalls';
import { countries, stageIcons } from '../../utilities/TypeData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DisplayTalentNotification({ notification, setNotifications, user }) {

  const { width, height } = useWindowDimensions();
  const { userFriendData, setUserFriendData  } = useGlobalContext();
  const [isRead, setIsRead] = useState(notification.is_read);
  const [showDelete, setShowDelete] = useState(false);
  const [not, setNot] = useState(null);
 
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
      case 'contest_joined':
        router.push({
          pathname: '/TalentContestRoom',
          params: {
            region: notification.metadata.region,
            selectedTalent: notification.metadata.name,
            // selectedIcon: icons.dance,
            // regionIcon: icons.africa,
            startIntroduction: 'true',
            showGo: 'true',
            location: 'contest',
            contestant_id: notification.metadata.contestant_id ,
            startPlayer : "true"
          }
        });
      break;
      case 'performance_posted':
        router.push({
          pathname: '/TalentContestRoom',
          params: {
            region: notification.metadata.region,
            selectedTalent: notification.metadata.name,
            // selectedIcon: icons.dance,
            // regionIcon: icons.africa,
            startIntroduction: 'true',
            showGo: 'true',
            location: 'contest',
            contestant_id: notification.metadata.contestant_id ,
            startPlayer : "true"
          }
        });
      break;
      case 'contest_queued':
        router.push({
          pathname: '/TalentContestRoom',
          params: {
            region: notification.metadata.stageRegion,
            selectedTalent: notification.metadata.stageName,
            // selectedIcon: icons.dance,
            // regionIcon: icons.africa,
            startIntroduction: 'true',
            showGo: 'true',
            location: 'contest',
            contestant_id: notification.metadata.contestant_id ,
            startPlayer : "true"
          }
        });
      break;
      case 'eliminated':
        router.push({
          pathname: '/TalentContestRoom',
          params: {
            region: notification.metadata.region,
            selectedTalent: notification.metadata.name,
            // selectedIcon: icons.dance,
            // regionIcon: icons.africa,
            startIntroduction: 'true',
            showGo: 'true',
            location: 'contest',
            contestant_id: null ,
            startPlayer : "true"
          }
        });
      break;
      case 'vote_received':
        router.push({
          pathname: '/TalentContestRoom',
          params: {
            region: notification.metadata.stageRegion,
            selectedTalent: notification.metadata.stageName,
            // selectedIcon: icons.dance,
            // regionIcon: icons.africa,
            startIntroduction: 'true',
            showGo: 'true',
            location: 'contest',
            contestant_id: notification.metadata.contestant_id || null,
            startPlayer : "true"
          }
        });
      break;
      case 'followers':
        router.push({
          pathname: 'FSinstantChallengeDisplayer',
          params: { challenge_id: notification.content.challenge_id }
        });
        break;
      case 'friends':
        router.navigate({ pathname: '/ViewProfile', params: { user_id: notification.content.sender_id } });
      break;
      default:
        break;
    }
  };

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

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleAction}
      style ={{
        zIndex: showDelete ? 9999 : 1,
        // zIndex: showDelete ? 9999 : 1,
        // elevation: showDelete ? 9999 : 1,
        // opacity :showDelete ? 0.3 :1
      }}
      className={`m x-1 mb-4 rounded-3xl items-center  py-2 px-4 border over flow-hidden ${
        isRead
          ? "bg-[#19 130a] borde r-l border-white/25"
          : "bg-p rimary bord er-l-4 border-[gold]/35 "
      }`}
      >
  
     {!isRead && (
        <View className="absolute h-[9px] rounded-full items-center left-2  top-2  w-[9px] bg-[#F4C542]" />
      )}
    
      
        {/* <View className="flex-row items-center px-4 py-4">
     
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

        <View className="flex-1 h-20 ml-4">
  
          <View className="flex-row items-center">
            
            <Text
              numberOfLines={1}
              className="text-white font-extrabold mr-4"
              style={{
                fontSize: width / 27,
              }}
            >
              {notification.metadata.stageName} Stage
            </Text>
           
            <Text
              style={{
                fontSize: width / 32,
              }}
            >
              {stageIcons[notification.metadata.stageName]}
            </Text>
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
                  notification.metadata.stageRegion
              )?.name
            }
           {" "}
           {
              countries.find(
                c =>
                  c.code ===
                  notification.metadata.stageRegion
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
           
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
             
                  }}
                  className ="p-4 absolute -top-4 -right-4"
                >
                  <MaterialCommunityIcons
                    name="menu"
                    size={22}
                    color="#F4C542"
                  />
            </TouchableOpacity>
  
         
              {showDelete && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 32,
            
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
       
     
       
  
      </View> */}

      <View 
        style ={{
          height : width/4,
          // width
        }}
        className="w-full fle x-1 h- 20 px- 4">
          <View
          style ={{
            // height : width/5.2
          }}
           className="flex-row flex-1 items-center w-full gap-4">
              <View className="">
                <Image
                  source={{
                    uri:
                      notification.presentation?.image ||
                      user.profileImage.publicUrl,
                  }}
                  style = {{
                    width:width/11,
                    height : width/11
                  }}
                  resizeMode="cover"
                  className="w- 20 h- 20 rounded-full border border-[#F4C542]/20"
                />
              </View>
              <View>
                  <View
                  className = "flex-row " >
                    <Text
                      numberOfLines={1}
                      className="text-white font-extrabold mr-4"
                      style={{
                        fontSize: width / 32,
                      }}
                    >
                      {notification.metadata.name} Stage
                    </Text>
                  
                      <View className="fle x-1 items-center justify-center">
                          <MaterialCommunityIcons
                            name="trophy"
                            size={17}
                            color="#EAB308"
                          />
                      </View>
                  </View>
                  <View className="flex-row mt-1 items-center">
                    <Text
                      className="text-[#AAA] font-bold mt-1"
                      style={{
                        fontSize: width / 34,
                      }}
                    >
                      {notification.metadata.name} {' '}
                      {stageIcons[notification.metadata.name]} {'  .  '}
                    </Text>
                    <Text
                      className="text-[#AAA] font-bold mt-1"
                      style={{
                        fontSize: width / 34,
                      }}  >
                        {
                          countries.find(
                            c =>
                              c.code ===
                              notification.metadata.region
                          )?.name 
                        }
                        {" "}
                        {
                          countries.find(
                            c =>
                              c.code ===
                              notification.metadata.region
                          )?.flag
                        } 
                    </Text>
                  </View>
             </View>
          </View>
         
          <View
            className ="mt-auto  fle x-1 py-2">
            <Text
              numberOfLines={2}
              className="text-zinc-100 fon t-pbold sem ibold"
              style={{
                fontSize: width / 33,
                lineHeight: 22,
              }}
            >
              {notification.presentation.text}
            </Text>
          </View>

        </View>


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
                  className ="p-4 absolute - top-0 - right-0"
                >
                  <MaterialCommunityIcons
                    name="menu"
                    size={22}
                    color="#F4C542"
                  />
      </TouchableOpacity>

      {showDelete && (
        <View
          style={{
            position: "absolute",
            top: 32,
            right: 10,
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
          
          }}
          className = "py-2 z-10"
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


    </TouchableOpacity>
  );
}
