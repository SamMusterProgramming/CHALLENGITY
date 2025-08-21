import { View, Text, Image, TouchableOpacity, ActivityIndicator, useWindowDimensions, Platform, SafeAreaView } from 'react-native'
import React, {  useEffect, useRef, useState } from 'react'
import {  router } from 'expo-router'
import "../global.css";
import { ImageBackground  } from 'react-native';
import {  SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {icons, images} from '../constants'
import { getFavouriteChallenges, getFollowData, getFollowings, getNotificationByUser, getTopChallenges, getUserFriendsData, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, getUserQueueTalent, getUserTalent, getUserTalentPerformances, isAuthenticated } from '../apiCalls';

import { useGlobalContext } from '../context/GlobalProvider';

import ChallengifyHeader from '../components/custom/ChallengifyHeader';




export default function app() {
  const videoRef = useRef()
  const {user,setUser,userPublicChallenges, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteChallenge,setUserTalents,setUserTalentPerformances
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges
  } = useGlobalContext()
  const [isFetching, setIsFetching] = useState(false);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  


  useEffect(() => {
    if(user) {
      setIsFetching(true)
      getUserTalent(user._id , setUserTalents)
      getUserTalentPerformances(user._id , setUserTalentPerformances)
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



  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       if (player) {
    
  //       }
  //       videoRef.current = null;
  //     };
  //   }, [])
  // );



  return (
   
    <SafeAreaProvider> 
      <ImageBackground
      style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top ,
        paddingBottom:Platform.OS == "ios" ? insets.bottom : insets.bottom
      }} 
      source={images.night_bg}
      className="w-[100%]  h-[100%] justify-center items-center ">
                <View className="w-[100%]  h-[100%] flex-col justify-between items-center b b g-black py- 6 " >   
                   <View className="justify-center items-center w-full h-[7vh] flex-row ">
                                        <Image 
                                  
                                            className="w-[100%] h-[100%]  "
                                            source={icons.headline}
                                            resizeMode = 'cover'
                                        />
                   </View>
                      {/* <ChallengifyHeader />  */}
                    
                      <View
                    className ="g-[#f29756] w-full text-center m -[40px] gap- 2 items-center px- flex-col">
                  
                    
                    <Text style={ {fontSize: 14,fontStyle: 'italic',color: '#5ca9f0', marginTop : 10 ,marginBottom: 8,textAlign:"center"}}>
                        Unleash Talent. Share Challenges. Break Records.
                    </Text>
                    <Text style={{fontSize: 12,color: '#fff',lineHeight: 18,textAlign:"center"}}>
                        Step into the spotlight with <Text >Challengify</Text> — the ultimate stage where everyday legends rise!
                    </Text>

                   </View>
                    <View className=" w-[80%] h-[40%] mt- auto rounded-xl  justify-between items-center p-6 b b g-white">
                            <View className=" w-[90%]  h-[100%] gap-2 flex-row flex-wrap justify-center items-center p-2 bg-black ">
                                  
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-4 bg-[#1166ef] ">
                                          <Image
                                          className=" w-[100%]  h-[100%]"
                                          resizeMethod='fill'
                                          source={icons.challenge} />
                                  </View>    
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-4 bg-[#ae1717] ">
                                          <Image
                                          className=" w-[100%]  h-[100%]"
                                          resizeMethod='cover'
                                          source={icons.home} />
                                          
                                  </View>
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-center p-2 b bg-white ">
                                       
                                          <Image
                                          className=" w-[100%]  h-[100%]"
                                          resizeMethod='cover'
                                          source={icons.trophy} />
                                         
                                        
                                  </View>
                                  <View
                                    className=" w-[47%]  h-[47%] flex-row rounded-xl justify-center items-end p-2 bg-blue-500 ">
                                          <Image
                                          className=" w-[100%]  h-[100%]"
                                          resizeMethod='contain'
                                          source={icons.competition} />
                                         
                                  </View>

                                 
                                   
                            </View>
                            
                            
                            {/* <View
                                 className="p- 4 absolute -rotate-45 rounded-tr-xl top-0 left-0 b bg-[#000000] flex-col  justify-center ">
                                    <Text 
                                        style={{fontSize:width/30,
                                                 color:'white'}}
                                        className="  font-black text-sm text-white">
                                                Challenge                 
                                    </Text>  
                            </View>
                            <View
                                              className="p- absolute -rotate-45 rounded-xl bottom-0 right-0 b bg-[#000000] flex-col  justify-end ">
                                                  <Text 
                                                      style={{fontSize:width/30,
                                                            color:'white'}}
                                                      className="  font-black  text-sm text-white">
                                                          Training                  
                                                </Text>  
                            </View>
                            <View
                                              className="p- 4 absolute rotate-45 rounded-xl bottom-0 left-0 b bg-[#000000] flex-col  justify-end ">
                                                  <Text 
                                                      style={{fontSize:width/30,
                                                            color:'white'}}
                                                      className="  font-black  text-sm text-white">
                                                          Guiness                  
                                                  </Text>  
                            </View>
                            <View
                                            className="p- 4 absolute rounded-tr-xl rotate-45 top-0 right-0 right- 0 b bg-[#000000] flex-col  justify-center ">
                                                <Text 
                                                    style={{fontSize:width/30,
                                                          color:'white'}}
                                                    className="  font-black text-sm text-white">
                                                      Talent                 
                                              </Text>  
                            </View> */}
                           
                            
                      </View>
                     
                      <View className="min-w-[100%] mt- 10  [50] flex- 1 p- 2 flex-col justify-between items-center gap-4 mt- auto " >
                                        <Text style={{
                                           fontSize: 30,
                                           color: '#D2691E',
                                           fontWeight: '800',
                                           }}> 💪🎬🏆</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#fff',
                                            fontWeight: '600',
                                            // marginTop:"auto"
                                           }}> Start your challenge today</Text>
                                      

                                        <TouchableOpacity onPress={()=> router.replace('/login')}
                                          className="bg-white mt- auto rounded-xl min-w-[60%] min-h-[47px] justify-center items-center">
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
                       
              
        
          </ImageBackground>
    

        
      </SafeAreaProvider>

      
 
  )
}

