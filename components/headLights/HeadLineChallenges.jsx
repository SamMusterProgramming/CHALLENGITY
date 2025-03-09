import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import HeadLinePlayer from './HeadLinePlayer';

export default function HeadLineChallenges({ challengeData}) {

useEffect(() => {

}, [])

const renderItem = ({ item, index }) => {
        return  <HeadLinePlayer challenge={item} key={index}/>
      };

  return (
    <View className="h-[100%] min-w-[100vw]  flex-row justify-between ">
        <SwiperFlatList 
            data = { challengeData  }
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            scrollEventThrottle={15}
            pagingEnabled={false}
            // horizontal
        />
    </View>
  )
}