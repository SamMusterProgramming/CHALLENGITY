import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider';
import { formatTime } from '../../helper';

export default function ProgresssBarVideo({player,visible,bottom ,key}) {
 const [progress, setProgress] = useState(5);
 const [timer, setTimer] = useState(0);
 const {width , height} = useWindowDimensions()
  useEffect(() => {
    if (!player) return;
    setProgress(0);
    const subscription = player.addListener("timeUpdate", () => {
      if (player.duration > 0) {
        setProgress(player.currentTime / player.duration);
      }
    });

    return () => subscription?.remove();
  }, [player, key]);

  return (
   <>
      {visible && (<Slider
            style={{width: 200, height: 20  ,position:"absolute" ,bottom:bottom}}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="gray"
            thumbTintColor="transparent"
            onValueChange={(value) => {
              player.currentTime = value * player.duration;
            }}
            />)}

       <Text 
       className="text-white text-sm absolute font-black "
        style={{position:"absolute" ,bottom:bottom + 30 , fontSize:width/50}}>
                         {formatTime(player.currentTime * 1000)}
      </Text>     
           
     </>       
 
  )
}