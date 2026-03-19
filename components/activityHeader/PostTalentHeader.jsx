// import { View, Text, useWindowDimensions, Image, TextInput } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../../context/GlobalProvider';
// import { getIcon, getInition, getStageLogo } from '../../helper';

// export default function PostTalentHeader({data}) {
//   const {userFriendData, user , boxBgColor} = useGlobalContext()
//   const { width, height } = useWindowDimensions();
//   const [contestantFriends , setContestantFriends] = useState(null)
//   const [hasJoined , setHasJoined] = useState(null)
//   const [text , setText] = useState(null)


//   useEffect(() => {
//     if(data){
//     let Cfriends = []
//     data.contestants.map((c ,index) => {
//          if( userFriendData.friends.find( f => f.user_id === c.user_id)){
//             Cfriends.push(c)
//          }
//     })
//     setContestantFriends(Cfriends.length > 0 ? Cfriends : null)  
//     setHasJoined((data.contestants.find(c => c.user_id == user._id )||data.queue.find(c => c.user_id == user._id )||data.eliminations.find(c => c.user_id == user._id )))   
//     } else setContestantFriends(null)
//   }, [data])

//   useEffect(() => {
//        let t = ""
//        t = hasJoined && !contestantFriends ? t.concat(`have joined the contest \n`) : t.concat("")
//         if(contestantFriends){
//               t = !hasJoined && contestantFriends.length == 1 ? t.concat(`has joined the contest \n`) : t.concat("")
//               t = hasJoined && contestantFriends.length == 1 ? t.concat(`have joined the contest \n`) : t.concat("")
//               t = contestantFriends.length == 2 ? t.concat(`have joined the contest \n`) : t.concat("")
//               t = contestantFriends.length > 2 ? t.concat(`and ${contestantFriends.length-1}  other friends have joined the contest \n`) : t.concat("")
//          }
//         if(t === "") t = t.concat(`Join the Contest to watch Contestants \n`)
//        setText(t)
//   }, [contestantFriends])
  
  
//   return (
   
//     <View
  
//      className ="w-[95%]  rounded-md b g-[#fffbfb] py- 1 mb- 2 mt- 4 px-1 gap-2 flex-col justify-center items-center ">
//           <View
//                 className ="w- [40%]  h- [100%] px- 1  rounde d-xl flex-row justify-start items-center gap-2  b g-[#ffffff]">
                        
//                         { (hasJoined || !contestantFriends) &&  (
//                            <View 
//                            style={{height: width * 0.09 ,width: width * 0.09 }}
//                            className =" flex-col justify-center h- [100%]  items-center gap-1">
//                                   <Image 
//                                     style={{width: width * 0.07  ,height: width * 0.07 }}
//                                     className=" rounded-full "
//                                     source={{uri : user.profileImage?.publicUrl}}
//                                     />
//                                   <Text 
//                                     style={{fontSize:7}}
//                                     className="font-bold absolute rounded-full bottom-0 left-0 p-1 bg-[#000000] text-gray-100">
//                                             You 
//                                     </Text> 
//                            </View>  
//                         )}

//                         {contestantFriends &&  (
//                            <View 
//                            style={{height: width * 0.09 ,width: width * 0.09 }}
//                            className ="w- [15%] flex-col justify-center  h- [100%]  items-center gap-1">
//                                   <Image 
//                                     style={{width: width * 0.07  ,height: width * 0.07 }}
//                                     className=" rounded-full "
//                                     source={{uri : contestantFriends[0].profile_img}}
//                                   />
//                                   <Text 
//                                     style={{fontSize:7}}
//                                     className="font-bold absolute rounded-full bottom-0 left-0 p-1 bg-[#000000] text-gray-100">
//                                              { getInition(contestantFriends[0].name) }
//                                              </Text> 
//                            </View>  
//                         )}
//                         {contestantFriends && contestantFriends.length >= 2 &&  (
//                            <View 
//                            style={{height: width * 0.09 ,width: width * 0.09 }}
//                            className ="w- [15%] flex-col flex- 1 justify-center h- [100%]  items-center gap-1">
//                                   <Image 
//                                     style={{width: width * 0.07  ,height: width * 0.07 }}
//                                     className=" rounded-full "
//                                     source={{uri : contestantFriends[1].profile_img}}
//                                    />
//                                   <Text 
//                                     style={{fontSize:7}}
//                                     className="font-bold absolute rounded-full  bottom-0 p-1 left-0 bg-[#000000] text-gray-100"> 
//                                              { getInition(contestantFriends[1].name) }
//                                   </Text> 
//                            </View>  
                          
//                         )}
                    
    
                  
//           </View>
          
//             <View
//                 style={{
                
