import React from "react";

import {
  View,
  Text,
  Image,
} from "react-native";

import {
  useGlobalContext,
} from "../../../../context/GlobalProvider";

import CountryFlag from "../../../common/CountryFlag";

export default function ProfileInfos({
  user,
}) {
  const {
    scale,
    spacing,
  } = useGlobalContext();

  const profileImage =
    // user?.profileImage?.cdncUrl ||
    user?.profileImage?.publicUrl;

  const countryCode =
    user?.country;

  const city =
    user?.city;

  const state =
    user?.state;

  const name =
    user?.name ||
    "Unknown";

  const username =
    user?.username
      ? user.username.startsWith("@")
        ? user.username
        : `@${user.username}`
      : null;

  const regionLabel =
    [city, state]
      .filter(Boolean)
      .join(" · ");

  const talent =
    user?.talent &&
    user.talent.toLowerCase() !== "add your profession"
      ? user.talent
      : null;

  const bio =
    user?.bio?.trim() ||
    user?.tellus?.trim() ||
    null;

  const avatarSize = scale(96);

  return (
    <View
      className="w-full"
      style={{
        minHeight: avatarSize + spacing(24),
      }}
    >
      {/* ===================================================== */}
      {/* AVATAR                                                */}
      {/* ===================================================== */}

      <View
        className="absolute rounded-full border-[#F4C542] bg-[#101114]"
        style={{
          left: 0,
          bottom: spacing(18),
          width: avatarSize,
          height: avatarSize,
          borderWidth: scale(4),
        }}
      >
        {profileImage ? (
          <Image
            source={{
              uri: profileImage,
            }}
            resizeMode="cover"
            className="h-full w-full rounded-full"
          />
        ) : (
          <View className="h-full w-full items-center justify-center rounded-full bg-[#181A1F]">
            <Text
              style={{
                color: "#F4C542",
                fontSize: scale(28),
                fontWeight: "800",
              }}
            >
              {name?.charAt(1)?.toUpperCase() || "?"}
            </Text>
          </View>
        )}
      </View>

      {/* ===================================================== */}
      {/* USER INFORMATION                                      */}
      {/* ===================================================== */}

      <View
        className="flex-1"
        style={{
          marginLeft: avatarSize + spacing(16),
          paddingBottom: spacing(18),
          minHeight: avatarSize,
          justifyContent: "flex-end",
        }}
      >
        {/* =================================================== */}
        {/* NAME                                                */}
        {/* =================================================== */}

        <Text
          numberOfLines={1}
          className="text-white"
          style={{
            fontSize: scale(20),
            lineHeight: spacing(25),
            fontWeight: "800",
            letterSpacing: -0.5,
          }}
        >
          {name}
        </Text>

        {/* =================================================== */}
        {/* USERNAME                                            */}
        {/* =================================================== */}

        {username && (
          <Text
            numberOfLines={1}
            className="text-white/45"
            style={{
              marginBottom: spacing(6),
              fontSize: scale(11),
              lineHeight: spacing(16),
              fontWeight: "500",
              letterSpacing: 0.2,
            }}
          >
            {username}
          </Text>
        )}

        {/* =================================================== */}
        {/* TALENT                                              */}
        {/* =================================================== */}

        {/* {talent && (
          <Text
            numberOfLines={1}
            className="text-white/80"
            style={{
              marginTop: spacing(7),
              fontSize: scale(12),
              lineHeight: spacing(17),
              fontWeight: "700",
              letterSpacing: 0.1,
            }}
          >
            {talent}
          </Text>
        )} */}

        {/* =================================================== */}
        {/* REGION                                              */}
        {/* =================================================== */}

        {(countryCode || regionLabel) && (
          <View
            className="self-start flex-row items-end"
            style={{
              marginTop: spacing(5),
            }}
          >
            {regionLabel && (
              <Text
                numberOfLines={1}
                className="text-[#f4eedd]"
                style={{
                  fontSize: scale(10),
                  fontWeight: "700",
                  letterSpacing: scale(0.7),
                }}
              >
                {regionLabel.toUpperCase()}
              </Text>
            )}

            {countryCode && (
              <View
                className="items-center justify-center"
                style={{
                  marginLeft: spacing(8),
                }}
              >
                <CountryFlag
                  code={countryCode}
                  size={scale(15)}
                />
              </View>
            )}
          </View>
        )}

        {/* =================================================== */}
        {/* BIO — SIGNATURE                                     */}
        {/* =================================================== */}

        {bio && (
          <View
            style={{
              marginTop: spacing(9),
              // paddingLeft: spacing(10),
              // borderLeftWidth: scale(2),
              // borderLeftColor: "#F4C542",
            }}
            className = "flex-row flex- 1"
          >
            {talent && (
            <Text
              numberOfLines={1}
              className="text-gold uppercase"
              style={{
                // marginTop: spacing(7),
                fontSize: scale(10),
                lineHeight: spacing(17),
                fontWeight: "600",
                letterSpacing: 0.2,
              }}   >
              {talent} {' *  '}
            </Text>
            )}

            <Text
              numberOfLines={1}
              className="text-white/75 flex-1 upper case "
              style={{
                fontSize: scale(10),
                lineHeight: spacing(17),
                fontWeight: "400",
                // fontStyle: "italic",
                letterSpacing: 0.1,
              }}
            >
              {bio}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}