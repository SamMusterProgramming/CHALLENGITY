import { View, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
// import HeadLineChallengeList from '../headLights/HeadLineChallengeList';
import { icons, images } from '../../constants';
import { router, useLocalSearchParams } from 'expo-router';
import Challenge from './Challenge';
import { getTimeLapse } from '../../helper';
import SwingingTitle from '../custom/SwingingTitle';
import { getChallengeById, getNotificationByUser, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, updateNotificationByUser } from '../../apiCalls';
import InstantChallengeDisplay from './InstantChallengeDisplay';
import AnimatedCircleText from '../custom/AnimatedCircleText';
import AnimatedRightLeftText from '../custom/AnimatedRightLeftText';

export default function UserChallengeBox({selectedBox, refresh,  selectedPr}) {
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
        selectedPrivacy == "Stric" && handleStrict()  
        getUserPrivateChallenges(user._id, setUserPrivateChallenges)  
        getUserPublicChallenges(user._id, setUserPublicChallenges) 
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
        style={{
          height:
          Platform.OS == "android" ? "72%" :
           "76%"
          }}
        className="min-w-[100%] flex-  -[77%]  bg-[#6a7c83] border--4 borde-[#6a7c83] flex-col justify-start items-center" >

        {!selectedChallenge ? (
          <>
            <View 
              style={{
                // height:
                // Platform.OS == "android" ? width/8:
                // "9%"
                   backgroundColor:color
                }}
              className="w-[98%] h-[8%] flex-row justify-start px-1 items-center border-b-2 border-b-[#6a7c83] rounded-tr-lg rounded-tl-lg mt-0 mb- bg-[#6a7c83] " >
                 
                <View
                 className="w-[40%] h-[80%] rounded-xl  flex-row justify-evenly items-center">
                      <TouchableOpacity
                       
                        onPress={()=>{
                           setSelectedPrivacy("Public")
                           setSelectedChallenge(null)
                        }}
                        
                        style={{backgroundColor:selectedPrivacy == "Public" ? selectColor : color}}
                        className=" w-[30%] h-[100%] rounded-sm py-2 flex-col justify-center items-center gap-">
                             <Image
                                source={icons.publi}
                                resizeMethod='fill'
                                style={{height:width/32 , width:width/32}}
                                className="w-7 7-8  rounded-xl" />
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
                        className="w-[30%] h-[100%] rounded-sm py-2 bg-whit flex-col justify-center items-center gap-">
                             <Image
                              source={icons.priv}
                              resizeMethod='fill'
                              style={{height:width/28 , width:width/28}}
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
                         className="w-[30%] h-[100%] rounded-sm py-2  flex-col justify-center items-center gap-">
                             <Image
                              source={icons.strict}
                              resizeMethod='contain'
                              style={{height:width/28 , width:width/28}}
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
                 className="w-[25%] h-[100%] rounded- -auto flex-row justify-center items-end">
                       
                        <TouchableOpacity
                          onPress={()=> { router.navigate({ pathname: '/PlayModeChallenges',params: {
                            box: selectedBox,
                            challengePrivacy:selectedPrivacy,
                            displayChallenges:JSON.stringify(boxDisplayChallenges)
                        } }) 
                         }}
                          className="w-[85%] h-[80%] rounded-tl-3xl rounded-tr-3xl f flex-col justify-center items-center bg-[#090b0f]"
                        >
                             <Image
                            source={icons.playmode}
                            resizeMethod='contain'
                            style={{height:width/28 , width:width/28}}
                            className="w-10 h-10 rounded-full" />
                            <Text 
                                style={{fontSize:width/55
                                }}
                                className="font-black text-sm text-secondary">
                                     Action Mode 
                              </Text>   
                        </TouchableOpacity>   
                </View>

                <View
                 className="w-[10%] h-[100%] rounded-xl ml-auto flex-row justify-evenly items-center">
                       {refreshing ? (
                     <ActivityIndicator  size={width/20} color={"white"}/>
                    ):(
                        <TouchableOpacity
                         onPress={handleRefresh}
                        >
                             <Image
                              source={icons.refresh}
                              resizeMethod='contain'
                              style={{height:width/14 , width:width/14}}
                              className="w-20 h-20" />
                        </TouchableOpacity>
                         
                    )}
                   
                 </View>

             </View>
        
             <View
             style={{borderLeftColor:"#09aadb" ,borderRightColor:"#09aadb",
                // height: 
                // Platform.OS == "android" ? height * 0.74 - 1 * width/8  : 
                // "90%"
              }}
                className="min--[100%] h-[92%] flex- px- b-black [#6a7c83] border-l- rounded-lg border-r- -[68%] flex-col text-center justify-center items-center">
                  {/* {!selectedChallenge ? (
                     <> */}
                      {displayData.length > 0 && (
                             <View 
                             style={{borderLeftColor:color ,borderRightColor:color}}
                             className="flex-row flex- h-[100%] flex-wrap justify-center items-center rounded-lg borde-l-2  borde-r-2 px-1 gap-x-1 py-1 gap-y-1 min-w-[100%]  bg-[#6a7c83]  ">
                                
                            {isLoaded &&  displayData.map((challenge,index)=> {
                               return (

                                     <TouchableOpacity
                                         key={index}
                                         onPress={
                                               ()=>{
                                                    // router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })
                                                    setSelectedChallenge({...challenge})
                                                    // setSelectionMade({...challenge})
                                                }
                                            }
                                          style ={{ borderColor:generateNewMatches(challenge,notifications) !== " "? "white" :"" }}
                                          className="min-w-[31.5%] h-[49%] border- borde-[white]  rounded-lg  ">
                                         <Image
                                         style={{with:'100%',height:"100%",borderRadius:5,backgroundColor:"black",opacity:0.7}}
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
                                                       className="w-[30%] h-[60%] flex-col justify-center items-center gap-1">
                                                           
                                                            <Image
                                                                //  style={{height:width/12}}
                                                                className="w-6 h-6 rounded-full"
                                                                source={icons.participate}
                                                                resizeMethod='cover' />
                                                                <Text className="text-white text-xs font-black"
                                                                  style={{fontSize:8}}>
                                                                  {challenge.participants.length}
                                                                </Text>
                                                    </View> 
                                                     <Image 
                                                        source={icons.play}
                                                        className="w-10 h-10"
                                                        />
                                                    <View
                                                     className="w-[30%] h-[60%] flex-col justify-center items-center gap-1">
                                                           
                                                            <Image
                                                                //  style={{height:width/12}}
                                                                className="w-6 h-6 rounded-full"
                                                                source={icons.invites}
                                                                resizeMethod='cover' />
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:8}}>
                                                               {challenge.privacy == "Public"?"All":challenge.invited_friends.length}
                                                            </Text>
                                                        
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
                                              className="absolute  flex-row bottom-10 opacity-100  py-1 w-[100%] g-black bg-[#f7f7f7] rounded-sm justify-center items-center  ">
                                                     <SwingingTitle text={challenge.desc} color="black" fontSize={7} />
                                                     {/* <AnimatedRightLeftText title ={challenge.desc} width={100}/> */}
                                             </View>
 
                                             <View
                                                 className="absolute bottom-0 flex-row w-[100%]  h-8 px-1 py-1 justify-start items-end gap-1 ">
                                                    
                                                     <Image
                                                     className="w-7 h-7 rounded-full"
                                                     source={icons.newChallenge}
                                                     resizeMethod='cover' />
                                                     <View
                                                     className="flec-row min--[65%] h-[100%] bg-[#524f4f] px-2 rounded-sm justify-center ml-auto items-center gap- ">
                                                         
                                                          <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:7}}>
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
{/* 
                         </>
                       ):(
                                  <InstantChallengeDisplay challenge = {selectedChallenge} />
         
                       )} */}
                      
                </View>

                </>
                       ):(
                                  <InstantChallengeDisplay challenge = {selectedChallenge} setSelectedChallenge ={setSelectedChallenge}/>
         
                 )}

            </View>
            {/* </View> */}


   </>
  )
}