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
import NotificationsModal from '../../components/talent/modal/NotificationsModal';

export default function Home() {
  const insets = useSafeAreaInsets();
  const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData,notifications} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [selectedPage , setSelectedPage] = useState(null)
  const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)

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
           className=" flex-1 borde-4 borde-t-0 borde-white flex-col justify-start items-center py- bg-[#0f1010]">
        
        <View className="justify-center items-center w-full h-[15%] flex-row ">
                                        <Image 
                                  
                                            className="w-[100%] h-[100%]  "
                                            source={icons.headline}
                                            resizeMode='cover'
                                        />
         </View>
                 
          <View className="  w-[100%] h-[12%] flex-row px-  border-[#306c99] g-[#272d31] rounde-tl-xl  rounde-tr-xl items-center  bg[#0a144b] justify-between"
                  >
          
                        <View
                            className="justify-center  px-6 gap-4 w-[25%] items-center h-[100%] flex-row g-[#fefefe] rounde-tr-3xl  ">
                                   <TouchableOpacity 
                                          onPress={()=> {setDisplayNotificationsModal(true)}}
                                            className="justify-center items-center pb-6  p- rounded-full  borde-[#0a144b] g-[#d5daf6] flex-col">
                                                    <Image
                                                        style={{width:height/22 ,height: height/22}}
                                                        className="w-[30px]  h-[30px]  rounded-full bg-white"
                                                        source={icons.notification}
                                                        resizeMethod='cover' />
                                                        <Text 
                                                          style={{fontSize:10}}
                                                          className="absolute top-0 p- right-0 w-5 h-5 rounded-full text-center bg-white font-black text-sm text-red-500">
                                                              {notifications.filter(not=>not.isRead == false).length}
                                                       </Text> 
                                      </TouchableOpacity>
                                          <TouchableOpacity 
                                          onPress={()=> {router.navigate("/SearchFriend")}}
                                            className="justify-center items-center rounded-full p-1   borde-[#0a144b] g-[#c0c2c9] flex-col">
                                      
                                                    <Image
                                                        style={{width:height/22 ,height: height/22}}
                                                        className="w-[30px] h-[30px]"
                                                        source={icons.search_people}
                                                        resizeMethod='cover' />
                                      </TouchableOpacity>
                        </View>
                        <View
                            className="justify-center  px-4 gap-2 w-[50%] items-center h-[100%] flex-col  g-[#fefefe] rounde-tr-3xl  ">
                                    <View className="justify-center items-center -[100%] flex-row ">
                                        <Image 
                                            style={{width:height/20 ,height: height/20}}
                                            className="w-[40px] h-[40px] rounded-full "
                                            source={{uri :  (user.profile_img? user.profile_img  : "")}}
                                        />
                                           
                                    </View>
                                    <View className="justify-center gap- -auto items-start -[100%] flex-col ">
                                            <Text className="font-pmedium  text-sm text-white">
                                                <Text 
                                                style={{fontSize:width<= 330? 8:12}}
                                                className="font-black text-sm text-white">
                                                    { (user.name.length > 13 ?  user.name.slice(0,13)+"..." : user.name)}
                                                </Text> 
                                            </Text>
                                          
                                    </View>  
                        </View>
                        <View
                            className="justify-center  px-6 gap-4 w-[25%] py-4 items-center h-[100%] flex-row   ">
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/ProfilePage")}}
                                            className="justify-center items-center  rounded-full p-1 -[100%] border-  g-[#2039c4] g-[#fcfdff] flex-col">
                                      
                                                    <Image
                                                        style={{width:height/22 ,height: height/22}}
                                                        className="w-[30px] h-[30px] rounded-full bg-[#2039c4] "
                                                        source={icons.profile}
                                                        resizeMethod='contain' />
                                                 
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/SearchFriend")}}
                                            className="justify-center items-center rounded-full p-1 pb-6  borde-[#0a144b] g-[#2039c4]  flex-col">
                                      
                                                    <Image
                                                        style={{width:height/22 ,height: height/22}}
                                                        className="w-[30px] h-[30px] rounded-full bg-black"
                                                        source={icons.watchlist}
                                                        resizeMethod='cover' />
                                      </TouchableOpacity>
                        </View>
                  
            </View>

               
       

       {!selectedPage && (
            <View
             className="w-full h-[7%]  py-1 borde-2 rder-[#fefefe]  borde-l-[10px] borde-r-[10px] borde--[10px] borde-[#272d31] ] g-[#95c3e6]
                flex-row justify-center items-center">
                 <View className=" w-[90%] h-[100%] px- borde-gray-200 borde-2 bg-[#fffcfc]   rounded-xl
                     flex-row justify-center items-center">
                    <TextInput
                        className=" text-gray-700 -[100%]   -[100%] px-3
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
       )}

            {!selectedPage ? (
                     <View
                    
                     className="w-[100%] h-[66%] py-2 px- -auto border-r-[10px] border-l-[10px] border-b-[10px] rounde-xl borde-[#272d31]  g-[#3b4348] 
                        flex-col justify-end items-center">
                            
                            <View
                            
                                    className="w-[92%] h-[48%] pb-3 py- borde-l-[20px] rounde-t-xl g-[#423636] borde-[#2a2e2e] g-[#cae4f5]
                                    flex-row justify-center gap-3 items-center">
                                           <TouchableOpacity
                                            className="w-[50%] h-[100%] py- elevation-2xl  gap- rounded-xl borde-2 borde-[#000000] bg-[white]
                                            flex-row justify-center items-center">
                                                {/* <Image
                                                  
                                                      className ="w-[25%] h-[40%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                      resizeMode='contain'
                                                    /> */}
                                              <View
                                               className="w-[95%] h-[95%] p- justify-center items-center "
                                                >
                                                <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[100%] h-[100%] bg-black rounde-full"
                                                      source={icons.challenge}
                                                      resizeMode='contain'
                                                    />
                                            </View>
                                             <View
                                               className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-[#0a0a0a]  ">
                                                <Text 
                                                        style={{fontSize:width/37,
                                                        color:'white'}}
                                                    className="  font-black text-sm text-black">
                                                        Challenges
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
                                        
                                         <TouchableOpacity
                                            onPress={()=> setSelectedPage("talent")}
                                            className="w-[50%] h-[100%] py-  gap- elevation-xl rounded-xl bord-[#6a7c83] bg-[white]
                                             flex-row justify-center items-center">
                                                {/* <Image
                                                  
                                                      className ="w-[25%] h-[30%] bottom-10 roun-full"
                                                      source={icons.home}
                                                      resizeMode='contain'
                                                    /> */}
                                                <View
                                               className="w-[95%] h-[95%] p- justify-center items-center "
                                                >
                                                      <Image
                                                    //   style={{height:width/6,width:width/6}}
                                                      className ="w-[100%] h-[100%] bg-black rounde-full"
                                                      source={icons.home}
                                                      resizeMode='contain'
                                                    />
                                                </View>
                                               
                                                <View
                                                  className="p-2 px-4 absolute rounded-tr-xl bottom-0 left-0 bg-[#000000]  ">
                                                    <Text 
                                                        style={{fontSize:width/37,
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
                                    className="w-[92%] h-[48%] pb-3 borde-2 rounded-b-xl g-[#423636] bord-[#6a7c83] g-[#0a0b0b]
                                    flex-row justify-center  gap-3 items-center">
                                           <TouchableOpacity
                                            className="w-[50%] h-[100%] p-  gap- rounded-xl bord-[#6a7c83] bg-[white]
                                            flex-row justify-center items-center">
                                                {/* <Image
                                                  
                                                      className ="w-[30%] h-[40%] roun-full"
                                                      source={icons.trophy}
                                                      resizeMethod='fill'
                                                    /> */}
                                                <View
                                                className="w-[95%] h-[95%] p- justify-center items-center "
                                                >
                                                   <Image
                                                   
                                                   className ="w-[100%] h-[100%] bg-black roun-full"
                                                   source={icons.trophy}
                                                   resizeMethod='contain'
                                                 />
                                                </View>
                                                
                                                <View
                                                  className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-[#050505]  ">
                                                    <Text 
                                                        style={{fontSize:width/37,
                                                        color:"white"}}
                                                        className=" font-black text-sm text-black">
                                                        Guiness  
                                                    </Text>  
                                                </View>
                                         </TouchableOpacity>
        
                                         <TouchableOpacity
                                            className="w-[50%] h-[100%] p-  gap- rounded-xl  bord-[#6a7c83] bg-[white]
                                            flex-row justify-center items-center">
                                                {/* <Image
                                              
                                                      className ="w-[30%] h-[40%] roun-full"
                                                      source={icons.challenge}
                                                      resizeMethod='contain'
                                                    /> */}
                                                <View
                                                className="w-[95%] h-[95%] p- justify-center items-center "
                                                >
                                                     <Image
                                                        className ="w-[100%] h-[100%] bg-black roun-full"
                                                        source={icons.competition}
                                                        resizeMode='cover'
                                                      />
                                                </View>
                                               
                                             <View
                                               className="p-2 absolute rounded-tr-xl bottom-0 left-0 bg-[#000000] flex-col  justify-end ">
                                                <Text 
                                                        style={{fontSize:width/37,
                                                        color:'white'}}
                                                    className="  font-black text-sm text-white">
                                                        Training
                                                    
                                                </Text>  
                                             </View>
                                                
                                         </TouchableOpacity>
        
        
        
                                    </View>

          
                            
                    </View>
        
            ) : (
       
                <View     
                    className="w-[100%] h-[73%] py-2 px- -auto border-r-[10px] border-l-[10px] border-b-[10px] rounde-xl borde-[#272d31]  g-[#3b4348] 
                       flex-col justify-end items-center">
                      <View  className = "bg-[#70b2f9]  w-full h-1 borde-r-[10px] borde-[#272d31]"></View>
                      {selectedPage == "talent" &&  (
                          <TalentHomePage setSelectedPage={setSelectedPage} />
                        )}
                </View>
            
            )}

          

                 
          {displayNotificationsModal && 
          <NotificationsModal user={user} displayNotificationsModal={displayNotificationsModal}
          setDisplayNotificationsModal={setDisplayNotificationsModal}/>}
 
      </View>
       

  )
}