import { View, Text, Platform, FlatList, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { icons } from '../../constants';
import { getIcon, getStageLogo, getTimeLapse } from '../../helper';
import { router } from 'expo-router';

export default function CentralContestantPlayer({selectedContestant ,data, w,h , top ,user,  setSelectedContestant , selectedPostIndex,isScrolling,
    setSelectedPerformance , setIsPlaying , isPlaying ,player}) {
       
        const flatList = useRef()
        const [viewableItems, setViewableItems] = useState([]);
        const {width ,height} = useWindowDimensions()

        
        // const onViewableItemsChanged = useRef(({ viewableItems }) => {
        //   if (viewableItems.length > 0) {
        //     const currentItem = viewableItems[0].item;
        
        //     setSelectedPerformance(currentItem);
        
        //     // Optional: auto play when visible
        //     setIsPlaying(true);
        //   }
        // });

        const onViewableItemsChanged = useRef(({ viewableItems }) => {
          if (!viewableItems || viewableItems.length === 0) return;
        
          // pick the item with highest visibility
          const mostVisible = viewableItems.reduce((prev, current) =>
            prev.itemVisiblePercent > current.itemVisiblePercent ? prev : current
          );
          setSelectedPerformance(mostVisible.item);
        });

       
          
    
        // useEffect(() => {
        //   if(viewableItems.length > 0 && !selectedContestant && !isScrolling) {
        //     setParticipantTrackerId(viewableItems[0].item._id)
        //   }
        // }, [viewableItems])
    
    
        // useEffect(() => {
           
        //     setTimeout(() => {
        //       participantTrackerId &&  flatList.current &&  flatList.current.scrollToIndex({
        //             index: selectedPostIndex,
        //             animated:false
        //           });
        //           setIsScrolling(false)
        //     }, 0);
        // }, [selectedPostIndex])
    
      
        
    
        // const contestant = selectedContestant data.find(p => p._id === participantTrackerId)
    
        
        const renderItem = ({ item ,index }) => (
            <View
            className ="p- 2 b g-[#000000] rounded-3xl black  justify-center  items-center" 
            style ={{ 
                height: w ,
                width : w
               }}
            >
                <TouchableOpacity
                     onPress={
                      () =>  {
                    
                         (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )

                     }}
                      style ={{ 
          
                    }}
                      className="min w-[100%] h-[100%]   b g-black border- borde-[white] flex-col justify-center items-center rounde gap-  ">
                      
                      <View
                          className=" flex-col w-[100%] h-[100%] k opacity-100 rounded-lg justify-center items-center gap- 1 ">
                         
                        
    
                              <View
                              className=" flex-col justify-center items-center ">
                                   <Image
                                   style={{width:w - w * 0.1 , height:w - w * 0.1}}
                                    className="w-[100%] h-[100%]  shadow-lg elevation-2xl rounded-full"
                                    source={{uri:item.thumbnail?.publicUrl ||  "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                    resizeMethod='contain' /> 
                                    <Image
                                    className="absolute w-10 h-10 rounded-xl"
                                    source={icons.play} 
                                    resizeMethod='cover' /> 
                            
                                
                               
                              </View>

                              <View
                                    className="absolute bottom-0 left-0 flex-row justify-center  items-center gap-2 ">
                                                    <Text 
                                                    style ={{fontSize:w/25}}
                                                    className="text -xl text-center p-0 font-black text-[#464749]"> 
                                                   
                                                        <Text 
                                                          style ={{fontSize:w/25}}
                                                          className="tex t-xl  font-black text-white"> 
                                                          {index == 0 ? "Recent" : "Previous"}  
                                                        </Text>
                                                    </Text>
                                        
                                                 
                                   </View>
                                   <View
                                    className=" absolute top-0 right-0 flex-row justify-start items-center gap-2 ">
                                                  <Text 
                                                    style ={{fontSize:w/30}}
                                                    className="tex t-xl  font-black text-white"> 
                                                       {getTimeLapse(item.date)}
                                                       <Text 
                                                        style ={{fontSize:w/32}}
                                                        className="tex t-xl  font-black text-white"> 
                                                        {' '} ago
                                                      </Text>
                                                  </Text>
                                    </View>
                
                      </View>
                 </TouchableOpacity>
             </View>
       )


      return (
        <View
      
        style={{
          
          // position: !isPlaying ? "absolute" : "relative",
          height: h ,
          width:  w,
          // top : Platform.OS == "ios" ?  w * 0.24 + top + 1 : w * 0.24 + 50 + 1 
          }}
        className="absolute  b g-[#162142]  flex- row justify-between items-center  rounded-xl "
        > 
                        <View
                          style={{
                            minHeight : (h-w)/2 ,
                            width : w
                          }}
                          className ="flex-col p-4 mb- 12  justify-center gap-4 b g-white items-center"
                        >
                                <View
                                    className ="flex-row border-b border-[gold] p-2 mb- 12 justify-center gap-8 b g-white items-center">
                                   <Text 
                                                    style ={{fontSize:w/20}}
                                                    className="text -xl text-center p-0 font-black text-[#59a5ed]"> 
                                                        Performances :{' '}
                                                        <Text 
                                                          style ={{fontSize:w/20}}
                                                          className="tex t-xl  font-black text-white"> 
                                                          {data.length}  
                                                        </Text>
                                                    </Text>
                                </View>

                                

                        </View>
                        <View
                        className = "flex-1 b g-white justify-center items-center">
                            <FlatList
                                    data={data}
                                    ref={flatList}
                                    // extraData={data}
                                    keyExtractor={(item, index) =>
                                      item.video?.fileId || index.toString()
                                    }                                    
                                    renderItem={renderItem}
                                    removeClippedSubviews={true} 
                                    scrollEventThrottle = {16}
                                    showsHorizontalScrollIndicator ={false}
                                    pagingEnabled 
                                    horizontal={true}
                                    onViewableItemsChanged={onViewableItemsChanged.current}
                           
                                    viewabilityConfig={{
                                        itemVisiblePercentThreshold: 70, 
                                      }}
                                    getItemLayout={(data, index) => (
                                        { length: w, offset: w * index, index }
                                      )}
                                    
                                  /> 
                        </View>

                         
                        <TouchableOpacity
                                    style={{
                                      minHeight: (h-w)/2 ,
                                      width : w
                                    }}
                                     className="w-[100%]  flex-row justify-start  items-end gap-2 ">
                                            <Image
                                                style =
                                                {{
                                                  height: h * 0.1,
                                                  width : h * 0.1,
                                                }}
                                                source={{uri:selectedContestant.profile_img}}
                                                className ="mb-4 rounded-full"
                                                resizeMethod='cover'
                                                />  
                                             <Text   
                                                style ={{fontSize:w/27}} 
                                                className="font-black mb-5  text-white">
                                                {selectedContestant.name?.slice(0,15)}  
                                            </Text>
                                            <View
                                              className="mb-5 ml-auto  flex-row justify-center  items-center gap-2 ">
                                                              <Text  
                                                              style ={{fontSize:9}}
                                                              className="text -xl text-center p-0 font-black text-gray-300"> 
                                                                  Votes {''}
                                                                  <Text 
                                                                    style ={{fontSize:10}}
                                                                    className="tex t-xl  font-black text-white"> 
                                                                    {selectedContestant.votes }
                                                                  </Text> 
                                                              </Text>
                                            </View>
                                            <View
                                              className="mb-5 flex-row justify-start items-center gap-2 ">
                                                            <Text 
                                                                  style ={{fontSize:9}}
                                                                  className="text -xl text-ce nter  p-0 font-black text-gray-300"> 
                                                                  {selectedContestant.rank < 4 ? "Top" :"Ranked"}{' '}
                                                                  <Text 
                                                                      style ={{fontSize:10}}
                                                                      className="tex t-xl  font-black text-white"> 
                                                                      {selectedContestant.rank}
                                                                  </Text>
                                                              </Text>
                                            </View>
                         </TouchableOpacity>
                              
        </View>
      )
    }