
import { View} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router } from 'expo-router'
import "../global.css";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../context/GlobalProvider';
import {  BASE_URL, getToken } from '../apiCalls';
import { useFonts } from 'expo-font';
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { useLoading } from '../context/loadingContext';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../utilities/registerForPushNotifications';
import { initializeUploadStorage, recoverUploadQueue } from '../services/uploads';


import ItriUpload from "itri-upload";

console.log("ItriUpload loaded:", !!ItriUpload);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


// import { configureGoogle } from '../config/google';

// import { configureGoogle } from '../services/googleLogin';

export default function App() {
  const { showLoading, hideLoading } = useLoading();
  const {setUser  } = useGlobalContext()  

  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });
  
  useEffect(() => {
    //  configureGoogle();
  }, []); 

  // useEffect(() => {
  //   NavigationBar.setPositionAsync("absolute");
  //   NavigationBar.setVisibilityAsync("hidden");
  // }, []);

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
      registerForPushNotificationsAsync(data.user._id);
      router.replace("/Home");

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

// useEffect(() => {
//   const initializeUploads = async () => {
//     try {
//       await initializeUploadStorage();
//       await initializeImageUploadStorage();
//       // Recover unfinished uploads without blocking app startup
//       recoverUploadQueue().catch((error) => {
//         console.error(
//           "❌ Failed to recover upload queue:",
//           error
//         );
//       });
//     } catch (error) {
//       console.error(
//         "❌ Failed to initialize upload queue:",
//         error
//       );
//     }
//   };
//   initializeUploads();
// }, []);

useEffect(() => {
  const initializeApp = async () => {
    try {
      await initializeUploadStorage();
      await recoverUploadQueue();
      // your existing initialization code...
    } catch (error) {
      console.error(
        "❌ Failed to initialize upload storage:",
        error
      );
    }
  };

  initializeApp();
}, []);


  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "black",
      }}
    />
 
  )
}