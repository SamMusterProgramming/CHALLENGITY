
import { View,  useWindowDimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router } from 'expo-router'
import "../global.css";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../context/GlobalProvider';

import {  BASE_URL, generateChallengeTalentGuinessData, getAllTalentStages, getFavouriteList, getFavouriteStageList, getFavouriteStages, getFollowData, getFollowings, getNotificationByUser, getRegionTalentStages, getToken, getTopTalents, getUserFriendsData, getUserTalent } from '../apiCalls';
import { useFonts } from 'expo-font';
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { useLoading } from '../context/loadingContext';
import { getUserCountry } from '../utilities/userGeoLocation';



// import { configureGoogle } from '../config/google';

;
// import { configureGoogle } from '../services/googleLogin';



export default function App() {
  const videoRef = useRef()
  const { showLoading, hideLoading } = useLoading();

  const [isFetching, setIsFetching] = useState(false);
  const {user,setUser , setFavouriteList,setUserTalents,setTopTalents , setRegionStages, allStages, setAllStages ,hotStages , setHotStages,favouriteStages, setFavouriteStages
    ,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData ,setUserProfileImg ,
    gpsLocation , setGpsLocation  , setGlobalSelectedRegion , setUserCountryCode } = useGlobalContext()  

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });
  const [isAppReady, setIsAppReady] = useState(false);
  

  useEffect(() => {
    //  configureGoogle();
  }, []); 



useEffect(() => {
  const autoLogin = async () => {
    try {
      showLoading("Authenticating...");
      const token = await getToken();
      if (!token) {
        router.replace("/Login");
        return;
      }
      const res = await fetch(`${BASE_URL}/users/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!data.user) {
        router.replace("/Login");
        return;
      }
      setUser(data.user);

      // IMPORTANT: success path
      hideLoading();
    } catch (error) {
      console.log("Auto login error:", error);
      router.replace("/Login");
    } finally {
      hideLoading();
    }
  };

  autoLogin();
}, []);

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      try {
        await Promise.all([
          getUserTalent(user._id, setUserTalents),
          getNotificationByUser(user._id, setNotifications),
          // getFollowings(user._id, setFollowings),
          getUserFriendsData(user._id, setUserFriendData),
          // getFollowData(user._id, setFollow),
          getFavouriteStageList(user._id, setFavouriteList),
          getFavouriteStages(user._id, setFavouriteStages),
          // getTopTalents(user._id, setTopTalents),
          // getAllTalentStages(setAllStages),
          // getRegionTalentStages("US" , setRegionStages),
          generateChallengeTalentGuinessData(user._id, setHotStages),
          // getUserCountryFromGPS(setGpsLocation),
        ]);
        await getUserCountry().then( async(res) =>{
                           setGlobalSelectedRegion(res)
                           setUserCountryCode(res)
                           await getRegionTalentStages(res, setRegionStages)
                       })
        setUserProfileImg(user.profileImage?.publicUrl);
        router.replace("/Home");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        hideLoading();
      }
    };
    fetchUserData();
  }, [user]);

 

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "black",
      }}
    >
    </View>

  )
}