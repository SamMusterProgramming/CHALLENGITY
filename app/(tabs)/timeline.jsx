import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, PureComponent, useEffect, useMemo, useRef, useState } from 'react'
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
import { router, useRouter } from 'expo-router';
import { getInition } from '../../helper';
import HeadLineChallenges from '../../components/headLights/HeadLineChallenges';
import SelectButton from '../../components/custom/SelectButton';
import { isLoaded } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_100Thin, Inter_900Black } from '@expo-google-fonts/inter';




class ListItem extends PureComponent {
  render() {
    const { item , index } = this.props;
    return (
      <Challenge key={item._id} isVisibleVertical={false} challenge={item}/>
    );
  }
}




export default function timeline() {

  const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData} = useGlobalContext()
  const [viewableItems, setViewableItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedPrivacy,setSelectedPrivacy] = useState("All")
  const [challengeData, setChallengeData] = useState([]);
  const [displayData, setDisplayData] = useState(trendingChallenges.slice(0,2));
  const [index, setIndex] = useState(2);
  const [friendsChallenges, setFriendsChallenges] = useState([]);
  const flatListRef = useRef()
  



  useEffect(() => {
    return () => 
        {
        setChallengeData([])
        setDisplayData([])
        flatListRef.current = null ;
        }
  }, [])

  useEffect(() => {
    if(trendingChallenges.length > 0){
      const friends = userFriendData.friends;
    
      let challenges = []
      challenges = trendingChallenges.filter(challenge => 
                     (friends.find(friend => (friend.sender_id == challenge.origin_id))&& challenge.privacy == "Private"  
                         && challenge.invited_friends.find(friend => friend.sender_id == user._id))
                      // ||      challenge.participants.find(participant=>participant.user_id == friend.sender_id)
                    )
      setFriendsChallenges([...challenges])
                  }
   }, [trendingChallenges])
    
  const handleAll = ()=> {
    setChallengeData(trendingChallenges)
    setSelectedPrivacy("All")
  }

  const handlePublic = ()=> {
    const friends = userFriendData.friends;
    let challenges = []
    challenges = trendingChallenges.filter(challenge => challenge.privacy == "Public" && (!friends.find(friend => (friend.sender_id == challenge.origin_id))) )
    setChallengeData(challenges)
    setSelectedPrivacy("Public")
  }
  
  const handlePrivate = ()=> {
    const friends = userFriendData.friends;
    let challenges = []
    challenges = trendingChallenges.filter(
           challenge => (challenge.privacy == "Private" && challenge.audience == "Open" && (!friends.find(friend => (friend.sender_id == challenge.origin_id))) )
          )
    setChallengeData(challenges)
    setSelectedPrivacy("Private")
  }

  const handleFriend = () => {
    const friends = userFriendData.friends;
    let challenges = []
    challenges = trendingChallenges.filter(challenge => 
                   (friends.find(friend => (friend.sender_id == challenge.origin_id) && challenge.privacy == "Public")
                   || (friends.find(friend => (friend.sender_id == challenge.origin_id))&& challenge.privacy == "Private"  
                   && challenge.audience !== "Strict" && !challenge.invited_friends.find(friend => friend.sender_id == user._id))
                    // ||      challenge.participants.find(participant=>participant.user_id == friend.sender_id)

                  ))
                  setChallengeData(challenges)
                  setSelectedPrivacy("Friend")
  }
    
  const handleInvites = ()=> {
    const friends = userFriendData.friends;
    let challenges = []
    challenges = trendingChallenges.filter(challenge => 
                   (friends.find(friend => (friend.sender_id == challenge.origin_id))&& challenge.privacy == "Private"  
                       && challenge.invited_friends.find(friend => friend.sender_id == user._id))
                    // ||      challenge.participants.find(participant=>participant.user_id == friend.sender_id)
                  )
                  setChallengeData(challenges)
                  setSelectedPrivacy("Invites")
  }
    
  useEffect(() => {
    setChallengeData(trendingChallenges)
    setDisplayData(trendingChallenges.slice(0,2))
   }, [trendingChallenges])

   const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
  };
 
  
  const renderHeader = useMemo(() => ( 
    <>
      <View  className=" w-[100vw] flex-col justify-start items-center">
      
          <View
           style={{fontSize:11}}
           className=" w-[100vw] h-[4vh]  mt-2 flex-row justify-center items-center">
                    <Text
                    className="text-blue-400 font-bold text-">CHALLENGIFY</Text>           
          </View>

        
        
       
          {user &&  ( <View className="mt-  w-full h-[8vh] flex-row px-2 gap-1 items-end justify-start "
             style={{marginTop:Platform.OS == "android" ? 10 : 0 ,marginBottom:Platform.OS == "android" ? 20 : 0 }}>
             
             <View className="justify-center items-center   w-[24%]  h-[100%] flex-col ">
                <TouchableOpacity onPress={()=>{ 
                 router.push('/favouriteChallenges'); 
                }}
                className="justify-center items-center border-2 rounded-xl bg-pink-400 gap-0  w-[100%] h-[80%] flex-col ">
                  <Image 
                      className="w-6 h-6  "
                      source={icons.favourite}
                      resizeMode='contain'
                    />
                  <Text 
                    style={{fontSize:9}}
                    className="font-black text-sm text-white">
                        Favourites
                  </Text>    
                </TouchableOpacity> 
             </View>
             
             <View
                className="justify-center  w-[50%] items-center min-h-[100%] flex-row ">
                      <View className="justify-center   w-[20%] items-center min-h-[100%] flex-col ">
                            <Image 
                              className="w-[50px] h-[50px] rounded-full "
                              source={{uri :  user.profile_img}}
                            />
                      </View>
                      <View className="justify-center   w-[60%]    gap-2  items-center h-[90%] flex-col ">
                              <Text className="font-pmedium text-sm text-gray-100">
                                  <Text 
                                  style={{fontSize:8}}
                                  className="font-black text-sm text-white">
                                      {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                                  </Text> 
                              </Text>
                              <Text 
                                  style={{fontSize:9}}
                                  className=" text-sm text-blue-400 font-black">
                                  {getInition(user.name)}Challenger
                              </Text>
                      </View>
             </View>          

             <View className="justify-center items-center   w-[24%]   h-[100%] flex-col ">
                <TouchableOpacity onPress={()=>{ 
                 router.push('/(tabs)/NewChallenge'); 
                }}
                className="justify-center items-center border-2 rounded-xl bg-blue-700 gap-0  w-[100%] h-[80%] flex-col ">
                  <Image 
                      className="w-6 h-6  "
                      source={icons.challenge}
                      resizeMode='contain'
                    />
                  <Text 
                    style={{fontSize:9}}
                    className="font-black text-sm text-white">
                        New Challenge
                  </Text>    
                </TouchableOpacity> 
             </View>

          </View>
          )}

       <View className=" w-[100vw] h-[6vh] px-2 mt-2
                flex-row justify-center items-center">
                 <View className=" w-[100%] h-[100%] px-4 border-gray-200 border-2  focus:border-secondary-100 rounded-xl
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

      </View>
          

          <View className="w-[100vw] flex-row justify-start px-3 items-center mt-2 mb-1 h-[40px]" >
                  <Text className="font-bold text-sm text-blue-100">
                        Friends who challenged you  - List -  
                  </Text>    
          </View>
          {/* <View className="bg-white min-w-full min-h-1"></View> */}
         
          <View className="w-[100vw] mt-0 mb-0 h-[150px] border-4  rounded-lg bg-gray-700 ">
              {friendsChallenges.length > 0 &&  (
                 <HeadLineChallenges user={user} challengeData={friendsChallenges} />  
                )}  
          </View>

          {/* <View className="bg-white min-w-full mb-3 mt-1 min-h-1"></View> */}
          <View className="w-[100vw] flex-row justify-start px-3 items-center mt-5 mb-0 " >
                  <Text className="font-bold text-sm text-blue-100">
                        Trending Challenges 
                  </Text>    
          </View>

          <View className = "w-full h-[50px] mt-3 flex-row justify-evenly items-center ">
              <SelectButton color="white" bgColor={selectedPrivacy == "All"?"#0345fc":"#2e2b22"}
               title ="Top" action={handleAll} />
              <SelectButton color="white" bgColor={selectedPrivacy == "Public"?"#0345fc":"#2e2b22"}
               title ="Public" action={handlePublic}/>
              <SelectButton color="white" bgColor={selectedPrivacy == "Private"?"#0345fc":"#2e2b22"}
              title ="Private" action={handlePrivate} />
              <SelectButton color="white" bgColor={selectedPrivacy == "Friend"?"#0345fc":"#2e2b22"} 
              title ="Friends" action={handleFriend}/>
              {/* <SelectButton color="white" bgColor={selectedPrivacy == "Invites"?"#0345fc":"#2e2b22"} 
              title ="Invites" action={handleInvites}/> */}
          </View>
          
    </>
  ),[trendingChallenges,selectedPrivacy,friendsChallenges]);




  const handleRefresh = () => {
    setRefresh(true)
    // setSelectedPrivacy("public")
    getTopChallenges(user._id,setTrendingChallenges)
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
   
  };
   

  const renderItem = ({ item , index }) => {  
    const isVisibleVertical = viewableItems.some(viewableItem => viewableItem.index === index);

      return (<Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}/> ) 
  
  };


  const renderFooter= ({ item , index }) => {  
      return (
      <View
         className="w-[100%] min-h-[60] bg-primary ">
          
      </View>) 
  
  };


  const loadMoreData = () => {
    const newData = challengeData.slice(index, index + 2);
    setDisplayData([...displayData, ...newData]);
    setIndex(index + 2);
  };

  useEffect(() => {
    setDisplayData(challengeData.slice(0,2))
    setIndex(2)
   }, [challengeData])


  

  return (
    <SafeAreaView className="min-w-full bg-primary min-h-full">  
      <View
          style={{ flex: 1 }}
>
        <FlatList 
        ref={flatListRef}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={
          displayData
          // []
        }
        keyExtractor={(item)=> item._id}
        renderItem={
           renderItem 
          // ({ item }) => <ListItem item={item} />
        }
        onEndReached={loadMoreData}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
              itemVisiblePercentThreshold: 70, // Adjust as needed
        }}   

        ListHeaderComponent={renderHeader}

        ListFooterComponent={renderFooter}

        onRefresh={handleRefresh}
        refreshing={refresh}
        extraData={refresh}
        />
        </View>

    </SafeAreaView>
  )
}



