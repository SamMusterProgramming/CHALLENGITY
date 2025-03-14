import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { images } from '../../constants'
import RNPickerSelect from 'react-native-picker-select';
import { getTopChallenges, getUserChallenges, getUserParticipateChallenges } from '../../apiCalls';
import {icons} from '../../constants'
import { TextInput } from 'react-native';
import Challenge from '../../components/challenge/Challenge';
import ParticipantPost from '../../components/challenge/ParticipantPost';
import { ResizeMode, Video } from 'expo-av';
import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import { getInition } from '../../helper';
import HeadLineChallenges from '../../components/headLights/HeadLineChallenges';
import SelectButton from '../../components/custom/SelectButton';

export default function timeline() {

  const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData} = useGlobalContext()
  const [viewableItems, setViewableItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedPrivacy,setSelectedPrivacy] = useState("All")
  const [challengeData, setChallengeData] = useState(trendingChallenges);



  useEffect(() => {
   if(user){
    getTopChallenges(user._id,setTrendingChallenges)
   }
  }, [user])
  
  const handleAll = ()=> {
    setChallengeData(trendingChallenges)
    setSelectedPrivacy("All")
  }
  const handlePublic = ()=> {
    let challenges = []
    challenges = trendingChallenges.filter(challenge => challenge.privacy == "Public")
    setChallengeData(challenges)
    setSelectedPrivacy("Public")
  }
  
  const handlePrivate = ()=> {
    let challenges = []
    challenges = trendingChallenges.filter(challenge => challenge.privacy == "Private")
    setChallengeData(challenges)
    setSelectedPrivacy("Private")
  }

  const handleFriend = ()=> {
    const friends = userFriendData.friends;

    setSelectedPrivacy("Friend")
  }


  
  useEffect(() => {
    setChallengeData(trendingChallenges)
   }, [trendingChallenges])

   const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
   
  };
  const renderItem = ({ item, index }) => {  
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
    return  <Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}/>
  };

   
  const renderHeader = useMemo(() => ( 
    <>
      <View
                className=" w-[100vw]  
                flex-col justify-center items-center">
      
          <View
                className=" w-[100vw] h-10 px-4  border-gray-500 
                flex-row justify-center items-center">

        
                    <Text
                    className="text-blue-400 font-bold text-xl">Challengify</Text>
             
          </View>

          <View className=" w-[100vw] h-12 px-4 mt-4  border-gray-500 
                flex-row justify-center items-center">
                 <View className=" w-[96%] h-[100%] px-4 border-gray-200 border-2  focus:border-secondary-100 rounded-xl
                     flex-row justify-center items-center">
                    <TextInput
                        className=" text-white w-[100%]   h-full px-3
                        font-bold text-sm"
                        placeholder="Search for a challenge "
                        placeholderTextColor="#7b7b8b"
                          />
                    
                      <TouchableOpacity onPress={()=> {}}>
                          <Image className ="w-6 h-6"
                          resizeMode='contain'
                          source={icons.search} />
                      </TouchableOpacity>                
                 </View >
          </View>
        
       
          <View className="mt-6  w-full h-[14vh] flex-row  items-center justify-start "
             style={{marginTop:Platform.OS == "android" ? 20 : 0 ,marginBottom:Platform.OS == "android" ? 20 : 0 }}>
             <View className="justify-evenly   w-[15%] items-start min-h-[100%] flex-col ">
                  <Image 
                    className="w-[50px] h-[50px] rounded-full "
                    source={{uri : user.profile_img}}
                  />
             </View>
             <View className="justify-center gap-3  w-[55%]      items-center min-h-[100%] flex-col ">
                    <Text className="font-pmedium text-sm text-gray-100">
                         Welcome {' '}
                         <Text className="font-bold text-sm text-white">
                            {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                        </Text> 
                    </Text>
                    <Text className=" text-sm text-white font-black">
                        {getInition(user.name)}Challenger
                    </Text>
             </View>

             <View className="justify-center items-center  w-[30%]  min-h-[100%] flex-col ">
                <TouchableOpacity onPress={()=>{ 
                 router.push({pathname: '/CreateChallenge', params:{}}); 
                }}
                className="justify-center items-center gap-2 min-h-[100%] flex-col ">
                  <Image 
                      className="w-10 h-10  "
                      source={icons.challenge}
                      resizeMode='contain'
                    />

                  <Text className="font-bold text-sm text-blue-100">
                        New Challenge
                  </Text>    
                </TouchableOpacity> 
             </View>

          </View>

      </View>
          

          <View className="w-[100vw] flex-row justify-start px-3 items-center mt-2 mb-1 h-[40px]" >
                  <Text className="font-bold text-sm text-blue-100">
                        Friend's Challenges Pool
                  </Text>    
          </View>
          <View className="bg-white min-w-full min-h-1"></View>
         
          <View className="w-[100vw] mt-2 mb-2 h-[200px] bg-gray-700 ">
              {trendingChallenges.length > 0 &&  (
                 <HeadLineChallenges challengeData={trendingChallenges}  />  
              )} 
          </View>
          <View className="bg-white min-w-full mb-3 mt-1 min-h-1"></View>
          <View className="w-[100vw] flex-row justify-start px-3 items-center mt-5 mb-0 " >
                  <Text className="font-bold text-sm text-blue-100">
                        Trending Challenges 
                  </Text>    
          </View>

          <View className = "w-full h-[50px] mt-3 flex-row justify-evenly items-center gap-3 ">
              <SelectButton color="white" bgColor={selectedPrivacy == "All"?"#241413":"black"} title ="All" action={handleAll}/>
              <SelectButton color="white" bgColor={selectedPrivacy == "Public"?"#241413":"black"} title ="Public" action={handlePublic}/>
              <SelectButton color="white" bgColor={selectedPrivacy == "Private"?"#241413":"black"} title ="Private" action={handlePrivate} />
              <SelectButton color="white" bgColor={selectedPrivacy == "Friend"?"#241413":"black"} title ="Friends" action={handleFriend}/>
          </View>
          
    </>
  ),[trendingChallenges,selectedPrivacy]);




  const handleRefresh = () => {
    setRefresh(true)
    getTopChallenges(user._id,setTrendingChallenges)
    setTimeout(() => {
      setRefresh(false);
    }, 600);
   
  };
   
  return (
    <SafeAreaView className="min-w-full bg-primary min-h-full">
       
      <View
          style={{ flex: 1 }}
>
        <FlatList 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={challengeData}
        keyExtractor={(item)=> item._id}
        renderItem={renderItem}   
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
              itemVisiblePercentThreshold: 70, // Adjust as needed
        }}   

        ListHeaderComponent={renderHeader}
        onRefresh={handleRefresh}
        refreshing={refresh}
        extraData={refresh}
        />
        </View>
  
    </SafeAreaView>
  )
}



