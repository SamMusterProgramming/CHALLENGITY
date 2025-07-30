import { View, Text,  ScrollView, Image,RefreshControl, FlatList, TouchableOpacity, Alert, Platform, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { getFollowData, getUserAllChallenges, getUserById, getUserChallenges, getUserFriendsData, getUserParticipateChallenges } from '../apiCalls'
import Challenge from '../components/challenge/Challenge'
import { icons } from '../constants'
import { router, useGlobalSearchParams, useLocalSearchParams} from 'expo-router'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { storage } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoChallenge from '../components/challenge/NoChallenge'
import ProfileHeader from '../components/profile/ProfileHeader'
import { concatenateAndSortByDate } from '../helper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import InfosProfile from '../components/profile/InfosProfile'
import Friend from '../components/profile/Friend'
import { clearLocalStorage } from '../videoFiles'
import LoadingPage from '../components/custom/LoadingPage'

export default function ProfilePage() {
 const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
  const { width, height } = useWindowDimensions();

  const insets = useSafeAreaInsets();
//   const {isViewed ,setIsViewed} = useGlobalContext()
  const [displayList, setDisplayList] = useState(userFriendData && userFriendData.friends || null)
  const [friends, setFriends ] = useState(null)
  const [selection, setSelection] = useState("friends");
  const [logingOut, setLogingOut] = useState(false);

  const [allChallenges,setAllChallenges] = useState([])



//   useEffect ( () => {     
//     getUserFriendsData(user._id , setFriends)
//   } , [] ) 

//   useEffect ( () => {     
//     getUserById(user_id, setUserProfile)
//   } , [] ) 


  // useEffect ( () => {    
  //   if(challenger) {
  //      getUserAllChallenges(user_id ,setAllChallenges)
  //   } 
  // } , [challenger] ) 


   useEffect ( () => {     
    switch (selection) {
        case "friends":
            setDisplayList(userFriendData.friends)
            break;
        case "followers":
            setDisplayList(follow.followers)
            break;
        case "followerings":
            setDisplayList(follow.followings)
            break;
        default:
            break;
    }
  } , [selection] )  
  
  

 
if(logingOut){
    return(
    <LoadingPage text ="Loging Out ... Please Wait" />
    )
}





  return (
    <View
    style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top,
        paddingBottom:Platform.OS == "ios" ? insets.bottom : insets.bottom}}
     className="bg-primary flex-1 ">
     
        <View className="bg- w-[100vw] h-[50vh] flex-col justify-start items-center g-white  "> 
                <View className="bg- w-[70%] flex-col bg-white justify-center mt-2 rounded-xl items-center h-[35%]">
                    <Image 
                    resizeMode='stretch'
                    className="w-[98%] h-[98%] rounded-xl"
                    source={{uri:user && user.cover_img}} 
                    />
                    <View 
                    style={{width:height/10 ,height:height/10
                        ,marginBottom: -height/20
                    }}
                    className="bg-  absolute bottom-0 bg-black flex-col rounded-full justify-center items-center ">
                    <Image 
                    className="w-[95%] h-[95%] rounded-full"
                    resizeMode='cover'
                    source={{uri:user && user.profile_img}} 
                    />
                    </View>
                </View> 
                <View className=" w-[100%] bg- flex-row justify-center items-end h-[20%]">
                            <TouchableOpacity 
                              onPress={
                                ()=> {
                                router.navigate('/SetUpProfile')
                                } }
                            
                                className="  absolute top-2 right-6  rounded-full flex-col gap- justify-center items-center ">
                                <Image 
                                    className={width <= 330 ? "w-10 h-10" : "w-12 h-12 bg-white rounded-full"}

                                resizeMode='fill'
                                source={icons.update_profile} 
                                />
                                <Text
                                style={{fontSize:9}}
                                className="text-white font-bold text-base  py- ">
                                Update
                                </Text>
                            </TouchableOpacity>  
                            <Text
                            style={{fontSize:18}}
                                className="text-white font-bold  text-xl">
                                {user && user.name}
                            </Text>
                            <TouchableOpacity 
                                onPress={async()=>{                           
                                        try {
                                 
                                            await AsyncStorage.removeItem("jwt_token")
                                            
                                            setLogingOut(true)
                                            // clearLocalStorage() 
                                            setTimeout(() => {
                                                setUser(null)
                                                setTrendingChallenges([])
                                                setPublicParticipateChallenges(null)
                                                setIsViewed(true)
                                                setNotifications([])
                                                setFollowings([])
                                                setUserFriendData(null)
                                                setFollow(null)
                                                setLogingOut(false)
                                                router.replace('/(auth)/login');
                                            }, 2000);
                                           
                                        
                                    } catch (error) {
                                        console.log(error)
                                    }
                                  }
                                  
                                }
                            
                                className="  absolute top-2 left-6   rounded-full flex-col  justify-center items-center ">
                                <Image 
                                    className={width <= 330 ? "w-10 h-10" : "w-12 h-12"}
                                resizeMode='fill'
                                source={icons.logout} 
                                />
                                <Text
                                style={{fontSize:9}}
                                className="text-white font-bold text-base ">
                                Logout
                                </Text>
                                
                            </TouchableOpacity>  

                        
                </View>

                <View className=" w-[100vw] bg flex-row justify-start items-center h-[20%]">
                    <InfosProfile city={user && user.city || ""} state={user && user.state || ""} country={user && user.country || ""} heigh={0} />
                </View> 
            
                <View className="flex-row w-full gap-4 justify-center items-end mt-auto rounded-t-3xl g-[#0b64f4] g-white h-[15%]">
                   
                    <TouchableOpacity
                    onPress={() => {
                        setDisplayList([...userFriendData.friends])
                        setSelection("friends")}}
                    style={{backgroundColor:selection =="friends"? "#0b64f4":"#030d42"}}
                    className="flex-col w-[30%] -[100%] justify-center gap- p-2 px- bg-[#030d42] rounded-t-full items-center"
                    >
                        <Text
                        style={{fontSize:10}}
                        className="text-white font-black text-base">
                            Friends
                        </Text>
                        <Text
                        style={{fontSize:12}}
                        className="text-white font-bold  text-base">
                            {userFriendData && userFriendData.friends.length}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => {
                        setDisplayList(follow.followers)
                        setSelection("followers")
                    }}
                    style={{backgroundColor:selection =="followers"? "#0b64f4":"#030d42"}}
                    className="flex-col w-[30%] justify-center gap- p-2 px- rounded-t-full borde-2 borde-white items-center"
                    >
                        <Text
                        style={{fontSize:10}}
                        className="text-white font-black text-base">
                            Followers
                        </Text>
                        <Text
                        style={{fontSize:12}}
                        className="text-white font-bold  text-base">
                            {follow && follow.followers.length}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => {
                        setDisplayList(follow.followings)
                        setSelection("followings")
                    }}
                    style={{backgroundColor:selection =="followings"? "#0b64f4":"#030d42"}}
                    className="flex-col w-[30%] justify-center gap- p-2 px- rounded-t-full items-center"
                    >
                        <Text
                        style={{fontSize:10}}
                        className="text-white font-black text-base">
                            Followings
                        </Text>
                        <Text
                        style={{fontSize:12}}
                        className="text-white font-bold  text-base">
                            {follow && follow.followings.length}
                        </Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity 
                    onPress={()=>{
                        setIsViewed(true)
                        router.back()}}
                     className="absolute top-2 left-0  flex-col rounded-sm justify-center items-center ">
                        <Image 
                        className="w-14 h-8"
                        resizeMode='contain'
                        source={icons.back} 
                        />
                       
                </TouchableOpacity>

              
               
     </View>
      {/* )} */}
 
    <View className=" w-[100%] h-[50%] flex-col py-4 px-2 justify-start items-center g-white ">
            <ScrollView 
            className=" w-[100%] max-h-[85%] ">
                <View 
                className=" w-[100%] min-h-[100%] flex-row flex-wrap py-2 gap-1  rounded-2xl justify-center  items-center bg-[#1d2025] ">
                    {userFriendData && displayList.map((item ,index)=> {
                        return(   
                            <Friend key={index} friend={item} w={width} h={height} />
                        )
                    })}
                    
                </View>
            </ScrollView>
        
    </View>
    
          
    </View>
   
  )
}