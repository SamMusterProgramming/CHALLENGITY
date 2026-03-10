import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import { getIcon, getInition, getStageLogo } from '../../helper';

export default function PostTalentHeader({data}) {
  const {userFriendData, user , boxBgColor} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [contestantFriends , setContestantFriends] = useState(null)
  const [hasJoined , setHasJoined] = useState(null)
  const [text , setText] = useState(null)


  useEffect(() => {
    if(data){
    let Cfriends = []
    data.contestants.map((c ,index) => {
         if( userFriendData.friends.find( f => f.user_id === c.user_id)){
            Cfriends.push(c)
         }
    })
    setContestantFriends(Cfriends.length > 0 ? Cfriends : null)  
    setHasJoined((data.contestants.find(c => c.user_id == user._id )||data.queue.find(c => c.user_id == user._id )||data.eliminations.find(c => c.user_id == user._id )))   
    } else setContestantFriends(null)
  }, [data])

  useEffect(() => {
       let t = ""
       t = hasJoined && !contestantFriends ? t.concat(`have joined the contest \n`) : t.concat("")
        if(contestantFriends){
              t = !hasJoined && contestantFriends.length == 1 ? t.concat(`has joined the contest \n`) : t.concat("")
              t = hasJoined && contestantFriends.length == 1 ? t.concat(`have joined the contest \n`) : t.concat("")
              t = contestantFriends.length == 2 ? t.concat(`have joined the contest \n`) : t.concat("")
              t = contestantFriends.length > 2 ? t.concat(`and ${contestantFriends.length-1}  other friends have joined the contest \n`) : t.concat("")
         }
        if(t === "") t = t.concat(`Join the Contest to watch Contestants \n`)
        // t = t.concat(`Total of ${data.contestants.length} Contestants and ${data.queue.length} in Queue have join the Contest`)
       setText(t)
  }, [contestantFriends])
  
  
  return (
    // <>
    // {contestantFriends && (
    <View
    // style={{height: width * 0.10   }}
     className ="w-[95%]  rounded-md b g-[#fffbfb] py- 1 mb-2 mt- 4 px-1 gap-2 flex-row justify-center items-end ">
          <View
                className ="w- [40%]  h- [100%] px- 1  rounde d-xl flex-row justify-start items-center gap-2  b g-[#ffffff]">
                        
                        { (hasJoined || !contestantFriends) &&  (
                           <View 
                           style={{height: width * 0.09 ,width: width * 0.09 }}
                           className =" flex-col justify-center h- [100%]  items-center gap-1">
                                  <Image 
                                    style={{width: width * 0.07  ,height: width * 0.07 }}
                                    className=" rounded-full "
                                    source={{uri : user.profileImage?.publicUrl}}
                                    />
                                  <Text 
                                    style={{fontSize:7}}
                                    className="font-bold absolute rounded-full bottom-0 left-0 p-1 bg-[#000000] text-gray-100">
                                            You 
                                    </Text> 
                           </View>  
                        )}

                        {contestantFriends &&  (
                           <View 
                           style={{height: width * 0.09 ,width: width * 0.09 }}
                           className ="w- [15%] flex-col justify-center  h- [100%]  items-center gap-1">
                                  <Image 
                                    style={{width: width * 0.07  ,height: width * 0.07 }}
                                    className=" rounded-full "
                                    source={{uri : contestantFriends[0].profile_img}}
                                  />
                                  <Text 
                                    style={{fontSize:7}}
                                    className="font-bold absolute rounded-full bottom-0 left-0 p-1 bg-[#000000] text-gray-100">
                                             { getInition(contestantFriends[0].name) }
                                             </Text> 
                           </View>  
                        )}
                        {contestantFriends && contestantFriends.length >= 2 &&  (
                           <View 
                           style={{height: width * 0.09 ,width: width * 0.09 }}
                           className ="w- [15%] flex-col flex- 1 justify-center h- [100%]  items-center gap-1">
                                  <Image 
                                    style={{width: width * 0.07  ,height: width * 0.07 }}
                                    className=" rounded-full "
                                    source={{uri : contestantFriends[1].profile_img}}
                                   />
                                  <Text 
                                    style={{fontSize:7}}
                                    className="font-bold absolute rounded-full  bottom-0 p-1 left-0 bg-[#000000] text-gray-100"> 
                                             { getInition(contestantFriends[1].name) }
                                  </Text> 
                           </View>  
                          
                        )}
                    
    
                  
          </View>
          <View
                style={{height: width * 0.10  }}
                className ="  flex-1   rounded-full text-center items-start ">
                   
                     <Text 
                                    style={{fontSize:width/45}}
                                    className="font-bold mt-7 text-gray-100 line-clamp-3 tracking-wide"> 
                                            {text && text}
                     </Text> 
          </View>
    </View>
  //     )}
  //  </>
  )
}