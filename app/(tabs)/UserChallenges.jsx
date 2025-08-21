import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert, useWindowDimensions, ActivityIndicator, Platform, TextInput,  TouchableWithoutFeedback} from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getChallengeById, getFollowData, getUserFriendsData, getUserParticipateChallenges, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges } from '../../apiCalls'
import Challenge from '../../components/challenge/Challenge'
import { icons } from '../../constants'
import { router, useFocusEffect, useLocalSearchParams} from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { storage } from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoChallenge from '../../components/challenge/NoChallenge'
// import { SafeAreaView } from 'react-native-safe-area-context'
import FriendDisplayer from '../../components/profile/FriendDisplayer'
import CustomAlert from '../../components/custom/CustomAlert'
import SelectButton from '../../components/custom/SelectButton'
import UserSelectButton from '../../components/custom/UserSelectButton'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { clearLocalStorage } from '../../videoFiles'
import InfosProfile from '../../components/profile/InfosProfile'
import Heart from '../../components/custom/Heart'
import { getInition } from '../../helper'

import UserChallengeBox from '../../components/challenge/UserChallengeBox'
import FriendChallengeBox from '../../components/challenge/FriendChallengeBox'
import { useKeepAwake } from 'expo-keep-awake'
import InviteChallengeBox from '../../components/challenge/InviteChallengeBox'
import ShuffleLetters from '../../components/custom/ShuffleLetters'

