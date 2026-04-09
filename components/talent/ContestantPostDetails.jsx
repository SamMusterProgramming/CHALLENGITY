import { Animated, View, Button, Image, Text, ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { icons } from '../../constants';
import Countdown from '../custom/CountDown';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { flagTalentPost, getPostData, likeTalentPost, voteTalentPost } from '../../apiCalls';
import CountryFlag from 'react-native-country-flag';
import ChallengeAction from '../modal/ChallengeAction';
import { router } from 'expo-router';
import { createdAt } from 'expo-updates';
import { getInition } from '../../helper';
import VoteButton from '../custom/VoteButton';
import UserCard from './UserCard';

export default function ContestantPostDetails({user,show ,  width ,top ,bottom,left ,right,selectedContestant ,displayComment ,setDisplayComment,talentRoom
  ,setParticipationType  ,rank,handleRefresh, setIsExpired ,openComments}) {
  const [postData , setPostData] = useState(null)
  const [isLoading , setIsLoading] = useState(true)
  const [voteTimeLaps,setVoteTimeLaps] = useState(30)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [text,setText] = useState("")
  const [action,setAction] = useState("")
  const [voted,setVoted] = useState(false)
  const {height} = useWindowDimensions()

  

  const [voterEntry , setVoterEntry] = useState(talentRoom.voters.find(v=> v.voter_id == user._id))

  
  const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  width )).current;

  useEffect(() => {
  
    Animated.timing(sidebarAnimation, {
      toValue: 
         show ? 0 :  width ,
      duration: 700,
      useNativeDriver: true,
    }).start();

   
  }, [show]);


  useEffect(() => {
   show && getPostData(selectedContestant._id,setPostData , setIsExpired)
   if(voterEntry){
   const voteDate = new Date(voterEntry.createdAt); 
   const now = new Date();
   const differenceInMilliseconds = (now - voteDate)/(1000*60*60 )
   setVoteTimeLaps(differenceInMilliseconds)
   }
  }, [show])
  
  const handleLikePost = ()=> {
    const body =
       {
        // post_id : selectedContestant._id,
        owner_id : selectedContestant.user_id,
        liker_id : user._id,
        room_id : talentRoom._id
       }
    likeTalentPost(selectedContestant._id,body,setPostData, setIsLoading ,setIsExpired)
  }


  const handleVotePost = ()=> {
   setIsModalVisible(false)
    const body =
       {
        owner_id : selectedContestant.user_id,
        voter_id : user._id,
        room_id : talentRoom._id
       }
    voteTalentPost(selectedContestant._id,body,setPostData, setIsExpired)
    setVoted(true)
   //  handleRefresh()
  }

  useEffect(() => {
   if(postData && voted)   {
      handleRefresh()
   }
  }, [postData])

  useEffect(() => {
   if(voted){
      setTimeout(() => {
         setVoterEntry(talentRoom.voters.find(v => v.voter_id == user._id))
         setVoted(false)
      }, 100);
     }
  }, [talentRoom])
  

  const handleFlagPost = ()=> {
   setIsModalVisible(false)
   const body =
      {
       owner_id : selectedContestant.user_id,
       flagger_id : user._id
      }
   flagTalentPost(selectedContestant._id,body,setPostData , setIsExpired)
 }




  return (
    <>
    {show && selectedContestant && postData && !displayComment && ( 
     <>
       
         < Animated.View
             className = " absolute  flex-col justify-end  items-center  "
             style={[
               {
                  // width: width * 0.7,
                  // height : height,
                  elevation:22,  
                  // justifyContent: 'center', 
                  // alignItems: 'center', 
                  zIndex: 3 ,
                  opacity:1,
                  width:width ,
                  bottom:bottom,
                //   top:0,
                  left:left
                //   top:top 
               }
               , 
           { transform: [{ translateX: sidebarAnimation }] }]}>
                  
                    
        
                   {/* <View
   
                      className = "w-[100%] h- [100%] px- 4 b g-black gap-2 flex-row  justify-start items-end"> */}
                        
                        <View
                        style ={{
                           backgroundColor :"rgba(0,0,0,0.6"
                        }}
                        className ="flex-1 w-[90%] bg-[#2b2a2a] rounded-lg flex-row gap-8 py-2 justify-end items-end">
                         <TouchableOpacity 
                         onPress={handleLikePost}
                         className = "w- [20%]  pb-1 gap-2  h-[100%]   flex-col-reverse  justify-start items-center  ">  
                                 <View
                                 className="  flex-row justify-center  items-center">
                                     <FontAwesome name="thumbs-up" size={width/16} color={postData.likes.find(like => like.liker_id == user._id) ?"lightblue":"white" }/>
                                 </View>
                                 <View
                                    className="  flex-row mb-1 gap-2 justify-center items-end">
                                    <Text 
                                         style ={{fontSize:width/30,
                                         }}
                                         className="te xt-xl font-bold   text-gray-100"> 
                                          {postData.likes.length}
                                    </Text>
                                 </View>          
                         </TouchableOpacity>

                         <TouchableOpacity
                         onPressIn={openComments}
                         className = "w- [20%]  pb-1 gap-2  h-[100%]   flex-col-reverse  justify-start items-center  ">  
                                    <View
                                      className="  flex-row justify-center  items-center">
                                         <Ionicons name="chatbubble" size={width/16} color="orange"/>
                                    </View>    
                                    <View
                                      className=" gap-2 flex-row mb-1 justify-center items-end">
                                        <Text 
                                         style ={{fontSize:width/30}}
                                         className="text-gray-100  font-bold">
                                            {postData.comments.length}
                                        </Text>
                                    </View>            
                         </TouchableOpacity>

                          <TouchableOpacity
                           onPress={ ()=> {
                              setIsModalVisible(true)
                              setAction("FL")
                              setText(
                                 ! postData.flags.find(flag => flag.flagger_id == user._id)?
                                 `Are you sure you want to flag  ${selectedContestant.name} 's post` 
                                 :`Are you sure you want to unflag  ${selectedContestant.name} 's post ` )
                           }}
                          
                           className = "w- [20%]  pb-1 gap-1  h-[100%]   flex-col-reverse  justify-start items-center  ">  
                                 <View
                                 className="  flex-row justify-center items-center">
                                    {!postData.flags.find(flag => flag.flagger_id == user._id) && (  
                                       <Ionicons name="flag" size={width/16} color="white" />
                                    )}
                                    {postData.flags.find(flag => flag.flagger_id == user._id) && (
                                       <Ionicons name="flag" size={width/16} color="red" />
                                    )}
                                 </View>   
                        
                          </TouchableOpacity>
                         
                          </View>
                     
                         
                  {/* </View> */}
                  <View
                  className= "flex-row w-[90%] justify-between items-end">
                        <TouchableOpacity
                                    style={{
                                    //   width : width 
                                    }}
                                     className="flex-1   flex-col justify-start  items-center gap-2 ">
                                           
                                            <UserCard selectedContestant={selectedContestant}  height={height/15} width={width } />
                                           
                        </TouchableOpacity>
                        <VoteButton 
                               setIsModalVisible={setIsModalVisible} width={width}
                               voteTimeLaps={voteTimeLaps} talentRoom={talentRoom} handleRefresh={handleRefresh}
                               postData ={postData} setAction={setAction} setText={setText} user={user}
                               voterEntry={voterEntry} selectedContestant={selectedContestant} />
                  </View>


                  

                
         </Animated.View>

         {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     handleVotePost ={handleVotePost} handleFlagPost ={handleFlagPost} setParticipationType={setParticipationType}

              
                       />
                 )}

     </>
  )} 
</>
  )
}
