import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MotiView } from 'moti';
import { getIcon } from '../../helper';
import ShuffleLetters from '../custom/ShuffleLetters';
import { icons } from '../../constants';



const ParticipantRoom  = ({regionIcon , selectedIcon ,user  ,confirmAction , setStage , 
         setSelectedParticipant , setParticipationType, challenge}) => {
  
    const [isLoaded, setIsLoaded] = useState(false);
    const [showList, setShowList] = useState(false);
    // const [postData , setPostData] = useState(null)
    const [isExpired , setIsExipred] = useState(null)
    const [postTimeLaps , setPostTimeLaps] = useState(0)
    
    const [status , setStatus] = useState(0)
  
    const [bgColor , setBgColor] = useState("white")
    const [textColor , setTextColor] = useState("")
    const [notation , setNotation] = useState(challenge.participants.find(p => p.user_id == user._id)?"On Stage" : "Non Participant")
  
    const [type , setType] = useState("")
    const [userQueueParticipation , setUserQueueParticipation] = useState(null)
    const [userEliminatedParticipation , setUserEliminatedParticipation] = useState(null)
    const{width ,height} = useWindowDimensions()
    const [userParticipation , setUserParticipation] = useState(challenge.participants.find(p => p.user_id == user._id))
  
  
    useEffect(() => {
  
      if(userParticipation) {
        const createdAtDate = new Date(userParticipation.createdAt); 
        const timeDifferenceDays = (new Date().getTime() - createdAtDate.getTime() )/(1000*3600*24); 
        setPostTimeLaps(timeDifferenceDays)
              setNotation("On Stage")
              setBgColor("#d1111e")
              setTextColor("white")
              setType("Join")
              if(challenge.participants.length > 1){
                setStatus("Resign")
              }
              else{
                setStatus("Delete")
              }
      } else {
          if(challenge.privacy == "Public"){
            setNotation("Join")
            setStatus("Join")
            setBgColor("green")
            setTextColor("white")
            setType("Join")
          } else {
                if(challenge.invited_friends.find(f =>f.user_id == user._id)){
                    setNotation("Invited")
                    setStatus("Join")
                    setBgColor("green")
                    setTextColor("white")
                    setType("Join")
                }else{
                    setNotation("Not Invited")
                    setStatus("Uninvited")
                    setBgColor("lightgray")
                    setTextColor("black")
                    setType("Cjoin")
                }
           } 
      }
     
    setIsLoaded(true)  
  
    }, [])      
  
    // useEffect(() => {
    //   console.log(status)
    //   userParticipation  && getPostData(userParticipation._id,setPostData,setIsExipred)
    //   status == "queued"  &&  getPostData(talentRoom.queue.find(u=>u.user_id === user._id)._id,setPostData,setIsExipred)
    //   status == "eliminated"  &&  getPostData(talentRoom.eliminations.find(u=>u.user_id === user._id)._id,setPostData,setIsExipred)
    //   setIsLoaded(true)  
    // }, [status])
    
  


    return (
    <>
    {isLoaded && (
      <View className=" flex-1 min-h-[100%] min-w-[100%] bg-[#031236] flex-col justify-start item-center gap- 6 px-6 pt-3">
              <MotiView
                  from={{ opacity: 0, translateY: 40 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: 300, type: 'timing', duration: 600 }}
                  className="mb- flex -1 bg- black  gap-4"
                  style={{marginTop: height * 0.07}}
               >
                  {/* <Text className="text-center text-xl font-bold text-white mb-">
                       🌟
                  </Text> */}
                 <View
                  className = "flex-row justify-center items-end gap-2">
                      <View className ="flex-col rotate-45 justify-center items-center gap-1">
                            <Image
                            className ="w-8 h-8 "
                            resizeMethod='contain'
                            source={getIcon(challenge.type)} />
                             <Text
                             style={{fontSize:9}}
                             className="text-center text-md mb-6  font-black text-white mb-">  
                                 {challenge.type}
                            </Text>
                      </View>
                      <ShuffleLetters textSize={13} text = " Challenge Room"/>
                      <View className ="flex-col -rotate-45 justify-center items-center gap-1">
                             <Image
                             className ="w-8 h-8 "
                             resizeMethod='contain'
                             source={getIcon(challenge.privacy)} />
                             <Text
                             style={{fontSize:9}}
                             className="text-center text-md mb-6  font-black text-white mb-">  
                                 {challenge.privacy}
                            </Text>
                      </View>
                
                    
                 </View>
  
              
  
                 <Text 
                 style={{fontSize:9}}
                 className="text-center text-xs px- 2 text-gray-100 font-bold mb-">
                      Watch challengers perform, vote for your favorite, and if you are invited, join the challenge yourself!
                  </Text>
  
                  <Text className="text-sm text-center font-bold text-green-200">Status
                     <Text className="text-yellow-400 font-black">{" Open"}</Text>
                  </Text>
  
                 <View
                  className = "w-full h-[5vh]  flex-row justify-center rounded-xl border-2 border-[#09274b] b g-[#ede7e7] items-center g-white gap-">
  
                    <View
                    className = "min-w- [33%] -2 h-[100%] flex-row justify-center items-center gap-2">
                      <Text 
                      style={{fontSize : 15}}
                      className="text-md mt-4 text-gray-200">
                        <Text
                         style={{fontSize : 15}}
                         className="text-red-400 font-bold">Stage</Text> 
                      </Text>
                      <Text 
                      style={{fontSize:15}}
                      className=" text-md  mt-4 font-black  text-white mb-">
                         {challenge.participants.length} 
                      </Text>
                      <Image
                      className ="w-5 h-5 g-[#fff] mb-1 rounde-xl "
                      resizeMethod='contain'
                      source={icons.contestant} />
                    </View>         
                 </View>

                
              </MotiView>
  
             
  
              <MotiView
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 600, type: 'timing', duration: 600 }}
                className="flex- 1 flex-col py -4 mt-6 bg-[#04162b] justify-start items-center gap-1 mb">
                        <TouchableOpacity
                                      className="p-1 flex-col mt-2 justify-center items-center">
                                        <Image 
                                          className="w-[40px] h-[40px] rounded-full"
                                          resizeMethod='cover'
                                          source={{uri:user.profile_img}}/>
                        </TouchableOpacity>
                       <View
                                    className = "-[100%] -[90%]  gap- flex-col text-center mb- justify-center rounded-t-lg g-white items-center ">
                                          
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
                       className="absolute top-2 right-4 px -4  bg-[#031436] border-b-2 border-blue-300">
                              <ShuffleLetters text={notation} textSize={11} />
                      </View>
                      <View
                       className="absolute top-2 left-4 px-0  b g-[#031436] border-b-2 border-blue-300">
                               <Text 
                                    style ={{fontSize:11}}
                                    className="text-xl font-bold -4 text-white"> 
                                    {"Ranked " + 5}                 
                               </Text>
                      </View>
                     
                      <View
                      className="w-full h-[150px] flex-row justify-center gap- items-end">
                             <TouchableOpacity
                                      onPressIn={()=> {setParticipationType(status)}}
                                      onPress={confirmAction}
                                      style={{
                                      
                                      }}
                                      className="g-[#eadfe2] w-[25%] h- [100%]  borde-b-2 border-white flex-row g-green-600  justify-center items-end">
                                      <View
                                      style={{                       
                                        backgroundColor:bgColor,
                                        // width:height * 0.08,
                                        // height:height * 0.08
                                      }}
                                      className=" px-4 py-2 justify-center items-center  rounded-lg">
                                             <Text 
                                                style ={{fontSize:9,
                                                  color:textColor
                                                }}
                                                className="text-xl font-black mb- text-gray-100"> 
                                                  {
                                                  status 
                                                  }  
                                            </Text>
                                      </View>        
                            </TouchableOpacity>
                          
                            {(userParticipation) && (
                            <TouchableOpacity
                              onPress={()=> {
                                setStage(true)
                                setSelectedParticipant(userParticipation && userParticipation 
                                )
                                    }}
                                          className="w-[50%] h-[100%] bg-[#19140c] p- rounded-l-md flex-col justify-center items-center">
                                            <Image 
                                              className="w-[95%] h-[93%] rounded-md"
                                              resizeMethod='cover'
                                              source={{uri:userParticipation && userParticipation.thumbNail_URL
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
                            )}
  
                           {userParticipation && (
                            <TouchableOpacity
                                      onPress={ confirmAction}
                                      onPressIn={()=> { 
                                                // status == "queued"? setParticipationType("qupdate"):
                                                // status == "eliminated" ? setParticipationType("eupdate"):
                                                // postTimeLaps > 3 ? setParticipationType("update"):setParticipationType("action")
                                                setParticipationType(type)
                                            }}
                                      style={{
                                        }}
                                      className=" w-[25%] h- [100%] borde-b-2 border-white px-2 py-1 g-[#fff] flex-row g-green-600 justify-center items-start">
                                          <View
                                            style={{                       
                                              backgroundColor:postTimeLaps > 3 ?"white" :"gray",
                                            //   width:height * 0.08,
                                            //   height:height * 0.08
                                            }}
                                            className=" px-4 py-2 justify-center items-center  rounded-xl">
                                                <Text 
                                                    style ={{fontSize:9,
                                                      color:postTimeLaps > 3 ?"blue" :"white",
                                                    }}
                                                    className="text-xl font-black mb- text-white"> 
                                                      Update 
                                                </Text>
                                         </View>
                            </TouchableOpacity>
                            )}

                      </View>
  
                      <View
                                   className = "min-w-[100%] h- [40px] mt-auto p-2 rounded-t-3xl gap- flex-row text-centr  justify-center gap-4 b g-[#0a3bce] items-center ">
                                         {userParticipation &&( 
                                         <View
                                          className = "-[100%] -[50%]  gap-2 py- flex-row mb- justify-center g-white items-center ">
                                                      
                                                      <Text 
                                                          style ={{fontSize:11,
                                                            color:"pink"
                                                          }}
                                                          className="text-xl font-bold  text-white"> 
                                                              { "Votes"}
                                                      </Text>
                                                       <Text 
                                                              style ={{fontSize:10}}
                                                              className="text-xl font-bold -4  text-white"> 
                                                               {userParticipation.votes}
                                                       </Text>
                                         </View>
                                         )}
                                       
                                          {userParticipation &&( 
                                          <View
                                          className = "-[100%] -[50%]  gap-2 flex-row mb- justify-center g-white items-center ">
                                                       <Text 
                                                          style ={{fontSize:10,
                                                            color:"lightblue"
                                                          }}
                                                          className="text-xl font-bold  text-white"> 
                                                            Like
                                                       </Text>
                                                       <Text 
                                                              style ={{fontSize:10}}
                                                              className="text-xl font-bold -4 text-white"> 
                                                                {userParticipation && userParticipation.likes}                 
                                                       </Text>
                                         </View>       
                                          )}                      
                      </View>
                      {/* )} */}
                     
                 
             </MotiView> 
                
          
            


       </View>
    )}
    </>
     
    );
  }

export default ParticipantRoom