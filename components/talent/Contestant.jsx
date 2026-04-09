import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import CountryFlag from 'react-native-country-flag'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { getVideo, migrateToBackblaze } from '../../videoFiles'
import { getInition } from '../../helper'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

export default function Contestant({contestant , selectedContestant , setSelectedContestant ,talentRoom,left,
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
   || ( participantTrackerId && participantTrackerId === contestant._id) ? 'black' : 'white'
    
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
                  onPress={ ()=> { selectedContestant && selectedContestant._id !== contestant._id && setSelectedContestant({...contestant})}}
                  key ={index}
                  style ={{
                    // borderColor : selectedContestant && selectedContestant._id === contestant._id ? "green" : "transparent" ,
                    backgroundColor: 
                    selectedContestant && selectedContestant._id === contestant._id ? 'white':
                    user._id === contestant.user_id ?'transparent':"transparent",
                        height : f?  f + f * 0.2 : h  + 2 ,
                        width :f?  f + f * 0.2 : h,
                        // backgroundColor: bgColor,
                  }}
          
                  className ="  flex-col bg- [#2f241a] rounded-lg  justify-start items-center ">
                              <View
                              className ="">
                                
                                        <Text   
                                          style ={{fontSize:f? 6 :width/65,
                                            color:textColor
                                          }}
                                          className="font-black  text-white ">
                    
                                            {contestant.rank < 4 ? "TOP " + contestant.rank : "# " + contestant.rank}
                                        
                                        </Text>
                            </View>
                              <View
                                  style={{
                                  
                                    // height :f ?  f : h + 2 ,
                                    // width : f ?  f : h,
                                   
                                  }}
                                  className="flex-col h- [100%] w-[100%] flex-1 rounded- lg pt-1 px-1 justify-start items-center    ">
              
                                    <Image
                                        source={{uri:contestant.profile_img || "https://f005.backblazeb2.com/file/challengify-Images/avatar/avatar.png"}}
                                        className ={ "w-[100%] h-[70%]  b g-black rounded-sm"}
                                        resizeMethod='cover'
                                        cachePolicy="memory-disk"
                                        /> 
                                       
                              </View>
              
                              {user._id === contestant.user_id && (
                                    <Image
                                        source={icons.you}
                                        className ="absolute right-0  w-4 h-4 bottom-4 rounded-full"
                                        resizeMethod='fill'
                                        
                                        /> 
                              )}
              
                          

                              {/* <View
                                className = "absolute top-0 round ed-full bg-black p-[2px] right-0  gap- 1 flex-row justify-center items-center   ">
                                  
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
                            </View> */}
              
                            {/* <View
                                className="absolute bottom-4 left-0 rota te-90 ga p- 1 flex-row justify-center items-center">
                                  < CountryFlag
                                            isoCode={contestant.country || "US"}
                                            size={f?6:8}
                                  />
                            </View> */}
              
                            <View
                              className ="absolute bottom-0 [1] b g-black p-0 [1] right-1 round ed-bl-lg">
                                
                                        <Text   
                                          style ={{fontSize:f? 7 :width/65,
                                            color:textColor
                                          }}
                                          className="font-black  text-white ">
                    
                                            {getInition(contestant.name)}
                                        
                                        </Text>
                            </View>

                            <View
                                            className="absolute bottom-0 [1] left-1 [1] b g-black p-[2px] rounde d-tr-lg flex-row justify-center items-center">
                                              < CountryFlag
                                                        isoCode={contestant.country || "US"}
                                                        size={f?6:width/65}
                                              />
                            </View>
                            {/* {  selectedContestant && selectedContestant._id === contestant._id && left && (
                                       <View
                                       className="absolute top-0 right-[-25] b g-black p- 1 rounded-full flex-row justify-center items-center">
                                         <MaterialCommunityIcons name="arrow-left"  size={width/20} color="white" />
                                      </View>
                            )}
                            {  selectedContestant && selectedContestant._id === contestant._id &&  (
                                       <View
                                       className="absolute top-0 left-[-25] b g-black p- 1 rounded-full flex-row justify-center items-center">
                                         <MaterialCommunityIcons name="arrow-right"  size={width/20} color="white" />
                                      </View>
                            )} */}
                        
                          
                </TouchableOpacity>
  )
}