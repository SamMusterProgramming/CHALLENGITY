import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Link, router } from 'expo-router'
import "../global.css";
import { ImageBackground , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {icons, images} from '../constants'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { isAuthenticated } from '../apiCalls';
import { useVideoPlayer, VideoView } from 'expo-video';
import demo from "../assets/video/red.mp4"



export default function app() {
  const videoRef = useRef()
  const player = useVideoPlayer
  ( 
    demo, (player) => {
    player.loop = true;
    player.volume = 0.7
    player.play() ;
  });

  return (
   
    <SafeAreaView className= "flex-1 bg-primary ">
      <View className="flex-1 w-[100vw]  h-full bg-primary "
       > 
                      <VideoView 
                        ref={videoRef}
                        style={{  width:'100%',height:'100%',opacity:1}}
                        player={player}
                        contentFit="fill"
                        nativeControls ={false}  
                         />
                       <View 
                       className="absolute top-1 w-full text-center flex-col justify-start items-center ">
                        <Text className="text-4xl mt-4 font-bold text-secondary">
                            Challengify
                        </Text> 
                        <Text className="text-2xl mt-4 text-center text-white font-bold px-10 ">
                          Welcome !
                          Step Out of Your Comfort Zone—Your Stage Awaits, and the World is the Judge! {'  '}
                          
                         </Text>
                        <Image
                        className="w-56 h-56"
                        resizeMethod='fill'
                        source={icons.challengify} />

                       {/* <Image
                        className="w-36 mt-10 h-36"
                        resizeMethod='fill'
                        source={icons.challenge} /> */}
                       
                       </View>
                       <View 
                         className="absolute bottom-36 w-full text-center flex-col justify-start items-center ">
                           <Text className="text-md text-gray-100 mt-7 font-bold text-center px-2">
                                In a world full of hidden talents and untapped potential, 
                                Challengify is your arena to shine. Whether you are squaring
                                off with a friend or facing off against someone from the other side of the world,
                                the challenges never stop.
                          </Text>
                       </View>
                         
          {/* <View className="w-full justify-start items-center mt-5 min-h-[85vh] px-0" >
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
                     Challengify is your arena to shine. Whether you are squaring
                     off with a friend or facing off against someone from the other side of the world,
                     the challenges never stop.Are you ready to take on the world?
                         Push your limits, meet new opponents, and discover
                     just how far your skills can take you. With Challengify, it’s not just about winning—it’s about
                     growing, connecting, and challenging yourself every step of the way.
               </Text>
           
                
                <TouchableOpacity onPress={()=> router.push('/login')}
                className="bg-secondary-200 mt-10 rounded-xl w-[80%] min-h-[55px] justify-center items-center">
                  <Text className="text-primary font-semibold text-lg">get started</Text>
                </TouchableOpacity>
               
          </View> */}
              
           <View className="absolute bottom-10 w-[80%] left-14" >
              <TouchableOpacity onPress={()=> router.push('/login')}
                className="bg-blue-400 mt-10 rounded-xl w-[100%] min-h-[55px] justify-center items-center">
                  <Text className="text-primary font-semibold text-lg">Get Started</Text>
              </TouchableOpacity>
           </View>   
      </View>
      {/* <StatusBar backgroundColor="#161622" style="light"/> */}

    </SafeAreaView> 

      
 
  )
}

