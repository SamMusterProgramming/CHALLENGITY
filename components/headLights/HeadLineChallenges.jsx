import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import HeadLinePlayer from './HeadLinePlayer';

export default function HeadLineChallenges({user, challengeData}) {

const [index , setIndex] = useState(3)
const [displayData , setDisplayData] = useState(challengeData.slice(0,3))
const [isLoaded ,setIsLoaded] = useState(false)

useEffect(() => {
  setIsLoaded(true)
}, [])

const renderItem = ({ item, index }) => {
        return  <HeadLinePlayer challenge={item} key={index}/>
      };

const loadMoreData = () => {
        const newData = challengeData.slice(index, index + 3);
        setDisplayData([...displayData, ...newData]);
        setIndex(index + 3);
      };      

  return (
    <View className="h-[100%] min-w-[100vw]  flex-row justify-between ">
        <FlatList 
            data = { isLoaded && displayData }
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ListHeaderComponent={  ()=> {
            return   <View
                  className=" w-[95px] h-[100%]  flex-row justify-center items-center ">
                    <View className="h-[90%] w-[95%] flex-col justify-start rounded-lg bg-black items-center">
                       < Image
                        className="h-[50%] w-[100%] rounded-lg"
                        source={{uri:user.profile_img}}
                       />
                       <View
                       className="w-[100%] h-[50%] flex-col justify-center items-center gap-2 ">
                            <Text
                             className="text-white font-black text-xs">
                               New 
                            </Text>
                            <Text
                             className="text-white font-black text-xs">
                               Challenge
                            </Text>
                       </View>

                    </View>
              </View>
            }
            }

            ListFooterComponent={()=> {
              return   <View
                    className=" w-[95px] h-[100%]  flex-row justify-center items-center ">
                      <View className="h-[90%] w-[95%] flex-col justify-start rounded-lg bg-black items-center">
                         < Image
                          className="h-[50%] w-[100%] rounded-lg"
                          source={{uri:user.profile_img}}
                         />
                         <View
                         className="w-[100%] h-[50%] flex-col justify-center items-center gap-2 ">
                              <Text
                               className="text-white font-black text-xs">
                                 New 
                              </Text>
                              <Text
                               className="text-white font-black text-xs">
                                 Challenge
                              </Text>
                         </View>
  
                      </View>
                </View>
              }
                      
            }
            scrollEventThrottle={15}
            pagingEnabled={false}
            onEndReached={loadMoreData}
            horizontal
        />
    </View>
  )
}