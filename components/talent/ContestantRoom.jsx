import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, useWindowDimensions, Platform } from 'react-native';
// import { useRoute } from '@react-navigation/native';
import { MotiView } from 'moti';
import { icons } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { eliminationTalentRoom, getPostData } from '../../apiCalls';
import ShuffleLetters from '../custom/ShuffleLetters';
// import Checkbox from 'expo-checkbox'; 

const ContestantRoom = ({regionIcon , selectedIcon ,user ,userContestantStatus ,userParticipation ,confirmAction , setStage, setStart,
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
  const{width ,height} = useWindowDimensions()



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
              setType("resign")
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
          setType("eliminated")
        } else {
              if(talentRoom.queue.find(u =>u.user_id == user._id)){
                  setNotation("In Queue")
                  setStatus("queued")
                  setBgColor("#d1111e")
                  setTextColor("white")
                  setUserQueueParticipation(talentRoom.queue.find(u =>u.user_id == user._id))
                  setType("queued")
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


  

  return (
  
  <>
  {isLoaded && (
    // <View 
    // style={{paddingTop:34}}
    // className=" flex-1 g-white flex-col justify-start gap- 6 px-6 pt-3">
    //         <MotiView
    //             from={{ opacity: 0, translateY: 40 }}
    //             animate={{ opacity: 1, translateY: 0 }}
    //             transition={{ delay: 300, type: 'timing', duration: 600 }}
    //             className="mb- gap-4"
    //          >
    //            <View
    //             className = "flex-row justify-center items-end gap-2">
    //                 <Image
    //                 className ="w-8 h-8 "
    //                 resizeMethod='contain'
    //                 source={selectedIcon} />
    //                 <Text
    //                  style={{fontSize:13}}
    //                  className="text-center text-md font-bold text-white mb-">
    //                    Contestant Room
    //                 </Text>
    //                 <Image
    //                 className ="w-8 h-8 "
    //                 resizeMethod='contain'
    //                 source={regionIcon} />
    //            </View>

    //            <View className=" g-white/10 px-6  py- rounde-2xl  borde-white/20 ">
    //             <ShuffleLetters textSize={15} text = { edition.title} />
    //            </View>

    //            <Text className="text-center text-sm px- 2 text-gray-100 font-bold mb-">
    //                 Watch contestants perform, vote for your favorite, and if there's an open spot, join the contest yourself!
    //             </Text>

    //             <Text className="text-sm text-center font-bold text-green-200">Status
    //                <Text className="text-yellow-400 font-black">{edition.round < 4 ?" Open":
    //                                       " Locked"}</Text>
    //             </Text>

    //            <View
    //             className = "w-full h-[5vh]  flex-row justify-between rounded-xl border-2 border-[#09274b] bg-[#ede7e7] items-center g-white gap-">

    //               <View
    //               className = "min-w-[33%] -2 h-[100%] flex-row justify-center items-center gap-2">
    //                 <Text 
    //                 style={{fontSize : 15}}
    //                 className="text-md mt-4 text-gray-200">
    //                   <Text
    //                    style={{fontSize : 15}}
    //                    className="text-red-800 font-bold">Stage</Text> 
    //                 </Text>
    //                 <Text 
    //                 style={{fontSize:15}}
    //                 className=" text-md  mt-4 font-black  text-black mb-">
    //                    {numberOfContestants} 
    //                 </Text>
    //                 <Image
    //                 className ="w-5 h-5 g-[#fff] mb-1 rounde-xl "
    //                 resizeMethod='contain'
    //                 source={icons.contestant} />
    //               </View>

                  
    //               <View
    //               className = "min-w-[33%] h-[100%]  flex-row justify-center items-center gap-1">    
    //                 <Text 
    //                 style={{fontSize : 15}}
    //                 className="font-bold mt-4 text-yellow-800 "> Spots {' '}
    //                    <Text
    //                    style={{fontSize : 15}}
    //                    className="text-black font-black">{MAXCONTESTANTS-numberOfContestants}</Text> 
    //                 </Text>
    //                 <Image
    //                 className ="w-8 h-8 g-[#fff] mb-1 rounde-xl "
    //                 resizeMethod='contain'
    //                 source={icons.available} /> 
    //               </View>

    //               <View
    //               className = "min-w-[33%] -2 h-[100%] flex-row justify-center items-center gap-1">
    //                  <Text 
    //                 style={{fontSize : 15}}
    //                 className="text-md mt-4 font-bold text-blue-900">Queue {' '}
    //                   <Text
    //                    style={{fontSize : 15}}
    //                    className="text-black font-black">{talentRoom.queue.length} </Text> 
    //                 </Text>
                    
    //                 <Image
    //                 className ="w-5 h-5 g-[#fff] mb-1 rounde-xl "
    //                 resizeMethod='contain'
    //                 source={icons.contestant} />
    //               </View>
                  
    //            </View>
         
    //         </MotiView>

           

    //         <MotiView
    //           from={{ opacity: 0, translateY: 40 }}
    //           animate={{ opacity: 1, translateY: 0 }}
    //           transition={{ delay: 600, type: 'timing', duration: 600 }}
    //           className="flex1 flex-col py-4  bg-[#161e28] justify-center items-center gap-2 mb">
    //                   <TouchableOpacity
    //                                 className="-[60%] -[90%] flex-col justify-center items-center">
    //                                   <Image 
    //                                     className="w-[50px] h-[50px] rounded-full"
    //                                     resizeMethod='cover'
    //                                     source={{uri:user.profile_img}}/>
    //                   </TouchableOpacity>
    //                  <View
    //                               className = "-[100%] -[90%]  gap- flex-col text-center mb- justify-center rounded-t-lg g-white items-center ">
                                        
    //                                     <View
    //                                      className = "-[100%] -[50%]  gap- flex-row mb- justify-center g-white items-center ">
    //                                                    <Text 
    //                                                     style ={{fontSize:11}}
    //                                                         className="text-xl font-black mb- text-white"> 
    //                                                         {user.name}
    //                                                    </Text>
    //                                     </View>

    //                                     <View
    //                                      className = "-[90%] -[50%] px-  gap- flex-row  rounded-t-lg justify-center g-red-600 items-center ">
                                             
    //                                                <Text 
    //                                                     style ={{fontSize:11}}
    //                                                     className="text-gray-300 font-bold -auto text-base"> 

    //                                                     {status == "joined" || userParticipation ? "You've made it to the stage! Your entry is live" : 
    //                                                      status == "queue" ? "Stage Full — Join the Queue":
    //                                                      status == "queued"? "You're in the queue! Your will go on Stage once it's your turn":
    //                                                      status == "eliminated"? "you have been eliminated from the contest":
    //                                                      ! userParticipation && status == "locked"? "competition is locked , can't join till the next edition" :
    //                                                     "Show Your Talent — Join the Contest!" }
    //                                               </Text>
    //                                     </View>                                       
    //                  </View>

    //                 <View
    //                  className="absolute top-2 right-2 px-4  bg-[#031436] border-b-2 border-blue-300">
    //                         <ShuffleLetters text={notation} textSize={12} />
    //                 </View>
                     
                      
                   
    //         </MotiView> 

   
    //          <MotiView
    //          from={{ opacity: 0, translateY: 40 }}
    //          animate={{ opacity: 1, translateY: 0 }}
    //          transition={{ delay: 800, type: 'timing', duration: 600 }}
    //          className=" min-w-[100%] h-[200px] py- 2 flex-col px- bg-[#161e28]  justify-start g-white items-center gap- mb-">
    //                 <View
    //                 className="w-full h-[70%] flex-row justify-center gap- items-center">
    //                        <TouchableOpacity
    //                                 onPressIn={()=> {setParticipationType(type)}}
    //                                 onPress={confirmAction}
    //                                 style={{
                                    
    //                                 }}
    //                                 className="g-[#eadfe2] w-[25%] h-[100%]  borde-b-2 border-white flex-row g-green-600  justify-center items-start">
    //                                 <View
    //                                 style={{                       
    //                                   backgroundColor:bgColor,
    //                                   width:height * 0.08,
    //                                   height:height * 0.08
    //                                 }}
    //                                 className=" px- 4 py- 2 justify-center items-center  rounded-xl">
    //                                        <Text 
    //                                           style ={{fontSize:10,
    //                                             color:textColor
    //                                           }}
    //                                           className="text-xl font-black mb- text-gray-100"> 
    //                                             {
    //                                             status == "locked" ?"Locked":
    //                                             status =="joined" ?"Resign": 
    //                                             status =="join" ?"Join":
    //                                             status == "queue"? "Join Queue":
    //                                             status == "queued" ? "Delete": "Delete"
    //                                             }  
    //                                       </Text>
    //                                 </View>
                                
    //                       </TouchableOpacity>
                        
    //                       {(userParticipation || userEliminatedParticipation || userQueueParticipation) && (
    //                       <TouchableOpacity
    //                         onPress={()=> {
    //                           setShow(true)
    //                           setSelectedContestant(userParticipation ? userParticipation :
    //                                                 userQueueParticipation ? userQueueParticipation :
    //                                                 userEliminatedParticipation
    //                           )
    //                               }}
    //                                     className="w-[50%] h-[100%] bg-[#19140c] p- rounded-l-md flex-col justify-center items-center">
    //                                       <Image 
    //                                         className="w-[95%] h-[93%] rounded-md"
    //                                         resizeMethod='cover'
    //                                         source={{uri:userParticipation ?userParticipation.thumbNail_URL:
    //                                                  userQueueParticipation ? userQueueParticipation.thumbNail_URL:
    //                                                  userEliminatedParticipation.thumbNail_URL
    //                                         }}/>

    //                                       <View 
    //                                           className={
    //                                                   "w-full h-full flex-col absolute top- justify-center items-center"
    //                                           }>
    //                                           <Image 
    //                                           className="w-14 h-14 opacity-100"
    //                                           source={icons.play}/>
    //                                       </View>
    //                       </TouchableOpacity>
    //                       )}

    //                         {(status =="joined" || status =="queued" || status=="eliminated") ? (
    //                           <TouchableOpacity
    //                                 onPress={ confirmAction}
    //                                 onPressIn={()=> { 
    //                                           status == "queued"? setParticipationType("qupdate"):
    //                                           status == "eliminated" ? setParticipationType("eupdate"):
    //                                           postTimeLaps > 3 ? setParticipationType("update"):setParticipationType("action")}}
    //                                 style={{
    //                                   }}
    //                                 className=" w-[25%] h-[100%] borde-b-2 border-white px-2 py-1 g-[#fff] flex-row g-green-600 justify-center items-start">
    //                                     <View
    //                                       style={{                       
    //                                         backgroundColor:postTimeLaps > 3 ?"white" :"gray",
    //                                         width:height * 0.08,
    //                                         height:height * 0.08
    //                                       }}
    //                                       className=" p-1 justify-center items-center  rounded-xl">
    //                                           <Text 
    //                                               style ={{fontSize:10,
    //                                                 color:postTimeLaps > 3 ?"blue" :"white",
    //                                               }}
    //                                               className="text-xl font-black mb- text-white"> 
    //                                                 Update 
    //                                           </Text>
    //                                    </View>
    //                           </TouchableOpacity>
    //                           ):(
    //                             <>
    //                              {status !== "join" && status !=="queue" &&  (
                                  
    //                                <View                      
    //                               style={{
    //                               width:width * 0.2,
    //                               height:width * 0.2
    //                               }}
    //                              className=" w-[0%] h-[0%] g-[#fff] flex-row g-green-600 justify-center items-center"></View>
                          
    //                              )}
    //                             </>
    //                           )}
    //                 </View>



           
    //                 <View
    //                              className = "min-w-[100%] h-[25%] mt-auto p-2 rounded-t-3xl gap- flex-row text-centr mb- justify-evenly bg-[#0a3bce] items-center ">
    //                                    {userParticipation &&( 
    //                                    <View
    //                                     className = "-[100%] -[50%]  gap-2 py- flex-row mb- justify-center g-white items-end ">
                                                    
    //                                                 <Text 
    //                                                     style ={{fontSize:11,
    //                                                       color:"pink"
    //                                                     }}
    //                                                     className="text-xl font-bold  text-white"> 
    //                                                         { "Votes"}
    //                                                 </Text>
    //                                                  <Text 
    //                                                         style ={{fontSize:10}}
    //                                                         className="text-xl font-bold pt-4  text-white"> 
    //                                                          {userParticipation.votes}
    //                                                  </Text>
    //                                    </View>
    //                                    )}
                                    
    //                                     {userParticipation &&( 
    //                                     <View
    //                                     className = "-[100%] -[50%]  gap-2 flex-row mb- justify-center g-white items-end ">
    //                                                  <Text 
    //                                                     style ={{fontSize:11,
    //                                                       color:"pink"
    //                                                     }}
    //                                                     className="text-xl font-bold  text-white"> 
    //                                                       {userParticipation && userParticipation.rank < 4 ?"TOP":"Ranked #"}  
    //                                                 </Text>
    //                                                  <Text 
    //                                                         style ={{fontSize:10}}
    //                                                         className="text-xl font-bold pt-4 text-white"> 
    //                                                           {userParticipation && userParticipation.rank}                 
    //                                                  </Text>
    //                                    </View>       
    //                                     )}                      
    //                 </View>
    //                 {/* )} */}
                   
               
    //        </MotiView> 
              
        
    //        <TouchableOpacity
    //           onPress={()=> setStart(false) }
    //           className ="absolute top-6 left-6"
    //           >
    //               <Image 
    //                       source={icons.back}
    //                       className ="w-6 h-6 "
    //                       resizeMode='cover'
    //                     />
    //        </TouchableOpacity> 
    //  </View>


       
    <MotiView
    from={{ opacity: 0, translateY: 40 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ delay: 300, type: 'timing', duration: 600 }}
    className=" b g-black absolute  flex-col justify-center items-center"
    style ={{ 
      height: h  ,
      width : w ,
      top : Platform.OS == "ios" ?  w * 0.18 + top + 1 : w * 0.18 + 50 + 1 
     }}>

   

   <View
    className = "w- full h- [5vh]  flex-col justify-center rounded-xl  b g-[#ede7e7] items-center g-white gap-1">
             
              <TouchableOpacity
                    className="p- 1 flex-col mt- 2 justify-center items-center">
                      <Image 
                        className="w-[40px] h-[40px] rounded-full"
                        resizeMethod='cover'
                        source={{uri:user.profile_img}}/>
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
                                      source={{uri:userParticipation ?userParticipation.thumbNail_URL:
                                              userQueueParticipation ? userQueueParticipation.thumbNail_URL:
                                              userEliminatedParticipation.thumbNail_URL
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
                  // height:w - w * 0.1 ,
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

    </View>


    

  
       
    <View
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

        </View>

    

  
</MotiView>




     )} 


    </>
  );
}
export default ContestantRoom;