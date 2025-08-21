import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import TalentRoomHeader from './TalentRoomHeader'
import { icons } from '../../constants'
import RegionSelector from './RegionSelector'
import Icon from '@expo/vector-icons/Ionicons'
export default function TalentRoom({selectedTalent , setSelectedTalent}) {
  return (
  
   <View
   className="flex-1 flex-col   justify-between items-center bg-[#3b4348]">
   
      <TalentRoomHeader  selectedTalent ={selectedTalent } /> 
      
      <View
      className="flex-1 g-gray-400 bg-black round ">
          <RegionSelector selectedTalent ={selectedTalent} />
      </View>
      
      

      <TouchableOpacity
        onPress={() => setSelectedTalent(null)}
        className="absolute top-4 left-6" >
                                <Icon name="arrow-back" size={30} color="#fff" />

      </TouchableOpacity>
     
   </View>


  )
}