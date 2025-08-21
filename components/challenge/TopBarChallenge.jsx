import { View, Text, Animated, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '../../constants';
import { router } from 'expo-router';




export default function TopBarChallenge({ show, height, width ,top ,bottom,left ,right, user , challenge , typeIcon, privacyIcon}) {
    const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  -height )).current;

  useEffect(() => {
    
    Animated.timing(sidebarAnimation, {
      toValue: 
         show ? 0 :  -700 ,
        // right && show ? width : 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
   

  }, [show]);
  
    return (
      <Animated.View 
      className="w-full   absolute  flex-row justify-between items-start borde-t-2 borde-b-2 borde-white b b g-white"
      style={[
          {
              top:top && top,
              bottom:0,
              left:left && left ,
              right:right && right,
              position: 'absolute',
              height: height, // Adjust the width as needed
            
              width:width ,
              zIndex: 1,
              elevation:12
          }
          , 
          { transform: [{ translateX: sidebarAnimation }] }]}>
                          <View
                           className = "w- 13%] h-[100%] -rota te-45 p-4  flex-row justify-start borde-2 borde-white rounded-br-full bg-[#110e1c] items-center ">
                                 <TouchableOpacity
                                      // onPress={() =>  router.back()}
                                      className=" flex-col -rotate-45 pb-4 justify-start h- [100px] w- [100px]   gap- items-center">
                                        <Image 
                                          className="w-6   h-6"
                                          resizeMethod='cover'
                                          source={challenge.type && typeIcon}/>
                                           <Text 
                                             style ={{fontSize:8}}
                                             className="text-xl  font-black  text-gray-300"> 
                                              {challenge.type}
                                           </Text>
                                 </TouchableOpacity>
                               
                          </View>

                          <View
                           className = "flex-1  flex-col  borde-white justify-start rounde-tr-lg g-white b g-black px- items-center ">  
    
                                          <View
                                           className = "w-[100%] h-[60%]  gap- flex-row mb- rounded-b-full justify-center b g-white items-center ">     
                                                <View
                                                className = " w-[40%] h-[100%]  gap- flex-row mb- rounded-bl-full justify-center bg-[#110e1c] items-center ">
                                                </View>
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
                                                <View
                                                className = "w-[40%] h-[100%]   gap- flex-row mb- rounded-br-full justify-center bg-[#110e1c] items-center ">
                                                </View>
                                                                           
                                          </View>
                                          <View
                                           className = "w- [90%] h-[40%] px-8  gap- flex-row text-start rounded-b-xl justify-start b bg-[#110e1c] items-center ">
                                               
                                                     <Text 
                                                          style ={{fontSize:8}}
                                                          className="text-xl font-black -auto text-gray-300"> 
                                                            {user.name}
                                                    </Text>
                                          </View>
                                     
                                      
                             
                                
                          </View>
  
                         
                          <View
                           className = "w- 13%] h-[100%] -rota te-45 p-4  flex-row justify-start borde-2 borde-white rounded-bl-full bg-[#110e1c] items-center ">
                                 <TouchableOpacity
                                      // onPress={() =>  router.back()}
                                      className=" flex-col rotate-45 pb-4 justify-center h- [100px] w- [100px]   gap- items-center">
                                        <Image 
                                          className="w-8   h-8"
                                          resizeMethod='cover'
                                          source={challenge.privacy && privacyIcon}/>
                                           <Text 
                                             style ={{fontSize:8}}
                                             className="text-xl  font-black  text-gray-300"> 
                                              { challenge.privacy}
                                           </Text>
                                 </TouchableOpacity>  
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
  