//                   justifyContent: 'center',
//                   alignItems: 'flex-start',
//                 }}
//                 className="rounded-full bg-gray-800/50"
//               >
//                     <Text
//                       style={{
//                         fontSize: width / 38,
//                         lineHeight: width / 28,
//                       }}
//                       className="text-gray-100 font-bold tracking-wide"
//                       numberOfLines={3} 
//                       ellipsizeMode="tail" 
//                     >
//                       {text && text}
//                     </Text>
//               </View>


//     </View>

//   ) 
// }

import React, { useEffect, useState } from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getInition } from '../../helper';
import { stageIcons } from '../../utilities/TypeData';

export default function PostTalentHeader({ data , width }) {
  const { user, userFriendData } = useGlobalContext();
  const { screenWidth } = useWindowDimensions();
  const [contestantFriends, setContestantFriends] = useState([]);
  const [joinedStatus, setJoinedStatus] = useState(null);

  useEffect(() => {
    if (!data) return;

    const friends = data.contestants.filter(c =>
      userFriendData.friends.some(f => f.user_id === c.user_id)
    );

    setContestantFriends(friends);
    const joined =
      data.contestants.some(c => c.user_id === user._id) ? "On Stage" :
      data.queue.some(c => c.user_id === user._id) ? "In Queue" :
      data.eliminations.some(c => c.user_id === user._id)? "Eliminated" : "Join"
      setJoinedStatus(joined);
  }, [data, userFriendData, user]);

  const renderAvatars = () => {
    const avatars = [];

    if (joinedStatus) {
      avatars.push(
        <View  key="you"
         className ="flex-row"
        >
        <View
          style={{
            width: width * 0.08,
            height: width * 0.08,
            borderRadius: width * 0.04,
            backgroundColor: '#FFD700', // Gold circle for "You"
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 6,
          }}
        >
          <Image
            source={{ uri: user.profileImage?.publicUrl }}
            style={{
              width: width * 0.07,
              height: width * 0.07,
              borderRadius: width * 0.035,
            }}
          />
          <Text
            style={{
              fontSize: 7,
              color: '#fff', // Black text on gold
              position: 'absolute',
              bottom: 0,
              left: 0,
              fontWeight : 800,
              backgroundColor: 'black', 
              paddingHorizontal: 2,
              borderRadius: 4,
            }}
          >
            You
          </Text>
        </View>
        <Text
        className = " p-1 mr-2 border-b-8 border-[#454242] text-orange-400 "
          style={{
            fontSize: width / 35 ,
            color: joinedStatus == "On Stage" ? 'lightgreen' :
                   joinedStatus == "In Queue" ? 'lightblue'  :
                   joinedStatus == "Eliminated" ? 'red' : "white", 
            fontWeight: '700',
          }}
        >
           {stageIcons[data.name]}{joinedStatus}
        </Text>
       </View>
      );
    }

    const firstThree = contestantFriends.slice(0, 3);
    firstThree.forEach(friend => {
      avatars.push(
        <View
          key={friend.user_id}
          style={{
            width: width * 0.08,
            height: width * 0.08,
            borderRadius: width * 0.04,
            backgroundColor: '#444', // Dark circle
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 6,
          }}
        >
          <Image
            source={{ uri: friend.profile_img }}
            style={{
              width: width * 0.07,
              height: width * 0.07,
              borderRadius: width * 0.035,
            }}
          />
          <Text
            style={{
              fontSize: 7,
              color: 'white', // Gold initials
              position: 'absolute',
              bottom: 0,
              left: 0,
              fontWeight : 800,
              backgroundColor: '#2a2a2a', // Dark overlay
              paddingHorizontal: 2,
              borderRadius: 4,
            }}
          >
            {getInition(friend.name)}
          </Text>
        </View>
      );
    });

    return avatars;
  };

  return (
    <View
      style={{
        minWidth: '90%',
        paddingVertical: 6,
        paddingHorizontal: 8,
        // backgroundColor: '#1C1C1E', 
        borderRadius: 12,
        marginVertical: 8,
      }}
    >
      {/* Avatars + Status Row */}
      <View 
      className = " justify-start min-w -[100%]"
      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
        {renderAvatars()}

        {contestantFriends.length > 0 && (
          <Text
          className = "mt- auto p-1 border-b-8 border-[#454242]"
           style={{ fontSize: width / 39, color: 'white', fontWeight: '700' }}>
          {contestantFriends.length > 3 ? `+  ${contestantFriends.length - 3} friends` : "" } Joined
          </Text>
        )}

     
      </View>

      {/* Description */}
      {/* <Text
        style={{
          fontSize: width / 38,
          color: '#EAEAEA', 
          backgroundColor: '#2a2a2a', 
          paddingHorizontal: 6,
          paddingVertical: 4,
          borderRadius: 8,
        }}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        Join the contest to watch contestants compete!
      </Text> */}
    </View>
  );
}