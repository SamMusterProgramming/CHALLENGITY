import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ReportButton({  setIsModalVisible,width ,
                                        user ,
                                        postData , setAction,setText,
                                        handleLikePost, selectedContestant
                                }) {

  const scaleAnim = useRef(new Animated.Value(1)).current;
  return (

    <Pressable
    onPress={ ()=> {
        setIsModalVisible(true)
        setAction("FL")
        setText(
           ! postData.flags.find(flag => flag.flagger_id == user._id)?
           `Are you sure you want to flag  ${selectedContestant.name} 's post` 
           :`Are you sure you want to unflag  ${selectedContestant.name} 's post ` )
     }}
    className ="min- w-[30%] "
      style={{
        alignItems: "center",
        justifyContent: "center", 
        paddingVertical: 10,
        // paddingHorizontal: 10,
        borderRadius: 5,
        // backgroundColor:postData.flags.find(flag => flag.flagger_id == user._id)?"rgba(250, 160, 160,0.25)":"rgba(255,255,255,0.15)" // "rgba(255,215,0,0.15)",
      }}
    >

      <Animated.View
        className= "justify-start items- end"
        style={{
          flexDirection: "row",
          transform: [{ scale: scaleAnim }],
        }}
      >

          {!postData.flags.find(flag => flag.flagger_id == user._id) && (  
                                       <Ionicons name="flag" size={width/25} color="white" />
                                    )}
          {postData.flags.find(flag => flag.flagger_id == user._id) && (
                                       <Ionicons name="flag" size={width/25} color="red" />
                                    )}


        <Text
        className ="border-b border-white"
          style={{
            color: "white",
            marginLeft: 6,
            fontWeight: "700",
            fontSize: width/35,
          }}
        >
              x 
        </Text>

      </Animated.View>

      <Text
        style={{
          color:postData.likes.find(like => like.liker_id == user._id)? "white":"white",
          fontSize: width/37,
          marginTop: 5,
          fontWeight: "700",
        }}
      >
        {postData.flags.find(flag => flag.flagger_id == user._id)? "Flagged" : "Flag"}
      </Text>

    </Pressable>

  );
}