import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useRef } from 'react'
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video'
import { router } from 'expo-router';
import { useEvent } from 'expo';
import { icons } from '../../constants';

export default function HeadLinePlayer({challenge,index}) {
    const videoRef = useRef()
    const player = useVideoPlayer
    (
      challenge.video_url
      , (player) => {
      player.loop = true;
      player.volume = 0.3;
      index === 0 ? player.play() : player.pause() ;
    });

    const { playing } = useEvent(player, 'playingChange', { playing: player.playing });
   
  return (
  
    <View
     className=" w-[120px] h-[100%]  flex-row justify-center items-center ">
      <TouchableOpacity
        onPress={()=>router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
        // activeOpacity={1}
        className="w-[110px] h-[93%] opacity-75 rounded-lg ">
            <VideoView
            className="opacity-10"
            ref={videoRef}
            player={player}
            style={{with:'100%',height:"100%",borderRadius:10,backgroundColor:"black"}}
            contentFit='cover'
            nativeControls={false}
            
            />
    </TouchableOpacity>
        <View
         className="absolute top-0 flex-col w-[90%] px-2   h-10   rounded-t-lg justify-center items-center gap-3 ">
           <Text className="text-white text-xs font-black"
             style={{fontSize:7}}>
             {challenge.desc}
         </Text>
        </View>

        <View
         className="absolute top-10 flex-row w-full   h-[50px]  rounded-t-sm justify-center items-start ">
           <Image
           source={icons.challenge}
           className="w-7 h-7"
           resizeMethod='cover'/>
        </View>

        <TouchableOpacity
         hitSlop={Platform.OS === "android" &&{ top: 100, bottom: 100, left: 40, right: 40 }}
         onPress={()=>router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
         className="absolute  flex-col   opacity-100  h-[60px] w-[60px]  rounded-full justify-center items-center  ">
          <Image 
          source={icons.play}
          className="w-8 h-8"
          />
        </TouchableOpacity>
             
      {/* </TouchableOpacity> */}
      
   
       <View
        className="absolute bottom-7 flex-col w-[140px]  h-8  justify-center items-center gap-2 ">
            <Text className="text-white text-xs font-black"
               style={{fontSize:9}}>
               {challenge.participants[0].name}
            </Text>
            <Image
            className="w-7 h-7 rounded-full"
            source={{uri:challenge.participants[0].profile_img}}
            resizeMethod='cover' />
         
      </View>

   </View>
 
   
  )
}