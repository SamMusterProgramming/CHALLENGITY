
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Image,
  ActivityIndicator
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from "react-native-reanimated";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGlobalContext } from "../../../context/GlobalProvider";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import EditProfileModal from "./editProfileModal";

import {
  acceptFriendRequest,
  deleteUserNotification,
  getFollowData,
  getNotificationByUser,
  getUserFriendsData,
  removeFriendRequest,
  updateUserInfo
} from "../../../apiCalls";

import { logoutUser } from "../../../services/userServices";
import CountryFlag from "react-native-country-flag";
import { countryCodes } from "../../../helper";
import { icons } from "../../../constants";
import { getUploadImageUrl, saveCoverImageToDataBase, saveProfileImageToDataBase, uploadImageToBlackBlaze } from "../../../uploadFileToBlackBlaze";
import { compressImage } from "../../../utilities/fileCompressor";
import Friend from "../friends/Friend";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../header/header";
import ProfileTabs from "../custom/profileTabs";
import ArenaDisplayer from "../arena/arenaDisplayer";
import PerformanceCard from "../../viewArenas/performance/performanceCard";
// import { googleLogout } from "../../services/googleLogin";

const chunkArray = (arr = [], size = 6) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function ProfileDrawer({ visible, onClose }) {
  const {
    user,
    setUser,
    userFriendData,
    setUserFriendData,
    notifications,
    setNotifications,
    follow,
    setFollow,
    userArenas
  } = useGlobalContext();

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(width);
  const EDGE_WIDTH = 40;
  const nativeGesture = Gesture.Native();
  const [activeTab, setActiveTab] = useState("friends");
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [deletedNot, setDeletedNot] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  const [coverImg, setCoverImg] = useState(null); 
  const [profileImg, setProfileImg] = useState(null);
  const [selectedTab, setSelectedTab] = useState("arenas");
  const [selectedArena, setSelectedArena] = useState(userArenas[0]);

  const [userInfo, setUserInfo] = useState({
    name: user?.name,
    city: user?.city,
    state: user?.state,
    country: user?.country,
  });
  const CARD_WIDTH = (width - 40) / 2;
  // ---------------- FETCH ----------------
  useEffect(() => {
    if (!refresh) return;

    const load = async () => {
      await Promise.all([
        getUserFriendsData(user._id, setUserFriendData),
        getFollowData(user._id, setFollow),
        getNotificationByUser(user._id, setNotifications),
      ]);
    };

    load();
    setTimeout(() => setRefresh(false), 1500);
  }, [refresh]);


  /************************* MEDIA PICKER *************************/

  const pickImage = async (setProfile_img) => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setProfile_img(result.assets[0].uri);
    }
  };

/************************* COVER IMAGE UPLOAD *************************/

useEffect(() => {
    const uploadImage = async () => {
      if (!coverImg) return;
  
      try {
        // 1. Get upload URL
        const data = await getUploadImageUrl(
          user._id,
          user.email,
          "cover"
        );
        const compressed = await compressImage(coverImg)
        // 2. Upload to BlackBlaze
        const uploadResult = await uploadImageToBlackBlaze(
          data,
          compressed
        );
  
        // 3. Save to DB
        const res = await saveCoverImageToDataBase({
          userId: user._id,
          fileId: uploadResult.fileId,
          fileName: uploadResult.fileName,
          deleteFileId: user.coverImage?.fileId,
          deleteFileName: user.coverImage?.fileName,
        });
  
        setUser(res.data);
      } catch (err) {
        console.log("Cover upload error:", err);
      } finally {
        setCoverImg(null);
      }
    };
  
    uploadImage();
  }, [coverImg]);

  /************************* PROFILE IMAGE UPLOAD *************************/

