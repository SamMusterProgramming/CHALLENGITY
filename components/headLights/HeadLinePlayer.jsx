import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video'
import { router } from 'expo-router';
import { useEvent } from 'expo';
import { icons } from '../../constants';
import { generateThumbnail } from '../../videoFiles';

export default function HeadLinePlayer({challenge,index}) {


    const videoRef = useRef()
    const [thumbNailURL ,setThumbNailURL] = useState(null)
    const [icon,setIcon] = useState(icons.publi)

    useEffect(() => {
      const getThumbNail = async()=>{
        if(!thumbNailURL) {
          const imageUrl = await generateThumbnail(challenge.video_url)
          console.log(imageUrl)
          setThumbNailURL(imageUrl.uri)
          }
      }
      getThumbNail()
      // return () => {  
      // }
    }, [])


    const getIcon = (type) => {
      switch(type) {
        case "Public":
          return icons.publi
         break;
        case "Private":
          return icons.priv
         break;
  
         case "Open":
          return icons.open
         break;
        case "Restricted":
          return icons.restricted
         break;
         case "Strict":
          return icons.strict
         break;
  
        case "Adventure":
           return icons.adventure
          break;
        case "Dance":
           return icons.dance 
          break;
        case "Eating":
            return icons.eating 
           break;
        case "Fitness":
            return  icons.fitness 
           break;
        case "Magic":
          return icons.magic 
            break;
        case "Music":
          return icons.music 
             break;
        case "Science":
            return icons.science
             break;
        case "Sport":
             return icons.sport
             break;
        case "Game":
            return icons.game
            break;
        case "Diet":
            return icons.diet
            break;
        default:
          setIcon("gray")
      }
    }
    

  return (
  
    <View
     className=" w-[95px] h-[100%]  flex-row justify-center items-center ">
      <TouchableOpacity
        onPress={()=>router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
        className="w-[95%] h-[90%] border-2 border-white opacity-35 rounded-lg ">
         
             <Image
             style={{with:'98%',height:"98%",borderRadius:5,backgroundColor:"black"}}
             contentFit='contain'
             source={{uri:thumbNailURL || ""}}
             />
       
      </TouchableOpacity>


        <View
           className="absolute top-2 flex-row w-[90%] px-2   h-5   rounded-t-lg justify-center items-center gap-3 ">
             <Text className="text-blue-300 text-xs font-black"
             style={{fontSize:7}}>
             Challenge
           </Text>
        </View>

        {/* <View
           className="absolute top-6 flex-row w-[90%] px-2   h-5   rounded-t-lg justify-center items-center gap-3 ">
           <Image
              className="w-6 h-6"
              contentFit='cover'
              source={getIcon(challenge.type)}
             />
        </View> */}

        {/* <View
          className="absolute top-20 flex-row w-full   h-[50px]  rounded-t-sm justify-center items-start ">
             
        </View> */}

        <TouchableOpacity
         hitSlop={Platform.OS === "android" &&{ top: 70, bottom: 70, left: 40, right: 40 }}
         onPress={()=>router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })}
         className="absolute  flex-col top-6  opacity-100  h-[60px] w-[60px]  rounded-full justify-center items-center  ">
          <Image 
          source={getIcon(challenge.type)}
          className="w-10 h-10"
          />
        </TouchableOpacity>
             
      {/* </TouchableOpacity> */}
      
   
       <View
        className="absolute bottom-4 flex-col w-[100%]  h-15  justify-start items-center gap-1 ">
            <Image
            className="w-7 h-7 rounded-full"
            source={{uri:challenge.participants[0].profile_img}}
            resizeMethod='cover' />
              <Text className="text-white text-xs font-bold"
               style={{fontSize:7}}>
               {challenge.participants[0].name}
            </Text>
         
      </View>

   </View>
 
   
  )
}