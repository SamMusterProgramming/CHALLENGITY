import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VideoView, useVideoPlayer } from "expo-video";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useEffect } from "react";
import CameraRecordingModal from "../components/arena/modals/cameraRecordingModal";
import { stageIcons } from "../utilities/TypeData";
import SubmitPerformanceModal from "../components/arena/modals/submitPerformanceModal";
import { addPerformanceToArena } from "../apiCalls";
import { generateThumbnail, validateVideo } from "../videoFiles";
import { compressImage, compressVideo } from "../utilities/fileCompressor";
import { useLoading } from "../context/loadingContext";
import { getUploadImageUrl, getUploadVideoUrl, uploadImageToBlackBlaze, uploadVideoToBackblaze } from "../uploadFileToBlackBlaze";
import ArenaAlertModal from "../components/arena/modals/AlertArenaModal";


export default function CreatePerformance() {
const {userArenas , user ,selectedArena , setSelectedArena , setUserArenas, uploadPerformanceLoading ,
   setUploadPerformanceLoading , arenaActionModal , setArenaActionModal} = useGlobalContext()
const { width , height} =  useWindowDimensions();
const { arena_id } = useLocalSearchParams();
const insets = useSafeAreaInsets();
const [videoUrl, setVideoUrl] = useState(null);
const [cameraPermission, setCameraPermission] = useState(false);
const [mediaPermission, setMediaPermission] = useState(false);
const arena = userArenas.find(a => a._id === arena_id);
const [showCamera, setShowCamera] = useState(false);
const [submitModal, setSubmitModal] = useState(false);
const [description,setDescription] =useState("");
const [spotlight, setSpotlight] =  useState(true);
const [thumbNailURL,setThumbNailURL] = useState(null)
const { showLoading, hideLoading } = useLoading();
const [duration , setDuration] = useState(0)
const [openPerformanceAlertModal ,setOpenPerformanceAlertModal] = useState(false)

const player =
  useVideoPlayer(
    videoUrl || "",
    player => {
      player.loop = true;
    }
  );

useEffect(() => {
    requestPermissions();
  }, []);

const requestPermissions = async () => {
try {
   
    const cameraStatus =await Camera.requestCameraPermissionsAsync();
    const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setCameraPermission(
    cameraStatus.status === "granted"
    );
    setMediaPermission(
    mediaStatus.status === "granted"
    );
} catch (error) {
    console.log(error);
}
};


//upload video
const uploadVideo = async () => {
    try {
      if (!mediaPermission) {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if ( permission.status == "granted") {
          return;
        }
      }
      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            ImagePicker.MediaTypeOptions.Videos,
          quality: 1,
        });
  
      if (!result.canceled) {
        const validate = await validateVideo(result.assets[0].uri)
        if(validate.tooLarge ) {
              setOpenPerformanceAlertModal(true)
               setArenaActionModal('uploadVideo_toolarge')
               return;
              }
   
        setVideoUrl(   
          result.assets[0].uri
        );
      }
    } catch (error) {
      console.log(error);
    }
};

//camera recoring
const openCamera = async () => {
    try {
      if (!cameraPermission) {
        const permission =
          await Camera.requestCameraPermissionsAsync();
  
        if (
          permission.status !== "granted"
        ) {
          return;
        }
      }
      setShowCamera(true);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
    const makeThumbNail = async () => {
     if(videoUrl)
       { 
        const imageUrl = await generateThumbnail(videoUrl)
        const compressed = await compressImage(imageUrl.uri)
        setThumbNailURL(compressed)
       }
    }
    makeThumbNail()
}, [videoUrl])

