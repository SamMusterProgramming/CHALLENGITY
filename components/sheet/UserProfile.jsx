import { View, Text, ScrollView, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfosProfile from './InfosProfile'
import Friend from './Friend'
import CountryFlag from 'react-native-country-flag'
import { countryCodes } from '../../helper'
import UserChallengeEntry from '../challenge/UserChallengeEntry'
import UserTalentEntry from '../talent/UserTalentEntry'
import { acceptFriendRequest, deleteUserNotification, getNotificationByUser, removeFriendRequest } from '../../apiCalls'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { clearLocalStorage } from '../../videoFiles'

export default function UserProfile({user}) {
  const {setUser,setFollowings ,setTrendingChallenges, setFollow,setPublicParticipateChallenges,userFriendData,follow,userPublicChallenges,
    userTalents, setUserFriendData,setIsViewed,setNotifications ,setUserTalents, notifications , isLoggingOut, setIsLoggingOut
     } = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [selection, setSelection] = useState("friends");
  const [displayList, setDisplayList] = useState(userFriendData && userFriendData.friends || null)
  const [name , setName] = useState(null)
  const [competitionSelection , setCompetitionSelection] = useState(null)
  const [friendRequestReceived , setFriendRequestReceived] = useState(null)
  const [friendRequestAccepted , setFriendRequestAccepted] = useState(null)
  const [deletedNot , setDeletedNot] = useState(null)
  const [isExpired , setIsExpired] = useState(false)
  const [showFriends , setShowFriends] = useState(true)
  const [showFollowers , setShowFollowers] = useState(true)
  const [showFollowings , setShowFollowings] = useState(true)

  if(!user) router.navigate('(auth)/login')

  useEffect(() => {
    const splitName = user && user.name.split(" ")
    user && setName({
    part1 : splitName[0],
    part2: splitName[1]
     })
    const receivedNots = []
    const acceptedNots = []

    notifications.map((notification , index) => {
      if(notification.type === "friend request" && !notification.isRead ){
         receivedNots.push(notification)
      }
      if(notification.type === "friends" && notification.isRead ){
        acceptedNots.push(notification)
     }
    })
    receivedNots.push(...acceptedNots)
    receivedNots.sort((a,b) => a.createdAt - b.createdAt)
    setFriendRequestReceived(receivedNots)
   
  }, [notifications])

  //********************************** friend request */
  
  const acceptFRequest =(not)=>{
    const rawBody ={
      _id:user._id,
      name:user.name,
      email:user.email,
      profile_img:user.profile_img
    }
    acceptFriendRequest(not.content.sender_id,rawBody,setUserFriendData , setIsExpired)
  }

  const denyFriendRequest =(not)=>{
    const rawBody ={
      _id:not.content.sender_id,
      name:not.content.name,
      email:not.content.email,
      profile_img:not.content.profile_img
    }
    removeFriendRequest(user._id,rawBody,setUserFriendData)
  }

  const deleteNotification =(not)=>{
    deleteUserNotification(not._id , setDeletedNot)
  }
  
  useEffect(() => {
    user && getNotificationByUser(user._id,setNotifications)
  }, [userFriendData ,deletedNot])

  return (
    <ScrollView
    showsVerticalScrollIndicator ={false}
    className="w-[100vw] max-h-[100%] flex-1 bg-black py-1" >
        <View
        className="min-w-[100%] min-h-[100%] justify-start items-center" >
            
            <View className="w-[100%] flex-col bg-[#F7F7F7] justify-center  rounde d-t-lg items-center ">
                    <Image 
                    resizeMode='stretch'
                    className="w-[100%] h-[200px]  roun ded-xl"
                    source={{uri: user && user.cover_img}} 
                    />
                    <View 
                
                    className="bg-  absolute z-10 bottom-[-40] bg-black flex-col rounded-full justify-center items-center ">
                    <Image 
                    className="w-[80px] h-[80px] rounded-full"
                    resizeMode='cover'
                    source={{uri: user && user.profile_img}} 
                    />
                    </View>
                    <View
                             className="absolute bottom-2 right-2 flex-col  justify-center items-center ">
                                      < CountryFlag
                                        isoCode={user && user.country || "us"}
                                        size={45}
                                            />
                    </View>
            </View> 

            <View className=" w-[100%] bg-[#F7F7F7] pb-2  flex-row justify-start px-2 pt- 6 items-start h- [80]">
                            <View
                             className="h- [100%] w-[100%] mt-8 flex-col justify-start gap-2 pt-8 items-start d pb-4 pl- 2 ">

                                        <Text 
                                                style={{fontSize:15}}
                                                className="text-gray-700 mb-4 ml- font-bold ">
                                                    Details 
                                        </Text>
                                        <View
                                        className="w- [30%] h- [100%] flex-row gap-1 justify-start items-end "
                                        >
                                                <MaterialCommunityIcons name="map-marker" size={22} color="blue" />
                                               
                                                <Text
                                                    className="font-bold"
                                                    style={{
                                                    fontSize:13,
                                                    color: "black"
                                                    }}
                                                >
                                                    {' '}{user && user.city}
                                                </Text>
                                                <Text
                                                        className="font-bold"
                                                        style={{
                                                        fontSize:13,
                                                        color: "black",
                                                        }}
                                                    >
                                                        {', '}{ user && user.state}
                                                    </Text>

                                    </View>
                                    
                                    <View
                                        className="w- [40%] h- [100%] flex-row gap-1 justify-end items-end">
                                                 < CountryFlag
                                                    isoCode={user && user.country}
                                                    size={18}
                                            />
                                                <Text style={ {
                                                            fontWeight:"800",
                                                            color: "black",
                                                            fontSize: 13,
                                                        }}>{countryCodes[user && user.country] || "US"}
                                                </Text>
                                    </View>
                             </View>

                             <View
                                className = "absolute w-[40%] top-3 left-[0%] b g-white flex-row justify-end items-center ">
                                        <Text   
                                        style ={{fontSize:12}}
                                        className="font-black text-black ">
                                                {name && name.part1}  
                                        </Text>
                             </View>
                             <View
                                className = "absolute w-[40%] top-3 right-[0%] b g-white flex-row justify-start items-center ">
                                        <Text   
                                        style ={{fontSize:12}}
                                        className="font-black text-black ">
                                                {name && name.part2}  
                                        </Text>
                             </View>

                             <TouchableOpacity 
                                         onPress={
                                            ()=> {
                                            router.navigate('/SetUpProfile')
                                            } }
                                        
                                            className=" absolute bottom-6 right-2 gap-2 px-4 py-2 bg-[#d5d6d7] rounded-md flex-row  justify-center items-end ">
                                            <MaterialIcons name="edit" size={22} color="blue" />
                                            <Text
                                            style={{fontSize:12}}
                                            className="text-gray-800 font-bold ">
                                               edit profile
                                            </Text>
                             </TouchableOpacity>  
                                      
                       
                         
            </View>



            <View className="flex-row w-full px-2 py-2 mt-1 gap-8 bg-[#F7F7F7] bord er-b-4 justify-start items-end  h-[50px]">
                   <TouchableOpacity
                    onPress={() => {
                    setCompetitionSelection("challenges")}}
                    className="flex-row w- [30%] px- 4 -[100%] justify-center gap-2 py-1 px-  rounde d-t-xl items-center">
                       <Text
                       style={{fontSize:14,
                        color:"black",
                       }}
                       className="text-white font-bold text-base">
                           Friend Requests {friendRequestReceived && friendRequestReceived.length}
                       </Text>
                   </TouchableOpacity>

            </View>

            <View 
            className=" w-[100%]  h- [200px] bg-[#F7F7F7] flex-col py-2 px- 2 justify-start items-center g-white ">
            <ScrollView 
              showsVerticalScrollIndicator ={false}
              style={{ maxHeight : width /1.7 }}
              className=" w-[100%] max-h- [200px] ">
                <View 
                className=" w- [100%] h- [100%] flex-col  py-2 gap-2  justify-center  items-center b g-[#1c1c1d] ">
                    {friendRequestReceived && friendRequestReceived.map((not , index)=> {
                        return(   
                            <View
                            key={index}
                            className="w-[100%] bg-[#edf0f4] py-2 px-2 gap-2 flex-row justify-start items-end">
                                  <TouchableOpacity
                                    onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:not.content.sender_id} })}}
                                    className=" flex-col  justify-start items-center ">
                                    <Image
                                        className="w-8 h-8 rounded-full full"
                                        source={{uri:not.content.profile_img}}
                                        />
                                  </TouchableOpacity>
                                  <Text
                                    style={{fontSize:11,
                                    // color:competitionSelection =="talents"? "lightblue":"white"
                                    }}
                                    className="text-black font-black text-base">
                                        {not.content.name.slice(0,13)}
                                  </Text>

                                  <Text
                                    style={{fontSize:10,
                                    // color:competitionSelection =="talents"? "lightblue":"white"
                                    }}
                                    className="text-gray-600 ml-auto mr-4 font-black text-base">
                                       {not.message}
                                  </Text>

                                  <View
                                    className="w -[100%] ml-a uto gap-4 px-1 flex-row justify-between items-end ">
                                      {!not.isRead && (
                                        <TouchableOpacity 
                                        onPress={() => acceptFRequest(not)}
                                        className="w- [20%] p-2 flex-col b g-green-200 rounded-lg  justify-center items-center">
                                            <Text className=" text-blue-600 font-bold"
                                                style={{fontSize:10}} >
                                                   Accept
                                            </Text> 
                                        </TouchableOpacity>  
                                      )}
                                        <TouchableOpacity 
                                        onPress={()=> !not.isRead ? denyFriendRequest(not):deleteNotification(not) }
                                        className=" [20%]  py-2 px-2 flex-col  b g-red-200 rounded-lg  justify-center items-center">
                                            <Text className=" text-red-600 font-bold"
                                                style={{fontSize:10}} >
                                                 {not.isRead ? "Delete" :"Deny"} 
                                            </Text> 
                                        </TouchableOpacity>  
                                   </View> 

                            </View>
                        )
                    })}
                </View>
            </ScrollView>
           </View>

           <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0 mt-1 gap-6  bor der-white bor der-b-4 justify-between items-end  h-[50px]">
                   
                   <TouchableOpacity
                    className="flex-row w- [30%] px- 4 -[100%] justify-center gap-2 py-1 px-  rounde d-t-xl items-center">
                       <Text
                       style={{fontSize:14,
                        // color:"white",
                       }}
                       className="text-black font-bold text-base">
                           Friends
                       </Text>  
                       <Text
                       style={{fontSize:12,
                        color:"black",
                       }}
                       className="text-white font-bold text-base">
                           {userFriendData && userFriendData.friends.length}
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
                    className=" w-[100%] bg-[#F7F7F7]  h- [200px] flex-col py-2 px- 2 justify-center items-center g-white ">
                    <ScrollView 
                    showsVerticalScrollIndicator ={false}
                    style={{ maxHeight : width /2.5 }}
                    className=" w-[100%] max-h- [200px] ">
                        <View 
                        className=" w- [100%] h- [100%] flex-row flex-wrap py-2 gap-3 px-1 2 rounde d-2xl  justify-center  items-center b g-[#1c1c1d] ">
                            {userFriendData && displayList.map((item ,index)=> {
                                return(   
                                    <Friend key={index} index={index} friend={item} w={width} h={height} />
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            )}
            <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0    mt-[-1] justify-start items-center h-[50px]">
                       <Text
                       style={{fontSize:13,
                        // color:"black",
                       }}
                       className="text-blue-500 font-bold text-base">
                           Show more
                       </Text> 
            </View>





           <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0 mt-1 gap-6  bor der-white bor der-b-4 justify-between items-end  h-[50px]">
                   

                   <TouchableOpacity
                   
                    className="flex-row w- [30%] px- 8 justify-center gap-2 p-1 px- rounded-t-xl borde-2 borde-white items-center" >
                       <Text
                       style={{fontSize:14,
                      color:"black"
                       }}
                       className="text-white font-bold text-base">
                           Followers
                       </Text>
                       <Text
                       style={{fontSize:12,
                        // color:"white",
                       }}
                       className="text-gray-600 font-bold text-base">
                           {follow && follow.followers.length}
                       </Text> 
                   </TouchableOpacity>

                   <TouchableOpacity
                    onPress={() => {
                        setShowFollowers(!showFollowers)
                    }}
                    className="flex-row w- [30%] px- 4 -[100%] justify-center gap-2 py- 1 px-  rounde d-t-xl items-center">
                       <Image
                       className ="w-8 h-8"
                       source={ showFollowers ? icons.eyeHide : icons.eye} />
                   </TouchableOpacity>

            </View>
            {showFollowers && (
                <View 
                className=" w-[100%]  h- [200px] bg-[#F7F7F7] flex-col py-2 px- 2 justify-start items-center g-white ">
                <ScrollView 
                showsVerticalScrollIndicator ={false}
                style={{ maxHeight : width /1.7 }}
                className=" w-[100%] max-h- [200px] ">
                    <View 
                    className=" w- [100%] h- [100%] flex-row flex-wrap py-2 gap-3  rounde d-2xl justify-center items-center b g-[#1c1c1d] ">
                        {userFriendData && follow.followers.map((item ,index)=> {
                            return(   
                                <Friend key={index} index={index} friend={item} w={width} h={height} />
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            )}
            <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0    mt-[-1] justify-start items-center h-[50px]">
                       <Text
                       style={{fontSize:13,
                        // color:"black",
                       }}
                       className="text-blue-500 font-bold text-base">
                           Show more
                       </Text> 
            </View>



           <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0 mt-1 gap-6  bor der-white bor der-b-4 justify-between items-end  h-[50px]">
                   
                   <TouchableOpacity
                   
                    className="flex-row w- [30%] px- 8 justify-center gap-2 p-1 px- rounded-t-xl borde-2 borde-white items-center" >
                       <Text
                       style={{fontSize:14,
                      color:"black"
                       }}
                       className="text-white font-bold text-base">
                           Followings
                       </Text>
                       <Text
                       style={{fontSize:12,
                        // color:"white",
                       }}
                       className="text-gray-600 font-bold text-base">
                           {follow && follow.followings.length}
                       </Text> 
                   </TouchableOpacity>
                   <TouchableOpacity
                    onPress={() => {
                        setShowFollowings(!showFollowings)
                    }}
                    className="flex-row w- [30%] px- 4 -[100%] justify-center gap-2 py- 1 px-  rounde d-t-xl items-center">
                       <Image
                       className ="w-8 h-8"
                       source={ showFollowings ? icons.eyeHide : icons.eye} />
                   </TouchableOpacity>

            </View>
            {showFollowings && (
                <View 
                className=" w-[100%] bg-[#F7F7F7] h- [200px] flex-col py-2 px- 2 justify-start items-center g-white ">
                    <ScrollView 
                    style={{ maxHeight : width /1.7 }}
                    className=" w-[100%] max-h- [200px] ">
                        <View 
                        className=" w- [100%] h- [100%] flex-row flex-wrap py-2 gap-3  rounde d-2xl justify-center  items-center b g-[#1c1c1d] ">
                            {userFriendData && follow.followings.map((item ,index)=> {
                                return(   
                                    <Friend key={index} index={index} friend={item} w={width} h={height} />
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            )}
            <View className="flex-row w-full bg-[#F7F7F7] px-2 py-0    mt-[-1] justify-start items-center h-[50px]">
                       <Text
                       style={{fontSize:13,
                        // color:"black",
                       }}
                       className="text-blue-500 font-bold text-base">
                           Show more
                       </Text> 
            </View>



           
            <View
            className="w-[100%] py-2 px-2 bg-[#F7F7F7] flex-row mb- 2 mt-1 round ed-b-3xl  justify-center items-center">
              
                    <TouchableOpacity
                      onPress={async()=>{                           
                        try {
                            await AsyncStorage.removeItem("jwt_token")
                            setIsLoggingOut(true)
                            setTimeout(() => {
                                setUser(null)
                                setTrendingChallenges([])
                                setPublicParticipateChallenges(null)
                                setIsViewed(true)
                                setNotifications([])
                                setFollowings([])
                                setUserFriendData(null)
                                setFollow(null)
                                setIsLoggingOut(false)
                                router.replace('/Home');
                            }, 2000);
                        
                    } catch (error) {
                        console.log(error)
                    }
                }
                
                }
                    className="w-[100%] flex-row  justify-center  py-1 px-4  bg-gray-300 rounded-xl items-center">
                            <Text
                                style={{fontSize:12,
                                }}
                                className="text-gray-700 font-black text-base">
                                    Log out
                           </Text>
                    </TouchableOpacity>
         
            </View>

          

        </View>
    </ScrollView>
  )
}