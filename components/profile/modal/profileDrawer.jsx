
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Image,
  ActivityIndicator,
  Animated
} from "react-native";

import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from "react-native-reanimated";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGlobalContext } from "../../../context/GlobalProvider";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import EditProfileModal from "./editProfileModal";

import {
  acceptFriendRequest,
  createArenaByUser,
  deleteArenaByUser,
  deleteArenaPost,
  deleteUserNotification,
  getArenaByUser,
  getFollowData,
  getNotificationByUser,
  getUserFriendsData,
  removeFriendRequest,
  updateArenaByUser,
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
import EmptyPostArena from "../arena/emptyPostArena";
import WelcomeToCreateArena from "../arena/WelcomeToCreateArena";
import ArenaAlertModal from "../../arena/modals/AlertArenaModal";
import { useLoading } from "../../../context/loadingContext";
import CreateArenaModal from "../../modal/createArenaModal";
import EditArenaModal from "../../arena/modals/editArenaModal";
import StageCaroussel from "../stage/stageCaroussel";
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
    userArenas,
    setUserArenas,
    arenaActionModal,
    setArenaActionModal,
    openArenaAlertModal, 
    setOpenArenaAlertModal,
    globalArenaRefresh,
    setGlobalArenaRefresh,
    uploadPerformanceLoading , 
    setUploadPerformanceLoading ,
    selectedArena, setSelectedArena,
    userTalents,
    userFollowers , 
    userFollowings
  } = useGlobalContext();
 
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(width);
  const EDGE_WIDTH = 40;
  const nativeGesture = Gesture.Native();
  const [activeTab, setActiveTab] = useState("arenas");
  const [selectedPeople, setSelectedPeople] = useState("friends");

  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [deletedNot, setDeletedNot] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  const [coverImg, setCoverImg] = useState(null); 
  const [profileImg, setProfileImg] = useState(null);
  const [selectedTab, setSelectedTab] = useState("arenas");
  // const [selectedArena, setSelectedArena] = useState(userArenas[0]);
  const [refreshing, setRefreshing] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [openCreateArenaModal ,setOpenCreateArenaModal] = useState(false)
  const [openEditArenaModal , setOpenEditArenaModal] = useState(false)
  const [postToDeleteId, setPostToDeleteId] = useState(null)
  const [hamburgerMenu , setHamburgerMenu] = useState(false)
  const [currentPage, setCurrentPage] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerBlack, setHeaderBlack] = useState(false);
  const peopleListRef = useRef(null);
  const THRESHOLD = height/12;
  const [peopleMenuOpen, setPeopleMenuOpen] = useState(false);
  
  const handleScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y >= THRESHOLD && !headerBlack) {
      setHeaderBlack(true);
    } else if (y < THRESHOLD && headerBlack) {
      setHeaderBlack(false);
    }
  }
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [height * 0.22, height * 0.25],
    outputRange: [-12, 0],
    extrapolate: "clamp",
  });

  const [userInfo, setUserInfo] = useState({
    name: user?.name,
    city: user?.city,
    state: user?.state,
    country: user?.country,
  });
  const CARD_WIDTH = (width - 30) / 2;
  

  // useEffect(() => {
  //  if(userArenas.length)  setSelectedArena(userArenas[0]) 
  //   else setSelectedArena({
  //     _id: "create-arena",
  //     isCreateCard: true,
  //   })
  // }, [])
  
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



  // ---------------- NOTIFICATIONS ----------------
  const friendRequestReceived = notifications
    ?.filter((n) => n.type === "friend_request" || n.type === "friends")
    ?.sort((a, b) => b.createdAt - a.createdAt);


  const peopleTabs = [
    {
      id: "friends",
      label: "Friends",
      icon: "people-outline",
    },
    {
      id: "followers",
      label: "Followers",
      icon: "person-add-outline",
    },
    {
      id: "followings",
      label: "Following",
      icon: "person-outline",
    },
  ];

  // ---------------- DATA ----------------
  const getActiveData = () => {
    if(activeTab !== "people") return [] ;
    if (selectedPeople === "friends") return userFriendData?.friends || [];
    if (selectedPeople === "followers") return userFollowers || [];
    return userFollowings || [];
  };

  const pagedData = chunkArray(getActiveData(), 12);

  const sections = [
    { type: "header" },
    { type: "stats" },
    { type: "requests", data: friendRequestReceived },
    { type: "tabs" },
    { type: "friends", data: pagedData },
    { type: "arenas", data: []},
    { type: "stages", data: []},
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
      icon: "stadium",
      label: "Arenas",
      value: userArenas.length,
    },
  
    {
      icon: "account-group",
      label: "Friends",
      value: userFriendData?.friends.length,
    },
    {
      icon: "heart",
      label: "Followers",
      value: userFollowers.length,
    },
    {
      icon: "account-plus",
      label: "Following",
      value: userFollowings.length,
    }
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



  const logout = async () => {
    { 
      await logoutUser(setUser, router , user)
    }
  }

  // refreshing data 
  const onRefresh = async () => {
    showLoading("Refreshing ...")
    try {
      setRefreshing(true);
      await getArenaByUser(user._id ,setSelectedArena, setUserArenas , selectedArena._id);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      hideLoading()
    }
  };
  useEffect(() => {
    if(!globalArenaRefresh) return ; 
      onRefresh()
      setGlobalArenaRefresh(false)
  }, [globalArenaRefresh])

  //modal alert , arena  actions , 
  const createArena = async(d) => {
    console.log(d)
    const data =   await createArenaByUser(user._id,d)
    if(data.message) return ; 
    setUserArenas(data.arenas);
    setSelectedArena(data.selectedArena)
   }

  const updateArena = async(body) => {
    const data = await updateArenaByUser(selectedArena._id , {...body,userId:user._id})
    setSelectedArena(data.selectedArena)
    setUserArenas(data.arenas)
    setTimeout(() => {
        hideLoading()
    }, 1000);
}

