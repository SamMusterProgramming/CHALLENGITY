import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import CountryFlag from 'react-native-country-flag'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { getVideo, migrateToBackblaze } from '../../videoFiles'
import { getInition } from '../../helper'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

export default function Contestant({contestant , selectedContestant , setSelectedContestant ,talentRoom,
   participantTrackerId, regionIcon , selectedIcon ,index ,w,h , f}) {
  const {user} = useGlobalContext()
  const{width , height} = useWindowDimensions()
  const {contestantBgColor,setContestantBgColor} = useGlobalContext()
  const [contestantImg , setContestantImg] = useState(null)

  const bgColor = ( selectedContestant && selectedContestant._id === contestant._id) 
    || ( participantTrackerId && participantTrackerId === contestant._id) ? '#37a4cc':
   user._id === contestant.user_id ?"white":"white"
   const textColor =     
    ( selectedContestant && selectedContestant._id === contestant._id)    
   || ( participantTrackerId && participantTrackerId === contestant._id) ? 'white' : 'white'
    
   useEffect(() => {   
    const loadVideo = async () => {
      if(contestant.profile_img){   
        setContestantImg(contestant.profile_img || "https://f005.backblazeb2.com/file/challengify-Images/avatar/avatar.png")
     }
    }; 
    loadVideo();
  }, []);      

  return (    
    <TouchableOpacity
                  onPress={ ()=> {setSelectedContestant({...contestant})}}
                  key ={index}
                  style ={{
                    // borderColor : selectedContestant && selectedContestant._id === contestant._id ? "green" : "transparent" ,
                   
                        height : f?  f + f * 0.2 : width  * 0.120,
                        width :f?  f + f * 0.2 : width * 0.120,
                        // backgroundColor: bgColor,
                  }}
          
                  className ="  flex-col bg- [#2f241a] p- 1 justify-center items-center rounded-full lg">
                              <View
                                  style={{
                                    backgroundColor: 
                                    selectedContestant && selectedContestant._id === contestant._id ? 'lightblue':
                                    user._id === contestant.user_id ?'rgba(0, 155, 0, 0.3)':"rgba(0, 0, 0, 0.3)",
                                    height :f ?  f : width  * 0.1 ,
                                    width : f ?  f : width * 0.1,
                                   
                                  }}
                                  className="flex-col justify-center items-center  b g-white rounded-full  ">
              
                                    <Image
                                        source={{uri:contestant.profile_img || "https://f005.backblazeb2.com/file/challengify-Images/avatar/avatar.png"}}
                                        className ={ "w-[94%] h-[94%] bg-black rounded-full"}
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
                                className = "absolute top-0 rounded-full bg-black p- 1 right-0  gap- 1 flex-row justify-center items-center   ">
                                  
                                          <Text 
                                              style ={{fontSize:f? 6 :7,
                                                color:textColor
                                              }}
                                              className="  stroke-slate-50 p-0 font-black text-white"> 
                                              #
                                          </Text>
                            
                                  
                                          <Text 
                                              style ={{fontSize: f? 6 :7,
                                                color:textColor
                                              }}
                                              className=" font-black text-white"> 
                                              {contestant.rank }
                                          </Text>
                            </View>
              
                            {/* <View
                                className="absolute bottom-4 left-0 rota te-90 ga p- 1 flex-row justify-center items-center">
                                  < CountryFlag
                                            isoCode={contestant.country || "US"}
                                            size={f?6:8}
                                  />
                            </View> */}
              
                            <View
                              className ="absolute bottom-0 bg-black p- 1 right-0 rounded-full">
                                
                                        <Text   
                                          style ={{fontSize:f? 6 :7,
                                            color:textColor
                                          }}
                                          className="font-black  text-white ">
                    
                                            {getInition(contestant.name)}
                                        
                                        </Text>
                            </View>

                            <View
                                            className="absolute bottom-0 left-0 bg-black p- 1 rounded-full flex-row justify-center items-center">
                                              < CountryFlag
                                                        isoCode={contestant.country || "US"}
                                                        size={f?6:7}
                                              />
                            </View>
                            {  selectedContestant && selectedContestant._id === contestant._id && (
                                       <View
                                       className="absolute top-0 left-[-3] b g-black p- 1 rounded-full flex-row justify-center items-center">
                                         <MaterialCommunityIcons name="arrow-right"  size={width/35} color="lightblue" />
                                      </View>
                            )}
                        
                          
                </TouchableOpacity>
  )
}