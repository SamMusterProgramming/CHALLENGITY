import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../../constants';
import Slider from '@react-native-community/slider';
import v from '../../assets/icons/volume.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';




export default function VolumeControl({volume, setVolume,top,right,left,bottom}) {
    const [display , setDisplay] = useState(false)

  // return (
  //   <View 
  //               style={{top:top && top, left:left && left , right : right && right , bottom : bottom && bottom}}
  //               className ="absolute g-blue-800 flex-col w-[30px] h-[140px] justify-start items-center ">
  //                  {display ? (   
  //                   <View
  //                   className =" bg-[#7e6008]  flex-col w-[100%] h-[75%] rounded-t-xl justify-center items-center   right- right-">
                      
  //                       <Slider
  //                           style = {{ 
  //                               height: "100",
  //                               width: "220",
  //                               // backgroundColor:"white",
  //                               transform: [{ rotate: '-90deg' },{ scaleX: 0.4 }, { scaleY: 0.4 }],
                           
  //                                 }}
  //                           thumbTouchSize={{ width: 10, height: 10 ,color:"red" }}
  //                           minimumValue={0}
  //                           maximumValue={1}
  //                           step={0.1}
  //                           value={volume}
                       
  //                           onSlidingComplete={() => setDisplay(false)}
  //                           onValueChange={(newValue) => {
  //                           setVolume(newValue);
  //                           }}
  //                       />
  //                   </View> 
  //                  ):  (
  //                   <View
  //                   className =" g-blue-800 flex-col w-[100%] h-[75%] justify-center items-center   right- right-">

  //                   </View>  
  //                  )}  
  //                  <TouchableOpacity
  //                  onPress={() => {setDisplay(!display)}}
  //                  style= {{backgroundColor : display && "#7e6008"}}
  //                  className=" w-[100%] h-[25%] py- justify-center rounded-b-lg items-center g-white " >
  //                      <Image
  //                       style ={{ 
  //                           // transform: [{ rotate: '-90deg' }]
  //                       }}
  //                         className=" w-6 [79%] h-6 [79%] g-white"
  //                         resizeMethod='fit'
  //                         source={icons.volume}
  //                        />
  //                  </TouchableOpacity>
                       
  //    </View>
  // )

  return (
    <View
      style={{
        top: top && top,
        left: left && left,
        right: right && right,
        bottom: bottom && bottom,
        width: 48,
        height: 170,
      }}
      className="absolute justify-end items-center"
    >
      {/* SLIDER CONTAINER */}
  
      {display && (
        <View
          style={{
            width: 48,
            height: 120,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: "rgba(255,255,255,0.92)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.75)",
            shadowColor: "#FFFFFF",
            shadowOpacity: 0.18,
            shadowRadius: 14,
            elevation: 6,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* SOFT GLOSS */}
  
          <View
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "42%",
              backgroundColor: "rgba(255,255,255,0.92)",
            }}
          />
  
          <Slider
            style={{
              width: 150,
              height: 40,
              transform: [
                { rotate: "-90deg" },
                { scaleX: 0.65 },
                { scaleY: 0.65 },
              ],
            }}
            minimumValue={0}
            maximumValue={1}
            step={0.1}
            value={volume}
            minimumTrackTintColor="#111111"
            maximumTrackTintColor="rgba(0,0,0,0.08)"
            thumbTintColor="#fff45"
            thumbTouchSize={{
              width: 34,
              height: 34,
            }}
            onSlidingComplete={() => setDisplay(false)}
            onValueChange={(newValue) => {
              setVolume(newValue);
            }}
          />
        </View>
      )}
  
      {/* BUTTON */}
  
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={() => {
          setDisplay(!display);
        }}
        className = "rounded-b-lg"
        style={{
          width: 48,
          height: 48,
          // borderRadius: display ? 6 : 10,
          backgroundColor: display
            ? "#FFFFFF"
            : "rgba(255,255,255,0.16)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.28)",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#FFFFFF",
          shadowOpacity: display ? 0.2 : 0.08,
          shadowRadius: 12,
          elevation: 5,
        }}
      >
        <MaterialCommunityIcons
          name={
            volume === 0
              ? "volume-off"
              : volume < 0.5
              ? "volume-medium"
              : "volume-high"
          }
          size={26}
          color={display ? "#111111" : "#FFFFFF"}
        />
      </TouchableOpacity>
    </View>
  )
}