import { View, Text, FlatList, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MotiView } from 'moti'
import { icons } from '../../constants'
import { router } from 'expo-router'
import ShuffleLetters from '../custom/ShuffleLetters'

export default function CentralParticipantPlayer({selectedParticipant ,data, w,h , top ,user,  setSelectedParticipant , selectedPostIndex,isScrolling,
   setIsScrolling , setParticipantTrackerId ,challenge, participantTrackerId}) {

    const flatList = useRef()
    const [viewableItems, setViewableItems] = useState([]);
    
    const onViewableItemsChanged = ({ viewableItems }) => {
        setViewableItems(viewableItems);
        // console.log(viewableItems[0].index)
        // viewableItems.length > 0 && setParticipantTrackerId(viewableItems[0]._id)
      };

    useEffect(() => {
      if(viewableItems.length > 0 && !selectedParticipant && !isScrolling) {
        setParticipantTrackerId(viewableItems[0].item._id)
      }
    }, [viewableItems])


    useEffect(() => {
       
        setTimeout(() => {
            flatList.current &&  flatList.current.scrollToIndex({
                index: selectedPostIndex,
                animated:true
              });
              setIsScrolling(false)
        }, 100);
    }, [selectedPostIndex])

  
    

    const participant = data.find(p => p._id === participantTrackerId)

    
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
                    setSelectedParticipant(item)
                 }}
                  style ={{ 
      
                }}
                  className="min w-[100%] h-[100%] rounded-lg  b g-black border- borde-[white] flex-col justify-start items-center rounde gap-  ">
                 
                  <View
                      className=" flex-col w-[100%] h-[100%] -2 b g-black  h- 8 g-black opacity-100 rounded-lg justify-start items-center gap- 1 ">
                     
                          {/* <View
                          className="w- [100%] h- [15%] p-2 4 flex-col  justify-center bg-[#0f0830] items-center ">
                                <Text 
                                    style ={{fontSize:12 ,fontStyle:"italic"}}
                                    className="text-xl font-black -auto text-white"> 
                                    {challenge.participants.length} 
                                </Text>
                                <Text 
                                    style ={{fontSize:9 ,fontStyle:"italic"}}
                                    className="text-xl font-black -auto text-white"> 
                                       PARTICIPANTS
                                </Text>
                          </View> */}

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
                                <View
                                className="absolute top-8 left-4 flex-row justify-start items-center gap-2 ">
                                                <Text 
                                                style ={{fontSize:13}}
                                                className="text-xl text-center p-0 font-black text-white"> 
                                                    💙 
                                                </Text>
                                    
                                               <Text 
                                                style ={{fontSize:11}}
                                                className="text-xl  font-black text-white"> 
                                                {item.votes }
                                              </Text>
                               </View>
                             
                               <View
                                className="absolute right-4 top-8 flex-row justify-start items-center gap-2 ">
                                               <Text 
                                                    style ={{fontSize:13}}
                                                    className="text-xl text-ce nter  p-0 font-black text-red-400"> 
                                                    {item.rank < 4 ? "TOP" :"RK"}
                                                </Text>
                                
                                        
                                                <Text 
                                                    style ={{fontSize:13}}
                                                    className="text-xl  font-black text-white"> 
                                                    {item.rank}
                                                </Text>
                             </View>
                             <TouchableOpacity
                               onPress={()=> {router.navigate({ pathname: '/ViewProfile', params: {user_id:participant.user_id} })}}
                                 className="absolute bottom-0  h-24 left-2 flex-row justify-center mt- auto items-end gap-6 ">
                                        <Image
                                            source={{uri:item.profile_img}}
                                            className ="w-[40px] h-[40px] m- rounded-full"
                                            resizeMethod='cover'
                                            />  
                                         <Text   
                                            style ={{fontSize:12}}
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
    className="absolute  b g-[#162142]  shadow-lg flex- row justify-center items-center rounded-3xl "
    > 
                     <View
                          className="w- [100%] h- [15%] p-2 4 flex-col  justify-center bg-[#0f0830] items-center ">
                                <Text 
                                    style ={{fontSize:12 ,fontStyle:"italic"}}
                                    className="text-xl font-black -auto text-white"> 
                                    {challenge.participants.length} 
                                </Text>
                                <Text 
                                    style ={{fontSize:9 ,fontStyle:"italic"}}
                                    className="text-xl font-black -auto text-white"> 
                                       PARTICIPANTS
                                </Text>
                    </View>
                    <FlatList
                            // style={{width:"100%" ,height:"100%"}}
                            data={data}
                            ref={flatList}
                            extraData={data}
                            // numColumns={3}
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
     
    </View>
  )
}