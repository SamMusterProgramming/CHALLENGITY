import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { icons, images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SearchIcon } from "./custom/searchIcon";
import { NotificationIcon } from "./custom/notificationIcon";
import { FollowingIcon } from "./custom/followingIcon";
import ProfileIcon from "../svgIcons/profileIcon";

export default function HeaderApp({
  user,
  showNotifications,
  showFavourite,
  setShowNotifications,
  setShowProfile,
  setShowFavourite,
  showSearch,
  setShowSearch,
  width,
  height,
  headerHeight,
  setMissionVisible,
}) {
  const { notifications = [] , scale , spacing } = useGlobalContext();
  const { width: screenWidth } = useWindowDimensions();

  const unread = notifications.filter((n) => !n.isRead).length;

  const GOLD = "#E8B95A";
  const LIGHT_GOLD = "#FFE9A6";

  const compact = screenWidth < 350;
  const controlSize = compact ? 33 : 37;
  const iconSize = compact ? scale(28) : scale(25);
  const navButtonWidth = compact ? 29 : 44;
  const navHeight = compact ? scale(38) : scale(40);

  // Replace this with your chosen local or remote image.
  // Example: require("../../assets/images/header-background.jpg")
  const HEADER_BACKGROUND = images.header;

  return (
    <View className="w-full pb- 4 bg- [#070707] px- 2 pt- 1 ">

          {HEADER_BACKGROUND ? (
          <Image
            source={HEADER_BACKGROUND}
            resizeMode="cover"
            className="absolute inset-0 h-full w-full"
            style={{ opacity: 0.62 }}
          />
        ) : null}

         <LinearGradient
          pointerEvents="none"
          colors={[
            "rgba(5,5,5,0.42)",
            "rgba(12,9,5,0.68)",
            "rgba(5,5,5,0.42)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
         />

       


      <View
        className="relative w-full pb-3 py- 2 overflow-hidden rounded-xl bo rder bor der-[#8F6A2B] b g-[#090806]"
        // style={{ minHeight: 76 }}
      >
   
        {/* Header content */}
        <View
          className="w-full flex-row  bord er bor der-white justify-between items-center"
          style={{
            // height: 76,
            // paddingHorizontal: compact ? 6 : 9,
            paddingVertical: 7,
          }}  >

          {/* Text-only ITRI logo */}
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="About ITRI"
            onPress={() => setMissionVisible(true)}
            className=""
            style={{
              marginLeft : scale(14),
              // flex: 1,
              // minWidth: 0,
              // alignItems: "flex-start ",
            }}  >

            <Text
              numberOfLines={1}
              style={{
                color: LIGHT_GOLD,
                fontSize: compact ? 21 : 38,
                fontWeight: "400",
                letterSpacing: compact ? 2.5 : 3.5,
                // lineHeight: compact ? 25 : 29,
                includeFontPadding: false,
              }}
            >
              ITRI
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: GOLD,
                fontSize: compact ? 5.5 : 6.5,
                fontWeight: "700",
                letterSpacing: compact ? 0.8 : 1.3,
                marginTop: scale(-1),
                includeFontPadding: false,
              }}
            >
              TALENT JOURNEY
            </Text>
          </TouchableOpacity>




          {/* Center navigation capsule */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexShrink: 0,
              // marginLeft: compact ? 4 : 10,
              gap: compact ? 5 : 9,
            }}  >


            {/* GOLD-FRAMED NAVIGATION CAPSULE */}
            <View
              style={{
                borderRadius: 999,
                padding: 4,
                borderWidth: 1,
                borderColor: "rgba(255,222,145,0.62)",
                // backgroundColor: "rgba(232,185,90,0.08)",
                // shadowColor: "#E8B95A",
                // shadowOffset: { width: 0, height: 0 },
                // shadowOpacity: 0.18,
                // shadowRadius: 7,
                // elevation: 3,
              }}
              className = "flex-row justify-between items-center px -4"   >
         
                {/* DISCOVERY */}
                <TouchableOpacity
                  activeOpacity={0.65}
                  accessibilityRole="button"
                  accessibilityLabel="Discover talents"
                  onPress={() => setMissionVisible(true)}
                  style={{
                    width: compact ? navButtonWidth: navButtonWidth,
                    height: controlSize,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: LIGHT_GOLD,
                      fontSize: compact ? scale(23) : scale(25),
                      includeFontPadding: false,
                      textShadowColor: "rgba(255,222,145,0.65)",
                      textShadowRadius: 5,
                    }}
                  >
                    ✦
                  </Text>
                </TouchableOpacity>

                {/* DIVIDER */}
                <View
                  style={{
                    width: 1,
                    height: controlSize * 0.48,
                    backgroundColor: "rgba(255,222,145,0.45)",
                  }}
                />

                {/* SEARCH */}
                <TouchableOpacity
                  activeOpacity={0.65}
                  accessibilityRole="button"
                  accessibilityLabel="Search talents and opportunities"
                  onPress={() => setShowSearch(true)}
                  style={{
                    width: compact ? navButtonWidth : navButtonWidth,
                    height: controlSize,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchIcon
                    size={compact ? iconSize: iconSize}
                    color={LIGHT_GOLD}
                  />
                </TouchableOpacity>

                {/* DIVIDER */}
                <View
                  style={{
                    width: 1,
                    height: controlSize * 0.48,
                    backgroundColor: "rgba(255,222,145,0.45)",
                  }}
                />

                {/* FOLLOWING */}
                <TouchableOpacity
                  activeOpacity={0.65}
                  accessibilityRole="button"
                  accessibilityLabel="Following"
                  onPress={() => setShowFavourite(true)}
                  style={{
                    width: compact ? navButtonWidth : navButtonWidth,
                    height: controlSize,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FollowingIcon
                    size={compact ? iconSize: iconSize + 2}
                    color={LIGHT_GOLD}
                  />
                </TouchableOpacity>
         
            </View>

  
          </View>



         <View
         className = "flex-row gap-2">
           
                     {/* NOTIFICATION MEDALLION */}
                     <TouchableOpacity
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={
                unread > 0
                  ? `Notifications, ${unread} unread`
                  : "Notifications"
              }
              onPress={() =>
                setShowNotifications(!showNotifications)
              }
              style={{
                // width: controlSize + 2,
                // height: controlSize + 2,
                borderRadius: 999,
                padding: 8,
                borderWidth: 1,
                borderColor: "rgba(255,222,145,0.76)",
                // backgroundColor: "rgba(232,185,90,0.08)",
                alignItems: "center",
                justifyContent: "center",
           
              }}
            >
              {/* <LinearGradient
                colors={["#241A0C", "#090807", "#171006"]}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              > */}
                <NotificationIcon
                  size={compact ? iconSize : iconSize }
                  color={LIGHT_GOLD}
                />

                {unread > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -2,
                      right: -2,
                      minWidth: 16,
                      height: 16,
                      paddingHorizontal: 3,
                      borderRadius: 9,
                      borderWidth: 1,
                      borderColor: "#080706",
                      backgroundColor: "#D71920",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 8,
                        fontWeight: "800",
                        includeFontPadding: false,
                      }}
                    >
                      {unread > 99 ? "99+" : unread}
                    </Text>
                  </View>
                )}
              {/* </LinearGradient> */}
            </TouchableOpacity>

            {/* PROFILE MEDALLION */}
            <TouchableOpacity
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Open profile"
              onPress={() => setShowProfile(true)}
              style={{
                // width: controlSize + 3,
                // height: controlSize + 3,
                borderRadius: 999,
                padding: 8,
                borderWidth: 1,
                borderColor: "rgba(255,222,145,0.88)",
                // backgroundColor: "rgba(232,185,90,0.12)",
              
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <LinearGradient
                colors={["#FFE9A6", "#A96716", "#E8B95A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 999,
                  padding: 1,
                }}
              > */}
                {/* <View
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    padding: 1,
                    backgroundColor: "#100D08",
                  }}
                > */}
                  <Image
                    source={
                      user?.profileImage?.publicUrl
                        ? { uri: user.profileImage.publicUrl }
                        : icons.avatar
                    }
                    resizeMode="cover"
                    style={{
                      width: iconSize ,
                      height: iconSize , 
                      borderRadius : 999
                    }}
                  />
                {/* </View> */}
              {/* </LinearGradient> */}
            </TouchableOpacity>
      
         </View>


        </View>

  
      </View>
    </View>
  );
}