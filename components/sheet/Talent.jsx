import { View, Text,  TouchableOpacity, Image, useWindowDimensions, FlatList } from 'react-native'
import React, { memo,  useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import { getUserTalent, getUserTalentPerformances } from '../../apiCalls';
import TalentPage from '../talent/TalentPage';
import Post from '../home/Post';


const RenderHeader =  memo(({user , setSection , section}) => {
  return(
    <View 
    className="bg-primary  black white w-[100%] flex-col px- 2 py-1 mt-1 mb- 1 shadow-md round ed-xl">
         
          <View className="b g-white w-[100%] mb-2 px-1 flex-row justify-start items-end ">
              <View className="b g-white w- [100%] mb- 2 px-1 flex-col ">
                  <View className="mb- 2 gap-2 flex-row justify-start items-end">
                    <Text className="text-xl font-bold text-[#079de3]">Talents</Text>
                    <Image
                        style={{ width:25 , height:25}}
                        className="w-8 h-8 rounded-full"
                        source={icons.talent}
                        />  
                  </View>
                  <Text 
                     style={{fontSize:9}}
                     className="tex t-sm font-bold text-gray-200"> User Talents & Contests
                  </Text>
              </View>
              {/* <TouchableOpacity
              className ="flex-col justify-end items-center h- bg-wg [100%] gap-1 ml-auto" >
                             <Image
                                    style={{width:30 ,height:30 , fontSize:9}}
                                    className="w-[25px] h-[25px] mt- auto rounded-full b g-white"
                                    source={icons.watchlist}
                                    resizeMethod='cover' />
                             <Text 
                             style={{fontSize:9}}
                             className="te xt-xl font-black text-[#d1d6d8]">Watchlist</Text>
              </TouchableOpacity> */}
          </View>

          <View className="b g-[#303031] white w-[100%] flex-row justify-between items-center py-1 px-2 mb-2 gap-2 ">
                    
                      <TouchableOpacity
                      style ={{
                        backgroundColor : section !== 1 ? "#303031": "#000508"
                      }}
                      onPress={()=> {setSection(1)}}
                      className="justify-center rounded-lg min-w-[33%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  bg-[#1f1e1e] flex-col">
                                                  
                                                  <View
                                                   className="flex-row justify-start gap-2 items-end ">
                                                   
                                                      <Text 
                                                        style={{fontSize:section == 1 ? 10 :8,
                                                        fontStyle:"italic"
                                                          }}
                                                          className="font-black  text-white">
                                                            {user.name.split(' ')[0].slice(0,10)}{` ' s`}
                                                      </Text>  
                                                  </View>
                                                  <Text 
                                                    style={{fontSize:8,
                                                    fontStyle:"italic",
                                                    color : section !== 1 ? "white": "lightblue"
                                                      }}
                                                      className="font-black  text-[#079de3]">
                                                          Talent Entries 
                                                  </Text>  
                                                  <Image
                                                      style={{width:20 ,height:20}}
                                                      className="w-[25px] h-[25px] absolute top-2 left-3 rounded-full b g-white"
                                                      source={{uri:user && user.profile_img}}
                                                      resizeMethod='cover' />
                                                    {/* {section == 1 && (<View className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#079de3]" />)} 
                                                    {section == 1 && (<View className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#079de3]" />)} 
                                                    {section == 1 && (<View className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-[#079de3]" />)} 
                                                    {section == 1 && (<View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#079de3]" />)}  */}
                                                 {section == 1 ? (<View className="absolute top-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute top-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#9b9e9f]" />)} 
                                                 {/* {section == 1 ? (<View className="absolute bottom-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute bottom-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#9b9e9f]" />)}  */}
                                                 {section == 1 ? (<View className="absolute to p-0 right-0 h-[100%] w-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute to p-0 right-0 h-[100%] w-1 rounded-full bg-[#9b9e9f]" />)} 
                                                 {section == 1 ? (<View className="absolute bott om-0 left-0 h-[100%] w-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute bott om-0 left-0 h-[100%] w-1 rounded-full bg-[#9b9e9f]" />)} 
                                                 
                      </TouchableOpacity>
                      <TouchableOpacity 
                      style ={{
                        backgroundColor : section !== 2 ? "#303031": "#000508"
                      }}
                       onPress={()=> {setSection(2)}}
                       className="justify-center rounded-lg w-[33%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  b g-[#676161] flex-col">
                                                  <View
                                                   className="flex-row justify-start gap-2 items-end ">
                                                     
                                                      <Text 
                                                        style={{fontSize:section == 2 ? 10 :8,
                                                        fontStyle:"italic"
                                                          }}
                                                          className="font-black  text-white">
                                                              Explore
                                                      </Text>  
                                                  </View>
                                                  
                                                  <Text 
                                                    style={{fontSize:8,
                                                    fontStyle:"italic",
                                                    color : section !== 2 ? "white": "lightblue"
                                                      }}
                                                      className="font-black  text-[#079de3]">
                                                         Top Contests
                                                  </Text>  
                                                  <Image
                                                      style={{width:20 ,height:20}}
                                                      className="w-[30px] h-[30px] absolute top-1 left-3 rounded-full b g-white"
                                                      source={icons.talent}
                                                      resizeMethod='cover' />
                                                    {/* {section == 2 && (<View className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#079de3]" />)}  */}
                                                    {/* {section == 2 && (<View className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#079de3]" />)}  */}
                                                    {/* {section == 2 && (<View className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-[#079de3]" />)}  */}
                                                    {/* {section == 2 && (<View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#079de3]" />)}  */}
                                                    {section == 2 ? (<View className="absolute top-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute top-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#9b9e9f]" />)} 
                                                    {/* {section == 2 ? (<View className="absolute bottom-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute bottom-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#9b9e9f]" />)}  */}
                                                    {section == 2 ? (<View className="absolute to p-0 right-0 h-[100%] w-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute to p-0 right-0 h-[100%] w-1 rounded-full bg-[#9b9e9f]" />)} 
                                                    {section == 2 ? (<View className="absolute bott om-0 left-0 h-[100%] w-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute bott om-0 left-0 h-[100%] w-1 rounded-full bg-[#9b9e9f]" />)} 

                      </TouchableOpacity>
                      <TouchableOpacity 
                      style ={{
                        backgroundColor : section !== 3 ? "#303031": "#000508"
                      }}
                       onPress={()=> {setSection(3)}}
                       className="justify-center rounded-lg w-[30%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  bg-[#000508] flex-col">
                                                  <View
                                                   className="flex-row justify-start gap-2 items-end ">
                                                     
                                                      <Text 
                                                        style={{fontSize:section == 3 ? 10 :8,
                                                        fontStyle:"italic"
                                                          }}
                                                          className="font-black  text-white">
                                                              Explore 
                                                      </Text>  
                                                  </View>
                                                  
                                                  <Text 
                                                    style={{fontSize:8,
                                                    fontStyle:"italic",
                                                    color : section !== 3 ? "white": "lightblue"
                                                      }}
                                                      className="font-black  text-[#079de3]">
                                                         Talent Rooms
                                                  </Text>  
                                                  <Image
                                                      style={{width:20 ,height:20}}
                                                      className="w-[30px] h-[30px] absolute top-1 left-3 rounded-full b g-white"
                                                      source={icons.talent}
                                                      resizeMethod='cover' />
                                                    {/* {section == 3 && (<View className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#079de3]" />)} 
                                                    {section == 3 && (<View className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#079de3]" />)} 
                                                    {section == 3 && (<View className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-[#079de3]" />)} 
                                                    {section == 3 && (<View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#079de3]" />)}  */}

                                                    {section == 3 ? (<View className="absolute top-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute top-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#9b9e9f]" />)} 
                                                    {/* {section == 3 ? (<View className="absolute bottom-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute bottom-0 rig ht-0 w-[100%] h-1 rounded-full bg-[#9b9e9f]" />)}  */}
                                                    {section == 3 ? (<View className="absolute to p-0 right-0 h-[100%] w-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute to p-0 right-0 h-[100%] w-1 rounded-full bg-[#9b9e9f]" />)} 
                                                    {section == 3 ? (<View className="absolute bott om-0 left-0 h-[100%] w-1 rounded-full bg-[#2a880a]" />):
                                                                  (<View className="absolute bott om-0 left-0 h-[100%] w-1 rounded-full bg-[#9b9e9f]" />)} 
                      </TouchableOpacity>
                     
          </View>
    </View>
  )
})



export default function Talent() {
    const {user, userTalents, setUserTalents, userTalentPerformances , setUserTalentPerformances , notifications} = useGlobalContext()
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
      getUserTalentPerformances(user._id , setUserTalentPerformances)
      setTimeout(() => {
         setRefresh(false)
      }, 1000);
    }
  
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
      setTimeout(() => {
        data && setDisplayData(data.slice(0,index))
      }, 0);
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
               userTalents.forEach(el =>{
                  d.push({...el ,dataType:"talent"})
               })
              break;
          // case 3:
          //     inviteChallenges.forEach(el =>{
          //         d.push({...el ,dataType:"challenge"})
          //      })
          //     break;
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
      {displayData && ( 
      <View
       className=" flex-1 borde-4 borde-t-0 borde-white flex-col justify-start items-center py- 2 bg-black [#898888]">
            <View className="min-w-[100vw] flex-1    rounded- xl bg-[#000000] [#deddd9] [#deddd9] [#6a7c83]">
                        <FlatList
                          data={ displayData && displayData }
                          keyExtractor={(item) => item._id}
                          renderItem = {
                          (
                              ({item ,index}) => {
                            return <Post key={index} item={item} user={user} userProfile={user} activity = {true}/>
                                         }
                                        )
                                      }
                          ListFooterComponent={section == 3 &&  (
                                        <View
                                        style = {{height:height * 0.65}}
                                        className="fle x-1 h- [600]">
                                            <TalentPage/>
                                        </View>
                                          )}
                          scrollEnabled ={section == 3 ? false : true} 
                          ListHeaderComponent = {<RenderHeader user = {user}  section={section} setSection = {setSection}  />}
                          removeClippedSubviews = {true} 
                          onEndReached = { displayData &&  loadMoreData } 
                          scrollEventThrottle={16} 
                          showsHorizontalScrollIndicator={false} 
                          showsVerticalScrollIndicator={false} 
                        />
            </View>
      </View>
  
      )}</>
    )
  }