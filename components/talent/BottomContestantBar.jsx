import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { icons } from '../../constants';
import CountryFlag from 'react-native-country-flag';
import Contestant from './Contestant';







// const { width } = Dimensions.get('window');

const BottomContestantBar = ({ show, height, width ,top ,bottom,left ,right, regionIcon,selectedIcon , talentRoom, participantTrackerId ,
   contestants ,selectedContestant, setSelectedContestant}) => {
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
    className=" flex-row justify-center items-center  "
    style={[
        // styles.sidebar
        {
            top:top && top,
            bottom:bottom && bottom,
            left:left && left ,
            // right:right && right,
            position: 'absolute',
            height: height, // Adjust the width as needed
            // backgroundColor: '#022f2f',
            // padding: 20,
            width:width ,
            // zIndex: 1,
            // elevation:12
        }
        , 
    { transform: [{ translateX: sidebarAnimation }] }]}>

       <View
       className ="w-[100%] h-[100%]  py- 2 px-1 flex-row gap-[5%] justify-center items-center">
          {contestants.map((contestant , index) => {
               return (
                <Contestant key={index} contestant={contestant} selectedContestant={selectedContestant}
                participantTrackerId = {participantTrackerId} setSelectedContestant={setSelectedContestant} 
                talentRoom={talentRoom} regionIcon={regionIcon} selectedIcon= {selectedIcon} index ={index +19} w={"23%"} h={height}/> 
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

export default BottomContestantBar;