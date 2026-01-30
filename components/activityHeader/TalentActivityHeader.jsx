import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getIcon, getTimeLapse } from '../../helper';

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
    style={{ backgroundColor:boxBgColor }}
    className ="w-[100%] bg-[#fefeff] mt-2 px-1 flex-col justify-start items-center border-t-2 border-[#2e2a2a]">
         <View
               className ="w-[100%] pt-2 h- [100%] px-1 py- 1 rounde d-xl flex-row justify-center items-center gap-2  b g-[#292940]">
                             <View 
                               className ="w-[10%] flex-col-reverse justify-start h- [100%]  items-center gap-1"> 
                                <Image 
                                   style={{ width: width * 0.08 , height: width * 0.08 }}
                                   className = "rounded-full"
                                   source={{uri : userProfile.profile_img}}
                                />
                                <Text 
                                   style={{fontSize:9}}
                                   className="font-black  text-gray-100">
                                           {  userProfile.name.split(' ')[0]} 
                                </Text> 
                              </View>   

                                <View
                                              //  style = {{minWidth:h * 0.10}}
                                                className="w- [100%] absolute top-2 left-0  rounded-md p- 1 px- 2 gap-1 flex-col justify-center items-center">
                                                     <Image
                                                        className="w-7 h-7 "
                                                        source={getIcon(data.name)}
                                                        resizeMode='cover'/>
                                                    <Text
                                                        style={{fontSize:10}}
                                                        className="text-center   font-black text-gray-100">
                                                            {data.name.toUpperCase()}
                                                    </Text>
                        </View>       
                        <View
                                              
                                                className="w- [100%] absolute top-2 right-0  rounded-md p- 1 px- 2 gap-1 flex-col justify-center items-center">
                                                     <Image
                                                        className="w-7 h-7 "
                                                        source={getIcon(data.region)}
                                                        resizeMode='cover'/>
                                                    <Text
                                                        style={{fontSize:10}}
                                                        className="text-center   font-black text-gray-100">
                                                            {data.region.toUpperCase()}
                                                    </Text>
                        </View>              
                               
                               
                
         </View>

         <View
                className ="w- [100%]  flex- 1 py-2  flex-row justify-center items-end  ">
                   
                    <Text 
                                    style={{fontSize:9}}
                                    className="font-semibold  text-white"> 
                                            {text && text}
                    </Text> 
          </View>
       
   </View>
  )
}