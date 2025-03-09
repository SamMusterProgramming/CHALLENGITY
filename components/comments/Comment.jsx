import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { deleteCommentsById, getCommentsByPost } from '../../apiCalls';

export default function Comment({data,post_id,setCommentData,post_user_id}) {
  const {user} = useGlobalContext()
  const [comment, setComment] = useState(null);
  

  const deleteComment = ()=>{
    console.log(data._id)
        deleteCommentsById(post_id,{comment_id:data._id},setComment)
    }

  useEffect(() => {
    comment && getCommentsByPost(post_id,setCommentData)
  }, [comment])
  



  return (
    <View
        className="w-[98vw]  flex-row mt-0 items-start px-2 py-1 gap-2 justify-start "
        >
        <Image
        source={{uri:data.profile_img}}
        className="w-10 h-10 rounded-full"
        resizeMethod='contain'
        />
        <View
         className=" flex-col justify-start min-w-[88%]  ">
            <View
              className=" bg-gray-200 px-1 py-2 flex-col justify-start w-[96%] rounded-xl ">
                <Text
                    className="text-primary text-sm font-black"
                    >   {data.commenter_id == user._id ?data.name + "- You":data.name}</Text>
                <Text
                    className="text-primary  px-2 text-sm font-semibold "
                    >{data.comment.length < 150 ? data.comment : data.comment.slice(0,450)+"...more"}
                </Text>
            </View>
            <View
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
                        className="text-primary font-bold text-sm"
                        > Delete
                     </Text>
                  </TouchableOpacity>
                   )}
                  <TouchableOpacity>
                     <Text
                        className="text-primary font-bold text-sm"
                        > Like
                     </Text>
                  </TouchableOpacity>
                  {data.commenter_id !== user._id && (
                  <TouchableOpacity>
                     <Text
                        className="text-primary font-bold text-sm"
                        > Replay
                     </Text>
                  </TouchableOpacity>
                  )}
            </View>
            
        </View>
       
    </View>
  )
}