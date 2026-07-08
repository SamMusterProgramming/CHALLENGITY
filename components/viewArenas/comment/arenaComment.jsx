
// import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
// import React, { useState } from 'react'



// export default function ArenaComment({comment ,post_id, setCommentData, post_user_id, setPostData , user}) {

// //   const [comment, setComment] = useState(null);
//   const { width, height } = useWindowDimensions();



//   const deleteComment = ()=>{
//     deleteTalentCommentsById(
//       post_id,
//       { comment_id:comment._id },
//       setPostData
//     )
//   }

//   return (
//       <View
//         className=" items-start justify-start  flex-row flex- 1  bg-[#f6fcff] px- 2 mb-3 "
//         style={{
//           // width:width ,
//           borderRadius: 5,
//           borderWidth: 1,
//           borderColor: "rgba(255,255,255,0.06)",
//           overflow: "hidden",
//           shadowColor: "#000",
//           shadowOpacity: 0.28,
//           shadowRadius: 14,
//           shadowOffset: {
//             width: 0,
//             height: 5,
//           },
//           elevation: 1,
//         }}
//       >
         
//           <View
//             className="flex-col justify-start items-center pt-2 p- 1 flex- 1"
//             style={{
//               width:width/7,
//               // backgroundColor: "rgba(255,255,255,0.02)",
//             }} >
//                 <Image
//                  style={{
//                   width:width/9,
//                   height:width/9,
//                   // backgroundColor: "rgba(255,255,255,0.02)",
//                    }}
//                   source={{ uri:comment.user.profileImage.publicUrl }}
//                   className="w-12 h-12 rounded-full"
//                   resizeMethod='contain'
//                 />
//           </View>
          

//           <View
//             className="flex-col  justify-start flex- 1 items-center  py-1"
//             style={{
//               width:width-width/7,
//               backgroundColor: "rgba(255,255,255,0.02)",
//             }} >

//               <View
//                 className="flex-row w-[100%] flex-1 justify-start items-center gap-2 py-1"
//                 style={{
//                   backgroundColor: "rgba(255,255,255,0.02)",
//                 }} >
//                   <View className="ml- 3 ">
//                     <Text
//                       style={{
//                         color: "#000000",
//                         fontWeight: "800",
//                         fontSize: width/36,
//                         letterSpacing: 0.2,
//                       }}
//                     >
//                       {comment.user_id == user._id
//                         ? comment.user.name + " • You"
//                         : comment.user.name}
//                     </Text>

//                   </View>

//                   <Text
//                     style={{
//                       color: "#71717a",
//                       fontSize: 10,
//                       marginRight: 8,
//                     }}
//                   >
//                     15h
//                   </Text>

//               </View>

//               <View
//                 className="px- 1 2 p-1 w-[100%] justify-start  flex-1 rounded- md bg-[white]"  >
//                 <Text
//                   style={{
//                     fontSize: width/30,
//                     lineHeight: 20,
//                     fontWeight: "400",
//                   }}
//                 >
//                   {
//                       comment.text.length < 150
//                       ? comment.text
//                       : comment.text.slice(0,450) + "...more"
//                   }
//                 </Text>
//               </View>

       
//               <View
//                 className="flex-row w-[100%] gap-2 flex-1 items-center px- 2 py-2"
//                 style={{
        
//                 }} >

//                 {comment.user._id !== user._id && (
//                     <TouchableOpacity
//                     activeOpacity={0.8}
//                     style={{

//                     }}  >
//                     <Text
//                       style={{
//                         color: "black",
//                         fontWeight: "700",
//                         fontSize: width/42,
//                       }}
//                     >
//                       Reply
//                     </Text>
//                     </TouchableOpacity>
//                 )}

//                 {(comment.user._id == user._id
//                 //  || post.user_id == user._id
//                 ) && (
//                    <TouchableOpacity
//                    onPress={() => deleteComment()}
//                    activeOpacity={0.8}
//                    style={{

//                    }}  >
//                    <Text
//                      style={{
//                        color: "black",
//                        fontWeight: "700",
//                        fontSize: width/42,
//                      }}
//                    >
//                      Delete
//                    </Text>
//                    </TouchableOpacity>
//                 )}

//               </View>


//           </View>

//       </View>

//   )
// }

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getTimeLapse } from "../../../helper";

export default function ArenaComment({
  comment,
  post_id,
  setCommentData,
  post_user_id,
  setPostData,
  user,
  deleteComment
}) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginHorizontal: 14,
        marginBottom: 12,
        paddingVertical:12,
        paddingHorizontal:16,
      }}
    >
      {/* Avatar */}

      <Image
        source={{
          uri: comment.user.profileImage.publicUrl,
        }}
        style={{
          width:width/10.8,
          height:width/10.8,
          borderRadius:999,
      
        }}
      />

      {/* Right Side */}

      <View
        style={{
          flex: 1,
          marginLeft: 14,
        }}
      >
        {/* Header */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize:width/32,
              fontWeight:"700",
            }}
          >
            {comment.user.username}

            {comment.user._id === user._id && (
              <Text
                style={{
                  color: "#eab308",
                }}
              >
                {" "}
                • You
              </Text>
            )}
          </Text>

          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 99,
              backgroundColor: "#666",
              marginHorizontal: 8,
            }}
            className = "ml-auto"
          />

          <Text
            style={{
              color: "#7c7c7c",
              fontSize: width / 34,
            }}
          >
            {getTimeLapse(comment.createdAt)}
          </Text>
        </View>

        {/* Comment */}

        <Text
          style={{
            color: "#E8E8E8",
            fontSize:width/31,
            lineHeight:20,
            marginTop:4,
          }}
        >
          {comment.text}
        </Text>

        {/* Footer */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 14,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 22,
            }}
          >
            <MaterialCommunityIcons
              name="thumb-up-outline"
              size={16}
              color="#8b8b8b"
            />

            <Text
              style={{
              
                marginLeft: 6,
                color:"#8A8A8A",
                fontSize:width/35,
                fontWeight:"600",
              }}
            >
              {comment.likeCount}
            </Text>
          </TouchableOpacity>

          {/* {comment.user._id !== user._id && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginRight: 20,
              }}
            >
              <Text
                style={{
                  color: "#eab308",
                  fontWeight: "700",
                  fontSize: width / 34,
                }}
              >
                Reply
              </Text>
            </TouchableOpacity>
          )} */}

          {(comment.user._id === user._id ||
            post_user_id === user._id) && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => deleteComment({
                                           commentId : comment._id ,
                                            postId:post_id
                                          })}
            >
              <Text
                style={{
                  color: "#ef4444",
                  fontWeight: "600",
                  fontSize: width / 35,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}