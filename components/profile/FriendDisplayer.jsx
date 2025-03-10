import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Friend from './Friend'

export default function FriendDisplayer({friendList}) {
    useEffect(() => {

    }, [])
    const renderItem = ({ item, index }) => {
        return  <Friend friend={item} key={index} />
      };

  return (
    <View
      className="h-[100%] ">
      <SwiperFlatList
        data={friendList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled={false}
        // autoplay	
        // autoplayLoop={true}
        // autoplayLoopKeepAnimation={true
      />
    </View>
  )
}