import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import CountryFlag from 'react-native-country-flag'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'

export default function Contestant({contestant , selectedContestant , setSelectedContestant ,talentRoom, regionIcon , selectedIcon ,index ,w,h}) {
  const {user} = useGlobalContext()
  const{width , height} = useWindowDimensions()


 
  return (
    <TouchableOpacity
                  onPress={ ()=> {setSelectedContestant({...contestant, rank:index})}}
                  key ={index}
                  style ={{
                    // borderColor : selectedContestant && selectedContestant._id === contestant._id ? "green" : "transparent" ,
                    backgroundColor: 
                        selectedContestant && selectedContestant._id === contestant._id ? 'rgba(255, 0, 0, 0.5)':
                        user._id === contestant.user_id ?'rgba(0, 155, 0, 0.5)':'rgba(22, 33, 129, 1.0)',
                    width :  w,
                    height :  h
                  }}
                
                  className ="w-[23%] h-[100%] py- flex-col g-black rounded-lg borde-b-4 borde-2 borde-white justify-start items-center">
                        <View
                          className ="w-[100%] h-[33%] py- px-2 flex-row g-white rounde-t-xl borde-t-4 justify-end items-center">
                            {talentRoom.voters.find(v =>  
                                                         (v.post_id == contestant._id &&
                                                         v.voter_id == user._id)
                                                          ) && (
                                                            <Text
                                                             className="absolute bg-white p-1 rounded-sm top-0 left-0"
                                                             style={ {
                                                              fontWeight:"800",
                                                              color: "red",
                                                              fontSize: 7,
                                                              fontWeight:900
                                                            }}>VOTED</Text>
                                                       )
                                                      }
                           
                              <View
                                className="w-[50%] h-[100%] gap-2 flex-row justify-center items-center">
                                  < CountryFlag
                                            isoCode={contestant.country || "US"}
                                            size={12}
                                       
                                  />
                                   <Text style={ {
                                            fontWeight:"800",
                                            color: "white",
                                            fontSize: 10,
                                            fontWeight:900
                                          }}>{ contestant.country || "US"}</Text>
                              </View>
                            
                                     {/* <Image
                                        source={selectedIcon}
                                        className ="w-[30%] h-[70%] m- rounded-full"
                                        resizeMethod='fill'
                                        />  */}
                             
                            
                             
                        </View>


                        <View
                          className ="w-[100%] h-[40%] py- flex-row g-white rounde-t-xl borde-t-4 justify-between items-center">
                              <View
                                  className ="w-[33%] h-[100%]  flex-col justify-start items-center   g-white rounded-t-lg g-blue-700 text-pretty">
                                     <View
                                      className ="w-[100%] h-[50%] -1   g-white rounded-t-lg g-blue-700 text-center">
                                            <Text 
                                                style ={{fontSize:7}}
                                                className="text-xl text-center p-0 font-black text-white"> 
                                                Votes 
                                              
                                            </Text>
                                      </View>
                                      <View
                                      className ="min-w-[100%] h-[50%]  px flex-row justify-center item-center g-white rounded-t-lg g-blue-700 text-center">
                                            <Text 
                                                style ={{fontSize:7}}
                                                className="text-xl  font-black text-white"> 
                                                {contestant.votes }
                                            </Text>
                                      </View>
                              </View>

                              <Image
                              source={{uri:contestant.profile_img}}
                              className ="w-[20px] h-[20px] m- rounded-full"
                              resizeMethod='fill'
                              />

                              <View
                                className ="w-[33%] h-[100%]  flex-col justify-start items-center   g-white rounded-t-lg g-blue-700 text-pretty">
                                   <View
                                    className ="w-[100%] h-[50%] -1   g-white rounded-t-lg g-blue-700 text-center">
                                          <Text 
                                              style ={{fontSize:7}}
                                              className="text-xl text-center p-0 font-black text-white"> 
                                              TOP
                                            
                                          </Text>
                                    </View>
                                    <View
                                    className ="min-w-[100%] h-[50%]  px flex-row justify-center item-center g-white rounded-t-lg g-blue-700 text-center">
                                          <Text 
                                              style ={{fontSize:7}}
                                              className="text-xl  font-black text-white"> 
                                              {index }
                                          </Text>
                                    </View>
                            </View>
                               
                             
                        </View>

                        <View
                        className ="w-[90%] h-[26%] py- flex-col mt-auto g-white rounded-t-xl g-white justify-center items-center">
                              <View
                                  className ="w-[100%] h-[100%]  flex-row g-white rounde-tr-xl  justify-center items-start ">
                                    <Text 
                                    style ={{fontSize:7}}
                                    className="text-xl font-black  text-white"> 
                                      {contestant.name.slice(0,13)}
                                  </Text>
                              </View>
                             
                        </View>

                        {user._id === contestant.user_id && (
                                     <Image
                                        source={icons.you}
                                        className ="absolute top-[5px] right-[5px] w-6 h-6 m- rounded-full"
                                        resizeMethod='fill'
                                        /> 
                              )}

                        {/* {selectedContestant && selectedContestant._id === contestant._id && (
                                  <Image  
                                  source={icons.check_red}  
                                  className ="absolute bottom-6 right-0 w-[20px] h-[20px]  rounded-full"  
                                  resizeMethod='fill'  
                                  />
                            )} */}
                </TouchableOpacity>
  )
}