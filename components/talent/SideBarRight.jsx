import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../constants';
import Contestant from './Contestant';







// const { width } = Dimensions.get('window');

const SideBarRight = ({ show, onClose , height, width ,top ,bottom ,right ,regionIcon, selectedIcon ,talentRoom,
   contestants ,selectedContestant, setSelectedContestant}) => {
//   const sidebarWidth = width * 0.8; 
  const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  width )).current;

  useEffect(() => {
  
    Animated.timing(sidebarAnimation, {
      toValue: 
         show ? 0 :  width ,
        // right && show ? width : 0,
      duration: 700,
      useNativeDriver: true,
    }).start();

   
  }, [show]);

  return (

    <Animated.View 

    className=" flex-col justify-evenly rounded-tl-xl rounded-bl-xl items-end py- px- borde-t-2 borde-b-2 border-white g-[#0a48d9]"
    style={[
        // styles.sidebar
        {
            top:top && top,
            bottom:bottom && bottom,
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
    { transform: [{ translateX: sidebarAnimation }] }]}>


       <View
      
       className ="w-[100%] h-[100%] pr-1 px- flex-col g-[#178bea] gap-1 -2 rounded-bl-xl borde-t-4 justify-start items-center">
          {contestants.map((contestant , index) => {
               return (
                <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant} setSelectedContestant={setSelectedContestant} 
                talentRoom={talentRoom} regionIcon={regionIcon} selectedIcon= {selectedIcon} index ={(index + 1 ) * 2 + 3 } w={"93%"} h={"13.7%"}/>
               
                )
          })}
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

export default SideBarRight;