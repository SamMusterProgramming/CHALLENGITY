import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { deleteCommentsById, deleteTalentCommentsById, getCommentsByPost } from '../../apiCalls';

export default function Comment({data,post_id,setCommentData,post_user_id,setPostData , user}) {
  // const {user} = useGlobalContext()
  const [comment, setComment] = useState(null);
  

  const deleteComment = ()=>{
        deleteTalentCommentsById(post_id,{comment_id:data._id},setPostData)
    }

//   useEffect(() => {
//     comment && getTalent(post_id,setCommentData)
//   }, [comment])
  

  return (
    <View
        className="w-[100%] p-2 flex-col border border-yellow-600/40 items-start  rounded-lg  b g-[#3c4864] px- 2 py- 1 mb- 2 bg- gap- 2 justify-center "
        >
       <View  
        className="min- w-[100%] mb-2 b g-[#ffffff]  flex-row items-end rounded-t-lg px- py- 1 gap-2  justify-center ">
            <Image
            source={{uri:data.profile_img}}
            className="w-8 h-8 mr- 2 rounded-full"
            resizeMethod='contain'
            />
            <Text
            style={{ color: "#facc15", fontWeight: "bold" }}
            className="text-gray-600 text-xs font-black">  
                {data.commenter_id == user._id ?data.name + "- You":data.name}
            </Text>
          
                   <Text
                    className="text-gray-100 ml-auto text-sm"
                    > 15h
                   </Text>
                   {(data.commenter_id == user._id || post_user_id == user._id) &&  (
                     <TouchableOpacity
                      onPress={deleteComment}
                     >
                     <Text
                        className="text-gray-100 font-bold text-sm"
                        > Delete
                     </Text>
                  </TouchableOpacity>
                   )}
                  <TouchableOpacity>
                     <Text
                        className="text-gray-100 font-bold text-sm"
                        > Like
                     </Text>
                  </TouchableOpacity>
                  {data.commenter_id !== user._id && (
                  <TouchableOpacity>
                     <Text
                        className=" text-gray-100 font-bold text-sm"
                        > Replay
                     </Text>
                  </TouchableOpacity>
                  )}
          
        </View>
        <View
         className=" w-[100%] px-2 flex-col bg-[rgba(255,255,255,0.15)] py-2 justify-start rounded-lg flex-1 ">
            <View
              className=" b g-[#f9f5f5]  px-1 py-2 flex-col justify-start w-[100%] rounded-md ">
        
                <Text
                    style={{ color: "#d4d4d8" }} 
                    className="text-primary  px-2 text-sm font-base"
                    >{data.comment.length < 150 ? data.comment : data.comment.slice(0,450)+"...more"}
                </Text>
            </View>
        </View>
       
    </View>
    
//     <View className="w-full p-2 border border-yellow-600/40 rounded-lg mb-2">

//   <View className="flex-row items-center gap-2 mb-2">

//     <Image
//       source={{ uri: data.profile_img }}
//       className="w-8 h-8 rounded-full"
//     />

//     <Text style={{ color: "#facc15", fontWeight: "bold" }}>
//       {data.commenter_id == user._id ? data.name + " - You" : data.name}
//     </Text>

//     <Text className="ml-auto text-gray-400 text-xs">
//       15h
//     </Text>

//     {(data.commenter_id == user._id || post_user_id == user._id) && (
//       <TouchableOpacity onPress={deleteComment}>
//         <Text className="text-gray-300 font-bold text-xs">
//           Delete
//         </Text>
//       </TouchableOpacity>
//     )}

//   </View>

//   <View className="bg-white/10 rounded-lg p-2">

//     <Text style={{ color: "#d4d4d8" }}>
//       {data.comment.length > 150
//         ? data.comment.slice(0,150) + "...more"
//         : data.comment}
//     </Text>

//   </View>

// </View>
  )
}