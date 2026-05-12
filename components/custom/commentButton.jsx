import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CommentButton({setIsModalVisible,width ,
                                    talentRoom , user ,
                                   postData , 
                                   openComments
                                }) {

  const scaleAnim = useRef(new Animated.Value(1)).current;
  return (

    <Pressable
    onPress={openComments}
      className ="w- [25%] p-3"
      style={{
        alignItems: "center",
        justifyContent: "center", 
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        // backgroundColor:postData.comments.find(c => c.commenter_id == user._id)?"rgba(255, 213, 128,0.15)":"rgba(255,255,255,0.15)" // "rgba(255,215,0,0.15)",
      }}
    >

      <Animated.View
        className= "justify-start gap-2 items-center"
        style={{
          flexDirection: "col",
          transform: [{ scale: scaleAnim }],
        }}
      >

        {/* <MaterialCommunityIcons
          name="trophy"
          size={width/18}
          color={postData.votes.find(vote => vote.voter_id == user._id)? "gold":"white"}
        /> */}
        <Ionicons  name = "chatbubble" size={width/20} color={postData.comments.find(c => c.commenter_id == user._id) 
                    ?"orange":"white" } />


        <Text
        className ="text-center"
          style={{
            color: "white",
            // marginLeft: 6,
            fontWeight: "700",
            fontSize: width/40,
            minWidth:width/12

          }}
        >
            {postData.comments.length}
        </Text>

      </Animated.View>

      {/* <Text
        style={{
          color:postData.likes.find(like => like.liker_id == user._id)? "white":"white",
          fontSize: width/47,
          marginTop: 5,
          fontWeight: "700",
        }}
      >
        {postData.comments.find(c => c.commenter_id == user._id)? "Feed" : "Feed"}
   
      </Text> */}

    </Pressable>

  );
}