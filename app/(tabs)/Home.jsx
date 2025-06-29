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
import { MotiView } from 'moti';

export default function Home() {
  const insets = useSafeAreaInsets();
  const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [selectedPage , setSelectedPage] = useState(null)

  useFocusEffect(
    useCallback(() => {
        // setDisplayData(trendingChallenges.slice(0,2) )
        // if(trendingChallenges.length > 0){
        //   const friends = userFriendData.friends;
        
        //   let challenges = []
    
        //   challenges = trendingChallenges.filter(challenge => 
        //     (friends.find(friend => (friend.sender_id == challenge.origin_id) && challenge.privacy == "Public")
        //     || (friends.find(friend => (friend.sender_id == challenge.origin_id))&& challenge.privacy == "Private"  
        //     && challenge.audience !== "Strict" && !challenge.invited_friends.find(friend => friend.sender_id == user._id))
    
        //    ))     
    
        //   challenges.length > 0 && setFriendsChallengesList({challenges:challenges})
        //               }
        return () => {
            console.log("leaving this page")
            setSelectedPage(null)
          // setFriendsChallengesList(null)
          // flatListRef.current = null ;
        };
    }, [])
);

  return (

         <View
            style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
           className=" flex-1  flex-col justify-start items-center py- bg-[#0f1010]">


                {/* <View className="  w-[80%] h-[7%] flex-row px- gap- px- border-b-2 border-white g-[#04253f] rounded-tl-3xl  rounded-tr-3xl items-end  bg[#0a144b] justify-evenly"
                  style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
          
                    <View
                        className="justify-end gap-3 px-  w[57%] items-center  h-[100%] flex-col rounded-tl-3xl rounded-tr-3xl bg-[#e2e5e] ">
                        
                        <View
                            className="justify-center  px-12 gap-4 -[100%] items-center h-[100%] flex-row rounded-t-full bg-[#fefefe] rounde-tr-3xl  ">
                                    <View className="justify-center items-center min-h-[100%] flex-row ">
                                        <Image 
                                            style={{width:width<= 330? 30:35 ,height:width <= 330? 30:35}}
                                            className="w-[40px] h-[40px] rounded-full "
                                            source={{uri : user.profile_img? user.profile_img  : avatar}}
                                        />
                                    </View>
                                    <View className="justify-center gap- -auto items-start h-[100%] flex-col ">
                                            <Text className="font-pmedium  text-sm text-black">
                                                <Text 
                                                style={{fontSize:width<= 330? 8:10}}
                                                className="font-black text-sm text-black">
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
                  
                </View> */}
                 
                 <View
                  style={{fontSize:11}}
                  className=" w-[100%] h-[7%] b-[#0a144b] px-2 bg-black borde-t-4 borde-b-4 border-white rounde-bl-3xl  rounde-br-3xl flex-row justify-between items-center   borde-t-black">
                     
               
                      <View
                                        className="flex-row justify-start rounded-t-3xl border- g-white items-center gap-1 w-[50%] h-[100%]">
                                              
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
                                                               style={{fontSize:width/40}}
                                                               className="font-bold text-sm text-white">
                                                                   Push your limits with
                                                          </Text> 
                                                      
                                                    </View>
                                                    <View
                                                      className="flex-row justify-center mt- items-center w-[100%] h-[60%] ">
                                                          <Text 
                                                               style={{fontSize:width/29}}
                                                               className="font-black text-sm text-[#317dd4]">
                                                                  Challengify
                                                          </Text> 
                                                      
                                                    </View>
                                              </View>
                       </View>
                       <TouchableOpacity 
                       onPress={()=> {router.navigate("/SearchFriend")}}
                         className="justify-center items-center rounded-full p-1 -[100%] border-  bg-[#2039c4] g-[#fcfdff] flex-col">
                   
                                 <Image
                                     className="w-[30px] h-[30px] rounded-full bg-[#2039c4] "
                                     source={icons.newChallenge}
                                     resizeMethod='cover' />
                       </TouchableOpacity>
                       <TouchableOpacity 
                       onPress={()=> {router.navigate("/SearchFriend")}}
                         className="justify-center items-center rounded-full p-1   borde-[#0a144b] bg-[#2039c4]  flex-col">
                   
                                 <Image
                                     className="w-[30px] h-[30px] rounded-full bg-black"
                                     source={icons.watchlist}
                                     resizeMethod='cover' />
                       </TouchableOpacity>

                      <TouchableOpacity 
                       onPress={()=> {router.navigate("/UserChallenges")}}
                         className="justify-center items-center  p-1 rounded-full  borde-[#0a144b] bg-[#d5daf6] flex-col">
                                 <Image
                                     className="w-[30px]  h-[30px]"
                                     source={icons.notification}
                                     resizeMethod='cover' />
                      </TouchableOpacity>
                       <TouchableOpacity 
                       onPress={()=> {router.navigate("/SearchFriend")}}
                         className="justify-center items-center rounded-full p-1   borde-[#0a144b] bg-[#c0c2c9] flex-col">
                   
                                 <Image
                                     className="w-[30px] h-[30px]"
                                     source={icons.search_people}
                                     resizeMethod='cover' />
                       </TouchableOpacity>
          </View>

          
        
          <View className="  w-[100%] h-[7%] flex-row px- gap- px- borde-b-2 border-[#052d40] g-[#04253f] rounded-tl-xl  rounded-tr-xl items-end  bg[#0a144b] justify-evenly"
                  style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
          
                    <View
                        className="justify-end gap-3 px-  w-[100%] items-center  h-[100%] flex-col rounded-t-3xl bg-[#052d40] ">
                        
                        <View
                            className="justify-center  px-12 gap-4 -[100%] items-center h-[100%] flex-row  g-[#fefefe] rounde-tr-3xl  ">
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
                  
                </View>
       

    
            <View
             className="w-full h-[10%]  px- borde-2 order-[#fefefe]  border-l-[10px] border-r-[10px] border-[#052d40] g-[#04253f]
                flex-row justify-center items-center">
                 <View className=" w-[75%] h-[60%] px-4 borde-gray-200 borde-2 bg-[#fffcfc]   rounded-md
                     flex-row justify-center items-center">
                    <TextInput
                        className=" text-gray-700 w-[100%]   h-[100%] px-3
                        font-bold text-sm"
                        placeholder="Search for a challenge "
                        placeholderTextColor="black"
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
                    
                     className="w-full h-[76%] pb-2 -auto border-r-[10px] border-l-[10px] border-b-[10px] rounde-xl border-[#052d40] 
                        flex-col justify-center items-center">
                            
                           
                            <View
                            
                                    className="w-[95%] h-[25%] pb-2 borde-l-[20px] rounde-t-xl g-[#423636] borde-[#2a2e2e] g-[#cae4f5]
                                    flex-row justify-center gap-2 items-center">
                                           <TouchableOpacity
                                            className="w-[40%] h-[100%] p-4  gap-4 rounded-lg borde-2 borde-[#000000] bg-[#193842]
                                            flex-row justify-end items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[30%] h-[40%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[60%] h-[100%] g-white roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                             <View
                                               className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-black">
                                                <Text 
                                                        style={{fontSize:width/42,
                                                        color:'white'}}
                                                    className="  font-black text-sm text-white">
                                                        Challenges
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
                                        
                                         <TouchableOpacity
                                         onPress={()=> setSelectedPage("talent")}
                                            className="w-[40%] h-[100%] p-4  gap-4 elevation-xl rounded-lg bord-[#6a7c83] bg-[#04263e]
                                             flex-row justify-end items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[30%] h-[40%] roun-full"
                                                      source={icons.talent}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[60%] h-[90%] roun-full"
                                                      source={icons.talent}
                                                      resizeMethod='cover'
                                                    />
                                                <View
                                                  className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-black">
                                                    <Text 
                                                        style={{fontSize:width/42,
                                                        color:"white"}}
                                                        className=" font-black text-sm text-black">
                                                        Talent
                                                        
                                                    </Text>  
                                                </View>
                                         </TouchableOpacity>
                            </View>
        
                            {/* <View
                                className="w-[100%] h-[34%] p-2 borde-2 border-t-4 border-b-4 rounded-xl bord-[#6a7c83] g-[#0a0b0b]
                               flex-col justify-center items-end">
                                  <ChallengifyHeader /> 
                            </View> */}

                            <View
                                    className="w-[95%] h-[25%] pb-2 borde-2 rounded-b-xl g-[#423636] bord-[#6a7c83] g-[#0a0b0b]
                                    flex-row justify-center gap-2 items-start">
                                           <TouchableOpacity
                                            className="w-[40%] h-[100%] p-  gap-4 rounded-lg bord-[#6a7c83] bg-[#1b2435]
                                            flex-row justify-center items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[30%] h-[40%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='fill'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[50%] h-[80%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='contain'
                                                    />
                                                <View
                                                  className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-black">
                                                    <Text 
                                                        style={{fontSize:width/42,
                                                        color:"white"}}
                                                        className=" font-black text-sm text-black">
                                                        Guiness  
                                                    </Text>  
                                                </View>
                                         </TouchableOpacity>
        
                                         <TouchableOpacity
                                            className="w-[40%] h-[100%] p-4  gap-4 rounded-lg  bord-[#6a7c83] bg-[#13222f]
                                            flex-row justify-end items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[30%] h-[40%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[60%] h-[100%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                             <View
                                               className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-black">
                                                <Text 
                                                        style={{fontSize:width/42,
                                                        color:'white'}}
                                                    className="  font-black text-sm text-white">
                                                        Challenges
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
        
        
        
                                    </View>

                                    <View
                                    className="w-[95%] h-[25%] pb-2 borde-2 rounded-b-xl g-[#423636] bord-[#6a7c83] g-[#0a0b0b]
                                    flex-row justify-center gap-2 items-start">
                                           <TouchableOpacity
                                            className="w-[40%] h-[100%] p-  gap-4 rounded-lg bord-[#6a7c83] bg-[#1b2435]
                                            flex-row justify-center items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[30%] h-[40%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='fill'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[50%] h-[80%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='contain'
                                                    />
                                                <View
                                                  className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-black">
                                                    <Text 
                                                        style={{fontSize:width/42,
                                                        color:"white"}}
                                                        className=" font-black text-sm text-black">
                                                        Guiness  
                                                    </Text>  
                                                </View>
                                         </TouchableOpacity>
        
                                         <TouchableOpacity
                                            className="w-[40%] h-[100%] p-4  gap-4 rounded-lg  bord-[#6a7c83] bg-[#13222f]
                                            flex-row justify-end items-start">
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[30%] h-[40%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[60%] h-[100%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    />
                                             <View
                                               className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-black">
                                                <Text 
                                                        style={{fontSize:width/42,
                                                        color:'white'}}
                                                    className="  font-black text-sm text-white">
                                                        Challenges
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
        
        
        
                                    </View>

                                    {/* <View
                                        className="w-[100%] h-[34%] p-2 borde-2 border-t-4 border-b-4 rounded-xl border-[#6a7c83] g-[#0a0b0b]
                                        flex-col justify-center items-end">
                                            <ChallengifyHeader /> 
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