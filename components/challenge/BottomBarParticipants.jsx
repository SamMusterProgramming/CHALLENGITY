import { View, Text, Animated, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Participant from './Participant';

export default function BottomBarParticipants({show, height, width ,top ,bottom,left ,right, participants,selectedParticipant , setSelectedParticipant}) {

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
    className=" flex-col justify-center   items-start  g-[#1f2026]"
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
       className ="w-[100%] h-[100%] py -2 px- flex-row g-[#04283c] gap-[7] -2 rounde-tr-xl rounded-br-xl borde-t-4 justify-center items-center">
          {participants.map((participant , index) => {
               return (
                <Participant key={index} participant={participant} index={index * 2 +1}
                selectedParticipant={selectedParticipant} w={"18%"} h={"100%"}
                setSelectedParticipant={setSelectedParticipant} 
                // talentRoom={talentRoom} regionIcon={regionIcon} selectedIcon= {selectedIcon} index = {(index + 1)* 2 + 4} w={"93%"} h={"13.7%"}
                />
              
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
