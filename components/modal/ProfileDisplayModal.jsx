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
import { getCommentsByPost, getUserById, liked, loadLikeVoteData, voted } from '../../apiCalls';
import { Ionicons } from '@expo/vector-icons';
import { getInition } from '../../helper';
import CommentDisplayer from '../comments/CommentDisplayer';
import InfosProfile from '../profile/InfosProfile';



export default function ProfileDisplayModal
({isProfileDisplayerModalVisible, setIsProfileDisplayerModalVisible,selectedProfile 
          }) {
    const {user,setUser,isViewed,setIsViewed,followings,setFollowings,userFriendData,setUserFriendData,notifications, setNotifications
                ,favouriteChallenge , setFavouriteChallenge ,follow
              } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [isLoaded , setIsLoaded] = useState(false)
    const [textArray , setTextArray] = useState(null)
    const [isPlaying, setIsPlaying] = useState(true);

    const [userProfile, setUserProfile] = useState(null);

 


    // const { width, height } = useWindowDimensions();


    const slideAnim = useRef(new Animated.Value(height)).current;

    //*********************************************** player handling section */


    useEffect(() => {
       getUserById(selectedProfile, setUserProfile)
       }, []);
  


    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
      const showModal = async () => {
       
       
      };
      // showModal()
    }, [isProfileDisplayerModalVisible]);

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
      }).start(() => setIsProfileDisplayerModalVisible(false));

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

