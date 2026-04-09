import { View, Text,  TouchableOpacity, Image, useWindowDimensions, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { memo,  useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import { getTopTalents, getUserTalent, getUserTalentPerformances } from '../../apiCalls';
import TalentPage from '../../components/talent/TalentPage';
import Post from '../post/Post';
import UserTalentEntry from '../talent/UserTalentEntry';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



export default function Talent() {
    const {user, userTalents, setUserTalents, userTalentPerformances ,globalRefresh ,setGlobalRefresh, setUserTalentPerformances , notifications, topTalents
        ,setTopTalents
    } = useGlobalContext()
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
   
    useEffect(() => {
      if(globalRefresh){
        getUserTalent( user._id , setUserTalents )
        setGlobalRefresh(false)
      }
    }, [globalRefresh])
    
  
    useEffect(() => {
        data && setDisplayData(data.slice(0,index))
    }, [data])

    useEffect(() => {
      let d = []
      switch (section) {
          case 1:
               userTalents.forEach(el => {
                  d.push({...el ,dataType:"talent"})
               })
              break;
          case 2:
               topTalents.forEach(el =>{
                  d.push({...el ,dataType:"talent"})
               })
              break;
        //   case 3:
        //       topTalents.forEach(el =>{
        //           d.push({...el ,dataType:"talent"})
        //        })
        //       break;
          default:
            break;
      }
      setData(d)
      setDisplayData(null)
      setIndex(2)
    }, [section,userTalents])

    
    const loadMoreData = () => {
      let newData = data.slice(index , index + 2);
      setDisplayData([...displayData, ...newData]);
      setIndex(index + 2);
    }
    
  
    return (
      <>
       <View 
    className="bg-black   w-[100%] flex-col px- 2 py-2 mt- 1 mb- 1 shadow-md round ed-xl">
         
      
    </View>

      <View
       className=" flex-1 h- [100%] flex-col justify-start items-center  py- 2 b g-[#898888]"
       >
            <View className="min-w- [100vw] flex-1    rounded- xl bg-[#000000] [#deddd9] [#6a7c83]">
                        <FlatList
                          data={ displayData && displayData }
                          keyExtractor={(item) => item._id}
                          renderItem = {
                              (
                              ({item ,index}) => {
                            return <UserTalentEntry  key={index} userTalent={item} width={width} user={user} userProfile={user} activity={section == 1 ?true :false}/>
                                         }
                                        )
                                      }

                            //  ListFooterComponent={section == 3 &&  (
                            //             <View
                            //             style = {{height:height * 0.68}}
                            //             className="fle x-1 h- [600]">
                            //                 <TalentPage/>
                            //             </View>
                            //               )}

                          scrollEnabled ={section == 3 ? false : true} 
          
                          removeClippedSubviews = {true} 
                          onEndReached = {  displayData && loadMoreData } 
                          scrollEventThrottle={16} 
                          showsHorizontalScrollIndicator={false} 
                          showsVerticalScrollIndicator={false} 
                        />
            </View>
      </View>
  
   </>
    )
  }