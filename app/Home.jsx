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
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
import { Feather, HomeIcon } from 'lucide-react-native';
import TopStageNavBar from '../components/talent/custom/TopStageNavBar';
import NotificationSearchNav from '../components/talent/custom/NotificationSearchNav';
import NotificationDrawer from '../components/talent/modal/NotificationDrawer';
import HeaderApp from '../components/header/headerApp';




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
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);



  // K005hK5QWiidUsLdkk3ak8RXVksORZU
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
      setUserProfileImg(user.profileImage?.publicUrl)
      // getVideo(user.profileImage.
      //   signedUrl).then(path =>{
      //      setUserProfileImg(path)
      //   });
      // getVideo(user.cover_img).then(path =>{
      //     setUserCoverImg(path)
      //   });
      setTimeout(() => {
        setIsFetching(false)
      }, 3000);
    }
  }, [user])

  const headerHeight = height * 0.12;


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
            style={{ height: headerHeight }}
            className="w-full bg-black"
          >

            <HeaderApp
              user={user && user || null}
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
              width={width}
              headerHeight={headerHeight}
            />

            <View className="flex-1 bor der-t bo rder-[#434242] flex-row items-center">
                <TopStageNavBar
                  width={width}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
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
                    className="w-[100%] h- [79%] flex-1  mt- 2 bg-black [#3b4348]  rounde-xl borde-[#272d31]  g-[#3b4348] 
                       flex-col justify-center items-center">
                        {activeIndex === 0 && ! isFetching && (
                          <HomePage reset ={reset} setReset={setReset}/>
                        )}
                        {activeIndex === 1 && ! isFetching && (
                          <Talent setSelectedPage={setSelectedPage} />
                        )}
                        {activeIndex === 2 && ! isFetching && (
                          <Challenge setSelectedPage={setSelectedPage} />
                        )}
                        {activeIndex === 4 && ! isFetching && ! isLoggingOut && (
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
             height: Platform.OS =="ios" ? width/20 + 5 : width/20 ,
             width:"100%",
             }}>

             </View>

                 
          {displayNotificationsModal && 
          <NotificationsModal user={user} displayNotificationsModal={displayNotificationsModal}
          setDisplayNotificationsModal={setDisplayNotificationsModal}/>}

          <NotificationDrawer
          visible={showNotifications}
          onClose={() => setShowNotifications(false)}
          />
 
      </View>
       

  )
}