import { View, Text,  ScrollView, Image, FlatList, TouchableOpacity, Alert, Platform, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { memo,  useEffect,  useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { getFollowData, getUserActivities, getUserById,  getUserFriendsData, getUserParticipateChallenges } from '../apiCalls'

import { icons } from '../constants'
import { router, useLocalSearchParams} from 'expo-router'

import {  countryCodes } from '../helper'
import {  useSafeAreaInsets } from 'react-native-safe-area-context'
import FollowButton from '../components/custom/FollowButton'
import FriendButton from '../components/custom/FriendButton'
import CountryFlag from 'react-native-country-flag'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Friend from '../components/profile/Friend'
import Post from '../components/post/Post'
import UserTalentEntry from '../components/talent/UserTalentEntry'


const ProfileInfoHeader = memo(({userProfile ,profileFriendData ,showFriends ,height , width,setShowFriends}) => {
  return (
    <>
           <View className="w-[100%] flex-col bg-[#ffffff] justify-center  rounde d-t-lg items-center ">
               <Image 
                resizeMode='stretch'
                className="w-[100%] h-[200] "
                source={{uri:userProfile.cover_img}} 
                />
                <View 
                  className="bg-  absolute z-10 bottom-[-40] left-8 bg-black flex-col rounded-full justify-center items-center ">
                      <Image 
                      style={{height:height/10 , width:height/10}}
                      className="w-[120px] h-[120px] rounded-full"
                      resizeMode='cover'
                      source={{uri: userProfile && userProfile.profile_img}} 
                      />
                </View>
                <View
                           className="absolute bottom-2 right-2 flex-col  justify-center items-center ">
                                    < CountryFlag
                                      isoCode={userProfile.country}
                                      size={45}
                                          />
                </View>
          </View> 

          <View className=" w-[100%] bg-[#000000] pb-2  flex-row justify-start px-2 pt- 6 items-start h- [80]">
                          <View
                           className="h- [100%] w-[100%] mt-8 flex-col justify-start gap-2 pt-8 items-start d pb-1 pl- 2 ">
                                      <View
                                      className="w- [30%] h- [100%] flex-row gap-1 justify-start items-end "
                                      >
                                              <MaterialCommunityIcons name="map-marker" size={22} color="lightblue" />
                                             
                                              <Text
                                                  className="font-bold"
                                                  style={{
                                                  fontSize:13,
                                                  color: "white"
                                                  }}
                                              >
                                                  {''}{userProfile.city}
                                              </Text>
                                              <Text
                                                      className="font-bold"
                                                      style={{
                                                      fontSize:13,
                                                      color: "white",
                                                      }}
                                                  >
                                                      {', '}{ userProfile.state}
                                              </Text>

                                      </View>
                                  
                                      <View
                                      className="w-[100%] h- [100%]  flex-row gap-4 ml-2 mt-2 justify-start items-end">
                                               < CountryFlag
                                                  isoCode={userProfile.country}
                                                  size={18}
                                               />
                                              <Text style={ {
                                                          fontWeight:"800",
                                                          color: "white",
                                                          fontSize: 13,
                                                      }}>{countryCodes[userProfile.country] || "US"}
                                              </Text>
                                              
                                      </View>
                                      <View
                                                  className="w-[100%] flex-row mt-2 justify-center gap-2 items-center ">
                                                    <FollowButton userProfile = {userProfile} />
                                                    <FriendButton userProfile={userProfile} />
                                       </View>  
                           </View>

                           <View
                              className = "absolute w-[40%] top-3 left-[25%] b g-white flex-row justify-end items-center ">
                                      <Text   
                                      style ={{fontSize:13}}
                                      className="font-bold text-bold ">
                                              {userProfile.name}  
                                      </Text>
                           </View>

                            <TouchableOpacity 
                              onPress={()=>{
                                router.back()}}
                                className = "absolute w- [40%] top-2 right-2 b g-white flex-row justify-end items-center ">                                
                                <Ionicons name="close" size={34} color="white" />     
                            </TouchableOpacity>

                  

          </View>

          <View className="flex-row w-full bg-[#000000] px-2 py-0 mt-1 gap-6  bor der-white bor der-b-4 justify-between items-end  h-[50px]">
                 
                 <TouchableOpacity
                  className="flex-row w- [30%] px- 4 -[100%] justify-center gap-2 py-1 px-  rounde d-t-xl items-center">
                     <Text
                     style={{fontSize:14,
                      // color:"white",
                     }}
                     className="text-white font-bold text-base">
                         Friends
                     </Text>  
                     <Text
                     style={{fontSize:12,
                      color:"white",
                     }}
                     className="text-white font-bold text-base">
                         {profileFriendData.friends.length}
                     </Text> 
                 </TouchableOpacity>
                 <TouchableOpacity
                  onPress={() => {
                      setShowFriends(!showFriends)
                  }}
                  className="flex-row w- [30%] px- 4 -[100%] justify-center gap-2 py- 1 px-  rounde d-t-xl items-center">
                     <Image
                     className ="w-8 h-8"
                     source={ showFriends ? icons.eyeHide : icons.eye} />
                 </TouchableOpacity>
          </View>

          {showFriends && (
              <View 
                  className=" w-[100%] bg-[#000000]  h- [200px] flex-col py-2 px- 2 justify-center items-center g-white ">
                  <ScrollView 
                  showsVerticalScrollIndicator ={false}
                  style={{ maxHeight : width /2.1 }}
                  className=" w-[100%] max-h- [200px] ">
                      <View 
                      className=" w- [100%] h- [100%] flex-row flex-wrap py-2 gap-3 px-1 2 rounde d-2xl  justify-center  items-center b g-[#1c1c1d] ">
                          {profileFriendData && profileFriendData.friends.map((item ,index)=> {
                              return(   
                                  <Friend key={index} index={index} friend={item} w={width} h={height} />
                              )
                          })}
                      </View>
                  </ScrollView>
              </View>
          )}
           <View className="flex-row w-full bg-[#000000] px-2 py-0    mt-[-1] justify-start items-center h-[50px]">
                     <Text
                     style={{fontSize:13,
                      // color:"black",
                     }}
                     className="text-blue-300 font-bold text-base">
                         Show more
                     </Text> 
          </View>
          <View className="flex-row w-full bg-[#000000] px-2 mb- 4 gap-1 py-4 bor der-white bor der-b-4 justify-start items-end  h-[70px]">
                    <Text
                     style={{fontSize:14,
                     }}
                     className="text-white font-bold mr-2">
                         TimeLine
                    </Text>  
                    <MaterialCommunityIcons name="star" size={28} color= "#edc153"  />

                    <Text
                     style={{fontSize:10,
                     }}
                     className="text-yellow-400 -rotate-25 mr-2 mb-4 font-black ">
                         Talent
                    </Text>  

                    <MaterialCommunityIcons name="sword-cross" size={25} color= "#F97316"  />
                     <Text
                     style={{fontSize:10,
                     }}
                     className="text-yellow-400 -rotate-25 ml- mb-4 font-black ">
                         Challenge
                    </Text>  

                    {/* <Image
                     className ="w-12 ml-6 h-12"
                     source={ icons.trophy} />
                      <Text
                     style={{fontSize:10,
                     }}
                     className="text-yellow-700 -rotate-25 ml- mb-8 font-black ">
                         Trophy
                    </Text>   */}

          </View>

    </>
    )
})

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
  const { width, height } = useWindowDimensions();
  const [profileFriendData ,setProfileFriendData] = useState(null)
  const [profileFollow , setProfileFollow] = useState(null)
  const [addFriendRequest , setAddFriendRequest] = useState(null)
  const [participantFriendData,setParticipantFriendData] = useState(null)
  // const [userFriendData,setUserFriendData] = useState(null)
  const[isFriend,setIsFriend]= useState(false)
  const[isPending,setIsPending]= useState(false)
  const[isAccept,setIsAccept]= useState(false)
  const [name , setName] = useState(null)
  const [showFriends , setShowFriends] = useState(true)
  const [showFollowers , setShowFollowers] = useState(true)
  const [showFollowings , setShowFollowings] = useState(true)
  const [data , setData] = useState(null)
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(4);


  



  useEffect(() => {
    if(userProfile) {
    getFollowData(userProfile._id , setProfileFollow)
    getUserFriendsData(userProfile._id,setProfileFriendData)

    const splitName = userProfile.name.split(" ")
    setName({
    part1 : splitName[0],
    part2: splitName[1]
     })
    }
  }, [userProfile])

  useEffect ( () => {     
    getUserById(user_id, setUserProfile)
    getFollowData(user._id,setFollow)
    getUserFriendsData(user._id,setUserFriendData)
    getUserActivities(user_id , setData)
  } , [])  


  useEffect(() => {
    if(data){
        setDisplayData(data.slice(0,index))
     }
  }, [data])

  const loadMoreData = () => {
    const newData = data.slice(index, index + 4);
    setDisplayData([ ...displayData,...newData]);
    setIndex(index + 4);
  };

  // const renderHeader = memo(() => {
  //   return (
  //     <>
  //            <View className="w-[100%] flex-col bg-[#F7F7F7] justify-center  rounde d-t-lg items-center ">
  //                <Image 
  //                 resizeMode='stretch'
  //                 className="w-[100%] h-[200] "
  //                 source={{uri:userProfile.cover_img}} 
  //                 />
  //                 <View 
  //                   className="bg-  absolute z-10 bottom-[-40] left-8 bg-black flex-col rounded-full justify-center items-center ">
  //                       <Image 
  //                       style={{height:height/10 , width:height/10}}
  //                       className="w-[120px] h-[120px] rounded-full"
  //                       resizeMode='cover'
  //                       source={{uri: userProfile && userProfile.profile_img}} 
  //                       />
  //                 </View>
  //                 <View
  //                            className="absolute bottom-2 right-2 flex-col  justify-center items-center ">
  //                                     < CountryFlag
  //                                       isoCode={userProfile.country}
  //                                       size={45}
  //                                           />
  //                 </View>
  //           </View> 

  //           <View className=" w-[100%] bg-[#F7F7F7] pb-2  flex-row justify-start px-2 pt- 6 items-start h- [80]">
  //                           <View
  //                            className="h- [100%] w-[100%] mt-8 flex-col justify-start gap-2 pt-8 items-start d pb-1 pl- 2 ">
                            
                                            
  //                                       <View
  //                                       className="w- [30%] h- [100%] flex-row gap-1 justify-start items-end "
  //                                       >
  //                                               <MaterialCommunityIcons name="map-marker" size={22} color="blue" />
                                               
  //                                               <Text
  //                                                   className="font-bold"
  //                                                   style={{
  //                                                   fontSize:13,
  //                                                   color: "black"
  //                                                   }}
  //                                               >
  //                                                   {''}{user.city}
  //                                               </Text>
  //                                               <Text
  //                                                       className="font-bold"
  //                                                       style={{
  //                                                       fontSize:13,
  //                                                       color: "black",
  //                                                       }}
  //                                                   >
  //                                                       {', '}{ user.state}
  //                                               </Text>

  //                                       </View>
                                    
  //                                       <View
  //                                       className="w-[100%] h- [100%]  flex-row gap-4 ml-2 mt-2 justify-start items-end">
  //                                                < CountryFlag
  //                                                   isoCode={userProfile.country}
  //                                                   size={18}
  //                                                />
  //                                               <Text style={ {
  //                                                           fontWeight:"400",
  //                                                           color: "black",
  //                                                           fontSize: 13,
  //                                                       }}>{countryCodes[userProfile.country] || "US"}
  //                                               </Text>
                                                
  //                                       </View>
  //                                       <View
  //                                                   className="w-[100%] flex-row mt-2 justify-start gap-8 items-center ">
  //                                                     <FollowButton userProfile = {userProfile} />
  //                                                     <FriendButton userProfile={userProfile} />
  //                                        </View>  
  //                            </View>

  //                            <View
  //                               className = "absolute w-[40%] top-3 left-[25%] b g-white flex-row justify-end items-center ">
  //                                       <Text   
  //                                       style ={{fontSize:13}}
  //                                       className="font-bold text-bold ">
  //                                               {userProfile.name}  
  //                                       </Text>
  //                            </View>
  //           </View>

  //           <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0 mt-1 gap-6  bor der-white bor der-b-4 justify-between items-end  h-[50px]">
                   
  //                  <TouchableOpacity
  //                   className="flex-row w- [30%] px- 4 -[100%] justify-center gap-2 py-1 px-  rounde d-t-xl items-center">
  //                      <Text
  //                      style={{fontSize:14,
  //                      }}
  //                      className="text-black font-bold text-base">
  //                          Friends
  //                      </Text>  
  //                      <Text
  //                      style={{fontSize:12,
  //                       color:"black",
  //                      }}
  //                      className="text-white font-bold text-base">
  //                          {profileFriendData.friends.length}
  //                      </Text> 
  //                  </TouchableOpacity>
  //                  <TouchableOpacity
  //                   onPress={() => {
  //                       setShowFriends(!showFriends)
  //                   }}
  //                   className="flex-row w- [30%] px- 4 -[100%] justify-center gap-2 py- 1 px-  rounde d-t-xl items-center">
  //                      <Image
  //                      className ="w-8 h-8"
  //                      source={ showFriends ? icons.eyeHide : icons.eye} />
  //                  </TouchableOpacity>
  //           </View>

  //           {showFriends && (
  //               <View 
  //                   className=" w-[100%] bg-[#F7F7F7]  h- [200px] flex-col py-2 px- 2 justify-center items-center g-white ">
  //                   <ScrollView 
  //                   showsVerticalScrollIndicator ={false}
  //                   style={{ maxHeight : width /2.1 }}
  //                   className=" w-[100%] max-h- [200px] ">
  //                       <View 
  //                       className=" w- [100%] h- [100%] flex-row flex-wrap py-2 gap-2 px-1 2 rounde d-2xl  justify-evenly  items-center b g-[#1c1c1d] ">
  //                           {profileFriendData && profileFriendData.friends.map((item ,index)=> {
  //                               return(   
  //                                   <Friend key={index} index={index} friend={item} w={width} h={height} />
  //                               )
  //                           })}
  //                       </View>
  //                   </ScrollView>
  //               </View>
  //           )}
  //            <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0    mt-[-1] justify-start items-center h-[50px]">
  //                      <Text
  //                      style={{fontSize:13,
                  
  //                      }}
  //                      className="text-blue-500 font-bold text-base">
  //                          Show more
  //                      </Text> 
  //           </View>



  //           <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0 mt-1 gap-6  bor der-white bor der-b-4 justify-between items-end  h-[50px]">
  //                     <Text
  //                      style={{fontSize:14,
  //                      }}
  //                      className="text-black font-bold text-base">
  //                          Recent Activities
  //                     </Text>  
  //           </View>

  //     </>
  //     )
  // })
  

  return (
    <View
    style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
     className="bg-primary h-full w-full ">
      {  userProfile && profileFriendData &&
      (
        <View
        showsVerticalScrollIndicator ={false}
        className="w-[100%] h-[100%] bg-primary" >
           
            <View 
                  className=" w-[100%] bg-[#020202]  h- [200px] flex-col py- 2 px- 1 justify-center items-center g-white ">
                      {displayData && data && (
                                <FlatList
                                data={displayData && displayData}
                                keyExtractor={(item) => item._id}
                                renderItem={({item ,index}) => {
                                 return (
                                  <>
                                  {item.dataType === "talent" && ( 
                                    <UserTalentEntry key={index} userTalent = {item}  user={user} userProfile={userProfile}
                                                     activity = {true} />
                                  )}
                                  </>
                                )
                                }}
                                onEndReached = { index < data.length && loadMoreData} 
                                ListHeaderComponent={<ProfileInfoHeader userProfile={userProfile} profileFriendData={profileFriendData}
                                             setShowFriends={setShowFriends} showFriends ={showFriends} height={height} width={width} />}
                                removeClippedSubviews={true} 
                                scrollEventThrottle={16} 
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                // scrollEnabled={false}
                                ListFooterComponent = {()=>{
                                  return(
                                    <View
                                    className="w-[100%] py-2 px-1 2 bg-[#000000] flex-col mb-1 mt-1 h-[100px] justify-start items-center">
                                          { index + 4  > data.length && (
                                            <TouchableOpacity
                                              onPressIn={()=>{
                                                setIndex(4)
                                                setDisplayData(null)
                                                setTimeout(() => {
                                                  setDisplayData(data.slice(0,4))
                                                }, 10);
                                              }}
                                              onPress={
                                                loadMoreData }
                                              className="w-[100%] flex-row  justify-center  py-2 px-1  bg-gray-700 rounded-lg items-center">
                                                    <Text
                                                        style={{fontSize:12,
                                                        }}
                                                        className="text-gray-100 font-bold text-base">
                                                            go back top
                                                    </Text>
                                            </TouchableOpacity>
                                          )}
                                    </View>
                                  )
                                }
                                }
                            />
                      )}
            </View>
           
            <View
                className="w-[100%] h-[50px] absolute bottom-0 gap-4 py-2 px-2 shadow-black bg-[#000000] flex-row mb- 1   justify-center items-center">
                   <Text
                      style={{fontSize:11,}}
                      className="text-gray-100 font-bold text-base">
                           {(name.part1) } 
                   </Text>
                   <Image 
                      // style={{height:height/10 , width:height/10}}
                      className="w-8 h-8 rounded-full"
                      resizeMode='cover'
                      source={{uri: userProfile && userProfile.profile_img}} 
                      />     
                   <Text
                      style={{fontSize:11,}}
                      className="text-gray-100 font-bold text-base">
                           Profile
                   </Text>              
            </View>
  
     </View>
      )}   
    </View>
   
  )
}