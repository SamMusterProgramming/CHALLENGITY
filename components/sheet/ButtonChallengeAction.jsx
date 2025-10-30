import { View, Text, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants';

export default function ButtonChallengeAction({challenge , setParticipantStatus , participantStatus}) {
    const {user} = useGlobalContext()
    const { width, height } = useWindowDimensions();
    // const [participantStatus,setParticipantStatus] = useState("")

    useEffect(() => {
        const getParticipateStatus =() => {
          if(challenge) {
            if(challenge.origin_id == user._id && challenge.participants.length == 1 && challenge.participants.find(participant=>participant.user_id == user._id)) 
               { 
                setParticipantStatus("Delete") 
                return false
               }
            if(challenge.origin_id == user._id && challenge.participants.length >1 && challenge.participants.find(participant=>participant.user_id == user._id)) 
              { 
                setParticipantStatus("Resign") 
                return false
               }
            if(challenge.origin_id == user._id  && !challenge.participants.find(participant=>participant.user_id == user._id)) 
              { 
                setParticipantStatus("Join") 
                return false
               }
            if(challenge.origin_id !== user._id  && !challenge.participants.find(participant=>participant.user_id == user._id)) 
            {
              if(challenge.privacy == "Private" )
                 if (challenge.invited_friends.find(friend=>friend.sender_id == user._id))
                        return setParticipantStatus("Invited")
                 else  setParticipantStatus("Not Invited")
              else return setParticipantStatus("Join")
            }
            if(challenge.origin_id !== user._id && challenge.participants.length == 1 && challenge.participants.find(participant=>participant.user_id == user._id)) 
              return setParticipantStatus("Delete")
            if(challenge.origin_id !== user._id && challenge.participants.length >1 && challenge.participants.find(participant=>participant.user_id == user._id)) 
              return setParticipantStatus("Resign")
          }
        }
        getParticipateStatus()
      }, [challenge])

  return (
  
                <View
                                              
                         style={{
                         width:"100%", height:"70%" ,
                         backgroundColor : participantStatus =="Join" || participantStatus =="Invited" ?"#3de909":
                         participantStatus == "Delete" || participantStatus == "Resign"?"#c23030":"#a4b0ac"
                              }}
                         className= "bg- rounded-lg py- px-2 flex-row justify-center items-center ">
                                <Text
                                     style={{fontSize:width/50,
                                     color : participantStatus == "Join"|| participantStatus =="Invited" ?'black':
                                     participantStatus == "Delete" || participantStatus == "Resign"? "#dfe4ed":"#black"
                                                  }}      
                                    className="font-black">
                                                    {participantStatus}  
                                </Text>
                </View>
                                      
  )
}