const handleDeleteArena = async() => {
  const data = await deleteArenaByUser(selectedArena._id , {userId:user._id})
  setUserArenas(data.arenas)
  setSelectedArena(data.selectedArena)
}

const createPerformance = ()=>{
        router.push({
        pathname: "/CreatePerformance",
        params: {
            arena_id: selectedArena._id,
        },
        });
}

const deletePost = async()=>{
    showLoading('deleting the post ...')
    await deleteArenaPost( postToDeleteId, setSelectedArena , setUserArenas)
    hideLoading()
 }

const confirmAction =  {
   delete_arena : handleDeleteArena,
   delete_arena_deny : () => {} ,
   create_arena : () => {
                         setTimeout(() => {
                          setOpenCreateArenaModal(true)
                         }, 300);
                        },
   create_performance : createPerformance,
   delete_performance : deletePost
}
const alertContent =  {
    delete_arena : {
        title : "Delete Arena",
        text: "Deleting this arena will permanently remove all performances, followers, stars and statistics. This action cannot be undone."
       },
    delete_arena_deny : {
        title : " Delete Arena ",
        text : " can't delete this Arena , need to delete all performances first ",
    },
    create_arena : {
        title : "Create Arena" ,
        text : "are you sure you want to create New Arena"
    },
    create_performance : {
        title : "Add Performance" ,
        text : "are you sure you want to add a  performance"
    },
    delete_performance : {
        title : "Delete Post" ,
        text : "are you sure you want to delete this performance"
    },
 }

 const alertType =  {
    delete_arena : "confirm" ,
    delete_arena_deny : "infos",
    create_arena : "confirm",
    create_performance : "confirm",
    delete_performance : "confirm"
 }

 useEffect(() => {
  if (!hamburgerMenu) return;
  const timer = setTimeout(() => {
      setHamburgerMenu(false);
  }, 3000);
  return () => clearTimeout(timer);
}, [hamburgerMenu]);

useEffect(() => {
  setCurrentPage(0);
}, [selectedPeople, activeTab]);

