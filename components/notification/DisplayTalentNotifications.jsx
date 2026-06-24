import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, useWindowDimensions, LayoutAnimation, Platform, UIManager 
} from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { deleteUserNotification, getNotificationByUser, updateNotificationByUser } from '../../apiCalls';
import { countries, stageIcons } from '../../utilities/TypeData';

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
      case 'performance_posted':
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
            region: notification.metadata.stageRegion,
            selectedTalent: notification.metadata.stageName,
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
    <View style={{
      marginBottom: 10,
      zIndex: showDelete ? 9999 : 1,
      elevation: showDelete ? 9999 : 1,
    }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleAction}
        style={{
          backgroundColor: isRead
            ? "#201f1e"
            : "#2f2e2b",
          // borderWidth: 1.2,
          // borderColor: isRead
          //   ? "#242424"
          //   : "#d4a017",
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 8,
  
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
        }}
        className = "bg-[#201f1e]"
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Avatar */}
          <View
            style={{
              width: height / 15,
              // height: height / 20,
              borderRadius: 999,
              overflow: "hidden",
              borderWidth: 0.5,
              // borderColor: isRead
              //   ? "#3a3a3a"
              //   : "#facc15",
               }} 
               className ="mt -auto items-center justify-center" >
            <Image
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                width: height / 18,
                height: height / 18,
              }}
              source={{
                uri:
                  notification.presentation.image ||
                  user.profileImage.publicUrl,
              }}
              className ="rounded-full"
            />
          </View>
  
          {/* Content */}
          <View
            style={{
              flex: 1,
              marginLeft: 10,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent:
                  "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: "#fff",
                    fontSize: width / 38,
                    fontWeight: "800",
                  }}
                >
                  {
                    notification.metadata
                      .stageName
                  }{" "}
                  Stage{" "}
                  {
                    stageIcons[
                      notification.metadata
                        .stageName
                    ]
                  }
                </Text>
  
                <Text
                  style={{
                    color: isRead
                      ? "#9ca3af"
                      : "#facc15",
                    fontSize:
                      width / 40,
                    fontWeight: "700",
                    marginTop: 2,
                  }}
                >
                  {
                    countries.find(
                      c =>
                        c.code ===
                        notification
                          .metadata
                          .stageRegion
                    )?.flag
                  }{" "}
                  {
                    countries.find(
                      c =>
                        c.code ===
                        notification
                          .metadata
                          .stageRegion
                    )?.name
                  }
                </Text>
              </View>
  
              {/* Right Side */}
              <View
                style={{
                  position: "relative",
                }}
              >
                {!isRead && (
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 999,
                      backgroundColor:
                        "#facc15",
                      position: "absolute",
                      top: 10,
                      left: -24,
                    }}
                  />
                )}
  
                <TouchableOpacity
                  onPress={toggleDelete}
                  style={{
                    width: width/18,
                    height: width/18,
                    borderRadius: 999,
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    // backgroundColor:
                    //   "#1d1d1d",
                  }}
                  className ="bg-[white]/20"
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: width/25,
                      fontWeight: "700",
                    }}
                  >
                    ⋮
                  </Text>
                </TouchableOpacity>
  
                {/* FLOATING MENU */}
                {showDelete && (
                  <View
                    style={{
                      position: "absolute",
                      top: 38,
                      right: 0,
                      width: 170,
                      backgroundColor:
                        "#161616",
                      borderRadius: 14,
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
                  >
                    {/* MARK READ */}
                    <TouchableOpacity
                      onPress={() => {
                        markAsRead();
                        setShowDelete(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 14,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          fontSize:width/44
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
                    {/* VIEW */}
                    <TouchableOpacity
                      onPress={() => {
                        setShowDelete(false);
                        handleAction();
                      }}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 14,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          fontSize:width/44
                        }}
                      >
                        👁 View Notification
                      </Text>
                    </TouchableOpacity>
  
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
                        paddingVertical: 12,
                        paddingHorizontal: 14,
                      }}
                    >
                      <Text
                        style={{
                          color: "#f87171",
                          fontWeight: "700",
                          fontSize:width/44
                        }}
                      >
                        🗑 Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
  
            {/* Body */}
            <Text
              numberOfLines={2}
              style={{
                color: "#d1d5db",
                fontSize: width / 40,
                // marginTop: 2,
                lineHeight: 18,
              }}
              className ="font-semibold"
            >
              { notification.presentation.text }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
