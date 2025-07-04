import { View, Text } from 'react-native'
import React from 'react'
import CountryFlag from 'react-native-country-flag'

export default function InfosProfile(props) {
  return (
    <>
     <View
                        style={{width:"50%",height:props.height}}
                        className="w-[50%] h-[100%] flex-col justify-start items-center"
                        >
                            <View className="w-[100%] h-[40%] mt-4 mr-[20%] flex-row justify-center px-2 items-center ">
                                 <Text 
                                   style={{fontSize:9}}
                                   className="text-gray-600 font-bold ">
                                    City : 
                                 </Text>
                                 <Text
                                    className="font-black"
                                    style={{
                                      fontSize:8,
                                      color:props.color ?"black" : "white"
                                    }}
                                  >
                                    {' '}{props.city}
                                 </Text>
                            </View>
                            <View className="w-[100%] h-[40%] mr-[15%] flex-row justify-center px-2 items-center">
                                 <Text 
                                   style={{fontSize:9}}
                                   className="text-gray-600 font-bold ">
                                    State :
                                 </Text>
                                 <Text
                                    className="font-black"
                                    style={{
                                      fontSize:8,
                                      color:props.color ?"black" : "white",
                                    }}
                                  >
                                    {' '}{props.state}
                                 </Text>
                               
                            </View>

                    </View>


                    <View
                        style={{width:"50%",height:props.height}}
                        className="w-[50%] h-[100%] flex-col justify-start px-2 items-center "
                        >
                            <View 
                               className="w-[100%] h-[40%] mt-4 flex-row justify-center px-2 items-center ">
                                 <Text 
                                   style={{fontSize:9}}
                                   className="text-gray-600 ml-[20%] font-bold ">
                                    City :
                                 </Text>
                                 <Text
                                    className="font-black"
                                    style={{
                                      fontSize:8,
                                      color:props.color ?"black" : "white"}}
                                  >
                                    {' '}{props.city}
                                  </Text>
                            </View>

                            <View className="w-[100%] h-[40%] ml-[20%] flex-row justify-center px-2 items-center">
                                  {/* <View
                                    className="w-[50%] h-[100%]  flex-row justify-center items-center">
                                        
                                  </View> */}
                                  <View
                                    className="w-[20%] h-[100%]  flex-row justify-center items-center">
                                        < CountryFlag
                                            isoCode={props.country}
                                            size={10}
                                            style={ {
                                                marginLeft:"auto"
                                                }}
                                        />
                                  </View>
                                 
                                  <View 
                                  className="flex-row justify-center h-[100%]  items-center"
                                    style={{
                                        borderRadius: 5,
                                        alignItems:"center",
                                        width:"30%",
                                
                                      }}>
                                      <Text style={ {
                                            fontWeight:"800",
                                            color:props.color ?"black" : "white",
                                            fontSize: 10,
                                          }}>{props.country || "US"}</Text>
                                  </View>
                                 
                            </View>

                      </View>
    
    </>
  )
}