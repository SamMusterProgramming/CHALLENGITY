

import { View, Text, TouchableOpacity, Image, useWindowDimensions ,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants';
import { router } from 'expo-router';
// import Challenge from './Challenge';
import { getTimeLapse } from '../../helper';
import SwingingTitle from '../custom/SwingingTitle';

import { getTopChallenges } from '../../apiCalls';



export default function HeadLineChallengeList() {
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

      
// const handlePublic = ()=> {
//         setIndexList(1)
//         const challenges = selectedBox == "owner" ? userPublicChallenges : publicParticipateChallenges
//         setBoxDisplayChallenges(challenges)
//         setDisplayData(challenges.slice(0,6))
//         setMoreRight(challenges.length > 6 ? true:false)
//         setMoreLeft(false)
//  }
 
//  const handlePrivate = ()=> {
//     setIndexList(1)
//     const challenges = selectedBox == "owner" ? userPrivateChallenges.filter(challenge => challenge.audience !== "Strict")
//                       : privateParticipateChallenges.filter(challenge => challenge.audience !== "Strict")
//     setBoxDisplayChallenges(challenges)
//     setDisplayData(challenges.slice(0,6))
//     setMoreRight(challenges.length > 6 ? true:false)
//     setMoreLeft(false)
// }

// const handleStrict = ()=> {
//   const challenges = selectedBox == "owner" ?  userPrivateChallenges.filter(challenge => challenge.audience === "Strict"):
//                       privateParticipateChallenges.filter(challenge => challenge.audience === "Strict")
//   const data = challenges
//   setIndexList(1)
//   setBoxDisplayChallenges(data)
//   setDisplayData(data.slice(0,6))
//   setMoreRight(data.length >  6 ? true:false)
//   setMoreLeft(false)

// }

// useEffect(() => {
//         switch (selectedPrivacy) {
//           case "Public":
//              handlePublic();
//             break;
//          case "Private":
//              handlePrivate()
//              break;
        
//          case "Strict":
//              handleStrict()
//              break;
//           default:
//             break;
//         }
// }, [selectedPrivacy])


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
         style={{height:height * 0.7}}
         className="w-[100vw]  bg-white flex-col justify-start items-center" >
            <View 
              style={{height:width/7
                //    ,backgroundColor:color
                }}
              className="w-[100vw] flex-row justify-center px-3 items-center rounded-tr-3xl rounded-tl-3xl mt- mb- bg-[#10152d] h-[40px]" >
                 
                <View
                 className="w-[60%] h-[100%] rounded-xl  flex-row justify-evenly items-center">
                     
                       
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
                            className="w-[30%] h-[100%] rounded-lg  flex-col justify-center items-center gap-">
                                <Image
                                source={icons.refresh}
                                resizeMethod='contain'
                                style={{height:width/19 , width:width/19}}
                                className="w-16 h-16" />
                         </TouchableOpacity>
                         
                    )}
                   

                </View>

             </View>
        
             <View
             style={{borderLeftColor:"#10152d" ,borderRightColor:"#10152d",height:height* 0.69 - 2 *width/7}}
             className="min-w-[100vw] px- border-l-2  border-r-2 flex-col justify-center items-center  ">

                    {!selectedChallenge ?(
                             <View 
                             style={{borderLeftColor:"#10152d" ,borderRightColor:"#10152d",height:"100%"}}
                             className="flex-row flex-wrap justify-evenly items-center border-l-2  border-r-2  py-2 gap-y-2 min-w-[100%] h-[330px] bg-[#322f2e]  ">
                                 { friendsChallenges && displayData.map((challenge,index,width)=> {
                               
                               
                               return (
                                     <TouchableOpacity
                                         key={index}
                                         onPress={
                                               ()=>
                                                router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })
                                            //    setSelectedChallenge({...challenge})
                                            }
                                         className="w-[32%] h-[49%] border-2 borde-[#0505e6]  rounded-lg  ">
                                         <Image
                                         style={{with:'100%',height:"100%",borderRadius:5,backgroundColor:"black",opacity:0.5}}
                                         contentFit='contain'
                                         source={{uri:challenge.thumbNail_URL || "kmkmkmlk"}}
                                         />
                                             <View
                                             className="absolute top-0 flex-row w-[100%] px-2   h-5 g-black opacity-100 rounded-t-lg justify-center items-center gap-3 ">
                                                 <Text className="text-white text-xs font-black"
                                                 style={{fontSize:7}}>
                                                 Challenge
                                                 </Text>
                                             </View>
 
                                             <TouchableOpacity
                                                 // hitSlop={Platform.OS === "android" &&{ top: 70, bottom: 70, left: 40, right: 40 }}
                                                 onPress={()=>router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })}
                                                 className="absolute  flex-row top-5 px-4 opacity-100  h-8 w-[100%] g-black  justify-between items-center  ">
                                                 <Image 
                                                 source={getIcon(challenge.type)}
                                                 className="w-6 h-6"
                                                 />
                                                  <Image 
                                                 source={getIcon(challenge.privacy)}
                                                 className="w-6 h-6"
                                                 />
                                                  <Image 
                                                 source={getIcon(challenge.audience)}
                                                 className="w-6 h-6"
                                                 />
                                             </TouchableOpacity>


                                             <View
                                            
                                                 className="absolute  flex-row top-14  opacity-100  h-8 w-[100%] g-black  justify-between items-center  ">
                                                     <View
                                                     className="w-[50%] h-[60%] flex-col justify-center items-center gap-0">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:10}}>
                                                               {challenge.participants.length}
                                                            </Text>
                                                            <Text className="text-white text-xs font-bold"
                                                               style={{fontSize:7}}>
                                                                 Participants
                                                            </Text>
                                                    </View> 
                                                    <View
                                                     className="w-[50%] h-[60%] flex-col justify-center items-center gap-0">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:8}}>
                                                               {challenge.participants.length}
                                                            </Text>
                                                            <Text className="text-white text-xs font-bold"
                                                               style={{fontSize:7}}>
                                                                 Participants
                                                            </Text>
                                                    </View> 
                                               
                                               
                                             </View>

                                             <View
                                              className="absolute  flex-row top-24  opacity-100  h-8 w-[100%] g-black  justify-center items-center  ">
                                                      <Image 
                                                        source={icons.play}
                                                        className="w-6 h-6"
                                                        />
                                             </View>

                                             <View
                                              className="absolute  flex-row bottom-10 opacity-100  h-8 w-[100%] g-black  justify-center items-center  ">
                                                     <SwingingTitle text={challenge.desc} color="white" fontSize={7} />
                                             </View>
 
                                             <View
                                                 className="absolute bottom-0 flex-row w-[100%]  h-8 px-1 py-1 justify-start items-end gap-1 ">
                                                     <Image
                                                     className="w-7 h-7 rounded-full"
                                                     source={{uri:challenge.participants[0].profile_img}}
                                                     resizeMethod='cover' />
                                                     <Text className="text-white text-xs font-bold"
                                                     style={{fontSize:7}}>
                                                     {challenge.name.slice(0,10)}
                                                     </Text>
                                                     <View
                                                     className="flec-col h-[100%] justify-center ml-auto items-center gap- ">
                                                          <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:7}}>
                                                                {getTimeLapse(challenge.createdAt)}
                                                          </Text>
                                                          <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:8}}>
                                                                ago
                                                          </Text>
                                                     </View>
                                                     
                                                 
                                             </View>
                                     </TouchableOpacity>
                                 )
                                 })}
 
                         </View>
                    ):(
                         <Challenge  isVisibleVertical={true} challenge={selectedChallenge} h={height-100} w={width}/>

                    )}
                      
                </View>

                <View 
                        style={{backgroundColor:"#10152d" ,height:width/7}}
                        className= " w-[100%] h-[40px] flex-row px-4 justify-between rounded-bl-md rounded-br-md items-center  ">
                            
                                    <TouchableOpacity
                                    className=" justify-center items-center   "
                                    onPressIn={moreLeft? handleBack :()=>{}}
                                    >
                                        <Image   
                                        source={moreLeft?icons.leftArrow:""}
                                        className=" w-8 h-8 rounded-full"
                                        />
                                    </TouchableOpacity>
                            

                                    <Text 
                                        style={{fontSize:width/40}}
                                        className="font-bold ml-5 text-sm text-white">
                                          Invitation to challenge
                                    </Text>  
                        
                                    <TouchableOpacity
                                    className=" justify-center items-center   "
                                    onPressIn={moreRight ? handleNext:()=>{}}
                                    >
                                        <Image   
                                        source={moreRight ?icons.rightArrow:""}
                                        className=" w-8 h-8 rounded-full"
                                        />
                                </TouchableOpacity>

                 </View>

            </View>
            {/* </View> */}


   </>
  )
}