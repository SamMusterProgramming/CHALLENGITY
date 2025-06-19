import { View, Text, TouchableOpacity, Image, useWindowDimensions, Alert, ScrollView } from 'react-native'
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
import { getInition } from '../helper';
// import { clearCache } from 'react-native-compressor';


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

  const [invitedFriends,setInvitedFriends] = useState(null)


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
    setInvitedFriends({invites:frs})
   
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
              friendList:invitedFriends ? invitedFriends.invites : [] ,
              audience:challengeMode,
              thumbNail: urls[1]
          
            }
  
            axios.post( BASE_URL + '/challenges/uploads', challengeBody).then( 
                res =>  {   

                  challengePrivacy == "Public"? getUserPublicChallenges(user._id ,setUserPublicChallenges):                    
                                              getUserPrivateChallenges(user._id ,setUserPrivateChallenges)                
                  setTimeout(() => {
                        setVideoUri(null)
                        // router.navigate({ pathname: '/CoverChallengePage', params: {challenge_id:res.data._id} })
                        router.push({ pathname: '/FSinstantChallengeDisplayer', params: {
                          challenge_id:res.data._id
                         } })

                  }, 1000);
                      

                } )


          }).catch(error => {
                 console.log(error)
          }).finally (async()=>{
            FileSystem.deleteAsync(results[0], { idempotent: true }).then(res => console.log("file deleted "));
            FileSystem.deleteAsync(results[1], { idempotent: true }).then(res => console.log("file deleted "));
            // await clearCache();
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
         className="flex-1 bg-primary h-[100vh] ">           
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

              <View
                  className = "min-w-[100%] h-[5%] gap- rounded-tl-x rounded-tr-x flex-row justify-start items-center px-1 bg-[white]">
                      
                      <TouchableOpacity
                          className="w-[8%] h-[100%] justify-center g-[#eb0a0a] px-1 py-1 rounded-xl items-center opacity  "
                          onPressIn={()=> router.back()}
                          >
                            <Image   
                             source={icons.x}
                             className=" w-7 h-7 rounded-full"
                             />
                     </TouchableOpacity>
                     <View
                     className = "w-[35%] h-[80%] rounded-xl flex-row justify-center items-center px- g-[#fffefd]">
                            <View className = "px-2 py-1 w-[100%] flex-row justify-center gap-2 items-center">
                                   <Image 
                                    className={ "rounded-full w-7 h-7"}
                                    source={ {uri:user.profile_img} }
                                    resizeMode='cover'
                                    />
                                     <View className="justify-center py-1  items-start h-[80%] flex-col ">
                                                   
                                                   <Text className="font-pmedium  text-sm text-black">
                                                       <Text 
                                                       style={{fontSize:width<= 330? 7:7}}
                                                       className="font-black text-sm text-black">
                                                           {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                                                       </Text> 
                                                   </Text>
                                                   <Text 
                                                       style={{fontSize:width<= 330? 8:7}}
                                                       className=" text-sm text-blue-400 font-black">
                                                       {getInition(user.name)}Challenger
                                                   </Text>
                                     </View>
                            </View>
                         
                     </View>
                     <View
                     className = "w-[55%] h-[100%] flex-row justify-center items-center px- g-[#de8124]">
                        
                         <Text 
                               style={{fontSize:16}}
                               className=" text-sm text-blue-900 mt-1 font-black">
                                  NEW CHALLENGE
                          </Text>
                        
                     </View>
    
                 </View>

                 <View
                  className = "min-w-[100%] h-[40%] gap- flex-row justify-between mt-auto items-center px- ">
                      <View
                      className = "w-[10%] h-[100%] flex-col justify-start items-center px- py-8 bg-[white] g-white">
                            <TouchableOpacity
                                // onPress={handleChallengeCompetitionDescrition}
                                className = "px-0 py- h-[25%] flex-col justify-start gap- items-center">
                                    <Image 
                                            className={ "rounded-full w-7 h-7"}
                                            source={icons.newChallenge }
                                            resizeMode='cover'
                                            />
                                    <Text 
                                                    style={{fontSize:width<= 330? 6:6}}
                                                    className=" text-sm text-blue-400 mt-1 font-black">
                                                    Challenge
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                // onPress={ handleTypeDescrition }
                                className = "px-0 py- h-[25%] flex-col justify-start gap- items-center">
                              
                                    <Image
                                    source={getIcon(challengeType)}
                                    resizeMethod='contain'
                                    // style={{width:width/8, height:width/8}}
                                    className="w-7 h-7 rounded-full" /> 
                                    <Text 
                                        style={{fontSize:6}}
                                        className="text-black mt-1 font-black"> 
                                            {challengeType}
                                    </Text>

                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                // onPress={ handlePrivacyDescrition }
                                className = "px- py- h-[25%] flex-col justify-center gap- items-center">
                                    <Image 
                                            className={ "rounded-full w-7 h-7"}
                                            source={challengePrivacy == "Public" ?icons.publi : icons.priv }
                                            resizeMode='contain'
                                            />
                                    <Text 
                                                    style={{fontSize:width<= 330? 6:7}}
                                                    className=" text-sm text-red-400 mt-1 font-black">
                                                    {challengePrivacy == "Public" ? "Public" : "Private" }
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                // onPress={handleAudienceDescrition}
                                className = "px- py- h-[25%] flex-col justify-center gap- items-center">
                                    <Image 
                                            className={ "rounded-full w-7 h-7"}
                                            source={challengeMode == "Open" ? icons.open:
                                                challengeMode == "Restricted" ? icons.restricted : icons.strict }
                                            resizeMode='cover'
                                            />
                                    <Text 
                                                    style={{fontSize:width<= 330? 6:7}}
                                                    className=" text-sm text-blue-400 mt-1 font-black">
                                                    {challengeMode}
                                    </Text>
                            </TouchableOpacity>

                  </View> 

                  <View
                        className = "min-w-[10%] h-[100%] flex-col justify-end items-center py-4 px- bg-[#f8f1f1]">
                            <View
                                className = "w-[98%] h-[100%] flex-col rounde-tl-xl rounde-tr-xl  justify-between items-center py-2 px- ">
                                    <TouchableOpacity
                                    // onPress={handleInviteDescrition}
                                    className = " w-[100%] h-[15%] flex-col justify-center gap- items-center">
                                        <Image 
                                                className={ "rounded-full w-7 h-7"}
                                                source={ icons.invites }
                                                resizeMode='cover'
                                                />
                                        <Text 
                                                        style={{fontSize:width<= 330? 8:8}}
                                                        className=" text-sm text-blue-400 mt- font-black">
                                                        {invitedFriends && invitedFriends.invites.length }
                                        </Text>
                                    </TouchableOpacity>
                                    <ScrollView className = "w-[100%] max-h-[82%] flex-col justif-center gap- bg-[#e5f8f9] ite-center">
                                              {invitedFriends && invitedFriends.invites.map((participant, index)=> {
                                                    return(
                                                    <View key={index} className = " w-[100%]  flex-col justify-center py-1 items-center">
                                                            <Image 
                                                              className={ "rounded-full w-7 h-7"}
                                                              source={ {uri:participant.profile_img} }
                                                              resizeMode='cover'
                                                            />
                                                            <Text 
                                                              style={{fontSize:width<= 330? 7:7}}
                                                              className=" text-sm text-black mt- font-black">
                                                             {participant.name.slice(0,6)}
                                                            </Text>
                                                    </View>)
                                              })}   
                                    </ScrollView>
                            </View>
                        </View>

                </View>

               
                <View
                   className = "w-[100%] h-[5%] px-2 py-1 flex-row rounded-bl-xl rounded-br-xl justify-center items-center px- bg-[#f1f5f6]">
                                                {/* <View className = "w-[90%] h-[80%] px-2 py-1 flex-row justify-center rounde-lg items-center bg-[#d9d7d4]"> */}
                      <SwingingTitle text={description} color="black" fontSize={13} />
                                                {/* </View> */}
                 </View>

                  
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

            
               </>
               
            )}

              {play && (
                 <TouchableOpacity onPress={()=>setPlay(!play)}
                        hitSlop={{ top: 300, bottom: 200, left: 400, right: 400 }}
                        className="top-96 -right-50 flex-row justify-center gap-1 items-center">
                         
                            <Image source={play? "" : ""}
                            className={!play? "w-12 h-12 rounded-full": "w-14 h-14 opacity-35 rounded-full"} /> 
                            
                  </TouchableOpacity>     
              )}  

         {!play && (
           <View className="absolute top-[6vh] flex-row min-w-full -auto  justify-between  items-center  opacity-85  h-[5vh]">
                      <View className="flex-row w-[30%] mt-auto  bg-wh mb- justify-center  items-center   h-[99%]">   
                        <TouchableOpacity
                          className=" flex-row  justify-center bg-white gap-2 items-center h-[95%] w-[95%] rounded-bl-[38px] "
                          // onPress={goBack}  
                          onPress={()=>setIsRecording(false)}   
                          onPressOut={()=> {setVideoUri(null)}}
                            >
                          <Text
                          style={{fontSize:width/40}}
                          className="text-red-600 text-xs font-bold">Go Back</Text>
                          <Image      
                          className="w-7 h-7 "
                          source={icons.back}
                          resizeMode='contain'
                          />  
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row w-[30%]  bg-whi  mb- justify-center  items-center   h-[99%]">
                        <TouchableOpacity
                          className="flex-row justify-center bg-white gap-2 items-center h-[95%] w-[95%] rounded-br-[38px]"
                          onPress={handleSumitChallenge}
                            >
                          <Image      
                          className="w-7 h-7 "
                          source={isRecording ? icons.submit : icons.submit}
                          resizeMode='contain'
                          />  
                          <Text 
                          style={{fontSize:width/40}}
                          className="text-blue-700 text-xs font-bold">{isRecording? "Submit":"Submit"}</Text>
                        </TouchableOpacity>
                      </View>  
                 </View>
         )}


           </View>
           
        
           {visible && (
               <LoadModel visible={visible} setVisible={setVisible}
              />
        )}
        
         
                     
       </View>
         ):

         ( 
       <View  className="flex-1">  
      <CameraView ref={cameraRef} videoQuality="720p"  
         mode='video'    
         facing={facing}    
         style={{minWidth:'100%',minHeight:'100%'}}
         className="fle"
         />
          
           <View className="absolute top- w-full h-full  min-h-[100%]  flex-col justify-start  items-center "
                                         >

                 {!isRecording &&
                   (
                   
                <>
                  <View
                  className = "min-w-[100%] h-[5%] gap- rounded-tl-x rounded-tr-x flex-row justify-start items-center px-1 bg-[white]">
                      
                      <TouchableOpacity
                          className="w-[8%] h-[100%] justify-center g-[#eb0a0a] px-1 py-1 rounded-xl items-center opacity  "
                          onPressIn={()=> router.back()}
                          >
                            <Image   
                             source={icons.x}
                             className=" w-7 h-7 rounded-full"
                             />
                     </TouchableOpacity>
                     <View
                     className = "w-[35%] h-[80%] rounded-xl flex-row justify-center items-center px- g-[#fffefd]">
                            <View className = "px-2 py-1 w-[100%] flex-row justify-center gap-2 items-center">
                                   <Image 
                                    className={ "rounded-full w-7 h-7"}
                                    source={ {uri:user.profile_img} }
                                    resizeMode='cover'
                                    />
                                     <View className="justify-center py-1  items-start h-[80%] flex-col ">
                                                   
                                                   <Text className="font-pmedium  text-sm text-black">
                                                       <Text 
                                                       style={{fontSize:width<= 330? 7:7}}
                                                       className="font-black text-sm text-black">
                                                           {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                                                       </Text> 
                                                   </Text>
                                                   <Text 
                                                       style={{fontSize:width<= 330? 8:7}}
                                                       className=" text-sm text-blue-400 font-black">
                                                       {getInition(user.name)}Challenger
                                                   </Text>
                                     </View>
                            </View>
                         
                     </View>
                     <View
                     className = "w-[55%] h-[100%] flex-row justify-center items-center px- g-[#de8124]">
                        
                         <Text 
                               style={{fontSize:16}}
                               className=" text-sm text-blue-900 mt-1 font-black">
                                  NEW CHALLENGE
                          </Text>
                        
                     </View>
    
                 </View>


                 <View
                  className = "min-w-[100%] h-[40%] mt-auto gap- flex-row justify-between items-center px- ">

                      <View
                      className = "w-[10%] h-[100%] flex-col justify-start items-center px- py-8 bg-[white] g-white">
                            <TouchableOpacity
                                // onPress={handleChallengeCompetitionDescrition}
                                className = "px-0 py- h-[25%] flex-col justify-start gap- items-center">
                                    <Image 
                                            className={ "rounded-full w-7 h-7"}
                                            source={icons.newChallenge }
                                            resizeMode='cover'
                                            />
                                    <Text 
                                                    style={{fontSize:width<= 330? 6:6}}
                                                    className=" text-sm text-blue-400 mt-1 font-black">
                                                    Challenge
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                // onPress={ handleTypeDescrition }
                                className = "px-0 py- h-[25%] flex-col justify-start gap- items-center">
                              
                                    <Image
                                    source={getIcon(challengeType)}
                                    resizeMethod='contain'
                                    // style={{width:width/8, height:width/8}}
                                    className="w-7 h-7 rounded-full" /> 
                                    <Text 
                                        style={{fontSize:6}}
                                        className="text-black mt-1 font-black"> 
                                            {challengeType}
                                    </Text>

                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                // onPress={ handlePrivacyDescrition }
                                className = "px- py- h-[25%] flex-col justify-center gap- items-center">
                                    <Image 
                                            className={ "rounded-full w-7 h-7"}
                                            source={challengePrivacy == "Public" ?icons.publi : icons.priv }
                                            resizeMode='contain'
                                            />
                                    <Text 
                                                    style={{fontSize:width<= 330? 6:7}}
                                                    className=" text-sm text-red-400 mt-1 font-black">
                                                    {challengePrivacy == "Public" ? "Public" : "Private" }
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                // onPress={handleAudienceDescrition}
                                className = "px- py- h-[25%] flex-col justify-center gap- items-center">
                                    <Image 
                                            className={ "rounded-full w-7 h-7"}
                                            source={challengeMode == "Open" ? icons.open:
                                                challengeMode == "Restricted" ? icons.restricted : icons.strict }
                                            resizeMode='cover'
                                            />
                                    <Text 
                                                    style={{fontSize:width<= 330? 6:7}}
                                                    className=" text-sm text-blue-400 mt-1 font-black">
                                                    {challengeMode}
                                    </Text>
                            </TouchableOpacity>

                  </View>

                  <View
                        className = "min-w-[10%] h-[100%] flex-col justify-end items-center py-4 px- bg-[#f8f1f1]">
                            <View
                                className = "w-[98%] h-[100%] flex-col rounde-tl-xl rounde-tr-xl  justify-between items-center py-2 px- ">
                                    <TouchableOpacity
                                    // onPress={handleInviteDescrition}
                                    className = " w-[100%] h-[15%] flex-col justify-center gap- items-center">
                                        <Image 
                                                className={ "rounded-full w-7 h-7"}
                                                source={ icons.invites }
                                                resizeMode='cover'
                                                />
                                        <Text 
                                                        style={{fontSize:width<= 330? 8:8}}
                                                        className=" text-sm text-blue-400 mt- font-black">
                                                        {invitedFriends && invitedFriends.invites.length }
                                        </Text>
                                    </TouchableOpacity>
                                    <ScrollView className = "w-[100%] max-h-[82%] flex-col justif-center gap- bg-[#e5f8f9] ite-center">
                                              {invitedFriends && invitedFriends.invites.map((participant, index)=> {
                                                    return(
                                                    <View key={index} className = " w-[100%]  flex-col justify-center py-1 items-center">
                                                            <Image 
                                                              className={ "rounded-full w-7 h-7"}
                                                              source={ {uri:participant.profile_img} }
                                                              resizeMode='cover'
                                                            />
                                                            <Text 
                                                              style={{fontSize:width<= 330? 7:7}}
                                                              className=" text-sm text-black mt- font-black">
                                                             {participant.name.slice(0,6)}
                                                            </Text>
                                                    </View>)
                                              })}   
                                    </ScrollView>
                            </View>
                        </View>

                </View>
                     
                </>

                   )}
                 {!isRecording && (
                 <View
                   className = "w-[100%] h-[5vh] px-2 py-1 flex-row rounded-bl-xl rounded-br-xl justify-center items-center px- bg-[#f1f5f6]">
                                                {/* <View className = "w-[90%] h-[80%] px-2 py-1 flex-row justify-center rounde-lg items-center bg-[#d9d7d4]"> */}
                      <SwingingTitle text={description} color="black" fontSize={13} />
                                                {/* </View> */}
                 </View>
               )}     



        <View 
            style={{backgroundColor: !isRecording ?"":"transparent"}}
            className="absolute top-7 w-[100%] flex-row justify-between items-center mt-10 gap-12 min--[40vh] -auto bg-amber-800 py-4 px-4 opacity-100 ">
               {!isRecording && (
               <TouchableOpacity
                   className="flex-col justify-start gap-2 items-center h-[100%] -[35%] "
                   onPress={isRecording? stopRecording : startRecording}
                    >
                   <Image    
                   className="w-12 h-12 "
                   source={isRecording ? icons.camera_recording : icons.camera}
                   resizeMode='contain'
                   />
                   <View className="-[50%] flex-col justify-end  ">
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
                  className="flex-col justify-start gap-2 items-center h-[100%] -[15%] "
                  onPress={uploadVideo}
                   >     
                  <Image    
                  className="w-14 h-14 "
                  source={icons.upload}
                  resizeMode='contain'
                  />
                   <View className="-[50%] flex-col justify-end  ">
                       <Text 
                     style={{fontSize:10}}
                     className="text-white text-xs font-black">
                       Upload
                     </Text>
                  </View>        
              </TouchableOpacity>
              )}    
        </View>


        {isRecording && (  

        <View 
        style={{backgroundColor: !isRecording ?"":"transparent"}}
        className=" w-[100%] flex-col justify-start items-center mt-auto bg-amber-800  opacity-100 ">
             <View className="flex-row min-w-full -auto   justify-center  items-center  opacity-85  h-[5vh]">

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
        )}

           {!isRecording && (  
              <TouchableOpacity
                  className="flex-row justify-center absolute bottom-24 right-  items-center  "
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

       </View>   


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