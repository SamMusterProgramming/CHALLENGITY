import { View, Text, TouchableOpacity, Image, useWindowDimensions ,ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { icons } from '../constants';
import { router } from 'expo-router';
import { getInition, getTimeLapse } from '../helper';

import { getTopChallenges } from '../apiCalls';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwingingTitle from '../components/custom/SwingingTitle';
import Heart from '../components/custom/Heart';
import InstantChallengeDisplay from '../components/challenge/InstantChallengeDisplay';

export default function WatchList() {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,trendingChallenges,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications ,favouriteChallenge , setFavouriteChallenge} = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState(
                                                 [...favouriteChallenge.favourites].reverse()
                                                            )
  
    // const [displayData , setDisplayData] = useState(userPublicChallenges)
    const [indexList , setIndexList] = useState(1)
    const [displayData , setDisplayData] = useState([...favouriteChallenge.favourites].reverse().slice(0,6))
    const [isLoaded ,setIsLoaded] = useState(false)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState([...favouriteChallenge.favourites].reverse().length > 6 ? true:false)
    const [isChallengeSelected , setIsChallengeSelected] = useState(false)
    const [selectedChallenge , setSelectedChallenge] = useState(null)
    // const [color , setColor] = useState(selectedBox === "owner"? "#1418dc" : "#e10c1a")
    // const [selectColor , setSelectColor] = useState(selectedBox === "owner"? "white" : "white")
    const [friendsChallenges, setFriendsChallenges] = useState(null);
    const [refresh , Setrefresh] = useState(false)


    // useEffect(() => {
    //     setIsLoaded(true)
    //   }, [])



    const upload =   ()=> {
        const favChallenges = favouriteChallenge.favourites.reverse();
        let challenges = []
        favChallenges.forEach((ch)=> {
            const c = trendingChallenges.find(chall => chall._id === ch._id)
            if (c) challenges.push(c)
        })
        setBoxDisplayChallenges([...challenges])
        setDisplayData(challenges.slice(0,6))
        setMoreRight(challenges.length > 6 ? true:false)
        setIndexList(1)
      }
    

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
    setBoxDisplayChallenges([...favouriteChallenge.favourites].reverse())
    setDisplayData([...favouriteChallenge.favourites].reverse().slice(0,6))
    setMoreLeft(false)
    setMoreRight([...favouriteChallenge.favourites].reverse().length > 6 ? true:false)
   }, [favouriteChallenge])

  return (
   <>
    <SafeAreaView className="flex-1 min-w-full min-h-full bg-primary ">  
      <View
            // style={{ flex: 1 }}
            className="flex h-[100%] min-w-full flex-col justify-start items-center bg-white" >

                    <View className="mt-0  min-w-[100%] h-[7vh] flex-row px- gap- items-center justify-center rounde-bl-[70px]  g-[white] rounde-br-[70px] 
                              borde-l-2 borde-l-white borde-r-2 borde-r-white"
                          style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
                          
                          <TouchableOpacity
                                        onPress={()=>{ router.back()}}
                                        className="flex-col justify-center  items-center text-center w-[25%] h-[100%]">
                                             
                
                                              <View
                                              className="flex-row justify-center gap-2 items-center w-[100%] h-[100%] ">
                                                  <Image
                                                  className="w-[35%] h-[60%]"
                                                  source={icons.back}
                                                  resizeMethod='fill' />
                                                 
                                              </View>
                            </TouchableOpacity>
                          
                          <View
                              className="justify-end gap-3 px-  w-[50%] items-center  h-[100%] flex-col  g-[#eff6f9] ">
                                
      
                                <View
                                    className="justify-start gap-6 px-4  w-[100%] items-center h-[85%] flex-row rounded-tl-3xl rounded-tr-3xl bg-[#083d52] ">
                                          <View className="justify-start items-center min-h-[100%] flex-row ">
                                                <Image 
                                                  style={{width:width<= 330? 30:30 ,height:width <= 330? 30:30}}
                                                  className="w-[35px] h-[35px] rounded-full "
                                                  source={{uri : user.profile_img? user.profile_img  : avatar}}
                                                />
                                          </View>
                                          <View className="justify-center gap-  items-start h-[100%] flex-col ">
                                               
                                                  <Text className="font-pmedium  text-sm text-black">
                                                      <Text 
                                                      style={{fontSize:width<= 330? 8:9}}
                                                      className="font-black text-sm text-white">
                                                          {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                                                      </Text> 
                                                  </Text>
                                                  <Text 
                                                      style={{fontSize:width<= 330? 8:9}}
                                                      className=" text-sm text-blue-400 font-black">
                                                      {getInition(user.name)}Challenger
                                                  </Text>
                                          </View>
                                </View>          
                              </View>
                               <View
                                        className="flex-col justify-end  items-center w-[25%] h-[100%]">
                                        
                                              <View
                                                className="flex-row justify-center gap- bg-black rounded-lg items-center w-[80%] h-[80%] ">
                                                   {refresh ? (
                                                    <ActivityIndicator  size={24} color={"white"}/>
                                                    ):(
                                                    <TouchableOpacity
                                                        onPress={
                                                       
                                                            ()=>{
                                                            Setrefresh(true)
                                                            getTopChallenges(user._id , setTrendingChallenges)
                                                            setTimeout(() => {
                                                                Setrefresh(false)
                                                            }, 1000);
                                                        }
                                                    }
                                                        className="w-[100%] h-[100%] bg-black rounded-lg  flex-col justify-center items-center gap-">
                                                            <Image
                                                            source={icons.refresh}
                                                            resizeMethod='contain'
                                                            style={{height:width/14 , width:width/14}}
                                                            className="w-14 h-14  " />
                                                    </TouchableOpacity>
                                                    
                                                )}
                                              </View>
                                      
                             </View>
      
                    </View>


                
                    <View
                        style={{fontSize:11}}
                        className=" w-[100vw] h-[7vh] g-white rounde-tr-3xl flex-row justify-evenly items-center  border-t- borde-t-black">

                            <View className="justify-center items-center  rounded-lg bg-black rounde-br-3xl w-[23%] g-[#03471a] h-[85%] flex-col">
                              <Heart title="home" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.home} link="/timeline"/>
                            </View>
                            
                          
                            <View
                                        className="flex-row justify-center rounded-xl  border- bg-[#07326e] items-center gap-1 w-[50%] h-[85%]">
                                              
                                              <View
                                              className="flex-row justify-start rounded-xl items-center w-[20%] h-[100%] ">
                                                  <Image
                                                  className="w-[80%] h-[70%]"
                                                  source={icons.watchlist}
                                                  resizeMethod='contain' />
                                                
                                              </View>
                                              <View
                                              className="flex-col justify-center  items-center w-[40%] h-[100%] ">
                                                    <View
                                                      className="flex-row justify-center  items-center w-[100%] h-[100%] ">
                                                          <Text 
                                                               style={{fontSize:width/33}}
                                                               className="font-bold text-sm text-white">
                                                                   WatchList
                                                          </Text> 
                                                      
                                                    </View>
                                                    {/* <View
                                                      className="flex-row justify-center mt- items-center w-[100%] h-[60%] ">
                                                          <Text 
                                                               style={{fontSize:width/36}}
                                                               className="font-bold text-sm text-[#1071e0]">
                                                                  Challenges
                                                          </Text> 
                                                      
                                                    </View> */}
                                              </View>
                           </View>
                           <View className="justify-center items-center  rounded-lg bg-black rounde-br-3xl w-[23%] g-[#03471a] h-[85%] flex-col">
                              <Heart title="home" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.home} link="/timeline"/>
                        </View>
                           
                </View>

                


                <View
                style={{height: "84%"}}
                className="w-[100vw] mt-aut g-[#03095e] flex-col justify-start items-center" >
           {!selectedChallenge ?(
                <>
                    {/* <View 
                    style={{height:"7%"
               
                        }}
                    className="w-[100vw] flex-row justify-between px- items-center rounde-tr-3xl rounde-tl-3xl mt- mb- bg-[#151822] h-[40px]" >
                    
                        <View
                            className="w-[25%] h-[100%] rounded- -auto flex-row justify-center items-end">
                            
                                <TouchableOpacity
                                onPress={()=> { router.navigate({ pathname: '/PlayModeChallenges',params: {
                                  
                                    challengePrivacy:selectedPrivacy,
                                    displayChallenges:JSON.stringify(boxDisplayChallenges)
                                } }) 
                                }}
                                className="w-[85%] h-[80%] rounded-tl-3xl rounded-tr-3xl f flex-col justify-center items-center bg-[#090b0f]"
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
                        className="w-[30%] h-[100%] rounded-xl  flex-row justify-evenly items-center">
                            
                            
                            {refresh ? (
                                <ActivityIndicator  size={27} color={"white"}/>
                                ):(
                                <TouchableOpacity
                                    onPress={
                                        upload
                                  
                                }
                                    className="w-[30%] h-[100%] rounded-lg  flex-col justify-center items-center gap-">
                                        <Image
                                        source={icons.refresh}
                                        resizeMethod='contain'
                                        style={{height:width/14 , width:width/14}}
                                        className="w-14 h-14" />
                                </TouchableOpacity>
                                
                            )}
                        

                        </View>

                    </View> */}
                
                    <View
                    style={{borderLeftColor:"#10152d" ,borderRightColor:"#10152d"
                        , height:  "95%"}}
                    className="min-w-[100vw] px- py- borde-l-2  borde-r-2 flex-col border-t-4 border-t-black justify-center items-center bg- ">

                           
                                    <View 
                                    style={{borderLeftColor:"#10152d" ,borderRightColor:"#10152d",height:"100%"}}
                                    className="flex-row flex-wrap justify-start items-center borde-l-2 borde-r-2  px-1 gap-x-1 py-2 gap-y-2 min-w-[100%] bg-[#5e5e5b]">
                                        { displayData.map((challenge,index,width)=> {
                                    
                        
                                    return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={
                                                    ()=>
                                                        // router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })
                                                       setSelectedChallenge({...challenge})
                                                    }
                                                className="min-w-[32%] h-[49%] borde-2 borde-[#0505e6]  rounded-lg  ">
                                                <Image
                                                style={{with:'100%',height:"100%",borderRadius:5,backgroundColor:"black",opacity:0.5}}
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
                                                                
                                                                    <Image
                                                                        //  style={{height:width/12}}
                                                                        className="w-6 h-6 rounded-full"
                                                                        source={icons.invite}
                                                                        resizeMethod='cover' />
                                                                
                                                            </View> 
                                                    </View>

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
                                                            className="flec-row min--[65%] h-[100%] bg-[#524f4f] px-2 rounded-sm justify-center ml-auto items-center gap- ">
                                                         
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
                         
                            
                        </View>
                        </>
                    ):(
                               <InstantChallengeDisplay challenge = {selectedChallenge} setSelectedChallenge ={setSelectedChallenge}/>
      
                   )}
                       

                    </View>

        </View>
    </SafeAreaView>


   </>
  )
}