import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, {  useEffect, useMemo, useState } from 'react'
import { getFavouriteList, getFollowData, getFollowings, getNotificationByUser, getTopChallenges,  getTopTalents,  getUserFriendsData, getUserParticipateChallenges, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, getUserTalent, getUserTalentPerformances } from '../apiCalls';
import {icons} from '../constants'
import { router} from 'expo-router';
import { countryCodes, getIcon, selectIcon, selectIconColor } from '../helper';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationsModal from '../components/talent/modal/NotificationsModal';
// import UserProfile from '../components/profile/UserProfile';
import HomePage from '../components/home/HomePage';
import UserNotifications from '../components/home/UserNotifications';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';
// import Talent from './Talent';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import CountryFlag from 'react-native-country-flag';
import Talent from '../components/home/Talent';
import Challenge from '../components/home/Challenge';
import UserProfile from '../components/home/UserProfile';
import Favourite from '../components/home/Favourite';
import { getVideo } from '../videoFiles';

export default function Home() {
  const insets = useSafeAreaInsets();
  const {user,menuPanelBgColor, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteList,setUserTalents,setUserTalentPerformances,topTalents, setTopTalents
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges,isLoggingOut, setIsLoggingOut
    ,userProfileImg,setUserProfileImg , userCoverImg,setUserCoverImg} = useGlobalContext()  
  const { width, height } = useWindowDimensions();
  const [selectedPage , setSelectedPage] = useState(null)
  const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
  const [refresh , setRefresh] = useState(false)
  const [reset , setReset] = useState(false)
  const [name , setName] = useState(null)
  const [isFetching, setIsFetching] = useState(false);
  const [authType, setAuthType] = useState("login");

  const iconColor = "#ffffff" //"#d7d8de"//"#3c9fe6" //"#373a3d" //"#4f4e4b" //"#5a9fed" //"#9badc7" //"#9e9e9e" // "#4baedc"
  const selectedIconColor = "lightblue"
  const iconSize = width/20

  useEffect(() => {
    if(user){
    setSelectedPage("home")
    const splitName = user && user.name.split(" ")
    user && setName({
    part1 : splitName[0],
    part2: splitName[1] || ""
     })
    }
  }, [user])

  useEffect(() => {
    if(user) {
      setIsFetching(true)
      getUserTalent(user._id , setUserTalents)
      getUserTalentPerformances(user._id , setUserTalentPerformances)
      getUserPublicChallenges(user._id,setUserPublicChallenges)
      getUserPrivateChallenges(user._id,setUserPrivateChallenges)
      getUserPublicParticipateChallenges(user._id ,setPublicParticipateChallenges)
      getUserPrivateParticipateChallenges(user._id ,setPrivateParticipateChallenges)
      getNotificationByUser(user._id , setNotifications)
      getFollowings(user._id,setFollowings)
      getUserFriendsData(user._id,setUserFriendData)
      getFollowData(user._id,setFollow)
      getFavouriteList(user._id,setFavouriteList)
      getTopChallenges(user._id,setTrendingChallenges) 
      getTopTalents(user._id ,setTopTalents)
      getVideo(user.profile_img).then(path =>{
           setUserProfileImg(path)
        });
      getVideo(user.cover_img).then(path =>{
          setUserCoverImg(path)
        });
      setTimeout(() => {
        setIsFetching(false)
      }, 3000);
    }
  }, [user])


  const sparkles = useMemo(() => {
    return Array.from({ length: 1000 }).map((_, i) => {
      const size = Math.random() * 2 + 0.1;
      const isGold = Math.random() > 0.7;
      const isRed = Math.random() > 0.3;

      return {
        key: i,
        style: {
          position: "absolute",
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: size,
          height: size,
          borderRadius: 999,
          backgroundColor: isGold
            ? "rgba(255,215,0,0.85)" :  // gold
            isRed ? "gold" : "rgba(255,215,0,0.85)", // blue
          // shadowColor: isGold ? "#ffd700" : "#4fc3ff",
          // shadowOpacity: 1,
          // shadowRadius: 5,
          elevation: 3,
        },
      };
    });
  }, []);
  
  return (

        <View
           style={{ 
            paddingTop:Platform.OS == "ios" ? insets.top : insets.top
          }}
           className=" flex-1  flex-col justify-start items-center py- bg-black primary [#0f1010]">

         
          <View 
          style={{height: height * 0.16}}
          className="  w-[100%] flex-row    [#4f555c] items-start px- 1   justify-center bg -[#000000]" >
                 

                  <View className=" w-[100%] flex- 1 h-[100%] b g-[#000000] rounded-tl-lg  flex-col items-center justify-center" >

                                            <View className = "w-[100%] h-[65%] bg-[#000000] flex-row-reverse items-center justify-start  ">
                                                 
                                                  <View className="absolute inset-0">
                                                    {sparkles.map(s => (
                                                    <View key={s.key} style={s.style} />
                                                    ))}
                                                  </View>
                                                  <View className = "w-[40%] h-[100%]  flex-row rounded-tl-3xl  b g-[#202428] items-center justify-start  ">
                                                                    {/* <View
                                                                              className="  absolute  justify-center items-center">
                                                                                  
                                                                                    {user ? (
                                                                                    <Image 
                                                                                    style={{
                                                                                      width: width /8.5 ,
                                                                                      height: width /8.5 ,
                                                                                      }}
                                                                                    className=" rounded-full mb- 6 "
                                                                                    source={{uri : userProfileImg}}
                                                                                    />
                                                                                    ):(
                                                                                    <Image 
                                                                                    style={{width:height * 0.04 ,height: height * 0.04}}
                                                                                    className="w-[40px] h-[40px]  rounded-full  "
                                                                                    source={icons.avatar}
                                                                                    />
                                                                                    )}
                                                                            
                                                                                  
                                                                      </View> */}
                                                                      <Image 
                                                                                      // style={{width :height * 0.18 }}
                                                                                      className="w-[100%] h-[100%]  "
                                                                                      source={icons.challengify_logo}
                                                                                      resizeMode='cover'
                                                                      />      
                                                               
                                                  </View>

                                                  <View 
                                                              className = " w-[40%] flex-1 h-[100%] rounded-3xl b g-[#202428] mb- 12  b g-[#303132] flex-col gap-2 justify-center items-start" >
                                                                             
                                                                              <View
                                                                               className="flex-row mt- 12 justify-start gap-2 items-end">
                                                                                  < CountryFlag
                                                                                      isoCode={user && user.country || "US"}
                                                                                      size={width/25}
                                                                                  />
                                                                                  <Text   
                                                                                      style ={{fontSize:width/25}}
                                                                                      className="font-black  text-gray-300 ">
                                                                                        {user && user.country || "US" }
                                                                                  </Text>
                                                                              </View>  

                                                                              <View
                                                                                        className=" w-[100%] mt- auto flex-col  shadow-2xl shadow-gray-300 b g-[#e6e6e6] rounded-md  gap-1 justify-center items-start">
                                                                                              
                                                                                              <Text   
                                                                                                  style ={{fontSize:width/45}}
                                                                                                  className="font-bold mt- auto text-gray-100 ">
                                                                                                    {user && user.name || "example John"} 
                                                                                              </Text>
                                                                                              <View
                                                                                                    className=" flex-row  justify-center items-center gap-2 ">
                                                                                                              <Text   
                                                                                                                style ={{fontSize:width/42}}
                                                                                                                className="font-black  text-gray-100 ">
                                                                                                                    <Text   
                                                                                                                      style ={{fontSize:width/45}}
                                                                                                                      className="font-bold  text-gray-100 ">
                                                                                                                      {user && user.city || "somewhere"} {' , '}
                                                                                                                    </Text>
                                                                                                                {user && countryCodes[user.country] || "United States "} 
                                                                                                              </Text>
                                                                                                        
                                                                                              </View>
                                                                                            
                                                                              </View>

                                                  </View>
                                                  <View className = "w- [30%] h-[100%]  flex-col p-2 pr-4 items-start justify-center  px- 1 ">
                                                        <View 
                                                         style={{
                                                          width: width /7 ,
                                                          height: width /7 ,
                                                          }}
                                                           className=" rounded-full bg-[#372f32] justify-center items-center">
                                                                                 {user ? (
                                                                                    <Image 
                                                                                    style={{
                                                                                      width: width /7.5 ,
                                                                                      height: width /7.5 ,
                                                                                      }}
                                                                                    className=" rounded-full w-[100%] h- [100%] "
                                                                                    source={{uri : userProfileImg}}
                                                                                    />
                                                                                    ):(
                                                                                    <Image 
                                                                                    style={{width:height * 0.04 ,height: height * 0.04}}
                                                                                    className="w-[40px] h-[40px]  rounded-full  "
                                                                                    source={icons.avatar}
                                                                                    />
                                                                                    )}
                                                         </View> 
                                                                                   
                                                                                     
                                                  </View>




                                            </View>

                                            

                                        
                                             <View className = "w-[100%] h-[35%] rounded-lg border-2 bg-[#0d0c09] border-t-[#314674] border-b-[#3a4974] flex-row   items-center justify-between px-1 ">
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("home")}}
                                                                    style={{
                                                                        minWidth : width / 11 ,
                                                                        elevation: 5 ,
                                                                       
                                                                    }}
                                                                    className =  { selectedPage !== `home` ? "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col  shadow-lg sha dow-blue-800 " :
                                                                      "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col  shadow-md shadow-white android:elevation-50"}
                                                                      >
                                                                             {selectedPage !== "home" ? (
                                                                                 <MaterialCommunityIcons name="home" size={width/20} color={iconColor} />                                                                                                         
                                                                              ):(
                                                                              <MaterialCommunityIcons name="home"  
                                                                              size={width/20} color={selectedIconColor}/>                                                                         
                                                                             )}
                                                                            <Text 
                                                                              style ={{fontSize:selectedPage !== "home" ? 7 : 7,
                                                                                color : selectedPage !== "home" ? iconColor :  selectedIconColor
                                                                              }}
                                                                              className="text-white font-black  h-[20%] tracking-tight">HOME
                                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("talent")}}
                                                                    style={{
                                                                      minWidth : width / 11
                                                                    }}
                                                                    className =  { selectedPage !== `talent` ? "justify-center gap-1 h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col shadow-lg sha dow-red-200" :
                                                                      "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-md shadow-amber-500 android:elevation-50"}
                                                                    >
                                                                             {selectedPage !== "talent" ? (
                                                                                 <MaterialCommunityIcons name="star" size={width/20} color={iconColor} style={{ transform: [{ rotate: "180deg" }]}}/>                                                                                                         
                                                                             ):(
                                                                              <MaterialCommunityIcons name="star"  style={{ transform: [{ rotate: "180deg" }] }}
                                                                              size={width/20} color={selectedIconColor}/>                                                                         
                                                                             )}
                                                                           
                                                                            <Text 
                                                                              style ={{fontSize:selectedPage !== "talent" ? 7 : 7,
                                                                                color : selectedPage !== "talent" ? iconColor :selectedIconColor
                                                                              }}
                                                                              className="tex t-white font-black  h-[20%] tracking-tight">TALENT
                                                                            </Text>


                                                          </TouchableOpacity>
                                                          <TouchableOpacity 
                                                                  onPress={()=> {setSelectedPage("challenge")}}
                                                                  style={{
                                                                    minWidth : width /11 ,
                                                                  
                                                                  }}
                                                                  className =  { selectedPage !== `challenge` ? "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#dee2e2] flex-col shadow-md sha dow-orange-900" :
                                                                    "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-md shadow-amber-500"}
                                                                  >
                                                                              {selectedPage !== "challenge" ? (
                                                                                 <MaterialCommunityIcons name="sword-cross" size={width/21} color={iconColor} style={{ transform: [{ rotate: "180deg" }]}}/>                                                                                                         
                                                                              ):(
                                                                                 <MaterialCommunityIcons name="sword-cross"  style={{ transform: [{ rotate: "360deg" }] }}
                                                                                  size={width/21} color={selectedIconColor}/>                                                                         
                                                                               )}
                                                                              <Text 
                                                                                  style ={{fontSize:selectedPage !== "challenge" ? 7 : 7,
                                                                                    color : selectedPage !== "challenge" ? iconColor :selectedIconColor
                                                                                  }}
                                                                                  className="text-white font-black  h-[20%] tracking-tight" >CHLLNGE
                                                                              </Text>
                                                          </TouchableOpacity>
                                                         <TouchableOpacity 
                                                                            onPress={() => { setSelectedPage("notification") }}
                                                                            style={{
                                                                              minWidth : width / 11
                                                                            }}
                                                                            className =  { selectedPage !== `notification` ? "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col shadow-lg sha dow-zinc-900" :
                                                                              "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-amber-500"}
                                                                            >
                                                                                    {selectedPage !== "notification" ? (
                                                                                    <MaterialCommunityIcons name="bell-ring" size={width/21} color={iconColor} />                                                                                                         
                                                                                     ):(
                                                                                    <MaterialCommunityIcons name="bell-ring"  
                                                                                      size={width/21} color={selectedIconColor}/>                                                                         
                                                                                     )}
                                                                                    <View
                                                                                     className="absolute top-[6] p- right-1 w-4 h-4 rounded-full justify-center items-center  text-center bg-yellow-400 font-black tex t-sm text-red-500 ">
                                                                                        <Text 
                                                                                        style={{fontSize:7    }}
                                                                                        className=" font-black tex t-sm text-red-500 ">
                                                                                            {notifications.filter(not => not.isRead == false).length}
                                                                                        </Text> 
                                                                                    </View>
                                                                                    <Text 
                                                                                      style ={{fontSize : selectedPage !== "notification" ? 7 : 7, 
                                                                                        color : selectedPage !== "notification" ? iconColor:  selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-black h-[20%]  tracking-tight">NOTIF
                                                                                    </Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity 
                                                                            onPress={() => { setSelectedPage("profile") }}
                                                                            style={{
                                                                              minWidth : width / 11
                                                                            }}
                                                                            className =  { selectedPage !== `profile` ? "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col shadow-lg sha dow-blue-900" :
                                                                              "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-amber-500"}
                                                                            >
                                                                                     {selectedPage !== "profile" ? (
                                                                                    <MaterialCommunityIcons name="account" size={width/21} color={iconColor} />                                                                                                         
                                                                                     ):(
                                                                                    <MaterialCommunityIcons name="account"  
                                                                                      size={width/21} color={selectedIconColor}/>                                                                         
                                                                                     )}
                                                                                   
                                                                                    <Text 
                                                                                      style ={{fontSize : selectedPage !== "profile" ? 7 : 7,
                                                                                        color : selectedPage !== "profile" ? iconColor :  selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-black h-[20%] ml- 2 tracking-tight">PROFILE
                                                                                    </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("favourite")}}
                                                                    style={{
                                                                      minWidth : width / 11
                                                                    }}
                                                                    className =  { selectedPage !== `favourite` ? "justify-center gap-1  h-[100%] rounded-lg  items-center b g-[#dee2e2]  flex-col shadow-lg shadow-pink-900" :
                                                                      "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-amber-500"}
                                                                    >
                                                                            {selectedPage !== "favourite" ? (
                                                                                 <MaterialCommunityIcons name="heart" size={width/21} color={iconColor} />                                                                                                         
                                                                            ):(
                                                                                 <MaterialCommunityIcons name="heart" size={width/21} color={selectedIconColor} />                                                                                                         
                                                                            ) }
                                                                            <Text 
                                                                              style ={{fontSize : selectedPage !== "favourite" ? 7 : 7,
                                                                                color : selectedPage !== "favourite" ? iconColor :  selectedIconColor
                                                                              }}
                                                                              className="text-white font-black h-[20%]   tracking-tight"> FAV
                                                                            </Text>
                                                          </TouchableOpacity>
                                                          <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("stats")}}
                                                                    style={{
                                                                      minWidth : width / 11
                                                                    }}
                                                                    className =  { selectedPage !== `stats` ? "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col shadow-lg " :
                                                                      "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-amber-500"}
                                                                    >
                                                                             {selectedPage !== "stats" ? (
                                                                                 <MaterialCommunityIcons name="poll" size={width/22} color= {iconColor} />                                                                                                         
                                                                              ):(
                                                                                 <MaterialCommunityIcons name="poll" size={width/22} color= {selectedIconColor}/>                                                                                                         
                                                                             ) }
                                                                            <Text 
                                                                              style ={{fontSize : selectedPage !== "stats" ? 7 : 7,
                                                                                color : selectedPage !== "stats" ? iconColor : selectedIconColor
                                                                              }}
                                                                              className="tex t-white font-black h-[20%]   tracking-tight">STATS
                                                                            </Text>
                                                          </TouchableOpacity>
                                                          <TouchableOpacity
                                                                        onPress={() => { setSelectedPage("search") }}
                                                                        style ={{width : width/11}}
                                                                        className =  { selectedPage !== `search` ? "justify-center gap-1  h-[100%] rounded-md b g-[#dee2e2] shadow-lg shadow-yellow-900 items-center   flex-col" :
                                                                          "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100    "}
                                                                        >
                                                                                {selectedPage !== "search" ? (
                                                                                <Ionicons name="search" size={width/22} color= {iconColor} style={{ transform: [{ rotate: "-90deg" }] }} />                                                                                                         
                                                                                 ):(
                                                                                <Ionicons name="search" size={width/22} color= {selectedIconColor} style={{ transform: [{ rotate: "-90deg" }] }}/>                                                                                                         
                                                                                 ) }
                                                                               
                                                                                <Text 
                                                                                      style ={{fontSize: selectedPage !== "search" ? 7 : 7 ,
                                                                                        color : selectedPage !== "search" ? iconColor :selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-black h-[20%]  tracking-tight">SEARCH
                                                                                </Text>
                                                          </TouchableOpacity>   
                                                          <TouchableOpacity 
                                                                  onPress={()=> {setSelectedPage("help")}}
                                                                  style ={{width : width/11}}
                                                                  className =  { selectedPage !== `help` ? "justify-center gap-1  h-[100%] rounded-md b g-[#dee2e2] shadow-xl shadow-gray-800 items-center   flex-col" :
                                                                    "justify-center gap-1  h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100    "}                                                                  >
                                                                              {selectedPage !== "help" ? (
                                                                              <MaterialCommunityIcons name="help-circle" size={width/21} color= {iconColor} />                                                                                                         
                                                                              ):(
                                                                              <MaterialCommunityIcons name="help-circle" size={width/21} color= {selectedIconColor}/>                                                                                                         
                                                                              )}
                                                                              <Text 
                                                                                  style ={{fontSize: selectedPage !== "help" ? 7 : 7 ,
                                                                                    color : selectedPage !== "help" ? iconColor : selectedIconColor
                                                                                  }}
                                                                                  className="text-white font-black h-[20%]  tracking-tight">HELP
                                                                              </Text>
                                                          </TouchableOpacity>
                                                       
                                        
                                            </View>

                                           


                </View>

             

                

                 
          </View>
       

 

            { !user ? (
            <View     
            className="w-[100%] h-[79%] flex-1 py- px- bg-black  rounde-xl borde-[#272d31]  g-[#3b4348] ">
               {authType == "login" && <Login  setAuthType ={setAuthType}/> }
               {authType == "register" && <Register  setAuthType ={setAuthType}/> }

            </View>
            ) : (
       
            <View     
                    className="w-[100%] h-[79%] flex-1  py- px- bg-black [#3b4348]  rounde-xl borde-[#272d31]  g-[#3b4348] 
                       flex-col justify-center items-center">
                        {selectedPage == "home" && ! isFetching && (
                          <HomePage reset ={reset} setReset={setReset}/>
                        )}
                        {selectedPage == "talent" && ! isFetching && (
                          <Talent setSelectedPage={setSelectedPage} />
                        )}
                        {selectedPage == "challenge" && ! isFetching && (
                          <Challenge setSelectedPage={setSelectedPage} />
                        )}
                        {selectedPage == "profile" && ! isFetching && ! isLoggingOut && (
                          <UserProfile user={user} />
                        )}
                        {selectedPage == "notification" && ! isFetching && (
                          <UserNotifications user={user} />
                        )}
                        {selectedPage == "favourite" && ! isFetching && (
                          <Favourite />
                        )}
                        {isFetching && (
                              <View
                              className="w-[100%] h-[100%] justify-center items-center" >
                                <ActivityIndicator size="large" color="white" />
                              </View>
                        )}
                        {isLoggingOut && (
                              <View
                              className="w-[100%] h-[100%] justify-center items-center" >
                                <ActivityIndicator size="large" color="white" />
                              </View>
                        )}
            </View>
            
            )}

          
          <View
             style={{ 
             height: Platform.OS =="ios" ? width/8 + 5 : width/8 ,
             width:"100%",
             }}
            className=" flex-row justify-center items-center b g-white py- 1 px- 6 ">
  
            <View
            // style={{backgroundColor: "#312d22"}}
            className=" [#324043] [#f6f5f5] primary bg-[#ffffff] w-[100%] h-[100%] rounded-b-[230px] flex-row justify-center items-center">
               { isFetching && (
                                <Text   
                                     style ={{fontSize:10}}
                                     className="font-bold text-gray-800  ">
                                            Loggin Please Wait...
                                </Text>
              )}
               { isLoggingOut && (
                                <Text   
                                     style ={{fontSize:10}}
                                     className="font-bold text-gray-800  ">
                                            Logging out Please Wait...
                                </Text>
              )}
              {!user &&  (
                                <Text   
                                     style ={{fontSize:10}}
                                     className="font-bold text-gray-800  ">
                                            Login to get started
                                </Text>
              )}
              {selectedPage && user && !isFetching && !isLoggingOut && ( 
                          <View
                          className = "flex-row justify-center h- [100%]  items-end gap-2">
                                <View
                                    className="w- [30px] h- [30px] roun ded-full b g-black">
                                      <MaterialCommunityIcons name={selectIcon(selectedPage)} size={22} color = {selectIconColor(selectedPage)}  />
                                </View>
                                <Text   
                                     style ={{fontSize:10}}
                                     className="font-bold text-gray-800 mb-1 ">
                                            {selectedPage && selectedPage.toUpperCase() }
                                </Text>
                          </View>
              )}
            </View>
          </View>
                 
          {displayNotificationsModal && 
          <NotificationsModal user={user} displayNotificationsModal={displayNotificationsModal}
          setDisplayNotificationsModal={setDisplayNotificationsModal}/>}
 
      </View>
       

  )
}