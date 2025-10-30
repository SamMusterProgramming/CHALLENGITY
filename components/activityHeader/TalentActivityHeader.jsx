import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getTimeLapse } from '../../helper';

export default function TalentActivityHeader({data , userProfile ,type , user}) {
  const {boxBgColor} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [text , setText] = useState(null)
  
  useEffect(() => {
//    setText("This is some read-only text that cannot be edited by the user. It can be viewed, copied, and scrolled through, but no modifications are allowed.")
   let t =  userProfile._id == user._id ? "You have " : userProfile.name + " has "
   t = data.contestants.find(c => c.user_id === userProfile._id) ?  t.concat( `joined a Talent Contest ,`) : t.concat(``)
   t = data.queue.find(c => c.user_id === userProfile._id) ?  t.concat( `joined the Queue of  Talent Contest ,`) : t.concat(``)
   t = data.eliminations.find(c => c.user_id === userProfile._id) ?  t.concat( `been eliminated from talent contest ,`) : t.concat(``)
   
   if(data.contestants.find(c => c.user_id === userProfile._id)) {
    t =  t.concat(userProfile._id == user._id ? `You earned ` : `has earned `).
    concat( data.contestants.find(c => c.user_id === userProfile._id)?.votes +  ` VOTES ,  ` ).
    concat( `RANKED # `+ data.contestants.find(c => c.user_id === userProfile._id)?.rank + ` ,` )
    .concat( data.contestants.length > 1 ? data.contestants.length + ` others have joined the challenge` : "explore the contest for more details" )
   }
   if(data.queue.find(c => c.user_id === userProfile._id)) {
    t =  t.concat(userProfile._id == user._id ? `Your will be posted when a spot is available ` : `he will be posted when a spot is availabl `)
   }
   if(data.eliminations.find(c => c.user_id === userProfile._id)) {
    t =  t.concat( `Enter the talent and update your post in order to get back in Queue ` )
   }
  
    t= t.concat( ` ... ` + getTimeLapse(data.createdAt) + ` Ago`)
   setText(t)
  }, [])
  
  return (
    <View
    style={{  backgroundColor : boxBgColor }}
    className ="w-[100%] mt- 4 [-8] p-1 rounde d-t-md bg-[#000000] flex-col justify-start items-center">
         {/* <View
               className ="w-[100%] h -[100%] px- 2  flex-row justify-start items-center gap- 2 "> */}
                <View 
                          className ="flex-row justify-center px-1 bg -[#2c2f31] rounde d-md g h- [100%] w- [100%] items-center gap-2">
                                <Image 
                                   style={{ width: width * 0.08 , height: width * 0.08 }}
                                   className = "rounded-full"
                                   source={{uri : userProfile.profile_img}}
                                />
                                        
                                <TextInput
                                    style={{
                                        fontSize:9,
                                        fontWeight:700,
                                        width: '100%',
                                        fontFamily:'italic',
                                        lineHeight: width * 0.03,
                                        textAlignVertical: 'top',
                                        color: 'black', 
                                        backgroundColor : "white" //"#1f2021"
                                          }}
                                            className ="p-2 flex-1  rounded-md"
                                            value={text && text}
                                            editable={false} 
                                            multiline={true} 
                                />
                               
                
         </View>
       
   </View>
  )
}