import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import HeadLinePlayer from './HeadLinePlayer';
import { icons } from '../../constants';
import { router } from 'expo-router';

export default function HeadLineChallenges({user, challengeData , show,width}) {

const [index , setIndex] = useState(3)

const [displayData , setDisplayData] = useState(challengeData.slice(0,3))
const [isLoaded ,setIsLoaded] = useState(false)
const [moreLeft,setMoreLeft] = useState(false)
const [moreRight,setMoreRight] = useState(challengeData.length > 8 ? true:false)


useEffect(() => {
  setIsLoaded(true)
  // !show?setDisplayData(challengeData.slice(0,3)): 
  // setDisplayData(challengeData.slice(0,3))
}, [])

const renderItem = ({ item, index }) => {
        return  <HeadLinePlayer challenge={item} key={index}/>
      };

const loadMoreData = () => {
        const newData = challengeData.slice(index, index + 8);
        setDisplayData([...displayData, ...newData]);
        setIndex(index + 8);
      };  

      

  return (
    <>
  
  <View className="w-[100vw] flex-row justify-center  items-center rounded-tr-3xl rounded-tl-3xl mt-2 mb-0 bg-[#dbbf0c] h-[40px]" >
       
        <View className="h-[150px] min-w-[100%] bg-[#1d242e] flex-row justify-between ">
        <FlatList 
            data = { isLoaded && displayData }
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ListHeaderComponent={  ()=> {
            return (
              <>
                {challengeData.length >= 1 && (
                         <View
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
                  )}
                 
              </>
                
              )
            }
            }

            ListFooterComponent={()=> {
              return   <View
                    className=" w-[95px] h-[100%]   flex-row justify-center items-center ">
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
    <View 
         className= " w-[100%] h-[40px] flex-row px-4 justify-center  rounde-tl-3xl rounde-tr-3xl items-center bg-[#f4cd0bd5] ">
              <Text 
                  style={{fontSize:width/36}}
                  className="font-black ml-5 text-sm text-black">
                        Friends who challenged you   
              </Text>  
         </View>
  </View>
  
  </>

  )
}