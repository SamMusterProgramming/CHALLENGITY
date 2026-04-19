import { View,  useWindowDimensions, FlatList } from 'react-native'
import React, {  useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';

import { getFavouriteStages, getRegionTalentStages, getTopTalents, getUserTalent} from '../../apiCalls';

import UserTalentEntry from '../talent/UserTalentEntry';
import StageSelector from '../custom/StageSelector';
import Performances from '../talent/performances';
import Favourites from '../talent/favourites';




export default function Talent() {
    const {user, userTalents, setUserTalents, userTalentPerformances ,globalRefresh ,setGlobalRefresh, globalSelectedRegion,
          setRegionStages , setUserTalentPerformances , notifications, topTalents,
          setFavouriteStages ,setTopTalents
    } = useGlobalContext()

    const sections = [
      { id: "Performances" },
      { id: "stageSelector" },
    ];

    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
    const [section, setSection] = useState(1);
    const [displayTalent, setDisplayTalent] = useState(userTalents)
    const [refresh , setRefresh] = useState(false)
    const [loaded , setLoaded] = useState(false)
    const [displayData, setDisplayData] = useState(null);
    const [index, setIndex] = useState(2);
    const [data , setData] = useState(null)

  
    const handleRefresh = () =>{
      setRefresh(true)
      getUserTalent( user._id , setUserTalents )
      getTopTalents(user._id , setTopTalents)
      setTimeout(() => {
         setRefresh(false)
      }, 1000);
    }
   
    // useEffect(() => {
    //   if(globalRefresh){
    //     getUserTalent( user._id , setUserTalents )
    //     setGlobalRefresh(false)
    //   }
    // }, [globalRefresh])


    useEffect(() => {
      if (!globalRefresh) return;
      console.log("refreshing ... ")
      const fetchData = async () => {
        try {
          await Promise.all([
            getUserTalent(user._id , setUserTalents),
            getFavouriteStages(user._id, setFavouriteStages),
            getRegionTalentStages(globalSelectedRegion,setRegionStages),
          ]);
        } catch (error) {
          console.error("Error refreshing data:", error);
        } finally {
          setGlobalRefresh(false);
        }
      };
      fetchData();
    }, [globalRefresh])
    
  

    
   
    
  
    return (
      <>
     <View
      className="flex-1 w-[100%] bg-black">
      <FlatList
            data={sections}
            extraData={globalRefresh} 
            renderItem={({ item }) =>
              item.id === "Performances" ? (
                <Performances user={user} />
              ) : (
                <Favourites user={user} />
              )
            }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: "black",
              paddingBottom: 40,
            }}
            keyboardShouldPersistTaps="handled"
            
          />
     </View>

   </>
    )
  }