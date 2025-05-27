import { View, Text, Image, TouchableOpacity, useWindowDimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwingingTitle from '../components/custom/SwingingTitle'
import { useGlobalContext } from '../context/GlobalProvider'
import { addChallengeToFavourite, deleteChallenge, getChallengeById, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges,
   getUserPublicParticipateChallenges, quitChallenge, removeChallengeFromFavourite, 
   updateNotificationByUser} from '../apiCalls'
import { router, useLocalSearchParams } from 'expo-router'
import { icons, images } from '../constants'
import CustomAlert from '../components/custom/CustomAlert'
import { storage } from '../firebase'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import ChallengeExpired from '../components/challenge/ChallengeExpired'

// import { Ionicons } from '@expo/vector-icons'


export default function CoverChallengePage() {

 const {user,setUser,userChallenges,setUserChallenges,favouriteChallenge , setFavouriteChallenge,setPublicParticipateChallenges,setPrivateParticipateChallenges,
  setUserPrivateChallenges,setUserPublicChallenges,userFriendData,participateChallenges,setParticipateChallenges,notifications,setNotifications} = useGlobalContext()
const[challenge,setChallenge] = useState(null)
const {challenge_id} =  useLocalSearchParams();
const[isExpired,setIsExpired] = useState(false)
const [icon ,setIcon] = useState("")
const[isFavourite,setIsFavourite] = useState(false)
const [isModalVisible, setIsModalVisible] = useState(false);
const [action, setAction] = useState("");
const [text,setText] = useState()
const [participantStatus,setParticipantStatus] = useState("")
const{width ,height} = useWindowDimensions()



useEffect(() => {
    if (challenge_id) {
      getChallengeById(challenge_id,setChallenge,setIsExpired)
    }
    return () => {
      console.log("cleaning up displayer")
      setChallenge(null)
    //   setDisplayData([])
    //   setViewableItems([])
    };
  }, [])

useEffect(() => {
  const getParticipateStatus =() => {
    if(challenge) {
      if(challenge.origin_id == user._id && challenge.participants.length == 1 && challenge.participants.find(participant=>participant.user_id == user._id)) 
         { 
          setParticipantStatus("Delete") 
          return false
         }
      if(challenge.origin_id == user._id && challenge.participants.length >1 && challenge.participants.find(participant=>participant.user_id == user._id)) 
        { 
          setParticipantStatus("Resign") 
          return false
         }
      if(challenge.origin_id == user._id  && !challenge.participants.find(participant=>participant.user_id == user._id)) 
        { 
          setParticipantStatus("Join") 
          return false
         }
      if(challenge.origin_id !== user._id  && !challenge.participants.find(participant=>participant.user_id == user._id)) 
      {
        if(challenge.privacy == "Private" )
           if (challenge.invited_friends.find(friend=>friend.sender_id == user._id))
                  return setParticipantStatus("Invited")
           else  setParticipantStatus("Not Invited")
        else return setParticipantStatus("Join")
      }
      if(challenge.origin_id !== user._id && challenge.participants.length == 1 && challenge.participants.find(participant=>participant.user_id == user._id)) 
        return setParticipantStatus("Delete")
      if(challenge.origin_id !== user._id && challenge.participants.length >1 && challenge.participants.find(participant=>participant.user_id == user._id)) 
        return setParticipantStatus("Resign")
    }
  }
  getParticipateStatus()
}, [challenge])


useEffect(() => {
    favouriteChallenge &&  setIsFavourite(favouriteChallenge.favourites.find(chall=>chall._id === challenge_id))  
}, [favouriteChallenge])  

const addToFavourite  = ()=> {
    setIsModalVisible(false)
    addChallengeToFavourite(user._id,challenge,setFavouriteChallenge,setIsExpired)
  }
  
  const removeFromFavourite = ()=> {
    setIsModalVisible(false)
    removeChallengeFromFavourite(user._id,challenge,setFavouriteChallenge,setIsExpired)
 }

const confirmAddToFavourite  = ()=> {
    setIsModalVisible(true)
    
    setAction("FA")
    setText("You are about to add the challenge to your Watchlist list")
    }
const confirmRemoveFromFavourite  = ()=> {
      setIsModalVisible(true)
      setAction("RF")
      setText("You are  about to remove  the challenge from your Watchlist list")
    }


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
        setIcon("gray")
    }
  }

  //**************************** confirm join delete design challenge ************************ */


  const joinChallenge = () => {
    setIsModalVisible(false)
    router.push({ pathname: '/CreateParticipateChallenge', params: {challenge_id:challenge._id} })
 }

 const resignChallenge = async() => {
  setIsModalVisible(false)
  // setVisible(true)
  await quitChallenge(challenge._id,user._id).
  then(res => {
    if(challenge.origin_id == user._id) {
      challenge.privacy == "Public"? getUserPublicChallenges(user._id,setUserPublicChallenges)
      : getUserPrivateChallenges(user._id,setUserPrivateChallenges)
    }else {
      challenge.privacy == "Public"? getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
      :getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
    }
    setTimeout(() => {
      router.back()
     }, 500);
   

    //  setTimeout(() => {
    //   router.push({ pathname: '/ParticipationManagement',params: {
    //     priv:challenge.privacy === "Private" &&  challenge.audience !== "Strict" ? "true":"false", 
    //     publ:challenge.privacy === "Public"  ? "true":"false",
    //     strict : challenge.privacy=="Private" && challenge.audience == "Strict"?"true":"false"
    //      }})    
    // }, 1200);
    setTimeout(() => {
      // setVisible(false)
    }, 1000);
    const you = challenge.participants.find(participant => participant.user_id == user._id)
     const videoRef = ref(storage,you.video_url); 
     const thumbnailRef = ref(storage,you.thumbNail_URL); 
     Promise.all( [deleteObject(videoRef),deleteObject(thumbnailRef)])
      .then(() => {
       console.log("both deleted successfully!");

       })
      .catch((error) => {
      console.error("Error deleting file:", error);
       });  
  })
}

 const removeChallenge = async() => {
  setIsModalVisible(false)
  await deleteChallenge(challenge._id,user._id).
   then((res) => {    
        // setVisible(true)
        const you = challenge.participants.find(participant => participant.user_id == user._id);
        const videoRef = ref(storage,you.video_url); 
        const thumbnailRef = ref(storage,you.thumbNail_URL); 
        
        if(user._id == challenge.origin_id) 
          { 
           challenge.privacy === "Public"? getUserPublicChallenges(user._id , setUserPublicChallenges)
           :getUserPrivateChallenges(user._id , setUserPrivateChallenges)
           setTimeout(() => {
            router.back()
           }, 500);
          //  setTimeout(() => {
          //   router.push({ pathname: '/challengeManagement',params: {
          //     publ:challenge.privacy === "Public"? "true":"false",
          //     priv:challenge.privacy === "Private" && challenge.audience !== "Strict" ? "true":"false",
          //     strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" ,
      
          //      }})    
          // }, 1000);
          //  router.push({ pathname: '/profile',params: {
          //   priv:challenge.privacy == "Private"?"true":"false", publ:challenge.privacy === "Public"? "true":"false",
          //   participate:"false" , invited:"false" , strict :"false" 
          //    }})    
           }              
        else {
             challenge.privacy === "Public"? getUserPublicParticipateChallenges(user._id , setPublicParticipateChallenges)
             :getUserPrivateParticipateChallenges(user._id , setPrivateParticipateChallenges)
             setTimeout(() => {
              router.back()
             }, 500);
            //  router.push({ pathname: '/profile',params: {
            //    priv:challenge.privacy == "Private"?"false":"false", publ:challenge.privacy === "Public"? "false":"false",
            //    participate:  challenge.privacy=="Public"?"true":"false" , 
            //    invited: challenge.privacy=="Private" && challenge.audience !== "Strict" ?"true":"false" ,
            //    strict : challenge.privacy=="Private" && challenge.audience == "Strict"?"true":"false"
            //  } }) 
           }

            setTimeout(() => {
                  // setVisible(false)
            }, 1500);

           Promise.all( [deleteObject(videoRef),deleteObject(thumbnailRef)])
           .then(() => {
             console.log("both deleted successfully!");
           })
           .catch((error) => {
             console.error("Error deleting file:", error);
           });  
        
   })
 
}

  const confirmAction  = ()=> {
    setIsModalVisible(true)
    switch (participantStatus) {
      case "Join":
        setAction("JN")
        setText("Are you sure you want to join the challenge")
        break;
      case "Invited":
        setAction("JN")
        setText("Are you sure you want to join the challenge")
        break;
      case "Resign":
        setAction("RS")
        setText("Are you sure you want to resign and delete your participation from the challenge")
        break;
      case "Delete":
        setAction("DT")
        setText("Are you sure you want to delete the challenge")
        break;
      default:
        break;
    }
     
    // if(canJoin){
    //     setAction("JN")
    //     setText("Are you sure you want to join the challenge")
    // }else {
    //   setAction("OK")
    //   setText("this is a private challenge , you are not invited to participate")
    // }
    }

   if(isExpired) return <ChallengeExpired challenge_id={challenge_id}/>


