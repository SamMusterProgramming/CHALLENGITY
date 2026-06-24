

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
        // <TouchableOpacity
        //   onPress={handleRequest}
        //   activeOpacity={0.85}
        //   style={{
        //     width: "100%",
        //     height: 44,
        //     borderRadius: 12,
        //     justifyContent: "center",
        //     alignItems: "center",
        //     backgroundColor: "#131313",
        //     borderWidth: 1,
        //     borderColor:
        //       status === "Follow"
        //         ? "rgba(234,179,8,0.35)"
        //         : "rgba(255,255,255,0.08)",
        //   }}
        // >
        //   <View
        //     style={{
        //       flexDirection: "row",
        //       alignItems: "center",
        //     }}
        //   >
        //     {status === "Following" && (
        //       <MaterialCommunityIcons
        //         name="check"
        //         size={15}
        //         color="#9CA3AF"
        //       />
        //     )}
  
        //     {status === "Follow" && (
        //       <MaterialCommunityIcons
        //         name="account-plus-outline"
        //         size={15}
        //         color="#eab308"
        //       />
        //     )}
  
        //     <Text
        //       style={{
        //         marginLeft: 6,
  
        //         fontSize: width / 36,
  
        //         fontWeight: "700",
  
        //         letterSpacing: 0.3,
  
        //         color:
        //           status === "Follow"
        //             ? "#eab308"
        //             : "#D1D5DB",
        //       }}
        //     >
        //       {status}
        //     </Text>
        //   </View>
        // </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRequest}
          activeOpacity={0.7}
          style={{
            // height: 36,
            paddingHorizontal: 12,
            flexDirection: "row",
            // alignItems: "center",
            justifyContent: "center",
            // alignSelf: "center",
            borderRadius: 999,
            backgroundColor:
              "rgba(255,255,255,0.025)",
             }}
          className = "items-end"
        >
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          > */}
            <MaterialCommunityIcons
              name={
                status === "Following"
                  ? "eye-check-outline"
                  : "eye-plus-outline"
              }
              size={22}
              color={
                status !== "Follow"
                  ? "#7dd3fc"
                  : "#fff"
              }
            />
            <Text
              style={{
                marginLeft: 6,
                fontSize: width / 32,
                fontWeight: "700",
                letterSpacing: 0.3,
                color:
                  status !== "Follow"
                    ? "#7dd3fc"
                    : "#fff",
              }}
              // className = "font-bebas"
            >
              {status === "Follow"
                ? "Follow"
                : "Following"}
            </Text>
          {/* </View> */}
        </TouchableOpacity>
      )}
    </>
  );
}