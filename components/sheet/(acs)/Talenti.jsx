import { View, Text, Platform, TouchableOpacity, Image, useWindowDimensions, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import NotificationsModal from '../../components/talent/modal/NotificationsModal';
import { icons } from '../../constants';
import { router, useFocusEffect } from 'expo-router';
import UserTalentEntry from '../../components/talent/UserTalentEntry';
import ShuffleLetters from '../../components/custom/ShuffleLetters';
import UserTalentPerformances from '../../components/talent/UserTalentPerformances';
import { getUserTalent, getUserTalentPerformances } from '../../apiCalls';






export default function Talent() {
  const {user, userTalents, setUserTalents, userTalentPerformances , setUserTalentPerformances , notifications} = useGlobalContext()
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
  const [selectedBox, setSelectedBox] = useState(1);
  const [displayTalent, setDisplayTalent] = useState(userTalents)
  const [refresh , setRefresh] = useState(false)
  const [loaded , setLoaded] = useState(false)
  const [displayData, setDisplayData] = useState(null);
  const [index, setIndex] = useState(2);

  const handleRefresh = () =>{
    setRefresh(true)
    getUserTalent( user._id , setUserTalents )
    getUserTalentPerformances(user._id , setUserTalentPerformances)
    setTimeout(() => {
       setRefresh(false)
    }, 1000);
  }

  useFocusEffect(
    useCallback(() => {
      setSelectedBox(1)
      setDisplayData(userTalents.slice(0,index))

      // handleRefresh()
      // setLoaded(true)
        return () => {
          // setLoaded(false)
          setDisplayData(null)
          setIndex(2)
          setSelectedBox(0)
        };
    }, [])
  );

  useEffect(() => {
    setDisplayData(userTalents.slice(0,index))
  }, [userTalents])

  const loadMoreData = () => {
    const newData = userTalents.slice(index, index + 2);
    setDisplayData([...displayData, ...newData]);
    setIndex(index + 2);
  };
  

  return (
    <>
    {displayData && ( 
    <View
     style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
     className=" flex-1 borde-4 borde-t-0 borde-white flex-col justify-start items-center py- 2 bg-black [#898888]">
         
          <View className="  w-[100%] h-[1%] flex-row px-  bg-black rounde-tl-xl  rounde-tr-xl items-end  bg[#0a144b] justify-between">
        
          </View>

          <View className="flex-row  bg-[#000000]  justify-between min-w-[100%] px-8 pb-1  h-[7%] items-end">
             
              <View
              className="h-[100%] w-[20%] flex-row  bg-[#000000]  justify-start  gap-4   items-end">
                   <TouchableOpacity
                                        onPress={handleRefresh}
                                        className="  items-center ">
                                          {refresh ? (
                                            <ActivityIndicator size="large" color="green"/>
                                          ) : (
                                            <Image 
                                            className="w-9 h-9  rounded-full "
                                            source={icons.refresh}
                                          />
                                          )}
                  </TouchableOpacity>      
               
              </View>
              <View
              className="h-[100%] flex- 1 flex-col justify-center items-center">
                  <Text 
                        style={{fontSize:20,
                          fontStyle:"italic"
                      }}
                      className="font-black  text-yellow-500">
                         User Talents
                  </Text>  
                  <Text 
                        style={{fontSize:11,
                          // fontStyle:"italic"
                      }}
                      className="font-black mt-auto text-white">
                         {user.name}
                  </Text>  
              </View>

              <View
              className="h-[100%] w-[20%] flex-row  bg-[#000000]  justify-start  gap-4   items-end">
                 <TouchableOpacity
                                        onPress={handleRefresh}
                                        className="  items-center ">
                                            <Image 
                                            className="w-10 h-10  rounded-full "
                                            source={icons.search}
                                          />
                 </TouchableOpacity>    

              </View>
        
          </View>
     
          <View className="  w-[100%] h-[10%] flex-row px- bord er-b-2  bo rder-[#1013c0]  bg-[#000000] rounde-tl-xl  rounde-tr-xl items-end  b g-[#000000] justify-between"
                  >

                        <View
                            className="justify-start rotate- 45 px-1 py-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#303030] [#ad072b] [#efe8e8] rounded-tr-3xl rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                            onPress={()=>{ setSelectedBox(1) }}
                                            style={{ backgroundColor:selectedBox == 1 ?"white":"black" }}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  p-2 rounded-full  bg-[#0a0a0a] flex-col">
                                                    <Image
                                                        style={{width:height * 0.03 ,height: height * 0.03}}
                                                        className="w-[30px]  h-[30px]  rounded-full g-white"
                                                        source={icons.talent}
                                                        resizeMethod='cover' />
                                          
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                            onPress={()=>{ setSelectedBox(2) }}
                                            style={{ backgroundColor:selectedBox == 2 ?"white":"black" }}
                                            className="justify-start items- rounded-full p-2 w- [50%] h-[100%]  borde-[#0a144b] bg-[#000000] flex-col">
                                                    <Image
                                                        style={{width:height * 0.03 ,height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full b g-white"
                                                        source={icons.trophy}
                                                        resizeMethod='cover' />
                                      </TouchableOpacity>
                        </View>

                        <View
                            className="justify-center py- 2  px- 4 gap- 2 w-[40%] items-end h- [100%] flex-row  b g-[#042a6c] rounde d-t-full b g-[#efe8e8] ">
                                      
                                      <View 
                                       style={{minWidth: width * 0.4 - height * 0.13 }}
                                       className="justify-center flex- 1 p y-2 items-center min-h-[50%] min-w-[20%] bg-[#303030] [#ad072b] [#efe8e8]  rounde-t-3xl flex-row "></View>

                                    <View className="justify-center pb-2   items-center w- [80%] bg-[#303030] [#ad072b] [#efe8e8] rounded-t-full flex-row ">
                                      <View
                                          className="flex-col p-2 bg-black rounded-full justify-center items-center">
                                                  <Image 
                                                        style={{width:height * 0.065 ,height: height * 0.065}}
                                                        className="w-[40px] h-[40px]  rounded-full "
                                                        source={{uri :  (user.profile_img? user.profile_img  : "")}}
                                                    />
                                      </View>    
                                    </View>  
                                    <View
                                     style={{minWidth: width * 0.4 - height * 0.13 }}
                                     className="justify-center p y-2 items-center flex-1 min-h-[50%]  bg-[#303030] [#ad072b] [#efe8e8]  rounded -t-3xl flex-row ">

                                    </View>     
          
                        </View>
                        
                        <View
                            className="justify-end rotate- 45 px-1 p-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#303030] [#ad072b] [#efe8e8] rounded-tl-3xl rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                          onPress={()=>{ setSelectedBox(3) }}
                                          style={{ backgroundColor:selectedBox == 3 ?"white":"black" }}
                                            className="justify-start items- center  rounded-full p-2 h-[100%] border-  bg-[#000000] g-[#fcfdff] flex-col">
                                                     <Image
                                                        style={{width:height * 0.03 , height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full b g-[#fefefe]"
                                                        source={icons.favourite}
                                                        resizeMethod='cover' /> 
                                                       {/* <Text 
                                                          style={{fontSize:8}}
                                                          className="absolute top-0 p- right-0 w-5 h-5 rounded-full text-center bg-yellow-400 font-black text-sm text-gray-600">
                                                              {userTalents.length}
                                                       </Text>                                     */}
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                            // onPress={()=> {setDisplayNotificationsModal(true)}}
                                            onPress={()=>{ setSelectedBox(4) }}
                                            style={{ backgroundColor:selectedBox == 4 ?"white":"black" }}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  p-2 rounded-full  bg-[#000000] flex-col">
                                                    <Image
                                                        style={{width:height * 0.03 ,height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full b g-black"
                                                        source={icons.notification}
                                                        resizeMethod='cover'/>
                                                    <Text 
                                                        style={{fontSize:8}}
                                                        className="absolute top-0 p-1 right-0 w-5 h-5 rounded-full text-center bg-yellow-400 font-black  text-gray-700">
                                                        {notifications.filter(not=>not.isRead == false).length}
                                                    </Text> 
                                                        
                                      </TouchableOpacity>
                        </View>
                  
          </View>

          

    
  
        
          <View className="min-w-[100vw] flex-1 py- 2 px- 1 borde r-b-2 mt- 1 bord er-[lightblue] max-w- [100%] max-h- [69%] rounded- xl bg-[#595757] [#deddd9] [#deddd9] [#6a7c83]">
                  {selectedBox == 1 && (
                   <FlatList
                    data={displayData && displayData}
                    keyExtractor={(item) => item._id}
                    renderItem={({item ,index}) => {
                     return <UserTalentEntry key={index} userTalent={item} user={user}  />
                    }}
                    removeClippedSubviews={true} 
                    onEndReached={loadMoreData}
                    scrollEventThrottle={16} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  />
                  )}
          </View>


       

        

          <View
          style={{ minHeight: Platform.OS =="ios" ? width/ 7 + 5: width/7 + 5, width:"100%"}}
          className="bg-black"></View>
          {displayNotificationsModal && 
          <NotificationsModal user={user} displayNotificationsModal={displayNotificationsModal}
          setDisplayNotificationsModal={setDisplayNotificationsModal}/>}
    </View>

    )}</>
  )
}