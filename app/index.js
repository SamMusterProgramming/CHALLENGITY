import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import "../global.css";
import { ImageBackground , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function app() {
 

  return (
   
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="bg-primary h-full"
       contentContainerStyle={{height:'100%'}} > 
          <View className="w-full justify-start items-center mt-5 min-h-[85vh] px-0" >
                <Image 
               className="w-full h-[200px]"
               resizeMode='contain'
               source={images.logo}/>

               <View className="relative mt-5 justify-start flex-row items-center">
                    <View className="justify-start flex-col items-center">
                        <Text className="text-2xl text-white font-bold text-center">
                          Welcome !! {'                                                         '} 
                          Show the world your Talent , share challenges {'  '}
                          <Text className=" text-secondary">
                            Challengify
                        </Text>
                        </Text>
                       
                        <Image
                           source={images.path}
                           className="w-[136px] h-[15px] absolute -bottom-2 -right-2"
                           resizeMode='contain'
                         />
                    </View>
                   
               </View>
               <View className="relative mt-5 justify-start flex-row items-center gap-2">
                  <View className=" justify-center flex-col items-center w-[33%]">
                    <Image 
                      className="w-[90%] h-[150px]"
                      resizeMode='contain'
                      source={images.challenge_logo}/>
                      <Text className="text-1xl text-white font-bold">Challenges</Text>
                  </View>
                  <View className=" justify-center flex-col items-center w-[33%]">
                    <Image 
                      className="w-[100%] h-[150px]"
                      resizeMode='cover'
                      source={images.guiness}/>
                       <Text className="text-1xl text-white font-bold">Guiness</Text>

                  </View>
                  <View className=" justify-center flex-col items-center w-[33%]">
                    <Image 
                      className="w-[100px] h-[150px]"
                      resizeMode='cover'
                      source={images.guiness}/>
                      <Text className="text-1xl text-white font-bold">Talent</Text>
                  </View>
               </View>
               <Text className="text-sm text-gray-100 mt-7 text-center px-2">
                     In a world full of hidden talents and untapped potential, 
                     Challengify is your arena to shine. Whether you’re squaring
                     off with a friend or facing off against someone from the other side of the world,
                     the challenges never stop.Are you ready to take on the world?
               </Text>
               {/* Push your limits, meet new opponents, and discover
                     just how far your skills can take you. With Challengify, it’s not just about winning—it’s about
                     growing, connecting, and challenging yourself every step of the way. */}
                
                <TouchableOpacity onPress={()=> router.push('/login')}
                className="bg-secondary-200 mt-10 rounded-xl w-[80%] min-h-[55px] justify-center items-center">
                  <Text className="text-primary font-semibold text-lg">get started</Text>
                </TouchableOpacity>
               
          </View>
         
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
      {/* <Statusbar /> */}
    </SafeAreaView> 

      
 
  )
}

