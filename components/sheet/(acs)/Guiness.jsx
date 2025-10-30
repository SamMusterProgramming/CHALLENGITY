import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Guiness() {

  const insets = useSafeAreaInsets();

  return (
    <View
     style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
     className=" flex-1 borde-4 borde-t-0 borde-white flex-col justify-start items-center py- bg-[#0f1010]">
      <Text>Guiness</Text>
    </View>
  )
}