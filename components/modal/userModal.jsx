import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
  useWindowDimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { countries } from "../../utilities/TypeData";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { getUserById } from "../../apiCalls";
import CountryFlag from "react-native-country-flag";
import { countryCodes } from "../../helper";
import FollowButton from "../custom/FollowButton";
import FriendButton from "../custom/FriendButton";

export default function UserModal({ user_id,
                                    visible = false,
                                    onClose,
                                    }) {

  const [userProfile,setUserProfile] = useState(null)     
  const { width, height } = useWindowDimensions();

  useEffect ( () => {     
    getUserById(user_id, setUserProfile)
    // getFollowData(user._id,setFollow)
    // getUserFriendsData(user._id,setUserFriendData)
    // getUserActivities(user_id , setData)
    } , [])  
   

  
  if(!userProfile) return null ; 
  
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      {/* 🎬 Cinematic Background */}
      <Pressable
        // onPress={onClose}
        className="flex-1 w-full bg-black/80 justify-center items-center"
      >
        {/* ✨ Modal Container */}


                <View
                className="w-[85%] max-h-[65%] p-4 items-center  rounded-2xl  border border-yellow-500/20">
                    
                        <Image
                        source={{ uri: userProfile?.coverImage?.publicUrl }}
                        resizeMode="cover"
                        style={{ height: height /5 ,width:"100%" }}
                        className="w-full rounded-lg"
                        />
                 
                        <View
                         className="w-[100%] h- [100%] flex-row gap-2 justify-center items-end ">
                           
                            <View className="items-center -mt-12">
                                <View className="">
                                    <Image
                                        source={{ uri: userProfile.profileImage?.publicUrl }}
                                        className="w-[75px] h-[75px] rounded-full border-2 border-[#0A0B0D]"
                                    />
                                </View>
                                <Text
                                    style={{ fontSize: width / 39 }}
                                    className="text-white mt-3   font-semibold tracking-wide"
                                    >
                                    {userProfile.name}
                                </Text>
                    
                                <View className="flex-row items-center mt-2 opacity-80">
                                    <MaterialCommunityIcons name="map-marker" size={16} color="#E6C068" />
                                    <Text
                                        style={{ fontSize: width / 40 }}
                                        className="text-gray-300 font-bebas tracking-wider ml- 1"
                                    >
                                        {userProfile.city}, {userProfile.state}
                                    </Text>
                                    <View className="flex-row items-center ml-2">
                                        <Text
                                        style={{ fontSize: width / 38 }}
                                        className="text-white font-bebas tracking-wider"
                                        >
                                          {countries.find(c => c.code == userProfile?.country)?.name || "US"} {'  '}
                                        </Text>
                                        <CountryFlag isoCode={userProfile.country} size={width/40} />
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View
                            className="w-[100%] flex-row mt-6 justify-center gap-2 items-center">
                            {/* <FollowButton userProfile = {userProfile} /> */}
                            <View
                            className = "w-[40%] justify-center items-center" >
                                   <FollowButton userProfile={userProfile} />
                            </View>
                            <View
                            className = "w-[40%] justify-center items-center" >
                                   <FriendButton userProfile={userProfile} />
                            </View>
                         </View>  
                </View>
               


        <TouchableOpacity
                onPress={() => onClose()}
                className="absolute bg-slate-100 rounded-full  bottom-[30] p-1">
                    <Ionicons name="close"  size={30}  color={"while"} />
        </TouchableOpacity>   
      </Pressable>
    
    </Modal>
  );
}
