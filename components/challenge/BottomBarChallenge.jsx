import { View, Text, Animated, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { router } from 'expo-router';
import { icons } from '../../constants';
import SwingingTitle from '../custom/SwingingTitle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';



export default function BottomBarChallenge({show,  height, width ,top ,bottom,left ,right, user ,challenge,
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
                           className = "w-[21%]  h-[70%] flex-row justify-center rounded-tr-full px- py-  g-[#0ddddd] bg-[#070707] items-center ">
                                
                                 <TouchableOpacity
                                  onPress={handleRefresh}
                                  onPressIn={() =>{setSelectedParticipant(null)}}
                                  className="w- [100%] h- [100%] flex-row g-green-600 -rotate-45   justify-center items-start">
                                      {isRefreshing ?(
                                            <ActivityIndicator size={32} color="white" />
                                      ):(
                                            <Image 
                                            source={icons.refresh} 
                                            className="w-9 h-9"/>
                                      )}
                                 </TouchableOpacity>
                           </View>
                     
  
                          <View
                           className = "w-[58%] h-[100%]  px -4   flex-col justify-end px- rounded-t-full b g-[#000000]  items-center ">
                                          
                                          {/* <View
                                           className = "w- [100%] h- [70%] px-8 py-1 gap- flex-row text-center rounded-b-xl justify-center b bg-[#000000] items-center ">
                                               
                                                     <Text 
                                                          style ={{fontSize:8}}
                                                          className="text-xl font-black -auto text-gray-300"> 
                                                            {user.name}
                                                    </Text>
                                          </View> */}
                                          <View
                                           className = "w-[100%] h-[60%]  gap- flex-row mb- rounded-t-full justify-center bg-black items-center ">     
                                               
                                                <View
                                                className = "w-[20%] h-[100%] flex-col rounde d-t-3xl justify-center bg-[#110e1c] items-center ">
                                                  <View
                                                   className = "w- [100%] h- [100%] p- 2 flex-col rounded-full justify-center b g-white items-center ">
                                                          <Image 
                                                            className="w-10 h-10 rounded-full"
                                                            resizeMethod='contain'
                                                            source={{uri:user.profile_img}}/>  
                                                  </View> 
                                                </View>
                                                  
                                          </View>
                                         
                          </View>
  
                          <View
                           className = "w-[21%]  h-[70%] flex-row p- 12 justify-center rounded-tl-full px- py-  bg-black bg- items-center ">
                                 <TouchableOpacity
                                      onPress={() => router.back()}
                                      className="w-[ 100%] h- [100%] p- 8 flex-row g-green-600 rot ate-45   justify-center items-end">
                                            {/* <View className=""> */}
                                                 <AntDesign name="closecircle" size={30} color="white" /> 
                                            {/* </View> */}
                                 </TouchableOpacity>
                           </View>
            </View>

            {/* <View
                    style={{ minHeight : insets.bottom}} 
                    className="w-[100%] min-h-[40px] bg-[#110e1c] flex-col justify-between items-end"
            ></View> */}

                         
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
  