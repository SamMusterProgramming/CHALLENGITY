// {
//     "expo": {
//       "name": "Challengify",
//       "slug": "Challengify",
//       "runtimeVersion": "1.0.0",
//       "backgroundColor": "#000000",
//       "version": "1.0.0",
//       "orientation": "portrait",
//       "icon": "./assets/images/challenge-logo.png",
//       "scheme": "challengify",
//       "userInterfaceStyle": "automatic",
//       "newArchEnabled": true,
//       "androidNavigationBar": {
//         "visible": "sticky-immersive"
//       },
//       "ios": {
//         "supportsTablet": true,
//         "bundleIdentifier": "com.anonymous.Challengify",
//         "infoPlist": {
//           "ITSAppUsesNonExemptEncryption": false ,
//           "NSLocationWhenInUseUsageDescription": "We use your location to verify eligibility for region-based talent stages."
//         }
//       },
//       "android": {
//         "softwareKeyboardLayoutMode": "pan",
//         "adaptiveIcon": {
//           "foregroundImage": "./assets/images/challenge-logo.png"
//         },
//         "package": "com.challengify.app"
        
//       },
//       "web": {
//         "output": "static"
//       },
//      "plugins": [
//     "expo-router",
    
//     [
//       "expo-image-picker",
//       {
//         "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera to let you ...",
//         "imagePickerPermission": "Allow $(PRODUCT_NAME) to access your photos to let you ..."
//       }
//     ],
//     [
//       "expo-navigation-bar",
//       {
//         "position": "absolute",
//         "visibility": "hidden",
//         "behavior": "overlay-swipe",
//         "backgroundColor": "#00000080"
//       }
//     ],
//     [
//       "expo-splash-screen",
//       {
//         "image": "./assets/images/challenge-logo.png",
//         "imageWidth": 200,
//         "resizeMode": "contain",
//         "backgroundColor": "#000000"
//       }
//     ],
//     [
//       "expo-camera",
//       {
//         "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
//         "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
//         "recordAudioAndroid": true
//       }
//     ],
//     [
//       "expo-video",
//       {
//         "supportsBackgroundPlayback": true,
//         "supportsPictureInPicture": true
//       }
//     ],
//     "expo-font",
//     [
//       "expo-build-properties",
//       {
//         "ios": {
//           "useFrameworks": "static",
//           "useModularHeaders": true,
//           "deploymentTarget": "15.1"
//         }
//       }
//     ],
//     "expo-web-browser",
//     [
//       "@react-native-google-signin/google-signin",
//       {
//         "iosUrlScheme": "com.googleusercontent.apps.373653845536-a02tl7vqrhe3ac4k96uu8pkgf3g8tt94"
//       }
//     ],
//     [
//       "expo-location",
//       {
//         "locationWhenInUsePermission": "Allow Challengify to access your location to verify regional stage access.",
//         "locationAlwaysAndWhenInUsePermission": "Allow Challengify to access your location even when the app is in the background."
//       }
//     ]
//   ],
//       "experiments": {
//         "typedRoutes": true
//       },
//       "owner": "samirhaddadi2025",
//       "extra": {
//         "router": {
//           "origin": false
//         },
//         "eas": {
//           "projectId": "cae0cce5-9b26-41f9-a1b3-66ca72625219"
//         }
//       },
//       "updates": {
//         "url": "https://u.expo.dev/cae0cce5-9b26-41f9-a1b3-66ca72625219"
//       }
//     }
//   }