// const ids =[ user._id,
//     selectedPost._id,
//     challenge._id
//     ]






 //********************************** comments ****************************************/


    return (
    
         
          <View
            style={styles.container}
            className="  flex-row justify-center items-center bg-[#ffffff]"  >
             {isLoaded && userProfile && (
                <Modal 
                  backdropOpacity={0.9}
                //   useNativeDriverForBackdrop ={true}
                  transparent={true}
                  onBackdropPress={()=>{setIsProfileDisplayerModalVisible(false)}}
                  isVisible={isProfileDisplayerModalVisible} 
                  animationType="fade"
                //   animationType="slide"
                  onRequestClose={closeModal}
                  >
                  
                  <View 
                    style={styles.modalContainer }
                     >
                       
                    {/* <Animated.View 
                      className="  borde-2 borde-orange-400 rounded-lg flex-col justify-start items-center "
                      style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}> */}
                        
                        
                        <View
                          className="w-[100%] h-[45%] rounded-t-xl flex-col justify-start items-center  g-[#313232]">
                              
                            <View className="flex-col w-[100%] h-[75%] justify-start px-1 py-1 items-center  gap-">
                                    <Image 
                                    className= " rounded-xl  w-[100%] h-[100%]"
                                    source= { {uri:userProfile.cover_img}}
                                    resizeMode='cover'
                                    />    
                                     <Image 
                                    style ={{bottom : -52 }}
                                    className= " absolute rounded-full  w-28 h-28"
                                    source= { {uri:userProfile.profile_img}}
                                    resizeMode='fill'
                                    />    
                            </View>
                            <View className=" w-[90vw]  h-[25%] flex-row justify-center py-2 items-center">
                                <InfosProfile city={userProfile.city} state={userProfile.state} country={userProfile.country} heigh={60} color ="black" />
                            </View>    
                        </View>

                        <View 
                            className={"w-[100%]  h-[12%] p- flex-row justify-center bg-[#ffffff] rounde-xl items-center"} >
                                  <View 
                                   className={"w-[100%]  h-[100%] p-2 flex-row justify-center rounded-3xl g-[#fdf0f0] items-center"} >
                                             <Text
                                                style={{fontSize:width/34}}
                                                className="text-black font-bold  text-xl ">
                                                {userProfile.name}
                                            </Text>
                                  </View>
                               
                        </View>
                        <View 
                            className={"w-[90%]  h-[7%] px- flex-row justify-evenly g-[#f3f6f6] mt-auto rounded-lg items-center"} >
                                 <View 
                                   className={"w-[40%]  h-[100%] borde-r-2 borde-l-2 borde-b-2 borde-[#ea1389] flex-row justify-center gap-1 g-[#d7dfdf] rounded-b-lg items-center"} >
                                             <Text
                                                style={{fontSize:width/35,
                                                        color : userFriendData.friends.find(friend => friend.sender_id === userProfile._id) ?
                                                               "#f65b5b" :"black"
                                                }}
                                                className="text-white font-black  text-xl ">
                                                    {userFriendData.friends.find(friend => friend.sender_id === userProfile._id) ?
                                                    "Friend" :"Not Friend" }
                                            </Text>
                                            {userFriendData.friends.find(friend => friend.sender_id === userProfile._id) && (
                                                  <Image 
                                                //   style ={{bottom : -52 }}
                                                  className= "rounded-full mb-2 w-6 h-6"
                                                  source= { icons.check_red}
                                                  resizeMode='fill'
                                                  />    
                                            )}
                                  </View>
                                  <View 
                                   className={"w-[40%]  h-[100%] py- flex-row borde-r-2 borde-l-2 borde-b-2 borde-[#4b6ff0] justify-center gap-1 g-[#6c85d8] rounded-b-lg items-center"} >
                                             <Text
                                                style={{fontSize:width/35,
                                                        color : follow.followings.find(friend => friend.following_id === userProfile._id) ?
                                                               "#4b6ff0" :"black"
                                                }}
                                                className="text-white font-black  text-xl ">
                                                    {follow.followings.find(friend => friend.following_id === userProfile._id) ?
                                                    "Following" :"Not Following" }
                                            </Text>
                                            {follow.followings.find(friend => friend.following_id === userProfile._id) && (
                                                  <Image 
                                                  className= "  rounded-full mb-2  w-6 h-6"
                                                  source= { icons.check}
                                                  resizeMode='fill'
                                                  />    
                                            )}
                                  </View>
                                  {/* <View 
                                   className={"w-[30%]  -[7%] py-2 flex-row justify-evenly bg-[#e3f4f4] rounded-lg items-center"} >
                                             <Text
                                                style={{fontSize:width/40,
                                                    color : follow.followings.find(friend => friend.follower_id === userProfile._id) ?
                                                           "blue" :"black"
                                                  }}
                                                className="text-white font-bold  text-xl ">
                                                    {follow.followers.find(friend => friend.follower_id === userProfile._id) ?
                                                    "Following" :"Not Following" }
                                            </Text>
                                  </View> */}
                                           
                                            
                                
                               
                       </View>
                       

                        <View 
                            className={"w-[100%]  h-[36%] p-4 flex-col gap- justify-center g-[#313232] rounded-b-xl items-center"} >
                            <View 
                              className={"w-[70%]  h-[100%] p- flex-col gap-4 justify-center bg-[#0f1010] rounded-2xl items-center"} >
                                <Image 
                                    className= "  rounded-full mb-1  w-16 h-16"
                                      source= { icons.profile}
                                    resizeMode='fill'
                                      />  
                                 <Text
                                                style={{fontSize:width/34}}
                                                className="text-white font-bold  text-xl ">
                                                View Profile
                                </Text>  
                            </View>

                       </View>


                       <TouchableOpacity 
                                        // hitSlop={Platform.OS === "android" &&{ top: 300, bottom: 300, left: 200, right: 200 }}
                                        onPress={ () => setIsProfileDisplayerModalVisible(false) }
                                        className={"flex-col absolute top-[-35px] -[-5px] justify-center items-center"                     
                                                }>
                                            <Image 
                                            className="w-12 h-12 rounded-full  "
                                            source={icons.x}/>
                        </TouchableOpacity> 
                    
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
      width:"90%",
      height:"100%"
    },

    modalContainer: {
      position: 'absolute',
    //   flex:1,
    //   bottom: "40%",
       top:"15%",
       left: "5%",
    //   right: 0,
      backgroundColor: "#ffff",
    //   padding: 15,
      borderTopLeftRadius: 10,
      borderRadius: 10,
      justifyContent:"center",
      alignItems: 'center',
      width:"90%",
      height:"70%"
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
  