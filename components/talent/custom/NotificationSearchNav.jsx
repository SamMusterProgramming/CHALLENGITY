import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'

export default function NotificationSearchNav({showNotifications , setShowNotifications}) {
    const width = Dimensions.get("window").width;

  return (
    <View
      className ="absolute h-[100%] w- [30%] right-0  flex-row justify-center items-center gap-12 px-8 py- 3 ">
        <TouchableOpacity onPress={() => setShowNotifications(!showNotifications)}>
             <AntDesign name="bell" size={width/14} color="white" />
        </TouchableOpacity>
       <Ionicons name="search-outline" size={width/14} color="white" />

       {/* {showNotifications && (
            <View className="absolute top-1 right-4 w-72 bg-zinc-900 rounded-xl p-4">
            <Text className="text-white font-bold mb-2">Notifications</Text>
            </View>
            )} */}
    </View>
  )
}