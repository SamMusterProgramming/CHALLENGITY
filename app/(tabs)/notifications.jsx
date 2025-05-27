import { Image, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getInition } from '../../helper';
import { icons } from '../../constants';
import DisplayNotification from '../../components/notification/DisplayNotification';
import { getNotificationByUser } from '../../apiCalls';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heart from '../../components/custom/Heart';

export default function notifications() {
  const {user,notifications,setNotifications} = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false);
  const { width, height } = useWindowDimensions();


   useEffect(()=>{
    // console.log(notifications)
  },[])
   
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotificationByUser(user._id , setNotifications)
    setTimeout(() => {
      setRefreshing(false)
    }, 1099);

    }, []);

  return (
    <SafeAreaView className="bg-primary flex-1">
       <ScrollView
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
       } >
          <View className="flex-1">
              
              <View
                        style={{fontSize:11}}
                        className=" w-[100vw] h-[7vh] bg-white rounded-tl-xl rounded-tr-xl  flex-row justify-evenly items-center  border-t- border-t-black">
                          
                        
                           <View className="justify-center items-center  rounded-tl-xl rounded-tr-xl rounde-full w-[20%] bg-[#101311] h-[95%] flex-col">
                               <Heart title="Home" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.home} link="/timeline"/>
                           </View>
                          

                            <View
                                        className="flex-row justify-center  items-center w-[57%] h-[100%]">
                                              
                                              <View
                                              className="flex-row justify-start  items-center w-[20%] h-[100%] ">
                                                  <Image
                                                  className="w-[100%] h-[70%]"
                                                  source={icons.notification}
                                                  resizeMethod='contain' />
                                                
                                              </View>
                                              <View
                                              className="flex-col justify-end  items-center w-[60%] h-[100%] ">
                                                    <View
                                                      className="flex-row justify-center  items-end w-[100%] h-[30%] ">
                                                          <Text 
                                                               style={{fontSize:width/40}}
                                                               className="font-black text-sm text-black">
                                                                   Explore your 
                                                          </Text> 
                                                      
                                                    </View>
                                                    <View
                                                      className="flex-row justify-center mt- items-center w-[100%] h-[60%] ">
                                                          <Text 
                                                               style={{fontSize:width/22}}
                                                               className="font-bold text-sm text-[#1071e0]">
                                                                   Notifications
                                                          </Text> 
                                                      
                                                    </View>
                                              </View>
                            </View>
                        
                          <View className="justify-center items-center  rounded-tl-xl rounded-tr-xl rounde-full w-[20%] bg-[#101311] h-[95%] flex-col">
                               <Heart title="Challenges" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.challenge} link="/UserChallenges"/>
                           </View>
              </View>

              <View className="mt-0  w-[100%] h-[8vh] flex-row   items-center justify-evenly rounde-bl-[10px] py-2 bg-[white] rounde-br-[10px] 
                              borde-l-2 borde-l-white borde-r-2 borde-r-white"
                          style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
                          
                          <View className="justify-center items-center  rounded-bl-3xl rounded-br-3xl w-[20%] bg-[#1f32c8] h-[100%] flex-col">
                              <Heart title="Watchlist" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.watchlist} link="/favouriteChallenges"/>
                          </View>
                          
                          <View
                              className="justify-end gap-3 px-  w-[57%] items-center  h-[100%] flex-col  bg-[#eff6f9] ">
                                
      
                                <View
                                    className="justify-start gap-6 px-4  w-[100%] items-center h-[95%] flex-row rounded-tl-3xl rounded-tr-3xl bg-[#010e13] ">
                                          <View className="justify-start items-center min-h-[100%] flex-row ">
                                                <Image 
                                                  style={{width:width<= 330? 30:35 ,height:width <= 330? 30:35}}
                                                  className="w-[35px] h-[35px] rounded-full "
                                                  source={{uri : user.profile_img? user.profile_img  : avatar}}
                                                />
                                          </View>
                                          <View className="justify-center gap-  items-start h-[100%] flex-col ">
                                               
                                                  <Text className="font-pmedium  text-sm text-black">
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
                          <View className="justify-center items-center rounded-bl-3xl rounded-br-3xl  bg-[#083bf5]  w-[20%]   h-[100%] flex-col ">
                            <Heart title="New Challenge" color1 = '#b0611c' color2 = '#633711' icon ={icons.newChallenge} link="/CoverNewChallenge"/>
                          </View>
      
              </View>


              
              <View className="bg-white min-w-full min-h-1"></View>
              
              <View className="flex-col justify-start gap-1 items-center bg-whit gap-">
              {notifications.map((notification,index)=> {
                return <DisplayNotification key={index} notification ={notification} user={user}
                setNotifications={setNotifications}/> 
              })}
                 
              </View>

          </View>
       </ScrollView>  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})