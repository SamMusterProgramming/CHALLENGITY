import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getInition } from '../../helper';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { icons } from '../../constants';




export default function DisplayInvites({inviteList, user,challenge, isParticipant, participantList}) {

  
const {isViewed ,setIsViewed
 } = useGlobalContext()
 

 const renderItem = ({ item ,index}) => (
    <View className="flex-1 flex-row w-[100%] h-[100%] mb-1 justify-center items-center">
          <TouchableOpacity 
          key={index} 
          onPress={() => {
              if(user._id === item.user_id){
                router.push('/profile')
              }
              else{
               if(isViewed) 
                {  console.log("i am here routttterrrrr")
                   setIsViewed(false) 
                  router.push({ pathname:'/ViewProfile', params: {user_id:item.sender_id} })
                }
                else router.replace({ pathname:'/ViewProfile', params: {user_id:item.sender_id} })
              }
            } }
          className="px-1 py-2  mb-1 w-[90%] h-[30px] bg-white rounded-lg flex-row justify-start gap-3 items-center"
          style={{backgroundColor:user._id == item.sender_id?
            "#bd9c77":participantList.find(participant=> participant.user_id == item.sender_id)?"#95c489":"white"}}
          >
              <Image 
              className="w-[20px] h-[20px] rounded-full"
              source={{uri:item.profile_img}}
              resizeMethod='contain'
              />
              <View className="flex-col justify-center w-[40%] gap-0 items-start h-[30px] ">
                      <Text
                      style={{fontSize:8}}
                      className="font-black text-xs text-black">
                          {user._id == item.sender_id  ? item.name + ' -You': item.name }
                      </Text>
                      <Text
                          style={{fontSize:8}}
                          className=" text-xs text-blue-900 font-black">
                          {getInition(item.name)}Challenger
                      </Text>
              </View>
              { user._id == item.sender_id ?(
                  !isParticipant ? (
                    <>
                      <Text
                        style={{fontSize:8}}
                        className=" text-sm text-green  mt-0 font-black">
                        
                             No Reply
                      </Text>
                      <TouchableOpacity
                        className=" w-[50px] h-[25px] bg-green-800 rounded-lg ml-auto justify-center items-center">
                        <Text
                            style={{fontSize:8}}
                            className=" text-sm text-white  font-black">
                            Join
                        </Text>
                      </TouchableOpacity>
                    </>  
                      ):(
                        <>
                        <Text
                            style={{fontSize:8}}
                            className=" text-sm text-green  mt-0 font-black">
                               Replied
                        </Text>
                        <TouchableOpacity
                          className=" w-[50px] h-[25px] bg-red-800 rounded-lg ml-auto justify-center items-center">
                          <Text
                              style={{fontSize:8}}
                              className=" text-sm text-white  font-black">
                               Resign
                          </Text>
                        </TouchableOpacity>
                      </>  
                      )      
              ):(
                <Text
                 style={{fontSize:8}}
                 className=" text-sm text-green ml-auto mt-0 font-bold">
                   {participantList.find( participant=> participant.user_id == item.sender_id)?
                    "Replied" : "No Reply" } 
                </Text>
              )
            
            }
    
          </TouchableOpacity>
   </View>
  );

return (
    <View className ="w-[280px]  max-h-[450px]  rounded-lg  absolute bg-gray-400  left-1 bottom-16">
    
    
    <FlatList
      data={inviteList}
      renderItem={renderItem}
      keyExtractor={(item) => item.sender_id}
    //   extraData={hoveredIndex}
      ListHeaderComponent={
        <>
            <View className="flex-1 flex-row w-[100%] h-[30px] mb-2 justify-center rounded-tl-lg rounded-tr-lg rounded-bl-3xl rounded-br-3xl bg-blue-950 items-center">
                <Text className="text-white text-sm font-black"
                style={{fontSize:9}}>
                    {challenge.privacy == "Public" ? "this is a Public chanllenge, open to public":
                    `${inviteList.length}  FRIENDS INVITED TO PARTICIPATE`}
                </Text>
            </View>
               
            <View className="flex-1 flex-row w-[100%] h-[100%] mb-1 justify-center items-center">
                <TouchableOpacity 
                        onPress={() => {
                            if(user._id === challenge.origin_id){
                                router.push('/profile')
                            }
                            else{
                            if(isViewed) 
                                {  console.log("i am here routttterrrrr")
                                setIsViewed(false) 
                                router.push({ pathname:'/ViewProfile', params: {user_id:challenge.origin_id} })
                                }
                                else router.replace({ pathname:'/ViewProfile', params: {user_id:challenge.origin_id} })
                            }
                            } }
                        className="px-2 py-2  mb-1 w-[95%] h-[30px] bg-yellow-100 rounded-lg flex-row justify-start gap-1 items-center"
                        // style={{backgroundColor:user._id == item.sender_id?
                        //     "#bd9c77":participantList.find(participant=> participant.user_id == item.sender_id)?"#95c489":"white"}}
                        >
                            <Image 
                            className="w-[20px] h-[20px] rounded-full"
                            source={icons.challenge}
                            resizeMethod='contain'
                            />
                            <View className="flex-col justify-center w-[50%] gap-0 items-start h-[30px] ">
                                    <Text
                                    style={{fontSize:8}}
                                    className="font-black text-xs text-black">
                                        {challenge.name } " Owner "
                                    </Text>
                                    <Text
                                        style={{fontSize:8}}
                                        className=" text-xs text-blue-900 font-black">
                                        {getInition(challenge.name)}Challenger
                                    </Text>
                            </View>
                            <Text
                                style={{fontSize:9}}
                                className=" text-sm text-red-500  font-black">
                                  
                            </Text>

                            <Text
                                style={{fontSize:9}}
                                className=" text-sm text-black  font-black">
                                    Replied
                            </Text>

                            {participantList.find( participant=> participant.user_id == challenge.origin_id)? 
                               (
                                 <Image
                                     className= "w-5 h-5 ml-auto rounded-full"
                                     source={icons.challenge}
                                 />
                               ):(
                                <Text
                                    style={{fontSize:8}}
                                    className=" text-sm text-green ml-auto mt-1 font-bold">
                                    {participantList.find( participant=> participant.user_id == challenge.origin_id)?
                                        "is Participatant" : "not a participatant" } 
                                </Text>
                            )}
                           
                            
                    
                </TouchableOpacity>
            </View>
      
        </>
      }
    ListFooterComponent={
        <View className="flex-1 flex-col w-[100%] h-[40px]  justify-center rounded-tl-3xl rounded-tr-3xl bg-red-800 items-center">
            {/* <Text className="text-blue-100 text-xs font-black"
                  style={{fontSize:9}}>
                 { friendList[0].name + "  " }
                 <Text  className="text-white text-xs font-bold"
                        style={{fontSize:8}}
                 >
                     is leading the challenge
                 </Text>
            </Text> */}
            <Text className="text-blue-100 text-xs font-black"
              style={{fontSize:9}}>
                  Watch the Challenge and cast your vote
                 <Text>
                     
                 </Text>
            </Text>
        </View>
    }
    />


</View>
  )
}