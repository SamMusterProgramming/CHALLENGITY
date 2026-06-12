import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useKeepAwake } from 'expo-keep-awake';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import { icons } from '../../constants';
import { AntDesign } from '@expo/vector-icons';
import { formatTime } from '../../helper';
// import { _uploadVideoAsync, compressImage, compressVideo, storage, uploadThumbnail } from '../../firebase';
import { api, BASE_URL } from '../../apiCalls';
import { generateThumbnail } from '../../videoFiles';
import axios from 'axios';
import { deleteObject, getStorage, ref } from 'firebase/storage'
import {  getUploadImageUrl, getUploadVideoUrl, uploadImageToBlackBlaze, uploadVideoToBackblaze } from '../../uploadFileToBlackBlaze';
import { compressImage } from '../../utilities/fileCompressor';
import { isFastStartVideo } from '../../ffmpeg/ffmpeg';
import { useLoading } from '../../context/loadingContext';
import { LinearGradient } from 'expo-linear-gradient';
import UploadVideoButton from '../custom/uploadVideoButton';
import RecordVideoButton from '../custom/recordVideoButton';
import RecordingButton from '../custom/recordingButton';
import { RecordingTimer } from '../custom/recordingTimer';
// import { makeFastStart, normalizePath } from '../../ffmpeg/ffmpeg';


