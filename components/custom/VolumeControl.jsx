import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants';
import Slider from '@react-native-community/slider';
import v from '../../assets/icons/volume.png'




export default function VolumeControl({volume, setVolume,top,right,left,bottom}) {
    const [display , setDisplay] = useState(false)

  return (
    <View 
                style={{top:top && top, left:left && left , right : right && right , bottom : bottom && bottom}}
                className ="absolute g-blue-800 flex-col w-[30px] h-[140px] justify-start items-center ">
                   {display ? (   
                    <View
                    className =" bg-[#7e6008]  flex-col w-[100%] h-[75%] rounded-t-xl justify-center items-center   right- right-">
                      
                        <Slider
                            style = {{ 
                                height: "100",
                                width: "220",
                                // backgroundColor:"white",
                                transform: [{ rotate: '-90deg' },{ scaleX: 0.4 }, { scaleY: 0.4 }],
                           
                                  }}
                            thumbTouchSize={{ width: 10, height: 10 ,color:"red" }}
                            minimumValue={0}
                            maximumValue={1}
                            step={0.1}
                            value={volume}
                       
                            onSlidingComplete={() => setDisplay(false)}
                            onValueChange={(newValue) => {
                            setVolume(newValue);
                            }}
                        />
                    </View> 
                   ):  (
                    <View
                    className =" g-blue-800 flex-col w-[100%] h-[75%] justify-center items-center   right- right-">

                    </View>  
                   )}  
                   <TouchableOpacity
                   onPress={() => {setDisplay(!display)}}
                   style= {{backgroundColor : display && "#7e6008"}}
                   className=" w-[100%] h-[25%] py- justify-center rounded-b-lg items-center g-white " >
                       <Image
                        style ={{ 
                            // transform: [{ rotate: '-90deg' }]
                        }}
                          className=" w-6 [79%] h-6 [79%] g-white"
                          resizeMethod='fit'
                          source={icons.volume}
                         />
                   </TouchableOpacity>
                       
     </View>
  )
}