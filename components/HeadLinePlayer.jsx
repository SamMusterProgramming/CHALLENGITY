import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video'
import { router } from 'expo-router';
import { useEvent } from 'expo';

export default function HeadLinePlayer({challenge,index}) {
    const videoRef = useRef()
    const player = useVideoPlayer
    (
      challenge.video_url
      , (player) => {
      player.loop = true;
      player.volume = 0.3;
      index === 1 ? player.play() : player.pause() ;
    });

    const { playing } = useEvent(player, 'playingChange', { playing: player.playing });
   
  return (
    <View
     className=" w-[150px] h-[100%]  flex-row justify-center items-center ">
      <TouchableOpacity
        onPress={()=>router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
        activeOpacity={1}
        className="w-[140px] h-[90%] rounded-lg ">
            <VideoView
            ref={videoRef}
            player={player}
            style={{with:'100%',height:"100%",borderRadius:10,backgroundColor:"black",opacity:30}}
            contentFit='contain'
            nativeControls={false}
            
            />

        <View
         className="absolute top-0 flex-row w-100 px-2   h-6 w-[140px] f rounded-t-lg justify-start items-center gap-3 left-0">
           <Text className="text-white text-xs font-bold"
             style={{fontSize:8}}>
             {challenge.desc}
         </Text>
        </View>

        <View
         className="absolute top-5 flex-row w-100    h-[140px] w-[150px]  rounded-t-sm justify-center items-start  left-0">
           <Text className="text-white text-xl font-bold"
             style={{fontSize:10}}>
              Challenge
         </Text>
        </View>
             
      </TouchableOpacity>
      
   
       <View
        className="absolute bottom-5 flex-row w-100 h-8  justify-start items-end gap-3 left-2">
            <Image
            className="w-8 h-8 rounded-full"
            source={{uri:challenge.participants[0].profile_img}}
            resizeMethod='cover' />
         <Text className="text-white text-xs font-bold"
         style={{fontSize:8}}>
             {challenge.participants[0].name}
         </Text>
      </View>


   </View>
   
  )
}