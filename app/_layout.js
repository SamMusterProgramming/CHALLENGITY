import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { GlobalProvider } from '../context/GlobalProvider'
import * as SystemUI from 'expo-system-ui';

SystemUI.setBackgroundColorAsync('#000000');

export default function rootLayout() {

  SystemUI.setBackgroundColorAsync('#000000');

  return (
    
    // <GestureHandlerRootView >
    <GlobalProvider>
     <Stack
     screenOptions={{ 
     }}>
       <Stack.Screen name='index' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='WelcomePage' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='(tabs)' options={{ headerShown:false ,unmountOnBlur: true}} />   
       <Stack.Screen name='(auth)' options={{ headerShown:false,unmountOnBlur: true}} />
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
       <Stack.Screen name='FSinstantChallengeDisplayer' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='TalentContestRoom' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='CreateParticipateTalent' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='ProfilePage' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='DisplayEdition' options={{ headerShown:false,unmountOnBlur: true}} />
       <Stack.Screen name='TalentContestantPlayMode' options={{ headerShown:false,unmountOnBlur: true}} />


     </Stack>
     </GlobalProvider>
    //  </GestureHandlerRootView>
   
  )
}

const styles = StyleSheet.create({})