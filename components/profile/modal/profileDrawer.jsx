
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
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
    userTalents
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
  // const [selectedArena, setSelectedArena] = useState(userArenas[0]);
  const [refreshing, setRefreshing] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [openCreateArenaModal ,setOpenCreateArenaModal] = useState(false)
  const [openEditArenaModal , setOpenEditArenaModal] = useState(false)
  const [postToDeleteId, setPostToDeleteId] = useState(null)
  const [hamburgerMenu , setHamburgerMenu] = useState(false)
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerBlack, setHeaderBlack] = useState(false);
  const THRESHOLD = height/12;
  
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


  // ---------------- DRAWER ANIMATION ----------------
//   useEffect(() => {
//     translateX.value = visible
//       ? withSpring(0)
//       : withTiming(width);
//   }, [visible]);

// const panGesture = Gesture.Pan()
//   .activeOffsetX([15, 999])     // must move right a bit
//   .failOffsetY([-20, 20])       // vertical scroll wins
//   .onStart((e) => {
//     // store whether gesture started from edge
//     panGesture.isEdge = e.absoluteX > width - EDGE_WIDTH;
//   })
//   .onUpdate((e) => {
//     // ❌ ignore if NOT from edge
//     if (!panGesture.isEdge) return;
//     if (e.translationX > 0) {
//       translateX.value = e.translationX * 0.85;
//     }
//   })
//   .onEnd((e) => {
//     if (!panGesture.isEdge) return;
//     const shouldClose =
//       e.velocityX > 1000 || translateX.value > width * 0.35;

