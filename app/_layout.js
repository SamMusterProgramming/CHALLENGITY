import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { GlobalProvider } from '../context/GlobalProvider'
import * as SystemUI from 'expo-system-ui';

SystemUI.setBackgroundColorAsync('#000000');

export default function rootLayout() {

  SystemUI.setBackgroundColorAsync('#000000');

  return (
    

    <GlobalProvider>
     <Stack
     screenOptions={{ 
     }}>
       <Stack.Screen name='index' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='Home' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='ViewProfile' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='SetUpProfile' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='favouriteChallenges' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='CoverNewChallenge' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='SearchFriend' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='WatchList' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='FSinstantChallengeDisplayer' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='TalentContestRoom' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='DisplayEdition' options={{ headerShown:false,unmountOnBlur: true}} />
    


     </Stack>
     </GlobalProvider>

   
  )
}

const styles = StyleSheet.create({})