export default function TalentParticipation({talentRoom, setReplayRecording , user,
                                             setNewChallenge, setSelectedContestant 
                                             ,userParticipation,participation , setStage , 
                                             setTalentRoom , setIsExpired , bottom}) {
  const { globalRefresh, setGlobalRefresh} = useGlobalContext()
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions()
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const [videoUri, setVideoUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const [visible, setVisible] = useState(false);
  const [thumbNailURL,setThumbNailURL] = useState(null)
  const { showLoading, hideLoading } = useLoading();
  const { width ,height} = Dimensions.get("window");
  const [loading, setLoading] = useState(false)
  const timerRef = useRef(null);

  
  const videolURL = participation == "update"? userParticipation.video_url :
        participation == "qupdate" ? talentRoom.queue.find(u => u.user_id == user._id).video_url:
        participation == "eupdate" ?talentRoom.eliminations.find(u => u.user_id == user._id).video_url:null
  const thumbURL = participation == "update"? userParticipation.thumbNail_URL :
        participation == "qupdate" ? talentRoom.queue.find(u => u.user_id == user._id).thumbNail_URL :
        participation == "eupdate" ?talentRoom.eliminations.find(u => u.user_id == user._id).thumbNail_URL :null

  useKeepAwake();

  const player = useVideoPlayer
  (
    videoUri
    , (player) => {
    player.loop = true;
    player.volume = 0.5
    player.pause() ;
    player.timeUpdateEventInterval = 0.1;
  });

const { playing } = useEvent(player, 'playingChange', { playing: player.playing });

useEffect(() => {
   const makeThumbNail = async () => {
    if(videoUri)
      { 
       setLoading(true)
       const imageUrl = await generateThumbnail(videoUri)
       const compressed = await compressImage(imageUrl.uri)
       setThumbNailURL(compressed)
       setTimeout(() => {
        setLoading(false)
        setReplayRecording(true)
        player.replaceAsync(videoUri).then(()=> {setIsPlaying(true)});
        player.play()
       }, 1000);
      }
   }
   makeThumbNail()
}, [videoUri])

const toggleVideoPlaying = () =>{
    if(isPlaying){
      player.pause()
      setIsPlaying(false)
      setReplayRecording(false)
    }else {
      player.play()
      setIsPlaying(true)
      setReplayRecording(true)
    }
}


  const requestMediaPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status == 'granted') {
      alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };
  useEffect(() => {
    requestPermission()
    requestAudioPermission()
  }, [])

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const startRecording = async () => {
    try {
      setVideoUri(null);
      setReplayRecording(true);
      let options = {
        maxDuration: 120,
      };
      // IMPORTANT: start recording FIRST
      const videoPromise = cameraRef.current.recordAsync(options);
      // NOW start timer AFTER recording is truly running
      setIsRecording(true);
      setTimer(0);
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      const video = await videoPromise;
      setVideoUri(video.uri);
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRecording(false);
    } catch (err) {
      console.log(err);
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      console.log(timer)
      await cameraRef.current?.stopRecording();
      setIsRecording(false);
      setReplayRecording(false);
    } catch (err) {
      console.log(err);
    }
  };


   const uploadVideo =async()=>{
    try {
      const permissionGranted = await requestMediaPermissions();
      if (!permissionGranted || loading) return;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      setVideoUri(result.assets[0].uri)
    } catch (error) {
      console.log(error)
    }
  }    

  
  const upload = async()=>{
    if(videoUri ){
      showLoading("uploading the video ...")
      const optimizedVideo = videoUri // await makeFastStart(videoUri);

      setTimeout(() => {
        setNewChallenge(false)
        setStage(true)
        hideLoading()
        }, 2500); 

      Promise.all([
        getUploadVideoUrl(user._id , user.email , "talent" ),
        getUploadImageUrl(user._id , user.email , "thumbnail")
      ]).then(([videoRes, thumbRes] ) =>
         {
       
            Promise.all([
              uploadVideoToBackblaze(videoRes, videoUri ),
              uploadImageToBlackBlaze(thumbRes, thumbNailURL),
            ])
              .then(async([videoUpload, thumbnailUpload]) => {
              
                let body = {
                  publicUrl : user.profileImage.publicUrl,
                  user_id : user._id,
                  name : user.name,
                  // video_url : urls[0],
                  email : user.email,
                  city: user.city,
                  country : user.country,
                  // thumbNail:urls[1],
                  room_id:talentRoom._id,  
                  type:participation,
                  videoFileName : videoUpload.fileName,
                  videoFileId: videoUpload.fileId,
                  thumbnailFileName : thumbnailUpload.fileName,
                  thumbnailFileId : thumbnailUpload.fileId,
                  // thumbnailSignedUrl : `https://f000.backblazeb2.com/file/challengify-images/${thumbRes.fileName}`,
                  videoToDelete : participation == "update" ? talentRoom.contestants.find(c => c.user_id == user._id).video :
                                  participation == "qupdate" ? talentRoom.queue.find(c => c.user_id == user._id).video :
                                  participation == "eupdate" ?  talentRoom.eliminations.find(c => c.user_id == user._id).video : null ,
                  thumbnailToDelete : participation == "update" ? talentRoom.contestants.find(c => c.user_id == user._id).thumbnail :
                                  participation == "qupdate" ? talentRoom.queue.find(c => c.user_id == user._id).thumbnail :
                                  participation == "eupdate" ?  talentRoom.eliminations.find(c => c.user_id == user._id).thumbnail: null    
                }

                if(participation == "new" || participation == "queue"){
                  try {
                    const res = await api.post(`/talents/uploads/${talentRoom._id}`, body);
                    if (res.data === "challenge expired") {
                      return setIsExpired(true);
                    }
                    setTalentRoom(res.data);
                    setTimeout(() => {
                      if (participation === "new") {
                        setGlobalRefresh(true);
                        setStage(true);
                        setSelectedContestant({
                          ...res.data.contestants.find(c => c.user_id == user._id),
                          rank: res.data.contestants.length
                        });
                      }
                      if (participation === "queue") {
                        setGlobalRefresh(true);
                        setStage(false);
                        setSelectedContestant(null);
                      }
                    }, 500);
                  } catch (err) {
                    console.error("Failed to save video metadata:", err.response?.data || err.message);
                }}

                if(participation == "update" || participation == "qupdate" || participation == "eupdate" ){
                  await  api.patch(`/talents/update/${talentRoom._id}`,body)
                   .then(   
                     res =>  {
                         if(res.data === "challenge expired") return setIsExpired(true)      
                           setTalentRoom(res.data)
                           setTimeout(() => {
                                 if(participation == "update"){
                                     setGlobalRefresh(true)
                                     setStage(true)
                                     const rank = res.data.contestants.findIndex( c => c.user_id == user._id)
                                     setSelectedContestant({...res.data.contestants.find( c => c.user_id == user._id),rank:rank +1 })
                                 }
                                 if(participation == "qupdate" || participation == "eupdate"){
                                     setGlobalRefresh(true)
                                     setStage(false)
                                     setSelectedContestant(null)
                                 }
                           } , 500); 
                           
           
                       
                     } )
                  }

            })
      })
     }
  }


  return ( 
  <>
  {videoUri && !loading  ? (
        <>
             <VideoView 
                     style={{ minWidth:'100%' ,minHeight:'100%',opacity: isPlaying ? 1 : 0.4}}
                     player={player}
                     contentFit='cover'
                     nativeControls ={false}
                     pointerEvents='box-only'
                         />
             <TouchableOpacity 
                             hitSlop={Platform.OS === "android" &&{ top: 400, bottom: 400, left: 400, right: 400 }}
                             onPress={ 
                                 toggleVideoPlaying
                                 // () => { (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )} 
                             }
                             className={
                                     "w-full h-full flex-col absolute top-  justify-center items-center"
                             }
                             >
                             <Image 
                             className="w-14 h-14 opacity-100"
                             source={!isPlaying && icons.play}/>
             </TouchableOpacity>
             {!isPlaying && (
           <View
           style={{
             bottom: bottom + 10,
           }}
           className="absolute px-5 flex-row w-full justify-between items-center opacity-95"
         >
         
           {/* ❌ CANCEL */}
           <View className="w-[32%] items-center">
         
             <TouchableOpacity
               onPress={() => setIsRecording(false)}
               onPressOut={() => {
                 setVideoUri(null);
               }}
               activeOpacity={0.85}
               className="
                 w-full
                 flex-row
                 items-center
                 justify-center
                 gap-2
         
                 py-3
         
                 rounded-2xl
                 bor der
                 bord er-[#ff6b81]
                 bg-[#7a0814]
               "
               style={{
                 shadowColor: '#ff4d6d',
                 shadowOpacity: 0.25,
                 shadowRadius: 12,
                 shadowOffset: {
                   width: 0,
                   height: 4,
                 },
                 elevation: 10,
               }}
             >
         
               <Image
                 className="w-5 h-5"
                 source={icons.back}
                 resizeMode="contain"
               />
         
               <Text
                 style={{
                   fontSize: width /40,
                   letterSpacing: 1,
                 }}
                 className="text-white font-black"
               >
                 CANCEL
               </Text>
         
             </TouchableOpacity>
         
           </View>
         
           {/* ✅ SUBMIT */}
           <View className="w-[32%] items-center">
         
             <TouchableOpacity
               onPress={upload}
               activeOpacity={0.85}
               className="
                 w-full
                 flex-row
                 items-center
                 justify-center
                 gap-2
                 py-3
                 rounded-2xl
                 bo rder
                 bor der-[#ffe58f]
                 bg-[#916906]
               "
               style={{
                 shadowColor: '#ffd700',
                 shadowOpacity: 0.3,
                 shadowRadius: 14,
                 shadowOffset: {
                   width: 0,
                   height: 4,
                 },
                 elevation: 12,
               }}
             >
         
               <Image
                 className="w-5 h-5"
                 source={icons.submit}
                 resizeMode="contain"
               />
         
               <Text
                 style={{
                   fontSize: width /40,
                   letterSpacing: 1,
                 }}
                 className="text-white font-black"
               >
                 SUBMIT
               </Text>
         
             </TouchableOpacity>
         
           </View>
         
         </View>
              )}
        </>
         ):
         (     
       <>
         <CameraView ref={cameraRef} videoQuality="720p"
                mode='video'
                facing={facing}
                style={{minWidth:'100%',minHeight:'100%',opacity:0.5}}   
                  />   
                   <LinearGradient
                      colors={[
                        "rgba(0,0,0,0.75)",
                        "transparent",
                        "rgba(0,0,0,0.95)",
                      ]}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    />
               {!isRecording && (
                 <View 
                 style={{backgroundColor: !isRecording ?"#523c2":"transparent" ,
                  bottom:bottom
                 }}
                 className="absolute  w-[100%] flex-row justify-evenly items-center  opaci ty-85" > 
                       <RecordVideoButton onPress={isRecording? stopRecording : startRecording}  />
                       <UploadVideoButton onPress={uploadVideo} loading = {loading} />
                      
               </View>
              )}
             {!isRecording && (  
                 <>
                               <TouchableOpacity style={styles.buttonContainer} 
                                  className="absolute top-4 right-8"
                                  onPress={()=> {setNewChallenge(false)}}>
                                     <View style={styles.iconWrapper}>
                                     <AntDesign name="close" size={width/20} color="white" /> 
                                     </View>
                               </TouchableOpacity>
                 </>
                             )}
              {!isRecording && (  
              <TouchableOpacity
                           className="flex-col absolute left-8 top-4 justify-center gap-1 items-center  "
                           onPress={toggleCameraFacing}
                                >
                              <Image
                              className="w-10 h-10"
                              source ={icons.flip}
                              resizeMode='contain'
                              />
                              {/* <View className=" flex-col justify-end  ">
                               <Text
                               style={{fontSize:8}}
                               className="text-white text-xs font-black">
                                 Flip
                               </Text>
                              </View>   */}
                              
             </TouchableOpacity> 
              )}

             {isRecording && ( 
             <View 
                     style={{backgroundColor: !isRecording ?"#523c2":"transparent"}}
                     className="absolute bottom-10 w-[100%] flex-col justify-start items-center  bg- opacity-100 ">
                       
                           <RecordingButton  onPress = {stopRecording } loading={loading} />
                           <RecordingTimer timer={timer} />
                         
              </View>
              
             )}
       </>
     )}
</>
)
}

const styles = StyleSheet.create({
buttonContainer: {
flexDirection: 'row', 
alignItems: 'center', 
backgroundColor: 'red', // Example background color
padding: 5,
borderRadius: 50, // For a rounded button
elevation: 3, // For Android shadow effect
shadowColor: '#000', // For iOS shadow
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.3,
shadowRadius: 3,
},
iconWrapper: {
//   marginRight: 10,
},
buttonText: {
color: 'white',
fontSize: 16,
fontWeight: 'bold',
},
});

