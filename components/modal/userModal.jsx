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
import { router } from "expo-router";

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
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
      >
        <View
          style={{
            width: width * 0.88,
            backgroundColor: "#0B0B0C",
            borderRadius: 9,
            overflow: "hidden",
            // borderWidth: 1,
            // borderColor: "rgba(234,179,8,0.18)",
            // padding:10
          }}
          className = "bg-[#010101]"
        >
          {/* COVER */}
  
          <View
            style={{
              width: "100%",
              height: height * 0.20,
            }}
          >
            <Image
              source={{
                uri:
                  userProfile?.coverImage?.publicUrl,
              }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
  
            <LinearGradient
              colors={[
                "transparent",
                "rgba(11,11,12,0.95)",
              ]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
              }}
            />
          </View>
  
          {/* CLOSE */}
  
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor:
                "rgba(0,0,0,0.65)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor:
                "rgba(234,179,8,0.15)",
              zIndex: 100,
            }}
          >
            <Ionicons
              name="close"
              size={18}
              color="#eab308"
            />
          </TouchableOpacity>
  
          {/* PROFILE */}
  
          <View
            style={{
              alignItems: "center",
              marginTop: -50,
              paddingHorizontal: 20,
              paddingBottom: 22,
            }}
          >
            <Image
              source={{
                uri:
                  userProfile?.profileImage
                    ?.publicUrl,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius:50,
                borderWidth: 3,
                borderColor: "#eab308",
                backgroundColor: "#111",
              }}
            />
  
            <Text
              style={{
                color: "#fff",
                fontSize: width / 25,
                fontWeight: "700",
                marginTop: 36,
              }} >
              {userProfile?.name}
            </Text>
  
            {/* LOCATION */}
  
            <View
              style={{
                flexDirection: "col",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.85)",
                  fontSize: width / 38,
                  fontWeight : "700"
                }} >
              
                {userProfile?.city},{" "}
                {userProfile?.state} {'  '}
                {/* <MaterialCommunityIcons
                name="map-marker"
                size={14}
                color="#eab308"
                /> {' '} */}
              </Text>
  
              {/* <Text
                style={{
                  color:
                    "rgba(255,255,255,0.65)",
                  fontSize: width / 36,
                  marginHorizontal: 5,
                }}
              >
                •
              </Text> */}
  
             
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.85)",
                  marginTop : 8 ,
                  fontSize: width / 38,
                  // marginLeft: 4,
                  fontWeight : "700"
                }}
              >
                {countries.find(
                  c =>
                    c.code ===
                    userProfile?.country
                )?.name || "United States"} {'  '}
                <CountryFlag
                isoCode={userProfile.country}
                size={10}
                />
              </Text>
            </View>
  
            {/* BIO */}
  
            {!!userProfile?.biography && (
              <Text
                numberOfLines={3}
                style={{
                  color:
                    "rgba(255,255,255,0.72)",
                  textAlign: "center",
                  marginTop: 14,
                  lineHeight: 20,
                  fontSize: width / 34,
                }}
              >
                {userProfile.biography}
              </Text>
            )}
  
              {/* VIEW PROFILE */}
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/ViewProfile",
                  params: {
                    userProfile: JSON.stringify(
                      userProfile
                    ),
                  },
                });

                setTimeout(() => {
                  onClose();
                }, 100);
              }}
              activeOpacity={0.85}
              style={{
                width: width * 2/3,
                // height: 46,
                marginTop: 36,
                borderRadius: 12,
                backgroundColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                borderColor: "rgba(234,179,8,0.18)",
                justifyContent: "center",
                alignItems: "center",
              }}
              className ="py-4"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={20}
                  color="#eab308"
                />

                <Text
                  style={{
                    marginLeft: 7,
                    color: "#eab308",
                    fontWeight: "700",
                    fontSize: width / 30,
                    letterSpacing: 0.3,
                  }}
                >
                  View Profile
                </Text>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={16}
                  color="#eab308"
                  style={{
                    marginLeft: 4,
                  }}
                />
              </View>
            </TouchableOpacity>
  
            {/* FOLLOW + FRIEND */}
  
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 36,
                marginBottom : 10,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  // flex: 1,
                  // marginRight: 6,
                  width:width/3,
                  alignItems: "center",
                }}
              >
                <FollowButton
                  userProfile={userProfile}
                />
              </View>
  
              <View
                style={{
                  width:width/3,
                  alignItems: "center",
                }}
              >
                <FriendButton
                  userProfile={userProfile}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
