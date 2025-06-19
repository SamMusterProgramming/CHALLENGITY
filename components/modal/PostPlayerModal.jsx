
import React, { useEffect, useRef, useState } from 'react';
import {  Animated,  Image,  Platform, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
// import Modal from 'react-native-modal';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getCommentsByPost, liked, loadLikeVoteData, voted } from '../../apiCalls';
import { Ionicons } from '@expo/vector-icons';
import { getInition } from '../../helper';
import CommentDisplayer from '../comments/CommentDisplayer';



export default function PostPlayerModal
({isPlayerModalVisible, setIsPlayerModalVisible,selectedPost , challenge ,selectedRank
          }) {
    const {user,setUser,isViewed,setIsViewed,followings,setFollowings,userFriendData,setUserFriendData,notifications, setNotifications
                ,favouriteChallenge , setFavouriteChallenge
              } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [isLoaded , setIsLoaded] = useState(false)
    const [textArray , setTextArray] = useState(null)
    const [isPlaying, setIsPlaying] = useState(true);
    const [isExpired,setIsExpired] = useState(false)
    const [isVoted,setIsVoted] = useState(false)
    const [isLiked,setIsLiked] = useState(false)

    const [displayComments,setDisplayComments] =useState(false)
    const [postComments,setPostComments] =useState(null)
    const [commentData, setCommentData] = useState(null);
    const [commentCount,setCommentCount] =useState(0)

    // const { width, height } = useWindowDimensions();


    const slideAnim = useRef(new Animated.Value(height)).current;

    //*********************************************** player handling section */

    const player = useVideoPlayer
    (
      selectedPost.video_url
      , (player) => {
      player.loop = false;
      player.volume = 0.6
      player.play() ;
    //   player.timeUpdateEventInterval = 0.1;
    });
   
    const { playing } = useEvent(player, 'playingChange', { playing: player.playing });
    


    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
      const showModal = async () => {
       
       
      };
      // showModal()
    }, [isPlayerModalVisible]);

    useEffect(() => {
      if(Platform.OS == "android"){
      NavigationBar.setPositionAsync("absolute");
      // NavigationBar.setBackgroundColorAsync("#00000000");
      NavigationBar.setVisibilityAsync('sticky-immersive');
      }
      setIsLoaded(true)
     }, []);

    const closeModal = async() => {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 10,
        useNativeDriver: true,
      }).start(() => setIsPlayerModalVisible(false));

    };

    const toggleVideoPlaying = () =>{
        if(isPlaying){
          player.pause()
          setIsPlaying(false)
        }else {
          player.play()
          setIsPlaying(true)
        }
  }

  //******************************************* likes vote data */

