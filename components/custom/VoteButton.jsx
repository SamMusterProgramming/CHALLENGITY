import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function VoteButton({setIsModalVisible,width ,
                                   voteTimeLaps , talentRoom , user ,
                                   postData , setAction,setText,
                                   voterEntry, selectedContestant
                                }) {

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleVote = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.4,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (

    <Pressable
    onPress={
        ()=> {
           handleVote()
           setTimeout(() => {
            setIsModalVisible(true);  
           }, 1000);
           
           if(voteTimeLaps < 0 || !talentRoom.contestants.find(c =>c._id == postData.post_id)){
              setAction("OK")
              setText(!talentRoom.contestants.find(c =>c._id == postData.post_id)?"this post is still in queue , can't vote , just yet !!!":
                         "you've just casted your vote , you can't edit your vote at this time wait 24h")
              return false
           }
           else{
           setAction("VT");
           setText(
              !voterEntry? `Are you sure you want to cast your vote for ${selectedContestant.name}`:
              voterEntry.post_id == selectedContestant._id ?
              `Are you sure you want to remove your vote   for ${selectedContestant.name}` :
              `You 've previously cast your vote for ${voterEntry.name}. Would you like to change your vote to ${selectedContestant.name}?`
            );
           }
        }
        
     }
      className =""
      style={{
        alignItems: "center",
        justifyContent: "center", 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor:postData.votes.find(vote => vote.voter_id == user._id)?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.15)" // "rgba(255,215,0,0.15)",
      }}
    >

      <Animated.View
        className= "justify-center items- end"
        style={{
          flexDirection: "row",
          transform: [{ scale: scaleAnim }],
        }}
      >

        <MaterialCommunityIcons
          name="trophy"
          size={width/24}
          color={postData.votes.find(vote => vote.voter_id == user._id)? "gold":"white"}
        />

        <Text
        className ="border-b border-white"
          style={{
            color: "white",
            marginLeft: 6,
            fontWeight: "700",
            fontSize: width/35,
          }}
        >
              {postData.votes.length} 
        </Text>

      </Animated.View>

      <Text
        style={{
          color:postData.votes.find(vote => vote.voter_id == user._id)? "#FFD700":"white",
          fontSize: width/37,
          marginTop: 5,
          fontWeight: "700",
        }}
      >
        {postData.votes.find(vote => vote.voter_id == user._id)? "Voted" : "Vote"}
      </Text>

    </Pressable>

  );
}