useEffect(() => {
  setCurrentPage(0);
  peopleListRef.current?.scrollToOffset({
    offset: 0,
    animated: false,
  });
}, [selectedPeople]);

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
          // animatedStyle,
          { width, 
            height ,
            top: insets.top ,
             bottom: 0 }
        ]}
        className="abs olute  right-0 bg-[#0A0B0D]"  >
  
        {/* HEADER */}
        <Animated.View
          style={{
            backgroundColor: headerBlack
            ? "rgba(0,0,0,1)"
            : "rgba(0,0,0,0)",
          }}
          className=" bg -black/60 py-1  z-10 absolute top-0 left-0 right-0 b g-black/60 flex-row justify-between items-center bor der-b bo rder-white/5"> 

          <TouchableOpacity 
          className ="p-1 ml-1 bg-black/60 rounded-full justify-center items-center"
          onPress={onClose}>
             <MaterialCommunityIcons
                name="chevron-left"
                size={30}
                color="#eab308"
             />
          </TouchableOpacity>

          <Text 
            style ={{
              color :"#eab308",
              fontSize: width / 22,
              fontWeight : "800"
            }}
            className="text-white">
            {headerBlack ?"PROFILE" : ""}  
          </Text>      

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={ () => {
                setHamburgerMenu(!hamburgerMenu)
            }}
            style={{
                borderRadius: 26,
                backgroundColor: "rgba(0,0,0,.55)",
                // borderWidth: 1,
                // borderColor: "rgba(234,179,8,.58)",
                justifyContent: "center",
                alignItems: "center",
            }}
            className = "p-2 mr-1 rounded-full bg-black"  >
                <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={25}
                    color="#f4d44d"
                />
          </TouchableOpacity>

        </Animated.View>
  
        {/* MAIN LIST */}
        <View className = "flex-1 w-full">
        <Animated.FlatList
          data={sections}
          keyExtractor={(item, i) => item.type + i}
          extraData={refreshing}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled ={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 80  }}
          onScroll={(e) => {
            handleScroll(e);
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
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
                                        className = "px-2 gap-2"  >
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
                  <ProfileTabs selectedTab = {selectedTab} setSelectedTab = {setSelectedTab} setActiveTab={setActiveTab} 
                  setOpenArenaAlertModal ={setOpenArenaAlertModal}  setArenaActionModal ={setArenaActionModal} 
                  />
                );
  
              case "friends":
                if(selectedTab === "arenas" || selectedTab === "stages") return ; 
                return (
                  <View
                  className="w-full self-center mt-4 rounded-[5px] p- 2  items-center  justify-center"
                  >   
                      <View
                        style={{
                          width: width * 0.95,
                          height: (width / 6.9) * 5.9,
                          // backgroundColor: "rgba(255,255,255,0.10)",
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                        className ="border border-gold/40"
                      >
                        {pagedData.length > 0 && (
                          <FlatList
                            horizontal
                            pagingEnabled
                            data={pagedData}
                            ref={peopleListRef}
                            keyExtractor={(_, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            decelerationRate="fast"
                            nestedScrollEnabled
                            onMomentumScrollEnd={(event) => {
                              const pageWidth = width * 0.95;
                              const page = Math.round(
                                event.nativeEvent.contentOffset.x / pageWidth
                              );
                              setCurrentPage(page);
                            }}
                            renderItem={({ item }) => (
                              <View
                                style={{
                                  width: width * 0.95,
                                  height: width / 6.9 * 5.9,
                                  paddingHorizontal: 8,
                                  paddingVertical: 10,
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  alignContent: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {item.map((friend, index) => (
                                  <View
                                    key={friend._id}
                                    style={{
                                      width: "25%",
                                      height: "33.333%",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Friend
                                      friend={friend}
                                      index={index}
                                      w={width}
                                      isMe={true}
                                    />
                                  </View>
                                ))}
                              </View>
                            )}
                          />
                        )}

                        {pagedData.length === 0 && (
                          <View
                          style={{
                            width: width * 0.95,
                            height: width / 6.9 * 5.9,
                            flexDirection: "row",
                            alignContent: "center",
                            justifyContent: "center",
                          }} >
                            <Image
                              className="h-12 w-12"
                              source={icons.search}
                            />
                            <Text className="text-lg text-gray-400">
                              Empty List
                            </Text>
                          </View>
                        )}
                      </View>

                      <View
                      className = "flex-row w-full justify-center gap- 2 pr-4 mt-2 ">

                          <View
                            style={{
                              position: "relative",
                              zIndex: 100,
                            }}
                            className = "flex-1"
                          >
                   
                            {peopleMenuOpen && (
                              <View
                                style={{
                                  position: "absolute",
                                  bottom: 48,
                                  left: 0,
                                  right: "40%",
                                  backgroundColor: "#111111",
                                  borderWidth: 1,
                                  borderColor: "rgba(234,179,8,0.18)",
                                  borderRadius: 14,
                                  paddingVertical: 6,
                                  shadowColor: "#000",
                                  shadowOffset: {
                                    width: 0,
                                    height: -5,
                                  },
                                  shadowOpacity: 0.35,
                                  shadowRadius: 12,
                                  elevation: 12,
                                  zIndex: 200,
                                }}
                              >
                                {peopleTabs.map((tab, index) => {
                                  const selected =
                                    selectedPeople === tab.id;

                                  return (
                                    <TouchableOpacity
                                    key={tab.id}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                      setCurrentPage(0);
                                      setSelectedPeople(tab.id);
                                      setPeopleMenuOpen(false);
                                    }}
                                    style={{
                                      minHeight: 48,
                                      marginHorizontal: 6,
                                      marginVertical: 2,
                                      paddingHorizontal: 12,
                                  
                                      flexDirection: "row",
                                      alignItems: "center",
                                  
                                      borderRadius: 10,
                                  
                                      backgroundColor: selected
                                        ? "rgba(234,179,8,0.08)"
                                        : "transparent",
                                  
                                      borderWidth: selected ? 1 : 1,
                                      borderColor: selected
                                        ? "rgba(234,179,8,0.18)"
                                        : "transparent",
                                    }}
                                  >
                                    {/* =====================================================
                                        ICON COLUMN
                                    ===================================================== */}
                                    <View
                                      style={{
                                        width: 28,
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Ionicons
                                        name={
                                          tab.id === "friends"
                                            ? "people-outline"
                                            : tab.id === "followers"
                                            ? "person-add-outline"
                                            : "person-outline"
                                        }
                                        size={18}
                                        color={
                                          selected
                                            ? "#EAB308"
                                            : "rgba(255,255,255,0.45)"
                                        }
                                      />
                                    </View>
                                  
                                    {/* =====================================================
                                        LABEL COLUMN
                                    ===================================================== */}
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        paddingLeft: 10,
                                      }}
                                    >
                                      <Text
                                        numberOfLines={1}
                                        style={{
                                          fontSize: width / 34,
                                          fontWeight: "800",
                                          letterSpacing: 0.7,
                                          color: selected
                                            ? "#EAB308"
                                            : "rgba(255,255,255,0.65)",
                                        }}
                                      >
                                        {tab.label.toUpperCase()}
                                      </Text>
                                    </View>
                                  
                                    {/* =====================================================
                                        CHECK COLUMN
                                    ===================================================== */}
                                    <View
                                      style={{
                                        width: 28,
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {selected && (
                                        <Ionicons
                                          name="checkmark-circle"
                                          size={18}
                                          color="#EAB308"
                                        />
                                      )}
                                    </View>
                                  </TouchableOpacity>
                                  );
                                })}

                                {/* =================================================
                                    ARROW INDICATOR
                                ================================================= */}

                                <View
                                  style={{
                                    position: "absolute",
                                    bottom: -7,
                                    right: 30,
                                    width: 14,
                                    height: 14,
                                    backgroundColor: "#111111",
                                    borderRightWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: "rgba(234,179,8,0.18)",
                                    transform: [
                                      {
                                        rotate: "45deg",
                                      },
                                    ],
                                  }}
                                />
                              </View>
                            )}

                            {/* =====================================================
                                SELECTED BUTTON
                            ===================================================== */}

                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() =>
                                setPeopleMenuOpen((prev) => !prev)
                              }
                              style={{
                                width: "50%",
                                height: 42,
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 12,
                                borderRadius: 12,
                                // backgroundColor: peopleMenuOpen
                                //   ? "rgba(234,179,8,0.08)"
                                //   : "rgba(255,255,255,0.025)",
                                // borderWidth: 1,
                                // borderColor: peopleMenuOpen
                                //   ? "rgba(234,179,8,0.22)"
                                //   : "rgba(255,255,255,0.07)",
                              }}
                            >
                              {/* =====================================================
                                  ICON
                              ===================================================== */}
                              <View
                                style={{
                                  width: 24,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Ionicons
                                  name={
                                    selectedPeople === "friends"
                                      ? "people-outline"
                                      : selectedPeople === "followers"
                                      ? "person-add-outline"
                                      : "person-outline"
                                  }
                                  size={15}
                                  color="#EAB308"
                                />
                              </View>

                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: "end",
                                  paddingLeft: 7,
                                }}  >
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    fontSize: width / 32,
                                    fontWeight: "800",
                                    letterSpacing: 0.8,
                                    color: peopleMenuOpen
                                      ? "#EAB308"
                                      : "rgba(255,255,255,0.65)",
                                   }}  >
                                  {peopleTabs
                                    .find(
                                      (tab) =>
                                        tab.id === selectedPeople
                                    )
                                    ?.label?.toUpperCase() || "PEOPLE"}
                                </Text>
                              </View>

                              <View
                                style={{
                                  width: 26,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Ionicons
                                  name={
                                    peopleMenuOpen
                                      ? "chevron-down"
                                      : "chevron-up"
                                  }
                                  size={18}
                                  color={
                                    peopleMenuOpen
                                      ? "#EAB308"
                                      : "rgba(255,255,255,0.55)"
                                  }
                                />
                              </View>
                            </TouchableOpacity>
                          </View>



                          {pagedData.length > 1 && (
                          <View className=" gap-2 flex-row items-center justify-center mt- 4  pb -2">
                            {pagedData.map((_, index) => {
                              const isActive = index === currentPage;
                              return (
                                <View
                                  key={index}
                                  className={` rounded-full ${
                                    isActive
                                      ? "h-[8px] w-[18px] bg-yellow-500"
                                      : "h-[8px] w-[18px] bg-white/30"
                                  }`}
                                />
                              );
                            })}
                          </View>
                      )}
                      </View>
                   

                  </View>
                );

                case "arenas":
                  if(selectedTab !== "arenas") return ; 
                   return (
                     <ArenaDisplayer userArenas={userArenas} onPressArena={()=>{}} selectedArena={selectedArena}
                      setSelectedArena = {setSelectedArena} setOpenEditArenaModal = {setOpenEditArenaModal}
                      playPerformance = {playPerformance} setPostToDeleteId = {setPostToDeleteId}
                     />
                   )

              case "stages":
                  if(selectedTab !== "stages" ) return ; 
                  return  <StageCaroussel stages = {userTalents} user={user} onPress={() => { onClose() }} />
             }
          }}
        />
        </View>
      </Animated.View>
   

      {hamburgerMenu && (
            <View
                style={{
                    position: "absolute",
                    top: insets.top + 45,
                    right: 10,
                    width: 215,
                    backgroundColor: "rgba(17,18,20,.98)",
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: "rgba(234,179,8,.18)",
                    paddingVertical: 8,
                    zIndex : 999
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        setHamburgerMenu(false);
                        logout()
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="image-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Log Out
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        height: 1,
                        backgroundColor: "rgba(255,255,255,.06)",
                        marginHorizontal: 16,
                    }}
                />

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        setModalVisible(true)
                        setHamburgerMenu(false)
                      }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",

                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Edit Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        pickImage(setCoverImg)
                        setHamburgerMenu(false)
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="image-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Update Cover
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        pickImage(setProfileImg)
                        setHamburgerMenu(false)
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",

                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={width/25}
                        color="#eab308"
                    />
                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Update Profile
                    </Text>
                </TouchableOpacity>
            </View>
            )}

        {openCreateArenaModal && (
        <CreateArenaModal 
             user={user} 
             isVisible={openCreateArenaModal} 
             setOpenModal = {setOpenCreateArenaModal}
             setIsVisible = {setOpenCreateArenaModal} 
             onCreateArena = {createArena}
             />
        )}
        {openEditArenaModal && (
        <EditArenaModal
         isVisible={openEditArenaModal}
         setIsVisible={
           setOpenEditArenaModal
         }
         arena={selectedArena}
         width={width}
         height={height}
         onSave={updateArena}
       />
       )}
        <EditProfileModal
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          handleSave={handleSave}
          user={user}
        />
        {openArenaAlertModal && (
        <ArenaAlertModal
            isVisible={openArenaAlertModal}
            setIsVisible={setOpenArenaAlertModal}
            title = {alertContent[arenaActionModal].title}
            message = {alertContent[arenaActionModal].text}
            type = {alertType[arenaActionModal]}
            onConfirm = {confirmAction[arenaActionModal]}
        />
        )}
  
    </View>
  );
}
