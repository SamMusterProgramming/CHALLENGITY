import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'

export default function PostSideFooter(props) {
  return (
    <View className="min-w-[50px] absolute right-0 flex-col bottom-1 h-[40%]  items-center px-0 justify-between min-h-[300px]">
             
        <View className="flex-col justify-center items-center min-h-[8%] gap-1">
                <TouchableOpacity onPress={props.handleLikes}
                  className="flex-col justify-center items-center w-12 h-12 ">
                    <Image 
                    className={props.isLiked ? "w-9 h-9" : "w-12 h-12"}
                    source={props.isLiked ? icons.like : icons.white_like}
                    resizeMode='contain'
                    />
                </TouchableOpacity>      
                <Text className="text-white mt-auto font-bold">
                    {props.likesVotesData.like_count}  
                </Text>
        </View>
        <View className="flex-col justify-center items-center min-h-[8%] gap-1">
                <TouchableOpacity onPress={props.handleVotes}
                 className="flex-col justify-center items-center w-12 h-12">
                    <Image 
                    className= {props.isVoted ? "w-12 h-12" : "w-10 h-10"}
                    source= {props.isVoted ? icons.heart : icons.white_heart}
                    resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text className="text-white mt-auto font-bold">
                    {props.likesVotesData.vote_count}
                </Text>
        </View>
        <TouchableOpacity className="flex-col justify-center min-h-[8%] items-center gap-1">
            <Image 
            className="w-10 h-10"
            source={icons.follow}
            resizeMode='contain'
            />
             <Text className="text-white mt-auto text-xs font-bold">
                    Follow
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            className="flex-col justify-center gap-1 min-h-[8%] items-center">
            <Image 
            className="w-8 h-8"
            source={icons.share}
            resizeMode='contain'
            />
             <Text className="text-white mt-auto text-xs font-bold">
                    Share
            </Text>
        </TouchableOpacity>
    </View>
  )
}