import { View, Text, Platform, FlatList, TouchableOpacity, Image, useWindowDimensions, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { icons } from '../../constants';
import { getIcon, getStageLogo, getTimeLapse } from '../../helper';
import { router } from 'expo-router';
import UserCard from './UserCard';


/* ---------------- MAIN CAROUSEL ---------------- */



export default function CentralContestantPlayer({
         selectedContestant ,data, width,height , top , left, right ,user,
         setSelectedContestant , selectedPostIndex,isScrolling,
         setSelectedPerformance , scrollToIndex ,CAROUSSEL_HEIGHT,  setIsPlaying , 
         isPlaying ,player , updatePerformanceIndex }) {
       
        const flatList = useRef()
        const [viewableItems, setViewableItems] = useState([]);
       

        const MAIN_ITEM_WIDTH = width * 0.35;
        const MAIN_ITEM_MARGIN = 2;
        const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
        const SIDE_SPACING = (width - MAIN_ITEM_WIDTH) / 2;


        const mainScrollX = useRef(new Animated.Value(0)).current;


        const onViewableItemsChanged = useRef(({ viewableItems }) => {
          if (!viewableItems || viewableItems.length === 0) return;
        
          const mostVisible = viewableItems.reduce((prev, current) =>
            prev.itemVisiblePercent > current.itemVisiblePercent ? prev : current
          );
          setSelectedPerformance(mostVisible.item);
        });

    
        
        const renderItem = useCallback(({ item ,index }) => {
          const inputRange = [
            (index - 1) * MAIN_SNAP_INTERVAL,
            index * MAIN_SNAP_INTERVAL,
            (index + 1) * MAIN_SNAP_INTERVAL,
          ];
        
          const scale = mainScrollX.interpolate({
            inputRange,
            outputRange: [0.65, 1, 0.65], // ✅ symmetric
            extrapolate:  "clamp",
          });
        
          const opacity = mainScrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });
          const translateY = mainScrollX.interpolate({
            inputRange,
            outputRange: [-20, 0, -20],
            extrapolate: "clamp",
          });
        

          return (
          <Animated.View
            style={{
              width: MAIN_ITEM_WIDTH,
              marginHorizontal: MAIN_ITEM_MARGIN,
              transform: [{ scale },{ translateY }],
              opacity
            }}
            className ="flex-row justify-center  items-center"
           >
          
                <TouchableOpacity
                     onPress={
                      () =>  {
                    
                         (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )

                     }}
                      style ={{ 
          
                    }}
                      className="min  w-[100%] h-[70%]   b g-black border- borde-[white] flex-col justify-center items-center   ">
                                   
                                   <Image
                                    style={{width:  "100%" , height: "100%"}}
                                    className=" opacity-50 shadow-lg elevation-2xl rounded-xl"
                                    source={{uri:item.thumbnail?.publicUrl ||  "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                    resizeMethod='contain'
                                    cachePolicy="memory-disk"
                                     /> 
                                     <View
                                    className="p-2 flex-row justify-between w-[100%] gap-1"
                                    >
                                        <Text 
                                                        style ={{fontSize:width/59}}
                                                        className="p- 2 text-center rounded-xl bg-rgba(0 ,0 ,0 , 0.7) font-black text-[#464749]"> 
                                                      
                                                            <Text 
                                                              style ={{fontSize:width/65}}
                                                              className="tex t-xl  font-black text-gray-100"> 
                                                              {index == 0 ? "Latest" : "Previous"}  
                                                            </Text>     
                                        </Text>
                                        <Text 
                                                        style ={{fontSize:width/65}}
                                                        className=" p- 2 text-center bg- black font-black text-gray-100"> 
                                                          {getTimeLapse(item.date)}
                                                          <Text 
                                                            style ={{fontSize:width/65}}
                                                            className="t font-black text-gray-100"> 
                                                            {/* {' '} ago */}
                                                          </Text>
                                        </Text>
                                    </View>
                                    <Image
                                    className="absolute w-10 h-10 opacity-50 rounded-xl"
                                    source={icons.play} 
                                    resizeMethod='cover' /> 

                                    
                 </TouchableOpacity>
                 </Animated.View>
       )}, [isPlaying]);



       const handleScrollEnd = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / SNAP_INTERVAL);
        
      };
    
      useEffect(() => {
        if (flatList.current) {
          flatList.current.scrollToOffset({
            offset: scrollToIndex * MAIN_SNAP_INTERVAL, 
            animated:false,          
          });
        }
      }, [scrollToIndex]);  

      
      // useEffect(() => {
      //   if (flatList.current && data?.length > 0) {
      //     flatList.current.scrollToOffset({
      //       offset: 0, 
      //       animated: false,
      //     });
      //     setSelectedPerformance(data[0]); 
      //   }
      // }, [data]);
      


      return (
        <View
      
        style={{
          
          opacity: !isPlaying ? 1 : 0,
          height: height ,
          width: width,
          top:top,
          left:left
          }}
        className="absolute  bg- white  flex-col  justify-start items-center  rounded-xl "
        > 
  

                            
                
                         
                          <View
                          style ={{height:CAROUSSEL_HEIGHT}}
                          className ="flex- 1 w-[100%] h- [100%] b g-[#353434] items-center justify-center b g-[#9f9b9b]">
                            {/* <Animated.FlatList
                                        data={data}
                                        ref={flatList}
                                      
                                        keyExtractor={(item, index) =>  
                                          item.video?.fileId || index.toString()
                                        }                                    
                                        renderItem={renderItem}
                                        removeClippedSubviews={true} 
                                        scrollEventThrottle = {16}
                                        showsHorizontalScrollIndicator ={false}
                                   
                                        horizontal={true}
                                        onViewableItemsChanged={onViewableItemsChanged.current}
                                        decelerationRate="fast"
                                        bounces={false}
                                        viewabilityConfig={{
                                            itemVisiblePercentThreshold: 40, 
                                          }}
                                          getItemLayout={(data, index) => ({
                                            length: MAIN_SNAP_INTERVAL,
                                            offset: MAIN_SNAP_INTERVAL * index,
                                            index,
                                          })}
                                       

                                          contentContainerStyle={{
                                            paddingHorizontal: SIDE_SPACING, 
                                            alignItems: 'center',           
                                          }}
          
                                        snapToInterval={MAIN_SNAP_INTERVAL}
                                      
                                        onScroll={Animated.event(
                                            [{ nativeEvent: { contentOffset: { x: mainScrollX } } }],
                                            { useNativeDriver: true }
                                            )}
                                        
                                      />  */}
                                    <Animated.FlatList
                                        data={data}
                                        ref={flatList}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        snapToInterval={MAIN_SNAP_INTERVAL}
                                        decelerationRate="fast"
                                        getItemLayout={(data, index) => ({
                                          length: MAIN_SNAP_INTERVAL,
                                          offset: MAIN_SNAP_INTERVAL * index,
                                          index,
                                        })}
                                        contentContainerStyle={{ paddingHorizontal: SIDE_SPACING }}
                                        onScroll={Animated.event(
                                          [{ nativeEvent: { contentOffset: { x: mainScrollX } } }],
                                          { useNativeDriver: false } // must be false for JS index calculation
                                        )}
                                        scrollEventThrottle={16}
                                        onMomentumScrollEnd={(event) => {
                                          const offsetX = event.nativeEvent.contentOffset.x;
                                          const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
                                          setSelectedPerformance(data[index]);
                                          updatePerformanceIndex(selectedContestant._id,index)
                                        }}
                                        renderItem={renderItem}

                                        initialNumToRender={2}
                                        maxToRenderPerBatch={2}
                                        windowSize={3}
                                        removeClippedSubviews={true}
                                        updateCellsBatchingPeriod={50}
                                      />

                                    <Text 
                                      style ={{fontSize:width/45 , 
                                        // color:"#d1d5db", 
                                        marginTop: 0,
                                      }}
                                      className=" font-semibold mb- 8 text-[#e49336]">Performances :{' '}
                                        <Text 
                                            style ={{fontSize:width/45}}
                                            className="tex t-xl  font-black text-[#e49336]"> 
                                                {data.length}
                                        </Text>
                                        
                                    </Text>
                          </View>


                       
                              
        </View>
      )
    }