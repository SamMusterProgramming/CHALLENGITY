import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform,  ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { memo, PureComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { images } from '../../constants'
import RNPickerSelect from 'react-native-picker-select';
import { getTopChallenges, getUserChallenges, getUserParticipateChallenges } from '../../apiCalls';
import {icons} from '../../constants'
import { TextInput } from 'react-native';
import Challenge from '../../components/challenge/Challenge';
import ParticipantPost from '../../components/challenge/ParticipantPost';
import { ResizeMode, Video } from 'expo-av';
import { Camera } from 'expo-camera';
import { router, useFocusEffect, useRouter } from 'expo-router';
import { getInition } from '../../helper';
import HeadLineChallenges from '../../components/headLights/HeadLineChallenges';
import SelectButton from '../../components/custom/SelectButton';
import { isLoaded } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_100Thin, Inter_900Black } from '@expo-google-fonts/inter';
import Heart from '../../components/custom/Heart';
import HeadLineChallengeList from '../../components/headLights/HeadLineChallengeList';
import FriendChallengeBox from '../../components/challenge/FriendChallengeBox';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ChallengifyHeader from '../../components/custom/ChallengifyHeader';
import TalentHomePage from '../../components/talent/TalentHomePage';

export default function Home() {
  const insets = useSafeAreaInsets();
  const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [selectedPage , setSelectedPage] = useState(null)



  return (

         <View
            style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
           className=" flex-1  flex-col justify-start items-center py-2 bg-[#0f1010]">
                 
                 <View
                  style={{fontSize:11}}
                  className=" w-[100%] h-[7%] b-[#0a144b] bg-black rounde-bl-3xl rounde-br-3xl flex-row justify-center items-center   borde-t-black">
                     
                      <TouchableOpacity 
                       onPress={()=> {router.navigate("/UserChallenges")}}
                         className="justify-center items-center rounded-xl w-[20%]  h-[100%]  borde-[#0a144b] b-[#0a144b] flex-col">
                                 <Image
                                     className="w-[35px] h-[35px]"
                                     source={icons.challenge}
                                     resizeMethod='cover' />
                      </TouchableOpacity>
               
                      <View
                                        className="flex-row justify-center rounded-t-3xl border- bg-white items-center gap-1 w-[60%] h-[100%]">
                                              
                                              <View
                                              className="flex-row justify-start rounded-xl items-center w-[20%] h-[100%] ">
                                                  <Image
                                                  className="w-[100%] h-[80%]"
                                                  source={icons.home}
                                                  resizeMethod='contain' />
                                                
                                              </View>
                                              <View
                                              className="flex-col justify-end  items-center w-[60%] h-[100%] ">
                                                    <View
                                                      className="flex-row justify-center  items-end w-[100%] h-[30%] ">
                                                          <Text 
                                                               style={{fontSize:width/45}}
                                                               className="font-bold text-sm text-black">
                                                                   Push your limits with
                                                          </Text> 
                                                      
                                                    </View>
                                                    <View
                                                      className="flex-row justify-center mt- items-center w-[100%] h-[60%] ">
                                                          <Text 
                                                               style={{fontSize:width/29}}
                                                               className="font-bold text-sm text-[#1071e0]">
                                                                  Challengify
                                                          </Text> 
                                                      
                                                    </View>
                                              </View>
                       </View>
                       <TouchableOpacity 
                       onPress={()=> {router.navigate("/SearchFriend")}}
                         className="justify-center items-center rounded-xl w-[20%]  h-[100%]  borde-[#0a144b] b-[#0a144b] flex-col">
                   
                                 <Image
                                     className="w-[35px] h-[35px]"
                                     source={icons.search_people}
                                     resizeMethod='cover' />
                       </TouchableOpacity>
          </View>

          
        
       
        <View className="  w-[100%] h-[7%] flex-row px- gap- px- borde-4 bg-[#fafeff] rounded-tl-3xl  rounded-tr-3xl items-end  bg[#0a144b] justify-evenly"
             style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
             <TouchableOpacity 
                       onPress={()=> {router.navigate("/UserChallenges")}}
                         className="justify-center items-center  rounded-xl rounded-br-xl w-[15%]  h-[85%] bg-[#2e2f35] flex-col">
                                 <Image
                                     className="w-[35px] h-[35px] "
                                     source={icons.watchlist}
                                     resizeMethod='cover' />
              </TouchableOpacity>

             <View
                className="justify-end gap-3 px-  w-[50%] items-center  h-[100%] flex-col rounded-tl-3xl rounded-tr-3xl bg-[#e2e5e] ">
                  

                  <View
                      className="justify-center  px-6 gap-4 w-[100%] items-center h-[85%] flex-row rounded-tl-lg bg-[#03033d] rounded-tr-lg  ">
                            <View className="justify-center items-center min-h-[100%] flex-row ">
                                  <Image 
                                    style={{width:width<= 330? 30:35 ,height:width <= 330? 30:35}}
                                    className="w-[40px] h-[40px] rounded-full "
                                    source={{uri : user.profile_img? user.profile_img  : avatar}}
                                  />
                            </View>
                            <View className="justify-center gap- -auto items-start h-[100%] flex-col ">
                                    <Text className="font-pmedium  text-sm text-white">
                                        <Text 
                                        style={{fontSize:width<= 330? 8:10}}
                                        className="font-black text-sm text-white">
                                            {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                                        </Text> 
                                    </Text>
                                    <Text 
                                        style={{fontSize:width<= 330? 8:10}}
                                        className=" text-sm text-blue-400 font-black">
                                        {getInition(user.name)}Challenger
                                    </Text>
                            </View>
                  </View>          
                  </View>
                  <TouchableOpacity 
                       onPress={()=> {router.navigate("/UserChallenges")}}
                         className="justify-center items-center  rounded-xl rounded-br-xl w-[15%]  h-[90%] bg-[#1d35b9] flex-col">
                        {/* <View className="justify-center items-center  rounded-tl-xl rounded-tr-xl w-[100%] rounded-lg min-h-[100%] bg-[#f5f4f6] flex-col">
                            <Heart title="" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.search_people} link="/SearchFriend"/>
                        </View> */}
                                 <Image
                                     className="w-[35px] h-[35px] "
                                     source={icons.newChallenge}
                                     resizeMethod='cover' />
                  </TouchableOpacity>

            </View>

            <View
             className="w-full h-[7%] px-2 border-2 border-[#fefefe] bg-[#ffffff]
                flex-row justify-center items-center">
                 <View className=" w-[100%] h-[80%] px-4 borde-gray-200 borde-2 bg-[#c7c1c1]  rounded-lg rounded-tr-lg
                     flex-row justify-center items-center">
                    <TextInput
                        className=" text-gray-600 w-[100%]   h-[100%] px-3
                        font-bold text-sm"
                        placeholder="Search for a challenge "
                        placeholderTextColor="#7b7b8b"
                          />
                      <TouchableOpacity onPress={()=> {}}>
                          <Image className ="w-6 h-6"
                          resizeMode='contain'
                          source={icons.search} />
                      </TouchableOpacity>                
                 </View >
            </View>

            {!selectedPage ? (
                     <View
                     className="w-full h-[79%] p- borde-2 bord-[#6a7c83] bg-[#fafbfb]
                        flex-col justify-start items-center">
                            

                            <View
                                    className="w-[100%] h-[33%] py-4 borde-2 rounded-xl bord-[#6a7c83] g-[#cae4f5]
                                    flex-row justify-evenly items-center">
                                           <TouchableOpacity
                                            className="w-[40%] h-[100%] p-4  gap-4 rounded-lg  bord-[#6a7c83] bg-[#9fcdf6]
                                            flex-row justify-end items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[40%] h-[60%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[50%] h-[100%] g-white roun-full"
                                                      source={icons.challenge_competition}
                                                      resizeMethod='contain'
                                                    />
                                             <View
                                               className="p-4 absolute rounded-tr-xl bottom-0 left-0 bg-white">
                                                <Text 
                                                        style={{fontSize:width/37,
                                                        color:'black'}}
                                                    className="  font-black text-sm text-white">
                                                        Challenges
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
                                        
                                         <TouchableOpacity
                                         onPress={()=> setSelectedPage("talent")}
                                            className="w-[40%] h-[100%] p-4  gap-4 rounded-lg bord-[#6a7c83] bg-[#ec0909]
                                             flex-row justify-end items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[40%] h-[70%] roun-full"
                                                      source={icons.talent}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[50%] h-[100%] roun-full"
                                                      source={icons.talent}
                                                      resizeMethod='contain'
                                                    />
                                                <View
                                                  className="p-4 absolute rounded-tr-xl bottom-0 left-0 bg-white">
                                                    <Text 
                                                        style={{fontSize:width/37,
                                                        color:"black"}}
                                                        className=" font-black text-sm text-black">
                                                        Talent
                                                        
                                                    </Text>  
                                                </View>
                                         </TouchableOpacity>
                                    </View>
        
                            <View
                               className="w-[100%] h-[34%] p-2 borde-2 border-t-4 border-b-4 rounded-xl bord-[#6a7c83] g-[#0a0b0b]
                               flex-col justify-center items-end">
                                  <ChallengifyHeader /> 
                            </View>

                            <View
                                    className="w-[100%] h-[33%] py-4 borde-2 rounded-xl bord-[#6a7c83] g-[#0a0b0b]
                                    flex-row justify-evenly items-start">
                                           <TouchableOpacity
                                            className="w-[40%] h-[100%] p-  gap-4 rounded-lg bord-[#6a7c83] bg-[#115dec]
                                            flex-row justify-center items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[40%] h-[70%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='fill'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[50%] h-[100%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='contain'
                                                    />
                                                <View
                                                  className="p-4 absolute rounded-tr-xl bottom-0 left-0 bg-white">
                                                    <Text 
                                                        style={{fontSize:width/37,
                                                        color:"black"}}
                                                        className=" font-black text-sm text-black">
                                                        Guiness  
                                                    </Text>  
                                                </View>
                                         </TouchableOpacity>
        
                                         <TouchableOpacity
                                            className="w-[40%] h-[100%] p-  gap-4 rounded-lg  bord-[#6a7c83] bg-[#9fcdf6]
                                            flex-row justify-end items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[40%] h-[60%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[50%] h-[100%] roun-full"
                                                      source={icons.challenge_competition}
                                                      resizeMethod='contain'
                                                    />
                                             <View
                                               className="p-4 absolute rounded-tr-xl bottom-0 left-0 bg-white">
                                                <Text 
                                                        style={{fontSize:width/37,
                                                        color:'black'}}
                                                    className="  font-black text-sm text-white">
                                                        Challenges
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
        
        
        
                                    </View>

                            {/* <View
                               className="w-[100%] h-[65%] py- borde-2 rounded-xl bord-[#6a7c83] g-[#090909]
                               flex-col justify-center items-center">
        
                                   <View
                                    className="w-[100%] h-[50%] py-2 borde-2 rounded-xl bord-[#6a7c83] g-[#000000]
                                    flex-row justify-evenly items-center">
                                         <TouchableOpacity
                                            className="w-[46%] h-[100%] p-  gap-4 rounded-3xl bord-[#6a7c83] bg-[#115dec]
                                            flex-row justify-center items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[40%] h-[70%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='fill'
                                                    />
                                                <Image
                                                  
                                                      className ="w-[50%] h-[100%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='contain'
                                                    />
                                                <View
                                                  className="p-4 absolute rounded-tr-xl bottom-0 left-0 bg-white">
                                                    <Text 
                                                        style={{fontSize:width/37,
                                                        color:"black"}}
                                                        className=" font-black text-sm text-black">
                                                        Guiness  
                                                    </Text>  
                                                </View>
                                         </TouchableOpacity>
                                         <TouchableOpacity
                                         onPress={()=> setSelectedPage("talent")}
                                            className="w-[46%] h-[100%] p-2  gap-4 rounded-3xl bord-[#6a7c83] bg-[#ec0909]
                                             flex-row justify-end items-start">
                                                <Image
                                          
                                                      className ="w-[40%] h-[70%] roun-full"
                                                      source={icons.talent}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                       
                                                      className ="w-[50%] h-[100%] roun-full"
                                                      source={icons.talent}
                                                      resizeMethod='contain'
                                                    />
                                                <View
                                                  className="p-4 absolute rounded-tr-xl bottom-0 left-0 bg-white">
                                                    <Text 
                                                        style={{fontSize:width/37,
                                                        color:"black"}}
                                                        className=" font-black text-sm text-black">
                                                        Talent
                                                        
                                                    </Text>  
                                                </View>
                                         </TouchableOpacity>
                                    </View>
        
                                    <View
                                    className="w-[100%] h-[50%] py-2 borde-2 rounded-xl bord-[#6a7c83] g-[#0a0b0b]
                                    flex-row justify-evenly items-start">
                                          <TouchableOpacity
                                            className="w-[46%] h-[100%] p-  gap-4 rounded-xl  bord-[#6a7c83] bg-[#9fcdf6]
                                            flex-row justify-end items-start">
                                                <Image
                               
                                                      className ="w-[40%] h-[60%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                     
                                                      className ="w-[50%] h-[100%] roun-full"
                                                      source={icons.challenge_competition}
                                                      resizeMethod='contain'
                                                    />
                                             <View
                                               className="p-4 absolute rounded-tr-xl bottom-0 left-0 bg-white">
                                                <Text 
                                                        style={{fontSize:width/37,
                                                        color:'black'}}
                                                    className="  font-black text-sm text-white">
                                                        Challenges
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
        
                                         <TouchableOpacity
                                            className="w-[46%] h-[100%] p-  gap-4 rounded-xl  bord-[#6a7c83] bg-[#9fcdf6]
                                            flex-row justify-end items-start">
                                                <Image
                                                 
                                                      className ="w-[40%] h-[60%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                           
                                                      className ="w-[50%] h-[100%] roun-full"
                                                      source={icons.challenge_competition}
                                                      resizeMethod='contain'
                                                    />
                                             <View
                                               className="p-4 absolute rounded-tr-xl bottom-0 left-0 bg-white">
                                                <Text 
                                                        style={{fontSize:width/37,
                                                        color:'black'}}
                                                    className="  font-black text-sm text-white">
                                                        Challenges
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
        
        
        
                                    </View>
        
                          </View> */}
                    </View>
        
            ) : (
                <>
               {selectedPage == "talent" &&  (
                   <TalentHomePage setSelectedPage={setSelectedPage} />
                 )}
               </>
            )}

          

                 
          
 
      </View>

  )
}