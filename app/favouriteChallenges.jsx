import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'

import { getFavouriteChallenges } from '../apiCalls'
import { useGlobalContext } from '../context/GlobalProvider'
import Challenge from '../components/challenge/Challenge'
import { icons } from '../constants'
import { router } from 'expo-router'
import { getInition } from '../helper'

export default function favouriteChallenges() {
  const {user,favouriteChallenge} = useGlobalContext()
  const [favouriteList , setFavouriteList] = useState(null)
  const [viewableItems, setViewableItems] = useState([]);
  
  useEffect(() => {
    setFavouriteList(favouriteChallenge)
  }, [favouriteChallenge])

  const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
  };
  const renderItem = ({ item, index }) => {  
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
    return  <Challenge key={item.challenge_id} isVisibleVertical={isVisibleVertical} challenge={item}/>
  };

  const renderHeader = useMemo(()=> {
    return (
        <View className=" w-[100vw] h-[12vh] mb-5
                    flex-row justify-start items-center">

            <View
                className=" w-[40vw] h-[100%] 
                flex-col justify-start items-start">

                <TouchableOpacity
                    onPress={()=>{router.back()}}
                    className="flex-col rounded-sm h-[40%] justify-center items-center ">
                        <Image 
                        className="w-14 h-8"
                        resizeMode='contain'
                        source={icons.back} 
                        />
                        <Text
                        className="text-white font-bold  text-xs">
                            Back
                        </Text>
                </TouchableOpacity>

                <View className=" w-[100%] h-[60%] px- gap-5
                   flex-row justify-center items-end">
                      <Image 
                         className="w-[40px] h-[40px] rounded-full "
                            source={{uri:user.profile_img}}
                       />       
                      <View className="justify-end gap-1 items-start min-h-[100%] flex-col">
                            <Text className="font-bold text-xs text-white">
                                    {user.name}
                            </Text> 
                            <Text className=" text-xs  text-white font-bold">
                                {getInition(user.name)}Challenger
                            </Text>    
                      </View>
                </View >

            </View>

            <View
                className=" w-[60vw] h-[100%] flex-row justify-start gap-4 items-end">
                    <Image 
                       className="w-24 h-[100%]"
                       resizeMode='contain'
                       source={icons.favourite} 
                    />
                    <View className="justify-end gap-1 items-center min-h-[100%] flex-col">
                      <Text className=" text-xl  text-blue-400 font-bold">
                                Favourite
                      </Text>  
                      <Text className=" text-sm  text-white font-bold">
                                Challenges
                      </Text>  
                    </View>  
            </View>

            {/* <View>
                <TouchableOpacity
                    onPress={()=>{router.push('favouriteChallenges')}}
                    className=" flex-col rounded-sm justify-center items-center ">
                    <Image 
                    className="w-14 h-8"
                    resizeMode='contain'
                    source={icons.favourite} 
                    />
                    <Text
                    className="text-white font-bold  text-xs">
                        Favourites
                    </Text>
                </TouchableOpacity>
            </View> */}

        </View>
    )
  },[])
  return (
    <SafeAreaView className="min-w-full flex-1 bg-primary min-h-full">
       
      <View
          style={{ flex: 1 }}
>
        <FlatList 
        data={ favouriteList && favouriteList.favourites}
        keyExtractor={(item)=> item._id}
        renderItem={renderItem}   
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
              itemVisiblePercentThreshold: 70, // Adjust as needed
        }}

        ListHeaderComponent={renderHeader}
        // onRefresh={handleRefresh}
        // refreshing={false}
        // extraData={refresh}
        />
        </View>
  
    </SafeAreaView>
  )
}