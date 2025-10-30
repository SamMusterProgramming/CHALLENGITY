import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import CountryFlag from 'react-native-country-flag'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'

export default function Contestant({contestant , selectedContestant , setSelectedContestant ,talentRoom,
   participantTrackerId, regionIcon , selectedIcon ,index ,w,h , f}) {
  const {user} = useGlobalContext()
  const{width , height} = useWindowDimensions()
  const {contestantBgColor,setContestantBgColor} = useGlobalContext()

  const bgColor = ( selectedContestant && selectedContestant._id === contestant._id) 
    || ( participantTrackerId && participantTrackerId === contestant._id) ? 'white':
   user._id === contestant.user_id ?'#2f241a':contestantBgColor
   const textColor = 
    ( selectedContestant && selectedContestant._id === contestant._id) 
   || ( participantTrackerId && participantTrackerId === contestant._id) ? 'black' : 'white'

  return (
    <TouchableOpacity
                  onPress={ ()=> {setSelectedContestant({...contestant})}}
                  key ={index}
                  style ={{
                    // borderColor : selectedContestant && selectedContestant._id === contestant._id ? "green" : "transparent" ,
                    // backgroundColor: 
                    //     selectedContestant && selectedContestant._id === contestant._id ? 'rgba(255, 0, 0, 0.5)':
                    //     user._id === contestant.user_id ?'rgba(0, 155, 0, 0.5)':'rgba(22, 33, 129, 1.0)',
                        height : f?  f : width  * 0.18,
                        width :f?  f : width * 0.18,
                  }}
          
                  className =" flex-col bg- [#2f241a] justify-center items-center">
                              <View
                                  style={{
                                    height :f ?  f : width  * 0.18 ,
                                    width : f ?  f : width * 0.18,
                                    backgroundColor: 
                                    bgColor,
                                  }}
                                  className="flex-col justify-center items-center b g-white rounded-md ">
              
                                        <Image
                                        source={{uri:contestant.profile_img}}
                                        className ={f? "w-[20px] h-[20px] m- rounded-full":"w-[40px] h-[40px] m- rounded-full"}
                                        resizeMethod='fill'
                                        />  
                              </View>
              
                              {user._id === contestant.user_id && (
                                    <Image
                                        source={icons.you}
                                        className ="absolute right-0  w-4 h-4 bottom-4 rounded-full"
                                        resizeMethod='fill'
                                        /> 
                              )}
              
                              <View
                                  className ="absolute top-1 1 left-1 1 -rot ate-45 gap- 1  flex-row justify-center items-center   ">
                                            <Text 
                                                style ={{fontSize: f?6:8}}
                                                className=" text-center p-0 font-black text-white"> 
                                                    💙 
                                            </Text>
                                  
                                            <Text 
                                                style ={{fontSize:f?5:7,
                                                  color:textColor
                                                }}
                                                className="  font-black text-white"> 
                                                {contestant.votes }
                                            </Text>
                              </View>

                              <View
                                className = "absolute top-1 rotat e-45  right-1 1 gap- 1 flex-row justify-center items-center   ">
                                  
                                          <Text 
                                              style ={{fontSize:f? 5 :7,
                                                color:textColor
                                              }}
                                              className=" text-ce nter stroke-slate-50 p-0 font-black text-white"> 
                                              {contestant.rank < 4 ? "TP" :"RK"}
                                          </Text>
                            
                                  
                                          <Text 
                                              style ={{fontSize: f? 5 :7,
                                                color:textColor
                                              }}
                                              className=" font-black text-white"> 
                                              {contestant.rank }
                                          </Text>
                            </View>
              
                            <View
                                className="absolute bottom-4 left-0 rota te-90 ga p- 1 flex-row justify-center items-center">
                                  < CountryFlag
                                            isoCode={contestant.country || "US"}
                                            size={f?6:8}
                                  />
                            </View>
              
                            <View
                              className ="absolute bottom-[0.8px]    gap- flex-row  b g-white rounded-xl justify-center items-center">
                                
                                        <Text   
                                          style ={{fontSize:f?6 :7,
                                            color:textColor
                                          }}
                                          className="font-black mb- text-white ">
                    
                                            {contestant.name.slice(0,8)}
                                        
                                        </Text>
                            </View>
                </TouchableOpacity>
  )
}