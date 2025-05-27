import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
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
import Heart from '../../components/custom/Heart';
import HeadLineChallengeList from '../../components/headLights/HeadLineChallengeList';
import FriendChallengeBox from '../../components/challenge/FriendChallengeBox';
// import HeadLineChallengeList from '../../components/headLights/HeadLineChallengeList';




class ListItem extends PureComponent {
  render() {
    const { item , index } = this.props;
    return (
      <Challenge key={item._id} isVisibleVertical={false} challenge={item}/>
    );
  }
}


const avatar = "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2Favatar.jpg?alt=media&token=25ae4701-e132-4f15-a522-5b9332d2c0b2"

export default function timeline() {

  const {user,setUser,trendingChallenges,setTrendingChallenges,userChallenges,setUserChallenges,userFriendData} = useGlobalContext()
  const [viewableItems, setViewableItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedPrivacy,setSelectedPrivacy] = useState("All")
  const [challengeData, setChallengeData] = useState([]);
  const [displayData, setDisplayData] = useState(trendingChallenges.slice(0,2));
  const [index, setIndex] = useState(2);
  const [friendsChallengesList, setFriendsChallengesList] = useState(null);
  const flatListRef = useRef()
  const { width, height } = useWindowDimensions();
  const [showList, setShowList] = useState(true);


  



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
        (friends.find(friend => (friend.sender_id == challenge.origin_id) && challenge.privacy == "Public")
        || (friends.find(friend => (friend.sender_id == challenge.origin_id))&& challenge.privacy == "Private"  
        && challenge.audience !== "Strict" && !challenge.invited_friends.find(friend => friend.sender_id == user._id))

       ))     

      challenges.length > 0 && setFriendsChallengesList({challenges:challenges})
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
                  // setFriendsChallenges(challenges)
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
      <View  className=" w-[100vw]  flex-col justify-start items-center">
      
          <View
           style={{fontSize:11}}
           className=" w-[100vw] h-[7vh] b-[#0a144b] bg-white rounde-bl-3xl rounde-br-3xl flex-row justify-center items-center   borde-t-black">
                    
                    <View className="justify-center items-center rounded-xl w-[25%]  h-[96%] borde-l-2 borde-r-2 borde-[#0a144b] b-[#0a144b] flex-col">
                      <View className="justify-center items-center  rounded-tl-xl rounded-tr-xl w-[70%] rounded-lg h-[80%] bg-[#1198ec] flex-col">
                          <Heart title="Challenges" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.challenge} link="/UserChallenges"/>
                      </View>
                    </View>
               
                      <View
                                        className="flex-row justify-center rounded-xl border- bg-white items-center gap-1 w-[50%] h-[96%]">
                                              
                                              <View
                                              className="flex-row justify-start rounded-xl items-center w-[20%] h-[100%] ">
                                                  <Image
                                                  className="w-[100%] h-[80%]"
                                                  source={icons.home}
                                                  resizeMethod='contain' />
                                                
                                              </View>
                                              <View
                                              className="flex-col justify-end  items-center w-[60%] h-[100%] ">
                                                    <View
                                                      className="flex-row justify-center  items-end w-[100%] h-[30%] ">
                                                          <Text 
                                                               style={{fontSize:width/45}}
                                                               className="font-bold text-sm text-black">
                                                                   Push your limits with
                                                          </Text> 
                                                      
                                                    </View>
                                                    <View
                                                      className="flex-row justify-center mt- items-center w-[100%] h-[60%] ">
                                                          <Text 
                                                               style={{fontSize:width/29}}
                                                               className="font-bold text-sm text-[#1071e0]">
                                                                  Challengify
                                                          </Text> 
                                                      
                                                    </View>
                                              </View>
                       </View>
                       <View className="justify-center items-center rounded-xl w-[25%]  h-[96%] borde-l-4 borde-r-4 borde-[#0a144b] b-[#0a144b] flex-col">
                        <View className="justify-center items-center  rounded-tl-xl rounded-tr-xl w-[70%] rounded-lg h-[80%] bg-[#5e11ec] flex-col">
                            <Heart title="Find Friends" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.search_people} link="/SearchFriend"/>
                        </View>
                       </View>
          </View>

          
        
       
        <View className="mt-0  w-full h-[7vh] flex-row px- gap- px- borde-4 bg-[#f8f2f2]  items-center bg[#0a144b] justify-start"
             style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>

             <View className="justify-start items-center rounded-xl w-[25%]  h-[100%] borde-l-4 borde-r-4 borde-[#0a144b] b-[#0a144b] flex-col">
              <View className="justify-center items-center  rounded-bl-xl rounded-br-xl w-[90%]  h-[90%] bg-[#0813b7] flex-col">
                  <Heart title="Watchlist" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.watchlist} link="/favouriteChallenges"/>
              </View>
             </View>

             <View
                className="justify-end gap-3 px-  w-[50%] items-center  h-[100%] flex-col rounded-tl-3xl rounded-tr-3xl bg-[#e2e5e] ">
                  

                  <View
                      className="justify-center  px-6 gap-4 w-[100%] items-center h-[85%] flex-row rounded-tl-lg bg-[#03033d] rounded-tr-lg  ">
                            <View className="justify-center items-center min-h-[100%] flex-row ">
                                  <Image 
                                    style={{width:width<= 330? 30:35 ,height:width <= 330? 30:35}}
                                    className="w-[40px] h-[40px] rounded-full "
                                    source={{uri : user.profile_img? user.profile_img  : avatar}}
                                  />
                            </View>
                            <View className="justify-center gap- -auto items-start h-[100%] flex-col ">
                                    {/* <Text 
                                        style={{fontSize:width<= 330? 10:11}}
                                        className=" text-sm text-gray-500 font-psemibold">
                                        WELCOME
                                    </Text> */}
                                    <Text className="font-pmedium  text-sm text-white">
                                        <Text 
                                        style={{fontSize:width<= 330? 8:10}}
                                        className="font-black text-sm text-white">
                                            {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                                        </Text> 
                                    </Text>
                                    <Text 
                                        style={{fontSize:width<= 330? 8:10}}
                                        className=" text-sm text-blue-400 font-black">
                                        {getInition(user.name)}Challenger
                                    </Text>
                            </View>
                  </View>          
                  </View>
                  <View className="justify-start items-center   w-[25%]  h-[100%] rounded-xl borde-l-4 borde-r-4 bordr-[#0a144b] b-[#0a144b]  flex-col">
                    <View className="justify-center items-center rounded-bl-xl rounded-br-xl w-[90%]  h-[90%] bg-[#0813b7] flex-col">
                      <Heart title="New Challenge" color1 = '#b0611c' color2 = '#633711' icon ={icons.newChallenge} link="/CoverNewChallenge"/>
                    </View>
                  </View>

            </View>
 
      </View>

      <View
             className="w-full h-[7vh] px-2 border-2 border-[#044743] bg-[#044743]
                flex-row justify-center items-center">
                 <View className=" w-[100%] h-[80%] px-4 border-gray-200 border-2 bg-white  rounded-lg rounded-tr-lg
                     flex-row justify-center items-center">
                    <TextInput
                        className=" text-gray-600 w-[100%]   h-[100%] px-3
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

      {friendsChallengesList &&  (
                 <FriendChallengeBox friendsChallenges={friendsChallengesList.challenges}/> 
          )}
        

  

          <View className=" min-w-full mb-3 mt-5 rounded-tl-3xl py-4  rounded-tr-3xl bg-[#313f8d] flex-col justify-center items-center" >
              <View className="w-[100vw] h-[30px] flex-row justify-center  items-center mt- mb-0 " >
                      <Text 
                      style={{fontSize:width/33}}
                      className="font-bold text-sm text-[#bfc2d2]">
                            Trending Challenges 
                      </Text>    
              </View>

              <View className = "w-full h-[40px] mt-3 flex-row  justify-evenly items-center ">
                  <SelectButton color="white" bgColor={selectedPrivacy == "All"?"#0345fc":"#031f52"}
                  title ="Top" action={handleAll} />
                  <SelectButton color="white" bgColor={selectedPrivacy == "Public"?"#0345fc":"#031f52"}
                  title ="Public" action={handlePublic}/>
                  <SelectButton color="white" bgColor={selectedPrivacy == "Private"?"#0345fc":"#031f52"}
                  title ="Private" action={handlePrivate} />
                  {/* <SelectButton color="white" bgColor={selectedPrivacy == "Friend"?"#0345fc":"#031f52"} 
                  title ="Friends" action={handleFriend}/> */}
                  {/* <SelectButton color="white" bgColor={selectedPrivacy == "Invites"?"#0345fc":"#2e2b22"} 
                  title ="Invites" action={handleInvites}/> */}
              </View>
          </View>
          
    </>
  ),[selectedPrivacy,friendsChallengesList,showList,setShowList]);




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

      return (<Challenge key={item._id} isVisibleVertical={isVisibleVertical} challenge={item}  h={740} w={width}/> ) 
  
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
    <SafeAreaView className="min-w-full  bg-primary min-h-full">  
      <View
          style={{ flex: 1 }}
          className="min-h-full"
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



