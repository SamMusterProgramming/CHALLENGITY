import React, { useEffect, useRef, useState } from "react";
import {
View,
Text,
TouchableOpacity,
FlatList,
useWindowDimensions,
Image
} from "react-native";

import Animated, {
useSharedValue,
useAnimatedStyle,
withSpring,
withTiming,
runOnJS
} from "react-native-reanimated";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";
import DisplayTalentNotification from "../notification/DisplayTalentNotifications";
import CountryFlag from "react-native-country-flag";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { countryCodes } from "../../helper";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { getUploadImageUrl, saveCoverImageToDataBase,  saveProfileImageToDataBase,  uploadImageToBlackBlaze } from "../../uploadFileToBlackBlaze";
import EditProfileModal from "./editProfileModal";
import { updateUserInfo } from "../../apiCalls";


export default function ProfileDrawer({ visible, onClose }) {

const { width , height } = useWindowDimensions();
const insets = useSafeAreaInsets();
const drawerWidth = width * 0.95;
const translateX = useSharedValue(drawerWidth);
const flatListRef = useRef(null);
const { user , setUser } = useGlobalContext();
const nativeGesture = Gesture.Native();
const [scrollEnabled, setScrollEnabled] = useState(true);
const [coverImg , setCoverImg] = useState(null)
const [profileImg , setProfileImg] = useState(null)
const [modalVisible, setModalVisible] = useState(false);
const [userInfo , setUserInfo] = useState({
    name: user?.name ,
    city: user?.city ,
    state : user?.state ,
    country : user?.country
})



  
useEffect(() => {
    if (visible) {
        translateX.value = withSpring(0, {
        damping: 18,
        stiffness: 160,
        overshootClamping: true
             });
    } else {
    translateX.value = withTiming(drawerWidth);
    }
}, [visible]);

const panGesture = Gesture.Pan()
.activeOffsetX([-10, 10])   // only triggers for horizontal swipe
.failOffsetY([-10, 10])     // vertical motion fails the gesture
.onUpdate((event) => {
  translateX.value = Math.max(0, event.translationX); 
})
.onEnd(() => {
  if (translateX.value > 120) {
      translateX.value = withTiming(width);
      runOnJS(onClose)();
  } else {
      translateX.value = withSpring(0);
  }
});

const animatedStyle = useAnimatedStyle(() => ({
transform: [{ translateX: translateX.value }]
}));



//************************* media picker */

const pickImage = async (setProfile_img) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setProfile_img(result.assets[0].uri);
    }
};


useEffect(() => {
const uplaodImage = async()=>{
    if(coverImg){    
         // get uploadUrl from backend
        const data  = await getUploadImageUrl(user._id ,user.name , "profile")
        // upload file to blackBlaze
        const uploadResult = await uploadImageToBlackBlaze(data,coverImg)
        console.log(uploadResult.fileName)
        const res = await saveCoverImageToDataBase(
                                           {  
                                            userId: user._id,
                                            fileId:uploadResult.fileId , 
                                            fileName: uploadResult.fileName ,
                                            deleteFileId: user.coverImage?.fileId,
                                            deleteFileName : user.coverImage?.fileName
                                           }
                                          )
        setUser(res.data)
        setCoverImg(null)
       }
      

}
uplaodImage()
}, [coverImg])



useEffect(() => {
    const uplaodProfileImage = async()=>{
        if(profileImg){    
             // get uploadUrl from backend
            const data  = await getUploadImageUrl(user._id ,user.name , "profile")
            // upload file to blackBlaze
            const uploadResult = await uploadImageToBlackBlaze(data,profileImg)
            console.log(uploadResult.fileName)
            const res = await saveProfileImageToDataBase(
                                               {  
                                                userId: user._id,
                                                fileId:uploadResult.fileId , 
                                                fileName: uploadResult.fileName ,
                                                deleteFileId: user.profileImage?.fileId,
                                                deleteFileName : user.profileImage?.fileName
                                               }
                                              )
            setUser(res.data)
            setProfileImg(null)  
           }
    }
    uplaodProfileImage()
    }, [profileImg])


    const handleSave = () => {
        console.log("Updated:", userInfo);
        updateUserInfo(user._id, userInfo, setUser)
      };


if (!visible) return null;

