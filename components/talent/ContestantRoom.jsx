import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, useWindowDimensions, Platform, Animated } from 'react-native';
// import { useRoute } from '@react-navigation/native';
import { MotiView } from 'moti';
import { icons } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { eliminationTalentRoom, getPostData } from '../../apiCalls';
import ShuffleLetters from '../custom/ShuffleLetters';
import UserCard from './UserCard';
import { getTimeLapse } from '../../helper';
// import Checkbox from 'expo-checkbox'; 

const ContestantRoom = ({regionIcon , selectedIcon ,user ,userContestantStatus ,userParticipation ,confirmAction ,
   setStage, setIsPlaying , player , isPlaying,setPerformanceIndex,setPerformanceToDelete, updatePerformanceIndex,
   w , h , top ,numberOfContestants, setSelectedContestant, setParticipationType,talentRoom ,edition}) => {

    
  const [isLoaded, setIsLoaded] = useState(false);
  const [showList, setShowList] = useState(false);
  // const [postData , setPostData] = useState(null)
  const [isExpired , setIsExipred] = useState(null)
  const [postTimeLaps , setPostTimeLaps] = useState(0)
  
  const [status , setStatus] = useState(0)
  const MAXCONTESTANTS = talentRoom.MAXCONTESTANTS ;

  const [bgColor , setBgColor] = useState("white")
  const [textColor , setTextColor] = useState("")
  const [notation , setNotation] = useState("")

  const [type , setType] = useState("")
  const [userQueueParticipation , setUserQueueParticipation] = useState(null)
  const [userEliminatedParticipation , setUserEliminatedParticipation] = useState(null)
  const {height ,width} = useWindowDimensions()
  const [index ,setIndex] = useState(0)
  

  const flatList = useRef()
  const [viewableItems, setViewableItems] = useState([]);
  const [data,setData] = useState( 
                       userParticipation?.performances ||
                        talentRoom.queue.find(u =>u.user_id == user._id)?.performances ||
                        talentRoom.eliminations.find(u =>u.user_id == user._id)?.performances
                      )

  const MAIN_ITEM_WIDTH = w * 0.65;
  const MAIN_ITEM_MARGIN = 2;
  const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
  const SIDE_SPACING = (w - MAIN_ITEM_WIDTH) / 2;


  const mainScrollX = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    // userParticipation && getPostData(userParticipation._id,setPostData,setIsExipred)

    if(userParticipation) {
      const createdAtDate = new Date(userParticipation.createdAt); 
      const timeDifferenceDays = (new Date().getTime() - createdAtDate.getTime() )/(1000*3600*24); 
      setPostTimeLaps(timeDifferenceDays)
            setNotation("On Stage")
            if(edition.round <4){
              setStatus("joined")
              setBgColor("lightpink")
              setTextColor("black")
              setType("deleteContestantStage")
            }
            else{
              setStatus("locked")
              setBgColor("white")
              setTextColor("black")
              setType("locked")
            }
    } else {
        if(talentRoom.eliminations.find(u =>u.user_id == user._id)){
          setNotation("Eliminated")
          setStatus("eliminated")
          setBgColor("#d1111e")
          setTextColor("white")
          setUserEliminatedParticipation(talentRoom.eliminations.find(u => u.user_id == user._id))
          setType("deleteContestantElimination")
        } else {
              if(talentRoom.queue.find(u =>u.user_id == user._id)){
                  setNotation("In Queue")
                  setStatus("queued")
                  setBgColor("#d1111e")
                  setTextColor("white")
                  setUserQueueParticipation(talentRoom.queue.find(u => u.user_id == user._id))
                  setType("deleteContestantQueue")
              }else{
                if(numberOfContestants < MAXCONTESTANTS) {
                  if(talentRoom.queue.length < MAXCONTESTANTS - numberOfContestants ){
                    setNotation("Non Contestant")
                    if(edition.round < 4){
                      setStatus("join")
                      setBgColor("green")
                      setTextColor("white")
                      setType("new")
                    }else{
                      setStatus("queue")
                      setBgColor("white")
                      setTextColor("black")
                      setType("queue")
                    }
                  }else {
                    setNotation("Non Contestant")
                    setStatus("queue")
                    setBgColor("blue")
                    setTextColor("white")
                    setType("queue")
                  }
                }else{
                  setNotation("Non Contestant")
                  setStatus("queue")
                  setBgColor("blue")
                  setTextColor("white")
                  setType("queue")
                }     
            }
         } 
    }
   
       setIsLoaded(true)  

  }, [userParticipation])      



  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (!viewableItems || viewableItems.length === 0) return;
  
    // const mostVisible = viewableItems.reduce((prev, current) =>
    //   prev.itemVisiblePercent > current.itemVisiblePercent ? prev : current
    // );
    const currentItem = viewableItems[0];
    // setSelectedPerformance(currentItem.item);
    // setPerformanceIndex(currentItem.index);

  });

  const renderItem = ({ item ,index }) => {
    const inputRange = [
      (index - 1) * MAIN_SNAP_INTERVAL,
      index * MAIN_SNAP_INTERVAL,
      (index + 1) * MAIN_SNAP_INTERVAL,
    ];
  
    const scale = mainScrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85], // ✅ symmetric
      extrapolate: "clamp",
    });
  
    const opacity = mainScrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: "clamp",
    });
    const translateY = mainScrollX.interpolate({
      inputRange,
      outputRange: [10, 0, 10],
      extrapolate: "clamp",
    });
  

    return (
    <Animated.View
      style={{
        width: MAIN_ITEM_WIDTH,
        marginHorizontal: MAIN_ITEM_MARGIN,
        transform: [{ scale },{ translateY }],
        opacity
      }}
      className ="flex-col justify-center  items-center"
     >
    
          <TouchableOpacity
               onPress={async()=> {
                userParticipation && setStage(true)
                userParticipation && setSelectedContestant(userParticipation && userParticipation )
                updatePerformanceIndex(userParticipation._id , index)
                // console.log(userQueueParticipation.performances)
                userQueueParticipation  && await player.replaceAsync(item.video?.cdnUrl)
                setTimeout(() => {
                  userParticipation && (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )
                  userQueueParticipation && (!isPlaying ? ( player.play(), setIsPlaying(true) ) : ( player.pause() , setIsPlaying(false) ) )
                }, 300);
                    }}
                style ={{ 
    
              }}
                className="min  w-[100%] h-[45%]   b g-black border- borde-[white] flex-col justify-center items-center   ">
                             <Image
                              style={{width:  "100%" , height: "100%"}}
                              className=" opacity-100 shadow-lg elevation-2xl rounded-xl"
                              source={{uri:item.thumbnail?.publicUrl ||  "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                              resizeMethod='cover'
                              cachePolicy="memory-disk"
                               /> 
                              <Image
                              className="absolute w-10 h-10 rounded-xl"
                              source={icons.play} 
                              resizeMethod='cover'/> 
                              <View
                              className="p-2 gap-1 w-[100%] flex-row px-1 justify-between"
                              >
                                  <Text 
                                                  style ={{fontSize:width/39}}
                                                  className="p- 2 text-center rounded-xl bg-rgba(0 ,0 ,0 , 0.7) font-black text-[#464749]"> 
                                                
                                                      <Text 
                                                        style ={{fontSize:width/55}}
                                                        className="tex t-xl  font-black text-gray-400"> 
                                                        {index == 0 ? "Latest" : "Previous"}  
                                                      </Text>     
                                  </Text>
                                  <Text 
                                                  style ={{fontSize:width/55}}
                                                  className=" p- 2 text-center bg- black font-black text-gray-400"> 
                                                    {getTimeLapse(item.date)}
                                                    <Text 
                                                      style ={{fontSize:width/55}}
                                                      className="t font-black text-gray-400"> 
                                                      {' '} ago
                                                    </Text>
                                  </Text>
                              </View>
           </TouchableOpacity>
           <TouchableOpacity
                                                 onPress={ confirmAction }
                                                 onPressIn = { ()=> { 
                                                   userParticipation && setParticipationType("DeletePerformanceStage")
                                                   if(userQueueParticipation) {
                                                            console.log(data.length)
                                                            if(data) { 
                                                                  data.length > 1 ? setParticipationType("DeletePerformanceQueue"):
                                                                  setParticipationType("DeleteContestantQueue")
                                                                }
                                                            }
                                                   setPerformanceToDelete(item)
                                                       }}
                                                  className ="w- [100%] h- [60%] p-2 b g-[#7a2038] rounded- xl  g-white  flex-row justify-center items-center">
                                                  <View
                                                    style={{backgroundColor: userEliminatedParticipation ? "#232222" : "#2d1219"}}
                                                    className =" px-4 py-2 bg-[#232222] min-w -[20%] rounded -t-md flex-row justify-center items-center">
                                                        <Text    
                                                              style ={{
                                                                fontSize: width/55,
                                                                color: "white"
                                                              }}
                                                              className="text -xl font-black  text-gray-300"> 
                                                                Delete
                                                        </Text>
                                                  </View>
           </TouchableOpacity>
           </Animated.View>
 )}


 const handleScrollEnd = (event) => {
  const offsetX = event.nativeEvent.contentOffset.x;
  const index = Math.round(offsetX / MAIN_SNAP_INTERVAL);
  setIndex(index);
};

  

  return (
  
  <>
  {isLoaded && (


       
    <View
 
    className=" b g-black absolute b g-white flex-col justify-center items-center"
    style ={{ 
      opacity: !isPlaying ? 1 : 0,
      height: h  ,
      width : w ,
      top : Platform.OS == "ios" ?  10 : 10
     }}>
   
     <UserCard selectedContestant={{...userParticipation,
                                    profile_img:user.profileImage.publicUrl ,
                                  name:user.name , city :user.city , country:user.country }} 
         height={height/15} width={w * 0.75} />
         
     <View
                className = " absolute top-2 right-4 gap-2">  
                    <ShuffleLetters textSize={h/65} text = {userParticipation ?"On stage":
                                                          userQueueParticipation ? "In Queue":
                                                          userEliminatedParticipation ?"Eliminated":
                                                          "Join"
                    }/>
     </View>
    
     <View
          className ="flex-1 h- [100%] b g-[#353434] items-center justify-center b g-[#9f9b9b]">
            {data ? (
                  <Animated.FlatList
                      data={data}
                      ref={flatList}
                      // extraData={data}
                      keyExtractor={(item, index) =>
                        item.video?.fileId || index.toString()
                      }                                    
                      renderItem={renderItem}
                      removeClippedSubviews={true} 
                      scrollEventThrottle = {16}
                      showsHorizontalScrollIndicator ={false}
                      horizontal={true}
                      onViewableItemsChanged={onViewableItemsChanged.current}
                      decelerationRate="fast"
                      bounces={false}  
                      viewabilityConfig={{
                          itemVisiblePercentThreshold: 70, 
                        }}
                        getItemLayout={(data, index) => ({
                          length: MAIN_SNAP_INTERVAL,
                          offset: MAIN_SNAP_INTERVAL * index,
                          index,
                        })}

                      snapToInterval={MAIN_SNAP_INTERVAL}
                      contentContainerStyle={{
                          paddingHorizontal: SIDE_SPACING,
                          // marginVertical: 20,
                          }}
                      
                      onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: mainScrollX } } }],
                            { useNativeDriver: true }
                            )}
                      onMomentumScrollEnd={handleScrollEnd}

                  /> 
            ):(
              <View
              style={{width:w - w * 0.5 , 
                      backgroundColor:  'rgba(0,0, 0 , 0.1)'
                }}
                className = " flex-col px-2 py-4 text-center mt- auto justify-center gap-4 b g-black rounded-xl items-center ">
                        <Text 
                            style ={{fontSize:10, }}
                            className="text-xl font-bold text-center  text-gray-200"> 
                                { status == "join" ?"Join the contest, shine on stage, and show the world what you’ve got! The audience will watch, vote, and judge your performance." :
                                status == "queue"?"The stage is full ! Join the queue, get ready to shine, and soon the audience will watch, vote, and judge your talent." :
                                " You're not on stage yet! Want to showcase your talent? Join the challenge below"} 
                        </Text>
                        <Image 
                        className="w-[30px] h-[30px] rounded-full"
                        resizeMethod='cover'
                        source={icons.down_arrow}/>
              </View>
            )}
           
               {data && (
                   <Text 
                   style ={{fontSize:width/35 , 
                     marginTop: 0,
                   }}
                   className=" font-semibold mb-8 text-[#e49336]">Performances :{' '}
                     <Text 
                         style ={{fontSize:width/40}}
                         className="tex t-xl  font-black text-[#e49336]"> 
                             {data && data.length}
                     </Text>
                     
                    </Text>
               )}
               
              </View>



              <View
               className="flex- 1 w-[100%] bg -white flex-row justify-center gap-6 items-center">
                <TouchableOpacity
                          onPressIn={()=> {
                            setParticipationType(type)
                          }}
                          onPress={confirmAction}
                        
                          className="  flex-row py-4  justify-center items-center">
                          <View
                          style={{                       
                            backgroundColor:"#3f2326",
                          }}
                          className=" px-6 py- 2 justify-center items-center rounded-md  ">
                                <Text 
                                    style ={{fontSize:w/45,
                                      color:"white"
                                    }}
                                    className="text-xl font-bold mb- text-gray-100"> 
                                      {
                                        status == "locked" ?"Locked":
                                        status =="joined" ?"Resign": 
                                        status =="join" ?"Join":
                                        status == "queue"? "Join Queue":
                                        status == "queued" ? "Delete": "Delete"
                                      }  
                                </Text>
                          </View>        
                </TouchableOpacity>

                {(userParticipation || userEliminatedParticipation || userQueueParticipation) && (
                  <TouchableOpacity
                            onPress={ confirmAction}
                            onPressIn={()=> { 
                              userQueueParticipation &&  setParticipationType("qupdate")
                              userEliminatedParticipation && setParticipationType("backInQueue")
                              // postTimeLaps < 3 ?
                              userParticipation && setParticipationType("update")
                              // :setParticipationType("action")
                                  }}
                            style={{
                              }}
                            className="  px-2  ] flex-row py-2 justify-center items-start">
                                <View
                                  style={{                       
                                    backgroundColor: userEliminatedParticipation ? "#29282a" : "#3c2c19"
                                  }}
                                  className=" px-6 py-2 justify-center bg-[#3c2c19] items-center  rounded-md">
                                      <Text 
                                          style ={{fontSize:width/45,
                                            // color:postTimeLaps > 3 ?"blue" :"white",
                                          }}
                                          className="text- xl font-bold mb- text-gray-100"> 
                                           {!userEliminatedParticipation ? "Add Performance " : "Back in Queue"} 
                                      </Text>
                              </View>
                  </TouchableOpacity>
                  )}
               </View>


   {/* <View
    className = "w- full h- [5vh]  flex-col justify-center rounded-xl  bg-[#ede7e7] items-center g-white gap-1">
             
              <TouchableOpacity
                    className="p- 1 flex-col mt- 2 justify-center items-center">
                      <Image 
                        className="w-[40px] h-[40px] rounded-full"
                        resizeMethod='cover'
                        source={{uri:user.profileImage?.publicUrl}}/>
              </TouchableOpacity>
              <View
                className = "  flex-col text-center mb- justify-center rounded-t-lg g-white items-center ">
                      <View
                          className = "-[100%] -[50%]  gap- flex-row mb- justify-center g-white items-center ">
                                  <Text 
                                      style ={{fontSize:9}}
                                      className="text-xl font-black mb- text-white"> 
                                                {user.name}
                                  </Text>
                      </View>        
              </View>
              <View
                className = "flex-row justify-center items-end gap-2">  
                    <ShuffleLetters textSize={10} text = {userParticipation ?"Your are on stage":
                                                          userQueueParticipation ? " You are in Queue":
                                                          userEliminatedParticipation ?"You are eliminated":
                                                          "You are not Contestant"
                    }/>
              </View>

              {(userParticipation || userEliminatedParticipation || userQueueParticipation) ? (
              <View
                className = " py-4 flex-col text-center mb- justify-center  g-white items-center ">
                   
                    <TouchableOpacity
                      onPress={()=> {
                        setStage(true)
                        setSelectedContestant(userParticipation && userParticipation 
                        )
                            }}
                                  className=" b g-[#19140c] p- flex-col justify-center items-center">
                                    <Image 
                                      style={{width:w - w * 0.1 , height:w - w * 0.1 }}
                                      className=" rounded-full"
                                      resizeMethod='cover'
                                      source={{uri:userParticipation ?userParticipation.thumbnail?.publicUrl:
                                              userQueueParticipation ? userQueueParticipation.thumbnail?.publicUrl:
                                              userEliminatedParticipation.thumbnail?.publicUrl
                                      }}/>

                                    <View 
                                        className={
                                                "w-full h-full flex-col absolute top- justify-center items-center"
                                        }>
                                        <Image 
                                        className="w-14 h-14 opacity-100"
                                        source={icons.play}/>
                                    </View>
                                   
                    </TouchableOpacity>
                  {userParticipation && (
                    <>
                    <View
                       className="absolute right-4 top-0  flex-row justify-start items-center gap-2 ">
                              <Text 
                                 style ={{fontSize:10}}
                                 className="text-xl text-ce nter  p-0 font-black text-red-400"> 
                                         {userParticipation.rank < 4 ? "TOP" :"RK"}
                              </Text>                  
                              <Text 
                                  style ={{fontSize:10}}
                                  className="text-xl  font-black text-white"> 
                                      {userParticipation.rank}
                              </Text>
                    </View>

                    <View
                           className = "absolute bottom-0 right-4  gap-2 flex-row mb- justify-center g-white items-center ">
                               <Text 
                                  style ={{fontSize:10,
                                           color:"lightblue"}}
                                  lassName="text-xl font-bold  text-white"> 
                                         Like
                               </Text>
                               <Text 
                                   style ={{fontSize:10}}
                                   className="text-xl font-bold -4 text-white"> 
                                               {userParticipation && userParticipation.likes}                 
                               </Text>
                      </View>   

                      <View
                          className = " absolute bottom-0 left-0  gap-2 py- flex-row mb- justify-center g-white items-center ">
                                                  
                                <Text 
                                    style ={{fontSize:11,
                                              color:"pink" }}
                                     className="text-xl font-bold  text-white"> 
                                              { "Votes"}
                                </Text>
                                <Text 
                                    style ={{fontSize:10}}
                                    className="text-xl font-bold -4  text-white"> 
                                        {userParticipation.votes}
                                </Text>
                       </View>    
                       </>
                    )}

              </View>
            ):(
              <View
                style={{width:w - w * 0.1 , 
                        backgroundColor:  'rgba(0,0, 0 , 0.1)'
                }}
                className = " flex-col px-2 py-4 text-center mt- auto justify-center gap-4 b g-black rounded-xl items-center ">
                        <Text 
                             style ={{fontSize:10, }}
                             className="text-xl font-bold text-center  text-gray-200"> 
                                { status == "join" ?"Join the contest, shine on stage, and show the world what you’ve got! The audience will watch, vote, and judge your performance." :
                                status == "queue"?"The stage is full ! Join the queue, get ready to shine, and soon the audience will watch, vote, and judge your talent." :
                                " You're not on stage yet! Want to showcase your talent? Join the challenge below"} 
                        </Text>
                        <Image 
                        className="w-[30px] h-[30px] rounded-full"
                        resizeMethod='cover'
                        source={icons.down_arrow}/>
              </View>
            )}

    </View> */}


    

  
       
    {/* <View
        className="flex- 1 w-[100%] bg -white flex-row justify-center gap-6 items-center">
               <TouchableOpacity
                        onPressIn={()=> {setParticipationType(type)}}
                        onPress={confirmAction}
                        style={{
                        
                        }}
                        className="  flex-row py-4  justify-center items-center">
                        <View
                        style={{                       
                          backgroundColor:bgColor,
                        }}
                        className=" px-6 py-2 justify-center items-center rounded-xl  ">
                               <Text 
                                  style ={{fontSize:10,
                                    color:textColor
                                  }}
                                  className="text-xl font-black mb- text-gray-100"> 
                                    {
                                       status == "locked" ?"Locked":
                                       status =="joined" ?"Resign": 
                                       status =="join" ?"Join":
                                       status == "queue"? "Join Queue":
                                       status == "queued" ? "Delete": "Delete"
                                    }  
                              </Text>
                        </View>        
              </TouchableOpacity>


             {(userParticipation || userEliminatedParticipation || userQueueParticipation) && (
              <TouchableOpacity
                        onPress={ confirmAction}
                        onPressIn={()=> { 
                          status == "queued"? setParticipationType("qupdate"):
                          status == "eliminated" ? setParticipationType("eupdate"):
                          postTimeLaps > 3 ? setParticipationType("update"):setParticipationType("action")
                              }}
                        style={{
                          }}
                        className="  px-2  ] flex-row py-4 justify-center items-start">
                            <View
                              style={{                       
                                backgroundColor:postTimeLaps > 3 ?"white" :"gray",
                             
                              }}
                              className=" px-6 py-2 justify-center items-center  rounded-xl">
                                  <Text 
                                      style ={{fontSize:10,
                                        color:postTimeLaps > 3 ?"blue" :"white",
                                      }}
                                      className="text-xl font-black mb- text-white"> 
                                        Update 
                                  </Text>
                           </View>
              </TouchableOpacity>
              )}

        </View> */}

    

  
</View>




     )} 


    </>
  );
}
export default ContestantRoom;