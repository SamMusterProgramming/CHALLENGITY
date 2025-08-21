import { View, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator, Platform, ScrollView, FlatList, Animated } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
// import HeadLineChallengeList from '../headLights/HeadLineChallengeList';
import { icons, images } from '../../constants';
import { router, useLocalSearchParams } from 'expo-router';
import Challenge from './Challenge';
import { getTimeLapse } from '../../helper';
import SwingingTitle from '../custom/SwingingTitle';
import { getChallengeById, getNotificationByUser, getUserPrivateChallenges, getUserPrivateParticipateChallenges, getUserPublicChallenges, getUserPublicParticipateChallenges, updateNotificationByUser } from '../../apiCalls';
import InstantChallengeDisplay from './InstantChallengeDisplay';
import AnimatedCircleText from '../custom/AnimatedCircleText';
import AnimatedRightLeftText from '../custom/AnimatedRightLeftText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const  UserChallengeBox = ({selectedBox, refresh,  selectedPr}) => {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,notifications ,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState(userPublicChallenges)
    const scrollViewRef = useRef(null);
    const [scrollY] = useState(new Animated.Value(0));


    // const [displayData , setDisplayData] = useState(userPublicChallenges)


    const [index , setIndex] = useState(0)
    const [displayData , setDisplayData] = useState(null)
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


  
 

   
    useEffect(() => {
      
        let data =  selectedBox === "owner" ? userPublicChallenges : privateParticipateChallenges
        // selectedBox === "owner" ? data.push(...userPrivateChallenges): data.push(...privateParticipateChallenges)
        setDisplayData({...{data:data}})
      }, [userPublicChallenges,userPrivateChallenges])
     
    const handleScroll = (event) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;

        setLastScrollY(currentScrollY);
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 10; // Adjust as needed
        if (currentScrollY > lastScrollY) {

          if (canScroll &&(layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom)) {
            setCanScroll(false)
            scrollViewRef.current.scrollTo({ y: 10, animated: true });
            // scrollViewRef.current = null

            contentOffset.y = 0 
            setTimeout(() => {
              setCanScroll(true)
            }, 2000);
            index <=  displayData.length /2  && setIndex( prev => prev + 1)
          }

        } else if (currentScrollY < lastScrollY) {
          // console.log('Scrolling Up');
        }
        // setLastScrollY(currentScrollY);
        // const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        // const paddingToBottom = 40; 
        // if (canScroll &&(layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom)) {
        //   setCanScroll(false)
        //   setTimeout(() => {
        //     setCanScroll(true)
        //   }, 2000);
        //   index <=  displayData.length /2  && setIndex( prev => prev + 1)
        // }
        // if (contentOffset.y <=  paddingToBottom) {
        //   index !== 0 &&  setIndex( prev => prev - 1)
        // }
      };

    

      // useEffect(() => {
      //   if(index >= 1){
      //     let d = []
      //     d.push(...data.data.slice(0,4))
      //     d.push(...displayData.slice(4 + index * 2 , 6 + index * 2))
      //     setData({...{data:displayData}})
      //   }
      // }, [displayData])
    
    //   const handleNext = ()=> {
    //     const newData = boxDisplayChallenges.slice( indexList * 6 , (indexList + 1)* 6);
    //     setDisplayData([ ...newData]);
    //     setIndexList(prev => prev + 1 )
    //  }
      
    // const handleBack = ()=> {
    
    //    const newData = boxDisplayChallenges.slice((indexList - 2) * 6 , (indexList - 1 ) * 6);
    //     setDisplayData([...newData]);
    //    setIndexList(prev => prev - 1 )
    // }
    
    // useEffect(() => {
    
    //   (indexList -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
    //   (boxDisplayChallenges.length < (indexList) * 6)? setMoreRight(false) :setMoreRight(true)
    
    // }, [indexList])
    
    
    
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

      
// const handlePublic = ()=> {
//         setIndexList(1)
//         const challenges = selectedBox == "owner" ? userPublicChallenges : publicParticipateChallenges
//         setBoxDisplayChallenges(challenges)
//         setDisplayData(challenges.slice(0,6))
//         setMoreRight(challenges.length > 6 ? true:false)
//         setMoreLeft(false)
//  }
 
//  const handlePrivate = ()=> {
//     setIndexList(1)
//     const challenges = selectedBox == "owner" ? userPrivateChallenges.filter(challenge => challenge.audience !== "Strict")
//                       : privateParticipateChallenges.filter(challenge => challenge.audience !== "Strict")
//     setBoxDisplayChallenges(challenges)
//     setDisplayData(challenges.slice(0,6))
//     setMoreRight(challenges.length > 6 ? true:false)
//     setMoreLeft(false)
// }

