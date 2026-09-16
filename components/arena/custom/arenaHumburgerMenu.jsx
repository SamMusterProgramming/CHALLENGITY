import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ArenaHumburgerMenu({ showArenaMenu, setShowArenaMenu , size}) {
  return (
    <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => setShowArenaMenu(!showArenaMenu)}
    style={{
        width: size,
        height: size,
        borderRadius: 12,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        zIndex:50
    }}
    >
    <MaterialCommunityIcons
        name="dots-vertical"
        size={22}
        color="#fff"
    />
</TouchableOpacity>
  )
}