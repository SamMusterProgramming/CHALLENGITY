import { View, Text, TouchableOpacity, Image, useWindowDimensions ,ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import HeadLineChallengeList from '../headLights/HeadLineChallengeList';
import { icons } from '../../constants';
import { router } from 'expo-router';
import Challenge from './Challenge';
import { getTimeLapse } from '../../helper';
import SwingingTitle from '../custom/SwingingTitle';

import { getTopChallenges } from '../../apiCalls';
import InstantChallengeDisplay from './InstantChallengeDisplay';

export default function InviteChallengeBox() {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,trendingChallenges,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState(userPublicChallenges)
  

    // const [displayData , setDisplayData] = useState(userPublicChallenges)


    const [indexList , setIndexList] = useState(1)
    const [displayData , setDisplayData] = useState([])
    const [isLoaded ,setIsLoaded] = useState(false)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(userPublicChallenges.length > 6 ? true:false)
    const [isChallengeSelected , setIsChallengeSelected] = useState(false)
    const [selectedChallenge , setSelectedChallenge] = useState(null)
    // const [color , setColor] = useState(selectedBox === "owner"? "#1418dc" : "#e10c1a")
    // const [selectColor , setSelectColor] = useState(selectedBox === "owner"? "white" : "white")
    const [friendsChallenges, setFriendsChallenges] = useState(null);
    const [refresh , Setrefresh] = useState(false)


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

      



useEffect(() => {
    if(trendingChallenges.length > 0){
      const friends = userFriendData.friends;
    
      let challenges = []
      challenges = trendingChallenges.filter(challenge => 
                     (friends.find(friend => (friend.sender_id == challenge.origin_id))&& challenge.privacy === "Private"  
                         && challenge.invited_friends.find(friend => friend.sender_id === user._id))
                      // ||      challenge.participants.find(participant=>participant.user_id == friend.sender_id)
                    )
      setBoxDisplayChallenges(challenges)
      setDisplayData(challenges.slice(0,6))
      setFriendsChallenges({challenges:challenges})
      setMoreRight(challenges.length > 6 ? true:false)
                  }
   }, [trendingChallenges])

  return (
   <>

        <View
         style={{
          height:
          Platform.OS == "android" ? "72%" :
           "76%"
          }}
        className="w-[100vw]  bg-[#6a7c83] flex-col justify-start items-center" >
           {!selectedChallenge ? (
            <>
            <View 
              style={{height:Platform.OS == "android" ? "8%":"8%"
                //    ,backgroundColor:color
                }}
              className="w-[98%] flex-row justify-between px-1 items-center rounded-tr-lg rounded-tl-lg border-b-2 border-b-[#6a7c83] mt- mb- bg-[#10152d] h-[40px]" >
              
                <View
                 className="w-[35%] h-[80%] rounded-xl ml-auto flex-row justify-center items-end">
                       
                       <TouchableOpacity
                          onPress={()=> { router.navigate({ pathname: '/PlayModeChallenges',params: {
                            box: selectedBox,
                            challengePrivacy:selectedPrivacy,
                            displayChallenges:JSON.stringify(boxDisplayChallenges)
                        } }) 
                         }}
                          className="w-[85%] h-[90%] rounded-tl-3xl rounded-tr-3xl f flex-col justify-center items-center bg-[#061c49]"
                        >
                             <Image
                            source={icons.playmode}
                            resizeMethod='contain'
                            style={{height:width/24 , width:width/24}}
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
                 className=" h-[100%] rounded-xl ml-auto flex-row justify-evenly items-center">
                     
                       
                       {refresh ? (
                         <ActivityIndicator  size={"large"} color={"white"}/>
                          ):(
                         <TouchableOpacity
                            onPress={()=>{
                                Setrefresh(true)
                                getTopChallenges(user._id , setTrendingChallenges)
                                setTimeout(() => {
                                    Setrefresh(false)
                                }, 1000);
                            }}
                            className=" h-[100%] rounded-lg  flex-col justify-center items-center gap-">
                                <Image
                                source={icons.refresh}
                                resizeMethod='contain'
                                style={{height:width/12 , width:width/12}}
                                className="w-16 h-16" />
                         </TouchableOpacity>
                         
                    )}
                   

                </View>

             </View>
        
             <View
             style={{borderLeftColor:"[#6a7c83]" ,borderRightColor:"[#6a7c83]"
                , height: Platform.OS == "android" ? "92%" : "92%"}}
             className="min-w-[100vw] bg-[#6a7c83] px- border-l- rounded-lg border-r- flex-col justify-center items-center  ">

                    {!selectedChallenge ?(
                             <View 
                             style={{height:"100%"}}
                             className="flex-row flex-wrap justify-start items-center borde-l-2 borde-r-2  rounded-lg  px-1 gap-x-1 py-2 gap-y-1 min-w-[100%] bg-[#6a7c83]">
                                 { friendsChallenges && displayData.map((challenge,index,width)=> {
                               
                               
                               return (
                                     <TouchableOpacity
                                         key={index}
                                         onPress={
                                               ()=>
                                                // router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })
                                               setSelectedChallenge({...challenge})
                                            }
                                         className="min-w-[32%] h-[49%] border- borde-[#0505e6]  rounded-lg  ">
                                         <Image
                                         style={{with:'100%',height:"100%",borderRadius:5,backgroundColor:"black",opacity:0.7}}
                                         contentFit='contain'
                                         source={{uri:challenge.thumbNail_URL || "kmkmkmlk"}}
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
                                                 className="absolute  flex-row top-8 px-4 opacity-100  h-8 w-[100%] g-black  justify-between items-center  ">
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
                                              className="absolute  flex-row top-20  opacity-100  h-6 w-[100%] g-black  justify-evenly items-center  ">
                                                     
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
                                                          
                                                            <Image
                                                                //  style={{height:width/12}}
                                                                className="w-6 h-6 rounded-full"
                                                                source={icons.invite}
                                                                resizeMethod='cover' />
                                                        
                                                    </View> 
                                             </View>

                                             <View
                                                className="absolute  flex-row bottom-10 opacity-100  py-1 w-[100%] g-black bg-[#f0f4f8] rounded-sm justify-center items-center  ">
                                                     <SwingingTitle text={challenge.desc} color="black" fontSize={7} />
                                             </View>

                                             <View
                                                 className="absolute bottom-0 flex-row w-[100%]  h-8 px-1 py-1 justify-start items-end gap-1 ">
                                                    
                                                     <Image
                                                     className="w-7 h-7 rounded-full"
                                                     source={icons.newChallenge}
                                                     resizeMethod='cover' />
                                                    <View
                                                      className="flec-row  h-[100%] bg-[#524f4f] px-2 rounded- justify-center ml-auto items-center gap- ">
                                                          {/* <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:7}}>
                                                                {getTimeLapse(challenge.createdAt)}
                                                          </Text> */}
                                                          <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:7}}>
                                                              {getTimeLapse(challenge.createdAt)}  ago
                                                          </Text>
                                                     </View>
                                                     
                                                 
                                             </View>
 
                                  
                                     </TouchableOpacity>
                                 )
                                 })}

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
                    ):(
                         <Challenge  isVisibleVertical={true} challenge={selectedChallenge} h={height-100} w={width}/>

                    )}
                      
                </View>

                <View 
                        style={{backgroundColor:"#09aadb" ,
                            height:Platform.OS == "android" ? width/8:"0%"
                        }}
                        className= " w-[100%] h-[0px] flex-row px-4 justify-between rounded-bl-md rounded-br-md items-center  ">
                            
                            

                                    {/* <Text 
                                        style={{fontSize:width/40}}
                                        className="font-bold ml-5 text-sm text-white">
                                          Invitation to challenge
                                    </Text>   */}
                        
                                 

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