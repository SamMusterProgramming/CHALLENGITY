

import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { addFollowing, friendRequest, removeFriendRequest, unFollowings } from '../../apiCalls'

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
          activeOpacity={0.85}
          className={`flex-row items-center rounded-xl gap-2 px-4 py-2`}
          style={{
            // paddingVertical: 10,
            // paddingHorizontal: 22,
            // borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
            backgroundColor:
              status === "Following"
                ? "rgba(5,5,155,0.06)"
                : "#E6C068",

            borderWidth: status === "Following" ? 1 : 0,
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          {/* ICON */}
          {/* {status === "Following" && (
            <Image
              source={icons.check}
              resizeMode="contain"
              style={{
                width: 14,
                height: 14,
                opacity: 0.9,
              }}
            />
          )} */}

          {/* TEXT */}
          <Text
            style={{
              fontSize: width/44,
              fontWeight: "600",
              letterSpacing: 1,

              color:
                status === "Following"
                  ? "#E5E7EB"
                  : "#0A0B0D",
            }}
          >
            {status}
          </Text>
        </TouchableOpacity>
      )}
    </>
  )
}