import { View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  {CameraView, CameraType, useCameraPermissions, useMicrophonePermissions, Camera}   from 'expo-camera'
import { icons,images } from '../../constants'
import { Video } from 'expo-av'
import { _uploadVideoAsync} from '../../firebase'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Redirect, router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { BASE_URL, getChallengeById, getUserChallenges, getUserParticipateChallenges } from '../../apiCalls'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { challengeType  , privacyData } from '../../utilities/TypeData'
import ChallengeTypeSelector from '../../components/challenge/ChallengeTypeSelector'
// import privacyData from '../../components/ChallengeTypeSelector'

export default function NewChallenge() {
  const{user,setParticipateChallenges,userChallenges,setUserChallenges} = useGlobalContext()
  const [permission, requestPermission] = useCameraPermissions()
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();


  const cameraRef = useRef(null);
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



  const requestMediaPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };


  useEffect(() => {
    if(!videoUri) setIsRecording(false)
  }, [videoUri])

  useEffect(() => {
    if (typeof challengeData === 'string') {
      setChallenge(JSON.parse(challengeData));
    }
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
    },[]
  );


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
        

        if(!challenge){ 
          challengeBody = {...challengeBody,
            type:selectedType,
            // category:selectedCategory,
            privacy:selectedPrivacy,
            // audience:selectedAudience,
            challengers:"everybody",
            name:user.name
          }
         axios.post( BASE_URL + '/challenges/uploads', challengeBody).then( // when user challenge another user , we will insert his change to an existing challenge by challenge_id
            res =>  {
              console.log(res.data)
              // setUserChallenges([...userChallenges , res.data])
              router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:res.data._id} })
              getUserChallenges(user._id ,setUserChallenges)

              // router.push({ pathname: '../ChallengeDisplayer', params: {challenge_id:res.data._id} })
            }
             
          )
        }else{
          console.log("here join challenge")
           axios.post(BASE_URL +`/challenges/uploads/${challenge._id}`,challengeBody)
          .then(   res =>  {
            console.log(res.data)
              router.push('/profile')
          }
             
              )
        }
          // axios.post( BASE_URL + '/challenges/uploads', challenge).then( 
          //   res =>  {
          //     console.log(res.data)
          //     router.push('/timeline')
          //   }
          // )
          //  getUserParticipateChallenges(user._id,setParticipateChallenges)
          })   

          // return <Redirect href="/timeline" />
        }; 
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
  
           
           <SafeAreaView className="flex-1 bg-primary">           
                {videoUri ? (
               <View className="w-full h-full flex-column  justify-start  items-center ">
                <Video
                   style={{minWidth:'100%',minHeight:'100%',position:'relative'}}
                   source={{uri:videoUri}}
                   shouldPlay={play}
                   isMuted={false}
                   useNativeControls={false}
                   isLooping
                   resizeMode='cover'
                   />
                   <View className="min-w-full min-h-[8vh] top-2 -right-50 flex-column bg-white  justify-start  items-center ">
                     
                   </View>
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
                            
              </View>
                ):
                (
             <CameraView ref={cameraRef} videoQuality="720p"
                mode='video'
                facing={facing}
                style={{flex:1,backgroundColor:""}}
                // className="flex-1 w-full bg-primary" 
                  >   
                <View className="min-w-full py-2 flex-1 flex-col justify-start gap-2 items-center ">
                      
                 {!isRecording && challenge  ? (
                    <>
                  <View className="flex-row w-full justify-center items-center  opacity-55 gap-5  h-[4vh]">
                  <Text className="text-white text-xs font-bold">
                     {selectedType}     
                  </Text>
                  <Text className="text-white text-xs font-bold">
                     {selectedPrivacy}     
                  </Text>
                 </View>  
                 <View className="flex-row w-full justify-center items-center  opacity-55 gap-5  h-[5vh]">
                 <Text
                    style={{ minHeight: 40,width:'95%', fontWeight:'900', borderWidth: 1,
                      color:'white',textAlign:'center',fontSize:13,borderRadius:10
                     }}   
                  >
                    {description}
                  </Text>
                 </View>  
                 </>
                  ):
                  (
                  <>
                  <View className="flex-row w-full justify-center items-center  opacity-55 gap-5  h-[4vh]">
                  <ChallengeTypeSelector data={challengeType} setSelected={setSelectedType} />
                  <ChallengeTypeSelector data={privacyData} setSelected={setSelectedPrivacy} />
                 </View>  
                 <View className="flex-row w-full justify-center items-center  opacity-55 gap-5  h-[5vh]">
                 <TextInput
                    style={{ minHeight: 40,width:'95%', borderColor: 'gray',fontWeight:'900', borderWidth: 1,
                      color:'white',textAlign:'center',fontSize:13,borderRadius:10
                     }}   
                    onChangeText={text => setDescription(text)}
                    value={description}
                    placeholder='Add descrition to your challenge here'
                  />
                 </View>  
                 </>
                  )}
                  
                   
                 
                   
                    <View className="flex-row min-w-full mt-auto  justify-between items-center  opacity-55  h-[10vh]">
                    
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
               
              
                )
              }
              </SafeAreaView>
            
 
               

            
   
    
 
  )
}


