import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import TalentRoomHeader from './TalentRoomHeader'
import { icons } from '../../constants'
import RegionSelector from './RegionSelector'

export default function TalentRoom({selectedTalent , setSelectedTalent}) {
  return (
  
   <View
   className="flex-1 flex-col  border-l-[10px] border-r-[10px] border-b-[10px] border-[#052d40] justify-start items-center g-black">
      <TalentRoomHeader  selectedTalent ={selectedTalent } /> 
      <View
      className="flex-1 g-gray-400 rounded-xl ">
          <RegionSelector selectedTalent ={selectedTalent} />
      </View>

      <View
      className=" min-w-full py-2 flex-row justify-center bg-[#062c4e] items-center g-white ">
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
      </View>

      <TouchableOpacity
        onPress={() => setSelectedTalent(null)}
        className="absolute bottom-2 left-6" >
            <Image
            className =" w-8 h-8 rounded-full "
            source={icons.back1} />
      </TouchableOpacity>
     
   </View>


  )
}