//     if (shouldClose) {
//       translateX.value = withTiming(width, { duration: 200 });
//       runOnJS(onClose)();
//     } else {
//       translateX.value = withSpring(0, {
//         damping: 20,
//         stiffness: 150,
//       });
//     }
//   });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }],
//   }));

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
      value: follow?.followers.length,
    },
    {
      icon: "account-plus",
      label: "Following",
      value: follow?.followings.length,
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

  const renderPerformance = ( {item , index } ) => {
    
    return  (
      // <View>
      <PerformanceCard 
        item={item}
        index={index}
        CARD_WIDTH={CARD_WIDTH}
        playPerformance = {playPerformance}
        performanceCount={selectedArena.posts.length}
        canEdit = {true}
        setPostToDeleteId ={setPostToDeleteId}
      />
      // </View>
      )
  };

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
                  <ProfileTabs selectedTab = {selectedTab} setSelectedTab = {setSelectedTab} setActiveTab={setActiveTab} 
                  setOpenArenaAlertModal ={setOpenArenaAlertModal}  setArenaActionModal ={setArenaActionModal} 
                  />
                );
  
              case "friends":
                if(selectedTab === "arenas" || selectedTab === "stages") return ; 
                return (
                    <View
                    className="b g-primary items-center justify-center"
                    style={{
                      width,
                      // height: width * 1,
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
                         isMe = {true}
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
                      setSelectedArena = {setSelectedArena} setOpenEditArenaModal = {setOpenEditArenaModal}
                      playPerformance = {playPerformance} setPostToDeleteId = {setPostToDeleteId}
                     />
                   )

                case "performances":
                  if(selectedTab !== "arenas" ) return ; 
                  if(!selectedArena) {
                    return (
                      <WelcomeToCreateArena  setOpenArenaAlertModal={setOpenArenaAlertModal} setArenaActionModal={setArenaActionModal} />
                    ); 
                  }
                  // if( selectedArena?.posts.length == 0) 
                  //   return (
                  //   <>
                  //   <TouchableOpacity
                  //         activeOpacity={0.85}
                  //         // onPress={onUploadPerformance}
                    
                  //         onPress={() => {
                  //           setArenaActionModal("create_performance")
                  //           setOpenArenaAlertModal(true)
                  //         }}
                  //         style={{
                  //           marginHorizontal: 12,
                  //           marginTop: 20,
                  //           marginBottom: 30,
                  //           // height: 62,
                  //           borderRadius: 12,
                  //           backgroundColor:
                  //             "#eab308",
                  //           justifyContent: "center",
                  //           alignItems: "center",
                  //         }}
                  //         className = "py-4"   >
                        
                  //       {uploadPerformanceLoading ? (
                  //         <View
                  //         style={{
                  //             flexDirection: "row",
                  //             alignItems: "center",
                  //         }}
                  //         >
                  //         <ActivityIndicator
                  //             size="small"
                  //             color="#000"
                  //         />
                  //         <Text
                  //             style={{
                  //             color: "#000",
                  //             fontWeight: "800",
                  //             marginLeft: 10,
                  //             // letterSpacing: 1,
                  //             fontSize: width / 32,
                  //             }}
                  //         >
                  //             UPLOADING...
                  //         </Text>
                  //         </View>
                  //         ) : (
                  //         <Text
                  //         style={{
                  //           color: "#000",
                  //           fontWeight: "800",
                  //           fontSize: width / 32,
                  //         }}
                  //       >
                  //         Add Performance
                  //       </Text>
                  //     )}
                  //   </TouchableOpacity>
                  //   <EmptyPostArena width ={width} />
                  //   </>
                  // )

                  return (
                    <>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        setArenaActionModal("create_performance")
                        setOpenArenaAlertModal(true)
                      }}
                      style={{
                        marginHorizontal: 12,
                        marginTop: 12,
                        marginBottom: 30,
                        // height: 62,
                        borderRadius: 12,
                        backgroundColor:
                          "#eab308",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className = "py-4"   >
                      {uploadPerformanceLoading ? (
                          <View
                          style={{
                              flexDirection: "row",
                              alignItems: "center",
                          }}
                          >
                          <ActivityIndicator
                              size="small"
                              color="#000"
                          />

                          <Text
                              style={{
                              color: "#000",
                              fontWeight: "800",
                              marginLeft: 10,
                              // letterSpacing: 1,
                              fontSize: width / 32,
                              }}
                          >
                              UPLOADING...
                          </Text>
                          </View>
                          ) : (
                          <Text
                          style={{
                            color: "#000",
                            fontWeight: "800",
                            fontSize: width / 32,
                          }}
                        >
                          Add Performance
                        </Text>
                      )}
                    </TouchableOpacity>
                    <View
                    style ={{
                      width,
                      // height:height/2
                    }}>
                    <FlatList
                    data = {selectedArena.posts}
                    keyExtractor = {(item) => item._id}
                    nestedScrollEnabled = {true}
                    numColumns = {2}
                    renderItem = {renderPerformance}
                    contentContainerStyle = {{
                      // paddingBottom: 80,
                      marginTop: 80,
                    }}
                    columnWrapperStyle={{
                      justifyContent: "center",
                      marginBottom: 8,
                      gap :8
                    }}
                   
                  />
                  </View>
                  {selectedArena.posts.length >= 5 && (
                    <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setArenaActionModal("create_performance")
                      setOpenArenaAlertModal(true)
                    }}
                    style={{
                      marginHorizontal: 12,
                      marginTop: 24,
                      marginBottom: 30,
                      // height: 62,
                      borderRadius: 12,
                      backgroundColor:
                        "#eab308",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className = "py-4"   >
                    {uploadPerformanceLoading ? (
                        <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                        >
                        <ActivityIndicator
                            size="small"
                            color="#000"
                        />

                        <Text
                            style={{
                            color: "#000",
                            fontWeight: "800",
                            marginLeft: 10,
                            // letterSpacing: 1,
                            fontSize: width / 32,
                            }}
                        >
                            UPLOADING...
                        </Text>
                        </View>
                        ) : (
                        <Text
                        style={{
                          color: "#000",
                          fontWeight: "800",
                          fontSize: width / 32,
                        }}
                      >
                        Add Performance
                      </Text>
                    )}
                  </TouchableOpacity>
                  )}
               
                  </>
                  )
                 
              case "stages":
            
                if(selectedTab !== "stages" ) return ; 
                 return  <StageCaroussel  onPress={() => { onClose() }} />
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
