import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { generateChallengeTalentGuinessData } from '../../apiCalls'
// import Post from './Post'
import { router } from 'expo-router'
import { icons } from '../../constants'
import Post from '../post/Post'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const RenderHeader =  memo(({description,setDescription,user}) => {
  return(
    <View className="bg-black   w-[100%] flex-col px-1 2 py-2 mt-1 mb-1 shadow-md round ed-xl">
         
          <View className="b g-white w-[100%] flex-col  mb-2  round ed-b-xl">
            <View className="mb- 2 px- 1 flex-row gap-2 justify-start items-end ">
              <Text 
              style={{fontSize:18}}
              className="tex t-2xl font-black text-[#f5f9ff]">Home</Text>
              <MaterialCommunityIcons name="home" size={27} color = "white"  />
            </View>
            <Text 
               style={{fontSize:9}}
               className="text -sm font-bold text-gray-200">Talent & Challenge Contests
            </Text>
           
          </View>

          {/* <View className="bg- white w-[100%] flex-row justify-center items-center py-1 gap-2 ">
                     <Image
                              style={{ width:60 , height:60}}
                              className="w-8 h-8 rounded-full"
                              source={{uri:user && user.profile_img}}
                                  />   
                     <TextInput
                        className=" ml-2 shadow-sm px-2 fle x-1 h-[60px] w-[60%] text-black text-start  bg-[#f5eeee] rounded-lg  "
          
                        style={{fontSize:13,color:"black"}}
                        multiline={true} 
                        numberOfLines={2} 
                        value={ description}
                        onChangeText={text => description.length < 80 && setDescription(text)}
                        placeholder={"add description here"}
                        placeholderTextColor="gray"
                        />
                      <TouchableOpacity 
                       style={{ backgroundColor : description.length > 15 ? "green" : "#676161"}}
                       onPress={()=> {description.length > 15 && router.navigate({ pathname: "/CoverNewChallenge", params: {desc:description} })}}
                       className="justify-center rounded-lg items-center ml-auto flex -1 w -[20%] px-2 h-[60] gap-2  bg-[#676161] flex-col">
                                                  <Image
                                                      style={{width:30 ,height:30}}
                                                      className="w-[30px] h-[30px] rounded-full b g-white"
                                                      source={icons.newChallenge}
                                                      resizeMethod='cover' />
                                                  <Text 
                                                    style={{fontSize:8,
                                                    fontStyle:"italic"
                                                      }}
                                                      className="font-black  text-white">
                                                          New Challenge
                                                  </Text>  
                      </TouchableOpacity>
          </View> */}
    </View>
  )
})

export default function HomePage({reset , setReset}) {
  const {user, userTalents, setUserTalents, userTalentPerformances , setUserTalentPerformances , notifications} = useGlobalContext()
  const [data , setData] = useState(null)
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(2);
  const [refresh, setRefresh] = useState(false);
  const [description ,setDescription] = useState("")


  useEffect(() => {
    generateChallengeTalentGuinessData(user._id ,setData)
    // return () => {
    //     setData(null)
    //     setDisplayData(null)
    //   };
  }, [])
  
  useEffect(() => {
    if(data){
        setDisplayData(data.slice(0,index))
    }
  }, [data])

  // useEffect(() => {
  //   if(reset){
  //       setData(null)
  //       setDisplayData(null)
  //       setIndex(2)
  //   }else {
  //       generateChallengeTalentGuinessData( user._id , setData )
  //   }
  // }, [reset])
  

  const handleRefresh = () => {
    setRefresh(true)
    // setSelectedPrivacy("public")
    getTopChallenges(user._id,setTrendingChallenges)
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
   
  };

  const loadMoreData = () => {
    const newData = data.slice(index, index + 2);
    setDisplayData([...displayData, ...newData]);
    setIndex(index + 2);
  };


  
  return (
    <>
    {data ? (
            <FlatList
            data={displayData && displayData}
            keyExtractor={(item) => item._id}
            renderItem={({item ,index}) => {
            return <Post key={index} item={item} user={user} activity ={false}/>
            }}
            ListHeaderComponent={<RenderHeader user = {user} description={description} setDescription ={setDescription} />}
            onEndReached={loadMoreData}
            removeClippedSubviews={true} 
            scrollEventThrottle={16} 
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        />
   ):(
           <View 
            className = "w-[100%] h-[100%] bg-black justify-center items-center">
               <ActivityIndicator size="large" color="white"  />
           </View>  
   )}
   </>
   
  )
}