export default function UserChallenges() {
  
    const {user,setUser,userPublicChallenges,notifications,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,trendingChallenges,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,smallScreen,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
  
      const [refreshing, setRefreshing] = useState(false);
      const [challengeData, setChallengeData] = useState(userPublicChallenges);
   
    
    
      // const {publ,priv,userChallenges,userParticipations,strict, selectedChallenge_id} =  useLocalSearchParams();
      const [isLoaded, setIsLoaded] = useState(false);
      const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    
      const [index,setIndex] = useState(2)
      const [displayData,setDisplayData] = useState([])
      const [boxDisplayData,setBoxDisplayData] = useState(userPublicChallenges)
    
      const navigation = useNavigation();
      const { width, height } = useWindowDimensions();
      const [showList, setShowList] = useState(true);
    
      const [selectedBox, setSelectedBox] = useState(1);
      const [refreshBox, setRefreshBox] = useState(false);
      const [friendsChallengesList, setFriendsChallengesList] = useState(null);
      const insets = useSafeAreaInsets();
      const [selectionMade, setSelectionMade] = useState(null);

      const [loaded, setLoaded] = useState(false);
      useKeepAwake();

      
       
      useFocusEffect(
        useCallback(() => {
          setSelectedBox(1)
          setLoaded(true)
            return () => {
              setLoaded(false)
              setSelectedBox(0)
            };
        }, [])
      );

     
     
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

    

 

  
    // useFocusEffect(
    //     useCallback(() => {
    //         return () => {
    //           setChallengeData([])
    //           setBoxDisplayData([])
    //           setDisplayData([])
    //           setSelectedPrivacy("Public")
    //         };
    //     }, [])
    // );
  
    
      // useEffect ( () => {    
      //   if(userChallenges =="true" || userParticipations =="true" || publ =="true" || priv =="true" || strict =="true" ) {
      //    userChallenges == "true" && setSelectedBox(1)
      //    publ == "true" && setSelectedPrivacy("Public")
      //    priv == "true" && setSelectedPrivacy("Private")
      //    userParticipations == "true" && setSelectedBox(2)
      //    strict =="true" && setSelectedPrivacy("Strict")
      //    setIsLoaded(true)
      //    setRefreshBox(true)
      //   }
      // } , [] ) 
    
      //****************************** you challenges ******************** */
    
      const handlePublic = ()=> {
        setChallengeData(userPublicChallenges)
     }
     
     const handlePrivate = ()=> {
       setChallengeData(userPrivateChallenges)
     }
     const handleParticipate = ()=> {
      setChallengeData(publicParticipateChallenges)
    }
    const handleInvited = ()=> {
      const challenge = privateParticipateChallenges.filter(challenge => {challenge.audience !== "Strict"})
      setChallengeData(challenge)
    }
    
    const handleStrict = ()=> {
      const challenge = privateParticipateChallenges.filter(challenge => challenge.audience === "Strict")
      setChallengeData(challenge)
    }
    
     useEffect(() => {
       switch (selectedPrivacy) {
         case "Public":
            handlePublic();
           break;
        case "Private":
            handlePrivate()
            break;
        case "Participate":
            handleParticipate()
            break;
        case "Invited":
            handleInvited()
            break;
        case "Strict":
            handleStrict()
            break;
         default:
           break;
       }
     }, [selectedPrivacy])
      
      useEffect ( () => {     
        setDisplayData(challengeData.slice(0,2))
        setIndex(2)
     } , [challengeData]) 
    
    
      return (
        <>
        {loaded && ( 
          <View 
           style={{ 
            paddingTop:Platform.OS == "ios" ? insets.top : insets.top
          }}
          className={Platform.OS == "ios" ? "flex-1 -[100%] flex-col justify-start items-center bg-black " :
              "flex-1 min--full flex-col justify-start items-center bg-black "
          }> 
                    
        
            
        <View className="  w-[100%] h-[7%] flex-row px-  b g-[#6b97b3] rounde-tl-xl  rounde-tr-xl items-end  bg[#0a144b] justify-between">
         <Image 
                                  
                  className="w-[100%] h-[100%]  "
                  source={icons.headline}
                  resizeMode = 'cover'
              />
        </View>

         <View className="  w-[100%] h-[10%] flex-row px- border-b-2  border-[#306c99] b g-[#e2eaef] rounde-tl-xl  rounde-tr-xl items-end  bg-[#000000] justify-between"
                  >
                        <View
                            className="justify-start rotate- 45 px-1 py-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#efe8e8] rounded-tr-3xl rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                          onPress={()=> {setDisplayNotificationsModal(true)}}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  p-2 rounded-full  bg-[#0a0a0a] flex-col">
                                                    <Image
                                                        style={{width:height * 0.03 ,height: height * 0.03}}
                                                        className="w-[25px]  h-[25px]  rounded-full g-white"
                                                        source={icons.notification}
                                                        resizeMethod='cover' />
                                                    <Text 
                                                          style={{fontSize:8}}
                                                          className="absolute top-0 p- right-0 w-5 h-5 rounded-full text-center bg-white font-black text-sm text-red-500">
                                                              {notifications.filter(not=>not.isRead == false).length}
                                                    </Text> 
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/CoverNewChallenge")}}
                                            className="justify-start items- rounded-full p-2 w- [50%] h-[100%]  borde-[#0a144b] bg-[#000000] flex-col">
                                                    <Image
                                                        style={{width:height* 0.03 ,height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full b g-white"
                                                        source={icons.newChallenge}
                                                        resizeMethod='cover' />
                                      </TouchableOpacity>
                        </View>

                        <View
                            className="justify-center py- 2  px- 4 gap- 2 w-[40%] items-end h- [100%] flex-row  b g-[#042a6c] rounde d-t-full b g-[#efe8e8] ">
                                      
                                      <View 
                                       style={{minWidth: width * 0.4 - height * 0.13 }}
                                       className="justify-center flex- 1 p y-2 items-center min-h-[50%] min-w-[20%] bg-[#efe8e8]  rounde-t-3xl flex-row "></View>

                                    <View className="justify-center pb-2   items-center w- [80%] bg-[#efe8e8] rounded-t-full flex-row ">
                                        <View
                                        className="flex-col p-2 bg-black rounded-full justify-center items-center">
                                                 <Image 
                                                      style={{width:height * 0.065 ,height: height * 0.065}}
                                                      className="w-[40px] h-[40px]  rounded-full "
                                                      source={{uri :  (user.profile_img? user.profile_img  : "")}}
                                                  />
                                        </View>
                                        
                                    </View>  
                                    <View
                                     style={{minWidth: width * 0.4 - height * 0.13 }}
                                     className="justify-center p y-2 items-center flex-1 min-h-[50%]  bg-[#efe8e8]  rounded -t-3xl flex-row "></View>
          
                        </View>
                        
                        <View
                            className="justify-end rotate- 45 px-1 p-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#efe8e8] rounded-tl-3xl rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/ProfilePage")}}
                                            className="justify-start items- center  rounded-full p-2 h-[100%] border-  bg-[#000000] g-[#fcfdff] flex-col">
                                                     <Image
                                                        style={{width:height * 0.03 , height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full b g-[#fefefe]"
                                                        source={icons.profile}
                                                        resizeMethod='cover' />                                    
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                          onPress={()=> {router.navigate("/SearchFriend")}}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  p-2 rounded-full  bg-[#000000] flex-col">
                                                    <Image
                                                        style={{width:height * 0.03 ,height: height * 0.03}}
                                                        className="w-[30px] h-[30px] rounded-full bg-black"
                                                        source={icons.watchlist}
                                                        resizeMethod='cover'/>
                                      </TouchableOpacity>
                        </View>
                  
                  </View>
                  
                  <View className="flex-row justify-center w-[100%] py- 2 h-[6%] items-center">
                    <ShuffleLetters text={"Track your Challenges"} textSize={12} />
                    {/* <TouchableOpacity
                        onPress={handleRefresh}
                        className=" absolute left-2  items-center ">
                          {refresh ? (
                            <ActivityIndicator size={25} />
                          ) : (
                            <Image 
                            className="w-8 h-8  rounded-full "
                            source={icons.refresh}
                          />
                          )}
                        
                    </TouchableOpacity> */}
                                                
                  </View>
                  
                  <View className=" w-[100vw] h-[7%]  mt- bg-[#dad1d1] rounde-tl-md rounde-tr-md px-   #041e9f
                      flex-row justify-evenly items-center">
                        <TouchableOpacity
                            onPress={()=>{setSelectedBox(1)
                                 }}
                            style={{ backgroundColor:selectedBox == 1 ?"#03133f":"black" }}
                            className="flex-col justify-center  items-center w-[24%] h-[90%] bg-[#10152d] border-2 rounded-md">
                                        <Text 
                                            style={{fontSize:width/47,
                                              color:selectedBox == 1 ?"white": "white"
                                            }}
                                            className="font-bold text-sm text-white">
                                                Your Challenges
                                        </Text>   
                                        <View
                                    
                                            className=" flex-col  justify-start  border-gray-500 rounded-lg items-center "
                                           >
                                            <Image
                                              style={{height:width/22,width:width/22}}
                                              className ="w-[15px] h-[15px]"
                                              source={selectedBox == 1 ?icons.down_arrow:icons.up_arrow}
                                              resizeMethod='contain'
                                            />
                                  
                                        </View>
                         </TouchableOpacity>
      
                         <TouchableOpacity
                            onPress={()=>{setSelectedBox(prev => 2)}}
                            style={{ backgroundColor:selectedBox == 2 ?"#03133f":"black" }}
                            className="flex-col justify-center  items-center w-[24%] h-[90%] bg-[#4f0465] border-2 rounded-md">
                                        <Text 
                                            style={{fontSize:width/47,
                                              color:selectedBox == 2 ?"white": "white"}}
                                            className="font-bold text-sm text-white">
                                                Your Participations
                                            
                                        </Text>   
                                        <View
                                            style={{width:width/5}}
                                            className=" flex-col  justify-center  border-gray-500 rounded-lg items-center "
                                            >
                                            <Image
                                              style={{height:width/22,width:width/22}}
                                              className ="w-[20px] h-[20px]"
                                              source={selectedBox == 2 ?icons.down_arrow:icons.up_arrow}
                                              resizeMethod='contain'
                                            />
                                  
                                        </View>
                         </TouchableOpacity>
      
                         <TouchableOpacity
                            onPress={()=>{setSelectedBox(3)}}
                            style={{ backgroundColor:selectedBox == 3 ?"#03133f":"black" }}
                            className="flex-col justify-center  items-center w-[24%] border-2 h-[90%] bg-[#cee1e2] rounded-md">
                                        <Text 
                                            style={{fontSize:width/47,
                                              color:selectedBox == 3 ?"white": "white"}}
                                            className="font-bold text-sm text-white">
                                                Invites to Challenge
                                            
                                        </Text>   
                                        <View
                                            style={{width:width/5}}
                                            className=" flex-col  justify-center  border-gray-500 rounded-lg items-center "
                                            >
                                            <Image
                                              style={{height:width/22,width:width/22}}
                                              className ="w-[20px] h-[20px]"
                                              source={selectedBox == 3 ?icons.down_arrow:icons.up_arrow}
                                              resizeMethod='contain'
                                            />     
                                  
                                        </View>
                         </TouchableOpacity>

                         <TouchableOpacity
                            onPress={()=>{setSelectedBox(4)}}
                            style={{ backgroundColor:selectedBox == 4 ?"#03133f":"black" }}
                            className="flex-col justify-center  items-center w-[24%] border-2 h-[90%] bg-[#cee1e2] rounded-md">
                                        <Text 
                                            style={{fontSize:width/47,
                                              color:selectedBox == 4 ?"white": "white"}}
                                            className="font-bold text-sm text-white">
                                                Friend's Challenge
                                            
                                        </Text>   
                                        <View
                                            style={{width:width/5}}
                                            className=" flex-col  justify-center  border-gray-500 rounded-lg items-center "
                                            >
                                            <Image
                                              style={{height:width/22,width:width/22}}
                                              className ="w-[20px] h-[20px]"
                                              source={selectedBox == 4 ?icons.down_arrow:icons.up_arrow}
                                              resizeMethod='contain'
                                            />
                                  
                                        </View>
                         </TouchableOpacity>
                  </View>
  
                  {/* <ScrollView className="bg- gray-100 flex-1 px-1 border-b-2 border-white max-w-[ 100%] max-h- [69%] rounded- xl bg-[#dad1d1] [#6a7c83]"> */}

                      {selectedBox == 1 && (
                          <UserChallengeBox selectedBox = "owner" refresh ={refreshBox} selectedPr = {selectedPrivacy}/>
                      )}
                      {selectedBox == 2 && (
                          <UserChallengeBox selectedBox = "participations" refresh ={refreshBox} selectedPr = {selectedPrivacy}/>
                      )}
                      {selectedBox == 3 && (
                          <InviteChallengeBox setSelectionMade={setSelectionMade} /> 
                          )}
                      {selectedBox == 4 && (
                            <FriendChallengeBox  friendsChallenges={friendsChallengesList.challenges}/> 
                          )}
                  {/* </ScrollView> */}
                
                <View
                style={{ minHeight: Platform.OS =="ios" ? width/7 + 7 : width/7 + 7, width:"100%"}}
                className="bg-[#dad1d1]"></View>
      

      
      </View>
        )}
       </>
       
      )
}