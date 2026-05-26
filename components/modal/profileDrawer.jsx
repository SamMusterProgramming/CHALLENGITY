
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

import { useGlobalContext } from "../../context/GlobalProvider";
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
} from "../../apiCalls";

import { logoutUser } from "../../services/userServices";
import Friend from "../profile/Friend";
import CountryFlag from "react-native-country-flag";
import { countryCodes } from "../../helper";
import { icons } from "../../constants";
import { getUploadImageUrl, saveCoverImageToDataBase, saveProfileImageToDataBase, uploadImageToBlackBlaze } from "../../uploadFileToBlackBlaze";
import { compressImage } from "../../utilities/fileCompressor";
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

  const [userInfo, setUserInfo] = useState({
    name: user?.name,
    city: user?.city,
    state: user?.state,
    country: user?.country,
  });

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
    ?.filter((n) => n.type === "friend request" || n.type === "friends")
    ?.sort((a, b) => b.createdAt - a.createdAt);

  // ---------------- DATA ----------------
  const getActiveData = () => {
    if (activeTab === "friends") return userFriendData?.friends || [];
    if (activeTab === "followers") return follow?.followers || [];
    return follow?.followings || [];
  };

  const pagedData = chunkArray(getActiveData(), 6);

  const sections = [
    { type: "header" },
    { type: "stats" },
    { type: "requests", data: friendRequestReceived },
    { type: "tabs" },
    { type: "friends", data: pagedData },
  ];

  // ---------------- ACTIONS ----------------
  const acceptFRequest = (not) => {
    const rawBody = {
      _id: user._id,
  
    };
    acceptFriendRequest(
      not.content.sender_id,
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
          { width, top: insets.top, bottom: 0 }
        ]}
        className="absolute right-0 bg-[#0A0B0D]"
      >
  
        {/* HEADER */}
        <View className="pl-6 py- 2 flex-row justify-between items-center border-b border-white/5">
          <Text className="text-white">PROFILE</Text>
          <TouchableOpacity 
          className ="p-2 px-6 b g-white justify-center items-center"
          onPress={onClose}>
            <Text className="text-gray-400 text-3xl">X</Text>
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
                  <View 
                  className = "px-6 pt-4 b g-gold/40" >
                    <Image
                      className = "rounded-xl"
                      source={{ uri: user.coverImage?.publicUrl }}
                      style={{ height: height / 6 }}
                    />
                    <TouchableOpacity 
                      onPress={() => pickImage(setCoverImg)} 
                       className="absolute top-6 right-8 bg-black/50 px-3 py-1 rounded-full" > 
                       <MaterialIcons name="edit" size={14} color="#E6C068" /> 
                    </TouchableOpacity>
                     
                    <View className="items-center -mt-12">
                      <Image
                        source={{ uri: user.profileImage?.publicUrl }}
                        style={{
                          width: width / 5.5,
                          height: width / 5.5,
                          borderRadius: 100,
                        }}
                      />
                       <TouchableOpacity 
                          onPress={() => pickImage(setProfileImg)} 
                          className="absolute top-[0] right-[39%] bg-black/70 p-2 rounded-full"  > 
                            <MaterialIcons name="edit" size={12} color="#E6C068" /> 
                       </TouchableOpacity>
  
                      <Text className="text-white mt-3">
                        {user.name}
                      </Text>
                      <Text className="text-gray-400  mt-1 text-xs">
                        {user.email}
                      </Text>
                    </View>

                    <View className="flex-row w-full justify-center items-center mt-2 opacity-70"> 
                        <MaterialCommunityIcons name="map-marker" size={14} color="#E6C068" /> 
                        <Text className="text-gray-300 text-xs ml-1"> 
                             {user.city}, {user.state} 
                       </Text> 
                       <Text style={{ fontSize: width / 32 }} className="text-gray-200 ml-1" > {countryCodes[user?.country] || "US"} </Text>
                      <CountryFlag isoCode={user.country} size={10} />
                    </View>
  
                    <View className="flex-row justify-center items-center gap-3 mt-3">
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        className="px-4 py-2 border border-white/10 rounded-lg" >
                          <Text className="text-[#E6C068] text-xs">
                            EDIT
                          </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setRefresh(true)}
                        className="px-4 py-2 border border-white/10 rounded-lg" >
                        {refresh ? (
                          <ActivityIndicator     size={15} color="#fff" />
                        ) : (
                          <MaterialCommunityIcons
                            name="refresh"
                            size={15}
                            color="#E6C068"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
  
              case "stats":
                return (
                  <View className="flex-row justify-around mt-6">
                    {[
                      { label: "Friends", value: userFriendData?.friends.length },
                      { label: "Followers", value: follow?.followers.length },
                      { label: "Following", value: follow?.followings.length }
                    ].map((s) => (
                      <View key={s.label} className="items-center">
                        <Text className="text-white">{s.value}</Text>
                        <Text className="text-gray-400 text-xs">{s.label}</Text>
                      </View>
                    ))}
                  </View>
                );
  
              
              case "requests":
                 return ( 
                    <>
                     {friendRequestReceived?.length > 0 && (
                         <View className ="w-full mt-8 flex-col justify-center items-center">
                            <Text className="text-gray-300 text-xs tracking-widest mb- 6">
                                 REQUESTS {'(' +friendRequestReceived.length + ')'} 
                            </Text> 
                            <FlatList 
                            // style ={{width:width}}
                            horizontal 
                            data={friendRequestReceived} 
                            keyExtractor={(item) => item._id} 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={{ padding: 12 }} 
                            renderItem={({ item }) => ( 
                                <View style={{width:width/2.1}} 
                                className="bg-[#141518] flex-row justify-start items-end p-2 pt-8 mr-3 gap-2 rounded-xl "> 
                                        <Text style={{fontSize:width/47 ,width:"40%"}} 
                                        numberOfLines={1} 
                                        className="text-white absolute top-2 left-2 te xt -xs">
                                             {item.content.name?.slice(0, 15)} 
                                        </Text>
                                        <Image source={{ uri: item.content.profile_img}} className="w-12 h-12 rounded-full" /> 
                                        <View className="flex-col justify-end items-start  flex-1 gap-1 mt- 2"> 
                                             <Text style={{fontSize:width/50}} className="text-gray-400 "> {item.message} </Text> 
                                             <View className="flex-row flex-1 items-end  justify-start gap-2 py- 2"> 
                                                    {!item.isRead && (item.type !== "friends") && (
                                                        <TouchableOpacity onPress={() => acceptFRequest(item)} 
                                                        className= "bg-yellow-600/20 w-[47%] items-center p-1 px-2 rounded-lg" >
                                                        <Text className="text-[#E6C068] text-xs"> Accept </Text> 
                                                        </TouchableOpacity> 
                                                    )} 
                                                        <TouchableOpacity 
                                                        onPress={() => { if(item.type == "friend request") denyFriendRequest(item);
                                                                        else deleteNotification(item) } } 
                                                        className= "bg-red-600/20 w-[47%] items-center  p-1 px-2 rounded-lg" > 
                                                        <Text className="text-red-400 text-xs"> {item.type == "friends"?"Delete":"Deny"} </Text> 
                                                        </TouchableOpacity> 
                                             </View> 
                                        </View> 
                                </View> 
                                )} 
                            /> 
                         </View> 
                         )} 
                    </> )
  
              case "tabs":
                return (
                  <View className="flex-row w-full justify-center items-center mt-6 gap-6">
                    {["friends", "followers", "followings"].map((tab) => (
                      <TouchableOpacity
                        key={tab}
                        className ="p-4"
                        onPress={ () => setActiveTab(tab) }
                      >
                        <Text
                          className={`text-xs ${
                            activeTab === tab
                              ? "text-[#E6C068]"
                              : "text-gray-500"
                          }`}
                        >
                          {tab.toUpperCase()} ({ tab == "friends" ? userFriendData.friends.length :
                                                                  tab == "followers"? follow.followers.length :
                                                                  follow.followings.length  })
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                );
  
              case "friends":
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
                    keyExtractor={(_, i) => i.toString()}
                    // keyExtractor={(item) => item._id} 
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    decelerationRate="fast"
                    snapToInterval={width}
                    renderItem={({ item }) => (
                      <View
                        className="b g-primary"
                        style={{
                          width,
                          height: width * 2 / 3 + 0,
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          padding: 12,
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
      <View className="absolute bottom-4 left-[3%] w-[94%]">
        <TouchableOpacity
          onPress={ async () => 
            { 
              // await googleLogout()
              await logoutUser(setUser, router)
            }
          }
          className="py-3 bg-primary/80 rounded-xl items-center"
        >
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
      </View>
  
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