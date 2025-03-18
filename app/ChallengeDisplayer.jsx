import { View, Text, FlatList, Button, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/GlobalProvider'
import { router, useLocalSearchParams } from 'expo-router'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Player from '../components/challenge/Player'
import { getChallengeById } from '../apiCalls'
import { sortChallengeByVotes } from '../helper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { icons } from '../constants'
import ChallengeExpired from '../components/challenge/ChallengeExpired'




export default function ChallengeDisplayer() {

    const {user,setUser,userChallenges,setUserChallenges,
        participateChallenges,setParticipateChallenges} = useGlobalContext()
    const[challenge,setChallenge] = useState(null)
    const[isExpired,setIsExpired] = useState(false)

    const {challenge_id} =  useLocalSearchParams();
    const swiperRef = useRef('')
    const [viewableItems, setViewableItems] = useState([]);
    const [finishPlaying ,setFinishPlaying] = useState(false)
    const [index,setIndex] = useState(1)
    const [displayData, setDisplayData] = useState([])



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
       challenge && setDisplayData(challenge.participants.slice(0,1))
      }, [challenge])

    const onViewableItemsChanged = ({ viewableItems }) => {
        setViewableItems(viewableItems);
      };
      useEffect(() =>{
         setFinishPlaying(false)
      }, [viewableItems])

    const renderItem = ({ item, index }) => {
        const isVisible = viewableItems.some(viewableItem => viewableItem.index === index);
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


      const loadMoreData = () => {
        console.log("here swipe")
        const newData = challenge.participants.slice(index, index + 1);
        setDisplayData([...displayData, ...newData]);
        setIndex(index + 1);
      };


  return (
 
    <SafeAreaView className="flex-1 bg-primary  ">

       {challenge &&  (
            <FlatList
            ref={swiperRef}
            data = {challenge.participants}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            onEndReached={loadMoreData}
            // autoplayDelay={5}
            // autoplayLoop
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70, 
            }}
            scrollEventThrottle={15}
            pagingEnabled
            horizontal
            />
       )}  

       {isExpired && (
          <ChallengeExpired challenge_id={challenge_id}/>
       )}

     </SafeAreaView>
   
   
  )
}