import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { GlobalProvider} from '../context/GlobalProvider'
import * as SystemUI from 'expo-system-ui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LoadingProvider } from '../context/loadingContext';
import InAppNotification from '../components/notification/InAppNotification';
import { useNotificationSetup } from '../notifications/useNotificationSetup';




SystemUI.setBackgroundColorAsync('#000000');

export default function rootLayout() {

  SystemUI.setBackgroundColorAsync('#000000');
  useNotificationSetup();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>
    <GlobalProvider>
    <LoadingProvider>
    <View style={{ flex: 1 ,backgroundColor: "#000"}}>
      <Stack
      screenOptions={{ 
      }}>
        <Stack.Screen name='Login' options={{ headerShown:false,unmountOnBlur: true}} />
        <Stack.Screen name='signup' options={{ headerShown:false,unmountOnBlur: true}} />
        <Stack.Screen name='index' options={{ headerShown:false,unmountOnBlur: true}} />
        <Stack.Screen name='Home' options={{ headerShown:false,unmountOnBlur: true}} />
        <Stack.Screen name='ViewProfile' options={{ headerShown:false,unmountOnBlur: true}} />
        <Stack.Screen name='SetUpProfile' options={{ headerShown:false,unmountOnBlur: true}} />
        {/* <Stack.Screen name='favouriteChallenges' options={{ headerShown:false,unmountOnBlur: true}} /> */}
        {/* <Stack.Screen name='CoverNewChallenge' options={{ headerShown:false,unmountOnBlur: true}} /> */}
        {/* <Stack.Screen name='SearchFriend' options={{ headerShown:false,unmountOnBlur: true}} /> */}
        {/* <Stack.Screen name='WatchList' options={{ headerShown:false,unmountOnBlur: true}} /> */}
        {/* <Stack.Screen name='FSinstantChallengeDisplayer' options={{ headerShown:false,unmountOnBlur: true}} /> */}
        <Stack.Screen name='TalentContestRoom' options={{ headerShown:false,unmountOnBlur: true}} />
        <Stack.Screen name='CreatePerformance' options={{ headerShown:false,unmountOnBlur: true}} />
        <Stack.Screen name='arenaPerformancePlayer' options={{ headerShown:false,unmountOnBlur: true}} />
      </Stack>
         {/* 🚀 GLOBAL FOREGROUND BANNER */}
     <InAppNotification />
     </View>
     </LoadingProvider>
     </GlobalProvider>
     </BottomSheetModalProvider>
     </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({})