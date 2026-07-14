
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import {
  acceptFriendRequest,
  friendRequest,
  getNotificationByUser,
  removeFriendRequest,
  unfriendRequest,
} from "../../apiCalls";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FriendButton({ userProfile }) {
  const { user, userFriendData, setUserFriendData, notifications, setNotifications } =
    useGlobalContext();

  const [status, setStatus] = useState(null);
  const [exist, setExist] = useState(null);
  const [expired, setExpired] = useState(null);
  const { width, height } = useWindowDimensions();


  // ---------- STATUS ----------
  useEffect(() => {
    const getStatus = () => {
      console.log(userProfile._id)
      if (userFriendData.friends.find((f) => f._id == userProfile._id)) {
        return setStatus("Friend");
      }
      if (
        userFriendData.friend_requests_sent.find(
          f => f._id == userProfile._id
        )
      ) {
        return setStatus("Pending");
      }

      if (
        userFriendData.friend_requests_received.find(f => f._id == userProfile._id)
      ) {
        console.log("we are here")
        return setStatus("Accept");
      }
      return setStatus("Add");

      // const not = notifications.find(
      //   (n) =>
      //     n.type === "friend request" &&
      //     n.content.sender_id === userProfile._id
      // );

      // if (not) return setStatus("Accept");
      // return setStatus("Add");
    };

    getStatus();   
    // setStatus(getStatus())
  }, [userFriendData, notifications]);

  // ---------- ACTION BODY ----------
  const rawBody = useMemo(
    () => ({
      _id: user._id,
      // name: user.name,
      // email: user.email,
      // profile_img: user.profileImage.publicUrl,
      // cover_img: user.coverImage.publicUrl,
    }),
    [user]
  );

  const targetBody = useMemo(
    () => ({
      _id : userProfile._id,
      // name : userProfile.name,
      // email : userProfile.email,
      // profile_img : userProfile.profileImage.publicUrl,
      // cover_img : userProfile.coverImage.publicUrl,
    }),
    [userProfile]
  );

  // ---------- ACTIONS ----------
  const sendFriendRequest = () =>
    friendRequest(user._id, targetBody, setUserFriendData, setExist);

  const unfriendFriendRequest = () =>
    unfriendRequest(userProfile._id, rawBody, setUserFriendData);

  const okFriendRequest = () =>
    acceptFriendRequest(userProfile._id, rawBody, setUserFriendData, setExpired);

  const cancelFriendRequest = () =>
    removeFriendRequest(user._id, targetBody, setUserFriendData);

  const handleRequest = () => {
    switch (status) {
      case "Add":
        sendFriendRequest();
        break;
      case "Pending":
        cancelFriendRequest();
        break;
      case "Accept":
        okFriendRequest();
        break;
      case "Friend":
        unfriendFriendRequest();
        break;
    }
  };

  // ---------- REFRESH NOTIFICATIONS ----------
  useEffect(() => {
    if (exist) {
      getNotificationByUser(user._id, setNotifications);
      setExist(false);
    }
  }, [exist]);

  useEffect(() => {
    if (expired) {
      getNotificationByUser(user._id, setNotifications);
      setExpired(false);
    }
  }, [expired]);

  // ---------- UI STYLE MAP ----------
  const styleMap = {
    Friend: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      icon: icons.check_red,
    },
    Pending: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
    },
    Accept: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
    },
    Add: {
      bg: "bg-red-600",
      text: "text-white",
    },
  };

  const style = styleMap[status] || styleMap.Add;

  if (!status) return null;

  // return (
  //   <TouchableOpacity
  //     onPress={handleRequest}
  //     activeOpacity={0.92}
  //     className="items-end"
  //     style={{
  //       height: 42,
  //       paddingHorizontal: 18,
  //       borderRadius: 14,
  
  //       flexDirection: "row",
  //       alignItems: "center",
  //       justifyContent: "center",
  
  //       backgroundColor:
  //         status === "Connect" || status === "Accept"
  //           ? "#eab308"
  //           : "rgba(255,255,255,0.04)",
  
  //       // borderWidth: 1,
  //       // borderColor:
  //       //   status === "Connect" || status === "Accept"
  //       //     ? "#f4d44d"
  //       //     : "rgba(234,179,8,0.25)",
  
  //       shadowColor:
  //         status === "Connect" || status === "Accept"
  //           ? "#eab308"
  //           : "#000",
  
  //       shadowOpacity:
  //         status === "Connect" || status === "Accept"
  //           ? 0.28
  //           : 0.15,
  
  //       shadowRadius: 12,
  //       elevation:
  //         status === "Connect" || status === "Accept"
  //           ? 6
  //           : 2,
  //     }}
  //   >
  //     <MaterialCommunityIcons
  //       name={
  //         status === "Friend"
  //           ? "account-check"
  //           : status === "Pending"
  //           ? "clock-outline"
  //           : status === "Accept"
  //           ? "account-check-outline"
  //           : "account-plus-outline"
  //       }
  //       size={20}
  //       color={
  //         status === "Connect" || status === "Accept"
  //           ? "#111214"
  //           : "#eab308"
  //       }
  //     />
  
  //     <Text
  //       style={{
  //         marginLeft: 8,
  //         fontSize: width / 32,
  //         fontWeight: "700",
  //         letterSpacing: 0.4,
  //         color:
  //           status === "Connect" || status === "Accept"
  //             ? "#111214"
  //             : "#eab308",
  //       }}
  //     >
  //       {status === "Friend"
  //         ? "Friends"
  //         : status === "Pending"
  //         ? "Requested"
  //         : status === "Accept"
  //         ? "Accept"
  //         : "Add Friend"}
  //     </Text>
  //   </TouchableOpacity>
  // );

  return (
    <TouchableOpacity
      onPress={handleRequest}
      activeOpacity={0.9}
      style={{

        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor:
          status === "Connect" || status === "Accept"
          ? "rgba(0,0,0.64)"
          : "rgba(0,0,0,0.64)",
        borderWidth: 1,
        borderColor:
          status === "Connect" || status === "Accept"
            ? "#eab308"
            : "rgba(234,179,8,.18)",
      }}
       className = "py-2"
    >
      <MaterialCommunityIcons
        name={
          status === "Friend"
            ? "account-check-outline"
            : status === "Pending"
            ? "clock-time-three-outline"
            : status === "Accept"
            ? "account-check-outline"
            : "account-plus-outline"
        }
        size={17}
        color={
          status === "Connect" || status === "Accept"
            ? "#111214"
            : "#eab308"
        }
      />
  
      <Text
        style={{
          marginLeft: 6,
          fontSize: width / 42,
          fontWeight: "700",
          letterSpacing: 0.3,
          color:
            status === "Connect" || status === "Accept"
              ? "#111214"
              : "#eab308",
        }}
      >
        {status === "Friend"
          ? "Friends"
          : status === "Pending"
          ? "Requested"
          : status === "Accept"
          ? "Accept"
          : "Add Friend"}
      </Text>
    </TouchableOpacity>
  );
  
}