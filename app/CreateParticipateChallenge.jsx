import { View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  {CameraView, CameraType, useCameraPermissions, useMicrophonePermissions, Camera}   from 'expo-camera'
import { icons,images } from '../constants'
import { Video } from 'expo-av'
import { _uploadVideoAsync} from '../firebase'
import { useGlobalContext } from '../context/GlobalProvider'
import { Redirect, router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { BASE_URL, getChallengeById, getUserChallenges, getUserParticipateChallenges } from '../apiCalls'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { challengeType  , privacyData } from '../utilities/TypeData'
import ChallengeTypeSelector from '../components/ChallengeTypeSelector'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Post from '../components/Post'
import Player from '../components/Player'
// import privacyData from '../../components/ChallengeTypeSelector'


export default function CreateParticipateChallenge() {
  const{user,setParticipateChallenges,setUserChallenges} = useGlobalContext()
  const [permission, requestPermission] = useCameraPermissions()
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();

  const cameraRef = useRef(null);
  const swiperRef = useRef();
  const [facing, setFacing] = useState('back');
  const [videoUri, setVideoUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [play,setPlay] = useState(false)

  const [selectedOption, setSelectedOption] = useState('');
  const [challenge,setChallenge] = useState(null)
  const [selectedType,setSelectedType] = useState('Adventure')
  const [selectedPrivacy,setSelectedPrivacy] = useState('Public')
  const [description ,setDescription] = useState("")
  const {challengeData} = useLocalSearchParams();
  const [viewableItems, setViewableItems] = useState([]);
  const [finishPlaying ,setFinishPlaying] =useState(false)
  const {challenge_id} = useLocalSearchParams();



  const requestMediaPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    setViewableItems(viewableItems);
  };
  useEffect(() => {
     setFinishPlaying(false)
  }, [viewableItems])

  useEffect(() => {
    if(!videoUri) setIsRecording(false)
  }, [videoUri])

  useEffect(() => {
    getChallengeById(challenge_id,setChallenge)
    return () => {
      setChallenge(null)
    };
  }, [])

  useEffect(() => {
  if(challenge){
    setSelectedType(challenge.type)
    setSelectedPrivacy(challenge.privacy)
    setDescription(challenge.desc)
  }
  return () => {
    setSelectedType('')
    setSelectedPrivacy('')
    setDescription('')
  };
  }, [challenge])


  useEffect(
       () => {
      return () => {
        setChallenge(null)
        setSelectedType('')
        setSelectedPrivacy('')
      };
    },[]);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!audioPermission) {
    // Camera permissions are still loading.
    return <View />;
  }
   
  if (!permission.granted || !audioPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 bg-primary">
        <Text className="bg-yellow-600">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
        <Button onPress={requestAudioPermission} title="grant audio permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

 
  const startRecording = async() =>{
    setVideoUri(null)
   
  try {
    console.log("mmm herrrre")
    setIsRecording(true)
   
    let options ={
      maxDuration: 10,
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
   }

  const goBack = ()=> {
     setVideoUri(null)
  }

  
  
  const handleSumitChallenge =  () => {
    if(videoUri ){ 
      _uploadVideoAsync(videoUri , user.email,user.name)
      .then((url) => {
        let challengeBody = {
          origin_id : user._id ,
          description: description,
          profile_img:user.profile_img,
          user_id : user._id,
          type:selectedType,
          privacy:selectedPrivacy,
          name:user.name,
          video_url : url,
          email:user.email,
        }
        
          console.log("here join challenge")
           axios.post(BASE_URL +`/challenges/uploads/${challenge._id}`,challengeBody)
          .then(   res =>  {
            router.push('/profile')
            setTimeout(() => {
              getUserParticipateChallenges(user._id ,setParticipateChallenges)
              router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:res.data._id} })
            }, 500);
          }
             
              )
     
          })   
        
      }
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
      console.log(result.assets[0].uri)
      setVideoUri(result.assets[0].uri)

    } catch (error) {
      console.log(error)
    }

  }    

  
  
  return (
  
           
           <SafeAreaView className=" bg-primary"> 
 
               {challenge && (

                 <SwiperFlatList 
                 ref={swiperRef}
                 data={challenge.participants || []}
                 keyExtractor={(item) => item._id}
                 renderItem={
               
                  
                    ({ item, index }) => {
                        const isVisible = viewableItems.some(viewableItem => viewableItem.index === index);
                        // setFinishPlaying(false)
                        return  <Player
                            isVisible={false}
                            setFinishPlaying={setFinishPlaying}
                            key={item._id} 
                            index={index}
                            participant={item}    
                            challenge={challenge} 
                            />
                        
                   
                    }
                  
               }
               ListHeaderComponent={     
                <>
           
           {videoUri ? (
               <View className="w-[100vw] h-[100%] flex-column  justify-start  items-center ">
                 <Video
                   style={{minWidth:'100%',minHeight:'100%',position:'relative'}}
                   source={{uri:videoUri}}
                   shouldPlay={play}
                   isMuted={false}
                   useNativeControls={false}
                   isLooping
                   resizeMode='cover'
                   />
                
                     <TouchableOpacity onPress={()=>setPlay(!play)}
                       className="absolute top-96 -right-50 flex-column justify-start  items-center">
                        <Image source={!play? icons.play : icons.pause}
                        className={!play? "w-14 h-14 rounded-full": "w-14 h-14 opacity-35 rounded-full"} /> 
                     </TouchableOpacity>     
                     <TouchableOpacity
                          className="absolute bottom-2 -right-0 flex-col justify-center gap-2 items-center h-14 w-[20%] "
                          onPress={goBack}
                            >
                          <Image      
                          className="w-10 h-10 "
                          source={icons.back}
                          resizeMode='contain'
                          />  
                          <Text className="text-white text-xs font-bold">Go Back</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          className="absolute bottom-2 -right-50 flex-col justify-center gap-2 items-center h-14 w-[20%] "
                          onPress={handleSumitChallenge}
                            >
                          <Image      
                          className="w-10 h-10 "
                          source={isRecording ? icons.submit : icons.submit}
                          resizeMode='contain'
                          />  
                          <Text className="text-white text-xs font-bold">{isRecording? "Submit":"Submit"}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                          className="absolute bottom-2 -left-0 flex-col justify-center gap-2 items-center h-14 w-[20%] "
                          onPress={isRecording? stopRecording : startRecording}
                            >
                          <Image              
                          className="w-10 h-10 "
                          source={isRecording ? icons.cancel : icons.cancel}
                          resizeMode='contain'
                          />  
                          <Text className="text-white text-xs font-bold">{isRecording? "Cancel":"Cancel"}</Text>
                      </TouchableOpacity>
            

                    {!play && <View className="min-w-full  rounded-md absolute top-0 flex-row items-center justify-start min-h-[5%]"
                                    style={{top:Platform.OS == "android" ? 0 : 0 }} >
                                        <TouchableOpacity
                                        onPress={() => router.back()}
                                        className="min-w-[8%] min-h-[95%] flex-1 flex-col justify-center  items-center">
                                        <Image
                                        className="w-8 h-8 bg-white "
                                        source={icons.x} />
                                        </TouchableOpacity>
                                        <View 
                                        className="min-w-[30%]  min-h-[95%] rounded-md bg-s flex-1 flex-row justify-center  items-end  ">
                                            <Text className="text-white text-1xl  font-bold ">
                                            Response Challenge
                                            </Text>
                                        </View>
                                        
                                        <View className="min-w-[62%] min-h-[95%] border-x-white bg-blue-1000 flex-1 flex-row justify-center  items-end" >
                                            <Text className="text-gray-200 text-sm font-bold">
                                            {challenge.desc}   
                                            </Text>
                                        </View>
                                </View>
                                }
              </View>
                ):
                (       
                     <View className="w-[100vw] h-[100%] justify-center  items-center ">       
                     <CameraView ref={cameraRef} videoQuality="720p"
                       mode='video'
                       facing={facing}
                       style={{width:'100%',height:'100%'}}   
                         >   
                       <View className="min-w-full py-2 flex-1 flex-col justify-start gap-2 items-center ">
                             
                         {!isRecording && challenge  ? (
                           <>
                                <View className="min-w-full  rounded-md absolute top-0 flex-row items-center justify-start min-h-[5%]"
                                    style={{top:Platform.OS == "android" ? 0 : 0 }} >
                                        <TouchableOpacity
                                        onPress={() => router.back()}
                                        className="min-w-[8%] min-h-[95%] flex-1 flex-col justify-center  items-center">
                                        <Image
                                        className="w-8 h-8 bg-white "
                                        source={icons.x} />
                                        </TouchableOpacity>
                                        <View 
                                        className="min-w-[30%]  min-h-[95%] rounded-md bg-s flex-1 flex-row justify-center  items-end  ">
                                            <Text className="text-white text-1xl  font-bold ">
                                            Response Challenge
                                            </Text>
                                        </View>
                                        
                                        <View className="min-w-[62%] min-h-[95%] border-x-white bg-blue-1000 flex-1 flex-row justify-center  items-end" >
                                            <Text className="text-gray-200 text-sm font-bold">
                                            {challenge.desc}   
                                            </Text>
                                        </View>
                                </View>
                                <View className="w-full absolute top-20 left-0 px-3   flex-row items-center justify-between min-h-[12%]">
                                    <View 
                                        className=" min-h-[95%] rounded-md w-[50%]  flex-col justify-center gap-3 items-center  ">
                                        <Text  className="text-gray-100 font-bold text-sm">
                                            Created by {'                        '} <Text className="text-white font-bold text-sm">{challenge.name}</Text>
                                        </Text>  
                                       
                                    </View>
                                    <View 
                                        className=" min-h-[95%] rounded-md w-[50%]  flex-col justify-center gap-3 items-center  ">
                                        <Text  className="text-gray-100 font-bold text-sm">
                                           Record or Upload {' '} <Text className="text-white font-bold text-sm">Your response</Text>
                                        </Text>  
                                       
                                    </View>
                                </View>
                           </>
                         ):
                         (
                         <>
                             
                         </>
                         )}
                         
                           <View className="flex-row min-w-full mt-auto  justify-between items-center  opacity-75  h-[10vh]">
                           
                             <TouchableOpacity
                                 className="flex-col justify-center gap-2 items-center h-full w-[20%] "
                                 onPress={isRecording? stopRecording : startRecording}
                             >
                                 <Image    
                                 className="w-10 h-10 "
                                 source={isRecording ? icons.camera_recording : icons.camera}
                                 resizeMode='contain'
                                 />
                                 <Text className="text-white text-xs font-bold">{isRecording? "Recording":"Start "}</Text>
                             </TouchableOpacity>
       
                             <TouchableOpacity
                                 className="flex-col justify-center gap-2 items-center h-full w-[20%] "
                                 onPress={uploadVideo}
                             >
                                 <Image    
                                 className="w-10 h-10 "
                                 source={icons.upload}
                                 resizeMode='contain'
                                 />
                                 <Text className="text-white text-xs font-bold">Upload</Text>
                             </TouchableOpacity>
       
                             <TouchableOpacity
                                 className="flex-col justify-center   gap-1 items-center h-full w-[20%] "
                                 onPress={toggleCameraFacing}
                                   >
                                 <Image
                                 className="w-10 h-10 "
                                 source={icons.flip}
                                 resizeMode='contain'
                                 />
                                 <Text className="text-white text-xs font-bold">Flip</Text> 
                             </TouchableOpacity>
                           </View>
                        </View>
                     </CameraView>
                     </View>  )}
                </>
               }

               onViewableItemsChanged={onViewableItemsChanged}
               viewabilityConfig={{
                 itemVisiblePercentThreshold: 70, 
               }}
               horizontal
              
              />

           )}
        
    
              </SafeAreaView>
            
 
               

            
   
    
 
  )
}

