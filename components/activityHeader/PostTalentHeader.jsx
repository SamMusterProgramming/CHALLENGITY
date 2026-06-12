

import React, { useEffect, useState } from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getInition } from '../../helper';
import { stageIcons } from '../../utilities/TypeData';

export default function PostTalentHeader({ data , width , height }) {
  const { user, userFriendData } = useGlobalContext();
  const { screenWidth } = useWindowDimensions();
  const [contestantFriends, setContestantFriends] = useState([]);
  const [joinedStatus, setJoinedStatus] = useState(null);

  useEffect(() => {
    if (!data) return;
    // const friends = data.contestants.filter(c =>
    //   userFriendData.friends.some(f => f.user_id === c.user_id)
    // );
    const contestantIds = new Set(
      data.contestants.map(c => c.user_id)
    );
    const friends = userFriendData.friends.filter(friend =>
      contestantIds.has(friend._id)
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
         className ="flex-row mr-auto"
        >
        <View
          className = "rounded-full  "
          style={{
            width: width * 0.08,
            height: width * 0.08,
            borderRadius: 2,
            // backgroundColor: '#FFD700', // Gold circle for "You"
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 4,
          }}
        >
          <Image
          className = "rounded-full"
            source={{ uri: user.profileImage?.publicUrl }}
            style={{
              width: width * 0.07,
              height: width * 0.07,
              // borderRadius: 2,
            }}
          />
          <Text
            style={{
              fontSize: width/55,
              color: '#fff', // Black text on gold
              position: 'absolute',
              bottom: -2,
              left: -2,
              fontWeight : 800,
              backgroundColor: 'rgba(0,0,0,0.4)', 
              paddingHorizontal: 2,
              // borderRadius: 4,
            }}
          >
            You
          </Text>
        </View>
            {/* <Text
            className = " p-1 mr-2 border-b-4 border-[#9f7a0b] text-orange-400 "
              style={{
                fontSize: width / 35 ,
                color: joinedStatus == "On Stage" ? 'lightgreen' :
                      joinedStatus == "In Queue" ? 'lightblue'  :
                      joinedStatus == "Eliminated" ? 'red' : "white", 
                fontWeight: '700',
              }}
            > */}
           {/* {stageIcons[data.name]} */}
           <Text
            className = " py-2 mr-4 border-b-4  border-[#f3c005] text-orange-400 "
              style={{
                fontSize: width / 44 ,
                color: joinedStatus == "On Stage" ? 'lightgreen' :
                       joinedStatus == "In Queue" ? 'lightblue'  :
                       joinedStatus == "Eliminated" ? 'red' : "white", 
                fontWeight: '700',
              }} >
              {joinedStatus}
           </Text>
        {/* </Text> */}
       </View>
      );
    }

    const firstThree = contestantFriends.slice(0, 3);
    firstThree.forEach(friend => {
      avatars.push(
        <View
          key={friend._id}
          style={{
            width: width * 0.07,
            height: width * 0.07,
            borderRadius: width * 0.04,
            backgroundColor: '#444', // Dark circle
            justifyContent: 'center',
            alignItems: 'center',  
            marginRight: 6,
            backgroundColor : "black"
          }}
        >
          <Image
            source={{ uri: friend.profileImage.publicUrl }}
            style={{
              width: width * 0.07,
              height: width * 0.07,
              borderRadius: width * 0.035,
            }}
          />
          <Text
            style={{
              fontSize: width / 49 ,
              color: 'white', // Gold initials
              position: 'absolute',
              bottom: -5,
              left: -5,
              fontWeight : 700,
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
        width: '98%',
        paddingVertical: 2,
        paddingHorizontal: 4,
        // backgroundColor: '#1C1C1E', 
        borderRadius: 12,
        marginVertical: 4,
      }}
    >
      {/* Avatars + Status Row */}
      <View 
        className = " justify-start items-center w-[100%] "
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 ,height:width * 0.08}}>
        {renderAvatars()}

        {contestantFriends.length > 0 && (
        <View
          className = "items-center justify-center ">
          <Text
          className = " py-2 h-[100%]  text-center border-b-4 border-[#aa7a11]"
           style={{ fontSize: width / 44 , color: 'white', fontWeight: '700' }}>
          {contestantFriends.length > 2 ? `+  ${contestantFriends.length - 2}  Friends` : ""  } 
          {contestantFriends.length >= 2 ? "have" : "has"} joined
          </Text>
        </View>
        )}
      </View>

    </View>
  );
}