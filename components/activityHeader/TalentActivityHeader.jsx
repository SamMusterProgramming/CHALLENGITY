import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getIcon, getInition, getTimeLapse } from '../../helper';

export default function TalentActivityHeader({data , userProfile ,type , user}) {
  const {boxBgColor} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [text , setText] = useState(null)
  
  useEffect(() => {
//    setText("This is some read-only text that cannot be edited by the user. It can be viewed, copied, and scrolled through, but no modifications are allowed.")
   let t =  userProfile._id == user._id ? "You are " : userProfile.name + " is "
   t = data.contestants.find(c => c.user_id === userProfile._id) ?  t.concat( `on Stage ,`) : t.concat(``)
   t = data.queue.find(c => c.user_id === userProfile._id) ?  t.concat( `in Queue ,`) : t.concat(``)
   t = data.eliminations.find(c => c.user_id === userProfile._id) ?  t.concat( ` eliminated from Contest ,`) : t.concat(``)
   
   if(data.contestants.find(c => c.user_id === userProfile._id)) {
    t =  t
    // .concat(userProfile._id == user._id ? `You earned ` : `has earned `).
    // concat( data.contestants.find(c => c.user_id === userProfile._id)?.votes +  ` VOTES ,  ` ).
    // concat( `RANKED # `+ data.contestants.find(c => c.user_id === userProfile._id)?.rank + ` ,` )
    .concat( data.contestants.length > 1 ? data.contestants.length + ` others have joined the Contest` : "explore the contest for more details" )
   }
   if(data.queue.find(c => c.user_id === userProfile._id)) {
    t =  t.concat(userProfile._id == user._id ? `Your will be posted when a spot is available ` : `he will be posted when a spot is availabl `)
   }
   if(data.eliminations.find(c => c.user_id === userProfile._id)) {
    t =  t.concat( `update your post in order to get back in Queue` )
   }
  
    t= t.concat( ` .` + getTimeLapse(data.createdAt) + ` Ago`)
   setText(t)
  }, [])
  
  return (
    <View
    // style={{height: width * 0.10  }}
    className ="w-[95%] rounded-lg  b g-[#252728] py- 1 mb-2  px-1 gap-2 flex-row justify-center items-center  bord er-[#d8caca]">
          <View
                style={{height: width * 0.09 ,width: width * 0.09 }}
                className ="w- [40%]  h- [100%] px- 1  rounde d-xl flex-row justify-center items-center gap- 2  b g-[#ffffff]">
                                <View 
                                  // style={{height: width * 0.10 ,width: width * 0.10 }}
                                  className =" flex-col justify-center h- [100%]  items-center gap-1">
                                <Image 
                                   style={{ width: width * 0.07 , height: width * 0.07 }}
                                   className = "rounded-full"
                                   source={{uri : userProfile.profileImage?.publicUrl}}
                                />
                                <Text 
                                   style={{fontSize:7}}
                                   className="font-bold absolute rounded-full bottom-0 left-0 p-1 bg-[#000000] text-gray-100">
                                           { getInition(userProfile.name)} 
                                </Text> 
                              </View>                    
                
         </View>

         <View
                style={{height: width * 0.10  }}
                className ="w- [60%]  flex-1 pt- 2 text-wrap  flex-row justify-center items-end  ">
                   
                    <Text 
                                    style={{fontSize:width/45}}
                                    className="font-semibold mb-2 text-gray-100"> 
                                            {text && text}
                    </Text> 
          </View>
       
   </View>
  )
}