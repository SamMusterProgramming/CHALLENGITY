import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import { getIcon } from '../../helper';

export default function PostChallengeHeader({data , user}) {
    const {userFriendData , boxBgColor} = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [contestantFriends , setContestantFriends] = useState(null)
    const [ownChallenge , setOwnChallenge] = useState(null)
    const [text , setText] = useState(null)

  
    useEffect(() => {
      if(data){
      let Cfriends = []
      data.participants.map((c ,index) => {
           if(userFriendData.friends.find( f => f.user_id === c.user_id)){
              Cfriends.push(c)
           }
      })
      setContestantFriends(Cfriends.length > 0 ? Cfriends : null)     
      } else setContestantFriends(null)
      data.origin_id === user._id ? setOwnChallenge("Your") : setOwnChallenge("the")
    }, [data])

    useEffect(() => {
      let t = ""
      t =  !contestantFriends ? t.concat(`has created a Challenge \n`) : t.concat("")
       if(contestantFriends){
            //  t = !hasJoined && contestantFriends.length == 1 ? t.concat(`has joined the contest \n`) : t.concat("")
             t =  contestantFriends.length == 1 ? t.concat(`has participated in the challenge \n`) : t.concat("")
             t = contestantFriends.length == 2 ? t.concat(`have participated in the challeng \n`) : t.concat("")
             t = contestantFriends.length > 2 ? t.concat(`and ${contestantFriends.length-1}  other friends have participated in the challeng \n`) : t.concat("")
        }
       if(t === "") t = t.concat(`Join the Challenge to watch Contestants \n`)
      //  t = t.concat(`Total of ${data.participants.length} Participants have joined the Challenge`)
      setText(t)
    }, [contestantFriends])



  return (

    <View
     style={{ backgroundColor:boxBgColor }}
     className ="w-[100%] bg-[#fefeff] mt-2 px-1 flex-col justify-start items-center border-t-2 border-[#2e2a2a]">
          <View
                className ="w-[100%] pt-2 h- [100%] px-1 py- 1 rounde d-xl flex-row justify-center items-center gap-2  b g-[#292940]">
                     
               
                        {!contestantFriends &&  (
                          <View 
                          className ="w-[10%] flex-col-reverse justify-start h- [100%]  items-center gap-1">
                                <Image 
                                    style={{width: width * 0.06  ,height: width * 0.06 }}
                                    className=" rounded-full "
                                   source={{uri : data.profile_img}}
                                />
                                <Text 
                                   style={{fontSize:9}}
                                   className="font-black  text-gray-100">
                                           {  data.name.split(' ')[0]} 
                                </Text> 
                          </View>       
                       )}

                       {contestantFriends &&  (
                          <View 
                          className ="w-[10%] flex-col-reverse justify-start h- [100%]  items-center gap-1">
                                 <Image 
                                    style={{width: width * 0.06  ,height: width * 0.06 }}
                                    className=" rounded-full "
                                   source={{uri : contestantFriends[0].profile_img}}
                                 />
                                 <Text 
                                   style={{fontSize:9}}
                                   className="font-black  text-gray-100">
                                           { contestantFriends[0].name.split(' ')[0]} 
                                 </Text> 
                          </View>       
                       )}

                       {contestantFriends && contestantFriends.length >= 2 &&  (
                          <View 
                          className ="w-[10%] flex-col-reverse justify-start h- [100%]  items-center gap-1">
                                 <Image 
                                    style={{width: width * 0.06  ,height: width * 0.06 }}
                                    className=" rounded-full "
                                   source={{uri : contestantFriends[1].profile_img}}
                                 />
                                 <Text 
                                   style={{fontSize:9}}
                                   className="font-black  text-gray-100">
                                     {contestantFriends[1].name.split(' ')[0]}
                                 </Text> 
                          </View>  
                        )}

                        <View
                                                className="w- [100%] absolute top-2 left-0  rounded-md p- 1 px- 2 gap-1 flex-col justify-center items-center">
                                                     <Image
                                                        className="w-7 h-7 "
                                                        source={getIcon(data.type)}
                                                        resizeMode='cover'/>
                                                    <Text
                                                        style={{fontSize:10}}
                                                        className="text-center   font-black text-gray-100">
                                                            {data.type.toUpperCase()}
                                                    </Text>
                        </View>       
                        <View
                                              
                                                className="w- [100%] absolute top-2 right-0  rounded-md p- 1 px- 2 gap-1 flex-col justify-center items-center">
                                                     <Image
                                                        className="w-7 h-7 "
                                                        source={getIcon(data.privacy)}
                                                        resizeMode='cover'/>
                                                    <Text
                                                        style={{fontSize:10}}
                                                        className="text-center   font-black text-gray-100">
                                                            {data.privacy.toUpperCase()}
                                                    </Text>
                        </View>       
    

                       
                 
         </View>
         <View
                className ="w- [100%]  flex- 1 pt-2  flex-row justify-center items-end  ">
                   
                    <Text 
                                    style={{fontSize:9}}
                                    className="font-semibold  text-white"> 
                                            {text && text}
                    </Text> 
          </View>
        
   </View>
   
  )
}