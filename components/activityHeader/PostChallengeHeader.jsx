import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';

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
       t = t.concat(`Total of ${data.participants.length} Participants have joined the Challenge`)
      setText(t)
    }, [contestantFriends])



  return (

    <View
    // style={{ height: width * 0.08 }}
    style={{ backgroundColor:boxBgColor }}
    className ="w-[100%] bg-[#fefeff] mt- 4 rounde d-t-xl py-1 px-1 flex-col justify-start items-center">
         <View
                className ="w-[100%] h- [100%] px-1 py-1  flex-row justify-start items-center gap-2  bg -[#292940]">
               
                        {!contestantFriends &&  (
                          <View 
                          className ="flex-col justify-start h- [100%]  items-center gap-1">
                                <Image 
                                    style={{width: width * 0.06  ,height: width * 0.06 }}
                                    className=" rounded-full "
                                   source={{uri : data.profile_img}}
                                />
                                <Text 
                                   style={{fontSize:7}}
                                   className="font-black  text-gray-100">
                                           {  data.name.split(' ')[0]} 
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
                                           { contestantFriends[0].name.split(' ')[0]} 
                                           {/* {contestantFriends.length == 1 && `has joined ${ownChallenge} challenge`} */}
                                 </Text> 
                          </View>       
                       )}

                       {contestantFriends && contestantFriends.length >= 2 &&  (
                          <View 
                          className ="flex-col justify-start h- [100%]  items-center gap-1">
                                 <Image 
                                    style={{width: width * 0.06  ,height: width * 0.06 }}
                                    className=" rounded-full "
                                   source={{uri : contestantFriends[1].profile_img}}
                                 />
                                 <Text 
                                   style={{fontSize:7}}
                                   className="font-black  text-gray-100">
                                     {contestantFriends[1].name.split(' ')[0]}
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
        
   </View>
   
  )
}