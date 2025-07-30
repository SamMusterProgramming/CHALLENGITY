import { View, Text, Image, TouchableOpacity, Alert, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants'
import { acceptFriendRequest, addFollowing, friendRequest, getFollowData, getFollowings, getUserFriendsData, removeFriendRequest, unFollowings, unfriendRequest } from '../../apiCalls'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import InfosProfile from './InfosProfile'
import FriendButton from '../custom/FriendButton'
import FollowButton from '../custom/FollowButton'

export default function ProfileHeader({userProfile}) {


    const {user,isViewed,setIsViewed,userFriendData,setUserFriendData,
      followings,setFollowings,follow
    } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [profileFriendData ,setProfileFriendData] = useState(null)
    // const [followings,setFollowings] = useState ([])
    const [profileFollow , setProfileFollow] = useState(null)
    
    const [addFriendRequest , setAddFriendRequest] = useState(null)
    const [participantFriendData,setParticipantFriendData] = useState(null)
    // const [userFriendData,setUserFriendData] = useState(null)
    const[isFriend,setIsFriend]= useState(false)
    const[isPending,setIsPending]= useState(false)
    const[isAccept,setIsAccept]= useState(false)


  useEffect(() => {
    getFollowData(userProfile._id , setProfileFollow)
    getUserFriendsData(userProfile._id,setProfileFriendData)
  }, [])
  
  




  return (
    <View className="bg- w-[100vw] h-[50vh] flex-col justify-start items-center g-white  "> 
        <View className="bg- w-[60%] flex-col bg-white justify-center rounded-xl items-center h-[35%]">
              <Image 
              resizeMode='stretch'
              className="w-[98%] h-[98%] rounded-xl"
              source={{uri:userProfile.cover_img}} 
              />
               <View 
              style={{width:height/10 ,height:height/10
                ,marginBottom: -height/20
              }}
              className="bg-  absolute bottom-0 bg-black flex-col rounded-full justify-center items-center ">
              <Image 
              className="w-[95%] h-[95%] rounded-full"
              resizeMode='cover'
              source={{uri:userProfile.profile_img}} 
              />
              </View>
        </View> 
        <View className=" w-[100%] bg- flex-row justify-between items-end h-[20%]">
                    

                     <FollowButton userProfile={userProfile} />

                     <Text
                      style={{fontSize:18}}
                          className="text-white font-bold  text-xl">
                          {userProfile.name}
                     </Text>

                     <FriendButton userProfile={userProfile} />

                   
        </View>

        <View className=" w-[100vw] bg flex-row justify-start items-center h-[20%]">
            <InfosProfile city={userProfile.city} state={userProfile.state} country={userProfile.country} heigh={50} />
        </View> 
       
        <View className="flex-row w-full gap-6 justify-center items-center g-white h-[20%]">
              <View
               className="flex-col justify-center gap-2 items-center"
              >
                <Text
                 className="text-blue-300 font-bold text-base">
                    Followers
                </Text>
                <Text
                 className="text-white font-bold  text-base">
                    {profileFollow && profileFollow.followers.length}
                </Text>
              </View>
              <View
               className="flex-col justify-center gap-2 items-center"
              >
                <Text
                 className="text-white font-bold text-base">
                    Followings
                </Text>
                <Text
                 className="text-white font-bold  text-base">
                    {profileFollow && profileFollow.followings.length}
                </Text>
              </View>
              <View
               className="flex-col justify-center gap-2 items-center"
              >
                <Text
                 className="text-red-400 font-bold text-base">
                    Friends
                </Text>
                <Text
                 className="text-white font-bold  text-base">
                    {profileFriendData && profileFriendData.friends.length}
                </Text>
              </View>
         </View>

        <TouchableOpacity 
          onPress={()=>{
            setIsViewed(true)
            router.back()}}
          className="absolute top-0 left-0  flex-col rounded-sm justify-center items-center ">
              <Image 
              className="w-14 h-8"
              resizeMode='contain'
              source={icons.back} 
              />
                <Text
              className="text-white font-bold  text-sm">
              Back
            </Text>
        </TouchableOpacity>
  
   </View>
  )
}