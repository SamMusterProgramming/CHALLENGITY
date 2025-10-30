import { View, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator, Platform, ScrollView, FlatList, Animated, TextInput } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import { getUserChallengeInvites } from '../../apiCalls';
import { router } from 'expo-router';
import Post from '../post/Post';
import UserTalentEntry from '../talent/UserTalentEntry';
import UserChallengeEntry from '../challenge/UserChallengeEntry';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const RenderHeader =  memo(({user , setSection , section , description ,setDescription}) => {
    return(
      <View 
      className="bg-black   w-[100%] flex-col px-1 py-2 mt-1 mb- 1 shadow-md round ed-xl">
            <View className="b g-white w-[100%] mb- 2 px- 1 flex-col ">
              <View className="mb- 2 gap-2 flex-row justify-start items-end">
                <Text
                 style={{fontSize:18}}
                 className="text -2xl font-black text-[#F97316]">Challenge</Text>
                 <MaterialCommunityIcons name="sword-cross" size={28} color = "#F97316"  />
              </View>
              <Text
               style={{fontSize:9}}
               className="tex t-sm font-bold text-gray-200"> User Challenges &  Contests</Text>
              <View
                  className=" justify-start rounde d-lg items-end mt-2 mb-2 px- 2 py-1 h-[50px] w-[100%] gap-2  b g-[#d3cfcf] flex-row">
                        <View
                        className ="flex-row gap-1 h-[100%]">
                                                  <View
                                                  className="absolute top-2 right-0 w- [30px] h- [30px] roun ded-full b g-black">
                                                     <MaterialCommunityIcons name="sword-cross" size={18} color = "#F97316"  />
                                                  </View>
                                                  <View
                                                  className="flex-col justify-end items-start gap-2">
                                                            <Text 
                                                              style={{fontSize:10,
                                                              fontStyle:"italic"
                                                                }}
                                                                className="font-black  text-gray-100">
                                                                    New 
                                                            </Text>  
                                                            <Text 
                                                              style={{fontSize:10,
                                                              fontStyle:"italic"
                                                                }}
                                                                className="font-black  text-gray-100">
                                                                    Challenge
                                                            </Text>  
                                                  </View>
                        </View>                                      
                        <View
                          className = "flex-1 bg-white rounded-md" >
                            <TextInput
                              className="   px-2 fle x-1 h-[40px] w-[100%] text-black text-start  bg-[#f5eeee] rounded-lg  "
                              style={{fontSize:13,color:"black"}}
                              // onFocus={() => setIsFocused(true)}
                              multiline={true} 
                              numberOfLines={2} 
                              value={ description}
                              onChangeText={text => description.length < 80 && setDescription(text)}
                              placeholder={"add description here"}
                              placeholderTextColor="gray"
                              />
                        </View>      
                        <TouchableOpacity 
                        style={{ backgroundColor : description.length > 15 ? "green" : "#676161"}}
                        onPress={()=> {description.length > 15 && router.navigate({ pathname: "/CoverNewChallenge", params: {desc:description} })}}
                        className="justify-center rounded-lg items-center mr-2 h-[100%] px-4 py-2  bg-[#676161] flex-col">
                                                    
                                                    <Text 
                                                      style={{fontSize:12,
                                                      fontStyle:"italic"
                                                        }}
                                                        className="font-black  text-white">
                                                            GO
                                                    </Text>  
                        </TouchableOpacity>        
             </View>


            </View>
            <View className="bg- [#28282c] white w-[100%] flex-row justify-between items-center mb-2 py-1 px- 2 gap- 2 ">
                      
                        <TouchableOpacity 
                        style ={{
                          backgroundColor : section !== 1 ? "#2e2e36": "#084573"
                        }}
                        onPress={()=> {setSection(1)}}
                        className="justify-center rounded-lg min-w-[32%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  bg-[#1f1e1e] flex-col">
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
                                                    <View
                                                     className="flex-row justify-start gap-2 items-end ">
                                                        <Text 
                                                        style={{fontSize:section == 1 ? 9 :8,
                                                        fontStyle:"italic",
                                                        color : section !== 1 ? "white": "white"
                                                            }}
                                                            className="font-black  text-[#079de3]">
                                                                Challenges
                                                        </Text>  
                                                    </View>
                                                    <View
                                                    className="w- [30px] h- [30px] absolute bottom-2 left-1 rounded-full b g-white">
                                                        <MaterialCommunityIcons name="sword-cross" size={20} color= "#F97316"  />
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
                         className="justify-center rounded-lg w-[32%] items-center py-2 flex -1 w -[20%] px-1 h- [60] gap-1  b g-[#676161] flex-col">
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
                                                      color : section !== 2 ? "white": "white"
                                                        }}
                                                        className="font-black  text-[#079de3]">
                                                           Participations
                                                    </Text>  
                                                    <Image
                                                        style={{width:20 ,height:20}}
                                                        className="w-[25px] h-[25px] absolute bottom-2 left-2 rounded-full b g-white"
                                                        source={icons.participate}
                                                        resizeMethod='cover' />
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
                        </TouchableOpacity>
                       
            </View>
      </View>
    )
})

const  Challenge = ({selectedBox, refresh,  selectedPr}) => {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,notifications ,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [data , setData] = useState(null)
    const [displayData, setDisplayData] = useState(null);
    const [index, setIndex] = useState(2);
    const [section, setSection] = useState(1);
    const [ inviteChallenges , setInviteChallenges] = useState(null)
    const [description ,setDescription] = useState("")

    useEffect(() => {
        getUserChallengeInvites(user._id , setInviteChallenges)
     }, [])

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
                 userPublicChallenges.forEach(el =>{
                    d.push({...el ,dataType:"challenge"})
                 })
                break;
            case 2:
                privateParticipateChallenges.forEach(el =>{
                    d.push({...el ,dataType:"challenge"})
                 })
                break;
            case 3:
                inviteChallenges.forEach(el =>{
                    d.push({...el ,dataType:"challenge"})
                 })
                break;
            default:
                break;
        }
      setData(d)
      setDisplayData(null)
      setIndex(2)
}, [section, userPublicChallenges,privateParticipateChallenges])
     
    

    

  return (

    <View
     className=" flex-1 borde-4 borde-t-0 borde-white flex-col justify-start items-center py- 2 bg-black [#898888]">
        <View className="min-w-[100vw] flex-1 rounded- xl bg-[#000000] [#deddd9] [#deddd9] [#6a7c83]">
          <FlatList
            data={ displayData && displayData }
            keyExtractor={(item) => item._id}
            renderItem = {(({item ,index}) => {
                // return <Post key={index} item={item} user={user} userProfile={user} activity ={true}/>
                return   <UserChallengeEntry key={index} challenge = {item}  user={user} userProfile={user}
                activity = {true} />
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

export default Challenge;