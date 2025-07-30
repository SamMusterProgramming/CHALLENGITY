import { Image, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { router, Stack, Tabs, useSegments } from 'expo-router'
import {icons} from '../../constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider'




export default function tabsLayout() {
  
  const {user} = useGlobalContext()
  const { width, height } = useWindowDimensions();

  
  
  const TabIcon =({color,icon,name,focused,dimension}) =>{
    return (
      <View 
      className="items-center g-[#052a72] text-center justify-center mt-0"
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
    <>
    { user && (
    <Tabs
      screenOptions={{
        // tabBarHideOnKeyboard: true ,
        // tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'caramel',
        // tabBarIconStyle:{
          
        // },
          tabBarStyle: {
            // display: hideTabBar ? 'none' : 'none',
          // marginLeft:"5%",
          bottom:Platform.OS =="ios" ? 0:0,
          backgroundColor: "#ebecf0",
          // '#fcba03',
          width:'100%',
          height: Platform.OS =="ios" ? width/6: width/7,
          borderRadius: 0,
          alignItems:'start',
          justifyContent:"center",
          display:'flex',
          flexWrap:"wrap",
          elevation: 2,
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
        name='Home'
        options={{
          tabBarLabel: '',
          title:"Home",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => (
            <View
            className ="rounded-full borde-2 borde-[#56617a]  [#15181e] justify-center items-center "
            style={{width:size+width/25 ,height:size+width/25,marginTop:width/25+3 , backgroundColor: focused?"#325096": "black"}}
          >
              <Image
                source={focused ? icons.home : icons.home}
                style={{ width: size+width/30-10, height:size+width/30-10, tintColor: "none"}}
              />
          </View>
          )
        }}
       />
      <Tabs.Screen 
        name='UserChallenges'
        options={{
          tabBarLabel: '',
          unmountOnBlur: true,
          title:"User Challenges",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => ( 
            <View
              className ="rounded-full borde-2 borde-[#092969] justify-center items-center "
              style={{width:size+width/25 ,height:size+width/25,marginTop:width/25+3 , backgroundColor: focused?"#325096": "black"}}
            >
                <Image
                  source={focused ? icons.challenge : icons.challenge}
                  style={{ width: size+width/30-10, height:size+width/30-10, tintColor: "none"}}
                />
            </View>
          
          )
        }}
       />
        <Tabs.Screen 
        name='Talent'
        options={{
          tabBarLabel: '',
          title:"Talent",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => (
            <View
            className ="rounded-full borde-2 borde-[#092969]  justify-center items-center "
            style={{width:size+width/25 ,height:size+width/25,marginTop:width/25+3 , backgroundColor: focused?"#325096": "black"}}
             >
              <Image
              source={focused ? icons.talent : icons.talent}
              style={{ width: size+width/30-10, height:size+width/30-3-10, tintColor: "none"}}
              />
        </View>
          )
        }}
       />
        <Tabs.Screen 
        name='Guiness'
        options={{
          tabBarLabel: '',
          unmountOnBlur: true,
          title:"Guiness",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => ( 
            <View
              className ="rounded-full borde-2 borde-[#092969] justify-center items-center "
              style={{width:size+width/25 ,height:size+width/25,marginTop:+width/25+3 , backgroundColor: focused?"#325096": "black"}}
            >
            { user && (
              <Image
              source={icons.guiness}
              className ="rounded-full w-15 h-15"
              style={{ width: size+width/30-10, height: size+width/30-10, tintColor: "none"}}
              />
                )} 
            </View>
          )
        }}
       />
       <Tabs.Screen 
        name='Settings'
        options={{
          tabBarLabel: '',
          unmountOnBlur: true,
          title:"settings",
          headerShown:false,
          tabBarIcon:({color,focused,size}) => ( 
            <View
              className ="rounded-full justify-center borde-2 borde-[#092969] items-center "
              style={{width:size+width/25 ,height:size+width/25,marginTop:+width/25+3 , backgroundColor: focused?"#325096": "black"}}
            >
              <Image
              source={icons.setting}
              className ="rounded-full w-15 h-15"
              style={{ width: size+width/30-10, height: size+width/30-10, tintColor: "none"}}
              />
            </View>
          )
        }}
       />
    </Tabs>
    )}
    </>

  )
}
const styles = StyleSheet.create({})