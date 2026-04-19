


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
      style={{ height: headerHeight * 0.50 }}
      className = "flex-row items-center w- full justify-start w-[100%] bg-[#000000] "
    >

    {/* <LinearGradient
          pointerEvents="none"
          colors={[ "rgba(55, 25, 255, 0.3)" ,"transparent"]}
          style={{
            position: "absolute",
            top: 0,
            alignSelf: "center",
            width: "100%",
            height: "70%",
         
          }}
        /> */}
     
     


        <Image
              source={icons.challengify_logo}
              style={{
                width: avatarSize * 4,
                height: avatarSize
              }}
              className="rounde d-full  b g-white"
            />
   

      <View 
      className="flex-row flex-1 h-[80%] ml-auto  justify-end  pr-2 items-center bord er-b-2 bor der-red-600 gap-4">
        
        <NotificationSearchNav
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          headerHeight={headerHeight}
        />

       
        <TouchableOpacity
         onPress={()=> setShowProfile(true)}
        >
          {user ? (
            <Image
              source={{ uri: user?.profileImage?.publicUrl }}
              style={{
                width: avatarSize * 0.8,
                height: avatarSize * 0.8
              }}
              className="rounded-full border  border-[#ffd700]"
            />
          ) : (
            <Image
              source={icons.avatar}
              style={{
                width: avatarSize * 0.8,
                height: avatarSize * 0.8
              }}
              className="rounded-full"
            />
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}