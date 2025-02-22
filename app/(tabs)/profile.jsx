import { View, Text, SafeAreaView, ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getFollowData, getUserChallenges, getUserFriendsData, getUserParticipateChallenges } from '../../apiCalls'
import Challenge from '../../components/Challenge'
import { icons } from '../../constants'
import { router} from 'expo-router'
import { useNavigation } from '@react-navigation/native'

export default function profile() {
  const {user,setUser,userChallenges,setUserChallenges,
    participateChallenges,setParticipateChallenges} = useGlobalContext()
  const [follow , setFollow ] = useState(null)
  const [friends, setFriends ] = useState(null)
  const [viewableItems, setViewableItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [challengeData, setChallengeData] = useState(userChallenges);

  const [userButton, setUserButton] = useState(true);
  const [partiButton, setPartiButton] = useState(false);
  const [privateButton, setPrivateButoon] = useState(false);
  const navigation = useNavigation();

  useEffect ( () => {     
    getUserFriendsData(user._id , setFriends)
  } , [] ) 
  // useEffect ( () => {     
  //   getUserChallenges(user._id , setChallengeData)
  // } , [] ) 
  useEffect ( () => {     
  if(userButton)  setChallengeData(userChallenges)
  } , [userChallenges] ) 

  useEffect ( () => {     
   if(partiButton) setChallengeData(participateChallenges)
  } , [participateChallenges] ) 

  // useEffect(() => {
  //     if(userButton) getUserChallenges(user._id,setUserChallenges)
  //     if(partiButton) getUserParticipateChallenges(user._id,setParticipateChallenges)
  // }, [refresh]);

   useEffect ( () => {     
    getFollowData(user._id,setFollow)
  } , [] )  
  
  const loadUserChallenges =()=>{
    // getUserChallenges(user._id , setChallengeData)
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
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
    return  <Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}/>
  };

  const onRefresh = () => {
    console.log("i amhere")
    setRefreshing(true);
    setTimeout(() => {
      if(userButton) getUserChallenges(user._id,setUserChallenges)
        if(partiButton) getUserParticipateChallenges(user._id,setParticipateChallenges)
    }, 200);
      setRefreshing(false)
}
const logout = ()=> {
  navigation.reset({
    index: 0,
    routes: [{ name: '(auth)/login' }], // Replace 'AuthStack' with your authentication stack's name
  });
   
    setTimeout(() => {
      setUser(null)
      router.push('login')
    }, 500);
  
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
    
    data={challengeData}
    keyExtractor={(item)=> item._id}
    renderItem={renderItem}   
    onViewableItemsChanged={onViewableItemsChanged}
    viewabilityConfig={{
          itemVisiblePercentThreshold: 70, // Adjust as needed
    }}
    onRefresh={onRefresh}
    refreshing={refreshing}
    extraData={refreshing}
   
    ListHeaderComponent={()=> (
     <>
        <View className="bg- w-[100vw] flex-col justify-start items-center "> 
           <View className="bg- w-[100vw] flex-col justify-start items-center h-[150]">
                 <Image 
                 minWidth='100%'
                 height={150}
                 resizeMode='stretch'
                 source={{uri:user.cover_img}} 
                 />
           </View> 
           <View className="bg- w-[85] absolute mt-32 bg-blue-400 flex-col rounded-full justify-center items-center h-[85]">
                 <Image 
                 minWidth={83}
                 height={83}
                 borderRadius={50}
                 resizeMode='cover'
                 source={{uri:user.profile_img}} 
                 />
           </View>

           <TouchableOpacity 
           onPress={confirmCancel}
              className="  absolute top-0 right-0  flex-col rounded-sm justify-center items-center ">
                 <Image 
                  className="w-14 h-8"
                 resizeMode='contain'
                 source={icons.logout} 
                 />
                   <Text
                  className="text-white font-bold  text-xs">
                  Logout
                </Text>
           </TouchableOpacity>

           <View className=" w-[100vw] flex-col mt-[50] justify-start items-center h-[100]">
                <Text
                  className="text-white font-bold py-3 text-xl">
                  {user.name}
                </Text>
              
                <View className="flex-row w-full gap-3 justify-center items-center"
                >
                     <View
                      className="flex-col justify-center gap-2 items-center"
                     >
                       <Text
                        className="text-blue-300 font-bold text-xs">
                           Followers
                       </Text>
                       <Text
                        className="text-white font-bold  text-xs">
                           {follow && follow.followers_count}
                       </Text>
                     </View>
                     <View
                      className="flex-col justify-center gap-2 items-center"
                     >
                       <Text
                        className="text-white font-bold text-xs">
                           Followings
                       </Text>
                       <Text
                        className="text-white font-bold  text-xs">
                           {follow && follow.followings_count}
                       </Text>
                     </View>
                     <View
                      className="flex-col justify-center gap-2 items-center"
                     >
                       <Text
                        className="text-red-400 font-bold text-xs">
                           Friends
                       </Text>
                       <Text
                        className="text-white font-bold  text-xs">
                           {friends && friends.friends_count}
                       </Text>
                     </View>
                </View>
           </View>
          </View>

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
               onPressOut={()=> (setPartiButton(!partiButton) , setUserButton(false))}
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
          </View>
  
   </>
    )}
    />
       
    </SafeAreaView>
   
  )
}