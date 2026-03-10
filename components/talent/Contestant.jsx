import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import CountryFlag from 'react-native-country-flag'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { getVideo, migrateToBackblaze } from '../../videoFiles'
import { getInition } from '../../helper'

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
        // await getVideo(contestant?.publicUrl).then(path =>  setContestantImg(path)      )
        setContestantImg( contestant.profile_img || "https://f005.backblazeb2.com/file/challengify-Images/avatar/avatar.png")
        // const imgProfile = await  migrateToBackblaze (contestant.profile_img , contestant.user_id,contestant.name)
        // setContestantImg(imgProfile)
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
                    backgroundColor: 
                        selectedContestant && selectedContestant._id === contestant._id ? '#F5C542':
                        user._id === contestant.user_id ?'rgba(0, 155, 0, 0.3)':"rgba(0, 0, 0, 0.3)",
                        height : f?  f : width  * 0.128,
                        width :f?  f : width * 0.12,
                        // backgroundColor: bgColor,
                  }}
          
                  className ="  flex-col bg- [#2f241a] justify-center items-center rounded-full lg">
                              <View
                                  style={{
                                    // height :f ?  f : width  * 0.1 ,
                                    // width : f ?  f : width * 0.1,
                                    // backgroundColor: 
                                    // bgColor,
                                  }}
                                  className="flex-col justify-center items-center b g-white rounde d-full w-[96%] h-[96%] ">
              
                                        <Image
                                        source={{uri:contestantImg || "https://f005.backblazeb2.com/file/challengify-Images/avatar/avatar.png"}}
                                        // source={icons.avatar}
                                        className ={f? "w-[100%] h-[100%] bg-black rounded-full":"w-[100%] h-[100%] m- rounded-full"}
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
              
                              {/* <View
                                  className ="absolute top-[2%] 1 left-[2px] 1 -rot ate-45 gap- 1  flex-row justify-center items-center   ">
                                            <Text 
                                                style ={{fontSize: f?6:8}}
                                                className=" text-center p-0 font-black text-white"> 
                                                     ❤️
                                            </Text>
                                  
                                            <Text 
                                                style ={{fontSize:f?5:7,
                                                  color:textColor
                                                }}
                                                className="  font-black text-white"> 
                                                {contestant.votes }
                                            </Text>
                              </View> */}

                              <View
                                className = "absolute top-0 rotat   right-0 1 gap- 1 flex-row justify-center items-center   ">
                                  
                                          <Text 
                                              style ={{fontSize:f? 5 :6,
                                                color:textColor
                                              }}
                                              className="  stroke-slate-50 p-0 font-black text-white"> 
                                              #
                                          </Text>
                            
                                  
                                          <Text 
                                              style ={{fontSize: f? 5 :6,
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
                              className ="absolute bottom-0  right-0 p-0">
                                
                                        <Text   
                                          style ={{fontSize:f?5 :7,
                                            color:textColor
                                          }}
                                          className="font-black  text-white ">
                    
                                            {getInition(contestant.name)}
                                        
                                        </Text>
                            </View>

                            <View
                                            className="absolute bottom-0 left-0  flex-row justify-center items-center">
                                              < CountryFlag
                                                        isoCode={contestant.country || "US"}
                                                        size={f?5:7}
                                              />
                            </View>
                </TouchableOpacity>
  )
}