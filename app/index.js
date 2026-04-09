
import { View, Text, ActivityIndicator, useWindowDimensions, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router } from 'expo-router'
import "../global.css";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../context/GlobalProvider';
import { getAuth } from 'firebase/auth';
import { api, BASE_URL, getFavouriteList, getFollowData, getFollowings, getNotificationByUser, getToken, getTopTalents, getUserFriendsData, getUserTalent } from '../apiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthLoadingScreen from '../components/auth/authLoadingScreen';
// import { configureGoogle } from '../config/google';

;
// import { configureGoogle } from '../services/googleLogin';

export default function App() {
  const videoRef = useRef()
  // const { user , setUser } = useGlobalContext()

  const [isFetching, setIsFetching] = useState(false);
  const {user,setUser , menuPanelBgColor, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteList,setUserTalents,setUserTalentPerformances,topTalents, setTopTalents
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges,isLoggingOut, setIsLoggingOut
    ,userProfileImg,setUserProfileImg , userCoverImg,setUserCoverImg} = useGlobalContext()  

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // useEffect(() => {
  //   if (user) 
  //   setTimeout(() => {
  //     router.replace('/Home')
  //   }, 2000);
  // }, [user])

  useEffect(() => {
    if(user){
      getUserTalent(user._id , setUserTalents)
      // getUserTalentPerformances(user._id , setUserTalentPerformances)
      getNotificationByUser(user._id , setNotifications)
      getFollowings(user._id,setFollowings)
      getUserFriendsData(user._id,setUserFriendData)
      getFollowData(user._id,setFollow)
      getFavouriteList(user._id,setFavouriteList)
      // getTopChallenges(user._id,setTrendingChallenges) 
      getTopTalents(user._id ,setTopTalents)
      setUserProfileImg(user.profileImage?.publicUrl)
      setTimeout(() => {
        setIsFetching(false)
        router.replace('/Home')
      }, 2000);
    }
 }, [user])    

  useEffect(() => {
      //  configureGoogle();
    }, []); 

  useEffect(() => {
    const autoLogin = async () => {
      setIsFetching(true)
      const token = await getToken();
 
      if (!token){ 
        setIsFetching(false)
        router.replace('/Login')  
        return;
      }
      const res = await fetch(`${BASE_URL}/users/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data)
      if(!data.user) {
        setIsFetching(false)
        return  router.replace('/Login')
      }
      setUser(data.user);
    };
  
    autoLogin();
  }, []);

  if (isFetching) {
    return  <AuthLoadingScreen />
  }  

  return (
    <View 
      style={{ 
        paddingTop: insets.top,
        paddingBottom: insets.bottom
      }} 
      className="w-full h-full flex-col justify-center items-center bg-black py-6"
    >   
               
    </View>
  )
}