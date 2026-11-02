import React, {
    useMemo,
  } from "react";
  
  import {
    View,
    Text,
    Pressable,
  } from "react-native";
  
  import {
    useGlobalContext,
  } from "../../../../context/GlobalProvider";
  
  import StagePortalIcon
    from "../../../svgIcons/StagePortalIcon";
  
  import ArenaPortalIcon
    from "../../../svgIcons/ArenaPortalIcon";
import { ProfileIcon } from "../../../svgIcons/profileIcon";
import FollowersIcon from "../../../svgIcons/others/followersIcon";
  
  export default function IdentityGlobalStats() {
  
    const {
      userArenas,
      userFriendData,
      userTalents,
      userFollowers,
      spacing,
      scale,
    } = useGlobalContext();
  
    const stats = useMemo(
      () => [
        {
          id: "arenas",
          label: "ARENAS",
          value: userArenas?.length || 0,
          icon: ArenaPortalIcon,
        },
        {
          id: "stages",
          label: "STAGES",
          value: userTalents?.length || 0,
          icon: StagePortalIcon,
        },
        {
          id: "followers",
          label: "FOLLOWERS",
          value: userFollowers?.length || 0,
          icon: FollowersIcon,
        },
        {
          id: "friends",
          label: "FRIENDS",
          value: userFriendData?.friends.length || 0,
          icon: ProfileIcon,
        },
      ],
      [
        userArenas,
        userTalents,
        userFriendData,
      ]
    );
  
    return (
      <View
        className="w-full"
        style={{
          paddingHorizontal: spacing(22),
          paddingTop: spacing(16),
          paddingBottom: spacing(20),
        }}
      >
        <View
          className="flex-row justify-between items-start"
          style={{
            // minHeight: spacing(58),
          }}
        >
          {stats.map((stat, index) => {
  
            const Icon = stat.icon;
  
            return (
              <React.Fragment key={stat.id}>
  
                <Pressable
                  className="flex -1 items-center"
                  style={{
                    paddingVertical: spacing(5),
                  }}
                >
  
                  {/* ICON + COUNT */}
                  <View
                    className="flex-row items-center justify-center"
                    style={{
                      minHeight: spacing(32),
                    }}
                  >
  
                    {Icon && (
                      <View
                        className="items-center justify-center"
                        style={{
                          marginRight: spacing(7),
                        }}
                      >
                        <Icon
                          size={scale(20)}
                        />
                      </View>
                    )}
  
                    <Text
                      className="text-white"
                      style={{
                        fontSize: scale(11),
                        lineHeight: spacing(27),
                        fontWeight: "800",
                        letterSpacing: -0.6,
                      }}
                    >
                      {stat.value}
                    </Text>
  
                  </View>
  
                  {/* LABEL */}
                  <Text
                    className="text-[#c0c0c0]"
                    style={{
                      marginTop: spacing(0),
                      fontSize: scale(8.5),
                      lineHeight: spacing(13),
                      fontWeight: "700",
                      letterSpacing: scale(0.35),
                    }}
                  >
                    {stat.label}
                  </Text>
  
                </Pressable>
  
                {/* DIVIDER */}
                {index < stats.length - 1 && (
                  <View
                    className="bg-white/20 self-center"
                    style={{
                      width: scale(1),
                      height: spacing(40),
                    }}
                  />
                )}
  
              </React.Fragment>
            );
          })}
        </View>
      </View>
    );
  }