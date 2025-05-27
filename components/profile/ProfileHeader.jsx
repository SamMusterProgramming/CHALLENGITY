import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants'
import { acceptFriendRequest, addFollowing, friendRequest, getFollowData, getFollowings, getUserFriendsData, removeFriendRequest, unFollowings, unfriendRequest } from '../../apiCalls'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import InfosProfile from './InfosProfile'

export default function ProfileHeader({challenger,friends,follow}) {


    const {user,isViewed,setIsViewed,userFriendData,setUserFriendData,
      followings,setFollowings
    } = useGlobalContext()

    const [challengerFriends ,setChallengerFriends] = useState(null)
    // const [followings,setFollowings] = useState ([])
    const [isFollowing , setIsFollowing] = useState(false)

    const [addFriendRequest , setAddFriendRequest] = useState(null)
    const [participantFriendData,setParticipantFriendData] = useState(null)
    // const [userFriendData,setUserFriendData] = useState(null)
    const[isFriend,setIsFriend]= useState(false)
    const[isPending,setIsPending]= useState(false)
    const[isAccept,setIsAccept]= useState(false)


    useEffect ( () => {   
        getUserFriendsData(challenger._id , setParticipantFriendData)
      } , [] ) 



    // useEffect ( () => {     
    //     getFollowData(challenger._id,setChallengerFollow)
    //   } , [] )  
    

    //********************************** following followers data *****************/
    // useEffect(() => {
    //     getFollowings(user._id ,setFollowings)
    //   }, [])



    useEffect(() => {
        followings.find(following => following.following_id === challenger._id)?
        setIsFollowing(true) : setIsFollowing(false)
      }, [followings])
    
    const handleFollowing =  ()=> {
      const rawBody = {
        following_id :challenger._id,
        following_email:challenger.email,
        following_profileimg:challenger.profile_img,
        following_name:challenger.name,
        follower_profileimg:user.profile_img,
        follower_name:user.name
     }
    addFollowing(user._id,rawBody, setFollowings)
    }
    
  const handleUnFollowing =  ()=> {
      const rawBody = {
        following_id :challenger._id,
        following_email:challenger.email,
        following_profileimg:challenger.profile_img,
        following_name:challenger.name,
        follower_profileimg:user.profile_img,
        follower_name:user.name
     }
     unFollowings(user._id,rawBody, setFollowings)
    }

     //********************************** friends data *****************/

  useEffect(() => {
    // getUserFriendsData(user._id,setUserFriendData)
    // getUserFriendsData(challenger._id,setParticipantFriendData)
  }, [])


  useEffect(() => {
    if(participantFriendData){ 
      if(participantFriendData.friend_request_received)
      participantFriendData.friend_request_received.find(data => data.sender_id == user._id)
      ? setIsPending(true) : setIsPending(false)
      if(participantFriendData.friends)
        participantFriendData.friends.find(data => data.sender_id === user._id)
        ? setIsFriend(true) : setIsFriend(false)
      }

    if( userFriendData){
      if(userFriendData.friend_request_received) {
         if(userFriendData.friend_request_received.find(data => data.sender_id == challenger._id))
         {
          setIsAccept(true)
          setIsPending(false)
          setIsFriend(false)
        } 
        else {setIsAccept(false)
        
      }}}
          
          }
  , [participantFriendData,userFriendData])
   
  useEffect(() => {
    getUserFriendsData(user._id,setUserFriendData)
    getUserFriendsData(challenger._id,setParticipantFriendData)
    }, [addFriendRequest])

    const sendFriendRequest = () => {    
      const rawBody = user;
      friendRequest(challenger._id,rawBody,setAddFriendRequest)
   }   
   const unfriendFriendRequest = () => {
    const rawBody = user;
    unfriendRequest(challenger._id,rawBody,setAddFriendRequest)
  }
  const okFriendRequest = () => {
    const rawBody ={
      _id:challenger._id,
      name:challenger.name,
      email:challenger.email,
      profile_img:challenger.profile_img
    }
    acceptFriendRequest(user._id,rawBody,setAddFriendRequest)
  }
  const cancelFriendRequest = () => {
    removeFriendRequest(challenger._id,user,setAddFriendRequest)
  }
  
  
  const confirmCancel = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to cancel friend request",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: cancelFriendRequest }
      ],
      { cancelable: false }
    );
  };
  const confirmFriendRequest = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to send friend request",
  
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: sendFriendRequest }
      ],
      { cancelable: false }
    );
  };
  
  const confirmAccept = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to accept friend requestt",
  
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: okFriendRequest }
      ],
      { cancelable: false }
    );
  };
  
  const confirmUnfriend = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to remove from your friend list",
  
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: unfriendFriendRequest }
      ],
      { cancelable: false }
    );
  };



  return (
    <View className="bg- w-[100vw] flex-col justify-start items-center "> 
        <View className="bg- w-[100vw] flex-col justify-start items-center h-[150]">
              <Image 
              minWidth='100%'
              height={150}
              resizeMode='stretch'
              source={{uri:challenger.cover_img}} 
              />
        </View> 
        <View className=" w-[100vw] flex-row justify-start items-center h-[60]">
            <InfosProfile city={challenger.city} state={challenger.state} country={challenger.country} heigh={30} />
        </View> 
        <View className="bg- w-[85] absolute mt-32 bg-blue-400 flex-col rounded-full justify-center items-center h-[85]">
              <Image 
              minWidth={83}
              height={83}
              borderRadius={50}
              resizeMode='cover'
              source={{uri:challenger.profile_img}} 
              />
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



    




    <View className=" w-[100vw] flex-col mt-[20] justify-start gap-5 items-center h-[120]">
        
        <View
         className=" w-[100vw] flex-row h-8 justify-center  items-end ">
                  <TouchableOpacity
                            onPress={isFriend? confirmUnfriend  : 
                            isAccept? confirmAccept : isPending?
                            confirmCancel : confirmFriendRequest  }
                            className=" w-[30%]  gap-2 flex-row  justify-center h-[100%] items-center">
                           
                          <View
                            className="flex-row items-end justify-center  h-[100%]">
                                 <Image    
                                    className="w-7 h-7"
                                    resizeMode='fill'
                                    source={icons.friend} 
                                  />
                          </View>
                          <View
                          className="flex-row  justify-center  items-end h-[120%]">
                                <Text className={isFriend?"text-blue-400  text-xs font-bold":"text-gray-200  text-xs font-bold"}>
                                 {isFriend? "Friend": isAccept ? "Accept": isPending ?"Pending": "Add "} 
                                </Text>
                          </View>
                         
                          <View
                                className="flex-row items-end justify-center  h-[120%]">
                                <Image    
                                className={isFriend?  "w-6 h-6   rounded-xl" :
                                          isPending ?  "w-6 h-6  rounded-xl": 
                                          isAccept?  "w-6 h-6 rounded-xl":""}
                                resizeMode='contain'
                                source={isFriend? icons.check : isPending ? icons.pending: isAccept? icons.check_red:""}
                                />
                          </View>
                 </TouchableOpacity>

                 <View
                 className=" w-[40%]  gap-2 flex-row rounded-sm justify-center h-[100%] items-end">
                      <Text
                      style={{fontSize:12}}
                          className="text-white font-bold  text-xl">
                          {challenger.name}
                      </Text>
                 </View>
                
                 <TouchableOpacity
                      onPress={isFollowing? handleUnFollowing : handleFollowing}
                      className=" w-[30%]  gap-1 flex-row justify-center h-[100%] items-center">
                        
                          <View
                            className="flex-row items-end justify-center mt-2  h-[100%]">
                                   <Image    
                                    className="w-6 h-6 mt-2"
                                    resizeMode='fill'
                                    source={icons.follow} 
                                    />
                          </View>
                          <View
                            className="flex-row items-end justify-center mt-1 h-[120%]">
                                 <Text className= {isFollowing ? " text-blue-500  text-xs font-bold" : " text-white  text-xs font-bold"}>
                                    {isFollowing ? "Following" : "Follow"}
                                 </Text>
                          </View>
                          <View
                                className="flex-row items-end justify-center mt-1 h-[120%]">
                                <Image    
                                className={isFollowing?"w-6 h-6  rounded-xl":""}
                                resizeMode='contain'
                                source={isFollowing ? icons.check:" "} 
                                />
                          </View>
                </TouchableOpacity> 
        </View>

        
       
         <View className="flex-row w-full gap-4 justify-center items-center"
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
                    {follow.followers_count}
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
                    {follow.followings_count}
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
                    {friends.friends_count}
                </Text>
              </View>
         </View>
    </View>
   </View>
  )
}