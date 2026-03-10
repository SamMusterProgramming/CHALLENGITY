import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../constants';
import Contestant from './Contestant';







// const { width } = Dimensions.get('window');

const SideBarRight = ({ show, onClose , height, width ,top ,bottom ,right ,regionIcon, selectedIcon ,talentRoom,
   participantTrackerId,  contestants ,selectedContestant, setSelectedContestant}) => {
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

    // className=" flex-col justify-evenly  items-center  "
    style={[
        // styles.sidebar
        {
            top:top && top,
            bottom:bottom && bottom,
            right:right && right,
            position: 'absolute',
            // height: height, 
            // backgroundColor: '',
            // padding: 20,
            // width:width ,
            // zIndex: 1,
            // elevation:12
        }
        , 
    { transform: [{ translateX: sidebarAnimation }] }]}>


       <View
      
       className ="w- [100%] h- [100%] bg -white flex-col  gap-[1%] pr- 1  justify-start items-center">
          {contestants.map((contestant , index) => {
               return (
                <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant} 
                participantTrackerId = {participantTrackerId} setSelectedContestant={setSelectedContestant} 
                talentRoom={talentRoom} regionIcon={regionIcon} selectedIcon= {selectedIcon} index ={(index + 1 ) * 2 + 3 } w={"100%"} h={"13.7%"}/>
                
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