import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import TalentRoomHeader from './TalentRoomHeader'
import { icons } from '../../constants'
import RegionSelector from './RegionSelector'
import Icon from '@expo/vector-icons/Ionicons'
export default function TalentRoom({selectedTalent , setSelectedTalent}) {
  return (
  
   <View
   className="flex-1 flex-col  borde-l-[10px] borde-r-[10px] borde-b-[10px] order-[#272d31] justify-start items-center g-black">
   
      <TalentRoomHeader  selectedTalent ={selectedTalent } /> 
      
      <View
      className="flex-1 g-gray-400 bg-black rounded-xl ">
          <RegionSelector selectedTalent ={selectedTalent} />
      </View>
      
      {/* <View
      className=" min-w-full py-2 flex-row justify-center g-[#062c4e] items-center g-white ">
        <Text 
                className=" text-center text-xl font-bold text-white mb-"
                style={{fontSize:11}}>   Region 
          </Text>
          <Text 
                className=" text-center text-xl font-bold text-white mb-"
                style={{fontSize:20}}>   🌍  
          </Text>
          <Text 
                className=" text-center text-xl font-bold text-white mb-"
                style={{fontSize:11}}>   Selection 
          </Text>
      </View> */}

      <TouchableOpacity
        onPress={() => setSelectedTalent(null)}
        className="absolute top-8 left-5" >
                                <Icon name="arrow-back" size={50} color="#fff" />

      </TouchableOpacity>
     
   </View>


  )
}