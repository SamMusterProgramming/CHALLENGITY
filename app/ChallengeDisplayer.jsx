import { View, Text, FlatList, Button, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/GlobalProvider'
import { router, useLocalSearchParams } from 'expo-router'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Post from '../components/Post'
import Player from '../components/Player'
import { getChallengeById } from '../apiCalls'
import { sortChallengeByVotes } from '../helper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { icons } from '../constants'

export default function ChallengeDisplayer() {

    const {user,setUser,userChallenges,setUserChallenges,
        participateChallenges,setParticipateChallenges} = useGlobalContext()
    const[challenge,setChallenge] = useState(null)
    const[isExpired,setIsExpired] = useState(false)

    const {challenge_id} =  useLocalSearchParams();
    const swiperRef = useRef('')
    const [viewableItems, setViewableItems] = useState([]);
    const [finishPlaying ,setFinishPlaying] = useState(false)



    useEffect(() => {
        if (challenge_id) {
          getChallengeById(challenge_id,setChallenge,setIsExpired)
        }
        return () => {
          setChallenge(null)
        };
      }, [])
    
    useEffect(() => {
       challenge && sortChallengeByVotes(challenge.participants)
      }, [challenge])

    const onViewableItemsChanged = ({ viewableItems }) => {
        setViewableItems(viewableItems);
      };
      useEffect(() => {
         setFinishPlaying(false)
      }, [viewableItems])

    const renderItem = ({ item, index }) => {
        const isVisible = viewableItems.some(viewableItem => viewableItem.index === index);
        // setFinishPlaying(false)
        return  <Player
         isVisible={isVisible}
         setFinishPlaying={setFinishPlaying}
         key={item._id} 
         index={index}
         participant={item}
         challenge={challenge} 
          />
      };

    useEffect(() => {
        if(finishPlaying){
          if (swiperRef.current) {
            const currentIndex = swiperRef.current.getCurrentIndex();
            swiperRef.current.scrollToIndex({ index: ((currentIndex + 1) % challenge.participants.length) });
          }
        }
      }, [finishPlaying])

    useEffect(() => {
     challenge && console.log(challenge.participants)
      }, [challenge])



  return (
 
    <SafeAreaView className="flex-1  bg-primary  ">
       {/* <View className=""> */}
       {challenge &&  (
            <SwiperFlatList
            // style={{width:'100vw' ,height:'100vh'}}
            ref={swiperRef}
            data = {challenge.participants}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            // autoplayDelay={5}
            // autoplayLoop
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70, 
            }}
            // viewabilityConfig={{itemVisiblePercentThreshold:70}}
            // contentInset={{y:170}}
            // ListHeaderComponent={
            //   <Text className="text-white">
            //     azulk fellak
            //   </Text>
            // }
            scrollEventThrottle={15}
            pagingEnabled
            horizontal
            />
       )}  

       {isExpired && (
        <View className="w-[100%] h-[100%] bg-primary flex-col justify-center items-center">
             <View className=" bg-primary flex-row gap-4 justify-center items-center">
               <Text className="text-white text-xl">
                 Challenge Expired
               </Text>
         
               <TouchableOpacity
                  onPress={()=> {router.back()}}
                  className="w-14 h-14" > 
                   <Image 
                     source={icons.back}
                     className="w-14 h-14"
                     resizeMethod='contain'
                   />
               </TouchableOpacity>
             </View> 
        </View>
       )}
          
      {/* </View> */}
     </SafeAreaView>
   
   
  )
}