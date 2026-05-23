


import { Image, Text, View, TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Ionicons } from "@expo/vector-icons";
import { getInition } from "../../helper";
export default function HeaderApp({
  user,
  showNotifications,
  setShowNotifications,
  setShowProfile,
  width,
  height,
  headerHeight , 
  title = "Challengify"
}) {

  const { notifications } = useGlobalContext();
  const unread = notifications.filter(n => !n.isRead).length;
  const avatarSize = headerHeight * 0.5;

  return (
    <View
      style= {{ height:headerHeight * 0.5}}
      className = "flex-row items-center py- 2 px -2  justify-start w-full b g-[#5b4c40]"
    >
      {/* <View
      className="min-w-[33%]">
          <Image
              source={icons.talentify_logo}
              style={{
                width: avatarSize ,
                height: avatarSize 
              }}
              resizeMethod="cover"
              className="  b g-white"
            />
      </View> */}
      
       <View
      //  style ={{width : avatarSize * 4}}
       className=" bg-[#171717] w-[40%] justify-center rounded-tr-xl items-center">
           <Image
              source={icons.talentify_logo}
              style={{
                width: "100%",
                height: avatarSize 
              }}
              resizeMethod="cover"
              className="mt- 1"
            />
      </View>
      
      <View 
      className="flex-row w- [33%] pl-2 flex-1 h-[100%] b g-[white]  rounded-tl-xl justify-end   items-center  gap-2">
  
            {/* <TouchableOpacity
              className="h- [100%] justify-center items-center ">
              <Image
                source={icons.search}
                style = {{ width:avatarSize * 0.8 , height:avatarSize * 0.8 }}
                resizeMethod="cover"
               />
            </TouchableOpacity> */}
         
            {/* <TouchableOpacity
            className="h- [100%] justify-center items-center "
              onPress={() => setShowNotifications(!showNotifications)}
              >
               <Image
                source={icons.notification}
                style = {{ width:avatarSize * 0.8  , height:avatarSize * 0.8  }}
                resizeMethod="cover"
               />
            
            </TouchableOpacity> */}

            <TouchableOpacity
              className="
                rounded-xl
                bg-primary
                border border-[#453914]
                items-center justify-center
                shadow-lg
              "
              style={{
                width:avatarSize * 0.8 ,
                height :avatarSize * 0.8 , 
                // shadowColor: "#F7D774",
                // shadowOpacity: 0.35,
                // shadowRadius: 10,
                // shadowOffset: { width: 0, height: 4 },
                // elevation: 8,
              }}
            >
              <Ionicons name="search" size={26} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowNotifications(!showNotifications)}
              style={{
                width:avatarSize * 0.8 ,
                height :avatarSize * 0.8 , 
                // shadowColor: "#F7D774",
                // shadowOpacity: 0.35,
                // shadowRadius: 10,
                // shadowOffset: { width: 0, height: 4 },
                // elevation: 8,
              }}
              className="
                rounded-xl
                bg-primary
                border border-[#4b3f24]
                items-center justify-center">
              <Ionicons name="notifications-outline" size={26} color="#F7D774" />
              {unread > 0 && (
                <View className="absolute top-[-4]  right-[-4] bg-red-800 w-4 h-4 rounded-md items-center justify-center">
                  <Text className="text-white text-[7px] font-semibold track ing-wide">
                    {unread}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> setShowProfile(true)}
            className = "mr- 2 ml-auto  border border-[#453914] rounded-xl p- 1"
            >
              {user ? (
                <Image
                  source={{ uri: user?.profileImage?.publicUrl }}
                  style={{
                    width: avatarSize * 0.8,
                    height: avatarSize * 0.8
                  }}
                  className="rounded-xl p-1 bor der-[#ffd700]"
                />
              ) : (
                <Image
                  source={icons.avatar}
                  style={{
                    width: avatarSize ,
                    height: avatarSize 
                  }}
                  className="rounded-full"
                />
              )}
               {unread > 0 && (
                <View className="absolute top-[-4]  right-[-2] bg-blue-800 w-4 h-4 rounded-md items-center justify-center">
                  <Text className="text-white text-[7px] font-semibold tracking-normal">
                    {getInition(user.name)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

      </View>
    </View>
  );
}