import { View, Text, Image, TouchableOpacity, Platform, Alert, KeyboardAvoidingView, Pressable, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video ,ResizeMode } from 'expo-av'
import { Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent, useEventListener } from 'expo';
import { icons } from '../../constants';
import { acceptFriendRequest, addChallengeToFavourite, addFollowing, friendRequest, getCommentsByPost, getFollowings, getUserFriendsData, liked, loadLikeVoteData, removeChallengeFromFavourite, removeFriendRequest, unFollowings, unfriendRequest, voted } from '../../apiCalls';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { getInition } from '../../helper';
import CommentDisplayer from '../comments/CommentDisplayer';
import PostSideFooter from "../footers/PostSideFooter"
import SwingingTitle from '../custom/SwingingTitle';
import ProgresssBarVideo from '../custom/ProgresssBarVideo';
import CustomAlert from '../custom/CustomAlert';
import { Ionicons } from '@expo/vector-icons';

    



export default function Player({participant,index,dimension,isVisible,challenge,setFinishPlaying}) {

  const videoRef = useRef()
  const {user,setUser,isViewed,setIsViewed,followings,setFollowings,userFriendData,setUserFriendData
    ,favouriteChallenge , setFavouriteChallenge
  } = useGlobalContext()
  const[isFavourite,setIsFavourite] = useState(false)
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState("");
  const [text,setText] = useState()
  const[canJoin,setCanJoin] = useState(false)




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

  useEffect(() => {
      challenge.privacy === "Public" ? setCanJoin(true):
      challenge.invited_friends.find(friend=>friend.sender_id === user._id) ?setCanJoin(true) :setCanJoin(false)
     }, [])   

  useEffect(() => {
      favouriteChallenge &&  setIsFavourite(favouriteChallenge.favourites.find(chall=>chall._id === challenge._id))  
    }, [favouriteChallenge])   
  
  const player = useVideoPlayer
  (
    participant.video_urll
    , (player) => {
    player.loop = false;
    player.volume = 0.6
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
    setCommentCount(commentCount * 0 + commentData && commentData.content.length || 0)
  }, [commentData])


  //**************************** confirm join delete design challenge ************************ */

   
  const joinChallenge = () => {
    setIsModalVisible(false)
    canJoin && router.push({ pathname: '/CreateParticipateChallenge', params: {challenge_id:challenge._id} })
      }

  const resignChallenge = async() => {
   await quitChallenge(challenge._id,user._id).
   then(res => {
     const you = challenge.participants.find(participant => participant.user_id == user._id)
      const fileRef = ref(storage,you.video_url); 
      deleteObject(fileRef)
       .then(() => {
        console.log("File deleted successfully!");
        router.replace('/profile')
        })
       .catch((error) => {
       console.error("Error deleting file:", error);
        });  
       //  getTopChallenges(props.user._id,setTopChallenges)
       challenge.privacy == "Public"? getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
       :getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
       router.push('/profile')


   })
 }

  const removeChallenge = async() => {

   await deleteChallenge(challenge._id,user._id).
    then((res) => { 
          const you = challenge.participants.find(participant => participant.user_id == user._id);
          const fileRef = ref(storage,you.video_url); 
      
          deleteObject(fileRef)
            .then(() => {
              console.log("File deleted successfully!");
              // router.push('/profile')
            })
            .catch((error) => {
              console.error("Error deleting file:", error);
            });  
            if(user._id == challenge.origin_id) 
             { 
              challenge.privacy === "Public"? getUserPublicChallenges(user._id , setUserPublicChallenges)
              :getUserPrivateChallenges(user._id , setUserPrivateChallenges)
              router.push({ pathname: '/profile',params: {
                priv:selectedPrivacy == "Private"?"true":"false", publ:selectedPrivacy === "Public"? "true":"false",
                yourChallenges:"true" , yourParticipations:"false"
              } }) 
              }
              else {
                challenge.privacy === "Public"? getUserPublicChallenges(user._id , setPublicParticipateChallenges)
                :getUserPrivateChallenges(user._id , setPrivateParticipateChallenges)
                router.push({ pathname: '/profile',params: {
                  priv:selectedPrivacy == "Private"?"true":"false", publ:selectedPrivacy === "Public"? "true":"false",
                  yourChallenges:"false" , yourParticipations:"true"
                } }) 
              }
           
    })

  }  
  const confirmJoinChallenge  = ()=> {
    setIsModalVisible(true)
    if(canJoin){
      setAction("JN")
      setText("Are you sure you want to join the challenge")
  }else {
    setAction("OK")
    setText("this is a private challenge , you are not invited to participate")
  }
    }
  const confirmDeleteChallenge  = ()=> {
      setIsModalVisible(true)
      setAction("DT")
      setText("Are you sure you want to delete the challenge")
    }
  const confirmResignChallenge  = ()=> {
      setIsModalVisible(true)
      setAction("RS")
      setText("Are you sure you want to resign and delete your participation from the challenge")
    }
    
//**************************** confirm favourite adding option ************************ */

    const addToFavourite  = ()=> {
      setIsModalVisible(false)
      addChallengeToFavourite(user._id,challenge,setFavouriteChallenge,setIsExpired)
    }

    const removeFromFavourite = ()=> {
      setIsModalVisible(false)
      removeChallengeFromFavourite(user._id,challenge,setFavouriteChallenge,setIsExpired)
    }

    const confirmAddToFavourite  = ()=> {
    setIsModalVisible(true)

    setAction("FA")
    setText("Are you sure you want to add the challenge to your favourite list")
    }
    const confirmRemoveFromFavourite  = ()=> {
      setIsModalVisible(true)
      setAction("RF")
      setText("Are you sure you want to remove  the challenge from your favourite list")
    }
  
     
    

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
  >
    <View
     className="flex-1 w-[100vw]  justify-center items-center">    
               <TouchableOpacity
            
                  onPress={toggleVideoPlaying }
                  activeOpacity={1}
                  className={isPlaying? "w-[100vw] h-[100vh]  opacity-100":"w-[100vw] h-[100vh] opacity-20"}
 
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

             
              {isModalVisible && (
                  <CustomAlert text={text} action={action} isModalVisible={isModalVisible} unfriendFriendRequest={unfriendFriendRequest}
                  okFriendRequest={okFriendRequest} cancelFriendRequest={cancelFriendRequest} sendFriendRequest={sendFriendRequest}
                  setIsModalVisible={setIsModalVisible} joinChallenge ={joinChallenge } removeFromFavourite={removeFromFavourite}
                  addToFavourite={addToFavourite} resignChallenge={resignChallenge} removeChallenge={removeChallenge}/>
                )}


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
                 <View className="min-w-full  rounded-md absolute top-0 flex-col flex-1 gap-3 items-center bg-gray justify-start h-[40%]"
                        style={{top:Platform.OS == "android" ? 0 : 0 }} >


                    <View className="min-w-full  rounded-md bg-bl-800 flex-row items-center justify-between h-[10%]"
                         >
                        <TouchableOpacity
                          onPress={() => router.back()}
                          className="min-w-[7%] h-[100%]  flex-col justify-center  items-end">
                          <Image
                          className="w-7 h-7 bg-white "
                          source={icons.x} />
                        </TouchableOpacity>

                        <View 
                        className="min-w-[35%]  h-[100%] rounded-md bg-s  flex-row justify-center  items-end  ">
                            <Text className="text-white text-sm  font-bold ">
                              Challenge  -
                            </Text>
                        </View>

                        <View 
                        className="min-w-[35%]  h-[100%] rounded-md bg-s flex-1 flex-row justify-center  items-end  ">
                            <Text className="text-white text-sm font-bold ">
                              {challenge.type}{' '} -
                            </Text>
                        </View>

               
                        <View 
                        className="min-w-[20%]  h-[100%] rounded-md bg- flex-1 flex-row justify-center  items-end ">
                            <Text className="text-secondary text-sm  font-bold ">
                               {challenge.privacy}
                            </Text>
                        </View>
          

                    </View>  

                    <View className="w-[100vw] h-[6%] bg-wh  border-x-3 bg-blue-1000 flex-row justify-center  items-center" >
                        {/* <Text className="text-primary text-sm font-bold"> */}
                           <SwingingTitle text={challenge.desc} fonstSize={18} color="white" /> 
                        {/* </Text> */}
                    </View>


                   {challengeCreater && (

                    <View className="w-full flex-col items-center mt-0 justify-center h-[23%]">


                            <View 
                                  className=" min-h-[100%]  w-[100%]  flex-col justify-center gap-2 items-center  ">   
                           {!hasParticipated? (  
                              <>
                              <Text  className="text-blue-400 font-bold text-sm">
                                  Click below to participate
                              </Text>  
                              <TouchableOpacity
                                    onPress={confirmJoinChallenge}
                                    className={canJoin?"border-pink-500 border-2 bg-blue-300  flex-col justify-center h-[35px] w-[100px] rounded-md   items-center":
                                                       "border-pink-500 bg-gray-300  flex-col justify-center h-[35px] w-[100px] rounded-md   items-center"
                                    }>   
                                      <Text className={canJoin?"text-green-800 text-xl font-bold":"text-black text-xl font-bold"}>
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
                                className="flex-col justify-center h-[35px] w-[100px] rounded-md  bg-violet-300 items-center">
                                  <Text className="text-red-400 text- font-bold ">
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

                     </View>

                     )}
                     <View className=" h-[33%] px-3 rounded-md w-[50%]  flex-col justify-center gap-1 items-center  ">

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
                              className="flex-col  justify-start gap-1  items-center">
                            
                              <Image 
                              className="w-[45px] h-[45px]  rounded-full"
                              source={{uri:challengeCreater.profile_img}} 
                              />
                              <Text className="text-secondary font-bold text-sm">{challenge.name}</Text>
                          </TouchableOpacity>
                      </View>

                      <View className=" h-[20%] px-3 rounded-md w-[50%]  flex-col justify-center items-center  ">

                          <TouchableOpacity
                              onPress={!isFavourite?confirmAddToFavourite:confirmRemoveFromFavourite}                         
                              className="flex-col  justify-start gap-1 mt-1  items-center">                           
                              <Ionicons name='heart' size={48} color={isFavourite?"red":"pink"} />
                              <Text className= {isFavourite?"text-pink-600 font-black  text-sm":"text-pink-200 font-bold text-sm"} 
                              >
                                 {isFavourite?"FAVOURITE":"ADD FAVOURITE"} 
                              </Text>
                            </TouchableOpacity>
                       </View>
                            
                    
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