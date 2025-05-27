import { View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput, Platform, FlatList, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  {CameraView, CameraType, useCameraPermissions, useMicrophonePermissions, Camera}   from 'expo-camera'
import { icons,images } from '../constants'
import { Video } from 'expo-av'
import { _uploadVideoAsync, compressImage, compressVideo, uploadThumbnail} from '../firebase'
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
import { generateThumbnail } from '../videoFiles'
import { formatTime } from '../helper'
import { useKeepAwake } from 'expo-keep-awake'
// import privacyData from '../../components/ChallengeTypeSelector'


export default function CreateParticipateChallenge() {
  const {user,setUser,userChallenges,setUserChallenges,favouriteChallenge , setFavouriteChallenge,setPrivateParticipateChallenges,
    setPublicParticipateChallenges,userFriendData,participateChallenges,setParticipateChallenges} = useGlobalContext()
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
  const [thumbNailURL,setThumbNailURL] = useState(null)
  const{width ,height} = useWindowDimensions()
  const [timer, setTimer] = useState(0);
  useKeepAwake();
  let intervalId = useRef(null);



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
  
  }, [])

  useEffect(() => {
  if(challenge){
    setSelectedType(challenge.type)
    setSelectedPrivacy(challenge.privacy)
    setDescription(challenge.desc)
  }
  }, [challenge])


  useEffect(
       () => {
      return () => {
        setChallenge(null)
        setSelectedType('')
        setSelectedPrivacy('')
        cameraRef.current = null ; 
        swiperRef.current = null ;
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
   }





  const goBack = ()=> {
     setVideoUri(null)
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
  

  const handleSumitChallenge =  () => {
    if(videoUri ){
      setVisible(true)
      
      setTimeout(() => {
        router.replace({ pathname: '/UserChallenges',params: {
        userChallenges:"false",
        userParticipations:"true",
        publ:challenge.privacy === "Public"? "true":"false",
        priv:challenge.privacy == "Private" && challenge.audience !== "Strict" ?"true":"false",
        strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" , 
       } }) 
       }, 100); 
      // setTimeout(() => {
      //    router.navigate({ pathname: '/ParticipationManagement',params: {
      //    publ:challenge.privacy === "Public"? "true":"false",
      //    priv:challenge.privacy == "Private" && challenge.audience !== "Strict" ?"true":"false",
      //    strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" , 
      //   } }) 

      setTimeout(() => {
        setVisible(false)
      }, 1000); 

      Promise.all([compressVideo(videoUri),compressImage(thumbNailURL)]).then(results => { 
        Promise.all([_uploadVideoAsync(results[0], user.email,user.name),uploadThumbnail(results[1], user.email)])
      .then((urls) => {
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
          thumbNail:urls[1]
            }
        
           axios.post(BASE_URL +`/challenges/uploads/${challenge._id}`,challengeBody)
          .then(   
            res =>  {
            if(res.data === "challenge expired") return setIsExpired(true)
              
            challenge.privacy=="Public"? getUserPublicParticipateChallenges(user._id ,setPublicParticipateChallenges)
            :getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
             
            setTimeout(() => {
              router.push({ pathname: '/CoverChallengePage', params: {challenge_id:res.data._id} })
            }, 1200);
          }
             
              )
              FileSystem.deleteAsync(results[0], { idempotent: true }).then(res=> console.log("file deleted ayhoo"));

          })   
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
          return;
          // setIcon("gray")
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
                   className={ play ? "opacity-100":"opacity-10 rounded-tl-full rounded-tr-full" }
                   style={{minWidth:'100%',minHeight:'100%',position:'relative' ,opacity: !play ? 0.3 :100 }}
                  //  style={{minWidth:'100%',minHeight:'100%',position:'relative'}}
                   source={{uri:videoUri}}
                   shouldPlay={play}
                   isMuted={false}
                   useNativeControls={false}
                   isLooping
                   resizeMode='cover'
                   />



          <View className="min-w-full min-h-full absolute top-0 flex-col  justify-start  items-center  ">
           
           {!play && (
               <>
                   <View className="min-w-full h-[6vh] rounded-tl-full rounded-tr-full flex-row justify-center items-center bg-[#322604]">
                               
                                 <View 
                                     className="w-[100%]  min-h-[95%] rounded-md bg-s  flex-row justify-evenly  items-center ">
                                       <Text className="text-white text-sm  font-bold ">
                                           Response to Challenge
                                       </Text>
                               </View>          
                   </View>

                   <View className="w-[100%] h-[6vh]  bg-[#151f36] flex-row justify-center items-center rounded-lg  ">
                       <SwingingTitle color="white" fontSize={12} text={challenge.desc} />
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
                                                {challenge.type}
                                            </Text>

                                    </View>
                                     
                                     <Image
                                     source={getIcon(challenge.type)}
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
                                                {challenge.privacy}
                                            </Text>

                                    </View>
                                     
                                     <Image
                                     source={getIcon(challenge.privacy)}
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
                                                    {challenge.audience}
                                                </Text>

                                        </View>
                                        <Image
                                                source={getIcon(challenge.audience)}
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

                   {challenge.privacy == "Private" &&  (
                   <View className="w-[100%] h-[30%] px-2 mt-10 flex-row justify-center items-center">
                              <View
                                className="w-[80%] h-[100%] flex-col justify-center gap-1 items-center">
                                      
                                      <View
                                        className=" w-[100%] h-[20%] flex-row justify-center items-center">
                                           <Text className="text-white text-sm font-bold">
                                                   {challenge.invited_friends.length}{'  '}
                                           </Text>
                                           <Text
                                             style={{fontSize:12}} 
                                             className="text-blue-200 text-sm font-black"> 
                                                   Invites
                                           </Text>

                                      </View>
                      
                                      <View
                                      className=" w-[100%] h-[80%] px-3 flex-row flex-wrap justify-center items-center">
                                       {challenge.invited_friends.map((invite,index)=> {
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
                
                     {/* <TouchableOpacity onPress={()=>setPlay(!play)}
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
                      </TouchableOpacity> */}
            

                    {/* {!play && (<>
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
                            )} */}


              </View>
                ):
                (       
                  
                     <View className="w-[100vw] h-[100%] justify-center  items-center ">       
                     <CameraView ref={cameraRef} videoQuality="720p"
                       mode='video'
                       facing={facing}
                       style={{width:'100%',height:'100%',opacity:0.5}}   
                         />   
                       <View 
                       
                       className={!isRecording?"absolute top-0 min-w-full h-full flex-col bg-prima justify-start gap-2 items-center ":
                                        "absolute top-0 min-w-full h-full flex-col  justify-start gap-2 items-center "
                       }>
                             
                         {!isRecording && challenge  ? (
                           <>

                                <View
                                    style={Platform.OS == "android" && {borderTopRightRadius:5,borderTopLeftRadius:5}}
                                    className =" w-[100%] h-[17%] flex-col bg-[#a9cdf0] mb-2 justify-evenly rounded-tl-[50px] rounded-tr-[50px] items-center">
                                            <View
                                                    style={Platform.OS == "android" && {borderTopRightRadius:5,borderTopLeftRadius:5}}
                                                    className="w-[100%] h-[40%]  rounded-tl-[50px] rounded-tr-[50px] flex-row  justify-between items-center  ">
                                                      
                                                        <TouchableOpacity
                                                            onPress={()=> router.back()}
                                                            // style={{height:heigh * 0.07}}
                                                            className= "w-[15%] h-[100%]  bg- rounded-tl-[50px] flex-row justify-center items-center ">
                                                            <Image
                                                                source={icons.back1} 
                                                                resizeMethod='contain'
                                                                style={{width:width/13 ,height:width/13}}
                                                                className=""
                                                                />
                                                        </TouchableOpacity>

                                                      <View
                                                        className= "w-[70%] h-[100%]  bg-[#183755] rounded-xl flex-row justify-center items-center " >
                                                                <TouchableOpacity
                                                                  onPress={()=>{router.navigate("profile")}}
                                                                  className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                                                    <Image
                                                                      source={{uri:user.profile_img}} 
                                                                      resizeMethod='contain'
                                                                      style={{width:width/12 ,height:width/12}}
                                                                      className ="rounded-full"
                                                                    />
                                                                    <Text
                                                                    style={{fontSize:8}}
                                                                    className="text-gray-100 font-bold">
                                                                      Profile
                                                                    </Text>
                                                                </TouchableOpacity> 

                                                                <TouchableOpacity
                                                                  onPress={()=>{router.navigate("CoverNewChallenge")}}
                                                                  className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                                                    <Image
                                                                      source={icons.newChallenge} 
                                                                      resizeMethod='contain'
                                                                      style={{width:width/13 ,height:width/13}}
                                                                      className ="rounded-full"
                                                                    />
                                                                    <Text
                                                                    style={{fontSize:8}}
                                                                    className="text-gray-100 font-bold">
                                                                      New Challenge
                                                                    </Text>
                                                                </TouchableOpacity>   

                                                                <TouchableOpacity
                                                                  onPress={()=>{router.navigate("timeline")}}
                                                                  className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                                                    <Image
                                                                      source={icons.home} 
                                                                      resizeMethod='contain'
                                                                      style={{width:width/13 ,height:width/13}}
                                                                      className ="rounded-full"
                                                                    />
                                                                    <Text
                                                                    style={{fontSize:8}}
                                                                    className="text-gray-100 font-bold">
                                                                      Home
                                                                    </Text>
                                                                </TouchableOpacity>   
                                                      </View>
                                                      
                                                        <TouchableOpacity
                                                            
                                                            className= "w-[15%] h-[100%]  bg- rounded-tr-[50px] flex-row justify-center items-center ">
                                                            <Image
                                                            source={icons.next} 
                                                            resizeMethod='contain'
                                                            style={{width:width/13 ,height:width/13}}
                                                            className="w-9 h-9 "
                                                            />
                                                        </TouchableOpacity>          
                                            </View>

                                            <View
                                                    className="w-[100%] h-[50%]   flex-row justify-center items-center  ">
                                                    <View 
                                                    style={{  height:width/9 }}  
                                                    className=" w-[95%] h-[30%] px-4 border-gray-200 border-2  bg-white rounded-lg
                                                    flex-row justify-center items-center">
                                                    <SwingingTitle text={challenge.desc} fonstSize={17} color="black" /> 
                                                              
                                                    </View >
                                            </View>      
                                  </View>


                                  <View className="w-[100%] h-[14%] px-2   flex-row justify-center gap-2 items-center">
                                            <View
                                              className="w-[33%] h-[90%] flex-col justify-center gap-2 items-center">
                                                
                                                    <Image
                                                    source={getIcon(challenge.type)}
                                                    resizeMethod='contain'
                                                    style={{width:width/8, height:width/8}}
                                                    className="w-[95%] h-[70%]" />
                                                <View
                                                        className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                        
                                                        <Text 
                                                        style={{fontSize:10}}
                                                        className="text-white font-black"> 
                                                            {challenge.type}
                                                        </Text>

                                                </View>
                                                
                                                
                                            </View>
                                            <View
                                              className="w-[33%] h-[90%] flex-col justify-center gap-2 items-center">
                                                  <Image
                                                source={getIcon(challenge.privacy)}
                                                resizeMethod='contain'
                                                style={{width:width/8, height:width/8}}
                                                className="w-[95%] h-[70%]" />
                                                <View
                                                        className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                        
                                                        <Text 
                                                        style={{fontSize:10}}
                                                        className="text-white font-black"> 
                                                            {challenge.privacy}
                                                        </Text>

                                                </View>
                                            </View>

                                            <View
                                                className="w-[33%] h-[100%] flex-col justify-center gap-1 items-center">
                                                      <Image
                                                            source={getIcon(challenge.audience)}
                                                            resizeMethod='cover'
                                                            style={{width:width/8, height:width/8}}
                                                            className=" rounded-full bg-white" />
                                                    <View
                                                            className=" w-[100%] h-[20%] flex-row justify-center items-center">
                                                            
                                                            <Text 
                                                            style={{fontSize:10}}
                                                            className="text-white text-xs font-black"> 
                                                                {challenge.audience}
                                                            </Text>

                                                    </View>              
                                            </View>
                                  </View>
                            
                                 
                                  <View className="w-[100%] h-[14%] px-2  flex-row justify-center items-center">
                                          

                                          <View
                                              className="w-[33%] h-[100%] flex-col justify-center gap-1 items-center">
                                                  <TouchableOpacity
                                                          onPress={
                                                              () => 
                                                              challenge.origin_id === user._id ? router.navigate({ pathname: '/profile' })
                                                                                            : router.push({ pathname: '/ViewProfile', params: {user_id:challenge.origin_id} })
                                                          }
                                                          className= "   flex-row justify-center items-center ">
                                                          <Image
                                                          source={{uri:challenge.profile_img}}
                                                          resizeMethod='cover'
                                                          style={{width:width/8, height:width/8}}
                                                          className=" rounded-full bg-white" />
                                                  </TouchableOpacity>
                                                  <View
                                                          className=" w-[100%] h-[20%] flex-row justify-center items-center">
                                                          <Text
                                                          className="text-white font-black"
                                                          style={{fontSize:10}}>
                                                              {challenge.name}
                                                          </Text>
                                                  </View>   
                                                  <View
                                                  // style={{top:7,right:width/2}}
                                                  className="absolute top-4 right-4">
                                                        <Text
                                                        style={{fontSize:7}}
                                                        className="text-red-300 font-black">
                                                              {user._id == challenge.origin_id? "YOU":
                                                              userFriendData.friends.find(friend=>friend.sender_id == challenge.origin_id) ?
                                                              "FRIEND":""}
                                                        </Text>
                                                  </View>
                                          </View>

                                          
                                          <View 
                                              className=" w-[33%] h-[100%] flex-col justify-center gap-1 items-center  ">
                                              
                                              <TouchableOpacity
                                                className="  flex-col justify-center items-center"
                                                onPress={handleNextItem}>
                                                  <Image 
                                                  style={{width:width/8, height:width/8}}
                                                  className="  rounded-full"
                                                  source={icons.rightArrow} 
                                                  resizeMethod='cover'
                                                  /> 
                                              </TouchableOpacity>     
                                              <View
                                                          className=" w-[100%] h-[20%] flex-row justify-center items-center">
                                                          <Text
                                                          className="text-white font-black"
                                                          style={{fontSize:10}}>
                                                              View Challenge
                                                          </Text>
                                               </View>   
                                                
                                          </View>
                                          

                                    </View>


                                    <View className="w-[100%] h-[35%] px-2  flex-row justify-start items-center">
                                  <View
                                    className="w-[50%] h-[100%] flex-col justify-end gap-1 items-center">

                                        <View
                                                className=" w-[100%] h-[80%] px-3 flex-row flex-wrap-reverse justify-center items-center">
                                                 {challenge.participants.map((participant,index)=> {
                                                       return (
                                                      <View key={index}
                                                       style={{width:width/8, height:width/6}}
                                                       className=" flex-col justify-evenly items-center">
                                                         <Image
                                                            source={{uri:participant.profile_img}}
                                                            resizeMethod='cover'
                                                            style={{width:width/12, height:width/12}}
                                                            className=" rounded-full" />
                                                          <Text
                                                            className="text-white font-black "
                                                            style={{fontSize:8}}>
                                                                {participant.name.slice(0,6)} 
                                                          </Text>
                                                     </View>
                                                       )
                                                 })}
                                        </View>
                                        <View
                                                className=" w-[100%] h-[10%] flex-row justify-center items-center">
                                                <Text className="text-white text-xs font-bold">
                                                     {challenge.participants.length}{'  '}
                                                </Text>
                                                <Text className="text-blue-200 text-xs font-black"> 
                                                     Participants
                                                </Text>

                                        </View>
                                        
                                 </View>
                                 {challenge.privacy == "Private" &&  (
                                 <View
                                    className="w-[50%] h-[100%] flex-col justify-end gap-1 items-center">
                                      
                           
                                           <View
                                           className=" w-[100%] h-[80%] px-1 flex-row flex-wrap-reverse justify-center items-center">
                                            {challenge.invited_friends.map((invite,index)=> {
                                                  return (
                                                 <View key={index}
                                                  style={{width:width/8, height:width/6}}
                                                  className=" flex-col justify-evenly items-center">
                                                    <Image
                                                   source={{uri:invite.profile_img}}
                                                   resizeMethod='cover'
                                                   style={{width:width/12, height:width/12}}
                                                   className=" rounded-full " />
                                                    <Text
                                                            className="text-white font-black "
                                                            style={{fontSize:8}}>
                                                                {invite.name.slice(0,6)} 
                                                    </Text>
                                                </View>
                                                  )
                                            })}
                                           </View>
                                           <View
                                             className=" w-[100%] h-[10%] flex-row justify-center items-center">
                                                <Text className="text-white text-xs font-bold">
                                                        {challenge.invited_friends.length}{'  '}
                                                </Text>
                                                <Text className="text-blue-200 text-xs font-black"> 
                                                        Invites
                                                </Text>

                                           </View>
                            
                                 </View>
                                   )}
                        </View>   

                                
                            
                              
                           </>
                         ):
                         (
                         <>
                             
                         </>
                         )}




                    <View 
                            style={{backgroundColor: !isRecording ?"#523c2":"transparent"}}
                            className=" w-[100%] flex-col justify-start items-center mt-auto bg- opacity-100 ">
                                <View className="flex-row min-w-full mt-auto   justify-between  items-center  opacity-85  h-[7vh]">
                                  
                                {!isRecording && (
                                  <TouchableOpacity
                                      className="flex-row justify-center gap-2 items-center h-[100%]  bg-green-500 w-[33%] "
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

                                 {/* {!isRecording && (
                                  <View
                                      className="flex-col justify-center  items-center h-[100%]  w-[33%] "
                                     
                                        >
                                       <View className="h-[40%] flex-col justify-end  ">
                                          <Text
                                          style={{fontSize:10}}
                                          className="text-white text-xs font-black">
                                            Replay to
                                          </Text>
                                      </View>     
                                      <View className="h-[40%] flex-col justify-end  ">
                                          <Text
                                          style={{fontSize:10}}
                                          className="text-white text-xs font-black">
                                            Challenge
                                          </Text>
                                      </View>      
                                  </View>
                                  )}     */}
                                  {!isRecording && (  
                                      <TouchableOpacity
                                          className="h-[100%]  w-[33%] flex-row justify-center    items-center  "
                                          onPress={toggleCameraFacing}
                                            >
                                          <Image
                                          className="w-12 h-12"
                                          source ={icons.flip}
                                          resizeMode='contain'
                                          />
                                      </TouchableOpacity>
                                    )}

                                  {!isRecording && (
                                  <TouchableOpacity
                                      className="flex-row justify-center gap-2 items-center  bg-blue-500 h-[100%] w-[33%] "
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
                         
                           {/* <View className="flex-row min-w-full mt-auto  justify-between items-center   opacity-75 h-[7vh]  ">
                           
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
                           </View> */}




                        </View>

                     {/* </CameraView> */}
                     
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

