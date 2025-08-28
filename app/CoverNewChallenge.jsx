import { View, Text, TouchableOpacity, Image, useWindowDimensions, TextInput, Platform, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../constants';
import { router } from 'expo-router';
import SelectType from '../components/challenge/SelectType';
import { Audience, challengeType  , privacyData } from '../utilities/TypeData'
import SelectPrivacy from '../components/challenge/SelectPrivacy';
import SelectMode from '../components/challenge/SelectMode';
import { useGlobalContext } from '../context/GlobalProvider';
import SelectFriends from '../components/challenge/SelectFriends';
import CustomAlert from '../components/custom/CustomAlert';
import MakeSelectionChallengeModal from '../components/modal/MakeSelectionChallengeModel';
import { formatTime, getInition } from '../helper';
import TopBarChallenge from '../components/challenge/TopBarChallenge';
import BottomBarChallenge from '../components/challenge/BottomBarChallenge';
import ShuffleLetters from '../components/custom/ShuffleLetters';
import { useKeepAwake } from 'expo-keep-awake';
import { useVideoPlayer, VideoView } from 'expo-video';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useEvent } from 'expo';
import { generateThumbnail, saveVideoLocally } from '../videoFiles';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { _uploadVideoAsync, compressImage, compressVideo, uploadThumbnail } from '../firebase';
import axios from 'axios';
import { BASE_URL, getUserPrivateChallenges, getUserPublicChallenges } from '../apiCalls';


export default function CoverNewChallenge() {

    const{user,setParticipateChallenges,setUserPublicChallenges,setUserPrivateChallenges,userFriendData} = useGlobalContext()

    const [selectedType,setSelectedType] = useState(null)
    const [selectedPrivacy,setSelectedPrivacy] = useState(null)
    const [selectedAudience, setSelectedAudience] = useState("Open");
    const [isSelectorVisible,setIsSelectorVisible] = useState(false)
    const [isPrivacySelectorVisible,setIsPrivacySelectorVisible] = useState(false)
    const [isModeVisible,setIsModeVisible] = useState(false)
    const [isFriendListVisible,setIsFriendListVisible] = useState(false)

    const [description ,setDescription] = useState("")
    const [currentPlaceholder, setCurrentPlaceholder] = useState("Add a description");
    const [friendList ,setFriendList] = useState(userFriendData.friends)
    const [selectedFriends ,setSelectedFriends] = useState([])
    const [selectAll,setSelectAll] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState("");
    const [text,setText] = useState("")
    const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false)
    const [selectionType, setSelectionType] = useState(false)
    const [data, setData] = useState([])
    const insets = useSafeAreaInsets();


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
    const [replayRecording , setReplayRecording] = useState(false)
    const [isFocused, setIsFocused] = useState(false);


//****************************** video player , camera ,  */

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

