import { View, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
// import HeadLineChallengeList from '../headLights/HeadLineChallengeList';
import { icons, images } from '../../constants';
import { router } from 'expo-router';
import Challenge from './Challenge';
import { getTimeLapse } from '../../helper';
import SwingingTitle from '../custom/SwingingTitle';
import { getNotificationByUser, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, updateNotificationByUser } from '../../apiCalls';

export default function UserChallengeBox({selectedBox, refresh, selectedPr}) {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,notifications ,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState(userPublicChallenges)
  

    // const [displayData , setDisplayData] = useState(userPublicChallenges)


    const [indexList , setIndexList] = useState(1)
    const [displayData , setDisplayData] = useState(selectedBox === "owner" ? userPublicChallenges.slice(0,6): publicParticipateChallenges.slice(0,6))
    const [isLoaded ,setIsLoaded] = useState(false)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(userPublicChallenges.length > 6 ? true:false)
    const [isChallengeSelected , setIsChallengeSelected] = useState(false)
    const [selectedChallenge , setSelectedChallenge] = useState(null)
    const [color , setColor] = useState(selectedBox === "owner"? "#10152d" : "#10152d")
    const [selectColor , setSelectColor] = useState(selectedBox === "owner"? "white" : "white")
    const [refreshing , setRefreshing] = useState(refresh)
  



    useEffect(() => {
        setIsLoaded(true)
      }, [])



      useEffect(() => {
        setIsLoaded(true)
      }, [])
    
      const handleNext = ()=> {
        const newData = boxDisplayChallenges.slice( indexList * 6 , (indexList + 1)* 6);
        setDisplayData([ ...newData]);
        setIndexList(prev => prev + 1 )
     }
      
    const handleBack = ()=> {
    
       const newData = boxDisplayChallenges.slice((indexList - 2) * 6 , (indexList - 1 ) * 6);
        setDisplayData([...newData]);
       setIndexList(prev => prev - 1 )
    }
    
    useEffect(() => {
    
      (indexList -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
      (boxDisplayChallenges.length < (indexList) * 6)? setMoreRight(false) :setMoreRight(true)
    
    }, [indexList])
    
    
    
    const getIcon = (type) => {
        switch(type) {
          case "Public":
            return icons.publi
           break;
          case "Private":
            return icons.priv
           break;
    
           case "Open":
            return icons.open
           break;
          case "Restricted":
            return icons.restricted
           break;
           case "Strict":
            return icons.strict
           break;
    
          case "Adventure":
             return icons.adventure
            break;
          case "Dance":
             return icons.dance 
            break;
          case "Eating":
              return icons.eating 
             break;
          case "Fitness":
              return  icons.fitness 
             break;
          case "Magic":
            return icons.magic 
              break;
          case "Music":
            return icons.music 
               break;
          case "Science":
              return icons.science
               break;
          case "Sport":
               return icons.sport
               break;
          case "Game":
              return icons.game
              break;
          case "Diet":
              return icons.diet
              break;
          default:
            // setIcon("gray")
            break;
        }
      }
      //****************************** you challenges ******************** */

      
const handlePublic = ()=> {
        setIndexList(1)
        const challenges = selectedBox == "owner" ? userPublicChallenges : publicParticipateChallenges
        setBoxDisplayChallenges(challenges)
        setDisplayData(challenges.slice(0,6))
        setMoreRight(challenges.length > 6 ? true:false)
        setMoreLeft(false)
 }
 
 const handlePrivate = ()=> {
    setIndexList(1)
    const challenges = selectedBox == "owner" ? userPrivateChallenges.filter(challenge => challenge.audience !== "Strict")
                      : privateParticipateChallenges.filter(challenge => challenge.audience !== "Strict")
    setBoxDisplayChallenges(challenges)
    setDisplayData(challenges.slice(0,6))
    setMoreRight(challenges.length > 6 ? true:false)
    setMoreLeft(false)
}

const handleStrict = ()=> {
  const challenges = selectedBox == "owner" ?  userPrivateChallenges.filter(challenge => challenge.audience === "Strict"):
                      privateParticipateChallenges.filter(challenge => challenge.audience === "Strict")
  const data = challenges
  setIndexList(1)
  setBoxDisplayChallenges(data)
  setDisplayData(data.slice(0,6))
  setMoreRight(data.length >  6 ? true:false)
  setMoreLeft(false)
}

useEffect(() => {
    selectedPrivacy == "Public" && handlePublic()
    selectedPrivacy == "Private" && handlePrivate()
    selectedPrivacy == "Strict" && handleStrict()  
}, [userPublicChallenges,userPrivateChallenges , publicParticipateChallenges , privateParticipateChallenges])


const generateNewMatches = (challenge,notifications) => 
    { 
        let matchCount = 0;
        
       notifications.forEach(notification => {
         if(notification.content.challenge_id == challenge._id && !notification.isRead) {
            matchCount = matchCount + 1 ;
         }
       })
       if(matchCount !== 0) return `${matchCount}`
       return  " "
    }




useEffect(() => {
        switch (selectedPrivacy) {
          case "Public":
             handlePublic();
            break;
         case "Private":
             handlePrivate()
             break;
        
         case "Strict":
             handleStrict()
             break;
          default:
            break;
        }
}, [selectedPrivacy])

const handleRefresh = () => {
    setRefreshing(true)
    if(selectedBox === "owner"){  
        selectedPrivacy == "Public" && handlePublic()
        selectedPrivacy == "Private" && handlePrivate()
        selectedPrivacy == "Public" && handleStrict()  
    }
    else  {
        getUserPublicParticipateChallenges(user._id, setPublicParticipateChallenges)  
        getUserPrivateParticipateChallenges(user._id, setPrivateParticipateChallenges)  
        }
    getNotificationByUser(user._id,setNotifications)
        setTimeout(() => {
            setRefreshing(false)
        }, 1000);
}

useEffect(() => {
  if(refresh) {
    setSelectedPrivacy(selectedPr)
    onRefresh()
   }
}, [refresh])

const onRefresh = 
useCallback(
  () =>  {
    setRefreshing(true)
    if(selectedBox === "owner"){  
        getUserPublicChallenges(user._id , setUserPublicChallenges)
        getUserPrivateChallenges(user._id , setUserPrivateChallenges)
        getNotificationByUser(user._id , setNotifications)      
    }
    else  {
        getUserPublicParticipateChallenges(user._id, setPublicParticipateChallenges)  
        getUserPrivateParticipateChallenges(user._id, setPrivateParticipateChallenges)  
        }
    getNotificationByUser(user._id,setNotifications)
        setTimeout(() => {
            setRefreshing(false)
        }, 1000);
}
, []);


  return (
   <>
        <View
        style={{height:Platform.OS == "android" ? height * 0.68 : "68%"}}
        className="w-[100vw]  bg-[#09aadb] h-[68%] flex-col justify-start items-center" >

            
            <View 
              style={{height:Platform.OS == "android" ? width/7:"10%"
                   ,backgroundColor:color
                }}
              className="w-[100vw] flex-row justify-center px-3 items-center rounded-tr-3xl rounded-tl-3xl mt-0 mb- bg-[#09aadb] h-[40px]" >
                 
                <View
                 className="w-[50%] h-[80%] rounded-xl  flex-row justify-evenly items-center">
                      <TouchableOpacity
                       
                        onPress={()=>{
                           setSelectedPrivacy("Public")
                           setSelectedChallenge(null)
                        }}
                        
                        style={{backgroundColor:selectedPrivacy == "Public" ? selectColor : color}}
                        className=" w-[30%] h-[100%] rounded-lg py- flex-col justify-end items-center gap-">
                             <Image
                                source={icons.publi}
                                resizeMethod='fill'
                                style={{height:width/24 , width:width/24}}
                                className="w-8 h-8  rounded-full" />
                              <Text 
                                style={{
                                    fontSize:width/55,
                                    color:selectedPrivacy == "Public" ? "black" : "white"
                                }}
                                className="font-black text-sm text-black">
                                     Public
                              </Text>    
                      </TouchableOpacity>
                      <TouchableOpacity
                        
                        onPress={()=>{
                               setSelectedPrivacy("Private")
                               setSelectedChallenge(null)
                            }}
                        style={{backgroundColor:selectedPrivacy == "Private" ? selectColor : color}}
                        className="w-[30%] h-[100%] rounded-lg bg-whit flex-col justify-end items-center gap-">
                             <Image
                              source={icons.priv}
                              resizeMethod='fill'
                              style={{height:width/22 , width:width/22}}
                              className=" rounded-full" />
                              <Text 
                                style={{fontSize:width/55 ,
                                    color:selectedPrivacy == "Private" ? "black" : "white"
                                }}
                                className="font-black text-sm text-black">
                                     Private  
                              </Text>    
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={()=>{
                            setSelectedPrivacy("Strict")
                            setSelectedChallenge(null)
                         }}
                         style={{backgroundColor:selectedPrivacy == "Strict"? selectColor:color}}
                         className="w-[30%] h-[100%] rounded-lg  flex-col justify-end items-center gap-">
                             <Image
                              source={icons.strict}
                              resizeMethod='contain'
                              style={{height:width/22 , width:width/22}}
                              className="w-10 h-10 rounded-full" />
                              <Text 
                                style={{fontSize:width/55 ,
                                    color:selectedPrivacy == "Strict" ? "black" : "white"
                                }}
                                className="font-black text-sm text-black">
                                     Strict 
                              </Text>   
                             
                      </TouchableOpacity>

                </View>

                <View
                 className="w-[35%] h-[80%] rounded-xl ml-auto flex-row justify-center items-end">
                       
                        <TouchableOpacity
                          onPress={()=> { router.navigate({ pathname: '/PlayModeChallenges',params: {
                            box: selectedBox,
                            challengePrivacy:selectedPrivacy,
                            displayChallenges:JSON.stringify(boxDisplayChallenges)
                        } }) 
                         }}
                          className="w-[85%] h-[100%] rounded-lg flex-row justify-center items-center bg-[#283851]"
                        >
                            <Text 
                                style={{fontSize:width/35
                                }}
                                className="font-black text-sm text-secondary">
                                     Play Mode 
                              </Text>   
                        </TouchableOpacity>   
                </View>

                <View
                 className="w-[10%] h-[100%] rounded-xl ml-auto flex-row justify-evenly items-center">
                       {refreshing ? (
                     <ActivityIndicator  size={"large"} color={"white"}/>
                    ):(
                        <TouchableOpacity
                         onPress={handleRefresh}
                        >
                             <Image
                              source={icons.refresh}
                              resizeMethod='contain'
                              style={{height:width/12 , width:width/12}}
                              className="w-20 h-20" />
                        </TouchableOpacity>
                         
                    )}
                   
                 </View>

             </View>
        
             <View
             style={{borderLeftColor:color ,borderRightColor:color,
                height: Platform.OS == "android" ? height * 0.685 - 2 * width/7 : "79%"}}
  

             className="min-w-[100vw] px- bg-[#303032] border-l-2  border-r-2 h-[68%] flex-col text-center justify-center items-center  ">

                    {displayData.length > 0 && (
                             <View 
                             style={{borderLeftColor:color ,borderRightColor:color,height:"100%"}}
                             className="flex-row flex-wrap justify-start items-center border-l-2  border-r-2 px-[3px] gap-[2px] py-2 gap-y-2 min-w-[100%]  bg-[#303032]  ">
                                
                            {isLoaded &&  displayData.map((challenge,index)=> {
                               return (

                                     <TouchableOpacity
                                         key={index}
                                         onPress={
                                               ()=>{
                                                    router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })
                                                }
                                            //    setSelectedChallenge({...challenge})
                                            }
                                          style ={{ borderColor:generateNewMatches(challenge,notifications) !== " "? "white" :"" }}
                                          className="min-w-[32%] h-[49%] border-2 borde-[white]  rounded-lg  ">
                                         <Image
                                         style={{with:'100%',height:"100%",borderRadius:5,backgroundColor:"black",opacity:0.5}}
                                         contentFit='contain'
                                         source={{uri:challenge.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                         />
                                             <View
                                             className="absolute top-0 flex-row w-[100%] px-2 py-2 bg-black  h-8 g-black opacity-100 rounded-t-lg justify-start items-end gap-2 ">
                                                   <Image
                                                     className="w-6 h-6 rounded-full"
                                                     source={{uri:challenge.participants[0].profile_img}}
                                                     resizeMethod='cover' />
                                                   <Text className="text-white text-xs font-bold"
                                                     style={{fontSize:7}}>
                                                     {challenge.name.slice(0,15)}
                                                   </Text>
                                                                              
                                             </View>
 
                                             <TouchableOpacity
                                                 // hitSlop={Platform.OS === "android" &&{ top: 70, bottom: 70, left: 40, right: 40 }}
                                                 onPress={()=>router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })}
                                                 className="absolute  flex-row top-8 px-2 opacity-100  h-6 w-[100%] g-black  justify-between items-center  ">
                                                 <Image 
                                                 source={getIcon(challenge.type)}
                                                 className="w-5 h-5"
                                                 />
                                                  <Image 
                                                 source={getIcon(challenge.privacy)}
                                                 className="w-5 h-5"
                                                 />
                                                  <Image 
                                                 source={getIcon(challenge.audience)}
                                                 className="w-5 h-5"
                                                 />
                                             </TouchableOpacity>



                                             <View
                                                 className="absolute  flex-row top-14  opacity-100  h-4 w-[100%] g-black  justify-between items-center  ">
                                                     <View
                                                     className="w-[30%] h-[100%] flex-col justify-center items-center gap-0">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:6}}>
                                                               {challenge.type.toUpperCase().slice(0,5)}
                                                            </Text>
                                                   </View>
                                                   <View
                                                     className="w-[30%] h-[100%] flex-col justify-center items-center gap-0">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:6}}>
                                                               {challenge.privacy.toUpperCase().slice(0,8)}
                                                            </Text>
                                                   </View>
                                                   <View
                                                     className="w-[30%] h-[100%] flex-col justify-center items-center gap-0">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:6}}>
                                                               {challenge.audience.toUpperCase().slice(0,8)}
                                                            </Text>
                                                   </View>
                                             </View>


                                             <View
                                              className="absolute  flex-row top-24  opacity-100  h-8 w-[100%] g-black  justify-between items-center ">
                                                      <View
                                                       className="w-[30%] h-[60%] flex-row justify-center items-center gap-1">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:8}}>
                                                               {challenge.participants.length}
                                                            </Text>
                                                            <Image
                                                                //  style={{height:width/12}}
                                                                className="w-6 h-6 rounded-full"
                                                                source={icons.participate}
                                                                resizeMethod='cover' />
                                                    </View> 
                                                     <Image 
                                                        source={icons.play}
                                                        className="w-6 h-6"
                                                        />
                                                    <View
                                                     className="w-[30%] h-[60%] flex-row justify-center items-center gap-1">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:8}}>
                                                               {challenge.privacy == "Public"?"All":challenge.invited_friends.length}
                                                            </Text>
                                                            <Image
                                                                //  style={{height:width/12}}
                                                                className="w-6 h-6 rounded-full"
                                                                source={icons.invites}
                                                                resizeMethod='cover' />
                                                        
                                                    </View> 
                                             </View>

                                            {generateNewMatches(challenge,notifications) !== " " && (
                                             <View
                                                 className="absolute  flex-row top-0 opacity-100 bg-white rounded-md h-7 w-[100%] g-black  justify-center items-center  ">
                                                     <View
                                                     className="w-[100%] h-[100%] gap-2 flex-row justify-center items-center ">
                                                            <Text className="text-blue-500 text-xs font-black"
                                                               style={{fontSize:10}}>
                                                               {generateNewMatches(challenge,notifications)}
                                                            </Text>
                                                            <Text className="text-bold text-xs font-black"
                                                               style={{fontSize:8}}>
                                                               New 
                                                            </Text>
                                                            <Image
                                                                //  style={{height:width/12}}
                                                                className="w-7 h-7 rounded-full"
                                                                source={icons.vs}
                                                                resizeMethod='cover' />
                                                   </View>
                                                  
                                             </View>
                                             )}

                                             <View
                                              className="absolute  flex-row bottom-10 opacity-100  h-5 w-[100%] g-black bg-[#f0f4f8] rounded-sm justify-center items-center  ">
                                                     <SwingingTitle text={challenge.desc} color="black" fontSize={7} />
                                             </View>
 
                                             <View
                                                 className="absolute bottom-0 flex-row w-[100%]  h-8 px-1 py-1 justify-start items-end gap-1 ">
                                                    
                                                     <Image
                                                     className="w-7 h-7 rounded-full"
                                                     source={icons.newChallenge}
                                                     resizeMethod='cover' />
                                                     <View
                                                     className="flec-row min-w-[65%] h-[100%] bg-blue-700 px-2 rounded-full justify-center ml-auto items-center gap- ">
                                                         
                                                          <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:9}}>
                                                              {getTimeLapse(challenge.createdAt)}  ago
                                                          </Text>
                                                     </View>
                                                     
                                                 
                                             </View>
                                     </TouchableOpacity>
                                 )
                                 }
                                 )}

                                <TouchableOpacity
                                        className="absolute left-2 justify-center items-center opacity-50   "
                                        onPressIn={moreLeft? handleBack :()=>{}}
                                        >
                                            <Image   
                                            source={moreLeft ?icons.back_arrow:""}
                                            className="  w-14 h-20 rounded-full"
                                            resizeMethod='cover'
                                            />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    className="absolute right-2 justify-center items-center opacity-50  "
                                    onPressIn={moreRight? handleNext :()=>{}}
                                    >
                                        <Image   
                                        source={moreRight ?icons.next_arrow:""}
                                        className=" w-14 h-20 rounded-full"
                                        />
                                </TouchableOpacity>
                         </View>
                           
                                )}
                      
                        { displayData.length == 0 && (
                                    <TouchableOpacity 
                                     className ="px-2 py-2 flex-col justify-center items-center b-[#eff2f7] min-w-[80%] min-h-[30%] rounded-full " >
                                         <Image
                                            className="w-28 h-28 rounded-full"
                                            source={images.empty}
                                            resizeMethod='contain' />
                                             <Text className="text-white text-xs font-black"
                                                 style={{fontSize:10}}>
                                                 Empty List
                                             </Text>
                                    </TouchableOpacity>
                                 )}
                      
                </View>

                <View 
                            style={{backgroundColor:color ,
                            height:Platform.OS == "android" ? width/7:"10%"}}
                            className= " w-[100%] h-[40px] flex-row px-4 justify-between rounded-bl-md rounded-br-md items-center  ">
                            
                                    <TouchableOpacity
                                      className="w-[30%] h-[70%] flex-row g-[#032446] justify-start rounded-lg items-center   "
                                      onPressIn={()=>{}}
                                      >
                                         <View
                                              className="flex-col  w-[20%] g-black  justify-center items-center  ">
                                                    <Image   
                                                      source={icons.publi}
                                                      className=" w-7 h-7 rounded-full"
                                                      />
                                         </View>
                                         <View
                                              className="flex-col w-[90%] h-[80%] ml-2 g-black py-2 justify-center items-start    ">
                                                 <Text 
                                                      style={{fontSize:width/53}}
                                                      className="font-black  text-sm text-white">
                                                        Total  Public
                                                  </Text>  
                                                   <Text 
                                                      style={{fontSize:width/58}}
                                                      className="font-bold  text-sm text-white">
                                                       {selectedBox === "owner" ? "Challenges" : "Participations"} :{'  '}
                                                       { selectedBox === "owner" ? userPublicChallenges.length: publicParticipateChallenges.length}
                                                  </Text>  
                                          </View>
 
                                       
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      className="w-[30%] h-[70%] flex-row g-[#032446] justify-start rounded-lg items-center   "
                                      onPressIn={()=>{}}
                                      >
                                         <View
                                              className="flex-col  w-[20%] g-black  justify-center items-center  ">
                                                    <Image   
                                                      source={icons.priv}
                                                      className=" w-7 h-7 rounded-full"
                                                      />
                                         </View>
                                         <View
                                              className="flex-col w-[80%] h-[80%] ml-2 g-black py-2 justify-center items-start    ">
                                                 <Text 
                                                      style={{fontSize:width/53}}
                                                      className="font-black  text-sm text-white">
                                                        Total  Private
                                                  </Text>  
                                                   <Text 
                                                      style={{fontSize:width/58}}
                                                      className="font-bold  text-sm text-white">
                                                         {selectedBox === "owner" ? "Challenges" : "Participations"} :{'  '}
                                                         {selectedBox === "owner" ? userPublicChallenges.length: privateParticipateChallenges.length}

                                                  </Text>  
                                          </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                      className="w-[30%] h-[70%] flex-row g-[#032446] justify-start rounded-lg items-center   "
                                      onPressIn={()=>{}}
                                      >
                                         <View
                                              className="flex-col  w-[20%] g-black  justify-center items-center  ">
                                                    <Image   
                                                      source={icons.priv}
                                                      className=" w-7 h-7 rounded-full"
                                                      />
                                         </View>
                                         <View
                                              className="flex-col w-[80%] h-[80%] ml-2 g-black py-2 justify-center items-start    ">
                                                 <Text 
                                                      style={{fontSize:width/53}}
                                                      className="font-black  text-sm text-white">
                                                        Total  Private
                                                  </Text>  
                                                   <Text 
                                                      style={{fontSize:width/58}}
                                                      className="font-bold  text-sm text-white">
                                                         {selectedBox === "owner" ? "Challenges" : "Participations"} :{'  '}
                                                         {selectedBox === "owner" ? userPublicChallenges.length: privateParticipateChallenges.length}

                                                  </Text>  
                                          </View>
                                    </TouchableOpacity>
                                   

                 </View>

            </View>
            {/* </View> */}


   </>
  )
}