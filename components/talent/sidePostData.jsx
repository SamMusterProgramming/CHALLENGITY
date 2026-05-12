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

export default function SidePostData({user,show , setOpenUserModal ,top ,bottom,left ,right,selectedContestant ,displayComment ,setDisplayComment,talentRoom
  ,setParticipationType  ,rank,handleRefresh, setIsExpired ,openComments , isPlaying}) {
  const [postData , setPostData] = useState(null)
  const [isLoading , setIsLoading] = useState(true)
  const [voteTimeLaps,setVoteTimeLaps] = useState(30)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [text,setText] = useState("")
  const [action,setAction] = useState("")
  const {height , width} = useWindowDimensions()


  
  const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  width )).current;

  const verticalAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(sidebarAnimation, {
      toValue: 
      show ? 0 :  40 ,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [show]);


  useEffect(() => {
   Animated.timing(verticalAnimation, {
     toValue: isPlaying ? bottom - height/10 : 0, 
     duration: 400,
     useNativeDriver: true,
   }).start();
 }, [isPlaying]);



  
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

  const handleFlagPost = ()=> {
   setIsModalVisible(false)
   const body =
      {
       owner_id : selectedContestant.user_id,
       flagger_id : user._id
      }
   flagTalentPost(selectedContestant._id,body,setPostData , setIsExpired)
 }

 useEffect(() => {
    show && getPostData(selectedContestant._id,setPostData , setIsExpired)
    // if(voterEntry){
    // const voteDate = new Date(voterEntry.createdAt); 
    // const now = new Date();
    // const differenceInMilliseconds = (now - voteDate)/(1000*60*60 )
    // setVoteTimeLaps(differenceInMilliseconds)
    // }
   }, [show])
   

  return (
    <>
    {show && selectedContestant && postData && !displayComment && ( 
     <>
         < Animated.View
             className = " absolute px- 4 flex-row justify-start gap-2 items-end  "
             style={[
               {
                  // backgroundColor :"rgba(0,0,0,0.2)",
                  elevation:22,  
                  // zIndex: 3 ,
                  opacity:1,
                //   width:width ,
                  bottom:bottom ,
                  right:0,
                //   height:height /18,
               }
               , 
           { transform: [ { translateY: verticalAnimation }] }]}>
                      
                    
                        
                        <View
                        className ="flex- 1 bg -white flex-col gap-6 rounded-md  justify-evenly items-center">
                             <LikeButton
                               setIsModalVisible={setIsModalVisible} width = {width}
                               talentRoom={talentRoom} 
                               postData ={postData}  user={user}
                               handleLikePost={handleLikePost} selectedContestant={selectedContestant} />
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

                  
                    
                     
         </Animated.View>

         {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     handleFlagPost ={handleFlagPost} setParticipationType={setParticipationType}

              
                       />
                 )}

     </>
  )} 
</>
  )
}
