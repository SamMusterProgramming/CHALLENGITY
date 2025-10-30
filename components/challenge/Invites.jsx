import { View, Text, FlatList, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MotiView } from 'moti'
import { icons } from '../../constants'
import { router } from 'expo-router'
import ShuffleLetters from '../custom/ShuffleLetters'

export default function Invites({selectedParticipant ,data, w,h , top ,user,  setSelectedParticipant , 
    setParticipantTrackerId ,challenge, participantTrackerId}) {

    const flatList = useRef()
    const [viewableItems, setViewableItems] = useState([]);
    
    const onViewableItemsChanged = ({ viewableItems }) => {
        setViewableItems(viewableItems);
     
      };


    const renderItem = ({ item ,index }) => (
        <View
       
        className ="p- 2 b g-[#000000] rounded-3xl black  justify-center  items-center" 
        style ={{ 
            height: h ,
            width : w 
           }}
        >
            <TouchableOpacity
                 onPress={
                  () =>  {
                   router.navigate({ pathname: '/ViewProfile', params: {user_id:item.user_id} })
                 }}
                  style ={{ 
      
                }}
                  className="min w-[100%] h-[100%] rounded-lg  b g-black border- borde-[white] flex-col justify-start items-center rounde gap-  ">
                 
                  <View
                      className=" flex-col w-[100%] h-[100%] -2 b g-black  h- 8 g-black opacity-100 rounded-lg justify-start items-center gap- 1 ">
                 
                           
                           <View
                            className=" w- 100%]  h- [100%] flex-col justify-start   items-center">  
                                <View
                                    className="w- [100%] h -[20%] p-4 flex-col justify-between items-center "> 
                                    <Text 
                                          style ={{fontSize:11}}
                                          className="text-white mt-auto text-sm font-bold">
                                            has not joined  yet
                                    </Text>
                                </View>
        
                                 <View
                                 className=" w-[100%]  h- [75%] flex-col justify-center gap-4  b g-[#0c1b51] items-center">  
                                   <Image
                                    style={{width:w - w * 0.1 , height:w - w * 0.1 }}
                                    className="rounded-full w-7 h-7"
                                    contentFit='cover'
                                    source={{uri:item.profile_img || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                     />
                                   <Text 
                                        style ={{fontSize:12}}
                                        className="text-white mt-aut text-sm font-bold">
                                          {item.name}
                                   </Text>
                                 </View>

                            </View>
                  </View>
             </TouchableOpacity>
         </View>
   )
  return (
    <View
    style={{
      height:h ,
      width:  w,
      top : Platform.OS == "ios" ?  w * 0.18 + top + 1 : w * 0.18 + 50 + 1 
      }}
    className="absolute  b g-[#162142]   flex- row justify-center items-center rounded-3xl "
    > 
                    <View
                          className="w- [100%] h- [15%] p-2 4 flex-row gap-2  justify-center b g-[#0f0830] items-center ">
                                <Text 
                                    style ={{fontSize:10 ,fontStyle:"italic"}}
                                    className="text-xl font-black -auto text-white"> 
                                    {challenge.invited_friends.length} 
                                </Text>
                                <Text 
                                    style ={{fontSize:10 ,fontStyle:"italic"}}
                                    className="text-xl font-black -auto text-yellow-400"> 
                                       Invites
                                </Text>
                    </View>
                    <FlatList
                            data={data}
                            ref={flatList}
                            extraData={data}
                            keyExtractor={(item) => item.user_id}
                            renderItem={renderItem}
                            removeClippedSubviews={true} 
                            scrollEventThrottle = {16}
                            showsHorizontalScrollIndicator ={false}
                            pagingEnabled
                            horizontal={true}
                            onViewableItemsChanged={onViewableItemsChanged}
                            viewabilityConfig={{
                                itemVisiblePercentThreshold: 70, 
                              }}
                            getItemLayout={(data, index) => (
                                { length: w, offset: w * index, index }
                              )}

                          /> 
     
    </View>
  )
}