import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  Alert,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";

import {
  Ionicons,
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
// import { enqueuePerformanceUpload, subscribeToUploadQueue } from "../services/upload";
import * as FileSystem from "expo-file-system/legacy";
import { enqueuePerformanceUpload } from "../services/uploads";
import SpotlightIcon from "../components/custom/spotlightIcon";

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
const [showDescriptionModal, setShowDescriptionModal] = useState(false);

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
        mediaTypes: ["videos"],
        quality: 1,
      });
  
      if (!result.canceled) {
        const validate = await validateVideo(result.assets[0].uri)
        // if(validate.tooLarge ) {
        //       setOpenPerformanceAlertModal(true)
        //        setArenaActionModal('uploadVideo_toolarge')
        //        return;
        //       }
   
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




const deleteOriginalFiles = async () => {
  try {
    if (videoUrl) {
      await FileSystem.deleteAsync(videoUrl, {
        idempotent: true,
      });
      console.log("🧹 Original video removed");
    }

    if (thumbNailURL) {
      await FileSystem.deleteAsync(thumbNailURL, {
        idempotent: true,
      });
      console.log("🧹 Original thumbnail removed");
    }
  } catch (error) {
    console.error(
      "❌ Failed to remove original performance files:",
      error
    );
  }
};



const submitPerformance = async () => {

  try {
    await enqueuePerformanceUpload({
      videoUri: videoUrl,
      thumbnailUri: thumbNailURL,
      arenaId: selectedArena._id,
      ownerId: user._id,
      ownerEmail: user.email,
      description,
      region: selectedArena.region,
    });

    await deleteOriginalFiles();

    hideLoading();
    router.back();
  } catch (error) {
    console.error(
      "❌ Failed to queue performance:",
      error
    );
    hideLoading();
    Alert.alert(
      "Upload error",
      error?.message ||
        "Failed to start the upload."
    );
  }
};

const deleteVideoFiles = async () => {
  try {
    if (videoUrl) {
      const videoInfo = await FileSystem.getInfoAsync(videoUrl);

      if (videoInfo.exists) {
        await FileSystem.deleteAsync(videoUrl, {
          idempotent: true,
        });
        console.log("🧹 Original video removed");
      }
    }

    if (thumbNailURL) {
      const thumbnailInfo = await FileSystem.getInfoAsync(thumbNailURL);

      if (thumbnailInfo.exists) {
        await FileSystem.deleteAsync(thumbNailURL, {
          idempotent: true,
        });
        console.log("🧹 Thumbnail removed");
      }
    }
  } catch (error) {
    console.error("❌ Failed to clean local performance files:", error);
  }
};

const deleteVideo = () => {
  setVideoUrl(null);
};

const confirmAction = {
  uploadVideo_toolarge: deleteVideo,
  submit_performance: submitPerformance,
};


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
            // marginHorizontal: 10,
            // marginTop: 18,
            // backgroundColor:
            //   "#111214",
            // borderRadius: 5,
            // borderWidth: 1,
            // borderColor:
            //   "rgba(234,179,8,0.15)",
            padding: 15,
          }}
          className= "gap-4 flex-row justify-start items-center" >
            <View
            className = "flex p-2 bg-gold/10 rounded-xl">
                <MaterialCommunityIcons
                  name="stadium"
                  size={42}
                  color="#EAB308"
                />
            </View>
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: width / 27,
                  fontWeight: "800",
                }}
              >
               {arena.arenaName}
              </Text>
              <Text
                style={{
                  color: "#eab308",
                  marginTop: 4,
                  fontSize: width / 30,
                  fontWeight: "800",
                }}
              >
                {arena.talentType} {'  '}
                    <Text
                        style={{
                        fontSize: width/38,
                        fontFamily:"700"
                        }}  >
                        {stageIcons[arena.talentType]}
                    </Text>
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
                className = "ml-auto p-1 rounded-full" >
                <MaterialCommunityIcons
                name="close"
                size={35}
                color="#eab308"
                />
            </TouchableOpacity>
          
       

        </View>

        {/* HERO */}
        
        { videoUrl ? (
        <View
        style={{
            marginHorizontal: 10,
            // marginTop: 18,
            // marginBottom : 18 ,
            // backgroundColor: "#111214",
            // borderRadius: 9,
            overflow: "hidden",
            // borderWidth: 1,
            // borderColor:
            // "rgba(234,179,8,0.12)"  
          }}
            className = "flex-1 p- 2 b g-primary" >
            {/* VIDEO */}
            <VideoView
                player={player}
                style={{
                width: "100%",
                height: 260,
                flex:1,
                borderRadius: 9,
                }}
                nativeControls = {false}
                contentFit="cover"
                // allowsFullscreen
                // allowsPictureInPicture 
                 />
        </View>
        ) : (
          <View
          style={{
            flex: 1,
            width,
            marginHorizontal: 10,
            marginBottom: 18,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 12,
            borderRadius: 9,
            backgroundColor: "#0D0D0F",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          {/* Header + intro content */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <MaterialCommunityIcons
                name="video-outline"
                size={39}
                color="#EAB308"
              />
        
              <Text
                style={{
                  color: "#F7F7F7",
                  fontSize: width / 26,
                  fontWeight: "900",
                  letterSpacing: -0.25,
                }}
              >
                Add a performance
              </Text>
            </View>
        
            <Text
              style={{
                marginTop: 8,
                color: "#C2C2C2",
                fontSize: width / 29,
                lineHeight: 23,
              }}
            >
              Share your talent with the community by adding a performance to your{" "}
              <Text
                style={{
                  color: "#F0D36A",
                  fontWeight: "800",
                }}
              >
                {arena?.arenaName || "arena"}
              </Text>
              .
            </Text>
        
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={18}
                  color="#EAB308"
                />
        
                <Text
                  style={{
                    color: "#F7F7F7",
                    fontSize: width / 36,
                    fontWeight: "900",
                  }}
                >
                  Talent
                </Text>
              </View>
        
              <Text
                style={{
                  marginTop: 6,
                  color: "#BDBDBD",
                  fontSize: width / 31,
                  lineHeight: 20,
                }}
              >
                Your arena is for{" "}
                <Text
                  style={{
                    color: "#F2F2F2",
                    fontWeight: "800",
                  }}
                >
                  {arena?.talentType || "your talent"}
                </Text>
                . Upload a performance you've already created, or record a new one
                and share your best work with the Itri community.
              </Text>
            </View>
        
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <SpotlightIcon size={7} />
        
                <Text
                  style={{
                    color: "#F7F7F7",
                    fontSize: width / 36,
                    fontWeight: "900",
                  }}
                >
                  Spotlight
                </Text>
              </View>
        
              <Text
                style={{
                  marginTop: 6,
                  color: "#AFAFAF",
                  fontSize: width / 32,
                  lineHeight: 20,
                }}
              >
                 Performances that receive a strong response from the community can
                 earn a Spotlight feature and become visible to a much larger audience
                 across Itri.
              </Text>
            </View>
          </View>
        
          {/* Terms takes all remaining space */}
          <View
            style={{
              flex: 1,
              marginTop: 20,
              minHeight: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginBottom: 6,
              }}
            >
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={18}
                color="#A8A8A8"
              />
        
              <Text
                style={{
                  color: "#F7F7F7",
                  fontSize: width / 36,
                  fontWeight: "900",
                }}
              >
                Terms
              </Text>
            </View>
        
            <ScrollView
              style={{
                flex: 1,
                marginTop :7
              }}
              contentContainerStyle={{
                marginTop: 2,
                paddingBottom: 12,
              }}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled
            >
              <Text
                style={{
                  color: "#BDBDBD",
                  fontSize: width / 31,
                  lineHeight: 23,
                }}
              >
                Performances should match the arena's talent and must not contain
                abusive, harmful, or inappropriate content toward the Itri community.
                {"\n\n"}
                Itri is built to give people a place to express their talent, share
                their creativity, discover new performers, and connect with a wider
                community through meaningful performances. Every arena represents a
                specific talent, and the performances shared within it should genuinely
                reflect that talent and contribute something positive to the community.
                {"\n\n"}
                By adding a performance, you agree that the content you submit is your
                own responsibility and that it should respect other members of the Itri
                community. Do not use performances to threaten, harass, humiliate,
                intimidate, discriminate against, or intentionally harm another person.
                Content that promotes abuse, violence, hate, exploitation, or other
                harmful behavior is not welcome on Itri.
                {"\n\n"}
                Performances should also remain relevant to the arena in which they are
                posted. When an arena is dedicated to a particular talent, your
                performance should meaningfully represent that talent. This helps keep
                arenas focused, authentic, and enjoyable for everyone discovering them.
                {"\n\n"}
                Itri is a community built around participation and discovery. A
                performance may receive attention, reactions, and engagement from other
                members, and content that receives strong positive interest may be
                considered for Spotlight visibility. Spotlight is intended to help
                exceptional performances reach a larger audience across the Itri
                community.
                {"\n\n"}
                By continuing, you acknowledge that Itri may review, restrict, remove,
                or limit visibility of content that does not follow these community
                standards, terms, or applicable rules. Repeated or serious violations
                may result in additional restrictions on your account or participation
                within the community.
                {"\n\n"}
                Please share responsibly, respect the people watching, and use your
                performance to show what you can create at your best.
              </Text>
            </ScrollView>
          </View>
        </View>
        )}

        {description?.trim() && (
          <View
            style={{
              // position: "absolute",
              // left: 14,
              // right: 14,
              // bottom: 14,
              paddingLeft: 14,
              paddingRight: 8,
              paddingVertical: 15,
              borderRadius: 15,
              // backgroundColor: "rgba(8,8,8,0.80)",
              // borderWidth: 1,
              borderColor: "rgba(255,255,255,0.22)",
              flexDirection: "row",
              alignItems: "center",
            }}
            // className = "border-t border-b"
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={17}
              color="#F0D36A"
              style={{
                marginRight: 8,
              }}
            />

            <Text
              numberOfLines={3}
              style={{
                flex: 1,
                color: "#F2F2F2",
                fontSize: width / 32,
                lineHeight: 19,
                fontWeight: "600",
              }}
            >
              {description}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setDescription(description);
                setShowDescriptionModal(true);
              }}
              style={{
                width: 34,
                height: 34,
                marginLeft: 8,
                borderRadius: 11,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.06)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color="#D6D6D6"
              />
            </TouchableOpacity>
          </View>
        )}

        {!description?.trim() && videoUrl && (
          <View
            style={{
              // position: "absolute",
              // left: 14,
              // right: 14,
              // bottom: 14,
              paddingLeft: 14,
              paddingRight: 8,
              paddingVertical: 15,
              borderRadius: 15,
              // backgroundColor: "rgba(8,8,8,0.80)",
              // borderWidth: 1,
              borderColor: "rgba(255,255,255,0.22)",
              flexDirection: "row",
              alignItems: "center",
            }}
            // className = "border-t border-b"
             >
            <Text
              numberOfLines={3}
              style={{
                flex: 1,
                color: "#AAA",
                fontSize: width / 32,
                lineHeight: 19,
                fontWeight: "600",
              }}
            >
              Add Description
            </Text>
          </View>
        )}

        {!videoUrl ? (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 10,
              // marginBottom: 18,
            }}
            className="px-8 flex-row gap-4 justify-center items-center"
          >
            {/* UPLOAD VIDEO */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => uploadVideo()}
              style={{
                borderRadius: 15,
                // DARK GLASS
                backgroundColor: "rgba(37,99,235,0.10)",

                // subtle premium border
                borderWidth: 1,
                borderColor: "rgba(96,165,250,0.30)",

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
                    // width: 30,
                    // height: 30,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(37,99,235,0.10)",
                    borderWidth: 1,
                    borderColor: "rgba(234,179,8,0.20)",
                  }}
                >
                  <MaterialCommunityIcons
                    name="upload-outline"
                    size={28}
                    color="#60A5FA"
                  />
                </View>

                <Text
                  style={{
                    marginLeft: 9,
                    color: "#60A5FA",
                    fontWeight: "800",
                    fontSize: width / 25,
                    letterSpacing: 0.3,
                  }}
                >
                  Upload
                </Text>
              </View>
            </TouchableOpacity>

            {/* RECORD PERFORMANCE */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                borderRadius: 15,
                // SAME DARK GLASS
                backgroundColor: "rgba(220,38,38,0.10)",
                borderWidth: 1,
                borderColor: "rgba(248,113,113,0.30)",
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
                    // width: 30,
                    // height: 30,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "rgba(234,179,8,0.10)",
                    // borderWidth: 1,
                    // borderColor: "rgba(234,179,8,0.20)",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={28}
                    color="#F87171"
                  />
                </View>

                <Text
                  style={{
                    marginLeft: 9,
                    color: "#F87171",
                    fontWeight: "800",
                    fontSize: width / 25,
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
              marginBottom : 4,
              gap: 10,
              justifyContent: "between",
              alignItems: "center",
            }}
            className = "w-full border-t border-[#201e1e] py-1"  >

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  if (player.playing) {
                    player.pause();
                  } else {
                    player.play();
                  }
                }}
                style={{
                  // flex: 1,
                  // height: 58,
                  borderRadius: 16,
                  // backgroundColor: "#151515",
                  borderWidth: 1,
                  borderColor: "#2A2A2A",
                  justifyContent: "center",
                  alignItems: "center",
                
                }}
                className ="w- [32%] p-4"  >
                  <Ionicons
                    name={player.playing ? "pause" : "play"}
                    size={24}
                    color="#FFFFFF"
                  />
               </TouchableOpacity>
        
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  uploadVideo();
                }}
                style={{
                  // flex: 1,
                  // height: 58,
                  borderRadius: 16,
                  // backgroundColor: "#151515",
                  borderWidth: 1,
                  borderColor: "#2A2A2A",
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 5,
                }}
                className ="w- [32%] p-4"
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={24}
                  color="#FFFFFF"
                />
              
              </TouchableOpacity>
        
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  setVideoUrl(null);
                  setDescription("")
                }}
                style={{
                  // flex: 1,
                  // height: 58,
                  borderRadius: 16,
                  // backgroundColor: "#1E1010",
                  borderWidth: 1,
                  borderColor: "#482020",
                  justifyContent: "center",
                  alignItems: "center",
                
                }}
                className ="w- [32%] p-4"
              >
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="#FF6B6B"
                />
                
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => {
                  if (!description.trim()) {
                    setDescription("");
                    setShowDescriptionModal(true);
                    return;
                  }
                  submitPerformance()
                }}
                disabled={!videoUrl}
                style={{
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 9,
                  borderWidth: 1,
                  borderColor: videoUrl
                    ? "rgba(255,255,255,0.16)"
                    : "rgba(255,255,255,0.125)",
                }}
                className="flex-1 p-4"
              >
                {description.trim() === "" ? (
                  <>
                    {/* <Ionicons
                      name="create-outline"
                      size={width / 20}
                      color={videoUrl ? "#F5D76E" : "#3A3A3A"}
                    /> */}

                    <Text
                      style={{
                        color: videoUrl ? "#FFF" : "#AAA",
                        fontWeight: "800",
                        fontSize: width / 30,
                        letterSpacing: 0.3,
                      }}
                    >
                      Add Description
                    </Text>

                    {/* <Ionicons
                      name="sheet"
                      size={width / 20}
                      color={videoUrl ? "#F5D76E" : "#3A3A3A"}
                    /> */}
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        color: videoUrl ? "#F5D76E" : "#AAA",
                        fontWeight: "800",
                        fontSize: width / 30,
                        letterSpacing: 0.3,
                      }}
                    >
                      Submit
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={width / 20}
                      color={videoUrl ? "#F5D76E" : "#3A3A3A"}
                    />
                  </>
                )}
              </TouchableOpacity>
        </View>
        )}
      

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

