import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, router } from 'expo-router'
import "../global.css";
import { ImageBackground , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {icons, images} from '../constants'

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getFavouriteChallenges, getFollowData, getFollowings, getNotificationByUser, getTopChallenges, getUserFriendsData, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, isAuthenticated } from '../apiCalls';
import { useVideoPlayer, VideoView } from 'expo-video';
import demo from "../assets/video/demo1.mp4"
import { useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '../context/GlobalProvider';
import { clearLocalStorage } from '../videoFiles';
import { useFonts } from 'expo-font';
import ChallengifyHeader from '../components/custom/ChallengifyHeader';



export default function app() {
  const videoRef = useRef()
  const {user,setUser,userPublicChallenges, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteChallenge
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges
  } = useGlobalContext()

  const [isFetching, setIsFetching] = useState(false);

  const [fontsLoaded] = useFonts({
    myFont: require("../assets/fonts/Archivo/Archivo-VariableFont_wdth.ttf"),
  });

  const player = useVideoPlayer
  ( 
    demo, (player) => {
    player.loop = true;
    player.volume = 0.7
    player.play() ;
  });


  useEffect(() => {
    if(user) {
      setIsFetching(true)
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
      setTimeout(() => {
        setIsFetching(false)
        router.replace('/Home')
      }, 2000);
     
    }
  }, [user])

 
  useEffect(() => {
    isAuthenticated(setUser)
   },[])



  useFocusEffect(
    useCallback(() => {
      return () => {
        if (player) {
    
        }
        videoRef.current = null;
      };
    }, [])
  );



  return (
   
 
    <SafeAreaProvider>
           <ImageBackground className=" flex-1 w-[100vw]  h-full  justify-start items-center"
                      source={images.night_bg} >
            <View className="w-[100%]  h-[100%]  bg-whi rounded-xl border- borde " >          
               
                    <View className=" w-[100%]  h-[100%] justify-center items-center py-2 px-2">
                        <VideoView 
                          className="opacity-3 rounded-lg opacity-60"
                          ref={videoRef}
                          style={{  width:'100%',height:'100%',opacity:0.6}}
                          player={player}
                          contentFit="fill"
                          nativeControls ={false}  
                          />
                        
                        <View 
                           className="absolute top-4 w-[100%] h-[100%] text-center flex-col justify-start py- items-center ">
                            
                            <View 
                                className="h-[50%] text-center flex-col justify-start py-4 items-center ">
                                <Text className="text-4xl  font-bold text-secondary">
                                    Challengify
                                </Text> 
                                <Text className="text-xl mt-4 text-center text-white font-bold px-10 ">
                                  Welcome !
                                  Step Out of Your Comfort Zone—Your Stage Awaits, and the World is the Judge! {'  '}  
                                </Text>
                                <Image
                                  className="w-32 mt-auto ml- h-32"
                                  resizeMethod='fill'
                                  source={icons.challenge} />
                            </View>

                            <View className=" w-[100%]  h-[8%] flex-row justify-center items-center  py-2 px-2">
                            
                            
                            </View>

                            <View 
                             style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                             className="  w-[100%] -[40%] py-6 flex-col mt-auto gap-4 rounded-t-xl justify-center gap-  
                                items-center py-    ">
                                   <ChallengifyHeader /> 
                                

                                <View className="min-w-[100%] -2 flex-row justify-center items-center mt-auto " >
                                        <TouchableOpacity onPress={()=> router.replace('/login')}
                                          className="bg-blue-400 mt-2 rounded-xl w-[95%] min-h-[55px] justify-center items-center">

                                          {isFetching ? (
                                          <View >
                                            <ActivityIndicator size="large" color="#030202" />
                                          </View>
                                          ):(
                                            <Text className="text-[#030202] font-semibold text-md">Get Started</Text>
                                            )}
                                        </TouchableOpacity>
                                </View>   
                  
                            </View>


                        </View>
                    
                    </View>
                    
           
                       


                      


        
                
      

                       
                       
                </View>
                       
              
        
        </ImageBackground>
    

  
    </SafeAreaProvider>

      
 
  )
}

