import { View, Text, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider';
import { icons } from '../constants';
import Challenge from '../components/challenge/Challenge';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import BoxChallenge from '../components/challenge/BoxChallenge';
import { getTimeLapse } from '../helper';
import SwingingTitle from '../components/custom/SwingingTitle';

export default function ParticipationManagement() {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState(publicParticipateChallenges)
  

    // const [displayData , setDisplayData] = useState(userPublicChallenges)


    const [indexList , setIndexList] = useState(1)
    const [displayData , setDisplayData] = useState(publicParticipateChallenges.slice(0,4))
    const [isLoaded ,setIsLoaded] = useState(false)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(publicParticipateChallenges.length > 4 ? true:false)
    const [isChallengeSelected , setIsChallengeSelected] = useState(false)
    const [selectedChallenge , setSelectedChallenge] = useState(null)
    const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(0)
    const {publ,priv,strict} =  useLocalSearchParams();


    useEffect ( () => {    
      if( publ =="true"|| priv =="true" || strict =="true") {
       publ =="true" && setSelectedPrivacy("Public")
       priv =="true" && setSelectedPrivacy("Private")
       strict =="true" && setSelectedPrivacy("Strict")
       setIsLoaded(true)
      }
    } , [] ) 


    useEffect(() => {
        setIsLoaded(true)
      }, [])

      useEffect(() => {
        setIsLoaded(true)
      }, [])
    
      const handleNext = ()=> {
        const newData = boxDisplayChallenges.slice( indexList * 4 , (indexList + 1)* 4);
        setDisplayData([ ...newData]);
        setIndexList(prev => prev + 1 )
     }
      
    const handleBack = ()=> {
    
       const newData = boxDisplayChallenges.slice((indexList - 2) * 4 , (indexList - 1 ) * 4);
        setDisplayData([...newData]);
       setIndexList(prev => prev - 1 )
    }
    
    useEffect(() => {
    
      (indexList -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
      (boxDisplayChallenges.length < (indexList) * 4)? setMoreRight(false) :setMoreRight(true)
    
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
        setBoxDisplayChallenges(publicParticipateChallenges)
        setDisplayData(publicParticipateChallenges.slice(0,4))
        setMoreRight(publicParticipateChallenges.length > 4 ? true:false)
        setMoreLeft(false)
 }
 
 const handlePrivate = ()=> {
    setIndexList(1)
    const challenges = privateParticipateChallenges.filter(challenge => challenge.audience !== "Strict")
    setBoxDisplayChallenges(challenges)
    setDisplayData(challenges.slice(0,4))
    setMoreRight(challenges.length > 4 ? true:false)
    setMoreLeft(false)
}

const handleStrict = ()=> {
//   const challenges1 = userPrivateChallenges.filter(challenge => challenge.audience === "Strict")
  const challenges = privateParticipateChallenges.filter(challenge => challenge.audience === "Strict")
  const data = challenges
  setIndexList(1)
  setBoxDisplayChallenges(data)
  setDisplayData(data.slice(0,4))
  setMoreRight(data.length >  4 ? true:false)
  setMoreLeft(false)

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

  return (

    <SafeAreaView className="bg-primary flex-1 min-w-full min-h-full">
       <View
         className="min-w-full  flex-col justify-center px- py-1 items-center bg- h-[100%]" >
            
            <View 
            //   style={{height:width/9}}
              className="w-[100vw] flex-row justify-between px-3 items-center rounded-tr-3xl rounded-tl-3xl  mb- bg-[#ecf1f2] h-[6%]" >
                <TouchableOpacity
                                                  onPress={()=> router.back()}
                                                  // style={{height:heigh * 0.07}}
                                                  className= "w-[15%] h-[100%]  bg- rounded-tl-[50px] flex-row justify-center items-center ">
                                                  <Image
                                                      source={icons.back1} 
                                                      resizeMethod='contain'
                                                      style={{width:width/13 ,height:width/13}}
                                                      className=""
                                                      />
                </TouchableOpacity>
                <View
                 className="w-[50%] h-[100%] rounded-md bg-whit flex-row justify-evenly items-center b-[#077c93]">
                      <TouchableOpacity
                       
                        onPress={()=>{
                           setSelectedPrivacy("Public")
                           setSelectedChallenge(null)
                        }}
                        
                        style={{backgroundColor:selectedPrivacy == "Public"?"#1539af":"#ecf1f2"}}
                        className=" w-[33%] h-[90%] rounded-md  flex-col justify-center items-center gap-">
                             <Image
                                source={icons.publi}
                                resizeMethod='contain'
                                style={{height:width/20 , width:width/20}}
                                className="w-10 h-10  rounded-fu" />
                              <Text 
                                style={{fontSize:width/50,
                                    color:selectedPrivacy == "Public"?"white":"black"}}
                                className="font-black text-sm text-black">
                                     Public
                              </Text>    
                      </TouchableOpacity>
                      <TouchableOpacity
                        
                        onPress={()=>{
                               setSelectedPrivacy("Private")
                               setSelectedChallenge(null)
                            }}
                        style={{backgroundColor:selectedPrivacy == "Private"?"#1539af":"#ecf1f2"}}
                        className="w-[33%] h-[90%] rounded-md bg-whit flex-col justify-center items-center gap-">
                             <Image
                              source={icons.priv}
                              resizeMethod='fill'
                              style={{height:width/20 , width:width/20}}
                              className=" rounded-full" />
                              <Text 
                                style={{fontSize:width/50,
                                    color:selectedPrivacy == "Private"?"white":"black"}}
                                className="font-black text-sm text-black">
                                     Private  
                              </Text>    
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={()=>{
                            setSelectedPrivacy("Strict")
                            setSelectedChallenge(null)
                         }}
                         style={{backgroundColor:selectedPrivacy == "Strict"?"#1539af":"#ecf1f2"}}
                        className="w-[33%] h-[90%] rounded-md  flex-col justify-center items-center gap-">
                             <Image
                              source={icons.strict}
                              resizeMethod='contain'
                              style={{height:width/20 , width:width/20}}
                              className="w-10 h-10 rounded-full" />
                              <Text 
                                style={{fontSize:width/50,
                                    color:selectedPrivacy == "Strict"?"white":"black"}}
                                className="font-black text-sm text-black">
                                     Strict 
                              </Text>   
                      </TouchableOpacity>

                </View>
                <TouchableOpacity
                                                  onPress={()=> router.back()}
                                                  // style={{height:heigh * 0.07}}
                                                  className= "w-[15%] h-[100%]  bg- rounded-tl-[50px] flex-row justify-center items-center ">
                                                  <Image
                                                      source={icons.next} 
                                                      resizeMethod='contain'
                                                      style={{width:width/13 ,height:width/13}}
                                                      className=""
                                                      />
                </TouchableOpacity>

             </View>

        
             <View
             style={{borderLeftColor:"#ecf1f2" ,borderRightColor:"#ecf1f2",height:"88%"}}
             className="min-w-[100vw] px- border-l-2  border-r-2 flex-col justify-center items-center  ">

                    {!selectedChallenge ?(
                             <View 
                             style={{borderLeftColor:"#ecf1f2" ,borderRightColor:"#ecf1f2",height:"100%"}}
                             className="flex-row flex-wrap justify-between items-center px-2 py-2 gap-y-2 min-w-[100%] h-[330px] bg-[#1f1f23]  ">
                                
                                
                                 {isLoaded && displayData.map((challenge,index,width)=> {
                                
                                  return (
                                     <TouchableOpacity
                                         key={index}
                                         onPress={
                                               ()=>{
                                                // router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })
                                               setSelectedChallenge({...challenge})
                                               setSelectedChallengeIndex(index)
                                               }
                                            }
                                         className="w-[49%] h-[49%] border-2 borde-[#0505e6]  rounded-lg ">
                                         <Image
                                         style={{with:'100%',height:"100%",borderRadius:5,backgroundColor:"black",opacity:0.5}}
                                         contentFit='contain'
                                         source={{uri:challenge.thumbNail_URL || "kmkmkmlk"}}
                                         />
                                             <View
                                             className="absolute top-0 flex-row w-[100%] px-2   h-5  opacity-100 rounded-t-lg justify-center items-center gap-3 ">
                                                 <Text className="text-white text-xs font-black"
                                                 style={{fontSize:7}}>
                                                 Challenge
                                                 </Text>
                                             </View>
 
                                             <View           
                                                 className="absolute  flex-row top-10 px-4 opacity-100  h-8 w-[100%] g-black  justify-between items-center  ">
                                                 <Image 
                                                 source={getIcon(challenge.type)}
                                                 className="w-7 h-7"
                                                 />
                                                  <Image 
                                                 source={getIcon(challenge.privacy)}
                                                 className="w-7 h-7"
                                                 />
                                                  <Image 
                                                 source={getIcon(challenge.audience)}
                                                 className="w-7 h-7"
                                                 />
                                             </View>

                                             <View
                                            
                                                 className="absolute  flex-row top-28  opacity-100  h-8 w-[100%] g-black  justify-between items-center  ">
                                                     <View
                                                     className="w-[50%] h-[60%] flex-col justify-center items-center gap-0">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:10}}>
                                                               {challenge.participants.length}
                                                            </Text>
                                                            <Image
                                                                //  style={{height:width/12}}
                                                                className="w-7 h-7 rounded-full"
                                                                source={icons.participate}
                                                                resizeMethod='cover' />
                                                    </View> 
                                                    <View
                                                     className="w-[50%] h-[60%] flex-col justify-center items-center gap-0">
                                                            <Text className="text-white text-xs font-black"
                                                               style={{fontSize:9}}>
                                                               {challenge.participants.length}
                                                            </Text>
                                                            <Image
                                                                //  style={{height:width/12}}
                                                                className="w-7 h-7 rounded-full"
                                                                source={icons.participate}
                                                                resizeMethod='cover'/>
                                                    </View> 
                                               
                                            </View>

                                            <View
                                              className="absolute  flex-row bottom-24  opacity-100  h-8 w-[100%] g-black  justify-center items-center  ">
                                                      <Image 
                                                        source={icons.play}
                                                        className="w-7 h-7"
                                                        />
                                             </View>

                                             <View
                                              className="absolute  flex-row bottom-12 opacity-100  h-8 w-[100%] g-black bg-gray-700 justify-center rounded-lg items-center  ">
                                                     <SwingingTitle text={challenge.desc} color="white" fontSize={7} />
                                             </View>
 
                                             <View
                                                 className="absolute bottom-0 flex-row w-[100%]  h-10 px-1 py-1 justify-start items-end gap-2 ">
                                                     <Image
                                                     className="w-7 h-7 rounded-full"
                                                     source={{uri:challenge.participants[0].profile_img}}
                                                     resizeMethod='cover' />
                                                     <Text className="text-white text-xs font-bold"
                                                     style={{fontSize:8}}>
                                                     {challenge.name}
                                                     </Text>
                                                     <View
                                                     className="flec-col h-[100%] justify-center ml-auto py-2 items-center gap- ">
                                                         
                                                        {getTimeLapse(challenge.creactedAt).substring(getTimeLapse(challenge.creactedAt).length-2) === "in" || getTimeLapse(challenge.creactedAt).substring(getTimeLapse(challenge.creactedAt).length-2) === "hr" ? (
                                                            <Text className="text-white  text-lg font-bold"
                                                               style={{fontSize:9}}>
                                                                New
                                                            </Text>
                                                        ) : (
                                                          <>
                                                          <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:9}}>
                                                                {getTimeLapse(challenge.createdAt)}
                                                          </Text>
                                                          <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:8}}>
                                                                ago
                                                          </Text>
                                                          </>
                                                        )} 
                                                          
                                                     </View>
                                             </View>
                                     </TouchableOpacity>
                                 )
                                 })}
 
                         </View>
                    ):(
                         <Challenge  isVisibleVertical={true} challenge={selectedChallenge}  h = {Platform.OS === "android" ? height * 0.93 : height * 0.78 } w = {width}/>

                    )}
                      
                </View>

                <View 
                        style={{backgroundColor:"#ecf1f2" }}
                        className= " w-[100%] h-[6%] flex-row px-6 justify-between rounded-bl-3xl rounded-br-3xl items-center bg-[#cff1f6] ">
                            
                            {!selectedChallenge ? 
                                (
                                    <>
                                         <TouchableOpacity
                                            className=" justify-center items-center "
                                            onPressIn={moreLeft? handleBack :()=>{}}
                                            >
                                                <Image   
                                                source={moreLeft?icons.leftArrow:""}
                                                className=" w-8 h-8 rounded-full"
                                                />
                                            </TouchableOpacity>
                                    

                                            <Text 
                                                style={{fontSize:width/36}}
                                                className="font-black ml-5 text-sm text-black">
                                                    user's participations
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
                                    </>
                                ):
                                (
                                    <>
                                        <TouchableOpacity
                                            className=" justify-center items-center "
                                            // onPressIn={moreLeft? handleBack :()=>{}}
                                            >
                                                {/* <Image   
                                                source={moreLeft?icons.leftArrow:""}
                                                className=" w-8 h-8 rounded-full"
                                                /> */}
                                        </TouchableOpacity>
                                    

                                        <TouchableOpacity
                                            className=" justify-center items-center "
                                            onPressIn={() => setSelectedChallenge(null)}
                                            >
                                                <Image   
                                                source={icons.x}
                                                className=" w-8 h-8 bg-white rounded-full"
                                                />
                                        </TouchableOpacity>
                                
                                        <TouchableOpacity
                                            className=" justify-center items-center   "
                                            onPress={()=>{
                                                // let index = selectedChallengeIndex
                                                // if(index === displayData.length) index = 0 
                                                // else index = index+1;
                                                // const data = displayData[index]
                                                // const participants =[]
                                                // data.participants.forEach(participant => 
                                                //     {
                                                //         participants.push(participant)
                                                //     })
                                                // const challenge = {
                                                //     _id:data._id,
                                                //     origin_id:data.origin_id,
                                                //     name:data.name,
                                                //     participants:[...participants],
                                                //     video_url:data.video_url,
                                                //     desc:data.desc,
                                                //     type:data.type,
                                                //     invited_friends:[...data.invited_friends],
                                                //     privacy:data.privacy,
                                                //     createdAt:data.
                                                //     createdAt,
                                                //     thumbNail_URL:data.thumbNail_URL

                                                // }
                                                // setSelectedChallengeIndex(index)
                                                // setSelectedChallenge(data)
                                            }}
                                            >
                                                {/* <Image   
                                                source={icons.forward}
                                                className=" w-8 h-8 bg-white rounded-full"
                                                /> */}
                                        </TouchableOpacity>

                                    </>
                                )
                            }
                                   
                            </View>

        
            {/* </View> */}


        </View>
    </SafeAreaView>
  )
}