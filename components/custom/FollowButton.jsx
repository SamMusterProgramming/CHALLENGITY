

import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
// import { addFollowing, friendRequest, removeFriendRequest, unFollowings } from '../../apiCalls'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { addFollowing, getFollowshipStatus, unFollowings } from '../../apiCalls/user'

export default function FollowButton({ userProfile }) {
  const { user,  userFollowers, setUserFollowers, userFollowings,
         setUserFollowings, notifications } = useGlobalContext()

  const [status, setStatus] = useState(null)
  const { width, height } = useWindowDimensions();


  // useEffect(() => {

  //   const getStatus = () => {     
  //     console.log(userFollowings.users)
  //     if (userFollowings.users.find(f => f._id === userProfile._id)) {
  //       setStatus("Following") 
  //     } else { 
  //       setStatus("Follow")
  //     }
  //   }
  //   getStatus()
  // }, [userFollowings])

  const loadStatus = async () => {
    try {
      const result = await getFollowshipStatus(
        user._id,
        userProfile._id
      );

      setStatus(result?.status || "Follow");
    } catch (error) {
      console.error("FriendButton status error:", error);
      setStatus("Follow");
    }
  };

  useEffect(() => {
    if (!user?._id || !userProfile?._id) return;
    loadStatus();
  }, [user?._id, userProfile?._id]);

  const handleFollowing = async() => {
    await addFollowing(user._id, userProfile._id, setUserFollowings)
    setStatus("Following")
  }

  const handleUnFollowing = async() => {
    await unFollowings(user._id, userProfile._id, setUserFollowings)
    setStatus("Follow")
  }

  const handleRequest = () => {
    switch (status) {
      case "Follow":
        handleFollowing()
        break;
      case "Following":
        handleUnFollowing()
        break;
      default:
        break;
    }
  }

  return (
    <>
      {/* {status && ( */}
        <TouchableOpacity
          onPress={handleRequest}
          activeOpacity={0.82}
          style={{
            // paddingHorizontal: 18,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor:
              status === "Follow"
                ? "#B69A55"
                : "rgba(255,255,255,0.12)",
            backgroundColor:
              status === "Follow"
                ? "#D2BC7A"
                : "#171819",
          }}
          className="px- 8 2 flex-1"
        >
          <MaterialCommunityIcons
            name={
              status === "Follow"
                ? "account-plus-outline"
                : "account-check-outline"
            }
            size={19}
            color={
              status === "Follow"
                ? "#171715"
                : "#C7B477"
            }
          />
  
          <Text
            style={{
              marginLeft: 8,
              fontSize: width / 36,
              fontWeight: "600",
              letterSpacing: 0.25,
              color:
                status === "Follow"
                  ? "#171715"
                  : "#E4E0D5",
            }}
          >
            {status === "Follow" ? "Follow" : "Following"}
          </Text>
        </TouchableOpacity>
      {/* )} */}
    </>
  );
}