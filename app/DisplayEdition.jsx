import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { GetTalentRoomById } from '../apiCalls';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TalentPlayer from '../components/talent/TalentPlayer';

export default function DisplayEdition() {
  const {talentRoom_id , edition_id } = useLocalSearchParams();
  const [talentRoom, setTalentRoom] = useState(null)
  const [edition , setEdition] = useState(null)
  const [contestants, setContestants] = useState([])
  const insets = useSafeAreaInsets();
  const [viewableItems, setViewableItems] = useState([]);
  const [finishPlaying ,setFinishPlaying] = useState(false)
  const [currentIndex,setCurrentIndex] = useState(0)
  const flatListRef = useRef()


//*********************initialising phase , getting data from server */
  useEffect(() => {
  GetTalentRoomById(talentRoom_id , setTalentRoom)
  console.log(edition_id)
  }, [])
  
  useEffect(() => {
    if(talentRoom){
        const ed = talentRoom.editions.find( e => e._id == edition_id) 
        setEdition(ed)
        let c = []
        c.push(ed.winner)
        c.push(...ed.finalist)
        c.push(...ed.semi_finalists)
        c.push(...ed.quarter_finalists)
        setContestants([...c])
    }
}, [talentRoom])


//********************************************** f;at list set up , function */
  
  const onViewableItemsChanged = ({ viewableItems }) => {
       setViewableItems(viewableItems);
    };

  useEffect(() =>{
        setFinishPlaying(false)
       if (edition) for(let i=0 ; i < contestants.length ; i++) {
         if( viewableItems.some(viewableItem => viewableItem.index === i)) {
            setCurrentIndex(i);
            break;
         }
        }
     }, [viewableItems])
    
  const renderItem = ({ item, index }) => {
        const isVisible = viewableItems.some(viewableItem => viewableItem.index === index);
        return  <TalentPlayer
         isVisible={isVisible}
         setFinishPlaying={setFinishPlaying}
         key={item._id} 
         index={index}
         contestant={item}

          />
      };

  useEffect(() => {
        if(finishPlaying){
          if (flatListRef.current) {
             flatListRef.current?.scrollToIndex({ index: ((currentIndex + 1) % contestants.length) });
          }
        }
    }, [finishPlaying])


  return (
    
    <View
    style={{paddingTop:insets.top , paddingBottom:insets.bottom }}
    className="flex-1 bg-primary justify-center items-center ">
        {edition && (
             <FlatList
             ref={flatListRef}
             nestedScrollEnabled={true}
             data={contestants}
             keyExtractor={(item) => item._id}
             renderItem={renderItem}
            //  onEndReached={loadMoreData}
             // autoplay
             // autoplayDelay={5}
             // autoplayLoop
             onViewableItemsChanged={onViewableItemsChanged}
             viewabilityConfig={{
               itemVisiblePercentThreshold: 70, 
             }}
             // viewabilityConfig={{itemVisiblePercentThreshold:70}}
             // contentInset={{y:170}}
             scrollEventThrottle={15}
             pagingEnabled
             horizontal
             />
        )}
    </View>
  )
}