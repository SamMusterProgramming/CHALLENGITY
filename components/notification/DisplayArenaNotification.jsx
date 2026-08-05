import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, useWindowDimensions, LayoutAnimation, Platform, UIManager 
} from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { deleteUserNotification, getArenaByProfile, getArenaByUser, getNotificationByUser, toggleFollowerArena, toggleStarArena, updateNotificationByUser } from '../../apiCalls';
import { countries, stageIcons } from '../../utilities/TypeData';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import StarArenaButton from '../viewArenas/custom/starArenaButton';
import { LinearGradient } from 'expo-linear-gradient';
import FollowArenaButton from '../viewArenas/custom/followArenaButton';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DisplayArenaNotification({ notification, setNotifications, user }) {

  const { width, height } = useWindowDimensions();
  const { userFriendData, setUserFriendData  } = useGlobalContext();
  const [isRead, setIsRead] = useState(notification.is_read);
  const [showDelete, setShowDelete] = useState(false);
  const [not, setNot] = useState(null);
  const [arenas , setArenas] = useState(null)
  const [ selectedArena , setSelectedArena ] = useState(null)
  const [showPerformance , setShowPerformance] = useState(false)
  const [showArena , setShowArena] = useState(false)

  const [posts, setPosts] = useState([])


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
  
  const handleAction = async() => {
    if(posts.length) setShowPerformance(!showPerformance)
    switch (notification.type) {
      case 'arena_created':
        if (selectedArena) return setShowArena(!showArena) ; 
        if(!notification.sender_id) {
          await getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata.arena_id)
          setShowArena(!showArena)
           return ;
        }
        await getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
        setShowArena(!showArena)
      break;
      case 'star_arena':
        if (selectedArena) {  setShowArena(!showArena); return ;}; 
        if(!notification.is_read) markAsRead()
        if(!notification.sender_id) {
          await getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata.arena_id)
          setShowArena(!showArena)
           return ;
        }
        await getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
        setShowArena(!showArena)
      break;
      case 'follow_arena':
        if (selectedArena) return setShowArena(!showArena); 
        if(!notification.is_read) markAsRead()
        if(!notification.sender_id) {
          await getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata.arena_id)
          setShowArena(!showArena)
           return ;
        }
        await getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
        setShowArena(!showArena)
      break;
      case 'performance_added':
        if (posts.length) return ; 
        if(!notification.is_read) markAsRead()
        if(!notification.sender_id) {
           getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata.arena_id)
           return ;
        }
        getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
      break;
      case 'fire_received':
        if (posts.length) return ; 
        if(!notification.is_read) markAsRead()
        if(!notification.sender_id) {
           getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata.arena_id)
           return ;
        }
        getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
      break;
      case 'comment_received':
        if (posts.length) return ; 
        if(!notification.is_read) markAsRead()
        if(!notification.sender_id) {
           getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata.arena_id)
           return ;
        }
        getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
      break;
      case 'spotlight_featured':
        if (posts.length) return ; 
        if(!notification.is_read) markAsRead()
        if(!notification.sender_id) {
           getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata.arena_id)
           return ;
        }
        getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
      break;
    
      default:
        break;
    }
  };

 useEffect(() => {
   if(!selectedArena || notification.type == 'arena_created' || notification.type == 'star_arena' ||  notification.type === "follow_arena") return  ; 
   if( !selectedArena.posts.find(p => p._id.toString() === notification.metadata.post_id.toString())){
      deleteNotification()
   }
    markAsRead()
    let pts = []
    selectedArena.posts.map((p) => {
          let post = p
          post = {...post, arena_id : selectedArena._id ,
                           arenaName :selectedArena.arenaName ,
                           talentType : selectedArena.talentType ,
                           region : selectedArena.region ,
                           profileImage : selectedArena.profileImage ,
                           owner_id : selectedArena.owner_id
                 }
          pts.push(post)
       // }
   })
   const updatedPosts = [
       pts.find(p => p._id.toString() === notification.metadata.post_id.toString()),
       ...pts.filter(p => p._id.toString() !== notification.metadata.post_id.toString()),
     ];
   let morePosts = []
   const remainingArena = arenas.filter(a => a._id !== selectedArena._id)
   remainingArena.map((a) =>{
        a.posts.map((p) => {
           const pt = {...p, arena_id : a._id ,
                arenaName : a.arenaName ,
                talentType : a.talentType ,
                region : a.region ,
                profileImage : a.profileImage ,
                owner_id : a.owner_id
        }
        morePosts.push(pt)
        })
   })
   setPosts([...updatedPosts ,...morePosts])
   setShowPerformance(!showPerformance)
 }, [selectedArena])
 
 
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

  const playPerformance = () => {
    if(!posts || posts.length == 0) return ;
    if(notification.type === "fire_received" || notification.type === "comment_received" ) 
      setTimeout(() => {
        deleteNotification(notification._id)
      }, 3000);
    else   markAsRead();
    // setShowPerformance(false)
    router.push({
        pathname:
          "/arenaPerformancePlayer",
        params: {
          selectedPostId: notification.metadata.post_id,
          type :"",
          arenaPosts:
            JSON.stringify(
               posts
            ),
          arena : JSON.stringify(
            null
          )
        },
    });
  }

  useEffect(() => {
     if(!showPerformance) return ;
     setTimeout(() => {
       setShowPerformance(false)
     }, 30000);
  }, [showPerformance])

  useEffect(() => {
    if(!showArena) return ;
    setTimeout(() => {
      setShowArena(false)
    }, 30000);
 }, [showArena])

 const toggleFollower = async () => {
  if (!selectedArena) return;
  if(!notification.is_read) markAsRead()
  const response = await toggleFollowerArena({
    arenaId: selectedArena._id,
    userId: user._id,
    userName: user.name
  });
  const updated = {
    ...response,
    isStarred: selectedArena.isStarred,
  }
  setSelectedArena({
    ...updated,
    isStarred: selectedArena.isStarred,
  });
};

