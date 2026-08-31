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
import ArenaCard from '../viewArenas/displayArena/arenaCard';
import ArenaJourneyCard from '../myJourney/ArenaJourneyCard';

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
          await getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata._id)
          setShowArena(!showArena)
           return ;
        }
        await getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
        setShowArena(!showArena)
      break;
      case 'shared_arena':
        if (selectedArena) return setShowArena(!showArena) ; 
        if(!notification.sender_id) {
          await getArenaByUser(notification.metadata.ownerId,setSelectedArena,setArenas,notification.metadata._id)
          setShowArena(!showArena)
           return ;
        } 
        await getArenaByProfile(notification.metadata.ownerId ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
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
           getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata._id)
           return ;
        }
        getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata.arena_id);
      break;
      case 'shared_performance':
        if (posts.length) return ; 
        if(!notification.is_read) markAsRead()
        if(!notification.sender_id) {
           getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata._id)
           return ;
        }
        getArenaByProfile(notification.metadata.ownerId,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata._id);
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
           getArenaByUser(user._id,setSelectedArena,setArenas,notification.metadata._id)
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
        getArenaByProfile(notification.sender_id ,{requesterId:user._id} , setSelectedArena , setArenas , notification.metadata._id);
      break;
     
    
      default:
        break;
    }
  };

 useEffect(() => {
   if(!selectedArena || notification.type == 'arena_created' || notification.type == 'star_arena' ||  notification.type === "follow_arena" || notification.type === "shared_arena") return  ; 
   if( !selectedArena.posts.find(p => p._id.toString() === notification.metadata.postId?.toString())){
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
       pts.find(p => p._id.toString() === notification.metadata.postId.toString()),
       ...pts.filter(p => p._id.toString() !== notification.metadata.postId.toString()),
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


  

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={ handleAction}
      // onPress={() => setShowPerformance(!showPerformance)}
      style ={{
        zIndex: showDelete ? 9999 : 1,
        // width,
        // minHeight : width/4.2
        // elevation: showDelete ? 9999 : 1,
      }}
      className={`m x-1 mb-4 rounded-3xl items-center  py-2 px-4 border over flow-hidden ${
        isRead
          ? "bg-[#19 130a] borde r-l border-white/15"
          : "bg-p rimary bord er-l-4 border-[gold]/35 "
      }`} >
      
      {!isRead && (
        <View className="absolute h-[9px] rounded-full items-center left-2  top-2  w-[9px] bg-[#F4C542]" />
      )}
   
        
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
                      {notification.metadata.name} 
                    </Text>
                  
                      <View className="fle x-1 items-center justify-center">
                          <MaterialCommunityIcons
                            name="stadium"
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
                      {notification.metadata.talent} {' '}
                      {stageIcons[notification.metadata.talent]} {'  .  '}
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
              {notification.presentation?.text}
            </Text>
          </View>

        </View>
  
      {/* </View> */}

      {showPerformance && posts.length !== 0 &&  (
           <TouchableOpacity
           onPress={playPerformance}
           className ="py-2 px- 4 w-full mt- 4 items-center opa ci ty-80">
              <Image
                source={{
                  uri:
                    posts[0].media?.thumbnail. cdnUrl || user.profileImage.publicUrl
                }}
                style ={{
                  height : width * 0.7
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
                        width : "95%",
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
            <View
            style={{
            }}  className ="mt- 4 self-center py-2 4"  >
               
              <ArenaJourneyCard
                entry = {selectedArena}
                width={width * 0.92 }
                height={width * 0.7}
               />
            </View>
          // displayArena()
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