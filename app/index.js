import { View, Text, Image, TouchableOpacity, ActivityIndicator, useWindowDimensions, Platform, SafeAreaView } from 'react-native'
import React, {  useEffect, useRef, useState } from 'react'
import { router } from 'expo-router'
import "../global.css";

import {  SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import {  isAuthenticated } from '../apiCalls';

import { useGlobalContext } from '../context/GlobalProvider';






export default function app() {
  const videoRef = useRef()
  const {user,setUser,userPublicChallenges, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteChallenge,setUserTalents,setUserTalentPerformances
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges
  } = useGlobalContext()
  const [isFetching, setIsFetching] = useState(false);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  


  useEffect(() => {
 
        setTimeout(() => {
        router.replace('Home')
      }, 1000);
 
  }, [user])

 
  // useEffect(() => {
  //   isAuthenticated(setUser)
  //  },[])



  return (
   
    <SafeAreaProvider> 
      {/* <ImageBackground
      style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top ,
        paddingBottom:Platform.OS == "ios" ? insets.bottom : insets.bottom
      }} 
      source={images.night_bg}
      className="w-[100%]  h-[100%] justify-center items-center "> */}
                <View 
                style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top ,
                  paddingBottom:Platform.OS == "ios" ? insets.bottom : insets.bottom
                }} 
                className="w-[100%]  h-[100%] flex-col justify-center items-center b b g-black py- 6 " >   
                 
                     
                      <View className="min-w-[100%] h-[50%] flex- 1 p- 2 flex-col justify-center items-center gap-4 mt- auto " >
                                        <Text style={{
                                           fontSize: 30,
                                           color: '#D2691E',
                                           fontWeight: '800',
                                           }}> 💪     🎬     🏆</Text>
                                        <Text 
                                            style={{fontSize:16}}
                                            className=" text-center text-white  font-black text-md ">
                                                 Push your limits with
                                        </Text> 
                                        <Text
                                         className=" text-center text-blue-400 mt-8 mb-8 font-black tex t-3xl "
                                         style={{
                                            fontSize: 44,
                                            fontWeight: '600',
                                            // marginTop:"auto"
                                           }}> Challengify</Text>
                                      

                                      {isFetching && (
                                          <View >
                                            <ActivityIndicator size="large" color="white" />
                                          </View>
                                      )}
                      </View>   
    
                           
                </View>
                       
              
        
          {/* </ImageBackground> */}
    

        
      </SafeAreaProvider>

      
 
  )
}

