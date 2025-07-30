import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { addFollowing, friendRequest, removeFriendRequest, unFollowings } from '../../apiCalls'


export default function FollowButton({userProfile}) {
  const {user,userFriendData,follow,setFollow, notifications} = useGlobalContext()
  
  const [status,setStatus] = useState(null)

  useEffect(() => {
      const getStatus = ()=> {
         if(follow.followings.find(f => f.user_id == userProfile._id)) {
                 setStatus("following")
         }else {
                 setStatus("follow")
         }
      }
      getStatus()
    }
  , [follow])



  const handleFollowing =  ()=> {
    const rawBody = {
      user_id :userProfile._id,
      email:userProfile.email,
      name:userProfile.name,
      profile_img:userProfile.profile_img,
   }
  addFollowing(user._id,rawBody, setFollow)
  }
  
const handleUnFollowing =  ()=> {
    const rawBody = {
      user_id :userProfile._id,
      email:userProfile.email,
      profile_img:userProfile.profile_img,
      name:userProfile.name,
   }
   unFollowings(user._id,rawBody, setFollow)
  }

const handleRequest =() => {
  switch (status) {
    case "follow":
        handleFollowing()
        break;
    case "following":
        handleUnFollowing()
        break;  
    default:
        break;
  }
}

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
                                    source={icons.follow} 
                                  />
                               
                          </View>
                          <View
                          className="flex-row  justify-center mt-1  items-center w-[100%]">
                                <Text className={"text-gray-200  text-base font-semiBold"}>
                                 {status} 
                                </Text>
                          </View>
                          <Image  
                                    className={ "w-6 h-6 absolute top-6 right-6  rounded-xl"}
                                    resizeMode='contain'
                                    source={status =="following"? icons.check_red:""}
                                    />
                        
    </TouchableOpacity>
  )}
  </>
  )
}