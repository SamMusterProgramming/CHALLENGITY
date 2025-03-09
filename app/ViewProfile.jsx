import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert } from 'react-native'
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
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ViewProfile() {
  const {
    } = useGlobalContext()
  const {isViewed ,setIsViewed} = useGlobalContext()
  const [follow , setFollow ] = useState(null)
  const [friends, setFriends ] = useState(null)
  const [viewableItems, setViewableItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [challengeData, setChallengeData] = useState([]);
  const {user_id} = useLocalSearchParams();
  const [challenger,setChallenger] = useState(null)
  const [allChallenges,setAllChallenges] = useState([])



  useEffect ( () => {     
    getUserFriendsData(user_id , setFriends)
  } , [] ) 

  useEffect ( () => {     
    getUserById(user_id, setChallenger)
  } , [] ) 


  useEffect ( () => {    
    if(challenger) {
       getUserAllChallenges(user_id ,setAllChallenges)
    } 
  } , [challenger] ) 


   useEffect ( () => {     
    getFollowData(user_id,setFollow)
  } , [] )  
  
  const loadUserChallenges =()=>{
    setChallengeData(allChallenges)
  }

 


  const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
  };

  const renderItem = ({ item, index }) => {  
    // if(challengeData.length == 0 && userButton) return  <NoChallenge />
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);

    return  ( 
    <>
    <View
     className="w-full h-[30px] bg-primary flex-row items-center justify-start border-2 border-black-400">
      {user_id === item.origin_id? 
      (
        <Text className="text-white font-bold text-xs ">{challenger.name } has Create the Challenge on {item.createdAt.slice(0,10)}</Text>
      ):
      ( 
      <Text className="text-white font-bold text-xs ">{challenger.name } has Participated in the Challenge on {item.createdAt.slice(0,10)}</Text>
      )}    
    </View>
    <Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}/>
    </>
    )
  };
  const renderEmptyItem = () => {  
     return  <NoChallenge />
  };


  const onRefresh = () => {
    // setRefreshing(true);
    // setTimeout(() => {
    //     if(userButton) getUserChallenges(user._id,setUserChallenges)
    //     if(partiButton) getUserParticipateChallenges(user._id,setParticipateChallenges)
    // }, 200);
    //   setRefreshing(false)
}


 const renderHeader = useMemo(()=>(
     challenger && follow && friends &&
     (
      <ProfileHeader follow={follow} friends={friends} challenger={challenger} />
    )
 ),[follow,friends,challenger] )

  return (
    <SafeAreaView className="bg-primary h-full w-full ">
           <FlatList 
    
    data={challenger && allChallenges}
    keyExtractor={(item)=> item._id}
    renderItem={ renderItem }
    onViewableItemsChanged={onViewableItemsChanged}
    viewabilityConfig={{
          itemVisiblePercentThreshold: 70, // Adjust as needed
    }}
    // onRefresh={onRefresh}
    // refreshing={refreshing}
    // extraData={refreshing}
   
    ListHeaderComponent={renderHeader}
    />
    </SafeAreaView>
   
  )
}