import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
// import {
//   acceptFriendRequest,
//   friendRequest,
//   getFriendshipStatus,
//   getNotificationByUser,
//   removeFriendRequest,
//   unfriendRequest,
// } from "../../apiCalls";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { acceptFriendRequest, denyFriendRequest, friendRequest, getFriendshipStatus, removeFriendRequest, unfriendRequest } from "../../apiCalls/user";
import { getNotificationByUser } from "../../apiCalls/notifications";

export default function FriendButton({ userProfile }) {
  const {
    user,
    userFriends,
    setUserFriends,
    notifications,
    setNotifications,
    userFriendRequestsSent,
    setUserFriendRequestsSent , 
    setUserFriendRequestsReceived ,
    scale, spacing
  } = useGlobalContext();

  const { width } = useWindowDimensions();

  const [status, setStatus] = useState(null);
  const [exist, setExist] = useState(null);
  const [expired, setExpired] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // STATUS
  // --------------------------------------------------

  const loadStatus = async () => {
    try {
      const result = await getFriendshipStatus(
        user._id,
        userProfile._id
      );

      setStatus(result?.status || "add");
    } catch (error) {
      console.error("FriendButton status error:", error);
      setStatus("add");
    }
  };

  useEffect(() => {
    if (!user?._id || !userProfile?._id) return;
    loadStatus();
  }, [user?._id, userProfile?._id]);

  // --------------------------------------------------
  // ACTION BODY
  // --------------------------------------------------

  const rawBody = useMemo(
    () => ({
      _id: user._id,
    }),
    [user]
  );

  const targetBody = useMemo(
    () => ({
      _id: userProfile._id,
    }),
    [userProfile]
  );

  // --------------------------------------------------
  // ACTIONS
  // --------------------------------------------------

  const sendFriendRequest = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await friendRequest(
        user._id,
        userProfile._id,
        setUserFriendRequestsSent,
        setExist
      );
      setStatus("pending");
    } catch (error) {
      console.error("sendFriendRequest error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelFriendRequest = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await removeFriendRequest(
        user._id,
        userProfile._id,
        setUserFriendRequestsSent
      );
      setStatus("add");
    } catch (error) {
      console.error("cancelFriendRequest error:", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptFriendRequestAction = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await acceptFriendRequest(
        userProfile._id,
        user._id,
        setUserFriends ,
        setUserFriendRequestsReceived,
      );

      setStatus("friends");
    } catch (error) {
      console.error(
        "acceptFriendRequest error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const denyFriendRequestAction = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await denyFriendRequest(
        userProfile._id,
        user._id,
        setUserFriendRequestsReceived,
      );

      setStatus("add");
    } catch (error) {
      console.error(
        "denyFriendRequest error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const unfriendFriend = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setMenuOpen(false);

      await unfriendRequest(
        userProfile._id,
        user._id,
        setUserFriends
      );

      setStatus("add");
    } catch (error) {
      console.error("unfriendFriend error:", error);
    } finally {
      setLoading(false);
    }
  };    

  // --------------------------------------------------
  // REFRESH NOTIFICATIONS
  // --------------------------------------------------

  useEffect(() => {
    if (!exist) return;

    getNotificationByUser(
      user._id,
      setNotifications
    );

    setExist(false);
  }, [exist]);

  useEffect(() => {
    if (!expired) return;

    getNotificationByUser(
      user._id,
      setNotifications
    );

    setExpired(false);
  }, [expired]);

  // --------------------------------------------------
  // MAIN ACTION
  // --------------------------------------------------

  const handleMainAction = () => {
    if (status === "add") {
      sendFriendRequest();
      return;
    }

    if (status === "pending") {
      cancelFriendRequest();
      return;
    }

    if (status === "accept") {
      setMenuOpen((previous) => !previous);
      return;
    }

    if (status === "friends") {
      setMenuOpen((previous) => !previous);
    }
  };

  // --------------------------------------------------
  // STATE CONFIG
  // --------------------------------------------------

  const stateConfig = {
    add: {
      label: "Add Friend",
      icon: "account-plus-outline",
      accent: "#E8B95A",
      text: "#F5D98D",
      background: "rgba(232,185,90,0.10)",
      border: "rgba(232,185,90,0.30)",
      dot: "#E8B95A",
    },

    pending: {
      label: "Request Sent",
      icon: "clock-outline",
      accent: "#A9A9A9",
      text: "#D0D0D0",
      background: "rgba(255,255,255,0.055)",
      border: "rgba(255,255,255,0.13)",
      dot: "#8D8D8D",
    },

    accept: {
      label: "Accept Request",
      icon: "account-check-outline",
      accent: "#E8B95A",
      text: "#F5D98D",
      background: "rgba(232,185,90,0.14)",
      border: "rgba(232,185,90,0.38)",
      dot: "#E8B95A",
    },

    friends: {
      label: "Friends",
      icon: "account-check-outline",
      accent: "#B7C7B5",
      text: "#DCE7D9",
      background: "rgba(183,199,181,0.09)",
      border: "rgba(183,199,181,0.20)",
      dot: "#B7C7B5",
    },
  };

  const current =
    stateConfig[status] || stateConfig.add;

  // if (!status) return null;

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      {/* MAIN RELATIONSHIP BUTTON */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          flex: 1,
          minHeight: 42,
          borderRadius: 7,
          borderWidth: 1,
          borderColor: current.border,
          backgroundColor: current.background,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={handleMainAction}
          activeOpacity={0.78}
          disabled={loading}
          style={{
            flex: 1,
            paddingHorizontal : spacing(12),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 12,
          }}
        >
          {/* STATUS DOT */}

          {/* <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: current.dot,
              marginRight: 8,
              shadowColor: current.accent,
              shadowOpacity: 0.55,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            }}
          /> */}

          <MaterialCommunityIcons
            name={current.icon}
            size={17}
            color={current.accent}
          />

          <Text
            style={{
              marginLeft: 7,
              fontSize: Math.max(10, width / 38),
              fontWeight: "700",
              letterSpacing: 0.35,
              color: current.text,
            }}
          >
            {current.label}
          </Text>
        </TouchableOpacity>

        {/* FRIENDS MENU TRIGGER */}

        { (status === "friends" || status === "accept" )&& (
          <View
            style={{
              width: 40,
              borderLeftWidth: 1,
              borderLeftColor:
                "rgba(255,255,255,0.10)",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                setMenuOpen((previous) => !previous)
              }
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={
                  menuOpen
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={19}
                color="rgba(255,255,255,0.68)"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* FRIENDS DROPDOWN */}

      {status === "friends" && menuOpen && (
        <>
          {/* BACKDROP */}

          <Pressable
            onPress={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: -500,
              left: -500,
              right: -500,
              bottom: -500,
            }}
          />

          {/* MENU */}

          <View
            style={{
              position: "absolute",
              top: 48,
              right: 0,
              width: "100%",
              borderRadius: 13,
              borderWidth: 1,
              borderColor:
                "rgba(255,255,255,0.12)",
              backgroundColor: "#0B0B0B",
              overflow: "hidden",
              zIndex: 100,
              elevation: 10,
              shadowColor: "#000",
              shadowOpacity: 0.65,
              shadowRadius: 16,
              shadowOffset: {
                width: 0,
                height: 8,
              },
            }}
          >
            {/* MENU HEADER */}

            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 11,
                borderBottomWidth: 1,
                borderBottomColor:
                  "rgba(255,255,255,0.07)",
              }}
            >
              <Text
                style={{
                  fontSize: scale(9),
                  fontWeight: "800",
                  letterSpacing: 1.2,
                  color:
                    "rgba(255,255,255,0.68)",
                }}
              >
                ACTION
              </Text>

              {/* <Text
                style={{
                  marginTop: 3,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#DCE7D9",
                }}
              >
                Friends
              </Text> */}
            </View>

            {/* UNFRIEND */}

            <TouchableOpacity
              onPress={unfriendFriend}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 13,
              }}
            >
              <MaterialCommunityIcons
                name="account-minus-outline"
                size={18}
                color="#D99A8F"
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#D7B0AA",
                }}
              >
                Unfriend
              </Text>
            </TouchableOpacity>

            {/* BLOCK */}

            <TouchableOpacity
              onPress={() => {
                setMenuOpen(false);
                console.log(
                  "Block user:",
                  userProfile._id
                );
              }}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 13,
                borderTopWidth: 1,
                borderTopColor:
                  "rgba(255,255,255,0.06)",
              }}
            >
              <MaterialCommunityIcons
                name="block-helper"
                size={17}
                color="#B9B9B9"
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: "600",
                  color:
                    "rgba(255,255,255,0.68)",
                }}
              >
                Block
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

       {/* ACCEPT REQUEST DROPDOWN */}

       {status === "accept" && menuOpen && (
        <>
          {/* BACKDROP */}

          <Pressable
            onPress={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              left: -500,
              right: -500,
              bottom: -500,
            }}
          />

          {/* MENU */}

          <View
            style={{
              position: "absolute",
              top: 52,
              right: 0,
              width: "100%",
              borderRadius: 13,
              borderWidth: 1,
              borderColor:
                "rgba(255,255,255,0.12)",
              backgroundColor: "#0B0B0B",
              overflow: "hidden",
              zIndex: 100,
              elevation: 10,
              shadowColor: "#000",
              shadowOpacity: 0.65,
              shadowRadius: 16,
              shadowOffset: {
                width: 0,
                height: 8,
              },
            }}
          >
            {/* MENU HEADER */}

            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 11,
                borderBottomWidth: 1,
                borderBottomColor:
                  "rgba(255,255,255,0.07)",
              }}
            >
              <Text
                style={{
                  fontSize: scale(9),
                  fontWeight: "800",
                  letterSpacing: 0.2,
                  color:
                    "rgba(255,255,255,0.78)",
                }}
              >
                Actions
              </Text>

              {/* <Text
                style={{
                  marginTop: 3,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#DCE7D9",
                }}
              >
                Friends
              </Text> */}
            </View>


            {/* ACCEPT */}
            <TouchableOpacity
              onPress = { acceptFriendRequestAction }
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 13,
              }}
            >
              <MaterialCommunityIcons
                name="account-plus-outline"
                size={18}
                color="lightgreen"
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "lightgreen"
                }}
              >
                Accept Request
              </Text>
            </TouchableOpacity>

            {/* DENY*/}
            <TouchableOpacity
              onPress = { denyFriendRequestAction }
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 13,
              }}
            >
              <MaterialCommunityIcons
                name="account-minus-outline"
                size={18}
                color="pink"
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "pink"
                }}
              >
                Deny Request
              </Text>
            </TouchableOpacity>

            {/* BLOCK */}

            <TouchableOpacity
              onPress={() => {
                setMenuOpen(false);
                console.log(
                  "Block user:",
                  userProfile._id
                );
              }}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 13,
                borderTopWidth: 1,
                borderTopColor:
                  "rgba(255,255,255,0.06)",
              }}
            >
              <MaterialCommunityIcons
                name="block-helper"
                size={17}
                color="#B9B9B9"
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: "600",
                  color:
                    "rgba(255,255,255,0.68)",
                }}
              >
                Block
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}


    </View>
  );
}