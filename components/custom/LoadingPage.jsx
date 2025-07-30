import { View, Text, ActivityIndicator, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoadingPage({text}) {
  const insets = useSafeAreaInsets();
  return (
    <View
    style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
    className="bg-primary flex-1 flex-col justify-center items-center ">
          <ActivityIndicator  size={"large"} color={"white"} />
          <Text
           style={{fontSize:12}}
           className="text-white mt-4 text-base text-md ">
            {text}
          </Text>
   </View>
  )
}