import { View, Text, Image } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'

export default function WelcomeComment() {
    const {user} = useGlobalContext()

    return (
      <View
      className="w-[100vw]  flex-row mt-0 items-start px-2 py-1 gap-2 justify-start "
      >
          <Image
          source={{uri:user.profile_img}}
          className="w-10 h-10 rounded-full"
          resizeMethod='contain'
          />
          <View
           className=" flex-col justify-start min-w-[88%]  ">
              <View
              className=" bg-gray-200 px-1 py-2 flex-col justify-start w-[96%] rounded-lg ">
                  <Text
                      className="text-primary text-sm mb-2 font-black"
                      >   {user.name}</Text>
                  <Text
                      className="text-primary px-2 text-sm font-base"
                      >be The first one to comment 
                  </Text>
              </View>
          {/* <View
            className="px-2 py-1 flex-row justify-start gap-2 w-[96%] rounded-xl ">
                 <Text
                  className="text-primary text-sm"
                  > 15h
                 </Text>
                 {(data.commenter_id == user._id || post_user_id == user._id) &&  (
                   <TouchableOpacity
                    onPress={deleteComment}
                   >
                   <Text
                      className="text-primary font-mbold text-sm"
                      > Delete
                   </Text>
                </TouchableOpacity>
                 )}
                <TouchableOpacity>
                   <Text
                      className="text-primary font-mbold text-sm"
                      > Like
                   </Text>
                </TouchableOpacity>
                {data.commenter_id !== user._id && (
                <TouchableOpacity>
                   <Text
                      className="text-primary font-semibold text-sm"
                      > Replay
                   </Text>
                </TouchableOpacity>
                )}
          </View> */}
          
      </View>
     
  </View>
    )
}