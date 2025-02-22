import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'

export default function PostFooter(props) {
  return (
    <View className="min-w-full flex-row items-center px-4 justify-between min-h-[7%]">
             
        <View className="flex-row  justify-center items-center gap-1">
                <TouchableOpacity onPress={props.handleLikes}
                  className="flex-col justify-center items-center ">
                    <Image 
                    className="w-9 h-9"
                    source={props.isLiked ? icons.like : icons.white_like}
                    resizeMode='contain'
                    />
                </TouchableOpacity>      
                <Text className="text-white font-bold">
                    {props.likesVotesData.like_count}  
                </Text>
        </View>
        <View className="flex-row justify-center items-center gap-1">
            <TouchableOpacity onPress={props.handleVotes}
                className="flex-col justify-center items-center ">
                    <Image 
                    className="w-10 h-10"
                    source= {props.isVoted ? icons.heart : icons.white_heart}
                    resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text className="text-white font-bold">
                    {props.likesVotesData.vote_count}
                </Text>
        </View>
        <TouchableOpacity className="flex-col justify-center items-center gap-1">
            <Image 
            className="w-10 h-10"
            source={icons.follow}
            resizeMode='contain'
            />
        </TouchableOpacity>
        <TouchableOpacity
            className="flex-col justify-center items-center">
            <Image 
            className="w-10 h-10"
            source={icons.friend}
            resizeMode='cover'
            />
        </TouchableOpacity>
    </View>
  )
}