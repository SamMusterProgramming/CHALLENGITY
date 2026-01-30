import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import CountryFlag from 'react-native-country-flag'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import Svg, { Path, TextPath } from 'react-native-svg'
import { getVideo } from '../../videoFiles'

export default function Participant({participant ,selectedParticipant, setSelectedParticipant,participantTrackerId, w , h , f,index}) {
    const {user ,contestantBgColor} = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [participantImg , setParticipantImg] = useState(null)
    const bgColor =  ( selectedParticipant && selectedParticipant._id === participant._id) 
    || ( participantTrackerId && participantTrackerId === participant._id) ? 'white':
   user._id === participant.user_id ?'#2f241a':contestantBgColor
   const textColor =  ( selectedParticipant && selectedParticipant._id === participant._id) 
   || ( participantTrackerId && participantTrackerId === participant._id) ? 'black':'white'

  useEffect(() => {
    const loadVideo = async () => {
          await getVideo(participant.profile_img).then(path =>{
              setParticipantImg(path)
          });
    };
    loadVideo();
  }, []);
  return (
    <TouchableOpacity
    onPress={ ()=> {setSelectedParticipant({...participant})}}
    style ={{
      height : f?  f : width  * 0.18 ,
      width : f?  f : width * 0.18,
      backgroundColor: 
      bgColor,
    }}
    className =" flex-col b g-white justify-center items-center rounded-md">
                <View
                    style={{
                      // height : f?  f : width  * 0.18 ,
                      // width : f?  f : width * 0.18,
                      backgroundColor: 
                      "black",
                    }}
                    className="flex-col justify-center items-center b g-white rounded-full ">

                          <Image
                          source={{uri:participantImg}}
                          // source={{uri:participant.profile_img}}
                          // source={icons.avatar}
                          className ={f? "w-[20px] h-[20px] m- rounded-full":"w-[40px] h-[40px] m- rounded-full"}
                          resizeMethod='fill'
                          />  
                </View>

                {user._id === participant.user_id && (
                       <Image
                          source={icons.you}
                          className ="absolute t right-0 bottom-4 w-4 h-4 "
                          resizeMethod='fill'
                          /> 
                )}

                <View
                    className ="absolute top-1 left-1 -rotat e-45 gap- 1  flex-row justify-start items-start   ">

                              <Text 
                                  style ={{fontSize:f? 6 :8}}
                                  className=" text-center  p-0 font-black text-white"> 
                                      💙 
                              </Text>
                     
                              <Text 
                                  style ={{fontSize: f? 5 :7,
                                    color:textColor
                                  }}
                                  className=" p-0 font-black text-white"> 
                                  {participant.votes }
                              </Text>
                </View>

                <View
                  className ="absolute top-1  right-1  gap- 1 flex-row justify-start items-start">
                    
                            <Text 
                                style ={{fontSize:f? 5 : 7,
                                  color:textColor
                                }}
                                className="  p-0  font-black text-white"> 
                                {participant.rank < 4 ? "TP" :"RK"}
                            </Text>
               
                    
                            <Text 
                                style ={{fontSize:f?5:7,
                                  color:textColor
                                }}
                                className=" p-0    font-black text-white"> 
                                {participant.rank }
                            </Text>
              </View>

              <View
                  className="absolute bott om-1 left-0 bottom-4  ga  flex-row justify-center items-center">
                    < CountryFlag
                              isoCode={participant.country || "US"}
                              size={f?6:8}
                    />
              </View>

              <View
                 className ="absolute bottom-[0.8px]  gap- flex-row  b g-white rounde d-xl justify-center items-center">
                  
                          <Text   
                             style ={{fontSize:f?6:7,
                              color:textColor
                             }}
                             className="font-black  p-0  text-white ">
      
                              {participant.name.slice(0,8)}
                           
                          </Text>
              </View>

  </TouchableOpacity>
  )
}