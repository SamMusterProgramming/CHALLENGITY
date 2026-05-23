import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ShareButton({setIsModalVisible,width , height,
                                    talentRoom , user ,
                                   postData , 
                                }) {

  const scaleAnim = useRef(new Animated.Value(1)).current;
  return (

    <Pressable
    // onPress={ handleLikePost   }
    className ="w- [25%] rounded-full"
      style={{
        alignItems: "center",
        justifyContent: "center", 
        // paddingVertical: 5,
        // paddingHorizontal: 10,
        height :height/16 ,
        width :height/16 ,
        // backgroundColor:"rgba(255,255,255,0.15)" 
      }}
    >

      <Animated.View
        className= "justify-center gap-2 items-center"
        style={{
          flexDirection: "col",
          transform: [{ scale: scaleAnim }],
        }}
      >

      
        <FontAwesome name="share" size={width/20} color={"white"} />

        <Text
          className ="text-center"
          numberOfLines={1}
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: width/44,
            minWidth:width/12
          }}  >
             112
        </Text>

      </Animated.View>

     

    </Pressable>

  );
}