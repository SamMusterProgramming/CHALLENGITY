
import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { MotiView } from 'moti';


export default function TalentRoomIntroduction({selectedIcon , selectedTalent ,region, regionIcon ,setStart}) {
 
  const {width,height} = useWindowDimensions()
  return (
    <View className=" absolute top flex-1 g-white flex-col justify-center items-center px-6">
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300, type: 'timing', duration: 600 }}
        className="mb-10 gap-4"
      >
          <Text
           style={{fontSize : height/25}}
           className="text-white text-4xl font-bold text-center">
          🌟 
        </Text>
        <Text 
        style={{fontSize : height/25}}
        className="text-white text-4xl font-bold text-center">
           Welcome to the Talent Room
        </Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 500, type: 'timing', duration: 600 }}
        className="mb-10 flex-col gap-2 items-center text-center"
       >
         <Image 
                            className="w-14 h-14 opacity-100"
                            source={selectedIcon}/>
         <Text className="text-white text-lg font-bold text-center">
            {selectedTalent} Stage
        </Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 800, type: 'timing', duration: 600 }}
        className="mb-10 flex-col gap-2 items-center text-center"
       >
         <Image 
                            className="w-14 h-14 opacity-100"
                            source={regionIcon}/>
         <Text className="text-white text-lg font-bold text-center">
           Region - {region}
        </Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1000, type: 'timing', duration: 800 }}
        className="mb-10"
      >
        <Text className="text-gray-300 text-center text-lg">
          Get ready to discover rising stars from around the world.
          Cheer them on, vote, and be part of the journey. 🌍
        </Text>
      </MotiView>

      <MotiView
        from={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1200, type: 'spring' }}
        className="mb-10"
      >
        <TouchableOpacity
          className="bg-blue-600 px-6 py-3 rounded-3xl"
          onPress={() => setStart(true)}
        >
          <Text className="text-white text-lg font-semibold">
            Enter the Talent Room 🚪
          </Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}