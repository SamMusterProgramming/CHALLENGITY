import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { icons } from '../../constants';
import CountryFlag from 'react-native-country-flag';
import Contestant from './Contestant';







// const { width } = Dimensions.get('window');

const TopContestantBar = ({ show, height, width ,top ,bottom,left ,right, regionIcon,selectedIcon , contestants ,selectedContestant,talentRoom, setSelectedContestant}) => {
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
       className ="w-[100%] h-[100%] py-2 px- flex-row g-[#04283c] gap-2 -2 rounde-tr-xl rounded-br-xl borde-t-4 justify-center items-start">
          {contestants.map((contestant , index) => {
               return (
               
                // <TouchableOpacity
                //   onPress={ ()=> {setSelectedContestant({...contestant, rank:index + 1})}}
                //   key ={index}
                //   style ={{borderColor : selectedContestant && selectedContestant._id === contestant._id ? "green" : "transparent",
                //     backgroundColor: 'rgba(0, 0, 0, 0.4)'
                //   }}
                //   className ="w-[23%] h-[100%] py- flex-col g-black rounded-lg borde-b-4 border-2 borde-white justify-start items-center">
                //         <View
                //           className ="w-[100%] h-[33%] py- flex-row g-white rounde-t-xl borde-t-4 justify-evenly items-center">
                //              <Image
                //               source={regionIcon}
                //               className ="w-[30%] h-[90%] m- g-white rounded-full"
                //               resizeMethod='contain'
                //               />
                //               <View
                //                 className="w-[20%] h-[100%]  flex-col justify-center items-center">
                //                   < CountryFlag
                //                             isoCode={"DZ"}
                //                             size={8}
                                       
                //                   />
                //                    <Text style={ {
                //                             fontWeight:"800",
                //                             color: "white",
                //                             fontSize: 7,
                //                             fontWeight:900
                //                           }}>{ "DZ"}</Text>
                //               </View>
                          
                //               <Image
                //               source={selectedIcon}
                //               className ="w-[30%] h-[90%] m- rounded-full"
                //               resizeMethod='fill'
                //               />
                             
                //         </View>


                //         <View
                //           className ="w-[100%] h-[40%] py- flex-row g-white rounde-t-xl borde-t-4 justify-between items-center">
                //               <View
                //                   className ="w-[33%] h-[100%]  flex-col justify-start items-center   g-white rounded-t-lg g-blue-700 text-pretty">
                //                      <View
                //                       className ="w-[100%] h-[50%] -1   g-white rounded-t-lg g-blue-700 text-center">
                //                             <Text 
                //                                 style ={{fontSize:7}}
                //                                 className="text-xl text-center p-0 font-black text-white"> 
                //                                 Votes 
                                              
                //                             </Text>
                //                       </View>
                //                       <View
                //                       className ="min-w-[100%] h-[50%]  px flex-row justify-center item-center g-white rounded-t-lg g-blue-700 text-center">
                //                             <Text 
                //                                 style ={{fontSize:7}}
                //                                 className="text-xl  font-black text-white"> 
                //                                 {contestant.votes }
                //                             </Text>
                //                       </View>
                //               </View>

                //               <Image
                //               source={{uri:contestant.profile_img}}
                //               className ="w-[20px] h-[20px] m- rounded-full"
                //               resizeMethod='fill'
                //               />

                //               <View
                //                 className ="w-[33%] h-[100%]  flex-col justify-start items-center   g-white rounded-t-lg g-blue-700 text-pretty">
                //                    <View
                //                     className ="w-[100%] h-[50%] -1   g-white rounded-t-lg g-blue-700 text-center">
                //                           <Text 
                //                               style ={{fontSize:7}}
                //                               className="text-xl text-center p-0 font-black text-white"> 
                //                               TOP
                                            
                //                           </Text>
                //                     </View>
                //                     <View
                //                     className ="min-w-[100%] h-[50%]  px flex-row justify-center item-center g-white rounded-t-lg g-blue-700 text-center">
                //                           <Text 
                //                               style ={{fontSize:7}}
                //                               className="text-xl  font-black text-white"> 
                //                               {index + 1 }
                //                           </Text>
                //                     </View>
                //             </View>
                               
                             
                //         </View>

                //         <View
                //         className ="w-[90%] h-[26%] py- flex-col mt-auto g-white rounded-t-xl g-white justify-center items-center">
                //               <View
                //                   className ="w-[100%] h-[100%]  flex-row g-white rounde-tr-xl  justify-center items-start ">
                //                     <Text 
                //                     style ={{fontSize:7}}
                //                     className="text-xl font-black  text-white"> 
                //                       {contestant.name.slice(0,13)}
                //                   </Text>
                //               </View>
                             
                //         </View>

                     
                // </TouchableOpacity>

                <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant} setSelectedContestant={setSelectedContestant} 
                talentRoom={talentRoom} regionIcon={regionIcon} selectedIcon= {selectedIcon} index ={index +1} w={"23%"} h={"100%"}/>

               
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