return (
    <>
      {challenge &&  (
            <SafeAreaView
                className="flex-1 bg-primary" >
                  {!isExpired && (  
                    <View
                     className="flex-1 min-h-full flex-col justify-start border-l-2 border-r-2 border-[#e6eaf0] items-center">

                         <View
                            style={Platform.OS == "android" && {borderTopRightRadius:15,borderTopLeftRadius:15}}
                            className="w-[100%] h-[7%] px-5 bg-[#e6eaf0] rounded-tl-[50px] rounded-tr-[50px] flex-row justify-between items-center">
                                <TouchableOpacity
                                    onPress={()=> router.back()}
                                    className= "w-10 h-[100%]   flex-row justify-center items-center ">
                                    <Image
                                        source={icons.back1} 
                                        resizeMethod='contain'
                                        className="w-10 h-[60%]"
                                        />
                                </TouchableOpacity>
                            
                                <Text
                                className="text-black font-black">
                                Challenge
                                </Text>
                                <TouchableOpacity
                                      onPress={
                                        () => router.navigate({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })
                                    }
                                    className= "w-10 h-[100%]   flex-row justify-center items-center ">
                                    <Image
                                    source={icons.next} 
                                    resizeMethod='fill'
                                    className="w-10 h-[60%] "
                                    />
                                </TouchableOpacity>
                                
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
                        
                        <View className="w-[100%] h-[14%] px-2  flex-row justify-start items-center">
                                <View
                                    className="w-[33%] h-[100%] flex-col justify-center gap-1 items-center">
                                       
                                        <TouchableOpacity  
                                        onPress={!isFavourite?confirmAddToFavourite:confirmRemoveFromFavourite}
                                        className="  rounded-lg flex-row justify-center   items-center  "
                                        >
                                           
                                            {/* <Ionicons name='heart' size={width/8} color={isFavourite?"red":"pink"} /> */}
                                            <Image
                                                source={icons.watchlist}
                                                resizeMethod='cover'
                                                style={{width:width/8, height:width/8}}
                                                className=" " />
                                        </TouchableOpacity>
                                        <View
                                                className=" w-[100%] h-[20%] flex-row justify-center items-center">
                                                 <Text  
                                                   style={{fontSize:10}}
                                                   className="text-white font-bold text-sm">
                                                        {isFavourite?"in the Watchlist":"Add to your Watchlist"}
                                                </Text>  
                                        </View>
                                         
                                 </View>

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
                                    className="w-[33%] h-[100%] flex-col justify-center gap-2 items-center">
                                        <TouchableOpacity
                                                onPress={ confirmAction }
                                                style={{width:width/5, height:width/8 ,
                                                  backgroundColor : participantStatus =="Join" || participantStatus =="Invited" ?"#3de909":
                                                  participantStatus == "Delete" || participantStatus == "Resign"?"#c23030":"#a4b0ac"
                                                }}
                                                className= "bg- rounded-full flex-row justify-center items-center ">
                                                 <Text
                                                   style={{fontSize:width/37,
                                                    color : participantStatus == "Join"|| participantStatus =="Invited" ?'black':
                                                    participantStatus == "Delete" || participantStatus == "Resign"? "#dfe4ed":"#black"
                                                  }}      
                                                  className="font-black">
                                                    {participantStatus}  
                                                </Text>
                                        </TouchableOpacity>
                                        <View
                                                className=" w-[100%] h-[20%]  flex-row justify-center items-center">
                                                <Text
                                                className="text-white font-black"
                                                style={{fontSize:10}}>
                                                    {participantStatus =="Join" || participantStatus =="Invited" ?"click to participate":
                                                  participantStatus == "Delete"?"delete the challenge": participantStatus == "Resign"?"delete your post":
                                                  "not invited to challenge"}
                                                </Text>
                                        </View>   
                                        <View
                                        // style={{top:7,right:width/2}}
                                        className="absolute top-2 right-4">
                                               <Image
                                                className="w-8 h-8 rounded-full bg-white"
                                                source={participantStatus == "Join"|| participantStatus =="Invited" ?icons.participate:
                                                  participantStatus =="Resign"?icons.resign:
                                                  participantStatus =="Delete"?icons.delet:icons.x
                                                  // participantStatus =="Not Invited"?
                                                }
                                               />
                                        </View>
                                 </View>



                        </View>

                        <View className="absolute bottom-10 w-[100%] h-[10%] px-2  flex-row justify-center items-center">
                                 <View
                                    className="w-[30%] h-[100%] flex-row justify-center gap-2 items-center">
                                        <Text  className="text-blue-400 font-black "
                                                style={{fontSize:26}}>
                                            PL
                                        </Text>
                                        <TouchableOpacity
                                                onPress={
                                                    () => router.navigate({ pathname: '/ChallengeDisplayer', params: {challenge_id:challenge._id} })
                                                }
                                                className= "   flex-row justify-center items-center ">
                                                 <Image
                                                source={icons.play}
                                                resizeMethod='cover'
                                                style={{width:width/10, height:width/10}}
                                                className=" rounded-full " />
                                        </TouchableOpacity>
                                        <Text  className="text-blue-400 font-black "
                                                style={{fontSize:26}}>
                                            AY
                                        </Text>
                                     
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

                        <View
                                className="w-[100%] h-[5%] bg-gray-100 mt-auto  flex-row justify-start items-center">
                                <SwingingTitle text={challenge.desc} color="black" fontSize={12} />
                        </View>

                         
                    </View>

                 )}
                 
                    {isModalVisible && (  
                     <CustomAlert text={text} action={action} isModalVisible={isModalVisible} removeFromFavourite={removeFromFavourite} removeChallenge = {removeChallenge}
                       setIsModalVisible={setIsModalVisible} addToFavourite={ addToFavourite} joinChallenge={joinChallenge} resignChallenge={resignChallenge}
                       />
                 )}
               
            </SafeAreaView>
      )}
      
    </>
   
  )
}