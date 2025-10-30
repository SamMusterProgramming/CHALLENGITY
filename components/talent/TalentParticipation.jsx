import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
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
import { _uploadVideoAsync, compressImage, compressVideo, storage, uploadThumbnail } from '../../firebase';
import { BASE_URL } from '../../apiCalls';
import { generateThumbnail } from '../../videoFiles';
import axios from 'axios';
import { deleteObject, getStorage, ref } from 'firebase/storage'


export default function TalentParticipation({talentRoom, setReplayRecording , user, setNewChallenge, setSelectedContestant 
   ,userParticipation,participation , setStage , setTalentRoom , setIsExpired}) {
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
   if(videoUri){
    setReplayRecording(true)
    player.replaceAsync(videoUri).then(()=> {setIsPlaying(true)});
    player.play()
   }
   const makeThumbNail = async () => {
    if(videoUri)
      {
       const imageUrl = await generateThumbnail(videoUri)
       setThumbNailURL(imageUrl.uri)
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
    if (status !== 'granted') {
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

  const startRecording = async() =>{
    setVideoUri(null)
    setReplayRecording(true)
  try {
    setIsRecording(true)
    let options ={
      maxDuration: 120,
    }
     await cameraRef.current.recordAsync(options)
    .then((video)=>{
      setVideoUri(video.uri)
      setIsRecording(false)
    })
  } catch (err) {
    console.log(err)
  }
   }

   const stopRecording = async()=>{
    await  cameraRef.current.stopRecording();
      setIsRecording(false)
      setReplayRecording(false)

     }

   const uploadVideo =async()=>{
    try {
      const permissionGranted = await requestMediaPermissions();
      if (!permissionGranted) return;
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


  const handleSumitChallenge =  () => {
    if(videoUri ){
    //   setVisible(true)  
    //   setTimeout(() => {
    //     router.replace('/Talent')
    //    }, 1500); 
      
    //   setTimeout(() => {
    //     setVisible(false)
    //   }, 1000); 
      setTimeout(() => {
        // setVisible(false)
        setNewChallenge(false)
        setStage(true)
      }, 500); 

       Promise.all([compressVideo(videoUri),compressImage(thumbNailURL)]).then(results => { 
       Promise.all([_uploadVideoAsync(results[0], user.email,user.name),uploadThumbnail(results[1], user.email)])
       .then((urls) => {
        let body = {
          profile_img:user.profile_img,
          user_id : user._id,
          name:user.name,
          video_url : urls[0],
          email:user.email,
          city: user.city,
          country:user.country,
          thumbNail:urls[1],
          room_id:talentRoom._id,
          type:participation
            }
                if(participation == "new" || participation == "queue"){
                  axios.post(BASE_URL +`/talents/uploads/${talentRoom._id}`,body)
                  .then(   
                    res =>  {
                    if(res.data === "challenge expired") return setIsExpired(true)
                        setTalentRoom(res.data)
                        setTimeout(() => {
                            if(participation == "new")
                                {
                               setGlobalRefresh(true)
                               setStage(true)
                               setSelectedContestant({...res.data.contestants.find( c => c.user_id == user._id),rank:res.data.contestants.length})
                               }
                            if(participation == "queue"){
                                setGlobalRefresh(true)
                                setStage(false)
                                setSelectedContestant(null)
                             }
                        }
                        , 500);   
                    }
                    
                      )
                 }
               

                 if(participation == "update" || participation == "qupdate" || participation == "eupdate" ){
                  axios.patch(BASE_URL +`/talents/update/${talentRoom._id}`,body)
                  .then(   
                    res =>  {
                        if(res.data === "challenge expired") return setIsExpired(true)

                          let videoRef = ref(storage , videolURL); 
                          let thumbnailRef = ref(storage , thumbURL); 
                          Promise.all( [deleteObject(videoRef),deleteObject(thumbnailRef)])
                          .then(() => {
                            console.log("both deleted successfully!");
                          })
                          .catch((error) => {
                            console.error("Error deleting file:", error);
                          });  
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
                          
                        //   setTimeout(() => {
                        //     router.navigate({ pathname: '/TalentContestRoom',params: {
                        //         region:talentRoom.region,
                        //         selectedTalent:talentRoom.name, 
                        //         selectedIcon: selectedIcon,
                        //         regionIcon : regionIcon,
                        //         startIntroduction :"false",
                        //         location: participation == "update"? "contest" : "queue" ,
                        //         showGo:"true",
                        //         contestant_id : user._id
                        //       } }) 
                        
                        //   }, 2500); 
                      
                    }
                    
                      )
                 }


              FileSystem.deleteAsync(results[0], { idempotent: true }).then(res=> console.log("file deleted ayhoo"));

          })   
        })   
      }
    }

  return ( 
  <>
  {videoUri ? (
        <>
             <VideoView 
                     style={{ minWidth:'100%' ,minHeight:'100%',opacity:100}}
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
             <View className="absolute bottom-[25vh] px-4 flex-row min-w-full -auto  justify-between  items-center  opacity-85  h-[5vh]">
                     <View className="flex-row w-[30%] mt-auto  bg-wh mb- justify-center  items-center   h- [99%]">   
                         <TouchableOpacity
                         className=" flex-row py-2 justify-center bg-[#920412] gap-2 items-center h- [95%] w-[95%] rounded-xl "
                         // onPress={goBack}  
                         onPress={()=>setIsRecording(false)}   
                         onPressOut={()=> {setVideoUri(null)}}
                             >
                         <Text
                         style={{fontSize:9}}
                         className="text-white text-xs font-black">Cancel</Text>
                         <Image      
                         className="w-5 h-5 "
                         source={icons.back}
                         resizeMode='contain'
                         />  
                         </TouchableOpacity>
                     </View>
                     <View className="flex-row w-[30%]  bg-whi  mb- justify-center  items-center   h- first-letter: [99%]">
                         <TouchableOpacity
                         className="flex-row justify-center py-2 bg-[#04198e] gap-2 items-center h- [95%] w-[95%] rounded-xl"
                           onPress={handleSumitChallenge}
                             >
                         <Image      
                         className="w-5 h-5 "
                         source={isRecording ? icons.submit : icons.submit}
                         resizeMode='contain'
                         />  
                         <Text 
                         style={{fontSize:10}}
                         className="text-white text-xs font-black">{isRecording? "Submit":"Submit"}</Text>
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
               {!isRecording && (
                 <View 
                 style={{backgroundColor: !isRecording ?"#523c2":"transparent"}}
                 className="absolute bottom-[25vh] w-[100%] flex-col justify-start items-center -auto bg- opacity-100 ">
                     <View className="flex-row min-w-full mt-auto  px-8 justify-between  items-center  opacity-85  h-[7vh]">       
                     {!isRecording && (
                       <TouchableOpacity
                           className="flex-col justify-center gap-1 items-center h-[100%]  g-green-500 -[33%] "
                           onPress={isRecording? stopRecording : startRecording}
                           onPressIn={()=>{setReplayRecording(true)}}

                             >
                           <Image    
                           className="w-8 h-8 "
                           source={isRecording ? icons.camera_recording : icons.camera}
                           resizeMode='contain'
                           />
                           <View className="h- [50%] flex-col justify-end  ">
                               <Text
                               style={{fontSize:8}}
                               className="text-white text-xs font-black">
                                 {isRecording? "Recording":"Record "}
                               </Text>
                           </View>      
                       </TouchableOpacity>
                       )}   

                       {!isRecording && (
                       <TouchableOpacity
                           className="flex-col justify-center gap-1 items-center  g-blue-500 h-[100%] -[33%] "
                           onPress={uploadVideo}
                           >     
                           <Image    
                           className="w-9 h-9"
                           source={icons.upload}
                           resizeMode='contain'
                           />
                           <View className="h- [50%] flex-col justify-end  ">
                               <Text 
                             style={{fontSize:8}}
                             className="text-white text-xs font-black">
                               Upload
                             </Text>
                           </View>        
                       </TouchableOpacity>
                       )}    

                     </View>

               </View>
              )}

             {!isRecording && (  
                 <>
                               <TouchableOpacity
                                   className=" absolute   flex-row justify-center    items-center  "
                                   onPress={toggleCameraFacing}
                                     >
                                   <Image
                                   className="w-10 h-10"
                                   source ={icons.flip}
                                   resizeMode='contain'
                                   />
                               </TouchableOpacity>

                               <TouchableOpacity style={styles.buttonContainer} 
                               className="absolute top-[25vh]"
                                  onPress={()=> {setNewChallenge(false)}}>
                                     <View style={styles.iconWrapper}>
                                     <AntDesign name="closecircle" size={30} color="white" /> 
                                     </View>
                               </TouchableOpacity>
                 </>
                             )}


             {isRecording && ( 
             <View 
                     style={{backgroundColor: !isRecording ?"#523c2":"transparent"}}
                     className="absolute bottom-[15vh] w-[100%] flex-col justify-start items-center  bg- opacity-100 ">
                           {isRecording && (   
                             <View
                               className="flex-row justify-center   items-end h-[100%] w-[33%] ">   
                               <Text 
                                 style={{fontSize:10}}
                                 className="text-white text-xl">Recording</Text>
                           </View>
                           )}
                           {isRecording && (   
                             <TouchableOpacity
                               className="flex-row justify-center gap-2 items-center h-[100%] w-[33%] "
                               onPress={ stopRecording }
                                 >
                               <Image    
                               className="w-10 h-10 "
                               source={ icons.camera_recording }
                               resizeMode='contain'
                               />
                             </TouchableOpacity>
                           )}  
                     
                           {isRecording && ( 
                           <View
                               className="flex-row justify-center   items-end h-[100%] w-[33%] ">   
                               <Text 
                                   style={{fontSize:10}}
                                   className="text-white text-xl">{formatTime(timer)}</Text>
                           </View>
                           )}
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