return (

<View className="absolute inset-0 z-50">

{/* BACKDROP */}
        <TouchableOpacity
        className="absolute inset-0 bg-black/60"
        onPress={onClose}
        />

{/* DRAWER */}
        <GestureDetector gesture={panGesture}>

            <Animated.View
                style={[
                animatedStyle,
                {
                width: drawerWidth,
                top: insets.top,
                bottom: 0
                }
                ]}
                className="absolute right-0 bg-[black]"
                >

                <View className="flex-1">

                    <View className="flex-row justify-between items-center px-5 py-2 bo rder-b bo rder-zinc-800">
                        <Text 
                        style ={{fontSize:width/35}}
                        className="text-white  font-bold">
                            Profile
                        </Text>
                        <TouchableOpacity
                         onPress={onClose}>
                        <Text
                         style ={{fontSize:width/20}}
                         className="text-gray-300 ">X</Text>
                        </TouchableOpacity>
                    </View>

                    <GestureDetector gesture={nativeGesture}>
                        <View
                            className="w-[100%] flex-1  justify-start items-center" >
                                
                                <View className="w-[100%]  justify-center  items-center ">
                                        <View
                                         className = "w-[100%]"
                                           >
                                            <Image 
                                            style={{height:height/5}}
                                            resizeMode='stretch'
                                            className="w-[100%] h-[200px] roun ded-xl"
                                            source={{uri: user.coverImage?.publicUrl}} 
                                            />
                                            <TouchableOpacity 
                                            onPress={()=>pickImage(setCoverImg)}
                                            className="absolute bottom-0 ">
                                                <MaterialIcons name="edit" size={20} color="lightblue" />
                                            </TouchableOpacity>
                                        </View>
                                        <View 
                                            className="bg-  absolute z-10 bottom-[-40] bg-black flex-col rounded-full justify-center items-center ">
                                            <Image 
                                            className="w-[80px] h-[80px] rounded-full"
                                            resizeMode='cover'
                                            source={{uri: user.profileImage?.publicUrl
                                                // userProfileImg 

                                            }} 
                                            />
                                             <TouchableOpacity 
                                            onPress={()=>pickImage(setProfileImg)}
                                            className="absolute bottom-0 ">
                                                <MaterialIcons name="edit" size={20} color="lightblue" />
                                            </TouchableOpacity>
                                        </View>
                                       
                                </View> 
                                <View 
                                style={{height:height/20}}
                                className=" w-[100%] gap-2  flex-row justify-start px-2  items-end h-[40]">
                                         <Text   
                                            style ={{fontSize:width/40}}
                                            className="font-black text-white ml-8 ">
                                                   {user.name}
                                         </Text>
                                         <TouchableOpacity 
                                            onPress={() => setModalVisible(true)}        
                                            className=" absolute bottom-0 right-0 gap-2 px-2 b g-[#d5d6d7] rounded-md flex-row  justify-center items-end ">
                                                <MaterialIcons name="edit" size={width/20} color="blue" />             
                                         </TouchableOpacity>  
                                         {/* <TouchableOpacity 
                                            onPress={()=>pickImage(setProfileImg)}
                                            className="">
                                                <MaterialIcons name="edit" size={15} color="lightblue" />
                                         </TouchableOpacity> */}
                                </View>

                                <View 
                                 style={{height:height/20}}
                                className=" w-[100%] b g-[#082949] pb- 2  flex-row justify-start  pt- 6 items-center py-2 ">
                                                <View
                                                className="h-[100%] w-[100%]  flex-row justify-end gap-2 items-end  ">

                                                            {/* <Text 
                                                                    style={{fontSize:width/35}}
                                                                    className="text-gray-100 mb-4 ml- font-bold ">
                                                                        Details 
                                                            </Text> */}
                                                            <View
                                                            className=" flex-row gap-1 justify-start items-end "
                                                            >
                                                                    <MaterialCommunityIcons name="map-marker" size={22} color="blue" />
                                                                
                                                                    <Text
                                                                        className="font-semibold"
                                                                        style={{
                                                                        fontSize:width/40,
                                                                        color: "white"
                                                                        }}
                                                                    >
                                                                        {' '}{user && user.city}
                                                                    </Text>
                                                                    <Text
                                                                            className="font-bold"
                                                                            style={{
                                                                            fontSize:width/38,
                                                                            color: "white",
                                                                            }}
                                                                        >
                                                                            {', '}{ user && user.state}
                                                                        </Text>

                                                            </View>
                                                        
                                                            <View
                                                            className="w- [40%] h- [100%] flex-1 flex-row gap-4 justify-end items-end">
                                                                    < CountryFlag
                                                                        isoCode={user && user.country}
                                                                        size={width/30}
                                                                    />
                                                                    <Text style={ {
                                                                                fontWeight:"800",
                                                                                color: "white",
                                                                                fontSize: width/40,
                                                                            }}> {countryCodes[ user?.country] || "US"}
                                                                    </Text>
                                                            </View>
                                                </View>

                                               

                                               
                                                        
                                        
                                            
                                </View>
                        </View>
                    </GestureDetector>

                </View>
                <EditProfileModal
                    userInfo={userInfo}
                    setUserInfo ={setUserInfo}
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    handleSave = {handleSave}
                    user={user}
                />

            </Animated.View>
            

        </GestureDetector>

      
</View>

);

}