const ids =[ user._id,
    selectedPost._id,
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
    setIsPlayerModalVisible(false)
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


 //********************************** comments ****************************************/

 useEffect(() => {
    getCommentsByPost(selectedPost._id,setCommentData)
  }, [])
  
  useEffect(() => {
      if(commentData)
      if(commentData == "empty") setCommentCount(0)
      else  setCommentCount(commentData.content.length)
  }, [commentData])
  

  useEffect(() => {
    if(displayComments) {
        setIsPlaying(false)
        player.pause()
    }else {
        setIsPlaying(true)
        player.play()
    }
  }, [displayComments])

    return (
    
         
          <View
            style={styles.container}
            className="  flex-row justify-center items-center "  >
             {isLoaded && likesVotesData && (
                <Modal 
                  backdropOpacity={0.9}
                //   useNativeDriverForBackdrop ={true}
                  transparent={true}
                  onBackdropPress={()=>{setIsPlayerModalVisible(false)}}
                  isVisible={isPlayerModalVisible} 
                  animationType="fade"
                //   animationType="slide"
                  onRequestClose={closeModal}
                  >
                  
                  <View 
                    style={styles.modalContainer}
                     >
                       
                    {/* <Animated.View 
                      className="  borde-2 borde-orange-400 rounded-lg flex-col justify-start items-center "
                      style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}> */}
                        
                        
                        <View
                          className="w-[100%] h-[7%] rounded-t-xl flex-row justify-start items-center  bg-[#fdfeff]">
                              <View className="flex-row w-[13%] justify-start px-2 items-center  gap-">
                                {/* <View 
                                className="flex-col justify-center items-center w-[100%] "> */}
                                    <Image 
                                    className= " rounded-full  w-9 h-9"
                                    source= { {uri:selectedPost.profile_img}}
                                    resizeMode='cover'
                                    />
                                {/* </View> */}
                              
                            </View>
                            <View
                             className=" w-[67%]  h-[90%] flex-col justify-center rounded- px-2 py-2  items-start"> 
                                    <Text 
                                        style ={{fontSize:9}}
                                        className="text-black mb-  text-sm font-black">
                                        {selectedPost.name}
                                    </Text>
                                    <Text 
                                        style ={{fontSize:9}}
                                        className="text-blue-700 mb-  text-sm font-black">
                                        {getInition(selectedPost.name)}CHALLENGER
                                    </Text>
                           </View>
                        
                           <View
                             className=" w-[20%]  h-[95%] flex-row justify-center rounded- px- py- items-center"> 
                             
                                    {/* <Text 
                                        style ={{fontSize:8}}
                                        className="text-white mt-aut text-sm font-bold">
                                         Rank #
                                    </Text> */}
                                    <Text 
                                        style ={{fontSize:20}}
                                        className="text-orange-600 mt-3 text-sm font-bold">
                                         # {selectedRank}
                                    </Text>
                              
                                 
                           </View> 
                        </View>

                        <TouchableOpacity 
                            onPress={toggleVideoPlaying}
                            activeOpacity={1}
                            className={"w-[100%]  h-[86%]  flex-row justify-center bg-black items-center"} >
                                <VideoView 
                                // ref={videoRef}
                                style={{ width:'100%' , height:'100%'}}
                                player={player}
                                contentFit='fill'
                                nativeControls ={false}
                                pointerEvents='box-only'
                                />
                                <TouchableOpacity 
                                        // hitSlop={Platform.OS === "android" &&{ top: 300, bottom: 300, left: 200, right: 200 }}
                                        onPress={ () => {!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) } }
                                        className={"flex-col absolute  justify-center items-center"                     
                                                }>
                                            <Image 
                                            className="w-14 h-14 opacity-90"
                                            source={!isPlaying && icons.play}/>
                                </TouchableOpacity>
                                
                                
                        </TouchableOpacity>


                        <View
                        className="w-[100%] flex-row rounded-b-xl items-center px-2 justify-between h-[7%] bg-[#0b2b5b]">
                                 <View className="flex-row w-[25%]  justify-start items-center gap-2">
                                        {/* <Text className="text-blue-500 mt-4 text-sm font-bold">
                                            Like 
                                        </Text> */}
                                        <TouchableOpacity onPress={handleLikes}
                                        className="flex-col justify-center items-center w-12 h-12 ">
                                            <Image 
                                            className={isLiked ? "w-8 h-8" : "w-10 h-10"}
                                            source={isLiked ? icons.like : icons.white_like}
                                            resizeMode='contain'
                                            />
                                        </TouchableOpacity>      
                                        <Text 
                                        style={{fontSize:12}}
                                            className="text-white mt-1 text-sm font-bold">
                                            {likesVotesData.like_count}  
                                        </Text>
                                </View>
                                <View className="flex-row w-[45%]  justify-center items-center gap-2">
                                    <Text
                                    style={{fontSize:10}}
                                    className="text-pink-400 mt-1 text-xs font-bold">
                                    {!isVoted ? 'Vote' :'Voted'}
                                    </Text>
                                    <TouchableOpacity onPress={handleVotes}
                                        className="flex-col justify-center items-center w-12 h-12  ">
                                            {/* <Image 
                                            className={props.isVoted ? "w-12 h-12" : "w-8 h-8"}
                                            source= {props.isVoted ? icons.heart : icons.white_heart}
                                            resizeMode='contain'
                                            /> */}
                                            <Ionicons name="heart" size={20} color={isVoted ? "red" : "white"}/>
                                        </TouchableOpacity>
                                        <Text 
                                        style={{fontSize:11}}
                                        className="text-white mt-2 text-sm font-bold">
                                            {likesVotesData.vote_count || 0}
                                        </Text>
                                </View>
                                
                                <TouchableOpacity
                                    onPress={() => setDisplayComments(prev => !prev)}
                                    className="flex-row w-[30%] gap-2 justify-center items-center">
                                    
                                    <Ionicons name="chatbubble" size={20} color="white"/>
                                    <Text className="text-white mt-1 text-sm font-bold">
                                            {commentCount} 
                                    </Text>
                                </TouchableOpacity>
                              
                        </View>
 
                       
                        <TouchableOpacity 
                                        // hitSlop={Platform.OS === "android" &&{ top: 300, bottom: 300, left: 200, right: 200 }}
                                        onPress={ () => setIsPlayerModalVisible(false) }
                                        className={"flex-col absolute top-[-30px] righ[-10px] justify-center items-center"                     
                                                }>
                                            <Image 
                                            className="w-10 h-10 rounded-full g-white opacity-80"
                                            source={icons.x}/>
                        </TouchableOpacity> 
                        {displayComments && 
                      <CommentDisplayer user={user} vote_count={selectedPost.votes} like_count={selectedPost.likes} style={{top:"7%",maxHeight:"50%"}}
                       post={selectedPost} setDisplayComments={setDisplayComments} isVisible={true} setCommentCount={setCommentCount} commentCount={commentCount} /> 
                     }
                    {/* </Animated.View> */}
                
                    
                  </View>
                  <StatusBar    backgroundColor={"transparent"}/>
                </Modal>
                  )}
             </View>

       
         
    
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    //    width:"100vw",
    //    height:"100vh",
    //   backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      opacity:0.2
    },
    // button: {
    //   backgroundColor: 'lightblue',
    //   padding: 10,
    //   borderRadius: 5,
    // },
    // buttonText: {
    //   fontSize: 16,
    // },
    modalOverlay: {
    //   flex: 1,
      // justifyContent: 'flex-end',
      backgroundColor: 'white',
      width:"100%",
      height:"100%"
    },

    modalContainer: {
      position: 'absolute',
    //   flex:1,
    //   bottom: "40%",
       top:"5%",
    //   left: "0%",
    //   right: 0,
    //   backgroundColor: "white",
    //   padding: 15,
      borderTopLeftRadius: 10,
      borderRadius: 10,
      justifyContent:"center",
      alignItems: 'center',
      width:"100%",
      height:"90%"
    },

    modalText: {
      fontSize: 8,
    //   marginBottom: 20,
      color:"white"
    },
    closeButton: {
      backgroundColor: 'tomato',
      padding: 5,
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 10,
    },
  });
  