// const handleStrict = ()=> {
//   const challenges = selectedBox == "owner" ?  userPrivateChallenges.filter(challenge => challenge.audience === "Strict"):
//                       privateParticipateChallenges.filter(challenge => challenge.audience === "Strict")
//   const data = challenges
//   setIndexList(1)
//   setBoxDisplayChallenges(data)
//   setDisplayData(data.slice(0,6))
//   setMoreRight(data.length >  6 ? true:false)
//   setMoreLeft(false)
// }

// useEffect(() => {
//     selectedPrivacy == "Public" && handlePublic()
//     selectedPrivacy == "Private" && handlePrivate()
//     selectedPrivacy == "Strict" && handleStrict()  
// }, [userPublicChallenges,userPrivateChallenges , publicParticipateChallenges , privateParticipateChallenges])


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




// useEffect(() => {
//         switch (selectedPrivacy) {
//           case "Public":
//              handlePublic();
//             break;
//          case "Private":
//              handlePrivate()
//              break;
        
//          case "Strict":
//              handleStrict()
//              break;
//           default:
//             break;
//         }
// }, [selectedPrivacy])

// const handleRefresh = () => {
//     setRefreshing(true)
//     if(selectedBox === "owner"){  
//         selectedPrivacy == "Public" && handlePublic()
//         selectedPrivacy == "Private" && handlePrivate()
//         selectedPrivacy == "Stric" && handleStrict()  
//         getUserPrivateChallenges(user._id, setUserPrivateChallenges)  
//         getUserPublicChallenges(user._id, setUserPublicChallenges) 
//     }
//     else  {
//         getUserPublicParticipateChallenges(user._id, setPublicParticipateChallenges)  
//         getUserPrivateParticipateChallenges(user._id, setPrivateParticipateChallenges)  
//         }
//     getNotificationByUser(user._id,setNotifications)
//         setTimeout(() => {
//             setRefreshing(false)
//         }, 1000);
// }

// useEffect(() => {
//   if(refresh) {
//     setSelectedPrivacy(selectedPr)
//     onRefresh()
//    }
// }, [refresh])

// const onRefresh = 
// useCallback(
//   () =>  {
//     setRefreshing(true)
//     if(selectedBox === "owner"){  
//         getUserPublicChallenges(user._id , setUserPublicChallenges)
//         getUserPrivateChallenges(user._id , setUserPrivateChallenges)
//         getNotificationByUser(user._id , setNotifications)      
//     }
//     else  {
//         getUserPublicParticipateChallenges(user._id, setPublicParticipateChallenges)  
//         getUserPrivateParticipateChallenges(user._id, setPrivateParticipateChallenges)  
//         }
//     getNotificationByUser(user._id,setNotifications)
//         setTimeout(() => {
//             setRefreshing(false)
//         }, 1000);
// }
// , []);


