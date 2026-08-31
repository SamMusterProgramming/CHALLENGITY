import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";

const UserProfileCard = ({
  entry,
  width,
  height,
}) => {
  if (!entry) {
    return null;
  }


  const profileImage =
    entry?.profileImage?.publicUrl ||
    entry?.profile_img ||
    null;

  const coverImage =
    entry?.coverImage?.publicUrl ||
    entry?.cover_img ||
    null;


  const name =
    entry?.name ||
    entry?.username ||
    "Unknown User";

  const username =
    entry?.username
      ? `@${entry.username}`
      : "";

  const talent =
    entry?.talent &&
    entry.talent !== "add your profession"
      ? entry.talent
      : null;

  /*
   * =========================================================
   * LOCATION
   * =========================================================
   */

  const location = [
    entry?.city,
    entry?.state,
  ]
    .filter(Boolean)
    .join(", ");

  /*
   * =========================================================
   * COUNTS
   * =========================================================
   *
   * Your current user schema gives us followers directly.
   *
   * Arena/friend counts can be returned by your search
   * aggregation later.
   */

  const arenaCount =
    entry?.arenaCount ??
    entry?.arenasCount ??
    0;

  const friendCount =
    entry?.friendCount ??
    entry?.friendsCount ??
    0;

  const followerCount =
    entry?.followerCount ??
    entry?.followerCount ??
    0;

  /*
   * =========================================================
   * PROFILE PRESS
   * =========================================================
   */

  const handlePress = () => {
    router.push({
      pathname: "/ProfileScreen",
      params: {
        userProfile: JSON.stringify(entry),
        arena_id: null,
      },
    });
  };

  /*
   * =========================================================
   * CARD
   * =========================================================
   */

  return (
    <TouchableOpacity
      activeOpacity={0.94}
      onPress={handlePress}
      style={{
        width,
      }}
      className="
        self-center
        rounded-[5px]
        bg-[#000000]
        shadow-black/25
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <View
        className="
          flex-row
          items-center
          justify-between
          rounded-t-[5px]
          border-l-[0.5px]
          border-r-[0.5px]
          border-t-[0.5px]
          border-[gold]/40
          bg-[#000000]
          p-4
        "
      >

        {/* USER */}

        <View className="flex-1 flex-row items-center">

          {/* PROFILE IMAGE */}

          <View
            className="
              h-[48px]
              w-[48px]
              items-center
              justify-center
              overflow-hidden
              rounded-[6px]
              border
              border-yellow-500/20
              bg-yellow-500/[0.09]
            "
          >
            {profileImage ? (
              <Image
                source={{
                  uri: profileImage,
                }}
                resizeMode="cover"
                className="h-full w-full"
              />
            ) : (
              <Ionicons
                name="person"
                size={25}
                color="#EAB308"
              />
            )}
          </View>

          {/* USER DETAILS */}

          <View className="ml-[10px] flex-1">

            {/* NAME + VERIFIED */}

            <View className="flex-row items-center">

              <Text
                numberOfLines={1}
                style={{
                  fontSize: width / 25,
                }}
                className="
                  max-w-[80%]
                  font-bold
                  tracking-[0.1px]
                  text-white
                "
              >
                {name}
              </Text>

              {entry?.email_verified && (
                <Ionicons
                  name="checkmark-circle"
                  size={width / 28}
                  color="#EAB308"
                  style={{
                    marginLeft: 5,
                  }}
                />
              )}

            </View>

            {/* USERNAME */}

            {username.length > 0 && (
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width / 38,
                }}
                className="
                  mt-[3px]
                  font-medium
                  text-white/45
                "
              >
                {username}
              </Text>
            )}

            {/* LOCATION */}

            {/* {entry.country?.length > 0 && ( */}
              <View className="mt-[5px] flex-row items-center">

                <Ionicons
                  name="location-outline"
                  size={12}
                  color="rgba(255,255,255,0.65)"
                />

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: width / 42,
                  }}
                  className="
                    ml-[3px]
                    font-semibold
                    text-white/60
                  " >
                  {entry.country}
                  {entry?.country
                    ? `  ${entry.country}`
                    : ""}
                </Text>

              </View>
            {/* )} */}

          </View>

        </View>

        {/* CHEVRON */}

        <View
          className="
            h-[30px]
            w-[30px]
            items-center
            justify-center
            rounded-full
            border
            border-white/[0.07]
            bg-white/[0.03]
          "
        >
          <Ionicons
            name="chevron-forward"
            size={15}
            color="rgba(255,255,255,0.45)"
          />
        </View>

      </View>

      {/* =====================================================
          COVER IMAGE
      ===================================================== */}

      <View
        style={{
          height,
        }}
        className="
          overflow-hidden
          border-l-[0.5px]
          border-r-[0.5px]
          border-[gold]/40
          bg- [#111111]
          px-4
          items-center justify-center
        "
      >

        {coverImage ? (

          <Image
            source={{
              uri: coverImage,
            }}
            resizeMode="cover"
            className="
              abs olute
              ins et-0
              h-full
              w-full
              rounded-[5px]
            "
          />

        ) : (

          <View
            className="
              flex-1
              items-center
              justify-center
              bg-[#111111]
            "
          >

            <View
              className="
                h-[64px]
                w-[64px]
                items-center
                justify-center
                rounded-full
                border
                border-yellow-500/10
                bg-yellow-500/[0.06]
              "
            >
              <Ionicons
                name="person-outline"
                size={30}
                color="rgba(234,179,8,0.65)"
              />
            </View>

          </View>

        )}

        {/* COVER OVERLAY */}

        <View
          pointerEvents="none"
          className="
            absolute
            inset-0
            bg-black/25
          "
        />

        {/* TALENT */}

        {talent && (
          <View
            className="
              absolute
              bottom-[10px]
              left-[10px]
            "
          >

            <View
              className="
                rounded-md
                border
                border-yellow-500/20
                bg-black/65
                px-2
                py-[5px]
              "
            >

              <View className="flex-row items-center">

                <Ionicons
                  name="sparkles-outline"
                  size={11}
                  color="#EAB308"
                />

                <Text
                  style={{
                    fontSize: width / 43,
                  }}
                  className="
                    ml-[4px]
                    font-bold
                    uppercase
                    tracking-[0.7px]
                    text-white/85
                  "
                >
                  {talent}
                </Text>

              </View>

            </View>

          </View>
        )}

      </View>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <View
        className="
          mt-1
          flex-row
          items-end
          justify-between
          rounded-b-[5px]
          border-b-[0.5px]
          border-l-[0.5px]
          border-r-[0.5px]
          border-[gold]/40
          bg-[#000000]
          p-2
        "
      >

        {/* ARENAS */}

        <View className="items-center p-1">

          <View className="flex-row items-center">

            <Ionicons
              name="flame"
              size={width / 27}
              color="#EAB308"
            />

            <Text
              style={{
                fontSize: width / 30,
              }}
              className="
                ml-[4px]
                font-bold
                text-white/85
              "
            >
              {arenaCount}
            </Text>

          </View>

          <Text
            style={{
              fontSize: width / 44,
            }}
            className="
              mt-[4px]
              font-bold
              text-white/65
            "
          >
            ARENAS
          </Text>

        </View>

        {/* FRIENDS */}

        <View className="items-center p-1">

          <View className="flex-row items-center">

            <Ionicons
              name="people"
              size={width / 27}
              color="#EAB308"
            />

            <Text
              style={{
                fontSize: width / 30,
              }}
              className="
                ml-[4px]
                font-bold
                text-white/85
              "
            >
              {friendCount}
            </Text>

          </View>

          <Text
            style={{
              fontSize: width / 44,
            }}
            className="
              mt-[4px]
              font-bold
              text-white/65
            "
          >
            FRIENDS
          </Text>

        </View>

        {/* FOLLOWERS */}

        <View className="items-center p-1">

          <View className="flex-row items-center">

            <Ionicons
              name="person-add"
              size={width / 27}
              color="#EAB308"
            />

            <Text
              style={{
                fontSize: width / 30,
              }}
              className="
                ml-[4px]
                font-bold
                text-white/85
              "
            >
              {followerCount}
            </Text>

          </View>

          <Text
            style={{
              fontSize: width / 44,
            }}
            className="
              mt-[4px]
              font-bold
              text-white/65
            "
          >
            FOLLOWERS
          </Text>

        </View>

      </View>

    </TouchableOpacity>
  );
};

export default UserProfileCard;