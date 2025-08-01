import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MotiView, ScrollView } from 'moti'
import ShuffleLetters from '../custom/ShuffleLetters'
import { router } from 'expo-router'
import BlinkingHeader from '../custom/BlinkingHeader'
import CountryFlag from 'react-native-country-flag'
import { icons } from '../../constants'

export default function ContestantList({contestants , selectedIcon , selectedTalent,region ,regionIcon,setSelectedContestant,
    talentRoom, h ,w , top,left,right,bottom}) {
  return (
    <View
    style={{height:h,width:w,
        top:top,marginLeft:left,marginRight:right
    }}
    className = "g-[#051652] absolute py-2 px-2 gap-2 g-red-400 flex-col justify-start items-center"
    >
        <MotiView
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 100, type: 'timing', duration: 300 }}
                className="px-1 gap- w-[100%] flex-col justify-center items-center"
             >
                 <BlinkingHeader text={contestants.length} textSize={12} />
                 <ShuffleLetters text={ "Contestants"} textSize={9} />
                 
                 <View
                  className ="absolute top-0 left-0 flex-col justify-center items-center">
                   <Image
                    source={regionIcon}
                    className =" w-8 h-8"
                    />
                    <Text 
                       style={{fontSize:10}}
                       className="text-yellow-400 font-bold"> {region}</Text>
                 </View>
                 <View
                  className ="absolute top-0 right-0 flex-col gap-1 justify-start items-center">
                   <Image
                    source={selectedIcon}
                    className =" w-8 h-8"
                    />
                    <Text 
                       style={{fontSize:10}}
                       className="text-yellow-400 font-bold"> {selectedTalent}</Text>
                 </View>
        </MotiView>
        <TouchableOpacity
                       onPress={()=>{
                        router.navigate({ pathname: '/TalentContestantPlayMode',params: { 
                            talentRoom_id : talentRoom._id,
                            // edition_id : edition._id ,
                          } }) 
                       }}
                       className="py-1 px-6 gap-1 mb-1 flex-row justify-center rounded-xl  bg-[#07245d] items-center"
                       >
                      <Text 
                            style ={{fontSize:12}}
                            className="text-xl font-black -auto text-white"> 
                                PLAY
                    </Text> 
                    <Image
                       className="w-[25] h-[25] rounded-full "
                       source={icons.play}
                       resizeMethod='contain'
                           />
                     <Text 
                            style ={{fontSize:12}}
                            className="text-xl font-black -auto text-white"> 
                               ALL
                    </Text> 
         </TouchableOpacity>

        <ScrollView
            className="flex-1 w-[100%] g-white ">
            <MotiView
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 300, type: 'timing', duration: 600 }}
                className="flex- w-[100%] g-white py-1 gap-1 mb-  flex-col  justify-start items-center">
                        {contestants.map((contestant , index) => {
                                 return  (
                                    <TouchableOpacity
                                    key={index}
                                    onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:contestant.user_id} })}}
                                    className="w-[100%] p-1 bg-[#02213b] rounded-xl elevation-2xl flex-col justify-start items-center gap-1">
                                        <View
                                        className="flex-row w-[100%] p-1 justify-between items-start gap-">
                                                <View
                                                className="min-w-[30%] flex-row justify-start items-start gap-">
                                                    <Text 
                                                            style={{fontSize : 7}}
                                                            className="text-sm text-center font-bold text-gray-200">
                                                        <Text className="text-red-400 font-bold"> Votes  </Text>
                                                            {contestant.votes}
                                                        
                                                    </Text>
                                                </View>              

                                                <View
                                                className="min-w-[40%] flex-row justify-center items-start gap-1">
                                                    
                                                    < CountryFlag
                                                    isoCode={contestant.country || "US"}
                                                    size={9}   
                                                    />
                                                    <Image
                                                    className="w-[25] h-[25] rounded-full "
                                                    source={{uri:contestant.profile_img}}
                                                    resizeMethod='contain'
                                                    />
                                                    <Text style={ {
                                                        fontWeight:"800",
                                                        color: "white",
                                                        fontSize: 7,
                                                        fontWeight:900
                                                    }}>{ contestant.country || "US"}</Text>
                                                </View>

                                                <View
                                                className="min-w-[30%] flex-row justify-end items-start gap-">
                                                       <Text 
                                                        style={{fontSize : 8}}
                                                        className="text-sm text-center font-bold text-gray-200">
                                                        {index <3 ? "Top " : "RK# "} 
                                                           <Text className="text-yellow-400 font-bold"> {index+1}  </Text>
                                                       </Text>
                                                </View>
                                                
                                        </View>
                                        <View
                                        className="flex-row w-[100%] px-1 justify-between items-center gap-">
                                                 <TouchableOpacity
                                                 onPress={()=>{setSelectedContestant(contestant)}}
                                                  className="flex-row min-w-[30%] p-1 gap-1 g-black rounde-tr-full justify-start items-center gap-">
                                                          <Image
                                                            className="w-5 h-5 rounded-full "
                                                            source={icons.play}
                                                            resizeMethod='contain'
                                                            />
                                                         {/* <Text 
                                                         style={{fontSize:8}}
                                                         className="text-yellow-400 font-bold"> Play </Text> */}
                                                 </TouchableOpacity>

                                                  <View
                                                  className="min-w-[40%] flex-row justify-center items-center">
                                                        <Text
                                                            style={{fontSize:7}}
                                                            className="text-white 400 font-black">{contestant.name.slice(0,20)}  
                                                        </Text>
                                                  </View>

                                                  <TouchableOpacity
                                                  onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:contestant.user_id} })}}
                                                  className="flex-row min-w-[30%] p-1 gap-1 justify-end items-center gap-">
                                                          {/* <Text 
                                                           style={{fontSize:8}}
                                                           className="text-blue-400 font-bold"> Profile </Text> */}
                                                          <Image
                                                            className="w-4 h-4 rounded-full "
                                                            source={icons.profile}
                                                            resizeMethod='contain'
                                                            />             
                                                </TouchableOpacity>
                                        </View>

                                    </TouchableOpacity>

                                 )
                          })}
            </MotiView>
        </ScrollView>
       

        {/* <MotiView
         from={{ opacity: 0, translateY: 40 }}
         animate={{ opacity: 1, translateY: 0 }}
         transition={{ delay: 300, type: 'timing', duration: 600 }}
         className="px-1 gap-0 flex-col mt-auto justify-start items-center">
                <TouchableOpacity
                  className = "bg-[#031258] py-2 px-6">
                       <Text
                       className="text-white font-black text-md">
                           PLAY ALL
                       </Text>
                 </TouchableOpacity>
        </MotiView> */}
    </View>
  )
}