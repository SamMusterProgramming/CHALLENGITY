import { View, Text, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera'
import { icons } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { formatTime } from '../../helper';
import { useKeepAwake } from 'expo-keep-awake';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import {demo} from "../../assets/video/demo1.mp4"
import { AntDesign } from '@expo/vector-icons';
import { _uploadVideoAsync, compressImage, compressVideo, uploadThumbnail } from '../../firebase';
import axios from 'axios';
import { generateThumbnail } from '../../videoFiles';
import { BASE_URL, getChallengeById, getUserPublicParticipateChallenges } from '../../apiCalls';
import { useGlobalContext } from '../../context/GlobalProvider';


export default function ChallengeParticipation({challenge , setReplayRecording , user, setNewChallenge, setSelectedParticipant 
    , setStage , setChallenge , setIsExpired}) {
  const {setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,notifications ,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
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
      // setVisible(true)
    //   setTimeout(() => {
    //     router.replace({ pathname: '/UserChallenges',params: {
    //     userChallenges:"false",
    //     userParticipations:"true",
    //     publ:challenge.privacy === "Public"? "true":"false",
    //     priv:challenge.privacy == "Private" && challenge.audience !== "Strict" ?"true":"false",
    //     strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" , 
    //    } }) 
    //    }, 100); 
      // setTimeout(() => {
      //    router.navigate({ pathname: '/ParticipationManagement',params: {
      //    publ:challenge.privacy === "Public"? "true":"false",
      //    priv:challenge.privacy == "Private" && challenge.audience !== "Strict" ?"true":"false",
      //    strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" , 
      //   } }) 

      setTimeout(() => {
        // setVisible(false)
        setNewChallenge(false)
        setStage(true)
      }, 100); 

      Promise.all([compressVideo(videoUri),compressImage(thumbNailURL)]).then(results => { 
        Promise.all([_uploadVideoAsync(results[0], user.email,user.name),uploadThumbnail(results[1], user.email)])
      .then((urls) => {
        let challengeBody = {
          origin_id : user._id ,
          description : challenge.desc,
          profile_img : user.profile_img,
          user_id : user._id,
          type:challenge.type,
          privacy:challenge.privacy,
          name:user.name,
          video_url : urls[0],
          email:user.email,
          thumbNail : urls[1]
            }
        
           axios.post(BASE_URL +`/challenges/uploads/${challenge._id}`,challengeBody)
          .then(   
            res =>  {
            if(res.data === "challenge expired") return setIsExpired(true) 

            // getUserPublicParticipateChallenges(user._id ,setPrivateParticipateChallenges)
            // getChallengeById(challenge._id, setChallenge , setIsExpired)
            setChallenge(res.data)
            // setSelectedParticipant({...res.data.participants.find( c => c.user_id == user._id),rank:res.data.participants.length + 1})
            setTimeout(() => {
                // setNewChallenge(false)
                // setStage(true)
                // setSelectedParticipant({...res.data.participants.find( c => c.user_id == user._id),rank:res.data.participants.length + 1})
                // getChallengeById(challenge._id, setChallenge , setIsExpired)
                setSelectedParticipant({...res.data.participants.find( c => c.user_id == user._id),rank:res.data.participants.length})
              }
            , 500);
            }
             
              )
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
                                className=" flex-row py-4 justify-center bg-[#920412] gap-2 items-center h- [95%] w-[95%] rounded-bl-[38px] "
                                // onPress={goBack}  
                                onPress={()=>setIsRecording(false)}   
                                onPressOut={()=> {setVideoUri(null)}}
                                    >
                                <Text
                                style={{fontSize:10}}
                                className="text-white text-xs font-black">Cancel</Text>
                                <Image      
                                className="w-7 h-7 "
                                source={icons.back}
                                resizeMode='contain'
                                />  
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row w-[30%]  bg-whi  mb- justify-center  items-center   h- first-letter: [99%]">
                                <TouchableOpacity
                                className="flex-row justify-center py-4 bg-[#04198e] gap-2 items-center h-[95%] w-[95%] rounded-br-[38px]"
                                  onPress={handleSumitChallenge}
                                    >
                                <Image      
                                className="w-7 h-7 "
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