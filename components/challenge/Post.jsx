import { View, Text, ImageBackground, Image, TouchableOpacity, Platform, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { icons, images } from '../../constants'
import Ionicons from '@expo/vector-icons/Ionicons';

import { useGlobalContext } from '../../context/GlobalProvider';
import { acceptFriendRequest, addFollowing, friendRequest, getCommentsByPost, getFollowings, getUserFriendsData, liked, loadLikeVoteData, removeFriendRequest, unFollowings, unfriendRequest, updateThumbNail, voted } from '../../apiCalls';
// import PostFooter from './PostFooter';
import { router, useFocusEffect } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { formatTime, getInition, getTimeLapse } from '../../helper';
import CommentDisplayer from '../comments/CommentDisplayer';
import PostFooter from '../footers/PostFooter';
import ProgresssBarVideo from '../custom/ProgresssBarVideo';
import CustomAlert from '../custom/CustomAlert';
import DisplayChallengers from './DisplayChallengers';
import { generateThumbnail, getVideo } from '../../videoFiles';
import { uploadThumbnail } from '../../firebase';

// import { Video ,ResizeMode } from 'expo-video';
// import Video from 'expo-av';





export default function Post({participant,challenge,index,isVisible,setViewableItems,videoPath,setFinishPlaying}) {
   
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

    const [commentCount,setCommentCount] = useState(0)
   
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState("");
    const [text,setText] = useState()

    const [videoUri ,setVideoUri] = useState(null)
    const [thumbNailURL,setThumbNailURL] = useState(participant.thumbNail_URL || null)
    const videoRef = useRef(null);

    const player =  useVideoPlayer
    (
      // participant.video_urll
      videoUri
      , (player) => {
      player.loop = false;
      player.volume = 0.5
      player.play() ;
      player.timeUpdateEventInterval = 0.1;
    });
    
    const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

    
    useEffect(() => {
      challenge.participants.map(participant =>{
        if(participant.user_id === user._id) {
            setOwnChallenge(true)
         } 
      })
      participant.user_id == user._id ?  setOwnPost(true) : setOwnPost(false)
      }, [])
      
    const [chall , setChall] = useState(null)  
    useEffect(() => {
        const loadVideo = async () => {
              await getVideo(participant.video_url).then(path =>{
              setTimeout(() => {
                isVisible && !videoUri && setVideoUri(path)
              }, 1000);   
              });

              // if(!thumbNailURL && isVisible){
              //   await generateThumbnail(participant.video_url).then(url => {
              //       console.log(url)
              //       uploadThumbnail(url.uri , user.email).then(downloadedURL => { 
              //       updateThumbNail(challenge._id,{user_id:participant.user_id,thumbNail_URL:downloadedURL},setThumbNailURL)
              //     })
              //   })   
        
              //  }
        };
       !videoUri && loadVideo();

       
    }, [participant.video_url , isVisible ,isPlaying]);


    useEffect(() => { 
      //  if(videoUri && player) player.loadAsync({ uri: videoUri });
    }, [videoUri,player])
    
    //*************************************************************player here function***********************************************
 

    useEffect(() => {
      if(isVisible && videoUri){
         player.play()
         setIsPlaying(true)
        } else {        
         player.pause()
         setIsPlaying(false)    
         setDisplayComments(false)
        } 
      
    }, [isVisible,videoUri])

 
    useEffect(() => {
      if(isPlaying){
         isVisible && player.play()
         setDisplayComments(false)
        } else {        
         player.pause()
        } 
    }, [isPlaying])



    const toggleVideoPlaying = () =>{
      if(isPlaying){
        player.pause()
        setIsPlaying(false)
      }else {
        player.play()
        setIsPlaying(true)
      }
      }

      useFocusEffect(
        useCallback(() => {
          return async() => {
            if (videoRef.current) {
               setIsPlaying(false)
            }
          };
        }, [videoRef])
      );
    
     
      // useEffect(
      //   () => {
      //     return async() => {
      //       console.log("clean up here")
      //       await player.unloadAsync();
      //     }
      //  }, [videoUri] )
      

      

      useEffect(() => {
        const statusSubscription = player?.addListener(
          'playingChange',
          ({isPlaying }) => {
            const finishedThreshold = player.duration-1;
            if (
              player.currentTime >= finishedThreshold &&
              player.currentTime > 0 && videoUri
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
      }, [videoUri]);

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
      setIsModalVisible(false) 
      const rawBody = user;
      friendRequest(participant.user_id,rawBody,setAddFriendRequest)
   }   

   const unfriendFriendRequest = () => {
    setIsModalVisible(false)

    const rawBody = user;
    unfriendRequest(participant.user_id,rawBody,setAddFriendRequest)
  }
  const okFriendRequest = () => {
    setIsModalVisible(false)
    const rawBody ={
      _id:participant.user_id,
      name:participant.name,
      email:participant.email,
      profile_img:participant.profile_img
    }
    acceptFriendRequest(user._id,rawBody,setAddFriendRequest)
  }
  const cancelFriendRequest = () => {
    setIsModalVisible(false)
    removeFriendRequest(participant.user_id,user,setAddFriendRequest)
  }
  
  
  const confirmCancel = () => {
    setIsModalVisible(true)
    setAction("CR")
    setText("Are you sure you want to cancel friend request")
  };

  const confirmFriendRequest = () => {
    setIsModalVisible(true)
    setAction("FR")
    setText("Are you sure you want to send friend request")
  
  };
  
  const confirmAccept = () => {
    setIsModalVisible(true)
    setAction("AC")
    setText("Are you sure you want to accept friend request")
 
  };
  
  const confirmUnfriend = () => {
    setIsModalVisible(true)
    setAction("UN")
    setText("Are you sure you want to remove the friend")
  };

  //********************************** comments ****************************************/

  useEffect(() => {
    getCommentsByPost(participant._id,setCommentData)
  }, [])
  
  
  useEffect(() => {
    // if(commentData === "empty") return setCommentCount(0) 
  
   if(commentData)
    if(commentData == "empty") setCommentCount(0)
    else  setCommentCount(commentData.content.length)
  
  }, [commentData])

  useEffect(() => {
      if(displayComments) setIsPlaying(false)
  }, [displayComments])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
  
  <>
    
    <View className="w-[100vw] min-h-[85%] flex-col justify-start items-center  ">
      

        <ImageBackground className=" flex-1   flex-col justify-start items-center"
            source={images.night_bg} >
            <View
             className="w-full flex-row  items-center  px-1 justify-evenly min-h-[8%]">
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
                    className="w-[30px] h-[30px] rounded-full"
                    source={{uri:participant.profile_img}} 
                    />
                </TouchableOpacity>

                <View className="flex-col w-[30%] justify-center items-center gap-1">
                    <Text className="text-white text-xs font-bold"
                       style={{ fontSize:8}}>
                        {participant.name}
                    </Text>
                    <Text
                      style={{ fontSize:9}}
                      className="text-white text-xs font-bold">
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
               
                {/* <View className="flex-col w-[15%] justify-center items-center gap-1">
                    <Image 
                    className="w-8 h-6"
                      source={icons.heart}
                    />
                    <Text className="text-gray-300 text-xs font-bold">
                       {participant.votes}  Votes
                    </Text>
                </View> */}
          
                    <TouchableOpacity 
                    onPress={ownPost?()=>{}:isFollowing? handleUnFollowing : handleFollowing}
                    className="flex-col w-[22%] justify-center items-center gap-1">
                        <Text className="text-gray-300 text-xs font-bold">
                            Ranked
                         </Text>
                         <Text className="text-gray-300 text-xs font-bold">
                             #  {index +1}
                         </Text>
                    </TouchableOpacity>
          
                   
                    <TouchableOpacity
                       onPress={ownPost?()=>{}:isFollowing? handleUnFollowing : handleFollowing}
                       className="flex-col w-[22%] justify-center items-center gap-1">
                           <View className ="flex-row  justify-center items-center">
                               <Image 
                               className="w-5 h-5"
                                 source={icons.follow}
                                 resizeMode='contain'
                               />
                                {isFollowing && (
                                 <Image 
                                 className="w-5 h-5"
                                 source={icons.check}
                                 resizeMode='contain'
                               />
                               )}
                           </View>
                            <Text className="text-gray-300 text-xs font-bold">
                               {isFollowing ? "Unfollow" : "Follow"} 
                           </Text>
                    </TouchableOpacity>

                {/* <TouchableOpacity
                   onPress={ownPost?()=>{}:isFriend? confirmUnfriend  : 
                    isAccept? confirmAccept : isPending?
                    confirmCancel : confirmFriendRequest  }
                    className="flex-col w-[22%] justify-center gap-1 items-center">
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
                </TouchableOpacity> */}
            </View>

           
         
            <TouchableOpacity 
                // onPress={Platform.OS == "ios" ? toggleVideoPlaying : toggleVideoPlaying 
              
                // }
                onPressOut={toggleVideoPlaying}
                activeOpacity={1}
                className="flex-row items-center bg-primary  justify-center min-w-[100%] min-h-[85%] "
              >       
                    {videoUri ?
                     (
                      <VideoView 
                      ref={videoRef}
                      style={{ width:'100%' ,height:'100%',opacity:20}}
                      player={player}
                      contentFit='cover'
                      nativeControls ={false}
                    />
                     ): 
                      (
                       <Image 
                       style={{ width:'100%' ,height:'100%',opacity:20}}
                       source={{uri:thumbNailURL}}
                       resizeMethod='cover'
                       /> 
                      )
                    }
                      
                   


                       {videoUri && ( <ProgresssBarVideo player={player} visible={!isPlaying} bottom={8} />)} 
                            
                  
                      
                      
                    <TouchableOpacity 
                        hitSlop={Platform.OS === "android" &&{ top: 250, bottom: 250, left: 400, right: 400 }}
                        onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause(), setIsPlaying(false) ) } }
                        className="flex-col absolute  justify-center items-center">
                          {isVisible && !videoUri &&  (
                            <ActivityIndicator size="large" color="#0000ff" />
                          )}
                            <Image 
                            className={isPlaying && videoUri ? "w-14 h-14 opacity-20":"w-14 h-14 opacity-100" }
                            source={!isPlaying  && videoUri && icons.play}/>
                   </TouchableOpacity>

                    { ! isPlaying && (index === 0) && (
                      <View 
                      className="absolute top-3 flex-row w-[150ox]  justify-center gap-2 left-3 items-center">
                        <Text
                        style={{fontSize:10}}
                         className="text-gray-400 text-xm font-black ">{challenge.participants.length}</Text>
                         <Text 
                             style={{fontSize:9}}
                             className="text-gray-200 text-xm font-bold  "> Participants </Text>
                      </View>
                    )}
                </TouchableOpacity>
              
                {displayComments && 
                      <CommentDisplayer vote_count={participant.votes} like_count={participant.likes} style={{marginTop:60,height:"40%"}} setCommentCount={setCommentCount}
                      commentData={commentData} setDisplayComments={setDisplayComments} isVisible={isVisible || displayComments} user={user} post={participant} commentCount={commentCount} /> 
                }
              

            {likesVotesData  &&(
                <PostFooter handleLikes={handleLikes} index={index} handleVotes={handleVotes} isLiked={isLiked} comment_count={commentData && commentCount }
                isVoted={isVoted} participant={participant} likesVotesData={likesVotesData} setDisplayComments={setDisplayComments}/>
            )}
          
        </ImageBackground>    
    </View>

      {isModalVisible && (
        <CustomAlert text={text} action={action} isModalVisible={isModalVisible} unfriendFriendRequest={unfriendFriendRequest}
        okFriendRequest={okFriendRequest} cancelFriendRequest={cancelFriendRequest} sendFriendRequest={sendFriendRequest}
         setIsModalVisible={setIsModalVisible}/>
      )}
   </>


  )
}