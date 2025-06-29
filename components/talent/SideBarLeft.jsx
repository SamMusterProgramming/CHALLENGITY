import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { icons } from '../../constants';







// const { width } = Dimensions.get('window');

const SideBarLeft = ({ show, height, width ,top ,bottom,left ,right, regionIcon, selectedIcon , contestants ,selectedContestant, setSelectedContestant}) => {
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

       {/* <View
         className ="w-[95%] h-[10%] py- flex-col bg-white rounded-tr-xl  justify-start items-start">
            <View
              className ="w-[100%] h-[70%] px-2 bg-white rounded-tr-xl flex-row justify-between items-center">
                <Image
                 source={icons.contestant}
                 className ="w-[40%] h-[50%]"
                />
                 <Image
                 source={regionIcon}
                 className ="w-[40%] h-[60%]"
                />
            </View>
            <View
              className ="w-[90%] h-[30%] px-2 bg-red-600 rounded-tr-lg flex-row justify-between items-center">
                 <Text 
                         style ={{fontSize:7}}
                         className="text-xl font-black -auto text-white"> 
                          Contestants
                 </Text>
            </View>
       </View> */}
        
       {/* <ScrollView 
        style={ {
        
         
      }}
     className =" w-[95%] max-h-[100%] g-white "> */}

       <View
       className ="w-[95%] h-[100%] py- px- flex-col g-[#055783] gap-2 -2 rounde-tr-xl rounded-br-xl borde-t-4 justify-start items-start">
          {contestants.map((contestant , index) => {
               return (
                <TouchableOpacity
                  onPress={ ()=> {setSelectedContestant({...contestant, rank:(index + 1)*2 + 3})}}
                  key ={index}
                  style ={{borderColor : selectedContestant && selectedContestant._id === contestant._id ? "red" : "transparent"}}
                  className ="w-[95%] h-[14%] py- flex-col g-black rounded-tr-lg border-b-4 borde-l-2 justify-start items-start">
                        <View
                        className ="w-[95%] h-[50%]  py- flex-row g-white rounde-tr-xl borde-t-4 justify-evenly items-center">
                              <Image
                              source={regionIcon}
                              className ="w-[12px] h-[15px] m- g-white rounded-full"
                              resizeMethod='contain'
                              />
                             <Image
                              source={{uri:contestant.profile_img}}
                              className ="w-[30px] h-[30px] rounded-full"
                              resizeMethod='fill'
                              />
                              <Image
                              source={selectedIcon}
                              className ="w-[14px] h-[15px] m- rounded-full"
                              resizeMethod='fill'
                              />
                              {/* <View
                                  className =" py- flex-1  -[80%]  flex-col g-white   justify-center items-center">
                                     <View
                                     className ="h-[50%] px- flex-row justify-center items-center">
                                            <Text 
                                              style ={{fontSize:9}}
                                              className="text-xl font-black text-white"> 
                                                {index * 2 + 4 }
                                            </Text>
                                     </View>
                                     <View
                                     className ="min-h-[50%] px-2 flex-col justify-center g-red-400 items-center">
                                             <Text 
                                              style ={{fontSize:8}}
                                              className="text-xl font-black text-white"> 
                                                Votes
                                            </Text>
                                     </View>
                                
                              </View> */}
                        </View>
                        <View
                        className ="w-[95%] h-[50%] py- flex-col mt-auto g-white rounded-tr-xl bg-white justify-start items-start">
                              <View
                                  className ="w-[100%] h-[50%]  flex-row g-white rounde-tr-xl  justify-center items-start ">
                                    <Text 
                                    style ={{fontSize:7}}
                                    className="text-xl font-black  text-black"> 
                                      {contestant.name.slice(0,13)}
                                  </Text>
                              </View>
                              <View
                                  className ="w-[96%] h-[50%] py- flex-row g-white rounded-tr-lg bg-blue-700  justify-evenly items-center">
                                   <Text 
                                    style ={{fontSize:7}}
                                    className="text-xl font-black text-white"> 
                                     Vt :{contestant.votes }
                                   </Text>
                                   <Text 
                                    style ={{fontSize:8}}
                                    className="text-xl font-black text-white"> 
                                     # {(index + 1)*2 + 3 }
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

export default SideBarLeft;