import { Animated, View, Button, Image, Text, ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { icons } from '../../constants';
import Countdown from '../custom/CountDown';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { flagTalentPost, getPostData, likeTalentPost, voteTalentPost } from '../../apiCalls';

import ChallengeAction from '../modal/ChallengeAction';
import { router } from 'expo-router';
import { createdAt } from 'expo-updates';
import { getInition } from '../../helper';
import VoteButton from '../custom/VoteButton';
import UserCard from './UserCard';
import LikeButton from '../custom/likeButton';
import CommentButton from '../custom/commentButton';

import ReportButton from '../custom/reportButton';
import { LinearGradient } from 'expo-linear-gradient';

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
             className = " absolute gap- 2 b g-white flex-col justify-end  items-center  "
             style={[
               {
                  // backgroundColor :"rgba(0,0,0,0.4)",

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
           
                  
                        <View
                        style ={{
                           // backgroundColor :"rgba(0,0,0,0.4)"
                        }}
                        className ="flex-1 w-[90%] px -2 rounded-t-lg flex-row  pt-2 justify-evenly items-center">
                      
                             <LikeButton
                               setIsModalVisible={setIsModalVisible} width = {width}
                               talentRoom={talentRoom} 
                               postData ={postData}  user={user}
                               handleLikePost={handleLikePost} selectedContestant={selectedContestant} />
                            <CommentButton
                               setIsModalVisible={setIsModalVisible} width = {width}
                               talentRoom={talentRoom} 
                               postData ={postData}  user={user}
                               openComments={openComments} selectedContestant={selectedContestant} />

                       

                              <ReportButton
                               setIsModalVisible={setIsModalVisible} width={width}
                               voteTimeLaps={voteTimeLaps} talentRoom={talentRoom} handleRefresh={handleRefresh}
                               postData ={postData} setAction={setAction} setText={setText} user={user}
                               selectedContestant={selectedContestant} />
                         
                          </View>
                     
                         
        
                  <View
                  style ={{ 
                     // backgroundColor :"rgba(0,0,0,0.4)"
                  }}
                  className= "flex-row p-2 w-[100%] rounded-lg justify-between items-end">
                        <TouchableOpacity
                                    style={{
                                    //   width : width 
                                    }}
                                     className="flex-1   flex-col justify-start  items-center gap-2 ">
                                           
                                            <UserCard selectedContestant={selectedContestant}  height={height/18} width={width } />
                                           
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
