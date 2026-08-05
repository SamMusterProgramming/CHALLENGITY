


import { Image, Text, View, TouchableOpacity } from "react-native";
import { icons, images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
export default function HeaderApp({
  user,
  showNotifications,
  showFavourite,
  setShowNotifications,
  setShowProfile,
  setShowFavourite,
  width,
  height,
  headerHeight , 
  title = "Challengify"
}) {

  const { notifications } = useGlobalContext();
  const unread = notifications.filter(n => !n.isRead).length;
  const avatarSize = headerHeight * 0.35;
  const MENU_HEIGHT = headerHeight /2 

  return (
    <View
      style= {{ height:headerHeight * 0.8}}
      className = "flex-row items-center gap-2 bor der-b  bo rder-[#7d5706] rounded-tl-[40] justify-start w-full b g-[#5b4c40]"
    >
       <View 
      className="flex-row  w-[35%] h-[100%] pl-2 rounded-xl justify-start pt-4  items-center  gap-4">
           <TouchableOpacity
              onPress={() => setShowFavourite(true)}
              className="
                rounde d-xl
                bg -[#2a1f08]
                rounded-full border-2 -b border-goldSoft/80
                items-center justify-center  "
              style={{
                width:avatarSize  ,
                height :avatarSize , 
              }} >
               <MaterialCommunityIcons
                name="account-multiple-outline"
                size={30}
                color="#EAB308"
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="
                rounde d-xl
                bg -[#2a1f08]
                rounded-full border-2 -b border-goldSoft/80
                items-center justify-center
                 "
              style={{
                width:avatarSize  ,
                height :avatarSize , 
              }} >
              <Ionicons name="search" size={30} color="#eab308" />
            </TouchableOpacity>
      </View>
     
       <View
      //  style ={{width : headerHeight * 0.5 }}
       className = " flex-row flex-1 h-[100%] pb-4  justify-center items-center   ">
           <View
           className ="flex-1 border-b-4 border-goldSoft">
              <Image
                  source={images.applogo}
                  style={{
                    width: "100%" ,
                    height:  headerHeight * 0.6
                  }}
                  resizeMethod="cover"
                  className="mb-auto"
                />
            </View>
      </View>
      
      <View 
      className="flex-row  w-[35%] h-[100%]  rounded-xl justify-end pt-4 pr-2  items-center  gap-4">
            {/* <TouchableOpacity
              onPress={() => setShowFavourite(true)}
              className="
                rounde d-xl
                bg -[#2a1f08]
                rounded-full border-2 -b border-goldSoft/80
                items-center justify-center  "
              style={{
                width:avatarSize  ,
                height :avatarSize , 
              }} >
                <Ionicons name="heart-outline" size={30} color="#eab308" />
            </TouchableOpacity>

            <TouchableOpacity
              className="
                rounde d-xl
                bg -[#2a1f08]
                rounded-full border-2 -b border-goldSoft/80
                items-center justify-center
                 "
              style={{
                width:avatarSize  ,
                height :avatarSize , 
              }} >
              <Ionicons name="search" size={30} color="#eab308" />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => setShowNotifications(!showNotifications)}
              style={{
                width:avatarSize ,
                height :avatarSize 
              }}
              className="
                roun ded-xl
                bg- gold/80
                rounded-full border-2 -b border-goldSoft/80
                items-center justify-center">
              <Ionicons name="notifications-outline" size={30} color="#eab308" />
              {unread > 0 && (
                <View className="absolute top-[0]  right-[0] bg-red-800 w-4 h-4 rounded-md items-center justify-center">
                  <Text className="text-white text-[7px] font-bold track ing-wide">
                    {unread}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> setShowProfile(true)}
            className = " bg -[#2a1f08]   items-center justify-center p- 1  rounded-full border-2 -b border-[#a57806] "
            style={{
              width: avatarSize ,
              height: avatarSize 
            }}
            >
              {user ? (
                <Image
                  source={{ uri: user?.profileImage?.publicUrl }}
                  style={{
                    width: "80%",
                    height: "80%"
                  }}
                  className="rounded-full"
                />
              ) : (
                <Image
                  source={icons.avatar}
                  style={{
                    width: avatarSize ,
                    height: avatarSize 
                  }}
                  className="round ed-full"
                />
              )}
              
            </TouchableOpacity>

      </View>
    </View>
  );
}