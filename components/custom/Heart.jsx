import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { icons } from '../../constants';


export default function Heart(props) {
  const { width, height } = useWindowDimensions();


  return (
  
       <View 
         className=" justify-center items-center bg-[#1c1a1]"
         style={styles.heart}>
            {/* <View style={ {
                        position: 'absolute',
                        width: "40%",
                        height: "90%",
                        backgroundColor: props.color1 ,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        // transform: [{ rotate: 'deg' }],
                        right: 0,
                        }} />
            <View style={ {
                        position: 'absolute',
                        width: "40%",
                        height: "90%",
                        backgroundColor: props.color2,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        //   transform: [{ rotate: '45deg' }],
                        left: 0,
                        }} /> */}

             <TouchableOpacity onPress={()=>{ 
                {props.link == "/back" ? router.back() : router.navigate(props.link)} ; 

                }}
                className="justify-center gap-[5%] w-[100%] h-[100%]  items-center    flex-col ">
                 
                 {props.title !== "" && (
                    <Text 
                    style={{fontSize: width <= 330 ? 7 : 8}}
                    className="font-black text-sm text-white">
                        {props.title}
                  </Text> 
                 ) } 
                  <Image 
                      className="w-[40%] h-[40%] "
                      source={props.icon}
                      resizeMode='contain'
                    />
                     
            </TouchableOpacity> 
      </View>

  )
}

const styles = StyleSheet.create({
    heart: {
      width: "100%",
      height:"100%",
    }
  });
  