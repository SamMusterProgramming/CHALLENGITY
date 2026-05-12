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

export default function ContestantPostDetails({user,show , setOpenUserModal, width ,top ,bottom,left ,right,selectedContestant ,displayComment ,setDisplayComment,talentRoom
  ,setParticipationType  ,rank,handleRefresh, setIsExpired ,openComments , isPlaying}) {
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

  const verticalAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(sidebarAnimation, {
      toValue: 
      show ? 0 :  width ,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [show]);


  useEffect(() => {
   Animated.timing(verticalAnimation, {
     toValue: isPlaying ? bottom -20 : 0, 
     duration: 400,
     useNativeDriver: true,
   }).start();
 }, [isPlaying]);


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
             className = " absolute px-4 flex-row justify-start gap-4 items-end  "
             style={[
               {
                  // backgroundColor :"rgba(0,0,0,0.2)",
                  elevation:22,  
                  // zIndex: 3 ,
                  opacity:1,
                  width:width ,
                  bottom:bottom ,
                  left:left,
                  height:height /18,
               }
               , 
           { transform: [ { translateY: verticalAnimation }] }]}>
                         <TouchableOpacity
                                onPress={ () => {
                                           setOpenUserModal(true)
                                             }
                                         }
                                            style={{
                                            //   width : width 
                                            }}
                                            className="flex- 1  pr -2 flex-col justify-start  items-center gap-2 ">
                              <Image
                                 className = "rounded-full "
                                 source={{ uri: selectedContestant.profileImage.publicUrl }}
                                 style={{
                                    width: height /18 ,
                                    height: height /18,
                                    borderWidth:  1,
                                    borderColor:  "#374151",
                                 }}
                              />
                        </TouchableOpacity>
                        <View
                           className="flex-1 px-4 justify-center items-center"
                           style={{
                              minHeight: height / 18,
                              backgroundColor: "rgba(0,0,0,0.28)",
                           }}
                           >
                           <Text
                              numberOfLines={2}
                              style={{
                                 color: postData.votes.find(
                                 vote => vote.voter_id == user._id
                                 )
                                 ? "#FFD700"
                                 : "rgba(255,255,255,0.92)",

                                 fontSize: width / 52,

                                 lineHeight: width / 24,

                                 fontWeight: "600",

                                 letterSpacing: 0.4,

                                 textAlign: "center",

                                 width: "100%",
                              }}
                           >
                              {postData.votes.find(
                                 vote => vote.voter_id == user._id
                              )
                                 ? `Your vote supports ${selectedContestant.name}'s performances`
                                 : `Watch ${selectedContestant.name}'s performances and cast your vote to support their journey`}
                           </Text>
                           </View>
                        <View
                          style ={{
                           // backgroundColor :"rgba(173, 216, 230,0.25)"
                        }}
                        className =" flex-row ml-auto flex- 1 rounded-xl justify-center items-center">
                             <VoteButton 
                                    setIsModalVisible={setIsModalVisible} width={width} height = {height/18}
                                    voteTimeLaps={voteTimeLaps} talentRoom={talentRoom} handleRefresh={handleRefresh}
                                    postData ={postData} setAction={setAction} setText={setText} user={user}
                                    voterEntry={voterEntry} selectedContestant={selectedContestant} />
                        </View>
                        
                        {/* <View
                        className ="flex-1 b g-white/20  flex-row bo rder-2 bor der-gold/30 rounded-md  justify-evenly items-center">
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
                        </View> */}

                  
                    
                     
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