const submitPerformance = async () => {
    showLoading("uploading the video ...")
    Promise.all([
        getUploadVideoUrl(user._id , user.email , "talent" ),
        getUploadImageUrl(user._id , user.email , "thumbnail")
        ]).then(async([videoRes, thumbRes] ) =>
            {
            setTimeout(() => {
                hideLoading()
                router.back()
                setUploadPerformanceLoading(true)
            }, 2000);
            const compressedVideo = videoUrl ;// await compressVideo(videoUrl);
            await  Promise.all([
                uploadVideoToBackblaze(videoRes, compressedVideo  ),
                uploadImageToBlackBlaze(thumbRes, thumbNailURL),
            ]).then(async([videoUpload, thumbnailUpload]) => {    
                const data = {
                    owner_id:user._id,
                    description,
                    video:{
                        fileName : videoRes.fileName,
                        fileId : videoUpload.fileId,
                    },
                    thumbnail:{
                        fileName : thumbRes.fileName,
                        fileId : thumbnailUpload.fileId,
                    },
                }
                const response = await addPerformanceToArena(arena_id , data) 
                setUploadPerformanceLoading(false)
                setSelectedArena(response.data.selectedArena)
                setUserArenas(response.data.arenas)
                })
            })
}

// const submitPerformance = async () => {
//   showLoading("Preparing the video ...")
//   Promise.all([
//       getUploadVideoUrl(user._id , user.email , "talent" ),
//       getUploadImageUrl(user._id , user.email , "thumbnail")
//       ])
//         .then(async([videoRes, thumbRes] ) =>
//           {
//           setTimeout(() => {
//               hideLoading()
//               router.back()
//               setUploadPerformanceLoading(true)
//           }, 2000);
//           await compressVideo(videoUrl).then(async(compressVideoUrl) => {
//                   hideLoading()
//                   showLoading("uploading the video ...")
//                   setTimeout(() => {
//                     hideLoading()
//                   }, 5000);
//                   await  Promise.all([
//                     uploadVideoToBackblaze(videoRes, compressVideoUrl ),
//                     uploadImageToBlackBlaze(thumbRes, thumbNailURL),
//                   ]).
//                     then(async([videoUpload, thumbnailUpload]) => {    
//                         const data = {
//                             owner_id:user._id,
//                             description,
//                             video:{
//                                 fileName : videoRes.fileName,
//                                 fileId : videoUpload.fileId,
//                             },
//                             thumbnail:{
//                                 fileName : thumbRes.fileName,
//                                 fileId : thumbnailUpload.fileId,
//                             },
//                         }
//                         const response = await addPerformanceToArena(arena_id , data) 
//                         setUploadPerformanceLoading(false)
//                         setSelectedArena(response.data.selectedArena)
//                         setUserArenas(response.data.arenas)
//                   })
//           })
//         })
// }

const deleteVideo = () =>{
  setVideoUrl(null)
}
const confirmAction =  {
  uploadVideo_toolarge: () => deleteVideo,
  submit_performance: () =>  submitPerformance()
}

const alertContent =  {
   uploadVideo_toolarge: {
       title : "Upload Performance",
       text: "video file you are trying to upload is too large , max size is 150 MB "
      },
   submit_performance: {
       title : "Upload Performance",
       text: "are you sure you want to add this performance to your arena , you will be notified when it is published "
      },
   
}

const alertType =  {
  uploadVideo_toolarge : "infos" ,
  submit_performance : "confirm"
}

