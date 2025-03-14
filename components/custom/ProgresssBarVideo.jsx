import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { Slider } from 'react-native';
import { useEvent, useEventListener } from 'expo';
import Slider from '@react-native-community/slider';
import { icons } from '../../constants';
import { formatTime } from '../../helper';

export default function ProgresssBarVideo({player,visible,bottom}) {
 const [progress, setProgress] = useState(5);
 const [timer, setTimer] = useState(0);


 const handleTimeUpdate = () => {
        setProgress(player.currentTime / player.duration);
      };
    
//   useEvent(player, 'playingChange', handleTimeUpdate);

  useEffect(() => {
    const statusSubscription = player?.addListener(
      'timeUpdate',
      () => {
        setProgress(player.currentTime / player.duration);
        setTimer(player.currentTime)
      },
    );
    return () => {
      statusSubscription.remove();
    };
  }, []);

  return (
   <>
      {!visible && (<Slider
            style={{width: 200, height: 40  ,position:"absolute" ,bottom:bottom}}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="gray"
            thumbTintColor="transparent"
            // thumbImage={icons.back}
            onValueChange={(value) => {
            //   player.setPositionAsync(value);
            }}
            />)}

       <Text className="text-white text-sm absolute font-black "
        style={{position:"absolute" ,bottom:bottom-8}}>
                         {formatTime(player.currentTime *1000)}
      </Text>     
           
     </>       
 
  )
}