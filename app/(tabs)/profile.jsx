import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert, useWindowDimensions, ActivityIndicator} from 'react-native'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { clearLocalStorage } from '../../videoFiles'
import InfosProfile from '../../components/profile/InfosProfile'


export default function profile() {
  const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,
    publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
    setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
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

  const [isFriendClicked ,setIsFriendClicked] = useState(true)
  const [isFollowerClicked ,setIsFollowerClicked] = useState(false)
  const [isFollowingClicked ,setIsFollowingClicked] = useState(false)
  const [title , setTitle] = useState("New Challenge")

  const {publ,priv,participate,invited ,strict} =  useLocalSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const flatListRef= useRef()
  const [selectedPrivacy,setSelectedPrivacy] = useState("Public")

   const [index,setIndex] = useState(2)
   const [displayData,setDisplayData] = useState([])

  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  

  useEffect ( () => {     
    getUserFriendsData(user._id , setUserFriendData)
  } , []) 

 
  useEffect(()=>{
    return () => {
      setChallengeData([])
      setDisplayData([])
      setViewableItems([])
      setSelectedPrivacy("Public")
    };
   },[])

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
    if(invited =="true" || participate =="true" || publ =="true"|| priv =="true" || strict =="true") {
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
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
    return  <Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}  h={740} w={width}/>
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



 const onRefresh = 
 useCallback(
   () =>  {
   setRefreshing(true);
   getUserFriendsData(user._id , setUserFriendData)
   setDisplayData([])
   selectedPrivacy === "Public" &&   getUserPublicChallenges(user._id,setUserPublicChallenges)
   selectedPrivacy === "Private" &&  getUserPrivateChallenges(user._id,setUserPrivateChallenges)
   (selectedPrivacy === "Participate" ) && getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
   (selectedPrivacy === "Invited" || selectedPrivacy == "Strict" )  && getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
   setIsLoaded(true)
   getFollowData(user._id,setFollow)
   setTimeout(() => {
       setRefreshing(false)
   }, 300);
    
}
, []);


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

              <View className=" w-[100vw]  h-[60] flex-row justify-center items-center">
                  <InfosProfile city={user.city} state={user.state} country={user.country} heigh={30} />
              </View>

       
              <View className=" w-[100vw] flex-col mt-[4] justify-start items-center h-[100]">

                <TouchableOpacity 
                  onPress={
                     ()=> {
                      router.navigate('/SetUpProfile')
                    } }
                
                    className="  absolute top-2 right-3  rounded-full flex-col  justify-center items-center ">
                      <Image 
                         className={width <= 330 ? "w-10 h-10" : "w-12 h-12"}

                      resizeMode='fill'
                      source={icons.update_profile} 
                      />
                      <Text
                      style={{fontSize:9}}
                      className="text-white font-black py-3 ">
                      Update
                     </Text>
                     
                </TouchableOpacity>  
                <TouchableOpacity 
                  onPress={
                    async()=> {
                      await AsyncStorage.removeItem("jwt_token")
                      setTimeout(() => {
                        // clearLocalStorage() 
                        setUser(null)
                        setTrendingChallenges([])
                        // setUserChallenges([])
                        setPublicParticipateChallenges(null)
                        setIsViewed(true)
                        setNotifications([])
                        setFollowings([])
                        setUserFriendData(null)
                        setFollow(null)
                        router.replace('/login')
                      }, 1000);
                    
                    
                }
                   }
                
                    className="  absolute top-2 left-3   rounded-full flex-col  justify-center items-center ">
                      <Image 
                        className={width <= 330 ? "w-10 h-10" : "w-12 h-12"}
                      resizeMode='fill'
                      source={icons.logout} 
                      />
                      <Text
                      style={{fontSize:9}}
                      className="text-white font-bold py-3 ">
                      Logout
                     </Text>
                     
                </TouchableOpacity>  

                <Text
                      style={{fontSize:width/30}}
                      className="text-white font-bold py-3 text-xl ">
                      {user.name}
                </Text>
              
                <View className="flex-row w-[60%] h-15 bg-[#203333]  px- rounded-lg border-4 border-white justify-between items-center"
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
                        "flex-col h-[100%] w-[30%] rounded-lg justify-start bg-[#0f1c33] gap- py-3 items-center"
                        :"flex-col h-[100%] w-[30%]  justify-start  py-3 items-center"}
                     >
                       <Text
                       style={{fontSize:width/40}}
                        className="text-red-200 font-black text-sm">
                           Friends
                       </Text>
                       <Text
                        className="text-white font-bold  text-xs">
                           {userFriendData && userFriendData.friends.length}
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
                      "flex-col h-[100%] w-[34%] rounded-lg justify-start bg-[#0f1c33] py-3 items-center"
                      :"flex-col h-[100%] w-[34%]  justify-start py-3 items-center"}
                         >
                       <Text
                        style={{fontSize:width/40}}
                        className="text-blue-300 font-black text-xs">
                           Followers
                       </Text>
                       <Text
                        className="text-white font-bold  text-sm">
                           {follow && follow.followers.length}
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
                        "flex-col h-[100%] w-[34%] rounded-lg justify-start bg-[#0f1c33] py-3 items-center"
                        :"flex-col h-[100%] w-[34%]  justify-start py-3 items-center"}
                     >
                       <Text
                       style={{fontSize:width/40}}
                        className="text-[#b5c4df] font-black text-xs">
                           Followings
                       </Text>
                       <Text
                        className="text-white font-bold  text-sm">
                           {follow && follow.followings.length}
                       </Text>
                     </TouchableOpacity>

              
                </View>
            </View>
          </View>
          
          <View className="bg-white min-w-full min-h-1"></View>

          <View 
           style={{height:width/4}}
           className="w-[100vw]  bg-gray-800 flex-row justify-start  ">
              <View
                style={{width:width/5}}
                className="w-[80px] h-[100%] rounded-3xl  bg-black flex-col justify-center items-center">
                    <TouchableOpacity
                     onPress={ ()=> {
                      router.navigate("SearchFriend")
                    }
                      
                    }
                    
                       className="flex-col  justify-center  gap-2 items-center"
                     >
                      <Image 
                       className="h-10 w-10 rounded-full"
                       source={icons.search_people}
                       resizeMethod='contain'
                      />
                       <Text
                       style={{fontSize:8}}
                        className="text-white font-bold text-xs">
                           Add People
                       </Text>
                    
                     </TouchableOpacity>
              </View>
              <FriendDisplayer friendList={friendList}  />
          </View>
          
          <View className="bg-white min-w-full min-h-1"></View>

  

          <View className="min-w-[100vw] h-[70px] flex-row justify-center items-center text-center">
              <Text style={{fontSize:width/30}}
                    className="font-black text-white text-xs">
                     Your challenges
              </Text>
          </View>



          <View
          style={{height:width/4}}
          className = "w-full h-[120px] mt-4 flex-row justify-start items-center  ">
              {/* <UserSelectButton color="white" bgColor={selectedPrivacy == "All"?"#241413":"black"} setSelectedPrivacy={setSelectedPrivacy} title ="All" action={handlePublic}/> */}
              
           <View className = "w-[50%] h-[120px] bg-[#0b5d34] rounded-tl-3xl flex-col justify-center items-center ">
              <TouchableOpacity
                  onPress={()=> selectedPrivacy !== "Public" && setSelectedPrivacy("Public")}
                  className ="rounded-lg w-[70%] h-[50%] flex-col justify-center items-center "
                  style= {{
                    // backgroundColor:selectedPrivacy == "Puublic"?"#0345fc":"#2e2b22",
                    height:width/11}}
                  >
                  <Text 
                   style={{fontSize:width/40}}
                   className="font-black text-white ">
                      Track your Challenges
                  </Text>
              </TouchableOpacity >   
              <View className = "w-[100%] h-[50%] px-2 flex-row justify-between items-end ">
                    <TouchableOpacity
                        onPress={()=> selectedPrivacy !== "Public" && setSelectedPrivacy("Public")}
                        className ="rounded-lg w-[46%] h-[70%] flex-col justify-center items-center "
                        style= {{backgroundColor:selectedPrivacy == "Public"?"#0345fc":"#031f52",height:width/11}}>
                        <Text 
                        style={{fontSize:width/40}}
                        className="font-black text-white text-xs">
                            Public
                        </Text>
                    </TouchableOpacity >   
                    <TouchableOpacity
                        onPress={()=>selectedPrivacy !== "Private" && setSelectedPrivacy("Private")}
                        className ="rounded-lg w-[46%] h-[70%] flex-col justify-center items-center "
                        style= {{backgroundColor:selectedPrivacy == "Private"?"#0345fc":"#031f52",height:width/11}}>
                        <Text 
                        style={{fontSize:width/40}}
                        className="font-black text-white text-xs">
                            Private
                        </Text>
                    </TouchableOpacity >   
              </View>
             
  
           </View>


           <View className = "w-[50%] h-[120px] bg-[#1f4155] rounded-tr-3xl flex-col justify-center items-center ">
              <TouchableOpacity
                  // onPress={()=> selectedPrivacy !== "Participate" && setSelectedPrivacy("Participate")}
                  className ="rounded-lg w-[70%] h-[50%]  flex-col justify-center items-center "
                  style= {{
                    // backgroundColor:selectedPrivacy == "Participate"?"#0345fc":"#2e2b22",
                  height:width/11}}>
                  <Text 
                  style={{fontSize:width/40}}
                  className="font-black text-white text-xs">
                      Track your participations
                  </Text>
              </TouchableOpacity >   
              <View className = "w-[100%] h-[50%] px-2  flex-row justify-between items-end ">
                  <TouchableOpacity
                      onPress={()=> selectedPrivacy !== "Participate" && setSelectedPrivacy("Participate")}
                      className ="rounded-lg w-[46%] h-[70%] flex-col justify-center items-center "
                      style= {{
                        // backgroundColor:selectedPrivacy == "Invited"?"#0345fc":"#2e2b22",
                      backgroundColor:selectedPrivacy == "Participate"?"#0345fc":"#031f52",
                      height:width/11}}>
                      <Text 
                      style={{fontSize:width/40}}
                      className="font-black text-white text-xs">
                          public
                      </Text>
                  </TouchableOpacity >   
                  <TouchableOpacity
                      onPress={()=>selectedPrivacy !== "Invited" && setSelectedPrivacy("Invited")}
                      // onPress={()=>selectedPrivacy !== "Strict" && setSelectedPrivacy("Strict")}
                      className ="rounded-lg w-[46%] h-[70%] flex-col justify-center items-center "
                      style= {{
                        backgroundColor:selectedPrivacy == "Invited"?"#0345fc":"#031f52",
                        // backgroundColor:selectedPrivacy == "Strict"?"#0345fc":"#2e2b22",
                        height:width/11}}>
                      <Text 
                      style={{fontSize:width/40}}
                      className="font-black text-white text-xs">
                          friends
                      </Text>
                  </TouchableOpacity >   
              </View>
  
           </View>
           
           <TouchableOpacity
                      onPress={()=>selectedPrivacy !== "Strict" && setSelectedPrivacy("Strict")}
                      className ="absolute top-0 bg-red-500 rounded-full flex-col justify-center items-center "
                      style= {{
                        backgroundColor:selectedPrivacy == "Strict"?"#0345fc":"#031f52",
                      left:(width-width/9)/2,
                      width:width/9,height:width/9}}>
                      <Text 
                      style={{fontSize:width/40}}
                      className="font-black text-white text-xs">
                          Strict
                      </Text>
            </TouchableOpacity >   
           
             
          </View>


          <TouchableOpacity
                  onPress ={!refreshing && onRefresh}
                  className="w-full h-8 absolute top-0 opacity-70 bg-blue-300 justify-center items-center">
                    {refreshing?(
                          <ActivityIndicator color="red" size="large"  />
                    ): (
                      <Text className="text-xs text-black">
                         Refresh
                      </Text>
                    )}
              
               
          </TouchableOpacity>

          { displayData.length == 0 &&   (<NoChallenge />) }

         
     </>
  ),[userFriendData,follow,followings,isFollowerClicked,isFriendClicked,isFollowingClicked,friendList,
    userButton,partiButton,privateSelect,publicSelect,loadFollowers,loadFriends,onRefresh, refreshing,displayData,
    selectedPrivacy]);


  const renderFooter= ({ item , index }) => {  
      return (
      <View
         className="w-[100%] min-h-[60] bg-primary ">
      </View>) 
  
  };


