import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';

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
        t = t.concat(`Total of ${data.contestants.length} Contestants and ${data.queue.length} in Queue have join the Contest`)
       setText(t)
  }, [contestantFriends])
  
  
  return (
    // <>
    // {contestantFriends && (
    <View
     style={{ backgroundColor:boxBgColor }}
     className ="w-[100%] bg-[#fefeff]  rounde d-t-xl py- 1 px-1 flex-col justify-start items-center">
          <View
                className ="w-[100%] h- [100%] px-1 py-1 rounde d-xl flex-row justify-start items-center gap-2  b g-[#292940]">
                        
                        { (hasJoined || !contestantFriends) &&  (
                           <View 
                           className ="flex-col justify-start h- [100%]  items-center gap-1">
                                  <Image 
                                    style={{width: width * 0.06  ,height: width * 0.06 }}
                                    className=" rounded-full "
                                    source={{uri : user.profile_img}}
                                  />
                                  <Text 
                                    style={{fontSize:7}}
                                    className="font-black  text-gray-100">
                                            You 
                                            {/* {contestantFriends.length == 1 && "has joined the Contest"} */}
                                    </Text> 
                           </View>  
                        )}

                        {contestantFriends &&  (
                           <View 
                           className ="flex-col justify-start h- [100%]  items-center gap-1">
                                  <Image 
                                    style={{width: width * 0.06  ,height: width * 0.06 }}
                                    className=" rounded-full "
                                    source={{uri : contestantFriends[0].profile_img}}
                                  />
                                  <Text 
                                    style={{fontSize:7}}
                                    className="font-black  text-gray-100">
                                            { contestantFriends[0].name.split(' ')[0].slice(0,6)} 
                                            {/* {contestantFriends.length == 1 && (hasJoined ? "have joined the Contest": "has joined the Contest")} */}
                                  </Text> 
                           </View>  
                        )}
                        {contestantFriends && contestantFriends.length >= 2 &&  (
                           <View 
                           className ="flex-col flex- 1 justify-start h- [100%]  items-center gap-1">
                                  <Image 
                                    style={{width: width * 0.06  ,height: width * 0.06 }}
                                    className=" rounded-full "
                                    source={{uri : contestantFriends[1].profile_img}}
                                   />
                                  <Text 
                                    style={{fontSize:7}}
                                    className="font-black  text-gray-100"> 
                                            { contestantFriends[1].name.split(' ')[0]}
                                            {/* {contestantFriends.length == 2 ? "have joined the Contest" :
                                            ` and ${ contestantFriends.length - 1 }  other friends have joined the Contest `} */}
                                  </Text> 
                           </View>  
                          
                        )}
                          <View 
                           className ="flex-row flex-1 b g-[#fefeff] justify-start  h- [100%] rounde d-md items-center gap- 1">
                                <TextInput
                                            style={{
                                                fontSize:9,
                                                fontWeight:700,
                                                // borderColor: 'gray',
                                                // borderWidth: 1,
                                                // padding: 0 ,
                                                width: '100%',
                                                fontFamily:'italic',
                                                lineHeight: width * 0.03,
                                                // maxHeight:  width * 0.11 ,
                                                textAlignVertical: 'top',
                                                color: 'black', 
                                                backgroundColor : "white" 
                                            }}
                                            className ="p-2 flex-1 rounded-md"
                                            value= {text && text}
                                            editable={false} 
                                            multiline={true} 
                                />
                          </View>
    
                  
          </View>
          {/* <View
                className ="w-[100%] px-8 h-[50%] flex-row justify-center items-center  bg-[#f6f4f4]">
                   <Text 
                       style={{fontSize:8}}
                        className="font-black  text-blue-600">
                          Enter Contest Below
                  </Text> 
          </View> */}
    </View>
  //     )}
  //  </>
  )
}