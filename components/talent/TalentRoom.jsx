import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import TalentRoomHeader from './TalentRoomHeader'
import { icons } from '../../constants'
import RegionSelector from './RegionSelector'

export default function TalentRoom({selectedTalent , setSelectedTalent}) {
  return (
  
   <View
   className="flex-1 flex-col justify-start items-center bg-white">
      <TalentRoomHeader  selectedTalent ={selectedTalent } /> 
      <View
      className="flex-1 bg-white ">
          <RegionSelector selectedTalent ={selectedTalent} />
      </View>

      <TouchableOpacity
        onPress={() => setSelectedTalent(null)}
        className="absolute top-2 left-12" >
            <Image
            className =" w-10 h-10 "
            source={icons.back} />
      </TouchableOpacity>
     
   </View>


  )
}