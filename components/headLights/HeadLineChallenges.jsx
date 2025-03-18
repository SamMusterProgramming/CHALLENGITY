import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import HeadLinePlayer from './HeadLinePlayer';

export default function HeadLineChallenges({ challengeData}) {

const [index , setIndex] = useState(4)
const [displayData , setDisplayData] = useState(challengeData.slice(0,4))
const [isLoaded ,setIsLoaded] = useState(false)

useEffect(() => {
  setIsLoaded(true)
}, [])

const renderItem = ({ item, index }) => {
        return  <HeadLinePlayer challenge={item} key={index}/>
      };

const loadMoreData = () => {
        const newData = challengeData.slice(index, index + 4);
        setDisplayData([...displayData, ...newData]);
        setIndex(index + 4);
      };      

  return (
    <View className="h-[100%] min-w-[100vw]  flex-row justify-between ">
        <FlatList 
            data = { isLoaded && displayData }
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            scrollEventThrottle={15}
            pagingEnabled={false}
            onEndReached={loadMoreData}
            horizontal
        />
    </View>
  )
}