useEffect(() => {
    const uploadProfileImage = async () => {
      if (!profileImg) return;
      try {
        // 1. Get upload URL
        const data = await getUploadImageUrl(
          user._id,
          user.email,
          "profile"
        );
        const compressed = await compressImage(profileImg)
        // 2. Upload to BlackBlaze
        const uploadResult = await uploadImageToBlackBlaze(
          data,
          compressed
        );
  
        // 3. Save to DB
        const res = await saveProfileImageToDataBase({
          userId: user._id,
          fileId: uploadResult.fileId,
          fileName: uploadResult.fileName,
          deleteFileId: user.profileImage?.fileId,
          deleteFileName: user.profileImage?.fileName,
        });
  
        setUser(res.data);
      } catch (err) {
        console.log("Profile upload error:", err);
      } finally {
        setProfileImg(null);
      }
    };
  
    uploadProfileImage();
  }, [profileImg]);


  // ---------------- DRAWER ANIMATION ----------------
  useEffect(() => {
    translateX.value = visible
      ? withSpring(0)
      : withTiming(width);
  }, [visible]);

const panGesture = Gesture.Pan()
  .activeOffsetX([15, 999])     // must move right a bit
  .failOffsetY([-20, 20])       // vertical scroll wins
  .onStart((e) => {
    // store whether gesture started from edge
    panGesture.isEdge = e.absoluteX > width - EDGE_WIDTH;
  })
  .onUpdate((e) => {
    // ❌ ignore if NOT from edge
    if (!panGesture.isEdge) return;
    if (e.translationX > 0) {
      translateX.value = e.translationX * 0.85;
    }
  })
  .onEnd((e) => {
    if (!panGesture.isEdge) return;
    const shouldClose =
      e.velocityX > 1000 || translateX.value > width * 0.35;

    if (shouldClose) {
      translateX.value = withTiming(width, { duration: 200 });
      runOnJS(onClose)();
    } else {
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 150,
      });
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // ---------------- NOTIFICATIONS ----------------
  const friendRequestReceived = notifications
    ?.filter((n) => n.type === "friend_request" || n.type === "friends")
    ?.sort((a, b) => b.createdAt - a.createdAt);

  // ---------------- DATA ----------------
  const getActiveData = () => {
    if (activeTab === "friends") return userFriendData?.friends || [];
    if (activeTab === "followers") return follow?.followers || [];
    return follow?.followings || [];
  };

  const pagedData = chunkArray(getActiveData(), 20);

  const sections = [
    { type: "header" },
    { type: "stats" },
    { type: "requests", data: friendRequestReceived },
    { type: "tabs" },
    { type: "friends", data: pagedData },
    { type: "arenas", data: []},
    { type: "performances", data: []},

  ];

  // ---------------- ACTIONS ----------------
  const acceptFRequest = (not) => {
    console.log(not.sender_id)
    const rawBody = {
      _id: not._id,
      user_id : user._id
    };
    acceptFriendRequest(
      not.sender_id,
      rawBody,
      setUserFriendData,
      setIsExpired
    );
  };

  const denyFriendRequest = (not) => {
    const rawBody = {
      _id: not.content.sender_id,
    };
    removeFriendRequest(user._id, rawBody, setUserFriendData);
  };

  const deleteNotification = (not) => {
    deleteUserNotification(not._id, setDeletedNot);
  };

  useEffect(() => {
    getNotificationByUser(user._id, setNotifications);
    if (!deletedNot) setDeletedNot(null);
  }, [deletedNot, userFriendData]);

  const handleSave = () => {
    updateUserInfo(user._id, userInfo, setUser);
  };

  const statData = [
    {
      icon: "account-group-outline",
      label: "Friends",
      value: userFriendData?.friends.length,
    },
    {
      icon: "heart-outline",
      label: "Followers",
      value: follow?.followers.length,
    },
    {
      icon: "account-plus-outline",
      label: "Following",
      value: follow?.followings.length,
    },
    {
      icon: "view-grid-outline",
      label: "Arenas",
      value: userArenas.length,
    },
  
  ];

  const playPerformance = (item) => {
    let posts = []
    selectedArena.posts.map( p => {
      let post = {...p, arenaName :selectedArena.arenaName ,
        talentType : selectedArena.talentType ,
        region : selectedArena.region ,
        profileImage : selectedArena.profileImage
      }  
      posts.push(post)    
    })
    const updatedPosts = [
        posts.find(p => p._id.toString() === item._id.toString()),
        ...posts.filter(p => p._id.toString() !== item._id.toString()),
      ];
    router.push({
      pathname: "/arenaPerformancePlayer",
      params: {
        selectedPostId: item._id,
        arenaPosts: JSON.stringify(updatedPosts),
        arena: JSON.stringify(selectedArena),
      },
    });
  }

  const renderPerformance = ( {item , index } ) => {
    return  <PerformanceCard 
        item={item}
        index={index}
        CARD_WIDTH={CARD_WIDTH}
        playPerformance = {playPerformance}
        performanceCount={selectedArena.posts.length}
      />
  };

  const logout = async () => {
    { 
      await logoutUser(setUser, router , user)
    }
  }

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">
  
      {/* BACKDROP */}
      <TouchableOpacity
        className="absolute inset-0 bg-black/70"
        onPress={onClose}
      />
  
      {/* DRAWER (NO gesture here) */}
      <Animated.View
        style={[
          animatedStyle,
          { width, top: insets.top , bottom: 0 }
        ]}
        className="absolute right-0 bg-[#0A0B0D]"
      >
  
        {/* HEADER */}
        <View className="pl-2 py-2 flex-row justify-between items-center border-b border-white/5">
          <Text 
          style ={{
            color :"#eab308",
            fontSize: width / 20,
            fontWeight : "800"
          }}
          className="text-white">
            PROFILE
          </Text>
          <TouchableOpacity 
          className ="p-2 px-4 b g-white justify-center items-center"
          onPress={onClose}>
             <MaterialCommunityIcons
                name="chevron-right"
                size={35}
                color="#eab308"
            />
          </TouchableOpacity>
        </View>
  
        {/* MAIN LIST */}
        <FlatList
          data={sections}
          keyExtractor={(item, i) => item.type + i}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => {
  
            switch (item.type) {
  
              case "header":
                return (
                  <Header user = {user}  statData = {statData} setModalVisible={setModalVisible} logout = {logout}
                          onPress = {onClose} pickImage={pickImage} setCoverImg = {setCoverImg} setProfileImg= {setProfileImg}
                   />
                );
            
              
              case "requests":
                 return ( 
                    <>
                     {friendRequestReceived?.length > 0 && (
                        //  <View className ="w-full mt-8 flex-col justify-center items-center">
                        //     <FlatList 
                        //     // style ={{width:width}}
                        //     horizontal 
                        //     data={friendRequestReceived} 
                        //     keyExtractor={(item) => item._id} 
                        //     showsHorizontalScrollIndicator={false} 
                        //     contentContainerStyle={{ padding: 12 }} 
                        //     renderItem={({ item }) => ( 
                        //         <View style={{width:width/2.1}} 
                        //         className="bg-[#141518] flex-row justify-start items-end p-2 pt-8 mr-3 gap-2 rounded-xl "> 
                        //                 <Text style={{fontSize:width/47 ,width:"40%"}} 
                        //                 numberOfLines={1} 
                        //                 className="text-white absolute top-2 left-2 te xt -xs">
                        //                      {item.presentation.name?.slice(0, 15)} 
                        //                 </Text>
                        //                 <Image source={{ uri: item.presentation.image}} className="w-12 h-12 rounded-full" /> 
                        //                 <View className="flex-col justify-end items-start  flex-1 gap-1 mt- 2"> 
                        //                      <Text style={{fontSize:width/50}} className="text-gray-400 "> {item.presentation.text} </Text> 
                        //                      <View className="flex-row flex-1 items-end  justify-start gap-2 py- 2"> 
                        //                             {!item.isRead && (item.type !== "friends") && (
                        //                                 <TouchableOpacity onPress={() => acceptFRequest(item)} 
                        //                                 className= "bg-yellow-600/20 w-[47%] items-center p-1 px-2 rounded-lg" >
                        //                                 <Text className="text-[#E6C068] text-xs"> Accept </Text> 
                        //                                 </TouchableOpacity> 
                        //                             )} 
                        //                                 <TouchableOpacity 
                        //                                 onPress={() => { if(item.type == "friend request") denyFriendRequest(item);
                        //                                                 else deleteNotification(item) } } 
                        //                                 className= "bg-red-600/20 w-[47%] items-center  p-1 px-2 rounded-lg" > 
                        //                                 <Text className="text-red-400 text-xs"> {item.type == "friends"?"Delete":"Deny"} </Text> 
                        //                                 </TouchableOpacity> 
                        //                      </View> 
                        //                 </View> 
                        //         </View> 
                        //         )} 
                        //     /> 
                        //  </View> 
                        <View
                        style={{
                            width: "100%",
                            marginTop: 24,
                        }}   >
                        <FlatList
                            horizontal
                            data={friendRequestReceived}
                            keyExtractor={(item) => item._id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                            }}
                            ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        width: width * 0.70,
                                        // minHeight: 108,
                                        borderRadius: 18,
                                        backgroundColor: "#111214",
                                        borderWidth: 1,
                                        borderColor: "rgba(234,179,8,.15)",
                                        padding: 14,
                                    }}  >
                                    {/* Top */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}  >
                                        <Image
                                            source={{ uri: item.presentation.image }}
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 28,
                                                borderWidth: 2,
                                                borderColor: "#eab308",
                                            }}
                                        />
                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: 12,
                                            }}
                                            className = "flex-col justify-start  "
                                          >
                                            <View>
                                              <Text
                                                  numberOfLines={1}
                                                  style={{
                                                      color: "#FFF",
                                                      fontSize: width / 32,
                                                      fontWeight: "700",
                                                  }}  >
                                                  {item.metadata.sender_name}
                                              </Text>
                                            </View>
                                            <View>
                                              <Text
                                                  numberOfLines={2}
                                                  style={{
                                                      marginTop: 4,
                                                      color: "rgba(255,255,255,.65)",
                                                      fontSize: width / 36,
                                                      lineHeight: 18,
                                                  }}  >
                                                  {item.presentation.text}
                                              </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Actions */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            marginTop: 14,
                                            width :"100%"
                                        }}
                                        className = "px-2 gap-2"
                                    >
                                        {!item.isRead &&
                                            item.type !== "friends" && (
                                                <TouchableOpacity
                                                    activeOpacity={0.9}
                                                    onPress={() => acceptFRequest(item)}
                                                    style={{
                                                        width : "50%" ,
                                                        paddingHorizontal: 18,
                                                        borderRadius: 5,
                                                        backgroundColor: "#eab308",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginRight: 10,
                                                    }}
                                                    className = "py-2"
                                                >
                                                    <Text
                                                        style={{
                                                            color: "#111214",
                                                            fontWeight: "700",
                                                            fontSize: width / 38,
                                                        }}
                                                    >
                                                        Accept
                                                    </Text>
                                                </TouchableOpacity>
                                            )}

                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => {
                                                if (item.type === "friend request")
                                                    denyFriendRequest(item);
                                                else deleteNotification(item);
                                            }}
                                            style={{
                                                width : "50%" ,
                                                paddingHorizontal: 18,
                                                borderRadius: 5,
                                                backgroundColor: "rgba(255,255,255,.04)",
                                                borderWidth: 1,
                                                borderColor: "rgba(255,255,255,.08)",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "#FFF",
                                                    fontWeight: "700",
                                                    fontSize: width / 38,
                                                }}
                                            >
                                                {item.type === "friends"
                                                    ? "Delete"
                                                    : "Decline"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                         )} 
                    </> )
  
              case "tabs":
                return (
                  <ProfileTabs selectedTab = {selectedTab} setSelectedTab = {setSelectedTab} setActiveTab={setActiveTab} />
                );
  
              case "friends":
                if(selectedTab === "arenas" || selectedTab === "stages") return ; 
                return (
                    <View
                    className="b g-primary items-center justify-center"
                    style={{
                      width,
                      height: width * 2 / 3 + 0,
                    //   flexDirection: "row",
                    //   flexWrap: "col",
                    //   justifyContent: "center",
                    //   padding: 12,
                    }}
                  >
                 {pagedData.length > 0 && (
                 <FlatList
                 horizontal
                 pagingEnabled
                 data={pagedData}
                 keyExtractor={(_, index) => index.toString()}
                 showsHorizontalScrollIndicator={false}
                 snapToInterval={width}
                 decelerationRate="fast"
                 nestedScrollEnabled
                 renderItem={({ item }) => (
                   <View
                     style={{
                       width,
                       paddingHorizontal: 18,
                       paddingTop: 18,
                       flexDirection: "row",
                       flexWrap: "wrap",
                       justifyContent: "flex-start",

                      //  alignContent: "space-between",
                     }}
                   >
                     {item.map((friend, index) => (
                       <Friend
                         key={friend._id}
                         friend={friend}
                         index={index}
                         w={width}
                       />
                     ))}
                   </View>
                 )}
               />
                  )}
                  {pagedData.length == 0 && (
                    <>
                    <Image
                      className="w-12 h-12"
                      source={icons.search}
                     /> 
                     <Text className="text-gray-400 text-xs">Empty List</Text>
                    </>
                  )}
                  </View>
                );
                case "arenas":
                  if(selectedTab !== "arenas") return ; 
                   return (
                     <ArenaDisplayer userArenas={userArenas} onPressArena={()=>{}} selectedArena={selectedArena}
                      setSelectedArena = {setSelectedArena} />
                   )

                case "performances":
                if(!selectedArena || selectedTab !== "arenas") return ; 
                  return (
                    <>
                      <Text 
                      style ={{
                        paddingBottom :18,
                        marginLeft : 18,
                        fontWeight : "700"
                      }}
                      className="text-white text-xs tracking-widest">
                                    {selectedArena.description} 
                      </Text> 
                    <FlatList
                    data={selectedArena.posts}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    renderItem={renderPerformance}
                    contentContainerStyle={{
                      // paddingHorizontal: 16,
                      paddingBottom: 40,
                    }}
                    columnWrapperStyle={{
                      justifyContent: "center",
                      marginBottom: 8,
                      gap :8
                    }}
                   
                  />
                  </>
                  )

            }
          }}
        />
      </Animated.View>
  
      {/* ✅ EDGE SWIPE HANDLE (SEPARATE) */}
      {/* <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 30,
          zIndex: 100,
        }}
      > */}
        {/* <GestureDetector
          gesture={Gesture.Pan()
            .onUpdate((e) => {
              if (e.translationX > 0) {
                translateX.value = e.translationX * 0.9;
              }
            })
            .onEnd((e) => {
              const shouldClose =
                e.velocityX > 800 || translateX.value > width * 0.3;
  
              if (shouldClose) {
                translateX.value = withTiming(width, { duration: 200 });
                runOnJS(onClose)();
              } else {
                translateX.value = withSpring(0);
              }
            })}
        >
          <View style={{ flex: 1 }} />
        </GestureDetector> */}
      {/* </View> */}
  
      {/* LOGOUT */}
      {/* <View className="absolute bottom-4 left-[3%] w-[94%]">
        <TouchableOpacity
          onPress={ async () => 
            { 
              // await googleLogout()
              await logoutUser(setUser, router , user)
            }
          }
          className="py-3 bg-primary/80 rounded-xl items-center"
        >
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
      </View> */}
  
      <EditProfileModal
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        handleSave={handleSave}
        user={user}
      />
    </View>
  );
}
