import { View, Text } from 'react-native'
import React from 'react'
import CountryFlag from 'react-native-country-flag'

export default function InfosProfile(props) {
  return (
    <>
                    <View
                        className="w-[30%] h-[100%] flex-col gap-4 justify-end items-center"
                        >
                           <Text 
                                   style={{fontSize:14}}
                                   className="text-gray-200 font-bold ">
                                    City  
                                 </Text>
                                 <Text
                                    className="font-black"
                                    style={{
                                      fontSize:13,
                                      color:props.color ?"black" : "white"
                                    }}
                                  >
                                    {' '}{props.city}
                           </Text>

                    </View>

                    <View
                        className="w-[40%] h-[100%] flex-col gap-2 justify-end items-center">
                                <Text style={ {
                                            fontWeight:"800",
                                            color:props.color ?"black" : "white",
                                            fontSize: 18,
                                          }}>{props.country || "US"}
                                </Text>
                                < CountryFlag
                                    isoCode={props.country}
                                    size={40}
                                        />
                    </View>


                    <View
                        className="w-[30%] h-[100%] flex-col justify-end gap-4  items-center "
                        >
                          <Text 
                                   style={{fontSize:14}}
                                   className="text-gray-200 font-bold ">
                                    State 
                                 </Text>
                                 <Text
                                    className="font-black"
                                    style={{
                                      fontSize:13,
                                      color:props.color ?"black" : "white",
                                    }}
                                  >
                                    {' '}{props.state}
                                 </Text>
                   </View>
    
    </>
  )
}