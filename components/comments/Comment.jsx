import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { deleteCommentsById, deleteTalentCommentsById, getCommentsByPost } from '../../apiCalls';

export default function Comment({data,post_id,setCommentData,post_user_id,setPostData}) {
  const {user} = useGlobalContext()
  const [comment, setComment] = useState(null);
  

  const deleteComment = ()=>{
        deleteTalentCommentsById(post_id,{comment_id:data._id},setPostData)
    }

//   useEffect(() => {
//     comment && getTalent(post_id,setCommentData)
//   }, [comment])
  

  return (
    <View
        className="min-w-[100%]  flex-col mt-0 items-start bg-[#ffffff] rounded-lg  b g-[#3c4864] px-2 py-1 mb-2 bg- gap- 2 justify-center "
        >
       <View
        className="min- w-full pr- 24 bg-[#ffffff]  flex-row items-end rounded-t-lg px-3 py-1 gap-2  justify-center ">
            <Image
            source={{uri:data.profile_img}}
            className="w-10 h-10 mr- 2 rounded-full"
            resizeMethod='contain'
            />
            <Text
            className="text-gray-600 text-xs font-black">  
                {data.commenter_id == user._id ?data.name + "- You":data.name}
            </Text>
            {/* <View
              className="px-2 flex-1 ml-auto flex-row justify-end item-end b g-[#06132b] gap-2  "> */}
                   <Text
                    className="text-gray-800 ml-auto text-xm"
                    > 15h
                   </Text>
                   {(data.commenter_id == user._id || post_user_id == user._id) &&  (
                     <TouchableOpacity
                      onPress={deleteComment}
                     >
                     <Text
                        className="text-gray-800 font-bold text-sm"
                        > Delete
                     </Text>
                  </TouchableOpacity>
                   )}
                  <TouchableOpacity>
                     <Text
                        className="text-gray-800 font-bold text-sm"
                        > Like
                     </Text>
                  </TouchableOpacity>
                  {data.commenter_id !== user._id && (
                  <TouchableOpacity>
                     <Text
                        className=" text-gray-800 font-bold text-sm"
                        > Replay
                     </Text>
                  </TouchableOpacity>
                  )}
            {/* </View> */}
        </View>
        <View
         className=" w-[100%] px-2 flex-col bg-[#ffffff] py-2 justify-start rounded-b-lg flex-1 ">
            <View
              className=" bg-[#f9f5f5]  px-1 py-2 flex-col justify-start w-[100%] rounded-md ">
                <Text
                style={{fontSize:9}}
                    className="text-primary text-xs mb-2 font-bold"
                    >   {data.commenter_id == user._id ?data.name + "- You":data.name}</Text>
                <Text
                    className="text-primary  px-2 text-sm font-base"
                    >{data.comment.length < 150 ? data.comment : data.comment.slice(0,450)+"...more"}
                </Text>
            </View>
        </View>
       
    </View>
  )
}