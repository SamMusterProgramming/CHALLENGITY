import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '../../../constants';
import { getStageLogo } from '../../../helper';


const RightSidePanel = ({ show, height, width ,top ,bottom,left ,right,data , setSelectedTalent, selectedTalent}) => {
  //   const sidebarWidth = width * 0.8; 
    const sidebarAnimation = useRef(new Animated.Value( show ? 0 :  -width )).current;

   
  
    useEffect(() => {
      
      Animated.timing(sidebarAnimation, {
        toValue: show ? 0 :  width ,
        duration: 700,
        useNativeDriver: true,
      }).start();
     
  
    }, [show]);
  
    return (
      <Animated.View 
      className="w-[18%] h-[70%] py-2 flex-col justify-between b g-[#292828] [#edebeb] [#3b4348] items-center rounded-tl-xl rounded-br-xl"
      style={[
          {
              bottom:"10",
              left:left && left ,
              right:right && right,
              position: 'absolute',
            //   backgroundColor: 'transparent',
          }
          , 
          { transform: [{ translateX: sidebarAnimation }] }]}>
  
         <View
         className =" w-[100%] h-[100%] flex-col b g-[#055783] px- 1 justify-between items-center">
            {data.map((talent , index) => {
              return  ( <TouchableOpacity
                        onPress={
                            () => {
                            setSelectedTalent({
                                    name:talent.name,
                                    icon : talent.icon
                                })
                            }
                        }
                        style={{
                            // backgroundColor : selectedTalent && selectedTalent.name == talent.name ? "#1f2a5e" :"black"
                        }}
                        className = "w-[100%] h-[20%] rounded-xl py-2 mr-[-10] flex-col gap- 1 justify-center items-center"
                        key={index}>
                             <Image
                                        className = {selectedTalent && selectedTalent.name == talent.name ?"w-[100%]  h-[100%]":"w-[85%]  h-[100%]"}
                                        source={getStageLogo(talent.name)}
                                        resizeMode='cover'
                                        />
                            <Text 
                                               style={{fontSize:selectedTalent && selectedTalent.name == talent.name ? width/7 :width/8,
                                                color : selectedTalent && selectedTalent.name == talent.name ? "white" :"lightblue"
                                            }}
                                               className="  font-black mt-[-10] text-black">
                                                           {talent.name}
                             </Text>  

                             {selectedTalent && selectedTalent.name == talent.name && (<View className="absolute top-0 left-0 w-3 h-3 rounded-full bg-green-500" />)} 

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
  
  export default RightSidePanel;