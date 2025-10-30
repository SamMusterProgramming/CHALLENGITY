import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '../../../constants';
import { getIcon } from '../../../helper';


const TopPanel = ({ show, height, width ,top ,bottom,left ,right,data , setSelectedTalent , selectedTalent}) => {

    const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  -500 )).current;

   
  
    useEffect(() => {
      
      Animated.timing(sidebarAnimation, {
        toValue: show ? 0 :  -500 ,
        duration: 700,
        useNativeDriver: true,
      }).start();
     
  
    }, [show]);
  
    return (
      <Animated.View 
      className="w-[90%] h-[12%] flex-col justify-center items-center  "
      style={[
          {
              top:"0%",
              left:"0%" ,
              right:right && right,
              position: 'absolute',
              backgroundColor: 'transparent',
          }
          , 
          { transform: [{ translateX: sidebarAnimation }] }]}>
  
         <View
         className =" w-[100%] h-[100%] flex-row b g-[#055783] py-2  justify-between items-center">
            {data.map((talent , index) => {
              return  ( <TouchableOpacity
                        onPress={()=> { setSelectedTalent(
                            {
                                name : talent.name,
                                icon : talent.icon
                            })
                        }}
                        style={{
                            backgroundColor : selectedTalent && selectedTalent.name == talent.name ? "lightblue" :"black"
                        }}
                        className = "w- [50%] h- [90%] bg-[black] p-2 px-4 rounded-xl flex-col justify-center gap-2 items-center"
                        key={index}>
                             <Image
                                        className="w-8  h-8 rounded-xl bg-"
                                        source={talent.icon}
                                        resizeMode='cover'
                                        />
                             <Text 
                                                style={{fontSize:8,
                                                    color: selectedTalent && selectedTalent.name == talent.name ? "blacke" :"lightblue"
                                                }}
                                                className="  font-black  text-black">
                                                           {talent.name}
                             </Text>  
                        </TouchableOpacity>)
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
  
  export default TopPanel;