import { View, Text, TouchableOpacity, Image, useWindowDimensions, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import SwingingTitle from '../components/custom/SwingingTitle';
import { Video } from 'expo-av';
import { useGlobalContext } from '../context/GlobalProvider';
import { useKeepAwake } from 'expo-keep-awake';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../constants';
import * as ImagePicker from 'expo-image-picker';
import LoadModel from '../components/custom/LoadModal';
import * as FileSystem from 'expo-file-system';
import { _uploadVideoAsync, compressImage, compressVideo, uploadThumbnail } from '../firebase';
import { generateThumbnail, saveVideoLocally } from '../videoFiles';
import { BASE_URL, getUserPrivateChallenges, getUserPublicChallenges } from '../apiCalls';
import axios from 'axios';
import { clearCache } from 'react-native-compressor';


export default function RecordChallenge() {
  const { description,challengeType , challengePrivacy, challengeMode ,invited_friends} =  useLocalSearchParams(); 
  const invites =  JSON.parse(invited_friends);
  

  const{user,setParticipateChallenges,setUserPublicChallenges,setUserPrivateChallenges,userFriendData} = useGlobalContext()
  const [permission, requestPermission] = useCameraPermissions()
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();

  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('back');
  const [videoUri, setVideoUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [play,setPlay] = useState(false)

  const [challenge,setChallenge] = useState(null)

  const videoRef = useRef();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const [action, setAction] = useState("");
  const [text,setText] = useState("")

  const [invitedFriends,setInvitedFriends] = useState([])


  const [bgPrivacyColor ,setBgPrivacyColor] = useState("blue")
  const [selectedAudience, setSelectedAudience] = useState("Open");
  const [thumbNailURL,setThumbNailURL] = useState(null)
  const{width ,height} = useWindowDimensions()
  let intervalId = useRef(null);


  const [timer, setTimer] = useState(0);
  useKeepAwake();



  const requestMediaPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };


  useEffect(() => {
    if(!videoUri) setIsRecording(false)
  }, [videoUri])


  useEffect(  () => {
      return () => {
        console.log("cleaning up")
        if (videoRef.current) {
          videoRef.current.stopAsync().then(() => {
            videoRef.current.unloadAsync();
          });}
        if (cameraRef.current) {
          cameraRef.current.pausePreview();
        }
        videoUri && deleteVideo(videoUri)
        setVideoUri(null)
      };
},[])
  // );

  async function deleteVideo(videoUri) {
    try {
        await FileSystem.deleteAsync(videoUri, {
            permanent: true,
        });
        console.log('Video file deleted successfully');
    } catch (error) {
        console.error('Error deleting video file:', error);
    }
}

  useEffect(() => {
    requestPermission()
    requestAudioPermission()
    // }
  }, [])
  
  useEffect(() => {
   
    const frs = []
     userFriendData.friends.forEach(friend=> {
      if(invites.find(invites => invites.sender_id == friend.sender_id) )
        {
         frs.push(friend)
        }
    })
    setInvitedFriends([...frs])
   
  }, [])
 
  

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

 
  const startRecording = async() =>{
    setVideoUri(null)
  try {
    setIsRecording(true)
    let options ={
      maxDuration: 150,
    }
     await cameraRef.current.recordAsync(options)
    .then(async(video)=>{
      setVideoUri(video.uri)
      // const imageUrl = await generateThumbnail(video.uri)
      // setThumbNailURL(imageUrl.uri)
      setIsRecording(false)
    })
  } catch (err) {
    console.log(err)
  }
    
   }
  
  const stopRecording = async()=>{
  await  cameraRef.current.stopRecording();
    setIsRecording(false)
   }

   useEffect(() => {
     const makeThumbNail = async () => {
      if(videoUri)
        {
         const imageUrl = await generateThumbnail(videoUri)
         setThumbNailURL(imageUrl.uri)
        }
     }
     makeThumbNail()
  }, [videoUri])

  // useEffect(() => {
  //   if(timer == 149000)
  //   {
  //     setIsRecording(false)
  //   }

  // }, [timer])
  

  const goBack = ()=> {
     setVideoUri(null)
  }

  

  
  const handleSumitChallenge =  async() => {

    if(videoUri ) { 
      setVisible(true)  
     
      setTimeout(() => {
        router.replace({ pathname: '/UserChallenges',params: {
        userChallenges:"true",
        userParticipations:"false",
        publ:challengePrivacy == "Public" ? "true":"false",
        priv:challengePrivacy === "Private" && challengeMode !== "Strict" ? "true" : "false",
        strict :challengePrivacy === "Private" && challengeMode === "Strict"  ?"true" : "false", 
                  } }) 
                }, 800);  
      // setTimeout(() => {
      //   router.navigate({ pathname: '/challengeManagement',params: {
      //   priv:challengePrivacy == "Private"?"true":"false",
      //   publ:challengePrivacy === "Public" && challengeMode !== "Strict" ? "true":"false",
      //   strict :challengePrivacy === "Private" && challengeMode === "Strict"  ?"true":"false" , 
      //             } }) 
      setTimeout(() => {
        setVisible(false)
      }, 1000);
      
    //  const imageThumbnailUri = await uploadThumbnail(thumbNailURL, user.email)
      Promise.all([compressVideo(videoUri),compressImage(thumbNailURL)]).then(results => {
        setThumbNailURL(null)
        setVideoUri(null)
        Promise.all([_uploadVideoAsync(results[0] , user.email,user.name),uploadThumbnail(results[1], user.email)])  //_uploadVideoAsync(results[0] , user.email,user.name)
          .then(async(urls) => {
            await saveVideoLocally(urls[0])
            videoUri && await  deleteVideo(videoUri)
            let challengeBody = {
              origin_id : user._id ,
              description: description,
              profile_img:user.profile_img,
              user_id : user._id,
              type:challengeType,
              privacy:challengePrivacy,
              name:user.name,
              video_url : urls[0],
              email:user.email,
              friendList:invitedFriends,
              audience:challengeMode,
              thumbNail: urls[1]
          
            }
  
            axios.post( BASE_URL + '/challenges/uploads', challengeBody).then( 
                res =>  {   

                  challengePrivacy == "Public"? getUserPublicChallenges(user._id ,setUserPublicChallenges):                    
                                              getUserPrivateChallenges(user._id ,setUserPrivateChallenges)                
                  setTimeout(() => {
                        setVideoUri(null)
                        router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:res.data._id} })
                  }, 1000);
                      

                } )


          }).catch(error => {
                 console.log(error)
          }).finally (async()=>{
            FileSystem.deleteAsync(results[0], { idempotent: true }).then(res => console.log("file deleted "));
            FileSystem.deleteAsync(results[1], { idempotent: true }).then(res => console.log("file deleted "));
            await clearCache();
          }
          )


            // FileSystem.deleteAsync(results[0], { idempotent: true }).then(res => console.log("file deleted "));
            // FileSystem.deleteAsync(results[1], { idempotent: true }).then(res => console.log("file deleted "));


     })



        
        }; 
      }

  const confirmDescription = () => {
    setIsModalVisible(true)
    setAction("OK")
    setText("Add a Description to your challenge to continue")
       
      };

  const confirmPrivacy = () => {

    setIsModalVisible(true)
    setAction("OK")
    setText("You select private challenge , please select at least one friend to Continue")
       
      };
        
      

  const uploadVideo = async()=>{
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



  useEffect(() => {
    if (isRecording) {
      intervalId.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalId.current);
      setTimer(0);
    }
    return () => clearInterval(intervalId.current);
  }, [isRecording]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const getIcon = (type) => {
    switch(type) {
      case "Public":
        return icons.publi
       break;
      case "Private":
        return icons.priv
       break;

       case "Open":
        return icons.open
       break;
      case "Restricted":
        return icons.restricted
       break;
       case "Strict":
        return icons.strict
       break;

      case "Adventure":
         return icons.adventure
        break;
      case "Dance":
         return icons.dance 
        break;
      case "Eating":
          return icons.eating 
         break;
      case "Fitness":
          return  icons.fitness 
         break;
      case "Magic":
        return icons.magic 
          break;
      case "Music":
        return icons.music 
           break;
      case "Science":
          return icons.science
           break;
      case "Sport":
           return icons.sport
           break;
      case "Game":
          return icons.game
          break;
      case "Diet":
          return icons.diet
          break;
      default:
        // setIcon("gray")
    }
  }
  
  return (
    <>
           
    <SafeAreaView
         className="flex-1 bg-primary">           
         {videoUri ? (
        <View 
        className=" flex-1 flex-column bg-black justify-start  items-center ">
         
          <Video
            ref={videoRef}
            className={ play ? "opacity-100":"opacity-10 rounded-tl-full rounded-tr-full" }
            style={{minWidth:'100%',minHeight:'100%',position:'relative' ,opacity: !play ? 0.3 :100 }}
            source={{uri: play ? videoUri :  videoUri}}
            shouldPlay={play}
            isMuted={false}
            useNativeControls={false}
            isLooping
            resizeMode='cover'
            />


          <View className="min-w-full min-h-full absolute top-0 flex-col  justify-start  items-center  ">
           
           {!play && (
               <>
                   <View className="min-w-full h-[6vh] rounded-tl-full rounded-tr-full flex-row justify-center items-center bg-[#e0a607]">
                               
                                 <View 
                                     className="w-[100%]  min-h-[95%] rounded-md bg-s  flex-row justify-evenly  items-center ">
                                       <Text className="text-white text-sm  font-bold ">
                                           New Challenge
                                       </Text>
                               </View>          
                   </View>

                   <View className="w-[100%] h-[6vh]  bg-[#151f36] flex-row justify-center items-center rounded-lg  ">
                       <SwingingTitle color="white" fontSize={12} text={description} />
                   </View>

                   <View className="w-[100%] h-[16%] px-2   flex-row justify-center gap-2 items-center">
                                 <View
                                  className="w-[33%] h-[90%] flex-col justify-center gap- items-center">
                                     <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                            {/* <Text className="text-gray-400 text-sm font-bold">
                                                TYPE : {''}
                                            </Text> */}
                                            <Text 
                                               style={{fontSize:10}}
                                                className="text-white font-black"> 
                                                {challengeType}
                                            </Text>

                                    </View>
                                     
                                     <Image
                                     source={getIcon(challengeType)}
                                     resizeMethod='contain'
                                     style={{width:width/6, height:width/6}}
                                     className="w-[95%] h-[70%]" />
                                 </View>
                                 <View
                                  className="w-[33%] h-[90%] flex-col justify-center gap-2 items-center">
                                     <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                            
                                            <Text 
                                                style={{fontSize:10}}
                                                className="text-white font-black"> 
                                                {challengePrivacy}
                                            </Text>

                                    </View>
                                     
                                     <Image
                                     source={getIcon(challengePrivacy)}
                                     resizeMethod='contain'
                                     style={{width:width/6, height:width/6}}
                                     className="w-[95%] h-[70%]" />
                                 </View>

                                 <View
                                    className="w-[33%] h-[100%] flex-col justify-center gap-2 items-center">
                                        <View
                                                className=" w-[100%] h-[20%] flex-row justify-center items-center">
                                                <Text className="text-gray-400 text-xs font-bold">
                                                  
                                                </Text>
                                                <Text className="text-white text-xs font-black"> 
                                                    {challengeMode}
                                                </Text>

                                        </View>
                                        <Image
                                                source={getIcon(challengeMode)}
                                                resizeMethod='cover'
                                                style={{width:width/6, height:width/6}}
                                                className=" rounded-full bg-white" />
                                       
                                 </View>
                   </View>

                   {/* <View className="w-[100%] h-[15%] px-2  flex-row justify-center items-center">
                                  <View
                                    className="w-[50%] h-[100%] flex-col justify-center gap-2 items-center">
                                        <View
                                                className=" w-[100%] h-[20%] flex-row justify-center items-center">
                                                <Text className="text-gray-400 text-xs font-bold">
                                                  
                                                </Text>
                                                <Text className="text-white text-xs font-black"> 
                                                    {challengeMode}
                                                </Text>

                                        </View>
                                        <Image
                                                source={getIcon(challengeMode)}
                                                resizeMethod='cover'
                                                style={{width:width/6, height:width/6}}
                                                className=" rounded-full bg-white" />
                                       
                                 </View>
                                 
                   </View> */}

                   <TouchableOpacity onPress={()=>setPlay(!play)}
                        hitSlop={{ top: 300, bottom: 300, left: 400, right: 400 }}
                        style={{bottom:height/5, left:0}}
                        className="absolute  w-[100%] h-[15%] flex-row justify-center gap-1 items-center">
                          <Text  className="text-blue-400 font-black "
                                  style={{fontSize:25}}>
                                    {!play? "PL" : ""} 
                            </Text>
                            <Image source={!play? icons.play : icons.play}
                            className={!play? "w-12 h-12 rounded-full": "w-14 h-14 opacity-35 rounded-full"} /> 
                            <Text  className="text-blue-400 font-black "
                                    style={{fontSize:25}}>
                                        {!play? "AY" : ""} 
                            </Text>
                  </TouchableOpacity>     

                   {challengePrivacy == "Private" &&  (
                   <View className="w-[100%] h-[30%] px-2 mt-10 flex-row justify-center items-center">
                              <View
                                className="w-[80%] h-[100%] flex-col justify-center gap-1 items-center">
                                      
                                      <View
                                        className=" w-[100%] h-[20%] flex-row justify-center items-center">
                                           <Text className="text-white text-sm font-bold">
                                                   {invitedFriends.length}{'  '}
                                           </Text>
                                           <Text
                                             style={{fontSize:12}} 
                                             className="text-blue-200 text-sm font-black"> 
                                                   Invites
                                           </Text>

                                      </View>
                      
                                      <View
                                      className=" w-[100%] h-[80%] px-3 flex-row flex-wrap justify-center items-center">
                                       {invitedFriends.map((invite,index)=> {
                                             return (
                                            <View key={index}
                                             style={{width:width/6, height:width/6}}
                                             className="  flex-col justify-evenly items-center">
                                               <Image
                                              source={{uri:invite.profile_img}}
                                              resizeMethod='cover'
                                              style={{width:width/10, height:width/10}}
                                              className=" rounded-full " />
                                               <Text
                                                       className="text-white font-black "
                                                       style={{fontSize:9}}>
                                                           {invite.name.slice(0,6)} 
                                               </Text>
                                            </View>
                                             )
                                       })}
                                     </View>
                              </View>       

                   </View>
                   )}
              
            
               </>
               
            )}

              {play && (
                 <TouchableOpacity onPress={()=>setPlay(!play)}
                        hitSlop={{ top: 300, bottom: 300, left: 400, right: 400 }}
                        className="top-96 -right-50 flex-row justify-center gap-1 items-center">
                         
                            <Image source={play? "" : ""}
                            className={!play? "w-12 h-12 rounded-full": "w-14 h-14 opacity-35 rounded-full"} /> 
                            
                  </TouchableOpacity>     
              )}  

           <View className="flex-row min-w-full mt-auto  justify-between  items-center  opacity-85  h-[7vh]">
              <View className="flex-row w-[40%] mt-auto  bg-wh mb- justify-center  items-center   h-[99%]">   
                <TouchableOpacity
                   className=" flex-row  justify-center bg-red-500 gap-2 items-center h-[95%] w-[95%] rounded-bl-[38px] "
                   // onPress={goBack}  
                   onPress={()=>setIsRecording(false)}   
                   onPressOut={()=> {setVideoUri(null)}}
                     >
                   <Text
                   style={{fontSize:width/30}}
                   className="text-white text-xs font-bold">Go Back</Text>
                   <Image      
                   className="w-10 h-10 "
                   source={icons.back}
                   resizeMode='contain'
                   />  
                </TouchableOpacity>
              </View>
              <View className="flex-row w-[40%]  bg-whi  mb- justify-center  items-center   h-[99%]">
                <TouchableOpacity
                   className="flex-row justify-center bg-blue-600 gap-2 items-center h-[95%] w-[95%] rounded-br-[38px]"
                   onPress={handleSumitChallenge}
                     >
                   <Image      
                   className="w-10 h-10 "
                   source={isRecording ? icons.submit : icons.submit}
                   resizeMode='contain'
                   />  
                   <Text 
                   style={{fontSize:width/30}}
                   className="text-white text-xs font-bold">{isRecording? "Submit":"Submit"}</Text>
                </TouchableOpacity>
              </View>  
           </View>


           </View>
           
        
           {visible && (
               <LoadModel visible={visible} setVisible={setVisible}
              />
        )}
        
         
                     
       </View>
         ):

         (
         
      <CameraView ref={cameraRef} videoQuality="720p"  
         mode='video'    
         facing={facing}    
         style={{flex:1}}
         >
          
           <View className="w-full   min-h-[100%]  flex-col justify-start  items-center "
                                         >

                 {!isRecording &&
                   (
                   <>
                   <View className="min-w-full  rounded-md opacity-100  flex-row items-center justify-between h-[5vh]"
                             >
                                 <TouchableOpacity
                                       onPress={() => router.back()}
                                       className="w-[10%] h-[95%]  flex-col justify-center  items-center">
                                       <Image
                                       className="w-9 h-9 "
                                       source={icons.back1} />
                                 </TouchableOpacity>
                                 <View 
                                   className="w-[90%]  min-h-[95%] rounded-md bg-s  flex-row justify-center  items-end  ">
                                     <Text className="text-white text-md  font-bold ">
                                     New Challenge
                                     </Text>
                                 </View> 
                  </View>  
                     
                 </>

                   )}

        <View 
        style={{backgroundColor: !isRecording ?"#523c27":"transparent"}}
        className=" w-[100%] flex-col justify-start items-center mt-auto bg-amber-800  opacity-100 ">
             <View className="flex-row min-w-full mt-auto   justify-between  items-center  opacity-85  h-[7vh]">
              
             {!isRecording && (
               <TouchableOpacity
                   className="flex-row justify-center gap-2 items-center h-[100%] w-[33%] "
                   onPress={isRecording? stopRecording : startRecording}
                    >
                   <Image    
                   className="w-10 h-10 "
                   source={isRecording ? icons.camera_recording : icons.camera}
                   resizeMode='contain'
                   />
                   <View className="h-[50%] flex-col justify-end  ">
                       <Text
                       style={{fontSize:10}}
                       className="text-white text-xs font-black">
                         {isRecording? "Recording":"Record "}
                       </Text>
                   </View>      
               </TouchableOpacity>
              )}   

              {!isRecording && (
               <TouchableOpacity
                  className="flex-row justify-center gap-2 items-center h-[100%] w-[33%] "
                  onPress={uploadVideo}
                   >     
                  <Image    
                  className="w-12 h-12 "
                  source={icons.upload}
                  resizeMode='contain'
                  />
                   <View className="h-[50%] flex-col justify-end  ">
                       <Text 
                     style={{fontSize:10}}
                     className="text-white text-xs font-black">
                       Upload
                     </Text>
                  </View>        
              </TouchableOpacity>
              )}    
             

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
         
               {isRecording && (   <View
                   className="flex-row justify-center   items-end h-[100%] w-[33%] ">   
                   <Text 
                      style={{fontSize:10}}
                      className="text-white text-xl">{formatTime(timer)}</Text>
               </View>
               )}
             </View>


           </View>

           {!isRecording && (  
              <TouchableOpacity
                  className="flex-row justify-center absolute top-2 right-2  items-center  "
                  onPress={toggleCameraFacing}
                    >
                  <Image
                  className="w-12 h-12"
                  source ={icons.flip}
                  resizeMode='contain'
                  />
              </TouchableOpacity>
             )}
    



          </View>

          {isModalVisible && (
             <CustomAlert text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
        )}

       </CameraView>   


         )
       }

         
        {/* {visible && (
               <LoadModel visible={visible} setVisible={setVisible}
              />
        )} */}

       </SafeAreaView>
     
   
        
</>
  )
}