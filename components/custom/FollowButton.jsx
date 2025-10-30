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
                 setStatus("Following")
         }else {
                 setStatus("Follow")
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
    case "Follow":
        handleFollowing()
        break;
    case "Following":
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
                            className=" flex-row rounded-lg gap-4 justify-start py-2 px-8 bg-gray-200 items-center">
                          {/* <View
                            className="flex-row items-start justify-center gap- 1  w- [100%]">
                                 <Image    
                                    className="w-4 h-4"
                                    resizeMode='contain'
                                    source={icons.follow} 
                                  />
                          </View> */}
                          {status =="Following" && (
                              <Image  
                                        className={ "w-4 h-4   rounded-xl"}
                                        resizeMode='contain'
                                        source={ icons.check}
                              />
                            )}
                          <View
                          className="flex-row  justify-center  items-end h-[100%]">
                                <Text
                                 style={{fontSize:12}}
                                 className={"text-black  font-bold"}>
                                    {status} 
                                </Text>
                          </View>
                         
                          
    </TouchableOpacity>
  )}
  </>
  )
}