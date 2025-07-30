import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { acceptFriendRequest, friendRequest, getNotificationByUser, removeFriendRequest, unfriendRequest } from '../../apiCalls'


export default function FriendButton({userProfile}) {
  const {user,userFriendData,setUserFriendData , notifications ,setNotifications} = useGlobalContext()
  
  const [status,setStatus] = useState(null)
  const [exist,setExist] = useState(null)
  const [expired,setExpired] = useState(null)


  useEffect(() => {
      const getStatus = ()=> {
         if(userFriendData.friends.find(f => f.user_id == userProfile._id )) {
            return setStatus("friend")
         }else {
            if(userFriendData.friend_request_sent.find(f => f.user_id == userProfile._id )){
                return setStatus("pending")
            }else{
                const not = notifications.find(n => n.type === "friend request" && n.content.sender_id === userProfile._id )

                if(not)
                {
                    return setStatus("accept")
                }else{
                    return setStatus("add")
                } 
     
            }
         }
      }
      getStatus()
    }
  , [userFriendData,notifications])


const sendFriendRequest = () => {    
    const rawBody = {
        _id:userProfile._id,
        name:userProfile.name,
        email:userProfile.email,
        profile_img:userProfile.profile_img
    }
    friendRequest(user._id,rawBody,setUserFriendData,setExist)
 }   
const unfriendFriendRequest = () => {
    const rawBody ={
        _id:user._id,
        name:user.name,
        email:user.email,
        profile_img:user.profile_img
      }
  unfriendRequest(userProfile._id,rawBody,setUserFriendData)
}
const okFriendRequest = () => {
  const rawBody ={
    _id:user._id,
    name:user.name,
    email:user.email,
    profile_img:user.profile_img
  }
  acceptFriendRequest(userProfile._id,rawBody,setUserFriendData,setExpired)
}
const cancelFriendRequest = () => {
    const rawBody = {
        _id:userProfile._id,
        name:userProfile.name,
        email:userProfile.email,
        profile_img:userProfile.profile_img
    }
  removeFriendRequest(user._id,rawBody,setUserFriendData)
}

const handleRequest =() => {
  switch (status) {
    case "add":
        sendFriendRequest()
        break;
    case "pending":
        cancelFriendRequest()
        break;  
    case "accept":
        okFriendRequest()
        break;  
    case "friend":
            unfriendFriendRequest()
            break;  
    default:
        break;
  }
}

useEffect(() => {
  if(exist) {
    getNotificationByUser(user._id,setNotifications)
    setExist(false)
  }
}, [exist])
useEffect(() => {
    if(expired) {
      getNotificationByUser(user._id,setNotifications)
      setExpired(false)
    }
  }, [expired])

return (
    <>
    {status && (
    <TouchableOpacity
                            onPress={handleRequest}
                            className=" w-[30%]  gap-2 flex-col  justify-end h-[100%] items-center">
                           
                          <View
                            className="flex-row items-center justify-center gap-1  w-[100%]">
                                 <Image    
                                    className="w-7 h-7"
                                    resizeMode='fill'
                                    source={icons.friend} 
                                  />
                               
                          </View>
                          <View
                          className="flex-row  justify-center mt-1  items-center w-[100%]">
                                <Text className={"text-gray-200  text-base font-semiBold"}>
                                 {status} 
                                </Text>
                          </View>
                          {/* <Image  
                                    className={isFriend?  "w-6 h-6 absolute top-5 right-5  rounded-xl" :
                                              isPending ?  "w-6 h-6 absolute top-5 right-5  rounded-xl": 
                                              isAccept?  "w-6 h-6 absolute top-5 right-5  rounded-xl":""}
                                    resizeMode='contain'
                                    source={isFriend? icons.check : isPending ? icons.pending: isAccept? icons.check_red:""}
                                    /> */}
                        
    </TouchableOpacity>
  )}
  </>
  )
}