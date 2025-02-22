import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


export default function authLayout() {
  return (
 
   <>
   
    <Stack>
      <Stack.Screen name='login' options={{headerShown:false}}/>
      <Stack.Screen name='signup' options={{headerShown:false}}/>
    </Stack>
    <StatusBar backgroundColor="#161622" style="light" />

   </>
  )
}
const styles = StyleSheet.create({})