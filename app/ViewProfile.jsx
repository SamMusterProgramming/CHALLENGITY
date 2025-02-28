import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { getFollowData, getUserById, getUserChallenges, getUserFriendsData, getUserParticipateChallenges } from '../apiCalls'
import Challenge from '../components/Challenge'
import { icons } from '../constants'
import { router, useGlobalSearchParams, useLocalSearchParams} from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { storage } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoChallenge from '../components/NoChallenge'
import ProfileHeader from '../components/ProfileHeader'
import { concatenateAndSortByDate } from '../helper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ViewProfile() {
//   const {user,setUser,userChallenges,setUserChallenges,
//     participateChallenges,setParticipateChallenges} = useGlobalContext()
   const {isViewed ,setIsViewed} = useGlobalContext()
  const [follow , setFollow ] = useState(null)
  const [friends, setFriends ] = useState(null)
  const [viewableItems, setViewableItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [challengeData, setChallengeData] = useState(userChallenges);
  const {user_id} = useLocalSearchParams();
  const [userButton, setUserButton] = useState(true);
  const [partiButton, setPartiButton] = useState(false);
  const [privateButton, setPrivateButoon] = useState(false);
  const navigation = useNavigation();
  const [user,setUser] = useState(null)
  const [userChallenges,setUserChallenges] = useState([])
  const [participateChallenges,setParticipateChallenges] = useState([])


  useEffect ( () => {     
    getUserFriendsData(user_id , setFriends)
  } , [] ) 
  useEffect ( () => {     
    getUserById(user_id, setUser)
  } , [] ) 

  useEffect ( () => {    
    if(user) {
       getUserChallenges(user_id ,setUserChallenges)
       getUserParticipateChallenges(user_id,setParticipateChallenges)
    } 
  } , [user] ) 


   useEffect ( () => {     
    getFollowData(user_id,setFollow)
  } , [] )  
  
  const loadUserChallenges =()=>{
    setChallengeData(userChallenges)
  }

  const loadPrivateChallenges =()=>{
    // getTopChallenges(user._id,setTrendingChallenges)
  }

  const loadParticipations =()=> {
    // getUserParticipateChallenges(user._id , setChallengeData)
    setChallengeData(participateChallenges)
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
        <Text className="text-white font-bold text-xs ">{user.name } has Create the Challenge on {item.createdAt.slice(0,10)}</Text>
      ):
      ( 
      <Text className="text-white font-bold text-xs ">{user.name } has Participated in the Challenge on {item.createdAt.slice(0,10)}</Text>
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
    console.log("i am here")
    setRefreshing(true);
    setTimeout(() => {
      if(userButton) getUserChallenges(user._id,setUserChallenges)
        if(partiButton) getUserParticipateChallenges(user._id,setParticipateChallenges)
    }, 200);
      setRefreshing(false)
}


const logout = async()=> {
      await AsyncStorage.removeItem("jwt_token")
      setUser(null)
      router.replace('/login')
}

const confirmCancel = () => {
  Alert.alert(
    "Confirm Action",
    "Are you sure you want to log out",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: logout }
    ],
    { cancelable: false }
  );
};

  return (
    <SafeAreaView className="bg-primary h-full w-full ">
           <FlatList 
    
    data={concatenateAndSortByDate(userChallenges,participateChallenges ,'createdAt')}
    keyExtractor={(item)=> item._id}
    renderItem={ renderItem }
    onViewableItemsChanged={onViewableItemsChanged}
    viewabilityConfig={{
          itemVisiblePercentThreshold: 70, // Adjust as needed
    }}
    onRefresh={onRefresh}
    refreshing={refreshing}
    extraData={refreshing}
   
    ListHeaderComponent={()=> (
     <>

     {user &&  (
        <ProfileHeader follow={follow} friends={friends} challenger={user} />
    )} 
       
{/* 
          <View className="min-w-[100%] flex-row justify-center  mb-4 gap-2 items-center flex-1 h-[80px] mt-3">
            <TouchableOpacity 
                 onPress={loadUserChallenges}
                 onPressOut={()=> {setUserButton(true), setPartiButton(false)} }
                 className={!userButton ? "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg bg-white":
                   "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg bg-blue-300"
                 }
                >
              <Image
                source={icons.challenge}
                className="w-12 h-12 "
                resizeMode='cover' />
              <Text className="text-xs font-bold  text-blue-600"
                   style={{fontSize:10}}>
                  Your Challenges
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={loadParticipations}
               onPressOut={()=> (setPartiButton(true) , setUserButton(false))}
                 className={!partiButton ? "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg bg-white":
                   "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg bg-blue-300"}>
                <Image
                source={icons.competition}
                className="w-12 h-12 "
                resizeMode='cover' />
              <Text className="text-xs font-bold text-yellow-800 ">
                  Your Participations
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            //  onPress={loadParticipations}
             className="min-w-[32%] h-[100%] flex-col gap-2 justify-center items-center rounded-lg bg-white ">
               <Image
                source={icons.priv}
                className="w-12 h-12 "
                resizeMode='cover' />
              <Text className="text-xs font-bold text-red-500 ">
                  Private Challenges
              </Text>
            </TouchableOpacity>
          </View> */}




          {/* {challengeData.length == 0 && userButton && (
               <NoChallenge />
             ) } */}

    
        
   </>
    
  )}
    />
    </SafeAreaView>
   
  )
}