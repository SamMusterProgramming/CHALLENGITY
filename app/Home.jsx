import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, {  useEffect, useState } from 'react'
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

export default function Home() {
  const insets = useSafeAreaInsets();
  const {user,menuPanelBgColor, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteList,setUserTalents,setUserTalentPerformances,topTalents, setTopTalents
    ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges,isLoggingOut, setIsLoggingOut
  } = useGlobalContext()  
  const { width, height } = useWindowDimensions();
  const [selectedPage , setSelectedPage] = useState(null)
  const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
  const [refresh , setRefresh] = useState(false)
  const [reset , setReset] = useState(false)
  const [name , setName] = useState(null)
  const [isFetching, setIsFetching] = useState(false);
  const [authType, setAuthType] = useState("login");

  const iconColor =  "#777780" // "#4baedc"
  const selectedIconColor = "#dadfed"
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
      setTimeout(() => {
        setIsFetching(false)
      }, 3000);
    }
  }, [user])


  
  return (

        <View
           style={{ 
            paddingTop:Platform.OS == "ios" ? insets.top : insets.top
          }}
           className=" flex-1 borde-4 borde r -b-4  -white borde-white flex-col justify-start items-center py- bg-black primary [#0f1010]">


          <View 
          style={{height: height * 0.130}}
          className="  w-[100%]  flex-col-reverse  items-center px-1 mt- 2 mb- 2 pt-2 justify-start" >
                 <View className=" w-[100%] py-2 px-1 h- [40%] b g-[#1d2d42] flex-row  items-center justify-between" >
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("home")}}
                                                                    style={{
                                                                    
                                                                    }}
                                                                    className="justify-center w- [33%] items-center rounded-lg overflow-hidden shadow-lg  pt- 6  p- 1 rounded- full  flex-col">
                                                                             {selectedPage !== "home" ? (
                                                                                 <MaterialCommunityIcons name="home" size={width/15} color={iconColor} />                                                                                                         
                                                                             ):(
                                                                              <MaterialCommunityIcons name="home"  
                                                                              size={width/15} color={selectedIconColor}/>                                                                         
                                                                             )}
                                                                            {/* <MaterialCommunityIcons name="home" size={33} color={selectedPage !== "home" ? "#4baedc" :"#dadfed"} /> */}
                                                                            <Text 
                                                                              style ={{fontSize:8 ,
                                                                                color : selectedPage !== "home" ? iconColor :  selectedIconColor
                                                                              }}
                                                                              className="text-white font-black  ml- 2 tracking-tight">Home
                                                                            </Text>

                                                                            {/* {selectedPage === "talent" && (<View className="absolute top-2 right-0 w-4 h-4 rounded-full bg-[#079de3]" />)}  */}
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("talent")}}
                                                                    style={{
                                                                      // backgroundColor: selectedPage !== "talent" ? "white" :"#4baed"
                                                                    }}
                                                                    className="justify-center w- [33%] items-center rounded-lg overflow-hidden shadow-lg  pt- 6  p- 1 rounded- full  flex-col">
                                                                             {selectedPage !== "talent" ? (
                                                                                 <MaterialCommunityIcons name="star" size={width/16} color={iconColor} style={{ transform: [{ rotate: "180deg" }]}}/>                                                                                                         
                                                                             ):(
                                                                              <MaterialCommunityIcons name="star"  style={{ transform: [{ rotate: "180deg" }] }}
                                                                              size={width/16} color={selectedIconColor}/>                                                                         
                                                                             )}
                                                                           
                                                                            <Text 
                                                                              style ={{fontSize:8 ,
                                                                                color : selectedPage !== "talent" ? iconColor :selectedIconColor
                                                                              }}
                                                                              className="tex t-white font-black  ml- 2 tracking-tight">Talent
                                                                            </Text>

                                                                            {/* {selectedPage === "talent" && (<View className="absolute top-2 right-0 w-4 h-4 rounded-full bg-[#079de3]" />)}  */}

                                                          </TouchableOpacity>
                                                          <TouchableOpacity 
                                                                  onPress={()=> {setSelectedPage("challenge")}}
                                                                 
                                                                  className="justify-center  items-center rounded-lg overflow-hidden shadow-lg  pt- 6  p- 1 rounded- full  flex-col">
                                                                         
                                                                              <MaterialCommunityIcons name="sword-cross" size={width/17} color={selectedPage !== "challenge" ? iconColor :selectedIconColor} />
                                                                              <Text 
                                                                                  style ={{fontSize:8,
                                                                                    color : selectedPage !== "challenge" ? iconColor :selectedIconColor
                                                                                  }}
                                                                                  className="text-white font-black   tracking-tight">Chlge
                                                                              </Text>
                    

                                                                            {/* {selectedPage === "challenge" && (<View className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#079de3]" />)}  */}

                                                          </TouchableOpacity>
                                                         <TouchableOpacity 
                                                                            onPress={() => { setSelectedPage("notification") }}
                                                                            className="justify-center w- [33%] h- [100%] items-center  shadow-lg  pt- 6  p- 1 rounded- full  flex-col">
                                                                                
                                                                                    <MaterialCommunityIcons name="bell-ring" size={width/17} color=
                                                                                    {selectedPage !== "notification" ? iconColor:  selectedIconColor }
                                                                                    />
                                                                                    <Text 
                                                                                        style={{fontSize:7}}
                                                                                        className="absolute top-[-4] p- right-0 w-4 h-4 rounded-full justif y-center item s-center  text-center bg-white font-black tex t-sm text-red-500 ">
                                                                                            {notifications.filter(not => not.isRead == false).length}
                                                                                    </Text> 
                                                                                    <Text 
                                                                                      style ={{fontSize:8 ,
                                                                                        color : selectedPage !== "notification" ? iconColor:  selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-black  ml- 2 tracking-tight">Not
                                                                                    </Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity 
                                                                      
                                                                            onPress={() => { setSelectedPage("profile") }}
                                                                            className="justify-center w- [33%] h- [100%] items-center  shadow-lg  pt- 6  p- 1 rounded- full  flex-col">

                                                                                    <MaterialCommunityIcons name="account" size={width/15} color=
                                                                                    {selectedPage !== "profile" ? iconColor:  selectedIconColor } 
                                                                                    />
                                                                                    <Text 
                                                                                      style ={{fontSize:8 ,
                                                                                        color : selectedPage !== "profile" ? iconColor :  selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-black  ml- 2 tracking-tight">Profile
                                                                                    </Text>

                                                        </TouchableOpacity>
                                                      
                                                        
                                                        <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("favourite")}}
                                                                    style={{
                                                                    
                                                                    }}
                                                                    className="justify-center w- [33%] items-center rounded-lg overflow-hidden shadow-lg  pt- 6  p- 1 rounded- full  flex-col">
                                                                            {selectedPage !== "favourite" ? (
                                                                                 <MaterialCommunityIcons name="heart" size={width/16} color={iconColor} />                                                                                                         
                                                                            ):(
                                                                                 <MaterialCommunityIcons name="heart" size={width/16} color={selectedIconColor} />                                                                                                         
                                                                            ) }
                                                                            <Text 
                                                                              style ={{fontSize:8 ,
                                                                                color : selectedPage !== "favourite" ? iconColor :  selectedIconColor
                                                                              }}
                                                                              className="text-white font-black  ml- 2 tracking-tight">Fav
                                                                            </Text>

                                                                            {/* {selectedPage === "talent" && (<View className="absolute top-2 right-0 w-4 h-4 rounded-full bg-[#079de3]" />)}  */}

                                                          </TouchableOpacity>
                                                          <TouchableOpacity 
                                                                    onPress={()=> {setSelectedPage("stats")}}
                                                                    style={{
                                                                      // backgroundColor: selectedPage !== "talent" ? "white" :"#4baed"
                                                                    }}
                                                                    className="justify-center w- [33%] items-center rounded-lg overflow-hidden shadow-lg  pt- 6  p- 1 rounded- full  flex-col">
                                                                             {selectedPage !== "stats" ? (
                                                                                 <MaterialCommunityIcons name="poll" size={width/17} color= {iconColor} />                                                                                                         
                                                                              ):(
                                                                                 <MaterialCommunityIcons name="poll" size={width/17} color= {selectedIconColor}/>                                                                                                         
                                                                             ) }
                                                                            <Text 
                                                                              style ={{fontSize:8 ,
                                                                                color : selectedPage !== "stats" ? iconColor : selectedIconColor
                                                                              }}
                                                                              className="tex t-white font-black  ml- 2 tracking-tight">Stats
                                                                            </Text>

                                                                            {/* {selectedPage === "talent" && (<View className="absolute top-2 right-0 w-4 h-4 rounded-full bg-[#079de3]" />)}  */}

                                                          </TouchableOpacity>
                                                          <TouchableOpacity 
                                                                  onPress={()=> {setSelectedPage("trophy")}}
                                                                  style={{
                                                                    // backgroundColor: selectedPage !== "challenge" ? "black" :"lightblue"
                                                                  }}
                                                                  className="justify-center w- [34%] items-center rounded-lg overflow-hidden shadow-lg  pt- 6  p- 1 rounded- full  flex-col">
                                                                              {selectedPage !== "trophy" ? (
                                                                                 <MaterialCommunityIcons name="trophy" size={width/17} color= {iconColor} />                                                                                                         
                                                                              ):(
                                                                                 <MaterialCommunityIcons name="trophy" size={width/17} color= {selectedIconColor}/>                                                                                                         
                                                                             ) }
                                                                              <Text 
                                                                                  style ={{fontSize:8,
                                                                                    color : selectedPage !== "trophy" ? iconColor : selectedIconColor
                                                                                  }}
                                                                                  className="text-white font-black   tracking-tight">Trophy
                                                                              </Text>
                    

                                                                            {/* {selectedPage === "challenge" && (<View className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#079de3]" />)}  */}

                                                          </TouchableOpacity>
                 </View>
                 <View className=" w-[100%]  h-[60%] py- 1 flex-row b g-red-500 items-end justify-between " >
                                            <View 
                                            style ={{height:height * 0.13 * 0.6 * 0.1 ,width:width - width/4.2}}
                                            className="absolute bottom-0 left-0 w-[80%]  bg-[#3d6fee]  rounded-l-md 
                                                flex-row justify-center items-center">
                                                     
                                            </View>
                                            {/* <View className="absolute top-0 left-0 w-[7%] h-[100%] bg-[#3074e9]  rounded-lg justify-center items-center"/> */}
                                            <View className = " px-2 h-[90%] mb-auto rounded-l-xl flex-col b g-[#2d2929] justify-center items-start" >
                                                        <Text 
                                                                      style={{fontSize:width/45}}
                                                                      className=" text-center text-white mb -auto font-black tex t-md ">
                                                                          Push your limits with
                                                        </Text> 
                                                        <Text 
                                                                      // style={{fontSize:7}}
                                                                      style = {{fontStyle:"italic" 
                                                                        ,
                                                                         fontSize:width/30 
                                                                      }}
                                                                      className=" text-center text-[#f5d536] blue-400 mt- 3  font-black  ">
                                                                          Challengify
                                                        </Text> 
                                            </View>
                                            <View
                                              className=" flex-1  h-[90%] mb-auto flex-row gap-1 b g-[#2d2929]  justify-center items-center">
                                                    {user ? (
                                                    <Image 
                                                    style={{width:height * 0.04 ,height: height * 0.040}}
                                                    className="w-[40px] h-[40px]  rounded-full "
                                                    source={{uri : user && (user.profile_img ? user.profile_img  : "")}}
                                                    />
                                                    ):(
                                                    <Image 
                                                    style={{width:height * 0.04 ,height: height * 0.04}}
                                                    className="w-[40px] h-[40px]  rounded-full "
                                                    source={icons.avatar}
                                                    />
                                                    )}
                                            {/* </View> */}
                                                    <View
                                                      className=" h-[100%]  flex-col px-1 rounded-r-xl b g-[#2f261f] gap-1 justify-center items-start">
                                                            
                                                            <Text   
                                                                style ={{fontSize:width/40}}
                                                                className="font-black mt- auto text-gray-100 ">
                                                                  {user && user.name} 
                                                            </Text>
                                                            <View
                                                                  className=" flex-row  justify-center items- end gap-2 ">
                                                                            <Text   
                                                                              style ={{fontSize:width/42}}
                                                                              className="font-black  text-gray-200 ">
                                                                                  <Text   
                                                                                    style ={{fontSize:width/42}}
                                                                                    className="font-bold  text-gray-200 ">
                                                                                    {user && user.city} {' , '}
                                                                                  </Text>
                                                                              {user && countryCodes[user.country]} 
                                                                            </Text>
                                                                            < CountryFlag
                                                                              isoCode={user && user.country || "us"}
                                                                              size={10}
                                                                                  />
                                                            </View>
                                                    </View>
                                                    <View 
                                                    style ={{height:height * 0.13 * 0.6 * 0.6 ,width:height * 0.13 * 0.6 * 0.1}}
                                                    className="absolute bottom-0 right-0   bg-[#3d6fee]  rounded-l-md 
                                                        flex-row justify-center items-center">
                                                            
                                                    </View>
                                            </View>
                                          
                                            <View 
                                            style ={{width:width/4.5}}
                                            className = "b g-[#1d2d42]  h-[80%] px-2 mt- auto flex-row gap-4 justify-center items-end" >
                                                        <View 
                                                        style ={{height:height * 0.13 * 0.6 * 0.1 ,width: width/4.5}}
                                                        className="absolute top-1 left-0   bg-[#3d6fee]  rounde d-l-md 
                                                            flex-row justify-center items-center">
                                                                
                                                        </View>
                                                        <TouchableOpacity
                                                                        onPress={() => { setSelectedPage("search") }}
                                                                        className="justify-center w- [33%] h- [100%]  items-center rounded-lg overflow-hidden shadow-lg  pt- 6  p- 1 rounded- full  flex-col">
                                                                                <Ionicons name="search" size={width/16} color=
                                                                                    {selectedPage !== "search" ? iconColor :selectedIconColor } style={{ transform: [{ rotate: "-90deg" }] }}
                                                                                />
                                                                                <Text 
                                                                                      style ={{fontSize:8 ,
                                                                                        color : selectedPage !== "search" ? iconColor :selectedIconColor
                                                                                      }}
                                                                                      className="text-white font-black   tracking-tight">Search
                                                                                </Text>
                                                        </TouchableOpacity>   
                                                        <TouchableOpacity 
                                                                  onPress={()=> {setSelectedPage("help")}}
                                                                 
                                                                  className="justify-center  items-center rounded-lg overflow-hidden shadow-lg  ml-auto rounded- full  flex-col">
                                                                         
                                                                              <MaterialCommunityIcons name="help-circle" size={width/17} color={selectedPage !== "help" ? iconColor :selectedIconColor} />
                                                                              <Text 
                                                                                  style ={{fontSize:10,
                                                                                    color : selectedPage !== "help" ? iconColor : selectedIconColor
                                                                                  }}
                                                                                  className="text-white font-black   tracking-tight">help
                                                                              </Text>
                                                                            {/* {selectedPage === "challenge" && (<View className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#079de3]" />)}  */}

                                                        </TouchableOpacity>

                                           </View>


                 </View>
          </View>
       

       {/* {!selectedPage && (
            <View
             className="w-full h-[6%]  p-1 borde-2 rder-[#fefefe]  borde-l-[10px] borde-r-[10px] borde--[10px] borde-[#272d31]  b g-[#c3bdbd] [#3b4348]
                flex-row justify-center items-center">
                 <View className=" w-[100%] h-[100%] px- borde-gray-200 borde-2 bg-[#fffcfc]   rounded-lg
                     flex-row justify-center items-center">
                    <TextInput
                        className=" text-gray-700 -[100%]   -[100%] px-3
                        font-bold text-sm"
                        placeholder="Search for a challenge "
                        placeholderTextColor="black"
                          />
                      <TouchableOpacity onPress={()=> {}}>
                          <Image className ="w-6 h-6"
                          resizeMode='contain'
                          source={icons.search} />
                      </TouchableOpacity>                
                 </View >
            </View>
       )} */}

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