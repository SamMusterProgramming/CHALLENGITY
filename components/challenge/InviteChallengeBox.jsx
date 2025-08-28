import { View, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator, Platform, ScrollView, FlatList, Animated } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
// import HeadLineChallengeList from '../headLights/HeadLineChallengeList';
import { icons, images } from '../../constants';
import { router, useLocalSearchParams } from 'expo-router';
import Challenge from './Challenge';
import { getTimeLapse } from '../../helper';
import SwingingTitle from '../custom/SwingingTitle';
import { getChallengeById, getNotificationByUser, getUserChallengeInvites, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, updateNotificationByUser } from '../../apiCalls';
import InstantChallengeDisplay from './InstantChallengeDisplay';
import AnimatedCircleText from '../custom/AnimatedCircleText';
import AnimatedRightLeftText from '../custom/AnimatedRightLeftText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const  InviteChallengeBox = ({selectedBox, refresh,  selectedPr}) => {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,notifications ,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,trendingChallenges,setNotifications } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState(userPublicChallenges)
    const scrollViewRef = useRef(null);
    const [scrollY] = useState(new Animated.Value(0));


    // const [displayData , setDisplayData] = useState(userPublicChallenges)


    const [index , setIndex] = useState(0)
    const [displayData , setDisplayData] = useState([])
    const [initialData , setInitialData] = useState([])

    const [data , setData] = useState(null)
    const [canScroll , setCanScroll] = useState(true)

    const [isLoaded ,setIsLoaded] = useState(false)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(userPublicChallenges.length > 6 ? true:false)
    const [isChallengeSelected , setIsChallengeSelected] = useState(false)
    const [selectedChallenge , setSelectedChallenge] = useState(null)
    const [color , setColor] = useState(selectedBox === "owner"? "#10152d" : "#10152d")
    const [selectColor , setSelectColor] = useState(selectedBox === "owner"? "white" : "white")
    const [refreshing , setRefreshing] = useState(refresh)
    const insets = useSafeAreaInsets();
    const [lastScrollY, setLastScrollY] = useState(0);


  
 

   

    
    
    
    
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
            // setIcon("gray")
            break;
        }
      }
      //****************************** you challenges ******************** */

      
useEffect(() => {
   getUserChallengeInvites(user._id , setDisplayData)
}, [])


