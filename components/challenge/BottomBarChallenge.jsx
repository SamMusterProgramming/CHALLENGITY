import { View, Text, Animated, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { router } from 'expo-router';
import { icons } from '../../constants';
import SwingingTitle from '../custom/SwingingTitle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';



export default function BottomBarChallenge({show,  height, width ,top ,bottom,left ,right, user ,challenge,setStage,stage,
  setSelectedParticipant ,handleRefresh,isRefreshing}) {
    const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  height)).current;
    const insets = useSafeAreaInsets();

    useEffect(() => {
      
      Animated.timing(sidebarAnimation, {
        toValue: 
           show ? 0 :  + height  + bottom ,
          // right && show ? width : 0,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, [show]);
  
    return (
      <Animated.View 
       className=" w-full h-[5%] absolute px- 2 flex-col justify-center items-start  g-[#182e2e]"
       style={[
          // styles.sidebar
          {
              top:top && top,
              bottom:0,
              left:left && left ,
              right:right && right,
              position: 'absolute',
              height: height, // Adjust the width as needed
              // backgroundColor: '',
              // padding: 20,
              width:width ,
              zIndex: 1,
              elevation:12
          }
          , 
      { transform: [{ translateY: sidebarAnimation }] }]}>
                          


            <View
                style={{height : height }} 
                className="w-[100%] flex-row justify-between items-end"
                >         
                          <View
                           className = "w-[21%]  h-[100%] flex-row justify-center rounded-tr-full px- py-  g-[#0ddddd] b g-[#f6e9e9] items-center ">
                                 <TouchableOpacity
                                  onPress={handleRefresh}
                                  onPressIn={() =>{setSelectedParticipant(null)}}
                                  className="w-[100%] h-[60%] b g-[#f6e9e9] rounded-tr-full flex-row g-green-600 -rota te-45   justify-center items-center">
                                      {isRefreshing ?(
                                            <ActivityIndicator size={32} color="white" />
                                      ):(
                                            <Image 
                                            source={icons.refresh} 
                                            className="w-8 h-8 b g-black rounded-full"/>
                                      )}
                                 </TouchableOpacity>
                           </View>
                     
  
                          <View
                           className = "w-[58%] h-[100%]  px -4   flex-col justify-center px- rounded-t-full b g-[#f6e9e9]  items-center ">
                                          
                                           <TouchableOpacity
                                                onPress={()=> {
                                                    setSelectedParticipant(null)
                                                    setStage(!stage)
                                                  }
                                                }
                                                className ="w-[100%] h-[70%] p- 2 bg-[#043551] rounded-xl  g-white  flex-row justify-center items-center">
                                                <View
                                                  className ="w-[97%] h-[95%] px-4 bg-[#031f3b] rounded-lg flex-row justify-center items-center">
                                                      <Text 
                                                            style ={{fontSize:11}}
                                                            className="text-xl font-black -auto text-white"> 
                                                              {stage? "YOUR POSITION" :"BACK TO STAGE"} 
                                                      </Text>
                                                </View>
                                            </TouchableOpacity>
                          </View>
  
                          <View
                           className = "w-[21%]  h-[100%] flex-row p- 12 justify-center rounded-tl-full px- py-  b g-[#f6e9e9] bg- items-center ">
                                 <TouchableOpacity
                                      onPress={() => router.back()}
                                      className="w-[ 100%] h-[60%] p- 8 flex-row g-green-600 rot ate-45   justify-center items-center">
                                                 <AntDesign name="closecircle" size={30} color="white" /> 
                                 </TouchableOpacity>
                           </View>
            </View>

                         
      </Animated.View>
    );
  };
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    sidebar: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '80%', // Adjust the width as needed
      backgroundColor: 'lightblue',
      padding: 20,
      zIndex: 1,
    },
    content: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
  });
  