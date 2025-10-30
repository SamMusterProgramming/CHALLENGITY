import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '../../../constants';


const LeftSidePanel = ({ show, height, width ,top ,bottom,left ,right,data,setSelectedTalent , selectedTalent}) => {
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
      className="min-w-[15%] h-[65%] flex-col py-2 justify-between bg-[#292828] [#edebeb] [#3b4348] items-center rounded-tr-xl rounded-bl-xl"
      style={[
          {   
              // height:height,
              bottom:"10",
              left:left && left ,
              right:right && right,
              position: 'absolute',
            //   backgroundColor: 'transparent',
          }
          , 
          { transform: [{ translateX: sidebarAnimation }] }]}>
  
         <View
         className =" w-[100%] h-[100%] flex-col b g-[#055783] px-1 justify-between items-center">
            {data.map((talent , index) => {
              return  ( <TouchableOpacity
                        onPress={
                          () => {
                            setSelectedTalent({ 
                                name : talent.name,
                                icon : talent.icon
                            })
                          }
                        }
                        style={{
                            backgroundColor : selectedTalent && selectedTalent.name == talent.name ? "#1f2a5e" :"black"
                        }}
                        className = "w-[96%] h-[15%] py-2 rounded-xl flex-col gap-1 justify-center items-center"
                        key={index}>
                             <Image
                                        className="w-[70%]  h-[70%] flex-1 rounded-xl bg-"
                                        source={talent.icon}
                                        resizeMode='contain'
                                        />
                             <Text 
                                               style={{fontSize:7,
                                                color : selectedTalent && selectedTalent.name == talent.name ? "white" :"lightblue"
                                            }}
                                               className="  font-black  text-black">
                                                           {talent.name}
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
  
  export default LeftSidePanel;