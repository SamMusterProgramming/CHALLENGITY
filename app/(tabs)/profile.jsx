import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getFollowData, getUserChallenges, getUserFriendsData, getUserParticipateChallenges } from '../../apiCalls'
import Challenge from '../../components/Challenge'
import { icons } from '../../constants'
import { router} from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { storage } from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoChallenge from '../../components/NoChallenge'
import { SafeAreaView } from 'react-native-safe-area-context'
import FriendDisplayer from '../../components/FriendDisplayer'

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
  const [privateButton, setPrivateButton] = useState(false);
  const [friendList, setFriendList] = useState([]);

  const [isFriendClicked ,setIsFriendClicked] = useState(false)
  const [isFollowerClicked ,setIsFollowerClicked] = useState(false)
  const [isFollowingClicked ,setIsFollowingClicked] = useState(false)


 
  const navigation = useNavigation();

  useEffect ( () => {     
    getUserFriendsData(user._id , setFriends)
  } , [] ) 


  useEffect ( () => {     
    if(friends) {
      const data = []
      friends.friends.map((friend)=> {
        const friendObj = {
          id : friend.sender_id,
          name : friend.name,
          profile_img :friend.profile_img
        }
        data.push(friendObj)
      }) 
      setFriendList(data)
    }
  } , [friends] ) 


  useEffect ( () => {     
  if(userButton) 
      setChallengeData(userChallenges)
  } , [userChallenges] ) 

  useEffect ( () => {     
   if(partiButton) 
    setChallengeData(participateChallenges)
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
    if(challengeData.length == 0 && userButton) return  <NoChallenge />
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
    return  <Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}/>
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
        getUserFriendsData(user._id , setFriends)
        getFollowData(user._id,setFollow)
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


  const loadFollowings = ()=> {
    const data = []
    follow.followings.map((following)=> {
      const friendObj = {
        id : following.following_id,
        name : following.following_name,
        profile_img :following.following_profileimg
      }
      data.push(friendObj)
    }) 
    setFriendList(data)
  }

  const loadFollowers = ()=> {
    const data = []
    follow.followers.map((follower)=> {
      const friendObj = {
        id : follower.follower_id,
        name : follower.follower_name,
        profile_img :follower.follower_profileimg
      }
      data.push(friendObj)
    }) 
    setFriendList(data)
   }

   const loadFriends = ()=> {
    const data = []
    friends.friends.map((friend)=> {
      const friendObj = {
        id : friend.sender_id,
        name : friend.name,
        profile_img :friend.profile_img
      }
      data.push(friendObj)
    }) 
    setFriendList(data)
   }

  return (
    <SafeAreaView className="bg-primary h-full w-full ">
           <FlatList 
    
    data={challengeData }
    keyExtractor={(item)=> item._id}
    renderItem={renderItem }
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
              className="  absolute top-2 right-0  flex-col rounded-sm justify-center items-center ">
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
              
                <View className="flex-row w-full h-12 gap-3 justify-center items-center"
                >
                       
                      <TouchableOpacity
                       onPress={loadFriends}
                      onPressOut={()=> {
                         setIsFriendClicked(true),
                         setIsFollowingClicked(false),
                         setIsFollowerClicked(false)
                      }}
                      className={isFriendClicked?
                        "flex-col h-[100%] w-[20%] rounded-lg justify-center bg-gray-800 gap-2 items-center"
                        :"flex-col h-[100%] w-[20%]  justify-center  gap-2 items-center"}
                     >
                       <Text
                        className="text-red-400 font-bold text-sm">
                           Friends
                       </Text>
                       <Text
                        className="text-white font-bold  text-xs">
                           {friends && friends.friends_count}
                       </Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                      onPress={loadFollowers}
                     onPressOut={()=> {
                      setIsFollowerClicked(true),
                      setIsFriendClicked(false),
                      setIsFollowingClicked(false)    
                   }}
                     className={isFollowerClicked?
                      "flex-col h-[100%] w-[20%] rounded-lg justify-center bg-gray-800 gap-2 items-center"
                      :"flex-col h-[100%] w-[20%]  justify-center  gap-2 items-center"}
                         >
                       <Text
                       
                        className="text-blue-300 font-bold text-xs">
                           Followers
                       </Text>
                       <Text
                        className="text-white font-bold  text-sm">
                           {follow && follow.followers_count}
                       </Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                     onPress={loadFollowings}
                     onPressOut={()=> {
                      setIsFollowerClicked(false),
                      setIsFriendClicked(false),
                      setIsFollowingClicked(true)    
                       }}
                       className={isFollowingClicked?
                        "flex-col h-[100%] w-[20%] rounded-lg justify-center bg-gray-800 gap-2 items-center"
                        :"flex-col h-[100%] w-[20%]  justify-center  gap-2 items-center"}
                     >
                       <Text
                        className="text-blue-500 font-bold text-xs">
                           Followings
                       </Text>
                       <Text
                        className="text-white font-bold  text-sm">
                           {follow && follow.followings_count}
                       </Text>
                     </TouchableOpacity>

                   

                </View>
           </View>
          </View>
          
          <View className="bg-white min-w-full min-h-1"></View>
          <View className="w-[100vw] h-[80px] bg-gray-800">
              <FriendDisplayer friendList={friendList}  />
          </View>
          
          <View className="bg-white min-w-full min-h-1"></View>

          <View className="min-w-[100%] flex-row justify-center mb-4 gap-2 items-center flex-1 h-[60px] mt-5">
            <TouchableOpacity 
                 onPress={loadUserChallenges}
                 onPressOut={()=> {setUserButton(true), setPartiButton(false),setPrivateButton(false)} }
                 className={!userButton ? "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg ":
                   "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center  rounded-lg  bg-gray-800"
                 }
                >
              <Image
                source={icons.challenge}
                className="w-8 h-8 "
                resizeMode='cover' />
              <Text className={userButton? "text-xs font-bold text-green-500":"text-xs font-bold text-white"}
                   style={{fontSize:10}}>
                  Your Challenges
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={loadParticipations}
               onPressOut={()=> (setPartiButton(true) , setUserButton(false),setPrivateButton(false))}
                 className={!partiButton ? "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg color-white ":
                   "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg bg-gray-800"}>
                <Image
                source={icons.competition}
                className="w-8 h-8 "
                resizeMode='cover' />
              <Text className={partiButton? "text-xs font-bold text-green-500":"text-xs font-bold text-white"}>
                  Your Participations
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={loadPrivateChallenges}
              onPressOut={()=> (setPrivateButton(true) , setUserButton(false),setPartiButton(false))}
              className={!privateButton ? "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg color-white ":
               "min-w-[32%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg bg-gray-800"}>
               <Image
                source={icons.priv}
                className="w-8 h-8 "
                resizeMode='cover' />
              <Text className={privateButton? "text-xs font-bold text-green-500":"text-xs font-bold text-white"}>
                  Private Challenges
              </Text>
            </TouchableOpacity>
          </View>
         

          {challengeData.length == 0 && userButton && (
               <NoChallenge />
             ) }

    
        
   </>
    
  )}
    />
    </SafeAreaView>
   
  )
}