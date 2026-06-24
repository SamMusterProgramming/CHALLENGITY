
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

  return (
    // <TouchableOpacity
    //   onPress={handleRequest}
    //   activeOpacity={0.85}
    //   style={{
    //     width: "100%",
    //     height: 44,
    //     borderRadius: 12,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "rgba(255,255,255,0.03)",
    //     borderWidth: 1,
    //     borderColor:
    //       status === "Add" ||
    //       status === "Accept"
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
    //     {status === "Friend" && (
    //       <MaterialCommunityIcons
    //         name="check-circle"
    //         size={15}
    //         color="#9CA3AF"
    //       />
    //     )}
  
    //     {status === "Pending" && (
    //       <MaterialCommunityIcons
    //         name="clock-outline"
    //         size={15}
    //         color="#9CA3AF"
    //       />
    //     )}
  
    //     {(status === "Accept" ||
    //       status === "Add") && (
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
    //           status === "Add" ||
    //           status === "Accept"
    //             ? "#eab308"
    //             : "#D1D5DB",
    //       }}
    //     >
    //       {status === "Friend"
    //         ? "Friends"
    //         : status === "Pending"
    //         ? "Requested"
    //         : status === "Accept"
    //         ? "Accept Request"
    //         : "Add Friend"}
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
        className = "items-end"  >
        <MaterialCommunityIcons
          name={
            status === "Friend"
              ? "check-circle"
              : status === "Pending"
              ? "clock-outline"
              : status === "Accept"
              ? "account-check-outline"
              : "account-plus-outline"
          }
          size={22}
          color={
            status === "Friend"
              ? "#eab308"
              : status === "Pending"
              ? "#fff"
              :  "#fff"
          }
        />
        <Text
          style={{
            marginLeft: 6,
            fontSize: width / 32,
            fontWeight: "700",
            letterSpacing: 0.3,
            color:
              status === "Friend"
                ? "#eab308" 
                : status === "Pending"
                ? "#fff"
                : "#fff",
          }}
          className = ""
        >
          {status === "Friend"
            ? "Friends"
            : status === "Pending"
            ? "Requested"
            : status === "Accept"
            ? "Accept"
            : "Connect"}
        </Text>
  </TouchableOpacity>
  );
}