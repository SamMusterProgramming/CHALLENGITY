import { View, Text, useWindowDimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { countries } from '../../../utilities/TypeData';
import { Stats } from '../custom/stats';
import FriendButton from '../../custom/FriendButton';
import { router } from 'expo-router';

export default function Header({user , onPress, statData ,setModalVisible , logout , pickImage , setCoverImg , setProfileImg}) {
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
          className = "justify-center it ems-center  rounde d-t-3xl" >
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
                      // position: "relative",
                      width: width / 4.8,
                      height: width / 4.8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className = "ml-8 mt-[-10]" >
                      <Image
                      source={{ uri: user.profileImage?.publicUrl }}
                      style={{
                          width: width / 4.8,
                          height: width / 4.8,
                          borderRadius:999,
                          borderWidth: 4,
                          borderColor: "#000",
                          marginBottom: 14,
                          // marginLeft:12
                      }}
                      />
                      {/* Verification Badge */}
                      <View
                      style={{
                          position: "absolute",
                          bottom:14,
                          right: -0,
                          }} className = " bg-black rounded-full"  >
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
                              fontSize: width / 22,
                              fontWeight: "700",
                            }}
                          >
                            {user.name.slice(0,20)}
                          </Text>
                          <Text
                            style={{
                              color: "#E2E2E2",
                              marginTop: 5,
                              fontSize: width / 34,
                            }}
                          >
                            {user.city}, {user.state} , {countries.find ( c => c.code === user.country).name}  
                          {'  '} {countries.find ( c => c.code === user.country).flag}
                          </Text>
                         
                  </View>
            </View>

            <Text
                style={{
                  marginTop: 8,
                  color: "#eab308",
                  fontWeight: "800",
                  fontSize: width / 30,
                  }}
                  className = "ml-8"
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
            className = "w-full flex-row px-6">
           
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


          {/* absolute edit share setting */}

          <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                right:10,
                top:10,
                gap: 28,
                zIndex : 999,
                position :"absolute"
            }}
            >
            {/* Edit */}
            {/* <TouchableOpacity
            onPress={() => setModalVisible(true)}
                activeOpacity={0.85}
                style={{
                justifyContent: "center",
                alignItems: "center",
                }} 
                 >
                <View
                 style={{
                    borderWidth: 1,
                    borderColor: "rgba(234,179,8,.58)",
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                    className = "p-2 rounded-full bg-black"
                >
                    <MaterialCommunityIcons
                    name="account-edit"
                    size={20}
                    color="#eab308"
                    />
                </View>
              
            </TouchableOpacity> */}

            {/* upload */}
            {/* <TouchableOpacity
                activeOpacity={0.85}
                style={{
                justifyContent: "center",
                alignItems: "center",
                }}
                onPress={ () => {
                    setUploadMenu(!uploadMenu)
                    setHamburgerMenu(false)
                }}
              >
                <View
                 style={{
                    borderWidth: 1,
                    borderColor: "rgba(234,179,8,.58)",
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                    className = "p-2 rounded-full bg-black"
                >
                    <MaterialCommunityIcons
                    name="tray-arrow-up"
                    size={20}
                    color="#eab308"
                    />
                </View>
                
            </TouchableOpacity> */}

            {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={ () => {
                setHamburgerMenu(!hamburgerMenu)
                setUploadMenu(false)
            }
            }
            style={{
                // width: width/12,
                // height: width/12,
                borderRadius: 26,
                backgroundColor: "rgba(0,0,0,.55)",
                borderWidth: 1,
                borderColor: "rgba(234,179,8,.58)",
                justifyContent: "center",
                alignItems: "center",
            
            }}
            className = "p-2 rounded-full bg-black"
            >
                <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={25}
                    color="#f4d44d"
                />
            </TouchableOpacity> */}

            

           {hamburgerMenu && (
            <View
                style={{
                    position: "absolute",
                    top: 45,
                    right: 10,
                    width: 215,
                    backgroundColor: "rgba(17,18,20,.98)",
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: "rgba(234,179,8,.18)",
                    paddingVertical: 8,
                    zIndex : 999
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        setHamburgerMenu(false);
                        logout()
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="image-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Log Out
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        height: 1,
                        backgroundColor: "rgba(255,255,255,.06)",
                        marginHorizontal: 16,
                    }}
                />

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        setUploadMenu(false);
                        setModalVisible(true)
                      }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",

                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Edit Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        setUploadMenu(false);
                        pickImage(setCoverImg)
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="image-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Update Cover
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        setUploadMenu(false);
                        pickImage(setProfileImg)
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",

                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Update Profile
                    </Text>
                </TouchableOpacity>
            </View>
            )}

            {uploadMenu && (
            <View
                style={{
                    position: "absolute",
                    top: 45,
                    right: 60,
                    width: 215,
                    backgroundColor: "rgba(17,18,20,.98)",
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: "rgba(234,179,8,.18)",
                    paddingVertical: 8,
                    shadowColor: "#000",
                    shadowOpacity: .35,
                    shadowRadius: 18,
                    elevation: 12,
                    zIndex : 999
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        setUploadMenu(false);
                        pickImage(setCoverImg)
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="image-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Update Cover
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        height: 1,
                        backgroundColor: "rgba(255,255,255,.06)",
                        marginHorizontal: 16,
                    }}
                />

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                        setUploadMenu(false);
                        pickImage(setProfileImg)
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",

                        paddingHorizontal: 18,
                        paddingVertical: 14,
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={width/25}
                        color="#eab308"
                    />

                    <Text
                        style={{
                            marginLeft: 14,
                            color: "#FFF",
                            fontSize: width/36,
                            fontWeight: "600",
                        }}
                    >
                        Update Profile
                    </Text>
                </TouchableOpacity>
            </View>
        )}
        </View>
         
        </View>
      );
}

