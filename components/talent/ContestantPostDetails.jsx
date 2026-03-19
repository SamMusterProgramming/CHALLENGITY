import { Animated, View, Button, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
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

export default function ContestantPostDetails({user,show , height, width ,top ,bottom,left ,right,selectedContestant ,displayComment ,setDisplayComment,talentRoom
  ,setParticipationType  ,rank,handleRefresh, setIsExpired ,openComments}) {
  const [postData , setPostData] = useState(null)
  const [isLoading , setIsLoading] = useState(true)
  const [voteTimeLaps,setVoteTimeLaps] = useState(30)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [text,setText] = useState("")
  const [action,setAction] = useState("")
  const [voted,setVoted] = useState(false)

  const [voterEntry , setVoterEntry] = useState(talentRoom.voters.find(v=> v.voter_id == user._id))



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
    {show && selectedContestant && postData && !displayComment &&( 
     <>
       
         <View
             className = " absolute  flex-col justify-start  items-start gap-8 "
             style={{ 
                        
                             width: width * 0.2,
                           //   height : height * 0.6 ,
                             elevation:22,  
                             justifyContent: 'center', 
                             alignItems: 'center', 
                             zIndex: 3 ,
                             opacity:1,
                             bottom:130,
                           //   top:0,
                             left:0
                           //   top:top 
             }}
             >
                   {/* <TouchableOpacity
                     onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
              
                     className = "w-[100%]  py-2 px- 2 flex-row   gap-2   justify-start items-end">
                                   

                   </TouchableOpacity> */}
 
        
                   <View
   
                      className = "w-[100%] flex -1 mt-auto  flex-col gap- 8 justify-start items-center">
                         <VoteButton 
                               setIsModalVisible={setIsModalVisible} width={width}
                               voteTimeLaps={voteTimeLaps} talentRoom={talentRoom} handleRefresh={handleRefresh}
                               postData ={postData} setAction={setAction} setText={setText} user={user}
                               voterEntry={voterEntry} selectedContestant={selectedContestant} />
         
                         <TouchableOpacity 
                         onPress={handleLikePost}
                         className = "w-[100%]  py-4 gap-2    flex-row  justify-start items-end  ">  
                                 <View
                                 className="  flex-row justify-center  items-center">
                                     <FontAwesome name="thumbs-up" size={20} color={postData.likes.find(like => like.liker_id == user._id) ?"lightblue":"white" }/>
                                 </View>
                                 <View
                                    className="  flex-row  gap-2 justify-center items-end">
                                    <Text 
                                         style ={{fontSize:width/40,
                                         }}
                                         className="te xt-xl font-bold   text-gray-100"> 
                                          {postData.likes.length}
                                    </Text>
                                 </View>          
                         </TouchableOpacity>

                         <TouchableOpacity
                         onPressIn={openComments}
                           className = "w-[100%]  py-4 gap-2    flex-row  justify-start items-end  ">
                                    <View
                                      className="  flex-row justify-center  items-center">
                                         <Ionicons name="chatbubble" size={20} color="orange"/>
                                    </View>    
                                    <View
                                      className=" gap-2 flex-row  justify-center items-end">
                                        <Text 
                                         style ={{fontSize:width/40}}
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
                          
                           className = "w-[100%]  py-4 gap-2    flex-row  justify-start items-end  ">
                                 <View
                                 className="  flex-row justify-center items-center">
                                    {!postData.flags.find(flag => flag.flagger_id == user._id) && (  
                                       <Ionicons name="flag" size={20} color="white" />
                                    )}
                                    {postData.flags.find(flag => flag.flagger_id == user._id) && (
                                       <Ionicons name="flag" size={20} color="red" />
                                    )}
                                 </View>   
                        
                          </TouchableOpacity>
                         

                     
                         
                  </View>


                  

                
         </View>

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
