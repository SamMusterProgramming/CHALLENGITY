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
import { SafeAreaView } from 'react-native-safe-area-context'
import { clearLocalStorage } from '../../videoFiles'
import InfosProfile from '../../components/profile/InfosProfile'
import Heart from '../../components/custom/Heart'
import { getInition } from '../../helper'

import UserChallengeBox from '../../components/challenge/UserChallengeBox'
import FriendChallengeBox from '../../components/challenge/FriendChallengeBox'
import { useKeepAwake } from 'expo-keep-awake'
import InviteChallengeBox from '../../components/challenge/InviteChallengeBox'

export default function UserChallenges() {
  
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,trendingChallenges,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,smallScreen,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
  
      const [refreshing, setRefreshing] = useState(false);
      const [challengeData, setChallengeData] = useState(userPublicChallenges);
   
    
    
      const {publ,priv,userChallenges,userParticipations,strict, selectedChallenge_id} =  useLocalSearchParams();
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

      const [selectionMade, setSelectionMade] = useState(null);


      useKeepAwake();



    
     
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

    

 

  
    useFocusEffect(
        useCallback(() => {
            // setSelectedBox(1)
            return () => {
              setChallengeData([])
              setBoxDisplayData([])
              setDisplayData([])
              // setSelectedBox(0)
              setSelectedPrivacy("Public")
            };
        }, [])
    );
  
    
      useEffect ( () => {    
        if(userChallenges =="true" || userParticipations =="true" || publ =="true" || priv =="true" || strict =="true" ) {
         userChallenges == "true" && setSelectedBox(1)
         publ == "true" && setSelectedPrivacy("Public")
         priv == "true" && setSelectedPrivacy("Private")
         userParticipations == "true" && setSelectedBox(2)
         strict =="true" && setSelectedPrivacy("Strict")
         setIsLoaded(true)
        //  setTimeout(() => {
         setRefreshBox(true)
        //  }, 500);
        }
      } , [] ) 
    
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
        // challengeData.length >= 2 ? setDisplayData(challengeData.slice(0,2)) : setDisplayData(challengeData)
        setDisplayData(challengeData.slice(0,2))
        setIndex(2)
     } , [challengeData]) 
    
    
      return (
        <SafeAreaView className="bg-primary flex-1 min--full ">

          <View 
          // style={{minHeight:Platform.OS == "ios" ? "100%":"100%"}}
          className={Platform.OS == "ios" ? "flex-1 -[100%] flex-col justify-start items-center bg-white " :
              "flex-1 min--full flex-col justify-start items-center bg-white "
          }> 
                    
                    <View
                        style={{fontSize:11}}
                        className=" w-[100vw] h-[7%] bg-white rounde-bl-3xl rounde-br-3xl flex-row justify-center items-center  border-t- border-t-black">
                          
                          <View
                                        className="flex-col justify-center  items-center text-center w-[25%] h-[100%]">
                                             
                                             <Text 
                                                      style={{fontSize:width/50}}
                                                      className="font-black text-sm text-black ">
                                                        Participations
                                              </Text> 
                                      
                                              
                                              <View
                                              className="flex-row justify-center gap-2 items-end w-[100%] h-[50%] ">
                                                  <Image
                                                  className="w-6 h-6"
                                                  source={icons.participate}
                                                  resizeMethod='contain' />
                                                  <Text 
                                                      style={{fontSize:width/35}}
                                                      className="font-black text-sm text-black">
                                                       5
                                                  </Text> 
                                              </View>
                          </View>
                          
                           <Image
                           className="w-[46%] h-[20vh] mt-[32%]"
                           resizeMethod='cover'
                           source= {icons.challengify} />

                             <View
                                        className="flex-col justify-center  items-center w-[25%] h-[100%]">
                                       <View
                                        className="flex-col justify-center  items-center w-[100%] h-[100%]">
                                               <Text 
                                                      style={{fontSize:width/50}}
                                                      className="font-black text-sm text-black">
                                                        Total Challenges
                                              </Text> 
                                              <View
                                              className="flex-row justify-center gap-2  items-end w-[100%] h-[50%] ">
                                                  <Image
                                                  className="w-[25px] h-[90%]"
                                                  source={icons.challenge}
                                                  resizeMethod='cover' />
                                                  <Text 
                                                      style={{fontSize:width/25}}
                                                      className="font-black text-sm text-black ">
                                                        {userPrivateChallenges.length + userPublicChallenges.length}
                                                  </Text> 
                                              </View>
                                       </View>
                             </View>
                    </View>
      
                    <View className="mt-0  w-[99%] h-[7%] flex-row px-1 gap-1 items-center justify-center rounded-bl-[40px]  bg-[white] rounded-br-[40px] 
                              borde-l-2 borde-l-white borde-r-2 borde-r-white"
                          style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
                          
                          {/* <View className="justify-center items-center  rounded-bl-3xl rounded-br-3xl w-[25%] bg-[#03471a] h-[100%] flex-col">
                              <Heart title="Participations" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.participate} link="/ParticipationManagement"/>
                          </View> */}
                          
                          <View
                              className="justify-end gap-3 px-  w-[49%] items-center  h-[100%] flex-col  bg-[#eff6f9] ">
                                
      
                                <View
                                    className="justify-start gap-6 px-4  w-[100%] items-center h-[85%] flex-row rounded-tl-3xl rounded-tr-3xl bg-[#010e13] ">
                                          <View className="justify-start items-center min-h-[100%] flex-row ">
                                                <Image 
                                                  style={{width:width<= 330? 35:32 ,height:width <= 330? 35:32}}
                                                  className="w-[35px] h-[35px] rounded-full "
                                                  source={{uri : user.profile_img? user.profile_img  : avatar}}
                                                />
                                          </View>
                                          <View className="justify-center gap-  items-start h-[100%] flex-col ">
                                               
                                                  <Text className="font-pmedium  text-sm text-black">
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
                          {/* <View className="justify-center items-center rounded-bl-3xl rounded-br-3xl  bg-[#083bf5]  w-[25%]   h-[100%] flex-col ">
                            <Heart title="User Challenge" color1 = '#b0611c' color2 = '#633711' icon ={icons.challenge} link="/challengeManagement"/>
                          </View> */}
      
                    </View>
      
      
                    <View className=" w-[100%] h-[7%]  mt- bg-[#fefeff] rounde-t-xl   
                      flex-row justify-evenly items-center">
                       <View className="justify-center items-center rounded-lg bg-[#031d4a]  min-w-[23%]  h-[90%] flex-col">
                                      <Heart title="Watchlist" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.watchlist} link="/WatchList"/>
                       </View>
                       <View className=" w-[50%] h-[90%]  bg-[#161515]  rounded-lg
                           flex-row justify-center items-center">
                               
                                  <View
                                      className="flex-row justify-start  items-center w-[50%] bg-whi h-[100%]">
                                       <View
                                        className="flex-col justify-center  items-center w-[100%] h-[100%]">
                                               <Text 
                                                      style={{fontSize:width/55}}
                                                      className="font-black text-sm text-white ">
                                                        Winning 
                                              </Text> 
                                              <View
                                              className="flex-row justify-center  items-center w-[100%] h-[60%] ">
                                                  <Image
                                                  className="w-[30px] h-[80%]"
                                                  source={icons.trophy}
                                                  resizeMethod='cover' />
                                                  <Text 
                                                      style={{fontSize:width/25}}
                                                      className="font-black text-sm text-white ">
                                                       5
                                                  </Text> 
                                              </View>
                                       </View>
                                             
                                  </View>
      
                                  <View
                                      className="flex-row justify-start  items-center w-[50%] bg-whi h-[100%]">
                                       <View
                                        className="flex-col justify-center  items-center w-[100%] h-[100%]">
                                               <Text 
                                                      style={{fontSize:width/55}}
                                                      className="font-black text-sm text-white ">
                                                        Total Challenges
                                              </Text> 
                                              <View
                                              className="flex-row justify-center gap-2  items-center w-[100%] h-[60%] ">
                                                  <Image
                                                  className="w-[22px] h-[80%]"
                                                  source={icons.challenge}
                                                  resizeMethod='cover' />
                                                  <Text 
                                                      style={{fontSize:width/25}}
                                                      className="font-black text-sm text-white ">
                                                        {userPrivateChallenges.length + userPublicChallenges.length}
                                                  </Text> 
                                              </View>
                                       </View>
                                             
                                  </View>
                   
                       </View >
                       <View className="justify-center items-center   w-[23%] rounded-lg bg-[#031d4a]   h-[90%] flex-col ">
                             <Heart title="New Challenge" color1 = '#b0611c' color2 = '#633711' icon ={icons.newChallenge} link="/CoverNewChallenge"/>
                      </View>
                  </View>
      
            
  
                  
                  <View className=" w-[100vw] h-[7%]  mt- bg-[#6a7c83] rounde-tl-md rounde-tr-md px-   #041e9f
                      flex-row justify-evenly items-center">
                        <TouchableOpacity
                            onPress={()=>{setSelectedBox(1)
                                 }}
                            style={{ backgroundColor:selectedBox == 1 ?"#cee1e2":"black" }}
                            className="flex-col justify-center  items-center w-[24%] h-[90%] bg-[#10152d] border-2 rounded-md">
                                        <Text 
                                            style={{fontSize:width/47,
                                              color:selectedBox == 1 ?"black": "white"
                                            }}
                                            className="font-bold text-sm text-white">
                                                Your Challenges
                                        </Text>   
                                        <View
                                            // style={{width:width/5}}
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
                            style={{ backgroundColor:selectedBox == 2 ?"#cee1e2":"black" }}
                            className="flex-col justify-center  items-center w-[24%] h-[90%] bg-[#4f0465] border-2 rounded-md">
                                        <Text 
                                            style={{fontSize:width/47,
                                              color:selectedBox == 2 ?"black": "white"}}
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
                            style={{ backgroundColor:selectedBox == 3 ?"#cee1e2":"black" }}
                            className="flex-col justify-center  items-center w-[24%] border-2 h-[90%] bg-[#cee1e2] rounded-md">
                                        <Text 
                                            style={{fontSize:width/47,
                                              color:selectedBox == 3 ?"black": "white"}}
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
                            style={{ backgroundColor:selectedBox == 4 ?"#cee1e2":"black" }}
                            className="flex-col justify-center  items-center w-[24%] border-2 h-[90%] bg-[#cee1e2] rounded-md">
                                        <Text 
                                            style={{fontSize:width/47,
                                              color:selectedBox == 4 ?"black": "white"}}
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
                
                
      

      
              </View>
        </SafeAreaView>
       
      )
}