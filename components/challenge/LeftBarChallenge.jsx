import { View, Text, Animated, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Participant from './Participant';

export default function LeftBarChallenge({show, height, width ,top ,bottom,left ,right, participants,selectedParticipant ,
  participantTrackerId, setSelectedParticipant}) {

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
    className=" flex-col justify-evenly  rounded-br-xl items-start py- px- borde-t-2 borde-b-2 borde-white b g-[#cdcfd6]"
    style={[
        // styles.sidebar
        {
            top:top && top,
            bottom:bottom && bottom,
            left:left && left ,
            right:right && right,
            position: 'absolute',
            height: height, 
            // backgroundColor: '#022f2f',
            // padding: 20,
            width:width ,
            zIndex: 1,
            elevation:12
        }
        , 
    { transform: [{ translateX: sidebarAnimation }] }]}>

        
       

       <View
       className ="w-[100%] h-[100%] pl- 1 px- flex-col b g-[#055783] gap-1 -2 rounde-tr-xl rounded-br-xl borde-t-4 justify-start items-center">
          {participants.map((participant , index) => {
               return (
                <Participant key={index} participant={participant} index={index * 2 +1}
                selectedParticipant={selectedParticipant} w={"93%"} h={"19.7%"}
                setSelectedParticipant={setSelectedParticipant} 
                participantTrackerId={participantTrackerId}
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
