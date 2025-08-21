import { View, Text, Platform, TouchableOpacity, Image, useWindowDimensions, ScrollView, ActivityIndicator } from 'react-native'
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

  const handleRefresh = () =>{
    setRefresh(true)
    getUserTalent(user._id , setUserTalents)
    getUserTalentPerformances(user._id , setUserTalentPerformances)
    setTimeout(() => {
       setRefresh(false)
    }, 1000);
  }

  useFocusEffect(
    useCallback(() => {
      setSelectedBox(1)
      setLoaded(true)
        return () => {
          setLoaded(false)
          setSelectedBox(0)
        };
    }, [])
  );
 

  return (
    <>
    {loaded && ( 
    <View
     style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
     className=" flex-1 borde-4 borde-t-0 borde-white flex-col justify-start items-center py- 2 bg-[#0f1010]">
         
         <View className="  w-[100%] h-[7%] flex-row px-  b g-[#6b97b3] rounde-tl-xl  rounde-tr-xl items-end  bg[#0a144b] justify-between">
         <Image 
                                  
                  className="w-[100%] h-[100%]  "
                  source={icons.headline}
                  resizeMode = 'cover'
              />
        </View>
         {/* <View className="  w-[100%] h-[10%] flex-row px- border-b-2  border-[#306c99] b g-[#e2eaef] rounde-tl-xl  rounde-tr-xl items-end  bg[#0a144b] justify-between"
                  >
                        <View
                            className="justify-start rotate- 45 px-1 py-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#230d10] rounded-tr-full rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                          onPress={()=> {setDisplayNotificationsModal(true)}}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  py- rounded-full  g-[#d5daf6] flex-col">
                                                    <Image
                                                        style={{width:height * 0.04 ,height: height * 0.04}}
                                                        className="w-[30px]  h-[30px]  rounded-full g-white"
                                                        source={icons.notification}
                                                        resizeMethod='cover' />
                                                    <Text 
                                                          style={{fontSize:8}}
                                                          className="absolute top-0 p- right-0 w-5 h-5 rounded-full text-center bg-white font-black text-sm text-red-500">
                                                              {notifications.filter(not=>not.isRead == false).length}
                                                    </Text> 
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/SearchFriend")}}
                                            className="justify-start items- rounded-full p-1 w- [50%] h-[100%]  borde-[#0a144b] g-[#c0c2c9] flex-col">
                                                    <Image
                                                        style={{width:height* 0.04 ,height: height * 0.04}}
                                                        className="w-[30px] h-[30px] rounded-full b g-white"
                                                        source={icons.search_people}
                                                        resizeMethod='cover' />
                                      </TouchableOpacity>
                        </View>

                        <View
                            className="justify-end py- 2  px- 4 gap- 2 w-[40%] items-center h- [100%] flex-col  b g-[#042a6c] rounded-t-full bg-[#230d10] ">
                                      
                                    <View className="justify-center py-2 items-center w-[100%] b g-[#230d10]  rounded-t-3xl flex-row ">
                                        <Image 
                                            style={{width:height * 0.065 ,height: height * 0.065}}
                                            className="w-[40px] h-[40px] rounded-full "
                                            source={{uri :  (user.profile_img? user.profile_img  : "")}}
                                        />
                                    </View>            
                        </View>
                        
                        <View
                            className="justify-end rotate- 45 px-1 p-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#230d10] rounded-tl-full  rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/ProfilePage")}}
                                            className="justify-start items- center  rounded-full p- 1 h-[100%] border-  g-[#2039c4] g-[#fcfdff] flex-col">
                                                     <Image
                                                        style={{width:height * 0.04 , height: height * 0.04}}
                                                        className="w-[30px] h-[30px] rounded-full b g-[#fefefe]"
                                                        source={icons.profile}
                                                        resizeMethod='cover' />                                    
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/SearchFriend")}}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  py- rounded-full  g-[#d5daf6] flex-col">
                                                    <Image
                                                        style={{width:height * 0.04 ,height: height * 0.04}}
                                                        className="w-[30px] h-[30px] rounded-full bg-black"
                                                        source={icons.watchlist}
                                                        resizeMethod='cover'/>
                                      </TouchableOpacity>
                        </View>
                  
          </View> */}

           <View className="  w-[100%] h-[10%] flex-row px- border-b-2  border-[#306c99] b g-[#e2eaef] rounde-tl-xl  rounde-tr-xl items-end  bg-[#000000] justify-between"
                  >
                        <View
                            className="justify-start rotate- 45 px-1 py-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#efe8e8] rounded-tr-3xl rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                          onPress={()=> {setDisplayNotificationsModal(true)}}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  p-2 rounded-full  bg-[#0a0a0a] flex-col">
                                                    <Image
                                                        style={{width:height * 0.03 ,height: height * 0.03}}
                                                        className="w-[25px]  h-[25px]  rounded-full g-white"
                                                        source={icons.notification}
                                                        resizeMethod='cover' />
                                                    <Text 
                                                          style={{fontSize:8}}
                                                          className="absolute top-0 p- right-0 w-5 h-5 rounded-full text-center bg-white font-black text-sm text-red-500">
                                                              {notifications.filter(not=>not.isRead == false).length}
                                                    </Text> 
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/SearchFriend")}}
                                            className="justify-start items- rounded-full p-2 w- [50%] h-[100%]  borde-[#0a144b] bg-[#000000] flex-col">
                                                    <Image
                                                        style={{width:height* 0.03 ,height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full b g-white"
                                                        source={icons.search_people}
                                                        resizeMethod='cover' />
                                      </TouchableOpacity>
                        </View>

                        <View
                            className="justify-center py- 2  px- 4 gap- 2 w-[40%] items-end h- [100%] flex-row  b g-[#042a6c] rounde d-t-full b g-[#efe8e8] ">
                                      
                                      <View 
                                       style={{minWidth: width * 0.4 - height * 0.13 }}
                                       className="justify-center flex- 1 p y-2 items-center min-h-[50%] min-w-[20%] bg-[#efe8e8]  rounde-t-3xl flex-row "></View>

                                    <View className="justify-center pb-2   items-center w- [80%] bg-[#efe8e8] rounded-t-full flex-row ">
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
                                     className="justify-center p y-2 items-center flex-1 min-h-[50%]  bg-[#efe8e8]  rounded -t-3xl flex-row "></View>
          
                        </View>
                        
                        <View
                            className="justify-end rotate- 45 px-1 p-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#efe8e8] rounded-tl-3xl rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/ProfilePage")}}
                                            className="justify-start items- center  rounded-full p-2 h-[100%] border-  bg-[#000000] g-[#fcfdff] flex-col">
                                                     <Image
                                                        style={{width:height * 0.03 , height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full b g-[#fefefe]"
                                                        source={icons.profile}
                                                        resizeMethod='cover' />                                    
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/SearchFriend")}}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  p-2 rounded-full  bg-[#000000] flex-col">
                                                    <Image
                                                        style={{width:height * 0.03 ,height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full bg-black"
                                                        source={icons.watchlist}
                                                        resizeMethod='cover'/>
                                      </TouchableOpacity>
                        </View>
                  
          </View>

          <View className="flex-row justify-center w-[100%] py- 2 h-[6%] items-center">
            <ShuffleLetters text={"Track your talents"} textSize={12} />
            <TouchableOpacity
                onPress={handleRefresh}
                className=" absolute left-2  items-center ">
                  {refresh ? (
                    <ActivityIndicator size={25} />
                  ) : (
                    <Image 
                    className="w-8 h-8  rounded-full "
                    source={icons.refresh}
                   />
                  )}
                 
            </TouchableOpacity>
                                        
          </View>

          <View className=" w-[100vw] h-[7%]  mt- bg-[#dad1d1] rounde-tl-md rounde-tr-md px-   #041e9f
                      flex-row justify-evenly items-center">
                        <TouchableOpacity
                            onPress={()=>{setSelectedBox(1)
                                 }}   
                            style={{ backgroundColor:selectedBox == 1 ?"#03133f":"black" }}
                            className="flex-col justify-center  items-center w-[32%] h-[90%] bg-[#10152d] border-2 rounded-md">
                                      
                                        <View
                                        
                                            className=" flex-col  justify-start  border-gray-500 rounded-lg items-center "
                                           >
                                            <Image
                                              style={{height:width/22,width:width/22}}
                                              className ="w-[15px] h-[15px]"
                                              source={selectedBox == 1 ?icons.down_arrow:icons.up_arrow}
                                              resizeMethod='contain'
                                            />
                                  
                                        </View>
                                        <Text 
                                            style={{fontSize:width/53,
                                              color:selectedBox == 1 ?"white": "white"
                                            }}
                                            className="font-bold text-sm text-white">
                                                TALENT ENTRIES
                                        </Text>   
                         </TouchableOpacity>
      
                         <TouchableOpacity
                            onPress={()=>{setSelectedBox(2)}}
                            style={{ backgroundColor:selectedBox == 2 ?"#03133f":"black" }}
                            className="flex-col justify-center  items-center w-[32%] h-[90%] bg-[#045804] border-2 rounded-md">
                                      
                                        <View
                                            style={{width:width/5}}
                                            className=" flex-col  justify-center  border-gray-500 rounded-lg items-center "
                                            >
                                            <Image
                                              style={{height:width/22,width:width/22}}
                                              className ="w-[20px] h-[20px]"
                                              source={selectedBox == 2 ?icons.down_arrow:icons.up_arrow}
                                              resizeMethod='contain'
                                            />
                                  
                                        </View>
                                        <Text 
                                            style={{fontSize:width/53,
                                              color:selectedBox == 2 ?"white": "white"}}
                                            className="font-black text-sm text-white">
                                                TOP PERFORMANCE  
                                        </Text>   
                         </TouchableOpacity>
      
                         <TouchableOpacity
                            onPress={()=>{setSelectedBox(3)}}
                            style={{ backgroundColor:selectedBox == 3 ?"#03133f":"black" }}
                            className="flex-col justify-center  items-center w-[32%] border-2 h-[90%] bg-[#360408] rounded-md">
                                         
                                        <View
                                            style={{width:width/5}}
                                            className=" flex-col  justify-center  border-gray-500 rounded-lg items-center "
                                            >
                                            <Image
                                              style={{height:width/22,width:width/22}}
                                              className ="w-[20px] h-[20px]"
                                              source={selectedBox == 3 ?icons.down_arrow:icons.up_arrow}
                                              resizeMethod='contain'
                                            />
                                  
                                        </View>
                                        <Text 
                                            style={{fontSize:width/53,
                                              color:selectedBox == 3 ?"white": "white"}}
                                            className="font-bold text-sm text-white">
                                                FAVOURITE ROOMS
                                        </Text>  
                         </TouchableOpacity>

                      
                  </View>
        {loaded && (
          <ScrollView className="bg- gray-100 flex-1 px-1 border-b-2 border-white max-w- [100%] max-h- [69%] rounded- xl bg-[#dad1d1] [#6a7c83]">
                <View className="min-w- [100%] max- min-h -[100%] flex-1 py- 1 px- gap-x-1 flex-row flex-wrap justify-start items-center gap-y- 1 b b g-white">
                        {selectedBox == 1 && userTalents.map((userTalent,index)=>  {
                                  let userPost = userTalent.contestants.find(c => c.user_id === user._id) 
                                  if(userPost) {
                                       userPost.status = "stage"
                                  }else{
                                    userPost = userTalent.queue.find(c => c.user_id === user._id)
                                    if(userPost){
                                           userPost.status = "queue"
                                    }else{
                                      userPost = userTalent.eliminations.find(c => c.user_id === user._id)
                                      userPost.status = "eliminated"
                                    }
                                  }
                                  return(<UserTalentEntry key={index} userTalent={userTalent} user={user} userPost={userPost} />)
                         })
                        }
                         {selectedBox == 2 && userTalentPerformances.map((userTalent,index)=>  {
                                  
                                  return(<UserTalentPerformances key={index} userTalent={userTalent} user={user}  />)
                         })
                        }
                </View>
          </ScrollView>
        )}

          <View
          style={{ minHeight: Platform.OS =="ios" ? width/ 7 + 10: width/7+5, width:"100%"}}
          className="bg-[#dad1d1]"></View>

          {displayNotificationsModal && 
          <NotificationsModal user={user} displayNotificationsModal={displayNotificationsModal}
          setDisplayNotificationsModal={setDisplayNotificationsModal}/>}
    </View>
    )}</>
  )
}