

import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { addFollowing, friendRequest, removeFriendRequest, unFollowings } from '../../apiCalls'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function FollowButton({ userProfile }) {
  const { user,  follow, setFollow, notifications } = useGlobalContext()

  const [status, setStatus] = useState(null)
  const { width, height } = useWindowDimensions();


  useEffect(() => {

    const getStatus = () => {
      if (follow.followings.find(f => f._id == userProfile._id)) {
        setStatus("Following")
      } else {
        setStatus("Follow")
      }
    }
    getStatus()
  }, [follow])

  const handleFollowing = () => {
    const rawBody = {   
      user_id : userProfile._id, 
     
    }
    addFollowing(user._id, rawBody, setFollow)
  }

  const handleUnFollowing = () => {
    const rawBody = {
      user_id: userProfile._id,
   
    }
    unFollowings(user._id, rawBody, setFollow)
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
      {status && (
        <TouchableOpacity
          onPress={handleRequest}
          activeOpacity={0.92}
          className="items-end"
          style={{
            height: 42,
            paddingHorizontal: 18,
            borderRadius: 14,
  
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
  
            // backgroundColor:
            //   status === "Follow"
            //     ? "#eab308"
            //     : "rgba(255,255,255,0.04)",
  
            // borderWidth: 1,
            // borderColor:
            //   status === "Follow"
            //     ? "#f4d44d"
            //     : "rgba(234,179,8,0.25)",
  
            shadowColor:
              status === "Follow"
                ? "#eab308"
                : "#000",
  
            shadowOpacity:
              status === "Follow"
                ? 0.28
                : 0.15,
  
            shadowRadius: 12,
            elevation: status === "Follow" ? 6 : 2,
          }}
        >
          <MaterialCommunityIcons
            name={
              status === "Follow"
                ? "account-plus-outline"
                : "account-check-outline"
            }
            size={20}
            color={
              status === "Follow"
                ? "#eab308"
                : "#eab308"
            }
          />
  
          <Text
            style={{
              marginLeft: 8,
              fontSize: width / 32,
              fontWeight: "700",
              letterSpacing: 0.4,
              color:
                status === "Follow"
                  ? "#eab308"
                  : "#eab308",
            }}
          >
            {status}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}