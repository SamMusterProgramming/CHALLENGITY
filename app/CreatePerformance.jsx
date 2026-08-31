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
const {userArenas , user ,selectedArena , setSelectedArena , setUserArenas, uploadPerformanceLoading , setGlobalArenaRefresh,
   setUploadPerformanceLoading , arenaActionModal , setArenaActionModal ,tempPerformance, setTempPerformance} = useGlobalContext()
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
            const performance = {
                _id : "00000000000" ,
                arena_id: selectedArena._id,
                owner_id: user._id,
                caption: description ,
                temp:true ,
                media: {
                    video: {
                       url:videoUrl
                    },
                    thumbnail: {
                       url:thumbNailURL
                    },
                },
              }
            setTempPerformance(performance)
            setUploadPerformanceLoading(true)
            setTimeout(() => {
                hideLoading()
                router.back()
                // setUploadPerformanceLoading(true)
            }, 2000);
            const compressedVideo = videoUrl ;// await compressVideo(videoUrl);
            await  Promise.all([
                uploadVideoToBackblaze(videoRes, compressedVideo  ),
                uploadImageToBlackBlaze(thumbRes, thumbNailURL),
            ]).then(async([videoUpload, thumbnailUpload]) => {    
                const data = {
                    owner_id:user._id,
                    region: selectedArena.region,
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
                setGlobalArenaRefresh(true)
                })
            })
            .catch(e => {
               setUploadPerformanceLoading(false)
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
//             const performance = {
//               _id : "00000000000" ,
//               arena_id: selectedArena._id,
//               owner_id: user._id,
//               caption: description ,
//               temp:true ,
//               media: {
//                   video: {
//                      url:videoUrl
//                   },
//                   thumbnail: {
//                      url:thumbNailURL
//                   },
//               },
//             }
//           setTempPerformance(performance)
//           setUploadPerformanceLoading(true)
//           setTimeout(() => {
//               hideLoading()
//               router.back()
//               // setUploadPerformanceLoading(true)
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
//                             region: selectedArena.region,
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
            // marginBottom : height/16 + 20
        }}
        className = " flex-1 flex-col justify-start item s-center"
         >
        {/* HEADER */}



        <View
          style={{
            marginHorizontal: 10,
            marginTop: 18,
            backgroundColor:
              "#111214",
            borderRadius: 5,
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
                  className = "absolute top-2 right-2 p-1 rounded-full" >
                  <MaterialCommunityIcons
                  name="close"
                  size={32}
                  color="#eab308"
                  />
              </TouchableOpacity>
              <View
                style={{
                  // width: 42,
                  // height: 42,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor:
                  //   "rgba(234,179,8,0.09)",
                  borderWidth: 1,
                  borderColor:
                    "rgba(234,179,8,0.28)",
                }}
                className = "absolute p-1 top-2 left-2"
                 >
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={28}
                  color="#EAB308"
                />
              </View>
       

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
          className ="flex-1 justify-evenly " >
            <View
            style ={{
                marginTop: 18,
                marginHorizontal: 10,
            }}
            className ="fl ex-1 items-center"
            >
                <View
                    style={{
                    // width: height/15,
                    // height: height/15,
                    // borderRadius: 999,
                    // backgroundColor: "rgba(234,179,8,0.08)",
                    justifyContent: "center",
                    alignItems: "center",
                    }} 
                    >
                    <MaterialCommunityIcons
                    name="video-outline"
                    size={38}
                    color="#eab308" />
                </View>

                <Text
                    style={{
                    color: "#FFFFFF",
                    fontWeight: "800",
                    fontSize: width / 24,
                    marginTop: 20,
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

            {/* SPOTLIGHT */}

          <View
            style={{
              // height : height /7,
              marginHorizontal: 10,
              // marginTop: "auto",
              backgroundColor:
                "#111214",
              borderRadius: 24,
              // borderWidth: 1,
              // borderColor: "rgba(234,179,8,0.15)",
              padding: 15,
            }}
            className ="mt- auto p -4 items-center justify-center"
            >
            <View
              style={{
                flexDirection: "col",
                alignItems: "center",
              }} >
              <MaterialCommunityIcons
                name="star-circle"
                size={38}
                color="#eab308"
              />
              <Text
                style={{
                  color: "#eab308",
                  fontWeight: "800",
                  fontSize: width / 22,
                  marginTop: 12
                }} >
                Spotlight
              </Text>
            </View>

            <Text
              style={{
                color: "#9CA3AF",
                textAlign: "center",
                marginTop: 10,
                lineHeight: 22,
              }}
              className = "text-center"
            >
              Exceptional performances may earn a Spotlight feature and reach audiences across Itri.
            </Text>
          </View>

     
        </View>
        )}

        {!videoUrl ? (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 10,
              // marginBottom: 18,
            }}
            className="px-5 flex-row gap-4 justify-center items-center"
          >
            {/* UPLOAD VIDEO */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => uploadVideo()}
              style={{
                borderRadius: 5,
                // DARK GLASS
                backgroundColor: "rgba(255,255,255,0.045)",

                // subtle premium border
                borderWidth: 1,
                borderColor: "rgba(234,179,8,0.28)",

                justifyContent: "center",
                alignItems: "center",

              }}
              className="p-4 w-[50%]"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* ICON */}
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(234,179,8,0.10)",
                    borderWidth: 1,
                    borderColor: "rgba(234,179,8,0.20)",
                  }}
                >
                  <MaterialCommunityIcons
                    name="video-plus-outline"
                    size={18}
                    color="#EAB308"
                  />
                </View>

                <Text
                  style={{
                    marginLeft: 9,
                    color: "#F4C542",
                    fontWeight: "800",
                    fontSize: width / 32,
                    letterSpacing: 0.3,
                  }}
                >
                  Upload Video
                </Text>
              </View>
            </TouchableOpacity>

            {/* RECORD PERFORMANCE */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                borderRadius: 5,
                // SAME DARK GLASS
                backgroundColor: "rgba(255,255,255,0.045)",
                borderWidth: 1,
                borderColor: "rgba(234,179,8,0.28)",
                justifyContent: "center",
                alignItems: "center",
                
              }}
              className="p-4 w-[50%]"
              onPress={() => {
                setShowCamera(true);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* ICON */}
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(234,179,8,0.10)",
                    borderWidth: 1,
                    borderColor: "rgba(234,179,8,0.20)",
                  }}
                >
                  <MaterialCommunityIcons
                    name="record-circle-outline"
                    size={18}
                    color="#EAB308"
                  />
                </View>

                <Text
                  style={{
                    marginLeft: 9,
                    color: "#F4C542",
                    fontWeight: "800",
                    fontSize: width / 32,
                    letterSpacing: 0.3,
                  }}
                >
                  Record
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ): (
           <View
           style={{
           flexDirection: "row",
           paddingHorizontal: 10,

          //  padding: 8,
          //  gap: 10,
           }} 
           className="p x-3 flex-row gap-2 justify-center items-center"
            >
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
               borderRadius: 5,
               backgroundColor: "#1B1B1B",
               justifyContent: "center",
               alignItems: "center",
           }}
           className ="py-4"
           >
           <Text
               style={{
               color: "#fff",
               fontWeight: "700",
               fontSize : width/32
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
                   borderRadius: 5,
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
                   fontSize : width/32
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
                   borderRadius: 5,
                   backgroundColor:  "#3A1111",
                   justifyContent:  "center",
                   alignItems: "center",
               }}
               className ="py-4"
                >
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
        )}

        <View
          style={{
            backgroundColor: "#050505",
            paddingHorizontal: 10,
            marginTop: 18,
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
              borderRadius: 5,
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