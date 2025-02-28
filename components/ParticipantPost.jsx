import { View, Text, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { images } from '../constants'
import Post from './Post'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { InView } from 'react-native-intersection-observer'



   

export default function ParticipantPost({participants,challenge,isVisibleVertical}) {

    const [viewableItems, setViewableItems] = useState([]);
    const [finishPlaying ,setFinishPlaying] =useState(false)
    const swiperRef = useRef(null);


    const onViewableItemsChanged = ({ viewableItems }) => {
      setViewableItems(viewableItems);
    };
    useEffect(() => {
       setFinishPlaying(false)
    }, [viewableItems])


    const renderItem = ({ item, index }) => {
      const isVisible = viewableItems.some(viewableItem => viewableItem.index === index);
      // setFinishPlaying(false)
      return <Post isVisible={isVisible && isVisibleVertical} setFinishPlaying={setFinishPlaying} key={item._id} index={index} participant={item} challenge={challenge} />
    };
    useEffect(() => {
      if(finishPlaying){
        if (swiperRef.current) {
          const currentIndex = swiperRef.current.getCurrentIndex();
          swiperRef.current.scrollToIndex({ index: ((currentIndex + 1) % participants.length) });
        }
      }
    }, [finishPlaying])
    
  return (

    
  <SwiperFlatList
  ref={swiperRef}
  data={participants}
  keyExtractor={(item) => item._id}
  renderItem={renderItem}
  // autoplay
  // autoplayDelay={5}
  // autoplayLoop
  onViewableItemsChanged={onViewableItemsChanged}
  viewabilityConfig={{
    itemVisiblePercentThreshold: 70, 
  }}
  // viewabilityConfig={{itemVisiblePercentThreshold:70}}
  // contentInset={{y:170}}
  horizontal
  />
  )
}