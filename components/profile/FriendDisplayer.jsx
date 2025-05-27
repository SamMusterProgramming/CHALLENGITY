import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Friend from './Friend'

export default function FriendDisplayer({friendList}) {

    const{width ,height} = useWindowDimensions()
    useEffect(() => {
    }, [])
    const renderItem = ({ item, index }) => {
        return  <Friend friend={item} key={index} />
      };

  return (
    <View
    style={{width:width-width/5
    }}
      className="h-[100%] w-[] ">
      <SwiperFlatList
        data={friendList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled={false}
        // ListFooterComponent={
        //   ()=>{
        //     return(
        //       <View
        //       className="min-w-[50px] h-[100%]  bg-red-400">

        //       </View>
        //     )
        //   }
        // }
        // autoplay	
        // autoplayLoop={true}
        // autoplayLoopKeepAnimation={true
      />
    </View>
  )
}