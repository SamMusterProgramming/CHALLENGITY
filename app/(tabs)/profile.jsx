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
import SelectButton from '../../components/custom/SelectButton'
import UserSelectButton from '../../components/custom/UserSelectButton'

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
  const [title , setTitle] = useState("New Challenge")

  const {publ,priv,participate,invited ,strict} =  useLocalSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const flatListRef= useRef()

  const [selectedPrivacy,setSelectedPrivacy] = useState("Public")



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
    console.log(invited + participate + publ + priv + strict)
    if(invited =="true" || participate =="true" || publ =="true"|| priv =="true" || strict =="true") {
     console.log("here to confirm dsfdsfsdfsdfsdf")
     invited =="true" && setSelectedPrivacy("Invited")
     publ =="true" && setSelectedPrivacy("Public")
     priv =="true" && setSelectedPrivacy("Private")
     participate =="true" && setSelectedPrivacy("Participate")
     strict =="true" && setSelectedPrivacy("Strict")
     setIsLoaded(true)
    }
 
  } , [] ) 

  
  const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
   
  };


  const renderItem = ({ item, index }) => {  
    if(challengeData.length == 0 && userButton) return  <NoChallenge />
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
    return  <Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}/>
  };


   
  //****************************** you challenges ******************** */

  const handlePublic = ()=> {
    setChallengeData(userPublicChallenges)
 }
 
 const handlePrivate = ()=> {
   setChallengeData(userPrivateChallenges)
 }
 const handleParticipate = ()=> {
  setChallengeData(publicParticipateChallenges)
}
const handleInvited = ()=> {
  const challenge = privateParticipateChallenges.filter(challenge => challenge.audience !== "Strict")
  setChallengeData(challenge)
}

