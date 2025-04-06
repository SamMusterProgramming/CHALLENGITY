import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { Link, router } from 'expo-router'
import "../global.css";
import { ImageBackground , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {icons, images} from '../constants'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getFavouriteChallenges, getFollowData, getFollowings, getNotificationByUser, getTopChallenges, getUserFriendsData, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, isAuthenticated } from '../apiCalls';
import { useVideoPlayer, VideoView } from 'expo-video';
import demo from "../assets/video/demo2.mp4"
import { useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../context/GlobalProvider';
import { clearLocalStorage } from '../videoFiles';



export default function app() {
  const videoRef = useRef()
  const {user,setUser,userPublicChallenges, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteChallenge
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges
  } = useGlobalContext()

  const player = useVideoPlayer
  ( 
    demo, (player) => {
    player.loop = true;
    player.volume = 0.7
    player.play() ;
  });


  useEffect(() => {
    if(user) {
      getUserPublicChallenges(user._id,setUserPublicChallenges)
      getUserPrivateChallenges(user._id,setUserPrivateChallenges)
      getUserPublicParticipateChallenges(user._id ,setPublicParticipateChallenges)
      getUserPrivateParticipateChallenges(user._id ,setPrivateParticipateChallenges)
      getNotificationByUser(user._id , setNotifications)
      getFollowings(user._id,setFollowings)
      getUserFriendsData(user._id,setUserFriendData)
      getFollowData(user._id,setFollow)
      getFavouriteChallenges(user._id,setFavouriteChallenge)
      getTopChallenges(user._id,setTrendingChallenges)
      clearLocalStorage() 
      setTimeout(() => {
        router.replace('/timeline')
      }, 5000);
     
    }
  }, [user])

 
  useEffect(() => {
    isAuthenticated(setUser)
   },[])



  useFocusEffect(
    useCallback(() => {
      return () => {
        if (player) {
          // player.pause();
        }
        videoRef.current = null;
      };
    }, [])
  );



  return (
   
    <SafeAreaView className= "flex-1 bg-primary ">
      <View className="flex-1 w-[100vw]  h-full bg-primary "
       > 
                      <VideoView 
                        className="opacity-3"
                        ref={videoRef}
                        style={{  width:'100%',height:'100%',opacity:1}}
                        player={player}
                        contentFit="fill"
                        nativeControls ={false}  
                         />
                       <View 
                       className="absolute top-1 w-full text-center flex-col justify-start items-center ">
                        <Text className="text-4xl mt-4 font-bold text-secondary">
                            Challengify
                        </Text> 
                        <Text className="text-2xl mt-4 text-center text-white font-bold px-10 ">
                          Welcome !
                          Step Out of Your Comfort Zone—Your Stage Awaits, and the World is the Judge! {'  '}
                          
                         </Text>
                        <Image
                        className="w-56 mt-16 h-56"
                        resizeMethod='fill'
                        source={icons.challengify} />

                    
                       
                       </View>
                       <View 
                         className="absolute bottom-36 w-[95vw] px-2 py-2 ">
                           <Text className="text-md text-gray-100 mt-7 font-black text-center px-2">
                                In a world full of hidden talents and untapped potential, 
                                Challengify is your arena to shine. Whether you are squaring
                                off with a friend or facing off against someone from the other side of the world,
                                the challenges never stop.
                          </Text>
                       </View>
              
           <View className="absolute bottom-10 w-[80%] left-14" >
              <TouchableOpacity onPress={()=> router.replace('/login')}
                className="bg-blue-400 mt-10 rounded-xl w-[100%] min-h-[55px] justify-center items-center">
                  <Text className="text-primary font-semibold text-lg">Get Started</Text>
              </TouchableOpacity>
           </View>   
      </View>
    

    </SafeAreaView> 

      
 
  )
}

