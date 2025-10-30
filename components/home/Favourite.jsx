import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import UserChallengeEntry from '../challenge/UserChallengeEntry'
import UserTalentEntry from '../talent/UserTalentEntry'
import { getFavouriteChallenges, getFavouriteTalents } from '../../apiCalls'
import Post from '../post/Post'


const RenderHeader =  memo(({user , setSection , section , description ,setDescription}) => {
    return(
      <View 
      className="bg-black   white w-[100%] flex-col px-1 py-2 mt-1 mb- 1 shadow-md round ed-xl">
            <View className="b g-white w-[100%] mb-2 px- 1 flex-col ">
              <View className="mb- 2 gap-2 flex-row justify-start items-end">
                <Text
                 style={{fontSize:18}}
                 className="text -2xl font-black text-[#EC4899]">Favourite</Text>
                 <MaterialCommunityIcons name="heart" size={28} color = "#EC4899"  />
              </View>
              <Text
               style={{fontSize:9}}
               className="tex t-sm font-bold text-gray-200"> User Favourite Contests
              </Text>
            </View>
            <View className="bg- [#28282c] white w-[100%] flex-row justify-evenly items-center mb-2 py-1 px- 2 gap- 4 ">
                      
                        <TouchableOpacity 
                        style ={{
                          backgroundColor : section !== 1 ? "#2e2e36": "#084573"
                        }}
                        onPress={()=> {setSection(1)}}
                        className="justify-center rounded-lg min-w-[49%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  bg-[#1f1e1e] flex-col">
                                                    <View
                                                     className="flex-row justify-start gap-2 items-end ">
                                                       
                                                        <Text 
                                                          style={{fontSize:section == 1 ? 9 :8,
                                                          fontStyle:"italic"
                                                            }}
                                                            className="font-black  text-white">
                                                              {user.name.split(' ')[0]}{` ' s`} Favourite
                                                        </Text>  
                                                    </View>
                                                    <View
                                                     className="flex-row justify-start gap-2 items-end ">
                                                        <Text 
                                                        style={{fontSize:section == 1 ? 9 :8,
                                                        fontStyle:"italic",
                                                        color : section !== 1 ? "white": "white"
                                                            }}
                                                            className="font-black  text-[#079de3]">
                                                                Talent Contests  
                                                        </Text>  
                                                    </View>
                                                    <View
                                                    className="w- [30px] h- [30px] absolute bottom-2 left-1 rounded-full b g-white">
                                                        <MaterialCommunityIcons name="star" size={20} color= "gold"  />
                                                    </View>
                                                    {/* <Image
                                                            style={{width:20 ,height:20}}
                                                            className="w-[25px] h-[25px] absolute bottom-2 left-2 rounded-full b g-white"
                                                            source={icons.challenge}
                                                            resizeMethod='cover' /> */}

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
                         className="justify-center rounded-lg w-[49%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  b g-[#676161] flex-col">
                                                    <View
                                                     className="flex-row justify-start gap-2 items-end ">
                                                       
                                                        <Text 
                                                          style={{fontSize:section == 1 ? 9 :8,
                                                          fontStyle:"italic"
                                                            }}
                                                            className="font-black  text-white">
                                                              {user.name.split(' ')[0]}{` ' s`} Favourite
                                                        </Text>  
                                                    </View>
                                                    
                                                    <Text 
                                                      style={{fontSize:section == 1 ? 9 :8,
                                                      fontStyle:"italic",
                                                      color : section !== 2 ? "white": "white"
                                                        }}
                                                        className="font-black  text-[#079de3]">
                                                           Challenge Contests
                                                    </Text>  
                                                    <View
                                                    className="w- [30px] h- [30px] absolute bottom-2 left-1 rounded-full b g-white">
                                                        <MaterialCommunityIcons name="sword-cross" size={20} color= "#F97316"  />
                                                    </View>
                                                    <View className="absolute bottom-2 right-2 " >
                                                          <Image
                                                            style={{width:15 ,height:15}}
                                                            className="w-[30px] h-[30px]  rounded-full b g-white"
                                                            source={section == 2 ? icons.down_arrow : icons.up_arrow }
                                                            resizeMethod='cover' />  
                                                    </View>

                        </TouchableOpacity>
                        {/* <TouchableOpacity 
                        style ={{
                          backgroundColor : section !== 3 ? "#2e2e36": "#084573"
                        }}
                         onPress={()=> {setSection(3)}}
                         className="justify-center rounded-lg w-[32%] items-center py-2  w -[20%] px-2 h- [60] gap-1  b g-[#1d1b1b] flex-col">
                                                    <View
                                                     className="flex-row justify-start gap-2 items-end ">
                                                       
                                                        <Text 
                                                          style={{fontSize:section == 1 ? 9 :8,
                                                          fontStyle:"italic"
                                                            }}
                                                            className="font-black  text-white">
                                                                {user.name.split(' ')[0]}{` ' s`}
                                                        </Text>  
                                                    </View>
                                                    
                                                    <Text 
                                                      style={{fontSize:section == 1 ? 9 :8,
                                                      fontStyle:"italic",
                                                      color : section !== 3 ? "white": "lightblue"
                                                        }}
                                                        className="font-black  text-[#079de3]">
                                                           Invite Entries
                                                    </Text>  
                                                    <Image
                                                        style={{width:20 ,height:20}}
                                                        className="w-[25px] h-[25px] absolute bottom-2 left-2 rounded-full b g-white"
                                                        source={icons.invites}
                                                        resizeMethod='cover' />
                                             
                                                    <View className="absolute bottom-2 right-2 " >
                                                          <Image
                                                            style={{width:15 ,height:15}}
                                                            className="w-[30px] h-[30px]  rounded-full b g-white"
                                                            source={section == 3 ? icons.down_arrow : icons.up_arrow }
                                                            resizeMethod='cover' />  
                                                    </View>
                        </TouchableOpacity> */}
                       
            </View>
      </View>
    )
})

