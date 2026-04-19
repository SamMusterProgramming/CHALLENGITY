import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useGlobalContext } from '../../../context/GlobalProvider';



export default function NotificationSearchNav({
  showNotifications,
  setShowNotifications,
  headerHeight
}) {

  const { notifications } = useGlobalContext();
  const unread = notifications.filter(n => !n.isRead).length;

  return (
    <View className="flex-row h-[100%] justify-center items-center gap-4">

      {/* Search */}
      <TouchableOpacity
      className="h- [100%] justify-center items-center ">
        <Ionicons
          name="search-outline"
          size={headerHeight * 0.24}
          color="white"
        />
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity
      className="h- [100%] justify-center items-center "
        onPress={() => setShowNotifications(!showNotifications)}
        // className="relative"
      >

        <AntDesign
          name="bell"
          size={headerHeight * 0.24}
          color="#FFD700"
        />

        {unread > 0 && (
          <View className="absolute top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
            <Text className="text-white text-[10px] font-bold">
              {unread}
            </Text>
          </View>
        )}

      </TouchableOpacity>

    </View>
  );
}