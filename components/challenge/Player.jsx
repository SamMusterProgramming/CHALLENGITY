import { View, Text, Image, TouchableOpacity, Platform, Alert, KeyboardAvoidingView, Pressable, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video ,ResizeMode } from 'expo-av'
import { Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent, useEventListener } from 'expo';
import { icons } from '../../constants';
import { acceptFriendRequest, addFollowing, friendRequest, getCommentsByPost, getFollowings, getUserFriendsData, liked, loadLikeVoteData, removeFriendRequest, unFollowings, unfriendRequest, voted } from '../../apiCalls';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { getInition } from '../../helper';
import CommentDisplayer from '../comments/CommentDisplayer';
import PostSideFooter from "../footers/PostSideFooter"
import SwingingTitle from '../custom/SwingingTitle';
import ProgresssBarVideo from '../custom/ProgresssBarVideo';

    



export default function Player({participant,index,dimension,isVisible,challenge,setFinishPlaying}) {

  const videoRef = useRef()
  const {user,setUser,isViewed,setIsViewed,followings,setFollowings,userFriendData,setUserFriendData} = useGlobalContext()
  const [isExpired,setIsExpired] = useState(false)
  const [videoStatus, setVideoStatus] = useState(null);
  const [isPlaying, setIsPlaying] = useState(isVisible);
  const [isVoted,setIsVoted] = useState(false)
  const [isLiked,setIsLiked] = useState(false)

  const [ownChallenge , setOwnChallenge ] = useState(false)
  const [ownPost , setOwnPost ] = useState(false)
  const [ hasParticipated , setHasParticipated ] = useState(false)


  const [challengeCreater,setChallengeCreator] = useState({name:challenge.name})
  // const [followings,setFollowings] = useState ([])
  const [isFollowing , setIsFollowing] = useState(false)

  const [addFriendRequest , setAddFriendRequest] = useState(null)
  const [participantFriendData,setParticipantFriendData] = useState(null)
  // const [userFriendData,setUserFriendData] = useState(null)
  const[isFriend,setIsFriend]= useState(false)
  const[isPending,setIsPending]= useState(false)
  const[isAccept,setIsAccept]= useState(false)

  const [displayComments,setDisplayComments] =useState(false)
  const [postComments,setPostComments] =useState(null)
  const [commentData, setCommentData] = useState(null);
  const [commentCount,setCommentCount] =useState(0)

  



  useEffect(() => {
    challenge.participants.map(participant =>{
      if(participant.user_id === user._id) {
          setHasParticipated(true)
       } 
    })
    challenge.origin_id == user._id ? setOwnChallenge(true) : setOwnChallenge(false)
    participant.user_id == user._id ?  setOwnPost(true) : setOwnPost(false)
    }, [])

  useEffect(() => {
      challenge.participants.map(participant => {    
        if(participant.user_id === challenge.origin_id) {    
          setChallengeCreator(participant)
         } 
      })
     }, [])

  
  const player = useVideoPlayer
  (
    participant.video_url
    , (player) => {
    player.loop = false;
    player.volume = 0.1
    player.play() ;
    player.timeUpdateEventInterval = 0.1;
  });
 
  const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

  const ids =[ user._id,
    participant._id,
    challenge._id
    ]



const [likesVotesData,setLikesVotesData] = useState(null) 
// console.log(isVisible) 
useEffect(() => { 
loadLikeVoteData(ids,setLikesVotesData,likesVotesData, isExpired)   
 },[] )

 const handleLikes = async(e) => {
    //apiCall.js , when user click like button 
      liked(ids,setLikesVotesData,likesVotesData,setIsExpired)
}

const handleVotes = async(e)=> {
    //apiCall.js , when user vote like button
      voted(ids,setLikesVotesData,likesVotesData,setIsExpired)   
 }

 useEffect(() => {
  if(isExpired){
    setTimeout(() => {
      router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })
    }, 200);
    router.back()
  }
  
}, [isExpired])


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
  
  useEffect(() => {
    getFollowings(user._id ,setFollowings)
  }, [])

  useEffect(() => {
    getUserFriendsData(user._id,setUserFriendData)
    getUserFriendsData(participant.user_id,setParticipantFriendData)
  }, [])

  useEffect(() => {
    followings.find(following => following.following_id === participant.user_id)?
    setIsFollowing(true) : setIsFollowing(false)
  }, [followings])
  
  useEffect(() => {
    if(isVisible){
       player.play()
       setIsPlaying(true)
    } else {
      player.pause()
    setIsPlaying(false)}
  }, [isVisible])
  

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


  const toggleVideoPlaying = () =>{
        if(isPlaying){
          player.pause()
          setIsPlaying(false)
        }else {
          player.play()
          setIsPlaying(true)
        }
  }


  const handleFollowing =  ()=> {
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
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
  >
    <View
     className="flex-1  justify-center items-center">    
               <TouchableOpacity
            
                  onPress={toggleVideoPlaying }
                  activeOpacity={1}
                  className={isPlaying? "w-[100vw] h-[100vh]  opacity-100":"w-[100vw] h-[100vh] opacity-50"}
 
                >
                      <VideoView 
                        ref={videoRef}
                        style={{ width:'100%' ,height:'100%',opacity:100}}
                        player={player}
                        contentFit='cover'
                        nativeControls ={false}
                        pointerEvents='box-only'
                      />
 

              </TouchableOpacity>


              <ProgresssBarVideo player={player} visible={!isPlaying} bottom={72} />

              <TouchableOpacity 
               hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
               onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) } }
               className={!displayComments?"flex-col absolute  justify-center items-center":
                                          "flex-col absolute top-32 justify-center items-center"
                    }>
                  <Image 
                   className="w-14 h-14 opacity-30"
                   source={!isPlaying && icons.play}/>
              </TouchableOpacity>


             {displayComments && 
                      <CommentDisplayer user={user} vote_count={participant.votes} like_count={participant.likes} style={{top:0,maxHeight:"60%"}}
                       post={participant} setDisplayComments={setDisplayComments} isVisible={isVisible} setCommentCount={setCommentCount} commentCount={commentCount} /> 
               }

            {!isPlaying && !displayComments  && (
              <> 
                 <View className="min-w-full  rounded-md absolute top-0 flex-col flex-1 items-center justify-start h-[18%]"
                        style={{top:Platform.OS == "android" ? 0 : 0 }} >
                    <View className="min-w-full  rounded-md bg-bl-800 flex-row items-center justify-between h-[25%]"
                         >
                        <TouchableOpacity
                          onPress={() => router.back()}
                          className="min-w-[7%] h-[100%]  flex-col justify-center  items-center">
                          <Image
                          className="w-7 h-7 bg-white "
                          source={icons.x} />
                        </TouchableOpacity>

                        <View 
                        className="min-w-[35%]  h-[100%] rounded-md bg-s  flex-row justify-center  items-end  ">
                            <Text className="text-white text-xl  font-bold ">
                              Challenge  -
                            </Text>
                        </View>

                        <View 
                        className="min-w-[35%]  h-[100%] rounded-md bg-s flex-1 flex-row justify-center  items-end  ">
                            <Text className="text-white text-sm  font-bold ">
                              {challenge.type}{' '} -
                            </Text>
                        </View>

               
                        <View 
                        className="min-w-[20%]  h-[100%] rounded-md bg-s flex-1 flex-row justify-center  items-end ">
                            <Text className="text-secondary text-sm  font-bold ">
                               {challenge.privacy}
                            </Text>
                        </View>
          

                    </View>  

                    <View className="w-[100vw] h-[25%]   border-x-3 bg-blue-1000 flex-row justify-center  items-center" >
                        {/* <Text className="text-primary text-sm font-bold"> */}
                           <SwingingTitle text={challenge.desc} fonstSize={17} color="white" /> 
                        {/* </Text> */}
                   </View>


                  {challengeCreater && (

                        <View className="w-full flex-col items-center mt-0 justify-center h-[100%]">


                          <View 
                              className=" min-h-[60%]  w-[100%]  flex-col justify-evenly items-center  ">   
                            {!hasParticipated? (  
                          <>
                          <Text  className="text-blue-400 font-bold text-xs">
                            Click below to participate
                          </Text>  
                          <TouchableOpacity
                                onPress={()=>router.push({ pathname: '/CreateParticipateChallenge', params:  {challenge_id:challenge._id} })}
                                className=" border-pink-500 bg-blue-300  flex-col justify-center h-[35px] w-[100px] rounded-md   items-center">
                                  
                                  <Text className="text-green-800 text-xl font-bold">
                                     Join    
                                  </Text>     
                          </TouchableOpacity>          
                          </>
                          ):(
                            <>
                            {challenge.participants.length == 1 ? 
                              (
                              <>
                                <Text  className="text-gray-100 font-bold text-xs">
                                You Created the Challenge  {' '}
                              </Text>  
                                <TouchableOpacity
                                //  onPress={handleDelete}
                                className="flex-col justify-center h-[35px] w-[100px] rounded-md  bg-violet-300 items-center">
                                  <Text className="text-red-400 text- font-bold ">
                                    Delete
                                  </Text>    
                                </TouchableOpacity>
                              </>
                              ):(
                                <>
                                <Text  className="text-gray-100 font-bold text-xs">
                                  You've Participated  {' '}
                              </Text>  
                                <TouchableOpacity 
                                //  onPress={handleQuit}
                                className=" flex-col justify-center h-[35px] w-[100px] rounded-md  bg-pink-200 items-center">
                                  <Text className="text-red-600 text-sm font-bold ">
                                    Resign
                                  </Text>
                                </TouchableOpacity>
                              </> 
                              )} 
                          
                              </>
                              
                              )}  
                            </View>

                             <View  className=" min-h-[40%] px-3 rounded-md w-[50%]  flex-col justify-center items-center  ">

                              <Text  className="text-gray-300 font-bold text-xs">
                                  Created by {' '} 
                              </Text>  
                              <TouchableOpacity
                                onPress={() => {
                                  if(ownChallenge){
                                    router.push({ pathname: '/profile' })
                                  }else
                                  {
                                  if(isViewed) 
                                    {  
                                        setIsViewed(false) 
                                      router.push({ pathname: '/ViewProfile', params: {user_id:participant.user_id} })
                                    }
                                    else router.replace({ pathname: '/ViewProfile', params: {user_id:participant.user_id} })
                                  }
                                  }
                                }
                                  className="flex-col  justify-start gap-1 mt-2  items-center">
                                
                                  <Image 
                                  className="w-[45px] h-[45px]  rounded-full"
                                  source={{uri:challengeCreater.profile_img}} 
                                  />
                                  <Text className="text-secondary font-bold text-sm">{challenge.name}</Text>
                              </TouchableOpacity>
                          </View>


                        </View>


                     )}
  
                    
             </View>

              
           

              <View  className=" rounded-md absolute bottom-28 h-[15vh] w-[85%] gap-2 left-2 flex-col items-center justify-between">
                
                <View className="w-full h-[33%] flex-row justify-start px-4 items-center ">
                  <Text className="text-white font-bold text-">
                          Number of Participants  <Text className="text-blue-500 font-bold text-2xl">{' '}{challenge.participants.length} {'  '}
                            </Text> 
                  </Text>
                </View>  
                <View className="w-full h-[33%]  flex-row justify-start px-4 items-center ">
                    <Text className="text-white font-bold text-xl">
                        {(user._id === participant.user_id)? "You are " : participant.name.split(/ +/)[0] +" is"}  Ranked #  <Text className="text-green-200 font-bold text-xl">{''}{index + 1} {'  '}
                            </Text> <Text className="text-gray-100 font-bold text-xl">  {index == 0 ?"Leading ":''} </Text> 
                    </Text>
                  </View>  
                <View className="w-full h-[33%] flex-row justify-start px-4 items-center ">
                    <Text className="text-white font-bold text-sm">
                          with  {participant.votes}  Votes
                    </Text>
                    <Image 
                        className="w-8 h-8"
                          source={icons.heart}
                        />
                </View>
               
              </View>
              
         </>
            
            )}

          
          {(!displayComments || displayComments)&& ( <View className="w-[88%]  flex-row items-center  absolute bottom-2 left-0 px-4 justify-between min-h-[4%]">
                
                <TouchableOpacity
                  onPress={() => {
                    if(user._id === participant.user_id){
                      router.push({ pathname: '/profile' })
                    }
                    else{
                    if(isViewed) 
                     {  console.log("i am here routttterrrrr")
                        setIsViewed(false) 
                       router.push({ pathname: '/ViewProfile', params: {user_id:participant.user_id} })
                     }
                     else router.replace({ pathname: '/ViewProfile', params: {user_id:participant.user_id} })
                 } 
                }}
                 className="flex-col h-[100%] w-[15%]  justify-center items-center gap-0">
                   <Image 
                   className="w-[45px] h-[45px] rounded-full"
                   source={{uri:participant.profile_img}} 
                  />
                </TouchableOpacity>  
           
                <View className="flex-col h-[100%] w-[35%] justify-center items-center gap-2">
                    <Text className="text-white text-xs font-bold"
                       style={{ fontSize:10,fontWeight:800}}>
                        {participant.name.slice(0,13)}
                    </Text>
                    <Text className="text-white text-xs font-bold">
                       {getInition(participant.name)}Challenger
                    </Text>
                </View>
                
               
                <TouchableOpacity 
                onPress={ownPost?()=>{}:isFollowing? handleUnFollowing : handleFollowing}
                className="flex-col h-[100%] justify-between w-[25%] items-center gap-0">      
                    <View className ="flex-row ml-4 justify-center items-center">
                        <Image 
                        className="w-6 h-6"
                          source={icons.follow}
                          resizeMode='contain'
                        />
                       
                          <Image 
                          className="w-6 h-6"
                          source={isFollowing ?icons.check:""}
                          resizeMode='contain'
                        />
                   
                        
                   </View>
                    <Text className="text-white  text-xs font-bold">
                      {isFollowing ? "Unfollow" : "Follow"} 
                    </Text>

                </TouchableOpacity>
                {participantFriendData && (
                         <TouchableOpacity 
                         onPress={ownPost?()=>{}:isFriend? confirmUnfriend  : 
                           isAccept? confirmAccept : isPending?
                           confirmCancel : confirmFriendRequest  }
                            className="flex-col h-[100%] justify-between w-[25%] items-center gap-0">
                            <View className ="flex-row ml-4 justify-center items-center">
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
                            
                             <Text className="text-white  text-xs font-bold">
                               {isFriend? "Unfriend": isAccept ? "Accept": isPending ?"Pending": "Add Friend"} 
                             </Text>
                         </TouchableOpacity>
                    )}
             
            </View>

           ) }
              
            {likesVotesData &&  (
                <PostSideFooter handleLikes={handleLikes} handleVotes={handleVotes} isLiked={isLiked} comment_count={commentData && commentCount}
                isVoted={isVoted} participant={participant} likesVotesData={likesVotesData} setDisplayComments={setDisplayComments}/>
            )}

      </View>  
      </KeyboardAvoidingView> 
    // </View>
     

 
  )
}