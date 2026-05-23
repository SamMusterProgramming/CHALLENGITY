// import { View, Text, Image, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../../context/GlobalProvider'
// import { deleteCommentsById, deleteTalentCommentsById, getCommentsByPost } from '../../apiCalls';

// export default function Comment({data,post_id,setCommentData,post_user_id,setPostData , user}) {
//   const [comment, setComment] = useState(null);
//   const deleteComment = ()=>{
//         deleteTalentCommentsById(post_id,{comment_id:data._id},setPostData)
//     }
//   return (
//     <View
//         className="w-[100%] p-2 flex-col border border-yellow-600/40 items-start  rounded-lg  b g-[#3c4864] px- 2 py- 1 mb- 2 bg- gap- 2 justify-center "
//         >
//        <View  
//         className="min- w-[100%] mb-2 b g-[#ffffff]  flex-row items-end rounded-t-lg px- py- 1 gap-2  justify-center ">
//             <Image
//             source={{uri:data.profile_img}}
//             className="w-8 h-8 mr- 2 rounded-full"
//             resizeMethod='contain'
//             />
//             <Text
//             style={{ color: "#facc15", fontWeight: "bold" }}
//             className="text-gray-600 text-xs font-black">  
//                 {data.commenter_id == user._id ?data.name + "- You":data.name}
//             </Text>
          
//                    <Text
//                     className="text-gray-100 ml-auto text-sm"
//                     > 15h
//                    </Text>
//                    {(data.commenter_id == user._id || post_user_id == user._id) &&  (
//                      <TouchableOpacity
//                       onPress={deleteComment}
//                      >
//                      <Text
//                         className="text-gray-100 font-bold text-sm"
//                         > Delete
//                      </Text>
//                   </TouchableOpacity>
//                    )}
//                   <TouchableOpacity>
//                      <Text
//                         className="text-gray-100 font-bold text-sm"
//                         > Like
//                      </Text>
//                   </TouchableOpacity>
//                   {data.commenter_id !== user._id && (
//                   <TouchableOpacity>
//                      <Text
//                         className=" text-gray-100 font-bold text-sm"
//                         > Replay
//                      </Text>
//                   </TouchableOpacity>
//                   )}
          
//         </View>
//         <View
//          className=" w-[100%] px-2 flex-col bg-[rgba(255,255,255,0.15)] py-2 justify-start rounded-lg flex-1 ">
//             <View
//               className=" b g-[#f9f5f5]  px-1 py-2 flex-col justify-start w-[100%] rounded-md ">
        
//                 <Text
//                     style={{ color: "#d4d4d8" }} 
//                     className="text-primary  px-2 text-sm font-base"
//                     >{data.comment.length < 150 ? data.comment : data.comment.slice(0,450)+"...more"}
//                 </Text>
//             </View>
//         </View>
       
//     </View>
    

//   )
// }

import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { deleteCommentsById, deleteTalentCommentsById, getCommentsByPost } from '../../apiCalls';

export default function Comment({data,post_id,setCommentData,post_user_id,setPostData , user}) {

  const [comment, setComment] = useState(null);
  const { width, height } = useWindowDimensions();

  const deleteComment = ()=>{
    deleteTalentCommentsById(
      post_id,
      { comment_id:data._id },
      setPostData
    )
  }

  return (



      <View
        className=" items-start justify-start  flex-row flex- 1  bg-[#f6fcff] px- 2 mb-3 "
        style={{
          // width:width ,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.06)",
          overflow: "hidden",
          shadowColor: "#000",
          shadowOpacity: 0.28,
          shadowRadius: 14,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          elevation: 1,
        }}
      >
         
          <View
            className="flex-col justify-start items-center pt-2 p- 1 flex- 1"
            style={{
              width:width/7,
              // backgroundColor: "rgba(255,255,255,0.02)",
            }} >
                <Image
                 style={{
                  width:width/9,
                  height:width/9,
                  // backgroundColor: "rgba(255,255,255,0.02)",
                   }}
                  source={{ uri:data.profile_img }}
                  className="w-12 h-12 rounded-full"
                  resizeMethod='contain'
                />
          </View>
          

          <View
            className="flex-col  justify-start flex- 1 items-center  py-1"
            style={{
              width:width-width/7,
              backgroundColor: "rgba(255,255,255,0.02)",
            }} >

              <View
                className="flex-row w-[100%] flex-1 justify-start items-center gap-2 py-1"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                }} >
                  <View className="ml- 3 ">
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "800",
                        fontSize: width/36,
                        letterSpacing: 0.2,
                      }}
                    >
                      {data.commenter_id == user._id
                        ? data.name + " • You"
                        : data.name}
                    </Text>

                  </View>

                  <Text
                    style={{
                      color: "#71717a",
                      fontSize: 10,
                      marginRight: 8,
                    }}
                  >
                    15h
                  </Text>

              </View>

              <View
                className="px- 1 2 p-1 w-[100%] justify-start  flex-1 rounded- md bg-[white]"  >
                <Text
                  style={{
                    fontSize: width/30,
                    lineHeight: 20,
                    fontWeight: "400",
                  }}
                >
                  {
                    data.comment.length < 150
                      ? data.comment
                      : data.comment.slice(0,450) + "...more"
                  }
                </Text>
              </View>

       
              <View
                className="flex-row w-[100%] gap-2 flex-1 items-center px- 2 py-2"
                style={{
        
                }} >

                {/* <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                  
                  }}  >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontSize: width/45,
                    }}
                  >
                    Reply
                  </Text>
                </TouchableOpacity> */}

                {data.commenter_id !== user._id && (
                    <TouchableOpacity
                    activeOpacity={0.8}
                    style={{

                    }}  >
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: width/42,
                      }}
                    >
                      Reply
                    </Text>
                    </TouchableOpacity>
                )}

                {(data.commenter_id == user._id || post_user_id == user._id) && (
                   <TouchableOpacity
                   onPress={() => deleteComment()}
                   activeOpacity={0.8}
                   style={{

                   }}  >
                   <Text
                     style={{
                       color: "black",
                       fontWeight: "700",
                       fontSize: width/42,
                     }}
                   >
                     Delete
                   </Text>
                   </TouchableOpacity>
                )}

              </View>


          </View>

      </View>

  )
}