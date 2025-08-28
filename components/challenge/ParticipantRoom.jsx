import { View, Text, Image, TouchableOpacity, useWindowDimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MotiView } from 'moti';
import { getIcon } from '../../helper';
import ShuffleLetters from '../custom/ShuffleLetters';
import { icons } from '../../constants';



const ParticipantRoom  = ({regionIcon , selectedIcon ,user  ,confirmAction , setStage , challenge, w,h , top,
         setSelectedParticipant , setParticipationType, data}) => {
  
    const [isLoaded, setIsLoaded] = useState(false);
    const [showList, setShowList] = useState(false);
    // const [postData , setPostData] = useState(null)
    const [isExpired , setIsExipred] = useState(null)
    const [postTimeLaps , setPostTimeLaps] = useState(0)
    
    const [status , setStatus] = useState(0)
  
    const [bgColor , setBgColor] = useState("white")
    const [textColor , setTextColor] = useState("")
    const [notation , setNotation] = useState(data.find(p => p.user_id == user._id)?"On Stage" : "Non Participant")
  
    const [type , setType] = useState("")
    const [userQueueParticipation , setUserQueueParticipation] = useState(null)
    const [userEliminatedParticipation , setUserEliminatedParticipation] = useState(null)
    const{width ,height} = useWindowDimensions()
    const [userParticipation , setUserParticipation] = useState(
                      data.find(p => p.user_id == user._id),
                    )
  
  
    useEffect(() => {
  
      if(userParticipation) {
        const createdAtDate = new Date(userParticipation.createdAt); 
        const timeDifferenceDays = (new Date().getTime() - createdAtDate.getTime() )/(1000*3600*24); 
        setPostTimeLaps(timeDifferenceDays)
              setNotation("On Stage")
              setBgColor("#d1111e")
              setTextColor("white")
              setType("Join")
              if(data.length > 1){
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
                if(challenge.invited_friends.find(f =>f.user_id == user._id)|| challenge.origin_id == user._id){
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
                                  <ShuffleLetters textSize={10} text = "Your Position"/>
                            </View>

                            {(userParticipation) ? (
                            <View
                              className = " py-4 flex-col text-center mb- justify-center  g-white items-center ">
                                 
                                  <TouchableOpacity
                                    onPress={()=> {
                                      setStage(true)
                                      setSelectedParticipant(userParticipation && userParticipation 
                                      )
                                          }}
                                                className=" b g-[#19140c] p- flex-col justify-center items-center">
                                                  <Image 
                                                    style={{width:w - w * 0.1 , height:w - w * 0.1 }}
                                                    className=" rounded-full"
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

                            </View>
                          ):(
                            <View
                              style={{width:w - w * 0.1 , height:w - w * 0.1 }}
                              className = " flex-col px-2 text-center mt- auto justify-center gap-4 bg-black rounded-xl items-center ">
                                      <Text 
                                           style ={{fontSize:10, }}
                                           className="text-xl font-bold text-center  text-gray-400"> 
                                              {notation == "Invited" ?"The spotlight is waiting for you. You are invited to join the challenge — shine and claim your stage below." :
                                              notation == "Not Invited"?"You are not invited to join this challenge,but you can still enjoy the show! Watch the performances and vote for your favorite participant" :
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
                                      onPressIn={()=> {setParticipationType(status)}}
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
                                                  status 
                                                  }  
                                            </Text>
                                      </View>        
                            </TouchableOpacity>
  
                           {userParticipation && (
                            <TouchableOpacity
                                      onPress={ confirmAction}
                                      onPressIn={()=> { 
                                     
                                                setParticipationType(type)
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

export default ParticipantRoom