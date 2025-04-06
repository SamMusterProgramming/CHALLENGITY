import { View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput, Alert, FlatList, Platform, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import  {CameraView, CameraType, useCameraPermissions, useMicrophonePermissions, Camera}   from 'expo-camera'
import { icons,images } from '../../constants'
import { Video } from 'expo-av'
import { _uploadVideoAsync, compressVideo, uploadThumbnail} from '../../firebase'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Redirect, router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { BASE_URL, getChallengeById, getUserChallenges, getUserFriendsData, getUserParticipateChallenges, getUserPrivateChallenges, getUserPublicChallenges } from '../../apiCalls'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { Audience, challengeType  , privacyData } from '../../utilities/TypeData'
import ChallengeTypeSelector from '../../components/challenge/ChallengeTypeSelector'
import { getInition } from '../../helper'
import SwingingTitle from '../../components/custom/SwingingTitle'
import CustomAlert from '../../components/custom/CustomAlert'
import LoadModel from '../../components/custom/LoadModal'
import { useKeepAwake } from 'expo-keep-awake';
import * as FileSystem from 'expo-file-system';
import { generateThumbnail, saveVideoLocally } from '../../videoFiles'


// import privacyData from '../../components/ChallengeTypeSelector'

export default function NewChallenge() {
  const{user,setParticipateChallenges,setUserPublicChallenges,setUserPrivateChallenges} = useGlobalContext()
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
  const [currentPlaceholder, setCurrentPlaceholder] = useState("Add a description to your challenge");
  const [friendList ,setFriendList] = useState(null)
  const [friendData ,setFriendData] = useState(null)
  const [selectedFriends ,setSelectedFriends] = useState([])
  const [selectAll,setSelectAll] = useState(false)
  const videoRef = useRef();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const [action, setAction] = useState("");
  const [text,setText] = useState()
  const [bgTypeColor ,setBgTypeColor] = useState("red")
  const [bgModeColor ,setBgModeColor] = useState("green")

  const [bgPrivacyColor ,setBgPrivacyColor] = useState("blue")
  const [selectedAudience, setSelectedAudience] = useState("Open");
  const [thumbNailURL,setThumbNailURL] = useState(null)


  let intervalId = useRef(null);
  const [timer, setTimer] = useState(0);
  useKeepAwake();

  useEffect(() => {
    getUserFriendsData(user._id,setFriendList)
  }, [])
  

  const addFriendToList = (item)=> {
    console.log(selectedFriends)
      const f = selectedFriends 
      f.push(item)
      setSelectedFriends(f)
  }

  useEffect(() => {
    selectAll ? setSelectedFriends([...friendList.friends])
    :friendList && selectedFriends.length == friendList.friends.length? setSelectedFriends([]):{}
  }, [selectAll])
  
  useEffect(() => {
    if(friendList){
       if((selectedFriends.length == friendList.friends.length)&& !selectAll) setSelectAll(true) 
       if((selectedFriends.length !== friendList.friends.length)&& selectAll) setSelectAll(false) 
    }
  }, [selectedFriends])


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


  useEffect(
       () => {
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
        setChallenge(null)
        setSelectedType('Adventure')
        setSelectedPrivacy('Public')
      };
    },[]
  );

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
    switch(selectedPrivacy) {
      case "Public":
         setBgPrivacyColor("#074beb")
        break;
      case "Private":
        setBgPrivacyColor("#c21555")
        break;
      default:
        setBgPrivacyColor("gray")
    }
  }, [selectedPrivacy])

  useEffect(() => {
    switch(selectedAudience) {
      case "Open":
         setBgModeColor("green")
        break;
      case "Restricted":
        setBgModeColor("#eb34cf")
        break;
      case "Strict":
        setBgModeColor("red")
        break;  
      default:
        setBgModeColor("gray")
    }
  }, [selectedAudience])

  useEffect(() => {
    switch(selectedType) {
      case "Adventure":
         setBgTypeColor("#c27d15")
        break;
      case "Dance":
        setBgTypeColor("#c25515")
        break;
      case "Eating":
          setBgTypeColor("#15c252")
         break;
      case "Fitness":
         setBgTypeColor("#c21515")
         break;
      case "Magic":
          setBgTypeColor("#450575")
          break;
      case "Music":
            setBgTypeColor("#052c75")
           break;
      case "Science":
           setBgTypeColor("#274a04")
           break;
      case "Sport":
           setBgTypeColor("#04194a")
           break;
      default:
        setBgPrivacyColor("gray")
    }
  }, [selectedType])

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

    if(description == "") return confirmDescription()
    if(videoUri ) { 
      setVisible(true)
      
      setTimeout(() => {
        router.replace({ pathname: '/profile',params: {
        priv:selectedPrivacy == "Private"?"true":"false", publ:selectedPrivacy === "Public"? "true":"false",
        participate :"false", invited :"false" , strict:"false"
                  } }) 
        setVisible(false)
      }, 2000);

     const imageThumbnailUri = await uploadThumbnail(thumbNailURL, user.email)
     compressVideo(videoUri).then((compressedVideoUrl) => {
      setThumbNailURL(null)
      _uploadVideoAsync(compressedVideoUrl , user.email,user.name)
      .then(async(url) => {

        console.log(imageThumbnailUri)
        await saveVideoLocally(url)
        videoUri && await deleteVideo(videoUri)
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
          friendList:selectedFriends,
          thumbNail: imageThumbnailUri
        }
        
          challengeBody = {...challengeBody,
            type:selectedType,
            privacy:selectedPrivacy,
            audience:selectedAudience,
            challengers:"everybody",
            name:user.name
          }
         axios.post( BASE_URL + '/challenges/uploads', challengeBody).then( // when user challenge another user , we will insert his change to an existing challenge by challenge_id
            res =>  {          
               
              selectedPrivacy == "Public"? getUserPublicChallenges(user._id ,setUserPublicChallenges):
              getUserPrivateChallenges(user._id ,setUserPrivateChallenges)
              setTimeout(() => {
                    setVideoUri(null)
                    setDescription("")
                    setSelectedPrivacy("Public")
                    setSelectedAudience("Open")
                    setSelectedType("Adventure")
                    router.navigate({ pathname: '/ChallengeDisplayer', params: {challenge_id:res.data._id} })
              }, 1000);
            }
             
          )
          })   
         FileSystem.deleteAsync(compressedVideoUrl, { idempotent: true }).then(res=> console.log("file deleted ayhoo"));


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


  useFocusEffect(
    useCallback(() => {
      return () => {
        // console.log("cleaning up")
        // if (cameraRef.current) {
        //   cameraRef.current.pausePreview();
        // }
        // if (videoRef.current) {
        //   videoRef.current.stopAsync().then(() => {
        //     videoRef.current.unloadAsync();
        //   });
        //   cameraRef.current = null;
        //   videoRef.current =null;
        // }
      //  videoUri && deleteVideo(videoUri)
      };
    }, [])
  );
  
  return (
  
           
           <SafeAreaView
                className="flex-1 bg-primary">           
                {videoUri ? (
               <View 
               className=" min-w-full min-h-full flex-column bg-black justify-start  items-center ">
                
                 <Video
                   ref={videoRef}
                   className={ play ? "opacity-100":"opacity-10" }
                   style={{minWidth:'100%',minHeight:'100%',position:'relative' ,opacity: !play ? 0.3 :100 }}
                   source={{uri: play ? videoUri :  videoUri}}
                   shouldPlay={play}
                   isMuted={false}
                   useNativeControls={false}
                   isLooping
                   resizeMode='cover'
                   />



                  {!play && (
                      <>

                    <View className="min-w-full min-h-full absolute top-0 flex-col  justify-start gap-5 items-center  ">
                        <View className="min-w-full h-[7vh]   flex-row   justify-start  items-end ">
                                        <TouchableOpacity
                                              onPress={() => router.back()}
                                              className="w-[10%] h-[95%]  flex-col justify-center  items-center">
                                              <Image
                                              className="w-8 h-8 bg-white "
                                              source={icons.x} />
                                        </TouchableOpacity>
                                        <View 
                                            className="w-[90%]  min-h-[95%] rounded-md bg-s  flex-row justify-evenly  items-end  ">
                                              <Text className="text-white textsm  font-bold ">
                                                  New Challenge
                                              </Text>
                                              <Text className="text-white text-sm  font-bold ">
                                                  {selectedType}
                                              </Text>
                                              <Text className="text-secondary-200 text-sm  font-bold ">
                                                  {selectedPrivacy}
                                              </Text>
                                      </View>          
                          </View>

                          <View className="w-[90%] h-[6vh]  bg-[#242625] flex-row justify-center items-center rounded-lg  ">
                              <SwingingTitle color="white" fontSize={12} text={description} />
                          </View>

                          {selectedPrivacy == "Private" && (
                              <View 
                                className=" w-[70%]     bg-grayhg-400  
                                rounded-lg  min-h-[100px] max-h-[180px] flex-col justify-start items-center"
                                  >
                                <FlatList 
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                pagingEnabled={false}
                                data={selectedFriends}
                                keyExtractor ={item => item.sender_id}
                                renderItem={({item,index})=> {
                                  return (
                                    <View 
                                        key={index}
                                        className="px-2  mb-1 w-[100%] h-[30px] bg-blue-200 rounded-lg flex-row justify-start gap-7 items-center" >
                                        <Image 
                                        className="w-[25px] h-[25px] rounded-full"
                                        source={{uri:item.profile_img}}
                                        resizeMethod='contain'
                                        />
                                        <View className=" justify-center gap-0 items-start min-h-[30px] flex-col ">
                                                <Text
                                                  style={{fontSize:7}}
                                                  className="font-black text-xs text-black">
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    style={{fontSize:8}}
                                                    className=" text-xs text-blue-600 font-bold">
                                                    {getInition(item.name)}Challenger
                                                </Text>
                                        </View>
                                        <View className=" justify-center ml-auto items-end min-h-[25px] flex-row ">
                                                <Text
                                                    style={{fontSize:9}}
                                                    className=" text-red-500 text-xs font-black">
                                                            Friend
                                                </Text>
                                        </View>
                                        
                                        
                                    </View>
                          
                                    )
                                  }}
                                  ListHeaderComponent={ () =>{
                                    return (
                                      <View 
                                       className="w-[100%] h-[30px]  rounded-lg flex-row justify-center gap-7 items-center" >
                                          <Text 
                                          className="text-white text-sm font-black">
                                              Invited Friends
                                          </Text>
                                      </View>
                                    )
                                  }

                                  }
                                
                                  />

                            </View>
                            )} 
                  
                       </View>
                      </>
                  )}

                  
 

               
                    <TouchableOpacity onPress={()=>setPlay(!play)}
                        hitSlop={{ top: 300, bottom: 400, left: 400, right: 400 }}
                       className="absolute top-96 -right-50 flex-column justify-start  items-center">
                        <Image source={!play? icons.play : ""}
                        className={!play? "w-14 h-14 rounded-full": "w-14 h-14 opacity-35 rounded-full"} /> 
                    </TouchableOpacity>     
                    

                     <TouchableOpacity
                          className="absolute bottom-2 left-0 flex-col mb-[55px] justify-center gap-2 items-center h-14 w-[20%] "
                          // onPress={goBack}
                          onPress={()=>setIsRecording(false)}
                          onPressOut={()=> {setVideoUri(null)}}
                            >
                          <Image      
                          className="w-10 h-10 "
                          source={icons.back}
                          resizeMode='contain'
                          />  
                          <Text className="text-white text-xs font-bold">Go Back</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                          className="absolute bottom-2 right-0 flex-col mb-[55px] justify-center gap-2 items-center h-14 w-[20%] "
                          onPress={handleSumitChallenge}
                            >
                          <Image      
                          className="w-10 h-10 "
                          source={isRecording ? icons.submit : icons.submit}
                          resizeMode='contain'
                          />  
                          <Text className="text-white text-xs font-bold">{isRecording? "Submit":"Submit"}</Text>
                      </TouchableOpacity>

                      {/* <TouchableOpacity
                          className="absolute bottom-2 -left-0 flex-col justify-center gap-2 items-center h-14 w-[20%] "
                          onPress={()=>setIsRecording(false)}
                          onPressOut={()=> {setVideoUri(null)}}
                            >
                          <Image              
                          className="w-10 h-10 "
                          source={isRecording ? icons.cancel : icons.cancel}
                          resizeMode='contain'
                          />  
                          <Text className="text-white text-xs font-bold">{isRecording? "Cancel":"Cancel"}</Text>
                      </TouchableOpacity> */}
                            
              </View>
                ):

                (
                
             <CameraView ref={cameraRef} videoQuality="720p"  
                mode='video'    
                facing={facing}    
                style={{flex:1}}
        
                >
                 
                  <View className={!isRecording ?"w-full  bg-primary min-h-[100%]  flex-col justify-between  items-center ":
                                                "w-full  h-[100%] flex-col  justify-between  items-center "
                  }>

                              
    
                        {!isRecording &&
                          (
                          <>


                          <View className="min-w-full  rounded-md opacity-100  flex-row items-center justify-between h-[5vh]"
                                    >
                                        <TouchableOpacity
                                              onPress={() => router.back()}
                                              className="w-[10%] h-[95%]  flex-col justify-center  items-center">
                                              <Image
                                              className="w-7 h-7 bg-white "
                                              source={icons.x} />
                                        </TouchableOpacity>
                                        <View 
                                          className="w-[90%]  min-h-[95%] rounded-md bg-s  flex-row justify-center  items-end  ">
                                            <Text className="text-white text-md  font-bold ">
                                            New Challenge
                                            </Text>
                                        </View> 
                         </View>  

                        

                    
                        
                        

                        <View className="flex-row w-full mt-0 justify-evenly items-start   opacity-100  h-[7vh]">
                            <View className="flex-col w-[25%] mt-0 justify-center items-center  opacity-100 gap-1  min-h-[100%]">
                                    <View className="w-[100%] h-[3vh] ">
                                        <Text
                                          style={{fontSize:9}}
                                          className="text-gray-300 font-black text-xl">
                                            Select Privacy
                                        </Text>                             
                                  </View>
                                  <View className="flex-row w-[100%] mt-0 justify-start items-start   opacity-100   h-[4vh]">
                                    <ChallengeTypeSelector data={privacyData} bgColor={bgPrivacyColor} selected={selectedPrivacy} setSelected={setSelectedPrivacy} title="Select Type" /> 
                                  </View>  
                            </View>
                            <View className="flex-col w-[43%] mt-0 justify-center items-center  border-2  opacity-100  min-h-[100%]">
                                <View  className=" w-[100%] min-h-[100%] px-2 py-2   bg-white flex-col justify-center items-start
                                  rounded-lg   max-h-[320px]">
                                    <Text
                                      className="text-black font-bold text-"
                                      style={{fontSize:9}}>
                                      Note * : {selectedPrivacy == "Private" ? "Private Challenge":"Public Challenge"} 
                                      
                                    </Text>      
                                    <Text className="text-primary font-bold text-xs"
                                                    style={{fontSize:8}}>
                                          {selectedPrivacy == "Private" ? 
                                          " Only Invited friends can Participate in your challenge ":
                                           "Everyone can Participate in your challenge Public is Selected"} 
                                           
                                      </Text>                       
                               </View>   
                            </View>

                            <View className="flex-col w-[25%] mt-0 justify-center items-center  opacity-100 gap-1  h-[100%]">
                                  <View className="w-[100%] h-[3vh] ">
                                        <Text
                                          style={{fontSize:9}}
                                          className="text-gray-300 font-black text-xl">
                                            Select Type
                                        </Text>                             
                                  </View>
                                <View className="flex-row w-[100%] mt-0 justify-center items-start   opacity-100   h-[4vh]">
                                  <ChallengeTypeSelector data={challengeType} bgColor={bgTypeColor} selected={selectedType} setSelected={setSelectedType} title="Select Type" />
                                </View>  
                             </View>
                           
                        </View>
                      
                       


                        {selectedPrivacy == "Private" && 
                        (
                         <>
                    

                       {/* <View className="flex-row w-full mt-10 justify-evenly items-center   opacity-100  h-[5vh]">
                          <View className=" w-[25%] mt-0 flex-row justify-start items-end bottom-0 text-end  min-h-[100%]">
                                <Text
                                  style={{fontSize:10}}
                                  className="text-gray-400 font-black text-xl">
                                    Invite Friends 
                                </Text>                             
                          </View>

                          <View 
                           className="w-[42%] h-[100%] flex-row mt-0 justify-end gap-2 items-end">
                                <Text
                                  className="text-white font-black text-xs">
                                    Select All 
                                </Text>   
                                <TouchableOpacity
                                      onPress={()=> {
                                        setSelectAll(prev => !prev)                
                                      }}
                                      className="w-[20px] h-[20px] border-2 rounded-lg justify-center gap-2 items-center bg-white border-yellow-500">
                                      {selectAll &&
                                     <Image
                                       className="w-3 h-3"
                                      source={icons.check} />
                                      } 
                                        
                                </TouchableOpacity>
                          </View>

                          <View className="flex-row w-[25%] mt-0 justify-start items-end text-end   h-[60%]">
                                            
                          </View>
                       </View> */}


                         
                      <View
                       style={{zIndex:0}}
                       className=" w-[96%]     
                       rounded-lg  min-h-[100px] max-h-[150px] py-3  justify-center items-center">
                          <View 
                             style={{zIndex:0}}
                             className=" w-[72%]  py-2  px-2  bg-blue-200  
                             rounded-lg  min-h-[100px] max-h-[150px]"
                             >
                            <FlatList 
                            scrollEnabled={true}
                            pagingEnabled={false}
                            data={friendList && friendList.friends}
                            keyExtractor ={item => item.sender_id}
                            renderItem={({item,index})=> {
                              return (
                                <View 
                                   key={index}
                                   style={{ backgroundColor :selectedFriends.length > 0 && selectedFriends.find(friend => friend.sender_id === item.sender_id)?"lightgreen":"white"}}
                                   className="px-2 py-3 mt-1 mb-1 w-[100%] h-[30px] bg-white rounded-md flex-row justify-start gap-3 items-center" >
                                    <Image 
                                    className="w-[27px] h-[27px] rounded-full"
                                    source={{uri:item.profile_img}}
                                    resizeMethod='contain'
                                    />
                                    <View className=" justify-center w-[40%] gap-0 items-start h-[30px] flex-col ">
                                            <Text
                                             style={{fontSize:8}}
                                             className="font-black text-black">
                                                {item.name}
                                            </Text>
                                            <Text
                                               style={{fontSize:8}}
                                               className=" text-xs text-blue-600 font-bold">
                                                {getInition(item.name)}Challenger
                                            </Text>
                                    </View>
                                    <View className=" justify-center ml-auto  items-end min-h-[25px] flex-row ">
                                            <Text
                                                style={{fontSize:9}}
                                                className=" text-red-500 font-black">
                                                        Friend
                                            </Text>
                                    </View>
                                    <TouchableOpacity
                                      onPress={()=> {
                                        let f = [...selectedFriends] 
                                        f.find(friend=>friend.sender_id === item.sender_id)?
                                        f = f.filter(friend =>friend.sender_id !== item.sender_id):
                                        f.push(item)   
                                        setSelectedFriends(f)
                                      }}
                                      className="w-[20px] h-[20px] border-2 ml-auto border-orange-300 justify-center items-center rounded-md ">
                                      {selectedFriends.length > 0 && selectedFriends.find(friend => friend.sender_id === item.sender_id) &&
                             
                                     <Image
                                       className="w-3 h-3"
                                      source={icons.check} />
      
                                      } 
                                        
                                    </TouchableOpacity>
                                   
                                </View>


                              )
                            }}
                            ListHeaderComponent={
                                  <View className="flex-row w-[100%] bg-black-100 px-2 rounded-lg  mb-1 justify-between items-center  opacity-100  h-[4vh]">
                                      <View className=" w-[50%] mt-0 flex-row justify-start items-center bottom-0 text-end  min-h-[100%]">
                                            <Text
                                              style={{fontSize:10}}
                                              className="text-gray-400 font-black text-xl">
                                                Challenge Friends 
                                            </Text>                            
                                      </View>
            
                                      <View 
                                      className="w-[50%] h-[100%] flex-row ml-auto justify-end gap-2 items-center">
                                            <Text
                                              className="text-white font-black text-xs">
                                                Select All 
                                            </Text>   
                                            <TouchableOpacity
                                                  onPress={()=> {
                                                    setSelectAll(prev => !prev)                
                                                  }}
                                                  className="w-[20px] h-[20px] border-2 rounded-lg justify-center gap-2 items-center bg-white border-yellow-500">
                                                  {selectAll &&
                                                <Image
                                                  className="w-3 h-3"
                                                  source={icons.check} />
                                                  } 
                                                    
                                            </TouchableOpacity>
                                      </View>
            
                                 
                              </View>
                            }
                          
                            />
                          </View> 
                        </View>   

                        
                       

                   {selectedPrivacy == "Private" &&  (
                    <>

                      


                        <View className="flex-row w-[70%] mt-0 justify-between items-start   opacity-100  h-[7vh]">
                            <View className="flex-col w-[34%] mt-0 justify-end items-center  opacity-100 gap-1  h-[100%]">
                                    <View className="w-[100%] h-[3vh] ">
                                        <Text
                                          style={{fontSize:9}}
                                          className="text-gray-300 font-black text-xl">
                                            Select Audience
                                        </Text>                             
                                  </View>
                                  <View className="flex-row w-[100%] mt-0 justify-start items-start   opacity-100   h-[4vh]">
                                     <ChallengeTypeSelector data={Audience} bgColor={bgModeColor} selected={selectedAudience} setSelected={setSelectedAudience} title="Select Mode"  />
                                  </View>  
                            </View>
                            <View className="flex-col w-[64%] mt-0 justify-center items-center  border-2  opacity-100 gap-1  h-[100%]">
                                <View  className=" w-[100%] h-[100%] px-2 py-2   bg-white flex-col justify-center items-start
                                  rounded-lg  min-h-[40px] max-h-[320px]">
                                    <Text
                                      className="text-gray-500 font-bold text-"
                                      style={{fontSize:9}}>
                                      Note * : {selectedAudience} {''} Mode
                                      
                                    </Text>      
                                    <Text className="text-primary font-bold text-xs"
                                                    style={{fontSize:8}}>
                                          {selectedAudience === "Open"?"Everyone can see , like and vote  your challenge"
                                          :selectedAudience === "Restricted"?"Only your friends can see your challenge "
                                          :"only Invited friends to you challenge can see, like and vote in  your challenge"}  
                                      </Text>                       
                               </View>
                            </View>

                            
                        </View>
                      
                    </>
                     )}


                


                        
                       </>
                      ) }

               

                              
                        </>


                          )}
                  
                    {/* {isRecording && (
                      <Text className="text-white text-xl">{formatTime(timer)}</Text>
                    )}  */}

                    {selectedPrivacy == "Public" &&  (
                        <View className=" w-[95%]  justify-start items-center   opacity-100 gap-1  min-h-[30vh]">
                           
                        </View>
                    )}

                    <View className=" w-[95%]  justify-start items-center   opacity-100 gap-1  min-h-[4vh]">
                           
                    </View>



               <View 
               style={{backgroundColor: !isRecording ?"#523c27":"transparent"}}
               className=" w-[100%] flex-col justify-start items-center  bg-amber-800 rounded-tl-3xl rounded-tr-3xl opacity-100 ">

                    {!isRecording && (
                      <>
                       <View className="flex-row w-full  justify-evenly items-center   opacity-100 gap-  h-[6vh]">  
                          <TextInput
                                  className="border-2 border-gray-100 bg-[#dbd8d0] rounded-tl-3xl rounded-tr-3xl opacity-100"
                                  style={{ minHeight: "100%",width:'100%', borderColor: 'none',fontWeight:'700', borderWidth: 2,
                                    color:'#242625',textAlign:'center',fontSize:11,borderRadius:5
                                  }}   
                                  onChangeText={text => setDescription(text)}
                                  value={description}
                                  placeholder={currentPlaceholder}
                                  onFocus={()=>{setCurrentPlaceholder("")}}
                                  onBlur={()=>{if(description === "" ) setCurrentPlaceholder("Add a description ")}}
                                  placeholderTextColor='#242625'
                                  keyboardType ="email-address"
                            />
                      </View>   
                     
                      <View  className=" w-[100%] py-2  flex-row justify-center items-center   bg-white rounded-lg opacity-100  max-h-[13vh]">
                          <ScrollView  className=" max-w-[95%] max-h-[95%]   rounded-lg opacity-100  ">
                                          <Text
                                            className="text-gray-500 font-bold "
                                            style={{fontSize:9}}>
                                            Note * : agrrements
                                            
                                          </Text>      
                                          <Text className="text-gray-600 font-black "
                                                          style={{fontSize:9}}>
                                                the video you are posting must be created by you, Do not upload videos from other sources or use copyrighted material.
                                                Keep the content fun, lighthearted, and respectful. Avoid any graphic, offensive, or inappropriate material. Your video
                                                should contribute to a positive and enjoyable experience for everyone.
                                                Videos containing violent, explicit, or harmful content are not allowed. This includes graphic imagery, hate speech,
                                                or anything that could be considered offensive or inappropriate.
                                          </Text>    
                          </ScrollView>
                      </View>  
                     </>
                    )} 


                  
      
                    <View className="flex-row min-w-full   rounded-tl-2xl rounded-tr-2xl justify-between  items-center  opacity-85  h-[10vh]">
                      <TouchableOpacity
                          className="flex-row justify-center gap-2 items-center h-[100%] w-[35%] "
                          onPress={isRecording? stopRecording :description == "" ? confirmDescription:
                          (selectedPrivacy == "Private" && selectedFriends.length == 0)?confirmPrivacy: startRecording}
                           >
                          <Image    
                          className="w-10 h-10 "
                          source={isRecording ? icons.camera_recording : icons.camera}
                          resizeMode='contain'
                          />
                          <View className="h-[50%] flex-col justify-end  ">
                              <Text
                              style={{fontSize:12}}
                              className="text-white text-xs font-black">
                                {isRecording? "Recording":"Record "}
                              </Text>
                          </View>      
                      </TouchableOpacity>
                     {!isRecording && (
                      <TouchableOpacity
                         className="flex-row justify-center gap-2 items-center h-[100%] w-[35%] "
                         onPress={description == ""?confirmDescription:uploadVideo}
                     >     
                         <Image    
                         className="w-12 h-12 "
                         source={icons.upload}
                         resizeMode='contain'
                         />
                          <View className="h-[50%] flex-col justify-end  ">
                              <Text 
                            style={{fontSize:12}}
                            className="text-white text-xs font-black">
                              Upload
                            </Text>
                         </View>      
                        
                     </TouchableOpacity>
                     )}      
                
                      {isRecording && (   
                        <View
                        className="flex-row justify-center   items-end h-[50%] w-[55%] ">   
                          <Text className="text-white text-xl">{formatTime(timer)}</Text>
                      </View>
                      )}
                    </View>

                    <View className=" w-[95%]  justify-start items-center   opacity-100 gap-1  min-h-[59px]">
                           
                    </View>

                  </View>

                  {isRecording && (       
                  <TouchableOpacity
                      className="flex-row justify-center absolute top-1 right-1  items-center  "
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

               

              </CameraView>   
              
                )
              }



               {isModalVisible && (
                      <CustomAlert text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
               )}


               {visible && (
                      <LoadModel visible={visible} setVisible={setVisible}
                     />
               )}


              </SafeAreaView>
            
 
               

            
   
    
 
  )
}