//**************************** challenge object data */

    const [challenge , setChallenge] = useState({
       type:null,
       privacy:null,
       desc : "",
       invited_friends:[]
    })
    const [step ,setStep] = useState(0)



    const{width ,height} = useWindowDimensions()
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
            return true;
        }
      }

      useEffect(() => {
       return() => {
        setSelectedFriends([])
        setDescription("")
       }
      }, [])

      useEffect(() => {
       selectedType && setChallenge({...challenge, type:selectedType})
      }, [selectedType])

      useEffect(() => {
        selectedPrivacy &&  setChallenge({...challenge, privacy:selectedPrivacy})
      }, [selectedPrivacy])
      
      useEffect(() => {
         setChallenge({...challenge, desc:description})
      }, [description])


  //**************** submit the challenge  */
    
   const handleSumitChallenge =  async() => {

        if(videoUri ) { 
          setVisible(true)  
         
          setTimeout(() => {
            router.back()
                    }, 1200);  
    
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
                // videoUri && await  deleteVideo(videoUri)
                let challengeBody = {
                  origin_id : user._id ,
                  description: challenge.desc,
                  profile_img:user.profile_img,
                  user_id : user._id,
                  type:challenge.type,
                  privacy:challenge.privacy,
                  name:user.name,
                  video_url : urls[0],
                  email:user.email,
                  friendList: challenge.invited_friends ,
                  thumbNail: urls[1]
  
                }
      
                axios.post( BASE_URL + '/challenges/uploads', challengeBody).then( 
                    res =>  {   
    
                      getUserPublicChallenges(user._id ,setUserPublicChallenges)               
                      getUserPrivateChallenges(user._id ,setUserPrivateChallenges)                
                      setTimeout(() => {
                            setVideoUri(null)
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
    
         })
    
            }; 
     }




  return (
  
    <View
    style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top,
      // minWidth:width , minHeight:height
    }}
    className=" flex-1   flex-col justify-center items-center   bg-[#413d3d]">

                <TopBarChallenge show = {!replayRecording} width ={width} height={ height * 0.07  } top={height * 0.0 + insets.top  }
                   challenge={challenge} typeIcon = {getIcon(challenge.type)} privacyIcon = {getIcon( challenge.privacy)}
                   left ={0} right ={null}  user ={user}
                  />       
                        
  
                 {step == 0 && (
                  <View
                  className="flex- 1 w-[100%] h-[100%] flex-col justify-center items-center gap-2 p-2">
                      <Text 
                          style={{fontSize:12}}
                          className="font-black text-sm text-gray-200">
                           Description 
                      </Text> 
                      <TextInput
                      className="mt-4 w-[70%]  bg-white dark:bg-gray-800 
                        border-2 
                        rounded-lg 
                        px-4 py-3 "
                      
                      // style={styles.textarea}
                      onFocus={() => setIsFocused(true)}
                      multiline={true} 
                      numberOfLines={2} 
                      value={ description}
                      // placeholder="Enter your text here..."
                      onChangeText={text => setDescription(text)}
                      placeholder={currentPlaceholder}
                      />
                      <View
                      style ={{ width:200}}
                       className="flex-row justify-between items-center  py-2">
                         <TouchableOpacity 
                           style={{backgroundColor:step !== 0 ? "red" : "gray" }}
                           className="py-2 px-4  bg-red-500 rounded-lg" >
                              <Text style={styles.buttonText}>Back</Text>
                         </TouchableOpacity>
                         <TouchableOpacity 
                         onPress={() => {
                          if(description.length >15){
                          setChallenge({...challenge,desc:description})
                          setStep(prev => prev +1)
                           }
                          }}
                          style={{backgroundColor: description.length > 15 ? "blue" : "gray" }}
                           className="py-2 px-4  ml-auto bg-blue-700 rounded-lg" >
                              <Text style={styles.buttonText}>Next</Text>
                         </TouchableOpacity>
                      </View>
                      
                  </View>
                  
                 )}

              {step == 1 && (
                  <View
                  className="flex- 1 w-[100%] h-[100%] flex-col justify-center mt -auto items-center gap-2 p-2">
                        <TouchableOpacity
                          onPress={() =>{
                            setIsSelectorVisible(true)
                          }
                          }
                          className="w- [30%] h- [100%] mb-4 flex-col rounded-xl  justify-center gap-4 items-center">
                            <View
                                  className="w- [100%] h- [20%] flex-row justify-center items-center">
                                    <ShuffleLetters text={"Select Type"} textSize={12} /> 
                            </View>
                            
                            <Image
                            source={selectedType ? getIcon(selectedType) : icons.adventure}
                            resizeMethod='contain'
                            // style={{width:width/10, height:width/10}}
                            className="w-[100px] h-[100px] rounded-full p-4 bg-white mt -2 mb -2" />
                            <View
                                  className="w- [100%] h -[20%] p-2 flex-row justify-center items-center">
                                
                                  <Text 
                                    style={{fontSize:12}}
                                    className="text-white font-black"> 
                                      {selectedType}
                                  </Text>

                           </View>
                        </TouchableOpacity>
                        <View
                          style ={{ width:150}}
                          className="flex-row justify-between items-center  py-2">
                            <TouchableOpacity 
                              onPress={() => {
                                // setChallenge({...challenge,desc:description})
                                setStep(prev => prev - 1)
                               }}
                              style={{backgroundColor:step !==0 ? "red" : "gray" }}
                              className="py-2 px-4  bg-red-500 rounded-lg" >
                                  <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                             onPress={() => {
                              if(selectedType){
                              setChallenge({...challenge,desc:description})
                              setStep(prev => prev + 1)
                              }
                               }}
                               style={{backgroundColor: selectedType ? "blue" : "gray" }}
                              className="py-2 px-4  ml-auto bg-blue-700 rounded-lg" >
                                  <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                 )}
                 

                 {step == 2 && (
                  <View
                  className="flex- 1 w-[100%] h-[100%] flex-col justify-center mt -auto items-center gap-2 p-2">

                        <TouchableOpacity
                          onPress={() =>{
                            setIsPrivacySelectorVisible(true)
                          }
                          }
                          className="w- [30%] h- [100%] mb-4 flex-col rounded-xl  justify-center gap-4 items-center">
                            <View
                                  className="w- [100%] h- [20%] flex-row justify-center items-center">
                                     <ShuffleLetters text={"Select Privacy"} textSize={12} /> 
                            </View>
                            
                            <Image
                            source={selectedPrivacy ? getIcon(selectedPrivacy) : icons.publi}
                            resizeMethod='contain'
                            // style={{width:width/10, height:width/10}}
                            className="w-[100px] h-[100px] rounded-full p-4 b g-white " />

                            <View
                                  className="w- [100%] h -[20%] p- 2 flex-row justify-center items-center">
                                  <Text 
                                    style={{fontSize:11}}
                                    className="text-white font-black"> 
                                      {selectedPrivacy}
                                  </Text>
                          </View>
                        </TouchableOpacity>

                         <View
                          style ={{ width:150}}
                          className="flex-row justify-between items-center  py-2">
                            <TouchableOpacity 
                              onPress={() => {
                                // setChallenge({...challenge,desc:description})
                                setStep(prev => prev - 1)
                               }}
                              style={{backgroundColor:step !==0 ? "red" : "gray" }}
                              className="py-2 px-4  bg-red-500 rounded-lg" >
                                  <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                             onPress={() => {
                              if(selectedPrivacy){
                              setChallenge({...challenge,privacy:selectedPrivacy})
                              selectedPrivacy == "Public" ? setStep(prev => prev + 2) : setStep(prev => prev + 1)
                              }
                               }}
                              style={{backgroundColor: selectedPrivacy ? "blue" : "gray" }}
                              className="py-2 px-4  ml-auto bg-blue-700 rounded-lg" >
                                  <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                         </View>
                    </View>
                 )}


                {step == 3 && (
                  <View
                  className="flex- 1 w-[100%] h-[100%] flex-col justify-center mt -auto items-center gap-2 p-2">
                              <TouchableOpacity
                                        onPress={()=>{
                                          setIsFriendListVisible(true)
                                          setData(friendList)
                                         }
                                        }
                                        className="w- [100%] h- [25%] flex-col justify-evenly  gap-4 items-center">
                                        <View
                                                className="w- [100%] h- [20%] flex-row justify-center items-center">
                                                <ShuffleLetters text={"Invite Friends"} textSize={12} /> 
                                              
                                        </View>     
                                        <Image
                                        source={icons.invites}
                                        resizeMethod='cover'
                                        className="w-[100px] h-[100px] p- 2" />
                                        <View
                                                style={{fontSize:9}}
                                                className="w- [100%] h- [20%] flex-row justify-center items-center">
                                                <Text 
                                                style={{fontSize:10}}
                                                className="text-white font-black"> 
                                                    {selectedFriends.length}{' '}Invites
                                                </Text>
                                        </View>
                              </TouchableOpacity>

                              <View
                                        className="w-[100%] pt-2 h-[250px] mt-4 k rounded-xl ">
                                       <ScrollView  className=" flex-1">
                                          <View
                                            className="min-w- [100%] min-h -[100%] bg-black flex-row flex-wrap px -2  py -2 ga  justify-center  items-center">
                                            {selectedFriends.map((friend,index) => {
                                                return (<View 
                                                    key={index}
                                                    className="w-[23%] pt-4 pb-4 h- [30%] px- flex-col justify-center gap-2 items-center">
                                                            <Image
                                                            source={{uri:friend.profile_img}} 
                                                            resizeMethod='contain'
                                                            style={{width:width/10, height:width/10}}
                                                            className="w-[40px] h-[40px] rounded-full" />
                                                            <Text 
                                                              style={{fontSize:8}}
                                                              className="text-gray-200 text-sm font-bold">
                                                                {friend.name.slice(0,12)}
                                                            </Text>
                                                  </View>  )  
                                            })}
                                            </View>
                                      </ScrollView>     
                              </View>

                              <View
                                style ={{ width:width}}
                                className="flex-row px-4 justify-between items-center  py-2">
                                  <TouchableOpacity 
                                    onPress={() => {
                                      // setChallenge({...challenge,desc:description})
                                      setStep(prev => prev - 1)
                                    }}
                                    style={{backgroundColor:step !==0 ? "red" : "gray" }}
                                    className="py-2 px-4  bg-red-500 rounded-lg" >
                                        <Text style={styles.buttonText}>Back</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity 
                                  onPress={() => {
                                    if(selectedFriends.length > 0){
                                    setChallenge({...challenge,invited_friends:selectedFriends})
                                    setStep(prev => prev + 1)
                                    }
                                    }}
                                    style={{backgroundColor: selectedFriends.length > 0 ? "blue" : "gray" }}
                                    className="py-2 px-4  ml-auto bg-blue-700 rounded-lg" >
                                        <Text style={styles.buttonText}>Next</Text>
                                  </TouchableOpacity>
                              </View>
                        
                   </View>
                )}



                {step == 4 && (
                  <>
                        {videoUri ? (
                             <>
                                  <VideoView 
                                          style={{ width:'100%' ,height:'100%',opacity:100}}
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
                                      style={{width:'100%',height:'100%',opacity:0.5}}   
                                        />   
                                      {!isRecording && (
                                        <View 
                                        style={{backgroundColor: !isRecording ?"#523c2":"transparent"}}
                                        className="absolute bottom-[35vh]  w-[100%] flex-col justify-start items-center -auto bg- opacity-100 ">
                                            <View className="flex-row min-w-full mt-auto  px-8 justify-evenly  items-center  opacity-85  h-[7vh]">       
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
                                                        onPress={()=> {setStep(1)}}>
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
                )}
                 


       

          {/* <BottomBarChallenge show = {!replayRecording} width ={width} height={height * 0.07 + insets.bottom} bottom={0} left ={null} right ={null} user = {user}
               challenge={challenge} />   */}


          {isSelectorVisible && (
            <SelectType height={height} width={width} data ={challengeType} selectedType={selectedType} setIsSelectorVisible={setIsSelectorVisible} setSelectedType={setSelectedType}/>
          )}
           {isFriendListVisible && (
            <SelectFriends height={height} width={width} data={friendList} selectedFriends={selectedFriends} setIsFriendListVisible={setIsFriendListVisible} setSelectedFriends={setSelectedFriends}/>
          )}
          {isPrivacySelectorVisible && (
            <SelectPrivacy height={height} width={width} data ={privacyData} selectedPrivacy={selectedPrivacy} setIsPrivacySelectorVisible={setIsPrivacySelectorVisible} setSelectedPrivacy={setSelectedPrivacy}/>
          )}
           {isModeVisible && (
            <SelectMode height={height} width={width} data ={Audience} selectedAudience={selectedAudience} setIsModeVisible={setIsModeVisible} setSelectedAudience={setSelectedAudience}/>
          )}
          {isSelectionModalVisible && (  
                     <MakeSelectionChallengeModal isSelectionModalVisible={isSelectionModalVisible} selectionType ={selectionType} selectedType={selectedType}
                     setIsSelectionModalVisible={setIsSelectionModalVisible} text={text} data ={data} setSelectedType={setSelectedType} selectedPrivacy ={selectedPrivacy}
                     setSelectedPrivacy ={setSelectedPrivacy} selectedAudience ={selectedAudience} setSelectedAudience = {setSelectedAudience}  
                     selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends}
                       />
                 )}
          {isModalVisible && (
                    <CustomAlert text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
               )}
   </View>
     
  
   
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:"white"
  },
  textarea: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 4,
    padding: 10,
    width:200,
    height: 50, // Ensures a minimum height for the textarea
    textAlignVertical: 'top',
    backgroundColor:"white"
  },
  button: {
    backgroundColor: '#4CAF50', // Example color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow for a "fancy" look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});