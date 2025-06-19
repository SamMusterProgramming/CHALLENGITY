import { View, Text, TouchableOpacity, Platform, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video';
import { icons } from '../../constants';
import { useEvent } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { getInition } from '../../helper';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

export default function FSinstantPlayer({participant, rank , challenge ,setSelectedPost , setSelectedRank ,
                 setIsProfileDisplayerModalVisible, setSelectedProfile}) {

 
    const {user,setUser } = useGlobalContext()
    const [displayComments,setDisplayComments] =useState(false)
    const [currentIndex,setCurrentIndex] = useState(0)

  
    // const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

 

  return (

        <View
        style ={{
            marginTop : rank <= 2  ? "3%" : "0" ,
            marginBottom : rank > 2  ? "3%" : "0" ,
            marginLeft: rank % 2 == 1 ? "3%" : "0" ,
            marginRight : rank % 2 == 0 ? "3%" : "0"
        }}
         className=" w-[94%]  h-[100%] flex-col justify-between  rounded-x  g-[#ffffff] items-center">  
             {participant.status === "PA" ? (
                <>
                 <View
                  className=" w-[100%] h-[10%] px-1 flex-row justify-between rounded-t-xl rounded-tl-x rounde-t-l py- bg-[#f9fafc] items-center">
                        <View className="flex-row justify-center items-center mt-  gap-">
                            <View
                            className="flex-row justify-center items-center w-8  ">
                                <Image 
                                className={ "w-5 h-5"}
                                source={ icons.like }
                                resizeMode='contain'
                                />
                            </View>      
                            <Text 
                             style ={{fontSize:8}}
                             className="text-black  font-bold">
                                {participant.likes}  
                            </Text>
                        </View>
                        <View className="flex-row justify-center items-center  gap-">
                                <View 
                                className="flex-row justify-center items-center w-8">
                                    <Image 
                                    className= {"w-6 h-6"}
                                    source= { icons.heart }
                                    resizeMode='contain'
                                    />
                                </View>
                                <Text 
                                style ={{fontSize:8}}
                                className="text-black  font-bold">
                                    {participant.votes}
                                </Text>
                        </View>
                        <TouchableOpacity
                        // onPress={() => props.setDisplayComments(prev => !prev)}
                        className="flex-row justify-center gap-1  items-center">
                            <Ionicons name="chatbubble" size={16} color="orange"/>
                            <Text 
                            style ={{fontSize:8}}
                            className="text-black text-sm font-bold">
                                {/* {props.comment_count} */}
                                345
                            </Text>
                            {/* <Text className="text-white mt-auto text-xs font-bold">
                                    Comments
                            </Text> */}
                        </TouchableOpacity>
                       

                       
                </View>

                <View
                style={{backgroundColor: participant.user_id == user._id ? "black" :"black" }}
                className=" w-[100%]  h-[77%] flex-col justify-center rounded-tr- rounded-br- bg-black items-center"> 
                        <View
                        className=" w-[100%]  h-[100%] flex-row justify-center rounded-l  g-white items-center">    
                           
                                        <TouchableOpacity
                                            onPress={
                                                () =>  
                                                    {
                                                    setSelectedRank(rank)
                                                    setSelectedPost({...participant})
                                                    }
                                                    // router.push({ pathname: '/ChallengeDisplayer', params: {
                                                    //                                  challenge_id:challenge._id,
                                                    //                                  playIndex:rank
                                                    //                                 } })
                                            }
                                            className="w-[100%] h-[100%] py-1 " >
                                                
                                                        <Image
                                                        className="rounded-xl"
                                                            style={{with:'100%',height:"100%",borderRadius:5,backgroundColor:"black",opacity:1}}
                                                            contentFit='cover'
                                                            source={{uri:participant.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                                        />
                                                           
                                        </TouchableOpacity>
                                        <TouchableOpacity  
                                        className={"flex-col absolute  "
                                            }>
                                            <Image 
                                            className="w-10 h-10 opacity-100"
                                            source={icons.play}/>
                                        </TouchableOpacity>
                                 
                        </View>

                       

                </View>
                <View
                        className=" w-[100%]  h-[13%] flex-row justify-center rounded-b-xl px-1 py- bg-[#d3d7ea] items-center"> 
                            <View className="flex-row w-[20%] justify-center items-center  gap-">
                                {/* <View 
                                className="flex-col justify-center items-center w-[100%] "> */}
                                    <Image 
                                    className= " rounded-full  w-6 h-6"
                                    source= { {uri:participant.profile_img}}
                                    resizeMode='cover'
                                    />
                                {/* </View> */}
                              
                            </View>
                            <View
                             className=" w-[60%]  h-[90%] flex-col justify-center rounded- px-2 py-2  items-start"> 
                                    <Text 
                                        style ={{fontSize:8}}
                                        className="text-black mb-  text-sm font-black">
                                        {participant.name}
                                    </Text>
                                    {/* <Text 
                                        style ={{fontSize:6}}
                                        className="text-blue-600 mb-  text-sm font-black">
                                        {getInition(participant.name)}CHALLENGER
                                    </Text> */}
                           </View>
                        
                           <View
                             className=" w-[20%]  h-[85%] flex-row justify-center rounded- px- py- items-center"> 
                             
                                    {/* <Text 
                                        style ={{fontSize:8}}
                                        className="text-white mt-aut text-sm font-bold">
                                         Rank #
                                    </Text> */}
                                    <Text 
                                        style ={{fontSize:14}}
                                        className="text-orange-600 mt-aut text-sm font-bold">
                                        # {rank}
                                    </Text>
                              
                                 
                           </View> 
                        </View>
                </>
                 ):(
                    <View
                    className=" w-[100%]  h-[100%] flex-col justify-between   g-white items-center">  
                         
                         <View
                            className=" w-[100%]  h-[10%] flex-row justify-center gap- py- bg-white rounded-t-xl g-black items-center">  
                           
                           <Text 
                                style ={{fontSize:8}}
                                className="text-black mt-aut text-sm font-bold">
                                  has not joined the challenge yet
                           </Text>
                         </View>

                         <TouchableOpacity
                          onPress={ ()=> {
                            if(user._id !== participant._id){
                            setIsProfileDisplayerModalVisible(true)
                            setSelectedProfile(participant._id)
                            }
                           }}
                            className=" w-[100%]  h-[75%] flex-col justify-center gap-2  bg-[#0c1b51] items-center">  
                           <Image
                            className="rounded-full w-16 h-16"
                            // style={{with:80,height:80}}
                            contentFit='cover'
                            source={{uri:participant.profile_img || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                             />
                           <Text 
                                style ={{fontSize:10}}
                                className="text-white mt-aut text-sm font-bold">
                                  {participant.name}
                           </Text>
                         </TouchableOpacity>

                         

                         <View
                            className=" w-[100%]  h-[15%] flex-row justify-center gap- py- rounded-b-xl  bg-[#e2e9e6] items-center">  
                           <Image
                            className="rounded-full w-6 h-6"
                            // style={{with:80,height:80}}
                            contentFit='cover'
                            source={icons.invites}
                             />
                            <View className = "w-[60%]  h-[80%] flex-col justify-center gap- px- py-2 g-black items-center">
                                <Text 
                                    style ={{fontSize:9}}
                                    className="text-black mt- text-sm font-bold">
                                    { participant._id == user._id ? " You are invited" :"is Invited"} 
                                </Text>
                                
                            </View>
                           
                         </View>
                        
                    </View>
                )}
        </View>
  )
}