const toggleStar = async () => {
  if (!selectedArena) return;
  if(!notification.is_read) markAsRead()
  const response = await toggleStarArena({
    arenaId: selectedArena._id,
    userId: user._id,
    userName : user.name
  });
  const updated = {
    ...response,
    isFollower: selectedArena.isFollower,
  }
  setSelectedArena({
    ...updated,
    isFollower: selectedArena.isFollower,
  });
  
};

 const displayArena = () =>{
   return (
    <TouchableOpacity
    activeOpacity={0.9}
    onPress={() => onPressArena(item)}
    style={{
        width:width ,
        height:height/3,
        borderRadius:12,
        overflow:"hidden",
        padding: 1
    }} 
    className ="justify-center mt-4 items-center"
     >
    <Image
        source={{uri:selectedArena.coverImage.publicUrl}}
        style={{
            width:"95%",
            height:"100%",
            position:"absolute",
        }}
        resizeMode="cover"
        className ="rounded-lg"
    />
    <LinearGradient
        colors={[
            "transparent",
            "rgba(0,0,0,.45)",
            "rgba(0,0,0,.65)",
            "rgba(0,0,0,.85)",
            "#000",
        ]}
        style={{
            position:"absolute",
            left:5,
            width: "100%",
            bottom:0,
            height:"80%",
        }}
    />
    <LinearGradient
        colors={[
            "transparent",
            "rgba(0,0,0,.75)",
            "rgba(0,0,0,.75)",
            "transparent",
        ]}
        style={{
            position:"absolute",
            left:5,
            right:width/4,
            bottom:110,
            height:"50%",
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            overflow: "hidden",
        }}
    />
    {/* Header */}
    <View
        style={{
            position:"absolute",
            left:10,
            right:10,
            bottom:0,
        }}  >
        <View
            style={{
                flexDirection:"row",
                alignItems:"center",
            }}
            className = "px-4"
        >
            <Image
                source={{uri:selectedArena.profileImage.publicUrl}}
                style={{
                    width:width/6,
                    height:width/6,
                    borderRadius:50,

                    borderWidth:2,
                    borderColor:"#eab308",
                }}
            />
            <View
                style={{
                    flex:1,
                    marginLeft:12,
                }}
            >
                <View
                    style={{
                        flexDirection:"row",
                        alignItems:"center",
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            color:"#FFF",
                            fontWeight:"700",
                            fontSize:width/25,
                            flex:1,
                        }}
                    >
                        {selectedArena.arenaName}
                    </Text>
                    {selectedArena.verified && (

                        <MaterialCommunityIcons
                            name="check-decagram"
                            size={18}
                            color="#eab308"
                        />

                    )}

                </View>
                <Text
                    style={{
                        color:"#eab308",
                        fontSize:width/32,
                        marginTop:4,
                        fontWeight:"700",
                    }}
                >
                    {selectedArena.talentType} • {selectedArena.region}
                </Text>
                <Text
                    numberOfLines={2}
                    style={{
                        color:"rgba(255,255,255,.82)",
                        marginTop:4,
                        fontWeight : "700",
                        fontSize : width/38,
                        lineHeight:18,
                    }} >
                    {selectedArena.biography}
                </Text>
            </View>
        </View>
        <Text 
            numberOfLines={2}
            style ={{
                paddingTop :18,
                paddingBottom :18,
                // marginLeft : 18,
                fontWeight : "600",
                fontSize : width/38,
                lineHeight : 18 ,
                width : width * 0.75
            }}
        className="text-white ml-6 text-xs tracking-wide">
        {selectedArena.description} 
        </Text> 
        {/* Stats */}
        <View
            style={{
                flexDirection:"row",
                marginTop:0,
                justifyContent:"space-between",
            }}
            className = "px-4"
        >
            <Stat
                icon="star"
                value={selectedArena.starCount}
                width={width}
            />
            <Stat
                icon="play-box-multiple-outline"
                value={selectedArena.postCount}
                width={width}

            />
            <Stat
                icon="account-group-outline"
                value={selectedArena.followerCount}
                width={width}

            />
        </View>

        <View
        className ="flex-row w-full justify-start items-center px-4">
          {notification.sender_id && (
             <FollowArenaButton width={width} onPress = {toggleFollower} isFollowed={selectedArena.isFollower} />
          )}
        </View>
      
    </View>

    {notification.sender_id && (
      <View
        className = "absolute top-4 right-8" >
              <StarArenaButton
                    width={width}
                    isStarred={selectedArena.isStarred}
                    onPress={toggleStar}
                    />
    </View>         
   )}

    

   </TouchableOpacity>
   )
 }
  

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={ handleAction}
      // onPress={() => setShowPerformance(!showPerformance)}
      style ={{
        zIndex: showDelete ? 9999 : 1,
        // elevation: showDelete ? 9999 : 1,
      }}
      className={`mx-1 mb-4 rounded-xl  py-4  border overflow-hidden ${
        isRead
          ? "bg-[#19130a] border-white/5"
          : "bg-primary  bo rder-[#F4C542]/35"
      }`}
      >
      {/* Gold Accent */}
      {!isRead && (
        <View className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F4C542]" />
      )}
      {/* {!isRead && (
        <View className="absolute left -0 top-0 bott om-0 w-[100%] h-[3px] bg-[#F4C542]" />
      )} */}
      {/* {!isRead && (
        <View className="absolute left -0 top-0 bott om-0 w-[100%] h-[3px] bg-[#F4C542]" />
      )} */}
      
      <View className="flex-row items-center px-4 ">
         {/* Thumbnail */}
         <View className="ml- 4 mt-auto">
          <Image
            source={{
              uri:
                notification.presentation?.image ||
                user.profileImage.publicUrl,
            }}
            resizeMode="cover"
            className="w-20 h-20 rounded-full border border-[#F4C542]/20"
          />
        </View>
       
        {/* Content */}
        <View className="flex-1 h- 20 ml-4">
  
          <View className="flex-row items-center">
            <Text
              numberOfLines={1}
              className="text-white font-extrabold mr-4"
              style={{
                fontSize: width / 27,
              }}
            >
              {notification.metadata.arena_name} 
            </Text>
            {/* {!isRead && (
              <View className="w-2 h-2 rounded-full bg-[#F4C542]" />
            )} */}
            <Text
              style={{
                fontSize: width / 32,
              }}
            >
              {stageIcons[notification.metadata.stageName]}
            </Text>
          </View>
  
          <Text
            className="text-[#F4C542] font-black mt-1"
            style={{
              fontSize: width / 30,
            }}
          >
            {notification.metadata.talentName}
            {
              countries.find(
                c =>
                  c.code ===
                  notification.metadata.arena_region
              )?.name 
            }
           {" "}
           {
              countries.find(
                c =>
                  c.code ===
                  notification.metadata.arena_region
              )?.flag
            }
          </Text>
         
         <View
           className ="mt-auto pt-2">
          <Text
            numberOfLines={2}
            className="text-zinc-300 font-bold"
            style={{
              fontSize: width / 32,
              lineHeight: 19,
            }}
          >
            {notification.presentation.text}
          </Text>
         </View>

        </View>
  
      </View>

      {showPerformance && posts.length !== 0 &&  (
           <TouchableOpacity
           onPress={playPerformance}
           className ="p-2 px-4 w-full mt-4 items-center opa ci ty-80">
              <Image
                source={{
                  uri:
                    posts[0].media?.thumbnail. cdnUrl || user.profileImage.publicUrl
                }}
                style ={{
                  height : height/3
                }}
                resizeMode="cover"
                className="w-full h-[200] rounded-xl b order borde r-[#F4C542]/20"
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 3,
                  right: 3,
                  bottom: 0,
                  // backgroundColor:"rgba(0,0,0,0.4)",
                  justifyContent:"center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="play-circle"
                  size={60}
                  color="rgba(255,255,255,0.9)"
                />
              </View>
              <View
                    style={{
                        position: "absolute",
                        bottom: 10,
                        // left: 2,
                        // right: 2,
                        width : "98%",
                        padding : 10
                    }}
                    className = " rounded-3xl flex-row justify-between items-center bg-[#000]/40"
                    > 
                        <View
                            style={{
                            }}
                            className ="flex-row gap-1 items-center" >
                            <MaterialCommunityIcons
                                name="eye"
                                size={width/25}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/30 }}>
                                {posts[0].viewCount || 0}
                            </Text>
                        </View>
                        
                        <View
                            style={{
                            }}  className ="flex-row gap-1 items-center"  >
                            <MaterialCommunityIcons
                                name="star-four-points"
                                size={width/23}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/30 }}>
                                {posts[0].fireCount || 0}
                            </Text>
                        </View>

                        <View
                            style={{
                            }}  className ="flex-row gap-1 items-center"  >
                            <MaterialCommunityIcons
                                name="message"
                                size={width/25}
                                color="#eab308"
                            />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/30 }}>
                                {posts[0].commentCount || 0}
                            </Text>
                        </View>
               </View>
           </TouchableOpacity>
      )}

        {showArena && selectedArena &&  (
          //  <TouchableOpacity
          //  onPress={playPerformance}
          //  className ="p-2 px-4 w-full mt-2 items-center opa ci ty-80">
          //     <Image
          //       source={{
          //         uri:
          //           selectedArena.coverImage.publicUrl || user.profileImage.publicUrl
          //       }}
          //       style ={{
          //         height : height/3
          //       }}
          //       resizeMode="cover"
          //       className="w-full h-[200] rounded-xl b order borde r-[#F4C542]/20"
          //     />
          //     <View
          //       style={{
          //         position: "absolute",
          //         top: 0,
          //         left: 3,
          //         right: 3,
          //         bottom: 0,
          //         backgroundColor:"rgba(0,0,0,0.4)",
          //         justifyContent:"center",
          //         alignItems: "center",
          //       }}
          //     >
          //       <Ionicons
          //         name="play-circle"
          //         size={60}
          //         color="rgba(255,255,255,0.9)"
          //       />
          //     </View>
          //     <View
          //           style={{
          //               position: "absolute",
          //               bottom: 10,
          //               // left: 2,
          //               // right: 2,
          //               width : "98%",
          //               padding : 10
          //           }}
          //           className = " rounded-3xl flex-row justify-between items-center bg-[#000]/40"
          //           > 
          //               <View
          //                   style={{
          //                   }}
          //                   className ="flex-row gap-1 items-center" >
          //                   <MaterialCommunityIcons
          //                       name="eye"
          //                       size={width/25}
          //                       color="#eab308"
          //                   />
          //                   <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/30 }}>
          //                       {selectedArena.postCount || 0}
          //                   </Text>
          //               </View>
                        
          //               <View
          //                   style={{
          //                   }}  className ="flex-row gap-1 items-center"  >
          //                   <MaterialCommunityIcons
          //                       name="star-four-points"
          //                       size={width/23}
          //                       color="#eab308"
          //                   />
          //                   <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/30 }}>
          //                       {selectedArena.starCount || 0}
          //                   </Text>
          //               </View>

          //               <View
          //                   style={{
          //                   }}  className ="flex-row gap-1 items-center"  >
          //                   <MaterialCommunityIcons
          //                       name="message"
          //                       size={width/25}
          //                       color="#eab308"
          //                   />
          //                   <Text style={{ color: "#fff", fontWeight: "700", fontSize: width/30 }}>
          //                       {selectedArena.followerCount || 0}
          //                   </Text>
          //               </View>
          //      </View>
          //  </TouchableOpacity>
          displayArena()
      )}

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
  
      {/* FLOATING MENU */}
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
           {/* {!isRead && (
              <View className="absolute bottom-4 right-6 w-2 h-2 rounded-full bg-[#F4C542]" />
            )} */}
          

    </TouchableOpacity>
  );
}


function Stat({icon,value,width}){
  return(
      <View
          style={{
              flexDirection:"row",
              alignItems:"center",
          }}
      >
          <MaterialCommunityIcons
              name={icon}
              size={width/20}
              color="#eab308"
          />
          <Text
              style={{
                  color:"#FFF",
                  marginLeft:4,
                  fontWeight:"600",
                  fontSize:width/30,
              }}
          >
              {value}
          </Text>
      </View>
  )
}