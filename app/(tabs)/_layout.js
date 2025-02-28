import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import {icons} from '../../constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


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
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'caramelf',
        tabBarIconStyle:{
            
            color:'yellow'   
        },
        // tabBarLabelStyle: { fontSize: 10 },
          tabBarStyle: {
          backgroundColor: 'white',
          width:'100%',
          height: 50,
          // borderWidth: 1,
          borderRadius: 16,
          // borderColor: 'red',
          // borderTopColor: 'yellow',
          alignItems:'start',
          justifyContent:"center",
          // position:'absolute',
          // marginBottom:0,
          display:'flex',
          flexDirection:'row'
        },
        tabBarLabelStyle: {
          fontSize: 25,
          fontWeight: "bold",
          // marginBottom: 10,
          },
      tabBarShowLabel:false
    }}>
      <Tabs.Screen 
        name='timeline'
        options={{
          title:"home",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => (
            <Ionicons
            name={ 'home' }
            size={size}
            color={color}
          />
          )
        }}
       />
      <Tabs.Screen 
        name='NewChallenge'
        options={{
          title:"profile",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => (
            //  <TabIcon 
            //    icon={icons.challenge}
            //    color={color}
            //    name="challenge"
            //    focused={focused}
            //    dimension ="w-8 h-8"
            //  />
            <Ionicons
            name={ 'home' }
            size={size}
            color={color}
          />
          )
        }}
       />
        <Tabs.Screen 
        name='notifications'
        options={{
          title:"notifications",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => (
            //  <TabIcon 
            //    icon={icons.notification}
            //    color={color}
            //    name="notifications"
            //    focused={focused}
            //    dimension ="w-8 h-8"
            //  />
            <Ionicons
            name={ 'notifications'}
            size={size}
            color={color}
            
          />
          )
        }}
       />
        <Tabs.Screen 
        name='profile'
        options={{
          title:"profile",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => (
            //  <TabIcon 
            //    icon={icons.profile}
            //    color={color}
            //    name="profile"
            //    focused={focused}
            //    dimension ="w-6 h-6"
            //  />
            <Ionicons
            name={'home'}
            size={size}
            color={color}
            
          />
          )
        }}
       />
    </Tabs>
  )
}
const styles = StyleSheet.create({})