import { View, Text, useWindowDimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { countries } from '../../../utilities/TypeData';
import { Stats } from '../custom/stats';
import FriendButton from '../../custom/FriendButton';

export default function Header({user , statData ,setModalVisible , logout , pickImage , setCoverImg , setProfileImg}) {
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
{/*       
            <Text
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
                {user.city}, {user.state} , {countries.find ( c => c.code === user.country).name}  
               {'  '} {countries.find ( c => c.code === user.country).flag}
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
            >
            {/* Edit */}
            <TouchableOpacity
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
                    name="account-edit-outline"
                    size={20}
                    color="#eab308"
                    />
                </View>
              
            </TouchableOpacity>

            {/* upload */}
            <TouchableOpacity
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
                
            </TouchableOpacity>

            <TouchableOpacity
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
                    size={20}
                    color="#f4d44d"
                />
            </TouchableOpacity>

            

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

