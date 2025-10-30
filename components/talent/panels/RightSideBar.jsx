import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '../../../constants';


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
      className="w-[15%] min-h-[65%] py-2 flex-col justify-between bg-[#292828] [#edebeb] [#3b4348] items-center rounded-tl-xl rounded-br-xl"
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
         className =" w-[100%] h-[100%] flex-col b g-[#055783] px-1 rounded-xl justify-between items-center">
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
                            backgroundColor : selectedTalent && selectedTalent.name == talent.name ? "#1f2a5e" :"black"
                        }}
                        className = "w-[96%] h-[15%] rounded-xl py-2 flex-col gap-2 justify-center items-center"
                        key={index}>
                             <Image
                                        className="w-[80%]  h-[80%] flex-1 rounde d-xl bg-"
                                        source={talent.icon}
                                        resizeMode='contain'
                                        />
                             <Text 
                                               style={{fontSize:8,
                                                    color :selectedTalent && selectedTalent.name == talent.name ? "white" :"lightblue"

                                                }}
                                               className="  font-black  text-black">
                                                           {talent.name.slice(0.6)}
                             </Text>  

                             {selectedTalent && selectedTalent.name == talent.name && (<View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />)} 

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