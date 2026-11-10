
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CountryFlag from "../../common/CountryFlag";
import ActionButtons from "../../identityProfile/components/actionButtons/actionButtons";

import { useGlobalContext } from "../../../context/GlobalProvider";
import { router } from "expo-router";

const GOLD = "#D8B65A";

const formatCount = (value = 0) => {
  const count = Number(value) || 0;

  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;

  return count.toString();
};

const UserCard = ({
  user,
  width,
  onPress,
  onFollowPress,
  isFollowing = false,
}) => {
  const {getArenaPerformanceThumbnailHeight , scale , spacing} = useGlobalContext()
  const profileImage =
    user?.profileImage?.publicUrl || user?.profile_img;

  const coverImage =
    user?.coverImage?.publicUrl || user?.cover_img;

  const talent =
    user?.talent && user.talent !== "add your profession"
      ? user.talent
      : "Singing";

  const region = [user?.city, user?.state, user?.country]
    .filter(Boolean)
    .join(", ");

  const followerCount = user?.followerCount ?? 0;
  const arenaCounts = user?.arenaCounts ?? 0;
  const friendCount = user?.friendCount ?? 0;

  return (
    <Pressable
        onPress={() => {
            router.push({
            pathname: "/ProfileScreen",
            params: {
            profile_id : user._id,
            arena_id : null
            },
         });
        }}
      style = {{
        width ,
        height :scale(400),
      }}
      className=" self-center p-1 items-center justify-center overflow-hidden rounded-3xl border border-[#252424]  bg-[#111]"
    >
      {/* FULL-BLEED COVER */}
      {coverImage ? (
        <Image
          source={{ uri: coverImage }}
          resizeMode="cover"
          className="absolute rounded-3xl h-full w-full"
        />
      ) : (
        <View className="absolute rounded-3xl inset-0 bg-[#24231F]" />
      )}

      {/* CINEMATIC OVERLAY */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.08)",
          "rgba(0,0,0,0.02)",
          "rgba(0,0,0,0.60)",
          "rgba(0,0,0,0.91)",
          "#080807",
        ]}
        locations={[0, 0.30, 0.52, 0.77, 1]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        pointerEvents="none"
      />

      {/* TOP BADGES */}
      <View className="absolute left-5 right-5 top-5 z-10 flex-row items-center justify-between">
        
        <View className="flex-row items-center rounded-full border border-[rgba(216,182,90,0.55)] bg-[rgba(10,10,10,0.72)] px-3.5 py-2">
          <Ionicons
            name="musical-notes-outline"
            size={15}
            color={GOLD}
          />
          <Text className="ml-2 text-[11px] font-bold tracking-[0.6px] text-[#E8D49D]">
            {talent}
          </Text>
        </View>

        {!!user?.country && (
          <View className="h- [34px] w- [34px] items-center justify-center overflow-hidden rounded-full bo rder bord er-white/50 bg-bl ack/50">
            <CountryFlag
              code={user.country}
              size={37}
            />
          </View>
        )}
      </View>

      {/* BOTTOM CONTENT OVER THE IMAGE */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        {/* PROFILE IDENTITY */}
        <View className="flex-row items-center">
          {/* LARGE AVATAR */}
          <View
            className="h-[108px] w-[108px] shrink-0 rounded-full border-[3px] border-[#D8B65A] bg-[#171717] p-[3px]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                resizeMode="cover"
                className="h-full w-full rounded-full"
              />
            ) : (
              <View className="h-full w-full items-center justify-center rounded-full bg-[#292929]">
                <Ionicons
                  name="person-outline"
                  size={38}
                  color="#777"
                />
              </View>
            )}
          </View>

          {/* NAME AND LOCATION */}
          <View className="ml-3 min-w-0 flex-1">
            <Text
              numberOfLines={2}
              className="text-[19px] font-extrabold leading-[24px] text-white"
            >
              {user?.name || "Unnamed User"}
            </Text>

            {!!region && (
              <View className="mt-2 flex-row items-center">
                <Ionicons
                  name="location-outline"
                  size={15}
                  color="#C5C5C5"
                />
                <Text
                  numberOfLines={2}
                  className="ml-1.5 flex-1 text-[12px] font-medium text-[#C5C5C5]"
                >
                  {region}
                </Text>
              </View>
            )}
          </View>

        </View>

        {/* BIO */}
        {!!user?.tellus && (
          <Text
            numberOfLines={2}
            className="mt-4 text-[12px] leading-[18px] text-[#D0CECA]"
          >
            {user.tellus}
          </Text>
        )}

        <View
              style = {{
                    paddingHorizontal: spacing(0),
                    paddingTop: spacing(26),
                    gap :20
                  }}
                  className = "flex-row">
                  <ActionButtons
                    user={user}
                  />
        </View>

        {/* STATS */}
        <View className="mt-8 flex-row items-center rounded-[18px] border border-white/10 bg-[rgba(12,12,12,0.72)] px-3 py-3">
          <View className="flex-1 flex-row items-center justify-center">
            <Ionicons
              name="people-outline"
              size={19}
              color={GOLD}
            />
            <View className="ml-2">
              <Text className="text-[14px] font-extrabold text-white">
                {formatCount(followerCount)}
              </Text>
              <Text className="text-[9px] font-medium text-[#A5A39C]">
                Followers
              </Text>
            </View>
          </View>

          <View className="h-8 w-px bg-white/20" />

          <View className="flex-1 flex-row items-center justify-center">
            <Ionicons
              name="trophy-outline"
              size={18}
              color={GOLD}
            />
            <View className="ml-2">
              <Text className="text-[14px] font-extrabold text-white">
                {formatCount(arenaCounts)}
              </Text>
              <Text className="text-[9px] font-medium text-[#A5A39C]">
                Arenas
              </Text>
            </View>
          </View>

          <View className="h-8 w-px bg-white/20" />

          <View className="flex-1 flex-row items-center justify-center">
            <Ionicons
              name="person-add-outline"
              size={18}
              color={GOLD}
            />
            <View className="ml-2">
              <Text className="text-[14px] font-extrabold text-white">
                {formatCount(friendCount)}
              </Text>
              <Text className="text-[9px] font-medium text-[#A5A39C]">
                Friends
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default UserCard;
