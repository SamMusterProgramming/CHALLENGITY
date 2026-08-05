import React, {
  useCallback,
    useEffect,
    useState,
  } from "react";
  
import {
View,
Text,
TouchableOpacity,
Pressable,
} from "react-native";

import {
Ionicons,
MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
VideoView,
useVideoPlayer,
} from "expo-video";
import ArenaPostData from "./arenaPostData";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArenaPostFooter from "./arenaPostFooter";
import { addArenaPostComment, getArenaPostComments, getUserById, isUserFiredPost, isUserFollowingArena, registerView, toggleArenaPostFire } from "../../apiCalls";
import { User } from "lucide-react-native";
import ArenaCommentDrawer from "./modal/arenaCommentDrawer";
import { router } from "expo-router";
import VideoProgressBar from "./custom/VideoProgressBar";
import { useGlobalContext } from "../../context/GlobalProvider";
import SpotlightIcon from "../custom/spotlightIcon";
  
  export default function ArenaVideoItem({
    item,
    index,
    currentIndex,
    width,
    height,
    selectedArena,
    user ,
    onVideoEnd,
  }) {
  
    const [ paused,  setPaused, ] = useState(false);
    const [openCommentDrawer , setOpenCommentDrawer] = useState(false)
    const insets = useSafeAreaInsets();
    const [hasFired , setHasFired] = useState(false)
    const [isFollower  , setIsFollower] = useState(false)
    //   let hasFired = item.isFired
    const [isLoaded , setIsLoaded] = useState(false)
    const [profile , setProfile] = useState(null)
    const [fireCount , setFireCount] = useState(0)
    const [commentCount , setCommentCount] = useState(0)
    const [commentData , setCommentData] = useState([])
    const {globalArenaRefresh, setGlobalArenaRefresh } = useGlobalContext()
    const isVisible = index === currentIndex;
    const player =
    useVideoPlayer(
    item?.media?.video?.cdnUrl,
    player => {
        player.loop = false;
    }
    );

   const isMe = item.owner_id === user._id

   const isLocalSpotlight = item?.localSpotlight?.spotlight;
   const isRegionalSpotlight = item?.regionalSpotlight?.spotlight;
   const isGlobalSpotlight = item?.globalSpotlight?.spotlight;
   const noSpotLight = isLocalSpotlight  || isRegionalSpotlight ||  isGlobalSpotlight 

    const loadProfile = async() => {
        // if(!selectedArena) return ; 
        if(item.owner_id === user._id) return ;
        await getUserById(item.owner_id ,setProfile)
    }

    useEffect(() => {
        if(!profile) return ;
        router.replace({
            pathname: "/ProfileScreen",
            params: {
              userProfile: JSON.stringify(
                profile
              ),
              arena_id : item.arena_id
            },
        });
    }, [profile])
    
    useEffect(() => {
      if (!player) return;
      if (isVisible) {
        if (!paused) {
          player.play();
        }
      } else {
        player.pause();
        if (paused) {
          setPaused(false);
        }
      }
    }, [
      isVisible,
      paused,
    ]);
  
    const togglePlay = () => {
      if (!player) return;
      if (!isVisible) return;
      if (paused) {
        setPaused(false);
        requestAnimationFrame(
          () => {
            player.play();
          }
        );
      } else {
        player.pause();
        setPaused(true);
      }
    };

    // toggle fire post

    const toggleFire = async() => {
      // showLoading('deleting the post ...')
      const data = await toggleArenaPostFire({postId:item._id ,userId:user._id , userName:user.name})
      const fired = data.active
    //   const updatedPost = data.post
      const count = data.count ;
      setFireCount(count) 
      setHasFired(fired)
      setGlobalArenaRefresh(true)
    }
    
    useEffect(() => {
      const checkFire = async() =>{
          const fired = await  isUserFiredPost({postId:item._id , userId:user._id})
          const isFollower = await isUserFollowingArena({arenaId:item.arena_id , userId:user._id})
          setIsFollower(isFollower)
          setHasFired(fired)
          setFireCount(item.fireCount)
          setCommentCount(item.commentCount)
          setIsLoaded(true)
      }
      checkFire()
    }, [])
    
    // loead comments 
    const loadComments = async() => {
        const comments = await getArenaPostComments(item._id)
        setCommentData(comments)
        setOpenCommentDrawer(true)
    }

    const addComment = async(text) =>{
       const comments = await addArenaPostComment(item._id , { userId:user._id , text ,userName : user.name})
       setCommentData(comments)
       setGlobalArenaRefresh(true)
    }

    useEffect(() => {
        if(!commentData.length ) return
        setCommentCount(commentData.length)
      }, [commentData])
    

    //viewing the post
    useEffect(()=>{
    if(item.owner_id.toString() === user._id || !isVisible) return ; 
    const timer = setTimeout(()=>{
        registerView(item._id)
    },3000);
    return () => clearTimeout(timer);
    },[isVisible]);


    useEffect(() => {
        if (!player || !isVisible) return;
        const interval = setInterval(() => {
            if (
                player.duration > 0 &&
                player.currentTime >= player.duration - 0.2
            ) {
                if(!openCommentDrawer) 
                  onVideoEnd?.();
                  player.currentTime = 0
                // player.seekTo?.(0)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [player, isVisible]);


    if(!isLoaded) return null
  
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={togglePlay}
        style={{
          width,
          height,
          backgroundColor:  "#000",
        }}
        className = "items-center  justify-center"
      >
        <View
            style={{
                width: "100%",
                height: "100%",
            }}
            >
            <VideoView
                player={player}
                nativeControls={false}
                contentFit="cover"
                allowsPictureInPicture={false}
                style={{
                width: "100%",
                height: "100%",
                opacity : paused ? 0.8 :1
                }}
            />

            <Pressable
                onPress={togglePlay}
                style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 5,
                }}
            />
        </View>
        {paused && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor:"rgba(0,0,0,0.4)",
              justifyContent:"center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="play-circle"
              size={60}
              color="rgba(255,255,255,0.4)"
            />
          </View>
        )}
  
  
        <ArenaPostData item={item} width={width} onPress = {loadComments} setOpenCommentDrawer = {setOpenCommentDrawer} 
                       hasFired = {hasFired} fireCount ={fireCount}  toggleFire={toggleFire} commentCount = {commentCount} />
        <LinearGradient
        colors={[
        "transparent",
        // "rgba(0,0,0,0.25)",
        // "rgba(0,0,0,0.25)",
        "rgba(0,0,0,0.75)",
        ]}
        style={{
        position:"absolute",
        left:0,
        right:0,
        bottom:0,
        height:100,
        // zIndex:1,
        }}
        />
        <View
          style={{
            position: "absolute",
            left: "20%",
            bottom: 45,
            width : "60%"
          }}
          className = "flex-row justify-center w- full p- 2 b g-[#edebeb]  items-end gap-2"  >
          <Text
            numberOfLines={1}
            style={{
                fontSize: 12,
                // lineHeight: 14,
                color: "#fff",
                // fontFamily: "Inter",
                // letterSpacing: -0.2,
                fontWeight: "600",
                }} 
                className ="text-center" >
            {item?.caption} 
          </Text>
        </View>
        <VideoProgressBar
        player={player}
        visible={true}
        />

        {noSpotLight ? (
          <View className="absolute top-2 right-2  flex-row items-center gap-1 rounded-full bg-black/70  ">
            <SpotlightIcon size ={23} />
          </View>
          ):(
          <View className="absolute top-2 right-2 p-3 flex-row items-center gap-1 rounded-full bg-black/70  ">
              <MaterialCommunityIcons
                name="chart-line"
                size={30}
                color="#fff"
              />
          </View>
        )}

        <ArenaPostFooter post = {item} width = {width} loadProfile = {loadProfile} isFollower = {isFollower} />
        {openCommentDrawer && (
          <ArenaCommentDrawer
            visible = {openCommentDrawer}
            onClose = {() => setOpenCommentDrawer(false)}
            post = {item}
            data = {commentData}
            // comments = [],
            setCommentData = {setCommentData}
            onAddComment = {addComment}
            onDeleteComment ={() =>{}}
            onLikeComment ={() =>{}}
            user ={user}
          />
        )}
       
      </TouchableOpacity>
    );
  }