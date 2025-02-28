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
import { getInition } from '../../helper';
import HeadLineChallenges from '../../components/HeadLineChallenges';

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
         <View
            className=" w-[100vw] min-h-10 px-4  border-gray-500 
            flex-row justify-center items-center">

           <View className=" w-[35vw] h-[100%] px-2
              flex-row justify-start items-end">
                <Text
                className="text-blue-400 font-bold text-2xl">Challengify</Text>
           </View >

           <View className=" w-[65vw] h-[100%] px-4 border-gray-500 border-2  focus:border-secondary-100 rounded-md
              flex-row justify-center items-center">
                <TextInput
                    className=" text-white w-[100%] border-white rounded-2xl  h-full px-3
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
        
       
          <View className="mt-1 px-4 w-full h-[10vh] flex-row gap-7 items-center justify-start space-y-9"
             style={{marginTop:Platform.OS == "android" ? 40 : 0 }}>
             <View className="justify-evenly items-start min-h-[100%] flex-col ">
                  <Image 
                    className="w-[60px] h-[60px] rounded-full "
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
                        {getInition(user.name)}Challenger
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

          {/* <View className=" w-[100vw] min-h-14 px-4 border-gray-500 border-2  focus:border-secondary-100 rounded-md
              flex-row justify-center items-center">
                <TextInput
                    className=" text-white w-[100%] border-white rounded-2xl  h-full px-3
                    font-bold text-xl"
                    placeholder="Search for a challenge "
                    placeholderTextColor="#7b7b8b"
                      />
                
                  <TouchableOpacity onPress={()=> {}}>
                      <Image className ="w-7 h-7"
                      resizeMode='contain'
                      source={icons.search} />
                  </TouchableOpacity>                
          </View > */}
          <View className="bg-white min-w-full min-h-1"></View>
          <View className="w-[100vw] mt-2 mb-2 h-[250px] ">
              {trendingChallenges.length > 0 &&  (
                 <HeadLineChallenges challengeData={trendingChallenges}  />  
              )} 
          </View>
          <View className="bg-white min-w-full mb-4 min-h-1"></View>
          

      
       </>
        )}
        onRefresh={handleRefresh}
        refreshing={false}
        extraData={refresh}
        />
          
    </SafeAreaView>
  )
}



