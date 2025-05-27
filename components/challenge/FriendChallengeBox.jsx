import { View, Text, TouchableOpacity, Image, useWindowDimensions ,ActivityIndicator, Platform, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import HeadLineChallengeList from '../headLights/HeadLineChallengeList';
import { icons } from '../../constants';
import { router } from 'expo-router';
import Challenge from './Challenge';
import { getTimeLapse } from '../../helper';
import SwingingTitle from '../custom/SwingingTitle';

import { getTopChallenges } from '../../apiCalls';


export default function FriendChallengeBox() {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,trendingChallenges,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState([])
  

    // const [displayData , setDisplayData] = useState(userPublicChallenges)


    const [indexList , setIndexList] = useState(1)
    const [displayData , setDisplayData] = useState([])
    const [isLoaded ,setIsLoaded] = useState(false)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(false)
    const [isChallengeSelected , setIsChallengeSelected] = useState(false)
    const [selectedChallenge , setSelectedChallenge] = useState(null)
    // const [color , setColor] = useState(selectedBox === "owner"? "#1418dc" : "#e10c1a")
    // const [selectColor , setSelectColor] = useState(selectedBox === "owner"? "white" : "white")
    const [friendsChallengesList, setFriendsChallengesList] = useState(null);
    const [refresh , Setrefresh] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState("all");
    const [refreshing , setRefreshing] = useState(refresh)


  


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
    if(friendsChallengesList){
      (indexList -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
      (boxDisplayChallenges.length < (indexList) * 6)? setMoreRight(false) :setMoreRight(true)
    }
    }, [indexList])
    
    useEffect(() => {
        if(friendsChallengesList){
            const challenges = friendsChallengesList.challenges.filter( challenge => challenge.privacy == selectedPrivacy )
            setBoxDisplayChallenges(challenges)
            setDisplayData(challenges.slice(0,6))
            setIndexList(1)
            setMoreRight(challenges.length > 6 ? true : false)
            setMoreLeft(false)     
        }
        }, [selectedPrivacy])
    
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
      //****************************** friend's challenges ******************** */

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
  if(friendsChallengesList) {
    setBoxDisplayChallenges(friendsChallengesList.challenges.filter( challenge => challenge.privacy == selectedPrivacy )  )
    setDisplayData(friendsChallengesList.challenges.filter( challenge => challenge.privacy == selectedPrivacy ) .slice(0,6))
    setIndexList(1)
    setMoreRight(friendsChallengesList.challenges.filter( challenge => challenge.privacy == selectedPrivacy )  .length >6 ? true : false)
    setMoreLeft(false)
    setSelectedPrivacy("Public")
  }

}, [friendsChallengesList])

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
        setIndexList(1)
    }
   }, [trendingChallenges])


   useEffect(() => {
    if(selectedFriend !== "all"){
        let challenges = []
        challenges = trendingChallenges.filter(challenge => 
         ((selectedFriend.sender_id == challenge.origin_id) && challenge.privacy == "Public")
          ||  ((selectedFriend.sender_id == challenge.origin_id) && challenge.privacy == "Private"  
          && challenge.audience !== "Strict" && !challenge.invited_friends.find(friend => friend.sender_id == user._id))
         )
        challenges.length > -1 && setFriendsChallengesList({challenges:challenges})
    }else {
        const friends = userFriendData.friends;
        let challenges = []
        challenges = trendingChallenges.filter(challenge => 
          (friends.find(friend => (friend.sender_id == challenge.origin_id) && challenge.privacy == "Public")
          || (friends.find(friend => (friend.sender_id == challenge.origin_id))&& challenge.privacy == "Private"  
          && challenge.audience !== "Strict" && !challenge.invited_friends.find(friend => friend.sender_id == user._id))
  
         ))  
        challenges.length > 0 && setFriendsChallengesList({challenges:challenges})
    }

   }, [selectedFriend])


   const handleRefresh = () => {
    setRefreshing(true)
    getTopChallenges(user._id,setTrendingChallenges)
    setSelectedFriend("all")
        setTimeout(() => {
            setRefreshing(false)
        }, 1000);
}


  return (
   <>

        <View
        style={{height:Platform.OS == "android" ? height * 0.78 : 554}}
        className="w-[100vw]  bg-[#044743] px- flex-col justify-start items-center h-[78vh]" >
            <View 
              style={{height:"8%"
                }}
              className="w-[100%] h-[100%] px-4 rounded-tr-3xl rounded-tl-3xl flex-row justify-between items-center border-b-2 border-white  bg-white [#061c29] " >
                   
                <View
                 className="w-[40%] h-[80%] flex-row bg-[#06163d] rounded-lg justify-center items-center ">
                    <View
                     className="w-[30%] h-[100%] flex-col b-[#1046e6] justify-center items-center ">
                        {selectedFriend == "all" ?  (
                             <Image   
                             source={icons.invites}
                             className=" w-8 h-8 rounded-full"
                             resizeMethod='contain'
                                />
                        ): (
                            <Image   
                            source={{uri:selectedFriend.profile_img}}
                            className=" w-8 h-8 rounded-full"
                            resizeMethod='contain'
                               />
                        )}
                    </View>

                    <View
                     className="w-[70%] h-[80%] flex-col b-[#1046e6] justify-center items-start ">
                          <Text 
                               style={{fontSize:width/47}}
                               className="font-bold ml-5 text-sm text-white">
                                  {selectedFriend == "all" ?"All Friends" : selectedFriend.name} 
                          </Text>  
                          <Text 
                               style={{fontSize:width/47}}
                               className="font-bold ml-5 text-sm text-blue-400">
                                  Challenges
                          </Text>  
                    </View>
                       
                    
                </View>

                <View
                 className="p-2  flex-row justify-evenly rounded-full bg-green-500 items-center">
                       {refreshing ? (
                     <ActivityIndicator  size={"small"} color={"white"}/>
                    ):(
                        <TouchableOpacity
                         onPress={handleRefresh}
                        >
                             <Image
                              source={icons.refresh}
                              resizeMethod='contain'
                              style={{height:width/19 , width:width/19}}
                              className="w-20 h-20 " />
                        </TouchableOpacity>
                         
                    )}
                   
                </View>

                <View
                 className="w-[40%] h-[80%] flex-row bg-[#020d15] rounded-lg justify-center gap-2 items-center ">
                     <TouchableOpacity
                       
                       onPress={()=>{
                          setSelectedPrivacy("Public")
                          setSelectedChallenge(null)
                       }}
                       
                       style={{backgroundColor:selectedPrivacy == "Public" ? "#5e91b8" : "#020d15"}}
                       className=" w-[45%] h-[80%] rounded-lg  flex-row justify-center bg-[#053a08] items-center gap-1">
                            <Image
                               source={icons.publi}
                               resizeMethod='contain'
                               style={{height:width/22 , width:width/22}}
                               className="w-8 h-8  rounded-full" />
                             <Text 
                               style={{
                                   fontSize:width/50,
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
                       style={{backgroundColor:selectedPrivacy == "Private" ? "#5e91b8" : "#020d15"}}
                       className="w-[45%] h-[80%] rounded-lg bg-whit flex-row justify-center items-center gap-1">
                            <Image
                             source={icons.priv}
                             resizeMethod='fill'
                             style={{height:width/22 , width:width/22}}
                             className=" rounded-full" />
                             <Text 
                               style={{fontSize:width/50 ,
                                   color:selectedPrivacy == "Private" ? "black" : "white"
                               }}
                               className="font-black text-sm text-black">
                                    Private  
                             </Text>    
                     </TouchableOpacity>
                </View>


                

               

             </View>
        
             <View
             style={{borderLeftColor:"#032e3a" ,borderRightColor:"#032e3a"
                , height:  "80%"}}
             className="min-w-[100vw] px- borde-l-2  borde-r-2 flex-col justify-center items-center  ">

                    {!selectedChallenge ?(
                             <View 
                             style={{borderLeftColor:"white" ,borderRightColor:"white",height:"100%"}}
                             className="flex-row flex-wrap justify-start items-center border-l-2 border-r-2 borde-[#fafafa] px-[3px] gap-[2px] py-2 gap-y-2 min-w-[100%] bg-[#303032]">
                                 { friendsChallengesList && displayData.map((challenge,index,width)=> {
                               
                               
                               return (
                                     <TouchableOpacity
                                         key={index}
                                         onPress={
                                               ()=>
                                                router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })
                                            //    setSelectedChallenge({...challenge})
                                            }
                                         className="min-w-[32%] h-[49%] border-2 border-[#07071b]  rounded-lg  ">
                                         <Image
                                         style={{with:'100%',height:"100%",borderRadius:5,backgroundColor:"black",opacity:0.5}}
                                         contentFit='contain'
                                         source={{uri:challenge.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                         />
                                             <View
                                             className="absolute top-0 flex-row w-[100%] px-2 py-2  h-8 bg-black opacity-100 rounded-t-lg justify-start items-end gap-3 ">
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
                                                 className="absolute  flex-row top-16  opacity-100  h-4 w-[100%] g-black  justify-between items-center  ">
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
                                              className="absolute  flex-row top-24  opacity-100  h-8 w-[100%] g-black  justify-evenly items-center  ">
                                                     
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

                                             <View
                                              className="absolute  flex-row bottom-14 opacity-100  h-5 w-[100%] bg-white rounded-sm justify-center items-center  ">
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
                                                          {/* <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:7}}>
                                                                {getTimeLapse(challenge.createdAt)}
                                                          </Text> */}
                                                          <Text className="text-white  text-xs font-bold"
                                                            style={{fontSize:9}}>
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
                        style={{
                            height:"12%"
                        }}
                        className= "w-[100vw] border- h-[100%] px-1 py-2 order-white bg-white  [#061c29] flex-row px- justify-center  items-center  ">
                            
                             <TouchableOpacity
                                            onPress={()=> {setSelectedFriend("all")}}
                                            style={{ backgroundColor:selectedFriend == "all" ? "blue" : "black"
                                         }}
                                            className="w-[15%] h-[100%] flex-col justify-start py-2 rounded-l-lg bg-[#0d0c0c]  items-center gap-">
                                              <Image
                                            source={icons.invites}
                                            resizeMethod='contain'
                                            style={{height:width/16 , width:width/16}}
                                            className="w-14 h-14 mt- rounded-full" />
                                            <Text 
                                                style={{
                                                fontSize : 6
                                                }}
                                                className="font-black text-sm text-white">
                                                     All Friends
                                            </Text>    
                             </TouchableOpacity>

                            <View
                            className= "w-[82vw] border- -[100%]  order-white px- bg-black " >
                                
                                        <FlatList
                                        data={userFriendData.friends}
                                        keyExtractor={(item)=> item.sender_id}
                                        //    ListHeaderComponent={() => {
                                        //          return (
                                        //             <TouchableOpacity
                                        //                 onPress={()=> {setSelectedFriend("all")}}
                                        //                 style={{ backgroundColor:selectedFriend == "all" ? "blue" : "black"
                                        //              }}
                                        //                 className=" min-w-[15vw] h-[100%] flex-col justify-center  rounded-l-xl bg-[#0d0c0c]  items-center gap-1">
                                        //                   <Image
                                        //                 source={icons.invites}
                                        //                 resizeMethod='contain'
                                        //                 style={{height:width/15 , width:width/15}}
                                        //                 className="w-16 h-16 mt-2 rounded-full" />
                                        //                 <Text 
                                        //                     style={{
                                        //                     fontSize : 6
                                        //                     }}
                                        //                     className="font-black text-sm text-white">
                                        //                          All Friends
                                        //                 </Text>    
                                        //             </TouchableOpacity>
                                        //             )
                                                
                                        //    }}
                                        // ListFooterComponent={() => {
                                        //     return (
                                        //     <View
                                        //         className=" w-[8vw] h-[100%] flex-col justify-center bg-black border-tl-3xl  items-center gap-2">
                                                
                                        //     </View>)
                                            
                                        // }}
                                        renderItem={
                                            ({item,index}) => {
                                            return (
                                            <TouchableOpacity
                                                    key={index}
                                                    onPress={()=> {
                                                        setSelectedFriend(item)
                                                    }}
                                                    style={{ backgroundColor:selectedFriend.sender_id == item.sender_id ? "blue" : "black"
                                                        ,borderRadius:selectedFriend.sender_id == item.sender_id ? 5 : 0
                                                        // ,borderTopLeftRadius:index == 0 ? 20 :0 ,borderBottomLeftRadius:index == 0 ? 20 :0 
                                                    }}
                                                    className="w-[18vw] h-[100%]  flex-col justify-start py-2 items-center ">
                                                        <Image
                                                        source={{uri:item.profile_img}}
                                                        resizeMethod='contain'
                                                        style={{height:width/16 , width:width/16}}
                                                        className="w-14 h-14 mt- rounded-full" />
                                                        <Text 
                                                            style={{
                                                            fontSize : 6
                                                            }}
                                                            className="font-black text-sm text-white">
                                                                {item.name.slice(0,13)}
                                                        </Text>    
                                            </TouchableOpacity>)
                                            }
                                        }
                                        horizontal={true}
                                        pagingEnabled ={false}
                                        />
                                </View>  

                                <View
                                  className=" w-[2vw] h-[100%] flex-col justify-center bg-[#0b0a0a] rounded-r-lg  items-center ">    
                                </View>

                 </View>

            </View>
            {/* </View> */}


   </>
  )
}