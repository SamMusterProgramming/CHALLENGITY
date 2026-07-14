

import { View, Text, useWindowDimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { countries } from '../../../utilities/TypeData';
import FriendButton from '../../custom/FriendButton';
import FollowButton from '../../custom/FollowButton';

import { Stats } from '../../profile/custom/stats';

export default function ProfileHeader({user , statData}) {
    const {width , height} = useWindowDimensions()
    const [uploadMenu , setUploadMenu] = useState(false)
    const [hamburgerMenu , setHamburgerMenu] = useState(false)
    
    useEffect(() => {
        if (!hamburgerMenu) return;
        const timer = setTimeout(() => {
            setHamburgerMenu(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [hamburgerMenu]);
    useEffect(() => {
        if (!uploadMenu) return;
        const timer = setTimeout(() => {
            setUploadMenu(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [uploadMenu]);

    return (
        <View
          style={{
            width,
            // height: height / 3.5,
            // backgroundColor: "#111214",
            // borderTopLeftRadius: 28,
            // borderTopRightRadius: 28,
            overflow: "hidden",
          }}
          className = "justify-center it ems-center  rounded-t-3xl"
        >
          {/* Cover */}
          <Image
            source={{ uri: user.coverImage?.publicUrl }}
            resizeMode="cover"
            style={{
              position: "absolute",
              width: "100%",
              height:  height / 2.5,
            }}
            className = "rounded-t-3xl"
          />

       
      
        {/* Top fade (very light) */}
        <LinearGradient
            colors={[
              "rgba(17,18,20,0)",
              "rgba(17,18,20,0)",
              "rgba(17,18,20,.03)",
              "rgba(17,18,20,.08)",
            ]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: height / 7,

            }}
           
          />
      
          {/* Bottom fade */}
          <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,.05)",
              "rgba(0,0,0,.65)",
              "rgba(0,0,0,1)",
              "#000",
            ]}
            style={{
              position: "absolute",
              left: 0,
              right:width/2,
              bottom: 0,
              height: height / 4.5,
            }}
           
          />
           <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,.05)",
              "rgba(0,0,0,.65)",
              "rgba(0,0,0,1)",
              "#000",
            ]}
            style={{
              position: "absolute",
              left: 0,
              right:0,
              bottom: 0,
              height: height /3.2,
            }}
          />
      
        
      
          {/* Content */}
          <View
            style={{
            //   flex: 1,
              width : width /1 ,
              justifyContent: "center",
              alignItems: "start",
              marginLeft: 18,
              marginBottom :24,
              paddingTop:30,
            //   marginTop :50
            }}
            className = "mt-auto"
          >
            <View
            style={{
                position: "relative",
                width: width / 4.8,
                height: width / 4.8,
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                <Image
                source={{ uri: user.profileImage?.publicUrl }}
                style={{
                    width: width / 4.8,
                    height: width / 4.8,
                    borderRadius:999,
                    borderWidth: 1.5,
                    borderColor: "#eab308",
                    marginBottom: 14,
                    marginLeft:12
                }}
                />
                {/* Verification Badge */}
                <View
                style={{
                    position: "absolute",
                    bottom:2,
                    right: -0,
                }}
                >
                    <MaterialCommunityIcons
                        name="check-decagram"
                        size={25}
                        color="#eab308"
                    />
                    </View>
            </View>
            <Text
              style={{
                color: "#FFF",
                fontSize: width / 20,
                fontWeight: "700",
              }}
            >
              {user.name.slice(0,16)}
            </Text>
      
            {/* <Text
              style={{
                color: "#C8C8C8",
                fontSize: width / 42,
                marginLeft: 12,
              }}
            >
              @{user.username}
            </Text> */}
      
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              {/* <MaterialCommunityIcons
                name="map-marker-outline"
                size={15}
                color="#eab308"
              /> */}
      
              <Text
                style={{
                  color: "#E2E2E2",
                //   marginLeft: 5,
                  fontSize: width / 32,
                }}
              >
                {user.city}, {user.state} , {countries.find ( c => c.code === user.country)?.name}  
               {'  '} {countries.find ( c => c.code === user.country)?.flag}
              </Text>
            </View>
      
            <Text
              style={{
                marginTop: 8,
                color: "#eab308",
                fontWeight: "600",
                fontSize: width / 38,
              }}
            >
              Singer . professional Chabbi
            </Text>
      
            {!!user.tellus && (
              <Text
                numberOfLines={2}
                style={{
                  marginTop: 10,
                  color: "#D7D7D7",
                  textAlign: "center",
                  fontSize: width / 34,
                  lineHeight: 19,
                  paddingHorizontal: 24,
                }}
              >
                {user.tellus}
              </Text>
            )}


          {/* absolute edit share setting */}

          <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                right:30,
                top: 10,
                gap: 28,
                zIndex : 999,
                position :"absolute"
            }}
            className = "b g-black/50 gap-2 rounded-xl"
            >
            <FriendButton userProfile={user} />
            <FollowButton userProfile={user} />
         
        </View>

         {/* stats bar followers , friend */}
            
          </View>


          <View
            className = "w-full flex-row m t -auto ite ms-end">
                {/* <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            className="px-4 mr-4 py-1  border border-white/10 rounded-lg" >
                           <MaterialCommunityIcons
                                name="square-edit-outline"
                                size={25}
                                color="#fff"
                            />
                </TouchableOpacity> */}
                <View className="flex-row flex-1 px-2 justify-evenly border-t border-l border-r rounded-t-xl border-white/30 mt- 5 ">
                        {statData.map((item, index) => (
                        <React.Fragment key={item.label}>
                            <Stats
                                {...item}
                                width={width}
                            />
                            {index !== statData.length - 1 && (
                                <View
                                    className="h-8 w-px mt-4 bg-white/40"
                                />
                            )}
                        </React.Fragment>
                        ))}
                </View>
               
            </View>   
         
        </View>
      );
}
