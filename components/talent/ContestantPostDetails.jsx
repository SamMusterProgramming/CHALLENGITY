import { Animated, View, Button, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { icons } from '../../constants';
import Countdown from '../custom/CountDown';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { getPostData, likeTalentPost, voteTalentPost } from '../../apiCalls';

export default function ContestantPostDetails({user,show , height, width ,top ,bottom,left ,right,selectedContestant ,displayComment ,setDisplayComment
}) {
  const [postData , setPostData] = useState(null)

  useEffect(() => {
   show && getPostData(selectedContestant._id,setPostData)
  }, [show])
  
  const handleLikePost = ()=> {
    const body =
       {
        // post_id : selectedContestant._id,
        owner_id : selectedContestant.user_id,
        liker_id : user._id
       }
    likeTalentPost(selectedContestant._id,body,setPostData)
  }

  const handleVotePost = ()=> {
    const body =
       {
        // post_id : selectedContestant._id,
        owner_id : selectedContestant.user_id,
        voter_id : user._id
       }
    voteTalentPost(selectedContestant._id,body,setPostData)
  }

  return (
    <>
    {show && selectedContestant && postData && !displayComment &&( 
     <>
       
         <View
             className = " absolute borde-4 justify-center items-center borde g-white opacity-100 "
             style={{ 
                        
                             width: width * 0.6,height :width * 0.6,
                             elevation:22,  
                             justifyContent: 'center', 
                             alignItems: 'center', 
                             zIndex: 3 ,
                             opacity:1
             }}
             >
 
        
                   <View
   
                      className = "w-[100%]  h-[100%] py- flex-row flex-wrap g-[#12aaf1] rounded-3xl  g-blue-500  justify-center items-center">
                         
                         <TouchableOpacity
                         style={{backgroundColor: 'rgba(255, 255, 250, 0.8)'}}
                         onPress={handleVotePost}
                         className = "w-[50%] h-[50%] p-6 l- gap-2 elevation-2xl rounded-br-full rounded-tl-3xl order-4 border-white g-[#f0e9e9] flex-col justify-start items-send g-[#0c0c0c] ">
                                 
                                 <View
                                 className=" w-[100%] h-[] flex-row justify-start text-center items-end">
                                     <Image
                                        source={postData.votes.find(vote => vote.voter_id == user._id) ? icons.voted : icons.vote}
                                        className ="w-8 h-8 rounded-full"
                                        resizeMethod='fill'
                                            />
                                 </View>
                                 <View
                                    className=" w-[100%] h-[] flex-row pl-3 justify-start text-center items-start">
                                     <Text 
                                         style ={{fontSize:14}}
                                         className="text-xl font-bold  text-black"> 
                                             {postData.votes.length}
                                     </Text>
                                 </View>   
                         </TouchableOpacity>

                         <TouchableOpacity 
                         style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
                         onPress={handleLikePost}
                          className = "w-[50%] h-[50%] p-6 -8 gap-2 rounded-bl-full rounded-tr-3xl borde-4 order-white g-[#eaa47c] flex-col justify-start pr- items-end g-[#0c0c0c] ">
                                 
                                 <View
                                 className=" w-[100%] h-[] flex-row justify-end text-center items-end">
                                     <FontAwesome name="thumbs-up" size={24} color={postData.likes.find(like => like.liker_id == user._id) ?"blue":"gray" }/>
                                 </View>
                                 <View
                                    className=" w-[100%] h-[] text-center items-end">
                                    <Text 
                                         style ={{fontSize:14}}
                                         className="text-xl font-bold pr-2  text-black"> 
                                          {postData.likes.length}
                                    </Text>
                                 </View>          
                         </TouchableOpacity>

                         <TouchableOpacity
                         onPress ={()=>{setDisplayComment(true)}}
                           style={{backgroundColor: 'rgba(255, 255, 255 , 0.8)'}}
                           className = "w-[50%] h-[50%] p-6 pl- gap-2 rounded-tr-full bordr-4 borde-white rounded-bl-3xl  g-[#f0e9e9]  flex-col justify-end items-start g-[#0c0c0c] ">
                                         
                                    <View
                                      className=" w-[100%] h-[] flex-row  text-center items-start">
                                        <Text 
                                         style ={{fontSize:14}}
                                         className="text-black text-sm pl-2 font-bold">
                                            {postData.comments.length}
                                        </Text>
                                    </View>   
                                    <View
                                      className=" w-[100%] h-[] flex-row justify-start text-center items-end">
                                         <Ionicons name="chatbubble" size={26} color="orange"/>
                                    </View>
                         </TouchableOpacity>

                          <View 
                           style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
                           className = "w-[50%] h-[50%] p-4 pr- gap-2 rounded-tl-full  rounded-br-3xl borde-4 borde-white g-[#f0e9e9] text-center flex-col justify-end items-end g-[#0c0c0c] ">
                                 <View
                                 className=" w-[100%] h-[] text-center items-end">
                                    <Text 
                                            style ={{fontSize:14}}
                                            className="text-xl font-bold  text-black"> 
                                              #  {selectedContestant.rank}
                                    </Text>
                                 </View>   
                                 <View
                                 className=" w-[100%] h-[] flex-row justify-end text-center items-end">
                                    <Image
                                    source={ icons.rank }
                                    className ="w-8 h-8 rounded-full"
                                    resizeMethod='fill'
                                     />
                                 </View>
                              
                          </View>

                         <View
                             
                              className = " absolute w-[100%]  h-[70%] p-2 flex-col g-[#12aaf1] rounded-t-full  justify-center items-center">
                                  <Image
                                      style ={{height : width * 0.8 /4 ,
                                                       width :width * 0.8 /4 }}
                                      source={{uri:selectedContestant.profile_img}}
                                      className ="w-[100px] h-[100px] rounded-full"
                                      resizeMethod='fill'
                                                         />
                                   <Image 
                                                  className="absolute w-14 h-14 opacity-100"
                                                  source={ icons.play}/>
                         </View>
                  </View>

                
         </View>

     </>
  )} 
</>
  )
}
