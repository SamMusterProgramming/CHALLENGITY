import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'

export default function PostSideFooter(props) {
  return (
    <View className="min-w-[40px] absolute right-0 flex-col bottom-1  items-center px-4 justify-between min-h-[300px]">
             
        <View className="flex-col justify-center items-center gap-1">
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
        <View className="flex-col justify-center items-center gap-1">
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
             <Text className="text-white text-xs font-bold">
                    Follow
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            className="flex-col justify-center gap-1 items-center">
            <Image 
            className="w-8 h-8"
            source={icons.share}
            resizeMode='contain'
            />
             <Text className="text-white text-sm font-bold">
                    Share
            </Text>
        </TouchableOpacity>
    </View>
  )
}