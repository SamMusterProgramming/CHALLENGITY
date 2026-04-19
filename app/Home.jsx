import { ActivityIndicator,Platform,  useWindowDimensions, View } from 'react-native'
import React, {  useEffect, useMemo, useState } from 'react'
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationsModal from '../components/talent/modal/NotificationsModal';
import HomePage from '../components/home/HomePage';
import UserNotifications from '../components/home/UserNotifications';
import { useGlobalContext } from '../context/GlobalProvider';
import Talent from '../components/home/Talent';
import Challenge from '../components/home/Challenge';
import UserProfile from '../components/home/UserProfile';
import Favourite from '../components/home/Favourite';
import TopStageNavBar from '../components/talent/custom/TopStageNavBar';
import NotificationDrawer from '../components/modal/NotificationDrawer';
import HeaderApp from '../components/header/headerApp';
import ProfileDrawer from '../components/modal/profileDrawer';

import { getUserCountry } from '../utilities/userGeoLocation';


// import { getUserCountryFromGPS } from '../utilities/userGeoLocation';
// import { getUserLocationSafe } from '../utilities/locationServices';





export default function Home() {
  const insets = useSafeAreaInsets();
  const {user,isLoggingOut, gpsLocation , setGpsLocation , isLoading , setIsLoading} = useGlobalContext()  
  const { width, height } = useWindowDimensions();
  const [selectedPage , setSelectedPage] = useState(null)
  const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
  const [refresh , setRefresh] = useState(false)
  const [reset , setReset] = useState(false)
  const [name , setName] = useState(null)
  const [isFetching, setIsFetching] = useState(false);
  const [authType, setAuthType] = useState("login");

  const iconColor = "#ffffff" 
  const selectedIconColor = "lightblue"
  const iconSize = width/20
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [appReady , setAppReady] = useState(false)





  // useEffect(() => {
  //   const run = async () => {
  //     const location = await getUserLocationSafe();
  //     setGpsLocation(location);
  //   };
  
  //   setTimeout(run, 2000);
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const location = await getUserCountry()
  //     console.log("location" + location.countryCode);
  //   })();
  // }, []);

  const headerHeight = height * 0.13;


  return (

       <View
           style={{ 
            paddingTop:Platform.OS == "ios" ? insets.top : insets.top
          }}
           className=" flex-1  flex-col justify-start items-center py- bg-black primary [#0f1010]">

          <View
            style={{ height: headerHeight }}
            className="w-full bg-black justify-center items-center"
          >
            <HeaderApp
              user={user && user || null}
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
              setShowProfile={setShowProfile}
              width={width}
              headerHeight={headerHeight}
            />
            <View className="flex- 1 h-[50%] bor der-t bo rder-[#434242] flex-row items-center">
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
            

            </View>
            ) : (
       
            <View     
                    className="w-[100%] h- [79%] flex-1  mt- 2 bg-black [#3b4348]  rounde-xl borde-[#272d31]  g-[#3b4348] 
                       flex-col justify-center items-center">
                        {activeIndex === 0 && ! isFetching && (
                          <HomePage />
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
          <ProfileDrawer
          visible={showProfile}
          onClose={() => setShowProfile(false)}
          />
 
      </View>
       

  )
}