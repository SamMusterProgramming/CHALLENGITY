import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert, useWindowDimensions, ActivityIndicator, Platform, TextInput,  TouchableWithoutFeedback} from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { getChallengeById, getFollowData, getUserFriendsData, getUserParticipateChallenges, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges } from '../../../apiCalls'
import Challenge from '../../challenge/Challenge'
import { icons } from '../../../constants'
import { router, useFocusEffect, useLocalSearchParams} from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { storage } from '../../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoChallenge from '../../challenge/NoChallenge'
// import { SafeAreaView } from 'react-native-safe-area-context'
import FriendDisplayer from '../../profile/FriendDisplayer'
import CustomAlert from '../../custom/CustomAlert'
import SelectButton from '../../custom/SelectButton'
import UserSelectButton from '../../custom/UserSelectButton'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { clearLocalStorage } from '../../../videoFiles'
import InfosProfile from '../../profile/InfosProfile'
import Heart from '../../custom/Heart'
import { getInition } from '../../../helper'

import UserChallengeBox from '../../challenge/UserChallengeBox'
import FriendChallengeBox from '../../challenge/FriendChallengeBox'
import { useKeepAwake } from 'expo-keep-awake'
import InviteChallengeBox from '../../challenge/InviteChallengeBox'
import ShuffleLetters from '../../custom/ShuffleLetters'

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
      const [refresh , setRefresh] = useState(false)
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

    
    const handleRefresh = () =>{
      setRefresh(true)
     
      setTimeout(() => {
         setRefresh(false)
      }, 1000);
    }
 

  
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
                    
        
            
        <View className="  w-[100%] h-[1%] flex-row px-  b g-[#6b97b3] rounde-tl-xl  rounde-tr-xl items-end  bg[#0a144b] justify-between">
      
        </View>

        <View className="flex-row  bg-[#000000]  justify-between min-w-[100%] px-2 pb-1  h-[7%] items-end">
              <View
              className="h-[100%] w-[20%] px -8 flex-row  bg-[#000000]  justify-start  gap-4   items-end">
                  <TouchableOpacity 
                        onPress={()=> {router.navigate("/CoverNewChallenge")}}
                         className="justify-center items-center  w-[100%] h-[100%] gap-2  bg-[#000000] flex-col">
                                                    <Image
                                                        style={{width:height* 0.04 ,height: height * 0.04}}
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
              </View>

              <View
              className="h-[100%] flex- 1 flex-col justify-center items-center">
                  <Text 
                        style={{fontSize:20,
                          fontStyle:"italic"
                      }}
                      className="font-black  text-yellow-500">
                         User Challenges
                  </Text>  
                  <Text 
                        style={{fontSize:11,
                          // fontStyle:"italic"
                      }}
                      className="font-black mt-auto text-white">
                         {user.name}
                  </Text> 
              </View>

              <View
              className="h-[100%] w-[20%] flex-row  bg-[#000000]  justify-start  gap-4   items-end">
                  

                  <TouchableOpacity 
                    onPress={()=>{ setSelectedBox(4) }}
                    style={{ backgroundColor:selectedBox == 4 ?"#2c3138":"black" }}
                    className="justify-center p-1 px -2 items-center h-[100%] w-[100%] gap-2 rounded-b-lg flex-col ">
                            <Image
                                style={{width:height* 0.04 ,height: height * 0.04}}
                                className="w-[27px]  h-[27px]  "
                                source={icons.watchlist}
                                resizeMethod='cover' />      
                            <Text 
                              style={{fontSize:8,
                              fontStyle:"italic"
                                }}
                                className="font-black  text-white">
                                    WatchList
                            </Text>   
                  </TouchableOpacity>
              </View>
        </View>

         <View className="  w-[100%] h-[10%] flex-row px-  b g-[#e2eaef] rounde-tl-xl  rounde-tr-xl items-end  bg-[#000000] justify-between"
                  >
                        <View
                            className="justify-start rotate- 45 px-1 py-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#303030] [#093396] rounded-tr-3xl rounde-tr-3xl  ">
                                      <TouchableOpacity 
                                        onPress={()=>{ setSelectedBox(1) }}
                                        style={{ backgroundColor:selectedBox == 1 ?"white":"black" }}
                                        className="justify-center p-2 items-end h- [100%] gap-1 rounded-full flex-row ">
                                                <Image
                                                    className="w-[27px]  h-[27px]  "
                                                    source={icons.challenge}
                                                    resizeMethod='cover' />      
                                               
                                      </TouchableOpacity>
                                     
                                      <TouchableOpacity 
                                        onPress={()=>{ setSelectedBox(2) }}
                                        style={{ backgroundColor:selectedBox == 2 ?"white":"black" }}
                                        className="justify-center p-2 items-end h- [100%] gap-1 rounded-full flex-row ">
                                                <Image
                                                    className="w-[27px]  h-[27px]  "
                                                    source={icons.participate}
                                                    resizeMethod='cover' />      
                                               
                                      </TouchableOpacity>
                        </View>

                        <View
                            className="justify-center py- 2  px- 4 gap- 2 w-[40%] items-end h- [100%] flex-row  b g-[#042a6c] rounde d-t-full b g-[#efe8e8] ">
                                      
                                      <View 
                                       style={{minWidth: width * 0.4 - height * 0.13 }}
                                       className="justify-center flex- 1 p y-2 items-center min-h-[50%] min-w-[20%] bg-[#303030] [#093396]  rounde-t-3xl flex-row "></View>

                                    <View className="justify-center pb-2   items-center w- [80%] bg-[#303030] [#093396] rounded-t-full flex-row ">
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
                                     className="justify-center p y-2 items-center flex-1 min-h-[50%]  bg-[#303030] [#093396]  rounded -t-3xl flex-row "></View>
                                     <TouchableOpacity
                                        onPress={handleRefresh}
                                        className=" absolute top-0 left-0 justify-center items-center ">
                                          {refresh ? (
                                            <ActivityIndicator size={25} color="red"/>
                                          ) : (
                                            <Image 
                                            className="w-7 h-7  rounded-full "
                                            source={icons.refresh}
                                          />
                                          )}
                                    </TouchableOpacity>    
                                    <TouchableOpacity
                                        onPress={handleRefresh}
                                        className=" absolute top-0 right-0 items-center ">
                                            <Image 
                                            className="w-8 h-8  rounded-full "
                                            source={icons.search}
                                          />
                                    </TouchableOpacity>      
          
                        </View>
                        
                        <View
                            className="justify-end rotate- 45 px-1 p-2 gap-4 w-[30%] items-center borde-2  borde-white h- [70%] flex-row bg-[#303030] [#093396] rounded-tl-3xl rounde-tr-3xl  ">
                                  
                                       <TouchableOpacity 
                                        onPress={()=>{ setSelectedBox(3) }}
                                        style={{ backgroundColor:selectedBox == 3 ?"white":"black" }}
                                        className="justify-center p-2 items-end h- [100%] gap-1 rounded-full flex-row ">
                                                <Image
                                                    className="w-[27px]  h-[27px]  "
                                                    source={icons.invites}
                                                    resizeMethod='cover' />      
                                                
                                      </TouchableOpacity>
                                      <TouchableOpacity 
                                          // onPress={()=> {setDisplayNotificationsModal(true)}}
                                          onPress={()=>{ setSelectedBox(4) }}
                                          style={{ backgroundColor:selectedBox == 4 ?"white":"black" }}
                                            className="justify-start items-start w- [50%] h- [80%] pb- 6  p-2 rounded-full  bg-[#0a0a0a] flex-col">
                                                    <Image
                                                        style={{width:height * 0.03 ,height: height * 0.03}}
                                                        className="w-[27px]  h-[27px]  rounded-full g-white"
                                                        source={icons.notification}
                                                        resizeMethod='cover' />
                                                    <Text 
                                                          style={{fontSize:8}}
                                                          className="absolute top-0 p- right-0 w-5 h-5 rounded-full text-center bg-yellow-700 font-black text-sm text-white">
                                                              {notifications.filter(not=>not.isRead == false).length}
                                                    </Text> 
                                      </TouchableOpacity>
                        </View>
                  
                  </View>
                  
                
                  
                
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
                style={{ minHeight: Platform.OS =="ios" ? width/7 + 5 : width/7 + 5, width:"100%"}}
                className="bg-black"></View>
      
      </View>
        )}
       </>
       
      )
}