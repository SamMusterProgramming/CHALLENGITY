import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function LikeButton({setIsModalVisible,width ,
                                    talentRoom , user ,
                                   postData , 
                                   handleLikePost, selectedContestant
                                }) {

  const scaleAnim = useRef(new Animated.Value(1)).current;
  return (

    <Pressable
    onPress={ handleLikePost   }
    className ="w- [25%] p-3 flex-row-reverse"
      style={{
        alignItems: "center",
        justifyContent: "center", 
        // paddingVertical: 5,
        // paddingHorizontal: 10,
        borderRadius: 5,
        // backgroundColor:postData.likes.find(like => like.liker_id == user._id)?"rgba(173, 216, 230,0.25)":"rgba(255,255,255,0.15)" // "rgba(255,215,0,0.15)",
      }}
    >

      <Animated.View
        className= "justify-center gap-2 items-center"
        style={{
          flexDirection: "col",
          transform: [{ scale: scaleAnim }],
        }}
      >

      
        <FontAwesome name="thumbs-up" size={width/20} color={postData.likes.find(like => like.liker_id == user._id) 
                    ?"lightblue":"white" } />

        <Text
          className ="text-center"
          numberOfLines={1}
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: width/40,
            minWidth:width/12
          }}
        >
              {postData.likes.length}6
        </Text>

      </Animated.View>

     

    </Pressable>

  );
}