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

  const iconColor = "#a0a0a3" //"#d7d8de"//"#3c9fe6" //"#373a3d" //"#4f4e4b" //"#5a9fed" //"#9badc7" //"#9e9e9e" // "#4baedc"
  const selectedIconColor = "#ffffff"
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
    return Array.from({ length: 500 }).map((_, i) => {
      const size = Math.random() * 2 + 0.6;
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
            isRed ? "pink" : "rgba(120,200,255,0.65)", // blue
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
          style={{height: height * 0.180}}
          className="  w-[100%] flex-row   border-2 border-b-white [#4f555c] items-start px- 1   justify-center bg -[#000000]" >
                 

                  <View className=" w-[100%] flex- 1 h-[100%] b g-[#000000] rounded-tl-lg  flex-col items-center justify-center" >

                                            <View className = "w-[100%] h-[70%]  flex-row items-center justify-start px- 1 pb- 4 ">
                                                 
                                                  <View className="absolute inset-0">
                                                    {sparkles.map(s => (
                                                    <View key={s.key} style={s.style} />
                                                    ))}
                                                  </View>
                                                  <View className = "w-[45%] h-[100%]  flex-row  b g-[#202428] items-center justify-center px- 1 ">
                                                                    <View
                                                                              className="  absolute  justify-center items-center">
                                                                                  
                                                                                    {user ? (
                                                                                    <Image 
                                                                                    style={{
                                                                                      width: width /5.8 ,
                                                                                      height: width /6.5 ,
                                                                                      }}
                                                                                    className=" rounded-full mb-8 "
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
                                                                      <Image 
                                                                                      // style={{width :height * 0.18 }}
                                                                                      className="w-[100%] h-[100%]  "
                                                                                      source={icons.challengify_logo}
                                                                                      resizeMode='cover'
                                                                      />      
                                                  </View>
                                                  <View 
                                                              className = " w-[55%] h-[100%] mb-6 b g-white flex-col gap-2 justify-end items-center" >
                                                                             
                                                                              <View
                                                                               className="flex-col-reverse justify-start gap-1 items-center">
                                                                                  < CountryFlag
                                                                                      isoCode={user && user.country || "us"}
                                                                                      size={width/14}
                                                                                      
                                                                                  />
                                                                                  {/* <Text   
                                                                                      style ={{fontSize:width/29}}
                                                                                      className="font-black  text-gray-300 ">
                                                                                        {user && user.country }
                                                                                  </Text> */}
                                                                              </View>  

                                                                              <View
                                                                                        className=" w-[100%]  flex-col  shadow-2xl shadow-gray-300 b g-[#e6e6e6] rounded-md  gap-1 justify-center items-center">
                                                                                              
                                                                                              <Text   
                                                                                                  style ={{fontSize:width/38}}
                                                                                                  className="font-bold mt- auto text-gray-100 ">
                                                                                                    {user && user.name} 
                                                                                              </Text>
                                                                                              <View
                                                                                                    className=" flex-row  justify-center items-center gap-2 ">
                                                                                                              <Text   
                                                                                                                style ={{fontSize:width/34}}
                                                                                                                className="font-black  text-gray-100 ">
                                                                                                                    <Text   
                                                                                                                      style ={{fontSize:width/38}}
                                                                                                                      className="font-bold  text-gray-100 ">
                                                                                                                      {user && user.city} {' , '}
                                                                                                                    </Text>
                                                                                                                {user && countryCodes[user.country]} 
                                                                                                              </Text>
                                                                                                        
                                                                                              </View>
                                                                                            
                                                                              </View>
                                                  </View>

                                                  {/* <View className = "w- [30%] h-[100%]  flex-col  b g-[#242626] items-end justify-between pt-1 ">
                                                       
                                                      <TouchableOpacity
                                                                        onPress={() => { setSelectedPage("search") }}
                                                                        style ={{width : width/11}}
                                                                        className =  { selectedPage !== `search` ? "justify-center w-[40%] h-[30%] rounded-md bg-[#dee2e2] shadow-lg shadow-blue-300 items-center gap-1  flex-col" :
                                                                          "justify-center w-[40%] h-[80%] rounded-md  items-center bg-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100  gap-1  "}
                                                                        >
                                                                                {selectedPage !== "search" ? (
                                                                                <Ionicons name="search" size={width/17} color= {iconColor} style={{ transform: [{ rotate: "-90deg" }] }} />                                                                                                         
                                                                                 ):(
                                                                                <Ionicons name="search" size={width/17} color= {selectedIconColor} style={{ transform: [{ rotate: "-90deg" }] }}/>                                                                                                         
                                                                                 ) }
                                                                               
                                                                                <Text 
                                                                                      style ={{fontSize: selectedPage !== "search" ? 7 : 7 ,
                                                                                        color : selectedPage !== "search" ? iconColor :selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-black   tracking-tight">SEARCH
                                                                                </Text>
                                                        </TouchableOpacity>   
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("favourite")}}
                                                                    style={{
                                                                      minWidth : width / 11
                                                                    }}
                                                                    className =  { selectedPage !== `favourite` ? "justify-center h-[30%] rounded-lg  items-center bg-[#dee2e2]  flex-col shadow-lg shadow-blue-300" :
                                                                      "justify-center h-[35%] rounded-md  items-center bg-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100"}
                                                                    >
                                                                            {selectedPage !== "favourite" ? (
                                                                                 <MaterialCommunityIcons name="heart" size={width/18} color={iconColor} />                                                                                                         
                                                                            ):(
                                                                                 <MaterialCommunityIcons name="heart" size={width/18} color={selectedIconColor} />                                                                                                         
                                                                            ) }
                                                                            <Text 
                                                                              style ={{fontSize : selectedPage !== "favourite" ? 7 : 7,
                                                                                color : selectedPage !== "favourite" ? iconColor :  selectedIconColor
                                                                              }}
                                                                              className="text-white font-black   tracking-tight">FAV
                                                                            </Text>
                                                          </TouchableOpacity>
                                                          <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("stats")}}
                                                                    style={{
                                                                      minWidth : width / 11
                                                                    }}
                                                                    className =  { selectedPage !== `stats` ? "justify-center h-[30%] rounded-md  items-center bg-[#dee2e2]  flex-col shadow-lg shadow-blue-300" :
                                                                      "justify-center h-[35%] rounded-md  items-center bg-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100"}
                                                                    >
                                                                             {selectedPage !== "stats" ? (
                                                                                 <MaterialCommunityIcons name="poll" size={width/19} color= {iconColor} />                                                                                                         
                                                                              ):(
                                                                                 <MaterialCommunityIcons name="poll" size={width/19} color= {selectedIconColor}/>                                                                                                         
                                                                             ) }
                                                                            <Text 
                                                                              style ={{fontSize : selectedPage !== "stats" ? 7 : 7,
                                                                                color : selectedPage !== "stats" ? iconColor : selectedIconColor
                                                                              }}
                                                                              className="tex t-white font-black   tracking-tight">STATS
                                                                            </Text>
                                                          </TouchableOpacity>
                                        
                                                  </View> */}



                                            </View>

                                            

                                        
                                             <View className = "w-[100%] h-[25%]  flex-row  b g-[#2b2828] items-center justify-between px-1 ">
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("home")}}
                                                                    style={{
                                                                        minWidth : width / 11 ,
                                                                        elevation: 5 ,
                                                                       
                                                                    }}
                                                                    className =  { selectedPage !== `home` ? "justify-between py-1 h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col  shadow-lg shadow-blue-800 " :
                                                                      "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col  shadow-lg ios:shadow-green-300 android:elevation-50"}
                                                                      >
                                                                             {selectedPage !== "home" ? (
                                                                                 <MaterialCommunityIcons name="home" size={width/17} color={iconColor} />                                                                                                         
                                                                              ):(
                                                                              <MaterialCommunityIcons name="home"  
                                                                              size={width/17} color={selectedIconColor}/>                                                                         
                                                                             )}
                                                                            <Text 
                                                                              style ={{fontSize:selectedPage !== "home" ? 8 : 8,
                                                                                color : selectedPage !== "home" ? iconColor :  selectedIconColor
                                                                              }}
                                                                              className="text-white font-bold   tracking-tight">HOME
                                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("talent")}}
                                                                    style={{
                                                                      minWidth : width / 11
                                                                    }}
                                                                    className =  { selectedPage !== `talent` ? "justify-between py-1 h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col shadow-lg shadow-red-900" :
                                                                      "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-green-300"}
                                                                    >
                                                                             {selectedPage !== "talent" ? (
                                                                                 <MaterialCommunityIcons name="star" size={width/17} color={iconColor} style={{ transform: [{ rotate: "180deg" }]}}/>                                                                                                         
                                                                             ):(
                                                                              <MaterialCommunityIcons name="star"  style={{ transform: [{ rotate: "180deg" }] }}
                                                                              size={width/17} color={selectedIconColor}/>                                                                         
                                                                             )}
                                                                           
                                                                            <Text 
                                                                              style ={{fontSize:selectedPage !== "talent" ? 8: 8,
                                                                                color : selectedPage !== "talent" ? iconColor :selectedIconColor
                                                                              }}
                                                                              className="tex t-white font-bold   tracking-tight">TALENT
                                                                            </Text>


                                                          </TouchableOpacity>
                                                          <TouchableOpacity 
                                                                  onPress={()=> {setSelectedPage("challenge")}}
                                                                  style={{
                                                                    minWidth : width /11 ,
                                                                  
                                                                  }}
                                                                  className =  { selectedPage !== `challenge` ? "justify-between py-1 h-[100%] rounded-md  items-center b g-[#dee2e2] flex-col shadow-md shadow-orange-900" :
                                                                    "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100"}
                                                                  >
                                                                              {selectedPage !== "challenge" ? (
                                                                                 <MaterialCommunityIcons name="sword-cross" size={width/19} color={iconColor} style={{ transform: [{ rotate: "180deg" }]}}/>                                                                                                         
                                                                              ):(
                                                                                 <MaterialCommunityIcons name="sword-cross"  style={{ transform: [{ rotate: "360deg" }] }}
                                                                                  size={width/19} color={selectedIconColor}/>                                                                         
                                                                               )}
                                                                              <Text 
                                                                                  style ={{fontSize:selectedPage !== "challenge" ? 8 : 8,
                                                                                    color : selectedPage !== "challenge" ? iconColor :selectedIconColor
                                                                                  }}
                                                                                  className="text-white font-bold   tracking-tight">CHLLNGE
                                                                              </Text>
                                                          </TouchableOpacity>
                                                         <TouchableOpacity 
                                                                            onPress={() => { setSelectedPage("notification") }}
                                                                            style={{
                                                                              minWidth : width / 11
                                                                            }}
                                                                            className =  { selectedPage !== `notification` ? "justify-between py-1 h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col shadow-lg shadow-zinc-900" :
                                                                              "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100"}
                                                                            >
                                                                                    {selectedPage !== "notification" ? (
                                                                                    <MaterialCommunityIcons name="bell-ring" size={width/19} color={iconColor} />                                                                                                         
                                                                                     ):(
                                                                                    <MaterialCommunityIcons name="bell-ring"  
                                                                                      size={width/19} color={selectedIconColor}/>                                                                         
                                                                                     )}
                                                                                    <View
                                                                                     className="absolute top-[0] p- right-1 w-4 h-4 rounded-full justify-center items-center  text-center bg-white font-black tex t-sm text-red-500 ">
                                                                                        <Text 
                                                                                        style={{fontSize:7    }}
                                                                                        className=" font-black tex t-sm text-red-500 ">
                                                                                            {notifications.filter(not => not.isRead == false).length}
                                                                                        </Text> 
                                                                                    </View>
                                                                                    <Text 
                                                                                      style ={{fontSize : selectedPage !== "notification" ? 8 : 8, 
                                                                                        color : selectedPage !== "notification" ? iconColor:  selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-bold   tracking-tight">NOTIF
                                                                                    </Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity 
                                                                      
                                                                            onPress={() => { setSelectedPage("profile") }}
                                                                            style={{
                                                                              minWidth : width / 11
                                                                            }}
                                                                            className =  { selectedPage !== `profile` ? "justify-between py-1 h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col shadow-lg shadow-blue-900" :
                                                                              "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100"}
                                                                            >
                                                                                     {selectedPage !== "profile" ? (
                                                                                    <MaterialCommunityIcons name="account" size={width/17} color={iconColor} />                                                                                                         
                                                                                     ):(
                                                                                    <MaterialCommunityIcons name="account"  
                                                                                      size={width/17} color={selectedIconColor}/>                                                                         
                                                                                     )}
                                                                                   
                                                                                    <Text 
                                                                                      style ={{fontSize : selectedPage !== "profile" ? 8 : 8,
                                                                                        color : selectedPage !== "profile" ? iconColor :  selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-bold  ml- 2 tracking-tight">PROFILE
                                                                                    </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("favourite")}}
                                                                    style={{
                                                                      minWidth : width / 11
                                                                    }}
                                                                    className =  { selectedPage !== `favourite` ? "justify-between py-1 h-[100%] rounded-lg  items-center b g-[#dee2e2]  flex-col shadow-lg shadow-pink-900" :
                                                                      "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-green-300"}
                                                                    >
                                                                            {selectedPage !== "favourite" ? (
                                                                                 <MaterialCommunityIcons name="heart" size={width/18} color={iconColor} />                                                                                                         
                                                                            ):(
                                                                                 <MaterialCommunityIcons name="heart" size={width/18} color={selectedIconColor} />                                                                                                         
                                                                            ) }
                                                                            <Text 
                                                                              style ={{fontSize : selectedPage !== "favourite" ? 8 : 8,
                                                                                color : selectedPage !== "favourite" ? iconColor :  selectedIconColor
                                                                              }}
                                                                              className="text-white font-bold   tracking-tight"> FAV
                                                                            </Text>
                                                          </TouchableOpacity>
                                                          <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("stats")}}
                                                                    style={{
                                                                      minWidth : width / 11
                                                                    }}
                                                                    className =  { selectedPage !== `stats` ? "justify-between py-1 h-[100%] rounded-md  items-center b g-[#dee2e2]  flex-col shadow-lg shadow-green-900" :
                                                                      "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-900"}
                                                                    >
                                                                             {selectedPage !== "stats" ? (
                                                                                 <MaterialCommunityIcons name="poll" size={width/20} color= {iconColor} />                                                                                                         
                                                                              ):(
                                                                                 <MaterialCommunityIcons name="poll" size={width/20} color= {selectedIconColor}/>                                                                                                         
                                                                             ) }
                                                                            <Text 
                                                                              style ={{fontSize : selectedPage !== "stats" ? 8 : 8,
                                                                                color : selectedPage !== "stats" ? iconColor : selectedIconColor
                                                                              }}
                                                                              className="tex t-white font-bold   tracking-tight">STATS
                                                                            </Text>
                                                          </TouchableOpacity>
                                                          <TouchableOpacity
                                                                        onPress={() => { setSelectedPage("search") }}
                                                                        style ={{width : width/11}}
                                                                        className =  { selectedPage !== `search` ? "justify-between py-1 h-[100%] rounded-md b g-[#dee2e2] shadow-lg shadow-yellow-900 items-center   flex-col" :
                                                                          "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100    "}
                                                                        >
                                                                                {selectedPage !== "search" ? (
                                                                                <Ionicons name="search" size={width/19} color= {iconColor} style={{ transform: [{ rotate: "-90deg" }] }} />                                                                                                         
                                                                                 ):(
                                                                                <Ionicons name="search" size={width/19} color= {selectedIconColor} style={{ transform: [{ rotate: "-90deg" }] }}/>                                                                                                         
                                                                                 ) }
                                                                               
                                                                                <Text 
                                                                                      style ={{fontSize: selectedPage !== "search" ? 8 : 8 ,
                                                                                        color : selectedPage !== "search" ? iconColor :selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-bold   tracking-tight">SEARCH
                                                                                </Text>
                                                          </TouchableOpacity>   
                                                          <TouchableOpacity 
                                                                  onPress={()=> {setSelectedPage("help")}}
                                                                  style ={{width : width/11}}
                                                                  className =  { selectedPage !== `help` ? "justify-between py-1 h-[100%] rounded-md b g-[#dee2e2] shadow-xl shadow-gray-800 items-center   flex-col" :
                                                                    "justify-between py-1 h-[100%] rounded-md  items-center b g-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100    "}                                                                  >
                                                                              {selectedPage !== "help" ? (
                                                                              <MaterialCommunityIcons name="help-circle" size={width/19} color= {iconColor} />                                                                                                         
                                                                              ):(
                                                                              <MaterialCommunityIcons name="help-circle" size={width/19} color= {selectedIconColor}/>                                                                                                         
                                                                              )}
                                                                              <Text 
                                                                                  style ={{fontSize: selectedPage !== "help" ? 8 : 8 ,
                                                                                    color : selectedPage !== "help" ? iconColor : selectedIconColor
                                                                                  }}
                                                                                  className="text-white font-bold  tracking-tight">HELP
                                                                              </Text>
                                                          </TouchableOpacity>
                                                       
                                        
                                            </View>
                                           
                                            






                                            {/* <View
                                              className="  w-[100%] h-[100%] flex-col absolute  justify-center items-center">
                                                  
                                                    {user ? (
                                                    <Image 
                                                    style={{
                                                      width: width /5.7 ,
                                                      height: width /5.7 ,
                                                      }}
                                                    className="w-[100%] h-[40px]  rounded-full  "
                                                    source={{uri : userProfileImg}}
                                                    />
                                                    ):(
                                                    <Image 
                                                    style={{width:height * 0.04 ,height: height * 0.04}}
                                                    className="w-[40px] h-[40px]  rounded-t-full  "
                                                    source={icons.avatar}
                                                    />
                                                    )}
                                           
                                                 
                                            </View> */}
{/*                                           
                                            <View 
                                            style ={{width:width/3 ,
                                              height: height * 0.18 * 0.7 * 0.45
                                            }}
                                            className = "    py-2 flex-col gap-1 justify-between items-start" >
                                                   
                                                     
                                            </View> */}

                                           {/* <View 
                                            style ={{width:width/3.7
                                              , height: height * 0.18 * 0.7 * 0.45
                                            }}
                                            className = "absolute top-1 left-0 rounded-tr-3xl   px-1 pb- 1 pr -4 auto flex-row  justify-between items-center" >
                                                        <TouchableOpacity
                                                                        onPress={() => { setSelectedPage("search") }}
                                                                        style ={{width : width/9}}
                                                                        className =  { selectedPage !== `search` ? "justify-center w-[40%] h-[80%] rounded-md bg-[#dee2e2] shadow-lg shadow-blue-300 items-center gap-1  flex-col" :
                                                                          "justify-center w-[40%] h-[80%] rounded-md  items-center bg-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100  gap-1  "}
                                                                        >
                                                                                {selectedPage !== "search" ? (
                                                                                <Ionicons name="search" size={width/17} color= {iconColor} style={{ transform: [{ rotate: "-90deg" }] }} />                                                                                                         
                                                                                 ):(
                                                                                <Ionicons name="search" size={width/17} color= {selectedIconColor} style={{ transform: [{ rotate: "-90deg" }] }}/>                                                                                                         
                                                                                 ) }
                                                                               
                                                                                <Text 
                                                                                      style ={{fontSize: selectedPage !== "search" ? 7 : 7 ,
                                                                                        color : selectedPage !== "search" ? iconColor :selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-black   tracking-tight">SEARCH
                                                                                </Text>
                                                        </TouchableOpacity>   
                                                        <TouchableOpacity 
                                                                  onPress={()=> {setSelectedPage("help")}}
                                                                  style ={{width : width/9}}
                                                                  className =  { selectedPage !== `help` ? "justify-center w-[40%] h-[80%] rounded-md bg-[#dee2e2] shadow-lg shadow-blue-300 items-center gap-1  flex-col" :
                                                                    "justify-center w-[40%] h-[80%] rounded-md  items-center bg-[#ffffff]  flex-col elevation-lg shadow-lg shadow-blue-100  gap-1  "}                                                                  >
                                                                              {selectedPage !== "help" ? (
                                                                              <MaterialCommunityIcons name="help-circle" size={width/16} color= {iconColor} />                                                                                                         
                                                                              ):(
                                                                              <MaterialCommunityIcons name="help-circle" size={width/16} color= {selectedIconColor}/>                                                                                                         
                                                                              )}
                                                                              <Text 
                                                                                  style ={{fontSize: selectedPage !== "help" ? 7 : 7 ,
                                                                                    color : selectedPage !== "help" ? iconColor : selectedIconColor
                                                                                  }}
                                                                                  className="text-white font-black   tracking-tight">HELP
                                                                              </Text>
                                                        </TouchableOpacity>

                                             </View> */}

                                           


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
            className=" flex-row justify-center items-center b g-[#0f659ed5] py-1 px- 6 ">
  
            <View
            style={{backgroundColor: menuPanelBgColor}}
            className=" [#324043] [#f6f5f5] primary w-[100%] h-[100%] rounded-b-[230px] flex-row justify-center items-center">
               { isFetching && (
                                <Text   
                                     style ={{fontSize:10}}
                                     className="font-bold text-gray-100  ">
                                            Loggin Please Wait...
                                </Text>
              )}
               { isLoggingOut && (
                                <Text   
                                     style ={{fontSize:10}}
                                     className="font-bold text-gray-100  ">
                                            Logging out Please Wait...
                                </Text>
              )}
              {!user &&  (
                                <Text   
                                     style ={{fontSize:10}}
                                     className="font-bold text-gray-100  ">
                                            Login to get started
                                </Text>
              )}
              {selectedPage && user && !isFetching && !isLoggingOut && ( 
                          <View
                          className = "flex-row justify-center h- [100%] mb- 2 items-end gap-2">
                                <View
                                    className="w- [30px] h- [30px] roun ded-full b g-black">
                                      <MaterialCommunityIcons name={selectIcon(selectedPage)} size={22} color = {selectIconColor(selectedPage)}  />
                                </View>
                                <Text   
                                     style ={{fontSize:10}}
                                     className="font-black text-gray-100 mb- 1 ">
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