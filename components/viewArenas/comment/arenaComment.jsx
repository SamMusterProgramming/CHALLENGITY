

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