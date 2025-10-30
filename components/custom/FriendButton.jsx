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
  // const [userProfileFriendData,setUserProfileFriendData] = useState(null)


  // useEffect(() => {
    
  // }, [])
  

  useEffect(() => {
      const getStatus = ()=> {
         if(userFriendData.friends.find(f => f.user_id == userProfile._id )) {
            return setStatus("Friend")
         }else {
            if(userFriendData.friend_request_sent.find(f => f.user_id == userProfile._id )){
                return setStatus("Request is pending")
            }else{
                const not = notifications.find(n => n.type === "friend request" && n.content.sender_id === userProfile._id )

                if(not)
                {
                    return setStatus("Accept request")
                }else{
                    return setStatus("Add Friend")
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
    case "Add Friend":
        sendFriendRequest()
        break;
    case "Request is pending":
        cancelFriendRequest()
        break;  
    case "Accept request":
        okFriendRequest()
        break;  
    case "Friend":
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
                            className=" flex-row rounded-lg gap-4 justify-start py-2 px-8 ml-auto bg-gray-200 items-center">
                           
                          {/* <View
                            className="flex-row items-center justify-center gap-1  w- [100%]">
                                 <Image    
                                    className="w-4 h-4"
                                    resizeMode='fill'
                                    source={icons.friend} 
                                  />
                               
                          </View> */}
                            {status === "Friend" && (
                              <Image  
                                    className={ "w-4 h-4 "  }
                                    resizeMode='contain'
                                    source={icons.check_red }
                                    />
                          )}
                          <View
                          className="flex-row  justify-center   items-center ">
                                <Text 
                                style={{fontSize:12 ,
                                  color: status === "Friend" && "red"
                                }}
                                
                                className={"text-gray-600   font-bold"}>
                                 {status} 
                                </Text>
                          </View>
                        
                        
    </TouchableOpacity>
  )}
  </>
  )
}