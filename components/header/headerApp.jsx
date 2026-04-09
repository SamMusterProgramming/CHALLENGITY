


import { Image, Text, View, TouchableOpacity } from "react-native";
import NotificationSearchNav from "../talent/custom/NotificationSearchNav";
import { icons } from "../../constants";
import ChallengifyLogo from "../custom/ChallengifyLogo";
import { LinearGradient } from "expo-linear-gradient";

export default function HeaderApp({
  user,
  showNotifications,
  setShowNotifications,
  setShowProfile,
  width,
  headerHeight,
  title = "Challengify"
}) {

  const avatarSize = headerHeight * 0.35;

  return (
    <View
      style={{ height: headerHeight * 0.40 }}
      className = "flex-row items-center w-full justify-between px-1 b g-[#0b1e35] "
    >
      <LinearGradient
          pointerEvents="none"
          colors={["rgba(50, 50, 120, 0.3)", "transparent"]}
          style={{
            position: "absolute",
            top: 0,
            alignSelf: "center",
            width: "100%",
            height: "70%",
            // borderRadius: 10,
          }}
        />
         <LinearGradient
          pointerEvents="none"
          colors={["transparent", "rgba(50, 50, 120, 0.3)"]}
          style={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: "100%",
            height: "70%",
            // borderRadius: 10,
          }}
        />

      {/* LEFT - LOGO */}
      {/* <View className="flex-row items-center"> */}
        <ChallengifyLogo size={headerHeight/5} />
      {/* </View> */}

      {/* CENTER - TITLE */}
      {/* <View className="flex-1 items-center">
        <Text
          className="text-white font-bold tracking-wider"
          style={{ fontSize: headerHeight * 0.18 }}
        >
          {title}
        </Text>
      </View> */}

      {/* RIGHT - ACTIONS */}
      <View className="flex-row items-center gap-4">

        <NotificationSearchNav
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          headerHeight={headerHeight}
        />

        {/* USER AVATAR */}
        <TouchableOpacity
         onPress={()=> setShowProfile(true)}
        >
          {user ? (
            <Image
              source={{ uri: user?.profileImage?.publicUrl }}
              style={{
                width: avatarSize,
                height: avatarSize
              }}
              className="rounded-full border border-[#ffd700]"
            />
          ) : (
            <Image
              source={icons.avatar}
              style={{
                width: avatarSize,
                height: avatarSize
              }}
              className="rounded-full"
            />
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}