export default function Favourite() {
    const {user,setUser,userPublicChallenges,favouriteList,followings,setFollowings,follow ,setTrendingChallenges, setFollow,notifications ,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
    const [data , setData] = useState(null)
    const [displayData, setDisplayData] = useState(null);
    const [index, setIndex] = useState(2);
    const [section, setSection] = useState(1);
    const [favouriteTalents , setFavouriteTalents] = useState(null)
    const [favouriteChallenges , setFavouriteChallenges] = useState(null)

    const [description ,setDescription] = useState("")

    useEffect(() => {
        let talentIds = []
        let challengeIds = []
        favouriteList && favouriteList.favourites.forEach(f =>{
             f.dataType === "talent" && talentIds.push(f._id)
             f.dataType === "challenge" && challengeIds.push(f._id)

        })
        getFavouriteTalents(user._id , talentIds , setFavouriteTalents)
        getFavouriteChallenges(user._id , challengeIds , setFavouriteChallenges)

     }, [favouriteList])


    const loadMoreData = () => {
      let newData = data.slice(index,index + 2)
      setDisplayData([...displayData, ...newData]);
      setIndex(index + 2);
    };

  
    useEffect(() => {
       data && setDisplayData(data.slice(0,index))
    }, [data])

   
    useEffect(() => {
        let d = []
        switch (section) {
            case 1:
                favouriteTalents &&  favouriteTalents.forEach(el => {
                    d.push({...el ,dataType:"talent"})
                 })
                break;
            case 2:
                favouriteChallenges &&  favouriteChallenges.forEach(el =>{
                    d.push({...el ,dataType:"challenge"})
                 })
                break;
           
            default:
                break;
        }
      setData(d)
      setDisplayData(null)
      setIndex(2)
    }, [section, favouriteTalents , favouriteChallenges])

  return (
    <View
     className=" flex-1 borde-4 borde-t-0 borde-white flex-col justify-start items-center py- 2 bg-black [#898888]">
        <View className="min-w-[100vw] flex-1 rounded- xl bg-[#000000] [#deddd9] [#deddd9] [#6a7c83]">
          <FlatList
            data={ displayData && displayData }
            keyExtractor={(item) => item._id}
            renderItem = {(({item ,index}) => {
                return <Post key={index} item={item} user={user} activity ={false} />
             } )
             }
            ListHeaderComponent={<RenderHeader user = {user}  section={section} setSection = {setSection} description={description} setDescription ={setDescription} />}
            removeClippedSubviews={true} 
            onEndReached={displayData && loadMoreData} 
            scrollEventThrottle={16} 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false} 
          />
         </View>            
    </View>
  )
}