const generateNewMatches = (challenge,notifications) => 
    { 
        let matchCount = 0;
        
       notifications.forEach(notification => {
         if(notification.content.challenge_id == challenge._id && !notification.isRead) {
            matchCount = matchCount + 1 ;
         }
       })
       if(matchCount !== 0) return `${matchCount}`
       return  " "
    }



    const renderItem = ({ item ,index }) => (
      <MotiView
      key={index}
      from={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 100 * index , type: 'timing', duration: 300  }}
      className ="min-w-[49%] h-[49%]  b g-black pb-2 justify-start items-center" 
      style ={{ 
          height: Platform.OS == "ios" ? (height  * 0.7 -  (width/8) - insets.top )  * 0.5 :
          (height  * 0.7 -  (width/7) - 50 ) /2  ,
          // marginLeft : index % 2 == 1 && "auto",
          
         }}
      >
           <TouchableOpacity
               onPress={
                () =>  router.push({ pathname: '/FSinstantChallengeDisplayer', params: {
                    challenge_id:item._id
                   } }) }
                style ={{ 
              }}
                className="min- w-[100%] h-[100%] gap-2  bg-black flex-col justify-start items-center    ">
              
              <View
                className="w-[100%] flex-row  px-2   bg-black rounded-t-xl justify-between items-center  ">
                      
                      <View
                       className="p-2  b g-[#510904] flex-col justify-center items-center  ">
                                   <Image 
                                    source={getIcon(item.privacy)}
                                    className="w-6 h-6"
                                  />
                                  <Text className="text-white text-xs font-black"
                                     style={{fontSize:7}}>
                                     {item.privacy.toUpperCase()}
                                  </Text>
                      </View>
    
                      <View
                        className=" flex-col w- [70%] flex-1 px-2 py-2 bg-black  rounded-t-lg justify-center items-center gap-1 ">
                         <Image
                           className="w-6 h-6 rounded-full"
                           source={{uri:item.participants[0].profile_img}}
                           resizeMethod='cover' />
                         <Text className="text-white text-xs font-bold"
                           style={{fontSize:7}}>
                           {item.name.slice(0,15)}
                         </Text>                 
                      </View>
    
                      <View
                      className=" p-2 g-[#024913]  flex-col justify-center items-center ">
                                   <Image 
                                    source={getIcon(item.type)}
                                    className="w-6 h-6"
                                    resizeMethod='cover'
                                  />
                                  <Text className="text-white text-xs font-black"
                                     style={{fontSize:7}}>
                                     {item.type.toUpperCase()}
                                  </Text>
                      </View>
              </View>
               
    
        
                  <View
                    className="flex-row  p-1 w-[95%] rounded-lg g-black bg-[#e7dede]  justify-center items-center  ">
                      <View
                       className="flex-row  py-3 w-[100%] g-black bg-[#061f4d] rounded-lg justify-center items-center  ">
                              <SwingingTitle text={item.desc} color="white" fontSize={8} />
                      </View>
                  </View>
    
    
    
                  <View
                    className="flex-row px-2  flex-1 w-[100%] bg-black b g-[#030303] mt- 1 justify-between items-center  ">
                       
                        <View
                         className="flex-col pb-2 h-[100%] w-[59%] g-black  gap- justify-start items-center  ">
                              <ScrollView 
                                style={{}}
                                className ="w-[100%] flex-1 b g-[#302d2d] rounded-xl bg-[#222d37]"
                                horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View
                                    className="max-w-[100%] max-h -[100%] rounded-xl p- 1 flex-col justify-start gap -1 items-center">
                                        <View
                                          className="w-[100%] h- [100%] flex-row flex-wrap justify-center gap- 2 items-center"> 
                                            {item.participants.map((p,index) =>{
                                              return(
                                              <View 
                                              key={index}
                                              className="w- [20%] p-1 min-h- [30%] flex-row justify-center items-center">
                                                  <Image
                                                    className="w-[40px] h-[30px] rounded-lg"
                                                    source={{uri:p.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                                    resizeMethod='contain' />
                                                    <Image
                                                    className="absolute w-3 h-3 rounded-full"
                                                    source={icons.play}
                                                    resizeMethod='cover' />
                                              </View>)
                                            })}
                                        </View> 
                                    </View>
                              </ScrollView>
                              <View
                                 className="w- [30%] px-2 p-1 rounded-t-xl flex-row justify-center b g-[#d4c6c6] items-end gap-1">
                                      <Image
                                      className="w-4 h-4 rounded-full"
                                      source={icons.participate}
                                      resizeMethod='cover' />
                                      <Text className="text-white text-end border-b- border-white text-xs font-black"
                                        style={{fontSize:8}}>
                                        {item.participants.length} {' '} Participant
                                      </Text>
                              </View> 
                        </View>
    
                        <View
                         className="flex-col pb-2 h-[100%] w-[39%] g-black bg-[#030303]  justify-start items-center  ">
                             
                              <ScrollView 
                                style={{}}
                                className ="w-[100%] flex-1 b g-[#302d2d] rounded-xl bg-[#402f33]"
                                horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View
                                    className="max-w-[100%] max-h-[100%] p -1 flex-col justify-start items-center">
                                           <View
                                           className="w-[100%] flex-row flex-wrap justify-center gap- 2 items-center">
                                             {item.invited_friends.map((f,index) =>{
                                                return(
                                                <View 
                                                key={index}
                                                className="p-1 flex-row justify-center items-center">
                                                    <Image
                                                    className="w-[25px] h-[25px] rounded-full"
                                                    source={{uri:f.profile_img }}
                                                    resizeMethod='cover' />
                                                </View>)
                                              })}
                                          </View> 
                                    </View>
                              </ScrollView>
                              <View
                                 className="w- [30%] px-2 p-1 rounded-t-xl flex-row justify-center b g-[#d4c6c6] items-end gap-1">
                                      <Image
                                      className="w-4 h-4 rounded-full"
                                      source={icons.invites}
                                      resizeMethod='cover' />
                                      <Text className="text-white text-end border-b- border-white text-xs font-black"
                                        style={{fontSize:8}}>
                                        {item.invited_friends.length} {' '} INVITES
                                      </Text>
                              </View> 
                         </View>
                  </View>
    
    
    
                  {generateNewMatches(item,notifications) !== " " && (
                   <View
                       className=" absolute top-2 left-24 flex-row   justify-center items-center  ">
                           <View
                           className="w- [100%] h- [100%] gap-1 flex-row justify-center items-center ">
                                  <Text className="text-blue-400 text-xs font-black"
                                     style={{fontSize:8}}>
                                     {generateNewMatches(item,notifications)}
                                  </Text>
                                  <Text className="text-bold text-white text-xs font-black"
                                     style={{fontSize:8}}>
                                     New 
                                  </Text>
                                  <Image
                                      className="w-5 h-5 rounded-full"
                                      source={icons.vs}
                                      resizeMethod='cover' />
                         </View>
                        
                   </View>
                   )}
    
                   
                   <View
                       className="absolute top-2 right-24 flex-row  px-1 py-1 justify-center items-center gap-1 ">
                                <Text className="text-white  text-xs font-black"
                                  style={{fontSize:8}}>
                                    {getTimeLapse(item.createdAt)}  ago
                                </Text>
          
                   </View>
           </TouchableOpacity>
       </MotiView>
       )
    
    
      return (
    
        <View
          className=" flex-1  p-1 min-w-[100vw] h-  [69%] bg-[#dad1d1] pb- flex-col justify-start items-center" >
     
              <FlatList
                data={displayData.length > 0 && displayData}
    
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                removeClippedSubviews={true} 
                scrollEventThrottle={16} 
              />
                         
      </View>
    
     
      )



  
}

export default InviteChallengeBox;