const handleStrict = ()=> {
  const challenge = privateParticipateChallenges.filter(challenge => challenge.audience === "Strict")
  setChallengeData(challenge)
}

 const handleFriend = ()=> {
   const friends = userFriendData.friends;
   let challenges = []
   challenges = trendingChallenges.filter(challenge => 
                  (friends.find(friend => (friend.sender_id == challenge.origin_id)&& challenge.privacy == "Public")
                  || (friends.find(friend => (friend.sender_id == challenge.origin_id))&& challenge.privacy == "Private"  
                     && !challenge.audience == "Strict" && !challenge.invited_friend(friend => friend.sender_id == user._id))
                   // ||      challenge.participants.find(participant=>participant.user_id == friend.sender_id)

                 ))
                 setChallengeData(challenges)
                //  setSelectedPrivacy("Friend")
 }
   

 useEffect(() => {
   switch (selectedPrivacy) {
     case "Public":
        handlePublic();
       break;
    case "Private":
        handlePrivate()
        break;
    case "Participate":
        handleParticipate()
        break;
    case "Invited":
        handleInvited()
        break;
    case "Strict":
        handleStrict()
        break;
     default:
       break;
   }
 }, [selectedPrivacy])


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

  

          <View className="min-w-[100vw] h-[50px] flex-row justify-center items-center text-center">
              <Text style={{fontSize:14}}
                    className="font-black text-white text-xs">
                     Your challenges
              </Text>
          </View>

          <View className = "w-full h-[120px] mt-0 flex-row justify-start items-center  ">
              {/* <UserSelectButton color="white" bgColor={selectedPrivacy == "All"?"#241413":"black"} setSelectedPrivacy={setSelectedPrivacy} title ="All" action={handlePublic}/> */}
              
           <View className = "w-[50%] h-[100px]  flex-col justify-between items-center ">
              <TouchableOpacity
                  onPress={()=> selectedPrivacy !== "Public" && setSelectedPrivacy("Public")}
                  className ="rounded-lg w-[70%] h-[35%] flex-col justify-center items-center "
                  style= {{backgroundColor:selectedPrivacy == "Puublic"?"#0345fc":"#2e2b22"}}>
                  <Text 
                   style={{fontSize:9}}
                   className="font-black text-white ">
                      All Challenges
                  </Text>
              </TouchableOpacity >   
              <View className = "w-[100%] h-[50%] px-2 flex-row justify-between items-center ">
                    <TouchableOpacity
                        onPress={()=> selectedPrivacy !== "Public" && setSelectedPrivacy("Public")}
                        className ="rounded-lg w-[46%] h-[70%] flex-col justify-center items-center "
                        style= {{backgroundColor:selectedPrivacy == "Public"?"#0345fc":"#2e2b22"}}>
                        <Text 
                        style={{fontSize:9}}
                        className="font-black text-white text-xs">
                            Public
                        </Text>
                    </TouchableOpacity >   
                    <TouchableOpacity
                        onPress={()=>selectedPrivacy !== "Private" && setSelectedPrivacy("Private")}
                        className ="rounded-lg w-[46%] h-[70%] flex-col justify-center items-center "
                        style= {{backgroundColor:selectedPrivacy == "Private"?"#0345fc":"#2e2b22"}}>
                        <Text 
                        style={{fontSize:9}}
                        className="font-black text-white text-xs">
                            Private
                        </Text>
                    </TouchableOpacity >   
              </View>
  
           </View>


           <View className = "w-[50%] h-[100px]  flex-col justify-between items-center ">
              <TouchableOpacity
                  onPress={()=> selectedPrivacy !== "Participate" && setSelectedPrivacy("Participate")}
                  className ="rounded-lg w-[70%] h-[35%]  flex-col justify-center items-center "
                  style= {{backgroundColor:selectedPrivacy == "Participate"?"#0345fc":"#2e2b22"}}>
                  <Text 
                  style={{fontSize:9}}
                  className="font-black text-white text-xs">
                      Participations
                  </Text>
              </TouchableOpacity >   
              <View className = "w-[100%] h-[50%] px-2  flex-row justify-between items-center ">
                  <TouchableOpacity
                      onPress={()=>selectedPrivacy !== "Invited" && setSelectedPrivacy("Invited")}
                      className ="rounded-lg w-[46%] h-[70%] flex-col justify-center items-center "
                      style= {{backgroundColor:selectedPrivacy == "Invited"?"#0345fc":"#2e2b22"}}>
                      <Text 
                      style={{fontSize:9}}
                      className="font-black text-white text-xs">
                          Invited
                      </Text>
                  </TouchableOpacity >   
                  <TouchableOpacity
                      onPress={()=>selectedPrivacy !== "Strict" && setSelectedPrivacy("Strict")}
                      className ="rounded-lg w-[46%] h-[70%] flex-col justify-center items-center "
                      style= {{backgroundColor:selectedPrivacy == "Strict"?"#0345fc":"#2e2b22"}}>
                      <Text 
                      style={{fontSize:9}}
                      className="font-black text-white text-xs">
                          Strict
                      </Text>
                  </TouchableOpacity >   
              </View>
  
           </View>
             
          </View>





          {/* {challengeData.length == 0 && (userButton || partiButton) && (
               <NoChallenge title={title} />
             ) } */}
     </>
  ),[userFriendData,follow,followings,isFollowerClicked,isFriendClicked,isFollowingClicked,friendList,
    userButton,partiButton,privateSelect,publicSelect,loadFollowers,loadFriends,
    selectedPrivacy]);


  const onRefresh = useCallback(() =>  {
    console.log("refreshing")
    setRefreshing(true);
    getUserFriendsData(user._id , setUserFriendData)
    selectedPrivacy == "Public" && getUserPublicChallenges(user._id,setUserPublicChallenges)
    selectedPrivacy == "Privare" && getUserPrivateChallenges(user._id,setUserPrivateChallenges)
    (selectedPrivacy == "Participate" ) && getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
    (selectedPrivacy == "Invited" || selectedPrivacy == "Strict" )  && getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
    setIsLoaded(true)
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