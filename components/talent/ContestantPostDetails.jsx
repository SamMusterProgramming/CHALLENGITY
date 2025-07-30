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

export default function ContestantPostDetails({user,show , height, width ,top ,bottom,left ,right,selectedContestant ,displayComment ,setDisplayComment,talentRoom
    ,handleRefresh, setIsExpired }) {
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
        // post_id : selectedContestant._id,
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
         setVoterEntry(talentRoom.voters.find(v=> v.voter_id == user._id))
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
             className = " absolute borde-4 flex-col justify-center gap-1 items-center borde g-white opacity-100 "
             style={{ 
                        
                             width: width * 0.45,height :width * 0.8,
                             elevation:22,  
                             justifyContent: 'center', 
                             alignItems: 'center', 
                             zIndex: 3 ,
                             opacity:1
             }}
             >
                   <TouchableOpacity
                     onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:selectedContestant.user_id} })}}
                     // style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                     className = "w-[100%]  h-[27%] px-4 flex-col g-[#12aaf1] rounded-xl  g-blue-500  justify-center items-center">
                                       <Image
                                      style ={{height : width * 0.8 /6 ,
                                                       width :width * 0.8 /6 }}
                                      source={{uri:selectedContestant.profile_img}}
                                      className ="w-[70px] h-[70px] rounded-full"
                                      resizeMethod='fill'
                                                         />
                                     <Text 
                                         style ={{fontSize:12 ,
                                          fontStyle:"italic"
                                         }}
                                         className="text-xl font-black  text-white"> 
                                             {selectedContestant.name}
                                     </Text>
                   </TouchableOpacity>
 
        
                   <View
   
                      className = "w-[100%]  h-[60%] py- flex-row flex-wrap g-[#12aaf1] rounded-xl  g-blue-500  justify-center items-center">
                         
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
                                 !voterEntry? `Are you sure you want to cast your vote for ${selectedContestant.name}`:
                                 voterEntry.post_id == selectedContestant._id ?
                                 `Are you sure you want to remove your vote   for ${selectedContestant.name}` :
                                 `You 've previously cast your vote for ${voterEntry.name}. Would you like to change your vote to ${selectedContestant.name}?`
                               );
                              }
                           }
                           // handleVotePost
                        }
                         className = "w-[50%] h-[50%] p- l- gap- elevation-2xl rounded-br-full rounded-tl-xl order-4 border-white g-[#f0e9e9] flex-col justify-start items-start g-[#0c0c0c] ">
                                 
                                 <View
                                 className=" w-[70%] h-[50%] flex-row justify-center text-center items-center">
                                     <Image
                                        source={postData.votes.find(vote => vote.voter_id == user._id) ? icons.voted : icons.vote}
                                        className ="w-8 h-8 rounded-full"
                                        resizeMethod='fill'
                                            />
                                 </View>
                                 <View
                                    className=" w-[70%] h-[50%] flex-row  justify-center  items-start">
                                     <Text 
                                         style ={{fontSize:13,
                                          // color: postData.votes.find(like => like.voter_id == user._id) ?"white":"white"
                                         }}
                                         className="text-xl font-black  text-black"> 
                                             {postData.votes.length}
                                     </Text>
                                 </View>   
                         </TouchableOpacity>

                         <TouchableOpacity 
                         style={{backgroundColor:postData.likes.find(vote => vote.liker_id == user._id) ?'rgba(255,255 , 255 , 0.7)': 'rgba(255, 255, 255, 0.5)'}}
                         onPress={handleLikePost}
                          className = "w-[50%] h-[50%] -4 -8 gap- rounded-bl-full rounded-tr-3xl borde-4 order-white g-[#eaa47c] flex-col justify-start pr- items-end g-[#0c0c0c] ">
                                 
                                 <View
                                 className=" w-[70%] h-[50%] flex-row justify-center  items-center">
                                     <FontAwesome name="thumbs-up" size={24} color={postData.likes.find(like => like.liker_id == user._id) ?"#0c7beb":"white" }/>
                                 </View>
                                 <View
                                    className=" w-[70%] h-[50%] flex-row  justify-center items-start">
                                    <Text 
                                         style ={{fontSize:13,
                                          //   color: postData.likes.find(like => like.liker_id == user._id) ?"white":"white"
                                         }}
                                         className="text-xl font-black pr-2  text-gray-800"> 
                                          {postData.likes.length}
                                    </Text>
                                 </View>          
                         </TouchableOpacity>

                         <TouchableOpacity
                         onPress ={()=>{setDisplayComment(true)}}
                           style={{backgroundColor: postData.comments.find(c => c.commenter_id === user._id)? 'rgba(255,255 , 255 , 0.7)': 'rgba(255, 255, 255, 0.5)' }}
                           className = "w-[50%] h-[50%] p pl- gap- rounded-tr-full bordr-4 borde-white rounded-bl-3xl  g-[#f0e9e9]  flex-col justify-start items-start g-[#0c0c0c] ">
                                         
                                    <View
                                      className=" w-[70%] h-[50%] flex-row  justify-center items-end">
                                        <Text 
                                         style ={{fontSize:13}}
                                         className="text-gray-600 text-sm  font-black">
                                            {postData.comments.length}
                                        </Text>
                                    </View>   
                                    <View
                                      className=" w-[70%] h-[50%] flex-row justify-center  items-center">
                                         <Ionicons name="chatbubble" size={24} color="orange"/>
                                    </View>
                         </TouchableOpacity>

                          <TouchableOpacity
                           style={{backgroundColor:postData.flags.find(vote => vote.flagger_id == user._id) ?'rgba(255,255 , 255 , 0.7)': 'rgba(255, 255, 255, 0.5)'}}
                           onPress={ ()=> {
                              setIsModalVisible(true)
                              setAction("FL")
                              setText(
                                 ! postData.flags.find(flag => flag.flagger_id == user._id)?
                                 `Are you sure you want to flag  ${selectedContestant.name} 's post` 
                                 :`Are you sure you want to unflag  ${selectedContestant.name} 's post ` )
                           }}
                          
                           className = "w-[50%] h-[50%]  rounded-tl-full  rounded-br-3xl borde-4 borde-white g-[#f0e9e9]  flex-col justify-end items-end g-[#d61a1a] ">
                                 <View
                                 className=" w-[70%] h-[70%] flex-row justify-center items-center">
                                    {!postData.flags.find(flag => flag.flagger_id == user._id) && (
                                        <Text 
                                        style ={{fontSize:12}}
                                        className="text-xl font-black    text-white"> 
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
                                 {/* <View
                                 className=" w-[80%] h-[100%] flex-row justify-center text-center items-center">
                                   {postData.flags.find(flag => flag.flagger_id == user._id) && (
                                       <Image
                                       source={ icons.flag }
                                       className ="w-7 h-7 rounded-full"
                                       resizeMethod='fill'
                                        />
                                   )}
                                    
                                 </View> */}
                              
                          </TouchableOpacity>
                          <View
                              //  style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
                                className= "absolute z-0 bottom-0  opaci-50 flex-col px-4 justify-center items-center">
                                     <Text 
                                            style ={{fontSize:10,
                                             backgroundColor: 'rgba(0, 0, 0, 0.3)'
                                            }}
                                            className="text-xl font-black opacity-100 px-2 text-white"> 
                                               {selectedContestant.country || "US"}
                                    </Text>
                                  < CountryFlag
                                            isoCode={selectedContestant.country || "US"}
                                            size={30}
                                       
                                  />
                           </View>

                         <View
                             
                              className = " absolute w-20  h-20 p-2 flex-col bg-[#12aaf1] rounded-full  justify-center items-center">
                             
                                   <Image 
                                                  className="absolute w-16 h-16 opacity-100"
                                                  source={ icons.play}/>
                         </View>
                         
                  </View>

                  <View
                     style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
                     className = "w-[100%]  h-[13%] px-6 flex-row g-[#12aaf1] rounded-xl  g-blue-500  justify-between items-center">
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
                                          {selectedContestant.rank < 4 ? "TOP" : "#"}  {selectedContestant.rank}
                                     </Text>
                   </View>

                
         </View>

         {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                     // handleTalentParticipation  = {handleTalentParticipation} handleTalentResignition = {handleTalentResignition}
                     handleVotePost ={handleVotePost} handleFlagPost ={handleFlagPost}

              
                       />
                 )}

     </>
  )} 
</>
  )
}
