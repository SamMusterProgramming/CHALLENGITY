import { View, Text, FlatList, useWindowDimensions, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import SwingingTitle from '../custom/SwingingTitle'
// import InstantPlayer from './InstantPlayer';

// import { getInition, sortChallengeByVotes } from '../../helper';
import { router, useLocalSearchParams } from 'expo-router';
import { addChallengeToFavourite, deleteChallenge, getChallengeById, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, quitChallenge, removeChallengeFromFavourite } from '../apiCalls';
import { getInition, sortChallengeByVotes } from '../helper';
import { icons } from '../constants';
import InstantPlayer from '../components/challenge/InstantPlayer';
import SwingingTitle from '../components/custom/SwingingTitle';
import { SafeAreaView } from 'react-native-safe-area-context';
import FSinstantPlayer from '../components/challenge/FSinstantPlayer';
import ChallengeAction from '../components/modal/ChallengeAction';
import ButtonChallengeAction from '../components/challenge/ButtonChallengeAction';
import { useGlobalContext } from '../context/GlobalProvider';
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { storage } from '../firebase';
import ChallengeExpired from '../components/challenge/ChallengeExpired';
import PostPlayerModal from '../components/modal/PostPlayerModal';
import ChallengeDescriptionModal from '../components/modal/ChallengeDescriptionModal';
import ProfileDisplayModal from '../components/modal/ProfileDisplayModal';



export default function FSinstantChallengeDisplay() {
   
    const flatRef = useRef()
    const [viewableItems, setViewableItems] = useState([]);
    const [finishPlaying ,setFinishPlaying] = useState(false)
    const [currentIndex,setCurrentIndex] = useState(0)
    const { width, height } = useWindowDimensions();
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(false)
    const [data,setData] = useState(null)
    const [displayData,setDisplayData] = useState([])
    const [indexList , setIndexList] = useState(1)
    const [challenge , setChallenge] = useState(null)
    const { challenge_id } = useLocalSearchParams()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [participantStatus,setParticipantStatus] = useState("")
    const [text,setText] = useState("")
    const [action,setAction] = useState("")
    const[isFavourite,setIsFavourite] = useState(false)
    const[isExpired,setIsExpired] = useState(false)
    const [isPlayerModalVisible, setIsPlayerModalVisible] = useState(false)
    const [selectedPost ,setSelectedPost] = useState(null)
    const [selectedRank ,setSelectedRank] = useState(0)
    const [isDescriptionrModalVisible, setIsDescriptionModalVisible] = useState(false)
    const [descriptionType,setDescriptionType] = useState(null)
    const [icon,setIcon] = useState("")
    const [isProfileDisplayerModalVisible, setIsProfileDisplayerModalVisible] = useState(false)
    const [selectedProfile , setSelectedProfile] = useState(null)


    
    useEffect(() => {
      if(challenge_id) getChallengeById(challenge_id, setChallenge , setIsExpired)
    }, [])
    
    const {user,setUser,userChallenges,setUserChallenges,favouriteChallenge , setFavouriteChallenge,setPublicParticipateChallenges,setPrivateParticipateChallenges,
        setUserPrivateChallenges,setUserPublicChallenges,userFriendData,participateChallenges,setParticipateChallenges,notifications,setNotifications} = useGlobalContext()

    
    useEffect(() => {
           selectedPost && setIsPlayerModalVisible(true)
     }, [selectedPost]) 
   
    //************************************ favourites */

    useEffect(() => {
        challenge && favouriteChallenge &&  setIsFavourite(favouriteChallenge.favourites.find(chall=>chall._id === challenge._id))  
    }, [favouriteChallenge,challenge]) 
    
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

    //************************************ restructure challenge based on participants and invites */

    useEffect(() => {
     if(challenge){
       if(challenge.privacy == "Public") {
           let data = []
           challenge.participants.forEach(participant => {
             data.push({...participant , status:"PA"})
           })
           data = sortChallengeByVotes(data)
           setData({posts:sortChallengeByVotes(data)})
           setDisplayData(data.slice(0,6))
           setMoreRight(data.length > 6 ? true:false)
       }else {
             let data = []
             challenge.participants.forEach(participant => {
             data.push({...participant , status:"PA"})
            })
            challenge.invited_friends.forEach (invite => {
                if(!challenge.participants.find(participant => participant.user_id == invite.sender_id))
                {
                    data.push(
                        {
                         _id:invite.sender_id,
                         name:invite.name,
                         status:"NP",
                         profile_img:invite.profile_img,
                         email:invite.email
                        }
                    )
                }
            })
            data = sortChallengeByVotes(data)
            setData({posts:data})
            setDisplayData(data.slice(0,6))
            setMoreRight(data.length > 6 ? true:false)
       }
      }
    }, [challenge])

    

    
    const handleNext = ()=> {
        const newData = data.posts.slice( indexList * 6 , (indexList + 1)* 6);
        setDisplayData([ ...newData]);
        setIndexList(prev => prev + 1 )
     }

     const handleBack = ()=> {
        const newData = data.posts.slice((indexList - 2) * 6 , (indexList - 1 ) * 6);
         setDisplayData([...newData]);
        setIndexList(prev => prev - 1 )
     }

    useEffect(() => {
       if(data){
        (indexList -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
        (data.posts.length < (indexList) * 6)? setMoreRight(false) :setMoreRight(true)
       }
      }, [indexList])

//****************************** confirm challenge action */
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
              setTimeout(() => {
                router.push({ pathname: '/UserChallenges',params: {
                  publ:challenge.privacy === "Public"? "true":"false",
                  priv:challenge.privacy === "Private" && challenge.audience !== "Strict" ? "true":"false",
                  strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" ,
                  userChallenges:"true",
                  userParticipations:"false"
                   }})    
              }, 1000);
            }else {
              challenge.privacy == "Public"? getUserPublicParticipateChallenges(user._id,setPublicParticipateChallenges)
              :getUserPrivateParticipateChallenges(user._id,setPrivateParticipateChallenges)
              setTimeout(() => {
                router.push({ pathname: '/UserChallenges',params: {
                  publ:challenge.privacy === "Public"? "true":"false",
                  priv:challenge.privacy === "Private" && challenge.audience !== "Strict" ? "true":"false",
                  strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" ,
                  userChallenges:"false",
                  userParticipations:"true"
                   }})    
              }, 1000);
            }
            // setTimeout(() => {
            //   router.back()
            //  }, 500);
           
        
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
                //    setTimeout(() => {
                //     router.back()
                //    }, 500);
                   setTimeout(() => {
                    router.push({ pathname: '/UserChallenges',params: {
                      publ:challenge.privacy === "Public"? "true":"false",
                      priv:challenge.privacy === "Private" && challenge.audience !== "Strict" ? "true":"false",
                      strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" ,
                      userChallenges:"true",
                      userParticipations:"false"
                       }})    
                  }, 1000);
                  //  router.push({ pathname: '/profile',params: {
                  //   priv:challenge.privacy == "Private"?"true":"false", publ:challenge.privacy === "Public"? "true":"false",
                  //   participate:"false" , invited:"false" , strict :"false" 
                  //    }})    
                   }              
                else {
                     challenge.privacy === "Public"? getUserPublicParticipateChallenges(user._id , setPublicParticipateChallenges)
                     :getUserPrivateParticipateChallenges(user._id , setPrivateParticipateChallenges)
                    //  setTimeout(() => {
                    //   router.back()
                    //  }, 500);
                    setTimeout(() => {
                        router.push({ pathname: '/UserChallenges',params: {
                          publ:challenge.privacy === "Public"? "true":"false",
                          priv:challenge.privacy === "Private" && challenge.audience !== "Strict" ? "true":"false",
                          strict :challenge.privacy === "Private" && challenge.audience === "Strict"  ?"true":"false" ,
                           userChallenges:"false",
                          userParticipations:"true"
                           }})    
                      }, 1000);
                  
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
        }
//*************************************** challenge description */
        
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
      case "challenge":
          return icons.newChallenge
          break;
      case "participation":
         return icons.participate
      case "invite":
            return icons.invites
      default:
        // setIcon("gray")
    }
}

const handleParticipationDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon("participation"))
    setDescriptionType("Participation")
  }

  const handleInviteDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon("invite"))
    setDescriptionType("Invite")
  }

const handleChallengeCompetitionDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon("challenge"))
    setDescriptionType("Challenge")
}
const handleTypeDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon(challenge.type))
    setDescriptionType(challenge.type)
}
const handlePrivacyDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon(challenge.privacy))
    setDescriptionType(challenge.privacy)
}
const handleAudienceDescrition = ()=> {
    setIsDescriptionModalVisible(true)
    setIcon(getIcon(challenge.audience))
    if(challenge.audience == "Open") {
         challenge.privacy == "Public" ? setDescriptionType("Open public") : setDescriptionType("Open")
         return true
       }
    setDescriptionType(challenge.audience)     
}



    if(isExpired) return <ChallengeExpired challenge_id = {challenge_id} /> 

  return (
    <SafeAreaView className="bg-primary min-h-full min-w-full ">
   {data && challenge && (
        <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior={Platform.OS === 'ios' ? 'padding' :  undefined}
        className = " flex-1 flex-col justify-start items-center px- rounded-x g-white">
             <View
              className = "min-w-[100%] h-[6%] gap- rounded-tl-x rounded-tr-x flex-row justify-start items-center px-1 bg-[#373738]">
                  
                  <TouchableOpacity
                      className="w-[10%] h-[100%] justify-center g-[#eb0a0a] px-1 py-1 rounded-xl items-center opacity  "
                      onPressIn={()=> router.back()}
                      >
                        <Image   
                         source={icons.x}
                         className=" w-10 h-10 g-white rounded-full"
                         />
                 </TouchableOpacity>
                 <View
                 className = "w-[35%] h-[80%] rounded-xl flex-row justify-center items-center px- g-[#fffefd]">
                        <TouchableOpacity
                         onPress={ ()=> {
                            if (challenge.origin_id !== user._id){
                              setIsProfileDisplayerModalVisible(true)
                              setSelectedProfile(challenge.origin_id)
                            }
                         }}
                        className = "px-2 py-1 w-[100%] flex-row justify-center gap-2 items-center">
                               <Image 
                                className={ "rounded-full w-7 h-7"}
                                source={ {uri:challenge.profile_img} }
                                resizeMode='cover'
                                />
                                 <View className="justify-end py-  items-start h-[100%] flex-col ">
                                               
                                               <Text className="font-pmedium  text-sm text-black">
                                                   <Text 
                                                   style={{fontSize:width<= 330? 8:9}}
                                                   className="font-bold text-sm text-white">
                                                       {challenge.name.length > 13 ?challenge.name.slice(0,13)+"..." : challenge.name}
                                                   </Text> 
                                               </Text>
                                               {/* <Text 
                                                   style={{fontSize:width<= 330? 8:7}}
                                                   className=" text-sm text-blue-400 font-black">
                                                   {getInition(challenge.name)}Challenger
                                               </Text> */}
                                 </View>
                        </TouchableOpacity>
                     
                 </View>
                 <View
                 className = "w-[55%] h-[100%] flex-row justify-between items-center px- g-[#de8124]">
                       <TouchableOpacity
                            onPress={
                            () =>  router.push({ pathname: '/ChallengeDisplayer', params: {
                                challenge_id:challenge._id
                               } }) }
                            className = "px-2 py-1 flex-row justify-center gap-1 items-center">
                                     <Text  className="text-blue-400 font-black "
                                                style={{fontSize:width/23}}>
                                            PL
                                    </Text>
                                    <Image 
                                        className={ "rounded-full bg-black w-7 h-7"}
                                        source={icons.play }
                                        resizeMode='cover'
                                        />
                                    <Text  className="text-blue-400 font-black "
                                                style={{fontSize: width/23}}>
                                            AY
                                    </Text>
                                
                      </TouchableOpacity>
                      <TouchableOpacity className = "px-2 py-1 flex-row justify-center gap-2 items-center">
                                <Image 
                                        className={ "rounded-full bg-white w-7 h-7"}
                                        source={ icons.fullscreen }
                                        resizeMode='cover'
                                        />
                                
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={ confirmAction }
                        className = "px- py- w-[25%] h-[80%] flex-row  justify-center gap- items-center"> 
                             <ButtonChallengeAction challenge ={challenge} participantStatus ={participantStatus}   setParticipantStatus ={setParticipantStatus} />
                      </TouchableOpacity>
                 </View>

             </View>

            <View
            className = "w-[100%] h-[94%] flex-col justify-start items-center px- g-white">
                <View 
                className = "min-w-[100%] h-[31%] flex-row justify-between rounded- items-center  bg-[#2f2c2c]">
                        
                        <View
                         className = "w-[12%] h-[100%] flex-col justify-start items-center px- py-4 g-white">
                            <View
                                className = "w-[98%] h-[100%] flex-col rounde-tl-xl rounde-tr-xl  justify-between items-center py-2 px- ">
                                    <TouchableOpacity 
                                        onPress={handleParticipationDescrition}
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

                                    <ScrollView className = "w-[90%] h-[82%] py-1 flex-col justi-enter gap- rounded-lg bg-[#000000] ite-center">
                                              {challenge.participants.map((participant, index)=> {
                                                    return(
                                                    <TouchableOpacity
                                                    onPress={ ()=> {
                                                        if(user._id !== participant.user_id){
                                                        setIsProfileDisplayerModalVisible(true)
                                                        setSelectedProfile(participant.user_id)
                                                        }
                                                       }}
                                                    key={index} className = " w-[100%]  flex-col justify-center py-1 items-center">
                                                            <Image 
                                                              className={ "rounded-full w-7 h-7"}
                                                              source={ {uri:participant.profile_img} }
                                                              resizeMode='cover'
                                                            />
                                                            <Text 
                                                              style={{fontSize:width<= 330? 7:7}}
                                                              className=" text-sm text-white mt- font-bold">
                                                             {participant.name.slice(0,6)}
                                                            </Text>
                                                    </TouchableOpacity>
                                                    )
                                              })}   
                                    </ScrollView>
                            </View>
                        
                        </View>

                        <View
                        className = "w-[38%] h-[100%] rounded--xl flex-col border-r-2 border-b-2 order-blue-500 justify-center items-center py-1 px- bg-[#131314]">
                            {displayData.length > 0 && (
                            <FSinstantPlayer 
                            participant = {displayData[0]} 
                            isVisible={true}
                            challenge ={challenge}
                            rank = {1 + (indexList -1) * 6}
                            setSelectedPost ={setSelectedPost}
                            setSelectedRank = {setSelectedRank}
                            setSelectedProfile={setSelectedProfile}
                            setIsProfileDisplayerModalVisible = {setIsProfileDisplayerModalVisible}
                                />
                            )}
                            
                        </View>
                      
                        <View
                        className = "w-[38%] h-[100%] rounded--xl border-b-2 order-blue-500  flex-col justify-center items-center py-1 px- bg-[#0b0b0b]">
                            {displayData.length > 1 ? (
                            <FSinstantPlayer 
                            participant = { displayData[1]} 
                            isVisible={true}
                            challenge ={challenge}
                            rank ={2 + (indexList -1) * 6}
                            setSelectedPost ={setSelectedPost}
                            setSelectedRank = {setSelectedRank}
                            setSelectedProfile={setSelectedProfile}
                            setIsProfileDisplayerModalVisible = {setIsProfileDisplayerModalVisible}
                                />
                            ): 
                            (
                            <View
                             className=" min-w-[94%]  h-[100%] flex-col justify-center rounded-xl mr-[3%] mt-[3%] bg-[#0f43dd] items-center">  
                                    <Text 
                                      style ={{fontSize:9}}
                                       className="text-white  font-bold">
                                         Empty Post
                                    </Text>
                            </View>
                            )
                            }
                        </View>
                        <View
                        className = "min-w-[12%] h-[100%] flex-col justify-end items-center py-4 px- g-[#f8f1f1]">
                            <View
                                className = "w-[90%] h-[100%] flex-col rounde-tl-xl rounde-tr-xl  justify-between items-center py-2 px- ">
                                    <TouchableOpacity
                                    onPress={handleInviteDescrition}
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
                                    <ScrollView className = "w-[100%] max-h-[82%] flex-col justif-center gap- rounded-lg bg-[#040505] ite-center">
                                              {challenge.invited_friends.map((participant, index)=> {
                                                    return(
                                                    <TouchableOpacity
                                                    onPress={ ()=> {
                                                        if(user._id !== participant.sender_id){
                                                        setIsProfileDisplayerModalVisible(true)
                                                        setSelectedProfile(participant.sender_id)
                                                        }
                                                       }}
                                                    key={index} className = " w-[100%]  flex-col justify-center py-1 items-center">
                                                            <Image 
                                                              className={ "rounded-full w-7 h-7"}
                                                              source={ {uri:participant.profile_img} }
                                                              resizeMode='cover'
                                                            />
                                                            <Text 
                                                              style={{fontSize:width<= 330? 7:7}}
                                                              className=" text-sm text-white mt- font-black">
                                                             {participant.name.slice(0,6)}
                                                            </Text>
                                                    </TouchableOpacity>)
                                              })}   
                                    </ScrollView>
                            </View>
                        </View>
                </View>

               

                <View 
                className = "min-w-[100%] h-[31%] flex-row justify-start  items-center px- bg-[#2f2c2c]">
                       
                       <View
                         className = "w-[12%] h-[100%] flex-col justify-evenly items-center px- py-4 g-white">
                           

                                       
                                        <TouchableOpacity 
                                           onPress={ handleTypeDescrition }
                                           className = "px-0 py- h-[25%] flex-col justify-start gap- items-center">
                                          
                                                <Image
                                                source={getIcon(challenge.type)}
                                                resizeMethod='contain'
                                                // style={{width:width/8, height:width/8}}
                                                className="w-7 h-7 rounded-full" /> 
                                                <Text 
                                                    style={{fontSize:6}}
                                                    className="text-white mt-1 font-black"> 
                                                        {challenge.type}
                                               </Text>
 
                                        </TouchableOpacity>
                                       
                                        <TouchableOpacity 
                                           onPress={ handlePrivacyDescrition }
                                           className = "px- py- h-[25%] flex-col justify-center gap- items-center">
                                                <Image 
                                                        className={ "rounded-full w-7 h-7"}
                                                        source={challenge.privacy == "Public" ?icons.publi : icons.priv }
                                                        resizeMode='contain'
                                                        />
                                                <Text 
                                                                style={{fontSize:width<= 330? 6:7}}
                                                                className=" text-sm text-white mt-1 font-black">
                                                                {challenge.privacy == "Public" ? "Public" : "Private" }
                                                </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={handleAudienceDescrition}
                                            className = "px- py- h-[25%] flex-col justify-center gap- items-center">
                                                <Image 
                                                        className={ "rounded-full w-7 h-7"}
                                                        source={challenge.audience == "Open" ? icons.open:
                                                            challenge.audience == "Restricted" ? icons.restricted : icons.strict }
                                                        resizeMode='cover'
                                                        />
                                                <Text 
                                                                style={{fontSize:width<= 330? 6:7}}
                                                                className=" text-sm text-white mt-1 font-black">
                                                                {challenge.audience}
                                                </Text>
                                        </TouchableOpacity>
                        
                        </View>
                        <View
                        className = "w-[38%] h-[100%] rounded--xl g-[#0a98eb] border-r-2 border-b-2 order-blue-500 flex-col justify-center items-center py-1 px- bg-[#050505]">
                            {displayData.length > 2 ? (
                            <FSinstantPlayer 
                            participant = { displayData[2]} 
                            isVisible={true}
                            challenge ={challenge}
                            rank ={ 3 + (indexList -1) * 6}
                            setSelectedPost ={setSelectedPost}
                            setSelectedRank = {setSelectedRank}
                            setSelectedProfile={setSelectedProfile}
                            setIsProfileDisplayerModalVisible = {setIsProfileDisplayerModalVisible}
                                />
                            ): 
                            (
                            <View
                             className=" w-[94%]  h-[100%] flex-row justify-center rounded-xl  ml-[3%] -[3%] bg-[#0f43dd] items-center">  
                                  <Text 
                                      style ={{fontSize:9}}
                                       className="text-white  font-bold">
                                         Empty Post
                                  </Text>
                            </View>
                            )}
                        </View>
                       
                        <View
                        className = "w-[38%] h-[100%] rounded--xl g-[#0a98eb] border-b-2 order-blue-500 flex-col justify-start items-center py-1 px- bg-[#070808]">
                            {displayData.length > 3 ? (
                            <FSinstantPlayer 
                            participant = { displayData[3]} 
                            isVisible={true}
                            challenge ={challenge}
                            rank ={4 + (indexList -1) * 6}
                            setSelectedPost ={setSelectedPost}
                            setSelectedRank = {setSelectedRank}
                            setSelectedProfile={setSelectedProfile}
                            setIsProfileDisplayerModalVisible = {setIsProfileDisplayerModalVisible}
                                />
                            ): 
                            (
                            <View
                             className=" w-[94%]  h-[100%] flex-row justify-center rounded-xl  mr-[3%] -[3%] bg-[#0f43dd] items-center">  
                                 <Text 
                                      style ={{fontSize:9}}
                                       className="text-white font-bold">
                                         Empty Post
                                </Text>
                            </View>
                            )}
                        </View>
                        <View
                        className = "min-w-[12%] h-[100%] flex-col justify-start items-center py- px- g-white">
                            <View
                                className = "w-[90%] h-[100%] flex-col rounde-tl-xl rounde-tr-xl  justify-between items-center py-2 px- ">
                                    
                                    <TouchableOpacity
                                            onPress={handleChallengeCompetitionDescrition}
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
                                        onPress={!isFavourite?confirmAddToFavourite:confirmRemoveFromFavourite}
                                        className = " w-[100%] -[20%]  py-1 flex-col rounded-lg bg-[#134854] justify-center gap- items-center">
                                       
                                        <Image 
                                                className={ "rounded-full w-7 h-7"}
                                                source={ icons.watchlist }
                                                resizeMode='cover'
                                                />
                                        <Text 
                                                        style={{fontSize:width<= 330? 8:6}}
                                                        className=" text-sm text-white mt- font-black">
                                                        {isFavourite?"Remove":"Add"}

                                        </Text>
                                    </TouchableOpacity>
                                    
                            </View>
                        </View>
                
                </View>

                        {/* last panel  */}
                <View 
                className = "min-w-[100%] h-[31%] flex-row justify-start rounded-bl-xl rounded-br-xl items-center px- bg-[#2f2c2c]">
                       
                       <View
                         className = "w-[12%] h-[100%] flex-col justify-start items-center px- py-4 g-white">
                           
                        
                        </View>
                        <View
                        className = "w-[38%] h-[100%] rounded--xl g-[#0a98eb] border-r-2 order-blue-500 flex-col justify-center items-center py-1 px- bg-[#050505]">
                            {displayData.length > 4 ? (
                            <FSinstantPlayer 
                            participant = { displayData[4]} 
                            isVisible={true}
                            challenge ={challenge}
                            rank ={ 5 + (indexList -1) * 6}
                            setSelectedPost ={setSelectedPost}
                            setSelectedRank = {setSelectedRank}
                            setSelectedProfile={setSelectedProfile}
                            setIsProfileDisplayerModalVisible = {setIsProfileDisplayerModalVisible}
                                />
                            ): 
                            (
                            <View
                             className=" w-[94%]  h-[100%] flex-row justify-center rounded-xl  ml-[3%] mb-[3%] bg-[#0f43dd] items-center">  
                                  <Text 
                                      style ={{fontSize:9}}
                                       className="text-white  font-bold">
                                         Empty Post
                                  </Text>
                            </View>
                            )}
                        </View>
                       
                        <View
                        className = "w-[38%] h-[100%] rounded--xl g-[#0a98eb] flex-col justify-center items-center py-1 px- bg-[#030303]">
                            {displayData.length > 5 ? (
                            <FSinstantPlayer 
                            participant = { displayData[5]} 
                            isVisible={true}
                            challenge ={challenge}
                            rank ={6 + (indexList -1) * 6}
                            setSelectedPost ={setSelectedPost}
                            setSelectedRank = {setSelectedRank}
                            setSelectedProfile={setSelectedProfile}
                            setIsProfileDisplayerModalVisible = {setIsProfileDisplayerModalVisible}

                                />
                            ): 
                            (
                            <View
                             className=" w-[94%]  h-[100%] flex-row justify-center rounded-xl  mr-[3%] mb-[3%] bg-[#0f43dd] items-center">  
                                 <Text 
                                      style ={{fontSize:9}}
                                       className="text-white  font-bold">
                                         Empty Post
                                </Text>
                            </View>
                            )}
                        </View>
                        <View
                        className = "min-w-[12%] h-[100%] flex-col justify-start items-center py- px- g-white">
                            <View
                                className = "w-[98%] h-[100%] flex-col rounde-tl-xl rounde-tr-xl  justify-between items-center py-2 px- ">
                                   
                                    
                            </View>
                        </View>
                
                </View>


                <View 
                className = "min-w-[100%] h-[6%] rounded-br-xl rounded-bl-xl px-1 flex-row justify-start items-center py- g-white">
                        <View
                        className = "w-[100%] h-[100%] flex-row rounde-xl rounde-br-xl border-none justify-between items-center py- px- g-[#121313]">
                                        <TouchableOpacity
                                                className=" justify-center items-center opacity   "
                                                onPressIn={moreLeft? handleBack :()=>{}}
                                                >
                                                    <Image   
                                                    source={moreLeft ?icons.back_arrow:""}
                                                    className="  w-9 h-9 rounded-full"
                                                    resizeMethod='cover'
                                                    />
                                        </TouchableOpacity>
                                        <View
                                        className = "w-[78%] h-[100%] px- py- flex-row rounded-bl-xl rounded-br-xl justify-center items-center px- g-[#2f2c2c]">
                                                <View className = "w-[90%] h-[80%] px-2 py-1 flex-row justify-center rounded-lg items-center bg-[#080807]">
                                                <SwingingTitle text={challenge.desc} color="white" fontSize={9} />
                                                </View>
                                        </View>
                                        <TouchableOpacity
                                            className=" justify-center items-center opacity  "
                                            onPressIn={moreRight? handleNext :()=>{}}
                                            >
                                                <Image   
                                                source={moreRight ?icons.next_arrow:""}
                                                className=" w-9 h-9 rounded-full"
                                                />
                                        </TouchableOpacity>
                        </View>
                </View>


                
        
                                        
            </View>

            {isPlayerModalVisible && (  
                     <PostPlayerModal isPlayerModalVisible={isPlayerModalVisible}  selectedPost ={selectedPost} challenge = {challenge}
                     setIsPlayerModalVisible={setIsPlayerModalVisible} selectedRank ={selectedRank}
                       />
                 )}
            {isDescriptionrModalVisible && (  
                     <ChallengeDescriptionModal isDescriptionrModalVisible={isDescriptionrModalVisible} descriptionType ={descriptionType}
                     setIsDescriptionModalVisible={setIsDescriptionModalVisible} text={text} icon ={icon}
                       />
                 )}
            {isModalVisible && (  
                     <ChallengeAction text={text} action={action} isModalVisible={isModalVisible}  removeChallenge = {removeChallenge} removeFromFavourite={removeFromFavourite}
                     addToFavourite={ addToFavourite} setIsModalVisible={setIsModalVisible}  joinChallenge={joinChallenge} resignChallenge={resignChallenge}
                       />
                 )}
            {isProfileDisplayerModalVisible && (  
                     <ProfileDisplayModal isProfileDisplayerModalVisible={isProfileDisplayerModalVisible} selectedProfile={selectedProfile}
                     setIsProfileDisplayerModalVisible={setIsProfileDisplayerModalVisible} 
                       />
                 )}
        </KeyboardAvoidingView>
 )}
 
 {/* {isPlayerModalVisible && (  
                     <PostPlayerModal isPlayerModalVisible={isPlayerModalVisible}  selectedPost ={selectedPost} challenge = {challenge}
                     setIsPlayerModalVisible={setIsPlayerModalVisible} selectedRank ={selectedRank}
                       />
                 )} */}
     
     
  </SafeAreaView>
  )
}