//   const onRefresh = 
//   useCallback(
//     () =>  {
//     setRefreshing(true);
//     getUserFriendsData(user._id , setUserFriendData)
//     setDisplayData([])
//     selectedPrivacy === "Public" &&   getUserPublicChallenges(user._id,setUserPublicChallenges)
//     selectedPrivacy === "Private" &&  getUserPrivateChallenges(user._id,setUserPrivateChallenges)
//     (selectedPrivacy === "Participate" ) && getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
//     (selectedPrivacy === "Invited" || selectedPrivacy == "Strict" )  && getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
//     setIsLoaded(true)
//     getFollowData(user._id,setFollow)
//     setTimeout(() => {
//         setRefreshing(false)
//     }, 300);
     
// }
// , []);


  useEffect(() => {
    selectedPrivacy === "Public" && setChallengeData(userPublicChallenges)
  }, [userPublicChallenges,selectedPrivacy])

  useEffect(() => {
    selectedPrivacy === "Private" &&   setChallengeData(userPrivateChallenges)
  }, [userPrivateChallenges,selectedPrivacy])

  useEffect(() => {
    selectedPrivacy === "Participate" &&  setChallengeData(publicParticipateChallenges)
  }, [publicParticipateChallenges, selectedPrivacy])

  useEffect(() => {
    selectedPrivacy === "Invited" &&  setChallengeData(privateParticipateChallenges)
  }, [privateParticipateChallenges,selectedPrivacy])


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

  
   const loadMoreData = () => {
    const newData = challengeData.slice(index, index + 2);
    setDisplayData([...displayData, ...newData]);
    setIndex(index + 2);
  };
  
  useEffect ( () => {     
    // challengeData.length >= 2 ? setDisplayData(challengeData.slice(0,2)) : setDisplayData(challengeData)
    setDisplayData(challengeData.slice(0,2))
    setIndex(2)
 } , [challengeData]) 


  return (
    <SafeAreaView className="bg-primary min-h-full min-w-full ">
      <FlatList 
      ref={flatListRef}
      data={displayData}
      keyExtractor={(item) => item._id}
      renderItem={renderItem }
      onViewableItemsChanged={onViewableItemsChanged}
      onEndReached={loadMoreData}
      viewabilityConfig={{
            itemVisiblePercentThreshold: 70, // Adjust as needed
      }}
      onRefresh={onRefresh}
      refreshing={refreshing}
      extraData={refreshing}
      ListHeaderComponent={ renderHeader }
      ListFooterComponent={renderFooter}
    />
    </SafeAreaView>
   
  )
}