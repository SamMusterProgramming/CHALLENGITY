import { ActivityIndicator,Platform,  useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
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




// import { getUserCountryFromGPS } from '../utilities/userGeoLocation';
// import { getUserLocationSafe } from '../utilities/locationServices';





export default function Home() {
  const insets = useSafeAreaInsets();
  const {user,isLoggingOut , activeIndex, setActiveIndex} = useGlobalContext()  
  const { width, height } = useWindowDimensions();
  const [selectedPage , setSelectedPage] = useState(null)
  const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
 
  const [isFetching, setIsFetching] = useState(false);

  // const [activeIndex, setActiveIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const headerHeight = height * 0.12;

  if(!user) return ;


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
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
              setShowProfile={setShowProfile}
              width={width}
              height = {height}
              headerHeight={headerHeight}

            />
       
            <TopStageNavBar
              width={width}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              headerHeight={headerHeight}
            />
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
                        {activeIndex === 3 && ! isFetching && ! isLoggingOut && (
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
          {showProfile && (
             <ProfileDrawer
             visible={showProfile}
             onClose={() => setShowProfile(false)}
             />
          )}
         
 
      </View>
       

  )
}