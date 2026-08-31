

import { View, Text, useWindowDimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { countries } from '../../../utilities/TypeData';
import FriendButton from '../../custom/FriendButton';
import FollowButton from '../../custom/FollowButton';

import { Stats } from '../../profile/custom/stats';
import { router } from 'expo-router';

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
            overflow: "hidden",
          }}
          className = "justify-center it ems-center  roun ded-t-3xl"
        >
          {/* Cover */}
          <View
          className = "">
              <Image
                source={{ uri: user.coverImage?.publicUrl }}
                resizeMode="cover"
                style={{
                  // position: "absolute",
                  width: "100%",
                  height:  height / 5,
                }}
                className = "roun ded-t-3xl "
              />
              <View
                  style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    
                  }}
                  className = "absolute bottom-10 right-2 left-[25%] gap-2 px- pt-6 fle x-1 justify-center items-center rounded-xl"
                  >   
                  <FriendButton userProfile={user} />
                  <FollowButton userProfile={user} />
              
              </View>

             
         </View>
      
          {/* Content */}
          <View
            style={{
            //   flex: 1,
              width : width /1 ,
              justifyContent: "center",
              alignItems: "start",
              // marginLeft: 18,
              marginBottom :24,
              
            }}
            className = " rounded-t-full w-full mt -[-7] "
          >
              <View
              className = "flex-row w-full items-center  bg-black justify-end mt-[-27] rounded-t-[30]">
                    <View
                    style={{
                        position: "relative",
                        width: width / 4.8,
                        height: width / 4.8,
                        justifyContent: "center",
                        alignItems: "center",
                        }}
                        className = "ml-8 mt-[-10]"
                         >
                        <Image
                        source={{ uri: user.profileImage?.publicUrl }}
                        style={{
                            width: width / 4.8,
                            height: width / 4.8,
                            borderRadius:999,
                            borderWidth: 6,
                            borderColor: "#000",
                            marginBottom: 14,
                            // marginLeft:12
                        }}
                        />
                        {/* Verification Badge */}
                        <View
                          style={{
                              position: "absolute",
                              bottom:16,
                              right: -0,
                            }}
                          className = "bg-black rounded-full"  >
                            <MaterialCommunityIcons
                                name="check-decagram"
                                size={25}
                                color="#eab308"
                            />
                        </View>
                    </View>
                    <View
                    className = " flex-1 ml-4 justify-end  ">
                              <Text
                                style={{
                                  color: "#FFF",
                                  fontSize: width / 24,
                                  fontWeight: "700",
                                }}   >
                                {user.name.slice(0,16)}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginTop: 8,
                                }}  >
                          
                                <Text
                                  style={{
                                    color: "#E2E2E2",
                                  //   marginLeft: 5,
                                    fontSize: width / 32,
                                  }}
                                >
                                   {user.state} , {countries.find ( c => c.code === user.country)?.name}  
                                {'  '} {countries.find ( c => c.code === user.country)?.flag}
                                </Text>
                              </View>
                    </View>
              </View>
      
              <Text
                style={{
                  marginTop: 8,
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: width / 32,
                }}
                className="ml-4"
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

            
          </View>


          <View
            className = "w-full flex-row px-4 ite ms-end">
               
                <View className="flex-row flex-1 px-2 justify-evenly items-end border- border-l border-r rounde d-t-xl border-white/30 mt- 5 ">
                        {statData.map((item, index) => (
                        <React.Fragment key={item.label}>
                            <Stats
                                {...item}
                                width={width }
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
