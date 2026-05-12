


import { Image, Text, View, TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
export default function HeaderApp({
  user,
  showNotifications,
  setShowNotifications,
  setShowProfile,
  width,
  height,

  title = "Challengify"
}) {

  const { notifications } = useGlobalContext();
  const unread = notifications.filter(n => !n.isRead).length;
  const avatarSize = height* 0.04;

  return (
    <View
      className = "flex-row items-center py- 2 px -2  justify-between w-full b g-[#5b4c40]"
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
       className=" bg-[#171717] w-[33%] justify-center rounded-tr-xl items-center">
           <Image
              source={icons.talentify_logo}
              style={{
                width: avatarSize * 4,
                height: avatarSize 
              }}
              resizeMethod="cover"
              className="mt-1"
            />
      </View>
      
      <View 
      className="flex-row w-[33%] h-[100%] b g-[white]  rounded-tl-xl justify-end   items-center  gap-4">
  
            <TouchableOpacity
              className="h- [100%] justify-center items-center ">
              <Image
                source={icons.search}
                style = {{ width:avatarSize * 0.8 , height:avatarSize * 0.8 }}
                resizeMethod="cover"
               />
            </TouchableOpacity>
         
            <TouchableOpacity
            className="h- [100%] justify-center items-center "
              onPress={() => setShowNotifications(!showNotifications)}
              >
               <Image
                source={icons.notification}
                style = {{ width:avatarSize * 0.8  , height:avatarSize * 0.8  }}
                resizeMethod="cover"
               />
              {unread > 0 && (
                <View className="absolute top-0 -right-1 bg-red-800 w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-white text-[10px] font-bebas tracking-wide">
                    {unread}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> setShowProfile(true)}
            className = "mr-2"
            >
              {user ? (
                <Image
                  source={{ uri: user?.profileImage?.publicUrl }}
                  style={{
                    width: avatarSize * 0.8,
                    height: avatarSize * 0.8
                  }}
                  className="rounded-full  bor der-[#ffd700]"
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
            </TouchableOpacity>

      </View>
    </View>
  );
}