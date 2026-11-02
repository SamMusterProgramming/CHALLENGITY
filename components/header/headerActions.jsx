import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const HeaderActions = ({
  user,
  unread,
  avatarSize,
  scale,
  spacing,
  gold,
  softGold,
  showNotifications,
  setShowNotifications,
  setShowFavourite,
  setShowSearch,
  setShowProfile,
  icons,
}) => {
  const actionWidth = avatarSize + spacing(6);
  const iconAreaHeight = scale(27);

  return (
    <View
      style={{
        flex: 1,
        // height: scale(44),
        justifyContent: "center",
        marginLeft: spacing(10),
      }}
    >
      {/* ACTION ROW */}
      <View
        style={{
          flexDirection: "row",
        //   alignItems: "end",
          justifyContent: "flex-end",
          gap: spacing(5),
          flex:1
        }}
        className = " flex-row">

        {/* FAVOURITES */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowFavourite(true)}
          style={{
            width: actionWidth,
            // height: scale(44),
            alignItems: "center",
            // justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: avatarSize,
            //   height: iconAreaHeight,
            //   alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5
                name="user"
                size={scale(21)}
                color={gold}
            />
          </View>

        </TouchableOpacity>

        {/* SEARCH */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowSearch(true)}
          style={{
            width: actionWidth,
            // height: scale(44),
            alignItems: "center",
            // justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: avatarSize,
            //   height: iconAreaHeight,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
             <FontAwesome6
                name="magnifying-glass"
                size={scale(22)}
                color={gold}
                iconStyle="regular"
            />
          </View>

        </TouchableOpacity>

        {/* NOTIFICATIONS */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            setShowNotifications(!showNotifications)
          }
          style={{
            width: actionWidth,
            // height: scale(44),
            alignItems: "center",
            // justifyContent: "flex-start",
            // position: "relative",
          }}
        >
          <View
            style={{
              width: avatarSize,
            //   height: iconAreaHeight,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
              <FontAwesome6
                    name="bell"
                    size={scale(22)}
                    color={gold}
                    iconStyle="regular"
                />
          </View>

          {unread > 0 && (
            <View
              style={{
                position: "absolute",
                top: scale(0),
                right: scale(0),
                minWidth: scale(12),
                height: scale(12),
                paddingHorizontal: scale(2),
                borderRadius: scale(6),
                backgroundColor: "#8B2020",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: scale(6),
                  fontWeight: "700",
                  includeFontPadding: false,
                }}
              >
                {unread > 99 ? "99+" : unread}
              </Text>
            </View>
          )}

        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => setShowProfile(true)}
          style={{
            width: actionWidth,
            // height: scale(40),
            alignItems: "center",
            justifyContent: "flex-center",
          }}
        >
          <View
            style={{
              width: avatarSize,
            //   height: iconAreaHeight,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: scale(22),
                height: scale(22),
                borderRadius: 999,
                borderWidth: 1,
                borderColor: gold,
                padding: 1,
              }}
            >
              {user?.profileImage?.publicUrl ? (
                <Image
                  source={{
                    uri: user.profileImage.publicUrl,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: scale(10),
                  }}
                />
              ) : (
                <Image
                  source={icons.avatar}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: scale(10),
                  }}
                />
              )}
            </View>
          </View>

        </TouchableOpacity>
      </View>

      {/* ARCHITECTURAL BASELINE */}
  
      {/* <View
        style={{
            flexDirection: "row",
            alignItems: "center",
        }}
        className="justify-end  " >
            <View
                style={{
                // width: scale(14),
                height: 1,
                backgroundColor: "rgba(212,175,30, 0.5)",
                marginRight: scale(5),
                }}
                className = "flex-1"
            />

            <MaterialCommunityIcons
                name="star-four-points"
                size={scale(6)}
                color="rgb(212,175,30)"
            />

            <View
                style={{
                // width: scale(24),
                height: 1,
                backgroundColor: "rgba(212,175,30, 0.5)",
                marginHorizontal: scale(5),
                }}
                className = "flex-1"
            />

            <MaterialCommunityIcons
                name="star-four-points"
                size={scale(5)}
                color="rgb(212,175,30)"
            />

            <View
                style={{
                width: scale(14),
                height: 1,
                backgroundColor: "rgba(212,175,30, 0.5)",
                marginLeft: scale(5),
                }}
                className = "flex-1"
            />
        </View> */}
    </View>
  );
};

export default HeaderActions;