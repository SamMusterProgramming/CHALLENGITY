import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ArenaRefreshButton({onRefresh , refreshing , size}) {
  return (
    <TouchableOpacity
        activeOpacity={0.85}
        onPress={onRefresh}
        disabled={refreshing}
        style={{
            position: "absolute",
            bottom: 0,
            left: 10,
            width: size,
            height: size,
            borderRadius: 21,
            backgroundColor: "rgba(17,18,20,0.92)",
            borderWidth: 1,
            borderColor: "rgba(234,179,8,0.28)",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#eab308",
            shadowOpacity: 0.18,
            shadowRadius: 12,
            shadowOffset: {
            width: 0,
            height: 4,
            },
            elevation: 8,
            zIndex: 999,
        }}
        >
        {refreshing ? (
            <ActivityIndicator
            size="small"
            color="#eab308"
            />
        ) : (
            <MaterialCommunityIcons
            name="refresh"
            size={28}
            color="#eab308"
            />
        )}
    </TouchableOpacity>
  )
}