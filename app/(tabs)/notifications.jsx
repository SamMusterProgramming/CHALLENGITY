import { Image, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getInition } from '../../helper';
import { icons } from '../../constants';
import DisplayNotification from '../../components/notification/DisplayNotification';
import { getNotificationByUser } from '../../apiCalls';

export default function notifications() {
  const {user,notifications,setNotifications} = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false);


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
              
             <View className="w-[100vw] flex-row justify-between px-3 mb-1 items-end h-[45px]">
                <TouchableOpacity
                className="h-[100%]"
                  onPress={()=>router.back()}>
                    <Image 
                      className="w-12 h-12"
                      borderRadius={50}
                      resizeMode='cover'
                      source={icons.back} 
                    />
                </TouchableOpacity> 
                <Text className="text-xl text-white font-bold">
                     Notifications
                </Text>
                <TouchableOpacity
                className="h-[100%]"
                  onPress={()=>router.push('/profile')}>
                    <Image 
                      className="w-12 h-12"
                      borderRadius={50}
                      resizeMode='cover'
                      source={{uri:user.profile_img}} 
                    />
                </TouchableOpacity> 

              </View>

              <View className="bg-white min-w-full min-h-1"></View>


              <View className="mt-3 px-4 w-full h-[15vh] mb-4  flex-row gap-7 items-center justify-start"
                style={{marginTop:Platform.OS == "android" ? 0 : 0 }}>
                <View className="justify-evenly  items-start min-h-[100%] flex-col ">
                      <Image 
                        className="w-[60px] h-[60px] rounded-full "
                        source={{uri : user.profile_img}}
                      />
                </View>
                <View className="justify-center gap-3 items-start min-h-[100%] flex-col ">
                        <Text className="font-pmedium text-sm text-gray-100">
                            Welcome {' '}
                            <Text className="font-semibold text-sm text-white">
                                {user.name}
                            </Text> 
                        </Text>
                        <Text className=" text-2xl text-white font-bold">
                            {getInition(user.name)}Challenger
                        </Text>
                </View>
                <View className="justify-center items-center ml-auto min-h-[100%] flex-col ">
                    <TouchableOpacity onPress={()=>{ 
                    router.push({pathname: '/CreateChallenge', params:{}}); 
                    }}
                    className="justify-center items-center gap-2 min-h-[100%] flex-col ">
                      <Image 
                          className="w-10 h-10  "
                          source={icons.challenge}
                          resizeMode='contain'
                        />

                      <Text className="font-bold text-sm text-blue-100">
                            New Challenge
                      </Text>    
                    </TouchableOpacity> 
                </View>
              </View>
              <View className="bg-white min-w-full min-h-1"></View>
              
              <View className="flex-col justify-start items-center gap-2">
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