import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { icons, images } from '../constants'
import Ionicons from '@expo/vector-icons/Ionicons';
// import { Video, ResizeMode } from 'expo-av';
import { useGlobalContext } from '../context/GlobalProvider';
import { liked, loadLikeVoteData, voted } from '../apiCalls';
import PostFooter from './PostFooter';
import { ResizeMode, Video } from 'expo-av';
import { useFocusEffect } from 'expo-router';
// import { Video ,ResizeMode } from 'expo-video';
// import Video from 'expo-av';





export default function Post({participant,challenge,isVisible,setFinishPlaying}) {
   
    const {user,setUser} = useGlobalContext()
    const [isExpired,setIsExpired] = useState(false)
    const [isVoted,setIsVoted] = useState(false)
    const [isLiked,setIsLiked] = useState(false)
    const [autoPlay,setAutoPlay] = useState(isVisible)
    const [isPlaying,setIsPlaying] = useState(false)

    const videoRef = useRef(null);


  
    const ids =[ user._id,
        participant._id,
        challenge._id
        ]
    

    
    const [likesVotesData,setLikesVotesData] = useState(null) 
    // console.log(isVisible) 
    useEffect(() => { 
    loadLikeVoteData(ids,setLikesVotesData,likesVotesData, isExpired)   
     },[] )

     const handleLikes = async(e) => {
        //apiCall.js , when user click like button 
          liked(ids,setLikesVotesData,likesVotesData,setIsExpired)
    }

    const handleVotes = async(e)=> {
        //apiCall.js , when user vote like button
          voted(ids,setLikesVotesData,likesVotesData,setIsExpired)   
     }
    useEffect(() => {
        if(likesVotesData){
        likesVotesData.isLiked ? 
             setIsLiked(true)   
             : setIsLiked(false)
        likesVotesData.isVoted ? 
             setIsVoted(true)   
             : setIsVoted(false)  
        }  
      }, [likesVotesData])
  
      useEffect(() => {
        return () => {
          if(isPlaying && videoRef.current)  videoRef.current.pauseAsync();  
        };
      }, [isPlaying]);
    
      useFocusEffect(
        useCallback(() => {
          return () => {
            if (videoRef.current) {
              videoRef.current.pauseAsync();
            }
          };
        }, [videoRef])
      );

  return (
    <View className="w-[100vw] min-h-[88%] flex-col justify-start items-center  ">
        <ImageBackground className=" flex-1   flex-col justify-start items-center"
            source={images.night_bg} >

            <View className="w-full flex-row items-center  px-4 justify-between min-h-[7%]">
               <Image 
                 className="w-[35px] h-[35px] rounded-full"
                 source={{uri:participant.profile_img}} 
                 />
                <View className="flex-col justify-center items-center gap-0">
                    <Text className="text-white text-xs font-bold"
                       style={{ fontSize:9}}>
                        {participant.name}
                    </Text>
                    <Text className="text-white text-sm font-bold">
                       JSChallenger
                    </Text>
                </View>
                <View className="flex-col justify-center items-center gap-0">
                    <Image 
                    className="w-6 h-6"
                      source={icons.like}
                    />
                    <Text className="text-gray-300 text-xs font-bold">
                       {participant.likes}  Likes
                    </Text>
                </View>
                <View className="flex-col justify-center items-center gap-0">
                    <Image 
                    className="w-6 h-6"
                      source={icons.heart}
                    />
                    <Text className="text-gray-300 text-xs font-bold">
                       {participant.votes}  Votes
                    </Text>
                </View>
               
                <TouchableOpacity className="flex-col justify-center items-center gap-1">
                    <Image 
                    className="w-10 h-10"
                      source={icons.follow}
                      resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity className="flex-col justify-center items-center">
                    <Image 
                    className="w-10 h-10"
                      source={icons.friend}
                      resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
           
            <View 
             className="flex-row items-center bg-primary  justify-center min-w-[100%] min-h-[86%] "
              >          
               <Video
                ref={videoRef}
                source={{uri:participant.video_url}}
                style={{ width:'100%', height:'100%'}}
                resizeMode='cover'
                useNativeControls={true}
                shouldPlay={isVisible}
                isLooping
                volume={0.7}
                isMuted={false}
                onPlaybackStatusUpdate={(status)=>{
                  if(status.isPlaying) setIsPlaying(true)
                    else setIsPlaying(false)
                  if(status.didJustFinish){
                    setFinishPlaying(true)
                  }
                }}
              />
            </View>
          
        
            {likesVotesData && (
                <PostFooter handleLikes={handleLikes} handleVotes={handleVotes} isLiked={isLiked} 
                isVoted={isVoted} participant={participant} likesVotesData={likesVotesData}/>
            )}
          
        </ImageBackground>    
    </View>
  )
}