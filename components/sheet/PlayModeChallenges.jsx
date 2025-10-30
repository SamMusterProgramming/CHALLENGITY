import { View, Text, FlatList, useWindowDimensions, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Challenge from '../challenge/Challenge';
import Heart from '../custom/Heart';
import { icons, images } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getInition } from '../../helper';

export default function PlayModeChallenges() {

 const {user,setUser,trendingChallenges,userPublicChallenges , userPrivateChallenges ,publicParticipateChallenges ,privateParticipateChallenges} = useGlobalContext()
 const {challengePrivacy,displayChallenges ,box} =  useLocalSearchParams(); 
 const challengeData =  fillChallenge ()
    //   JSON.parse( displayChallenges);
               

 const [viewableItems, setViewableItems] = useState([]);
 const [indexList , setIndexList] = useState(1)
 const [displayData , setDisplayData] = useState(challengeData.slice(0,3))
 const [moreLeft,setMoreLeft] = useState(false)
 const [moreRight,setMoreRight] = useState(challengeData.length > 3 ? true : false)

 const { width, height } = useWindowDimensions();
 

function fillChallenge () {
    let data = JSON.parse(displayChallenges)
    let challenges = []
    let c = []
    if(box == "owner")
     c = challengePrivacy == "Public" ? userPublicChallenges : userPrivateChallenges
    if(box == "participations")
        c = challengePrivacy == "Public" ? publicParticipateChallenges : privateParticipateChallenges
    if(box == "invite")
        c = trendingChallenges
        data.forEach(chall => {
           const findChallenge = c.find(cha => cha._id == chall._id)
           if (findChallenge) challenges.push(findChallenge) 
     })
    return challenges
}


const renderHeader = useMemo(() => ( 
    <>
        <View className="mt-0  w-[99%] h-[6vh] flex-row px-1 gap-1 items-center justify-start rounded-bl-[40px]  g-[white] rounded-tr-[40px] 
                             rounded-tl-[40px]    borde-l-2 borde-l-white borde-r-2 borde-r-white"
                          style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
                          
                          <View className="justify-center items-center  rounded-bl-3xl rounded-br-3xl w-[20%] g-[#03471a] h-[100%] flex-col">
                                <TouchableOpacity onPress={()=>{ 
                                    router.back() 
                                    }}
                                    className="justify-center gap-[5%] w-[100%] h-[100%]  items-center    flex-col ">
                                
                                    <Image 
                                        className="w-[50%] h-[70%] "
                                        source={icons.back}
                                        resizeMode='contain'
                                        />
                                        
                                </TouchableOpacity> 
                          </View>
                          
                          <View
                              className="justify-end gap-3 px-  w-[59%] items-center  h-[100%] flex-col  g-[#eff6f9] ">
                                
      
                                <View
                                    className="justify-center gap-6 px-4  w-[100%] items-center h-[85%] flex-row rounded-tl-3xl rounded-tr-3xl bg-[#010e13] ">
                                          <View className="justify-start items-center min-h-[100%] flex-row ">
                                                <Image 
                                                  style={{width:width<= 330? 30:33 ,height:width <= 330? 30:33}}
                                                  className="w-[35px] h-[35px] rounded-full "
                                                  source={{uri : user.profile_img ? user.profile_img  : avatar}}
                                                />
                                          </View>
                                          <View className="justify-center gap-  items-start h-[100%] flex-col ">
                                               
                                                  <Text className="font-pmedium  text-sm text-black">
                                                      <Text 
                                                      style={{fontSize:width<= 330? 7:9}}
                                                      className="font-black text-sm text-white">
                                                          {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                                                      </Text> 
                                                  </Text>
                                                  <Text 
                                                      style={{fontSize:width<= 330? 7:9}}
                                                      className=" text-sm text-blue-400 font-black">
                                                      {getInition(user.name)}Challenger
                                                  </Text>
                                          </View>
                                </View>          
                              </View>
                          <View className="justify-center items-center rounded-bl-3xl rounded-br-3xl  g-[#083bf5]  w-[20%]   h-[100%] flex-col ">
                            <TouchableOpacity onPress={()=>{ 
                                    router.navigate('/timeline') 
                                    }}
                                    className="justify-center gap-[5%] w-[100%] h-[100%]  items-center    flex-col ">
                                
                                    <Image 
                                        className="w-[50%] h-[80%] "
                                        source={icons.home}
                                        resizeMode='contain'
                                        />
                                        
                                </TouchableOpacity> 
                          </View>
      
        </View>

        <View className="mt-0  w-[100%] h-[6vh] flex-row px-1 gap- items-center justify-start rounded-tl-[40px]  bg-[white] rounded-br-[40px] 
                              borde-l-2 borde-l-white borde-r-2 borde-r-white"
                          style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
                          
                          <View className="justify-center items-center  rounded-bl-3xl rounded-br-3xl w-[20%] g-[#03471a] h-[100%] flex-col">
                                <TouchableOpacity onPress={()=>{ 
                                    router.back() 
                                    }}
                                    className="justify-center gap-[5%] w-[100%] h-[100%]  items-center    flex-col ">
                                
                                    <Image 
                                        className="w-[50%] h-[70%] "
                                        source={ challengePrivacy == "Public"? icons.publi :
                                                challengePrivacy == "Private" ? icons.priv : icons.strict
                                        }
                                        resizeMode='contain'
                                        />
                                        
                                </TouchableOpacity> 
                          </View>
                          
                          <View
                              className="justify-center gap- px-  w-[59%] items-center  h-[100%] flex-col  g-[#eff6f9] ">
                                <View
                                    className="justify-center gap- px-4 py- w-[100%] items-center h-[70%] flex-col rounded-tl-3xl rounded-tr-3xl g-[#010e13] ">
                                          <View className="justify-start items-center h-[50%] flex-row ">
                                                      <Text 
                                                         style={{fontSize:width<= 330? 9:10}}
                                                          className="font-black text-sm text-secondary">
                                                           Play Mode
                                                      </Text>  
                                          </View>
                                          <View className="justify-center gap-  items-start h-[50%] flex-col ">
                                               
                                                  <Text className="font-pmedium  text-sm text-black">
                                                      <Text 
                                                      style={{fontSize:width<= 330? 7:9}}
                                                      className="font-black text-sm text-black">
                                                          {box == "owner" ?"User Challenges" :
                                                          box == "participations"? "User Participations" : "User Invites"}
                                                      </Text> 
                                                  </Text>
                                                
                                          </View>
                                </View>          
                          </View>

                          <View className="justify-center items-center rounded-bl-3xl rounded-br-3xl  g-[#083bf5]  w-[20%]   h-[100%] flex-col ">
                            <TouchableOpacity onPress={()=>{ 
                                    router.navigate('/timeline') 
                                    }}
                                    className="justify-center gap-[5%] w-[100%] h-[100%]  items-center    flex-col ">
                                
                                    <Image 
                                        className="w-[50%] h-[70%] "
                                        source={box == "owner" ?icons.challenge :
                                            box == "participations" ? icons.participate : icons.invites}
                                        resizeMode='contain'
                                        />
                                        
                                </TouchableOpacity> 
                          </View>
      
        </View>

        {challengeData.length == 0 &&  (
                <View className="mt-0  w-[100%] h-[81vh] flex-row  items-center justify-center rounded-tl-[40px]  bg-[black] rounded-br-[40px] 
                borde-l-2 borde-l-white borde-r-2 borde-r-white"
                style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
                                        <Image   
                                            source={images.empty}
                                            className="  w-20 h-20 rounded-full"
                                            resizeMethod='cover'
                                            />
            </View>
        )}
    </>
 ),[])

 const renderFooter= () => {  
    return (
    <View
       className="w-[100vw] h-[7vh] bg-white flex-row justify-between rounded-lg items-center ">
                                  <TouchableOpacity
                                        className="h-[100%] w-[30%] flex-col justify-center items-center opacity-50   "
                                        onPressIn={moreLeft? handleBack :()=>{}}
                                        >
                                            <Image   
                                            source={moreLeft ?icons.back_arrow:""}
                                            className="  w-16 h-16 rounded-full"
                                            resizeMethod='cover'
                                            />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                        className="h-[100%] w-[30%] flex-col justify-center items-center opacity-50   "
                                        onPressIn={()=>{ router.back()}}
                                        >
                                            <Image   
                                            source={icons.x}
                                            className="  w-12 h-12 rounded-full bg-white"
                                            resizeMethod='cover'
                                            />
                                  </TouchableOpacity>
                                  <TouchableOpacity 
                                    className="h-[100%] w-[30%] flex-col justify-center items-center opacity-50  "
                                    onPressIn={moreRight? handleNext :()=>{}}
                                    >
                                        <Image   
                                        source={moreRight ?icons.next_arrow:""}
                                        className=" w-16 h-[90%] rounded-full"
                                        resizeMethod='cover'
                                        />
                                  </TouchableOpacity>
    </View>) 
  };

 const renderItem = ({ item , index }) => {  
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
      return (<Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}  h={height * 0.88} w={width}/> ) 
  };


  const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
  };

  const handleNext = ()=> {
    const newData = challengeData.slice( indexList * 3 , (indexList + 1)* 3);
    setDisplayData([ ...newData]);
    setIndexList(prev => prev + 1 )
 }
  
const handleBack = ()=> {

   const newData = challengeData.slice((indexList - 2) * 3 , (indexList - 1 ) * 3);
   setDisplayData([...newData]);
   setIndexList(prev => prev - 1 )
}

useEffect(() => {

  (indexList -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
  (challengeData.length < (indexList) * 3)? setMoreRight(false) :setMoreRight(true)

}, [indexList])

  return (
    <SafeAreaView className="min-w-full h-full bg-primary ">  
    <View
        style={{ flex: 1 }}
        className="flex-1  "
      >
      <FlatList 
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={
        displayData
      }
      keyExtractor={(item)=> item._id}
      renderItem={
         renderItem 
        // ({ item }) => <ListItem item={item} />
      }
    //   onEndReached={loadMoreData}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
            itemVisiblePercentThreshold: 70, 
      }}   

      ListHeaderComponent={renderHeader}

      ListFooterComponent={renderFooter}

    //   onRefresh={handleRefresh}
    //   refreshing={refresh}
    //   extraData={refresh}
      />
      </View>

  </SafeAreaView>
  )
}