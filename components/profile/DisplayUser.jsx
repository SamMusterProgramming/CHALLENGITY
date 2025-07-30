import { View, Text, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import CountryFlag from 'react-native-country-flag'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

export default function DisplayUser({userData}) {
  const {user,userFriendData} = useGlobalContext()
  const{width , heigh} = useWindowDimensions()
  useEffect(() => {
    
  }, [])
  
  return (
    <TouchableOpacity
    onPress={() => {
        router.navigate({ pathname: '/ViewProfile', params: {user_id:userData._id} })
    }}
       style={{width:width ,height:width/6 }}
        className="w-[100vw] h-[10vh] mb-2 bg-blue-900 flex-row rounded-lg px-2  justify-start items-center">
           <View
            style={{width:width/5 ,height:"100%" }}
            className=" flex-col justify-center gap-2 items-center  ">
                <Image
                    style={{width:width/11 ,height:width/11 }}
                    className="rounded-full"
                    resizeMethod='cover'
                    source={{uri:userData.profile_img}}
                />
                <Text
                       style={{fontSize:width/50}}
                       className="text-white font-black">
                         {userData.name.slice(0.13)}
                </Text>
           </View>

           <View
            style={{width:width * 2/5 ,height:"100%" }}
            className=" flex-col justify-center gap-2 items-center  ">
                    <View
                        style={{height:width/11 }}
                        className="min-w-[100%] flex-row justify-evenly  items-center">
                            <Text  
                                style={{fontSize:width/40}}
                                className="text-white font-bold">
                                    {userData.city.slice(0,12)}
                            </Text> 
                            <View
                            className=" flex-row justify-center gap-2  items-center">
                                    <Text
                                        style={{fontSize:width/40}}
                                        className="text-white font-black">
                                            {userData.country}
                                    </Text> 
                                    < CountryFlag
                                            isoCode={userData.country}
                                            size={width/40}     
                                        />  
                            </View>
                         
                    </View>
                    <Text
                       style={{fontSize:width/50 }}
                       className="text-gray-300 font-bold">
                         DETAILS
                    </Text>   
           </View>

           <View
            style={{width:width/5 ,height:"100%" }}
            className=" flex-col justify-center gap-2 items-center  ">
                <View
                        style={{height:width/11 }}
                        className="min-w-[100%] flex-row justify-evenly  items-center">
                            <Text  
                                style={{fontSize:width/30}}
                                className="text-white font-bold">
                                    W
                            </Text> 
                            <View
                            className=" flex-row justify-center gap-1  items-center">
                                    <Text
                                        style={{fontSize:width/30}}
                                        className="text-white font-black">
                                            3
                                    </Text> 
                                    <Image
                                    className="w-8 h-8 rounded-full"
                                    source ={icons.trophy}
                                     />
                            </View>
                         
                </View>
                <Text
                       style={{fontSize:width/50}}
                       className="text-gray-300 font-bold">
                         BADGES
                </Text>
           </View>
           <View
            style={{width:width/5 ,height:"100%" }}
            className=" flex-col justify-center gap-2 items-center  ">
                <Image
                    style={{width:width/11 ,height:width/11 }}
                    className="rounded-full"
                    resizeMethod='cover'
                    // source={userFriendData.friends.find(friend=>friend.sender_id == userData._id) ?icons.check_red :
                    //         userFriendData.friend_request_send.find(friend=>friend.sender_id == userData._id) ? icons.pending:
                    //         userFriendData.friend_request_received.find(friend=>friend.sender_id == userData._id) ? icons.check_red:icons.profile
                    // }
                />
                {/* <Text
                       style={{fontSize:width/50,color:"pink"}}
                       className="text-white font-black">
                         {userFriendData.friends.find(friend=>friend.sender_id == userData._id) ? "FRIEND":
                         userFriendData.friend_request_send.find(friend=>friend.sender_id == userData._id) ? "PENDING"
                        :userFriendData.friend_request_received.find(friend=>friend.sender_id == userData._id) ?"ACCEPT":"ADD FRIEND"}
                </Text> */}
           </View>   
            
    </TouchableOpacity>
  )
}