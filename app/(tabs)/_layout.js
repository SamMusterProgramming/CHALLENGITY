import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import {icons} from '../../constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const TabIcon =({color,icon,name,focused,dimension}) =>{
  return (
    <View 
    className="items-center text-center justify-center mt-0"
    >
      <Image
        source={icon}
        resizeMode='contain'
        className ={`${dimension}`}
        tintColor={color}
        />
       
    </View>
  )
}

export default function tabsLayout() {


  return (
    <Tabs
      screenOptions={{
      tabBarStyle: {
          backgroundColor: 'white',
          width:'100%',
          height: 45,
          borderWidth: 1,
          borderRadius: 6,
          borderColor: 'red',
          borderTopColor: 'yellow',
          alignItems:'center',
          // backgroundColor: Colors.white.default,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 10,
          },
      tabBarShowLabel:false
    }}>
      <Tabs.Screen 
        name='timeline'
        options={{
          title:"home",
          headerShown:false,
          tabBarIcon:({color,focused}) => (
             <TabIcon 
               icon={icons.home}
               color={focused ?"green": color}
               name="home"
               focused={focused}
               dimension ="w-6 h-6"
             />
          )
        }}
       />
      <Tabs.Screen 
        name='NewChallenge'
        options={{
          title:"profile",
          headerShown:false,
          tabBarIcon:({color,focused}) => (
             <TabIcon 
               icon={icons.challenge}
               color={color}
               name="challenge"
               focused={focused}
               dimension ="w-8 h-8"
             />
          )
        }}
       />
        <Tabs.Screen 
        name='notifications'
        options={{
          title:"notifications",
          headerShown:false,
          tabBarIcon:({color,focused}) => (
             <TabIcon 
               icon={icons.notification}
               color={color}
               name="notifications"
               focused={focused}
               dimension ="w-8 h-8"
             />
          )
        }}
       />
        <Tabs.Screen 
        name='profile'
        options={{
          title:"profile",
          headerShown:false,
          tabBarIcon:({color,focused}) => (
             <TabIcon 
               icon={icons.profile}
               color={color}
               name="profile"
               focused={focused}
               dimension ="w-6 h-6"
             />
          )
        }}
       />
    </Tabs>
  )
}
const styles = StyleSheet.create({})