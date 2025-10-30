import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import CountryFlag from 'react-native-country-flag'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'

export default function VacntSpotContestant({ index ,f}) {
  const {user} = useGlobalContext()
  const{width , height} = useWindowDimensions()

  const bgColor = 'black'
   const textColor = 'white'

 
  return (
    <View
                //   onPress={ ()=> {setSelectedContestant({...contestant})}}
                  key ={index}
                  style ={{
                    // borderColor : selectedContestant && selectedContestant._id === contestant._id ? "green" : "transparent" ,
                    // backgroundColor: 
                    //     selectedContestant && selectedContestant._id === contestant._id ? 'rgba(255, 0, 0, 0.5)':
                    //     user._id === contestant.user_id ?'rgba(0, 155, 0, 0.5)':'rgba(22, 33, 129, 1.0)',
                        height : f?  f : width  * 0.18 ,
                        width :f?  f : width * 0.18,
                  }}
          
                  className =" flex-col bg- [#092b43] justify-center items-center">
                              <View
                                  style={{
                                    height :f ?  f : width  * 0.18 ,
                                    width : f ?  f : width * 0.18,
                                    // backgroundColor:  bgColor,
                                  }}
                                  className="flex-col justify-center items-center bg-[#4b5155] rounded-md ">
              
                                        <Image
                                        source={icons.avatar}
                                        className ={f? "w-[30px] h-[30px] m- rounded-full":"w-[40px] h-[40px] m- rounded-full"}
                                        resizeMethod='fill'
                                        />  
                              </View>
              
                             
              
                              <View
                                  className ="absolute top-1 1 left-1 1 -rot ate-45 gap- 1  flex-row justify-center items-center   ">
                                  
                                            <Text 
                                                style ={{fontSize:f?8:7,
                                                  color:textColor
                                                }}
                                                className="  font-black text-white"> 
                                                 ?
                                            </Text>
                              </View>
              
                             
              
                            <View
                              className ="absolute bottom-[0.8px]    gap- flex-row  b g-white rounded-xl justify-center items-center">
                                
                                        <Text   
                                          style ={{fontSize:f?6 :7,
                                            color:textColor
                                          }}
                                          className="font-black mb- text-white ">
                    
                                            Vacant
                                        
                                        </Text>
                            </View>
                </View>
  )
}