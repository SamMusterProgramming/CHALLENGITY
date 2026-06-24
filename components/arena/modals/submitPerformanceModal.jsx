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

  export default function SubmitPerformanceModal({
    visible,
    setVisible,
    arena,
    videoUrl,
    onSubmit,
    description,
    setDescription,
    spotlight ,
    setSpotLight
  }) {
    const { width ,height } = useWindowDimensions();
    const insets =useSafeAreaInsets();
  
    // const [description,setDescription] =useState("");
  
    const player =
      useVideoPlayer(
        videoUrl || "",
        player => {
          player.loop = true;
        }
      );
  
    const handleSubmit =
      () => {
  
        onSubmit?.({
          arena_id:
            arena._id,
  
          description,
  
          spotlight,
  
          videoUrl,
        });
  
        setVisible(false);
      };
  
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

            {/* HEADER */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems:"center",
                paddingHorizontal:10,
              }}  >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "900",
                  fontSize: width / 18,
                }} >
                Submit Performance
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setVisible(
                    false
                  )
                }
              >
                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
  
            </View> */}
            
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
                  color: "#fff",
                  fontWeight:  "800",
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
                  borderRadius:20,
                  borderWidth: 1,
                  borderColor:"rgba(234,179,8,0.08)",
                }}  />
  
            </View>
  
            {/* ARENA */}
  
          
        <View
            style={{
                marginHorizontal: 10,
                marginTop: 20,
                backgroundColor: "#111214",
                borderRadius: 22,
                padding: 18,
                borderWidth: 1,
                borderColor: "rgba(234,179,8,0.08)",
                }} >
                {/* ARENA */}

                {/* SPOTLIGHT */}

                <Text
                    style={{
                    color: "#eab308",
                    fontWeight: "800",
                    letterSpacing: 0.5,
                    }}
                >
                    Spotlight Selection
                </Text>

                <Text
                    style={{
                    color: "#9CA3AF",
                    marginTop: 8,
                    lineHeight: 20,
                    fontSize: width / 30,
                    }}
                >
                    Exceptional performances may be featured in Spotlight and
                    discovered across the Itri community.
                </Text>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                     setSpotLight(!spotlight)
                    }
                    style={{
                    marginTop: 18,
                    borderRadius: 18,
                    padding: 16,
                    borderWidth: 1.5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",

                    backgroundColor: spotlight
                        ? "rgba(234,179,8,0.12)"
                        : "#0D0D0F",

                    borderColor: spotlight
                        ? "#eab308"
                        : "rgba(255,255,255,0.08)",
                    }}
                >
                    <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                    }}
                    >
                    <MaterialCommunityIcons
                        name={
                        spotlight
                            ? "star"
                            : "star-outline"
                        }
                        size={28}
                        color={
                        spotlight
                            ? "#eab308"
                            : "#6B7280"
                        }
                    />

                    <View
                        style={{
                        marginLeft: 12,
                        flex: 1,
                        }}
                    >
                        <Text
                        style={{
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: width / 28,
                        }}
                        >
                        Submit to Spotlight
                        </Text>

                        <Text
                        style={{
                            color: "#9CA3AF",
                            marginTop: 3,
                            fontSize: width / 34,
                        }}
                        >
                        Increase visibility and reach
                        more viewers.
                        </Text>
                    </View>
                    </View>

                    <View
                    style={{
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        justifyContent: "center",
                        alignItems: "center",

                        backgroundColor: spotlight
                        ? "#eab308"
                        : "transparent",

                        borderWidth: 1.5,
                        borderColor: spotlight
                        ? "#eab308"
                        : "#4B5563",
                    }}
                    >
                    {spotlight && (
                        <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color="#000"
                        />
                    )}
                    </View>
                </TouchableOpacity>
            </View>
          
  
            {/* SPOTLIGHT */}
  
            {/* <TouchableOpacity
              activeOpacity={ 0.9 }
              onPress={() =>
                setSpotlight(
                  !spotlight
                )
              }
              style={{
                marginHorizontal:10,
                marginTop: "auto",
                backgroundColor: "#111214",
                borderRadius: 20,
                padding: 18,
                flexDirection: "row",
                alignItems:"center",
                justifyContent: "space-between",
              }} >
              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  Submit to Spotlight
                </Text>
                <Text
                  style={{
                    color:"#9CA3AF",
                    marginTop: 4,
                  }}  >
                  Reach more viewers across Itri.
                </Text>
              </View>
              <MaterialCommunityIcons
                name={
                  spotlight
                    ? "star"
                    : "star-outline"
                }
                size={28}
                color="#eab308"
              />
            </TouchableOpacity> */}

          </View>
  
          {/* SUBMIT */}
  
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0, // Platform.OS == "ios" ? insets.bottom : 30,
              paddingHorizontal:10,
            //   paddingTop: 15,
              paddingVertical:20,
              backgroundColor: "#050505",
              borderTopWidth:1,
              borderTopColor: "rgba(234,179,8,0.08)",
            }} >
            <TouchableOpacity
              activeOpacity={0.9}
              disabled = {description.length <= 5 ? true : false}
              onPress={
                handleSubmit
              }
              style={{
                height: height/16,
                borderRadius:18,
                backgroundColor: description.length > 5 ?  "#eab308" : "rgba(224, 179, 16 , 0.4)",
                justifyContent:"center",
                alignItems:"center",
              }} >
              <Text
                style={{
                  color: description.length > 5 ?"#000" :"#232324",
                  fontWeight:"900",
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