// import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../../context/GlobalProvider'
// import { getIcon, getInition, getTimeLapse } from '../../helper';

// export default function TalentActivityHeader({data , userProfile ,type , user}) {
//   const {boxBgColor} = useGlobalContext()
//   const { width, height } = useWindowDimensions();
//   const [text , setText] = useState(null)
  
//   useEffect(() => {
//    let t =  userProfile._id == user._id ? "You are " : userProfile.name + " is "
//    t = data.contestants.find(c => c.user_id === userProfile._id) ?  t.concat( `on Stage ,`) : t.concat(``)
//    t = data.queue.find(c => c.user_id === userProfile._id) ?  t.concat( `in Queue ,`) : t.concat(``)
//    t = data.eliminations.find(c => c.user_id === userProfile._id) ?  t.concat( ` eliminated from Contest ,`) : t.concat(``)
   
//    if(data.contestants.find(c => c.user_id === userProfile._id)) {
//     t =  t

//     .concat( data.contestants.length > 1 ? data.contestants.length + ` others have joined the Contest` : "explore the contest for more details" )
//    }
//    if(data.queue.find(c => c.user_id === userProfile._id)) {
//     t =  t.concat(userProfile._id == user._id ? `Your will be posted when a spot is available ` : `he will be posted when a spot is availabl `)
//    }
//    if(data.eliminations.find(c => c.user_id === userProfile._id)) {
//     t =  t.concat( `update your post in order to get back in Queue` )
//    }
  
 
//    setText(t)
//   }, [])
  
//   return (
//     <View

//     className ="w-[95%] rounded-lg  b g-[#252728] py- 1 mb-2  px-1 gap-2 flex-col justify-center items-center  bord er-[#d8caca]">
//           <View
//                 style={{height: width * 0.09 ,width: width * 0.09 }}
//                 className ="w- [40%]  h- [100%] px- 1  rounde d-xl flex-row justify-center items-center gap- 2  b g-[#ffffff]">
//                                 <View 
//                                   className =" flex-col justify-center h- [100%]  items-center gap-1">
//                                 <Image 
//                                    style={{ width: width * 0.07 , height: width * 0.07 }}
//                                    className = "rounded-full"
//                                    source={{uri : userProfile.profileImage?.publicUrl}}
//                                 />
//                                 <Text 
//                                    style={{fontSize:7}}
//                                    className="font-bold absolute rounded-full bottom-0 left-0 p-1 bg-[#000000] text-gray-100">
//                                            { getInition(userProfile.name)} 
//                                 </Text> 
//                               </View>                    
                
//          </View>

//            <View
//                 style={{
                 
//                   justifyContent: 'center',
//                   alignItems: 'flex-start',
//                 }}
//                 className="rounded-full bg-gray-800/50"
//               >
//                     <Text
//                       style={{
//                         fontSize: width / 38,
//                         lineHeight: width / 38,
//                       }}
//                       className="text-gray-100 font-bold tracking-wide"
//                       numberOfLines={3} 
//                       ellipsizeMode="tail" 
//                     >
//                       {text && text}
//                     </Text>
//               </View>
       
//    </View>
//   )
// }


import { View, Text, useWindowDimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getInition } from "../../helper";

export default function TalentActivityHeader({ data, userProfile, user ,width }) {

  const { boxBgColor } = useGlobalContext();
  const { screenWidth } = useWindowDimensions();

  const [status, setStatus] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {

    if (!data || !userProfile) return;

    const isContestant = data.contestants.some(c => c.user_id === userProfile._id);
    const isQueue = data.queue.some(c => c.user_id === userProfile._id);
    const isEliminated = data.eliminations.some(c => c.user_id === userProfile._id);

    let currentStatus = null;

    if (isContestant) currentStatus = "stage";
    else if (isQueue) currentStatus = "queue";
    else if (isEliminated) currentStatus = "eliminated";

    setStatus(currentStatus);

    const subject = userProfile._id === user._id ? "You are" : `${userProfile.name} is`;

    let message = "";

    switch (currentStatus) {

      case "stage":
        message = `${subject} on stage. ${
          data.contestants.length > 1
            ? `${data.contestants.length - 1} others joined the contest`
            : "Explore the contest for more details"
        }`;
        break;

      case "queue":
        message = `${subject} in queue. Waiting for a spot on stage`;
        break;

      case "eliminated":
        message = `${subject} eliminated. Update the post to rejoin the queue`;
        break;

      default:
        message = "Explore the contest and watch contestants perform";
    }

    setText(message);

  }, [data, userProfile]);

  return (

    <View
      className="w-[87%]  rounded-xl b g-zinc-900 px-3 py-2 mb-2 flex-row items-end"
    >

      {/* Avatar */}
      <View
        style={{
          width: width * 0.085,
          height: width * 0.085
        }}
        className="rounded-full overflow-hidden border-2 border-yellow-200 mr-3"
      >
        <Image
          source={{ uri: userProfile.profileImage?.publicUrl }}
          style={{
            width: "100%",
            height: "100%"
          }}
        />

        <Text
          style={{ fontSize: 8 }}
          className="absolute bottom-0 left-0 bg-black/80 px-1 text-yellow-300 font-bold"
        >
          {getInition(userProfile.name)}
        </Text>
      </View>

      {/* Status Text */}
      <View className="flex-1">

        {status === "stage" && (
          <Text
            style={{ fontSize: width / 36 }}
            className="text-yellow-300 mb-1 font-bold"
          >
            🎤 On Stage
          </Text>
        )}

        {status === "queue" && (
          <Text
            style={{ fontSize: width / 36 }}
            className="text-orange-400 font-bold"
          >
            ⏳ In Queue
          </Text>
        )}

        {status === "eliminated" && (
          <Text
            style={{ fontSize: width / 36 }}
            className="text-red-400 font-bold"
          >
            ❌ Eliminated
          </Text>
        )}

        <Text
          style={{
            fontSize: width / 38,
            lineHeight: width / 34
          }}
          className="text-gray-200"
          numberOfLines={2}
        >
          {text}
        </Text>

      </View>

    </View>

  );
}