import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import CountryFlag from 'react-native-country-flag'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import Svg, { Path, TextPath } from 'react-native-svg'

export default function Participant({participant ,selectedParticipant, setSelectedParticipant, w , h ,index}) {
    const {user } = useGlobalContext()
    const { width, height } = useWindowDimensions();

  return (
    <TouchableOpacity
    onPress={ ()=> {setSelectedParticipant({...participant})}}
    // key ={index}
    style ={{
      height:width  * 0.18 ,
      width : width * 0.18,
    
      // width :  w,
      // height :  h
    }}
  
    className =" flex-col b g-white justify-center items-center">

       <View
          style={{
            height:width  * 0.18 ,
            width : width * 0.18,
            backgroundColor: 
            selectedParticipant && selectedParticipant._id === participant._id ? 'rgba(255, 0, 0, 0.5)':
            user._id === participant.user_id ?'rgba(0, 0, 0, 1)':'rgba(0, 0, 0, 1.0)',
          }}
       className="flex-col justify-center items-center b g-white rounded-3xl ">

          


          {/* <View
            className ="w- [100%] h- [40%] py- flex-row g-white rounde-t-xl borde-t-4 justify-center items-center"> */}
                

                <Image
                source={{uri:participant.profile_img}}
                className ="w-[40px] h-[40px] m- rounded-full"
                resizeMethod='fill'
                />

                 
          {/* </View> */}

          
        
      </View>

                {user._id === participant.user_id && (
                       <Image
                          source={icons.you}
                          className ="absolute right-0  w-5 h-5 m- rounded-full"
                          resizeMethod='fill'
                          /> 
                )}

                <View
                    className ="absolute top-1 left-1 -rotate-45 gap-1  flex-row justify-center items-center   ">

                              <Text 
                                  style ={{fontSize:9}}
                                  className="text-xl text-center p-0 font-black text-white"> 
                                      💙 
                              </Text>
                     
                              <Text 
                                  style ={{fontSize:7}}
                                  className="text-xl  font-black text-white"> 
                                  {participant.votes }
                              </Text>
                </View>

                <View
                  className ="absolute top-1 rotate-45  right-1 gap-1 flex-row justify-center items-center   ">
                    
                            <Text 
                                style ={{fontSize:7}}
                                className="text-xl text-ce nter stroke-slate-50 p-0 font-black text-white"> 
                                {index < 4 ? "TOP" :"RK"}
                            </Text>
               
                    
                            <Text 
                                style ={{fontSize:7}}
                                className="text-xl  font-black text-white"> 
                                {index }
                            </Text>
              </View>

              <View
                  className="absolute bottom-1 left-1 rotate-45 ga p-1 flex-row justify-center items-center">
                    < CountryFlag
                              isoCode={participant.country || "US"}
                              size={7}
                    />
                     {/* <Text style={ {
                              fontWeight:"800",
                              color: "white",
                              fontSize: 7,
                              fontWeight:900
                            }}>{ participant.country || "US"}</Text> */}
              </View>

              <View
                 className ="absolute bottom-1 righ t-50 -rota te-45 pl-4 gap- flex-row  b g-white rounded-xl justify-center items-center">
                {/* <View
                    className ="  flex-row g-white rounde-tr-xl  justify-center items-start "> */}
                       
                       
                          <Text   
                             style ={{fontSize:7}}
                             className="font-black text-xs   text-white ">
      
                              {participant.name.slice(0,8)}
                           
                          </Text>
                   

                      {/* <Text 
                      style ={{fontSize:6}}
                      className="text-xl font-black  text-white"> 
                        {participant.name.slice(0,6)}
                    </Text> */}
                {/* </View> */}
               
          </View>


  </TouchableOpacity>
  )
}