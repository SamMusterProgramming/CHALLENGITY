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

export default function TalentPlayer({contestant,index,dimension,isVisible,setFinishPlaying, status , handleRefresh , talentRoom}) {
    const videoRef = useRef()
    const {user,setUser,isViewed,setIsViewed,followings,setFollowings,userFriendData,setUserFriendData,notifications, setNotifications
      ,favouriteChallenge , setFavouriteChallenge
    } = useGlobalContext()

    const [isExpired,setIsExpired] = useState(false)
    const [isPlaying, setIsPlaying] = useState(isVisible);
    const [displayComment , setDisplayComment] = useState(false)
    const{width ,height} = useWindowDimensions()


    // const [userFriendData,setUserFriendData] = useState(null)
  
  
    const [displayComments,setDisplayComments] =useState(false)
    const [postComments,setPostComments] =useState(null)
    const [commentData, setCommentData] = useState(null);
    const [commentCount,setCommentCount] =useState(0)
  
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState("");
    const [text,setText] = useState()
 
    const [viewersList, setViewersList] = useState(null)
  
  
   
      
   

  

  
    // useEffect(() => {
    //     challenge.privacy === "Public" ? setCanJoin(true):
    //     challenge.invited_friends.find(friend=>friend.sender_id === user._id) ?setCanJoin(true) :setCanJoin(false)
    //     getPostViewers(participant._id , setViewersList)
    //    }, [])   
  
    // useEffect(() => {
    //     if(viewersList == "no")  addViewer( participant._id , {user_id:participant.user_id,viewer_id: user._id}, setViewersList)
    //     if(viewersList && viewersList !== "no") {
    //       if(! viewersList.viewers.find(viewer => viewer.viewer_id == user._id)){
    //          addViewer( participant._id , {user_id:participant.user_id,viewer_id: user._id}, setViewersList)
    //       }
    //     }
    //    }, [viewersList]) 
  
  
    // useEffect(() => {
    //     favouriteChallenge &&  setIsFavourite(favouriteChallenge.favourites.find(chall=>chall._id === challenge._id))  
    //   }, [favouriteChallenge])   
    
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
  
  


  
    //********************************** comments ****************************************/
  
    // useEffect(() => {
    //   getCommentsByPost(participant._id,setCommentData)
    // }, [])
    
    // useEffect(() => {
    //     if(commentData)
    //     if(commentData == "empty") setCommentCount(0)
    //     else  setCommentCount(commentData.content.length)
    // }, [commentData])
  
  
    //**************************** confirm join delete design challenge ************************ */
  


      
  //**************************** confirm favourite adding option ************************ */
  
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
  
                <ProgresssBarVideo player={player} visible={!isPlaying} bottom={72} />
                
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

                {!isPlaying && status !=="closed" && (
                <TouchableOpacity 
                 hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                 onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) } }
                 className= "absolute z-10  justify-center items-center">
                    <Image 
                     className="w-20 h-20 opacity-60"
                     source={!isPlaying && icons.play}/>
                </TouchableOpacity>
                )}

                {!isPlaying &&  (
             
                    <TouchableOpacity
                      onPress={()=> router.back() }
                      className ="absolute bottom-2 "
                      >
                        <Image 
                                  source={icons.x}
                                  className ="w-12 h-12 "
                                  resizeMode='cover'
                                />
                    </TouchableOpacity> 
                )} 
                
                {!isPlaying && status == "closed" && index == 0 && (
                      <View
                      className = "absolute top-0   p-4 gap-2 rounde-xl g-[#020f38]">
                           <ShuffleLetters text="Winner" textSize={16} />
                      </View>
                )} 

                {!isPlaying && status == "closed" && (
                    <View
                    className = "absolute top-[220px] left-10  p-4 gap-2 rounded-xl bg-[#020f38]">
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
                    className = "absolute top-[220px] right-10 p-4 gap-2 rounded-xl bg-[#020f38]">
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
                     className ="absolute top-10  p- 10  "
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
                      <ContestantPostDetails user={user} show = {!isPlaying } displayComment={displayComment}
                      setDisplayComment = {setDisplayComment} selectedContestant={contestant} setIsExpired={setIsExpired} talentRoom={talentRoom}
                      // confirmAction = {confirmAction} setAction ={setAction} setText ={setText}
                      handleRefresh = {handleRefresh} rank={index+1}
                      width ={width } height={height} top = { height/4} />    

                      {displayComment && (<CommentModal user={user} displayComment={displayComment} setDisplayComment={setDisplayComment} selectedContestant={contestant}  />)}
                    </>
                )}
   
  
        </View>  
        </KeyboardAvoidingView> 

       
  
   
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