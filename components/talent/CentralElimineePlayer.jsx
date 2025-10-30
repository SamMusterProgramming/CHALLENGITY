import { View, Text, Platform, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { icons } from '../../constants';
import { getIcon } from '../../helper';
import { router } from 'expo-router';

export default function CentralElimineePlayer({selectedContestant ,data, w,h , top ,user,  setSelectedContestant , selectedPostIndex,isScrolling,
   setIsScrolling , setParticipantTrackerId ,talentRoom, participantTrackerId, setParticipationType}) {
       
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
                        setParticipationType("cplay")
                     }}
                      style ={{ 
          
                    }}
                      className="min w-[100%] h-[100%] rounded-lg  b g-black border- borde-[white] flex-col justify-start items-center rounde gap-  ">
                     
                      <View
                          className=" flex-col w-[100%] h-[100%] -2 b g-black  h- 8 g-black opacity-100 rounded-lg justify-start items-center gap- 1 ">
                         
                             
    
                              <View
                              className="w- [100%] h- [50%] py-12 b g-white flex-col justify-center items-center ">
                                   <Image
                                   style={{width:w - w * 0.1 , height:w - w * 0.1}}
                                    className="w-[100%] h-[100%]  shadow-lg elevation-2xl rounded-full"
                                    source={{uri:item.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                    resizeMethod='contain' /> 
                                    <Image
                                    className="absolute w-10 h-10 rounded-xl"
                                    source={icons.play}
                                    resizeMethod='cover' /> 

                                 
                                 <TouchableOpacity
                                   onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:item.user_id} })}}
                                     className="absolute bottom-0  h-24 left-2 flex-row justify-center mt- auto items-end gap-6 ">
                                            <Image
                                                source={{uri:item.profile_img}}
                                                className ="w-[35px] h-[35px] m- rounded-full"
                                                resizeMethod='cover'
                                                />  
                                             <Text   
                                                style ={{fontSize:10}}
                                                className="font-black text-xs   text-white">
                                                {item.name.slice(0,15)}  
                                            </Text>
                                 </TouchableOpacity>
                               
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
        className="absolute  b g-[#162142]   flex- row justify-center items-center rounded-xl "
        > 
                         <View
                              className="w- [100%] h- [15%] p-2 4 flex-col  justify-center b g-[#0f0830] items-center ">
                                    <Text 
                                        style ={{fontSize:11 ,fontStyle:"italic"}}
                                        className="text-xl font-black -auto text-white"> 
                                       {' '}{data.length} 
                                    </Text>
                                    <Text 
                                        style ={{fontSize:9 ,fontStyle:"italic"}}
                                        className="text-xl font-black -auto text-yellow-500"> 
                                           ELIMINEES
                                    </Text>
                        </View>
                        <FlatList
                                data={data}
                                ref={flatList}
                                extraData={data}
                                keyExtractor={(item) => item._id}
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
                                <View
                                className = "flex-col absolute h -7 left-2  top-1 justify-start items-center">
                                    <Image
                                        source={getIcon(talentRoom.name)}
                                        className = "w-5 h-5"
                                        />
                                    <Text 
                                        style ={{fontSize:7}}
                                        className="text-xl font-black  text-white"> 
                                            {talentRoom.name} 
                                    </Text>
                                </View>

                                <View
                                className = "flex-col absolute h -7 right-2  top-1 justify-start items-center">
                                  
                                    <Image
                                        source={getIcon(talentRoom.region)}
                                        className ="w-5 h-5"
                                        />
                                    <Text  
                                        style ={{fontSize:7}}
                                        className="text-xl font-black  text-white"> 
                                            {talentRoom.region} 
                                    </Text>
                                </View>
         
        </View>
      )
    }