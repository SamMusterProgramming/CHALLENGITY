import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getTimeLapse } from '../../helper';

export default function ChallengeActivityHeader({data , userProfile ,type , user}) {
  const {boxBgColor} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [text , setText] = useState(null)
  
  useEffect(() => {
//    setText("This is some read-only text that cannot be edited by the user. It can be viewed, copied, and scrolled through, but no modifications are allowed.")
   let t =  userProfile._id == user._id ? "You have " : userProfile.name + " has "
   t = t.concat(data.origin_id == userProfile._id ?  " created a challenge , ":  "joined Challenge Contest,").
      concat(userProfile._id == user._id ? `You earned ` : `has earned `).
      concat( data.participants.find(c => c.user_id === userProfile._id).votes +  ` VOTES ,  ` ).
      concat( `RANKED # `+ data.participants.find(c => c.user_id === userProfile._id).rank + ` `).
      concat( data.participants.length > 1 ? data.participants.length + ` others have joined the challenge` : "invite more friends to the challenge" ).
      concat( `  ... ` + getTimeLapse(data.createdAt) + ` Ago`)
   setText(t)
  }, [])
  
  return (
    <View
    style={{  backgroundColor : boxBgColor }}
    className ="w-[100%] mt- 4  p- 1  b g-[#f3f4f7] flex-col justify-start items-center rounde d-t-md">      
                <View 
                          className ="flex-row justify-center pl-1 b g-[#F97316] rounde d-md h- [100%] w- [100%] items-center gap-2">
                                <Image 
                                   style={{ width: width * 0.08 , height: width * 0.08 }}
                                   className = "rounded-full "
                                   source={{uri : userProfile.profile_img}}
                                />
                                        <TextInput
                                            style={{
                                                fontSize:9,
                                                fontWeight:700,
                                                // borderColor: 'gray',
                                                // borderWidth: 1,
                                                // padding: 0 ,
                                                // width: '100%',
                                                fontFamily:'italic',
                                                lineHeight: width * 0.03,
                                                // minHeight:  width * 0.09 ,
                                                textAlignVertical: 'top',
                                                color: 'black', 
                                                backgroundColor : "white" //"#1f2021"
                                              }}
                                            className ="p-2 flex-1 rounded-md"
                                            value={text && text}
                                            editable={false} 
                                            multiline={true} 
                                        />
                                        {/* <Text 
                                          style={{fontSize:10}}
                                          className="font-semibold text-gray-800">
                                                {userProfile._id == user._id ? "You have " : userProfile.name + " has "}
                                                <Text 
                                                style={{fontSize:10}}
                                                className="font-semibold  text-black  ">
                                                    
                                                        {data.origin_id == userProfile._id ? (
                                                            " created a challenge , "
                                                        ) : (
                                                            "joined Challenge Contest,"
                                                        ) }
                                                    
                                                </Text> 
                                                <Text 
                                                style={{fontSize:10}}
                                                className="font-semibold  text-gray-800">
                                                        {userProfile._id == user._id ? `You earned ` : `has earned `}
                                                </Text> 
                                                <Text 
                                                style={{fontSize:10}}
                                                className="font-black  text-gray-500">
                                                        {
                                                        data.participants.find(c => c.user_id === userProfile._id).votes} VOTES {', '}
                                                </Text> 
                                                <Text 
                                                style={{fontSize:10}}
                                                className="font-black  text-gray-500">
                                                       RANKED # {data.participants.find(c => c.user_id === userProfile._id).rank} 
                                                </Text> 
                                                <Text 
                                                style={{fontSize:10}}
                                                className="font-black  text-gray-500">
                                                       RANKED # {data.participants.find(c => c.user_id === userProfile._id).rank} 
                                                </Text> 
                                        </Text>  */}
                                      
                        
                                
                   
                
         </View>
       
   </View>
  )
}