const renderItem = ({ item ,index }) => (
  <MotiView
  key={index}
  from={{ opacity: 0, translateY: 40 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{ delay: 100 * index , type: 'timing', duration: 300  }}
  className ="w-[49%] h-[49%] pl - 2 bg- black pb-2 justify-center items-center" 
  style ={{ 
      height: (height  * 0.7 -  (width/7) - insets.top ) * 0.50 ,
      marginLeft : index % 2 == 1 && "auto",
      // marginRight : index % 2 == 0 && 3,
    // borderColor:generateNewMatches(challenge,notifications) !== " "? "white" :""
     }}
  >
       <TouchableOpacity
           onPress={
            () =>  router.push({ pathname: '/FSinstantChallengeDisplayer', params: {
                challenge_id:item._id
               } }) }
            style ={{ 

            // borderColor:generateNewMatches(challenge,notifications) !== " "? "white" :"" 
          }}
            className="min- w-[100%] h-[100%] rounded-lg rounded-t-3xl bg-black border- borde-[white] flex-col justify-start items-center rounde gap-1  ">
          
            <View
                className=" flex-col w-[80%] px-2 py-2 bg-black  h- 8 g-black opacity-100 rounded-t-lg justify-center items-center gap-1 ">
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
                  className=" absolute min-w-[25%] top-0 left-0 p-2 bg-[#510904] rounded-tl-3xl flex-col justify-center items-center gap-1">
                               <Image 
                                source={getIcon(item.privacy)}
                                className="w-4 h-4"
                              />
                              <Text className="text-white text-xs font-black"
                                 style={{fontSize:5}}>
                                 {item.privacy.toUpperCase()}
                              </Text>
            </View>
            <View
                  className=" absolute top-0 min-w-[25%] right-0 p-2 bg-[#024913] rounded-tr-3xl flex-col justify-center items-center gap-1">
                               <Image 
                                source={getIcon(item.audience)}
                                className="w-4 h-4"
                              />
                              <Text className="text-white text-xs font-black"
                                 style={{fontSize:5}}>
                                 {item.audience.toUpperCase()}
                              </Text>
              </View>

              
              <View
                className="flex-row   py-2 w-[90%] g-black bg-[#f7f7f7] rounded-lg justify-center items-center  ">
                       <SwingingTitle text={item.desc} color="black" fontSize={7} />
        
               </View>



              <View
                className=" flex-row   h- 8 w-[100%] g-black  justify-center items-end ">
                        <View
                         className="w- [30%]  flex-row justify-center items-end gap-1">
                             
                              <Image
                                  className="w-4 h-4 rounded-full"
                                  source={icons.participate}
                                  resizeMethod='cover' />
                                  <Text className="text-yellow-400 text-end border-b- border-white text-xs font-black"
                                    style={{fontSize:8}}>
                                    {item.participants.length} {' '} Participant
                                  </Text>
                      </View> 
                   
              </View>

              <ScrollView 
              style={{}}
              className ="w-[97%] max-h-[15%] bg-[#302d2d]"
              horizontal={true} showsHorizontalScrollIndicator={false}>
                   <View
                   className="min-w-[100%] min- h-[100%] px-1 flex-row justify-center gap-1 items-center">
                          {item.participants.map((p,index) =>{
                             return(
                             <View 
                             key={index}
                             className="w-[20%] h-[90%] flex-row justify-center items-center">
                                 <Image
                                  className="w-[100%] h-[100%] rounded-sm"
                                  source={{uri:p.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                  resizeMethod='contain' />
                                  <Image
                                  className="absolute w-3 h-3 rounded-full"
                                  source={icons.play}
                                  resizeMethod='cover' />
                             </View>)
                          })}
                   </View>
              </ScrollView>

              <View
                className=" flex-row  mt-2 h- 8 w-[100%] g-black  justify-center items-end ">
                        <View
                         className="w- [30%]  flex-row justify-center items-end gap-1">
                             
                                  <Image
                                  className="w-4 h-4 rounded-full"
                                  source={icons.invites}
                                  resizeMethod='cover' />
                                  <Text className="text-yellow-400 text-end border-b- border-white text-xs font-black"
                                    style={{fontSize:8}}>
                                    {item.invited_friends.length} {' '} Invites
                                  </Text>
                      </View>  
              </View>

              {item.privacy !== "Public" && (
                 <ScrollView 
                 style={{}}
                 className ="flex- 1 max-w-[97%] max-h-[10%] h-[10%] bg-[#000000]"
                 horizontal={true} showsHorizontalScrollIndicator={false}>
                      <View
                      className="flex-1 min-w-[100%] min-h-[100%] px-1 flex-row justify-start gap-1 items-center">
                             {item.invited_friends.map((f,index) =>{
                                return(
                                <View 
                                key={index}
                                className="w-5 h-5 flex-row justify-center items-center">
                                    <Image
                                     className="w-[100%] h-[100%] rounded-full"
                                     source={{uri:f.profile_img }}
                                     resizeMethod='cover' />
                                   
                                </View>)
                             })}
                      </View>
                 </ScrollView>
              )}


              {generateNewMatches(item,notifications) !== " " && (
               <View
                   className=" flex-row mt-2 opacity-100 b g-white rounded-md h -7 w-[100%] g-black  justify-center items-center  ">
                       <View
                       className="w-[100%] h-[100%] gap-2 flex-row justify-center items-center ">
                              <Text className="text-blue-500 text-xs font-black"
                                 style={{fontSize:10}}>
                                 {generateNewMatches(item,notifications)}
                              </Text>
                              <Text className="text-bold text-white text-xs font-black"
                                 style={{fontSize:8}}>
                                 New 
                              </Text>
                              <Image
                                  className="w-7 h-7 rounded-full"
                                  source={icons.vs}
                                  resizeMethod='cover' />
                     </View>
                    
               </View>
               )}

               
               <View
                   className="absolute bottom-0 left- 0 flex-row rounded-t-xl bg-[#dad1d1]  h- 8 px-1 py-1 justify-start items-end gap-1 ">
                      
                 
           
                           
                            <Text className="text-black  text-xs font-black"
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
            data={displayData && displayData.data}
            numColumns={2}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            removeClippedSubviews={true} 
            scrollEventThrottle={16} 
          />
                     
  </View>

 
  )
}

export default UserChallengeBox;