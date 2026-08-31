import React, {
    useState,
  } from "react";
  import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    useWindowDimensions,
    Platform,
  } from "react-native";
  import {
    useSafeAreaInsets,
  } from "react-native-safe-area-context";
  import {
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  import {
    VideoView,
    useVideoPlayer,
  } from "expo-video";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { router } from "expo-router";

  export default function SubmitPerformanceModal({
    visible,
    setVisible,
    arena,
    videoUrl,
    onSubmit,
    description,
    setDescription,
    spotlight ,
    setSpotLight ,
    setOpenPerformanceAlertModal
  }) {
    const { width ,height } = useWindowDimensions();
    const insets =useSafeAreaInsets();
    const {setUploadPerformanceLoading , arenaActionModal , setArenaActionModal} = useGlobalContext()
    // const [description,setDescription] =useState("");
  
    const player =
      useVideoPlayer(
        videoUrl || "",
        player => {
          player.loop = true;
        }
      );
  
  
    return (
  
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
  
        <View
          style={{
            paddingTop:insets.top + 10,
            flex: 1,
            backgroundColor: "#050505",
            paddingBottom : Platform.OS == "ios" ? insets.bottom : 30
          }}  >
  
          <View
            style ={{
                flex:1,
                marginBottom : height/16 + 10 ,
            }} >
            
              <View
              style={{
                marginHorizontal: 10,
                // marginTop: 20,
                backgroundColor:  "#111214",
                borderRadius: 22,
                padding: 18,
                borderWidth: 1,
                borderColor:  "rgba(234,179,8,0.08)",
              }}
              className ="flex-row w-full justify-start items-center gap-2"
            >
  
              <Text
                style={{
                  color: "#eab308",
                  fontWeight: "800",
                  fontSize: width / 28,
                }}
              >
                Publishing To
              </Text>
  
              <Text
                style={{
                  color: "#fff",
                //   marginTop: 8,
                  fontSize: width / 28,
                  fontWeight: "800",
                }} >
                {arena.arenaName}
              </Text>
              <Text
                style={{
                  color: "#9CA3AF",
                  fontSize: width / 28,
                //   marginTop: 6,
                }}
              >
                {arena.talentType}
              </Text>

              <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setVisible(false)}
                  style={{
                  // width: 42,
                  // height: 42,
                  // borderRadius: 21,
                  backgroundColor: "#111214",
                  borderWidth: 1,
                  borderColor: "rgba(234,179,8,0.15)",
                  justifyContent: "center",
                  alignItems: "center",
                  }}
                  className = "absolute top -2 right-4 p-1 rounded-full" >
                  <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#eab308"
                  />
              </TouchableOpacity>
            </View>
        

            {/* VIDEO */}
  
            <View
              style={{
                marginTop: 20,
                marginHorizontal: 10,
                overflow: "hidden",
                borderRadius: 24,
                borderWidth: 1,
                flex:1,
                borderColor: "rgba(234,179,8,0.12)",
              }}  >
  
              <VideoView
                player={player}
                style={{
                  width:
                    "100%",
                 flex:1 ,
                }}
                contentFit="cover"
                allowsFullscreen
              />
  
            </View>
              {/* DESCRIPTION */}
  
              <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "#AAA",
                  fontWeight:  "700",
                  marginBottom:10,
                  fontSize: width / 26,
                }}
              >
                Performance Description
              </Text>
              <TextInput
                value={description}
                onChangeText={ setDescription}
                numberOfLines={3}
                multiline
                placeholder="Describe your performance..."
                placeholderTextColor="#666"
                style={{
                  height: height/12,
                  textAlignVertical:"top",
                  padding: 16,
                  color: "#fff",
                //   fontFamily : 800,
                //   fontSize: width / 29,
                  backgroundColor: "#111214",
                  borderRadius:5,
                  borderWidth: 1,
                  borderColor:"rgba(234,179,8,0.08)",
                }}  />
  
            </View>
  
            {/* ARENA */}
  
          
       
          
  
          </View>
  
          {/* SUBMIT */}
  
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 5, // Platform.OS == "ios" ? insets.bottom : 30,
              paddingHorizontal:10,
            //   paddingTop: 15,
              paddingVertical:20,
              backgroundColor: "#050505",
              borderTopWidth:1,
              borderTopColor: "rgba(234,179,8,0.08)",
            }} 
            className = "px-3"
            >
            <TouchableOpacity
              activeOpacity={0.9}
              disabled = {description.length <= 5 ? true : false}
              onPress={ () => {
                setVisible(false)
                setOpenPerformanceAlertModal(true)
                setArenaActionModal("submit_performance")
                 }
                // handleSubmit
              }
              style={{
                height: height/16,
                borderRadius:5,
                backgroundColor: description.length > 5 ?  "#eab308" : "rgba(224, 179, 16 , 0.4)",
                justifyContent:"center",
                alignItems:"center",
              }} >
              <Text
                style={{
                  color: description.length > 5 ?"#000" :"#232324",
                  fontWeight:"700",
                  fontSize: width / 24,
                }}
              >
                Submit Performance
              </Text>
            </TouchableOpacity>
  
          </View>
  
        </View>
  
      </Modal>
    );
  }