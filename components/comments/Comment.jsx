
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