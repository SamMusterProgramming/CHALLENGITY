import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getFollowData, getUserFriendsData, getUserParticipateChallenges, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges } from '../../apiCalls'
import Challenge from '../../components/challenge/Challenge'
import { icons } from '../../constants'
import { router, useLocalSearchParams} from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { storage } from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoChallenge from '../../components/challenge/NoChallenge'
// import { SafeAreaView } from 'react-native-safe-area-context'
import FriendDisplayer from '../../components/profile/FriendDisplayer'
import CustomAlert from '../../components/custom/CustomAlert'

export default function profile() {
  const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow , setFollow,
    publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
    setUserFriendData,userPrivateChallenges,setUserPrivateChallenges } = useGlobalContext()
  // const [follow , setFollow ] = useState(null)
  // const [friends, setFriends ] = useState(null)
  const [viewableItems, setViewableItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [challengeData, setChallengeData] = useState(userPublicChallenges);
  const [userButton, setUserButton] = useState(true);
  const [partiButton, setPartiButton] = useState(false);
  const [privateSelect, setPrivateSelect] = useState(false);
  const [publicSelect, setPublicSelect] = useState(true);

  const [friendList, setFriendList] = useState([]);

  const [isFriendClicked ,setIsFriendClicked] = useState(false)
  const [isFollowerClicked ,setIsFollowerClicked] = useState(false)
  const [isFollowingClicked ,setIsFollowingClicked] = useState(false)

  const {publ,priv,yourChallenges,yourParticipations} =  useLocalSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const flatListRef= useRef()


  const navigation = useNavigation();

  useEffect ( () => {     
    getUserFriendsData(user._id , setUserFriendData)
  } , []) 


  useEffect ( () => {     
  
      const data = []
      userFriendData.friends.map((friend)=> {
        const friendObj = {
          id : friend.sender_id,
          name : friend.name,
          profile_img :friend.profile_img
        }
        data.push(friendObj)
      }) 
      setFriendList(data)
   
  } , [] ) 


  useEffect ( () => {    
    if(yourChallenges =="true" || yourParticipations=="true" || publ =="true"|| priv=="true") {
      console.log("iam in")
     setUserButton(yourChallenges === "true")
     setPartiButton(yourParticipations === "true")
     setPublicSelect(publ=== "true")
     setPrivateSelect(priv === "true")
     setIsLoaded(true)
    //  setTimeout(() => {
    //      onRefresh()
    //  }, 500);
    }
 
  } , [] ) 

  
  // useEffect ( () => {    
    
  //   if(!isLoaded) { onRefresh()}
 
  // } , [isLoaded] ) 
  

  const loadUserPublicChallenges =()=>{
    // setUserButton(true); setPartiButton(false);
    setChallengeData(userPublicChallenges)
    setIsLoaded(true)
  }

  const loadUserPrivateChallenges =()=>{
    // setUserButton(true); setPartiButton(false);
    setChallengeData(userPrivateChallenges)
    setIsLoaded(true)
  }



  const loadPublicParticipations =()=> {
    // getUserParticipateChallenges(user._id , setChallengeData)
    // setPartiButton(true) ; setUserButton(false);
    setChallengeData(publicParticipateChallenges)
    setIsLoaded(true)

  }

  const loadPrivateParticipations =()=> {
    // getUserParticipateChallenges(user._id , setChallengeData)
    // setPartiButton(true) ; setUserButton(false);
    setChallengeData(privateParticipateChallenges)
    setIsLoaded(true)

  }

  const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
   
  };
  const renderItem = ({ item, index }) => {  
    if(challengeData.length == 0 && userButton) return  <NoChallenge />
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
    return  <Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}/>
  };

  const renderHeader = useMemo(() => ( 
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
           onPress={
            async()=> {
              await AsyncStorage.removeItem("jwt_token")
              router.replace('/login')
              setUser(null)
              setTrendingChallenges([])
              setUserChallenges([])
              setPublicParticipateChallenges(null)
              setIsViewed(true)
              setNotifications([])
              setFollowings([])
              setUserFriendData(null)
              setFollow(null)
              setTimeout(() => {
                router.replace('/login')
              }, 10000);
            
            
        }
            // confirmCancel
          }
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

           <TouchableOpacity
              onPress={()=>{router.push('favouriteChallenges')}}
               className="  absolute top-44 left-6 h-16 flex-col rounded-sm justify-center items-center ">
                  <Image 
                  className="w-14 h-8"
                 resizeMode='contain'
                 source={icons.favourite} 
                 />
                   <Text
                  className="text-white font-bold  text-xs">
                     Favourites
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
                        onPress={
                          ()=> {
                          const data = []
                          userFriendData.friends.map((friend)=> {
                            const friendObj = {
                              id : friend.sender_id,
                              name : friend.name,
                              profile_img : friend.profile_img
                            }
                            data.push(friendObj)
                          }) 
                          setFriendList(data)
                         }
                        // loadFriends
                      }
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
                           {userFriendData && userFriendData.friends_count}
                       </Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                      onPress={
                        () =>  {
   
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
                        // loadFollowers
                      }
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
                     onPress={ ()=> {
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
                      
                    }
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

          <View className="min-w-[100vw] h-[80px] bg-gray-800">
              <FriendDisplayer friendList={friendList}  />
          </View>
          
          <View className="bg-white min-w-full min-h-1"></View>


        {/* {! isLoaded =="sam" && (<> */}
          <View className="min-w-[100%] flex-row justify-evenly mb-1 gap-2 items-center flex-1 h-[60px] mt-5">
            <TouchableOpacity 
                 onPress={publicSelect?loadUserPublicChallenges:loadUserPrivateChallenges}
                 onPressOut={()=> {setUserButton(true), setPartiButton(false)} }
                 className={!userButton ? "min-w-[45%] h-[100%] gap-2 flex-col justify-center items-center  bg-gray-800 rounded-lg ":
                   "min-w-[45%] h-[100%] gap-2 flex-col justify-center items-center  rounded-lg  bg-gray-700"
                 }
                >
              <Image
                source={icons.challenge}
                className="w-8 h-8 "
                resizeMode='cover' />
              <Text className={userButton? "text-xs font-black text-blue-400":"text-xs font-bold text-white"}
                   style={{fontSize:12}}>
                  Your Challenges
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
               onPress={publicSelect?loadPublicParticipations:loadPrivateParticipations}
               onPressOut={()=> (setPartiButton(true) , setUserButton(false))}
                 className={!partiButton ? "min-w-[45%] h-[100%] gap-2 flex-col justify-center  bg-gray-800 items-center rounded-lg color-white ":
                   "min-w-[45%] h-[100%] gap-2 flex-col justify-center items-center rounded-lg bg-gray-700"}>
                <Image
                source={icons.competition}
                className="w-8 h-8 "
                resizeMode='cover' />
              <Text className={partiButton? "text-xs font-black text-blue-400":"text-xs font-bold text-white"}
                   style={{fontSize:12}}>
                  Your Participations
              </Text>
            </TouchableOpacity>
          </View>

          <View className={userButton? "w-[50vw] flex-row justify-center  mb-2 items-center gap-6 h-[60px] mt-3":
          "w-[50vw] flex-row justify-center ml-auto mb-2 items-center gap-6 h-[60px] mt-3"}>
              <View className=" flex-col justify-center  gap-2 items-center h-[60px] ">     
                  <TouchableOpacity 
                    onPress={userButton? loadUserPublicChallenges:loadPublicParticipations}
                    onPressOut={()=> (setPrivateSelect(false) , setPublicSelect(true) )}
                    className={publicSelect ? 
                      "w-[60px] h-[60px] gap-1 flex-col justify-center items-center rounded-full bg-yellow-400 color-white ":
                     "w-[60px] h-[60px] gap-1 flex-col justify-center items-center rounded-full bg-gray-400"}>
                    <Image
                      source={icons.publi}
                      className="w-7 h-7 "
                      resizeMode='cover' />
                    <Text className={publicSelect? "text-xs font-black text-black-200":"text-xs font-bold text-black-200"}>
                        Public
                    </Text>
                  </TouchableOpacity>
                 {publicSelect && (<View className="w-[60px] min-h-1 bg-white"></View>)} 
              </View>

              <View className=" flex-col justify-start  gap-2 items-center h-[60px] ">
                  <TouchableOpacity 
                    onPress={userButton?loadUserPrivateChallenges:loadPrivateParticipations}
                    onPressOut={()=> (setPrivateSelect(true) , setPublicSelect(false))}
                    className={privateSelect ? 
                      "w-[60px] h-[60px] gap-2 flex-col justify-center items-center rounded-full bg-yellow-400 color-white ":
                      "w-[60px] h-[60px] gap-2 flex-col justify-center items-center rounded-full bg-gray-400"}>
                    <Image
                      source={icons.priv}
                      className="w-6 h-6"
                      resizeMode='cover'/>
                    <Text className={privateSelect? "text-xs font-black text-black-200":"text-xs font-bold text-black-200"}>
                        Private 
                    </Text>
                  </TouchableOpacity>
                  {privateSelect && (<View className="w-[60px] min-h-1 bg-white"></View>)} 

              </View>
          </View>
        {/* </> )} */}



          {challengeData.length == 0 && userButton && (
               <NoChallenge />
             ) }
     </>
  ),[userFriendData,follow,followings,isFollowerClicked,isFriendClicked,isFollowingClicked,friendList,
    userButton,partiButton,privateSelect,publicSelect,loadFollowers,loadFriends]);


  const onRefresh = useCallback(() =>  {
    console.log("refreshing")
    setRefreshing(true);
    // if(userButton) publicSelect?setChallengeData([...userPublicChallenges]):
    //                             setChallengeData([...userPrivateChallenges])
    // if(partiButton) publicSelect? setChallengeData([...userPublicChallenges]):
    //                              setChallengeData([...userPublicChallenges])
    // setChallengeData(userPublicChallenges)
    getUserFriendsData(user._id , setUserFriendData)
    getFollowData(user._id,setFollow)
    setTimeout(() => {
        setRefreshing(false)
    }, 300);
     
}, []);

useEffect(() => {
 isLoaded && setChallengeData(userPublicChallenges)
}, [userPublicChallenges])

useEffect(() => {
  isLoaded &&  setChallengeData(userPrivateChallenges)
}, [userPrivateChallenges])

useEffect(() => {
  isLoaded &&  setChallengeData(publicParticipateChallenges)
}, [publicParticipateChallenges])

useEffect(() => {
  isLoaded &&  setChallengeData(privateParticipateChallenges)
}, [privateParticipateChallenges])


const logout = async()=> {
      await AsyncStorage.removeItem("jwt_token")
      router.replace('/login')
      setUser(null)
      setTrendingChallenges([])
      setUserChallenges([])
      setParticipateChallenges(null)
      setIsViewed(true)
      setNotifications([])
      setFollowings([])
      setUserFriendData(null)
      setFollow(null)
      setTimeout(() => {
        router.replace('/login')
      }, 10000);
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

  const loadFollowers = () =>  {
    console.log("follower")
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
   };

   const loadFriends = ()=> {
    const data = []
    userFriendData.friends.map((friend)=> {
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
    <SafeAreaView className="bg-primary min-h-full min-w-full ">
      <FlatList 
      ref={flatListRef}
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
    
      ListHeaderComponent={ renderHeader }
    />
  
    </SafeAreaView>
   
  )
}