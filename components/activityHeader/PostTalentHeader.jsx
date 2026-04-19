

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
          // className = "rounded-full"
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
              width: width * 0.075,
              height: width * 0.075,
              borderRadius: 2,
            }}
          />
          <Text
            style={{
              fontSize: width/54,
              color: '#fff', // Black text on gold
              position: 'absolute',
              bottom: -2,
              left: -3,
              fontWeight : 800,
              backgroundColor: 'black', 
              paddingHorizontal: 2,
              // borderRadius: 4,
            }}
          >
            You
          </Text>
        </View>
        <Text
        className = " p-1 mr-2 border-b-4 border-[#454242] text-orange-400 "
          style={{
            fontSize: width / 35 ,
            color: joinedStatus == "On Stage" ? 'lightgreen' :
                   joinedStatus == "In Queue" ? 'lightblue'  :
                   joinedStatus == "Eliminated" ? 'red' : "white", 
            fontWeight: '700',
          }}
        >
           {stageIcons[data.name]}
           <Text
            className = " p-1 mr-2 border-b-4 border-[#454242] text-orange-400 "
              style={{
                fontSize: width / 40 ,
                color: joinedStatus == "On Stage" ? 'lightgreen' :
                      joinedStatus == "In Queue" ? 'lightblue'  :
                      joinedStatus == "Eliminated" ? 'red' : "white", 
                fontWeight: '700',
              }} >
              {joinedStatus}
           </Text>
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
        minWidth: '100%',
        paddingVertical: 4,
        paddingHorizontal: 8,
        // backgroundColor: '#1C1C1E', 
        borderRadius: 12,
        marginVertical: 8,
      }}
    >
      {/* Avatars + Status Row */}
      <View 
      className = " justify-start w-[100%]"
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

    </View>
  );
}