<Modal
  visible={showDescriptionModal}
  transparent
  animationType="fade"
  onRequestClose={() => {
    setShowDescriptionModal(false);
  }}
>
  <View
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.80)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 22,
    }}
  >
    <View
      style={{
        width: "100%",
        maxWidth: 430,
        borderRadius: 22,
        backgroundColor: "#111113",
        borderWidth: 1,
        borderColor: "rgba(234,179,8,0.20)",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.45,
        shadowRadius: 25,
        elevation: 12,
      }}
    >
      {/* Close */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setShowDescriptionModal(false);
          setDescription("");
        }}
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 34,
          height: 34,
          borderRadius: 11,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.08)",
          zIndex: 5,
        }}
      >
        <Ionicons
          name="close"
          size={19}
          color="#BEBEBE"
        />
      </TouchableOpacity>

      {/* Icon */}
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(234,179,8,0.08)",
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.20)",
        }}
      >
        <Ionicons
          name="create-outline"
          size={25}
          color="#EAB308"
        />
      </View>

      <Text
        style={{
          marginTop: 16,
          color: "#F7F7F7",
          fontSize: width / 22,
          fontWeight: "900",
          letterSpacing: -0.2,
        }}
      >
        Describe your performance
      </Text>

      <Text
        style={{
          marginTop: 7,
          color: "#B7B7B7",
          fontSize: width / 31,
          lineHeight: 20,
        }}
      >
        Tell the Itri community what you are sharing. Keep it meaningful,
        relevant to your talent, and respectful.
      </Text>

      {/* Text field */}
      <View
        style={{
          marginTop: 18,
          minHeight: 120,
          borderRadius: 17,
          backgroundColor: "#090909",
          borderWidth: 1,
          borderColor:
            description.trim().length >= 5
              ? "rgba(234,179,8,0.32)"
              : "rgba(255,255,255,0.09)",
          paddingHorizontal: 14,
          paddingVertical: 12,
        }}
      >
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Write a short description..."
          placeholderTextColor="#686868"
          multiline
          maxLength={300}
          textAlignVertical="top"
          autoFocus
          style={{
            flex: 1,
            color: "#F3F3F3",
            fontSize: width / 31,
            lineHeight: 21,
          }}
        />

        <Text
          style={{
            alignSelf: "flex-end",
            marginTop: 6,
            color:
              description.trim().length >= 5
                ? "#9C8A4A"
                : "#666",
            fontSize: 10,
            fontWeight: "700",
          }}
        >
          {description.length}/300
        </Text>
      </View>

      {/* Validation */}
      {description.length > 0 &&
        description.trim().length < 5 && (
          <Text
            style={{
              marginTop: 8,
              color: "#C77878",
              fontSize: 11,
              fontWeight: "600",
            }}
          >
            Please enter at least 5 characters.
          </Text>
        )}

      {/* Add */}
      <TouchableOpacity
        activeOpacity={0.86}
        disabled={
          description.trim().length < 5
        }
        onPress={() => {
          const finalDescription =
             description.trim();

          if (finalDescription.length < 5) {
            return;
          }

          setDescription(finalDescription);
          setShowDescriptionModal(false);
        }}
        style={{
          height: 52,
          marginTop: 17,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          backgroundColor:
            description.trim().length >= 5
              ? "#111111"
              : "#0A0A0A",
          borderWidth: 1,
          borderColor:
            description.trim().length >= 5
              ? "rgba(234,179,8,0.48)"
              : "rgba(255,255,255,0.06)",
          opacity:
            description.trim().length >= 5
              ? 1
              : 0.65,
        }}
      >
        <Text
          style={{
            color:
              description.trim().length >= 5
                ? "#F0D36A"
                : "#666",
            fontSize: width / 29,
            fontWeight: "900",
            letterSpacing: 0.4,
          }}
        >
          Add Description
        </Text>

        <Ionicons
          name="checkmark"
          size={19}
          color={
            description.trim().length >= 5
              ? "#F0D36A"
              : "#666"
          }
        />
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
}