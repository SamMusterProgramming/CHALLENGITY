import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import {icons} from '../../constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider'




export default function tabsLayout() {
  const {user} = useGlobalContext()
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


  return (

    
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'caramelf',
        // tabBarIconStyle:{
          
        // },
          tabBarStyle: {
          position:'absolute',
          marginLeft:"5%",
          bottom:Platform.OS =="ios" ? 20:2,
          backgroundColor: 'black',
          width:'90%',
          height: 55,
          borderRadius: 35,
          alignItems:'start',
          justifyContent:"center",
          display:'flex',
          elevation: 0,
          shadowOpacity: 10,
          borderTopWidth: 0,
          flexDirection:'row'
        },
        tabBarLabelStyle: {
          fontSize: 1,
          fontWeight: "800",
          },
      tabBarShowLabel:true
    }}>
      <Tabs.Screen 
        name='timeline'
        options={{
          tabBarLabel: '',
          title:"home",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => (
            <View
            className ="rounded-full justify-center items-center "
            style={{width:size+20 ,height:size+20,marginTop:17 , backgroundColor: focused?"white": "transparent"}}
          >
              <Image
                source={focused ? icons.home : icons.home}
                style={{ width: size+10, height:size+10, tintColor: "none"}}
              />
          </View>
          )
        }}
       />
      <Tabs.Screen 
        name='NewChallenge'
        options={{
          tabBarLabel: '',
          unmountOnBlur: true,
          title:"New Challenge",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => ( 
            <View
              className ="rounded-full justify-center items-center "
              style={{width:size+20 ,height:size+20,marginTop:17 , backgroundColor: focused?"white": "transparent"}}
            >
                <Image
                  source={focused ? icons.challenge : icons.challenge}
                  style={{ width: size+10, height:size+10, tintColor: "none"}}
                />
            </View>
          
          )
        }}
       />
        <Tabs.Screen 
        name='notifications'
        options={{
          tabBarLabel: '',
          title:"notifications",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => (
            <View
            className ="rounded-full justify-center items-center "
            style={{width:size+20 ,height:size+20,marginTop:17 , backgroundColor: focused?"white": "transparent"}}
             >
              <Image
              source={focused ? icons.notification : icons.notification}
              style={{ width: size+10, height:10+size, tintColor: "none"}}
              />
        </View>
          )
        }}
       />
        <Tabs.Screen 
        name='profile'
        options={{
          tabBarLabel: '',
          unmountOnBlur: true,
          title:"profile",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => ( 
            <View
              className ="rounded-full justify-center items-center "
              style={{width:size+20 ,height:size+20,marginTop:15 , backgroundColor: focused?"white": "transparent"}}
            >
              <Image
              source={{ uri :focused ? user.profile_img: user.profile_img }}
              className ="rounded-full w-15 h-15"
              style={{ width: size+10, height: size+10, tintColor: "none"}}
              />
            </View>
          )
        }}
       />
    </Tabs>
  )
}
const styles = StyleSheet.create({})