import { View, Text } from 'react-native'
import React from 'react'
import UserTalentEntry from '../talent/UserTalentEntry'
import UserChallengeEntry from '../challenge/UserChallengeEntry'
import PostChallengeHeader from '../activityHeader/PostChallengeHeader'
import PostTalentHeader from '../activityHeader/PostTalentHeader'
import TalentActivityHeader from '../activityHeader/TalentActivityHeader'
import ChallengeActivityHeader from '../activityHeader/ChallengeActivityHeader'


export default function Post({item , user , activity ,userProfile}) {
  return (
    <View>
        {item.dataType == "talent" && (
             <View
              className = "mb- 2 mt- 2 flex-col justify-start items-center ">
                   {/* {activity ? (
                    <TalentActivityHeader data={item} userProfile = {userProfile} user = {user} type = "talent"/>
                   ):(
                    <PostTalentHeader data={item} user={user}/>
                   )} */}
                    <UserTalentEntry  userTalent={item} user={user} activity ={false} />
             </View>
        )}
        {item.dataType == "challenge" && (
             <View
             className = "mb- 2 mt- 2 flex-col justify-start items-center ">
                   {/* {activity ? (
                    <ChallengeActivityHeader data={item} userProfile={userProfile} user={user} type="challenge" />
                    ):(
                    <PostChallengeHeader data={item} user={user} />
                    )} */}
                    <UserChallengeEntry  challenge={item} user={user} activity ={false} />
             </View>
        )}
    </View>
  )
}