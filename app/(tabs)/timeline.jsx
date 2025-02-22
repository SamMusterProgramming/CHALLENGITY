import { FlatList, Image, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { images } from '../../constants'
import RNPickerSelect from 'react-native-picker-select';
import { getTopChallenges, getUserChallenges, getUserParticipateChallenges } from '../../apiCalls';
import {icons} from '../../constants'
import { TextInput } from 'react-native';
import Challenge from '../../components/Challenge';
import ParticipantPost from '../../components/ParticipantPost';
import { ResizeMode, Video } from 'expo-av';
import { Camera } from 'expo-camera';
import { router } from 'expo-router';

export default function timeline() {

  const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges} = useGlobalContext()
  const [viewableItems, setViewableItems] = useState([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
   if(user){
    getTopChallenges(user._id,setTrendingChallenges)
   }
  }, [user])
  
  
  const loadUserChallenges =()=>{
    // getUserChallenges(user._id,setTrendingChallenges)
  }

  const loadTrendingChallenges =()=>{
    // getTopChallenges(user._id,setTrendingChallenges)
  }

  const loadParticipations =()=> {
    // getUserParticipateChallenges(user._id,setTrendingChallenges)
  }

  useEffect(() => {
    // console.log(trendingChallenges)
   }, [trendingChallenges])

   const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
   
  };
  const renderItem = ({ item, index }) => {  
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);
    return  <Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}/>
  };


  const handleRefresh = () => {
    getTopChallenges(user._id,setTrendingChallenges)
    setRefresh(!refresh);
  };
   
  return (
    <SafeAreaView className="min-w-full bg-primary min-h-full">
    
        <FlatList 
    
        data={ trendingChallenges}
        keyExtractor={(item)=> item._id}
        renderItem={renderItem}   
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
              itemVisiblePercentThreshold: 70, // Adjust as needed
        }}

        ListHeaderComponent={()=> (
         <>
       
          <View className="mt-1 px-4 w-full h-[10vh] flex-row gap-7 items-center justify-start space-y-9"
             style={{marginTop:Platform.OS == "android" ? 30 : 0 }}>
             <View className="justify-evenly items-start min-h-[100%] flex-col ">
                  <Image 
                    className="w-[50px] h-[50px] rounded-full "
                    source={{uri : user.profile_img}}
                  />
             </View>
             <View className="justify-center gap-3 items-start min-h-[100%] flex-col ">
                    <Text className="font-pmedium text-sm text-gray-100">
                        Welcome {' '}
                         <Text className="font-semibold text-sm text-white">
                            {user.name}
                        </Text> 
                    </Text>
                    <Text className=" text-2xl text-white font-bold">
                        JSChallenger
                    </Text>
             </View>
             <View className="justify-center items-center ml-auto min-h-[100%] flex-col ">
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

          <View className="border-2 border-black-100 w-[100vw] min-h-12 px-4 rounded-2xl
              bg-black-100 focus:border-secondary flex-row justify-center items-center">
                <TextInput
                    className="flex-1 text-white w-[90%] h-full font-pextrabold text-1xl"
                    placeholder="Search for a challenge "
                    placeholderTextColor="#7b7b8b"
                      />
                
                  <TouchableOpacity onPress={()=> {}}>
                      <Image className ="w-5 h-5"
                      resizeMode='contain'
                      source={icons.search} />
                  </TouchableOpacity>                
          </View >
          <View className="min-w-[100%] flex-row justify-center mb-4 gap-2 items-center flex-1 h-10 mt-3">
            <TouchableOpacity onPress={loadTrendingChallenges}
            className="min-w-[32%] h-[100%] flex-col justify-center items-center rounded-lg bg-gray-700 ">
              <Text className="text-xs font-bold  text-white"
              style={{fontSize:10}}>
                  Trending Challenges
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loadUserChallenges}
             className="min-w-[32%] h-[100%] flex-col justify-center items-center rounded-lg bg-blue-900 ">
              <Text className="text-xs font-bold text-white ">
                  User's Challenges
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loadParticipations}
             className="min-w-[32%] h-[100%] flex-col justify-center items-center rounded-lg bg-gray-700 ">
              <Text className="text-xs font-bold text-white ">
                  Track Competition
              </Text>
            </TouchableOpacity>
          </View>
          

      
       </>
        )}
        onRefresh={handleRefresh}
        refreshing={false}
        extraData={refresh}
        />
          
    </SafeAreaView>
  )
}



