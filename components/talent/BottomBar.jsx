import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { icons } from '../../constants';

// const { width } = Dimensions.get('window');

const BottomBar = ({ show, onClose , height, width ,top ,bottom,left ,right, user ,  region , regionIcon, selectedTalent, selectedIcon, handleParticipate}) => {
//   const sidebarWidth = width * 0.8; 
  const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  height)).current;

  useEffect(() => {
    
    Animated.timing(sidebarAnimation, {
      toValue: 
         show ? 0 :  + height  +bottom ,
        // right && show ? width : 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [show]);

  return (
    <Animated.View 
     className=" w-full h-[5%] absolute top-0 flex-row justify-start items-center borde-t-2 borde-b-2 border-white g-[#182e2e]"
     style={[
        // styles.sidebar
        {
            top:top && top,
            bottom:bottom && bottom,
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
                         className = "w-[27%] h-[100%] gap- flex-row borde-r-2 borde-white justify-endt rounde-tr-lg g-white g-[#022f2f] px- items-end ">  
                          
                                <View
                                  className = "w-[100%] h-[90%]  gap- flex-col text-center justify-end rounded-t-lg bg-white items-end ">
                                        <View
                                         className = "w-[100%] h-[50%]  gap- flex-row mb- justify-center g-white items-center ">
                                                       <Text 
                                                        style ={{fontSize:7}}
                                                            className="text-xl font-black mb- text-black"> 
                                                            {user.name}
                                                   </Text>
                                        </View>
                                        <View
                                         className = "w-[90%] h-[50%] px-2  gap- flex-row text-start rounded-t-lg justify-start bg-red-600 items-center ">
                                             
                                                   <Text 
                                                        style ={{fontSize:7}}
                                                        className="text-xl font-black -auto text-white"> 
                                                        {selectedTalent} Contest
                                                  </Text>
                                        </View>
                                   
                                    
                                </View>
                              
                        </View>
                        <View
                         className = "w-[13%] h-[100%] flex-col justify-center borde-2 borde-white rounded-tl-lg g-[#022f2f] items-center ">
                               
                               <TouchableOpacity
                                    // onPress={() =>  router.back()}
                                    className="w-[60%] h-[90%] flex-col justify-center items-center">
                                      <Image 
                                        className="w-[40px] h-[40px] rounded-full"
                                        resizeMethod='cover'
                                        source={{uri:user.profile_img}}/>
                               </TouchableOpacity>
                             
                        </View>

                        <View
                         className = "w-[23%] h-[100%]  flex-row justify-center rounded-t-xl px-2 py-  bg-[#feffff] g-black items-end">
                               <TouchableOpacity
                                    onPress={handleParticipate}
                                    className="w-[90%] h-[70%] flex-row bg-green-600 rounded-t-lg justify-center items-center">
                                       <Text 
                                          style ={{fontSize:11}}
                                          className="text-xl font-black mb- text-white"> 
                                               Join
                                       </Text>
                               </TouchableOpacity>
                         </View>

                        <View
                         className = "w-[37%] h-[100%]  flex-row justify-between px- rounde-t-lg g-[#022f2f] g-black items-end ">
                                {/* <Text style={{fontSize:26}}>🌍 </Text> */}
                                <View
                                 className = "w-[30%] h-[100%]  gap- flex-row  justify-center g-white items-end ">
                                          {/* <Text style={{fontSize:26}}>🌍 </Text> */}
                                          <Image 
                                                    className="w-[80%] h-[90%]"
                                                    resizeMethod='cover'
                                                    source={regionIcon}/>
                                </View>
                    
                                <View
                                  className = "w-[70%] h-[90%]  gap- flex-col text-center border-t-6 rounded-t-lg justify-center bg-red-600 items-end ">
                                        <View
                                         className = "w-[90%] h-[40%]  gap- flex-row mb-1 px-2 justify-start  g-red-700 items-center ">
                                                  <Text 
                                                        style ={{fontSize:8}}
                                                        className="text-xl font-black -auto text-white"> 
                                                        {region} - Region
                                                  </Text>
                                        </View>
                                        <View
                                         className = "w-[90%] h-[50%] px-2 gap-3 flex-row text-start rounded-t-lg justify-start bg-white items-center ">
                                                   <Text 
                                                        style ={{fontSize:8}}
                                                            className="text-xl font-black mb- text-black"> 
                                                            {region} Got Talent
                                                   </Text>
                                        </View>
                                   
                                    
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

export default BottomBar;