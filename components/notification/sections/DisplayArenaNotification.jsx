
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";

import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../context/GlobalProvider";

import { countries, stageIcons } from "../../../utilities/TypeData";

import {
  deleteUserNotification,
  getNotificationByUser,
  updateNotificationByUser,
} from "../../../apiCalls/notifications";

import {
  getArenaByProfile,
  getArenaByUser,
  toggleFollowerArena,
  toggleStarArena,
} from "../../../apiCalls/arenas";

import ArenaCard from "../../discovery/cards/ArenaCard";
import TalentIcon from "../../custom/TalentIcon";

const GOLD = "#E8BE66";
const GOLD_LIGHT = "#F5D58E";

const getNotificationTime = (createdAt) => {
  if (!createdAt) return null;

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function DisplayArenaNotification({
  notification,
  setNotifications,
  user,
}) {
  const { width } = useWindowDimensions();

  const { userFriendData, setUserFriendData , scale , spacing} = useGlobalContext();

  const [isRead, setIsRead] = useState(notification.is_read);
  const [showMenu, setShowMenu] = useState(false);

  const [not, setNot] = useState(null);
  const [arenas, setArenas] = useState(null);
  const [selectedArena, setSelectedArena] = useState(null);

  const [showPerformance, setShowPerformance] = useState(false);
  const [showArena, setShowArena] = useState(false);

  const [posts, setPosts] = useState([]);

  const metadata = notification.metadata || {};
  const presentation = notification.presentation || {};

  const time = useMemo(
    () => getNotificationTime(notification.createdAt),
    [notification.createdAt]
  );

  const region = useMemo(
    () => countries.find((country) => country.code === metadata.region),
    [metadata.region]
  );

  const imageUri =
    presentation.image ||
    user?.profileImage?.publicUrl ||
    null;

  const isUnread = !isRead;

  // --------------------------------------------------
  // SYNC READ STATE
  // --------------------------------------------------

  useEffect(() => {
    setIsRead(notification.is_read);
  }, [notification.is_read]);

  // --------------------------------------------------
  // MARK AS READ
  // --------------------------------------------------

  const markAsRead = () => {
    if (isRead) return;

    setIsRead(true);
    updateNotificationByUser(notification._id, setNot);
  };

  useEffect(() => {
    if (!not) return;

    getNotificationByUser(user._id, setNotifications);
    setNot(null);
  }, [not]);

  // --------------------------------------------------
  // DELETE NOTIFICATION
  // --------------------------------------------------

  const deleteNotification = () => {
    deleteUserNotification(notification._id, setNot);

    setNotifications((previous) =>
      previous.filter((item) => item._id !== notification._id)
    );
  };

  // --------------------------------------------------
  // LOAD ARENA
  // --------------------------------------------------

  const loadArena = async ({
    ownerId,
    arenaId,
    useOwnerAsRequester = false,
  }) => {
    if (!user?._id) return;

    if (!notification.sender_id) {
      await getArenaByUser(
        ownerId || user._id,
        setSelectedArena,
        setArenas,
        arenaId
      );

      return;
    }

    await getArenaByProfile(
      useOwnerAsRequester ? ownerId : notification.sender_id,
      { requesterId: user._id },
      setSelectedArena,
      setArenas,
      arenaId
    );
  };

  // --------------------------------------------------
  // NOTIFICATION ACTION
  // --------------------------------------------------

  const handleAction = async () => {
    if (posts.length > 0) {
      setShowPerformance((previous) => !previous);
    }

    switch (notification.type) {
      case "arena_created": {
        if (selectedArena) {
          setShowArena((previous) => !previous);
          return;
        }

        await loadArena({
          ownerId: user?._id,
          arenaId: metadata._id,
        });

        setShowArena(true);
        break;
      }

      case "shared_arena": {
        if (selectedArena) {
          setShowArena((previous) => !previous);
          return;
        }

        await loadArena({
          ownerId: metadata.ownerId,
          arenaId: metadata._id,
          useOwnerAsRequester: true,
        });

        setShowArena(true);
        break;
      }

      case "star_arena":
      case "follow_arena": {
        if (selectedArena) {
          setShowArena((previous) => !previous);
          return;
        }

        if (!notification.is_read) markAsRead();

        await loadArena({
          ownerId: user?._id,
          arenaId: metadata.arena_id,
        });

        setShowArena(true);
        break;
      }

      case "performance_added": {
        if (posts.length > 0) return;

        if (!notification.is_read) markAsRead();

        await loadArena({
          ownerId: user?._id,
          arenaId: metadata._id,
        });

        break;
      }

      case "shared_performance": {
        if (posts.length > 0) return;

        if (!notification.is_read) markAsRead();

        await loadArena({
          ownerId: metadata.ownerId,
          arenaId: metadata._id,
          useOwnerAsRequester: true,
        });

        break;
      }

      case "fire_received":
      case "comment_received": {
        if (posts.length > 0) return;

        if (!notification.is_read) markAsRead();

        await loadArena({
          ownerId: user?._id,
          arenaId: metadata.arena_id,
        });

        break;
      }

      case "spotlight_featured": {
        if (posts.length > 0) return;

        if (!notification.is_read) markAsRead();

        await loadArena({
          ownerId: user?._id,
          arenaId: metadata.arena_id,
        });

        break;
      }

      default:
        break;
    }
  };

  // --------------------------------------------------
  // BUILD PERFORMANCE LIST
  // --------------------------------------------------

  useEffect(() => {
    if (!selectedArena) return;

    const arenaOnlyTypes = [
      "arena_created",
      "star_arena",
      "follow_arena",
      "shared_arena",
    ];

    if (arenaOnlyTypes.includes(notification.type)) return;

    const arenaPosts = selectedArena.posts || [];

    const targetPostId = (
      metadata.postId || metadata.post_id
    )?.toString();

    const targetPost = arenaPosts.find(
      (post) => post._id?.toString() === targetPostId
    );

    if (!targetPost) {
      deleteNotification();
      return;
    }

    markAsRead();

    const currentArenaPosts = arenaPosts.map((post) => ({
      ...post,
      arena_id: selectedArena._id,
      arenaName: selectedArena.arenaName,
      talentType: selectedArena.talentType,
      region: selectedArena.region,
      profileImage: selectedArena.profileImage,
      owner_id: selectedArena.owner_id,
    }));

    const orderedPosts = [
      targetPostId
        ? currentArenaPosts.find(
            (post) => post._id?.toString() === targetPostId
          )
        : null,
      ...currentArenaPosts.filter(
        (post) => post._id?.toString() !== targetPostId
      ),
    ].filter(Boolean);

    const otherPosts = [];

    const remainingArenas = (arenas || []).filter(
      (arena) => arena._id?.toString() !== selectedArena._id?.toString()
    );

    remainingArenas.forEach((arena) => {
      (arena.posts || []).forEach((post) => {
        otherPosts.push({
          ...post,
          arena_id: arena._id,
          arenaName: arena.arenaName,
          talentType: arena.talentType,
          region: arena.region,
          profileImage: arena.profileImage,
          owner_id: arena.owner_id,
        });
      });
    });

    setPosts([...orderedPosts, ...otherPosts]);
    setShowPerformance(true);
  }, [selectedArena]);

  // --------------------------------------------------
  // PREVIEW TIMEOUTS
  // --------------------------------------------------

  useEffect(() => {
    if (!showPerformance) return;

    const timer = setTimeout(() => {
      setShowPerformance(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [showPerformance]);

  useEffect(() => {
    if (!showArena) return;

    const timer = setTimeout(() => {
      setShowArena(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [showArena]);

  // --------------------------------------------------
  // PERFORMANCE PLAYER
  // --------------------------------------------------

  const playPerformance = () => {
    if (!posts.length) return;

    if (
      notification.type === "fire_received" ||
      notification.type === "comment_received"
    ) {
      setTimeout(() => {
        deleteNotification();
      }, 3000);
    } else {
      markAsRead();
    }

    router.push({
      pathname: "/arenaPerformancePlayer",
      params: {
        selectedPostId: metadata.post_id,
        type: "",
        arenaPosts: JSON.stringify(posts),
        arena: JSON.stringify(null),
      },
    });
  };

  // --------------------------------------------------
  // FOLLOW ARENA
  // --------------------------------------------------

  const toggleFollower = async () => {
    if (!selectedArena) return;

    if (!notification.is_read) markAsRead();

    const response = await toggleFollowerArena({
      arenaId: selectedArena._id,
      userId: user._id,
      userName: user.name,
    });

    if (!response) return;

    setSelectedArena({
      ...response,
      isStarred: selectedArena.isStarred,
    });
  };

  // --------------------------------------------------
  // STAR ARENA
  // --------------------------------------------------

  const toggleStar = async () => {
    if (!selectedArena) return;

    if (!notification.is_read) markAsRead();

    const response = await toggleStarArena({
      arenaId: selectedArena._id,
      userId: user._id,
      userName: user.name,
    });

    if (!response) return;

    setSelectedArena({
      ...response,
      isFollower: selectedArena.isFollower,
    });
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

 
  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <View
      className="mb-4"
      style={{
        zIndex: showMenu ? 100 : 1,
        elevation: showMenu ? 12 : 0,
      }}
    >
      {/* FLOATING CARD SURFACE */}
      <View
        className="rounded-[5px] p-[3px]"
        style={{
          backgroundColor: isUnread
            ? "rgba(232,190,102,0.48)"
            : "rgba(155,160,175,0.34)",
          shadowColor: isUnread ? GOLD : "#000000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: isUnread ? 0.19 : 0.12,
          shadowRadius: isUnread ? 16 : 10,
          elevation: isUnread ? 5 : 2,
        }}
      >
        <View
          className="relative overflow-hidden rounded-[24px]"
          style={{
            backgroundColor: isUnread
              ? "rgba(23,20,17,0.97)"
              : "rgba(19,20,24,0.96)",
            borderWidth: 1,
            borderColor: isUnread
              ? "rgba(245,213,142,0.20)"
              : "rgba(190,195,210,0.10)",
          }}
        >
          {/* SOFT TOP LIGHT REFLECTION */}
          {/* <View
            pointerEvents="none"
            className="absolute top-0 left-8 right-8 h-[1px]"
            style={{
              backgroundColor: isUnread
                ? "rgba(255,224,157,0.55)"
                : "rgba(255,255,255,0.12)",
            }}
          /> */}
  
          {/* UNREAD AMBIENT GLOW */}
          {isUnread && (
            <View
              pointerEvents="none"
              className="absolute top-0 right-0 w-[150px] h-[100px]"
              style={{
                backgroundColor: "rgba(232,190,102,0.045)",
                borderBottomLeftRadius: 120,
              }}
            />
          )}
  
          {/* MAIN CARD CONTENT */}
          <View className="p-5">
            <View className="flex-row items-start">
              {/* ARENA IMAGE */}
              <Pressable
                onPress={handleAction}
                className="relative mr-3.5"
                style={{
                  width: scale(70) ,
                  height: scale(70),
                }}
              >
                <View
                  className="w-full h-full rounded-[14px] overflow-hidden"
                  style={{
                    borderWidth: 1,
                    borderColor: isUnread
                      ? "rgba(245,213,142,0.52)"
                      : "rgba(190,195,210,0.30)",
                    backgroundColor: "#242326",
                  }}
                >
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      resizeMode="cover"
                      className="w-full h-full"
                    />
                  ) : (
                    <View className="flex-1 items-center justify-center">
                      <MaterialCommunityIcons
                        name="stadium-variant"
                        size={34}
                        color={isUnread ? GOLD : "#85858D"}
                      />
                    </View>
                  )}
  
                  {/* IMAGE SHADE */}
                  <View
                    pointerEvents="none"
                    className="absolute inset-0"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.10)",
                    }}
                  />
                </View>
  
                {/* ARENA IMAGE BADGE */}
                <View
                  className="absolute -bottom-1.5 -left-1.5 w-[35px] h-[35px] rounded-full items-center justify-center"
                  style={{
                    backgroundColor: "#171512",
                    borderWidth: 1.5,
                    borderColor: isUnread ? GOLD : "#696B76",
                    shadowColor: isUnread ? GOLD : "#000",
                    shadowOpacity: isUnread ? 0.22 : 0.08,
                    shadowRadius: 7,
                    elevation: 3,
                  }}
                >
                  <MaterialCommunityIcons
                    name="stadium-variant"
                    size={17}
                    color={isUnread ? GOLD_LIGHT : "#B0B0B8"}
                  />
                </View>
              </Pressable>
  
              {/* NOTIFICATION INFORMATION */}
              <View className="flex-1 min-w-0">
                {/* LABEL + TIME + MENU */}
                <View className="flex-row items-center justify-between mb-2">
                  <View
                    className="rounded-full px-3 py-[5px]"
                    style={{
                      backgroundColor: isUnread
                        ? "rgba(232,190,102,0.12)"
                        : "rgba(255,255,255,0.045)",
                      borderWidth: 1,
                      borderColor: isUnread
                        ? "rgba(232,190,102,0.50)"
                        : "rgba(190,195,210,0.20)",
                    }}
                  >
                    <Text
                      style={{
                        color: isUnread ? "#F4C968" : "#B5B5BD",
                        fontSize: 11,
                        fontWeight: "700",
                        letterSpacing: 0.25,
                      }}
                    >
                      Arena Update
                    </Text>
                  </View>
  
                  <View className="flex-row items-center">
                    {!!time && (
                      <Text
                        style={{
                          color: isUnread ? "#C9C0B2" : "#92939D",
                          fontSize: 10,
                          fontWeight: "500",
                        }}
                      >
                        {time}
                      </Text>
                    )}
  
                    <View
                      className="w-[8px] h-[8px] rounded-full ml-2"
                      style={{
                        backgroundColor: isUnread ? GOLD : "#737783",
                        shadowColor: isUnread ? GOLD : "transparent",
                        shadowOpacity: isUnread ? 0.85 : 0,
                        shadowRadius: 6,
                      }}
                    />
                  </View>
                </View>
  
                {/* MESSAGE */}
                <Pressable onPress={handleAction}>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: isUnread ? "#FFF9EF" : "#D1D0D2",
                      fontSize: scale(12),
                      lineHeight: Math.max(20, Math.min(24, width / 17)),
                      fontWeight: isUnread ? "650" : "500",
                      letterSpacing: -0.25,
                    }}
                  >
                    {presentation.text || "New activity in your arena"}
                  </Text>
                </Pressable>
              </View>
  
              {/* MENU */}
              <Pressable
                onPress={() => setShowMenu((previous) => !previous)}
                hitSlop={10}
                className="ml-1 w-[27px] h-[30px] items-center justify-center"
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={19}
                  color={isUnread ? "#D7B96F" : "#92939D"}
                />
              </Pressable>
            </View>
  
            {/* BOTTOM METADATA + VIEW */}
            <View
              className="flex-row items-center mt-3 pt-3"
              style={{
                // borderTopWidth: 1,
                // borderTopColor: isUnread
                //   ? "rgba(232,190,102,0.18)"
                //   : "rgba(255,255,255,0.09)",
              }}
            >
              {/* ARENA DETAILS */}
              <View className="flex-1 min-w-0 pr-2">
                <Text
                  numberOfLines={1}
                  style={{
                    color: isUnread ? "#FFF1D5" : "#E0DEE0",
                    fontSize: scale(14),
                    fontWeight: "800",
                    letterSpacing: 0.1,
                  }}
                >
                  {metadata.name || "Arena activity"}
                </Text>
                <View className="flex-row items-center mt-4">
                  {!!metadata.talent && (
                    <View className="flex-row items-center gap-2 mr-3">
                  
                      <Text
                        numberOfLines={1}
                        style={{
                          color: isUnread ? "#DCC99F" : "#A8A8B0",
                          fontSize: scale(11),
                          fontWeight: "600",
                        }}
                      >
                        {metadata.talent}
                      </Text>

                      {stageIcons[metadata.talent] && (
                        <TalentIcon talent={metadata.talent} size={17}/>
                      )}
                    </View>
                  )}
  
                  {!!metadata.region && (
                    <View className="flex-row items-center flex-1">
                      {/* <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={12}
                        color={isUnread ? "#D8AD58" : "#9697A0"}
                      /> */}
  
                      <Text
                        numberOfLines={1}
                        style={{
                          color: isUnread ? "#C9C1B3" : "#999AA3",
                          fontSize:scale(11),
                          fontWeight: "500",
                          marginLeft: 3,
                        }}
                      >
                        {region?.name || metadata.region}
                      </Text>
  
                      {!!region?.flag && (
                        <Text className="ml-1" style={{ fontSize: 10 }}>
                          {region.flag}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
  
              {/* FLOATING VIEW BUTTON */}
              <Pressable
                onPress={handleAction}
                hitSlop={6}
                className="flex-row items-center justify-center rounded-full px-4 py-[10px]"
                style={{
                  backgroundColor: isUnread
                    ? "rgba(232,190,102,0.19)"
                    : "rgba(255,255,255,0.045)",
                  borderWidth: 1,
                  borderColor: isUnread
                    ? "rgba(245,213,142,0.75)"
                    : "rgba(155,160,175,0.35)",
                  shadowColor: isUnread ? GOLD : "transparent",
                  shadowOpacity: isUnread ? 0.16 : 0,
                  shadowRadius: 8,
                  elevation: isUnread ? 2 : 0,
                }}
              >
                <Text
                  style={{
                    color: isUnread ? "#FFF0CD" : "#D0CFD2",
                    fontSize: 12,
                    fontWeight: "800",
                  }}
                >
                  View
                </Text>
  
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={17}
                  color={isUnread ? GOLD_LIGHT : "#A6A6AE"}
                  style={{ marginLeft: 3 }}
                />
              </Pressable>
            </View>
          </View>
  
          {/* PERFORMANCE PREVIEW */}
          {showPerformance && posts.length > 0 && (
            <View className="px-3 pb-4">
              <View
                className="h-[1px] mb-4"
                style={{
                  backgroundColor: "rgba(232,190,102,0.18)",
                }}
              />
  
              <View className="flex-row items-center justify-between mb-3">
                <View>
                  <Text className="text-[#FFF5DF] font-bold text-[13px]">
                    Featured performance
                  </Text>
                  <Text className="text-[#C1A66F] text-[10px] mt-1 tracking-[1px]">
                    TAP TO WATCH
                  </Text>
                </View>
  
                <View className="px-2.5 py-1 rounded-full bg-[#E8BE66]/10 border border-[#E8BE66]/25">
                  <Text className="text-[#F5D58E] text-[9px] font-bold tracking-[1px]">
                    PREVIEW
                  </Text>
                </View>
              </View>
  
              <Pressable
                onPress={playPerformance}
                className="w-full rounded-[19px] overflow-hidden bg-[#191713] border border-[#E8BE66]/25"
              >
                <View className="relative">
                  <Image
                    source={{
                      uri:
                        posts[0]?.media?.thumbnail?.cdnUrl ||
                        imageUri,
                    }}
                    resizeMode="cover"
                    className="w-full h-[205px]"
                  />
  
                  <View className="absolute inset-0 bg-black/20 items-center justify-center">
                    <View className="w-[58px] h-[58px] rounded-full bg-black/60 border border-[#F5D58E]/45 items-center justify-center">
                      <Ionicons
                        name="play"
                        size={27}
                        color="#FFFFFF"
                        style={{ marginLeft: 3 }}
                      />
                    </View>
                  </View>
  
                  <View className="absolute bottom-3 left-3 right-3 flex-row items-center justify-between rounded-2xl px-4 py-3 bg-black/80 border border-white/15">
                    <PerformanceStat
                      icon="eye-outline"
                      value={posts[0]?.viewCount || 0}
                      width={width}
                    />
                    <PerformanceStat
                      icon="star-four-points"
                      value={posts[0]?.fireCount || 0}
                      width={width}
                    />
                    <PerformanceStat
                      icon="message-outline"
                      value={posts[0]?.commentCount || 0}
                      width={width}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          )}
  
          {/* ARENA PREVIEW */}
          {showArena && selectedArena && (
            <View className="px-3 pb-4">
              <View
                className="h-[1px] mb-4"
                style={{
                  backgroundColor: "rgba(232,190,102,0.18)",
                }}
              />
  
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-[#FFF5DF] font-bold text-[13px]">
                  Arena preview
                </Text>
                <Text className="text-[#E8BE66] text-[10px] font-bold tracking-[1px]">
                  EXPLORE
                </Text>
              </View>
  
              <View className="items-center">
                <ArenaCard
                  entry={selectedArena}
                  width={width * 0.82}
                  height={width * 0.64}
                />
              </View>
  
              <View className="flex-row gap-3 mt-4">
                <Pressable
                  onPress={toggleFollower}
                  className={`flex-1 flex-row items-center justify-center rounded-xl py-3 border ${
                    selectedArena.isFollower
                      ? "bg-[#E8BE66]/10 border-[#E8BE66]/35"
                      : "bg-white/[0.035] border-white/10"
                  }`}
                >
                  <MaterialCommunityIcons
                    name={
                      selectedArena.isFollower
                        ? "account-check"
                        : "account-plus-outline"
                    }
                    size={17}
                    color={GOLD}
                  />
                  <Text className="text-[#F1EBDD] font-semibold text-[11px] ml-2">
                    {selectedArena.isFollower ? "Following" : "Follow"}
                  </Text>
                </Pressable>
  
                <Pressable
                  onPress={toggleStar}
                  className={`flex-1 flex-row items-center justify-center rounded-xl py-3 border ${
                    selectedArena.isStarred
                      ? "bg-[#E8BE66]/10 border-[#E8BE66]/35"
                      : "bg-white/[0.035] border-white/10"
                  }`}
                >
                  <MaterialCommunityIcons
                    name={
                      selectedArena.isStarred
                        ? "star"
                        : "star-outline"
                    }
                    size={17}
                    color={GOLD}
                  />
                  <Text className="text-[#F1EBDD] font-semibold text-[11px] ml-2">
                    {selectedArena.isStarred ? "Starred" : "Star"}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
  
          {/* ACTION MENU */}
          {showMenu && (
            <>
              <Pressable
                onPress={() => setShowMenu(false)}
                className="absolute inset-0 z-20"
              />
  
              <View
                className="absolute right-3 top-10 z-30 w-[190px] rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#211E19",
                  borderWidth: 1,
                  borderColor: "rgba(232,190,102,0.35)",
                  elevation: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.45,
                  shadowRadius: 15,
                }}
              >
                {!isRead ? (
                  <Pressable
                    onPress={() => {
                      markAsRead();
                      setShowMenu(false);
                    }}
                    className="flex-row items-center px-4 py-3.5"
                  >
                    <MaterialCommunityIcons
                      name="email-open-outline"
                      size={18}
                      color={GOLD}
                    />
                    <Text className="text-[#FFF5DF] font-semibold text-[12px] ml-3">
                      Mark as read
                    </Text>
                  </Pressable>
                ) : (
                  <View className="flex-row items-center px-4 py-3.5">
                    <MaterialCommunityIcons
                      name="check-circle-outline"
                      size={18}
                      color="#AFAEAE"
                    />
                    <Text className="text-[#D0CFD2] font-medium text-[12px] ml-3">
                      Already read
                    </Text>
                  </View>
                )}
  
                <View className="h-[1px] bg-white/[0.09] mx-3" />
  
                <Pressable
                  onPress={() => {
                    setShowMenu(false);
                    deleteNotification();
                  }}
                  className="flex-row items-center px-4 py-3.5"
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={18}
                    color="#F08080"
                  />
                  <Text className="text-[#F08080] font-semibold text-[12px] ml-3">
                    Delete notification
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

// --------------------------------------------------
// PERFORMANCE STAT
// --------------------------------------------------

function PerformanceStat({ icon, value, width }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <MaterialCommunityIcons
        name={icon}
        size={width / 24}
        color={GOLD}
      />

      <Text
        className="text-white font-bold"
        style={{ fontSize: width / 32 }}
      >
        {value}
      </Text>
    </View>
  );
}
