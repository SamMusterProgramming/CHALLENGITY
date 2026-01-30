import { View, Text,  TouchableOpacity, Image, useWindowDimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { memo,  useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import { getTopTalents, getUserTalent, getUserTalentPerformances } from '../../apiCalls';
import TalentPage from '../../components/talent/TalentPage';
import Post from '../post/Post';
import UserTalentEntry from '../talent/UserTalentEntry';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



const RenderHeader =  memo(({user , setSection , section , refresh , handleRefresh}) => {
  
  return(
    <View 
    className="bg-black   w-[100%] flex-col px- 2 py-2 mt-1 mb- 1 shadow-md round ed-xl">
         
          <View className="b g-white w-[100%] mb-2 px- 1 flex-row justify-start items-end ">
              <View className="b g-white w- [100%] mb- 2 px-1 flex-col ">
                  <View className="mb- 2 gap-2 flex-row justify-start items-end">
                    <Text 
                    style={{fontSize:18 , color : "#edc153"}}
                    className=" font-black text-[#edc153]">Talent</Text>
                    <View
                    style={{ transform: [{ rotate: "180deg" }] , marginBottom : 2 }}>
                         <MaterialCommunityIcons name="star" size={28} color= "#edc153"  />
                    </View>
                  </View>
                  <Text 
                     style={{fontSize:9}}
                     className="tex t-sm font-bold text-gray-200"> User Talents & Contests
                  </Text>
              </View>
              <TouchableOpacity
                    onPress={handleRefresh}
                    className="justify-center ml-auto items-end pr-2 flex-row ">
                               {refresh ? (
                                  <ActivityIndicator size={35} />
                                ) : (
                                  <Ionicons name="refresh" size={30} color="#e8eced"  /> )}
              </TouchableOpacity>  
          </View>

          <View className="b g-[#303031] white w-[100%] flex-row justify-between items-center py-1 px-2 mb-2 gap-2 ">
                    
                      <TouchableOpacity
                      style ={{
                        backgroundColor : section !== 1 ? "#2e2e36": "#084573"
                      }}
                      onPress={()=> {setSection(1)}}
                      className="justify-center rounded-lg min-w-[33%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  bg-[#084573] flex-col">
                                                  
                                                  <View
                                                   className="flex-row justify-start gap-2 items-end ">
                                                      <Text 
                                                        style={{fontSize:section == 1 ? 9 :8,
                                                        fontStyle:"italic"
                                                          }}
                                                          className="font-black  text-white">
                                                            {user.name.split(' ')[0].slice(0,10)}{` ' s`}
                                                      </Text>  
                                                  </View>
                                                  <Text 
                                                    style={{fontSize:section == 1 ? 9 :8,
                                                    fontStyle:"italic",
                                                    color : section !== 1 ? "white": "white"
                                                      }}
                                                      className="font-black  text-[#079de3]">
                                                          Talent Entries 
                                                  </Text>  
                                                  <View
                                                    className="w- [30px] h- [30px] absolute bottom-2 left-1 rounded-full b g-white">
                                                        <MaterialCommunityIcons name="medal" size={20} color= "gold"  />
                                                  </View>
                                                  <View className="absolute bottom-2 right-2 " >
                                                          <Image
                                                            style={{width:15 ,height:15}}
                                                            className="w-[30px] h-[30px]  rounded-full b g-white"
                                                            source={section == 1 ? icons.down_arrow : icons.up_arrow }
                                                            resizeMethod='cover' />  
                                                  </View>
                                                 
                      </TouchableOpacity>
                      <TouchableOpacity 
                      style ={{
                        backgroundColor : section !== 2 ? "#2e2e36": "#084573"
                      }}
                       onPress={()=> {setSection(2)}}
                       className="justify-center rounded-lg w-[33%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  bg-[#245b92] flex-col">
                                                  <View
                                                   className="flex-row justify-start gap-2 items-end ">
                                                     
                                                      <Text 
                                                        style={{fontSize:section == 2 ? 9 :8,
                                                        fontStyle:"italic"
                                                          }}
                                                          className="font-black  text-white">
                                                              Explore
                                                      </Text>  
                                                  </View>
                                                  
                                                  <Text 
                                                    style={{fontSize:section == 2 ? 9:8,
                                                    fontStyle:"italic",
                                                    color : section !== 2 ? "white": "white"
                                                      }}
                                                      className="font-black  text-white">
                                                         Top Contests
                                                  </Text>  
                                                  <View
                                                    className="w- [30px] h- [30px] absolute bottom-2 left-1 rounded-full b g-white">
                                                        <MaterialCommunityIcons name="star-shooting" size={20} color= "gold"  />
                                                  </View>
                                                  <View className="absolute bottom-2 right-2 " >
                                                          <Image
                                                            style={{width:15 ,height:15}}
                                                            className="w-[30px] h-[30px]  rounded-full b g-white"
                                                            source={section == 2 ? icons.down_arrow : icons.up_arrow }
                                                            resizeMethod='cover' />  
                                                  </View>

                      </TouchableOpacity>
                      <TouchableOpacity 
                      style ={{
                        backgroundColor : section !== 3 ? "#2e2e36": "#084573"
                      }}
                       onPress={()=> {setSection(3)}}
                       className="justify-center rounded-lg w-[30%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  bg-[#079de3] flex-col">
                                                  <View
                                                   className="flex-row justify-start gap-2 items-end ">
                                                     
                                                      <Text 
                                                        style={{fontSize:section == 3 ? 9 :8,
                                                        fontStyle:"italic"
                                                          }}
                                                          className="font-black  text-white">
                                                              Explore 
                                                      </Text>  
                                                  </View>
                                                  
                                                  <Text 
                                                    style={{fontSize:section == 3 ? 9 :8,
                                                    fontStyle:"italic",
                                                    color : section !== 3 ? "white": "white"
                                                      }}
                                                      className="font-black  text-[#079de3]">
                                                         Talent Rooms
                                                  </Text>  
                                                  <View
                                                    className="w- [30px] h- [30px] absolute bottom-2 left-1 rounded-full b g-white">
                                                        <MaterialCommunityIcons name="theater" size={20} color= "gold"  />
                                                  </View>
                                                  <View className="absolute bottom-2 right-2 " >
                                                          <Image
                                                            style={{width:15 ,height:15}}
                                                            className="w-[30px] h-[30px]  rounded-full b g-white"
                                                            source={section == 3 ? icons.down_arrow : icons.up_arrow }
                                                            resizeMethod='cover' />  
                                                  </View>
                      </TouchableOpacity>
                     
          </View>
    </View>
  )
})



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
    
    // useFocusEffect(
    //   useCallback(() => {
    //     setSelectedBox(1)
    //     setDisplayData(userTalents.slice(0,index))
  
   
    //       return () => {
 
    //         setDisplayData(null)
    //         setIndex(2)
    //         setSelectedBox(0)
    //       };
    //   }, [])
    // );
  
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
    //   <>
    //   {displayData && ( 
      <View
       className=" flex-1 h- [100%] flex-col justify-start items-center py- 2 b g-[#898888]"
       >
            <View className="min-w-[100vw] flex-1    rounded- xl bg-[#000000] [#deddd9] [#6a7c83]">
                        <FlatList
                          data={ displayData && displayData }
                          keyExtractor={(item) => item._id}
                          renderItem = {
                              (
                              ({item ,index}) => {
                            // return <Post key={index} item={item} user={user} userProfile={user} activity = {true}/>
                            return <UserTalentEntry  key={index} userTalent={item} user={user} userProfile={user} activity={section == 1 ?true :false}/>
                                         }
                                        )
                                      }

                          ListFooterComponent={section == 3 &&  (
                                        <View
                                        style = {{height:height * 0.576}}
                                        className="fle x-1 h- [600]">
                                            <TalentPage/>
                                        </View>
                                          )}

                          scrollEnabled ={section == 3 ? false : true} 
                          ListHeaderComponent = {<RenderHeader user = {user}  section={section} setSection = {setSection} 
                          handleRefresh ={handleRefresh} setRefresh ={setRefresh} refresh={refresh} />}
                          removeClippedSubviews = {true} 
                          onEndReached = {  displayData && loadMoreData } 
                          scrollEventThrottle={16} 
                          showsHorizontalScrollIndicator={false} 
                          showsVerticalScrollIndicator={false} 
                        />
            </View>
      </View>
  
    //   )}</>
    )
  }