import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { icons } from '../../constants';







// const { width } = Dimensions.get('window');

const TopContestantBar = ({ show, height, width ,top ,bottom,left ,right, regionIcon,selectedIcon , contestants ,selectedContestant, setSelectedContestant}) => {
//   const sidebarWidth = width * 0.8; 
  const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  -width )).current;

  useEffect(() => {
    
    Animated.timing(sidebarAnimation, {
      toValue: 
         show ? 0 :  -width ,
        // right && show ? width : 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
   

  }, [show]);

  return (

 
    <Animated.View 
    className=" flex-col justify-evenly rounded-tr-xl rounded-br-xl items-start py- px- borde-t-2 borde-b-2 borde-white g-[#1f2026]"
    style={[
        // styles.sidebar
        {
            top:top && top,
            bottom:bottom && bottom,
            left:left && left ,
            right:right && right,
            position: 'absolute',
            height: height, // Adjust the width as needed
            // backgroundColor: '#022f2f',
            // padding: 20,
            width:width ,
            zIndex: 1,
            elevation:12
        }
        , 
    { transform: [{ translateX: sidebarAnimation }] }]}>


       <View
       className ="w-[100%] h-[100%] py-2 px- flex-row g-[#04283c] gap- -2 rounde-tr-xl rounded-br-xl borde-t-4 justify-evenly items-start">
          {contestants.map((contestant , index) => {
               return (
                <TouchableOpacity
                  onPress={ ()=> {setSelectedContestant({...contestant, rank:index + 1})}}
                  key ={index}
                  style ={{borderColor : selectedContestant && selectedContestant._id === contestant._id ? "red" : "transparent"}}
                  className ="w-[23%] h-[100%] py- flex-col g-black rounded-t-lg border-b-4 borde-t-2  justify-start items-center">
                        <View
                          className ="w-[100%] h-[50%] py- flex-row g-white rounde-t-xl borde-t-4 justify-evenly items-center">
                             <Image
                              source={regionIcon}
                              className ="w-[12px] h-[15px] m- g-white rounded-full"
                              resizeMethod='contain'
                              />
                             <Image
                              source={{uri:contestant.profile_img}}
                              className ="w-[30px] h-[30px] m- rounded-full"
                              resizeMethod='fill'
                              />
                              <Image
                              source={selectedIcon}
                              className ="w-[12px] h-[15px] m- rounded-full"
                              resizeMethod='fill'
                              />
                             
                        </View>
                        <View
                        className ="w-[90%] h-[50%] py- flex-col mt-auto g-white rounded-t-xl bg-white justify-center items-center">
                              <View
                                  className ="w-[100%] h-[50%]  flex-row g-white rounde-tr-xl  justify-center items-start ">
                                    <Text 
                                    style ={{fontSize:7}}
                                    className="text-xl font-black  text-black"> 
                                      {contestant.name.slice(0,13)}
                                  </Text>
                              </View>
                             
                              <View
                                  className ="w-[96%] h-[50%] py- px-2 flex-row g-white rounded-t-lg bg-blue-700  justify-between items-center">
                                    <Text 
                                    style ={{fontSize:7}}
                                    className="text-xl font-black text-white"> 
                                     Vt : {contestant.votes }
                                   </Text>
                                   <Text 
                                    style ={{fontSize:7}}
                                    className="text-xl font-black text-white"> 
                                     Top {index + 1 }
                                   </Text>
                              </View>
                             
                        </View>

                        {selectedContestant && selectedContestant._id === contestant._id && (
                                  <Image  
                                  source={icons.check_red}  
                                  className ="absolute bottom-6 right-0 w-[20px] h-[20px]  rounded-full"  
                                  resizeMethod='fill'  
                                  />
                            )}
                </TouchableOpacity>

               
                )
          })}
       </View>
       {/* </ScrollView> */}

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

export default TopContestantBar;