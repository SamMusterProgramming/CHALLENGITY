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

export default function WatchList() {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,trendingChallenges,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications ,favouriteChallenge , setFavouriteChallenge} = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState([...favouriteChallenge.favourites].reverse())
  
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
            className="flex h-[100%] min-w-full flex-col justify-start items-center" >

                
                    <View
                        style={{fontSize:11}}
                        className=" w-[100vw] h-[6vh] bg-white rounde-tl-3xl rounde-tr-3xl flex-row justify-center items-start  border-t- border-t-black">
                            <View
                                        className="flex-col justify-center  items-center text-center w-[25%] h-[100%]">
                                             
                                             {/* <Text 
                                                      style={{fontSize:width/50}}
                                                      className="font-black text-sm text-black ">
                                                        Participations
                                              </Text>  */}
                                      
                                              
                                              <View
                                              className="flex-row justify-center gap-2 items-end w-[100%] h-[100%] ">
                                                  <Image
                                                  className="w-[50%] h-[90%]"
                                                  source={icons.favourite}
                                                  resizeMethod='fill' />
                                                  <Text 
                                                      style={{fontSize:width/25}}
                                                      className="font-black text-sm text-black">
                                                       5
                                                  </Text> 
                                              </View>
                            </View>
                          
                            <View
                                        className="flex-row justify-center rounded-bl-3xl rounded-br-3xl border- bg-[#141e2c] items-center gap-1 w-[40%] h-[85%]">
                                              
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
                           <View
                                        className="flex-col justify-center  items-center w-[25%] h-[100%]">
                                       <View
                                        className="flex-col justify-center  items-center w-[100%] h-[100%]">
                                               
                                              <View
                                                className="flex-row justify-center gap-2  items-end w-[100%] h-[100%] ">
                                                  <Image
                                                  className="w-[45%] h-[90%]"
                                                  source={icons.challenge}
                                                  resizeMethod='cover' />
                                                  <Text 
                                                      style={{fontSize:width/25}}
                                                      className="font-black text-sm text-black ">
                                                        {boxDisplayChallenges.length}
                                                  </Text> 
                                              </View>
                                       </View>
                             </View>
                </View>

                <View className="mt-0  min-w-[100%] h-[7vh] flex-row px- gap- items-center justify-center rounded-bl-[70px]  bg-[white] rounded-br-[70px] 
                              borde-l-2 borde-l-white borde-r-2 borde-r-white"
                          style={{marginTop:Platform.OS == "android" ? 0 : 0 ,marginBottom:Platform.OS == "android" ? 0 : 0 }}>
                          
                          <View className="justify-center items-center  rounded-bl-3xl rounded-br-3xl w-[20%] g-[#03471a] h-[100%] flex-col">
                              <Heart title="" color1 = '#348ceb' color2 = '#4e1eeb' icon ={icons.back} link="/back"/>
                          </View>
                          
                          <View
                              className="justify-end gap-3 px-  w-[50%] items-center  h-[100%] flex-col  bg-[#eff6f9] ">
                                
      
                                <View
                                    className="justify-start gap-6 px-4  w-[100%] items-center h-[85%] flex-row rounded-tl-3xl rounded-tr-3xl bg-[#010e13] ">
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
                          <View className="justify-center items-center rounded-bl-3xl rounded-br-3xl  g-[#083bf5]  w-[20%]   h-[100%] flex-col ">
                            <Heart title="" color1 = '#b0611c' color2 = '#633711' icon ={icons.next} link="/challengeManagement"/>
                          </View>
      
                </View>


                <View
                style={{height: "85%"}}
                className="w-[100vw] mt-aut g-[#03095e] flex-col justify-start items-center" >
                    <View 
                    style={{height:"8%"
                        //    ,backgroundColor:color
                        }}
                    className="w-[100vw] flex-row justify-between px-3 items-center rounded-tr-3xl rounded-tl-3xl mt- mb- bg-[#041153] h-[40px]" >
                    
                        <View
                        className="w-[35%] h-[80%] rounded-xl ml-auto flex-row justify-center items-end">
                            
                                <TouchableOpacity
                                onPress={()=> { router.navigate({ pathname: '/PlayModeChallenges',params: {
                                    box: "invite",
                                    challengePrivacy:"Private",
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
                        className="w-[30%] h-[100%] rounded-xl  flex-row justify-evenly items-center">
                            
                            
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
                                        style={{height:width/12 , width:width/12}}
                                        className="w-16 h-16" />
                                </TouchableOpacity>
                                
                            )}
                        

                        </View>

                    </View>
                
                    <View
                    style={{borderLeftColor:"#10152d" ,borderRightColor:"#10152d"
                        , height:  "85%"}}
                    className="min-w-[100vw] px- border-l-2  border-r-2 flex-col justify-center items-center  ">

                            {!selectedChallenge ?(
                                    <View 
                                    style={{borderLeftColor:"#10152d" ,borderRightColor:"#10152d",height:"100%"}}
                                    className="flex-row flex-wrap justify-start items-center border-l-2 border-r-2  px-[3px] gap-[2px] py-2 gap-y-2 min-w-[100%] bg-[#322f2e]">
                                        { displayData.map((challenge,index,width)=> {
                                    
                        
                                    return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={
                                                    ()=>
                                                        router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:challenge._id} })
                                                    //    setSelectedChallenge({...challenge})
                                                    }
                                                className="min-w-[32%] h-[49%] border-2 borde-[#0505e6]  rounded-lg  ">
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
                                style={{backgroundColor:"#10152d" ,
                                    height:"8%"
                                }}
                                className= " w-[100%] h-[40px] flex-row px-4 justify-between rounded-bl-md rounded-br-md items-center  ">
                                    
                                    

                                            <Text 
                                                style={{fontSize:width/40}}
                                                className="font-bold ml-5 text-sm text-white">
                                                Invitation to challenge
                                            </Text>  
                                
                                        

                        </View>

                    </View>

        </View>
    </SafeAreaView>


   </>
  )
}