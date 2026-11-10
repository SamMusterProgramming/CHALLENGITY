import { View, Text } from 'react-native'
import React from 'react'
import FriendButton from '../../../custom/FriendButton'
import FollowButton from '../../../custom/FollowButton'
import { useGlobalContext } from '../../../../context/GlobalProvider'

export default function ActionButtons({user}) {

  const {scale, spacing} = useGlobalContext()
  return (
    <>
           <FriendButton userProfile={user} />
           <FollowButton userProfile={user} />
    </>
  )
}