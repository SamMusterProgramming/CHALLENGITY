import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '../../../constants';
import { getIcon, getStageLogo } from '../../../helper';


const BottomPanel = ({ show, height, width ,top ,bottom,left ,right,data , setSelectedRegion , selectedRegion}) => {

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
      className="w-[70%] h-[10%] flex-col justify-center items-center b g-[#292828] [#edebeb] [#3b4348] "
      style={[
          {
              bottom:"0",
              left:"15%" ,
              right:right && right,
              position: 'absolute',
            //   backgroundColor: 'transparent',
          }
          , 
          { transform: [{ translateX: sidebarAnimation }] }]}  >
  
         <View
         className =" w-[100%] h-[100%] flex-row b g-[#055783] py- gap-2 justify-center  items-center">
            {data.map((region , index) => {
              return  ( <TouchableOpacity
                        onPress={()=> { setSelectedRegion(
                                    {
                                        name : region.name,
                                        icon : region.icon
                                    })
                                }}
                        style={{
                            // backgroundColor : selectedRegion && selectedRegion.name == region.name ? "#1f2a5e" :"black"
                        }}
                        className = "w- [19%] h-[80%] bg-[black] py -4 px-1 rounded-md gap- 1 flex-col justify-center items-center"
                        key={index}>
                             <Image     style={{width:width/1.5 ,height:width/1.5}}
                                        // className="w-7  h-7 rounded-full "
                                        source={getStageLogo(region.name)}
                                        resizeMode='cover'
                                        />
                             {/* <Text 
                                               style={{fontSize:8,
                                                    color: selectedRegion && selectedRegion.name == region.name ? "white" :"lightblue"
                                                }}
                                               className="  font-black  text-black">
                                                           {region.name}
                             </Text>   */}

                             {selectedRegion && selectedRegion.name == region.name && (<View className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500" />)} 

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
  
  export default BottomPanel;