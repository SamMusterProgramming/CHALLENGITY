import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'


import { useGlobalContext } from '../context/GlobalProvider'


import { SafeAreaView } from 'react-native-safe-area-context'

export default function favouriteChallenges() {
  const {user,favouriteChallenge} = useGlobalContext()
  const [favouriteList , setFavouriteList] = useState(null)
  const [viewableItems, setViewableItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(2);

  
  // useEffect(() => {
  //   setFavouriteList(favouriteChallenge)
  //   setIsLoaded(true)
  // }, [favouriteChallenge])

 
  // useEffect(() => {
  //   setDisplayData(favouriteChallenge.favourites.slice(0,2))
  //   return () => {
  //     console.log("cleaning up favourites")
  //     setDisplayData([])
  //     setViewableItems([])
  //   };
  // }, [] )

  // const onViewableItemsChanged = ({ viewableItems }) => {
  //   setViewableItems(viewableItems);
  // };
  // const renderItem = ({ item, index }) => {  
  //   const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
  //   return  <Challenge key={item.challenge_id} isVisibleVertical={isVisibleVertical} challenge={item}/>
  // };

  
  // const loadMoreData = () => {
  //   const newData = favouriteChallenge.favourites.slice(index, index + 2);
  //   setDisplayData([...displayData, ...newData]);
  //   setIndex(index + 2);
  // };



  return (
    <SafeAreaView className="min-w-full flex-1 bg-primary min-h-full">
  
    </SafeAreaView>
  )
}