return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050505",
        paddingTop: insets.top,
        paddingBottom : Platform.OS == "ios" ? insets.bottom : 30

      }}  >
      <View
       
        style ={{
            marginBottom : height/16 + 13
        }}
        className = " flex-1 flex-col justify-start item s-center"
         >
        {/* HEADER */}

        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: width / 22,
              fontWeight: "900",
            }}
            className ="text-center"
          >
            Create Performance
          </Text>

          <Text
            style={{
            //   color: "#9CA3AF",
              marginTop: 8,
              fontSize: width / 30,
              fontFamily : "700"
            }}
            className ="text-center text-zinc-300"
          >
            Share your talent and build your Arena.
          </Text>
        </View>

        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
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
            className = "absolute mt-[8] left-2 p-1 rounded-full" >
            <MaterialCommunityIcons
            name="arrow-left"
            size={42}
            color="#eab308"
            />
        </TouchableOpacity>

        {/* ARENA CARD */}

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 18,
            backgroundColor:
              "#111214",
            borderRadius: 24,
            borderWidth: 1,
            borderColor:
              "rgba(234,179,8,0.15)",
            padding: 15,
          }}
          className= "flex- 1 fl ex-row justify-center items-center" >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: width / 24,
                  fontWeight: "800",
                }}
              >
                Arena  {arena.arenaName}
              </Text>
              <Text
                style={{
                  color: "#eab308",
                  marginTop: 4,
                  fontSize: width / 24,
                  fontWeight: "800",
                }}
              >
                {arena.talentType} {'  '}
                    <Text
                        style={{
                        fontSize: width/24,
                        fontFamily:"700"
                        }}  >
                        {stageIcons[arena.talentType]}
                    </Text>
              </Text>
          {/* </View> */}
       

        </View>

        {/* HERO */}
        
        { videoUrl ? (
        <View
        style={{
            marginHorizontal: 10,
            marginTop: 18,
            marginBottom : 18 ,
            backgroundColor: "#111214",
            borderRadius: 24,
            overflow: "hidden",
            borderWidth: 1,
            borderColor:
            "rgba(234,179,8,0.12)"  }}
            className = "flex-1" >
            {/* VIDEO */}
            <VideoView
                player={player}
                style={{
                width: "100%",
                height: 260,
                flex:1
                }}
                contentFit="cover"
                allowsFullscreen
                allowsPictureInPicture  />

            {/* ACTIONS */}

            <View
                style={{
                flexDirection: "row",
                padding: 8,
                gap: 10,
                }}  >
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (
                    player.playing
                    ) {
                    player.pause();
                    } else {
                    player.play();
                    }
                }}
                style={{
                    width : "32%" ,
                    // height: 48,
                    borderRadius: 14,
                    backgroundColor:
                    "#1B1B1B",
                    justifyContent:
                    "center",
                    alignItems:
                    "center",
                }}
                className ="py-4"
                >
                <Text
                    style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize : width/36
                    }}>
                    Play
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        uploadVideo();
                    }}
                    style={{
                        width : "32%" ,
                        // height: 48,
                        borderRadius: 14,
                        backgroundColor:
                        "#1B1B1B",
                        justifyContent:
                        "center",
                        alignItems:
                        "center",
                    }}
                    >
                    <Text
                        style={{
                        color: "#fff",
                        fontWeight: "700",
                        fontSize : width/36
                        }} >
                        Replace
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { setVideoUrl(null); }}
                    style={{
                        flex: 1,
                        width : "32%" ,
                        // height: 48,
                        borderRadius: 14,
                        backgroundColor:
                        "#3A1111",
                        justifyContent:
                        "center",
                        alignItems:
                        "center",
                    }} >
                    <Text
                        style={{
                        color: "#FF6B6B",
                        fontWeight: "700",
                        fontSize : width/36
                        }} >
                        Remove
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        ) : (
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 18,
            marginBottom : 18,
            backgroundColor: "#111214",
            borderRadius: 28,
            borderWidth: 1,
            borderColor: "rgba(234,179,8,0.12)",
            // paddingVertical: 35,
            alignItems: "center",
          }}
          className ="flex-1 " >
            <View
            style ={{
                marginTop: 18,
            }}
            className ="flex-1 items-center"
            >
                <View
                    style={{
                    width: height/15,
                    height: height/15,
                    borderRadius: 999,
                    backgroundColor: "rgba(234,179,8,0.08)",
                    justifyContent: "center",
                    alignItems: "center",
                    }} 
                    >
                    <MaterialCommunityIcons
                    name="video-outline"
                    size={32}
                    color="#eab308" />
                </View>

                <Text
                    style={{
                    color: "#FFFFFF",
                    fontWeight: "800",
                    fontSize: width / 24,
                    marginTop: 18,
                    }}    >
                    Share Your Talent
                </Text>

                <Text
                    style={{
                    color: "#9CA3AF",
                    textAlign: "center",
                    marginTop: 10,
                    paddingHorizontal: 10,
                    lineHeight: 22,
                    }} >
                    Upload an existing performance
                    or record a new one directly
                    from your device.
                </Text>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 10,
              marginBottom: 18,
            }}
            className ="mt-auto" >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => 
                 uploadVideo()
              }
              style={{
                height: height/16,
                borderRadius: 18,
                backgroundColor:
                  "#eab308",
                justifyContent:
                  "center",
                alignItems: "center",
              }}  >
              <Text
                style={{
                  color: "#000",
                  fontWeight: "800",
                  fontSize: width / 28,
                }} >
                Upload Video
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                height: height/16,
                borderRadius: 18,
                marginTop: 12,
                borderWidth: 1,
                borderColor:
                  "rgba(234,179,8,0.20)",
                justifyContent:
                  "center",
                alignItems: "center",
              }}
              onPress={() => {setShowCamera(true)}}  >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "800",
                  fontSize: width / 28,
                }}  >
                Record Performance
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        )}


        {/* SPOTLIGHT */}

        <View
          style={{
            // height : height /7,
            marginHorizontal: 10,
            marginTop: "auto",
            backgroundColor:
              "#111214",
            borderRadius: 24,
            borderWidth: 1,
            borderColor:
              "rgba(234,179,8,0.15)",
            padding: 15,
          }}
          className ="mt-auto p -4 item s-center justify-center"
           >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }} >
            <MaterialCommunityIcons
              name="star-circle"
              size={28}
              color="#eab308"
            />
            <Text
              style={{
                color: "#eab308",
                fontWeight: "800",
                fontSize: width / 22,
                marginLeft: 10,
              }}
            >
              Spotlight
            </Text>
          </View>

          <Text
            style={{
              color: "#D1D5DB",
              marginTop: 8,
              lineHeight: 22,
            }}
          >
            Exceptional performances may earn a Spotlight feature and reach audiences across Itri.
          </Text>
        </View>

      </View>

      {/* BOTTOM CTA */}

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#050505",
          paddingHorizontal: 18,
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor:
            "rgba(234,179,8,0.08)",
        }}  >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            setSubmitModal(true)
          }
          disabled = {!videoUrl ? true : false}
          style={{
            height:height/16,
            borderRadius: 20,
            backgroundColor:
             videoUrl ?  "#eab308" : "rgba(224, 179, 16 , 0.4)",
            justifyContent:
              "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: videoUrl ?"#000" :"#232324",
              fontWeight: "800",
              fontSize: width / 24,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <CameraRecordingModal
        visible={showCamera}
        setVisible={setShowCamera}
        setVideoUrl={setVideoUrl}
        />

      <SubmitPerformanceModal
        visible={submitModal}
        setVisible={setSubmitModal}
        setOpenPerformanceAlertModal={setOpenPerformanceAlertModal}
        arena={arena}
        videoUrl={videoUrl}
        description = {description}
        setDescription = {setDescription}
        onSubmit={submitPerformance}
        spotlight={spotlight}
        setSpotLight={setSpotlight}
        />
       
      {openPerformanceAlertModal && (
      <ArenaAlertModal
          isVisible={openPerformanceAlertModal}
          setIsVisible={setOpenPerformanceAlertModal}
          title = {alertContent[arenaActionModal]?.title}
          message = {alertContent[arenaActionModal]?.text}
          type = {alertType[arenaActionModal]}
          onConfirm = {confirmAction[arenaActionModal]}
          />
      )}
    </View>
  );
}