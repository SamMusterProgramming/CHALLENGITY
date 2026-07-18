import { ActivityIndicator,Animated,Platform,  useWindowDimensions, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationsModal from '../components/talent/modal/NotificationsModal';
import HomePage from '../components/home/HomePage';
import UserNotifications from '../components/home/UserNotifications';
import { useGlobalContext } from '../context/GlobalProvider';

import Challenge from '../components/home/Challenge';
import UserProfile from '../components/home/UserProfile';
import Favourite from '../components/home/Favourite';
import NotificationDrawer from '../components/modal/NotificationDrawer';
import HeaderApp from '../components/header/headerApp';
// import ProfileDrawer from '../components/profile/modal/profileDrawer';
import {  getArenaByUser,  getFavouriteStages, getFollowData, getGlobalSpotlightPerformances, getHotStages, getLocalArenas, getNotificationByUser, getRegionalSpotlightPerformances, getRegionTalentStages, getTrendingStages, getUserFriendsData, getUserTalent, markNotificationRead } from '../apiCalls';
import { getUserCountry } from '../utilities/userGeoLocation';
import { clearPendingNotification, getPendingNotification } from '../notifications/pendingNotification';
import { routeNotification } from '../notifications/notificationRouter';
import { useLoading } from '../context/loadingContext';
import NavBar from '../components/header/navBar';
import * as NavigationBar from "expo-navigation-bar";
import StageHomePage from '../components/home/stageHomePage';
import FavouriteStageDrawer from '../components/modal/favouriteStageDrawer';
import PerformanceHomePage from '../components/home/performanceHomePage';
import Arena from '../components/home/arena';
import ProfileDrawer from '../components/profile/modal/profileDrawer';



export default function Home() {
  const insets = useSafeAreaInsets();
  const {user,setUser ,activeIndex,setActiveIndex , isLoggingOut , setSelectedArena , setFavouriteList,setUserTalents,setTopTalents , setRegionStages, allStages, setAllStages ,trendingStages, setTrendingStages,hotStages , setHotStages,favouriteStages, setFavouriteStages
    ,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData ,setUserProfileImg , userArenas , setUserArenas , setLocalArenas,
    setGlobalSelectedRegion , setUserCountryCode , globalSpotlightPerformances, setGlobalSpotlightPerformances,globalSpotlightPage, setGlobalSpotlightPage,
    regionalSpotlightPerformances, setRegionalSpotlightPerformances } = useGlobalContext() 
  const { width, height } = useWindowDimensions();
  const [selectedPage , setSelectedPage] = useState(null)
  const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
  const [showFavourite , setShowFavourite] = useState(false)
  const [isFetching, setIsFetching] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const headerHeight = height * 0.14;
  const [isReady ,setIsReady] = useState(false)
  const { showLoading, hideLoading } = useLoading();

  const navTranslateY = useRef(
    new Animated.Value(0)
  ).current;
  const lastOffset = useRef(0);
  const navVisible = useRef(true);

  const isDrawerOpen =
  showNotifications ||
  showProfile ||
  showFavourite ;

  useEffect(() => {
    if(activeIndex === 1) {
      Animated.timing(navTranslateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
   
  }, [activeIndex])
  
  
  useEffect(() => {
    if (isDrawerOpen) {
      navVisible.current = false;
  
      Animated.timing(navTranslateY, {
        toValue: 120,
        duration: 180,
        useNativeDriver: true,
      }).start();
    } else {
      navVisible.current = true;
  
      Animated.timing(navTranslateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  }, [isDrawerOpen]);
  
  const handleScroll = (e) => {
    const currentOffset =
      e.nativeEvent.contentOffset.y;
  
    // Always show navbar near top
    if (currentOffset <= 20) {
      if (!navVisible.current) {
        navVisible.current = true;
  
        Animated.spring(navTranslateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
  
      lastOffset.current = 0;
      return;
    }
  
    const diff =
      currentOffset - lastOffset.current;
  
    if (
      diff > 5 &&
      navVisible.current
    ) {
      navVisible.current = false;
  
      Animated.spring(navTranslateY, {
        toValue: 100,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  
    if (
      diff < -5 &&
      !navVisible.current
    ) {
      navVisible.current = true;
  
      Animated.timing(navTranslateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  
    lastOffset.current = currentOffset;
  };
  
  useEffect(() => {
    if (!user || isReady) return;
    const fetchUserData = async () => {
      try {
        showLoading("start the user")
        await Promise.all([
          getUserTalent(user._id, setUserTalents),
          getNotificationByUser(user._id, setNotifications),
          // getFollowings(user._id, setFollowings),
          getUserFriendsData(user._id, setUserFriendData),
          getFollowData(user._id, setFollow),
          getFavouriteStages(user._id, setFavouriteStages),
          // getTopTalents(user._id, setTopTalents),
          // getAllTalentStages(setAllStages),
          // getRegionTalentStages("US" , setRegionStages),
          getHotStages(user._id, setHotStages),
          getArenaByUser(user._id ,setSelectedArena, setUserArenas),
          // getUserCountryFromGPS(setGpsLocation),
        ]);
        await getUserCountry().then( async(r) =>{
                           const res = r;
                           setGlobalSelectedRegion(res)
                           setUserCountryCode(res)
                           await getRegionalSpotlightPerformances(globalSpotlightPage , res ).then((response) =>{
                                              const data = response.data;
                                              // console.log(data)
                                              if(!data.success) return null;
                                              setRegionalSpotlightPerformances(data.performances);
                                              // setGlobalSpotlightPage(data.page+1)
                                               })
                           await Promise.all ([getRegionTalentStages(res, setRegionStages),
                                               getTrendingStages(res, setTrendingStages),
                                               getLocalArenas(res,{userId:user._id}, setLocalArenas)]
                           )
                       })
        await getGlobalSpotlightPerformances(globalSpotlightPage)
                        .then((res) =>{
                           const data = res.data;
                           setGlobalSpotlightPerformances(data.performances);
                           setGlobalSpotlightPage(data.page+1)
                        })
       

        setUserProfileImg(user.profileImage?.publicUrl);
        // router.replace("/Home");
        const pending = getPendingNotification();
        if (pending) {
          console.log(
            "PROCESS PENDING:",
            pending
          );
          clearPendingNotification();
          markNotificationRead(pending.notification_id)
          setTimeout(() => {
            routeNotification(pending);
          }, 500);
        }
        setIsReady(true)
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        hideLoading();
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  if(!user || !isReady) {
    return (
      <View 
      className = "flex-1 bg-black "
      />
    )} ;

  return (

       <View
           style={{ 
            paddingTop:Platform.OS == "ios" ? insets.top : insets.top
          }}
           className=" flex-1  flex-col justify-start items-center py- bg-black primary [#0f1010]">
         
          <View
            className="w-full bg-black justify-center items-center " >
            <HeaderApp
              user={user && user || null}
              showNotifications = {showNotifications}
              showFavourite = {showFavourite}
              setShowNotifications={setShowNotifications}
              setShowFavourite={setShowFavourite}
              setShowProfile={setShowProfile}
              width={width}
              height = {height}
              headerHeight={headerHeight}
            />
       
            {/* <NavBar
              width={width}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              headerHeight={headerHeight}
            /> */}
          </View>
 

            { !user ? (
            <View     
            className="w-[100%] h-[79%] flex-1 py- px- bg-black  rounde-xl borde-[#272d31]  g-[#3b4348] ">
            

            </View>
            ) : (
       
            <View     
                    className="w-[100%] h- [79%] flex-1  mt- 2 bg-black [#3b4348]  rounde-xl borde-[#272d31]  g-[#3b4348] 
                       flex-col justify-center items-center">
                        {activeIndex === 0 && ! isFetching && (
                          <HomePage onScroll ={handleScroll} />
                        )}
                        {activeIndex === 1 && ! isFetching && (
                          <StageHomePage onScroll = {handleScroll} />
                        )}
                        {activeIndex === 2 && ! isFetching && (
                          // <Challenge setSelectedPage={setSelectedPage} />
                          <PerformanceHomePage onScroll={handleScroll} setSelectedPage={setSelectedPage} />
                        )}
                        {activeIndex === 3 && ! isFetching && ! isLoggingOut && (
                          <Arena user={user}  onScroll={handleScroll}/>
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
            <Animated.View
              style={{
                position: "absolute",
                bottom: height * 0.02,
                left: 0,
                right: 0,
                height : headerHeight * 0.5,
                zIndex: 999,
                transform: [
                  {
                    translateY: navTranslateY,
                  },
                ],
              }}
              className ="fle x-1 to borde r-t-2 b order-gold/50 bg-black" >
              <NavBar
                width={width}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                headerHeight={headerHeight}
              />
            </Animated.View>
  
           <View
           className = "bg-black"
             style={{ 
             height: Platform.OS =="ios" ? height * 0.02 : height * 0.02  ,
             width:"100%",
             }}/>

          {displayNotificationsModal && 
          <NotificationsModal user={user} displayNotificationsModal={displayNotificationsModal}
          setDisplayNotificationsModal={setDisplayNotificationsModal}/>}

          {showFavourite && 
          <FavouriteStageDrawer   visible={showFavourite}
          onClose={() => setShowFavourite(false)}/>}

          <NotificationDrawer
          visible={showNotifications}
          onClose={() => setShowNotifications(false)}
          />
          {showProfile && (
             <ProfileDrawer
             visible={showProfile}
             onClose={() => setShowProfile(false)}
             />
          )}
         
 
      </View>
       

  )
}