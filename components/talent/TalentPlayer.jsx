import { View, Text, Platform, TouchableOpacity, Image, KeyboardAvoidingView, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ProgresssBarVideo from '../custom/ProgresssBarVideo'
import { icons } from '../../constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'
import { useGlobalContext } from '../../context/GlobalProvider'
import ShuffleLetters from '../custom/ShuffleLetters'
import { router } from 'expo-router'
import FloatingBalloon from './FloatingBallon'
import CommentModal from './modal/CommentModal'
import ContestantPostDetails from './ContestantPostDetails'
import { flagTalentPost, getPostData, GetTalentRoomById, likeTalentPost, voteTalentPost } from '../../apiCalls'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import ChallengeAction from '../modal/ChallengeAction'

export default function TalentPlayer({contestant,index,dimension,isVisible,setFinishPlaying, status , handleRefresh ,
    setTalentRoom, numberOfContestants, talentRoom , setPlayingIndex}) {
    const videoRef = useRef()
    const {user,setUser,isViewed,setIsViewed,followings,setFollowings,userFriendData,setUserFriendData,notifications, setNotifications
      ,favouriteChallenge , setFavouriteChallenge
    } = useGlobalContext()

    const [isExpired,setIsExpired] = useState(false)
    const [isPlaying, setIsPlaying] = useState(isVisible);
    const [displayComment , setDisplayComment] = useState(false)
    const{width ,height} = useWindowDimensions()
    const [postData , setPostData] = useState(null)
    const [voterEntry , setVoterEntry] = useState(talentRoom.voters.find(v=> v.voter_id == user._id))

    const [voted,setVoted] = useState(false)




    // const [userFriendData,setUserFriendData] = useState(null)
  
  
    const [displayComments,setDisplayComments] =useState(false)
    const [postComments,setPostComments] =useState(null)
    const [commentData, setCommentData] = useState(null);
    const [commentCount,setCommentCount] =useState(0)
    const [voteTimeLaps,setVoteTimeLaps] = useState(30)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState("");
    const [text,setText] = useState()
 
    const [isLoading, setIsLoading] = useState(false)
  
  
    useEffect(() => {
      getPostData(contestant._id,setPostData , setIsExpired)
      if(voterEntry){
      const voteDate = new Date(voterEntry.createdAt); 
      const now = new Date();
      const differenceInMilliseconds = (now - voteDate)/(1000*60*60 )
      setVoteTimeLaps(differenceInMilliseconds)
      }
     }, [])

    
    const player = useVideoPlayer
    (
      contestant.video_url
      , (player) => {
      player.loop = false;
      player.volume = 0.6
      player.play() ;
      player.timeUpdateEventInterval = 0.1;
    });
   
    const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

  
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
      if(isVisible){
         player.play()
         setIsPlaying(true)
      } else {
        player.pause()
      setIsPlaying(false)}
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
  
  


  
    //********************************** handle post data transactions ****************************************/
  
    const handleVotePost = ()=> {
      setIsModalVisible(false)
       const body =
          {
           // post_id : selectedContestant._id,
           owner_id : contestant.user_id,
           voter_id : user._id,
           room_id : talentRoom._id
          }
       voteTalentPost(contestant._id,body,setPostData, setIsExpired)
       setVoted(true)
      //  handleRefresh()
     }

     const handleLikePost = ()=> {
      const body =
         {
          // post_id : selectedContestant._id,
          owner_id : contestant.user_id,
          liker_id : user._id,
          room_id : talentRoom._id
         }
      likeTalentPost(contestant._id,body,setPostData, setIsLoading ,setIsExpired)
    }
  
     const handleFlagPost = ()=> {
      setIsModalVisible(false)
      const body =
         {
          owner_id : contestant.user_id,
          flagger_id : user._id
         }
      flagTalentPost(contestant._id,body,setPostData , setIsExpired)
    }
   
  
    useEffect(() => {
      if(postData && voted)   {
        GetTalentRoomById(talentRoom._id , setTalentRoom)
      }
     }, [postData])
  

     useEffect(() => {
      if(voted){
         setTimeout(() => {
            setVoterEntry(talentRoom.voters.find(v=> v.voter_id == user._id))
            setVoted(false)
         }, 100);
        }
     }, [talentRoom])


     useEffect(() => {
      if(isExpired) {
        // GetTalentRoomById(talentRoom._id , setTalentRoom)
        handleRefresh()
      //  setTimeout(() => {
            setIsExpired(false)
      //  }, 500);       
           }
     }, [isExpired])

      
  //**************************** confirm actions ************************ */
  
  const getIcon = (name)=>{
     switch (name) {
        case "Music":
            return icons.music
            break;
        case "Magic":
            return icons.magic
            break;
        case "Asia":
            return icons.asia
            break;
        default:
            break;
     }
  }




    return (
      <>
      {/* <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    > */}
     { postData && (
      <View
       className="flex- 1 w-[100vw] h- full justify-center items-center">    
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
  
                <ProgresssBarVideo player={player} visible={!isPlaying} bottom={82} />
                
                {!isPlaying &&  (
                 <>
                        <Image
                            source={getIcon(talentRoom.name)}
                            className="absolute top-2 left-2 w-12 h-12 rounded-full"
                            resizeMode='cover'
                                        />
                        <Image
                            source={getIcon(talentRoom.region)}
                            className="absolute top-2 right-2 w-12 h-12 rounded-full"
                            resizeMode='cover'
                                        />
                        <View
                        className="absolute top-2 p-2 gap-6 flex-col justify-start items-center ">
                                 <ShuffleLetters text={`${talentRoom.name}` + " Contest"} textSize={15} />
                                 <Text
                                    className="font-black"
                                    style={{fontSize:15 ,
                                        color: "white"
                                    }}>
                                        {talentRoom.region}
                                </Text>
                        </View>
                 </>
                )}

            
              {!isPlaying  && (
                <TouchableOpacity 
                 hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                 onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) } }
                 className= "absolute z-10  justify-center items-center">
                    <Image 
                     className="w-20 h-20 opacity-60"
                     source={!isPlaying && icons.play}/>
                </TouchableOpacity>
                 )} 

               {isPlaying  && (
                <TouchableOpacity 
                 hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                 onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) } }
                 className= "absolute z- 10  justify-center items-center">
                    <Image 
                     className="w-20 h-20 opacity-60"
                     source={!isPlaying && icons.play}/>
                </TouchableOpacity>
                 )} 

               {!isPlaying  &&  (
                <View
                className= "absolute bottom-[10px] w-full z-10 flex-row px-6  justify-between items-center gap- 8">
                  <TouchableOpacity 
                    onPress={ () => { setPlayingIndex(prev => {
                      if(prev == 0) return numberOfContestants - 1
                       else return (prev - 1) 
                    }
                    )} }
                    className= "  justify-center items-center">
                      <Image 
                      className="w-14 h-14 opacity-80"
                      source={status=="open" &&  icons.back_arrow}/>
                  </TouchableOpacity>

                  <TouchableOpacity
                      // onPress={()=> router.back() }
                      onPress={() => { status == "open" ?
                        router.replace({ pathname: '/TalentContestRoom',params: {
                            region:talentRoom.region,
                            selectedTalent:talentRoom.name , 
                            selectedIcon: getIcon(talentRoom.name),
                            regionIcon : getIcon(talentRoom.region),
                            startIntroduction :"false",
                            showGo: "true",
                            contestant_id:contestant.user_id
                            // invited_friends: JSON.stringify(selectedFriends)
                          } }) : router.back()
                    }}
                      className =" "
                      >
                        <Image 
                                  source={icons.x}
                                  className ="w-14 h-14 "
                                  resizeMode='cover'
                                />
                  </TouchableOpacity> 

                  <TouchableOpacity 
                    onPress={ () => { setPlayingIndex(prev => (prev + 1) % numberOfContestants )} }
                    className= "  justify-center items-center">
                      <Image 
                      className="w-14 h-14 opacity-80"
                      source={status =="open" && icons.next_arrow}/>
                  </TouchableOpacity>
                </View>
                
                )}

                {/* {!isPlaying &&  (
             
                    <TouchableOpacity
          
                      onPress={() => {
                        router.replace({ pathname: '/TalentContestRoom',params: {
                            region:talentRoom.region,
                            selectedTalent:talentRoom.name , 
                            selectedIcon: getIcon(talentRoom.name),
                            regionIcon : getIcon(talentRoom.region),
                            startIntroduction :"false",
                            showGo: "true",
                            contestant_id:contestant.user_id
         
                          } }) 
                    }}
                      className ="absolute bottom-[10px] z-10 "
                      >
                        <Image 
                                  source={icons.x}
                                  className ="w-14 h-14 "
                                  resizeMode='cover'
                                />
                    </TouchableOpacity> 
                )}  */}
                
                {!isPlaying && status == "closed" && index == 0 && (
                      <View
                      className = "absolute top-[80px]   p-4 gap-2 rounde-xl g-[#020f38]">
                           <ShuffleLetters text="Winner" textSize={16} />
                      </View>
                )} 

             

                {!isPlaying && status == "closed" && (
                    <View
                    className = "absolute top-[300px] left-10  p-4 gap-2 rounded-xl bg-[#020f38]">
                        <Text
                        className="font-black"
                        style={{fontSize:12 ,
                            color: "white"
                        }}>
                            VOTES
                        </Text>
                        <ShuffleLetters text={`${contestant.votes}`} textSize={15} />
                    </View>
                )}

                {!isPlaying && status == "closed" && (
                    <View
                    className = "absolute top-[300px] right-10 p-4 gap-2 rounded-xl bg-[#020f38]">
                        <Text
                        className="font-black"
                        style={{fontSize:12 ,
                            color: "white"
                        }}>
                            TOP
                        </Text>
                        <ShuffleLetters text={`${index+1}`} textSize={15} />
                    </View>
                )}

               {!isPlaying &&  status == "closed" && (
                    <ImageBackground 
                     source={index == 0 ? icons.big_heart :""}
                     style={styles.backgroundImage}
                     className ="absolute top-[100px]  p- 10  "
                     imageStyle={styles.imageStyle} // Apply styles to the image itself
                      >
                            <TouchableOpacity
                            onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:contestant.user_id} })}}
                            className = "gap-6 rounded-xl g-[#020f38] flex-col justify-start items-center">
                                <Image
                                source={{uri:contestant.profile_img}}
                                className="w-[80px] h-[80px] rounded-full"
                                resizeMode='cover'
                                />
                                <Text
                                    className="font-black"
                                     style={styles.nameText}
                                    >
                                    {contestant.name}
                                </Text>     
                            </TouchableOpacity>
                    </ImageBackground>
                )}


  
                {!isPlaying &&  status == "open" && (
                    <>
                      {/* <ContestantPostDetails user={user} show = {true } displayComment={displayComment}
                      setDisplayComment = {setDisplayComment} selectedContestant={contestant} setIsExpired={setIsExpired} talentRoom={talentRoom}
                      handleRefresh = {handleRefresh} rank={index+1}
                      width ={width } height={height} top = { height/4} />    
                      {displayComment && (<CommentModal user={user} displayComment={displayComment} setDisplayComment={setDisplayComment} selectedContestant={contestant}  />)} */}
                      <View
                      className="w-[100%] absolute top-[150px] z-10 flex-row justify-between items-center">
                        
                        <TouchableOpacity
                         style={{backgroundColor:postData.votes.find(vote => vote.voter_id == user._id) ?'rgba(255,255 , 255 , 0.7)': 'rgba(255, 255, 255, 0.5)'}}
                         onPress={
                           ()=> {
                              setIsModalVisible(true);
                              if(voteTimeLaps < 0 || !talentRoom.contestants.find(c =>c._id == postData.post_id)){
                                 setAction("OK")
                                 setText(!talentRoom.contestants.find(c =>c._id == postData.post_id)?"this post is still in queue , can't vote , just yet !!!":
                                            "you've just casted your vote , you can't edit your vote at this time wait 24h")
                                 return false
                              }
                              else{
                              setAction("VT");
                              setText(
                                 !voterEntry? `Are you sure you want to cast your vote for ${contestant.name}`:
                                 voterEntry.post_id == contestant._id ?
                                 `Are you sure you want to remove your vote   for ${contestant.name}` :
                                 `You 've previously cast your vote for ${voterEntry.name}. Would you like to change your vote to ${contestant.name}?`
                               );
                              }
                           }
                        
                        }
                         className = "min-w-[10%] max-w-[20%] h- [50%] p-1 gap-2 l- gap- elevation- 2xl rounded -tr-full rounded-r-xl order-4 border-white g-[#f0e9e9] flex-col justify-start items-start g-[#0c0c0c] ">
                                 
                                 <View
                                 className=" w-[100%] h- [50%] flex-row justify-center text-center items-center">
                                     <Image
                                        source={postData.votes.find(vote => vote.voter_id == user._id) ? icons.voted : icons.vote}
                                        className ="w-8 h-8 rounded-full"
                                        resizeMethod='fill'
                                            />
                                 </View>
                                 <View
                                    className=" min- w-[100%] h- [50%] flex-row  justify-center  items-end">
                                     <Text 
                                         style ={{fontSize:14,
                                          // color: postData.votes.find(like => like.voter_id == user._id) ?"white":"white"
                                         }}
                                         className="text-xl font-black  text-black"> 
                                             {postData.votes.length}
                                     </Text>
                                 </View>   
                         </TouchableOpacity>

                         <TouchableOpacity
                          onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:contestant.user_id} })}}
                          // style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                          className = "w-[50%]  h- [20%] px-4 gap-2 flex-col g-[#12aaf1] rounded-xl  g-blue-500  justify-center items-center">
                                            <Image
                                            style ={{height : width * 0.8 /6 ,
                                                            width :width * 0.8 /6 }}
                                            source={{uri:contestant.profile_img}}
                                            className ="w-[70px] h-[70px] rounded-full"
                                            resizeMethod='fill'
                                                              />
                                          <Text 
                                              style ={{fontSize:13 ,
                                                fontStyle:"italic"
                                              }}
                                              className="text-xl font-black  text-white"> 
                                                  {contestant.name}
                                          </Text>
                        </TouchableOpacity>

                         <TouchableOpacity 
                         style={{backgroundColor:postData.likes.find(vote => vote.liker_id == user._id) ?'rgba(255,255 , 255 , 0.7)': 'rgba(255, 255, 255, 0.5)'}}
                         onPress={handleLikePost}
                          className = "min-w-[10%] max-w-[20%]  h- [50%] p-1 -8 gap-2 rounded -bl-full rounded-l-xl borde-4 order-white g-[#eaa47c] flex-col justify-start pr- items-end g-[#0c0c0c] ">
                                 
                                 <View
                                 className=" w-[100%] h- [50%] flex-row justify-center  items-center">
                                     <FontAwesome name="thumbs-up" size={28} color={postData.likes.find(like => like.liker_id == user._id) ?"#0c7beb":"white" }/>
                                 </View>
                                 <View
                                    className=" w-[100%] h- [50%] flex-row  justify-center items-start">
                                    <Text 
                                         style ={{fontSize:14,
                                         }}
                                         className="text-xl font-black pr-2  text-gray-800"> 
                                          {postData.likes.length}
                                    </Text>
                                 </View>          
                         </TouchableOpacity>
                      </View>
                    </>
                )}


                {!isPlaying &&  status == "open" && (
                    <>
                   
                      <View
                      className="w-[100%] absolute bottom-[150px] z-10 flex-row justify-between items-center">
                        
                        <TouchableOpacity
                         onPress ={()=>{setDisplayComment(true)}}
                           style={{backgroundColor: postData.comments.find(c => c.commenter_id === user._id)? 'rgba(255,255 , 255 , 0.7)': 'rgba(255, 255, 255, 0.5)' }}
                           className = "min-w-[10%] max-w-[20%] h- [50%] p-1 pl- gap-2 rounded-r-xl bordr-4 borde-white rounded-bl- 3xl  g-[#f0e9e9]  flex-col justify-start items-start g-[#0c0c0c] ">
                                         
                                    <View
                                      className=" w-[100%] h- [50%] flex-row  justify-center items-end">
                                        <Text 
                                         style ={{fontSize:14}}
                                         className="text-gray-600 text-sm  font-black">
                                            {postData.comments.length}
                                        </Text>
                                    </View>   
                                    <View
                                      className=" w-[100%] h- [50%] flex-row justify-center  items-center">
                                         <Ionicons name="chatbubble" size={32} color="white"/>
                                    </View>
                         </TouchableOpacity>

                         <TouchableOpacity
                          onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:contestant.user_id} })}}
                          // style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                          className = "w-[50%]  h- [20%] px-4 gap-2 flex-col g-[#12aaf1] rounded-xl  g-blue-500  justify-center items-center">
                                          <Text 
                                              style ={{fontSize:13 ,
                                                fontStyle:"italic"
                                              }}
                                              className="text-xl font-black  text-white"> 
                                                  Ranked
                                          </Text>
                                          <Text 
                                              style ={{fontSize:13 ,
                                                fontStyle:"italic"
                                              }}
                                              className="text-xl font-black  text-white"> 
                                                {index < 3 ? "TOP" : "#"}  {index + 1}
                                          </Text>
                        </TouchableOpacity>

                          <TouchableOpacity
                           style={{backgroundColor:postData.flags.find(vote => vote.flagger_id == user._id) ?'rgba(255,255 , 255 , 0.7)': 'rgba(255, 255, 255, 0.5)'}}
                           onPress={ ()=> {
                              setIsModalVisible(true)
                              setAction("FL")
                              setText(
                                 ! postData.flags.find(flag => flag.flagger_id == user._id)?
                                 `Are you sure you want to flag  ${contestant.name} 's post` 
                                 :`Are you sure you want to unflag  ${contestant.name} 's post ` )
                           }}
                          
                           className = "min-w-[10%] max-w-[20%] h- [50%] py-6  rounded-l-xl  rounded-br- 3xl borde-4 borde-white g-[#f0e9e9]  flex-col justify-end items-end g-[#d61a1a] ">
                                 <View
                                 className=" w-[100%] h- [70%] flex-row justify-center items-center">
                                    {!postData.flags.find(flag => flag.flagger_id == user._id) && (
                                        <Text 
                                        style ={{fontSize:12}}
                                        className="text-xl font-black    text-gray-700"> 
                                          {!postData.flags.find(flag => flag.flagger_id == user._id) &&  "FLAG"}
                                         </Text>
                                    )}
                                         {postData.flags.find(flag => flag.flagger_id == user._id) && (
                                          <Image
                                          source={ icons.flag }
                                          className ="w-10 h-10 rounded-full"
                                          resizeMethod='fill'
                                           />
                                      )}
                                   
                                 </View>                      
                          </TouchableOpacity>
                      </View>
                    </>
                )}



          
   
  
        </View>  
        )}

              

   
        {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     // handleTalentParticipation  = {handleTalentParticipation} handleTalentResignition = {handleTalentResignition}
                     handleVotePost ={handleVotePost} handleFlagPost ={handleFlagPost}
                       />
        )}
         {displayComment && (<CommentModal user={user} displayComment={displayComment} setDisplayComment={setDisplayComment} selectedContestant={contestant}  />)}

     </>
       
  
   
    )
}

  
    const styles = StyleSheet.create({
      backgroundImage: {
        width: 270, // Adjust width as needed
        height: 300, 
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',    // Center content horizontally
      },
      imageStyle: {
        resizeMode: 'contain', // Or 'cover', 'stretch' as per your preference
      },
      nameText: {
        color: 'white', // Set text color to contrast with the background
        fontSize: 16,
        fontWeight: 'bold',
      },
    });