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


//***********************************************/
  
 



  useEffect(() => {
        if(finishPlaying){
          setPlayingIndex(prev => (prev + 1) % contestantList.contestants.length )
          setFinishPlaying(false)
        }
    }, [finishPlaying])
 
    const handleRefresh =()=> {
        GetTalentRoomById(talentRoom_id , setTalentRoom)       
        setContestantList(null)
      }



  return (
    
    <View
    style={{paddingTop:insets.top , paddingBottom:insets.bottom }}
    className="flex-1 bg-primary justify-center items-center ">
        {talentRoom && contestantList && (
            
                <TalentPlayer
                isVisible={true}
                setFinishPlaying={setFinishPlaying}
                key={playingIndex} 
                index={playingIndex}
                contestant={contestantList.contestants[playingIndex]}
                handleRefresh={handleRefresh}
                status="open"
                talentRoom={talentRoom}
                setPlayingIndex={setPlayingIndex}
                numberOfContestants={contestantList.contestants.length}
                setTalentRoom ={setTalentRoom}
                />
               
        )}
    </View>
  )
}