import { View, Text } from 'react-native'
import React from 'react'

export default function ViewDetail({challenge}) {
  return (
    <View className ="w-[150px] flex-col justify-start items-start gap-1 min-h-[140px] max-h-[200px] rounded-lg
              absolute bg-gray-100 px-2 py-2  right-28 bottom-16">
           <Text
              style={{fontSize:9 , color:"#1f1312"}}
              >
              Created by :   
              <Text
                 style={{fontSize:8 , color:"black"}}
                 className="font-black"
                >
                 {challenge.name}
              </Text>
           </Text>
           <Text
              style={{fontSize:9 , color:"#1f1312"}}
              >
              On :   
              <Text
                 style={{fontSize:8 , color:"black"}}
                 className="font-black"
                >
                 {challenge.createdAt.slice(0,10)}
              </Text>
           </Text>
           <Text
              style={{fontSize:9 , color:"#1f1312"}}
              >
              Challenge Desc:   
              <Text
                 style={{fontSize:8 , color:"black"}}
                 className="font-black"
                >
                 {challenge.desc}
              </Text>
           </Text>
           <Text
              style={{fontSize:9 , color:"#1f1312"}}
              >
              Number of Participants :   
              <Text
                 style={{fontSize:8 , color:"black"}}
                 className="font-black"
                >
                 {challenge.participants.length}
              </Text>
           </Text>
           <Text
              style={{fontSize:9 , color:"#1f1312"}}
              >
              Type :   
              <Text
                 style={{fontSize:8 , color:"black"}}
                 className="font-black"
                >
                 {challenge.type}
              </Text>
           </Text>
           <Text
              style={{fontSize:9 , color:"#1f1312"}}
              >
              Privacy :   
              <Text
                 style={{fontSize:8 , color:"black"}}
                 className="font-black"
                >
                 {challenge.privacy}
              </Text>
           </Text>

    </View>
  )
}