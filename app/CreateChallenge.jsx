import { View, Text, Button, TouchableOpacity, Image, StyleSheet, TextInput, Alert, FlatList, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  {CameraView, CameraType, useCameraPermissions, useMicrophonePermissions, Camera}   from 'expo-camera'
import { icons,images } from '../constants'
import { Video } from 'expo-av'
import { _uploadVideoAsync} from '../firebase'
import { useGlobalContext } from '../context/GlobalProvider'
import { Redirect, router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { BASE_URL, getChallengeById, getUserChallenges, getUserFriendsData, getUserParticipateChallenges, getUserPrivateChallenges, getUserPublicChallenges } from '../apiCalls'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { challengeType  , privacyData } from '../utilities/TypeData'
import ChallengeTypeSelector from '../components/challenge/ChallengeTypeSelector'
import { getInition } from '../helper'
import SwingingTitle from '../components/custom/SwingingTitle'
import CustomAlert from '../components/custom/CustomAlert'
import LoadModel from '../components/custom/LoadModal'


// import privacyData from '../../components/ChallengeTypeSelector'

export default function CreateChallenge() {
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
  const [bgPrivacyColor ,setBgPrivacyColor] = useState("blue")


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
        // videoRef && videoRef.currentAsynch()
        setChallenge(null)
        setSelectedType('Adventure')
        setSelectedPrivacy('Public')
      };
    },[]
  );


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
    console.log("mmm herrrre")
    setIsRecording(true)
   
    let options ={
      maxDuration: 100,
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

    if(description == "") return confirmDescription()
    if(videoUri ) { 
      setVisible(true)
     
      setTimeout(() => {
        router.push({ pathname: '/profile',params: {
        priv:selectedPrivacy == "Private"?"true":"false", publ:selectedPrivacy === "Public"? "true":"false",
        yourChallenges:"true" , yourParticipations:"false"   
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
          friendList:selectedFriends
        }
        
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
                // selectedPrivacy == "Public"? getUserPublicChallenges(user._id ,setUserPublicChallenges):
                // getUserPrivateChallenges(user._id ,setUserPrivateChallenges)
                // router.push({ pathname: '/profile',params: {
                // priv:selectedPrivacy == "Private"?"true":"false", publ:selectedPrivacy === "Public"? "true":"false",
                // yourChallenges:"true" , yourParticipations:"false"   
                // } }) 
              selectedPrivacy == "Public"? getUserPublicChallenges(user._id ,setUserPublicChallenges):
              getUserPrivateChallenges(user._id ,setUserPrivateChallenges)
              setTimeout(() => {
      
                    router.push({ pathname: '/ChallengeDisplayer', params: {challenge_id:res.data._id} })
              }, 1000);
            }
             
          )
      
         
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

  
  
  return (
  
           
           <SafeAreaView
                className="w-full flex-1 h-[100vh] bg-primary">           
                {videoUri ? (
               <View className="flex-1 flex-column  justify-start  items-center ">
                 <Video
                   ref={videoRef}
                   className={play ? "opacity-100":"opacity-10"}
                   style={{minWidth:'100%',minHeight:'100%',position:'relative'}}
                   source={{uri:videoUri}}
                   shouldPlay={play}
                   isMuted={false}
                   useNativeControls={false}
                   isLooping
                   resizeMode='cover'
                   />

                  {!play && (
                      <>
                      <View className="min-w-full h-[7vh] absolute top-0  flex-row   justify-start  items-end ">
                                    <TouchableOpacity
                                          onPress={() => router.back()}
                                          className="w-[10%] h-[95%]  flex-col justify-center  items-center">
                                          <Image
                                          className="w-10 h-10 bg-white "
                                          source={icons.x} />
                                    </TouchableOpacity>
                                    <View 
                                        className="w-[90%]  min-h-[95%] rounded-md bg-s  flex-row justify-evenly  items-end  ">
                                          <Text className="text-white text-xl  font-bold ">
                                              New Challenge
                                          </Text>
                                          <Text className="text-white text-xl  font-bold ">
                                              {selectedType}
                                          </Text>
                                          <Text className="text-secondary-200 text-xl  font-bold ">
                                              {selectedPrivacy}
                                          </Text>
                                  </View>          
                      </View>

                      <View className="min-w-full h-[7vh] absolute top-40  flex-row    ">
                          <SwingingTitle color="white" fontSize={18} text={description} />
                      </View>
                      <View className="w-full h-[7vh] absolute bottom-96 flex-row   justify-center items-center    ">
                             <Text className="text-blue-200 text-xl  font-black ">
                                   Who can Challenge you
                             </Text>
                     
                      </View>

                      <View 
                          className=" w-[70%] absolute bottom-48 px-2 py-2   bg-gray-400  
                          rounded-lg  min-h-[150px] max-h-[320px]"
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
                                   className="px-2 py-2 mt-1 mb-1 w-[100%] h-[40px] bg-white rounded-lg flex-row justify-start gap-7 items-center" >
                                    <Image 
                                    className="w-[35px] h-[35px] rounded-full"
                                    source={{uri:item.profile_img}}
                                    resizeMethod='contain'
                                    />
                                    <View className=" justify-center gap-0 items-start min-h-[40px] flex-col ">
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
                                                style={{fontSize:11}}
                                                className=" text-red-500 font-black">
                                                        Friend
                                            </Text>
                                    </View>
                                    
                                   
                                </View>
                      
                                )
                              }}
                            
                              />
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
            <View className="flex-1   justify-center  items-center ">       
             <CameraView ref={cameraRef} videoQuality="720p"
                mode='video'
                facing={facing}
                style={{width:'100%',height:'100%'}}
                // className="flex-1 w-full bg-primary"    
                >
                  <View className="min-w-full py- flex-1 flex-col justify-start gap-6 items-center ">

                              
    
                        {!isRecording &&
                          (
                          <>


                          <View className="min-w-full  rounded-md  flex-row items-center justify-between h-[5vh]"
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

                         <View className="flex-row w-full border-blue-300 justify-center items-center  opacity gap-5  h-[5vh]">
                            <TextInput
                                className="bg-blue-500"
                                style={{ minHeight: 40,width:'95%', borderColor: 'transparent',fontWeight:'700', borderWidth: 2,
                                  color:'white',textAlign:'center',fontSize:12,borderRadius:5
                                }}   
                                onChangeText={text => setDescription(text)}
                                value={description}
                                placeholder={currentPlaceholder}
                                onFocus={()=>{setCurrentPlaceholder("")}}
                                onBlur={()=>{if(description === "" ) setCurrentPlaceholder("Add a description to your challenge")}}
                                placeholderTextColor='white'
                                keyboardType ="email-address"
                              />
                        </View>   


                        <View className="flex-row w-full mt-2 justify-center items-center   opacity-100 gap-5  h-[7vh]">
                          <ChallengeTypeSelector data={challengeType} bgColor={bgTypeColor} setSelected={setSelectedType} />
                          <ChallengeTypeSelector data={privacyData} bgColor={bgPrivacyColor} setSelected={setSelectedPrivacy} /> 
                        </View>  



                        {selectedPrivacy !== "ivate" && 
                        (
                         <>
                          <View className="">
                                <Text
                                  className="text-blue-400 font-bold text-sm">
                                  {selectedPrivacy == "Private"?"Challenge Friends":"Invite Friends "}
                                </Text>                             
                          </View>

                          <View 
                           className="w-[80%] h-4 flex-row mt-3 justify-start gap-2 items-end">
                                <Text
                                  className="text-white font-black text-xs">
                                    Select All 
                                </Text>   
                                <TouchableOpacity
                                      onPress={()=> {
                                        setSelectAll(prev => !prev)                
                                      }}
                                      className="w-[25px] h-[25px] border-4  justify-center gap-2 items-center bg-white border-yellow-500">
                                      {selectAll &&
                                     <Image
                                       className="w-6 h-4"
                                      source={icons.check} />
                                      } 
                                        
                                    </TouchableOpacity>
                          </View>

                          <View 
                             className=" w-[80%]  px-2 py-2   bg-blue-200  
                             rounded-lg  min-h-[50px] max-h-[320px]"
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
                                   className="px-2 py-2 mt-1 mb-1 w-[100%] h-[40px] bg-white rounded-lg flex-row justify-start gap-4 items-center" >
                                    <Image 
                                    className="w-[35px] h-[35px] rounded-full"
                                    source={{uri:item.profile_img}}
                                    resizeMethod='contain'
                                    />
                                    <View className=" justify-center gap-0 items-start min-h-[40px] flex-col ">
                                            <Text
                                             style={{fontSize:9}}
                                             className="font-black text-black">
                                                {item.name}
                                            </Text>
                                            <Text
                                               style={{fontSize:8}}
                                               className=" text-xs text-blue-600 font-bold">
                                                {getInition(item.name)}Challenger
                                            </Text>
                                    </View>
                                    <View className=" justify-center  items-end min-h-[25px] flex-row ">
                                            <Text
                                                style={{fontSize:11}}
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
                                      className="w-[25px] h-[25px] border-2 ml-auto justify-center items-center border-gray-400">
                                      {selectedFriends.length > 0 && selectedFriends.find(friend => friend.sender_id === item.sender_id) &&
                             
                                     <Image
                                       className="w-4 h-4"
                                      source={icons.check} />
      
                                      } 
                                        
                                    </TouchableOpacity>
                                   
                                </View>


                              )
                            }}
                          
                            />
                          </View> 

                   {selectedPrivacy == "Private" &&  (
                            <View  className=" w-[80%]  px-2 py-2 mt-auto  bg-white 
                               rounded-lg  min-h-[50px] max-h-[320px]">
                                <Text
                                  className="text-black font-black text-sm">
                                  Note * : <Text className="text-primary font-pmedium text-xs">
                                        Only Selected friends can Participate in your challenge
                                        when Private is Selected
                                  </Text>
                                </Text>                             
                            </View>
                     )}

                        
                       </>
                      ) }

                        
                      
                        </>


                          )}
                  
                   
                 
                   
                    <View className="flex-row min-w-full mt-auto  justify-between items-end  opacity-85  h-[10vh]">
                    
                      <TouchableOpacity
                          className="flex-col justify-center gap-2 items-center h-full w-[20%] "
                          onPress={isRecording? stopRecording :description == "" ? confirmDescription:
                          (selectedPrivacy == "Private" && selectedFriends.length == 0)?confirmPrivacy: startRecording}
                      >
                          <Image    
                          className="w-10 h-10 "
                          source={isRecording ? icons.camera_recording : icons.camera}
                          resizeMode='contain'
                          />
                          <Text className="text-white text-xs font-bold">{isRecording? "Recording":"Start "}</Text>
                      </TouchableOpacity>
                     {!isRecording && (
                      <TouchableOpacity
                         className="flex-col justify-center gap-2 items-center h-full w-[20%] "
                         onPress={description == ""?confirmDescription:uploadVideo}
                     >
                         <Image    
                         className="w-10 h-10 "
                         source={icons.upload}
                         resizeMode='contain'
                         />
                         <Text className="text-white text-xs font-bold">Upload</Text>
                     </TouchableOpacity>
                     )}
                     

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
              </View>
               
              
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

