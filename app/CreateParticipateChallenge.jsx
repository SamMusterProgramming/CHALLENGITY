import { View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput, Platform, FlatList, useWindowDimensions, ScrollView } from 'react-native'
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
import { formatTime, getInition } from '../helper'
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
              // router.push({ pathname: '/CoverChallengePage', params: {challenge_id:res.data._id} })
              router.push({ pathname: '/FSinstantChallengeDisplayer', params: {
                challenge_id:res.data._id
               } })
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


    if(isExpired)  return <ChallengeExpired challenge_id={challenge_id}/>

    
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
                   {/* <View className="min-w-full h-[6vh] rounded-tl-full rounded-tr-full flex-row justify-center items-center bg-[#322604]">
                               
                                 <View 
                                     className="w-[100%]  min-h-[95%] rounded-md bg-s  flex-row justify-evenly  items-center ">
                                       <Text className="text-white text-sm  font-bold ">
                                           Response to Challenge
                                       </Text>
                               </View>          
                   </View>

                   <View className="w-[100%] h-[6vh]  bg-[#151f36] flex-row justify-center items-center rounded-lg  ">
                       <SwingingTitle color="white" fontSize={12} text={challenge.desc} />
                   </View> */}

                   {/* <View className="w-[100%] h-[16%] px-2   flex-row justify-center gap-2 items-center">
                                 <View
                                  className="w-[33%] h-[90%] flex-col justify-center gap- items-center">
                                     <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                          
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

                   </View> */}



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
                                                    source={ {uri:challenge.profile_img} }
                                                    resizeMode='cover'
                                                    />
                                                    <View className="justify-center py-1  items-start h-[80%] flex-col ">
                                                                  
                                                                  <Text className="font-pmedium  text-sm text-black">
                                                                      <Text 
                                                                      style={{fontSize:width<= 330? 7:7}}
                                                                      className="font-black text-sm text-black">
                                                                          {challenge.name.length > 13 ?challenge.name.slice(0,13)+"..." : challenge.name}
                                                                      </Text> 
                                                                  </Text>
                                                                  <Text 
                                                                      style={{fontSize:width<= 330? 8:7}}
                                                                      className=" text-sm text-blue-400 font-black">
                                                                      {getInition(challenge.name)}Challenger
                                                                  </Text>
                                                    </View>
                                            </View>
                                        
                                    </View>
                                    <View
                                    className = "w-[55%] h-[100%] flex-row justify-center items-center px- g-[#de8124]">
                                        
                                        <Text 
                                              style={{fontSize:16}}
                                              className=" text-sm text-blue-900 mt-1 font-black">
                                                  REPLY TO CHALLENGE
                                          </Text>
                                        
                                    </View>
                    
                           </View>

                        

                        <View
                              className = "min-w-[100%] h-[40%] mt-auto gap- flex-row justify-between items-center px- ">

                                 

                                  <View
                                    className = "w-[10%] h-[100%] flex-col justify-start bg-white items-center px- py-4 g-white">
                                        <View
                                            className = "w-[98%] h-[100%] flex-col rounde-tl-xl rounde-tr-xl  justify-between items-center py-2 px- ">
                                                <TouchableOpacity 
                                                    className = " w-[100%] h-[18%] flex-col justify-center gap- items-center">
                                                    <Image 
                                                            className={ "rounded-full w-7 h-7"}
                                                            source={ icons.participate }
                                                            resizeMode='cover'
                                                            />
                                                    <Text 
                                                                    style={{fontSize:width<= 330? 8:10}}
                                                                    className=" text-sm text-blue-400 mt- font-black">
                                                                    {challenge.participants.length }
                                                    </Text>
                                                </TouchableOpacity>

                                                <ScrollView className = "w-[100%] h-[82%] py-1 flex-col justi-enter gap- bg-[#e5f8f9] ite-center">
                                                          {challenge.participants.map((participant, index)=> {
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
                                                                </View>
                                                                )
                                                          })}   
                                                </ScrollView>
                                        </View>
                                    
                                  </View>

                                  <View
                                   className = "w-[60%] h-[15%] flex-row justify-between items-center px-8 py- g-[white] g-white">
                                        
                                        <TouchableOpacity 
                                            className = "px-0 py- -[25%] flex-col justify-start gap- items-center">
                                          
                                                <Image
                                                source={getIcon(challenge.type)}
                                                resizeMethod='contain'
                                                className="w-8 h-8 rounded-full" /> 
                                                <Text 
                                                    style={{fontSize:8}}
                                                    className="text-white mt-1 font-black"> 
                                                        {challenge.type}
                                                </Text>

                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity 
                                            className = "px- py- -[25%] flex-col justify-center gap- items-center">
                                                <Image 
                                                        className={ "rounded-full w-8 h-8"}
                                                        source={challenge.privacy == "Public" ?icons.publi : icons.priv }
                                                        resizeMode='contain'
                                                        />
                                                <Text 
                                                                style={{fontSize:width<= 330? 6:8}}
                                                                className=" text-sm text-white mt-1 font-black">
                                                                {challenge.privacy == "Public" ? "Public" : "Private" }
                                                </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            className = "px- py- -[25%] flex-col justify-center gap- items-center">
                                                <Image 
                                                        className={ "rounded-full w-8 h-8"}
                                                        source={challenge.audience == "Open" ? icons.open:
                                                            challenge.audience == "Restricted" ? icons.restricted : icons.strict }
                                                        resizeMode='cover'
                                                        />
                                                <Text 
                                                                style={{fontSize:width<= 330? 6:8}}
                                                                className=" text-sm text-white mt-1 font-black">
                                                                {challenge.audience}
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
                                                                    {challenge.invited_friends.length }
                                                    </Text>
                                                </TouchableOpacity>
                                                <ScrollView className = "w-[100%] max-h-[82%] flex-col justif-center gap- bg-[#e5f8f9] ite-center">
                                                          {challenge.invited_friends.map((participant, index)=> {
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
                              className = "w-[100%] h-[5vh] px-2 py- flex-row rounded-bl-xl rounded-br-xl justify-center items-center px- bg-[#f1f5f6]">
                                                            {/* <View className = "w-[90%] h-[80%] px-2 py-1 flex-row justify-center rounde-lg items-center bg-[#d9d7d4]"> */}
                                  <SwingingTitle text={description} color="black" fontSize={13} />
                                                            {/* </View> */}
                            </View>

                            <TouchableOpacity onPress={()=>setPlay(!play)}
                                  hitSlop={{ top: 300, bottom: 300, left: 400, right: 400 }}
                                  // style={{bottom:height/5, left:0}}
                                  className="absolute bottom-[6vh] w-[100%] h-[15%] flex-row justify-center gap-1 items-center">
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
                        hitSlop={{ top: 300, bottom: 300, left: 400, right: 400 }}
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

              
             {/* <View className="flex-row min-w-full mt-auto  justify-between  items-center  opacity-85  h-[7vh]">
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
            </View> */}


            </View>
                
                  

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
                       
                       className={!isRecording?"absolute top-0 min-w-full h-full flex-col bg-prima justify-start gap- items-center ":
                                        "absolute top-0 min-w-full h-full flex-col  justify-start gap- items-center "
                       }>
                             
                         {!isRecording && challenge  ? (
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
                                                    source={ {uri:challenge.profile_img} }
                                                    resizeMode='cover'
                                                    />
                                                    <View className="justify-center py-1  items-start h-[80%] flex-col ">
                                                                  
                                                                  <Text className="font-pmedium  text-sm text-black">
                                                                      <Text 
                                                                      style={{fontSize:width<= 330? 7:7}}
                                                                      className="font-black text-sm text-black">
                                                                          {challenge.name.length > 13 ?challenge.name.slice(0,13)+"..." : challenge.name}
                                                                      </Text> 
                                                                  </Text>
                                                                  <Text 
                                                                      style={{fontSize:width<= 330? 8:7}}
                                                                      className=" text-sm text-blue-400 font-black">
                                                                      {getInition(challenge.name)}Challenger
                                                                  </Text>
                                                    </View>
                                            </View>
                                        
                                    </View>
                                    <View
                                    className = "w-[55%] h-[100%] flex-row justify-center items-center px- g-[#de8124]">
                                        
                                        <Text 
                                              style={{fontSize:16}}
                                              className=" text-sm text-blue-900 mt-1 font-black">
                                                  REPLY TO CHALLENGE
                                          </Text>
                                        
                                    </View>
                    
                              </View>

                        

                        <View
                              className = "min-w-[100%] h-[40%] mt-auto gap- flex-row justify-between items-center px- ">

                                 

                                  <View
                                    className = "w-[10%] h-[100%] flex-col justify-start bg-white items-center px- py-4 g-white">
                                        <View
                                            className = "w-[98%] h-[100%] flex-col rounde-tl-xl rounde-tr-xl  justify-between items-center py-2 px- ">
                                                <TouchableOpacity 
                                                    className = " w-[100%] h-[18%] flex-col justify-center gap- items-center">
                                                    <Image 
                                                            className={ "rounded-full w-7 h-7"}
                                                            source={ icons.participate }
                                                            resizeMode='cover'
                                                            />
                                                    <Text 
                                                                    style={{fontSize:width<= 330? 8:10}}
                                                                    className=" text-sm text-blue-400 mt- font-black">
                                                                    {challenge.participants.length }
                                                    </Text>
                                                </TouchableOpacity>

                                                <ScrollView className = "w-[100%] h-[82%] py-1 flex-col justi-enter gap- bg-[#e5f8f9] ite-center">
                                                          {challenge.participants.map((participant, index)=> {
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
                                                                </View>
                                                                )
                                                          })}   
                                                </ScrollView>
                                        </View>
                                    
                                  </View>

                                   <View
                                  className = "w-[60%] h-[15%] flex-row justify-between items-center px-8 py- g-[white] g-white">
                                        {/* <TouchableOpacity
                                          
                                            className = "px-0 py- -[25%] flex-col justify-start gap- items-center">
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
                                        </TouchableOpacity> */}
                                        <TouchableOpacity 
                                            className = "px-0 py- -[25%] flex-col justify-start gap- items-center">
                                          
                                                <Image
                                                source={getIcon(challenge.type)}
                                                resizeMethod='contain'
                                                className="w-8 h-8 rounded-full" /> 
                                                <Text 
                                                    style={{fontSize:8}}
                                                    className="text-white mt-1 font-black"> 
                                                        {challenge.type}
                                                </Text>

                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity 
                                            className = "px- py- -[25%] flex-col justify-center gap- items-center">
                                                <Image 
                                                        className={ "rounded-full w-8 h-8"}
                                                        source={challenge.privacy == "Public" ?icons.publi : icons.priv }
                                                        resizeMode='contain'
                                                        />
                                                <Text 
                                                                style={{fontSize:width<= 330? 6:8}}
                                                                className=" text-sm text-white mt-1 font-black">
                                                                {challenge.privacy == "Public" ? "Public" : "Private" }
                                                </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            className = "px- py- -[25%] flex-col justify-center gap- items-center">
                                                <Image 
                                                        className={ "rounded-full w-8 h-8"}
                                                        source={challenge.audience == "Open" ? icons.open:
                                                            challenge.audience == "Restricted" ? icons.restricted : icons.strict }
                                                        resizeMode='cover'
                                                        />
                                                <Text 
                                                                style={{fontSize:width<= 330? 6:8}}
                                                                className=" text-sm text-white mt-1 font-black">
                                                                {challenge.audience}
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
                                                                    {challenge.invited_friends.length }
                                                    </Text>
                                                </TouchableOpacity>
                                                <ScrollView className = "w-[100%] max-h-[82%] flex-col justif-center gap- bg-[#e5f8f9] ite-center">
                                                          {challenge.invited_friends.map((participant, index)=> {
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
                              className = "w-[100%] h-[5vh] px-2 py- flex-row rounded-bl-xl rounded-br-xl justify-center items-center px- bg-[#f1f5f6]">
                                                            {/* <View className = "w-[90%] h-[80%] px-2 py-1 flex-row justify-center rounde-lg items-center bg-[#d9d7d4]"> */}
                                  <SwingingTitle text={description} color="black" fontSize={13} />
                                                            {/* </View> */}
                            </View>


                                
                            
                              
                           </>
                         ):
                         (
                         <>
                             
                         </>
                         )}

          {!isRecording && ( 
                    <View 
                            style={{backgroundColor: !isRecording ?"#523c2":"transparent"}}
                            className="absolute top-[8vh] w-[100%] flex-col justify-start items-center -auto bg- opacity-100 ">
                                <View className="flex-row min-w-full mt-auto  px-4 justify-between  items-center  opacity-85  h-[7vh]">
                                  
                                {!isRecording && (
                                  <TouchableOpacity
                                      className="flex-col justify-center gap-1 items-center h-[100%]  g-green-500 -[33%] "
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
                                      className="flex-col justify-center gap-2 items-center  g-blue-500 h-[100%] -[33%] "
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
                                

                                 
                                </View>

                     </View>
                )}


                  {!isRecording && (  
                                      <TouchableOpacity
                                          className=" absolute bottom-[10vh] -[100%]  -[33%] flex-row justify-center    items-center  "
                                          onPress={toggleCameraFacing}
                                            >
                                          <Image
                                          className="w-12 h-12"
                                          source ={icons.flip}
                                          resizeMode='contain'
                                          />
                                      </TouchableOpacity>
                                    )}


                {isRecording && ( 
                    <View 
                            style={{backgroundColor: !isRecording ?"#523c2":"transparent"}}
                            className=" w-[100%] flex-col justify-start items-center mt-auto bg- opacity-100 ">
                                <View className="flex-row min-w-full mt-auto   justify-between  items-center  opacity-85  h-[7vh]">
                                  
                                {!isRecording && (
                                  <TouchableOpacity
                                      className="flex-row justify-center gap-2 items-center h-[100%]  g-green-500 w-[33%] "
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
                                      className="flex-row justify-center gap-2 items-center  g-blue-500 h-[100%] w-[33%] "
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
                )}
                         
                        




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

