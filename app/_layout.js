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
       <Stack.Screen name='index' options={{ headerShown:false}} />
       <Stack.Screen name='(tabs)' options={{ headerShown:false}} />   
       <Stack.Screen name='(auth)' options={{ headerShown:false}} />
       <Stack.Screen name='ChallengeDisplayer' options={{ headerShown:false}} />
       <Stack.Screen name='CreateChallenge' options={{ headerShown:false}} />
       <Stack.Screen name='CreateParticipateChallenge' options={{ headerShown:false}} />


       <Stack.Screen name='login' options={{ headerShown:false}} />
     </Stack>
     </GlobalProvider>
   
  )
}

const styles = StyleSheet.create({})