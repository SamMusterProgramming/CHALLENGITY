import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getTopChallenges, removeChallengeFromFavourite } from '../../apiCalls'

export default function ChallengeExpired({challenge_id}) {
    const{user,trendingsChallenges,setTrendingChallenges,favouriteChallenge,setFavouriteChallenge} = useGlobalContext()
    const[isExpired,setIsExpired] = useState(false)

    useEffect(() => {
        getTopChallenges(user._id,setTrendingChallenges)
        if(favouriteChallenge.favourites.find(challenge => challenge._id == challenge_id))
            removeChallengeFromFavourite(user._id,{_id:challenge_id},setFavouriteChallenge,setIsExpired)
    }, [])
    
  return (
    <View className="w-[100%] h-[100%] flex-1 bg-primary flex-col justify-center items-center">
             <View className=" bg-primary flex-row gap-4 justify-center items-center">
               <Text className="text-white text-xl">
                 Challenge Expired
               </Text>
         
               <TouchableOpacity
                  onPress={()=> {router.back()}}
                  className="w-14 h-14" > 
                   <Image 
                     source={icons.back}
                     className="w-14 h-14"
                     resizeMethod='contain'
                   />
               </TouchableOpacity>
             </View> 
   </View>
  )
}