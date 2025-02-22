import { View, Text, Image, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video ,ResizeMode } from 'expo-av'
import { Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent, useEventListener } from 'expo';
import { icons } from '../constants';
import { acceptFriendRequest, addFollowing, friendRequest, getFollowings, getUserFriendsData, liked, loadLikeVoteData, removeFriendRequest, unFollowings, unfriendRequest, voted } from '../apiCalls';
import PostSideFooter from './PostSideFooter';
import { useGlobalContext } from '../context/GlobalProvider';
import { router } from 'expo-router';


    



export default function Player({participant,index,dimension,isVisible,challenge,setFinishPlaying}) {

  const videoRef = useRef()
  const {user,setUser} = useGlobalContext()
  const [isExpired,setIsExpired] = useState(false)
  const [videoStatus, setVideoStatus] = useState(null);
  const [isPlaying, setIsPlaying] = useState(isVisible);
  const [isVoted,setIsVoted] = useState(false)
  const [isLiked,setIsLiked] = useState(false)
  const [ownChallenge , setOwnChallenge ] = useState(false)
  const [challengeCreater,setChallengeCreator] = useState(null)
  const [followings,setFollowings] = useState ([])
  const [isFollowing , setIsFollowing] = useState(false)

  const [addFriendRequest , setAddFriendRequest] = useState(null)
  const [participantFriendData,setParticipantFriendData] = useState(null)
  const [userFriendData,setUserFriendData] = useState(null)
  const[isFriend,setIsFriend]= useState(false)
  const[isPending,setIsPending]= useState(false)
  const[isAccept,setIsAccept]= useState(false)



  useEffect(() => {
    challenge.participants.map(participant =>{
      if(participant.user_id === user._id) {
          setOwnChallenge( prev => !prev)
       } 
    })
    }, [])

  useEffect(() => {
    console.log(participant)
      challenge.participants.map(participant => {    
        if(participant.user_id === challenge.origin_id) {
            setChallengeCreator(participant)
         } 
      })
     }, [])

  
  const player = useVideoPlayer
  (participant.video_url, (player) => {
    player.loop = false;
    player.volume = 0.1
    player.play() ;
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
      following_email:participant.email
   }
  addFollowing(user._id,rawBody, setFollowings)
  // setFollowings((prevItems) => [...prevItems,rawBody])
  }
  
const handleUnFollowing =  ()=> {
    const rawBody = {
      following_id : participant.user_id,
      following_email:participant.email
   }
   unFollowings(user._id,rawBody, setFollowings)
  }

  const sendFriendRequest = () => {    
    console.log("send request")
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




  return (
    <View className="flex-1  justify-center items-center">
      {/* <Text className="text-white">{participant.video_url}</Text> */}
      {/* <View className="flex-row items-center   justify-center min-w-[100%] min-h-[100%] ">   */}
             
              <TouchableOpacity 
                onPress={Platform.OS == "ios" ? toggleVideoPlaying :()=>{}}
                activeOpacity={1}
                className={isPlaying? "w-[100vw] h-[100vh] opacity-100":"w-[100vw] h-[100vh] opacity-50"}
                style={{marginTop:Platform.OS == "android" ? 0 : 0 }}
                >
                      <VideoView 
                        // ref={videoRef}
                        style={{  width:'100%' ,height:'100%',opacity:20}}
                        player={player}
                        contentFit='cover'
                        nativeControls ={false}
                      />
              </TouchableOpacity>

            {!isPlaying && (
              <> 
                 <View className="min-w-full  rounded-md absolute top-0 flex-row items-center justify-start min-h-[5%]"
                 style={{top:Platform.OS == "android" ? 0 : 0 }} >
                     <TouchableOpacity
                       onPress={() => router.back()}
                       className="min-w-[6%] min-h-[95%] flex-1 flex-col justify-center  items-center">
                       <Image
                       className="w-8 h-8 bg-white "
                       source={icons.x} />
                     </TouchableOpacity>
                    <View 
                    className="min-w-[25%]  min-h-[95%] rounded-md bg-s flex-1 flex-row justify-center  items-end  ">
                        <Text className="text-white text-xl  font-bold ">
                          Challenge
                        </Text>
                    </View>
                    
                    <View className="min-w-[68%] min-h-[95%] border-x-white bg-blue-1000 flex-1 flex-row justify-center  items-end" >
                        <Text className="text-gray-200 text-sm font-bold">
                          {challenge.desc}   
                        </Text>
                    </View>

                  
 
             </View>

             {challengeCreater && (


              <View className="w-full absolute top-20 left-0 px-3   flex-row items-center justify-between min-h-[12%]">
                 <View 
                      className=" min-h-[95%] rounded-md w-[45%]  flex-col justify-center gap-3 items-center  ">
                    <Text  className="text-gray-100 font-bold text-sm">
                        Created by {' '} <Text className="text-white font-bold text-sm">{challenge.name}</Text>
                    </Text>  
                    <Image 
                  className="w-[65px] h-[65px] rounded-full"
                  source={{uri:challengeCreater.profile_img}} 
                  />
                 </View>


                 <View 
                    className=" min-h-[95%] rounded-md w-[45%]  flex-col justify-center gap-3 items-center  ">   
                  {!ownChallenge? (  
                <>
                 <Text  className="text-gray-100 font-bold text-sm">
                 Click  {' '} <Text className="text-white font-bold text-sm">to participate</Text>
                </Text>  
                 <TouchableOpacity
                      // onPress={()=>router.push({ pathname: '/NewChallenge', params: {challengeData:JSON.stringify(challenge)} })}
                      className="w-[70px] rounded-full h-[70px] border-pink-500 bg-blue-300  flex-col justify-center  items-center">
                        
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
                      <Text  className="text-gray-100 font-bold text-sm">
                       You Created the Challenge  {' '}
                     </Text>  
                      <TouchableOpacity
                      //  onPress={handleDelete}
                       className="w-[70px] rounded-full h-[70px] flex-1 flex-col justify-center  bg-violet-300 items-center">
                        <Text className="text-red-500 text- font-bold ">
                          Delete
                        </Text>    
                      </TouchableOpacity>
                    </>
                     ):(
                      <>
                      <Text  className="text-gray-100 font-bold text-sm">
                        You've Participated  {' '}
                     </Text>  
                      <TouchableOpacity 
                      //  onPress={handleQuit}
                       className="w-[70px] rounded-full h-[70px] flex-col justify-center   bg-pink-200 items-center">
                        <Text className="text-red-700 text- font-bold ">
                          Resign
                        </Text>
                      </TouchableOpacity>
                     </> 
                     )} 
                 
                     </>
                    
                     )}  
                  </View>


             </View>

             )}
              
         </>
            
            )}
           
              <View  className=" rounded-md absolute bottom-28 h-[20vh] w-[85%] gap-2 left-2 flex-col items-center justify-between">
                
                <View className="w-full h-[33%] flex-row justify-start px-4 items-center ">
                  <Text className="text-white font-bold text-">
                          Number of Participants  <Text className="text-blue-500 font-bold text-2xl">{' '}{challenge.participants.length} {'  '}
                            </Text> 
                  </Text>
                </View>  
                <View className="w-full h-[33%]  flex-row justify-start px-4 items-center ">
                    <Text className="text-white font-bold text-xl">
                        {(user._id === participant.user_id)? "You are " : participant.name.split(/ +/)[0] +" is"}  Ranked #  <Text className="text-green-200 font-bold text-xl">{''}{index + 1} {'  '}
                            </Text> <Text className="text-gray-100 font-bold text-sm">  {index == 0 ?"Leading ":''} </Text> 
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

              <TouchableOpacity 
              onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) } }
              className="flex-col absolute  justify-center items-center">
                  <Image 
                   className="w-14 h-14 opacity-30"
                   source={isPlaying ?   Platform.OS === "android"? icons.pause:"" :icons.play}/>
              </TouchableOpacity>


              <View className="w-[85%] flex-row items-center  absolute bottom-1 left-0 px-4 justify-between min-h-[4%]">
                
                   <Image 
                   className="w-[45px] h-[45px] rounded-full"
                   source={{uri:participant.profile_img}} 
                  />
           
                <View className="flex-col h-[100%] justify-between items-center gap-0">
                    <Text className="text-white text-xs font-bold"
                       style={{ fontSize:13,fontWeight:800}}>
                        {participant.name.slice(0,13)}
                    </Text>
                    <Text className="text-white text-sm font-bold">
                       JSChallenger
                    </Text>
                </View>
                
               
                <TouchableOpacity 
                onPress={isFollowing? handleUnFollowing : handleFollowing}
                className="flex-col h-[100%] justify-between items-center gap-0">      
                    <View className ="flex-row ml-4 justify-center items-center">
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
                    <Text className="text-white  text-xs font-bold">
                      {isFollowing ? "Unfollow" : "Follow"} 
                    </Text>

                </TouchableOpacity>
                {participantFriendData && (
                         <TouchableOpacity 
                         onPress={isFriend? confirmUnfriend  : 
                           isAccept? confirmAccept : isPending?
                           confirmCancel : confirmFriendRequest  }
                            className="flex-col h-[100%] justify-between items-center gap-0">
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
      
              
            {likesVotesData && (
                <PostSideFooter handleLikes={handleLikes} handleVotes={handleVotes} isLiked={isLiked} 
                isVoted={isVoted} participant={participant} likesVotesData={likesVotesData}/>
            )}

      </View>  
    // </View>
     

 
  )
}