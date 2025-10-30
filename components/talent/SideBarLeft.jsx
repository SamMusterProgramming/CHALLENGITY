import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { icons } from '../../constants';
import Contestant from './Contestant';









const SideBarLeft = ({ show, height, width ,top ,bottom,left ,right, regionIcon, selectedIcon , talentRoom,
  participantTrackerId,contestants ,selectedContestant, setSelectedContestant}) => {
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
    className=" flex-col justify-evenly rounded-tr-xl rounded-br-xl items-start  "
    style={[
        {
            top:top && top,
            bottom:bottom && bottom,
            left:left && left ,
            right:right && right,
            position: 'absolute',
            height: height, // Adjust the width as needed
            backgroundColor: 'transparent',
            // padding: 20,
            width:width ,
            // zIndex: 1,
            // elevation:12
        }
        , 
        { transform: [{ translateX: sidebarAnimation }] }]}>

        
       

       <View
       className ="w-[99%] h-[100%] pl-1 px- flex-col g-[#055783] gap-1 -2 rounde-tr-xl rounded-br-xl borde-t-4 justify-start items-center">
          {contestants.map((contestant , index) => {
               return (
                <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                participantTrackerId = {participantTrackerId} setSelectedContestant={setSelectedContestant} 
                talentRoom={talentRoom} regionIcon={regionIcon} selectedIcon= {selectedIcon} index = {(index + 1)* 2 + 4} w={"93%"} h={"19.7%"}/>
              
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

export default SideBarLeft;