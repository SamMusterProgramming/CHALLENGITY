import { View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput, Platform, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  {CameraView, CameraType, useCameraPermissions, useMicrophonePermissions, Camera}   from 'expo-camera'
import { icons,images } from '../constants'
import { Video } from 'expo-av'
import { _uploadVideoAsync} from '../firebase'
import { useGlobalContext } from '../context/GlobalProvider'
import { Redirect, router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { BASE_URL, getChallengeById,  getUserPrivateChallenges,  getUserPrivateParticipateChallenges,  getUserPublicParticipateChallenges } from '../apiCalls'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { challengeType  , privacyData } from '../utilities/TypeData'
// import ChallengeTypeSelector from '../components/ChallengeTypeSelector'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Post from '../components/challenge/Post'
import Player from '../components/challenge/Player'
import SwingingTitle from '../components/custom/SwingingTitle'
import ChallengeExpired from '../components/challenge/ChallengeExpired'
import LoadModel from '../components/custom/LoadModal'
// import privacyData from '../../components/ChallengeTypeSelector'


export default function CreateParticipateChallenge() {
  const{user,setPublicParticipateChallenges,setPrivateParticipateChallenges} = useGlobalContext()
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
  const [isExpired,setIsExpired] = useState(false)
  const [autoPlay,setAutoPlay] = useState(false)
  const [visible, setVisible] = useState(false);


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
    getChallengeById(challenge_id,setChallenge,setIsExpired)
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



  useEffect(() => {
    // if (!permission.granted || !audioPermission.granted){
    requestPermission()
    requestAudioPermission()
    // }
  }, [])

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
      setVisible(true)
      setTimeout(() => {
        router.push({ pathname: '/profile',params: {
        priv:selectedPrivacy == "Private"?"true":"false", publ:selectedPrivacy === "Public"? "true":"false",
        yourChallenges:"false" , yourParticipations:"true"
        } }) 
        setVisible(false)
      }, 2000); 
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
        
           axios.post(BASE_URL +`/challenges/uploads/${challenge._id}`,challengeBody)
          .then(   
            res =>  {
            if(res.data === "challenge expired") return setIsExpired(true)
            challenge.privacy=="Public"? getUserPublicParticipateChallenges(user._id ,setPublicParticipateChallenges)
            :getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
            setTimeout(() => {
            
              router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:res.data._id} })
            }, 1000);
          }
             
              )
     
          })   

          // router.push('/profile')  
        
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

  const handleNextItem = () => {
      setTimeout(() => {
        swiperRef.current?.scrollToIndex({index:0, animated: true });
      }, 0);
  };
  

 
    if(isExpired) return <ChallengeExpired challenge_id={challenge_id}/>
  
  
  return (
  
           
           <SafeAreaView className=" bg-primary"> 
 
               {challenge && (

                 <FlatList 
                 ref={swiperRef}
                 data={challenge.participants || []}
                 keyExtractor={(item) => item._id}
                //  autoplay={autoPlay}
                 index={0}
                 pagingEnabled
                 vertical={true}
                 renderItem={
                 
                  
                    ({ item, index }) => {
                        const isVisible = viewableItems.some(viewableItem => viewableItem.index === index);
                        // setFinishPlaying(false)
                        return  <Player
                            isVisible={isVisible}
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
            

                    {!play && (<>
                            <View className="min-w-full absolute top-0  rounded-md bg-bl-800 flex-row items-center justify-between h-[4%]"
                              >
                              <TouchableOpacity
                                onPress={() => router.back()}
                                className="min-w-[7%] h-[100%]  flex-col justify-center  items-center">
                                <Image 
                                className="w-7 h-7 bg-white"
                                source={icons.x} />
                              </TouchableOpacity>

                              <View 
                              className="min-w-[45%]  h-[100%] rounded-md bg-s flex-1 flex-row justify-center  items-end  ">
                                  <Text className="text-white  font-bold">
                                    Response to Challenge 
                                  </Text>
                              </View>

                              <View 
                                className="min-w-[40%]  h-[100%] rounded-md gap-2 flex-row justify-center  items-end  ">
                                  <Text className="text-white text-sm  font-bold ">
                                    {challenge.type}{'   '} 
                                  </Text>
                                  <Text className="text-secondary text-sm  font-bold ">
                                    {challenge.privacy}
                                  </Text>
                              </View>
                          </View>  
                          <View className="w-[100vw] h-[3%] absolute top-10  border-x-3 bg-blue-1000 flex-row justify-center  items-center" >
                                    <SwingingTitle text={challenge.desc} fonstSize={17} color="green" /> 
                          </View>
                          </>
                            )}
              </View>
                ):
                (       
                     <View className="w-[100vw] h-[100%] justify-center  items-center ">       
                     <CameraView ref={cameraRef} videoQuality="720p"
                       mode='video'
                       facing={facing}
                       style={{width:'100%',height:'100%'}}   
                         >   
                       <View className="min-w-full h-full flex-col justify-start gap-2 items-center ">
                             
                         {!isRecording && challenge  ? (
                           <>

                                <View className="min-w-full   rounded-md bg-bl-800 flex-row items-center justify-between h-[4%]"
                                    >
                                    <TouchableOpacity
                                      onPress={() => router.back()}
                                      className="min-w-[7%] h-[100%]  flex-col justify-center  items-center">
                                      <Image
                                      className="w-7 h-7 bg-white "
                                      source={icons.x} />
                                    </TouchableOpacity>

                                    <View 
                                    className="min-w-[45%]  h-[100%] rounded-md bg-s flex-1 flex-row justify-center  items-end  ">
                                        <Text className="text-white  font-bold">
                                          Response to Challenge 
                                        </Text>
                                    </View>

                                    <View 
                                      className="min-w-[40%]  h-[100%] rounded-md gap-2 flex-row justify-center  items-end  ">
                                        <Text className="text-white text-sm  font-bold ">
                                          {challenge.type}{'   '} 
                                        </Text>
                                        <Text className="text-secondary text-sm  font-bold ">
                                          {challenge.privacy}
                                        </Text>
                                    </View>
                                </View>  

                                <View className="w-[100vw] h-[3%]   border-x-3 bg-blue-1000 flex-row justify-center  items-center" >
                                    <SwingingTitle text={challenge.desc} fonstSize={17} color="green" /> 
                                </View>

                                <View className="min-w-full  rounded-md gap-2  flex-col items-center justify-start h-[15%]"
                                    >
                                       
                                        <Text  className="text-gray-100 font-bold text-sm">
                                            Created by 
                                        </Text>                  
                                        <Text className="text-white font-bold text-sm">{challenge.name}</Text>
                                        <Image 
                                          className="w-[45px] h-[45px]  rounded-full"
                                          source={challenge.profile_img?{uri:challenge.profile_img}:images.gold_bg} 
                                          />
                                       
                                </View>

                                <View 
                                        className=" min-h-[5%] rounded-md w-[100%]  flex-col justify-center gap-3 items-center  ">
                                        <Text  className="text-gray-100 font-bold text-sm">
                                           Record or Upload  <Text className="text-white font-bold text-sm">Your response</Text>
                                        </Text>  
                                       
                                </View>

                                <View 
                                        className=" min-h-[5%] rounded-md w-[70%] mt-80  flex-row justify-center  items-center  ">
                                        <Text  className="text-blue-400 font-black text-xl">
                                          View Challenge
                                        </Text> 
                                        <TouchableOpacity
                                          className="flex-1"
                                          onPress={handleNextItem}>
                                            <Image 
                                            className="w-[45px] h-[45px] ml-auto rounded-full"
                                            source={icons.rightArrow} 
                                             /> 
                                        </TouchableOpacity>          
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
                     {visible && (
                          <LoadModel visible={visible} setVisible={setVisible}
                           />
                         )}
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

