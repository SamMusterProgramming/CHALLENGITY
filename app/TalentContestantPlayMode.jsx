import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { createTalentRoom, GetTalentRoomById } from '../apiCalls';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TalentPlayer from '../components/talent/TalentPlayer';
import { Gesture, GestureDetector} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
// import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function TalentContestantPlayMode() {
  const {talentRoom_id } = useLocalSearchParams();
  const [talentRoom, setTalentRoom] = useState(null)
  const [edition , setEdition] = useState(null)
  const [contestantList, setContestantList] = useState(null)
  const insets = useSafeAreaInsets();
  const [viewableItems, setViewableItems] = useState([]);
  const [finishPlaying ,setFinishPlaying] = useState(false)
  const [currentIndex,setCurrentIndex] = useState(0)
  const flatListRef = useRef()
  const [playingIndex,setPlayingIndex] = useState(0)



//*********************initialising phase , getting data from server */
  useEffect(() => {
  GetTalentRoomById(talentRoom_id , setTalentRoom)
  }, [])
  
  useEffect(() => {
    if(talentRoom){
        setContestantList({contestants:talentRoom.contestants})
    }
}, [talentRoom])


//********************************************** f;at list set up , function */
  
  const onViewableItemsChanged = ({ viewableItems }) => {
       setViewableItems(viewableItems);
    };

  useEffect(() =>{
        setFinishPlaying(false)
       if (talentRoom) for(let i=0 ; i < contestants.length ; i++) {
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
         handleRefresh={handleRefresh}
         status="open"
         talentRoom={talentRoom}
          />
      };

  useEffect(() => {
        if(finishPlaying){
          if (flatListRef.current) {
             flatListRef.current?.scrollToIndex({ index: ((currentIndex + 1) % contestants.length) });
          }
        }
    }, [finishPlaying])
 
    const handleRefresh =()=> {
        GetTalentRoomById(talentRoom_id , setTalentRoom)       
      }

    const pan = Gesture.Tap()
      .onEnd((event , sucess) => {
        if(sucess) {
            runOnJS(myJavaScriptFunction)();
        }
        const swipeThreshold = 50; // Adjust as needed
        
    });
  
    const myJavaScriptFunction = (event) => {
        if (event.translationX > swipeThreshold) {
            // Swiped right - play previous video
            setPlayingIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : contestantList.contestants.length - 1
            );
          } else if (event.translationX < -swipeThreshold) {
            // Swiped left - play next video
            setPlayingIndex((prevIndex) =>
              prevIndex < contestantList.contestants.length - 1 ? prevIndex + 1 : 0
            );
          }
      };

  return (
    
    <View
    style={{paddingTop:insets.top , paddingBottom:insets.bottom }}
    className="flex-1 bg-primary justify-center items-center ">
        {talentRoom && contestantList && (
            //  <FlatList
            //  ref={flatListRef}
            //  nestedScrollEnabled={true}
            //  data={contestants}
            //  keyExtractor={(item) => item._id}
            //  renderItem={renderItem}
            
            //  onViewableItemsChanged={onViewableItemsChanged}
            //  viewabilityConfig={{
            //    itemVisiblePercentThreshold: 70, 
            //  }}
           
            //  scrollEventThrottle={15}
            //  pagingEnabled
            //  horizontal
            //  />
            <GestureDetector gesture={pan}>
              <View collapsable={false}>
                <TalentPlayer
                isVisible={true}
                setFinishPlaying={setFinishPlaying}
                key={playingIndex} 
                index={playingIndex}
                contestant={contestantList.contestants[playingIndex]}
                handleRefresh={handleRefresh}
                status="open"
                talentRoom={talentRoom}
                />
             </View>
            </GestureDetector>
        )}
    </View>
  )
}