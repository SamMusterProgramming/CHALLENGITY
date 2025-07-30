import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert, Platform } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { getFollowData, getUserAllChallenges, getUserById, getUserChallenges, getUserFriendsData, getUserParticipateChallenges } from '../apiCalls'
import Challenge from '../components/challenge/Challenge'
import { icons } from '../constants'
import { router, useGlobalSearchParams, useLocalSearchParams} from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { storage } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoChallenge from '../components/challenge/NoChallenge'
import ProfileHeader from '../components/profile/ProfileHeader'
import { concatenateAndSortByDate } from '../helper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ViewProfile() {
  const {
    user , setUserFriendData} = useGlobalContext()
  const insets = useSafeAreaInsets();
  const {isViewed ,setIsViewed} = useGlobalContext()
  const [follow , setFollow ] = useState(null)
  const [friends, setFriends ] = useState(null)
  const [viewableItems, setViewableItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [challengeData, setChallengeData] = useState([]);
  const {user_id} = useLocalSearchParams();
  const [userProfile,setUserProfile] = useState(null)
  const [allChallenges,setAllChallenges] = useState([])



  // useEffect ( () => {     
  //   getUserFriendsData(user_id , setFriends)
  // } , [] ) 

  // useEffect ( () => {     
  //   getUserById(user_id, setUserProfile)
  // } , [] ) 


  // useEffect ( () => {    
  //   if(challenger) {
  //      getUserAllChallenges(user_id ,setAllChallenges)
  //   } 
  // } , [challenger] ) 


   useEffect ( () => {     
    getUserById(user_id, setUserProfile)
    getFollowData(user._id,setFollow)
    getUserFriendsData(user._id,setUserFriendData)
  } , [] )  
  
  // const loadUserChallenges =()=>{
  //   setChallengeData(allChallenges)
  // }

 







  return (
    <View
    style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
     className="bg-primary h-full w-full ">
      {  userProfile &&
      (
      <ProfileHeader  userProfile={userProfile} />
            )}   
    </View>
   
  )
}