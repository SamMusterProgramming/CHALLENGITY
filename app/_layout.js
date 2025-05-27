import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native'
import { GlobalProvider } from '../context/GlobalProvider'
export default function rootLayout() {
  return (
    
    <GlobalProvider>
     <Stack
     screenOptions={{ 
     }}>
       <Stack.Screen name='index' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='(tabs)' options={{ headerShown:false}} />   
       <Stack.Screen name='(auth)' options={{ headerShown:false}} />
       <Stack.Screen name='ChallengeDisplayer' options={{ headerShown:false,unmountOnBlur: true}} />
       {/* <Stack.Screen name='NewChallenge' options={{ headerShown:false ,unmountOnBlur: true}} /> */}
       <Stack.Screen name='CreateParticipateChallenge' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='ViewProfile' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='SetUpProfile' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='favouriteChallenges' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='CoverChallengePage' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='CoverNewChallenge' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='RecordChallenge' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='SearchFriend' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='challengeManagement' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='ParticipationManagement' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='PlayModeChallenges' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='WatchList' options={{ headerShown:false,unmountOnBlur: true}} />


     </Stack>
     </GlobalProvider>
   
  )
}

const styles = StyleSheet.create({})