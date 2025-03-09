import { View, Text, ImageBackground, Image, TouchableOpacity, Platform, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { icons, images } from '../../constants'
import Ionicons from '@expo/vector-icons/Ionicons';

import { useGlobalContext } from '../../context/GlobalProvider';
import { acceptFriendRequest, addFollowing, friendRequest, getCommentsByPost, getFollowings, getUserFriendsData, liked, loadLikeVoteData, removeFriendRequest, unFollowings, unfriendRequest, voted } from '../../apiCalls';
// import PostFooter from './PostFooter';
import { router, useFocusEffect } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { getInition, getTimeLapse } from '../../helper';
import CommentDisplayer from '../comments/CommentDisplayer';
import PostFooter from '../footers/PostFooter';
// import { Video ,ResizeMode } from 'expo-video';
// import Video from 'expo-av';





export default function Post({participant,challenge,index,isVisible,setFinishPlaying}) {
   
    const {user,setUser,isViewed ,setIsViewed,followings,setFollowings
      ,userFriendData,setUserFriendData
    } = useGlobalContext()
    const [isExpired,setIsExpired] = useState(false)
    const [isVoted,setIsVoted] = useState(false)
    const [isLiked,setIsLiked] = useState(false)
    const [autoPlay,setAutoPlay] = useState(isVisible)
    const [isPlaying,setIsPlaying] = useState(false)

    const [displayComments,setDisplayComments] =useState(false)
    const [postComments,setPostComments] =useState(null)

    const [commentData, setCommentData] = useState(null);


    // const [followings,setFollowings] = useState ([])
    const [isFollowing , setIsFollowing] = useState(false)
  
    const [addFriendRequest , setAddFriendRequest] = useState(null)
    const [participantFriendData,setParticipantFriendData] = useState(null)
    // const [userFriendData,setUserFriendData] = useState(null)
    const[isFriend,setIsFriend]= useState(false)
    const[isPending,setIsPending]= useState(false)
    const[isAccept,setIsAccept]= useState(false)
    
    const [ownChallenge , setOwnChallenge ] = useState(false)
    const [ownPost , setOwnPost ] = useState(false)

    const [commentCount,setCommentCount] =useState(0)
   
    const videoRef = useRef(null);
    
    useEffect(() => {
      challenge.participants.map(participant =>{
        if(participant.user_id === user._id) {
            setOwnChallenge(true)
         } 
      })
      participant.user_id == user._id ?  setOwnPost(true) : setOwnPost(false)
      }, [])
      
    //*************************************************************player here function***********************************************
    const player = useVideoPlayer
    (
      participant.video_urll
    
      , (player) => {
      player.loop = false;
      player.volume = 0.1
      player.play() ;
    });

    const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

    useEffect(() => {
      if(isVisible){
         player.play()
         setIsPlaying(true)
        } else {
              
         player.pause()
         setIsPlaying(false)
         
        }
    }, [isVisible])

    const toggleVideoPlaying = () =>{
      if(isPlaying){
        player.pause()
        setIsPlaying(false)
      }else {
        player.play()
        setIsPlaying(true)
      }
      }

      useEffect(() => {
        // console.log(isViewed)
        // if(isViwed) setIsViewed(!isViwed)
      }, []);
    
      useFocusEffect(
        useCallback(() => {
          return () => {
            if (videoRef.current) {
              player.pause();
              // setDisplayComments(false)
            }
          };
        }, [videoRef])
      );

      useEffect(() => {
        const statusSubscription = player?.addListener(
          'playingChange',
          ({isPlaying}) => {
            const finishedThreshold = player.duration;
            if (
              player.currentTime >= finishedThreshold &&
              player.currentTime > 0 
            ) {
              player.currentTime = 0
              setDisplayComments(false)
              setFinishPlaying(true);
              return;
            }
          },
        );
        return () => {
          setFinishPlaying(false)
          statusSubscription.remove();
        };
      }, []);

  //**************************************likes and votes data ************************************** */
    const ids =[ user._id,
        participant._id,
        challenge._id
        ]
    

    const [likesVotesData,setLikesVotesData] = useState(null) 
    useEffect(() => { 
    loadLikeVoteData(ids,setLikesVotesData,likesVotesData, isExpired)   
     },[] )

     const handleLikes = async(e) => {
          liked(ids,setLikesVotesData,likesVotesData,setIsExpired)
    }

    const handleVotes = async(e)=> {
          voted(ids,setLikesVotesData,likesVotesData,setIsExpired)   
     }
    useEffect(() => {
        if(likesVotesData){
        likesVotesData.isLiked ? 
             setIsLiked(true)   
             : setIsLiked(false)
        likesVotesData.isVoted ? 
             setIsVoted(true)   
             : setIsVoted(false)  
        }  
      }, [likesVotesData])
  
  //********************************** following followers data *****************/
      useEffect(() => {
        getFollowings(user._id ,setFollowings)
      }, [])

      useEffect(() => {
        followings.find(following => following.following_id === participant.user_id)?
        setIsFollowing(true) : setIsFollowing(false)
      }, [followings])

      const handleFollowing =  ()=> {
        if(followings.find(following => following.following_id == participant.user_id))
          {
            getFollowings(user._id ,setFollowings)
            return ; 
          }
        console.log("not supposed to be here")
        const rawBody = {
          following_id : participant.user_id,
          following_email:participant.email,
          following_profileimg:participant.profile_img,
          following_name:participant.name,
          follower_profileimg:user.profile_img,
          follower_name:user.name
       }
      addFollowing(user._id,rawBody, setFollowings)
      }
      
    const handleUnFollowing =  ()=> {
      if(!followings.find(following => following.following_id == participant.user_id))
        {
          getFollowings(user._id ,setFollowings)
          return ; 
        }
        const rawBody = {
          following_id : participant.user_id,
          following_email:participant.email,
          following_profileimg:participant.profile_img,
          following_name:participant.name,
          follower_profileimg:user.profile_img,
          follower_name:user.name
       }
       unFollowings(user._id,rawBody, setFollowings)
      }
   //********************************** friends data ****************************************/

  useEffect(() => {
    // getUserFriendsData(user._id,setUserFriendData)
    getUserFriendsData(participant.user_id,setParticipantFriendData)
  }, [])

  useEffect(() => {
    if(participantFriendData){ 
      if(participantFriendData.friend_request_received)
      participantFriendData.friend_request_received.find(data => data.sender_id == user._id)
      ? setIsPending(true) : setIsPending(false)
      if(participantFriendData.friends)
        participantFriendData.friends.find(data => data.sender_id === user._id)
        ? setIsFriend(true) : setIsFriend(false)
      }

    if( userFriendData){
      if(userFriendData.friend_request_received) {
         if(userFriendData.friend_request_received.find(data => data.sender_id == participant.user_id))
         {
          setIsAccept(true)
          setIsPending(false)
          setIsFriend(false)
        } 
        else {setIsAccept(false)
        
      }}}
          
          }
  , [participantFriendData,userFriendData])
   
  useEffect(() => {
    getUserFriendsData(user._id,setUserFriendData)
    getUserFriendsData(participant.user_id,setParticipantFriendData)
    }, [addFriendRequest])

    const sendFriendRequest = () => {    
      const rawBody = user;
      friendRequest(participant.user_id,rawBody,setAddFriendRequest)
   }   
   const unfriendFriendRequest = () => {
    const rawBody = user;
    unfriendRequest(participant.user_id,rawBody,setAddFriendRequest)
  }
  const okFriendRequest = () => {
    const rawBody ={
      _id:participant.user_id,
      name:participant.name,
      email:participant.email,
      profile_img:participant.profile_img
    }
    acceptFriendRequest(user._id,rawBody,setAddFriendRequest)
  }
  const cancelFriendRequest = () => {
    removeFriendRequest(participant.user_id,user,setAddFriendRequest)
  }
  
  
  const confirmCancel = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to cancel friend request",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: cancelFriendRequest }
      ],
      { cancelable: false }
    );
  };
  const confirmFriendRequest = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to send friend request",
  
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: sendFriendRequest }
      ],
      { cancelable: false }
    );
  };
  
  const confirmAccept = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to accept friend requestt",
  
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: okFriendRequest }
      ],
      { cancelable: false }
    );
  };
  
  const confirmUnfriend = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to remove from your friend list",
  
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: unfriendFriendRequest }
      ],
      { cancelable: false }
    );
  };

  //********************************** comments ****************************************/

  useEffect(() => {
    getCommentsByPost(participant._id,setCommentData)
  }, [])
  
  
  useEffect(() => {
    // if(commentData === "empty") return setCommentCount(0) 
    setCommentCount(commentCount * 0 + commentData && commentData.content.length || 0)
  }, [commentData])

  return (
  
  
    
    <View className="w-[100vw] min-h-[88%] flex-col justify-start items-center  ">
        <ImageBackground className=" flex-1   flex-col justify-start items-center"
            source={images.night_bg} >

            <View
             className="w-full flex-row  items-center  px-1 justify-evenly min-h-[7%]">
                <TouchableOpacity 
                onPress={() => {
                if(user._id === participant.user_id){
                  router.push('/profile')
                }
                else{
                 if(isViewed) 
                  {  console.log("i am here routttterrrrr")
                     setIsViewed(false) 
                    router.push({ pathname: '/ViewProfile', params: {user_id:participant.user_id} })
                  }
                  else router.replace({ pathname: '/ViewProfile', params: {user_id:participant.user_id} })
                }
              } }
                className="flex-row w-[10%] justify-center items-center gap-0">
                    <Image 
                    className="w-[35px] h-[35px] rounded-full"
                    source={{uri:participant.profile_img}} 
                    />
                </TouchableOpacity>

                <View className="flex-col w-[27%] justify-center items-center gap-0">
                    <Text className="text-white text-xs font-bold"
                       style={{ fontSize:9}}>
                        {participant.name}
                    </Text>
                    <Text className="text-white text-xs font-bold">
                       {getInition(participant.name)}Challenger
                    </Text>
                </View>

                <View className="flex-col w-[15%] justify-center items-center gap-1">
                  
                    <Text className="text-blue-300 text-xs font-black">
                       {getTimeLapse(participant.createdAt)}  
                    </Text>
                    <Text className="text-gray-300 text-xs font-bold">
                      ago
                    </Text>
                </View>
               
                <View className="flex-col w-[15%] justify-center items-center gap-1">
                    <Image 
                    className="w-8 h-6"
                      source={icons.heart}
                    />
                    <Text className="text-gray-300 text-xs font-bold">
                       {participant.votes}  Votes
                    </Text>
                </View>
          
                    <TouchableOpacity 
                    onPress={ownPost?()=>{}:isFollowing? handleUnFollowing : handleFollowing}
                    className="flex-col w-[15%] justify-center items-center gap-1">
                        <View className ="flex-row  justify-center items-center">
                            <Image 
                            className="w-6 h-6"
                              source={icons.follow}
                              resizeMode='contain'
                            />
                             {isFollowing && (
                              <Image 
                              className="w-6 h-6"
                              source={icons.check}
                              resizeMode='contain'
                            />
                            )}
                        </View>
                         <Text className="text-gray-300 text-xs font-bold">
                            {isFollowing ? "Unfollow" : "Follow"} 
                        </Text>
                    </TouchableOpacity>
            
              

                   
                <TouchableOpacity
                   onPress={ownPost?()=>{}:isFriend? confirmUnfriend  : 
                    isAccept? confirmAccept : isPending?
                    confirmCancel : confirmFriendRequest  }
                    className="flex-col w-[18%] justify-center gap-1 items-center">
                     <View className ="flex-row  justify-center items-center">
                          <Image 
                               className="w-6 h-6"
                               source={icons.friend}
                               resizeMode='contain'
                          />
                          <Image 
                              className="w-6 h-6"
                              source={isFriend? icons.check_red : isPending ? icons.pending: isAccept? icons.check_red:""}
                              resizeMode='contain'
                          />
                      </View>    
                      <Text className="text-gray-300 text-xs font-bold">
                      {isFriend? "Unfriend": isAccept ? "Accept": isPending ?"Pending": "Add Friend"} 
                    </Text>
                </TouchableOpacity>
            </View>
           
         
            <TouchableOpacity 
                // onPress={Platform.OS == "ios" ? toggleVideoPlaying : toggleVideoPlaying 
              
                // }
                onPressOut={toggleVideoPlaying}
                activeOpacity={1}
                className="flex-row items-center bg-primary  justify-center min-w-[100%] min-h-[86%] "
              >          
                      <VideoView 
                        ref={videoRef}
                        style={{  width:'100%' ,height:'100%',opacity:20}}
                        player={player}
                        contentFit='cover'
                        nativeControls ={false}
                      />
                      <TouchableOpacity 
                        hitSlop={Platform.OS === "android" &&{ top: 280, bottom: 280, left: 400, right: 400 }}
                        onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause(), setIsPlaying(false) ) } }
                        className="flex-col absolute  justify-center items-center">
                            <Image 
                            className={isPlaying ? "w-14 h-14 opacity-20":"w-14 h-14 opacity-100" }
                            source={!isPlaying && icons.play}/>
                      </TouchableOpacity>
         
            </TouchableOpacity>
              
                {displayComments && 
                      <CommentDisplayer vote_count={participant.votes} like_count={participant.likes} style={{marginTop:60,height:"40%"}} setCommentCount={setCommentCount}
                      commentData={commentData} setDisplayComments={setDisplayComments} isVisible={isVisible || displayComments} user={user} post={participant} commentCount={commentCount} /> 
                }
            
       


            {likesVotesData && (
                <PostFooter handleLikes={handleLikes} index={index} handleVotes={handleVotes} isLiked={isLiked} comment_count={commentData && commentCount }
                isVoted={isVoted} participant={participant} likesVotesData={likesVotesData} setDisplayComments={setDisplayComments}/>
            )}
          
        </ImageBackground>    
    </View>
    // </KeyboardAvoidingView> 

  )
}