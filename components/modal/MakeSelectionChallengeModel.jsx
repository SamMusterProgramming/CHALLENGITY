
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



export default function MakeSelectionChallengeModal
   ({isSelectionModalVisible, setIsSelectionModalVisible,selectionType ,data ,setSelectedType ,selectedType ,
     selectedPrivacy, setSelectedPrivacy, selectedAudience, setSelectedAudience, selectedFriends, setSelectedFriends}) {
    const {user,setUser,isViewed,setIsViewed,followings,setFollowings,userFriendData,setUserFriendData,notifications, setNotifications
                ,favouriteChallenge , setFavouriteChallenge
              } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [isLoaded , setIsLoaded] = useState(false)

    const [selection , setSelection] = useState(null)
    // const [isPlaying, setIsPlaying] = useState(true);
    // const [isExpired,setIsExpired] = useState(false)
    // const [isVoted,setIsVoted] = useState(false)
    // const [isLiked,setIsLiked] = useState(false)
    
    const [displayData,setDisplayData] = useState(data.slice(0,10))
    const [index,setIndex] = useState(1)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(data.length > 10 ? true:false)
    const slideAnim = useRef(new Animated.Value(height)).current;

    //*********************************************** player handling section */

    
const getIcon = (type) => {
        switch(type) {
          case "Public":
            return icons.publi
           break;
          case "Private":
            return icons.priv
           break;
    
           case "Open":
            return icons.open
           break;
          case "Restricted":
            return icons.restricted
           break;
           case "Strict":
            return icons.strict
           break;
    
          case "Adventure":
             return icons.adventure
            break;
          case "Dance":
             return icons.dance 
            break;
          case "Eating":
              return icons.eating 
             break;
          case "Fitness":
              return  icons.fitness 
             break;
          case "Magic":
            return icons.magic 
              break;
          case "Music":
            return icons.music 
               break;
          case "Science":
              return icons.science
               break;
          case "Sport":
               return icons.sport
               break;
          case "Game":
              return icons.game
              break;
          case "Diet":
              return icons.diet
              break;
          default:
            return true;
            // setIcon("gray")
        }
      }


    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
      const showModal = async () => {
       
       
      };
      // showModal()
    }, [isSelectionModalVisible]);

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
      }).start(() => setIsSelectionModalVisible(false));

    };


 //********************************** friend list selection for invites ****************************************/

 const handleNext = ()=> {
    const d = data.slice(index * 10 , (index+1)*10)
    setDisplayData([...d])
   //  if(index >= 1) setMoreLeft(true)
   //  if(data.length < (index+1)*10) setMoreRight(false) 
    setIndex(prev => prev+1 )
 }
  
 const handleBack = ()=> {
   const d = data.slice((index-2) * 10 , (index-1) * 10)
   setDisplayData([...d])
   // if(index >= 1) setMoreLeft(true)
   // if(data.length < (index+1)*10) setMoreRight(false) 
   setIndex(prev => prev-1 )
  }
 
 useEffect(() => {
    (index -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
    (data.length < (index)*10)? setMoreRight(false) :setMoreRight(true)
  }, [index])


useEffect(() => {
    if(selectionType === "privacy") setSelection(selectedPrivacy)
    if(selectionType === "audience") setSelection(selectedAudience)

  }, [])


    return (
       <>
  
          <View
            style={styles.container}
            // style={{height:height ,width:width}}
            className="  flex-row justify-center items-center "  >
            
                <Modal 
             
                  useNativeDriverForBackdrop={true}
                  transparent={true}
                  style={{margin:0}}
                  onBackdropPress={()=>{setIsSelectionModalVisible(false)}}
                  visible={isSelectionModalVisible}  animationType="slide" onRequestClose={closeModal}>
                   
           
                    <Animated.View 
                      className="  borde-2 borde-orange-400 rounded-lg flex-col justify-start items-center "
                      style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                     
                     
                      {selectionType === "type" && (
                        <>
 
                         <View  
                             className={"w-[100%]  -[93%]  flex-row flex-wrap justify-center items-center p-4 gap-1  b g-[#a7a0a0]  [#fffbfb] rounde"} >
                                 {data.map((element,index)=>
                                            {
                                                    return  (
                                                      <TouchableOpacity
                                                        key={index}
                                                        style={{backgroundColor: selectedType == element.value ? "lightblue" :"#fffbfb",width:width/6, height:width/6}}
                                                        onPressIn={()=>{setSelectedType(element.value)}}
                                                        className="  flex-col px-2 py-2 rounded-lg justify-center gap-2 items-center">
                                                        
                                                            <Image
                                                            source={getIcon(element.value)}
                                                            resizeMethod='cover'
                                                            style={{width:width/12, height:width/12}}
                                                            className="w-[75%] h-[80%]"
                                                             />
                                                            <View
                                                                    className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                    
                                                                    <Text 
                                                                        style={{fontSize:8 , color:selectedType == element.value ? "black" :"black"}}
                                                                        className="text-black font-black"> 
                                                                        {element.value}
                                                                    </Text>

                                                            </View>
                                                        </TouchableOpacity>
                                                        
                                                    )
                                            })
                                            }
                             </View>

                             <View
                               className="w-[100%]  rounded-b-lg flex-col mt-8 justify-center gap-2 px-2 items-center py-2  b g-[#e1dedd]">
                                    <View
                                     className=" p-2 bg-[lightblue] rounded-lg flex-col  justify-center gap-2 px-8 items-center ">
                                        <Image
                                              source={getIcon(selectedType)}
                                              resizeMethod='contain'
                                                // style={{width:width/6, height:width/6}}
                                              className="w-9 h-9" />
                                        <Text 
                                            style ={{fontSize:9}}
                                            className="text-black mb-  text-sm font-black">
                                            {selectedType}
                                        </Text>
                                    </View>   
                                    <TouchableOpacity
                                    onPress={() => setIsSelectionModalVisible(false)}
                                    className="px-8 py-2 mt-4 rounded-lg bg-blue-600 ">
                                       <Text 
                                        style ={{fontSize:11}}
                                        className="text-white mb- text-sm font-bold">
                                         DONE
                                        </Text>
                                    </TouchableOpacity>
                             </View>
                     </>
  
                    )}
                        
                       
                        
                    {selectionType == "privacy" && (
                        <>
                           
 
                         <View  
                             className={"w-[100%]  -[93%]  flex-row fl-wrap justify-between items-center p-4 gap-  b g-[#88cbe6] rounde"} >
                                 { data.map((element,index)=>
                                            {
                                                    return  (
                                                        <TouchableOpacity
                                                        key={index}
                                                        style={{backgroundColor: selection == element.value ? "lightblue" :"#d6d6d6"
                                                            // ,width:width/6, height:width/6
                                                        }}
                                                        // onPress={()=>setIsSelectorVisible(false)}
                                                        onPressIn={()=>{setSelection(element.value)}}
                                                        //  style={{}}
                                                        className= "w-[48%]   bg-[#d6d6d6] flex-col px-2 py-4 rounded-lg justify-start gap-4 items-center">
                                                           
                                                            <View
                                                             className="w-[100%] flex-col justify-center gap-2 items-center">
                                                                <Image
                                                                source={getIcon(element.value)}
                                                                resizeMethod='cover'
                                                                style={{width:width/10, height:width/10}}
                                                                // className="w-[75%] h-[80%]" 
                                                                />
                                                                <View
                                                                        className="w-[100%] -[20%] flex-row justify-center items-center">
                                                        
                                                                        <Text 
                                                                            style={{fontSize:10}}
                                                                            className="text-black font-black"> 
                                                                            {element.value}
                                                                        </Text>

                                                                </View>

                                                            </View>

                                                            <View
                                                             className="w-[100%] min-h-[13vh] p-2 flex-col bg-[#dee2eb] rounded-lg justify-center gap-2 items-center">
                                                                        <Text 
                                                                            style={{fontSize:9}}
                                                                            className="text-black font-semibold"> 
                                                                            {element.value == "Public" ?
                                                                             `Public 🌍 Open to everyone! Join community challenges where anyone can participate,like, and vote.compete and share with others. It’s all about collective motivation and friendly competition!`
                                                                            :`Private 🔒 Participation by invite only—likes and votes from the public! Only invited users can join and complete the challenge . It’s all about collective motivation and friendly competition!`
                                                                        }
                                                                        </Text>
                                                            </View>

                                                        </TouchableOpacity>

                                                    )
                                            })
                                            }
                             </View>

                             <View
                               className="w-[100%]   flex-col justify-center mt-4 gap-2 px-2 items-center py-2  b g-[#84b4c8]">
                                    <View
                                       className=" p-2 bg-[lightblue] rounded-lg flex-col  justify-center gap-2 px-6 items-center ">
                                          <Image
                                                source={getIcon(selection)}
                                                resizeMethod='contain'
                                                  // style={{width:width/6, height:width/6}}
                                                className="w-12 h-12" />
                                          <Text 
                                              style ={{fontSize:9}}
                                              className="text-black mb-  text-sm font-black">
                                              {selection}
                                          </Text>
                                    </View>

                                    <TouchableOpacity
                                    onPress={() => {
                                        setSelectedPrivacy(selection)
                                        setIsSelectionModalVisible(false)
                                    }}
                                    className="px-8 py-2 mt-2  rounded-lg bg-blue-600 ">
                                       <Text 
                                        style ={{fontSize:11}}
                                        className="text-white mb- text-sm font-bold">
                                          Done
                                        </Text>
                                    </TouchableOpacity>
                             </View>
                     </>
  
                    )}



                   {selectionType == "audience" && (
                        <>
                           <View
                           className="w-[100%] -[7%] py-2 rounded-t-xl flex-row justify-center items-center  bg-[#827a76]">
                               
                             <Text 
                                 style ={{fontSize:9}}
                                 className="text-white mb-  text-sm font-black">
                                 Select audience Bellow
                             </Text>
                        
 
                         </View>
 
                         <View  
                             className={"w-[100%]  -[600px]  flex-row flex-wrap justify-center items-center p-4 gap-4  bg-[#585555] rounde"} >
                                
                                 {data.map((element,index)=>
                                            {
                                                    return  (
                                                        <TouchableOpacity
                                                        key={index}
                                                        style={{backgroundColor: selectedAudience == element.value ? "white" :"#c0beba"
                                                            // ,width:width/6, height:width/6
                                                        }}
                                                        // onPress={()=>setIsSelectorVisible(false)}
                                                        onPressIn={()=>{setSelectedAudience(element.value)}}
                                                        //  style={{}}
                                                        className= "w-[45%]   bg-[#c0beba] flex-col px-2 py-4 rounded-lg justify-start gap-4 items-center">
                                                           
                                                            <View
                                                             className="w-[100%] flex-col justify-center gap-2 items-center">
                                                                <Image
                                                                source={getIcon(element.value)}
                                                                resizeMethod='cover'
                                                                style={{width:width/10, height:width/10}}
                                                                // className="w-[75%] h-[80%]" 
                                                                />
                                                                <View
                                                                        className="w-[100%] -[20%] flex-row justify-center items-center">
                                                        
                                                                        <Text 
                                                                            style={{fontSize:9}}
                                                                            className="text-black font-black"> 
                                                                            {element.value}
                                                                        </Text>

                                                                </View>

                                                            </View>

                                                            <View
                                                             className="w-[100%] p-2 flex-col bg-[#dee2eb] rounded-lg justify-center gap-2 items-center">
                                                                        <Text 
                                                                            style={{fontSize:7}}
                                                                            className="text-black font-semibold"> 
                                                                            {element.value == "Open" ?
                                                                             `Private (Open) 🔒 Participation by invite only, but everyone can view, like, and vote on the progress. Great for close groups while still sharing the experience with the wider community.`
                                                                            :element.value == "Restricted"?
                                                                             `Private (Restricted) 🔒   Only your friends can view your challenge. but Only invited friends can submit entries or take part in the challenge . Great for sharing experience with friends`
                                                                             :`Private (Strict) 🔒   Only invited friends can view, like, vote, and participate in this challenge. Great for sharing experience and training with a group of participants and invited friends`
                                                                        }
                                                                        </Text>
                                                            </View>

                                                        </TouchableOpacity>

                                                    )
                                            })
                                            }
                             </View>

                             <View
                               className="w-[100%]  rounded-b-lg flex-row justify-start gap-2 px-2 items-end py-2  bg-[#c5d0de]">
                                     <Image
                                           source={getIcon(selectedAudience)}
                                           resizeMethod='contain'
                                            // style={{width:width/6, height:width/6}}
                                           className="w-9 h-9" />
                                     <Text 
                                        style ={{fontSize:9}}
                                        className="text-black mb-  text-sm font-bold">
                                         {selectedAudience}
                                    </Text>
                                    <TouchableOpacity
                                    onPress={() => setIsSelectionModalVisible(false)}
                                    className="px-4 py-2  ml-auto rounded-lg bg-green-600 ">
                                       <Text 
                                        style ={{fontSize:9}}
                                        className="text-white mb- text-sm font-bold">
                                         OK
                                        </Text>
                                    </TouchableOpacity>
                             </View>
                     </>
  
                    )}



                   {selectionType == "invite" && (
                        <>
                          
 
                         <View  
                             className={"w-[100%]  min- h-[40%]  flex-row flex-wrap justify-center items-center p-1 gap-2 py-4  b g-[#868181] [#afabab] rounde"} >
                                   
                                   {displayData.map((element,index)=>
                                        {
                                            return  (
                                                <TouchableOpacity
                                                key={index}
                                            
                                                style={{backgroundColor: selectedFriends.find(friend => friend.user_id == element.user_id) ? "lightblue" :"white"
                                                    ,width:width/6, height:width/6
                                                }}
                                                onPress={()=> {
                                                    if(selectedFriends.find(friend => friend.user_id == element.user_id) )
                                                        {
                                                            const fds = selectedFriends.filter(friend => friend.user_id !== element.user_id) 
                                                            setSelectedFriends(fds)
                                                        }
                                                    else {
                                                    if(selectedFriends.length<10){
                                                        let dfs = selectedFriends
                                                        dfs.push(element)
                                                        setSelectedFriends([...dfs])
                                                    }
                                                    }     
                                                        
                                                }}
                                                className="-[60px] -[40%] flex-col px-2 py-2 rounded-lg justify-center gap-2 items-center">  
                                                    <Image
                                                    source={{uri:element.profile_img}}
                                                    resizeMethod='contain'
                                                    style={{width:width/13, height:width/13}}
                                                    className=" rounded-full" />
                                                    <View
                                                            className=" flex-row justify-center items-center">
                                            
                                                            <Text 
                                                                style={{fontSize:6 ,
                                                                    color: selectedFriends.find(friend => friend.user_id == element.user_id)?"black":"black"
                                                                }}
                                                                className="text-black font-black"> 
                                                                {element.name.slice(0,13)}
                                                            </Text>
                            
                                                    </View>

                                                    {selectedFriends.find(friend => friend.user_id == element.user_id) &&  (
                                                          <Image
                                                          source={icons.check}
                                                          resizeMethod='contain'
                                                        //   style={{width:width/13, height:width/13}}
                                                          className="absolute top-1 right-1 w-3 h-3 " />
                                                    )}
                                                </TouchableOpacity>
                                                
                                                )
                                        })
                                    }
             
                         </View>
                         <View
                             className="w-[100%] px-2 py-2 b g-[#868181] mt-[-3px] flex-row -auto justify-between items-center">
                                        <TouchableOpacity
                                                className=" justify-center items-center   "
                                                onPressIn={handleBack}
                                                >
                                                    <Image   
                                                    source={moreLeft?icons.back_arrow:""}
                                                    className=" w-8 h-8 rounded-full"
                                                    />
                                        </TouchableOpacity>
                      
                                     
                                        {moreRight && (
                                        <TouchableOpacity
                                            className=" justify-center items-center   "
                                            onPressIn={handleNext}
                                            >
                                                <Image   
                                                source={icons.next_arrow}
                                                className=" w-8 h-8 rounded-full"
                                                />
                                        </TouchableOpacity>
                                        )}

                         </View>

                         <View
                               className="w-[100%]  rounded-b-lg flex-row justify-center gap-2 px-2 items-end py-2  b g-[#eceff3]">
                                    
                                    <TouchableOpacity
                                    onPress={() => setIsSelectionModalVisible(false)}
                                    className="px-8 py-2   rounded-lg bg-blue-600 ">
                                       <Text 
                                        style ={{fontSize:11}}
                                        className="text-white mb- text-sm font-bold">
                                         Done
                                        </Text>
                                    </TouchableOpacity>
                         </View>
                     </>
  
                    )}


                       
                    </Animated.View>
                
                    
                  {/* </View> */}
                </Modal>
                <StatusBar    backgroundColor={"transparent"}/>
            </View>

       
            </>
    
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display : "flex" ,
      // backgroundColor : 'rgb(0 , 0 , 0 )' ,
      justifyContent: 'center' ,
      alignItems: 'center' ,
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 16,
    },
    modalOverlay: {
    //   flex: 1,
      // justifyContent: 'flex-end',
      backgroundColor: '',
       width:"86%",
       height:"80%"
    },
    modalContainer: {
      flex : 1,
      backgroundColor: 'rgba(0, 0, 0 , 0.7)',
      padding: 25,
      borderTopLeftRadius: 10,
      borderRadius: 10,
      justifyContent:"center",
      alignItems: 'center',
      width:"100%",
      margin:0
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
  